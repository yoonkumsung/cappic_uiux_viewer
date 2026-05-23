# CAPP!C App Preview — 리팩토링 스펙 문서

> 작성일: 2026-05-23 | 최종 수정: 2026-05-23 (v2 — 점검 반영)
> 대상: index.html (554KB), overview.html (90KB), styles.css (17KB), generate-thumbs.js

---

## 0. 필수 제약조건

리팩토링 전체에 걸쳐 반드시 지켜야 할 조건. 모든 Phase에서 이 조건에 위배되는 변경은 금지.

### R-01: HTML 추출 기능 보존
- 개발자가 overview.html에서 화면을 클릭 → "HTML 코드" 버튼으로 해당 화면의 완전한 HTML+CSS를 추출하여 그대로 개발에 사용
- `ziExtractHTML()` 함수가 iframe 내부 `index.html?screen=xxx`에서 해당 화면의 `outerHTML` + `<style>` 내용을 추출하는 현재 구조를 유지해야 함
- **index.html을 75개 파일로 분리하면 이 기능이 파괴됨** → index.html은 단일 파일 유지
- 리팩토링으로 인라인 스타일이 CSS 클래스로 전환되면, 추출 HTML에 `styles.css` 내용이 함께 포함되도록 `ziExtractHTML()` 수정 필요

### R-02: overview.html iframe 연동 보존
- `openZoomIn()` → `iframe.src = 'index.html?screen=' + screenId` 패턴 유지
- iframe 내부에서 `data-go` 클릭 시 overview 측 `openZoomIn()` 호출하는 연동 유지

### R-03: generate-thumbs.js 호환성
- `index.html?screen=xxx` URL 패턴 + `go(screenId)` 함수 호출 구조 유지
- Puppeteer 스크린샷 파이프라인이 정상 동작해야 함

### R-04: 디자인 충실도 유지
- 이 프로젝트는 **앱 디자인 목업 뷰어**. 화면 내부의 폰트 크기(9px, 10px 등), 색상, 레이아웃은 의도된 디자인
- 접근성 기준(WCAG)은 **뷰어 UI**(overview 툴바, 검색 등)에만 적용. 목업 화면 내부 디자인은 변경 금지

### R-05: 수정 전 검증
- 각 Phase 시작 전 bug_history.md 확인 (기존 12개 버그 재발 방지)
- 수정 후 검증: div 태그 균형, JS 문법, 변수 선언 순서, 요소 참조 유효성
- generate-thumbs.js로 리팩토링 전/후 스크린샷 비교 (visual regression)

---

## 1. 현재 상태 요약

| 항목 | 수치 |
|------|------|
| 전체 화면 수 | 75개 (ADM 20 / CON 32 / COMM 12 / WEB 3) |
| index.html | 6,246줄 / 554KB — 75개 화면 + CSS + JS 전부 포함 |
| overview.html | 1,476줄 / 90KB — 흐름도 + 디자인 토큰 |
| styles.css | 500줄 / 17KB — 디자인 토큰 + 공용 컴포넌트 |
| 인라인 스타일 | 700+ 개 (HTML 태그에 직접 style 속성) |
| 인라인 이벤트 핸들러 | index.html 231개 + overview.html 다수 |
| JS 함수 | 20+ 개 (전역 스코프에 혼재) |
| 화면 데이터 관리 | 3곳에 중복 (overview.html / generate-thumbs.js / index.html) |
| 배포 | GitHub Pages (정적 파일, 빌드 도구 없음) |

---

## 2. 문제점 상세

### 2.1 구조 문제

#### P-01: 단일 파일에 모든 화면 + CSS + JS 포함
- **현상**: 75개 화면 HTML + 223줄 CSS + 800줄 JS가 index.html 하나에 존재
- **영향**: 554KB 파일 전체를 한 번에 로드. 유지보수 시 6,246줄 파일을 탐색해야 함
- **제약**: R-01(HTML 추출), R-02(iframe 연동), R-03(thumbs 호환) 때문에 화면 HTML은 분리 불가
- **해결 방향**: HTML은 단일 파일 유지. **JS만 app.js로 분리**, 인라인 CSS는 styles.css 클래스로 전환

#### P-02: 인라인 스타일 남용 (700+개)
- **현상**: `style="width:48px; height:48px; border-radius:50%; background:#fff; ..."` 같은 긴 인라인 스타일이 태그마다 존재
- **영향**: styles.css에 정의된 디자인 토큰과 괴리. 동일 스타일이 여러 곳에 중복되어 일관성 유지 불가
- **R-01 영향**: 인라인 스타일을 CSS 클래스로 전환하면 `ziExtractHTML()`이 추출하는 HTML에 해당 클래스 정의가 포함되어야 함 → `ziExtractHTML()` 수정 필요 (styles.css 내용 포함)
- **구체적 수치**:
  - `style="cursor:pointer;"` — 51회
  - `style="flex:1;"` — 65회
  - `font-size:11px; color:#757575;` — 43회
  - `font-size:10px; color:#757575;` — 37회

#### P-03: 인라인 이벤트 핸들러 (index.html 231개 + overview.html 다수)
- **현상**: `onclick="go('adm-01')"`, `onclick="toggleFollowBtn(this)"` 등 HTML에 직접 삽입
- **index.html**: 231개 onclick. 일부는 이미 `data-go` + 이벤트 위임 사용 중 → 이 패턴으로 통일
- **overview.html**: `onclick="switchMainTab('flow')"`, `onclick="zoomBy(-0.1)"`, `onclick="openZoomIn('${s.id}')"`, `onclick="switchZiDevice('${d.id}')"` 등 동적 생성 포함
- **영향**: HTML과 JS 로직이 혼재. 디버깅 시 이벤트 추적 어려움

#### P-04: 코드 중복
| 중복 코드 | 반복 횟수 | 줄 수 |
|-----------|-----------|-------|
| 체크박스 토글 (clip-circle) | 3곳 (5740, 5755, 5775) | 50+줄 |
| 토스트 알림 (copyToast / shareToast) | 2곳 (5897, 5927) | 20줄 |
| 팝업/모달 빌더 패턴 | 10+곳 | 100+줄 |
| 탭 전환 로직 | 4곳 | 40줄 |
| 버튼 상태 피드백 (btnSave/btnDl) | 3곳 | 30줄 |
| SVG 아이콘 (카메라/알림/네비 등) | 20+곳 | ~50KB |
| **StatusBar** | **75회** | **75줄** |
| **TopBar (뒤로가기+제목)** | **54회** | **200+줄** |
| **BottomNav** | **21회** | **300+줄** |
| **영상 플레이어 (adm-10l / con-10l)** | **2화면 완전 중복** | **110줄** |

#### P-05: ADM/CON 공통 화면 미통합
- **현상**: 관리자 앱과 소비자 앱이 동일한 기능의 화면을 각각 별도로 가지고 있음
- **실측 비교 (adm-10l vs con-10l)**:
  - 레이아웃, 재생 컨트롤(-10s/▶/+10s), 진행 바, 설정 팝업(재생 속도 0.5x~2x, 화질 480p~4K) 구조 **100% 동일**
  - 차이점은 **뒤로가기 목적지**(`data-go="adm-08"` vs `data-go="con-07"`)와 **요소 ID 접두사**(`admPlayerSettings` vs `playerSettings`)뿐
  - 110줄 × 2 = 220줄 중복
