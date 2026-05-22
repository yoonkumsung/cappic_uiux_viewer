# Cappic 개발 스펙 문서

> 버전: 1.0
> 작성일: 2026-05-17
> 기기 기준: Galaxy S24 (360 x 780 CSS px)
> 폰트: Pretendard
> 색상 기반: 흰색 + 검정색, 포인트 컬러 #2AC1BC

---

## 1. 디자인 시스템 스펙

### 1.1 색상 체계

#### 1.1.1 코어 색상

| CSS 변수 | HEX 값 | 용도 |
|----------|--------|------|
| `--color-white` | `#FFFFFF` | 기본 배경, 카드 배경 |
| `--color-black` | `#000000` | 폰 프레임, 최대 대비 텍스트 |
| `--color-accent` | `#2AC1BC` | 포인트 컬러 (배민 형광초록/민트). 주요 버튼, 활성 탭, 링크 |
| `--color-accent-light` | `#E8F8F7` | accent 10% opacity. 뱃지 배경, 태그 배경 |
| `--color-accent-dark` | `#1E9A96` | accent pressed 상태. 버튼 호버/눌림 |

#### 1.1.2 그레이스케일

| CSS 변수 | HEX 값 | 용도 |
|----------|--------|------|
| `--color-gray-50` | `#FAFAFA` | 서피스 배경, list-item active 배경 |
| `--color-gray-100` | `#F5F5F5` | secondary 버튼 배경, chip 기본 배경, skeleton 밝은 부분 |
| `--color-gray-200` | `#EEEEEE` | 보더, 프로그레스 바 트랙, avatar 기본 배경, skeleton 어두운 부분, 썸네일 기본 배경 |
| `--color-gray-300` | `#E0E0E0` | status-dot off 상태, empty-state 아이콘, flow-arrow 색상 |
| `--color-gray-400` | `#BDBDBD` | tertiary 텍스트, placeholder 텍스트 |
| `--color-gray-500` | `#9E9E9E` | (예비) |
| `--color-gray-600` | `#757575` | secondary 텍스트 |
| `--color-gray-700` | `#616161` | (예비) |
| `--color-gray-800` | `#424242` | (예비) |
| `--color-gray-900` | `#212121` | primary 텍스트, toast 배경, video-card 배경 |

#### 1.1.3 시맨틱 색상

| CSS 변수 | 실제 값 | 용도 |
|----------|---------|------|
| `--color-background` | `var(--color-white)` = `#FFFFFF` | 페이지 배경 |
| `--color-surface` | `var(--color-gray-50)` = `#FAFAFA` | 카드 영역, 리스트 배경 |
| `--color-text-primary` | `var(--color-gray-900)` = `#212121` | 본문 텍스트, 제목 |
| `--color-text-secondary` | `var(--color-gray-600)` = `#757575` | 보조 텍스트, section header |
| `--color-text-tertiary` | `var(--color-gray-400)` = `#BDBDBD` | 비활성 탭 텍스트, placeholder |
| `--color-text-inverse` | `var(--color-white)` = `#FFFFFF` | 다크 배경 위 텍스트 |
| `--color-border` | `var(--color-gray-200)` = `#EEEEEE` | 카드/입력/탭 보더 |
| `--color-divider` | `var(--color-gray-100)` = `#F5F5F5` | 구분선 |
| `--color-error` | `#EF4444` | 에러 뱃지, danger 버튼, rec-dot |
| `--color-success` | `#10B981` | 성공 뱃지, status-dot ok |
| `--color-warning` | `#F59E0B` | status-dot warn |

#### 1.1.4 뱃지 전용 색상

| 뱃지 클래스 | 배경색 | 텍스트색 |
|------------|--------|----------|
| `.badge-accent` | `#E8F8F7` | `#1E9A96` |
| `.badge-error` | `#FEE2E2` | `#EF4444` |
| `.badge-success` | `#D1FAE5` | `#10B981` |

---

### 1.2 타이포그래피 스케일

폰트 패밀리: `'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`

CDN: `https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css`

#### 1.2.1 크기 스케일

| CSS 변수 | 값 | 용도 |
|----------|-----|------|
| `--text-xs` | `11px` | 뱃지, section header, thumb-cell-label, 상태바 시간, nav-item 라벨 |
| `--text-sm` | `13px` | 보조 텍스트, empty-state 설명, chip, tab-item, toast, phone-label |
| `--text-base` | `15px` | 본문 텍스트, 버튼 기본, 입력 필드 |
| `--text-lg` | `17px` | top-bar 타이틀, avatar-lg 폰트, btn-lg 폰트, empty-state 타이틀 |
| `--text-xl` | `20px` | top-bar-back 아이콘 크기 |
| `--text-2xl` | `24px` | video-card 재생 아이콘 |
| `--text-3xl` | `28px` | (예비, 대형 헤딩) |

#### 1.2.2 두께 스케일

| CSS 변수 | 값 | 용도 |
|----------|-----|------|
| `--font-regular` | `400` | 본문 텍스트, 입력 필드 |
| `--font-medium` | `500` | 뱃지, chip, toast, tab-item 기본, video-card-badge |
| `--font-semibold` | `600` | 버튼, section header, avatar, empty-state 타이틀, phone-label, 상태바, nav-item active, thumb-cell-label |
| `--font-bold` | `700` | top-bar 타이틀, tab-item active, desc-panel 타이틀 |

#### 1.2.3 행간 스케일

| CSS 변수 | 값 | 용도 |
|----------|-----|------|
| `--leading-tight` | `1.3` | 제목, 뱃지 등 단일 라인 |
| `--leading-normal` | `1.5` | 본문 텍스트 (body 기본값) |
| `--leading-relaxed` | `1.7` | 긴 설명 텍스트 |

#### 1.2.4 용도별 타이포그래피 조합

| 용도 | 크기 | 두께 | 행간 |
|------|------|------|------|
| 화면 제목 (top-bar-title) | 17px | 700 | 1.3 |
| 섹션 헤더 (section-header) | 13px | 600 | 1.5 |
| 본문 텍스트 | 15px | 400 | 1.5 |
| 버튼 텍스트 | 15px | 600 | 1.3 |
| 대형 버튼 텍스트 | 17px | 600 | 1.3 |
| 뱃지/태그 | 11px | 500 | 1.3 |
| 보조 텍스트 | 13px | 400 | 1.5 |
| 플레이스홀더 | 15px | 400 | 1.5 |
| 하단 네비게이션 라벨 | 10px | 400 (기본), 600 (active) | 1.3 |
| 썸네일 라벨 | 10px | 600 | 1.3 |

---

### 1.3 간격 시스템 (4px 기반)

| CSS 변수 | 값 | 배수 | 주요 사용처 |
|----------|-----|------|------------|
| `--space-1` | `4px` | 1x | chip 수직 패딩, gap 최소 단위 |
| `--space-2` | `8px` | 2x | 작은 마진/갭, video-card-badge 위치, badge 수평 패딩 |
| `--space-3` | `12px` | 3x | list-item 수직 패딩, list-item 갭, chip 수평 패딩, top-bar 갭, tab-item 수직 패딩, empty-state 갭, toast 수직 패딩 |
| `--space-4` | `16px` | 4x | card-body 패딩, 입력 수평 패딩, top-bar 수평 패딩, list-item 수평 패딩, section-header 패딩, thumb-grid 수평 패딩, divider 마진 |
| `--space-5` | `20px` | 5x | 버튼 수평 패딩, toast 수평 패딩 |
| `--space-6` | `24px` | 6x | desc-panel 패딩, empty-state 수평 패딩 |
| `--space-8` | `32px` | 8x | (예비) |
| `--space-10` | `40px` | 10x | (예비) |
| `--space-12` | `48px` | 12x | empty-state 수직 패딩 |
| `--space-16` | `64px` | 16x | canvas-inner 패딩 |

---

### 1.4 Border Radius 체계

| CSS 변수 | 값 | 용도 |
|----------|-----|------|
| `--radius-sm` | `6px` | skeleton, thumb-cell, thumb-cell-label, video-card-badge |
| `--radius-md` | `12px` | 버튼 기본, 카드, 입력 필드, video-card, avatar-square, tab-bar |
| `--radius-lg` | `16px` | btn-lg |
| `--radius-xl` | `24px` | (예비, 모달 등) |
| `--radius-full` | `9999px` | 뱃지, chip, 프로그레스 바, toast, avatar 원형, status-dot, rec-dot |
| `--phone-radius` | `32px` | 폰 프레임 외곽 |

---

### 1.5 그림자 체계

| CSS 변수 | 값 | 용도 |
|----------|-----|------|
| `--shadow-sm` | `0 1px 2px rgba(0, 0, 0, 0.05)` | 작은 요소 (chip, badge) |
| `--shadow-md` | `0 4px 12px rgba(0, 0, 0, 0.08)` | 카드, 드롭다운 |
| `--shadow-lg` | `0 8px 24px rgba(0, 0, 0, 0.12)` | 폰 프레임, toast, 모달 |

폰 프레임 hover 시: `0 12px 32px rgba(0, 0, 0, 0.18)`

폰 프레임 active 시: `0 0 0 3px var(--color-accent), var(--shadow-lg)` (accent 아웃라인 + 기존 그림자)

---

### 1.6 터치 타겟 최소 크기

| CSS 변수 | 값 | 적용 요소 |
|----------|-----|----------|
| `--touch-min` | `44px` | 버튼 높이, 입력 높이, nav-item 최소 크기, top-bar-back 크기, list-item 최소 높이 |

모든 인터랙티브 요소는 최소 44x44px (약 9~12mm) 터치 영역을 확보해야 한다. 인접 요소 간 최소 5mm 이상의 간격을 유지한다.

---

### 1.7 Z-Index 스케일

| CSS 변수 | 값 | 용도 |
|----------|-----|------|
| `--z-base` | `0` | 일반 콘텐츠 |
| `--z-sticky` | `100` | desc-panel, 고정 헤더 |
| `--z-modal` | `200` | 모달, 다이얼로그 |
| `--z-toast` | `300` | 토스트 알림 |
| `--z-tooltip` | `400` | 툴팁 |

---

## 2. 컴포넌트 스펙

### 2.1 Button (`.btn`)

**용도**: 사용자 액션 트리거. 녹화 시작/중지, 저장, 이동 등 모든 주요 인터랙션에 사용.

**기본 사양 (`.btn`)**:
- 높이: `44px` (--touch-min)
- 수평 패딩: `20px` (--space-5)
- border-radius: `12px` (--radius-md)
- 폰트: `15px` (--text-base), `600` (--font-semibold)
- display: `inline-flex`, align-items/justify-content: `center`
- gap: `8px` (--space-2) -- 아이콘 + 텍스트 간격
- border: `none`
- cursor: `pointer`
- transition: `all 150ms cubic-bezier(0.4, 0, 0.2, 1)` (--duration-fast, --ease-standard)
- `-webkit-tap-highlight-color: transparent`

**상태별 스타일**:

| 상태 | 변화 |
|------|------|
| default | variant별 배경/텍스트 색상 |
| hover | variant별 배경 색상 변경 |
| active | `transform: scale(0.97)`, `opacity: 0.9` |
| disabled | (CSS에 미정의 -- 권장: `opacity: 0.5`, `cursor: not-allowed`, `pointer-events: none`) |

**Variant별 스타일**:

| 클래스 | 배경 | 텍스트 | hover 배경 |
|--------|------|--------|-----------|
| `.btn-primary` | `#2AC1BC` (--color-accent) | `#FFFFFF` (--color-white) | `#1E9A96` (--color-accent-dark) |
| `.btn-secondary` | `#F5F5F5` (--color-gray-100) | `#212121` (--color-text-primary) | (미정의 -- 권장: `#EEEEEE`) |
| `.btn-outline` | `transparent` | `#212121` (--color-text-primary) | (미정의 -- 권장: `#FAFAFA`) |
| `.btn-danger` | `#EF4444` (--color-error) | `#FFFFFF` (--color-white) | (미정의 -- 권장: `#DC2626`) |

**크기 변형**:

| 클래스 | 변경 사항 |
|--------|----------|
| `.btn-full` | `width: 100%` |
| `.btn-lg` | 높이: `52px`, 폰트: `17px` (--text-lg), border-radius: `16px` (--radius-lg) |

**접근성 고려사항**:
- 반드시 의미 있는 텍스트 또는 `aria-label` 제공
- 아이콘만 있는 버튼은 `aria-label` 필수
- disabled 상태에서 `aria-disabled="true"` 설정
- 포커스 시 visible outline 표시 (keyboard navigation)

---

### 2.2 Card (`.card`)

**용도**: 카메라 정보, 경기 정보, 영상 목록 등 관련 콘텐츠를 그룹화하는 컨테이너.

**사양**:
- 배경: `#FFFFFF` (--color-white)
- border-radius: `12px` (--radius-md)
- border: `1px solid #EEEEEE` (--color-border)
- overflow: `hidden`
- transition: `all 150ms cubic-bezier(0.4, 0, 0.2, 1)`

**하위 요소**:
- `.card-body`: padding `16px` (--space-4)

**상태별 스타일**:

