// === Global navigate function ===
function go(screenId) {
  // Update screen
  document.querySelectorAll('.screen-content').forEach(s => s.classList.remove('active'));
  const target = document.getElementById(screenId);
  if (target) { target.classList.add('active'); const body = target.querySelector('.screen-body'); if (body) body.scrollTop = 0; }
  // Landscape mode
  const phone = document.getElementById('phoneFrame');
  if (phone) {
    if (screenId === 'adm-03' || screenId === 'con-10l' || screenId === 'adm-10l') { phone.classList.add('landscape'); } else { phone.classList.remove('landscape'); }
  }
  // URL hash 동기화 (P-27) — iframe 내부에서는 건너뜀
  if (window.top === window && location.hash !== '#' + screenId) {
    history.pushState({ screen: screenId }, '', '#' + screenId);
  }
}

// 브라우저 뒤로/앞으로 가기 대응
window.addEventListener('popstate', function(e) {
  var sid = e.state?.screen || location.hash.slice(1);
  if (sid) {
    // go()의 pushState를 건너뛰기 위해 직접 화면 전환
    document.querySelectorAll('.screen-content').forEach(function(s) { s.classList.remove('active'); });
    var target = document.getElementById(sid);
    if (target) target.classList.add('active');
    var phone = document.getElementById('phoneFrame');
    if (phone) {
      if (sid === 'adm-03' || sid === 'con-10l' || sid === 'adm-10l') phone.classList.add('landscape');
      else phone.classList.remove('landscape');
    }
  }
});

// In-app navigation: attach go() to elements with data-go attribute
// + data-toast for btnCopyToast delegation
document.addEventListener('click', (e) => {
  const goEl = e.target.closest('[data-go]');
  if (goEl) { e.preventDefault(); go(goEl.dataset.go); return; }

  const toastEl = e.target.closest('[data-toast]');
  if (toastEl) { btnCopyToast(toastEl.dataset.toast); return; }
});

// CON-07: 선수/유료 콘텐츠 클릭 -> CTA 스크롤
document.addEventListener('click', function(e) {
  const player = e.target.closest('.con07-player, .con07b-player');
  const fade = e.target.closest('#con07-fade-zone, #con07b-fade-zone');
  if (!player && !fade) return;
  if (e.target.closest('[data-go]')) return;
  const screen = document.querySelector('.screen-content.active');
  if (!screen) return;
  const cta = screen.querySelector('[id$="-cta"]');
  if (cta) cta.scrollIntoView({ behavior: 'smooth', block: 'center' });
});

// Player settings popup (ADM/CON 공용 함수)
function setupPlayerSettings(btnId, popupId, screenId) {
  document.getElementById(btnId)?.addEventListener('click', function(e) {
    e.stopPropagation();
    var popup = document.getElementById(popupId);
    popup.style.display = popup.style.display === 'none' ? 'block' : 'none';
  });
  document.getElementById(screenId)?.addEventListener('click', function(e) {
    if (!e.target.closest('#' + popupId) && !e.target.closest('#' + btnId)) {
      var popup = document.getElementById(popupId);
      if (popup) popup.style.display = 'none';
    }
  });
}
setupPlayerSettings('playerSettingsBtn', 'playerSettings', 'con-10l');
setupPlayerSettings('admPlayerSettingsBtn', 'admPlayerSettings', 'adm-10l');


// CSS 변수에서 타이밍 값 읽기
var _cs = getComputedStyle(document.documentElement);
var PHASE_DELAY = parseInt(_cs.getPropertyValue('--phase-delay')) || 1500;
var PHASE_FADE = parseInt(_cs.getPropertyValue('--phase-fade')) || 400;
var TOAST_SHOW = parseInt(_cs.getPropertyValue('--toast-show')) || 1500;
var AUTO_TRANSITION = parseInt(_cs.getPropertyValue('--auto-transition')) || 2000;

// Phase transition animation (체크 → 미리보기) — 공용 함수
function startPhaseAnim(p1Id, p2Id) {
  var p1 = document.getElementById(p1Id);
  var p2 = document.getElementById(p2Id);
  if (!p1 || !p2) return;
  p1.style.display = 'flex'; p1.style.opacity = '1'; p2.style.opacity = '0';
  setTimeout(function() {
    p1.style.transition = 'opacity ' + PHASE_FADE + 'ms'; p1.style.opacity = '0';
    setTimeout(function() { p1.style.display = 'none'; p2.style.opacity = '1'; }, PHASE_FADE);
  }, PHASE_DELAY);
}