- **공통 화면 후보 전체 목록**:

| 현재 화면 | 공통화 대상 | 차이점 | 통합 방법 |
|-----------|------------|--------|-----------|
| adm-10l + con-10l | 영상 플레이어 (가로) | 뒤로가기 목적지, 요소 ID만 다름 | 단일 화면 + `data-back` 속성으로 동적 분기 |
| adm-08 + con-07/con-07b | 영상 상세 | 하단 CTA(구독 vs 다운로드), 선수 그리드 차이 | 역할(role) 속성으로 조건부 렌더링 |
| adm-08p + con-player | 선수 상세 | 이름 입력 유무, 하단 버튼 차이 | 역할 속성 분기 |
| adm-settings + con-settings | 설정 | 메뉴 항목이 다름 (공통 레이아웃) | 공용 리스트 레이아웃 + 메뉴 데이터 분기 |
| editor-*, adm-09~14, comm-* | COMM 기능 (이미 공통) | 이미 양쪽에서 공유 중 | 유지 (OK) |
| con-publish | 새 게시물 (이미 공통) | ADM/CON 양쪽에서 도착 | 유지 (OK) |

- **통합 우선순위**: adm-10l + con-10l (100% 동일) > adm-08p + con-player (90%) > adm-08 + con-07/07b (70%)

#### P-06: DOM 쿼리 캐싱 없음
- **현상**: `document.getElementById('metricPanel')`, `document.querySelectorAll('.clip-circle')` 등이 이벤트 핸들러 내에서 매번 호출
- **영향**: 빈번한 DOM 탐색으로 불필요한 오버헤드

#### P-06: CSS 토큰 활용 불일치
- **현상**: styles.css에 `--text-xs: 11px`, `--color-gray-600: #757575` 등 토큰 정의 → index.html에서는 `font-size:11px; color:#757575;`로 직접 하드코딩
- **영향**: 디자인 토큰 변경 시 styles.css만 수정하면 될 것을 index.html 700+곳을 모두 수정해야 함

#### P-07: 화면 데이터 3중 관리
- **현상**: 화면 목록이 3곳에 중복 관리됨
  - `overview.html` — `screens[]` 배열 (75개 항목, ID/코드/이름/카테고리/landscape), `descriptions{}` 객체 (340줄), `layout{}` 좌표, `connections[]` 연결선, `cardHeights{}` 높이
  - `generate-thumbs.js` — `screens[]` 배열 (75개 ID)
  - `index.html` — 75개 `<div class="screen-content" id="xxx">` 요소
- **영향**: 화면 1개 추가 시 최소 3파일 수정 필요. 누락 시 overview 불일치 또는 썸네일 누락
- **해결**: `screens-data.js` 단일 파일로 추출 → overview.html, generate-thumbs.js에서 import

#### P-08: querySelector로 스타일 문자열 기반 요소 탐색
- **현상**: `screen.querySelector('button[style*="padding:8px 0"]')` (index.html:5838)
- **영향**: 인라인 스타일 변경 시 셀렉터가 깨짐. P-02 수정과 직접 충돌
- **해결**: 의미 있는 클래스명 또는 data 속성 부여 (P-02 수정 전에 먼저 처리)

### 2.2 성능 문제

#### P-09: 초기 로딩 최적화 없음
- **현상**: 554KB HTML 전체 파싱 → 75개 화면 DOM 생성 → JS 실행
- **영향**: 네트워크가 느린 환경에서 체감 로딩 지연
- **해결 방향**: 암호 화면 → 로딩 스피너(리소스 로드 대기) → 콘텐츠 표시

#### P-10: @import 폰트 블로킹
- **현상**: styles.css:9 — `@import url('https://cdn.jsdelivr.net/.../pretendard.min.css')`
- **영향**: CSS `@import`는 렌더 블로킹. CSS 파싱 중 추가 네트워크 요청 발생 → 초기 렌더 지연
- **해결**: `@import` 제거 → index.html `<head>`에 `<link rel="preconnect">` + `<link rel="stylesheet">` 배치

#### P-11: setTimeout 하드코딩 (15+개)
- **현상**: `setTimeout(() => {...}, 500)`, `setTimeout(() => {...}, 2000)` 등 매직 넘버
- **영향**: CSS 애니메이션 duration과 동기화 안 됨. 변경 시 양쪽 모두 수정 필요
- **예시**:
  - index.html:5700 — `setTimeout(() => { toast.style.display = 'none'; }, 2500)`
  - index.html:6032 — `setTimeout(() => {...}, 2000)`

#### P-12: SVG 인라인 반복 (~50KB)
- **현상**: 동일 아이콘(뒤로가기 화살표, 알림 종, 네비게이션 아이콘 등)이 각 화면마다 전체 SVG 코드로 반복
- **영향**: HTML 크기 50KB 이상 증가
- **R-01 영향**: SVG 스프라이트로 전환 시, 추출 HTML에 `<svg><use href="#icon-xxx"/></svg>` 형태가 들어감 → 추출 시 스프라이트 정의도 함께 포함해야 개발자가 사용 가능

#### P-13: 동적 요소 생성에 cssText 사용
- **현상**: JS에서 `element.style.cssText = 'position:fixed;top:0;...'` 패턴으로 팝업/토스트 생성 (index.html:5900~6020)
- **영향**: 스타일 문자열이 JS 코드에 혼재

#### P-14: overview.html 미니맵 리렌더링 과다
- **현상**: `updateMinimap()` 함수가 매 줌/팬 이벤트마다 innerHTML로 전체 미니맵 재생성 (overview.html:998-1028)
- **영향**: 마우스 휠/드래그 시 매 프레임 75개 화면 dot DOM 재생성
- **해결**: 초기 렌더 1회 + viewport rect만 업데이트. 또는 `requestAnimationFrame` 스로틀

### 2.3 Overview 페이지 문제

#### P-15: 화면 카드 클릭 시 iframe으로 554KB 재로드
- **현상**: `openZoomIn()` → `iframe.src = 'index.html?screen=' + screenId` → 매 클릭마다 554KB 파일 재로드
- **이전 해결**: thumbs/ 폴더에 Puppeteer로 생성한 WebP 스크린샷 존재 → 카드 미리보기에 이미지 사용, 클릭 시에만 iframe 로드

#### P-16: 검색 기능 제한
- **현상**: 화면 이름/코드 텍스트 검색만 가능
- **부족한 점**: 역할별(ADM/CON/COMM/WEB) 필터, 상태별(기본/빈/로딩/완료/가로) 필터 없음

#### P-17: 컴포넌트 카탈로그 없음
- **현상**: 디자인 토큰(색상/폰트/간격) 탭은 있으나, 실제 컴포넌트(버튼/카드/뱃지 등)의 변형(variant) 시각화 부족
- **피그마 대비**: 피그마는 컴포넌트별 props/variant를 즉시 확인 가능