| 상태 | 변화 |
|------|------|
| default | 위 사양 그대로 |
| active (터치) | `transform: scale(0.98)` |

**접근성 고려사항**:
- 카드가 클릭 가능할 경우 `role="button"` 또는 `<a>` 태그 사용
- 카드 내부 콘텐츠에 적절한 heading 계층 유지

---

### 2.3 Input (`.input`)

**용도**: 텍스트 입력. 카메라 이름 변경, 코드 입력, 검색, ReID 설정값 입력 등.

**사양**:
- width: `100%`
- 높이: `44px` (--touch-min)
- 수평 패딩: `16px` (--space-4)
- border: `1px solid #EEEEEE` (--color-border)
- border-radius: `12px` (--radius-md)
- 폰트: `15px` (--text-base), `400` (--font-regular)
- 배경: `#FFFFFF` (--color-white)
- 텍스트 색상: `#212121` (--color-text-primary)
- outline: `none`
- transition: `border-color 150ms cubic-bezier(0.4, 0, 0.2, 1)`

**상태별 스타일**:

| 상태 | 변화 |
|------|------|
| default | border: `#EEEEEE` |
| focus | border-color: `#2AC1BC` (--color-accent) |
| placeholder | 텍스트 색상: `#BDBDBD` (--color-text-tertiary) |
| disabled | (미정의 -- 권장: `background: #F5F5F5`, `opacity: 0.6`) |

**접근성 고려사항**:
- 반드시 `<label>` 또는 `aria-label` 연결
- 에러 상태 시 `aria-invalid="true"` + `aria-describedby` 연결

---

### 2.4 Badge (`.badge`)

**용도**: 상태 라벨 표시. 녹화 상태, 업로드 상태, ReID 결과 상태 등.

**사양**:
- display: `inline-flex`, align-items: `center`
- padding: `2px 8px`
- border-radius: `9999px` (--radius-full)
- 폰트: `11px` (--text-xs), `500` (--font-medium)

**Variant별 스타일**:

| 클래스 | 배경 | 텍스트 |
|--------|------|--------|
| `.badge-accent` | `#E8F8F7` | `#1E9A96` |
| `.badge-error` | `#FEE2E2` | `#EF4444` |
| `.badge-success` | `#D1FAE5` | `#10B981` |

**접근성 고려사항**:
- 색상만으로 상태를 전달하지 않고, 텍스트로도 상태를 명시

---

### 2.5 Status Dot (`.status-dot`)

**용도**: 카메라/서비스 연결 상태를 색상 도트로 표시.

**사양**:
- width: `8px`, height: `8px`
- border-radius: `50%`
- display: `inline-block`

**Variant별 스타일**:

| 클래스 | 배경색 | 의미 |
|--------|--------|------|
| `.status-dot-ok` | `#10B981` (--color-success) | 정상 |
| `.status-dot-warn` | `#F59E0B` (--color-warning) | 주의 |
| `.status-dot-error` | `#EF4444` (--color-error) | 오류 |
| `.status-dot-off` | `#E0E0E0` (--color-gray-300) | 꺼짐/미연결 |

**접근성 고려사항**:
- `aria-label`로 상태 텍스트 제공 (예: `aria-label="정상"`)
- 색상 외에 인접 텍스트로 상태 설명 병기

---

### 2.6 List Item (`.list-item`)

**용도**: 카메라 목록, 경기 목록, ReID 세션 목록 등 리스트 형태의 반복 항목.

**사양**:
- display: `flex`, align-items: `center`
- gap: `12px` (--space-3)
- padding: `12px 16px` (--space-3 수직, --space-4 수평)
- min-height: `44px` (--touch-min)
- cursor: `pointer`
- transition: `background 150ms cubic-bezier(0.4, 0, 0.2, 1)`

**상태별 스타일**:

| 상태 | 변화 |
|------|------|
| default | 투명 배경 |
| active | background: `#FAFAFA` (--color-gray-50) |

**접근성 고려사항**:
- 리스트는 `<ul>/<li>` 또는 `role="list"` / `role="listitem"` 사용
- 클릭 가능한 항목은 `role="button"` 또는 `<a>` 사용

---

### 2.7 Avatar (`.avatar`)

**용도**: 카메라 아이콘, 사용자 프로필, 선수 썸네일 등 원형/사각형 이미지 표시.

**기본 사양 (`.avatar`)**:
- width: `40px`, height: `40px`
- border-radius: `50%`
- 배경: `#EEEEEE` (--color-gray-200)
- display: `flex`, align-items/justify-content: `center`
- 폰트: `13px` (--text-sm), `600` (--font-semibold)
- 텍스트 색상: `#757575` (--color-text-secondary)
- overflow: `hidden`
- flex-shrink: `0`

**Variant별 스타일**:

| 클래스 | 변경 사항 |
|--------|----------|
| `.avatar-lg` | width/height: `56px`, 폰트: `17px` (--text-lg) |
| `.avatar-square` | border-radius: `12px` (--radius-md) |

**접근성 고려사항**:
- 이미지가 있을 경우 `alt` 텍스트 제공
- 텍스트 폴백 시 의미 있는 이니셜 표시

---

### 2.8 Progress Bar (`.progress`)

**용도**: 업로드 진행률, ReID 렌더 진행률, 배터리/저장공간 표시.

**트랙 사양 (`.progress`)**:
- width: `100%`
- height: `4px`
- 배경: `#EEEEEE` (--color-gray-200)
- border-radius: `9999px` (--radius-full)
- overflow: `hidden`

**필 사양 (`.progress-fill`)**:
- height: `100%`
- 배경: `#2AC1BC` (--color-accent)
- border-radius: `9999px` (--radius-full)
- transition: `width 350ms cubic-bezier(0.4, 0, 0.2, 1)` (--duration-slow, --ease-standard)

**접근성 고려사항**:
- `role="progressbar"`, `aria-valuenow`, `aria-valuemin="0"`, `aria-valuemax="100"` 설정
- `aria-label`로 용도 설명 (예: "렌더 진행률")

---

### 2.9 Toast (`.toast`)

**용도**: 일시적 알림. 저장 완료, 복사 완료, 에러 발생 등 피드백 메시지.

**사양**:
- position: `fixed`
- bottom: `80px` (하단 네비 위)
- left: `50%`, transform: `translateX(-50%)`
- padding: `12px 20px` (--space-3 수직, --space-5 수평)
- 배경: `#212121` (--color-gray-900)
- 텍스트: `#FFFFFF` (--color-white)
- border-radius: `9999px` (--radius-full)
- 폰트: `13px` (--text-sm), `500` (--font-medium)
- box-shadow: `var(--shadow-lg)`
- z-index: `300` (--z-toast)

**접근성 고려사항**:
- `role="alert"` 또는 `aria-live="polite"` 설정
- 자동 사라짐 시간: 3~5초 권장
- 중요한 알림은 `aria-live="assertive"` 사용

---

### 2.10 Skeleton (`.skeleton`)

**용도**: 콘텐츠 로딩 중 자리 표시. 카메라 목록, 경기 목록, 영상 썸네일 로딩 시.

**사양**:
- background: `linear-gradient(90deg, #F5F5F5 25%, #EEEEEE 50%, #F5F5F5 75%)`
- background-size: `200% 100%`
- animation: `shimmer 1.5s infinite`
- border-radius: `6px` (--radius-sm)

**shimmer 키프레임**:
```css
@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

**접근성 고려사항**:
- `aria-hidden="true"` 설정 (스크린 리더가 무시)
- 로딩 컨테이너에 `aria-busy="true"` 설정

---

### 2.11 Top Bar (`.top-bar`)

**용도**: 화면 상단 네비게이션 바. 뒤로가기 버튼 + 화면 제목 + 액션 버튼.

**사양 (`.top-bar`)**:
- height: `48px`
- display: `flex`, align-items: `center`
- padding: `0 16px` (0 --space-4)
- gap: `12px` (--space-3)
- 배경: `var(--color-background)` = `#FFFFFF`

**하위 요소**:

| 클래스 | 사양 |
|--------|------|
| `.top-bar-title` | flex: 1, 폰트: 17px (--text-lg), 700 (--font-bold) |
| `.top-bar-back` | width/height: 44px (--touch-min), display: flex center, cursor: pointer, border: none, background: none, 폰트: 20px (--text-xl), 색상: --color-text-primary |

---

### 2.12 Bottom Nav (`.bottom-nav`)

**용도**: 앱 하단 주요 네비게이션. 관리자: HOME/ARCHIVE/SCHEDULE. 소비자: 촬영/영상/하이라이트/마이.

**사양 (`.bottom-nav`)**:
- height: `56px`
- 배경: `var(--color-background)` = `#FFFFFF`
- border-top: `1px solid #EEEEEE` (--color-border)
- display: `flex`, justify-content: `space-around`, align-items: `center`
- padding-bottom: `4px`

**하위 요소 (`.nav-item`)**:
- display: `flex`, flex-direction: `column`, align-items: `center`
- gap: `2px`
- 폰트: `10px`
- 색상: `#BDBDBD` (--color-text-tertiary)
- cursor: `pointer`
- min-width/min-height: `44px` (--touch-min)
- justify-content: `center`
- transition: `color 150ms`

| 상태 | 변화 |
|------|------|
| default | 색상: `#BDBDBD` |
| active | 색상: `#2AC1BC` (--color-accent), font-weight: `600` |

**아이콘 (`.nav-icon`)**: width/height: `20px`

---

### 2.13 Tab Bar (`.tab-bar`)

**용도**: 화면 내 서브 네비게이션. 아카이브 탭 (경기영상/하이라이트), 영상 타입 구분 등.

**사양 (`.tab-bar`)**:
- display: `flex`
- border-bottom: `1px solid #EEEEEE` (--color-border)
- padding: `0 16px` (0 --space-4)

**하위 요소 (`.tab-item`)**:
- flex: `1`
- text-align: `center`
- padding: `12px 0` (--space-3 수직)
- 폰트: `13px` (--text-sm), `500` (--font-medium)
- 색상: `#BDBDBD` (--color-text-tertiary)
- border: `none`, background: `none`
- border-bottom: `2px solid transparent`
- transition: `all 150ms`

| 상태 | 변화 |
|------|------|
| default | 색상: `#BDBDBD`, border-bottom: transparent |
| active | 색상: `#212121` (--color-text-primary), border-bottom-color: `#2AC1BC` (--color-accent), font-weight: `700` |

**접근성 고려사항**:
- `role="tablist"` (컨테이너), `role="tab"` (각 탭), `role="tabpanel"` (콘텐츠)
- `aria-selected="true/false"` 설정
- 방향키로 탭 간 이동 지원

---

### 2.14 Chip (`.chip`)

**용도**: 필터, 메트릭 퀵 로우 (REC, CPU, TEMP, DET), 인물 선택 표시 (PersonChip).

**사양**:
- display: `inline-flex`, align-items: `center`
- gap: `4px` (--space-1)
- padding: `4px 12px` (--space-1 수직, --space-3 수평)
- border-radius: `9999px` (--radius-full)
- 폰트: `11px` (--text-xs), `500` (--font-medium)
- 배경: `#F5F5F5` (--color-gray-100)
- 색상: `#757575` (--color-text-secondary)
- border: `none`
- cursor: `pointer`

| 상태 | 변화 |
|------|------|
| default | 배경: `#F5F5F5`, 색상: `#757575` |
| active | 배경: `#2AC1BC` (--color-accent), 색상: `#FFFFFF` (--color-white) |

---

### 2.15 Video Card (`.video-card`)

**용도**: 비디오 프리뷰 카드. WebRTC 프리뷰, 영상 썸네일 표시.

**사양**:
- 배경: `#212121` (--color-gray-900)
- border-radius: `12px` (--radius-md)
- overflow: `hidden`
- aspect-ratio: `16/9`
- display: `flex`, align-items/justify-content: `center`
- 텍스트: `#FFFFFF`, 폰트: `24px` (--text-2xl)
- cursor: `pointer`
- position: `relative`

**하위 요소 (`.video-card-badge`)**:
- position: `absolute`, top: `8px`, left: `8px`
- padding: `2px 8px`
- 배경: `rgba(0, 0, 0, 0.6)`
- 색상: `#FFFFFF`
- border-radius: `6px` (--radius-sm)
- 폰트: `10px`, `500`

---

### 2.16 Thumbnail Grid (`.thumb-grid`)

**용도**: 선수별 하이라이트 그리드. 인스타그램 릴스 스타일 3x3 정사각형 그리드.

**사양 (`.thumb-grid`)**:
- display: `grid`
- grid-template-columns: `repeat(3, 1fr)`
- gap: `2px`
- padding: `0 16px` (0 --space-4)

**셀 사양 (`.thumb-cell`)**:
- aspect-ratio: `1` (정사각형)
- 배경: `#EEEEEE` (--color-gray-200)
- border-radius: `6px` (--radius-sm)
- overflow: `hidden`
- cursor: `pointer`
- position: `relative`
- transition: `transform 150ms`

| 상태 | 변화 |
|------|------|
| default | 기본 |
| active | `transform: scale(0.95)` |

