/**
 * CAPP!C Auth + Loading Screen
 *
 * 사용법: index.html, overview.html <head>에 아래 추가
 *   <script src="auth.js"></script>
 *
 * - iframe 내부(embed 모드)에서는 암호/로딩 건너뜀
 * - sessionStorage로 같은 탭 내 세션 유지
 * - SHA-256 해시 비교로 평문 노출 방지
 */
(function() {
  'use strict';

  // iframe 안이면 (overview→index.html embed) 건너뜀
  if (window.top !== window) return;

  // 로컬 또는 GitHub Pages에서는 암호 건너뜀 — 로딩만 표시
  var isLocal = location.hostname === 'localhost' || location.hostname === '127.0.0.1' || location.hostname.endsWith('.github.io');

  // 이미 인증된 세션이면 로딩만 표시
  var AUTH_KEY = 'cappic_auth';
  var isAuthed = sessionStorage.getItem(AUTH_KEY) === '1' || isLocal;

  // SHA-256 해시 (비밀번호: "cappic2026")
  var HASH = '169f77391bbf51a5f197d94002ef37b180f933e101bac2ca906f33bfd95a8a48';

  // --- DOM 생성 (즉시 실행으로 FOUC 방지) ---
  var overlay = document.createElement('div');
  overlay.id = 'auth-overlay';
  overlay.style.cssText = 'position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;background:#fff;font-family:"Pretendard",-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;transition:opacity 0.4s ease;';

  if (isAuthed) {
    // 이미 인증 → 로딩 화면만 표시
    overlay.innerHTML = buildLoadingHTML();
    injectOverlay(overlay);
    waitForLoad(overlay);
  } else {
    // 미인증 → 암호 입력 화면
    overlay.innerHTML = buildAuthHTML();
    injectOverlay(overlay);
    setupAuth(overlay);
  }

  // --- 암호 입력 화면 HTML ---
  function buildAuthHTML() {
    return '<div style="text-align:center;width:300px;padding:0 24px;">'
      + '<div style="font-size:36px;font-weight:800;color:#2AC1BC;margin-bottom:4px;letter-spacing:-1px;">CAPP!C</div>'
      + '<div style="font-size:12px;font-weight:400;color:#888;margin-bottom:6px;">Blueprint Studio</div>'
      + '<div style="font-size:13px;color:#9E9E9E;margin-bottom:32px;">비밀번호를 입력하세요</div>'
      + '<input id="auth-pw" type="password" placeholder="비밀번호" autocomplete="off" '
      + 'style="width:100%;height:48px;padding:0 16px;border:1px solid #E0E0E0;border-radius:12px;font-size:15px;outline:none;box-sizing:border-box;font-family:inherit;transition:border-color 0.15s;">'
      + '<div id="auth-error" style="color:#EF4444;font-size:12px;margin-top:8px;height:18px;"></div>'
      + '<button id="auth-submit" style="width:100%;height:48px;background:#2AC1BC;color:#fff;border:none;border-radius:12px;font-size:15px;font-weight:600;cursor:pointer;margin-top:8px;font-family:inherit;transition:background 0.15s;">'
      + '확인</button>'
      + '</div>';
  }

  // --- 로딩 화면 HTML ---
  function buildLoadingHTML() {
    return '<div style="text-align:center;">'
      + '<div style="font-size:36px;font-weight:800;color:#2AC1BC;margin-bottom:4px;letter-spacing:-1px;">CAPP!C</div>'
      + '<div style="font-size:12px;font-weight:400;color:#888;margin-bottom:24px;">Blueprint Studio</div>'
      + '<div style="width:40px;height:40px;border:3px solid #E0E0E0;border-top-color:#2AC1BC;border-radius:50%;animation:auth-spin 0.8s linear infinite;margin:0 auto;"></div>'
      + '<div style="font-size:13px;color:#9E9E9E;margin-top:16px;">화면을 준비하고 있어요...</div>'
      + '<style>@keyframes auth-spin{to{transform:rotate(360deg)}}</style>'
      + '</div>';
  }

  // --- DOM에 삽입 ---
  function injectOverlay(el) {
    // DOMContentLoaded 전이면 document.write 대신 직접 삽입
    if (document.body) {
      document.body.appendChild(el);
    } else {
      document.addEventListener('DOMContentLoaded', function() {
        document.body.appendChild(el);
      });
    }
  }

  // --- 암호 검증 이벤트 ---
  function setupAuth(overlay) {
    function onReady() {
      var input = document.getElementById('auth-pw');
      var btn = document.getElementById('auth-submit');
      var error = document.getElementById('auth-error');
      if (!input || !btn) return;

      input.addEventListener('focus', function() {
        input.style.borderColor = '#2AC1BC';
      });
      input.addEventListener('blur', function() {
        input.style.borderColor = '#E0E0E0';
      });

      function tryAuth() {
        var pw = input.value;
        if (!pw) {
          error.textContent = '비밀번호를 입력해주세요';
          input.style.borderColor = '#EF4444';
          return;
        }

        hashPassword(pw).then(function(h) {
          if (h === HASH) {
            // 인증 성공
            sessionStorage.setItem(AUTH_KEY, '1');
            overlay.innerHTML = buildLoadingHTML();
            waitForLoad(overlay);
          } else {
            // 실패
            error.textContent = '비밀번호가 맞지 않아요';
            input.style.borderColor = '#EF4444';
            input.value = '';
            input.focus();
          }
        });
      }

      btn.addEventListener('click', tryAuth);
      input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') tryAuth();
      });

      // 자동 포커스
      setTimeout(function() { input.focus(); }, 100);
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', onReady);
    } else {
      onReady();
    }
  }

  // --- 리소스 로드 완료 대기 → fade out ---
  function waitForLoad(overlay) {
    var startTime = Date.now();

    function fadeOut() {
      // 최소 600ms 로딩 화면 표시 (너무 빨리 사라지면 깜빡임)
      var elapsed = Date.now() - startTime;
      var remaining = Math.max(0, 600 - elapsed);
      setTimeout(function() {
        overlay.style.opacity = '0';
        setTimeout(function() {
          overlay.remove();
        }, 400);
      }, remaining);
    }

    function onAllReady() {
      // 폰트까지 완전히 로드된 후 fade out
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(fadeOut);
      } else {
        fadeOut();
      }
    }

    if (document.readyState === 'complete') {
      onAllReady();
    } else {
      window.addEventListener('load', onAllReady);
    }
  }

  // --- SHA-256 해시 ---
  function hashPassword(pw) {
    var encoder = new TextEncoder();
    var data = encoder.encode(pw);
    return crypto.subtle.digest('SHA-256', data).then(function(buf) {
      var arr = new Uint8Array(buf);
      var hex = '';
      for (var i = 0; i < arr.length; i++) {
        hex += ('0' + arr[i].toString(16)).slice(-2);
      }
      return hex;
    });
  }
})();