#### P-18: 플로우 인터랙션 부족
- **현상**: SVG 화살표로 화면 간 연결만 표시. 시나리오별 경로 하이라이트나 자동 재생 없음
- **피그마 대비**: 피그마 프로토타입은 화면 전환 시뮬레이션 가능

#### P-18a: 화살표(연결선) 가독성 부족
- **현상**: overview.html의 화면 간 연결 화살표가 읽기 어려움
- **구체적 문제**:
  1. **단일 색상/두께**: 모든 화살표가 `stroke:#333`, `stroke-width:1.2`로 동일. 90+개 화살표가 동일한 모습이라 어떤 흐름인지 구분 불가
  2. **L자 꺾임 경로**: 수평/수직으로만 꺾이는 L-shaped 경로 → 화살표가 겹치는 구간에서 어떤 선이 어디로 가는지 추적 불가
  3. **교차 시 구분 없음**: 화살표끼리 교차할 때 위/아래 구분 없이 그냥 겹침
  4. **카테고리 구분 없음**: ADM→ADM, CON→CON, ADM→COMM 등 모든 화살표가 같은 스타일
  5. **hover 상호작용 없음**: 카드에 마우스 올려도 연결된 화살표가 하이라이트 안 됨
- **현재 코드** (overview.html:854-924):
  ```javascript
  // 모든 화살표에 동일한 스타일
  el.setAttribute('stroke', '#333');
  el.setAttribute('stroke-width', '1.2');
  el.setAttribute('fill', 'none');
  ```
- **개선 방향**:
  1. **카테고리별 색상**: ADM 흐름=#FF6B6B(빨강), CON 흐름=#4ECDC4(민트), COMM 흐름=#FFE66D(노랑), 크로스 흐름=#888(회색)
  2. **Bezier 곡선**: L자 꺾임 → 부드러운 곡선 경로 (`C` 또는 `Q` SVG 커맨드). 겹침 감소
  3. **hover 하이라이트**: 화면 카드 hover 시 해당 카드의 연결선만 밝게, 나머지 흐리게
  4. **클릭 시 경로 추적**: 화살표 클릭 → from/to 화면 카드 동시 강조
  5. **겹침 방지**: 같은 경로 구간에 여러 화살표가 지나가면 오프셋 적용

#### P-19: descriptions 데이터 340줄 하드코딩
- **현상**: 75개 화면 설명이 overview.html JS 내 `descriptions` 객체에 340줄 하드코딩
- **영향**: 화면 설명 변경 시 overview.html을 직접 수정해야 함
- **해결**: P-07의 `screens-data.js` 통합 시 함께 이관

#### P-20: 카드 높이 하드코딩 객체
- **현상**: overview.html:812에 75개 화면의 카드 높이가 JSON 객체로 하드코딩
  ```javascript
  const cardHeights = {"adm-01-empty":346,"adm-01":346,...};
  ```
- **영향**: 화면 내용 변경 시 수동으로 높이 값 업데이트 필요
- **해결**: 썸네일 이미지 크기에서 동적 계산 또는 generate-thumbs.js에서 메타데이터 생성

#### P-21: HTML 추출 시 외부 CSS 미포함
- **현상**: `ziExtractHTML()` (overview.html:1078-1094)이 iframe 내부의 `<style>` 태그만 추출. 외부 `<link rel="stylesheet" href="styles.css">`의 내용은 포함 안 됨
- **영향**: 현재는 인라인 스타일이 많아서 문제 없지만, P-02 수정(인라인→CSS 클래스)을 하면 추출된 HTML이 스타일 없이 깨짐
- **해결**: `ziExtractHTML()` 수정 — styles.css fetch → 추출 HTML에 포함

### 2.4 접근성 문제 (뷰어 UI 한정, R-04 준수)

#### P-22: 뷰어 UI ARIA 레이블 부재
- **대상**: overview.html의 툴바, 검색, 줌 버튼, 사이드바 등 **뷰어 인터페이스**만 해당
- **참고**: index.html 내부 목업 화면의 ARIA는 디자인 충실도 문제이므로 대상 아님 (R-04)

#### P-23: 색상만 의존하는 상태 표시 (뷰어 UI)
- **현상**: overview.html의 카테고리 구분이 색상 점(legend-dot)으로만 표시
- **해결**: 색상 + 텍스트 라벨 병행 (현재도 텍스트 라벨 있으므로 경미)

### 2.5 보안/배포 문제

#### P-24: 접근 제어 없음
- **현상**: GitHub Pages에 그대로 노출. 누구나 URL 접근 가능
- **해결 방향**: 클라이언트 사이드 암호 잠금 (비밀번호 → 로딩 스피너 → 콘텐츠 표시)

### 2.6 코드 품질 문제

#### P-25: 전역 변수 오염
- **현상**: `go`, `btnSave`, `btnDl`, `btnCopyToast`, `showClipPopup`, `toggleFollowBtn` 등 모든 함수가 전역 스코프
- **제약**: `go()` 함수는 R-03(generate-thumbs.js)에서 직접 호출하므로 전역 유지 필요
- **해결**: `go()` 외 함수는 모듈 패턴(IIFE) 또는 app.js 내부로 격리

#### P-26: overview.html 자체 스타일 174줄 인라인
- **현상**: overview.html의 174줄 CSS가 `<style>` 태그에 전부 인라인
- **해결**: overview.css로 분리

### 2.7 UX 버그

#### P-27: 화면 간 이동 히스토리 없음
- **현상**: go() 함수로 화면 전환 시 브라우저 뒤로가기 불가
- **해결**: history.pushState 활용. URL hash 동기화 (`#adm-01`)

#### P-28: 터치 이벤트 불완전
- **현상**: shorts-clip에 mousedown/mouseup만 있고 touchstart/touchend 없음 (index.html:5802-5831)
- **영향**: 모바일에서 길게 눌러 선택 모드 진입 불가

#### P-29: 피드 댓글 바텀시트 닫기 누락
- **현상**: 댓글 바텀시트(feedCommentSheet) 열기만 있고 배경 클릭으로 닫는 핸들러 없음 (index.html:6143-6148)

### 2.8 네비게이션 누락/오류

#### P-30: 도달 불가 화면 (화면은 존재하지만 진입 경로 없음)

| 화면 ID | 화면 이름 | 문제 | 해결 |
|---------|-----------|------|------|
| `con-08` | 실시간 중계 (CON-17) | con-18(캡픽 관리)에서 `data-go="con-08"` 없음. overview connections에는 `['con-18','con-08']`로 연결 표시되어 있으나 **실제 HTML에 진입 버튼 없음** | con-18에 "실시간 중계" 버튼 추가 |
| `con-player` | 선수 상세 (CON-09) | con-07/con-07b 선수 그리드 클릭 시 `con-player`로 이동하지 않고 **CTA 구독 영역으로 스크롤**됨 (index.html:5437-5447). overview connections에는 `['con-07','con-player']`로 연결 표시 | 무료 선수에 대해서는 con-player로 이동하는 경로 추가. 유료 선수는 CTA 스크롤 유지 |
| `web-01` | 구장 경기 페이지 (WEB-01) | 앱 내부에서 web-01로 이동하는 `data-go` 없음. 독립 진입점(QR/공유 링크)이지만 **overview에서 클릭 외에는 도달 방법 없음** | URL 직접 접근용이므로 OK. 단, index.html 내에서 "웹으로 공유" 시 web-01 미리보기 연결 고려 |