**라벨 사양 (`.thumb-cell-label`)**:
- position: `absolute`, bottom: `4px`, left: `4px`
- 폰트: `10px`, `600`
- 색상: `#FFFFFF`
- 배경: `rgba(0, 0, 0, 0.5)`
- padding: `1px 6px`
- border-radius: `6px` (--radius-sm)

**인터랙션 스펙**:
- 탭: 해당 선수 개인 하이라이트 전체 재생 화면으로 이동
- 프레스 앤 홀드 (500ms 이상): 5초 미리보기 재생, 손을 떼면 정지 후 썸네일 복귀

---

### 2.17 Recording Pulse (`.rec-dot`)

**용도**: 녹화 중 상태 표시. REC 표시 옆에 맥동하는 빨간 도트.

**사양**:
- width: `8px`, height: `8px`
- border-radius: `50%`
- 배경: `#EF4444` (--color-error)
- animation: `pulse 1.5s ease-in-out infinite`

**pulse 키프레임**:
```css
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}
```

---

### 2.18 Empty State (`.empty-state`)

**용도**: 콘텐츠 없음 상태 표시. 카메라 미발견, 영상 없음, 하이라이트 없음 등.

**사양 (`.empty-state`)**:
- display: `flex`, flex-direction: `column`, align-items: `center`, justify-content: `center`
- padding: `48px 24px` (--space-12 수직, --space-6 수평)
- text-align: `center`
- gap: `12px` (--space-3)

**하위 요소**:

| 클래스 | 사양 |
|--------|------|
| `.empty-state-icon` | 폰트: `48px`, 색상: `#E0E0E0` (--color-gray-300) |
| `.empty-state-title` | 폰트: `17px` (--text-lg), `600`, 색상: `#212121` |
| `.empty-state-desc` | 폰트: `13px` (--text-sm), 색상: `#757575` |

---

### 2.19 Divider (`.divider`)

**용도**: 콘텐츠 영역 구분.

**사양**:
- height: `1px`
- 배경: `#F5F5F5` (--color-divider)
- margin: `16px 0` (--space-4)

---

### 2.20 Section Header (`.section-header`)

**용도**: 리스트/콘텐츠 그룹의 라벨. "영상", "선수별 하이라이트" 등.

**사양**:
- 폰트: `13px` (--text-sm), `600` (--font-semibold)
- 색상: `#757575` (--color-text-secondary)
- padding: `16px 16px 8px` (--space-4 좌우, --space-4 위, --space-2 아래)
- text-transform: `uppercase`
- letter-spacing: `0.5px`

---

## 3. 애니메이션 & 모션 스펙

### 3.1 이징 곡선

| CSS 변수 | cubic-bezier 값 | 용도 |
|----------|-----------------|------|
| `--ease-out` | `cubic-bezier(0.0, 0, 0.2, 1)` | 요소 진입 (화면 밖에서 안으로). 모달 열기, 리스트 아이템 등장 |
| `--ease-in` | `cubic-bezier(0.4, 0, 1, 1)` | 요소 퇴장 (화면 안에서 밖으로). 모달 닫기, 요소 사라짐 |
| `--ease-standard` | `cubic-bezier(0.4, 0, 0.2, 1)` | 화면 내 이동, 크기 변경, 색상 전환. 범용 기본 이징 |

토스 Rally 라이브러리 참고 이징:
- `bezier.expo` -- Exponential (강한 감속)
- `spring.quick` -- 빠른 스프링 (dampingRatio=0.5, stiffness=400)
- `spring.basic` -- 기본 스프링 (dampingRatio=0.75, stiffness=200)

---

### 3.2 Duration 3단계

| CSS 변수 | 값 | 용도 |
|----------|-----|------|
| `--duration-fast` | `150ms` | 색상 전환, 터치 피드백, 호버, 포커스, 작은 요소 전환 |
| `--duration-normal` | `250ms` | 폰 프레임 전환, 표준 애니메이션, 슬라이드 |
| `--duration-slow` | `350ms` | 프로그레스 바 채움, 복잡한 전환, 전체화면 전환 |

---

### 3.3 터치 피드백 패턴

모든 터치 가능한 UI 요소에 적용하는 터치 피드백:

```css
.element:active {
  transform: scale(0.97);
  opacity: 0.9;
}
```

컴포넌트별 scale 값:

| 컴포넌트 | active scale | 적용 이유 |
|----------|-------------|----------|
| `.btn` | `scale(0.97)` + `opacity: 0.9` | 버튼 표준 터치 피드백 |
| `.card` | `scale(0.98)` | 카드는 더 큰 영역이므로 미세하게 |
| `.thumb-cell` | `scale(0.95)` | 작은 썸네일은 더 확실한 피드백 |

transition 속성: `all 150ms cubic-bezier(0.4, 0, 0.2, 1)` (--duration-fast + --ease-standard)

---

### 3.4 화면 전환 패턴

**슬라이드 전환 (기본)**:
- 전진 (push): 새 화면이 오른쪽에서 슬라이드 인, 기존 화면은 약간 좌측 이동
- 후진 (pop): 현재 화면이 오른쪽으로 슬라이드 아웃, 이전 화면이 좌측에서 복귀
- duration: `250ms` (--duration-normal)
- easing: `cubic-bezier(0.0, 0, 0.2, 1)` (--ease-out, 진입 시)
- 토스 참고: `tween(300ms, EaseOutCubic)`

**페이드 전환 (탭 전환)**:
- 탭 간 전환 시 콘텐츠 영역만 fade in/out
- duration: `150ms` (--duration-fast)
- opacity: `0 -> 1` (진입), `1 -> 0` (퇴장)

**전체화면 전환 (가로 모드)**:
- 세로에서 가로로 전환 시 확대 + 회전 애니메이션
- duration: `350ms` (--duration-slow)
- 시스템 바 숨김 (몰입형 UI)

---

### 3.5 리스트 아이템 Stagger 등장

토스 패턴을 참고한 리스트 아이템 순차 등장 애니메이션:

- 각 아이템 간 지연: `20ms`
- 개별 아이템 애니메이션:
  - scale: `0.3 -> 1.0`
  - opacity: `0 -> 1` (duration: `150ms`)
  - easing: `spring(dampingRatio=0.5, stiffness=400)` 또는 CSS `cubic-bezier(0.0, 0, 0.2, 1)`
- 첫 번째 아이템: 즉시 시작
- 두 번째 아이템: 20ms 후
- 세 번째 아이템: 40ms 후
- N번째 아이템: (N-1) * 20ms 후

CSS 구현 예시:
```css
.list-item:nth-child(1) { animation-delay: 0ms; }
.list-item:nth-child(2) { animation-delay: 20ms; }
.list-item:nth-child(3) { animation-delay: 40ms; }
/* ... */
```

---

### 3.6 스켈레톤 시머 효과

- 그라데이션: `linear-gradient(90deg, #F5F5F5 25%, #EEEEEE 50%, #F5F5F5 75%)`
- background-size: `200% 100%`
- 애니메이션: `shimmer 1.5s infinite`
- 방향: 좌에서 우로 반복 이동
- background-position: `200% 0` -> `-200% 0`

---

### 3.7 녹화 상태 맥동

- 대상: `.rec-dot` (8x8px 빨간 도트)
- 애니메이션: `pulse 1.5s ease-in-out infinite`
- 키프레임: opacity `1 -> 0.4 -> 1`
- 용도: REC 표시 옆에 배치, 녹화 중 시각적 표시

---

### 3.8 로딩 상태 전략 (토스 패턴)

| 로딩 시간 | 처리 방식 | 구현 |
|-----------|----------|------|
| 1초 미만 | 로딩 인디케이터 없음 | 아무것도 표시하지 않음 |
| 1~2초 | 스켈레톤 + 시머 | `.skeleton` 컴포넌트 사용 |
| 2~30초 | 인터랙티브 애니메이션 | 맞춤 로딩 화면 (하이라이트 렌더, 달리는 캐릭터 등) |

Suspensive Delay 패턴 적용: `<Delay ms={200}>` -- 200ms 이하의 로딩은 스피너를 보여주지 않음.

---

### 3.9 prefers-reduced-motion 접근성 지원

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

- 모든 CSS 애니메이션과 트랜지션을 비활성화
- 스켈레톤 시머 -> 정적 회색 배경으로 대체
- rec-dot 맥동 -> 정적 빨간 도트로 대체
- stagger 등장 -> 즉시 표시

---

## 4. 관리자 앱 화면별 스펙

### 4.1 홈 - 카메라 목록

**화면 ID**: ADM-01
**화면명**: 홈 (카메라 목록)

**레이아웃 구성** (위에서 아래 순서):
1. `.status-bar` -- 시스템 상태바 (44px)
2. `.top-bar` -- "Cappic" 타이틀 + 설정 아이콘
3. WiFi 상태 배너 (연결 상태, SSID, IP)
4. 마지막 탐색 시간 텍스트
5. 카메라 카드 리스트 (`.card` 반복)
   - 각 카드: avatar + 카메라 이름 + IP + 카메라 ID + `.status-dot` + 녹화 상태 `.badge`
6. `.bottom-nav` -- HOME(active) / ARCHIVE / SCHEDULE

**사용되는 컴포넌트**: `.top-bar`, `.card`, `.card-body`, `.avatar`, `.status-dot`, `.badge`, `.badge-accent`, `.badge-error`, `.btn-primary` (재탐색), `.bottom-nav`, `.nav-item`, `.empty-state` (카메라 미발견 시), `.skeleton` (로딩 시)

**API 연동**:
- 카메라 탐색: TCP 소켓 192.168.x.1~254:8000, 100ms 타임아웃, 배치 25개씩
- 각 카메라: `GET /api/v1/ping` (헬스 체크)
- 각 카메라: `GET /api/v1/status` (녹화 상태 조회)
- 카메라 이름 변경: `POST /api/v1/set_camera_id?camera_id=N`

**상태별 UI**:
- loading: 스캔 진행률 표시 + 카메라 카드 `.skeleton`
- error: WiFi 미연결 경고 배너 (빨간색)
- empty: `.empty-state` -- "카메라를 찾지 못했습니다" + 재탐색 버튼
- success: 카메라 카드 리스트

**화면 전환**:
- 카메라 카드 탭 -> ADM-02 (카메라 상세 세로)
- Pull-to-refresh -> 재탐색 트리거
- 카메라 이름 롱프레스 -> 이름 변경 다이얼로그 (overlay)
- 설정 아이콘 -> ADM-16 (네트워크 디버그)
- 하단 탭 ARCHIVE -> ADM-07
- 하단 탭 SCHEDULE -> ADM-15

---

### 4.2 카메라 상세 (세로)

**화면 ID**: ADM-02
**화면명**: 카메라 상세 (세로 모드)

**레이아웃 구성**:
1. `.status-bar`
2. `.top-bar` -- 뒤로가기 (`.top-bar-back`) + 카메라 이름
3. `.video-card` -- WebRTC 실시간 프리뷰 (16:9)
   - `.rec-dot` + "REC" 텍스트 + 녹화 시간 `.badge` (녹화 중일 때)
   - 풀스크린 전환 버튼 (우측 하단)
4. 설정 요약 행: `.chip` 3개 (RESOLUTION, STORAGE, CPU)
5. 녹화 제어 버튼: `.btn-primary.btn-full.btn-lg` "START RECORDING" 또는 `.btn-danger.btn-full.btn-lg` "STOP RECORDING"
6. `.bottom-nav`

**사용되는 컴포넌트**: `.top-bar`, `.top-bar-back`, `.video-card`, `.video-card-badge`, `.rec-dot`, `.badge`, `.chip`, `.btn-primary`, `.btn-danger`, `.btn-full`, `.btn-lg`, `.bottom-nav`

**API 연동**:
- WebRTC: `POST /api/v1/webrtc/offer` (SDP 교환)
- WebRTC: `POST /api/v1/webrtc/ice-candidate` (ICE candidate)
- 녹화 상태: `GET /api/v1/status` (5초 자동 폴링)
- 녹화 시작: `POST /api/v1/start`
- 녹화 중지: `POST /api/v1/end`
- 메트릭: `GET /api/v1/metrics` (10초 자동 갱신)

**상태별 UI**:
- WebRTC connecting: `.video-card` 위에 "연결 중..." 오버레이
- WebRTC connected: 실시간 영상 표시
- WebRTC failed: "연결 실패" 오버레이 + 재연결 버튼
- 녹화 중: `.rec-dot` 맥동 + 빨간 시간 배지 + STOP 버튼
- 녹화 대기: START 버튼 표시

**화면 전환**:
- 뒤로가기 -> ADM-01 (홈)
- 풀스크린 버튼 -> ADM-03 (가로 전체화면)
- STOP 버튼 -> ADM-05 (저장 중)
- 메트릭 시트 -> 바텀 시트 (메트릭 상세)

---

### 4.3 카메라 상세 (가로) / 전체 화면 프리뷰

**화면 ID**: ADM-03
**화면명**: 전체 화면 프리뷰

**레이아웃 구성**:
1. 강제 가로 모드 + 몰입형 UI (시스템 바 숨김)
2. WebRTC 전체화면 스트리밍 (화면 전체)
3. 탭으로 토글되는 오버레이:
   - 상단: `.rec-dot` + 녹화 시간 + 카메라 이름
   - 하단: 녹화 제어 버튼
   - 우측: 메트릭 드로어 열기 버튼