// 화면별 phase 애니메이션 매핑
var phaseAnimMap = {
  'editor-3': ['editor3Phase1','editor3Phase2'],
  'adm-14': ['aiPhase1','aiPhase2'],
  'adm-06': ['adm06Phase1','adm06Phase2'],
  'comm-upload-done': ['uploadPhase1','uploadPhase2'],
  'comm-merge-done': ['mergePhase1','mergePhase2']
};

// 로딩 → 완료 자동 전환 매핑
var autoTransitions = {
  'editor-loading':'editor-3', 'adm-13':'adm-14', 'adm-05':'adm-06',
  'comm-upload-loading':'comm-upload-done', 'comm-merge-loading':'comm-merge-done'
};

// go() 확장: phase 애니메이션 + 자동 전환
var _baseGo = go;
go = function(id) {
  _baseGo(id);
  // Phase animation
  var anim = phaseAnimMap[id];
  if (anim) startPhaseAnim(anim[0], anim[1]);
  // Auto-transition (loading → completion)
  if (autoTransitions[id]) {
    setTimeout(function() {
      if (window.parent !== window) {
        window.parent.postMessage({type:'navigateTo', screenId: autoTransitions[id]}, '*');
      } else {
        go(autoTransitions[id]);
      }
    }, AUTO_TRANSITION);
  }
};
// Also trigger from sidebar (uses same phaseAnimMap)
document.querySelectorAll('.sidebar-item').forEach(function(btn) {
  btn.addEventListener('click', function() {
    var anim = phaseAnimMap[btn.dataset.screen];
    if (anim) setTimeout(function(){ startPhaseAnim(anim[0], anim[1]); }, 100);
  });
});

// Editor ratio change
document.addEventListener('click', function(e) {
  const chip = e.target.closest('#editor .chip');
  if (!chip) return;
  const ratios = {'9:16':{w:180,r:'9/16'},'16:9':{w:280,r:'16/9'},'4:5':{w:200,r:'4/5'},'1:1':{w:220,r:'1/1'},'4:3':{w:260,r:'4/3'}};
  const rt = ratios[chip.textContent];
  if (!rt) return;
  const preview = document.getElementById('editorPreview');
  const badge = preview?.querySelector('.editor-ratio-badge');
  if (preview) {
    preview.style.width = rt.w + 'px';
    preview.style.aspectRatio = rt.r;
  }
  if (badge) badge.textContent = chip.textContent;
});

// Editor load popup
document.getElementById('editorAddBtn2')?.addEventListener('click', () => {
  document.getElementById('editorLoadPopup').style.display = 'flex';
});

document.getElementById('editorAddBtn')?.addEventListener('click', () => {
  document.getElementById('editorLoadPopup').style.display = 'flex';
});

// Time toggle for upload
document.getElementById('timeToggle')?.addEventListener('click', function() {
  this.classList.toggle('on');
  const inputs = document.getElementById('timeInputs');
  if (inputs) {
    inputs.querySelectorAll('input').forEach(inp => {
      inp.disabled = this.classList.contains('on');
      inp.style.opacity = this.classList.contains('on') ? '0.3' : '1';
    });
  }
});