#### P-31: 토스트만 표시하고 실제 페이지가 없는 버튼

| 버튼 텍스트 | 위치 | 토스트 메시지 | 필요한 페이지 |
|------------|------|--------------|--------------|
| "이 경기만 990원에 보기" | con-07 (2822줄), con-07b (2878줄) | '결제 페이지로 이동합니다' | 결제 화면 or con-subscribe 연결 |
| "구매하기" | con-purchase (4710줄) | '구매 페이지로 이동합니다' | 외부 구매 페이지 or 구매 확인 화면 |
| "카드 등록하기" | con-subscribe (4531줄) | '카드 등록 페이지로 이동합니다' | 카드 등록 화면 |
| "구독 시작하기" | con-subscribe (4526줄) | '구독이 완료되었습니다!' | 구독 완료 확인 화면 or 토스트 후 홈 이동 |
| "스트리밍 시작하기" | con-08 (4016줄) | '스트리밍이 시작되었습니다' | 스트리밍 진행 중 화면 (REC처럼) |
| "스티칭 개선하기" | con-18 (3883줄) | '스티칭 개선을 시작합니다' | 스티칭 진행 화면 or 상태 변경 |
| App Store / Play Store | web-02 (4309줄), web-02a (4361줄) | '앱 스토어로 이동합니다' | 외부 링크이므로 토스트 OK (프로토타입) |
| "계정 삭제" | con-pw-change (3807줄) | '설정 > 고객센터를 통해 요청' | 안내 문구이므로 토스트 OK |

**판단 기준**:
- "xxx 페이지로 이동합니다" 토스트 → **실제 페이지가 필요** (사용자가 화면 전환을 기대)
- "xxx 되었습니다" 토스트 → **결과 확인 화면 or 토스트 후 이동** 필요
- 외부 링크/기능 안내 → 토스트만으로 OK (프로토타입 범위)

#### P-32: overview.html connections와 실제 네비게이션 불일치

overview.html의 `connections[]` 배열에 다음 연결이 선언되어 있지만, 실제 index.html에는 해당 경로의 `data-go` 버튼이 없음:

| connections 선언 | overview 상 표시 | 실제 상태 |
|-----------------|-----------------|-----------|
| `['con-18','con-08']` | con-18 → con-08 화살표 표시 | con-18에 con-08로 가는 버튼 없음 |
| `['con-07','con-player']` | con-07 → con-player 화살표 | 클릭 시 CTA 스크롤만 됨 (이동 안 됨) |
| `['con-07b','con-player']` | con-07b → con-player 화살표 | 클릭 시 CTA 스크롤만 됨 (이동 안 됨) |

→ overview 흐름도에 표시된 화살표와 실제 앱 동작이 다름. **개발자가 이 흐름도를 보고 개발하면 실제와 다른 구현이 됨**.

### 2.9 generate-thumbs.js 문제

#### P-33: 에러 핸들링 부족
- **현상**: 개별 스크린샷 실패 시 콘솔 로그만 출력하고 계속 진행
- **해결**: 실패 목록 수집 → 종료 시 요약 출력 + 재시도 옵션

#### P-34: 가로 모드 화면 미지원
- **현상**: 모든 화면을 375×812 세로로 캡처. adm-03, adm-10l, con-10l은 가로 화면인데 세로로 찍힘
- **해결**: landscape 플래그 확인 → 812×375 뷰포트로 전환 후 캡처
- **참고**: overview.html `screens[]`에 `landscape:true` 플래그가 이미 존재하지만 generate-thumbs.js에서 미사용

---

## 3. 공용 컴포넌트 통합 계획

### 3.1 현재 중복 화면 패턴 분석

```
패턴 A: "리스트 + 빈 상태" (7쌍 = 14 화면)
├── adm-01 / adm-01-empty
├── adm-07 / adm-07-empty
├── adm-15 / adm-15-empty
├── con-04 / con-04-empty
├── con-06 / con-06-empty
├── con-18 / con-18-empty
└── con-archive / con-archive-empty

패턴 B: "영상 상세" (5 화면)
├── adm-08 / adm-08p (관리자)
├── con-07 / con-07b (소비자 학부모/일반)
└── con-player (선수 상세)

패턴 C: "가로 영상 플레이어" (3 화면, adm-10l과 con-10l은 100% 동일)
├── adm-03 (촬영 미리보기 — 고유 기능: REC 표시, 촬영 상태 서랍)
├── adm-10l (관리자 영상 플레이어) ─┬─ 통합 가능 (뒤로가기 목적지만 다름)
└── con-10l (소비자 영상 플레이어) ─┘

패턴 D: "진행 → 완료" (6 화면)
├── comm-upload-loading → comm-upload-done
├── comm-merge-loading → comm-merge-done
└── editor-loading → editor-3 / adm-13 → adm-14

패턴 E: "설정/프로필" (3 화면)
├── adm-settings
├── con-settings
└── con-my
```

### 3.2 추출할 공용 컴포넌트

| 컴포넌트 | 통합 대상 | 반복 횟수 | 예상 절감 |
|----------|-----------|-----------|-----------|
| **StatusBar** | 모든 화면 상단 `9:41 / LTE 100%` | 75회 | 75줄 → CSS 클래스만 |
| **TopBar** | 뒤로가기 + 제목 + 우측 버튼 | 54회 | 200+줄 → 공용 템플릿 |
| **BottomNav-ADM** | 홈/아카이브/일정/설정 (4탭) | ~10회 | 150줄 → 공용 1곳 |
| **BottomNav-CON** | 홈/탐색/피드/아카이브/마이 (5탭) | ~11회 | 200줄 → 공용 1곳 |
| **EmptyState** | 7쌍 빈 상태 화면 | 7회 | 화면당 50줄 → 5줄 호출 |
| **VideoPlayer** | 3개 가로 플레이어 | 3회 | 150줄 → 50줄 |
| **VideoDetail** | 5개 영상 상세 | 5회 | 500줄 → 100줄 + 역할 분기 |
| **ProgressFlow** | 6개 진행/완료 화면 | 6회 | 180줄 → 30줄 |
| **Toast** | 2곳 중복 함수 | 2회 | 20줄 → 10줄 |
| **Modal** | 10+곳 팝업 빌더 | 10+회 | 100줄 → 20줄 |
| **CheckboxToggle** | 3곳 중복 | 3회 | 50줄 → 15줄 |
| **TabSwitcher** | 4곳 탭 전환 | 4회 | 40줄 → 10줄 |
| **IconSprite** | 20+곳 SVG 반복 | 20+회 | ~50KB → ~5KB |

### 3.3 ADM/CON 공통 화면 통합 (P-05)

컴포넌트 단위가 아닌, **화면 자체**를 공유하는 계획.

#### 3.3.1 즉시 통합 (100% 동일)

**adm-10l + con-10l → 공용 `video-player-landscape`**