4. 사이드 메트릭 드로어 (360px 슬라이드-인)

**사용되는 컴포넌트**: `.video-card` (전체화면), `.rec-dot`, `.badge`, `.btn-primary`, `.btn-danger`, `.chip`

**API 연동**: ADM-02와 동일

**상태별 UI**: ADM-02와 동일 (전체화면 버전)

**화면 전환**:
- ESC 키 / 뒤로가기 -> ADM-02 (세로 모드)
- 사이드 드로어 열기 -> 메트릭 드로어 슬라이드인

**터치/인터랙션**:
- 화면 탭: 컨트롤 오버레이 토글 (3초 후 자동 숨김)
- 메트릭 드로어: 360px 우측에서 슬라이드인, duration 250ms

---

### 4.4 대시보드 그리드

**화면 ID**: ADM-04
**화면명**: 대시보드 그리드 뷰

**레이아웃 구성**:
1. `.top-bar` -- "Dashboard" + 선택/해제 버튼
2. 다중 카메라 프리뷰 그리드 (반응형 컬럼)
   - 각 셀: `.video-card` (작은 크기) + 카메라 이름 + `.status-dot`
   - 체크박스 오버레이 (다중 선택 모드)
3. 하단 배치 제어 바: 선택 수 표시 + "일괄 시작"/"일괄 중지" 버튼

**사용되는 컴포넌트**: `.top-bar`, `.video-card`, `.status-dot`, `.badge`, `.btn-primary`, `.btn-danger`

**API 연동**:
- 각 카메라 WebRTC 동시 연결
- 배치 녹화: 선택된 카메라들에 `POST /api/v1/start` 또는 `POST /api/v1/end` 병렬 호출
- 낙관적 UI 업데이트: 중지 요청 즉시 UI 반영, 실패 시 롤백

---

### 4.5 저장 중

**화면 ID**: ADM-05
**화면명**: 저장 중

**레이아웃 구성**:
1. 풀스크린 오버레이
2. 중앙: SpinRing 애니메이션 (회전 링)
3. "저장 중..." 텍스트

**사용되는 컴포넌트**: 커스텀 SpinRing 애니메이션

**상태별 UI**:
- 저장 진행 중: SpinRing 회전
- 저장 완료: ADM-06으로 자동 전환

**화면 전환**:
- 저장 완료 -> ADM-06 (저장 완료)

---

### 4.6 저장 완료

**화면 ID**: ADM-06
**화면명**: 저장 완료

**레이아웃 구성**:
1. 중앙: BounceCheck 애니메이션 (체크 표시가 바운스하며 등장)
2. 파일명 텍스트
3. 녹화 시간 텍스트
4. "아카이브에서 보기" 버튼 (`.btn-primary`)
5. "홈으로" 버튼 (`.btn-secondary`)

**사용되는 컴포넌트**: `.btn-primary`, `.btn-secondary`, `.btn-full`

**화면 전환**:
- "아카이브에서 보기" -> ADM-07 (아카이브)
- "홈으로" -> ADM-01 (홈)

---

### 4.7 아카이브

**화면 ID**: ADM-07
**화면명**: 아카이브 (경기 영상 / 하이라이트)

**레이아웃 구성**:
1. `.status-bar`
2. `.top-bar` -- "Archive"
3. `.tab-bar` -- "경기 영상" / "하이라이트"
4. 경기 영상 탭:
   - 영상 `.card` 리스트 (파일명, 날짜, 파일 크기, 해상도)
   - 영상 종류: recording / uploaded / derived
5. 하이라이트 탭:
   - AI 생성 하이라이트 목록
   - ReID 결과 영상 목록
   - 진행 중 ReID 세션 배너 (`.badge-accent`)
6. `.bottom-nav` -- HOME / ARCHIVE(active) / SCHEDULE

**사용되는 컴포넌트**: `.top-bar`, `.tab-bar`, `.tab-item`, `.card`, `.card-body`, `.badge`, `.btn-outline` (다운로드), `.bottom-nav`, `.empty-state`, `.skeleton`

**API 연동**:
- 영상 목록: `GET /api/v1/sessions`
- 파일 다운로드: `POST /api/v1/download`
- ReID 세션 목록: `GET /api/v1/reid/sessions`

**상태별 UI**:
- loading: `.skeleton` 카드 리스트
- empty: `.empty-state` -- "영상이 없습니다"
- success: 영상 카드 리스트

**화면 전환**:
- 영상 카드 탭 -> ADM-08 (비디오 재생)
- ReID 세션 탭 -> ADM-12 (ReID 세션 목록)
- "하이라이트 만들기" -> ADM-09 (ReID 워크플로우)

---

### 4.8 비디오 재생

**화면 ID**: ADM-08
**화면명**: 비디오 재생

**레이아웃 구성**:
1. `.top-bar` -- 뒤로가기 + 영상 제목
2. 비디오 플레이어 (16:9)
   - 재생/일시정지 버튼
   - 스크럽 바 (Slider) + 현재시간/전체시간
   - 10초 앞/뒤 탐색 버튼
   - 풀스크린 전환 버튼
3. 영상 정보 (파일명, 해상도, 크기)
4. 다운로드 버튼 (`.btn-primary`)

**사용되는 컴포넌트**: `.top-bar`, `.top-bar-back`, `.video-card`, `.btn-primary`, `.progress`

**API 연동**:
- 영상 스트리밍: HTTP URL 직접 재생
- 다운로드: 스트림 기반 청크 다운로드 + 갤러리 저장

**화면 전환**:
- 뒤로가기 -> ADM-07 (아카이브)
- 풀스크린 -> 가로 모드 (같은 컨트롤러 공유, 버퍼링 없이 이어짐)

---

### 4.9 ReID 워크플로우 - 소스 선택

**화면 ID**: ADM-09
**화면명**: ReID 소스 선택 (Step 1/3)

**레이아웃 구성**:
1. `.top-bar` -- 뒤로가기 + "하이라이트 만들기"
2. 스텝 인디케이터: 1(active) - 2 - 3
3. "소스 선택" 섹션 헤더
4. 옵션 카드 리스트:
   - "서버 녹화본에서 선택" `.card`
   - "기존 세션 이어서" `.card`
   - "여러 클립 합치기" `.card`
   - "기기에서 업로드" `.card` + `.progress` (업로드 시)

**사용되는 컴포넌트**: `.top-bar`, `.card`, `.card-body`, `.section-header`, `.btn-primary`, `.progress`, `.list-item`

**API 연동**:
- 서버 영상 목록: `GET /api/v1/sessions`
- 기존 ReID 세션: `GET /api/v1/reid/sessions`
- 파일 업로드: `POST /api/v1/media/uploads` (multipart, 2GB 제한)
- 비디오 합치기: `POST /api/v1/media/concat`

**화면 전환**:
- 뒤로가기 -> 이전 화면
- 소스 선택 완료 -> ADM-10 (인물 선택)

---

### 4.10 ReID 워크플로우 - 인물 선택

**화면 ID**: ADM-10
**화면명**: ReID 인물 선택 (Step 2/3)

**레이아웃 구성**:
1. `.top-bar` -- 뒤로가기 + "인물 선택"
2. 스텝 인디케이터: 1(done) - 2(active) - 3
3. 타임라인 슬라이더 (영상 내 시간 탐색)
4. 프레임 캔버스 (YOLO 검출 바운딩 박스 오버레이)
5. 검출된 인물 `.thumb-grid` (DetectionThumbnailGrid)
6. 선택된 인물 `.chip` 행 (PersonChip 리스트)
7. "다음" `.btn-primary`

**사용되는 컴포넌트**: `.top-bar`, `.thumb-grid`, `.thumb-cell`, `.chip`, `.btn-primary`, `.btn-full`

**API 연동**:
- 프레임 + 검출 결과: `GET /api/v1/reid/sessions/{id}/frame?time=N`
- 추적 대상 선택: `POST /api/v1/reid/sessions/{id}/select` (bbox 좌표 전달)

**화면 전환**:
- 뒤로가기 -> ADM-09 (소스 선택)
- "다음" -> ADM-11 (출력 설정)
- 인물 썸네일 탭 -> 해당 인물 선택 (chip 추가)

---

### 4.11 ReID 워크플로우 - 출력 설정

**화면 ID**: ADM-11
**화면명**: ReID 출력 설정 (Step 3/3)

**레이아웃 구성**:
1. `.top-bar` -- 뒤로가기 + "출력 설정"
2. 스텝 인디케이터: 1(done) - 2(done) - 3(active)
3. 설정 폼:
   - score_threshold 슬라이더
   - match_threshold 슬라이더
   - output_fps `.input`
   - bitrate `.input`
   - debug 모드 토글 스위치
4. 선택된 인물 요약 (`.chip` 리스트)
5. "렌더 시작" `.btn-primary.btn-full.btn-lg`

**사용되는 컴포넌트**: `.top-bar`, `.input`, `.chip`, `.btn-primary`, `.btn-full`, `.btn-lg`, `.section-header`

**API 연동**:
- 렌더 시작: `POST /api/v1/reid/sessions/{id}/render` (선택된 인물 수만큼 개별 세션 자동 생성)

**화면 전환**:
- 뒤로가기 -> ADM-10 (인물 선택)
- "렌더 시작" -> ADM-13 (하이라이트 진행)

---

### 4.12 ReID 세션 목록

**화면 ID**: ADM-12
**화면명**: ReID 세션 목록

**레이아웃 구성**:
1. `.top-bar` -- 뒤로가기 + "ReID 세션"
2. 세션 `.card` 리스트
   - 세션 ID + 상태 `.badge` (pending/processing/completed/failed)
   - 생성 일시
   - 완료 세션: 다운로드/갤러리 저장 버튼
3. 세션 삭제: 스와이프 또는 롱프레스 -> 확인 다이얼로그

**사용되는 컴포넌트**: `.top-bar`, `.card`, `.badge`, `.badge-accent` (processing), `.badge-success` (completed), `.badge-error` (failed), `.btn-outline`, `.list-item`, `.empty-state`

**API 연동**:
- 세션 목록: `GET /api/v1/reid/sessions`
- 결과 다운로드: `GET /api/v1/reid/sessions/{id}/result`
- 세션 삭제: `DELETE /api/v1/reid/sessions/{id}`

**화면 전환**:
- 완료 세션 탭 -> ADM-08 (비디오 재생)
- 뒤로가기 -> 이전 화면

---

### 4.13 하이라이트 진행

**화면 ID**: ADM-13
**화면명**: 하이라이트 렌더 진행

**레이아웃 구성**:
1. `.top-bar` -- "렌더 진행"
2. 다중 세션 렌더 진행 목록:
   - 세션별: 인물 이름 + `.progress` (0~100%) + 퍼센트 텍스트
   - 현재 처리 중인 세션 ID 표시
3. "백그라운드로 진행" `.btn-secondary`
4. RunningCharacter 애니메이션 (처리 중 달리는 캐릭터)

**사용되는 컴포넌트**: `.top-bar`, `.progress`, `.progress-fill`, `.btn-secondary`, `.card`

**API 연동**:
- 렌더 상태 폴링: `GET /api/v1/reid/sessions/{id}/status` (2초 간격)

**상태별 UI**:
- processing: 프로그레스 바 채움 애니메이션 + RunningCharacter
- completed: 자동으로 ADM-14 전환
- failed: 에러 메시지 + 재시도 버튼

**화면 전환**:
- 모든 세션 완료 -> ADM-14 (하이라이트 완료)
- "백그라운드로 진행" -> 이전 화면으로 pop + 스낵바 알림

---

### 4.14 하이라이트 완료

**화면 ID**: ADM-14
**화면명**: 하이라이트 완료

**레이아웃 구성**:
1. 중앙: BounceCheck 애니메이션 (바운스-인 체크)
2. "완료" 텍스트
3. 세션별 결과 리스트:
   - 인물 이름 + 상태 (성공 `.badge-success` / 실패 `.badge-error`)
4. "아카이브에서 보기" `.btn-primary.btn-full`
5. "홈으로" `.btn-secondary.btn-full`

**사용되는 컴포넌트**: `.btn-primary`, `.btn-secondary`, `.btn-full`, `.badge-success`, `.badge-error`, `.list-item`

**화면 전환**:
- "아카이브에서 보기" -> ADM-07 (아카이브)
- "홈으로" -> ADM-01 (홈)

---

### 4.15 스케줄 캘린더

**화면 ID**: ADM-15
**화면명**: 스케줄 캘린더

**레이아웃 구성**:
1. `.status-bar`
2. `.top-bar` -- "스케줄"
3. 월간 캘린더 (table_calendar 기반)
   - 날짜별 상태 도트: `.status-dot-ok` (촬영일), `.status-dot-off` (휴무일), `.status-dot-warn` (오버라이드)
4. 선택된 날짜의 스케줄 상세:
   - 주간 반복 스케줄 (요일, 시작/종료 시간)
   - 오버라이드 정보 (휴무, 시간 변경, 메모)
5. "스케줄 추가" `.btn-primary`
6. `.bottom-nav` -- HOME / ARCHIVE / SCHEDULE(active)