// Toggle switch
document.querySelectorAll('.toggle-switch').forEach(t => t.addEventListener('click', () => t.classList.toggle('on')));
document.querySelectorAll('.cam-select-item').forEach(item => item.addEventListener('click', () => {
  const isOn = item.dataset.selected !== 'true';
  item.dataset.selected = isOn;
  const label = item.querySelector('.cam-label');
  const check = item.querySelector('.cam-check');
  const icon = item.querySelector('.cam-icon svg');
  if (isOn) {
    item.style.background = 'var(--color-accent-light)';
    item.style.borderColor = 'var(--color-accent)';
    if (label) label.style.color = 'var(--color-accent-dark)';
    if (check) { check.style.background = 'var(--color-accent)'; check.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3"><path d="M5 12l5 5L19 7"/></svg>'; }
    if (icon) { icon.setAttribute('stroke','var(--color-accent)'); icon.querySelectorAll('circle').forEach(c => c.setAttribute('fill','var(--color-accent)')); }
  } else {
    item.style.background = '#fff';
    item.style.borderColor = 'var(--color-border)';
    if (label) label.style.color = 'var(--color-text-secondary)';
    if (check) { check.style.background = 'var(--color-gray-200)'; check.innerHTML = ''; }
    if (icon) { icon.setAttribute('stroke','#BDBDBD'); icon.querySelectorAll('circle').forEach(c => c.setAttribute('fill','#BDBDBD')); }
  }
}));
// Onboarding card
document.querySelectorAll('.onboarding-card').forEach(c => c.addEventListener('click', () => { document.querySelectorAll('.onboarding-card').forEach(x => x.classList.remove('selected')); c.classList.add('selected'); }));
// Chip toggle
document.querySelectorAll('.chip-group .chip').forEach(c => c.addEventListener('click', () => { c.parentElement.querySelectorAll('.chip').forEach(x => x.classList.remove('active')); c.classList.add('active'); }));
// Tab toggle
document.querySelectorAll('.tab-bar').forEach(bar => bar.querySelectorAll('.tab-item').forEach(tab => tab.addEventListener('click', () => {
  bar.querySelectorAll('.tab-item').forEach(t => t.classList.remove('active'));
  tab.classList.add('active');
  // Archive tab switching (소비자: 경기영상/하이라이트/찜한영상)
  const hlTab = document.getElementById('hlTab');
  const matchTab = document.getElementById('matchTab');
  const conFavTab = document.getElementById('conFavTab');
  if (hlTab && matchTab) {
    const txt = tab.textContent.trim();
    matchTab.style.display = txt === '경기 영상' ? 'block' : 'none';
    hlTab.style.display = txt === '하이라이트' ? 'block' : 'none';
    if (conFavTab) conFavTab.style.display = txt === '찜한 영상' ? 'block' : 'none';
  }
  // Archive tab switching (관리자: 전체영상/찜한영상)
  const admAllTab = document.getElementById('admArchiveAllTab');
  const admFavTab = document.getElementById('admArchiveFavTab');
  if (admAllTab && admFavTab) {
    const txt = tab.textContent.trim();
    admAllTab.style.display = txt === '전체 영상' ? 'block' : 'none';
    admFavTab.style.display = txt === '찜한 영상' ? 'block' : 'none';
  }
  // CON-05 tab switching
  const qrTab = document.getElementById('con05QrTab');
  const nearTab = document.getElementById('con05NearTab');
  if (qrTab && nearTab) {
    const isNear = tab.textContent === '주변 검색';
    qrTab.style.display = isNear ? 'none' : 'block';
    nearTab.style.display = isNear ? 'block' : 'none';
  }
})));
// Contact toggle
document.getElementById('contactBtn')?.addEventListener('click', () => { const info = document.getElementById('contactInfo'); info.style.display = info.style.display === 'none' ? 'block' : 'none'; });
// 촬영 설정 시간 미설정 토글
document.addEventListener('click', function(e) {
  const toggle = e.target.closest('#con-upload .toggle-switch, [id*="upload"] .toggle-switch');
  if (!toggle) return;
  toggle.classList.toggle('on');
  const inputs = toggle.closest('.screen-body')?.querySelectorAll('input[type="time"]');
  if (inputs) {
    inputs.forEach(inp => {
      inp.disabled = toggle.classList.contains('on');
      inp.style.opacity = toggle.classList.contains('on') ? '0.3' : '1';
    });
  }
});

// Consumer contact toggle
document.getElementById('conContactBtn')?.addEventListener('click', () => { const info = document.getElementById('conContactInfo'); if(info) info.style.display = info.style.display === 'none' ? 'block' : 'none'; });

// Profile type toggle - hide child name for non-parent
document.querySelectorAll('#typeAmateur, #typePlayer, #typeParent').forEach(el => {
  el.addEventListener('click', () => {
    const field = document.getElementById('childNameField');
    if (field) field.style.display = el.id === 'typeParent' ? 'block' : 'none';
  });
});

// Invite popup
document.getElementById('inviteBtn')?.addEventListener('click', () => {
  document.getElementById('invitePopup').style.display = 'flex';
});

// (Settings is now a full page via data-go="adm-settings")

// Stitch improve button (ADM-02)
document.getElementById('stitchImproveBtn')?.addEventListener('click', () => {
  document.getElementById('stitchConfirm').style.display = 'flex';
});
document.getElementById('stitchStartBtn')?.addEventListener('click', () => {
  document.getElementById('stitchConfirm').style.display = 'none';
  const toast = document.getElementById('stitchToast');
  toast.textContent = '스티칭 개선을 시작합니다';
  toast.style.display = 'block';
  setTimeout(() => { toast.style.display = 'none'; }, 2000);
  setTimeout(() => {
    toast.textContent = '스티칭 개선이 완료되었어요! ✓';
    toast.style.display = 'block';
    setTimeout(() => { toast.style.display = 'none'; }, 2500);
  }, 5000);
});

// Metric panel toggle (ADM-02)
document.getElementById('metricToggle')?.addEventListener('click', () => {
  const panel = document.getElementById('metricPanel');
  const arrow = document.getElementById('metricArrow');
  const isOpen = panel.style.display !== 'none';
  panel.style.display = isOpen ? 'none' : 'block';
  arrow.style.transform = isOpen ? '' : 'rotate(180deg)';
});

// Stop recording popup
document.getElementById('stopRecBtn')?.addEventListener('click', () => { document.getElementById('stopConfirm').style.display = 'block'; });
document.getElementById('stopCancel')?.addEventListener('click', () => { document.getElementById('stopConfirm').style.display = 'none'; });

// 문제 신고 전송
document.getElementById('reportSendBtn')?.addEventListener('click', () => {
  document.getElementById('reportContent').style.display = 'none';
  document.getElementById('reportDone').style.display = 'block';
});
document.getElementById('conReportBtn')?.addEventListener('click', () => {
  document.getElementById('conReportPopup').style.display = 'flex';
});
document.getElementById('conReportSendBtn')?.addEventListener('click', () => {
  document.getElementById('conReportContent').style.display = 'none';
  document.getElementById('conReportDone').style.display = 'block';
});

// Save: adm-05(저장 중) -> 팝업 닫기 (자동 전환은 go() 내부에서 처리)
document.getElementById('stopSaveBtn')?.addEventListener('click', () => {
  document.getElementById('stopConfirm').style.display = 'none';
});


// Bulk download popup
document.getElementById('bulkDlBtn')?.addEventListener('click', () => { document.getElementById('bulkDlPopup').style.display = 'flex'; });

// Circle checkbox toggle — 공용 함수
var _checkSvg = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3"><path d="M20 6L9 17l-5-5"/></svg>';
function setClipCircle(c, checked) {
  c.dataset.checked = checked ? '1' : '0';
  c.style.background = checked ? 'var(--color-accent)' : 'transparent';
  c.style.borderColor = checked ? 'var(--color-accent)' : 'rgba(255,255,255,0.8)';
  c.innerHTML = checked ? _checkSvg : '';
  if (checked) { c.style.display = 'flex'; c.style.alignItems = 'center'; c.style.justifyContent = 'center'; }
}

document.querySelectorAll('.clip-circle').forEach(c => {
  c.addEventListener('click', (e) => {
    e.stopPropagation();
    setClipCircle(c, c.dataset.checked !== '1');
  });
});

// Toggle all clips — 공용 함수
function setupToggleAll(btnId, scopeSelector) {
  document.getElementById(btnId)?.addEventListener('click', function() {
    var scope = scopeSelector ? document.querySelector(scopeSelector) : document;
    if (!scope) return;
    var circles = scope.querySelectorAll('.clip-circle');
    var allChecked = [...circles].every(c => c.dataset.checked === '1');
    circles.forEach(c => setClipCircle(c, !allChecked));
    this.textContent = allChecked ? '전체 선택' : '전체 취소';
  });
}
setupToggleAll('toggleAllClips', null);
setupToggleAll('toggleAllClipsCon', '#con-player');

// Shorts clip: tap -> popup player / press & hold -> select mode with drag
let pressTimer = null;
let pressTriggered = false;
let selectMode = false;

document.querySelectorAll('.shorts-clip').forEach(clip => {
  // Press & hold -> enter select mode + toggle this clip
  clip.addEventListener('mousedown', (e) => {
    pressTriggered = false;
    pressTimer = setTimeout(() => {
      pressTriggered = true;
      selectMode = true;
      const circle = clip.querySelector('.clip-circle');
      if (circle) circle.click();
    }, 500);
  });

  // Drag over while in select mode -> auto select
  clip.addEventListener('mouseenter', () => {
    if (selectMode && pressTriggered) {
      const circle = clip.querySelector('.clip-circle');
      if (circle && circle.dataset.checked !== '1') circle.click();
    }
  });

  clip.addEventListener('mouseup', () => {
    clearTimeout(pressTimer);
    selectMode = false;
    if (!pressTriggered) {
      // Short tap -> show clip popup with 9:16 default
      showClipPopup();
    }
  });
  clip.addEventListener('mouseleave', () => { clearTimeout(pressTimer); });

  // 터치 이벤트 (P-28)
  clip.addEventListener('touchstart', (e) => {
    pressTriggered = false;
    pressTimer = setTimeout(() => {
      pressTriggered = true;
      selectMode = true;
      const circle = clip.querySelector('.clip-circle');
      if (circle) circle.click();
    }, 500);
  }, {passive: true});
  clip.addEventListener('touchend', () => {
    clearTimeout(pressTimer);
    selectMode = false;
    if (!pressTriggered) showClipPopup();
  });
  clip.addEventListener('touchcancel', () => { clearTimeout(pressTimer); });
});

// End drag select on global mouseup/touchend
document.addEventListener('mouseup', () => { selectMode = false; });
document.addEventListener('touchend', () => { selectMode = false; });

// GROUP 10: Profile grid/likes tab switching (CON-MY and CON-PROFILE-OTHER)
document.querySelectorAll('#con-my, #con-profile-other').forEach(function(screen) {
  var tabBtns = screen.querySelectorAll('.profile-tab-btn');
  if (tabBtns.length < 2) return;
  var gridTab = tabBtns[0];
  var heartTab = tabBtns[1];
  var grid = screen.querySelector('.profile-grid');
  if (!grid) return;
  var emptyMsg = document.createElement('div');
  emptyMsg.className = 'js-empty-msg';
  emptyMsg.textContent = '좋아요한 영상이 여기에 표시돼요';
  grid.parentNode.insertBefore(emptyMsg, grid.nextSibling);

  gridTab.addEventListener('click', function() {
    gridTab.querySelector('svg').setAttribute('stroke', 'var(--color-accent)');
    gridTab.style.borderBottom = '2px solid var(--color-accent)';
    heartTab.querySelector('svg').setAttribute('stroke', 'var(--color-gray-400)');
    heartTab.style.borderBottom = 'none';
    grid.style.display = 'grid';
    emptyMsg.style.display = 'none';
  });
  heartTab.addEventListener('click', function() {
    heartTab.querySelector('svg').setAttribute('stroke', 'var(--color-accent)');
    heartTab.style.borderBottom = '2px solid var(--color-accent)';
    gridTab.querySelector('svg').setAttribute('stroke', 'var(--color-gray-400)');
    gridTab.style.borderBottom = 'none';
    grid.style.display = 'none';
    emptyMsg.style.display = 'block';
  });
});

// GROUP 2: Calendar has-event click -> scroll to schedule section
document.querySelectorAll('#adm-15 .day-cell.has-event').forEach(function(cell) {
  cell.style.cursor = 'pointer';
  cell.addEventListener('click', function() {
    var scheduleCard = document.querySelector('#adm-15 .screen-body .card:nth-of-type(2)');
    if (scheduleCard) scheduleCard.scrollIntoView({ behavior: 'smooth' });
  });
});

// Button feedback functions
function btnShare(el, url) {
  document.getElementById('globalShareSheet').style.display = 'flex';
}

function btnSave(el) {
  el.innerHTML = '찜 완료!';
  el.style.background = 'var(--color-accent)';
  el.style.color = '#fff';
  el.style.borderColor = 'var(--color-accent)';
  el.style.transition = 'all 0.2s';
  el.style.animation = 'savePulse 0.6s ease-out';
  setTimeout(function() {
    el.innerHTML = '저장하기';
    el.style.background = '';
    el.style.color = '';
    el.style.borderColor = '';
    el.style.animation = '';
  }, 1500);
}

function btnCopyToast(msg) {
  let t = document.getElementById('copyToast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'copyToast';
    t.className = 'js-toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.style.opacity = '1';
  setTimeout(function() { t.style.opacity = '0'; }, TOAST_SHOW);
}

function btnDl(el, popupId) {
  var orig = el.textContent;
  el.textContent = "완료!";
  el.style.background = "var(--color-accent)";
  el.style.color = "#fff";
  el.style.borderColor = "var(--color-accent)";
  el.style.transition = "all 0.2s";
  setTimeout(function() {
    document.getElementById(popupId).style.display = "none";
    el.textContent = orig;
    el.style.background = "";
    el.style.color = "";
    el.style.borderColor = "";
  }, 800);
}

// Share toast — btnCopyToast 재사용
function showShareToast() {
  btnCopyToast('링크를 지인들에게 공유해보세요 :)');
}

// Clip popup builder
function showClipPopup() {
  let popup = document.getElementById('clipPopup');
  if (!popup) {
    popup = document.createElement('div');
    popup.id = 'clipPopup';
    popup.className = 'js-clip-overlay';

    const inner = document.createElement('div');
    inner.className = 'js-clip-inner';
    inner.onclick = (e) => e.stopPropagation();

    // Video container
    const vidWrap = document.createElement('div');
    vidWrap.id = 'clipVidWrap';
    vidWrap.className = 'js-clip-vid';
    vidWrap.innerHTML = '<span style="color:#fff;opacity:0.5;font-size:32px;">&#9654;</span>';
    inner.appendChild(vidWrap);

    // Ratio chips
    const ratioRow = document.createElement('div');
    ratioRow.id = 'clipRatioRow';
    ratioRow.className = 'js-clip-ratios';
    const ratios = [
      { label: '9:16', w: 180, r: '9/16' },
      { label: '16:9', w: 300, r: '16/9' },
      { label: '4:5', w: 210, r: '4/5' },
      { label: '5:4', w: 280, r: '5/4' },
      { label: '3:4', w: 200, r: '3/4' },
      { label: '4:3', w: 280, r: '4/3' },
    ];
    ratios.forEach((rt, i) => {
      const chip = document.createElement('span');
      chip.className = 'chip' + (i === 0 ? ' active' : '');
      chip.style.cssText = 'cursor:pointer;font-size:11px;';
      chip.textContent = rt.label;
      chip.onclick = () => {
        ratioRow.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        vidWrap.style.width = rt.w + 'px';
        vidWrap.style.aspectRatio = rt.r;
      };
      ratioRow.appendChild(chip);
    });
    inner.appendChild(ratioRow);

    // Buttons: 저장하기 다운로드 (ratioRow와 같은 너비)
    const btns = document.createElement('div');
    btns.id = 'clipBtnsRow';
    btns.className = 'js-clip-btns';

    const b2 = document.createElement('button');
    b2.className = 'btn btn-outline';
    b2.style.cssText = 'flex:1;height:36px;font-size:12px;';
    b2.textContent = '저장하기';
    b2.onclick = () => { btnSave(b2); };

    const b3 = document.createElement('button');
    b3.className = 'btn btn-outline';
    b3.style.cssText = 'flex:1;height:36px;font-size:12px;color:var(--color-accent);';
    b3.textContent = '다운로드';

    btns.append(b2, b3);
    inner.appendChild(btns);
    popup.appendChild(inner);
    popup.addEventListener('click', () => { popup.style.opacity = '0'; setTimeout(() => popup.style.display = 'none', 200); });
    document.body.appendChild(popup);
  }
  // Reset ratio to 9:16
  const vidWrap = document.getElementById('clipVidWrap');
  if (vidWrap) { vidWrap.style.width = '200px'; vidWrap.style.aspectRatio = '9/16'; }
  const chips = popup.querySelectorAll('.chip');
  chips.forEach((c, i) => { c.classList.toggle('active', i === 0); });
  popup.style.display = 'flex';
  requestAnimationFrame(() => {
    popup.style.opacity = '1';
    const rr = document.getElementById('clipRatioRow');
    const br = document.getElementById('clipBtnsRow');
    if (rr && br) br.style.width = rr.offsetWidth + 'px';
  });
}

// Download overlay (영상 다운로드)
document.getElementById('downloadBtn')?.addEventListener('click', () => {
  const ov = document.getElementById('dlOverlay');
  ov.style.display = 'block';
  setTimeout(() => {
    document.getElementById('dlIcon').className = 'js-dl-done';
    document.getElementById('dlIcon').innerHTML = '&#10003;';
    document.getElementById('dlText').textContent = '다운로드가 완료되었어요!';
    document.getElementById('dlSub').textContent = '갤러리에 저장되었어요';
    document.getElementById('dlBtns').style.display = 'block';
  }, 2000);
});

// === Fullscreen overlay toggle + 3s auto-hide ===
let fsOverlayVisible = true;
let fsAutoHideTimer = null;
function toggleFsOverlay() {
  const overlay = document.getElementById('fsOverlay');
  const drawer = document.getElementById('metricDrawer');
  if (!overlay) return;
  // If drawer is open, close it instead
  if (drawer && drawer.style.transform === 'translateX(0px)') {
    toggleMetricDrawer();
    return;
  }
  fsOverlayVisible = !fsOverlayVisible;
  overlay.style.opacity = fsOverlayVisible ? '1' : '0';
  overlay.style.pointerEvents = fsOverlayVisible ? 'none' : 'none'; // pointer-events on children
  if (fsOverlayVisible) { startFsAutoHide(); } else { clearTimeout(fsAutoHideTimer); }
}
function startFsAutoHide() {
  clearTimeout(fsAutoHideTimer);
  fsAutoHideTimer = setTimeout(() => {
    const overlay = document.getElementById('fsOverlay');
    if (overlay && fsOverlayVisible) {
      fsOverlayVisible = false;
      overlay.style.opacity = '0';
    }
  }, 3000);
}
// Reset overlay when entering adm-03
document.querySelectorAll('.sidebar-item').forEach(btn => {
  btn.addEventListener('click', () => {
    if (btn.dataset.screen === 'adm-03') {
      setTimeout(() => {
        fsOverlayVisible = true;
        const overlay = document.getElementById('fsOverlay');
        if (overlay) overlay.style.opacity = '1';
        startFsAutoHide();
      }, 100);
    }
  });
});

// === Metric drawer toggle ===
function toggleMetricDrawer() {
  const drawer = document.getElementById('metricDrawer');
  if (!drawer) return;
  const isOpen = drawer.style.transform === 'translateX(0px)';
  drawer.style.transform = isOpen ? 'translateX(100%)' : 'translateX(0px)';
  // Keep overlay visible while drawer is open
  if (!isOpen) {
    clearTimeout(fsAutoHideTimer);
    fsOverlayVisible = true;
    const overlay = document.getElementById('fsOverlay');
    if (overlay) overlay.style.opacity = '1';
  } else {
    startFsAutoHide();
  }
}

// === Share popup toggle (CON-PLAYER) ===
document.getElementById('sharePlayerBtn')?.addEventListener('click', () => { document.getElementById('sharePopup').style.display = 'flex'; });
document.getElementById('sharePopup')?.addEventListener('click', (e) => { if(e.target.id === 'sharePopup') e.target.style.display = 'none'; });
// Web preview: click non-free content → smooth scroll to CTA
document.querySelectorAll('.web-scroll-cta').forEach(el => {
  el.addEventListener('click', () => {
    const cta = document.getElementById('web02Cta');
    if (cta) cta.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
});

// Press & hold preview on thumbnail grids
document.querySelectorAll('.thumb-cell').forEach(cell => {
  let holdTimer;
  cell.addEventListener('mousedown', () => {
    holdTimer = setTimeout(() => {
      cell.style.transform = 'scale(1.05)';
      cell.style.boxShadow = '0 8px 24px rgba(0,0,0,0.2)';
      const preview = document.createElement('div');
      preview.className = 'hold-preview';
      preview.innerHTML = '<div style="position:absolute;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.6);display:flex;align-items:center;justify-content:center;border-radius:6px;"><span style="color:#fff;font-size:11px;font-weight:600;">5초 미리보기 재생 중...</span></div>';
      preview.className = 'js-hold-preview';
      cell.appendChild(preview);
    }, 500);
  });
  const release = () => {
    clearTimeout(holdTimer);
    cell.style.transform = '';
    cell.style.boxShadow = '';
    cell.querySelector('.hold-preview')?.remove();
  };
  cell.addEventListener('mouseup', release);
  cell.addEventListener('mouseleave', release);
  cell.addEventListener('touchstart', (e) => {
    holdTimer = setTimeout(() => {
      cell.style.transform = 'scale(1.05)';
      cell.style.boxShadow = '0 8px 24px rgba(0,0,0,0.2)';
      const preview = document.createElement('div');
      preview.className = 'hold-preview';
      preview.innerHTML = '<div style="position:absolute;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.6);display:flex;align-items:center;justify-content:center;border-radius:6px;"><span style="color:#fff;font-size:11px;font-weight:600;">5초 미리보기 재생 중...</span></div>';
      preview.className = 'js-hold-preview';
      cell.appendChild(preview);
    }, 500);
  }, {passive: true});
  cell.addEventListener('touchend', release);
  cell.addEventListener('touchcancel', release);
});

// === Feed interactions ===
// Comment sheet toggle
document.querySelectorAll('.feed-comment-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const sheet = document.getElementById('feedCommentSheet');
    if (sheet) sheet.style.display = sheet.style.display === 'none' ? 'block' : 'none';
  });
});

// Like button toggle (outline <-> filled red heart)
document.querySelectorAll('.feed-like-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const icon = btn.querySelector('.feed-heart-icon');
    if (!icon) return;
    const isLiked = icon.getAttribute('fill') === '#EF4444';
    if (isLiked) {
      icon.setAttribute('fill', 'none');
      icon.setAttribute('stroke', '#fff');
    } else {
      icon.setAttribute('fill', '#EF4444');
      icon.setAttribute('stroke', '#EF4444');
    }
  });
});