```
현재:
  adm-10l (110줄) — 뒤로: adm-08, ID접두사: adm
  con-10l (110줄) — 뒤로: con-07, ID접두사: con (없음)
  → 220줄, 차이: 뒤로가기 목적지 1곳 + 요소 ID 접두사

통합 후:
  공용 video-player (110줄) + data-back 속성으로 동적 분기
  go('video-player', { back: 'adm-08' })  ← 관리자에서 진입
  go('video-player', { back: 'con-07' })  ← 소비자에서 진입
```

구현:
- 기존 `adm-10l`, `con-10l` 두 화면 HTML 중 하나만 남기고 ID를 `video-player-l`로 변경
- `go()` 함수에서 진입 시 `data-back` 속성을 동적으로 설정
- overview.html `connections[]`에서 양쪽 연결 유지 (adm-08→video-player-l, con-07→video-player-l)
- overview.html `screens[]`에서 `shared:true` 플래그 추가 → 카테고리 색상을 공통(노랑)으로 표시

#### 3.3.2 부분 통합 (레이아웃 공유, 내용 분기)

| 화면 쌍 | 공통 부분 | 분기 부분 | 통합 방식 |
|---------|-----------|-----------|-----------|
| adm-08p + con-player | 선수 상세 레이아웃 (프로필+영상 그리드) | ADM: 이름 입력란, CON: 공유 QR 팝업 | 공용 HTML + `data-role="adm/con"` 분기 |
| adm-08 + con-07/07b | 영상 상세 (세션 태그+영상 목록) | CON: 구독 CTA + 페이드존, ADM: 다운로드 전체 | 공용 상단 + 하단 역할별 슬롯 |

#### 3.3.3 통합 시 overview.html 영향

- `screens[]` 배열에서 통합된 화면에 `shared:true` 추가
- 공통 화면 카드는 **양쪽 카테고리 연결선을 모두 표시** (ADM 빨강 + CON 민트 화살표가 같은 카드로 진입)
- overview에서 카테고리 색상: 공통 화면은 **테두리를 그라데이션** 또는 **COMM 노랑** 사용

### 3.4 유틸리티 함수 통합

```
app.js (또는 utils 섹션)
├── showToast(msg, duration?)
├── openModal(config), closeModal()
├── setupCheckboxes(container), toggleAll(container)
├── setupTabs(container, callback?)
├── btnSave(el), btnDl(el, popupId), btnShare(el)
└── go(screenId)  ← 전역 유지 (R-03 호환)
```

---

## 4. 로딩 + 암호 보호 시스템

### 4.1 개요
GitHub Pages로 배포 시, 클라이언트 사이드 암호 보호 + 로딩 화면 적용

### 4.2 동작 흐름
```
[접속] → [암호 입력 화면] → [암호 확인] → [로딩 스피너 (리소스 준비)] → [콘텐츠 표시]
```

### 4.3 구현 방식
1. **암호 입력 화면**: 전체 화면 오버레이. CAPP!C 로고 + 비밀번호 입력 필드
2. **암호 검증**: SHA-256 해시 비교 (평문 노출 방지, 완전한 보안은 아니지만 캐주얼 접근 차단)
3. **세션 유지**: `sessionStorage`에 인증 상태 저장 → 같은 탭에서 새로고침 시 재입력 불필요
4. **로딩 화면**: 스피너 애니메이션 + "화면을 준비하고 있어요..." 메시지
5. **로딩 완료**: 모든 리소스 로드 완료 후 fade-out → 메인 콘텐츠 fade-in

### 4.4 적용 대상
- index.html (앱 프리뷰)
- overview.html (화면 개요)
- 동일한 암호로 양쪽 모두 보호
- **주의**: index.html이 overview.html의 iframe으로 로드될 때는 암호 화면 표시하지 않음 (embed 모드 감지)

---

## 5. Overview 개선 계획

### 5.1 화살표(연결선) 가독성 개선 (P-18a)

현재 90+개 화살표가 모두 동일한 회색 L자 경로 → 흐름 추적 불가. 아래 개선 적용:

#### 5.1.1 카테고리별 색상 구분
```
ADM 내부 흐름:  stroke: #FF6B6B (빨강), opacity: 0.6
CON 내부 흐름:  stroke: #4ECDC4 (민트), opacity: 0.6
COMM 내부 흐름: stroke: #FFE66D (노랑), opacity: 0.6
WEB 내부 흐름:  stroke: #A78BFA (보라), opacity: 0.6
크로스 흐름:     stroke: #888 (회색), opacity: 0.4, stroke-dasharray: 6 3
```

화살표 색상 결정 로직:
```javascript
function getArrowColor(fromId, toId) {
  const fromCat = screens.find(s => s.id === fromId)?.cat;
  const toCat = screens.find(s => s.id === toId)?.cat;
  if (fromCat === toCat) return catColors[fromCat]; // 같은 카테고리
  return '#888'; // 크로스 흐름 (점선)
}
```

#### 5.1.2 경로 스타일 개선
- [ ] L자 꺾임 → **Bezier 곡선** (`Q` 또는 `C` SVG 커맨드) : 부드러운 곡선으로 겹침 감소
- [ ] 같은 구간에 여러 화살표 → **오프셋 적용** (겹치는 선을 5~10px 간격으로 분산)
- [ ] 화살표 머리(marker) 크기 확대: `markerWidth:6` → `markerWidth:8`, 색상도 카테고리 매칭
- [ ] 기본 두께: `stroke-width: 1.5` (현재 1.2에서 약간 증가)

#### 5.1.3 인터랙션
- [ ] **hover 하이라이트**: 화면 카드에 마우스 올리면 해당 카드의 연결선만 `opacity:1`, `stroke-width:2.5`로 강조. 나머지 화살표는 `opacity:0.1`로 흐리게
- [ ] **클릭 시 경로 추적**: 화살표 클릭 → from/to 화면 카드 동시 하이라이트
- [ ] **시나리오 경로 재생**: 특정 흐름(예: "관리자 녹화 흐름") 선택 시 해당 경로의 화살표만 순차적으로 밝아지는 애니메이션

#### 5.1.4 기타
- [ ] 화면 카드에 thumbs/ 이미지 표시 (기본 미리보기 — iframe은 클릭 시에만)
- [ ] 시나리오별 데모 모드: 자동 화면 전환 재생
  - 시나리오 예: "관리자 녹화 흐름", "소비자 가입 흐름", "하이라이트 제작 흐름"

### 5.2 필터/검색 강화
- [ ] 역할별 필터 버튼: ADM / CON / COMM / WEB (토글)
- [ ] 상태별 필터: 기본 / 빈 상태 / 로딩 / 완료 / 가로
- [ ] 태그 기반 검색 (화면 설명 내 키워드 포함)

### 5.3 컴포넌트 카탈로그 탭 추가
- [ ] 버튼 (Primary / Outline / Danger / Full)
- [ ] 카드 (기본 / 카메라 / 매치 / 아카이브)
- [ ] 뱃지 (Accent / Error / Success)
- [ ] 인풋 (기본 / 포커스 / 에러)
- [ ] 토글 스위치 (On / Off)
- [ ] 각 컴포넌트의 실제 렌더링 + CSS 변수 값 표시