**사용되는 컴포넌트**: `.top-bar`, `.status-dot`, `.card`, `.card-body`, `.btn-primary`, `.btn-outline`, `.input`, `.section-header`, `.bottom-nav`

**API 연동**:
- 주간 스케줄: `GET /schedule/weekly` (192.168.0.155:3000)
- 오버라이드: `GET /schedule/overrides`
- 특정일 유효 스케줄: `GET /schedule?date=YYYY-MM-DD`
- 기간 스케줄: `GET /schedule/range?start=&end=`
- 주간 추가: `POST /schedule/weekly`
- 주간 삭제: `DELETE /schedule/weekly/{id}`
- 오버라이드 추가: `POST /schedule/overrides`
- 오버라이드 삭제: `DELETE /schedule/overrides/{id}`
- 공휴일 등록: `POST /schedule/seed-holidays?year=&overwrite=`

**화면 전환**:
- 날짜 탭 -> 해당 날짜 스케줄 상세 표시
- "스케줄 추가" -> 스케줄 추가 다이얼로그

---

### 4.16 네트워크 디버그

**화면 ID**: ADM-16
**화면명**: 네트워크 디버그

**레이아웃 구성**:
1. `.top-bar` -- 뒤로가기 + "네트워크 디버그"
2. 네트워크 인터페이스 리스트 (`.list-item`)
   - 인터페이스 이름, IP, 서브넷
3. 선택된 IP + 감지된 서브넷 표시
4. 사설 IP 필터링 정보
5. "클립보드 복사" `.btn-outline`

**사용되는 컴포넌트**: `.top-bar`, `.top-bar-back`, `.list-item`, `.btn-outline`, `.card`, `.section-header`

**화면 전환**:
- 뒤로가기 -> ADM-01 (홈)

---

## 5. 소비자 앱 화면별 스펙

### 5.1 온보딩 - 사용자 유형 선택

**화면 ID**: CON-01
**화면명**: 온보딩 (사용자 유형 선택)

**레이아웃 구성**:
1. `.status-bar`
2. 앱 로고 + "Cappic 시작하기" 텍스트
3. 두 개의 선택 `.card`:
   - "카메라 가지고 있어요" (Owner 모드) -- 카메라 아이콘 + 설명
   - "경기 영상만 볼래요" (Visitor 모드) -- 축구공 아이콘 + 설명
4. 하단 안내: "나중에 카메라를 구매하면 언제든 전환할 수 있어요"

**사용되는 컴포넌트**: `.card`, `.card-body`, `.empty-state` (레이아웃 참고)

**상태별 UI**:
- 카드 선택 시 `.card` active 스타일 (accent 보더)
- 이전 선택이 있으면 해당 카드 활성화

**화면 전환**:
- Owner 선택 -> CON-02 (로그인)
- Visitor 선택 -> CON-02 (로그인)

---

### 5.2 로그인/회원가입

**화면 ID**: CON-02
**화면명**: 로그인 / 회원가입

**레이아웃 구성**:
1. `.status-bar`
2. 앱 로고
3. 소셜 로그인 버튼들 (`.btn-full`):
   - 카카오 로그인 (노란색)
   - 네이버 로그인 (초록색)
   - 구글 로그인 (흰색 + 보더)
   - 애플 로그인 (검정색)
4. `.divider` + "또는"
5. 이메일 로그인 `.input` + 비밀번호 `.input`
6. "로그인" `.btn-primary.btn-full.btn-lg`

**사용되는 컴포넌트**: `.btn-full`, `.btn-lg`, `.input`, `.divider`

**API 연동**: 소셜 OAuth + 자체 인증 API (백엔드 미정)

**화면 전환**:
- 로그인 성공 -> CON-03 (프로필 설정) 또는 CON-04 (홈)
- QR/링크 진입 시 -> 해당 구장/경기 자동 연결 후 CON-04

---

### 5.3 프로필 설정

**화면 ID**: CON-03
**화면명**: 프로필 설정

**레이아웃 구성**:
1. `.top-bar` -- "프로필 설정"
2. `.avatar-lg` (프로필 사진) + 사진 변경 버튼
3. 이름 `.input`
4. 소속 팀/클럽 `.input` (선택)
5. 등번호 `.input` (선택)
6. 포지션 선택 `.chip` 그룹 (GK, DF, MF, FW)
7. "완료" `.btn-primary.btn-full.btn-lg`

**사용되는 컴포넌트**: `.top-bar`, `.avatar-lg`, `.input`, `.chip`, `.btn-primary`, `.btn-full`, `.btn-lg`

**화면 전환**:
- "완료" -> CON-04 (홈)

---

### 5.4 홈 - 구장 목록

**화면 ID**: CON-04
**화면명**: 홈 (구장 목록)

**레이아웃 구성**:
1. `.status-bar`
2. `.top-bar` -- "Cappic" + 알림 아이콘 + 설정 아이콘
3. "내 구장" `.section-header`
4. 구장 `.card` 리스트:
   - 구장 이름 + 최근 경기 날짜
   - 즐겨찾기 표시
5. "구장 추가하기" 버튼 (`.btn-outline.btn-full`)
6. `.bottom-nav`:
   - Owner: 촬영 / 영상 / 하이라이트 / 마이 (4탭)
   - Visitor: 영상 / 하이라이트 / 마이 (3탭)

**사용되는 컴포넌트**: `.top-bar`, `.section-header`, `.card`, `.card-body`, `.btn-outline`, `.btn-full`, `.bottom-nav`, `.nav-item`, `.empty-state`, `.skeleton`

**API 연동**: 구장 목록 API (백엔드 미정), GPS 기반 주변 구장 검색

**상태별 UI**:
- loading: `.skeleton` 카드 리스트
- empty: `.empty-state` -- "구장을 추가해주세요" + 추가 버튼
- success: 구장 카드 리스트

**화면 전환**:
- 구장 카드 탭 -> CON-06 (경기 목록)
- "구장 추가하기" -> CON-05 (구장 추가)
- 알림 아이콘 -> CON-15 (알림)
- 설정 아이콘 -> CON-16 (설정)

---

### 5.5 구장 추가

**화면 ID**: CON-05
**화면명**: 구장 추가

**레이아웃 구성**:
1. `.top-bar` -- 뒤로가기 + "구장 추가"
2. `.tab-bar` -- "QR 스캔" / "코드 입력" / "주변 검색"
3. QR 탭: 카메라 뷰파인더
4. 코드 탭: 6자리 코드 `.input` + "확인" `.btn-primary`
5. GPS 탭: 주변 구장 리스트

**사용되는 컴포넌트**: `.top-bar`, `.tab-bar`, `.tab-item`, `.input`, `.btn-primary`, `.list-item`, `.card`

**화면 전환**:
- 구장 추가 완료 -> CON-06 (해당 구장 경기 목록)
- 뒤로가기 -> CON-04 (홈)

---

### 5.6 경기 목록

**화면 ID**: CON-06
**화면명**: 경기 목록

**레이아웃 구성**:
1. `.top-bar` -- 뒤로가기 + 구장 이름
2. 날짜별 경기 리스트 (날짜 `.section-header` + 경기 `.card` 반복):
   - 경기 시간 (14:00~15:00)
   - 팀 정보 (A팀 vs B팀)
   - 영상/하이라이트 가용 아이콘

**사용되는 컴포넌트**: `.top-bar`, `.top-bar-back`, `.section-header`, `.card`, `.card-body`, `.badge`, `.skeleton`, `.empty-state`

**API 연동**: 경기 목록 API (백엔드 미정)

**화면 전환**:
- 경기 카드 탭 -> CON-07 (경기 상세)
- 뒤로가기 -> CON-04 (홈)

---

### 5.7 경기 상세

**화면 ID**: CON-07
**화면명**: 경기 상세

**레이아웃 구성**:
1. `.top-bar` -- 뒤로가기 + 경기 시간
2. "영상" `.section-header`
3. 영상 3종 가로 스크롤:
   - `.video-card` x3: 전체 영상 (60분) / 1분 하이라이트 / 10분 하이라이트
   - 각 카드 `.video-card-badge`에 영상 길이 표시
4. "선수별 하이라이트" `.section-header`
5. `.thumb-grid` (3x3 또는 NxN):
   - 각 `.thumb-cell`: AI 크롭 선수 썸네일
   - `.thumb-cell-label`: 등번호 (감지된 경우)
6. "나 찾기" `.btn-primary.btn-full` (ReID 워크플로우 진입)

**사용되는 컴포넌트**: `.top-bar`, `.section-header`, `.video-card`, `.video-card-badge`, `.thumb-grid`, `.thumb-cell`, `.thumb-cell-label`, `.btn-primary`, `.btn-full`

**API 연동**: 경기 영상 목록 API, 선수 썸네일 API (백엔드 미정)

**상태별 UI**:
- loading: `.skeleton` (영상 카드 + 썸네일 그리드)
- empty (영상 미준비): 해당 영역 `.empty-state`
- success: 영상 3종 + 썸네일 그리드

**화면 전환**:
- 영상 카드 탭 -> CON-10 (비디오 플레이어)
- 썸네일 탭 -> CON-09 (인물 개인 하이라이트)
- 썸네일 프레스앤홀드 -> CON-08 (5초 미리보기)
- "나 찾기" -> CON-12 (ReID 워크플로우)

---

### 5.8 인물 프레스앤홀드 미리보기

**화면 ID**: CON-08
**화면명**: 인물 5초 미리보기

**인터랙션 스펙**:
- 트리거: `.thumb-cell` 프레스 앤 홀드 (500ms 이상 유지)
- 동작: 해당 선수의 베스트 하이라이트 5초 미리보기 재생
- 시각적 변화:
  - 썸네일이 확대 (scale 1.05) + 보더 accent 색상
  - 비디오 오버레이 재생 (thumb-cell 위에)
  - 주변 셀은 약간 어두워짐 (opacity 0.5)
- 종료: 손을 떼면 즉시 정지, 썸네일 원래 크기로 복귀
- duration (확대 애니메이션): 150ms, ease-out
- duration (축소 복귀): 150ms, ease-standard

**접근성 대안**: 롱프레스 대신 더블 탭으로도 미리보기 트리거 가능

---

### 5.9 인물 개인 하이라이트 전체 재생

**화면 ID**: CON-09
**화면명**: 인물 개인 하이라이트

**레이아웃 구성**:
1. `.top-bar` -- 뒤로가기 + 선수 이름/등번호
2. 비디오 플레이어 (해당 선수의 모든 액션 하이라이트)
3. 액션 타임라인 (Drive, Pass, Shot 등 이벤트 마커)
4. 다운로드 `.btn-primary`
5. 공유 `.btn-outline` (카카오톡, 인스타, 링크)

**사용되는 컴포넌트**: `.top-bar`, `.video-card`, `.btn-primary`, `.btn-outline`, `.chip` (액션 필터), `.badge`

**화면 전환**:
- 뒤로가기 -> CON-07 (경기 상세)
- 풀스크린 -> CON-10 (비디오 플레이어)

---

### 5.10 비디오 플레이어 (풀스크린)

**화면 ID**: CON-10
**화면명**: 비디오 플레이어

**레이아웃 구성**:
1. 강제 가로 모드 + 몰입형 UI
2. 전체화면 비디오 재생
3. 탭으로 토글되는 오버레이:
   - 재생/일시정지 (중앙)
   - 10초 앞/뒤 탐색
   - 스크럽 바 + 시간 표시
   - 배속 조절 (0.5x, 1x, 1.5x, 2x)
   - 축소 버튼 (좌측 상단)

**화면 전환**:
- ESC / 축소 버튼 -> 이전 화면 (세로 모드 복귀)

---

### 5.11 내 하이라이트 목록

**화면 ID**: CON-11
**화면명**: 내 하이라이트

**레이아웃 구성**:
1. `.status-bar`
2. `.top-bar` -- "하이라이트"
3. 하이라이트 `.card` 리스트:
   - `.video-card` 썸네일 + 영상 길이
   - 경기 정보 + 생성 일시
   - 다운로드/공유 아이콘
4. `.bottom-nav`

**사용되는 컴포넌트**: `.top-bar`, `.card`, `.video-card`, `.badge`, `.bottom-nav`, `.empty-state`, `.skeleton`

**화면 전환**:
- 하이라이트 카드 탭 -> CON-10 (비디오 플레이어)

---

### 5.12 ReID "나 찾기" 워크플로우

**화면 ID**: CON-12
**화면명**: ReID "나 찾기"

소비자 앱의 ReID 워크플로우는 관리자 앱 (ADM-09~11)의 간소화 버전이다.

**레이아웃 구성**:
1. `.top-bar` -- 뒤로가기 + "나 찾기"
2. 경기 영상에서 타임라인 탐색
3. 프레임 위 인물 바운딩 박스 표시
4. 인물 `.thumb-grid`에서 "나" 선택
5. "하이라이트 만들기" `.btn-primary.btn-full.btn-lg`

**API 연동**: ADM-09~11과 동일한 ReID API 사용

**화면 전환**:
- 뒤로가기 -> CON-07 (경기 상세)
- "하이라이트 만들기" -> CON-13 (렌더 진행)

---

### 5.13 하이라이트 렌더 진행