// Save/bookmark button toggle (outline <-> filled)
document.querySelectorAll('.feed-save-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const icon = btn.querySelector('.feed-bookmark-icon');
    if (!icon) return;
    const isSaved = icon.getAttribute('fill') === '#fff';
    if (isSaved) {
      icon.setAttribute('fill', 'none');
    } else {
      icon.setAttribute('fill', '#fff');
    }
  });
});


// === Fix 8: CON-FOLLOWERS tab switching ===
(function() {
  var followersScreen = document.getElementById('con-followers');
  if (!followersScreen) return;
  var tabBar = followersScreen.querySelector('.tab-bar');
  if (!tabBar) return;
  var tabs = tabBar.querySelectorAll('.tab-item');
  tabs.forEach(function(tab) {
    tab.addEventListener('click', function() {
      tabs.forEach(function(t) { t.classList.remove('active'); });
      this.classList.add('active');
    });
  });
})();

// Follow/unfollow button toggle in followers list
function toggleFollowBtn(btn) {
  var isFollowing = btn.textContent.trim() === '팔로잉';
  if (isFollowing) {
    btn.textContent = '팔로우';
    btn.classList.remove('btn-primary');
    btn.classList.add('btn-outline');
  } else {
    btn.textContent = '팔로잉';
    btn.classList.remove('btn-outline');
    btn.classList.add('btn-primary');
  }
}