### 5.4 기기 미리보기 강화
- [ ] 기존 프리셋(S24, iPhone15, Pro Max 등)을 카드 미리보기에도 적용
- [ ] 가로 모드 화면(adm-03, adm-10l, con-10l)은 가로 프레임으로 표시

### 5.5 HTML 추출 기능 강화
- [ ] 추출 HTML에 styles.css 내용 포함 (P-21 해결)
- [ ] 추출 HTML에 SVG 스프라이트 정의 포함 (P-12 전환 후)
- [ ] 추출 결과가 독립 실행 가능하도록 보장 (외부 의존 없음)
- [ ] 개발자가 복사 즉시 사용 가능한 완전한 HTML 파일 출력

---

## 6. 최적화 계획

### 6.1 파일 구조 개선

**원칙**: index.html의 화면 HTML은 단일 파일 유지 (R-01/R-02/R-03). JS와 CSS만 분리.

```
app-preview/
├── index.html              ← 75개 화면 HTML + 최소 <script src="app.js">
├── overview.html            ← 화면 개요 (+ <script src="screens-data.js">)
├── styles.css               ← 디자인 토큰 + 공용 스타일 + 유틸리티 클래스
├── overview.css              ← overview 전용 스타일 (P-26)
├── app.js                   ← index.html용 JS (네비게이션, 이벤트 위임, 유틸리티)
├── auth.js                  ← 암호 보호 모듈 (index.html + overview.html 공용)
├── screens-data.js          ← 화면 목록/설명/연결선/좌표 단일 소스 (P-07)
├── icon-sprite.svg          ← SVG 아이콘 스프라이트 (P-12)
├── generate-thumbs.js       ← Puppeteer 썸네일 (+ screens-data.js import)
├── thumbs/                  ← 스크린샷 이미지
└── .github/workflows/pages.yml
```

**변경 전후 비교**:
| 파일 | 현재 | 변경 후 |
|------|------|---------|
| index.html | 6,246줄 (HTML+CSS+JS) | ~5,200줄 (HTML만, JS/CSS 제거) |
| app.js | 없음 | ~800줄 (JS 로직) |
| styles.css | 500줄 | ~700줄 (유틸리티 클래스 추가) |
| overview.css | 없음 | ~180줄 |
| screens-data.js | 없음 | ~500줄 (화면 데이터 통합) |
| auth.js | 없음 | ~80줄 |
| icon-sprite.svg | 없음 | ~200줄 |

### 6.2 인라인 스타일 → CSS 클래스 전환

#### 사전 작업 (P-08 먼저 처리)
스타일 문자열 기반 셀렉터를 먼저 클래스/data 속성으로 교체:
```javascript
// 수정 전 (깨지기 쉬움)
screen.querySelector('button[style*="padding:8px 0"]')

// 수정 후
screen.querySelector('.profile-tab-grid')
```

#### 유틸리티 클래스 추가 (styles.css)
```css
/* 자주 반복되는 인라인 스타일을 유틸리티 클래스로 변환 */
.flex-center    { display:flex; align-items:center; justify-content:center; }
.flex-col       { display:flex; flex-direction:column; }
.flex-1         { flex:1; }
.gap-4          { gap:4px; }
.gap-8          { gap:8px; }
.gap-12         { gap:12px; }
.gap-16         { gap:16px; }
.p-16           { padding:0 16px; }
.mt-8           { margin-top:8px; }
.text-xs        { font-size:var(--text-xs); color:var(--color-text-secondary); }
.text-sm        { font-size:var(--text-sm); }
.text-muted     { color:var(--color-text-secondary); }
.text-center    { text-align:center; }
.cursor-pointer { cursor:pointer; }
.rounded-full   { border-radius:9999px; }
.w-full         { width:100%; }
/* ... 추가 필요 시 확장 */
```

#### 전환 규칙
- `font-size:11px; color:#757575;` → `class="text-xs text-muted"` (43곳)
- `style="flex:1;"` → `class="flex-1"` (65곳)
- `style="cursor:pointer;"` → `class="cursor-pointer"` (51곳)
- 복합 스타일은 의미 있는 컴포넌트 클래스명으로 추출

### 6.3 이벤트 핸들러 통합

```javascript
// 기존: 231개 인라인 onclick (index.html)
<button onclick="go('adm-01')">홈</button>
<button onclick="toggleFollowBtn(this)">팔로우</button>

// 개선: data-action 속성 + 이벤트 위임 (app.js)
<button data-go="adm-01">홈</button>
<button data-action="toggle-follow">팔로우</button>

// app.js
document.addEventListener('click', (e) => {
  const goEl = e.target.closest('[data-go]');
  if (goEl) { e.preventDefault(); go(goEl.dataset.go); return; }

  const action = e.target.closest('[data-action]');
  if (action) {
    const handler = actions[action.dataset.action];
    if (handler) handler(action, e);
  }
});
```

**overview.html도 동일 패턴 적용**:
```javascript
// 기존
onclick="switchMainTab('flow')"
onclick="zoomBy(-0.1)"

// 개선
data-action="switch-tab" data-tab="flow"
data-action="zoom" data-delta="-0.1"
```

### 6.4 SVG 아이콘 스프라이트

```html
<!-- icon-sprite.svg (index.html 상단에 인라인 포함) -->
<svg xmlns="http://www.w3.org/2000/svg" style="display:none">
  <symbol id="icon-back" viewBox="0 0 24 24">
    <path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="2" fill="none"/>
  </symbol>
  <symbol id="icon-bell" viewBox="0 0 24 24">
    <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>
    <path d="M13.73 21a2 2 0 01-3.46 0"/>
  </symbol>
  <!-- ... 20+ 아이콘 -->
</svg>

<!-- 사용 -->
<svg class="nav-icon"><use href="#icon-back"/></svg>
```

**R-01 호환**: SVG 스프라이트 정의가 index.html 내에 인라인이므로 `ziExtractHTML()`이 `<style>` 태그와 함께 스프라이트도 추출해야 함 → 추출 시 `<svg style="display:none">...</svg>` 블록 포함

### 6.5 애니메이션 최적화

```css
/* 기존 setTimeout → CSS 변수 + animationend 이벤트 */
:root {
  --toast-duration: 2500ms;
  --save-feedback-duration: 1500ms;
  --loading-min-duration: 2000ms;
}
```

```javascript
// 기존
setTimeout(() => { toast.style.display = 'none'; }, 2500);

// 개선
toast.addEventListener('animationend', () => { toast.style.display = 'none'; });
```

### 6.6 ziExtractHTML() 수정 (P-02/P-12 전환 후 필수)

