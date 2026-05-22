# UI Library Research Report

> 작성일: 2026-05-17
> 목적: Cappic 앱 프론트엔드 구축을 위한 UI 라이브러리 선정 및 디자인 시스템 설계 근거 확보

---

## 목차

1. [개요 및 비교 요약 테이블](#1-개요-및-비교-요약-테이블)
2. [라이브러리별 상세 섹션](#2-라이브러리별-상세-섹션)
   - 2.1 shadcn/ui
   - 2.2 Material UI (MUI)
   - 2.3 Ant Design
   - 2.4 Mantine
   - 2.5 DaisyUI
   - 2.6 Radix UI
   - 2.7 Headless UI
   - 2.8 React Aria (Adobe)
3. [디자인 토큰 비교](#3-디자인-토큰-비교)
4. [컴포넌트 합성 패턴 비교](#4-컴포넌트-합성-패턴-비교)
5. [애니메이션/모션 비교](#5-애니메이션모션-비교)
6. [반응형 디자인 비교](#6-반응형-디자인-비교)
7. [접근성 비교](#7-접근성-비교)
8. [테마/커스터마이징 비교](#8-테마커스터마이징-비교)
9. [Cappic 앱에 적용할 Best Practice 종합](#9-cappic-앱에-적용할-best-practice-종합)

---

## 1. 개요 및 비교 요약 테이블

### 1.1 라이브러리 분류

UI 라이브러리는 추상화 수준에 따라 세 가지 계층으로 분류할 수 있다.

| 계층 | 설명 | 해당 라이브러리 |
|------|------|----------------|
| **Headless (Unstyled)** | 행동/접근성만 제공, 스타일 없음 | Radix UI, Headless UI, React Aria |
| **Copy-Paste / Utility** | 소스 코드를 프로젝트에 복사, Tailwind 기반 | shadcn/ui, DaisyUI |
| **Full-Featured** | 완성된 디자인 시스템 + 컴포넌트 | Material UI, Ant Design, Mantine |

### 1.2 종합 비교 테이블

| 항목 | shadcn/ui | Material UI | Ant Design | Mantine | DaisyUI | Radix UI | Headless UI | React Aria |
|------|-----------|-------------|------------|---------|---------|----------|-------------|------------|
| **컴포넌트 수** | 67+ | 65+ | 72 | 120+ | 64 | 30+ | 16 | 50+ |
| **스타일 방식** | Tailwind CSS v4 | Emotion / CSS Variables | CSS-in-JS / CSS Variables | CSS Modules / PostCSS | Tailwind plugin (CSS) | 없음 (Unstyled) | 없음 (Unstyled) | 없음 (Unstyled) |
| **번들 방식** | 복사 (소스 소유) | npm 패키지 | npm 패키지 | npm 패키지 | Tailwind plugin | npm 패키지 | npm 패키지 | npm 패키지 |
| **TypeScript** | 완전 지원 | 완전 지원 | 완전 지원 | 완전 지원 | N/A (CSS only) | 완전 지원 | 완전 지원 | 완전 지원 |
| **색상 시스템** | OKLCH 시맨틱 토큰 | Material Design palette | 3계층 토큰 (Seed/Map/Alias) | 14색 x 10단계 | OKLCH 시맨틱 | 12단계 기능별 스케일 | 없음 | 없음 |
| **다크 모드** | .dark 클래스 | createTheme() | darkAlgorithm | colorScheme prop | data-theme | Alpha 변형 | 없음 | 없음 |
| **SSR 지원** | Next.js 네이티브 | 지원 | 지원 | 지원 | 지원 | 지원 | 지원 | 지원 |
| **접근성** | Radix 기반 WAI-ARIA | WAI-ARIA | WAI-ARIA | WAI-ARIA | 시맨틱 HTML | WAI-ARIA 완전 준수 | WAI-ARIA 완전 준수 | WAI-ARIA 최고 수준 |
| **국제화 (i18n)** | 없음 | 제한적 | 50+ 언어 | 없음 | 없음 | 없음 | 없음 | 30+ 언어, 13개 달력 |
| **모바일 반응형** | Dialog-Drawer 전환 | Breakpoint 시스템 | Grid 시스템 | em 브레이크포인트 | Tailwind responsive | 없음 | 없음 | 모바일 터치 스크린 리더 |
| **런타임 JS** | 최소 (Radix) | 있음 | 있음 | 있음 | 없음 | 있음 | 있음 | 있음 |
| **React 외 지원** | 없음 | 없음 | Vue (antdv) | 없음 | 프레임워크 무관 | 없음 | React/Vue | 없음 |
| **라이선스** | MIT | MIT | MIT | MIT | MIT | MIT | MIT | Apache 2.0 |

---

## 2. 라이브러리별 상세 섹션

---

### 2.1 shadcn/ui

> **"소유 가능한 컴포넌트 모음."** 패키지가 아닌, 프로젝트에 직접 복사하는 소스 코드 컬렉션.

#### 2.1.1 기반 기술 스택

| 기술 | 역할 |
|------|------|
| **Radix UI** | Headless 프리미티브 (Dialog, Popover, Select 등) |
| **Tailwind CSS v4** | 유틸리티 기반 스타일링 |
| **CVA (Class Variance Authority)** | Variant 시스템 (size, variant 조합) |
| **Embla Carousel** | Carousel 컴포넌트 기반 |
| **Recharts** | Chart 컴포넌트 기반 |
| **Vaul** | Drawer 컴포넌트 기반 |
| **Sonner** | Toast/Notification 시스템 |

#### 2.1.2 전체 컴포넌트 목록 (67+ 컴포넌트, 카테고리별)

**Layout (레이아웃)**

| 컴포넌트 | 설명 |
|----------|------|
| Accordion | 접을 수 있는 콘텐츠 영역 |
| AspectRatio | 종횡비 유지 컨테이너 |
| Card | 콘텐츠 카드 (Header, Content, Footer) |
| Collapsible | 열기/닫기 가능한 영역 |
| Resizable | 크기 조절 가능 패널 |
| ScrollArea | 커스텀 스크롤바 영역 |
| Separator | 구분선 (수평/수직) |
| Sheet | 화면 측면 슬라이드 패널 |
| Sidebar | 사이드바 네비게이션 |
| Tabs | 탭 네비게이션 콘텐츠 |

**Navigation (네비게이션)**

| 컴포넌트 | 설명 |
|----------|------|
| Breadcrumb | 경로 탐색 |
| Command | 커맨드 팔레트 (cmdk 기반) |
| Menubar | 수평 메뉴바 |
| NavigationMenu | 드롭다운 네비게이션 메뉴 |
| Pagination | 페이지네이션 |
| Stepper | 단계별 진행 표시 |

**Forms (폼 입력)**

| 컴포넌트 | 설명 |
|----------|------|
| Button | 버튼 (default, destructive, outline, secondary, ghost, link) |
| Calendar | 달력 (react-day-picker 기반) |
| Checkbox | 체크박스 |
| Combobox | 자동완성 콤보박스 |
| DatePicker | 날짜 선택기 |
| Form | React Hook Form 통합 폼 |
| Input | 텍스트 입력 |
| InputOTP | OTP 코드 입력 |
| Label | 폼 레이블 |
| RadioGroup | 라디오 버튼 그룹 |
| Select | 드롭다운 선택 |
| Slider | 슬라이더 |
| Switch | 토글 스위치 |
| Textarea | 다중 라인 텍스트 입력 |
| Toggle | 눌림 상태 토글 |
| ToggleGroup | 토글 그룹 |

**Popups (팝업/오버레이)**

| 컴포넌트 | 설명 |
|----------|------|
| AlertDialog | 확인/취소 알림 다이얼로그 |
| ContextMenu | 우클릭 컨텍스트 메뉴 |
| Dialog | 모달 다이얼로그 |
| Drawer | 하단/측면 서랍 (Vaul 기반) |
| DropdownMenu | 드롭다운 메뉴 |
| HoverCard | 호버 카드 |
| Popover | 팝오버 |
| Tooltip | 툴팁 |

**Feedback (피드백)**

| 컴포넌트 | 설명 |
|----------|------|
| Alert | 알림 배너 |
| Progress | 진행률 표시 |
| Skeleton | 로딩 스켈레톤 |
| Sonner | 토스트 알림 (Sonner 기반) |
| Toast | 토스트 알림 (Radix 기반) |

**Data Display (데이터 표시)**

| 컴포넌트 | 설명 |
|----------|------|
| Avatar | 아바타 이미지 |
| Badge | 뱃지/태그 |
| Carousel | 캐러셀 (Embla 기반) |
| Chart | 차트 (Recharts 기반: Area, Bar, Line, Pie, Radar, Radial) |
| DataTable | 데이터 테이블 (TanStack Table 기반) |
| Table | 기본 테이블 |

**Utility (유틸리티)**

| 컴포넌트 | 설명 |
|----------|------|
| cn() | tailwind-merge + clsx 유틸리티 함수 |
| ThemeProvider | 테마 제공자 (next-themes) |

#### 2.1.3 OKLCH 색상 토큰 시스템

shadcn/ui v2는 OKLCH 색상 공간을 사용한다. OKLCH는 인간의 색상 지각에 균일하게 대응하며, 명도(L)를 변경해도 채도(C)와 색상(H)이 일정하게 유지되는 장점이 있다.

**Background/Foreground 쌍 패턴:**

모든 시맨틱 색상은 배경과 전경을 쌍으로 정의한다.

```css
:root {
  /* 기본 쌍 */
  --background: oklch(1 0 0);          /* 페이지 배경 */
  --foreground: oklch(0.145 0 0);      /* 페이지 텍스트 */

  /* Primary 쌍 */
  --primary: oklch(0.205 0 0);         /* 주요 액션 배경 */
  --primary-foreground: oklch(0.985 0 0); /* 주요 액션 텍스트 */

  /* Secondary 쌍 */
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);

  /* Muted 쌍 */
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);

  /* Accent 쌍 */
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);

  /* Destructive 쌍 */
  --destructive: oklch(0.577 0.245 27.325);
  --destructive-foreground: oklch(0.577 0.245 27.325);

  /* Card 쌍 */
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);

  /* Popover 쌍 */
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);

  /* 기타 */
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
}
```

**Chart 전용 색상 (chart-1 ~ chart-5):**

```css
:root {
  --chart-1: oklch(0.646 0.222 41.116);   /* 주황/갈색 계열 */
  --chart-2: oklch(0.6 0.118 184.704);    /* 청록 계열 */
  --chart-3: oklch(0.398 0.07 227.392);   /* 어두운 파랑 */
  --chart-4: oklch(0.828 0.189 84.429);   /* 노랑/금색 */
  --chart-5: oklch(0.769 0.188 70.08);    /* 오렌지 */
}
```

**Sidebar 전용 색상 (sidebar-*):**

```css
:root {
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: oklch(0.205 0 0);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.708 0 0);
}
```

#### 2.1.4 단일 --radius 토큰 비례 스케일 시스템

shadcn/ui는 하나의 `--radius` CSS 변수로부터 모든 radius 값을 비례적으로 파생한다.

| 크기 | Tailwind 클래스 | 비례 계수 | --radius=0.625rem 기준 계산값 |
|------|----------------|-----------|------------------------------|
| sm | `rounded-sm` | 60% | `calc(var(--radius) - 0.25rem)` = 0.375rem |
| md (default) | `rounded-md` | 80% | `calc(var(--radius) - 0.125rem)` = 0.5rem |
| lg | `rounded-lg` | 100% | `var(--radius)` = 0.625rem |
| xl | `rounded-xl` | 140% | `calc(var(--radius) + 0.25rem)` = 0.875rem |
| 2xl | `rounded-2xl` | 180% | `calc(var(--radius) + 0.5rem)` = 1.125rem |
| 3xl | `rounded-3xl` | 220% | `calc(var(--radius) + 0.75rem)` = 1.375rem |
| 4xl | `rounded-4xl` | 260% | `calc(var(--radius) + 1rem)` = 1.625rem |

이 시스템의 장점은 `--radius` 값 하나만 변경하면 전체 UI의 둥근 정도가 일관되게 변경된다는 점이다.

#### 2.1.5 타이포그래피

shadcn/ui는 별도의 타이포그래피 컴포넌트를 제공하지 않으며, Tailwind CSS 유틸리티 클래스 조합으로 타이포그래피를 구성한다.

| 스타일 | Tailwind 클래스 | 결과 |
|--------|----------------|------|
| h1 | `scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl` | 36px / 48px (lg) |
| h2 | `scroll-m-20 text-3xl font-semibold tracking-tight` | 30px |
| h3 | `scroll-m-20 text-2xl font-semibold tracking-tight` | 24px |
| h4 | `scroll-m-20 text-xl font-semibold tracking-tight` | 20px |
| h5 | `text-lg font-semibold` | 18px |
| h6 | `text-base font-semibold` | 16px |
| paragraph | `leading-7 [&:not(:first-child)]:mt-6` | 기본 |
| lead | `text-xl text-muted-foreground` | 20px, 흐린 색상 |
| large | `text-lg font-semibold` | 18px |
| small | `text-sm font-medium leading-none` | 14px |
| muted | `text-sm text-muted-foreground` | 14px, 흐린 색상 |
| code | `font-mono text-sm bg-muted px-1.5 py-0.5 rounded` | 14px, 모노 |
| blockquote | `mt-6 border-l-2 pl-6 italic` | 좌측 보더, 이탤릭 |

#### 2.1.6 다크 모드

`.dark` 클래스를 `<html>` 또는 컨테이너 요소에 적용하면 CSS 변수가 오버라이드된다.

```css
.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --primary: oklch(0.985 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.396 0.141 25.723);
  --border: oklch(0.269 0 0);
  --input: oklch(0.269 0 0);
  --ring: oklch(0.439 0 0);
  --chart-1: oklch(0.488 0.243 264.376);
  --chart-2: oklch(0.696 0.17 162.48);
  --chart-3: oklch(0.769 0.188 70.08);
  --chart-4: oklch(0.627 0.265 303.9);
  --chart-5: oklch(0.645 0.246 16.439);
  --sidebar: oklch(0.205 0 0);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: oklch(0.488 0.243 264.376);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.269 0 0);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(0.269 0 0);
  --sidebar-ring: oklch(0.439 0 0);
}
```

#### 2.1.7 애니메이션 패턴

| 패턴 | 구현 방식 | 설명 |
|------|-----------|------|
| **Sidebar transition** | CSS transition `width`, `transform` | 사이드바 열림/닫힘 시 너비 트랜지션, 모바일에서는 Sheet로 전환 |
| **Skeleton pulse** | `animate-pulse` (Tailwind) | 콘텐츠 로딩 중 맥박 효과 |
| **Carousel swipe** | Embla Carousel API | 드래그/스와이프 기반 슬라이드, `basis-1/3` 등으로 슬라이드 너비 반응형 조절 |
| **Dialog/Sheet enter/exit** | Radix `data-state` + CSS animation | `data-state="open"` 시 `fade-in + slide-in`, `data-state="closed"` 시 `fade-out + slide-out` |
| **Sonner toast** | Sonner 내장 애니메이션 | 슬라이드 인/아웃, 스택 효과, swipe-to-dismiss |
| **Collapsible expand** | Radix Collapsible + CSS `grid-template-rows` 또는 `height` transition | `data-state="open/closed"`에 따른 높이 애니메이션 |

#### 2.1.8 모바일 반응형 패턴

**Dialog -> Drawer 전환 패턴:**

```tsx
// 데스크톱: Dialog, 모바일: Drawer (Vaul)
const isDesktop = useMediaQuery("(min-width: 768px)");

if (isDesktop) {
  return <Dialog>...</Dialog>;
}
return <Drawer>...</Drawer>;
```

**Sidebar mobile/desktop 상태:**

- 데스크톱: 고정 사이드바 (collapsible="icon" 시 아이콘 모드로 축소)
- 모바일: Sheet 오버레이로 전환, 스와이프로 닫기

**Carousel basis 반응형:**

```tsx
<CarouselItem className="basis-full md:basis-1/2 lg:basis-1/3">
  {/* 모바일: 1개, 태블릿: 2개, 데스크톱: 3개 */}
</CarouselItem>
```

#### 2.1.9 CVA (Class Variance Authority) 기반 Variants 시스템

```tsx
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
```

#### 2.1.10 asChild Prop 패턴 (Radix UI)

`asChild` prop을 사용하면 컴포넌트의 DOM 요소를 자식 요소로 위임할 수 있다.

```tsx
// Button이 <a> 태그로 렌더링됨
<Button asChild>
  <a href="/dashboard">Dashboard</a>
</Button>

// NavigationMenu에서 Link 컴포넌트 사용
<NavigationMenuLink asChild>
  <Link href="/about">About</Link>
</NavigationMenuLink>
```

---

### 2.2 Material UI (MUI)

> **"Google Material Design의 React 구현체."** 가장 성숙하고 광범위한 생태계를 보유.

#### 2.2.1 전체 컴포넌트 목록

**Inputs (13개)**

| 컴포넌트 | 설명 |
|----------|------|
| Autocomplete | 자동완성 텍스트 필드 |
| Button | 버튼 (Text, Contained, Outlined) |
| ButtonGroup | 버튼 그룹 |
| Checkbox | 체크박스 |
| FloatingActionButton (FAB) | 플로팅 액션 버튼 |
| RadioGroup | 라디오 그룹 |
| Rating | 별점 평가 |
| Select | 드롭다운 선택 |
| Slider | 슬라이더 |
| Switch | 토글 스위치 |
| TextField | 텍스트 필드 (Standard, Filled, Outlined) |
| ToggleButton | 토글 버튼 |
| TransferList | 전송 리스트 |

**Data Display (10개)**

| 컴포넌트 | 설명 |
|----------|------|
| Avatar | 아바타 |
| Badge | 뱃지 |
| Chip | 칩 |
| Divider | 구분선 |
| Icon | Material 아이콘 |
| List | 리스트 |
| Table | 테이블 |
| Tooltip | 툴팁 |
| Typography | 타이포그래피 |
| DataGrid (X) | 고급 데이터 그리드 (MUI X) |

**Feedback (6개)**

| 컴포넌트 | 설명 |
|----------|------|
| Alert | 알림 배너 |
| Backdrop | 배경 오버레이 |
| Dialog | 모달 다이얼로그 |
| Progress | 프로그레스 (Linear, Circular) |
| Skeleton | 로딩 스켈레톤 |
| Snackbar | 스낵바 알림 |

**Surfaces (4개)**

| 컴포넌트 | 설명 |
|----------|------|
| Accordion | 아코디언 |
| AppBar | 상단 앱바 |
| Card | 카드 |
| Paper | 종이 (Elevation 기반 표면) |

**Navigation (9개)**

| 컴포넌트 | 설명 |
|----------|------|
| BottomNavigation | 하단 네비게이션 |
| Breadcrumbs | 경로 탐색 |
| Drawer | 드로어 |
| Link | 링크 |
| Menu | 메뉴 |
| Pagination | 페이지네이션 |
| SpeedDial | 스피드 다이얼 |
| Stepper | 스테퍼 |
| Tabs | 탭 |

**Layout (5개)**

| 컴포넌트 | 설명 |
|----------|------|
| Box | 범용 래퍼 (sx prop) |
| Container | 콘텐츠 컨테이너 |
| Grid | 12열 그리드 시스템 (Grid v2) |
| Stack | 수직/수평 스택 |
| ImageList | 이미지 리스트 (Masonry 등) |

**Utils (12개)**

| 컴포넌트 | 설명 |
|----------|------|
| ClickAwayListener | 바깥 클릭 감지 |
| CSS Baseline | CSS 리셋 |
| Modal | 모달 인프라 |
| NoSsr | SSR 방지 래퍼 |
| Popover | 팝오버 인프라 |
| Popper | 위치 계산 (Floating UI) |
| Portal | Portal 렌더링 |
| TextareaAutosize | 자동 높이 조절 textarea |
| Transitions (Collapse, Fade, Grow, Slide, Zoom) | 트랜지션 컴포넌트 |
| useMediaQuery | 미디어 쿼리 훅 |

**Lab (6개, 실험적)**

| 컴포넌트 | 설명 |
|----------|------|
| LoadingButton | 로딩 상태 버튼 |
| Masonry | 벽돌식 레이아웃 |
| TabContext / TabList / TabPanel | 탭 컨텍스트 관리 |
| Timeline | 타임라인 |
| TreeView | 트리 뷰 |
| DatePicker / TimePicker (X) | 날짜/시간 선택기 (MUI X) |

#### 2.2.2 색상 시스템

**기본 팔레트:**

| 역할 | 기본값 | 용도 |
|------|--------|------|
| Primary | `#1976d2` (Blue 700) | 주요 인터랙티브 요소, AppBar, 버튼 |
| Secondary | `#9c27b0` (Purple 500) | 보조 액션, FAB, 선택 상태 |
| Error | `#d32f2f` (Red 700) | 에러 상태, 유효성 검증 실패 |
| Warning | `#ed6c02` (Orange 800) | 경고 알림 |
| Success | `#2e7d32` (Green 800) | 성공 상태 |
| Info | `#0288d1` (Light Blue 700) | 정보 알림 |

**Grey 스케일:**

| 단계 | 값 | 용도 |
|------|----|------|
| 50 | `#fafafa` | 밝은 배경 |
| 100 | `#f5f5f5` | 호버 상태 배경 |
| 200 | `#eeeeee` | 비활성 배경 |
| 300 | `#e0e0e0` | 구분선 (light) |
| 400 | `#bdbdbd` | 비활성 아이콘 |
| 500 | `#9e9e9e` | 비활성 텍스트 |
| 600 | `#757575` | 보조 텍스트 |
| 700 | `#616161` | 아이콘 |
| 800 | `#424242` | 다크 모드 표면 |
| 900 | `#212121` | 다크 모드 배경 |

**Text Opacity 계층:**

| 계층 | Opacity | 용도 |
|------|---------|------|
| primary | 0.87 (87%) | 본문 텍스트, 제목 |
| secondary | 0.6 (60%) | 보조 텍스트, 캡션 |
| disabled | 0.38 (38%) | 비활성 텍스트, 힌트 |

#### 2.2.3 타이포그래피 스케일

| Variant | Size | Weight | Line Height | Letter Spacing | 용도 |
|---------|------|--------|-------------|----------------|------|
| h1 | 96px (6rem) | 300 (Light) | 1.167 | -1.5px | 히어로 |
| h2 | 60px (3.75rem) | 300 (Light) | 1.2 | -0.5px | 섹션 제목 |
| h3 | 48px (3rem) | 400 (Regular) | 1.167 | 0 | 섹션 제목 |
| h4 | 34px (2.125rem) | 400 (Regular) | 1.235 | 0.25px | 카드 제목 |
| h5 | 24px (1.5rem) | 400 (Regular) | 1.334 | 0 | 서브헤딩 |
| h6 | 20px (1.25rem) | 500 (Medium) | 1.6 | 0.15px | 서브헤딩 |
| subtitle1 | 16px (1rem) | 400 (Regular) | 1.75 | 0.15px | 부제목 |
| subtitle2 | 14px (0.875rem) | 500 (Medium) | 1.57 | 0.1px | 부제목 |
| body1 | 16px (1rem) | 400 (Regular) | 1.5 | 0.15px | 본문 |
| body2 | 14px (0.875rem) | 400 (Regular) | 1.43 | 0.15px | 보조 본문 |
| button | 14px (0.875rem) | 500 (Medium) | 1.75 | 0.4px | 버튼 텍스트 (대문자) |
| caption | 12px (0.75rem) | 400 (Regular) | 1.66 | 0.4px | 캡션 |
| overline | 12px (0.75rem) | 400 (Regular) | 2.66 | 1px | 오버라인 (대문자) |

기본 폰트: **Roboto** (`"Roboto", "Helvetica", "Arial", sans-serif`)

#### 2.2.4 간격 시스템

**8px 기본 단위 배수 시스템:**

```js
theme.spacing(1)  // 8px
theme.spacing(2)  // 16px
theme.spacing(3)  // 24px
theme.spacing(0.5) // 4px

// sx prop 사용
<Box sx={{ p: 2, m: 1, gap: 3 }} />
// padding: 16px, margin: 8px, gap: 24px
```

#### 2.2.5 그림자 (Elevation)

24단계 elevation 시스템. 각 단계는 3개 레이어의 box-shadow로 구성된다:

- **Umbra**: 가장 진한 그림자 (light source에 의해 완전히 가려진 영역)
- **Penumbra**: 부분적으로 가려진 영역
- **Ambient**: 전체적인 은은한 그림자

```
elevation 0:  none
elevation 1:  0px 2px 1px -1px rgba(0,0,0,0.2),
              0px 1px 1px 0px rgba(0,0,0,0.14),
              0px 1px 3px 0px rgba(0,0,0,0.12)
elevation 4:  0px 2px 4px -1px rgba(0,0,0,0.2),
              0px 4px 5px 0px rgba(0,0,0,0.14),
              0px 1px 10px 0px rgba(0,0,0,0.12)
elevation 8:  0px 5px 5px -3px rgba(0,0,0,0.2),
              0px 8px 10px 1px rgba(0,0,0,0.14),
              0px 3px 14px 2px rgba(0,0,0,0.12)
elevation 16: 0px 8px 10px -5px rgba(0,0,0,0.2),
              0px 16px 24px 2px rgba(0,0,0,0.14),
              0px 6px 30px 5px rgba(0,0,0,0.12)
elevation 24: 0px 11px 15px -7px rgba(0,0,0,0.2),
              0px 24px 38px 3px rgba(0,0,0,0.14),
              0px 9px 46px 8px rgba(0,0,0,0.12)
```

#### 2.2.6 Border Radius

- 기본값: `4px`
- `theme.shape.borderRadius`로 전역 설정
- 컴포넌트별 오버라이드 가능

#### 2.2.7 Z-Index 스케일

| 컴포넌트 | Z-Index | 용도 |
|----------|---------|------|
| mobileStepper | 1000 | 모바일 스테퍼 |
| fab | 1050 | FAB |
| speedDial | 1050 | 스피드 다이얼 |
| appBar | 1100 | 상단 앱바 |
| drawer | 1200 | 드로어 |
| modal | 1300 | 모달 |
| snackbar | 1400 | 스낵바 |
| tooltip | 1500 | 툴팁 |

#### 2.2.8 Breakpoints

| 이름 | 시작점 | 용도 |
|------|--------|------|
| xs | 0px | 모바일 (portrait) |
| sm | 600px | 모바일 (landscape) |
| md | 900px | 태블릿 |
| lg | 1200px | 데스크톱 |
| xl | 1536px | 대형 데스크톱 |

#### 2.2.9 Material Design 3 주요 변경사항

| 항목 | MD2 (MUI 기본) | MD3 (진행 중) |
|------|----------------|---------------|
| **Dynamic Color** | 고정 팔레트 | 사용자 이미지/OS에서 색상 추출 |
| **Tonal Palette** | Light/Dark 2개 | 13단계 톤 (0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 99, 100) |
| **Shape** | 단일 borderRadius | 5단계 (None, Extra Small, Small, Medium, Large, Extra Large, Full) |
| **Elevation** | box-shadow 24단계 | 6단계 (0~5), 색조 기반 표면 색상 (Surface Tint) |

#### 2.2.10 애니메이션 시스템

**이징 곡선:**

| 이름 | cubic-bezier 값 | 용도 |
|------|-----------------|------|
| easeInOut (standard) | `(0.4, 0, 0.2, 1)` | 화면 내 이동, 크기 변경 |
| easeOut (enter) | `(0.0, 0, 0.2, 1)` | 요소 진입 (화면 밖 -> 안) |
| easeIn (exit) | `(0.4, 0, 1, 1)` | 요소 퇴장 (화면 안 -> 밖) |
| sharp | `(0.4, 0, 0.6, 1)` | 즉시 되돌아오는 요소 |

**Duration:**

| 이름 | 시간 | 용도 |
|------|------|------|
| shortest | 150ms | 가장 작은 요소 |
| shorter | 200ms | 작은 요소 |
| short | 250ms | 표준 |
| standard | 300ms | 복잡한 애니메이션 |
| complex | 375ms | 전체 화면 전환 |
| enteringScreen | 225ms | 화면 진입 |
| leavingScreen | 195ms | 화면 퇴장 |

**트랜지션 컴포넌트:**

| 컴포넌트 | 효과 | 기본 Duration |
|----------|------|---------------|
| Collapse | 높이 확장/축소 | 300ms (auto) |
| Fade | 투명도 전환 | enteringScreen / leavingScreen |
| Grow | 스케일 + 투명도 | enteringScreen / leavingScreen |
| Slide | 방향별 슬라이드 | enteringScreen / leavingScreen |
| Zoom | 확대/축소 | enteringScreen / leavingScreen |

**prefers-reduced-motion 존중:** `theme.transitions.create()`로 생성된 트랜지션은 `prefers-reduced-motion: reduce` 미디어 쿼리를 자동으로 존중한다.

#### 2.2.11 테마 커스터마이징

```js
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  cssVariables: true,  // CSS Variables 모드 활성화
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#9c27b0' },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  shape: {
    borderRadius: 8,
  },
  spacing: 8,
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none' },
      },
    },
  },
});
```

CSS Variables + `createTheme()` + `@layer` 조합으로 완전한 커스터마이징이 가능하다.

---

### 2.3 Ant Design

> **"엔터프라이즈급 디자인 시스템."** 알리바바 그룹에서 시작, 가장 방대한 컴포넌트 세트.

#### 2.3.1 10대 디자인 원칙

| # | 원칙 | 설명 |
|---|------|------|
| 1 | **Proximity (근접)** | 관련 요소는 가까이, 비관련 요소는 멀리 |
| 2 | **Alignment (정렬)** | 시각적 연결로 인지 부하 감소 |
| 3 | **Contrast (대비)** | 중요도에 따른 시각적 차등 |
| 4 | **Repetition (반복)** | 일관된 패턴으로 학습 곡선 감소 |
| 5 | **Make it Direct (직접 조작)** | 드래그, 인라인 편집 등 직관적 조작 |
| 6 | **Stay on Page (페이지 유지)** | 페이지 이동 없이 작업 완료 |
| 7 | **Keep it Lightweight (가볍게)** | 점진적 공개, 필요한 것만 표시 |
| 8 | **Provide Invitation (안내 제공)** | 가능한 행동을 시각적으로 안내 |
| 9 | **Use Transition (전환 활용)** | 상태 변화를 자연스러운 애니메이션으로 표현 |
| 10 | **React Immediately (즉시 반응)** | 사용자 행동에 대한 즉각적 피드백 |

#### 2.3.2 전체 컴포넌트 목록 (72개)

**General (4개):** Button, FloatButton, Icon, Typography

**Layout (7개):** Divider, Flex, Grid, Layout, Space, Splitter, ConfigProvider

**Navigation (7개):** Anchor, Breadcrumb, Dropdown, Menu, Pagination, Steps, Tabs

**Data Entry (18개):** AutoComplete, Cascader, Checkbox, ColorPicker, DatePicker, Form, Input, InputNumber, Mentions, Radio, Rate, Select, Slider, Switch, TimePicker, Transfer, TreeSelect, Upload

**Data Display (20개):** Avatar, Badge, Calendar, Card, Carousel, Collapse, Descriptions, Empty, Image, List, Popover, QRCode, Segmented, Statistic, Table, Tag, Timeline, Tooltip, Tour, Tree

**Feedback (11개):** Alert, Drawer, Message, Modal, Notification, Popconfirm, Progress, Result, Skeleton, Spin, Watermark

**Other (5개):** Affix, App, Utility (classNames, theme token access), Portal, Trigger

#### 2.3.3 3계층 디자인 토큰 시스템

**Seed 토큰 (입력층):**

| 토큰 | 기본값 | 설명 |
|------|--------|------|
| colorPrimary | `#1677ff` | 주요 색상 (알고리즘이 파생 색상 생성) |
| fontSize | `14px` | 기본 글꼴 크기 |
| controlHeight | `32px` | 기본 컨트롤 높이 |
| borderRadius | `6px` | 기본 모서리 반경 |
| sizeStep | `4px` | 크기 증가 단위 |
| sizeUnit | `4px` | 기본 크기 단위 |
| motionUnit | `0.1s` | 애니메이션 기본 단위 |
| wireframe | `false` | 와이어프레임 모드 |

**Map 토큰 (파생층) -- 색상 파생:**

colorPrimary에서 9~10개 변형이 자동 생성된다:

| 토큰 패턴 | 예시 | 용도 |
|-----------|------|------|
| `~Bg` | `colorPrimaryBg` | 배경색 (매우 연함) |
| `~BgHover` | `colorPrimaryBgHover` | 배경 호버 |
| `~Border` | `colorPrimaryBorder` | 테두리색 |
| `~BorderHover` | `colorPrimaryBorderHover` | 테두리 호버 |
| `~Hover` | `colorPrimaryHover` | 메인 호버 |
| `~` | `colorPrimary` | 메인 색상 |
| `~Active` | `colorPrimaryActive` | 눌림 상태 |
| `~Text` | `colorPrimaryText` | 텍스트 |
| `~TextHover` | `colorPrimaryTextHover` | 텍스트 호버 |
| `~TextActive` | `colorPrimaryTextActive` | 텍스트 눌림 |

**Map 토큰 -- Text 계층:**

| 토큰 | 용도 |
|------|------|
| colorText | 기본 텍스트 (가장 진함) |
| colorTextSecondary | 보조 텍스트 |
| colorTextTertiary | 3차 텍스트 |
| colorTextQuaternary | 4차 텍스트 (가장 연함) |

**Map 토큰 -- Background:**

| 토큰 | 용도 |
|------|------|
| colorBgContainer | 컨테이너 배경 (카드, 입력 등) |
| colorBgElevated | 부유 요소 배경 (드롭다운, 팝오버) |
| colorBgLayout | 레이아웃 배경 (사이드바 등) |
| colorBgSpotlight | 스포트라이트 배경 (툴팁) |
| colorBgMask | 마스크 배경 (모달 배경) |
| colorBgBase | 최하위 배경 |

**Map 토큰 -- Fill:**

| 토큰 | 용도 |
|------|------|
| colorFill | 기본 채우기 (가장 진함) |
| colorFillSecondary | 보조 채우기 |
| colorFillTertiary | 3차 채우기 |
| colorFillQuaternary | 4차 채우기 (가장 연함) |

**Map 토큰 -- Border Radius:**

| 토큰 | 기본값 | 용도 |
|------|--------|------|
| borderRadius | `6px` | 기본 |
| borderRadiusLG | `8px` | 큰 컴포넌트 |
| borderRadiusSM | `4px` | 작은 컴포넌트 |
| borderRadiusXS | `2px` | 매우 작은 요소 |

**Map 토큰 -- Control Height:**

| 토큰 | 기본값 | 용도 |
|------|--------|------|
| controlHeight | `32px` | 기본 (Input, Button 등) |
| controlHeightLG | `40px` | 큰 컨트롤 |
| controlHeightSM | `24px` | 작은 컨트롤 |
| controlHeightXS | `16px` | 매우 작은 컨트롤 |

**Map 토큰 -- Font Size (Heading):**

| 토큰 | 기본값 |
|------|--------|
| fontSizeHeading1 | `38px` |
| fontSizeHeading2 | `30px` |
| fontSizeHeading3 | `24px` |
| fontSizeHeading4 | `20px` |
| fontSizeHeading5 | `16px` |

**Map 토큰 -- Motion Duration:**

| 토큰 | 기본값 | 용도 |
|------|--------|------|
| motionDurationFast | `0.1s` | 빠른 피드백 (호버, 포커스) |
| motionDurationMid | `0.2s` | 중간 전환 |
| motionDurationSlow | `0.3s` | 느린 전환 (확장, 축소) |

**Alias 토큰 (최종 적용층):**

| 토큰 | 기본값 | 용도 |
|------|--------|------|
| boxShadow | `0 1px 2px 0 rgba(0,0,0,0.03), 0 1px 6px -1px rgba(0,0,0,0.02), 0 2px 4px 0 rgba(0,0,0,0.02)` | 1차 그림자 |
| boxShadowSecondary | (더 강함) | 2차 그림자 |
| boxShadowTertiary | (더 강함) | 3차 그림자 |
| marginXXS ~ marginXL | `4px ~ 32px` | 마진 시리즈 |
| paddingXXS ~ paddingXL | `4px ~ 32px` | 패딩 시리즈 |
| fontWeightStrong | `600` | 강조 폰트 굵기 |
| screenXS | `480px` | 브레이크포인트 |
| screenSM | `576px` | 브레이크포인트 |
| screenMD | `768px` | 브레이크포인트 |
| screenLG | `992px` | 브레이크포인트 |
| screenXL | `1200px` | 브레이크포인트 |
| screenXXL | `1600px` | 브레이크포인트 |

#### 2.3.4 알고리즘 시스템

Ant Design은 Seed 토큰에서 Map/Alias 토큰을 파생하는 알고리즘을 제공한다.

| 알고리즘 | 역할 | 주요 변경 |
|----------|------|-----------|
| `defaultAlgorithm` | 기본 (라이트 모드) | 표준 색상 파생 |
| `darkAlgorithm` | 다크 모드 | 배경 어둡게, 텍스트 밝게, 색상 채도 조절 |
| `compactAlgorithm` | 콤팩트 모드 | controlHeight 축소, 간격 축소, 폰트 크기 축소 |

알고리즘은 **조합 가능**하다:

```jsx
<ConfigProvider
  theme={{
    algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
    token: { colorPrimary: '#1677ff' },
  }}
>
  {/* 다크 + 콤팩트 모드 */}
</ConfigProvider>
```

#### 2.3.5 Pro Components

| 컴포넌트 | 설명 |
|----------|------|
| **ProTable** | 고급 테이블 (서버사이드 페이지네이션, 필터, 검색, 편집) |
| **ProForm** | 고급 폼 (StepForm, ModalForm, DrawerForm) |
| **ProLayout** | 관리자 대시보드 레이아웃 (사이드바, 헤더, 메뉴 자동 생성) |
| **ProCard** | 고급 카드 (탭, 접기, 분할) |
| **ProDescriptions** | 고급 설명 리스트 (편집 모드, 서버 데이터 바인딩) |
| **ProList** | 고급 리스트 (카드/테이블 뷰 전환) |

#### 2.3.6 국제화 및 기타 기능

- **ConfigProvider 캐스케이드:** 중첩된 ConfigProvider로 부분적 테마 오버라이드 가능
- **50+ 언어 국제화:** locale prop으로 전체 컴포넌트 텍스트 번역
- **RTL (Right-to-Left) 지원:** direction="rtl"로 아랍어/히브리어 등 지원

#### 2.3.7 애니메이션 원칙

| 원칙 | 설명 |
|------|------|
| **Natural** | 자연스러운 물리 법칙 기반 동작 |
| **Performant** | GPU 가속 속성 (transform, opacity) 우선 사용 |
| **Concise** | 최소한의 애니메이션, 불필요한 동작 제거 |

추가 규칙:
- **Exit > Enter 속도:** 퇴장 애니메이션은 진입보다 빨라야 함 (사용자가 결과를 기다리므로)
- **전역 비활성화:** `motion: false`로 모든 애니메이션 비활성화 가능 (접근성 / 성능)

---

### 2.4 Mantine

> **"풀스택 React 컴포넌트 라이브러리."** 120+ 컴포넌트와 70+ 훅으로 가장 포괄적인 솔루션.

#### 2.4.1 전체 컴포넌트 목록 (120+ 컴포넌트)

**Layout (10개):** AppShell, AspectRatio, Center, Container, Flex, Grid, Group, SimpleGrid, Space, Stack

**Inputs (24개):** Autocomplete, Checkbox, Chip, ColorInput, ColorPicker, FileInput, Input, JsonInput, MultiSelect, NativeSelect, NumberInput, PasswordInput, PinInput, Radio, Rating, SegmentedControl, Select, Slider, Switch, TagsInput, Textarea, TextInput, RangeSlider, FieldSet

**Combobox (8개):** Combobox (core), Autocomplete, MultiSelect, Pill, PillsInput, Select, TagsInput, OptionsFilter

**Buttons (6개):** ActionIcon, Button, CloseButton, CopyButton, FileButton, UnstyledButton

**Navigation (9개):** Anchor, Breadcrumbs, Burger, NavLink, Pagination, Stepper, Tabs, Tree, AppShell.Navbar

**Feedback (7개):** Alert, Loader, Notification, Progress, RingProgress, Skeleton, BarLoader

**Overlays (12개):** Affix, Dialog, Drawer, HoverCard, LoadingOverlay, Menu, Modal, Overlay, Popover, Tooltip, FloatingIndicator, Spotlight

**Data Display (15개):** Accordion, Avatar, BackgroundImage, Badge, Card, Carousel, Collapse, Image, Indicator, Kbd, NumberFormatter, Spoiler, Table, ThemeIcon, Timeline

**Typography (9개):** Blockquote, Code, Highlight, List, Mark, Text, Title, TypographyStylesProvider, Anchor

**Misc (11개):** Box, Collapse, Divider, FocusTrap, Paper, Portal, ScrollArea, Transition, VisuallyHidden, CloseButton, ColorSwatch

#### 2.4.2 훅 라이브러리 (70+ 훅)

**UI & DOM (32개):**

| 훅 | 설명 |
|----|------|
| useClickOutside | 바깥 클릭 감지 |
| useColorScheme | 시스템 색상 스킴 감지 |
| useElementSize | 요소 크기 관찰 |
| useEventListener | 이벤트 리스너 관리 |
| useFocusReturn | 포커스 복원 |
| useFocusTrap | 포커스 트랩 |
| useFocusWithin | 자식 포커스 감지 |
| useFullscreen | 전체화면 API |
| useHotkeys | 키보드 단축키 |
| useHover | 호버 상태 |
| useIntersection | 교차 관찰 |
| useMediaQuery | 미디어 쿼리 |
| useMouse | 마우스 위치 |
| useMove | 드래그 이동 |
| useMutationObserver | DOM 변경 관찰 |
| useNetwork | 네트워크 상태 |
| useOrientation | 기기 방향 |
| useOs | OS 감지 |
| usePageLeave | 페이지 이탈 감지 |
| useReducedMotion | 모션 축소 선호 감지 |
| useResizeObserver | 크기 변경 관찰 |
| useScrollIntoView | 스크롤 위치 이동 |
| useViewportSize | 뷰포트 크기 |
| useWindowEvent | 윈도우 이벤트 |
| useWindowScroll | 스크롤 위치 |
| useEyeDropper | 색상 추출 (Eye Dropper API) |
| useHeadroom | 스크롤 시 헤더 표시/숨김 |
| useIdle | 유휴 상태 감지 |
| useDocumentTitle | 문서 타이틀 설정 |
| useDocumentVisibility | 문서 가시성 |
| useFavicon | 파비콘 동적 변경 |
| useHash | URL 해시 |

**State (22개):**

| 훅 | 설명 |
|----|------|
| useCounter | 카운터 상태 |
| useDebouncedState | 디바운스 상태 |
| useDebouncedValue | 디바운스 값 |
| useDisclosure | 열림/닫힘 상태 (모달 등) |
| useId | 유니크 ID 생성 |
| useInputState | 입력 상태 관리 |
| useInterval | 인터벌 관리 |
| useListState | 리스트 CRUD 상태 |
| useLocalStorage | 로컬 스토리지 상태 |
| useSessionStorage | 세션 스토리지 상태 |
| useMap | Map 상태 |
| useSet | Set 상태 |
| usePagination | 페이지네이션 로직 |
| usePrevious | 이전 값 |
| useQueue | 큐 상태 |
| useSetState | Partial 업데이트 상태 (class setState 패턴) |
| useStateHistory | 상태 히스토리 (undo/redo) |
| useThrottledState | 쓰로틀 상태 |
| useThrottledValue | 쓰로틀 값 |
| useToggle | 불린 토글 |
| useUncontrolled | 제어/비제어 통합 |
| useValidatedState | 검증 상태 |

**Utilities (17개):**

| 훅 | 설명 |
|----|------|
| useCallbackRef | 안정적 콜백 ref |
| useClipboard | 클립보드 복사 |
| useDebouncedCallback | 디바운스 콜백 |
| useThrottledCallback | 쓰로틀 콜백 |
| useDidUpdate | componentDidUpdate |
| useForceUpdate | 강제 리렌더 |
| useIsomorphicEffect | SSR 안전 useEffect |
| useLatestRef | 최신 값 ref |
| useMergedRef | ref 병합 |
| useOs | OS 감지 |
| useRenderCount | 렌더 횟수 |
| useShallowEffect | 얕은 비교 effect |
| useTextSelection | 텍스트 선택 |
| useTimeout | 타임아웃 |
| useMounted | 마운트 상태 |
| useLogger | 개발용 로거 |
| useInViewport | 뷰포트 가시성 |

**Lifecycle (6개):**

| 훅 | 설명 |
|----|------|
| useDidUpdate | 업데이트 시 |
| useIsFirstRender | 첫 렌더 여부 |
| useMounted | 마운트 여부 |
| useShallowEffect | 얕은 비교 effect |
| useIsomorphicEffect | SSR 안전 effect |
| useForceUpdate | 강제 리렌더 |

#### 2.4.3 색상 시스템

**14가지 기본 색상 x 10단계 shade:**

| 색상 | 용도 |
|------|------|
| dark | 다크 모드 표면 |
| gray | 중립 |
| red | 에러, 위험 |
| pink | 강조 |
| grape | 강조 |
| violet | 브랜드 |
| indigo | 브랜드 |
| blue | 주요 (기본 primaryColor) |
| cyan | 정보 |
| teal | 성공 |
| green | 성공 |
| lime | 경고 |
| yellow | 경고 |
| orange | 경고 |

각 색상은 0(가장 밝음) ~ 9(가장 어두움) 10단계로 구성된다.

**Virtual Colors:**

실제 색상이 아닌, 맥락에 따라 동적으로 계산되는 가상 색상을 정의할 수 있다.

**Auto-contrast:**

배경색의 **휘도(luminance) 임계값 0.3**을 기준으로 전경색을 자동 결정한다:
- 휘도 > 0.3 -> 어두운 전경색
- 휘도 <= 0.3 -> 밝은 전경색

#### 2.4.4 타이포그래피 스케일

**본문 (Text):**

| 크기 | 값 |
|------|----|
| xs | 12px |
| sm | 14px |
| md | 16px (기본) |
| lg | 18px |
| xl | 20px |

**제목 (Title):**

| 수준 | 크기 | Weight |
|------|------|--------|
| h1 | 34px | 700 |
| h2 | 26px | 700 |
| h3 | 22px | 700 |
| h4 | 18px | 700 |
| h5 | 16px | 700 |
| h6 | 14px | 700 |

#### 2.4.5 간격 (Spacing)

| 크기 | 값 |
|------|----|
| xs | 10px |
| sm | 12px |
| md | 16px |
| lg | 20px |
| xl | 32px |

#### 2.4.6 반경 (Radius)

| 크기 | 값 |
|------|----|
| xs | 2px |
| sm | 4px |
| md | 8px (기본) |
| lg | 16px |
| xl | 32px |

`defaultRadius` 전역 설정으로 모든 컴포넌트의 기본 반경을 한 번에 변경할 수 있다.

#### 2.4.7 그림자 (Shadows)

| 크기 | 값 |
|------|----|
| xs | `0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.1)` |
| sm | `0 1px 3px rgba(0,0,0,0.05), rgba(0,0,0,0.05) 0 10px 15px -5px, rgba(0,0,0,0.04) 0 7px 7px -5px` |
| md | `0 1px 3px rgba(0,0,0,0.05), rgba(0,0,0,0.05) 0 20px 25px -5px, rgba(0,0,0,0.04) 0 10px 10px -5px` |
| lg | `0 1px 3px rgba(0,0,0,0.05), rgba(0,0,0,0.05) 0 28px 23px -7px, rgba(0,0,0,0.04) 0 12px 12px -7px` |
| xl | `0 1px 3px rgba(0,0,0,0.05), rgba(0,0,0,0.05) 0 36px 28px -7px, rgba(0,0,0,0.04) 0 17px 17px -7px` |

#### 2.4.8 Z-Index 스케일

| 이름 | 값 | 용도 |
|------|----|------|
| app | 100 | 앱 레이아웃 (Navbar, Header) |
| modal | 200 | 모달 |
| popover | 300 | 팝오버, 드롭다운 |
| overlay | 400 | 오버레이 |
| max | 9999 | 최상위 |

#### 2.4.9 반응형 시스템

**em 기반 브레이크포인트:**

| 이름 | px 기준 | em 값 | 용도 |
|------|---------|-------|------|
| xs | 576px | 36em | 소형 모바일 |
| sm | 768px | 48em | 태블릿 |
| md | 992px | 62em | 소형 데스크톱 |
| lg | 1200px | 75em | 데스크톱 |
| xl | 1408px | 88em | 대형 데스크톱 |

em 기반 브레이크포인트를 사용하는 이유: 사용자가 브라우저 기본 글꼴 크기를 변경하면 레이아웃도 함께 조절된다.

**반응형 Style Props:**

```tsx
<Box
  w={{ base: 200, sm: 400, lg: 800 }}
  h={{ base: 100, md: 200 }}
  bg={{ base: 'blue.5', sm: 'red.5' }}
/>
```

**Container Query 지원:**

```tsx
<Box data-container-name="sidebar" data-container-type="inline-size">
  <Text fz={{ base: 'sm', '@sidebar/md': 'lg' }}>
    Responsive to container
  </Text>
</Box>
```

#### 2.4.10 확장 패키지

| 패키지 | 설명 |
|--------|------|
| **@mantine/form** | `useForm` 훅 기반 폼 관리 + Zod/Yup/Joi 스키마 검증 통합 |
| **@mantine/notifications** | 전역 알림 시스템 (위치, 자동 닫기, 커스텀 렌더링) |
| **@mantine/modals** | 선언적 모달 관리 (`modals.open()`, `modals.confirm()`) |
| **@mantine/charts** | Recharts 기반 차트 (Area, Bar, Line, Pie, Donut, Radar, Scatter, Sparkline) |
| **@mantine/dates** | 날짜 관련 (DatePicker, DateTimePicker, DateRangePicker, Calendar, MonthPicker, YearPicker) |
| **@mantine/spotlight** | Spotlight 검색 (Cmd+K 팔레트) |
| **@mantine/carousel** | Embla 기반 캐러셀 |
| **@mantine/dropzone** | 파일 드래그 앤 드롭 |
| **@mantine/tiptap** | Tiptap 리치 텍스트 에디터 |
| **@mantine/code-highlight** | 코드 하이라이팅 |
| **@mantine/nprogress** | 페이지 로딩 프로그레스 바 |

#### 2.4.11 CSS 트랜지션

| 이름 | 효과 |
|------|------|
| fade | 투명도 전환 |
| slide-up | 아래에서 위로 슬라이드 |
| slide-down | 위에서 아래로 슬라이드 |
| slide-left | 오른쪽에서 왼쪽으로 슬라이드 |
| slide-right | 왼쪽에서 오른쪽으로 슬라이드 |
| scale | 확대/축소 |
| scale-x | 수평 확대/축소 |
| scale-y | 수직 확대/축소 |
| pop | 중심에서 팝업 |
| pop-top-left | 좌상단에서 팝업 |
| pop-top-right | 우상단에서 팝업 |
| pop-bottom-left | 좌하단에서 팝업 |
| pop-bottom-right | 우하단에서 팝업 |
| rotate-left | 왼쪽 회전 |
| rotate-right | 오른쪽 회전 |

---

### 2.5 DaisyUI

> **"Tailwind CSS의 컴포넌트 클래스."** 런타임 JavaScript 없이 순수 CSS 클래스만으로 UI 구성.

#### 2.5.1 전체 컴포넌트 목록 (64개)

**Actions (6개):** Button, Dropdown, Modal, Swap, Theme Controller, Loading

**Data Display (17개):** Accordion, Avatar, Badge, Card, Carousel, Chat Bubble, Collapse, Countdown, Diff, Figure, Kbd, List, Stat, Status, Table, Timeline, Toast

**Navigation (8개):** Breadcrumbs, Bottom Navigation, Dock, Link, Menu, Navbar, Pagination, Steps, Tabs

**Feedback (7개):** Alert, Progress, Radial Progress, Rating, Skeleton, Tooltip, Loading

**Data Input (14개):** Calendar, Checkbox, File Input, Filter, Label, Range, Radio, Select, Text Input, Textarea, Toggle, Validator, Fieldset, Color Picker

**Layout (8개):** Artboard, Divider, Drawer, Footer, Hero, Indicator, Join, Stack

**Mockup (4개):** Browser, Code, Phone, Window

#### 2.5.2 35개 내장 테마

| 카테고리 | 테마 이름 |
|----------|-----------|
| **라이트 계열** | light, cupcake, bumblebee, emerald, corporate, retro, cyberpunk, valentine, garden, lofi, pastel, fantasy, cmyk, autumn, acid, lemonade, winter, nord, caramellatte, silk |
| **다크 계열** | dark, synthwave, halloween, forest, aqua, luxury, dracula, night, coffee, dim, sunset, abyss |
| **와이어프레임** | wireframe |
| **비즈니스** | business |

#### 2.5.3 OKLCH 시맨틱 색상 시스템

**시맨틱 색상 + Content 쌍:**

| 색상 | 용도 | Content 쌍 |
|------|------|------------|
| `primary` | 주요 버튼, 링크, 강조 | `primary-content` |
| `secondary` | 보조 요소 | `secondary-content` |
| `accent` | 포인트 색상 | `accent-content` |
| `neutral` | 중립 (다크 요소) | `neutral-content` |
| `info` | 정보 알림 | `info-content` |
| `success` | 성공 상태 | `success-content` |
| `warning` | 경고 상태 | `warning-content` |
| `error` | 에러 상태 | `error-content` |

**Base 색상 계층:**

| 색상 | 용도 |
|------|------|
| `base-100` | 페이지 배경 (가장 밝음) |
| `base-200` | 카드/패널 배경 |
| `base-300` | 입력 필드/보더 배경 (가장 어두움) |
| `base-content` | Base 위의 텍스트 색상 |

#### 2.5.4 디자인 토큰

| 토큰 | 역할 | 예시 |
|------|------|------|
| `--radius-selector` | 체크박스, 라디오 등 선택 요소 | `1rem` |
| `--radius-field` | 입력 필드, 셀렉트 | `0.25rem` |
| `--radius-box` | 카드, 모달 등 컨테이너 | `1rem` |
| `--border-width` | 전역 보더 두께 | `1px` |
| `--depth` | 그림자 깊이 | `1` |
| `--noise` | 텍스처 노이즈 | `0` |

#### 2.5.5 CSS Class 기반 사용법

```html
<!-- 런타임 JS 전혀 없음 -->
<button class="btn btn-primary btn-lg">Large Primary</button>
<button class="btn btn-outline btn-sm">Small Outline</button>

<div class="card bg-base-100 shadow-xl">
  <div class="card-body">
    <h2 class="card-title">Title</h2>
    <p>Content</p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary">Action</button>
    </div>
  </div>
</div>

<!-- 인라인 모디파이어 -->
<div class="alert alert-success">Success!</div>
<span class="badge badge-secondary badge-lg">Badge</span>
<progress class="progress progress-primary w-56" value="70" max="100"></progress>
```

#### 2.5.6 data-theme 요소별 테마 전환

```html
<!-- 페이지 전체 테마 -->
<html data-theme="dark">

<!-- 특정 영역만 다른 테마 -->
<div data-theme="cupcake">
  <button class="btn btn-primary">Cupcake themed!</button>
</div>

<!-- 테마 전환 컴포넌트 -->
<input type="checkbox" class="toggle theme-controller" value="dark" />
```

#### 2.5.7 Tailwind CSS v4 호환

DaisyUI v5는 Tailwind CSS v4와 완전 호환된다:

```css
/* CSS에서 직접 import */
@import "daisyui";
@import "daisyui/theme" layer(base);
```

---

### 2.6 Radix UI

> **"접근성 우선 Headless 컴포넌트."** shadcn/ui의 핵심 기반 라이브러리.

#### 2.6.1 프리미티브 컴포넌트 목록 (30+)

| 카테고리 | 컴포넌트 |
|----------|----------|
| **Navigation** | NavigationMenu, Menubar, ContextMenu, DropdownMenu, Tabs |
| **Overlay** | Dialog, AlertDialog, Popover, HoverCard, Tooltip |
| **Form** | Checkbox, RadioGroup, Select, Slider, Switch, Toggle, ToggleGroup, Form |
| **Layout** | Accordion, Collapsible, ScrollArea, Separator, Toolbar, AspectRatio |
| **Utility** | Avatar, Label, Progress, Toast, VisuallyHidden, Portal, Presence |
| **Advanced** | Combobox (Downshift 기반 권장), Roving Focus |

#### 2.6.2 12단계 기능별 색상 스케일 (Radix Colors)

Radix Colors는 각 색상을 12단계로 나누며, 각 단계에 명확한 기능적 용도가 있다:

| 단계 | 용도 | 예시 (Blue) |
|------|------|-------------|
| 1 | 앱 배경 | `blue1` - 가장 연한 배경 |
| 2 | 미묘한 배경 | `blue2` - 카드 배경 |
| 3 | UI 요소 배경 | `blue3` - 호버 이전 상태 |
| 4 | 호버 UI 배경 | `blue4` - 호버 시 |
| 5 | 활성/선택 UI 배경 | `blue5` - 활성 상태 |
| 6 | 미묘한 보더/구분선 | `blue6` - 연한 보더 |
| 7 | UI 요소 보더/포커스 링 | `blue7` - 기본 보더 |
| 8 | 호버 보더, 포커스 링 | `blue8` - 강한 보더 |
| 9 | 솔리드 배경 | `blue9` - 버튼 배경 (메인 색상) |
| 10 | 호버 솔리드 배경 | `blue10` - 버튼 호버 |
| 11 | 저대비 텍스트 | `blue11` - 링크, 보조 텍스트 |
| 12 | 고대비 텍스트 | `blue12` - 제목, 본문 |

**APCA 대비 보장:** 모든 단계 조합이 APCA (Advanced Perceptual Contrast Algorithm) 기준을 충족하도록 설계되었다.

**P3 Gamut 지원:** 넓은 색역(Wide Gamut) 디스플레이에서 더 생생한 색상을 표현할 수 있는 P3 색상 변형을 제공한다.

**Alpha 변형:** 모든 색상에 투명도가 적용된 Alpha 변형 제공. 배경색이 다양한 상황에서도 자연스럽게 블렌딩된다.

```css
/* Alpha 변형 예시 */
background-color: var(--blue-a3);  /* 반투명 파란색 배경 */
```

#### 2.6.3 Compound Component 패턴

```tsx
<Dialog.Root>
  <Dialog.Trigger asChild>
    <button>Open</button>
  </Dialog.Trigger>
  <Dialog.Portal>
    <Dialog.Overlay className="dialog-overlay" />
    <Dialog.Content className="dialog-content">
      <Dialog.Title>Title</Dialog.Title>
      <Dialog.Description>Description</Dialog.Description>
      <Dialog.Close asChild>
        <button>Close</button>
      </Dialog.Close>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
```

각 하위 컴포넌트(Root, Trigger, Portal, Overlay, Content, Title, Description, Close)가 독립적이며, 소비자가 구조와 스타일을 완전히 제어한다.

#### 2.6.4 asChild Prop (DOM 요소 위임)

```tsx
// asChild 없이: <button> 태그 렌더링
<Dialog.Trigger>Open</Dialog.Trigger>

// asChild 사용: 자식 요소의 DOM 유지
<Dialog.Trigger asChild>
  <a href="#">Open as Link</a>
</Dialog.Trigger>
```

`asChild`는 Radix의 `Slot` 유틸리티를 사용하여 부모 컴포넌트의 props, 이벤트 핸들러, ref를 자식 요소에 병합(merge)한다.

#### 2.6.5 WAI-ARIA 완전 준수

| 영역 | 구현 |
|------|------|
| **ARIA 속성** | 모든 role, aria-* 속성 자동 적용 |
| **키보드 네비게이션** | Tab, Arrow, Enter, Space, Escape, Home, End |
| **포커스 관리** | 포커스 트랩, 포커스 복원, 로빙 포커스 |
| **스크린 리더** | 라이브 리전, 공지(announcements) |

#### 2.6.6 Presence 컴포넌트 & 애니메이션

```tsx
// 언마운트 애니메이션 지원
<Dialog.Content>
  {/* data-state="open" | "closed" 속성이 자동 적용 */}
</Dialog.Content>

// CSS에서 애니메이션 정의
.dialog-content[data-state="open"] {
  animation: fadeIn 200ms ease-out;
}
.dialog-content[data-state="closed"] {
  animation: fadeOut 150ms ease-in;
}
```

`Presence` 컴포넌트는 퇴장 애니메이션이 완료될 때까지 DOM에서 요소를 제거하지 않는다. 이를 통해 CSS 애니메이션만으로도 매끄러운 진입/퇴장 효과를 구현할 수 있다.

---

### 2.7 Headless UI

> **"Tailwind Labs의 완전 비스타일 UI 컴포넌트."** Tailwind CSS와 최적의 조합.

#### 2.7.1 전체 컴포넌트 목록 (16개)

**Navigation (6개):**

| 컴포넌트 | 설명 |
|----------|------|
| Menu | 드롭다운 메뉴 |
| Disclosure | 접을 수 있는 영역 |
| Dialog | 모달 다이얼로그 |
| Popover | 팝오버 |
| Tab | 탭 네비게이션 |
| CloseButton | 닫기 버튼 |

**Form (10개):**

| 컴포넌트 | 설명 |
|----------|------|
| Button | 버튼 |
| Checkbox | 체크박스 |
| Combobox | 콤보박스 (자동완성) |
| Description | 설명 텍스트 |
| Field | 폼 필드 래퍼 |
| Fieldset | 폼 필드셋 |
| Input | 텍스트 입력 |
| Label | 레이블 |
| Listbox (Select) | 커스텀 셀렉트 |
| RadioGroup | 라디오 그룹 |
| Switch | 토글 스위치 |
| Textarea | 텍스트영역 |

#### 2.7.2 Data Attribute Modifiers

Headless UI는 상태를 data attribute로 노출하여 Tailwind CSS의 data modifier와 결합할 수 있다:

```tsx
<Listbox.Option
  className="data-[active]:bg-blue-200 data-[selected]:font-bold data-[disabled]:opacity-50"
  value="option1"
>
  Option 1
</Listbox.Option>
```

| Data Attribute | 설명 |
|----------------|------|
| `data-open` | 열린 상태 |
| `data-closed` | 닫힌 상태 |
| `data-active` | 활성 상태 (키보드/마우스) |
| `data-focus` | 포커스 상태 |
| `data-selected` | 선택된 상태 |
| `data-disabled` | 비활성 상태 |
| `data-hover` | 호버 상태 |
| `data-autofocus` | 자동 포커스 |

#### 2.7.3 CSS Variables

Headless UI 컴포넌트는 유용한 CSS 변수를 자동으로 노출한다:

```tsx
<Popover>
  <Popover.Button style={{ width: 'var(--button-width)' }}>
    {/* --button-width가 자동 설정됨 */}
  </Popover.Button>
  <Popover.Panel style={{ '--anchor-gap': '8px' }}>
    {/* --anchor-gap으로 버튼과의 간격 조절 */}
  </Popover.Panel>
</Popover>
```

| CSS Variable | 용도 |
|--------------|------|
| `--button-width` | 트리거 버튼의 너비 |
| `--anchor-gap` | 앵커 요소와의 간격 |
| `--anchor-offset` | 앵커 오프셋 |
| `--anchor-padding` | 앵커 패딩 |
| `--input-width` | 입력 필드 너비 |

#### 2.7.4 Render Props 패턴

```tsx
<Combobox value={selected} onChange={setSelected}>
  <Combobox.Input onChange={(e) => setQuery(e.target.value)} />
  <Combobox.Options>
    {filteredItems.map((item) => (
      <Combobox.Option key={item.id} value={item}>
        {({ active, selected }) => (
          <div className={active ? 'bg-blue-500 text-white' : ''}>
            {selected && <CheckIcon />}
            {item.name}
          </div>
        )}
      </Combobox.Option>
    ))}
  </Combobox.Options>
</Combobox>
```

#### 2.7.5 키보드 네비게이션

| 키 | 동작 |
|----|------|
| Enter / Space | 선택, 열기/닫기 |
| Arrow Up / Down | 리스트 항목 이동 |
| Arrow Left / Right | 탭, 라디오 이동 |
| Home / End | 첫/마지막 항목 이동 |
| Escape | 닫기, 취소 |
| A-Z (Typeahead) | 타이핑으로 항목 검색 |

#### 2.7.6 TransitionChild: 부모-자식 협조 애니메이션

```tsx
<Transition show={isOpen}>
  {/* 배경 오버레이: 자체 타이밍 */}
  <TransitionChild
    enter="ease-out duration-300"
    enterFrom="opacity-0"
    enterTo="opacity-100"
    leave="ease-in duration-200"
    leaveFrom="opacity-100"
    leaveTo="opacity-0"
  >
    <div className="fixed inset-0 bg-black/30" />
  </TransitionChild>

  {/* 다이얼로그 패널: 별도 타이밍 */}
  <TransitionChild
    enter="ease-out duration-300"
    enterFrom="opacity-0 scale-95"
    enterTo="opacity-100 scale-100"
    leave="ease-in duration-200"
    leaveFrom="opacity-100 scale-100"
    leaveTo="opacity-0 scale-95"
  >
    <Dialog.Panel>...</Dialog.Panel>
  </TransitionChild>
</Transition>
```

- 부모 `Transition`이 모든 자식 `TransitionChild`의 완료를 기다린 후 DOM에서 제거
- `appear` prop: 최초 마운트 시에도 진입 애니메이션 실행

---

### 2.8 React Aria (Adobe)

> **"접근성의 정점."** Adobe Spectrum Design System의 핵심 엔진, 가장 완전한 접근성 구현.

#### 2.8.1 전체 컴포넌트 목록 (50+)

| 카테고리 | 컴포넌트 |
|----------|----------|
| **Buttons** | Button, ToggleButton, FileTrigger, DropZone |
| **Collections** | GridList, ListBox, Menu, Table, TagGroup, Tree |
| **Color** | ColorArea, ColorField, ColorSlider, ColorSwatch, ColorSwatchPicker, ColorWheel |
| **Date & Time** | Calendar, DateField, DatePicker, DateRangePicker, RangeCalendar, TimeField |
| **Drag & Drop** | DropZone (전역 드래그 앤 드롭 시스템) |
| **Forms** | Checkbox, CheckboxGroup, Form, Input, Label, NumberField, RadioGroup, SearchField, Select, Slider, Switch, TextField, Textarea |
| **Navigation** | Breadcrumbs, Link, Disclosure, DisclosureGroup, Tabs |
| **Overlays** | Dialog, DialogTrigger, Modal, ModalOverlay, Popover, Tooltip, TooltipTrigger |
| **Pickers** | ComboBox, Select |
| **Status** | Meter, ProgressBar |
| **Content** | Heading, Keyboard, Text |
| **Advanced** | SharedElementTransition, Virtualizer, Toolbar |

#### 2.8.2 3계층 API 아키텍처

**계층 1: High-level Components (최상위)**

```tsx
import { DatePicker } from 'react-aria-components';

<DatePicker label="Date" />
// -> 완전한 DatePicker가 기본 스타일 없이 렌더링
```

**계층 2: Context-based Composition (컨텍스트 합성)**

```tsx
import { DatePicker, Label, Group, DateInput, DateSegment, Button, Popover, Dialog, Calendar } from 'react-aria-components';

<DatePicker>
  <Label>Date</Label>
  <Group>
    <DateInput>
      {(segment) => <DateSegment segment={segment} />}
    </DateInput>
    <Button>Open</Button>
  </Group>
  <Popover>
    <Dialog>
      <Calendar>...</Calendar>
    </Dialog>
  </Popover>
</DatePicker>
```

**계층 3: Low-level Hooks (최하위)**

```tsx
import { useDatePicker, useDateField, useCalendar } from 'react-aria';
import { useDatePickerState } from 'react-stately';

function MyDatePicker(props) {
  const state = useDatePickerState(props);
  const ref = useRef(null);
  const { groupProps, labelProps, fieldProps, buttonProps, dialogProps, calendarProps } = useDatePicker(props, state, ref);
  // 완전한 커스텀 렌더링
}
```

#### 2.8.3 국제화 (i18n) 역량

| 영역 | 지원 범위 |
|------|-----------|
| **번역** | 30+ 언어 내장 번역 (버튼 레이블, ARIA 설명 등) |
| **달력 시스템** | 13개: Gregorian, Buddhist, Chinese, Coptic, Dangi, Ethiopic, Ethiopic-Amete-Alem, Hebrew, Indian, Islamic (Civil, Tabular, Umm-al-Qura), Japanese, Korean, Persian, ROC |
| **숫자 체계** | 5개: Latin, Arabic-Indic, Extended Arabic-Indic, Devanagari, Bengali |
| **RTL** | 전체 지원 (방향, 미러링, 키보드 방향 반전) |
| **모바일 터치 스크린 리더** | VoiceOver (iOS), TalkBack (Android) 완전 지원 |

#### 2.8.4 핵심 라이브러리 4개

| 라이브러리 | 역할 | 설명 |
|-----------|------|------|
| **React Spectrum** | Styled Components | Adobe Spectrum Design 적용된 완성 컴포넌트 |
| **React Aria** | Unstyled Components + Hooks | 행동, 접근성, 국제화 로직 |
| **React Stately** | State Management | 컴포넌트 상태 로직 (UI 무관) |
| **Internationalized** | i18n Utilities | 날짜, 숫자, 문자열 국제화 유틸리티 |

```
React Spectrum (Styled)
    └── React Aria (Behavior + A11y)
            └── React Stately (State)
                    └── Internationalized (i18n)
```

---

## 3. 디자인 토큰 비교

### 3.1 색상 시스템 비교

| 라이브러리 | 색상 공간 | 시맨틱 토큰 | 단계/스케일 | 다크 모드 | 특징 |
|-----------|-----------|------------|------------|-----------|------|
| **shadcn/ui** | OKLCH | background/foreground 쌍 | 쌍 기반 (2개씩) | .dark CSS 변수 오버라이드 | 최소 토큰으로 최대 일관성 |
| **MUI** | Hex/RGB | primary/secondary/error/warning/success/info | Light/Main/Dark 3단계 + Grey 10단계 | createTheme(mode: 'dark') | Material Design 팔레트 |
| **Ant Design** | Hex/RGB | colorPrimary에서 9-10개 자동 파생 | Bg/Border/Hover/Active/Text 등 | darkAlgorithm | 알고리즘 기반 자동 파생 |
| **Mantine** | Hex/RGB | 14색 x 10단계 shade | 0-9 (10단계) | colorScheme="dark" | Virtual Colors, auto-contrast |
| **DaisyUI** | OKLCH | primary/secondary/accent/neutral + content | Base 3단계 (100/200/300) | data-theme="dark" | 35개 프리셋 테마 |
| **Radix Colors** | Hex (P3 옵션) | 기능별 12단계 스케일 | 1-12 (기능별 명확한 용도) | Dark 변형 별도 제공 | APCA 대비, P3 gamut |
| **Headless UI** | 없음 | 없음 | 없음 | 없음 | 스타일 미제공 |
| **React Aria** | 없음 | 없음 (React Spectrum에서 제공) | 없음 | 없음 | 스타일 미제공 |

### 3.2 타이포그래피 비교

| 라이브러리 | 기본 폰트 | 스케일 | 정의 방식 |
|-----------|-----------|--------|-----------|
| **shadcn/ui** | 시스템 폰트 | Tailwind 유틸리티 (h1 4xl ~ h6 base) | 유틸리티 클래스 조합 |
| **MUI** | Roboto | 13단계 (h1 96px ~ overline 12px) | theme.typography |
| **Ant Design** | 시스템 폰트 | fontSize 14px + Heading 5단계 (38~16px) | 토큰 시스템 |
| **Mantine** | 시스템 폰트 | Text xs~xl (12~20px), Title h1~h6 (34~14px) | 테마 객체 |
| **DaisyUI** | Tailwind 기본 | Tailwind 유틸리티 | CSS 클래스 |

### 3.3 간격 비교

| 라이브러리 | 기본 단위 | 방식 |
|-----------|-----------|------|
| **shadcn/ui** | Tailwind 기본 (4px 배수) | 유틸리티 클래스 (p-4 = 16px) |
| **MUI** | 8px | theme.spacing(n) = n * 8px |
| **Ant Design** | sizeStep 4px, sizeUnit 4px | 토큰 (marginXXS 4px ~ marginXL 32px) |
| **Mantine** | xs~xl (10~32px) | theme.spacing + style props |
| **DaisyUI** | Tailwind 기본 (4px 배수) | 유틸리티 클래스 |

### 3.4 반경 비교

| 라이브러리 | 기본값 | 스케일 | 특징 |
|-----------|--------|--------|------|
| **shadcn/ui** | 0.625rem | sm~4xl (비례 스케일) | 단일 --radius에서 모든 값 파생 |
| **MUI** | 4px | 단일 값 | theme.shape.borderRadius |
| **Ant Design** | 6px | XS/SM/기본/LG (2/4/6/8px) | Seed에서 파생 |
| **Mantine** | 8px (md) | xs~xl (2~32px) | defaultRadius 전역 오버라이드 |
| **DaisyUI** | 테마별 상이 | selector/field/box 3종 | 용도별 분리 |

### 3.5 그림자 비교

| 라이브러리 | 단계 | 특징 |
|-----------|------|------|
| **shadcn/ui** | Tailwind 기본 (shadow-sm~2xl) | 유틸리티 기반 |
| **MUI** | 24단계 | 3레이어 box-shadow (umbra/penumbra/ambient) |
| **Ant Design** | 3단계 (boxShadow/Secondary/Tertiary) | Alias 토큰 |
| **Mantine** | 5단계 (xs~xl) | 테마 객체 |
| **DaisyUI** | --depth 토큰 | 테마별 상이 |

---

## 4. 컴포넌트 합성 패턴 비교

### 4.1 패턴 유형

| 패턴 | 사용 라이브러리 | 설명 |
|------|----------------|------|
| **Compound Component** | Radix UI, Headless UI, React Aria | `<Root>`, `<Trigger>`, `<Content>` 등 하위 컴포넌트로 분리 |
| **asChild / Slot** | Radix UI, shadcn/ui | DOM 요소를 자식에게 위임 (a, Link 등) |
| **Render Props** | Headless UI | `{({ active, selected }) => (...)}` 패턴으로 상태 접근 |
| **Context-based** | React Aria | Context API로 부모-자식 간 암묵적 통신 |
| **Hook-based** | React Aria (Hooks), Mantine | `useDialog()`, `useForm()` 등 로직만 제공 |
| **Props-driven** | MUI, Ant Design | 단일 컴포넌트에 props로 모든 설정 전달 |
| **Data Attribute** | Headless UI, Radix UI | `data-state`, `data-active` 등으로 상태를 CSS에 노출 |

### 4.2 합성 복잡도 비교

```
[단순]                                                      [복잡/유연]
DaisyUI ---- MUI ---- Ant Design ---- Mantine ---- shadcn/ui ---- Headless UI ---- Radix UI ---- React Aria
(CSS class)  (Props)   (Props+Token)   (Props+Hook) (CVA+Radix)   (Compound)       (Compound)    (3-Layer)
```

- **DaisyUI**: CSS 클래스만으로 구성. JavaScript 합성 불필요.
- **MUI / Ant Design**: 단일 컴포넌트에 props를 전달하는 전통적 방식.
- **Mantine**: Props 기반이지만 훅으로 로직 분리 가능.
- **shadcn/ui**: Radix Compound + CVA variants 조합.
- **Headless UI / Radix UI**: 완전한 Compound Component. 구조와 스타일 100% 소비자 제어.
- **React Aria**: 3계층 API로 상황에 맞는 추상화 수준 선택 가능.

### 4.3 상세 예시: Dialog 구현 비교

**MUI (Props-driven):**
```tsx
<Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
  <DialogTitle>Title</DialogTitle>
  <DialogContent><DialogContentText>Content</DialogContentText></DialogContent>
  <DialogActions><Button onClick={handleClose}>Close</Button></DialogActions>
</Dialog>
```

**Radix UI (Compound Component):**
```tsx
<Dialog.Root open={open} onOpenChange={setOpen}>
  <Dialog.Trigger asChild><button>Open</button></Dialog.Trigger>
  <Dialog.Portal>
    <Dialog.Overlay />
    <Dialog.Content>
      <Dialog.Title>Title</Dialog.Title>
      <Dialog.Description>Content</Dialog.Description>
      <Dialog.Close asChild><button>X</button></Dialog.Close>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
```

**Headless UI (Render Props + Data Attributes):**
```tsx
<Dialog open={isOpen} onClose={setIsOpen}>
  <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
  <div className="fixed inset-0 flex items-center justify-center">
    <Dialog.Panel className="data-[open]:animate-fadeIn">
      <Dialog.Title>Title</Dialog.Title>
      <Dialog.Description>Content</Dialog.Description>
      <button onClick={() => setIsOpen(false)}>Close</button>
    </Dialog.Panel>
  </div>
</Dialog>
```

**React Aria (Context-based):**
```tsx
<DialogTrigger>
  <Button>Open</Button>
  <Modal>
    <Dialog>
      {({close}) => (
        <>
          <Heading slot="title">Title</Heading>
          <p>Content</p>
          <Button onPress={close}>Close</Button>
        </>
      )}
    </Dialog>
  </Modal>
</DialogTrigger>
```

---

## 5. 애니메이션/모션 비교

### 5.1 종합 비교

| 라이브러리 | 애니메이션 방식 | 이징 곡선 | Duration 체계 | Exit 애니메이션 | 모션 축소 지원 |
|-----------|----------------|-----------|---------------|----------------|---------------|
| **shadcn/ui** | Tailwind animate-* + Radix data-state | Tailwind 기본 | Tailwind 기본 | Radix Presence | Tailwind motion-reduce |
| **MUI** | Transition 컴포넌트 5종 | 3가지 곡선 (standard/enter/exit) | 7단계 (150~375ms) | 컴포넌트 내장 | prefers-reduced-motion 자동 |
| **Ant Design** | CSS 트랜지션 + cssinjs | Natural 물리 기반 | Fast/Mid/Slow (0.1/0.2/0.3s) | Exit > Enter (더 빠르게) | motion: false 전역 비활성화 |
| **Mantine** | Transition 컴포넌트 15종 | ease (CSS 기본) | 커스텀 duration prop | Transition 컴포넌트 내장 | useReducedMotion 훅 |
| **DaisyUI** | CSS 전용 (animate-*) | CSS 기본 | CSS 기본 | 제한적 | 없음 |
| **Radix UI** | data-state + CSS animation | 소비자 정의 | 소비자 정의 | Presence 컴포넌트 | 소비자 구현 |
| **Headless UI** | TransitionChild 컴포넌트 | Tailwind 클래스 | Tailwind 클래스 | 부모-자식 협조 | 소비자 구현 |
| **React Aria** | SharedElementTransition | 소비자 정의 | 소비자 정의 | 소비자 구현 | 소비자 구현 |

### 5.2 MUI 이징 곡선 상세

```
Standard (0.4, 0, 0.2, 1):
  ╭──────────╮
 ╱            ╲──────── 화면 내 이동/크기 변경에 적합
╱              
╱

Enter (0.0, 0, 0.2, 1):
  ╭──────╮
 ╱        ╲──────────── 요소 진입 시, 빠른 가속 후 부드러운 감속
╱

Exit (0.4, 0, 1, 1):
        ╭────────────── 요소 퇴장 시, 천천히 시작 후 빠른 가속
       ╱
      ╱
─────╱
```

### 5.3 Ant Design 모션 원칙 상세

1. **Natural (자연스럽게):** 현실 세계의 물리 법칙을 따르는 감속/가속 패턴
2. **Performant (성능 우선):** transform과 opacity만 사용하여 GPU 가속 활용, layout reflow 방지
3. **Concise (간결하게):** 불필요한 동작 제거, 사용자의 작업 흐름을 방해하지 않는 최소한의 애니메이션
4. **Exit > Enter 속도 규칙:** 사용자가 액션 결과를 기다리는 동안 퇴장 애니메이션이 길면 답답함을 유발하므로 퇴장은 진입보다 빨라야 한다

### 5.4 Headless UI TransitionChild 상세

```
부모 Transition ────────────────────────────────────────────
  ├── TransitionChild A (Overlay)
  │     enter: 300ms    ████████████████████
  │     leave: 200ms    ██████████████
  │
  └── TransitionChild B (Panel)
        enter: 300ms           ████████████████████
        leave: 200ms           ██████████████

부모는 모든 자식의 leave가 끝난 후 DOM에서 제거
```

`appear` prop을 추가하면 최초 마운트 시에도 enter 애니메이션이 실행된다.

---

## 6. 반응형 디자인 비교

### 6.1 브레이크포인트 비교

| 라이브러리 | 단위 | xs | sm | md | lg | xl | xxl |
|-----------|------|----|----|----|----|----|----|
| **shadcn/ui** | px (Tailwind) | - | 640px | 768px | 1024px | 1280px | 1536px |
| **MUI** | px | 0px | 600px | 900px | 1200px | 1536px | - |
| **Ant Design** | px | 480px | 576px | 768px | 992px | 1200px | 1600px |
| **Mantine** | em | 576px (36em) | 768px (48em) | 992px (62em) | 1200px (75em) | 1408px (88em) | - |
| **DaisyUI** | px (Tailwind) | - | 640px | 768px | 1024px | 1280px | 1536px |

### 6.2 반응형 구현 방식

| 라이브러리 | 방식 | Container Query | 예시 |
|-----------|------|-----------------|------|
| **shadcn/ui** | Tailwind 접두사 (`md:`, `lg:`) + useMediaQuery | Tailwind v4 지원 | `className="basis-full md:basis-1/2"` |
| **MUI** | `sx` prop + Breakpoint 객체 | MUI System 지원 | `<Box sx={{ width: { xs: '100%', md: '50%' } }} />` |
| **Ant Design** | Col span + Breakpoint 객체 | 없음 | `<Col xs={24} md={12} lg={8}>` |
| **Mantine** | Style props + 반응형 객체 | 지원 | `<Box w={{ base: 200, sm: 400 }} />` |
| **DaisyUI** | Tailwind 접두사 | Tailwind v4 지원 | `className="w-full md:w-1/2"` |
| **Headless UI** | 없음 (소비자 구현) | 없음 | Tailwind 조합 |

### 6.3 주요 반응형 패턴

**shadcn/ui Dialog -> Drawer 전환:**

가장 주목할 만한 패턴. 데스크톱에서는 Dialog, 모바일에서는 하단 Drawer로 자동 전환된다:

```tsx
function ResponsiveDialog({ children }) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog>
        <DialogContent className="sm:max-w-[425px]">
          {children}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer>
      <DrawerContent>
        {children}
      </DrawerContent>
    </Drawer>
  );
}
```

**shadcn/ui Sidebar mobile/desktop:**

```
Desktop (>= 768px):                Mobile (< 768px):
┌─────────┬──────────────┐         ┌──────────────────┐
│         │              │         │                  │
│ Sidebar │   Content    │         │     Content      │
│ (fixed) │              │         │                  │
│         │              │         │                  │
└─────────┴──────────────┘         └──────────────────┘
                                    ← Sheet overlay →
```

**Mantine Container Query:**

```tsx
<Box data-container-name="card" data-container-type="inline-size">
  <Text fz={{ base: 'sm', '@card/500px': 'lg' }}>
    컨테이너 크기에 반응
  </Text>
</Box>
```

---

## 7. 접근성 비교

### 7.1 종합 접근성 수준

| 라이브러리 | WAI-ARIA 준수 | 키보드 네비게이션 | 포커스 관리 | 스크린 리더 | i18n/RTL | 평가 |
|-----------|--------------|------------------|------------|------------|---------|------|
| **React Aria** | 최고 | 완전 | 완전 (포커스 트랩, 복원, 로빙) | VoiceOver, NVDA, JAWS, TalkBack | 30+ 언어, 13 달력, RTL | **S** |
| **Radix UI** | 완전 | 완전 | 완전 (포커스 트랩, 복원, 로빙) | 주요 스크린 리더 지원 | 없음 | **A+** |
| **Headless UI** | 완전 | 완전 (Typeahead 포함) | 완전 | 주요 스크린 리더 지원 | 없음 | **A+** |
| **shadcn/ui** | Radix 기반 | Radix 기반 | Radix 기반 | Radix 기반 | 없음 | **A** |
| **MUI** | 높음 | 높음 | 높음 | 높음 | 제한적 | **A** |
| **Ant Design** | 높음 | 높음 | 높음 | 높음 | 50+ 언어, RTL | **A** |
| **Mantine** | 높음 | 높음 | 높음 | 높음 | 없음 | **A-** |
| **DaisyUI** | 시맨틱 HTML | 기본 (HTML 네이티브) | 없음 | HTML 기반 | 없음 | **B** |

### 7.2 React Aria 접근성 상세

React Aria가 접근성 최고 수준인 이유:

1. **모바일 터치 스크린 리더:** iOS VoiceOver와 Android TalkBack에서의 터치 인터랙션까지 완벽 지원
2. **13개 달력 시스템:** 그레고리력 외 이슬람력, 히브리력, 일본력 등 지원
3. **5개 숫자 체계:** 라틴, 아랍-인도, 확장 아랍-인도, 데바나가리, 벵골어
4. **30+ 언어 내장 번역:** ARIA 레이블, 버튼 텍스트 등 자동 번역
5. **RTL 완전 지원:** 레이아웃 미러링, 키보드 방향 반전, 스크롤 방향 반전

### 7.3 키보드 네비게이션 패턴 비교

| 패턴 | Radix/Headless/React Aria | MUI | Ant Design |
|------|--------------------------|-----|------------|
| 로빙 포커스 (Arrow Keys) | 자동 | 자동 | 자동 |
| Typeahead (문자 입력 검색) | Headless UI 자동 | Select에서 지원 | 미지원 |
| Home/End 키 | 자동 | 부분 지원 | 부분 지원 |
| 포커스 트랩 (모달) | 자동 | 자동 | 자동 |
| 포커스 복원 (닫힌 후) | 자동 | 자동 | 자동 |
| Escape 키 닫기 | 자동 | 자동 | 자동 |

---

## 8. 테마/커스터마이징 비교

### 8.1 커스터마이징 방식 비교

| 라이브러리 | 방식 | 깊이 | 런타임 변경 | CSS-in-JS | CSS Variables |
|-----------|------|------|------------|-----------|---------------|
| **shadcn/ui** | 소스 코드 직접 수정 + CSS 변수 + CVA | 무한 (코드 소유) | CSS 변수 변경 | 없음 | 핵심 |
| **MUI** | createTheme() + sx prop + styled() | 매우 깊음 | ThemeProvider 교체 | Emotion (기본) | 지원 (v6) |
| **Ant Design** | ConfigProvider + 3계층 토큰 | 매우 깊음 | ConfigProvider 교체 | cssinjs | 지원 (v5.12+) |
| **Mantine** | MantineProvider + 테마 객체 | 깊음 | MantineProvider 교체 | PostCSS | 내부 사용 |
| **DaisyUI** | data-theme + CSS 변수 오버라이드 | 중간 | data-theme 변경 | 없음 | 핵심 |
| **Radix UI** | CSS 100% 소비자 제어 | 무한 | CSS 변수 변경 | 소비자 선택 | 소비자 선택 |
| **Headless UI** | CSS 100% 소비자 제어 | 무한 | CSS 변수 변경 | 소비자 선택 | 소비자 선택 |
| **React Aria** | CSS 100% 소비자 제어 | 무한 | CSS 변수 변경 | 소비자 선택 | 소비자 선택 |

### 8.2 테마 적용 범위 비교

| 라이브러리 | 전역 테마 | 부분 테마 (특정 영역) | 컴포넌트별 오버라이드 |
|-----------|-----------|---------------------|---------------------|
| **shadcn/ui** | :root CSS 변수 | .dark 클래스 중첩 | 소스 코드 직접 수정 |
| **MUI** | ThemeProvider | ThemeProvider 중첩 | components.MuiButton.styleOverrides |
| **Ant Design** | ConfigProvider | ConfigProvider 캐스케이드 (중첩) | component token |
| **Mantine** | MantineProvider | 없음 (전역만) | classNames/styles props |
| **DaisyUI** | html[data-theme] | 어떤 요소든 data-theme 적용 | Tailwind 오버라이드 |

### 8.3 Ant Design ConfigProvider 캐스케이드 예시

```tsx
<ConfigProvider theme={{ token: { colorPrimary: '#1677ff' } }}>
  <Button>Global Blue</Button>

  <ConfigProvider theme={{ token: { colorPrimary: '#52c41a' } }}>
    <Button>This Section Green</Button>

    <ConfigProvider theme={{ token: { colorPrimary: '#eb2f96' } }}>
      <Button>Nested Pink</Button>
    </ConfigProvider>
  </ConfigProvider>
</ConfigProvider>
```

### 8.4 MUI CSS Variables 모드 (v6)

```tsx
const theme = createTheme({
  cssVariables: true,
  colorSchemes: {
    light: { palette: { primary: { main: '#1976d2' } } },
    dark: { palette: { primary: { main: '#90caf9' } } },
  },
});

// CSS에서 직접 사용 가능
// var(--mui-palette-primary-main)
// var(--mui-palette-background-default)
```

---

## 9. Cappic 앱에 적용할 Best Practice 종합

### 9.1 추천 스택 구성

Cappic 앱의 특성 (프리뷰 앱, 빠른 프로토타이핑, 커스텀 디자인 필요)을 고려한 추천:

| 계층 | 추천 | 이유 |
|------|------|------|
| **핵심 프리미티브** | Radix UI | WAI-ARIA 완전 준수, asChild 패턴, Presence 애니메이션 |
| **스타일 시스템** | Tailwind CSS v4 | OKLCH 지원, 유틸리티 우선, 빠른 프로토타이핑 |
| **컴포넌트 출발점** | shadcn/ui | 소스 소유 (수정 자유), Radix+Tailwind 최적 통합 |
| **차트** | Recharts (shadcn/ui chart) | shadcn/ui와 통합, 디자인 토큰 연동 |
| **폼 관리** | React Hook Form + Zod | shadcn/ui Form 컴포넌트 통합 |

### 9.2 디자인 토큰 전략

**색상:**

```css
/* OKLCH 기반 시맨틱 토큰 (shadcn/ui 패턴 차용) */
:root {
  /* 브랜드 색상을 OKLCH로 정의 */
  --primary: oklch(0.55 0.2 260);        /* Cappic 브랜드 */
  --primary-foreground: oklch(0.98 0 0);

  /* 기능별 색상 */
  --destructive: oklch(0.58 0.24 27);
  --success: oklch(0.62 0.19 145);
  --warning: oklch(0.75 0.18 75);

  /* 표면 색상 */
  --background: oklch(1 0 0);
  --foreground: oklch(0.15 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.15 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.55 0 0);
}
```

**반경:**

```css
:root {
  --radius: 0.625rem; /* 하나의 값으로 전체 UI 둥근 정도 제어 */
}
```

**타이포그래피:**

Tailwind 유틸리티 기반으로 h1~h6, body, caption 등의 클래스 조합을 정의하고 재사용한다.

### 9.3 컴포넌트 합성 패턴

1. **CVA로 Variant 정의:** 모든 인터랙티브 컴포넌트(Button, Badge, Alert 등)에 CVA 사용
2. **asChild로 DOM 유연성 확보:** Link, Button 등에서 asChild 패턴 적용
3. **Compound Component로 복잡한 UI 구성:** Dialog, Sheet, Sidebar 등

### 9.4 애니메이션 가이드라인

| 원칙 | 적용 |
|------|------|
| **Ant Design의 Exit > Enter** | 퇴장 애니메이션은 진입보다 20-30% 빠르게 |
| **MUI의 3가지 이징** | standard(화면 내), easeOut(진입), easeIn(퇴장) 구분 사용 |
| **shadcn/ui의 Radix data-state** | CSS 애니메이션으로 진입/퇴장 구현, JS 최소화 |
| **Headless UI의 TransitionChild** | 부모-자식 협조 애니메이션으로 오버레이+패널 동시 관리 |
| **모션 축소 존중** | `@media (prefers-reduced-motion: reduce)` 항상 적용 |

추천 Duration:
- 호버/포커스: 150ms
- 토글/전환: 200ms
- 모달 진입: 250ms
- 모달 퇴장: 200ms
- 페이지 전환: 300ms

### 9.5 반응형 전략

1. **Mobile-first:** Tailwind의 `sm:`, `md:`, `lg:` 접두사로 모바일 우선 설계
2. **Dialog -> Drawer 패턴 채택:** 768px 기준으로 Dialog/Drawer 자동 전환
3. **Sidebar 상태 관리:** 데스크톱 고정, 모바일 Sheet 오버레이
4. **Container Query 활용:** 카드/위젯 내부 레이아웃에 Container Query 적극 활용

### 9.6 접근성 체크리스트

- [ ] 모든 인터랙티브 요소에 키보드 접근 가능 (Tab, Enter, Space, Escape)
- [ ] 모달/팝오버에 포커스 트랩 적용
- [ ] 닫힌 후 포커스 원래 위치로 복원
- [ ] 모든 이미지에 alt 텍스트
- [ ] 모든 폼 필드에 label 연결
- [ ] color contrast ratio WCAG AA 이상 (4.5:1 본문, 3:1 큰 텍스트)
- [ ] `prefers-reduced-motion` 미디어 쿼리 존중
- [ ] `prefers-color-scheme` 미디어 쿼리 존중 (다크 모드)
- [ ] ARIA live region으로 동적 콘텐츠 변경 알림
- [ ] skip navigation 링크 제공

### 9.7 성능 고려사항

| 전략 | 설명 |
|------|------|
| **Tree-shaking** | shadcn/ui는 사용하는 컴포넌트만 복사하므로 번들에 불필요한 코드 없음 |
| **CSS-only 우선** | 가능한 CSS transition/animation 사용, JS 애니메이션 최소화 |
| **Lazy Loading** | Dialog, Sheet 등 오버레이 컴포넌트는 필요 시 로드 |
| **Virtual Scrolling** | 긴 리스트에는 React Aria의 Virtualizer 또는 TanStack Virtual 사용 |
| **GPU 가속** | transform, opacity만 애니메이션 (layout/paint 프로퍼티 회피) |

### 9.8 최종 권고 요약

1. **shadcn/ui + Tailwind CSS v4를 기본 스택으로 채택한다.** 소스 소유 모델은 Cappic 앱의 고유한 디자인 요구사항에 완벽하게 대응한다.

2. **OKLCH 색상 토큰 시스템을 전면 도입한다.** 인간 지각에 균일한 색상 공간으로 일관된 UI를 구축한다.

3. **단일 --radius 비례 스케일을 활용한다.** 하나의 변수로 전체 UI의 둥근 정도를 즉시 조절할 수 있다.

4. **CVA + asChild 패턴을 표준화한다.** Variant 관리와 DOM 유연성을 확보한다.

5. **Ant Design의 토큰 파생 원리를 참고하되, 직접 구현은 CSS 변수로 한다.** 3계층 토큰의 개념(Seed -> Map -> Alias)은 좋지만, 런타임 JS 없이 CSS 변수만으로 구현한다.

6. **접근성은 Radix UI가 제공하는 수준을 기본으로 유지한다.** 필요 시 React Aria의 훅을 보완적으로 사용한다.

7. **반응형은 Dialog->Drawer 전환 패턴과 Container Query를 적극 활용한다.**

8. **애니메이션은 Exit > Enter 원칙, 3가지 이징 구분, prefers-reduced-motion 존중을 필수로 적용한다.**

---

> **이 문서는 2026-05-17 기준으로 작성되었으며, 각 라이브러리의 최신 버전을 기반으로 한다.**