// === Fix 9: Double-tap to like on feed ===
(function() {
  var feedScreen = document.getElementById('con-feed');
  if (!feedScreen) return;
  var videoArea = feedScreen.querySelector('.feed-video-area');
  if (!videoArea) return;
  videoArea.addEventListener('dblclick', function(e) {
    var heart = document.createElement('div');
    heart.className = 'heart-pop';
    heart.textContent = '❤️';
    heart.style.pointerEvents = 'none';
    this.appendChild(heart);
    setTimeout(function() { heart.remove(); }, 800);
    var likeBtn = feedScreen.querySelector('.feed-like-btn');
    if (likeBtn) {
      var icon = likeBtn.querySelector('.feed-heart-icon');
      if (icon && icon.getAttribute('fill') !== '#EF4444') {
        icon.setAttribute('fill', '#EF4444');
        icon.setAttribute('stroke', '#EF4444');
      }
    }
  });
})();

// === Navigate to screen from URL parameter ===
(function() {
  var params = new URLSearchParams(location.search);
  var screenId = params.get('screen') || location.hash.slice(1);
  if (screenId && typeof go === 'function') go(screenId);
  // Also listen for parent to tell us which screen to show
  window.addEventListener('message', function(e) {
    if (e.data && e.data.type === 'goScreen' && typeof go === 'function') go(e.data.screenId);
  });
})();