```javascript
// 수정 후 ziExtractHTML
function ziExtractHTML() {
  if (!ziScreen) return;
  const card = document.getElementById('scard-' + ziScreen.id);
  const iframe = card ? card.querySelector('iframe') : null;
  if (!iframe) { showToast('프리뷰를 먼저 열어주세요'); return; }
  try {
    const doc = iframe.contentDocument;
    const el = doc.getElementById(ziScreen.id);
    if (!el) { showToast('화면을 찾을 수 없습니다'); return; }

    // 1. 인라인 <style> 수집
    let css = '';
    doc.querySelectorAll('style').forEach(s => css += s.textContent + '\n');

    // 2. 외부 styles.css 내용 수집 (P-21 해결)
    const extStyles = doc.querySelectorAll('link[rel="stylesheet"]');
    for (const link of extStyles) {
      try {
        const sheet = [...doc.styleSheets].find(s => s.href === link.href);
        if (sheet) {
          css += [...sheet.cssRules].map(r => r.cssText).join('\n') + '\n';
        }
      } catch(e) { /* cross-origin 무시 */ }
    }

    // 3. SVG 스프라이트 수집 (P-12 전환 후)
    const sprite = doc.querySelector('svg[style*="display:none"]');
    const spriteHTML = sprite ? sprite.outerHTML + '\n' : '';

    // 4. 완전한 HTML 생성
    const code = `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${ziScreen.code} ${ziScreen.name}</title>
<style>
${css}
#${ziScreen.id}{display:flex!important;}
.screen-content{display:none;}
</style>
</head>
<body>
${spriteHTML}${el.outerHTML}
</body>
</html>`;

    document.getElementById('codeContent').textContent = code;
    document.getElementById('codeModalTitle').textContent = `${ziScreen.code} ${ziScreen.name}`;
    document.getElementById('codeModal').classList.add('show');
  } catch(e) { showToast('HTML 추출 실패 (GitHub Pages에서 실행해주세요)'); }
}
```

---

## 7. 테스트/검증 전략

### 7.1 Visual Regression (스크린샷 비교)

리팩토링 전후 75개 화면의 렌더링이 동일한지 검증.

#### 절차
1. **기준 스크린샷 저장**: 리팩토링 시작 전 `generate-thumbs.js` 실행 → `thumbs/` 폴더에 75개 WebP 저장
2. **기준 백업**: `thumbs/` → `thumbs-baseline/`로 복사
3. **리팩토링 진행**
4. **비교 스크린샷 생성**: 다시 `generate-thumbs.js` 실행
5. **차이 비교**: 파일 크기 또는 픽셀 비교로 변경 감지

#### generate-thumbs.js 개선 (P-30, P-31)
- 실패 목록 수집 → 종료 시 요약 출력 + 재시도 옵션
- `landscape:true` 화면은 812×375 뷰포트로 전환 후 캡처
- screens-data.js에서 화면 목록 + landscape 플래그 import

### 7.2 Phase별 검증 체크리스트

| Phase | 검증 항목 |
|-------|-----------|
| Phase 0 | 암호 입력 → 로딩 → 콘텐츠 표시. iframe 로드 시 암호 미표시 |
| Phase 1 | 75개 화면 스크린샷 비교. HTML 추출 기능 정상 동작 |
| Phase 2 | 공용 컴포넌트 적용 화면 스크린샷 비교. 공통 화면(video-player-l) 양쪽 진입 정상 동작. 이벤트 동작 확인 |
| Phase 3 | 화살표 카테고리별 색상 구분. hover 하이라이트. overview 필터/검색 동작. 시나리오 재생 동작 |
| Phase 4 | setTimeout 제거 후 애니메이션 타이밍 확인 |
| Phase 5 | 모든 버튼에서 실제 페이지 도달 확인. overview connections과 실제 네비게이션 일치 확인. 터치 이벤트, 바텀시트 닫기 동작 확인 |

---

## 8. 개발 계획 (Phase별)

### Phase 0: 암호 보호 + 로딩 시스템 (독립 — 먼저 진행)
> 다른 Phase와 의존 관계 없음. 즉시 착수 가능.

- [ ] auth.js 구현 (SHA-256 해시 비교, sessionStorage 세션 유지)
- [ ] 로딩 화면 구현 (CAPP!C 로고 + 스피너)
- [ ] index.html, overview.html 양쪽 적용
- [ ] embed 모드 감지 (iframe 로드 시 암호 미표시)
- [ ] 동작: 암호 입력 → 확인 → 스피너 → 콘텐츠 노출

### Phase 1: 기반 정비 + JS 분리 (핵심)
> P-02, P-03, P-06, P-08, P-10, P-12, P-13, P-25, P-26 해결
> **순서 중요**: P-08(셀렉터 교체) → P-02(인라인 스타일) → P-03(onclick) → 나머지

1. [ ] **사전 작업** P-08: 스타일 문자열 기반 셀렉터 → 클래스/data 속성 교체
2. [ ] P-10: `@import url(...)` → `<link rel="preconnect">` + `<link rel="stylesheet">`
3. [ ] P-02 + P-06: 인라인 스타일 700+개 → CSS 유틸리티 클래스 + 디자인 토큰 전환
4. [ ] P-12: SVG 아이콘 → index.html 상단 인라인 스프라이트 + `<use>` 패턴
5. [ ] P-13: 동적 요소 cssText → CSS 클래스 전환
6. [ ] P-03: 인라인 onclick → data-action 이벤트 위임 (index.html + overview.html 양쪽)
7. [ ] P-25: JS 로직을 app.js로 분리 (go() 전역 유지). 모듈 패턴 적용
8. [ ] P-26: overview.html CSS를 overview.css로 분리
9. [ ] **P-21: ziExtractHTML() 수정** — styles.css + SVG 스프라이트 포함 (6.6절 참고)
10. [ ] **검증**: 75개 화면 스크린샷 비교 + HTML 추출 기능 정상 동작 확인

### Phase 2: 공용 컴포넌트 + 데이터 통합 + 공통 화면
> P-04, P-05, P-07, P-19, P-20 해결

1. [ ] P-07: screens-data.js 생성 (화면 목록 + 설명 + 연결선 + 좌표 + 높이 통합)
2. [ ] overview.html, generate-thumbs.js에서 screens-data.js import
3. [ ] **P-05: ADM/CON 공통 화면 통합** (3.3절 참고):
   - adm-10l + con-10l → 공용 `video-player-l` (즉시 통합, 110줄 절감)
   - adm-08p + con-player → 공용 선수 상세 (data-role 분기)
   - overview.html connections[] 및 screens[] 업데이트 (shared 플래그)
4. [ ] 공용 컴포넌트 CSS 추출:
   - StatusBar (75회 → CSS 클래스)
   - TopBar (54회 → 공용 패턴)
   - BottomNav-ADM / BottomNav-CON (21회 → 2종류 공용)
   - EmptyState (7쌍)
   - VideoPlayer (가로 공용 1개로 통합)
   - VideoDetail (5화면)
   - ProgressFlow (6화면)
5. [ ] 유틸리티 함수 통합 (Toast, Modal, Toggle, Tabs, ButtonFeedback)
6. [ ] P-04: 코드 중복 제거
7. [ ] P-20: 카드 높이 → generate-thumbs.js에서 메타데이터 자동 생성 or 이미지 크기 기반
8. [ ] **검증**: 스크린샷 비교 + HTML 추출 정상 동작 + 공통 화면 양쪽 진입 테스트

### Phase 3: Overview 개선 + 화살표 가독성
> P-14, P-15, P-16, P-17, P-18, P-18a, P-22 해결