**화면 ID**: CON-13
**화면명**: 하이라이트 렌더 진행

ADM-13과 동일한 구조. 소비자 앱에서는 단일 인물 렌더가 주된 사용 패턴.

**레이아웃 구성**:
1. `.top-bar` -- "하이라이트 만드는 중"
2. `.progress` + 퍼센트 표시
3. 로딩 애니메이션 (RunningCharacter 또는 인터랙티브 대기 화면)
4. "백그라운드로 진행" `.btn-secondary`

**API 연동**: `GET /api/v1/reid/sessions/{id}/status` (2초 간격 폴링)

**화면 전환**:
- 완료 -> CON-14 (하이라이트 완료)
- "백그라운드로 진행" -> pop + 푸시 알림 대기

---

### 5.14 하이라이트 완료 + 공유

**화면 ID**: CON-14
**화면명**: 하이라이트 완료

**레이아웃 구성**:
1. BounceCheck 애니메이션
2. "하이라이트 완성" 텍스트
3. 비디오 미리보기 (`.video-card`)
4. 공유 버튼 행:
   - 카카오톡 / 인스타그램 / TikTok / YouTube
   - 링크 복사 / QR 코드
5. "다운로드" `.btn-primary.btn-full`
6. SNS 비율 선택: `.chip` 그룹 (세로 9:16, 정사각 1:1, 가로 16:9)

**사용되는 컴포넌트**: `.video-card`, `.btn-primary`, `.btn-secondary`, `.btn-full`, `.chip`, `.toast` (복사 완료)

**화면 전환**:
- 공유 선택 -> OS 공유 시트
- "다운로드" -> 갤러리 저장 + `.toast` "저장 완료"
- 뒤로가기 -> CON-07 또는 CON-11

---

### 5.15 알림

**화면 ID**: CON-15
**화면명**: 알림

**레이아웃 구성**:
1. `.top-bar` -- 뒤로가기 + "알림"
2. 알림 `.list-item` 리스트:
   - `.avatar` (알림 유형 아이콘)
   - 알림 제목 + 설명 + 시간
   - 읽지 않은 알림: 배경 `--color-accent-light`

**사용되는 컴포넌트**: `.top-bar`, `.list-item`, `.avatar`, `.badge`, `.divider`, `.empty-state`

**화면 전환**:
- 알림 항목 탭 -> 해당 콘텐츠 화면
- 뒤로가기 -> CON-04 (홈)

---

### 5.16 설정

**화면 ID**: CON-16
**화면명**: 설정

**레이아웃 구성**:
1. `.top-bar` -- 뒤로가기 + "설정"
2. 설정 항목 `.list-item` 리스트:
   - 다크/라이트 모드 전환 (토글 스위치)
   - 영상 화질 (WiFi/셀룰러)
   - 언어 (한/영/일)
   - Owner/Visitor 모드 전환
   - 연결된 구장 관리
   - 알림 설정
   - 계정 관리
   - 로그아웃

**사용되는 컴포넌트**: `.top-bar`, `.list-item`, `.section-header`, `.divider`

**화면 전환**:
- 각 설정 항목 -> 해당 설정 상세 화면 또는 다이얼로그
- 뒤로가기 -> CON-04 (홈)

---

### 5.17 프로필

**화면 ID**: CON-17
**화면명**: 프로필

**레이아웃 구성**:
1. `.top-bar` -- "마이"
2. `.avatar-lg` + 이름 + 소속 팀
3. 등번호 + 포지션 `.chip`
4. "프로필 수정" `.btn-outline`
5. 통계 요약 `.card` (경기 수, 하이라이트 수)
6. `.bottom-nav`

**사용되는 컴포넌트**: `.top-bar`, `.avatar-lg`, `.chip`, `.btn-outline`, `.card`, `.bottom-nav`

**화면 전환**:
- "프로필 수정" -> CON-03 (프로필 설정)

---

### 5.18 카메라 연결/촬영 (Owner 전용)

**화면 ID**: CON-18
**화면명**: 카메라 연결/촬영

**레이아웃 구성**:
1. `.status-bar`
2. `.top-bar` -- "촬영"
3. 카메라 상태 `.card`:
   - 연결 상태 `.status-dot`
   - 배터리/저장공간 `.progress`
4. `.video-card` -- 실시간 카메라 프리뷰 (WebRTC)
5. 녹화 제어: `.btn-primary.btn-full.btn-lg` "촬영 시작"
6. `.bottom-nav` -- 촬영(active) / 영상 / 하이라이트 / 마이

**사용되는 컴포넌트**: `.top-bar`, `.card`, `.status-dot`, `.progress`, `.video-card`, `.rec-dot`, `.btn-primary`, `.btn-danger`, `.btn-full`, `.btn-lg`, `.bottom-nav`

**API 연동**: 관리자 앱과 동일한 카메라 API (포트 8000)

**화면 전환**:
- 카메라 자동 검색 (디바이스 탐색)
- 녹화 시작/중지 -> 상태 전환

---

### 5.W1 웹 - 구장 경기 페이지

**화면 ID**: WEB-01
**화면명**: 구장 경기 페이지

**진입 경로**: QR 포스터 스캔 또는 공유 링크 (앱 설치 불필요)

**레이아웃 구성**:
1. 구장 이름 + 정보
2. 오늘 경기 목록 (시간, 팀 정보)
3. 경기 선택 -> WEB-02

---

### 5.W2 웹 - 1분 하이라이트 미리보기

**화면 ID**: WEB-02
**화면명**: 1분 하이라이트 720p 미리보기

**레이아웃 구성**:
1. 비디오 플레이어 (1분 하이라이트, 720p)
2. 다운로드 버튼
3. 인물별 썸네일 그리드 (흐림 처리 + "앱에서 보기" 안내)
4. 구장 정보, 경기 시간

**제공하지 않는 것**: 10분 하이라이트, 전체 경기 영상, 개인 ReID 하이라이트, 4K 다운로드

---

### 5.W3 웹 - 앱 설치 유도

**화면 ID**: WEB-03
**화면명**: 앱 설치 유도

**레이아웃 구성**:
1. "더 많은 하이라이트와 경기 영상을 보려면 앱을 다운받으세요"
2. App Store / Play Store 다운로드 버튼
3. 앱 기능 미리보기 (10분 하이라이트, ReID, 4K 등)

---

## 6. 네비게이션 맵

### 6.1 관리자 앱 네비게이션 흐름도

```
MainScreen (3탭 셸)
|
+-- HOME 탭 (ADM-01: 카메라 목록)
|   |
|   +-- [카메라 탭] --> ADM-02: 카메라 상세 (세로)
|   |   |
|   |   +-- [풀스크린 버튼] --> ADM-03: 전체 화면 프리뷰 (가로)
|   |   |   +-- [ESC/뒤로] --> ADM-02
|   |   |
|   |   +-- [STOP 버튼] --> ADM-05: 저장 중
|   |   |   +-- [저장 완료] --> ADM-06: 저장 완료
|   |   |       +-- [아카이브] --> ADM-07
|   |   |       +-- [홈으로] --> ADM-01
|   |   |
|   |   +-- [메트릭 시트] --> 바텀시트
|   |       +-- [ReID 세션] --> ADM-12: ReID 세션 목록
|   |           +-- [세션 결과] --> ADM-08: 비디오 재생
|   |
|   +-- [설정 아이콘] --> ADM-16: 네트워크 디버그
|
+-- ARCHIVE 탭 (ADM-07: 아카이브)
|   |
|   +-- [영상 탭] --> ADM-08: 비디오 재생
|   |   +-- [풀스크린] --> 가로 모드
|   |
|   +-- [하이라이트 만들기] --> ADM-09: ReID 소스 선택
|       +-- [소스 선택] --> ADM-10: 인물 선택
|           +-- [다음] --> ADM-11: 출력 설정
|               +-- [렌더 시작] --> ADM-13: 하이라이트 진행
|                   +-- [완료] --> ADM-14: 하이라이트 완료
|                       +-- [아카이브] --> ADM-07
|                       +-- [홈으로] --> ADM-01
|
+-- SCHEDULE 탭 (ADM-15: 스케줄 캘린더)
```

### 6.2 소비자 앱 네비게이션 흐름도

```
앱 진입
|
+-- [첫 실행] --> CON-01: 온보딩 (유형 선택)
|   +-- [선택] --> CON-02: 로그인
|       +-- [로그인 성공] --> CON-03: 프로필 설정
|           +-- [완료] --> CON-04: 홈
|
+-- MainScreen (3~4탭 셸)
    |
    +-- [Owner만] 촬영 탭 (CON-18: 카메라 연결)
    |
    +-- 영상 탭 (CON-04: 홈 - 구장 목록)
    |   |
    |   +-- [구장 추가] --> CON-05: 구장 추가 (QR/코드/GPS)
    |   |
    |   +-- [구장 선택] --> CON-06: 경기 목록
    |       +-- [경기 선택] --> CON-07: 경기 상세
    |           |
    |           +-- [영상 탭] --> CON-10: 비디오 플레이어
    |           |
    |           +-- [썸네일 탭] --> CON-09: 인물 하이라이트
    |           |   +-- [풀스크린] --> CON-10
    |           |
    |           +-- [썸네일 홀드] --> CON-08: 5초 미리보기 (인라인)
    |           |
    |           +-- [나 찾기] --> CON-12: ReID 워크플로우
    |               +-- [렌더] --> CON-13: 렌더 진행
    |                   +-- [완료] --> CON-14: 완료 + 공유
    |
    +-- 하이라이트 탭 (CON-11: 내 하이라이트 목록)
    |   +-- [하이라이트 탭] --> CON-10: 비디오 플레이어
    |
    +-- 마이 탭 (CON-17: 프로필)
        +-- [프로필 수정] --> CON-03
        +-- [알림] --> CON-15
        +-- [설정] --> CON-16

웹 미리보기 흐름:
QR/링크 --> WEB-01: 구장 경기 페이지
    +-- [경기 선택] --> WEB-02: 1분 하이라이트 미리보기
        +-- [더 보기] --> WEB-03: 앱 설치 유도
            +-- [앱 설치] --> 앱 CON-04 (웹에서 보던 구장 자동 연결)
```

### 6.3 화면 간 전환 조건 요약

| 출발 | 도착 | 트리거 |
|------|------|--------|
| ADM-01 | ADM-02 | 카메라 카드 탭 |
| ADM-02 | ADM-03 | 풀스크린 버튼 탭 |
| ADM-02 | ADM-05 | STOP RECORDING 버튼 탭 |
| ADM-05 | ADM-06 | 저장 작업 자동 완료 |
| ADM-06 | ADM-07 | "아카이브에서 보기" 버튼 탭 |
| ADM-06 | ADM-01 | "홈으로" 버튼 탭 |
| ADM-07 | ADM-08 | 영상 카드 탭 |
| ADM-07 | ADM-09 | "하이라이트 만들기" 버튼 탭 |
| ADM-09 | ADM-10 | 소스 선택 완료 |
| ADM-10 | ADM-11 | "다음" 버튼 탭 |
| ADM-11 | ADM-13 | "렌더 시작" 버튼 탭 |
| ADM-13 | ADM-14 | 모든 렌더 세션 완료 |
| CON-01 | CON-02 | 유형 선택 (Owner/Visitor) |
| CON-02 | CON-03 | 로그인 성공 (최초) |
| CON-04 | CON-06 | 구장 카드 탭 |
| CON-06 | CON-07 | 경기 카드 탭 |
| CON-07 | CON-10 | 영상 카드 탭 |
| CON-07 | CON-09 | 썸네일 탭 |
| CON-07 | CON-12 | "나 찾기" 버튼 탭 |
| CON-12 | CON-13 | "하이라이트 만들기" 버튼 탭 |
| CON-13 | CON-14 | 렌더 완료 |

---

## 7. API 연동 스펙

### 7.1 카메라 API (각 카메라 장치, 포트 8000)