1. [ ] **P-18a: 화살표 가독성 개선** (5.1절 참고):
   - 카테고리별 색상 분류 (ADM 빨강, CON 민트, COMM 노랑, 크로스 점선)
   - L자 꺾임 → Bezier 곡선 전환
   - 겹침 방지 오프셋
   - hover 하이라이트 (카드 hover → 연결 화살표만 강조, 나머지 흐리게)
   - 클릭 시 from/to 카드 동시 강조
   - 공통 화면(shared)으로 들어오는 화살표는 양쪽 카테고리 색상 표시
2. [ ] P-15: 카드에 thumbs/ WebP 이미지 표시 (기본 미리보기)
3. [ ] P-16: 역할별/상태별 필터 추가
4. [ ] P-17: 컴포넌트 카탈로그 탭 추가
5. [ ] P-18: 시나리오별 플로우 하이라이트 + 데모 모드
6. [ ] P-14: 미니맵 렌더링 최적화 (rAF 스로틀)
7. [ ] P-22: overview 뷰어 UI에 ARIA 레이블 추가
8. [ ] HTML 추출 기능 강화 (5.5절)

### Phase 4: 성능 최적화
> P-05, P-09, P-11 해결

1. [ ] P-09: 로딩 스피너가 리소스 로드 완료를 정확히 감지
2. [ ] P-05: DOM 쿼리 캐싱 (자주 참조되는 요소를 변수에 저장)
3. [ ] P-11: setTimeout → CSS 변수 + animationend 이벤트
4. [ ] overview.html 성능 최적화 (미니맵, 화살표 렌더링)

### Phase 5: 네비게이션 수정 + UX 버그 + generate-thumbs 개선
> P-27, P-28, P-29, P-30, P-31, P-32, P-33, P-34 해결

1. [ ] **P-30: 도달 불가 화면 수정**:
   - con-18에 "실시간 중계" 버튼 추가 → con-08 진입
   - con-07/con-07b 선수 그리드에 con-player 진입 경로 추가
2. [ ] **P-31: 토스트→실제 페이지 연결**:
   - "결제 페이지로 이동" → con-subscribe 연결 또는 결제 화면 신규
   - "구매 페이지로 이동" → 구매 확인 화면 신규 또는 외부 링크 안내
   - "카드 등록 페이지로 이동" → 카드 등록 화면 신규 또는 토스트 후 이동
   - "구독이 완료되었습니다!" → 토스트 후 con-04(홈) 이동
   - "스트리밍이 시작되었습니다" → 진행 중 상태 전환 또는 화면 신규
3. [ ] **P-32: overview connections 불일치 수정** — P-30 수정 후 실제 네비게이션과 일치하도록 connections[] 업데이트
4. [ ] P-27: history.pushState + URL hash 동기화
5. [ ] P-28: shorts-clip 터치 이벤트 보완
6. [ ] P-29: 바텀시트 닫기 핸들러 추가
7. [ ] P-33: generate-thumbs.js 에러 핸들링 + 재시도
8. [ ] P-34: 가로 모드 화면 캡처 지원

---

## 9. Phase 의존 관계

```
Phase 0 (암호+로딩) ──────────────────── 독립, 먼저 진행
                                          │
Phase 1 (기반 정비 + JS 분리) ◄───────── Phase 0 완료 후
    │
    ├─► Phase 2 (공용 컴포넌트 + 데이터) ◄── Phase 1의 CSS 클래스 확정 후
    │       │
    │       └─► Phase 3 (Overview 개선) ◄── screens-data.js 확정 후
    │
    └─► Phase 4 (성능 최적화) ◄──────────── Phase 1의 JS 분리 후
            │
            └─► Phase 5 (UX 버그) ◄──────── 언제든 가능 (독립적)
```

**핵심 의존**: Phase 1에서 인라인 스타일 → CSS 클래스 전환이 완료되어야 Phase 2의 공용 컴포넌트 추출이 의미 있음. 인라인 스타일이 남아있으면 공용 클래스를 만들어도 적용할 수 없음.

---

## 10. 예상 결과

| 지표 | 현재 | 개선 후 |
|------|------|---------|
| index.html 크기 | 554KB (HTML+CSS+JS) | ~350KB (HTML만, 인라인 제거 + SVG 스프라이트) |
| app.js | 없음 | ~800줄 (JS 로직 분리) |
| styles.css | 500줄 | ~700줄 (유틸리티 클래스 추가) |
| 인라인 스타일 | 700+ | 0 (CSS 클래스) |
| 인라인 onclick | 231 (index) + 다수 (overview) | 0 (이벤트 위임) |
| 코드 중복 | 50+곳 | 공용 컴포넌트 13개로 통합 |
| SVG 반복 | ~50KB | ~5KB (스프라이트) |
| 전역 함수 | 20+ | go() 1개만 전역, 나머지 모듈 격리 |
| 화면 데이터 관리 | 3곳 중복 | screens-data.js 단일 소스 |
| 초기 로딩 | 554KB 즉시 파싱 | 암호 → 스피너 → 콘텐츠 |
| 접근 보호 | 없음 | SHA-256 암호 잠금 |
| HTML 추출 | 인라인 <style>만 포함 | styles.css + SVG 스프라이트 포함 (완전한 독립 HTML) |
| ADM/CON 공통 화면 | 중복 화면 유지 (adm-10l + con-10l 등) | 공용 화면 통합 (110줄+ 절감, data-back 분기) |
| overview 화살표 | 단일 색상/L자 꺾임/90+개 동일 | 카테고리별 색상 + Bezier 곡선 + hover 하이라이트 |
| 테스트 | 없음 | 스크린샷 비교 기반 visual regression |

---

## 11. 삭제된 항목 (v1 대비)

이전 버전(v1)에서 포함되었으나 점검 후 불필요하여 삭제한 항목:

| 삭제 항목 | 삭제 이유 |
|-----------|-----------|
| P-16(v1): 최소 폰트 크기 12px 보장 | 앱 디자인 목업의 의도된 폰트 크기. 변경 시 디자인 충실도 파괴 (R-04) |
| P-24(v1): 다크모드 전환 | overview(디자인 도구)=다크, index(앱 디자인)=라이트는 용도가 다름. 통일 불필요 |
| P-28(v1): Web Share API | 프로토타입 공유 버튼은 시연용 목업. 실제 공유 기능은 범위 밖 |
| P-19(v1): 연락처 config 분리 | 목업 데이터(`052-1234-5678`). 변경 빈도 극히 낮아 over-engineering |
| P-21(v1): html2canvas 로컬 번들링 | GitHub Pages 전용(항상 온라인). CDN 충분 |
| Phase 3(v1): 75개 파일 분리 | R-01(HTML 추출), R-02(iframe 연동), R-03(thumbs 호환) 전부 파괴. 빌드 도구 없이 비현실적 |

---

## 12. 비고

- 이 문서는 코드 수정 전 검증용 체크리스트로 사용
- 모든 Phase에서 R-01~R-05 제약조건 준수 여부 확인 필수
- 모든 Phase에서 인라인 스타일 사용 금지 (반응형 CSS 클래스로 근본 해결)
- P 번호는 v2 기준으로 재정렬됨. v1 번호와 다르므로 주의