| Method | Endpoint | 설명 | 타임아웃 |
|--------|----------|------|---------|
| GET | `/api/v1/ping` | 헬스 체크 | 100ms |
| GET | `/api/v1/status` | 녹화 상태 조회 | 5s |
| POST | `/api/v1/start` | 녹화 시작 | 10s |
| POST | `/api/v1/end` | 녹화 중지 | 10s |
| GET | `/api/v1/metrics` | 실시간 메트릭 | 5s |
| GET | `/api/v1/metrics?from_date=&to_date=` | 히스토리 메트릭 | 30s |
| POST | `/api/v1/set_camera_id?camera_id=N` | 카메라 ID 설정 | 5s |
| POST | `/api/v1/set_group_id?group_id=N` | 그룹 ID 설정 | 5s |
| GET | `/api/v1/get_camera_settings` | V4L2 카메라 설정 조회 | 5s |
| POST | `/api/v1/set_camera_settings` | 카메라 설정 변경 | 5s |
| POST | `/api/v1/webrtc/offer` | WebRTC SDP 교환 | 10s |
| POST | `/api/v1/webrtc/ice-candidate` | ICE candidate 전달 | 5s |
| POST | `/api/v1/webrtc/disconnect` | WebRTC 연결 해제 | 5s |
| GET | `/api/v1/webrtc/status` | WebRTC 상태 조회 | 5s |
| WS | `/ws/debug` | 실시간 탐지/추적 WebSocket | - |
| GET | `/api/v1/get_list` | 녹화 폴더/파일 목록 | 10s |
| POST | `/api/v1/download` | 파일 ZIP 다운로드 | 300s |
| GET | `/api/v1/sessions` | 미디어 세션 목록 | 10s |
| POST | `/api/v1/media/uploads` | 파일 업로드 (multipart, 2GB 제한) | 600s |
| POST | `/api/v1/media/concat` | 비디오 병합 작업 생성 | 10s |
| GET | `/api/v1/media/jobs/{id}` | 미디어 작업 상태 | 5s |
| GET | `/api/v1/media/jobs/{id}/download` | 작업 결과 다운로드 | 300s |
| GET | `/api/v1/reid/sessions` | ReID 세션 목록 | 10s |
| POST | `/api/v1/reid/sessions` | ReID 세션 생성 (비디오 업로드) | 600s |
| POST | `/api/v1/reid/sessions/from-path` | 서버 경로로 세션 생성 | 10s |
| GET | `/api/v1/reid/sessions/{id}/frame` | 특정 시점 프레임 + 검출 결과 | 10s |
| POST | `/api/v1/reid/sessions/{id}/select` | 추적 대상 선택 | 5s |
| POST | `/api/v1/reid/sessions/{id}/render` | 렌더 시작 | 10s |
| GET | `/api/v1/reid/sessions/{id}/status` | 렌더 진행 상태 | 5s |
| GET | `/api/v1/reid/sessions/{id}/result` | 결과 영상 다운로드 | 300s |
| DELETE | `/api/v1/reid/sessions/{id}` | 세션 삭제 | 5s |

### 7.2 스케줄 서버 API (192.168.0.155:3000)

| Method | Endpoint | 설명 |
|--------|----------|------|
| GET | `/schedule/weekly` | 주간 스케줄 조회 |
| POST | `/schedule/weekly` | 주간 스케줄 추가 |
| DELETE | `/schedule/weekly/{id}` | 주간 스케줄 삭제 |
| GET | `/schedule/overrides` | 오버라이드 조회 |
| POST | `/schedule/overrides` | 오버라이드 추가 |
| DELETE | `/schedule/overrides/{id}` | 오버라이드 삭제 |
| GET | `/schedule?date=YYYY-MM-DD` | 특정일 유효 스케줄 |
| GET | `/schedule/range?start=&end=` | 기간 유효 스케줄 |
| GET | `/schedule/now` | 현재 시점 스케줄 |
| POST | `/schedule/seed-holidays?year=&overwrite=` | 공휴일 일괄 등록 |

### 7.3 소비자 앱 신규 API (백엔드 미정)

아래는 소비자 앱에 필요한 신규 API 엔드포인트 목록이다. 백엔드 구현은 미정이며, 인터페이스 설계용으로 제시한다.

#### 인증 API

| Method | Endpoint | 설명 |
|--------|----------|------|
| POST | `/auth/social` | 소셜 로그인 (카카오/네이버/구글/애플) |
| POST | `/auth/email/signup` | 이메일 회원가입 |
| POST | `/auth/email/login` | 이메일 로그인 |
| POST | `/auth/refresh` | 토큰 갱신 |
| DELETE | `/auth/logout` | 로그아웃 |

#### 사용자 API

| Method | Endpoint | 설명 |
|--------|----------|------|
| GET | `/users/me` | 내 프로필 조회 |
| PUT | `/users/me` | 프로필 수정 |
| PUT | `/users/me/type` | 사용자 유형 전환 (Owner/Visitor) |
| PUT | `/users/me/avatar` | 프로필 사진 업로드 |

#### 구장 API

| Method | Endpoint | 설명 |
|--------|----------|------|
| GET | `/venues` | 내 구장 목록 |
| POST | `/venues/join` | 구장 추가 (QR코드/6자리 코드) |
| POST | `/venues/nearby` | GPS 주변 구장 검색 |
| DELETE | `/venues/{id}/leave` | 구장 연결 해제 |
| PUT | `/venues/{id}/favorite` | 즐겨찾기 설정/해제 |

#### 경기 API

| Method | Endpoint | 설명 |
|--------|----------|------|
| GET | `/venues/{venueId}/matches` | 경기 목록 (날짜순) |
| GET | `/matches/{id}` | 경기 상세 (영상 3종 + 선수 그리드) |
| GET | `/matches/{id}/videos` | 경기 영상 목록 (전체, 1분, 10분) |
| GET | `/matches/{id}/players` | 경기 참여 선수 썸네일 목록 |
| GET | `/matches/{id}/players/{playerId}/highlight` | 개인 하이라이트 영상 |
| GET | `/matches/{id}/players/{playerId}/preview` | 5초 미리보기 영상 |

#### 하이라이트 API

| Method | Endpoint | 설명 |
|--------|----------|------|
| GET | `/highlights` | 내 하이라이트 목록 |
| POST | `/highlights/reid` | ReID "나 찾기" 요청 |
| GET | `/highlights/{id}/status` | 렌더 진행 상태 |
| GET | `/highlights/{id}/download` | 하이라이트 다운로드 |
| POST | `/highlights/{id}/share` | 공유 링크 생성 |

#### 알림 API

| Method | Endpoint | 설명 |
|--------|----------|------|
| GET | `/notifications` | 알림 목록 |
| PUT | `/notifications/{id}/read` | 읽음 처리 |
| PUT | `/notifications/settings` | 알림 설정 변경 |

---

## 8. 데이터 모델

### 8.1 카메라 & 네트워크

**Camera**

| 필드 | 타입 | 설명 |
|------|------|------|
| id | int | 자동 증가 PK |
| ip | string (unique) | 카메라 IP 주소 |
| cameraId | int | 카메라 고유 ID |
| name | string | 기본 이름 |
| customName | string? | 사용자 지정 이름 |
| groupId | int | 그룹 ID |
| discoveredAt | datetime | 최초 발견 시간 |
| lastSeenAt | datetime | 마지막 확인 시간 |

**CameraStatus**

| 필드 | 타입 | 설명 |
|------|------|------|
| cameraId | int | 카메라 ID |
| isRecording | boolean | 녹화 중 여부 |
| groupId | int | 그룹 ID |

**WifiStatus**

| 필드 | 타입 | 설명 |
|------|------|------|
| connected | boolean | WiFi 연결 여부 |
| ssid | string? | 연결된 SSID |
| localIp | string? | 로컬 IP 주소 |

**WebrtcStatus**

| 필드 | 타입 | 설명 |
|------|------|------|
| state | enum | connecting / connected / disconnected / failed |
| settings | object | { codec, resolution, fps } |

**DiscoveryProgressState**

| 필드 | 타입 | 설명 |
|------|------|------|
| scanning | boolean | 스캔 진행 중 |
| scannedCount | int | 스캔 완료 IP 수 |
| totalCount | int | 전체 IP 수 (254) |
| foundCameras | Camera[] | 발견된 카메라 목록 |

---

### 8.2 메트릭

**MetricsResponse**

| 필드 | 타입 | 설명 |
|------|------|------|
| recording | RecordingMetrics | 녹화 메트릭 |
| upload | UploadMetrics | 업로드 메트릭 |
| system | SystemMetrics | 시스템 메트릭 |
| camera | CameraMetrics | 카메라 메트릭 |
| tracking | TrackingMetrics | 추적 메트릭 |
| health | HealthMetrics | 건강 상태 |

**RecordingMetrics**

| 필드 | 타입 | 설명 |
|------|------|------|
| isActive | boolean | 녹화 활성 여부 |
| startedAt | datetime? | 시작 시간 |
| durationSeconds | int | 경과 시간 (초) |
| sessionId | string? | 세션 ID |
| sessionDir | string? | 세션 디렉토리 경로 |

**UploadMetrics**

| 필드 | 타입 | 설명 |
|------|------|------|
| totalSegments | int | 총 세그먼트 수 |
| completedSegments | int | 완료 세그먼트 수 |
| pendingSegments | int | 대기 세그먼트 수 |
| failedSegments | int | 실패 세그먼트 수 |
| speed | float | 업로드 속도 (Mbps) |

**SystemMetrics**

| 필드 | 타입 | 설명 |
|------|------|------|
| cpuPercent | float | CPU 사용률 (%) |
| memoryPercent | float | 메모리 사용률 (%) |
| temperature | float | 온도 (C) |
| npuLoad | float | NPU 부하 (%) |
| disk | DiskMetrics | 디스크 상태 |
| gstreamer | boolean | GStreamer 프로세스 상태 |

**DiskMetrics**

| 필드 | 타입 | 설명 |
|------|------|------|
| usedGb | float | 사용된 용량 (GB) |
| totalGb | float | 전체 용량 (GB) |
| usedPercent | float | 사용률 (%) |

**CameraMetrics**

| 필드 | 타입 | 설명 |
|------|------|------|
| pipeline | string | 파이프라인 상태 |
| settings | object | V4L2 파라미터 13개 (gain, exposure, brightness, contrast, saturation, hue, gamma, sharpness, backlight_compensation, white_balance_temperature, focus, zoom, auto_gain) |
| autoGain | boolean | 자동 게인 활성화 |

**TrackingMetrics**

| 필드 | 타입 | 설명 |
|------|------|------|
| modelLoaded | boolean | YOLO 모델 로드 상태 |
| inferenceTimeMs | float | 추론 시간 (ms) |
| detections | object | { balls: int, persons: int } |
| motor | object | { angle: float, direction: string } |

**HealthMetrics**

| 필드 | 타입 | 설명 |
|------|------|------|
| status | enum | healthy / degraded / error |
| warnings | string[] | 경고 메시지 목록 |
| errors | string[] | 에러 메시지 목록 |

---

### 8.3 미디어 & 아카이브

**MediaSession**

| 필드 | 타입 | 설명 |
|------|------|------|
| sessionId | string | 세션 고유 ID |
| kind | enum | recording / uploaded / derived |
| videos | MediaVideo[] | 세션 내 영상 목록 |
| createdAt | datetime | 생성 시간 |

**MediaVideo**

| 필드 | 타입 | 설명 |
|------|------|------|
| filename | string | 파일명 |
| path | string | 파일 경로 |
| size | int | 파일 크기 (bytes) |
| duration | float | 영상 길이 (초) |
| resolution | string | 해상도 (예: "3840x2160") |
| createdAt | datetime | 생성 시간 |

**MediaJob**

| 필드 | 타입 | 설명 |
|------|------|------|
| jobId | string | 작업 ID |
| status | enum | pending / processing / completed / failed |
| output | string? | 결과 파일 경로 |

**ArchiveItem**

| 필드 | 타입 | 설명 |
|------|------|------|
| type | enum | recording / highlight / reidResult |
| data | MediaSession 또는 ReidSession | union 타입 |

---

### 8.4 ReID

**ReidSession**

| 필드 | 타입 | 설명 |
|------|------|------|
| id | string | 세션 ID |
| status | enum | pending / processing / completed / failed |
| probe | object? | 프로브 이미지 정보 |
| renderConfig | ReidRenderConfig? | 렌더 설정 |
| createdAt | datetime | 생성 시간 |

**ReidFrameResponse**

| 필드 | 타입 | 설명 |
|------|------|------|
| frameData | string | Base64 인코딩 프레임 이미지 |
| detections | ReidDetection[] | 검출 결과 목록 |

**ReidDetection**

| 필드 | 타입 | 설명 |
|------|------|------|
| bbox | object | { x1: float, y1: float, x2: float, y2: float } |
| score | float | 검출 신뢰도 (0~1) |
| trackId | int | 추적 ID |

**ReidSelectRequest**

| 필드 | 타입 | 설명 |
|------|------|------|
| bbox | object | { x1, y1, x2, y2 } 선택 영역 |
| probeImage | string? | 프로브 이미지 (Base64, 선택) |

**ReidRenderConfig**

| 필드 | 타입 | 설명 |
|------|------|------|
| scoreThreshold | float | 점수 임계값 |
| matchThreshold | float | 매칭 임계값 |
| outputFps | int | 출력 FPS |
| bitrate | int | 비트레이트 |
| debug | boolean | 디버그 모드 |

**ReidRenderStatus**

| 필드 | 타입 | 설명 |
|------|------|------|
| status | enum | pending / processing / completed / failed |
| progress | int | 진행률 (0~100) |
| message | string? | 상태 메시지 |

**BatchReidPerson**

| 필드 | 타입 | 설명 |
|------|------|------|
| name | string | 인물 이름/라벨 |
| bbox | object | { x1, y1, x2, y2 } |
| probeImage | string? | 프로브 이미지 (Base64) |

**BatchReidState**

| 필드 | 타입 | 설명 |
|------|------|------|
| persons | BatchReidPerson[] | 선택된 인물 목록 |
| results | object[] | 인물별 { sessionId: string, status: enum } |

---

### 8.5 스케줄

**WeeklyEntry**

| 필드 | 타입 | 설명 |
|------|------|------|
| id | int | PK |
| dayOfWeek | int | 요일 (0=일, 1=월, ..., 6=토) |
| startHour | int | 시작 시간 (0~23) |
| endHour | int | 종료 시간 (0~23) |

**OverrideEntry**

| 필드 | 타입 | 설명 |
|------|------|------|
| id | int | PK |
| date | string | 날짜 (YYYY-MM-DD) |
| isOff | boolean | 휴무 여부 |
| startHour | int? | 시작 시간 (오버라이드) |
| endHour | int? | 종료 시간 (오버라이드) |
| memo | string? | 메모 |

**EffectiveSchedule**

| 필드 | 타입 | 설명 |
|------|------|------|
| date | string | 날짜 (YYYY-MM-DD) |
| isActive | boolean | 촬영 활성 여부 |
| slots | object[] | 시간대 리스트 [{ startHour, endHour }] |
| source | enum | weekly / override |

---

### 8.6 소비자 앱 신규 데이터 모델

**User**

| 필드 | 타입 | 설명 |
|------|------|------|
| id | string | UUID |
| name | string | 이름 |
| email | string? | 이메일 |
| avatarUrl | string? | 프로필 사진 URL |
| team | string? | 소속 팀/클럽 |
| number | int? | 등번호 |
| position | enum? | GK / DF / MF / FW |
| userType | enum | owner / visitor |
| socialProvider | enum? | kakao / naver / google / apple |

**Venue (구장)**

| 필드 | 타입 | 설명 |
|------|------|------|
| id | string | UUID |
| name | string | 구장 이름 |
| address | string? | 주소 |
| latitude | float? | 위도 |
| longitude | float? | 경도 |
| code | string | 6자리 입장 코드 |
| isFavorite | boolean | 즐겨찾기 여부 |
| lastMatchDate | datetime? | 최근 경기 날짜 |

**Match (경기)**

| 필드 | 타입 | 설명 |
|------|------|------|
| id | string | UUID |
| venueId | string | 구장 ID |
| startTime | datetime | 시작 시간 |
| endTime | datetime | 종료 시간 |
| teamA | string? | A팀 이름 |
| teamB | string? | B팀 이름 |
| hasFullVideo | boolean | 전체 영상 여부 |
| has1minHighlight | boolean | 1분 하이라이트 여부 |
| has10minHighlight | boolean | 10분 하이라이트 여부 |
| playerCount | int | 참여 선수 수 |

**Player (경기 참여 선수)**

| 필드 | 타입 | 설명 |
|------|------|------|
| id | string | UUID |
| matchId | string | 경기 ID |
| thumbnailUrl | string | 크롭 썸네일 URL |
| number | int? | 등번호 (감지된 경우) |
| previewUrl | string? | 5초 미리보기 영상 URL |
| highlightUrl | string? | 개인 하이라이트 영상 URL |

**Highlight (하이라이트)**

| 필드 | 타입 | 설명 |
|------|------|------|
| id | string | UUID |
| matchId | string | 경기 ID |
| userId | string? | 요청 사용자 ID |
| type | enum | auto_1min / auto_10min / reid_personal |
| status | enum | pending / processing / completed / failed |
| progress | int | 진행률 (0~100) |
| videoUrl | string? | 결과 영상 URL |
| duration | float? | 영상 길이 (초) |
| createdAt | datetime | 생성 시간 |

**Notification (알림)**

| 필드 | 타입 | 설명 |
|------|------|------|
| id | string | UUID |
| userId | string | 대상 사용자 ID |
| type | enum | highlight_ready / match_start / match_end / new_video |
| title | string | 알림 제목 |
| body | string | 알림 본문 |
| isRead | boolean | 읽음 여부 |
| data | object? | 추가 데이터 (matchId, highlightId 등) |
| createdAt | datetime | 생성 시간 |

---

## 9. 관리자 앱 P0 추가 기능 스펙

CAPPIC_APP_SPEC.md 11장 기반. 현재 앱에 없으며 반드시 구현해야 하는 항목.

### 9.1 사용자 인증/권한 관리

현재 앱은 인증 없이 누구나 접근 가능 -- 보안/운영상 심각한 결함.

**역할 체계:**

| 역할 | 권한 |
|------|------|
| admin | 모든 기능 + 사용자 관리 + 시설 설정 |
| coach | 녹화 제어 + 영상 관리 + 하이라이트 + 스케줄 |
| staff | 녹화 제어 + 영상 조회 (설정 변경 불가) |

**화면: ADM-LOGIN**
- 레이아웃: 로고 + 이메일 입력 + 비밀번호 입력 + 로그인 버튼
- 컴포넌트: input x2, btn-primary btn-full btn-lg
- API: POST /api/auth/login (email, password) -> token
- 상태: default / loading (btn 로딩) / error (입력 하단 에러 메시지)

**화면: ADM-USERS (사용자 관리, admin 역할만 접근)**
- 레이아웃: top-bar("사용자 관리") + 사용자 리스트 + 추가 버튼
- 컴포넌트: list-item (이름 + 역할 badge), btn-primary
- API: GET /api/admin/users, POST /api/admin/users, DELETE /api/admin/users/{id}

**데이터 모델: AdminUser**

| 필드 | 타입 | 설명 |
|------|------|------|
| id | string | UUID |
| email | string | 로그인 이메일 |
| name | string | 이름 |
| role | enum | admin / coach / staff |
| venueId | string | 소속 시설 ID |
| createdAt | datetime | 생성 시간 |

### 9.2 카메라 장애 알림

**알림 트리거 조건:**

| 조건 | 임계값 | 메시지 |
|------|--------|--------|
| 배터리 부족 | < 20% | "카메라 1 배터리가 부족해요 (15%)" |
| 저장공간 부족 | < 2GB | "카메라 2 저장공간이 부족해요 (1.3GB)" |
| 온도 과열 | > 75C | "카메라 3 온도가 높아요 (78C)" |
| 네트워크 끊김 | ping 3회 실패 | "카메라 1 연결이 끊어졌어요" |
| 녹화 중단 | 예상치 못한 중지 | "카메라 2 녹화가 중단되었어요" |

**구현:**
- 카메라 상태 폴링 (5초) 시 임계값 체크
- 임계값 초과 시 인앱 배너 + 로컬 알림
- ADM-01 홈 화면 상단에 경고 배너 카드 추가
- 컴포넌트: card + badge-error + status-dot-error

**API:** GET /api/v1/alerts, POST /api/v1/alerts/{id}/dismiss

### 9.3 카메라 펌웨어 OTA

**ADM-02 카메라 상세 내 펌웨어 섹션 추가:**
- 현재 버전 표시 (예: v2.1.3)
- 새 버전 사용 가능 시 badge-accent "업데이트 가능"
- 업데이트 버튼 -> progress bar -> 완료 toast

**API:** GET /api/v1/firmware/check, POST /api/v1/firmware/update, GET /api/v1/firmware/status

### 9.4 경기/이벤트 관리

**화면: ADM-MATCH**
- 레이아웃: top-bar("경기 관리") + 날짜별 경기 리스트 + 추가 버튼
- 경기 카드: 시간, 팀A vs 팀B, 코트, 상태(예정/진행중/종료)
- 경기와 녹화 자동 연결 (스케줄 시간 매칭)

**데이터 모델: AdminMatch**

| 필드 | 타입 | 설명 |
|------|------|------|
| id | string | UUID |
| venueId | string | 시설 ID |
| date | date | 경기 날짜 |
| startTime | time | 시작 시간 |
| endTime | time | 종료 시간 |
| teamA | string | 팀A 이름 |
| teamB | string | 팀B 이름 |
| court | string? | 코트/필드 번호 |
| status | enum | scheduled / recording / completed |
| recordingIds | string[] | 연결된 녹화 ID |

**API:** GET /api/admin/matches, POST /api/admin/matches, PUT /api/admin/matches/{id}, DELETE /api/admin/matches/{id}

### 9.5 클라우드 자동 동기화

- 녹화 종료 감지 -> 자동 업로드 큐 등록
- ADM-07 아카이브에 업로드 상태 표시 (progress bar + 속도)
- 설정: 자동 업로드 on/off, WiFi 전용 옵션

**API:** POST /api/v1/cloud/sync, GET /api/v1/cloud/status

---

## 10. 관리자 UX 설계 원칙

IT 수준이 낮은 시설 관리자(축구교실 코치, 풋살장 운영자) 대응.

### 10.1 전문용어 -> 사용자 언어 매핑

| 기술 용어 | 표시 텍스트 |
|----------|-----------|
| WebRTC | 실시간 화면 |
| metrics | 카메라 상태 |
| ReID | 선수 하이라이트 |
| discovery | 카메라 찾기 |
| firmware | 소프트웨어 |
| OTA update | 업데이트 |
| subnet scan | 자동 검색 |
| batch recording | 한꺼번에 녹화 |
| render | 영상 만들기 |
| threshold | 정확도 |
| concat | 영상 합치기 |
| upload / download | 올리기 / 내려받기 |

### 10.2 카메라 상태 신호등

| 색상 | CSS 클래스 | 의미 | 메시지 패턴 |
|------|-----------|------|-----------|
| 초록 | status-dot-ok | 정상 | "카메라가 잘 작동하고 있어요" |
| 노랑 | status-dot-warn | 주의 | "저장공간이 부족해요" |
| 빨강 | status-dot-error | 오류 | "연결이 끊어졌어요. Wi-Fi를 확인해주세요" |
| 회색 | status-dot-off | 꺼짐 | "카메라가 꺼져 있어요" |

### 10.3 핵심 UX 원칙

| 원칙 | 기준 |
|------|------|
| 큰 터치 타겟 | 최소 44px, 요소 간 8px+ 간격 |
| 한 화면 한 작업 | 주요 CTA 1개, 메뉴 깊이 3단계 이내 |
| 즉각적 피드백 | 터치 scale(0.97), 성공/오류 toast 즉시 |
| 자동화 극대화 | 스케줄 자동 녹화, 자동 하이라이트, 자동 업로드 |
| 오류 방지 | 삭제 전 확인 다이얼로그, 친절한 오류 메시지 |

### 10.4 온보딩 가이드 (4단계)

| 단계 | 트리거 | 메시지 | 액션 |
|------|--------|--------|------|
| 1 | 첫 실행 | "카메라를 찾아볼까요?" | 자동 검색 시작 |
| 2 | 카메라 발견 | "카메라 N대를 찾았어요!" | 이름 설정 안내 |
| 3 | 첫 녹화 | "녹화를 시작해볼까요?" | 시작 버튼 안내 |
| 4 | 첫 하이라이트 | "선수를 찾아볼까요?" | 워크플로우 안내 |

구현: overlay + card 조합, 단계 완료 시 로컬 스토리지 플래그 저장

---

## 11. 소비자 앱 라이브 스트리밍 (CON-19, Owner 전용)

**접근:** CON-18 -> "라이브 스트리밍" 버튼

**레이아웃:**
1. top-bar ("라이브 스트리밍", 뒤로가기)
2. 비디오 프리뷰 (video-card, 16:9)
3. 상태 표시 (rec-dot + "LIVE" badge-error + 시청자 수)
4. 플랫폼 선택 (chip: YouTube / Facebook)
5. 스트리밍 URL/키 입력 (input x2)
6. 스코어보드 (팀A + 팀B + 점수 +/- 버튼)
7. 시작/중지 (btn-danger btn-full btn-lg)
8. 공유 링크 복사 (btn-outline btn-full)

**API:** POST /api/v1/streaming/start, POST /api/v1/streaming/stop, GET /api/v1/streaming/status, PUT /api/v1/streaming/scoreboard

**상태:** 대기(플랫폼+URL 입력) / 라이브(rec-dot+LIVE+시청자수) / 종료(toast)

---

## 12. 소비자 앱 MVP 범위 및 차별화

### 12.1 MVP (v1.0) 포함 화면

CON-01~18, WEB-01~03 (총 21개)

v2.0 이후: CON-19 (라이브 스트리밍), 하이라이트 편집, 팀 피드, 개인 통계, 히트맵

### 12.2 핵심 차별화

| 차별화 | 내용 | 경쟁사 대비 |
|--------|------|-----------|
| ReID 기반 추적 | 등번호 불필요 | Veo/Trace 등번호 의존 |
| 9개 액션 분류 | Drive/Pass/Shot 등 자동 분류 | 경쟁사는 분류 없음 |
| RK3588 엣지 AI | 카메라 내 실시간 추론 | 경쟁사 클라우드 의존 |
| 풋살 특화 | 실내 최적화 | 경쟁사 11인 필드 기준 |
| 한국 네이티브 | 카카오/네이버 로그인 | 경쟁사 해외 |
| 웹 미리보기 유도 | QR -> 1분 하이라이트 무료 -> 앱 설치 | 경쟁사 없음 |

---

## 13. 참고 문서

상세 리서치는 reference/ 폴더 참조:
- reference/CAPPIC_APP_SPEC.md -- 전체 기능 명세, 경쟁사 분석, 로드맵
- reference/TOSS_RESEARCH.md -- 토스 오픈소스 + Rally + 모션 디자인 철학
- reference/UI_LIBRARY_RESEARCH.md -- 8개 UI 라이브러리 비교
- reference/UI_LIBRARY_CAPPIC_NEEDS.md -- Cappic UI 요구사항 매핑
