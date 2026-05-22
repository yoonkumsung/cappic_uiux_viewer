# Toss 오픈소스 생태계 종합 리서치 리포트

> 작성일: 2026-05-17
> 대상: Toss 공개 GitHub 레포지토리 12개 전수 분석

---

## 목차

1. [Toss 오픈소스 생태계 개요](#1-toss-오픈소스-생태계-개요)
2. [UI 컴포넌트 라이브러리 (toss-ui, h6s)](#2-ui-컴포넌트-라이브러리)
3. [UX 패턴 라이브러리 (use-funnel, overlay-kit, suspensive, react-simplikit)](#3-ux-패턴-라이브러리)
4. [유틸리티 (es-toolkit, es-hangul)](#4-유틸리티)
5. [프레임워크 (granite)](#5-프레임워크-granite)
6. [개발 철학 (frontend-fundamentals, technical-writing)](#6-개발-철학)
7. [디자인 자산 (tossface)](#7-디자인-자산-tossface)
8. [Toss UI/UX 통합 철학](#8-toss-uiux-통합-철학)
9. [Cappic 앱에 적용할 Toss 패턴 종합](#9-cappic-앱에-적용할-toss-패턴-종합)

---

## 1. Toss 오픈소스 생태계 개요

Toss(비바리퍼블리카)는 한국 최대 핀테크 기업으로, 2024~2025년 사이 12개 이상의 프론트엔드 오픈소스 프로젝트를 공개했다. 이 프로젝트들은 Toss 내부에서 실제 프로덕션에 사용되는 도구들이며, 일관된 설계 철학을 공유한다.

### 생태계 분류

| 분류 | 레포 | 핵심 역할 |
|------|------|-----------|
| **UI 컴포넌트** | toss-ui, h6s | 디자인 시스템 기반 컴포넌트, 헤드리스 캘린더 |
| **UX 패턴** | use-funnel, overlay-kit, suspensive, react-simplikit | 퍼널/오버레이/로딩·에러 상태/범용 훅 |
| **유틸리티** | es-toolkit, es-hangul | 범용 JS 유틸, 한글 처리 |
| **프레임워크** | granite | React Native 마이크로서비스 아키텍처 |
| **개발 철학** | frontend-fundamentals, technical-writing | 코드 품질 원칙, 기술 문서 작성법 |
| **디자인 자산** | tossface | 커스텀 이모지 폰트 |

### 공통 설계 원칙

- **선언적 API**: 명령형보다 선언적 패턴 선호 (JSX 기반 데이터 페칭, 선언적 스텝 렌더링 등)
- **타입 안전성**: TypeScript 네이티브, 제네릭 타입 활용, 런타임 에러 최소화
- **헤드리스 아키텍처**: UI와 로직 분리, 스타일 없는 데이터 중심 API
- **모바일 우선**: React Native 지원, 하드웨어 백 버튼 호환, 키보드/뷰포트 인식
- **제로 디펜던시 지향**: 불필요한 의존성 배제, Tree-shaking 최적화
- **SSR 호환**: 서버 사이드 렌더링 안전 설계

---

## 2. UI 컴포넌트 라이브러리

### 2.1 toss-ui

Toss의 핵심 디자인 시스템 컴포넌트 라이브러리. 모노레포 구조로 운영되며, CSS-in-JS 런타임에 비의존적인 추상화 계층을 제공한다.

#### 모노레포 패키지 구조

```
toss-ui/
├── packages/
│   ├── @toss-ui/styled      # CSS-in-JS 추상화 레이어
│   ├── @toss-ui/uikit        # 디자인 토큰 기반 컴포넌트
│   ├── @toss-ui/utils        # 내부 유틸리티
│   └── eslint-config          # 코드 컨벤션 규칙
```

#### 핵심 컴포넌트 3종

**View 컴포넌트**

```tsx
// 기본 사용 - div 래퍼
<View padding={16} backgroundColor="gray100">
  콘텐츠
</View>

// as prop으로 렌더링 엘리먼트 변경
<View as="section" role="main">
  시맨틱 HTML
</View>

// forwardRef 지원
const ref = useRef<HTMLDivElement>(null);
<View ref={ref} />
```

- 기본 렌더링 엘리먼트: `div`
- `as` prop: 렌더링 엘리먼트 다형성 (polymorphic component)
- `forwardRef` 완전 지원: ref 전달 가능
- React Native 스타일 네이밍 패러다임 채택 (`padding`, `backgroundColor` 등 camelCase)

**Text 컴포넌트**

```tsx
// 기본 사용 - span 래퍼
<Text fontSize={16} fontWeight="bold" color="gray900">
  텍스트
</Text>

// as prop으로 heading으로 변환
<Text as="h1" typography="heading1">
  제목
</Text>
```

- 기본 렌더링 엘리먼트: `span`
- `as` prop 지원 (`h1`~`h6`, `p`, `label` 등)
- 디자인 토큰 기반 타이포그래피 시스템

**Stack 컴포넌트**

```tsx
// 수직 스택 (기본)
<Stack direction="column" gap={8}>
  <View>아이템 1</View>
  <View>아이템 2</View>
</Stack>

// 수평 스택
<Stack direction="row" gap={16} align="center">
  <Text>왼쪽</Text>
  <Text>오른쪽</Text>
</Stack>
```

- `direction`: `row` | `column` (Flexbox direction 매핑)
- `gap`: 자식 간 간격 (디자인 토큰 Space와 연동)
- 정렬 props: `align`, `justify`

#### createStyled() 팩토리 시스템

CSS-in-JS 런타임에 종속되지 않는 추상화 계층. 프로젝트 환경에 따라 Emotion, Stitches, Inline Styles 등으로 전환할 수 있다.

```tsx
import { createStyled } from '@toss-ui/styled';

// Emotion 런타임 사용
const styled = createStyled({ runtime: 'emotion' });

// Stitches 런타임 사용
const styled = createStyled({ runtime: 'stitches' });

// Inline Styles (서버 환경 등)
const styled = createStyled({ runtime: 'inline' });
```

**설계 의도**: CSS-in-JS 생태계가 빠르게 변화하는 상황에서(Stitches 유지보수 중단, Zero-runtime CSS 트렌드 등) 런타임 교체 비용을 최소화하기 위한 아키텍처적 결정.

#### UIKitConfig 디자인 토큰 시스템

```tsx
import { UIKitConfig } from '@toss-ui/uikit';

// 제네릭 타입으로 디자인 토큰 정의
type MyConfig = UIKitConfig<{
  Color: {
    gray100: string;
    gray900: string;
    blue500: string;
    // ...
  };
  Typography: {
    heading1: { fontSize: number; fontWeight: string; lineHeight: number };
    body1: { fontSize: number; fontWeight: string; lineHeight: number };
    // ...
  };
  Space: {
    xs: number;   // 4
    sm: number;   // 8
    md: number;   // 16
    lg: number;   // 24
    xl: number;   // 32
  };
}>;
```

- **Color 토큰**: 시맨틱 컬러 팔레트 정의, 다크모드 전환 지원
- **Typography 토큰**: fontSize, fontWeight, lineHeight 묶음 정의
- **Space 토큰**: 일관된 간격 시스템 (4px 기반 그리드)
- **제네릭 타입**: 프로젝트별 커스텀 토큰을 타입 안전하게 정의

#### Variant 시스템

Stitches의 variants API 또는 CVA(Class Variance Authority)와 유사한 패턴. 컴포넌트 스타일 변형을 선언적으로 정의한다.

```tsx
const Button = styled('button', {
  base: {
    padding: '8px 16px',
    borderRadius: 8,
    cursor: 'pointer',
  },
  variants: {
    size: {
      sm: { padding: '4px 8px', fontSize: 12 },
      md: { padding: '8px 16px', fontSize: 14 },
      lg: { padding: '12px 24px', fontSize: 16 },
    },
    variant: {
      primary: { backgroundColor: 'blue500', color: 'white' },
      secondary: { backgroundColor: 'gray100', color: 'gray900' },
      ghost: { backgroundColor: 'transparent', color: 'blue500' },
    },
  },
  // 반응형 variants
  '@media': {
    '(max-width: 768px)': {
      size: 'sm',
    },
  },
});

// 사용
<Button size="md" variant="primary">확인</Button>
```

- 타입 안전한 variant prop 자동 생성
- 복합 variants (compoundVariants) 지원
- `@media` 반응형 variants: 브레이크포인트별 자동 전환
- 기본값(defaultVariants) 설정 가능

#### 팩토리 패턴

디자인 토큰을 주입받아 사전 설정된 컴포넌트를 생성하는 팩토리 함수.

```tsx
import { createView, createText, createStack } from '@toss-ui/uikit';

// 프로젝트 디자인 토큰으로 컴포넌트 생성
const View = createView(myDesignTokens);
const Text = createText(myDesignTokens);
const Stack = createStack(myDesignTokens);

// 이후 토큰 기반 타입 자동완성 지원
<View backgroundColor="gray100" />  // gray100이 Color 토큰에 없으면 타입 에러
<Text typography="heading1" />       // heading1이 Typography 토큰에 없으면 타입 에러
<Stack gap="md" />                   // md가 Space 토큰에 없으면 타입 에러
```

#### React Native 스타일 네이밍 패러다임

toss-ui는 CSS 프로퍼티 네이밍 대신 React Native 스타일 네이밍을 채택했다:

| CSS | toss-ui (RN 스타일) |
|-----|---------------------|
| `background-color` | `backgroundColor` |
| `font-size` | `fontSize` |
| `border-radius` | `borderRadius` |
| `padding-left` | `paddingLeft` |
| `justify-content` | `justifyContent` |

**이유**: 웹과 React Native 간 코드 공유를 용이하게 하고, JSX에서 camelCase가 자연스러우며, granite 프레임워크와의 호환성을 확보하기 위함.

---

### 2.2 h6s

헤드리스(Headless) 달력 컴포넌트 라이브러리. "No CSS, No class names. Just data." 철학으로, 스타일 없이 순수 데이터와 상태만 제공한다.

#### useCalendar 훅

```tsx
import { useCalendar } from '@h6s/calendar';

function Calendar() {
  const { headers, body, navigation, view } = useCalendar({
    defaultDate: new Date(2026, 4, 17),  // 2026년 5월 17일
    defaultView: 'month',
  });

  return (
    <table>
      <thead>
        <tr>
          {headers.weekDays.map(({ key, value }) => (
            <th key={key}>{format(value, 'EEE')}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {body.value.map(({ key, value: days }) => (
          <tr key={key}>
            {days.map(({ key, value, isCurrentMonth, isToday }) => (
              <td key={key} className={isToday ? 'today' : ''}>
                {isCurrentMonth ? format(value, 'd') : ''}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```

**반환값 상세**:

- **headers**: 요일 헤더 데이터 (`weekDays` 배열)
- **body**: 주/일 매트릭스 (2차원 배열). 각 날짜에 `isCurrentMonth`, `isToday`, `isSelected` 등 메타데이터 포함
- **navigation**: 탐색 메서드
  - `toNext()`: 다음 월/주/일로 이동
  - `toPrev()`: 이전 월/주/일로 이동
  - `setToday()`: 오늘 날짜로 이동
  - `setDate(date)`: 특정 날짜로 이동
- **view**: 뷰 모드 전환
  - `Month`: 월간 뷰 (기본)
  - `Week`: 주간 뷰
  - `Day`: 일간 뷰
  - `setView(mode)`: 뷰 전환 메서드

#### useSelection 훅

```tsx
import { useSelection } from '@h6s/calendar';

// 단일 선택
const { value, select } = useSelection({ mode: 'single' });
// value: Date | undefined

// 범위 선택
const { value, select } = useSelection({ mode: 'range' });
// value: { from: Date; to?: Date }

// 다중 선택
const { value, select } = useSelection({ mode: 'multiple' });
// value: Date[]
```

#### disabled 필터링

```tsx
const calendar = useCalendar({
  disabled: {
    dayOfWeek: [0, 6],              // 일요일(0), 토요일(6) 비활성화
    before: new Date(2026, 0, 1),   // 2026년 1월 1일 이전 비활성화
    after: new Date(2026, 11, 31),  // 2026년 12월 31일 이후 비활성화
  },
});
```

#### 플러그인 시스템

```tsx
import { withDateProps, withKeyProps } from '@h6s/calendar';

// 파이프라인으로 플러그인 조합
const enhancedCalendar = pipe(
  useCalendar(options),
  withDateProps(),    // 날짜별 추가 속성 주입
  withKeyProps(),     // 키보드 탐색 속성 주입
);
```

- `withDateProps`: 각 날짜 셀에 `onClick`, `aria-label` 등 접근성/인터랙션 속성 자동 주입
- `withKeyProps`: 키보드 방향키 탐색, Enter 선택 등 키보드 인터랙션 자동 주입
- 파이프라인 패턴: 여러 플러그인을 순차 적용하여 기능 확장

#### @h6s/table (유지보수 모드)

- 헤드리스 테이블 컴포넌트
- 현재 유지보수 모드(maintenance mode)로 신규 기능 개발 중단
- 기존 사용자 지원만 유지

#### 핵심 설계 철학

h6s의 "헤드리스" 접근법은 다음을 의미한다:

1. **CSS 없음**: 라이브러리가 어떤 스타일도 강제하지 않음
2. **클래스 없음**: CSS 클래스명 충돌 위험 제거
3. **순수 데이터**: 훅이 반환하는 것은 오직 데이터와 상태, 메서드
4. **완전한 커스터마이징**: 소비자가 원하는 UI를 자유롭게 구성
5. **프레임워크 독립**: 데이터 로직이 UI와 분리되어 재사용 가능

---

## 3. UX 패턴 라이브러리

### 3.1 use-funnel

멀티스텝 폼/온보딩 플로우를 선언적으로 관리하는 훅. 히스토리 기반 상태 관리로 하드웨어 백 버튼과 자연스럽게 호환된다.

#### 기본 사용법

```tsx
import { useFunnel } from '@use-funnel/browser';

type StepDefinitions = {
  이메일입력: { email?: string };
  비밀번호입력: { email: string; password?: string };
  완료: { email: string; password: string };
};

function SignupFunnel() {
  const funnel = useFunnel<StepDefinitions>({
    id: 'signup',
    initial: {
      step: '이메일입력',
      context: {},
    },
  });

  return (
    <funnel.Render
      이메일입력={({ context, history }) => (
        <EmailForm
          onSubmit={(email) => {
            history.push('비밀번호입력', { email });
          }}
        />
      )}
      비밀번호입력={({ context, history }) => (
        <PasswordForm
          email={context.email}
          onSubmit={(password) => {
            history.push('완료', { ...context, password });
          }}
          onBack={() => history.back()}
        />
      )}
      완료={({ context }) => (
        <Complete email={context.email} />
      )}
    />
  );
}
```

#### funnel.Render - 선언적 스텝 렌더링

`funnel.Render`는 각 스텝 이름을 prop으로 받아 현재 스텝에 해당하는 렌더 함수만 실행한다.

- 각 렌더 함수는 `({ context, history })` 인자를 받음
- `context`: 현재 스텝까지 축적된 데이터 (증분 컨텍스트 빌딩)
- `history`: 스텝 전환 메서드 객체

#### funnel.Render.with() - 이벤트 디스패치 패턴

```tsx
<funnel.Render
  이메일입력={funnel.Render.with({
    events: {
      submit: (email: string) => ({
        step: '비밀번호입력',
        context: { email },
      }),
    },
    render: ({ dispatch }) => (
      <EmailForm onSubmit={(email) => dispatch('submit', email)} />
    ),
  })}
/>
```

- 이벤트와 스텝 전환 로직을 분리
- `dispatch` 함수로 이벤트 발행
- 이벤트 핸들러에서 다음 스텝과 컨텍스트 결정
- 테스트와 유지보수가 용이한 패턴

#### funnel.Render.overlay() - 오버레이 모드

```tsx
<funnel.Render
  주소검색={funnel.Render.overlay({
    render: ({ close, context }) => (
      <AddressSearchModal
        onSelect={(address) => {
          close({ address });
        }}
        onClose={() => close()}
      />
    ),
  })}
/>
```

- 모달/바텀시트 등 오버레이로 스텝 표시
- `close` 콜백으로 오버레이 닫기 + 데이터 전달
- 이전 스텝 UI가 배경에 유지됨

#### history API - 타입 안전 스텝 전환

```tsx
// 새 스텝을 히스토리에 추가 (뒤로가기 가능)
history.push('다음스텝', { ...newContext });

// 현재 스텝을 교체 (뒤로가기 불가)
history.replace('다음스텝', { ...newContext });

// 이전 스텝으로 되돌아가기
history.back();

// 특정 위치로 이동 (음수: 뒤로, 양수: 앞으로)
history.go(-2);
```

- 모든 메서드가 타입 안전: 존재하지 않는 스텝 이름은 타입 에러
- 컨텍스트 타입도 자동 검증: 해당 스텝에 필요한 데이터가 누락되면 타입 에러

#### stepBuilder - 스텝 검증

```tsx
const funnel = useFunnel<StepDefinitions>({
  id: 'signup',
  initial: { step: '이메일입력', context: {} },
  steps: {
    비밀번호입력: {
      guard: (context) => context.email != null,   // boolean 검증
      parse: (context): context is { email: string } => {  // 타입 가드
        return typeof context.email === 'string';
      },
    },
  },
});
```

- **guard**: boolean을 반환하는 검증 함수. `false`면 해당 스텝 진입 차단
- **parse**: 타입 가드 함수. 컨텍스트 타입을 좁혀(narrow) 런타임 안전성 확보

#### 라우터 어댑터

| 패키지 | 환경 | 히스토리 동기화 |
|--------|------|-----------------|
| `@use-funnel/browser` | 바닐라 브라우저 | `window.history` |
| `@use-funnel/react-router` | React Router v6+ | `useNavigate` |
| `@use-funnel/next` | Next.js App/Pages Router | `useRouter` |
| `@use-funnel/react-navigation-native` | React Native | React Navigation Stack |

각 어댑터는 해당 라우터의 히스토리 스택과 퍼널 상태를 동기화한다. 사용자가 브라우저 뒤로가기 버튼, Android 하드웨어 백 버튼, iOS 스와이프 제스처를 사용해도 퍼널이 올바른 스텝으로 복원된다.

#### 증분 컨텍스트 빌딩

```
스텝 1: {}
스텝 2: { email: "user@email.com" }
스텝 3: { email: "user@email.com", password: "****" }
스텝 4: { email: "user@email.com", password: "****", name: "홍길동" }
```

각 스텝을 거칠 때마다 데이터가 축적되어, 최종 스텝에서 완전한 데이터를 갖게 된다. 이는 스텝 간 데이터 전달을 위한 별도 전역 상태 관리 없이도 타입 안전한 데이터 흐름을 보장한다.

---

### 3.2 overlay-kit

오버레이(모달, 다이얼로그, 바텀시트, 토스트 등)를 명령형으로 열고 닫는 라이브러리. Promise 기반 비동기 패턴으로 confirm/cancel 플로우를 간결하게 처리한다.

#### 기본 설정

```tsx
import { OverlayProvider } from 'overlay-kit';

function App() {
  return (
    <OverlayProvider>
      <MyApp />
    </OverlayProvider>
  );
}
```

#### overlay.open() - 렌더 함수 패턴

```tsx
import { overlay } from 'overlay-kit';

function handleClick() {
  overlay.open(({ isOpen, close, unmount }) => (
    <Dialog
      open={isOpen}
      onClose={close}
      onExited={unmount}  // 애니메이션 종료 후 DOM에서 제거
    >
      <DialogContent>
        정말 삭제하시겠습니까?
      </DialogContent>
    </Dialog>
  ));
}
```

**렌더 함수 인자**:

- `isOpen` (boolean): 오버레이 열림 상태. `close()` 호출 시 `false`로 전환
- `close()`: 오버레이를 닫음 (isOpen → false). 애니메이션용
- `unmount()`: 오버레이를 DOM에서 완전히 제거. 애니메이션 완료 후 호출

#### overlay.openAsync<T>() - Promise 기반 오버레이

```tsx
async function handleDelete() {
  const confirmed = await overlay.openAsync<boolean>(({ close }) => (
    <ConfirmDialog
      title="삭제 확인"
      message="이 항목을 삭제하시겠습니까?"
      onConfirm={() => close(true)}    // resolve(true)
      onCancel={() => close(false)}    // resolve(false)
    />
  ));

  if (confirmed) {
    await deleteItem(itemId);
    toast.success('삭제되었습니다');
  }
}
```

- `close(value)`: 오버레이를 닫으면서 Promise를 resolve
- 제네릭 `<T>`: resolve 값의 타입 지정
- **핵심 가치**: confirm/cancel 분기를 콜백 지옥 없이 `await`로 처리

#### 오버레이 관리 API

```tsx
// 특정 오버레이 닫기 (isOpen → false)
overlay.close(overlayId);

// 특정 오버레이 언마운트 (DOM 제거)
overlay.unmount(overlayId);

// 모든 오버레이 닫기
overlay.closeAll();

// 모든 오버레이 언마운트
overlay.unmountAll();
```

#### 커스텀 훅

```tsx
import { useCurrentOverlay, useOverlayData } from 'overlay-kit';

// 현재 최상위 오버레이 정보
const currentOverlay = useCurrentOverlay();

// 오버레이에 전달된 데이터 접근
const data = useOverlayData<MyDataType>();
```

#### experimental_createOverlayContext() - 독립 스코프

```tsx
const { OverlayProvider, overlay } = experimental_createOverlayContext();
```

- 별도의 오버레이 컨텍스트 생성
- 마이크로 프론트엔드 등에서 오버레이 충돌 방지
- 각 스코프가 독립적인 오버레이 스택 관리

#### 내부 Reducer 아키텍처

```
Action Types:
├── ADD      → 오버레이 추가 (초기 상태: closed)
├── OPEN     → 오버레이 열기 (isOpen → true)
├── CLOSE    → 오버레이 닫기 (isOpen → false)
├── REMOVE   → 오버레이 제거 (DOM에서 언마운트)
├── CLOSE_ALL → 모든 오버레이 닫기
└── REMOVE_ALL → 모든 오버레이 제거
```

- **overlayOrderList**: 오버레이 순서를 관리하는 스택 자료구조
- **current 자동 추적**: 가장 최근에 열린 오버레이를 자동으로 current로 설정
- FIFO(First In, First Out) 또는 LIFO(Last In, First Out) 순서로 닫기 가능

#### UI 프레임워크 연동

| 프레임워크 | 연동 방식 |
|-----------|-----------|
| **MUI (Material UI)** | `<Dialog open={isOpen} onClose={close}>` |
| **Chakra UI** | `<Modal isOpen={isOpen} onClose={close}>` |
| **Ant Design** | `<Modal open={isOpen} onCancel={close}>` |
| **Framer Motion** | `<AnimatePresence>` + `motion` 컴포넌트 조합 |

각 프레임워크의 모달/다이얼로그 컴포넌트를 `isOpen`/`close` 패턴으로 자연스럽게 래핑할 수 있다.

---

### 3.3 suspensive

React Suspense와 Error Boundary를 선언적으로 확장하는 라이브러리 모음. 데이터 페칭, 에러 처리, 로딩 상태를 컴포넌트 수준에서 관리한다.

#### @suspensive/react

##### Suspense 컴포넌트

```tsx
import { Suspense } from '@suspensive/react';

// 기본 사용
<Suspense fallback={<Skeleton />}>
  <AsyncComponent />
</Suspense>

// clientOnly: SSR 시 fallback 렌더링, 클라이언트에서만 children 렌더링
<Suspense clientOnly fallback={<Skeleton />}>
  <BrowserOnlyComponent />
</Suspense>

// name: React DevTools에서 식별 가능
<Suspense name="UserProfile" fallback={<Skeleton />}>
  <UserProfile />
</Suspense>
```

- **clientOnly prop**: `useSyncExternalStore` 기반 구현. SSR 하이드레이션 불일치(mismatch) 방지
- **name prop**: React DevTools에서 Suspense 경계를 이름으로 식별 가능

##### Suspense.with() HOC

```tsx
const AsyncPage = Suspense.with(
  { fallback: <PageSkeleton /> },
  function Page() {
    const data = useSuspenseQuery(/* ... */);
    return <div>{data.title}</div>;
  }
);

// 사용
<AsyncPage />
// 위와 동일: <Suspense fallback={<PageSkeleton />}><Page /></Suspense>
```

##### ErrorBoundary 컴포넌트

```tsx
import { ErrorBoundary } from '@suspensive/react';

<ErrorBoundary
  // shouldCatch: 어떤 에러를 잡을지 결정
  shouldCatch={[
    NetworkError,                           // ErrorConstructor
    (error): error is ApiError => error instanceof ApiError,  // TypeGuard
    (error) => error.status === 401,       // Validator
    true,                                   // boolean
  ]}
  // fallback: 에러 UI (ReactNode 또는 render function)
  fallback={({ error, reset }) => (
    <ErrorView
      message={error.message}
      onRetry={reset}
    />
  )}
  // resetKeys: 이 값들이 변경되면 자동 리셋
  resetKeys={[userId, queryKey]}
  // 콜백
  onError={(error, info) => logError(error)}
  onReset={() => refetchData()}
>
  <SomeComponent />
</ErrorBoundary>
```

**shouldCatch 옵션 (배열 OR 로직)**:

| 타입 | 설명 | 예시 |
|------|------|------|
| `boolean` | 모든 에러 잡기/무시 | `true`, `false` |
| `ErrorConstructor` | 특정 에러 클래스 | `NetworkError` |
| `TypeGuard` | 타입 가드 함수 | `(e): e is ApiError => ...` |
| `Validator` | 조건 함수 | `(e) => e.status === 401` |
| `Array` | 위 타입들의 OR 조합 | `[NetworkError, (e) => ...]` |

##### ErrorBoundary 하위 API

```tsx
// Consumer: ErrorBoundary 내부에서 에러 접근
<ErrorBoundary.Consumer>
  {({ error, reset }) => /* ... */}
</ErrorBoundary.Consumer>

// with() HOC
const SafePage = ErrorBoundary.with(
  { fallback: <ErrorView /> },
  function Page() { /* ... */ }
);

// useErrorBoundary(): 명시적 에러 트리거
const { setError } = useErrorBoundary();
setError(new Error('수동 에러'));

// useErrorBoundaryFallbackProps(): fallback 내부에서 사용
const { error, reset } = useErrorBoundaryFallbackProps();
```

##### ErrorBoundaryGroup

```tsx
import { ErrorBoundaryGroup, useErrorBoundaryGroup } from '@suspensive/react';

// 여러 ErrorBoundary를 그룹으로 묶어 일괄 리셋
<ErrorBoundaryGroup blockOutside>
  <ErrorBoundary fallback={<Error1 />}>
    <Component1 />
  </ErrorBoundary>
  <ErrorBoundary fallback={<Error2 />}>
    <Component2 />
  </ErrorBoundary>

  <ResetAllButton />
</ErrorBoundaryGroup>

function ResetAllButton() {
  const { reset } = useErrorBoundaryGroup();
  return <button onClick={reset}>모두 재시도</button>;
}
```

- **blockOutside**: 외부 ErrorBoundaryGroup의 리셋이 내부로 전파되지 않도록 차단
- **중첩 연쇄**: ErrorBoundaryGroup 안에 ErrorBoundaryGroup 중첩 가능

##### Delay 컴포넌트

```tsx
import { Delay } from '@suspensive/react';

// 기본: ms 후에 children 표시
<Delay ms={200}>
  <Spinner />
</Delay>

// isDelayed render props: fade-in 효과 구현
<Delay ms={200}>
  {({ isDelayed }) => (
    <div style={{ opacity: isDelayed ? 1 : 0, transition: 'opacity 0.3s' }}>
      <Spinner />
    </div>
  )}
</Delay>

// fallback: 지연 동안 표시할 대체 UI
<Delay ms={200} fallback={null}>
  <Spinner />
</Delay>
```

- **사용 목적**: 짧은 로딩에 Spinner를 보여주면 UX가 오히려 나빠지므로, 일정 시간 이후에만 표시
- **isDelayed render props**: 지연 상태에 따라 fade-in 등 트랜지션 적용 가능

##### DefaultPropsProvider + DefaultProps

```tsx
import { DefaultPropsProvider, DefaultProps } from '@suspensive/react';

<DefaultPropsProvider
  Suspense={{ fallback: <GlobalSkeleton /> }}
  ErrorBoundary={{ fallback: <GlobalError /> }}
  Delay={{ ms: 200 }}
>
  <App />
</DefaultPropsProvider>
```

- 앱 전역에서 Suspense, ErrorBoundary, Delay의 기본 props 설정
- 개별 컴포넌트에서 오버라이드 가능

##### 유틸리티 훅

| 훅 | 설명 |
|----|------|
| `useIsChanged(value)` | 값이 변경되었는지 boolean 반환 |
| `usePrevious(value)` | 이전 렌더의 값 반환 |
| `useTimeout(fn, ms)` | 타임아웃 관리 (자동 클린업) |
| `useIsClient()` | 클라이언트 환경인지 확인 (SSR 안전) |

#### @suspensive/react-query (v5)

TanStack Query v5와 통합. 데이터 페칭을 JSX 선언적 컴포넌트로 수행한다.

##### JSX 데이터 페칭 컴포넌트

```tsx
import {
  SuspenseQuery,
  SuspenseInfiniteQuery,
  SuspenseQueries,
  Mutation,
  PrefetchQuery,
  PrefetchInfiniteQuery,
} from '@suspensive/react-query';

// 단일 쿼리 - Suspense 자동 통합
<SuspenseQuery
  queryKey={['user', userId]}
  queryFn={() => fetchUser(userId)}
>
  {({ data: user }) => <UserProfile user={user} />}
</SuspenseQuery>

// 무한 스크롤 쿼리
<SuspenseInfiniteQuery
  queryKey={['posts']}
  queryFn={({ pageParam }) => fetchPosts(pageParam)}
  getNextPageParam={(lastPage) => lastPage.nextCursor}
>
  {({ data, fetchNextPage }) => (
    <PostList pages={data.pages} onLoadMore={fetchNextPage} />
  )}
</SuspenseInfiniteQuery>

// 병렬 쿼리
<SuspenseQueries
  queries={[
    { queryKey: ['user'], queryFn: fetchUser },
    { queryKey: ['posts'], queryFn: fetchPosts },
  ]}
>
  {([{ data: user }, { data: posts }]) => (
    <Dashboard user={user} posts={posts} />
  )}
</SuspenseQueries>

// Mutation 컴포넌트
<Mutation
  mutationFn={updateUser}
  onSuccess={() => toast.success('저장 완료')}
>
  {({ mutate, isPending }) => (
    <button onClick={() => mutate(data)} disabled={isPending}>
      저장
    </button>
  )}
</Mutation>

// 프리페치 (렌더 시 자동 프리페치 시작)
<PrefetchQuery queryKey={['next-page']} queryFn={fetchNextPage} />
```

##### 훅 API

```tsx
import {
  useSuspenseQuery,
  useSuspenseInfiniteQuery,
  useSuspenseQueries,
} from '@suspensive/react-query';

// Suspense와 통합된 쿼리 훅 (data가 항상 정의됨, undefined 불가)
const { data } = useSuspenseQuery({
  queryKey: ['user', userId],
  queryFn: () => fetchUser(userId),
});
// data 타입: User (User | undefined가 아님!)
```

##### 추가 컴포넌트

- **QueriesHydration**: 서버에서 프리페치한 쿼리를 클라이언트로 하이드레이션
- **QueryClientConsumer**: QueryClient 인스턴스에 접근

#### @suspensive/jotai

Jotai 상태를 Suspense와 통합하는 컴포넌트.

```tsx
import { Atom, AtomValue, SetAtom } from '@suspensive/jotai';

// 비동기 Atom을 Suspense와 함께 사용
<Suspense fallback={<Loading />}>
  <Atom atom={userAtom}>
    {([value, setValue]) => (
      <input value={value.name} onChange={(e) => setValue({ name: e.target.value })} />
    )}
  </Atom>
</Suspense>

// 읽기 전용
<AtomValue atom={readOnlyAtom}>
  {(value) => <span>{value}</span>}
</AtomValue>

// 쓰기 전용
<SetAtom atom={writeOnlyAtom}>
  {(setValue) => <button onClick={() => setValue('new')}>변경</button>}
</SetAtom>
```

#### @suspensive/codemods

버전 간 자동 마이그레이션 도구.

```bash
npx @suspensive/codemods migrate --from v1 --to v2
```

---

### 3.4 react-simplikit

프론트엔드 개발에 자주 사용되는 컴포넌트, 훅, 유틸리티 모음. 제로 디펜던시, 100% 테스트 커버리지, SSR 안전, Tree-shakeable.

#### 컴포넌트 3종

```tsx
import { ImpressionArea, Separated, SwitchCase } from 'react-simplikit';

// ImpressionArea: 뷰포트 진입/이탈 감지
<ImpressionArea
  onImpressionStart={() => trackImpression('banner')}
  onImpressionEnd={() => trackImpressionEnd('banner')}
  threshold={0.5}  // 50% 이상 보일 때
>
  <Banner />
</ImpressionArea>

// Separated: 리스트 아이템 사이에 구분자 삽입
<Separated separator={<Divider />}>
  {items.map((item) => (
    <ListItem key={item.id} item={item} />
  ))}
</Separated>

// SwitchCase: 조건부 렌더링 (switch-case JSX)
<SwitchCase
  value={status}
  cases={{
    loading: <Spinner />,
    error: <ErrorView />,
    success: <SuccessView />,
  }}
  default={<EmptyView />}
/>
```

#### 29개 훅 전체 목록

**State 관리 (9개)**

| 훅 | 설명 |
|----|------|
| `useBoolean` | boolean 상태 (toggle, setTrue, setFalse) |
| `useControlled` | 제어/비제어 모드 자동 전환 |
| `useDebouncedState` | 디바운스된 상태 |
| `useInputState` | input 상태 (value, onChange, reset) |
| `useLocalStorage` | localStorage 동기화 상태 |
| `useSessionStorage` | sessionStorage 동기화 상태 |
| `useMap` | Map 자료구조 상태 |
| `useSet` | Set 자료구조 상태 |
| `useStep` | 스텝 상태 (next, prev, setStep) |

**Effects (7개)**

| 훅 | 설명 |
|----|------|
| `useAsyncEffect` | async 함수를 안전하게 실행하는 useEffect |
| `useDebounce` | 값 디바운싱 |
| `useInterval` | setInterval 래퍼 (자동 클린업) |
| `useIsMounted` | 마운트 여부 확인 |
| `usePreservedCallback` | 최신 콜백 참조 유지 (useCallback 대체) |
| `usePreservedReference` | 깊은 비교로 참조 안정성 유지 |
| `useTimeout` | setTimeout 래퍼 (자동 클린업) |

**Optimization (4개)**

| 훅 | 설명 |
|----|------|
| `useCombinedRefs` | 여러 ref를 하나로 합성 |
| `useDebouncedCallback` | 디바운스된 콜백 |
| `useLazyRef` | 지연 초기화 ref |
| `useThrottledCallback` | 스로틀된 콜백 |

**References (3개)**

| 훅 | 설명 |
|----|------|
| `usePrevious` | 이전 렌더 값 |
| `useRefEffect` | ref 기반 side effect |
| `useStableValue` | 값 안정화 (불필요한 리렌더 방지) |

**DOM/Events (5개)**

| 훅 | 설명 |
|----|------|
| `useDocumentEvent` | document 이벤트 리스너 |
| `useDocumentTitle` | document.title 설정 |
| `useIntersectionObserver` | IntersectionObserver 훅 |
| `useMediaQuery` | CSS 미디어 쿼리 매칭 |
| `useWindowEvent` | window 이벤트 리스너 |

**Platform (3개)**

| 훅 | 설명 |
|----|------|
| `useIsClient` | 클라이언트 환경 확인 |
| `useIsServer` | 서버 환경 확인 |
| `useDeviceType` | 디바이스 유형 감지 |

#### 유틸리티 3종

```tsx
import { buildContext, mergeProps, mergeRefs } from 'react-simplikit';

// buildContext: 타입 안전 Context 팩토리
const [ThemeProvider, useTheme] = buildContext<ThemeType>('Theme');

// mergeProps: 여러 props 객체 병합 (이벤트 핸들러 체이닝)
const merged = mergeProps(baseProps, overrideProps);
// onClick이 둘 다 있으면 순차 호출

// mergeRefs: 여러 ref를 하나로 합성
<div ref={mergeRefs(ref1, ref2, ref3)} />
```

#### @react-simplikit/mobile (7개 모바일 전용 훅)

```tsx
import {
  useKeyboardHeight,
  useAvoidKeyboard,
  useBodyScrollLock,
  useNetworkStatus,
  usePageVisibility,
  useSafeAreaInset,
  useScrollDirection,
  useVisualViewport,
} from '@react-simplikit/mobile';

// 키보드 높이 감지
const keyboardHeight = useKeyboardHeight();

// 키보드 회피 (입력 필드 자동 스크롤)
const { style } = useAvoidKeyboard();

// 바디 스크롤 잠금 (모달 열림 시)
useBodyScrollLock(isModalOpen);

// 네트워크 상태
const { isOnline, effectiveType } = useNetworkStatus();

// 페이지 가시성
const isVisible = usePageVisibility();

// Safe Area Inset (노치 대응)
const { top, bottom, left, right } = useSafeAreaInset();

// 스크롤 방향 감지
const direction = useScrollDirection(); // 'up' | 'down'

// Visual Viewport (키보드 표시 시 실제 뷰포트)
const { height, offsetTop } = useVisualViewport();
```

**모바일 유틸리티 함수**:

| 함수 | 설명 |
|------|------|
| `enableBodyScrollLock(el)` | 특정 엘리먼트의 바디 스크롤 잠금 활성화 |
| `getKeyboardHeight()` | 현재 키보드 높이 반환 |
| `getSafeAreaInset()` | Safe Area Inset 값 반환 |
| `isAndroid()` | Android 플랫폼 감지 |
| `isIOS()` | iOS 플랫폼 감지 |
| `isServer()` | 서버 환경 감지 |

#### 설계 원칙

- **제로 디펜던시**: 외부 패키지 의존 없음
- **100% 테스트 커버리지**: 모든 함수/훅에 대한 테스트
- **SSR-safe**: 서버 환경에서 에러 없이 동작
- **Tree-shakeable**: 사용하는 것만 번들에 포함

---

## 4. 유틸리티

### 4.1 es-toolkit

lodash를 대체하는 현대적 JavaScript 유틸리티 라이브러리. TypeScript 네이티브, 최소 번들 사이즈, 고성능을 목표로 한다.

#### lodash 대비 성능

| 지표 | 개선폭 |
|------|--------|
| 번들 사이즈 | 최대 **97% 감소** |
| 실행 성능 | **2~11.8배** 향상 |
| TypeScript | 네이티브 지원 (d.ts 불필요) |
| 테스트 커버리지 | **100%** |

#### 함수 카테고리 전체

##### Array (70+ 함수)

| 함수 | 설명 | UI 활용 |
|------|------|---------|
| `chunk(arr, size)` | 배열을 고정 크기 청크로 분할 | 그리드 레이아웃, 페이지네이션 |
| `groupBy(arr, fn)` | 기준 함수로 그룹화 | 카테고리별 리스트 |
| `keyBy(arr, fn)` | 키 기반 객체로 변환 | ID 기반 빠른 조회 |
| `uniq(arr)` | 중복 제거 | 태그 목록 정리 |
| `uniqBy(arr, fn)` | 기준 함수로 중복 제거 | |
| `sortBy(arr, fn)` | 안정 정렬 | 리스트 정렬 |
| `flatten(arr)` | 1단계 평탄화 | |
| `flattenDeep(arr)` | 완전 평탄화 | |
| `intersection(a, b)` | 교집합 | 필터 조합 |
| `difference(a, b)` | 차집합 | 필터 제외 |
| `zip(a, b)` | 배열 결합 | 병렬 데이터 매핑 |
| `take(arr, n)` | 앞에서 n개 | 미리보기 |
| `drop(arr, n)` | 앞에서 n개 제거 | |
| `compact(arr)` | falsy 값 제거 | |
| `head(arr)` | 첫 번째 요소 | |
| `last(arr)` | 마지막 요소 | |
| `sample(arr)` | 랜덤 요소 | |
| `shuffle(arr)` | 랜덤 섞기 | |
| `range(start, end, step)` | 숫자 범위 배열 생성 | |
| `countBy(arr, fn)` | 기준별 개수 | 통계/차트 |

##### Function (18 함수)

| 함수 | 설명 | UI 활용 |
|------|------|---------|
| `debounce(fn, ms, opts)` | 디바운스 | 검색 입력, 리사이즈 |
| `throttle(fn, ms, opts)` | 스로틀 | 스크롤 이벤트 |
| `once(fn)` | 한 번만 실행 | 초기화 |
| `memoize(fn)` | 메모이제이션 | 비용 높은 계산 |
| `negate(fn)` | 결과 반전 | 필터 조건 반전 |
| `curry(fn)` | 커링 | 함수 조합 |
| `partial(fn, ...args)` | 부분 적용 | |
| `flow(...fns)` | 왼→오 함수 합성 | 데이터 파이프라인 |
| `flowRight(...fns)` | 오→왼 함수 합성 | |
| `noop()` | 아무것도 안 하는 함수 | 기본값 |
| `identity(x)` | 입력 그대로 반환 | |

**debounce 상세**:

```tsx
import { debounce } from 'es-toolkit';

const search = debounce(
  async (query: string) => {
    const results = await fetchResults(query);
    setResults(results);
  },
  300,
  {
    leading: false,     // 첫 호출 즉시 실행 여부
    trailing: true,     // 마지막 호출 실행 여부
    signal: controller.signal,  // AbortSignal로 취소 가능
  }
);

// 수동 제어
search.cancel();  // 대기 중인 호출 취소
search.flush();   // 대기 중인 호출 즉시 실행
```

##### Math (14 함수)

| 함수 | 설명 |
|------|------|
| `sum(arr)` | 합계 |
| `mean(arr)` | 평균 |
| `min(arr)` / `max(arr)` | 최솟값 / 최댓값 |
| `clamp(n, min, max)` | 범위 제한 |
| `round(n, precision)` | 반올림 |
| `ceil(n, precision)` | 올림 |
| `floor(n, precision)` | 내림 |
| `random(min, max)` | 랜덤 숫자 |
| `inRange(n, start, end)` | 범위 확인 |
| `sumBy(arr, fn)` | 기준 함수 합계 |
| `meanBy(arr, fn)` | 기준 함수 평균 |
| `minBy(arr, fn)` / `maxBy(arr, fn)` | 기준 함수 최솟값 / 최댓값 |

##### Object (16 함수)

| 함수 | 설명 | UI 활용 |
|------|------|---------|
| `pick(obj, keys)` | 지정 키만 추출 | props 필터링 |
| `omit(obj, keys)` | 지정 키 제외 | props에서 특정 키 제거 |
| `merge(target, source)` | 깊은 병합 | 설정 객체 병합 |
| `clone(obj)` | 얕은 복사 | |
| `cloneDeep(obj)` | 깊은 복사 | 불변 업데이트 |
| `get(obj, path)` | 경로로 값 접근 | |
| `set(obj, path, value)` | 경로로 값 설정 | |
| `mapKeys(obj, fn)` | 키 변환 | API 응답 변환 |
| `mapValues(obj, fn)` | 값 변환 | |
| `invert(obj)` | 키-값 뒤집기 | |
| `defaults(obj, ...defs)` | 기본값 적용 | |
| `has(obj, path)` | 경로 존재 확인 | |
| `keys(obj)` / `values(obj)` | 키/값 배열 | |
| `entries(obj)` | [key, value] 배열 | |
| `fromEntries(entries)` | 엔트리에서 객체 생성 | |

##### Predicate (28 함수)

| 함수 | 설명 |
|------|------|
| `isNil(x)` | null 또는 undefined |
| `isNull(x)` / `isUndefined(x)` | null / undefined |
| `isEmpty(x)` | 비어있는지 (배열, 문자열, 객체) |
| `isString(x)` / `isNumber(x)` / `isBoolean(x)` | 타입 체크 |
| `isArray(x)` / `isObject(x)` / `isFunction(x)` | 타입 체크 |
| `isDate(x)` / `isRegExp(x)` / `isSymbol(x)` | 타입 체크 |
| `isEqual(a, b)` | 깊은 동등 비교 |
| `isPlainObject(x)` | 순수 객체 |
| `isInteger(x)` / `isFinite(x)` / `isNaN(x)` | 숫자 속성 |
| `isTypedArray(x)` | TypedArray 여부 |
| `isError(x)` | Error 인스턴스 |
| `isMap(x)` / `isSet(x)` / `isWeakMap(x)` / `isWeakSet(x)` | 컬렉션 타입 |
| `isArguments(x)` | arguments 객체 |
| `isLength(x)` | 유효한 length |
| `isMatch(obj, source)` | 부분 매칭 |
| `conforms(source)` | 조건 객체 매칭 |
| `matches(source)` | 부분 매칭 함수 |

##### Promise (6 함수)

| 함수 | 설명 |
|------|------|
| `delay(ms)` | 지정 시간 대기 |
| `timeout(promise, ms)` | 타임아웃 설정 |
| `retry(fn, opts)` | 재시도 |
| `withTimeout(fn, ms)` | 함수에 타임아웃 적용 |
| `settled(promises)` | 모든 Promise 결과 수집 |
| `mutex(fn)` | 동시 실행 방지 |

##### String (20 함수)

| 함수 | 설명 |
|------|------|
| `camelCase(str)` | camelCase 변환 |
| `snakeCase(str)` | snake_case 변환 |
| `kebabCase(str)` | kebab-case 변환 |
| `pascalCase(str)` | PascalCase 변환 |
| `capitalize(str)` | 첫 글자 대문자 |
| `lowerCase(str)` / `upperCase(str)` | 소/대문자 |
| `trim(str)` / `trimStart(str)` / `trimEnd(str)` | 공백 제거 |
| `pad(str, length)` | 패딩 |
| `startsWith(str, target)` / `endsWith(str, target)` | 시작/끝 확인 |
| `repeat(str, n)` | 반복 |
| `replace(str, pattern, replacement)` | 치환 |
| `split(str, separator)` | 분할 |
| `truncate(str, opts)` | 말줄임 |
| `escape(str)` / `unescape(str)` | HTML 이스케이프 |
| `template(str, data)` | 템플릿 치환 |
| `words(str)` | 단어 분할 |

#### es-toolkit/compat 호환 레이어

```tsx
// lodash 드롭인 교체
import { debounce } from 'es-toolkit/compat';
// lodash의 debounce와 100% 호환되는 API
```

- lodash API와 1:1 호환
- 점진적 마이그레이션 지원
- 호환 레이어도 lodash 대비 번들 사이즈 감소

---

### 4.2 es-hangul

한글 처리를 위한 JavaScript 라이브러리. 한글 조합/분해, 초성 검색, 조사 자동 선택, QWERTY 변환 등을 지원한다.

#### Core 함수

```tsx
import {
  assemble,
  disassemble,
  getChoseong,
  combineCharacter,
  hasBatchim,
  josa,
  removeLastCharacter,
} from 'es-hangul';

// 자모 조합
assemble(['ㅎ', 'ㅏ', 'ㄴ', 'ㄱ', 'ㅡ', 'ㄹ']);  // '한글'

// 자모 분해
disassemble('한글');  // ['ㅎ', 'ㅏ', 'ㄴ', 'ㄱ', 'ㅡ', 'ㄹ']

// 초성 추출
getChoseong('토스');  // 'ㅌㅅ'

// 자모 결합
combineCharacter('ㅎ', 'ㅏ', 'ㄴ');  // '한'

// 받침 여부
hasBatchim('한');  // true
hasBatchim('가');  // false

// 조사 자동 선택
josa('토스', '을/를');    // '토스를'
josa('카카오', '이/가');  // '카카오가'
josa('네이버', '은/는');  // '네이버는'

// 마지막 글자 제거 (백스페이스 시뮬레이션)
removeLastCharacter('한글');  // '한그'  (ㄹ만 제거)
```

#### Keyboard 함수

```tsx
import { convertQwertyToHangul, convertHangulToQwerty } from 'es-hangul';

// QWERTY → 한글 (영타 → 한타)
convertQwertyToHangul('gksrmf');  // '한글'

// 한글 → QWERTY (한타 → 영타)
convertHangulToQwerty('한글');  // 'gksrmf'
```

- **활용**: 검색 시 영타/한타 오입력 자동 보정
- 실시간 입력 변환에 사용 가능

#### Number 함수

```tsx
import {
  numberToHangul,
  amountToHangul,
  susa,
  seosusa,
  days,
} from 'es-hangul';

// 숫자 → 한글
numberToHangul(12345);      // '일만이천삼백사십오'

// 금액 → 한글
amountToHangul(50000);      // '오만원'

// 순서수사 (고유어)
susa(1);    // '하나'
susa(20);   // '스물'

// 서수사 (관형사형)
seosusa(1);   // '첫째'
seosusa(2);   // '둘째'

// 날짜 한글
days(1);    // '하루'
days(2);    // '이틀'
days(3);    // '사흘'
```

#### Pronunciation 함수

```tsx
import { standardizePronunciation, romanize } from 'es-hangul';

// 표준 발음법 적용
standardizePronunciation('읽다');    // '익따'
standardizePronunciation('학교');    // '학꾜'

// 로마자 표기법
romanize('서울');    // 'seoul'
romanize('부산');    // 'busan'
```

#### 실전 활용: 초성 검색

```tsx
import { getChoseong } from 'es-hangul';

function choseongSearch(query: string, items: string[]) {
  const choseong = getChoseong(query);
  return items.filter((item) => {
    const itemChoseong = getChoseong(item);
    return itemChoseong.includes(choseong);
  });
}

choseongSearch('ㅌㅅ', ['토스', '카카오', '네이버']);
// → ['토스']

choseongSearch('ㅋㅋ', ['토스', '카카오', '네이버']);
// → ['카카오']
```

---

## 5. 프레임워크: granite

React Native 마이크로서비스 아키텍처 프레임워크. Brownfield-first(기존 네이티브 앱에 RN 화면 추가) 전략으로, 서비스당 200KB 이하의 경량 독립 빌드/배포를 지원한다.

### 아키텍처 철학

```
기존 네이티브 앱 (iOS/Android)
    ├── 네이티브 화면 A
    ├── 네이티브 화면 B
    ├── RN 마이크로서비스 1 (200KB, 독립 배포)
    ├── RN 마이크로서비스 2 (200KB, 독립 배포)
    └── RN 마이크로서비스 3 (200KB, 독립 배포)
```

- **마이크로서비스 앱 아키텍처**: 각 서비스가 독립적으로 빌드/배포
- **서비스당 200KB**: 경량 번들로 빠른 로드
- **Brownfield-first**: 기존 네이티브 앱에 RN 화면을 점진적으로 추가
- **ESBuild 기반 빌드**: Metro 대신 ESBuild 사용으로 초 단위 빌드 시간

### Style Utils

granite는 자체 스타일 유틸리티를 제공한다. React Native StyleSheet와 호환되며 자주 사용하는 레이아웃 패턴을 사전 정의한다.

```tsx
import { Flex, Stack, Spacing, BoxSpacing, Children } from 'granite/style-utils';

// Flex 프리셋
<View style={Flex.Center}>         {/* justifyContent + alignItems: center */}
  <Text>중앙 정렬</Text>
</View>

<View style={Flex.CenterVertical}>  {/* alignItems: center */}
  <Text>수직 중앙</Text>
</View>

<View style={Flex.CenterHorizontal}>  {/* justifyContent: center */}
  <Text>수평 중앙</Text>
</View>

// Stack 레이아웃
<View style={Stack.Horizontal}>     {/* flexDirection: row */}
  <Item /><Item /><Item />
</View>

<View style={Stack.Vertical}>       {/* flexDirection: column */}
  <Item /><Item /><Item />
</View>

// gutter: Stack 내 자식 간 간격
<View style={[Stack.Horizontal, { gap: Stack.gutter(8) }]}>
  <Item /><Item />
</View>

// Spacing: 여백 컴포넌트
<Spacing size={16} />               {/* 16px 수직 여백 */}
<Spacing size={16} direction="horizontal" />  {/* 16px 수평 여백 */}

// BoxSpacing: 패딩 박스
<BoxSpacing vertical={16} horizontal={24}>
  <Content />
</BoxSpacing>

// Children.Gap: 자식 간 자동 간격
<View style={Children.Gap(8)}>
  <Item /><Item /><Item />
  {/* 각 Item 사이에 8px 간격 */}
</View>
```

### Screen & Navigation

```tsx
import { createRoute, Router, useVisibility, useBackEvent } from 'granite/navigation';

// 라우트 정의
const HomeRoute = createRoute({
  path: '/home',
  component: HomeScreen,
  params: {},
});

const ProfileRoute = createRoute({
  path: '/profile/:userId',
  component: ProfileScreen,
  params: { userId: 'string' },
});

// 라우터 설정
function App() {
  return (
    <Router
      routes={[HomeRoute, ProfileRoute]}
      initialRoute={HomeRoute}
    />
  );
}

// 화면 가시성 감지
function HomeScreen() {
  useVisibility({
    onVisible: () => console.log('홈 화면 표시'),
    onHidden: () => console.log('홈 화면 숨김'),
  });
  // ...
}

// 백 버튼 이벤트 처리
function ProfileScreen() {
  useBackEvent(() => {
    // Android 하드웨어 백 버튼 또는 네비게이션 뒤로가기
    navigation.goBack();
  });
  // ...
}
```

### AWS Pulumi 인프라

```
granite-forge deploy
        │
        ▼
    ReactNativeBundleCDN (Pulumi 컴포넌트)
        ├── S3 Bucket (번들 스토리지)
        │   ├── service-a/v1.0.0/bundle.js
        │   ├── service-a/v1.0.1/bundle.js
        │   └── service-b/v1.0.0/bundle.js
        └── CloudFront (CDN 배포)
            └── 글로벌 엣지 캐싱
```

- **granite-forge deploy**: 한 줄 명령으로 빌드 + 업로드 + CDN 배포
- **S3 + CloudFront**: AWS 기반 정적 번들 호스팅
- **버전 관리**: 서비스별 독립 버전 관리, 롤백 가능
- **Pulumi IaC**: 인프라를 코드로 관리 (TypeScript)

### 27개 패키지 생태계

granite는 27개의 내부 패키지로 구성된 대규모 모노레포이다:

| 분류 | 주요 패키지 |
|------|------------|
| **Core** | `granite-core`, `granite-runtime`, `granite-bridge` |
| **Build** | `granite-esbuild`, `granite-forge`, `granite-bundler` |
| **Navigation** | `granite-navigator`, `granite-router`, `granite-deeplink` |
| **Style** | `granite-style-utils`, `granite-theme` |
| **Infra** | `granite-pulumi`, `granite-cdn`, `granite-deploy` |
| **DevTools** | `granite-devtools`, `granite-inspector`, `granite-logger` |
| **Testing** | `granite-test-utils`, `granite-mock` |

---

## 6. 개발 철학

### 6.1 frontend-fundamentals

Toss 프론트엔드 팀의 코드 품질 원칙을 체계화한 가이드. 4대 핵심 원칙과 접근성, 번들링, 디버깅 가이드를 포함한다.

#### 4대 핵심 원칙

##### 원칙 1: 가독성 (Readability)

**컨텍스트 줄이기**

```tsx
// BAD: 읽기 위해 여러 변수를 추적해야 함
const a = getUser();
const b = a.name;
const c = b.split(' ');
const d = c[0];

// GOOD: 의미 있는 이름으로 즉시 이해
const user = getUser();
const firstName = user.name.split(' ')[0];
```

- 코드를 이해하기 위해 기억해야 할 맥락(context)을 최소화
- 변수, 함수, 파라미터가 적을수록 이해 비용 감소

**네이밍**

- 변수/함수 이름만으로 역할을 파악할 수 있어야 함
- 약어 사용 자제, 도메인 용어 일관성 유지
- Boolean: `is-`, `has-`, `should-` 접두사

**위에서 아래로 읽기**

```tsx
// BAD: 아래의 헬퍼 함수를 먼저 읽어야 메인 로직 이해 가능
function helperA() { /* ... */ }
function helperB() { /* ... */ }
function main() { /* helperA, helperB 사용 */ }

// GOOD: 메인 로직을 먼저, 디테일은 아래에
function main() {
  const dataA = helperA();
  const dataB = helperB();
  return combine(dataA, dataB);
}

function helperA() { /* ... */ }
function helperB() { /* ... */ }
```

##### 원칙 2: 예측 가능성 (Predictability)

**숨겨진 사이드이펙트 금지**

```tsx
// BAD: getUser()가 몰래 로그를 남기고 캐시를 변경
function getUser(id: string) {
  analytics.track('user_viewed', { id });  // 숨겨진 사이드이펙트!
  cache.set(`user:${id}`, user);           // 숨겨진 사이드이펙트!
  return user;
}

// GOOD: 함수 이름이 모든 행위를 설명
function getUser(id: string) {
  return user;
}

function trackAndGetUser(id: string) {
  analytics.track('user_viewed', { id });
  const user = getUser(id);
  cache.set(`user:${id}`, user);
  return user;
}
```

**반환 타입 통일**

```tsx
// BAD: 상황에 따라 다른 타입 반환
function fetchData() {
  if (error) return null;
  if (loading) return undefined;
  return data;
}

// GOOD: 일관된 Result 타입
type Result<T> = { status: 'success'; data: T } | { status: 'error'; error: Error } | { status: 'loading' };
```

**이름 충돌 방지**: 외부 변수와 내부 변수의 이름이 같으면 혼란 유발

##### 원칙 3: 응집도 (Cohesion)

**도메인별 구조**

```
// BAD: 기술 유형별 폴더
src/
├── components/
├── hooks/
├── utils/
└── types/

// GOOD: 도메인별 폴더
src/
├── user/
│   ├── UserProfile.tsx
│   ├── useUser.ts
│   └── user.types.ts
├── payment/
│   ├── PaymentForm.tsx
│   ├── usePayment.ts
│   └── payment.types.ts
```

**매직 넘버 추출**

```tsx
// BAD
if (scrollY > 200) { /* ... */ }

// GOOD
const HEADER_COLLAPSE_THRESHOLD = 200;
if (scrollY > HEADER_COLLAPSE_THRESHOLD) { /* ... */ }
```

**타입 근접 배치**: 타입 정의를 사용하는 곳 가까이에 위치

##### 원칙 4: 결합도 (Coupling)

**Composition 패턴**

```tsx
// BAD: 하나의 거대한 컴포넌트
function UserDashboard() {
  // 프로필 로직 + 게시글 로직 + 설정 로직 = 높은 결합도
}

// GOOD: 작은 컴포넌트 합성
function UserDashboard() {
  return (
    <>
      <UserProfile />
      <UserPosts />
      <UserSettings />
    </>
  );
}
```

**단일 책임 훅**: 하나의 훅은 하나의 관심사만 담당

**코드 중복 허용**: 잘못된 추상화보다 약간의 중복이 낫다 (DRY 맹신 경계)

#### 좋은/나쁜 코드 예시 4개

| 예시 | 핵심 교훈 |
|------|-----------|
| **SubmitButton** | 조건부 로직을 컴포넌트 외부로 분리하여 예측 가능성 향상 |
| **LoginStartPage** | 복잡한 분기를 Early Return으로 단순화 |
| **fetchBalance** | 에러 처리를 호출자에게 위임하여 결합도 감소 |
| **ItemEditModal** | 거대 모달을 Step별 컴포넌트로 분해 (use-funnel 패턴) |

#### 접근성 가이드

**4원칙**:

1. **구조**: 올바른 HTML 시맨틱 구조 (heading 계층, landmark 등)
2. **의미**: ARIA 역할과 속성으로 의미 전달
3. **예측**: 일관된 인터랙션 패턴 (키보드 탐색 순서)
4. **시각 보완**: 시각 정보의 대체 텍스트 제공

**UI 컴포넌트별 접근성 가이드**:

| 컴포넌트 | 핵심 요구사항 |
|----------|---------------|
| **Tab** | `role="tablist"`, 방향키 탐색, `aria-selected` |
| **Accordion** | `role="region"`, `aria-expanded`, Enter/Space 토글 |
| **Modal** | 포커스 트랩, Esc 닫기, `aria-modal`, 배경 `inert` |
| **Radio** | `role="radiogroup"`, 방향키 이동, `aria-checked` |
| **Checkbox** | `aria-checked` (true/false/mixed), Space 토글 |
| **Switch** | `role="switch"`, `aria-checked`, Space 토글 |

#### 번들링 가이드

- **Webpack 9모듈 튜토리얼**: 웹팩 개념을 단계적으로 학습
- **Code Splitting**: `React.lazy()` + `Suspense`, 라우트별 분할, 동적 import
- **Tree Shaking**: ESM 기반 사용하지 않는 코드 제거, `sideEffects: false`

#### 디버깅 4단계

1. **진단**: 문제 증상 파악, 에러 메시지 분석, 재현 조건 식별
2. **재현**: 최소 재현 케이스 구성, 환경 격리
3. **수정**: 근본 원인 해결, 부작용 확인
4. **예방**: 테스트 추가, 모니터링 설정, 문서화

#### Claude Code 플러그인

- Toss의 frontend-fundamentals 원칙을 기반으로 한 자동 코드 리뷰
- Claude Code에서 플러그인으로 설치하여 코드 리뷰 시 4대 원칙 기반 피드백 자동 생성

---

### 6.2 technical-writing

기술 문서 작성법 가이드. Toss 내부 문서 품질 기준을 공개한 것.

#### 문서 유형 4가지

| 유형 | 목적 | 예시 |
|------|------|------|
| **학습(Tutorial)** | 새로운 개념을 배우도록 안내 | 시작하기 가이드, 튜토리얼 |
| **문제 해결(How-to)** | 특정 문제 해결 방법 제시 | 마이그레이션 가이드, FAQ |
| **참조(Reference)** | 정확한 정보 제공 | API 문서, 타입 정의 |
| **설명(Explanation)** | 배경/맥락/이유 설명 | 아키텍처 결정 기록(ADR) |

- 하나의 문서는 하나의 유형에 집중해야 함
- 유형을 섞으면 독자가 혼란

#### 정보 구조 6원칙

1. **한 페이지 하나**: 하나의 페이지는 하나의 주제만 다룸
2. **가치 먼저**: 독자가 얻을 가치를 먼저 제시 (결론 우선)
3. **효과적 제목**: 30자 이내, 핵심 키워드 포함, 독자의 질문 반영
4. **개요**: 문서 시작에 전체 내용 요약 제공
5. **예측 가능**: 일관된 구조로 독자가 정보 위치를 예측 가능
6. **자세히 설명**: 독자의 배경지식을 가정하지 않고 충분히 설명

#### 문장 5원칙

1. **주체 분명**: "설정이 변경됩니다" → "사용자가 설정을 변경합니다"
2. **필요한 정보만**: 불필요한 수식어, 반복 제거
3. **구체적 (동사 중심)**: "처리합니다" → "저장합니다", "삭제합니다", "변환합니다"
4. **자연스러운 한국어**: 번역체 지양, 조사 정확하게, 존댓말 일관성
5. **일관성**: 용어, 표기법, 문체를 문서 전체에서 통일

#### UX Writing 적용

- 기술 문서 원칙은 인앱 UX 문구에도 적용 가능
- 에러 메시지: 원인 + 해결 방법 제시
- 버튼 레이블: 동사 중심 ("저장하기", "삭제하기")
- 안내 문구: 사용자 행동 기준으로 작성

---

## 7. 디자인 자산: tossface

Toss 자체 제작 이모지 폰트. Unicode v14.0 이모지 전체를 커버하며, 웹/앱에서 일관된 이모지 경험을 제공한다.

### 기술 사양

| 항목 | 내용 |
|------|------|
| **Unicode 버전** | v14.0 전체 커버리지 |
| **폰트 포맷** | TTF, OTF, WOFF, WOFF2 |
| **서브셋** | 12개 서브셋으로 분할 (필요한 범위만 로드 가능) |
| **CDN** | jsDelivr를 통한 글로벌 배포 |
| **font-family** | `Tossface` |

### 적용 방법

```css
/* CDN에서 폰트 로드 */
@font-face {
  font-family: 'Tossface';
  src: url('https://cdn.jsdelivr.net/gh/AceDGE/tossface-font/dist/TossFace.woff2') format('woff2');
  font-display: swap;
}

/* 이모지에 Tossface 적용 */
.emoji {
  font-family: 'Tossface', sans-serif;
}
```

### 디자인 철학

| 원칙 | 설명 |
|------|------|
| **작게 보아도 명확** | 16px, 12px 등 작은 크기에서도 이모지 의미가 명확하게 전달 |
| **단순한 형태** | 불필요한 디테일 제거, 핵심 형태에 집중 |
| **최소한의 묘사** | 과도한 그라데이션, 그림자 배제. 플랫 디자인 지향 |
| **일관된 스타일** | 모든 이모지가 동일한 시각적 문법을 따름 |

### 12개 서브셋 구성

서브셋으로 분할하여 필요한 이모지 범위만 선택적으로 로드할 수 있다. 전체 폰트 대비 초기 로드 크기를 대폭 줄일 수 있어, 웹 성능에 유리하다.

---

## 8. Toss UI/UX 통합 철학

12개 오픈소스를 관통하는 Toss 프론트엔드의 핵심 설계 철학을 분석한다.

### 8.1 선언적 패턴 (Declarative Patterns)

Toss의 거의 모든 라이브러리가 선언적 API를 채택한다.

| 라이브러리 | 선언적 패턴 |
|-----------|------------|
| **use-funnel** | `<funnel.Render step1={...} step2={...} />` - 스텝을 JSX prop으로 선언 |
| **overlay-kit** | `overlay.open(({ isOpen, close }) => JSX)` - 렌더 함수로 오버레이 선언 |
| **suspensive** | `<SuspenseQuery>`, `<ErrorBoundary>` - 데이터/에러를 컴포넌트로 선언 |
| **h6s** | 훅이 데이터를 반환, UI는 소비자가 선언 |
| **toss-ui** | Variant 시스템으로 스타일 변형을 선언적 정의 |

**명령형 vs 선언적 비교**:

```tsx
// 명령형 (Toss가 지양하는 패턴)
const [step, setStep] = useState('email');
const [email, setEmail] = useState('');
if (step === 'email') return <EmailForm />;
if (step === 'password') return <PasswordForm />;

// 선언적 (Toss가 선호하는 패턴)
<funnel.Render
  이메일={({ history }) => <EmailForm onNext={() => history.push('비밀번호')} />}
  비밀번호={({ context }) => <PasswordForm email={context.email} />}
/>
```

### 8.2 타입 안전성 (Type Safety)

TypeScript를 단순한 타입 체크가 아닌 "개발자 경험(DX) 도구"로 활용한다.

| 라이브러리 | 타입 활용 |
|-----------|----------|
| **use-funnel** | `StepDefinitions` 제네릭으로 스텝 이름 + 컨텍스트 타입 자동 검증 |
| **toss-ui** | `UIKitConfig<Color, Typography, Space>` 제네릭으로 디자인 토큰 타입 안전 |
| **overlay-kit** | `openAsync<T>()` 제네릭으로 resolve 값 타입 지정 |
| **es-toolkit** | 모든 함수가 정확한 제네릭 타입 추론 |
| **suspensive** | `shouldCatch` 배열의 각 요소 타입을 유니온으로 정확히 추론 |

### 8.3 헤드리스 아키텍처 (Headless Architecture)

로직과 UI를 완전히 분리. 스타일이 없는 데이터/상태만 제공한다.

```
          ┌──────────────┐
          │   Headless   │ ← 로직, 상태, 데이터
          │   Library    │    (h6s, use-funnel, react-simplikit)
          └──────┬───────┘
                 │ 데이터/상태 반환
                 ▼
          ┌──────────────┐
          │   Consumer   │ ← UI 렌더링
          │   Component  │    (자유로운 스타일링)
          └──────────────┘
```

**헤드리스 라이브러리 목록**:

- **h6s**: 캘린더 데이터만 반환, CSS 없음
- **use-funnel**: 스텝 상태만 관리, UI 없음
- **react-simplikit**: 훅과 유틸만 제공, 컴포넌트 스타일 없음
- **overlay-kit**: 오버레이 상태만 관리, 모달 UI는 소비자 책임

### 8.4 모바일 우선 (Mobile-First)

Toss는 모바일 금융 앱이므로, 모든 라이브러리가 모바일 환경을 1순위로 고려한다.

| 영역 | 모바일 우선 설계 |
|------|-----------------|
| **use-funnel** | 하드웨어 백 버튼 호환, React Navigation Native 어댑터 |
| **react-simplikit/mobile** | 키보드 높이, Safe Area, 스크롤 방향 전용 훅 |
| **granite** | React Native 마이크로서비스, Brownfield 전략 |
| **toss-ui** | React Native 스타일 네이밍 패러다임 |
| **overlay-kit** | 스택 기반 오버레이 (모바일 시트 패턴) |

### 8.5 Composition over Configuration

설정(Configuration) 기반 API보다 합성(Composition) 기반 API를 선호한다.

```tsx
// Configuration (Toss가 지양)
<Calendar
  view="month"
  selectionMode="range"
  disabled={{ dayOfWeek: [0, 6] }}
  onSelect={handleSelect}
  headerRenderer={renderHeader}
  dayRenderer={renderDay}
/>

// Composition (Toss가 선호)
function Calendar() {
  const { headers, body, navigation } = useCalendar();
  const { value, select } = useSelection({ mode: 'range' });

  return (
    <MyCalendarLayout>
      <MyHeader navigation={navigation} />
      <MyBody body={body} onSelect={select} />
    </MyCalendarLayout>
  );
}
```

- 훅으로 로직 제공, 컴포넌트 조합은 소비자가 결정
- `renderProp`, `headerRenderer` 같은 설정 prop 최소화
- 각 훅이 단일 책임 원칙 준수

### 8.6 SSR 우선 (SSR-First)

서버 사이드 렌더링 환경에서 안전하게 동작하도록 설계한다.

| 라이브러리 | SSR 대응 |
|-----------|----------|
| **suspensive** | `clientOnly` prop, `useIsClient()` 훅 |
| **react-simplikit** | SSR-safe 명시, `isServer()` 유틸 |
| **es-toolkit** | 순수 함수, 브라우저 API 비의존 |
| **toss-ui** | createStyled의 inline runtime (SSR 호환) |

### 8.7 미니멀리즘 (Minimalism)

불필요한 것을 제거하고 핵심에 집중하는 철학.

| 영역 | 미니멀리즘 적용 |
|------|----------------|
| **의존성** | react-simplikit: 제로 디펜던시 |
| **번들** | es-toolkit: lodash 대비 97% 감소 |
| **API** | h6s: "No CSS, No class names. Just data." |
| **빌드** | granite: 서비스당 200KB |
| **디자인** | tossface: "단순한 형태와 최소한의 묘사" |
| **문서** | technical-writing: "필요한 정보만" |

---

## 9. Cappic 앱에 적용할 Toss 패턴 종합

### 9.1 즉시 적용 가능한 패턴

#### 퍼널 패턴 (use-funnel)

Cappic의 멀티스텝 플로우(온보딩, 반려동물 등록, 예약 등)에 use-funnel 패턴 적용:

```tsx
type PetRegistrationSteps = {
  종류선택: { petType?: 'dog' | 'cat' };
  정보입력: { petType: 'dog' | 'cat'; name?: string; breed?: string };
  사진등록: { petType: 'dog' | 'cat'; name: string; breed: string; photo?: string };
  완료: { petType: 'dog' | 'cat'; name: string; breed: string; photo: string };
};

const funnel = useFunnel<PetRegistrationSteps>({
  id: 'pet-registration',
  initial: { step: '종류선택', context: {} },
});
```

- 히스토리 기반: 뒤로가기 자연스럽게 동작
- 증분 컨텍스트: 스텝마다 데이터 축적
- 타입 안전: 각 스텝에 필요한 데이터 누락 시 컴파일 에러

#### 오버레이 패턴 (overlay-kit)

```tsx
// 삭제 확인 다이얼로그
const confirmed = await overlay.openAsync<boolean>(({ close }) => (
  <ConfirmDialog
    title="반려동물 삭제"
    message="등록된 반려동물 정보를 삭제하시겠습니까?"
    onConfirm={() => close(true)}
    onCancel={() => close(false)}
  />
));

if (confirmed) {
  await deletePet(petId);
}
```

#### 유틸리티 (es-toolkit)

```tsx
import { debounce, groupBy, pick, omit } from 'es-toolkit';

// 검색 디바운스
const searchPets = debounce(async (query) => {
  const results = await api.searchPets(query);
  setResults(results);
}, 300);

// 카테고리별 그룹핑
const petsByType = groupBy(pets, (pet) => pet.type);
// { dog: [...], cat: [...] }
```

#### 한글 처리 (es-hangul)

```tsx
import { josa, getChoseong } from 'es-hangul';

// 조사 자동 선택
const message = `${petName}${josa(petName, '이/가')} 등록되었습니다.`;
// "초코가 등록되었습니다." / "밤이 등록되었습니다."

// 초성 검색
const filtered = pets.filter((pet) => {
  const choseong = getChoseong(pet.name);
  return choseong.includes(searchChoseong);
});
```

### 9.2 아키텍처 레벨 패턴

#### Suspense + ErrorBoundary 계층 설계

```tsx
<ErrorBoundaryGroup>
  <DefaultPropsProvider
    Suspense={{ fallback: <AppSkeleton /> }}
    ErrorBoundary={{ fallback: <GlobalError /> }}
  >
    <ErrorBoundary
      shouldCatch={[NetworkError]}
      fallback={({ error, reset }) => <NetworkErrorView onRetry={reset} />}
    >
      <Suspense fallback={<PageSkeleton />}>
        <SuspenseQuery queryKey={['pets']} queryFn={fetchPets}>
          {({ data }) => <PetList pets={data} />}
        </SuspenseQuery>
      </Suspense>
    </ErrorBoundary>
  </DefaultPropsProvider>
</ErrorBoundaryGroup>
```

#### 디자인 토큰 시스템 (toss-ui 참고)

```tsx
type CappicDesignTokens = UIKitConfig<{
  Color: {
    primary: '#FF6B35';
    secondary: '#2EC4B6';
    background: '#FFFFFF';
    surface: '#F5F5F5';
    text: '#1A1A1A';
    textSecondary: '#666666';
    error: '#E53E3E';
    success: '#38A169';
  };
  Typography: {
    heading1: { fontSize: 24; fontWeight: '700'; lineHeight: 32 };
    heading2: { fontSize: 20; fontWeight: '600'; lineHeight: 28 };
    body1: { fontSize: 16; fontWeight: '400'; lineHeight: 24 };
    body2: { fontSize: 14; fontWeight: '400'; lineHeight: 20 };
    caption: { fontSize: 12; fontWeight: '400'; lineHeight: 16 };
  };
  Space: {
    xs: 4;
    sm: 8;
    md: 16;
    lg: 24;
    xl: 32;
    xxl: 48;
  };
}>;
```

#### 헤드리스 캘린더 (h6s 참고)

예약/일정 기능에 h6s 패턴 적용:

```tsx
function PetScheduleCalendar() {
  const { headers, body, navigation } = useCalendar({
    disabled: {
      before: new Date(),       // 과거 날짜 비활성화
      dayOfWeek: [0],           // 일요일 비활성화
    },
  });
  const { value, select } = useSelection({ mode: 'single' });

  return (
    <CappicCalendar
      headers={headers}
      body={body}
      navigation={navigation}
      selectedDate={value}
      onSelect={select}
    />
  );
}
```

### 9.3 코드 품질 원칙 (frontend-fundamentals)

Cappic 개발 시 Toss의 4대 원칙 적용:

| 원칙 | Cappic 적용 |
|------|------------|
| **가독성** | 컴포넌트당 100줄 이내, 의미 있는 네이밍, 위→아래 코드 흐름 |
| **예측 가능성** | API 호출 함수에 사이드이펙트 없이, 일관된 에러 반환 타입 |
| **응집도** | `pet/`, `schedule/`, `community/` 도메인별 구조 |
| **결합도** | Composition 패턴, 단일 책임 훅, 적절한 코드 중복 허용 |

### 9.4 모바일 UX 훅 (react-simplikit/mobile)

```tsx
// 키보드 회피: 입력 폼에서 키보드가 UI를 가리지 않도록
const { style } = useAvoidKeyboard();

// Safe Area: 노치/홈바 대응
const { top, bottom } = useSafeAreaInset();

// 네트워크 상태: 오프라인 시 안내 표시
const { isOnline } = useNetworkStatus();
if (!isOnline) return <OfflineBanner />;

// 스크롤 방향: 헤더 자동 숨김
const direction = useScrollDirection();
const showHeader = direction !== 'down';
```

### 9.5 기술 문서 원칙 (technical-writing)

Cappic 인앱 문구에 Toss 기술 문서 원칙 적용:

- **가치 먼저**: "반려동물 등록을 완료하면 맞춤 건강 관리를 받을 수 있어요"
- **주체 분명**: "설정이 저장됩니다" → "저장했어요"
- **구체적 동사**: "처리" → "저장", "삭제", "등록"
- **30자 이내 제목**: "반려동물 건강 체크리스트"

### 9.6 적용 우선순위

| 우선순위 | 패턴/라이브러리 | 적용 영역 | 난이도 |
|---------|---------------|----------|--------|
| **P0** | es-toolkit | 전역 유틸리티 교체 | 낮음 |
| **P0** | overlay-kit 패턴 | 다이얼로그/토스트 | 낮음 |
| **P0** | frontend-fundamentals | 코드 컨벤션 | 낮음 |
| **P1** | use-funnel 패턴 | 멀티스텝 플로우 | 중간 |
| **P1** | suspensive 패턴 | 데이터 페칭 계층 | 중간 |
| **P1** | react-simplikit 훅 | 범용 훅 활용 | 낮음 |
| **P2** | toss-ui 디자인 토큰 | 디자인 시스템 구축 | 높음 |
| **P2** | h6s 캘린더 패턴 | 예약/일정 기능 | 중간 |
| **P2** | es-hangul | 한글 UX 개선 | 낮음 |
| **P3** | granite 아키텍처 | 대규모 리팩터링 시 참고 | 높음 |
| **P3** | tossface | 커스텀 이모지 적용 | 낮음 |
| **P3** | technical-writing | UX 라이팅 개선 | 낮음 |

---

---

## 10. 토스 앱 애니메이션 & 모션 디자인 심층 분석

> 출처: toss.tech 기술 블로그, Slash 23 컨퍼런스, TMC25 발표, 외부 역분석

### 10.1 Rally — 토스 자체 크로스플랫폼 애니메이션 라이브러리

토스는 **Rally**라는 자체 애니메이션 시스템을 개발했다 (Slash 23: "Rally로 3분 만에 애니메이션 완성하기").

**4계층 아키텍처:**

| 계층 | 역할 | 예시 |
|------|------|------|
| **Motion** | 가장 작은 단위. 개별 움직임 속성 정의 | translateY, scale, opacity |
| **Rally** | 재생 가능한 최소 단위. Motion을 타겟 UI에 연결 | 버튼에 scale 모션 적용 |
| **Timeline** | 여러 Rally 스케줄링 | Parallel(동시), Serial(순차), Stagger(시차) |
| **Preset** | 재사용 모션 패턴 모음 | AnimateTransition, AnimateEffect |

**이징 토큰:**
- `bezier.expo` — Exponential 베지어 곡선
- `spring.quick` — 빠른 스프링 물리
- `spring.basic` — 기본 스프링 물리

**핵심 규칙:** "One motion per target" — 하나의 타겟에 하나의 모션만 적용

**워크플로우:** 디자이너 Framer → Rally 의사 코드 확인 → 개발자가 iOS/Android/Web 코드로 변환

### 10.2 화면 전환 애니메이션 (구체적 수치)

토스 증권 바텀 네비게이션 전환 (외부 역분석 결과):

| Phase | 시점 | 동작 | 애니메이션 설정 |
|-------|------|------|----------------|
| 1 | 0ms | 컨테이너: 전체 폭 → 둥근 플로팅 | `spring(dampingRatio=0.75, stiffness=200)` |
| 2 | 200ms | 뒤로가기 버튼 등장 (scale + fade) | 300ms duration |
| 3 | 350ms | 첫 번째 탭 중앙→좌측 슬라이드 | `tween(300ms, EaseOutCubic)` |
| 4 | 350ms+ | 나머지 탭 stagger 등장 | `spring(dampingRatio=0.5, stiffness=400)`, **20ms 간격** |

**탭 등장 상세:**
- Scale: `0.3f → 1.0f`
- Alpha: `0f → 1f` (`tween(150ms)`)
- Fade: `fadeIn(tween(200)) togetherWith fadeOut(tween(200))`
- Corner radius: `clipInOverlayDuringTransition = OverlayClip(RoundedCornerShape(16.dp))`

### 10.3 터치 피드백 & 마이크로인터랙션

**터치 애니메이션:**
- 터치 가능한 모든 UI 요소(카드, 버튼)에 모션 피드백 적용
- 단순 회색 하이라이트 대신 **scale down + opacity** 조합

**비즈니스 임팩트가 검증된 인터랙션:**

| 인터랙션 | 효과 |
|----------|------|
| 신용점수 축하 모션 + 숫자 카운팅 | **대출 완료율 21.9% 증가** |
| 송금 확인 모션 (중앙 확대 표시) | **오송금 약 25% 감소** |
| 약관 동의 순차 애니메이션 | **이탈률 26% → 22% 개선** |
| 대출 심사 로딩 애니메이션 | **화면 이탈률 감소, 체감 대기시간 개선** |

### 10.4 3D 인터랙션 (토스뱅크 카드)

**기술 스택:** Spline(3D 모델) → Cinema 4D(텍스처) → Three.js + WebGL(모바일 배포)

**인터랙션:**
- 초기 자동 회전 → 터치 시 회전 정지 → 릴리스 시 부드러운 복귀
- 버튼 색상이 현재 보이는 카드 면의 색상과 **동적 연동**
- 2주 만에 완성

### 10.5 로딩/전환 상태 전략

| 로딩 시간 | 처리 방식 |
|-----------|----------|
| < 1초 | 로딩 인디케이터 없음 |
| 1~2초 | 스켈레톤 + 시머(shimmer) |
| 2~30초 | 인터랙티브 애니메이션 (대출 심사 등) |
| 3D 효과 | Lottie + PNG 시퀀스 (풀 3D 대신 효율적 방식) |

### 10.6 성능 최적화 전략

| 기법 | 설명 |
|------|------|
| GIF → WebP 변환 | 파일 크기 대폭 감소 |
| 순차적 에셋 프리로딩 | 세션 진입 시점 동기화 |
| 비디오 엘리먼트 재사용 | 단일 비디오를 "텔레포트"하여 중복 로딩 방지 |
| 직접 DOM 스타일 조작 | React 상태 변경 대신 직접 style 조작 |
| CPU 쓰로틀링 테스트 | Chrome DevTools 모바일 벤치마크 |
| 60fps 유지 | UI 스레드 애니메이션, JS 브릿지 병목 제거 |
| prefers-reduced-motion | 접근성 지원 |

### 10.7 디자인 도구

| 도구 | 용도 |
|------|------|
| **Framer** | TDS 컴포넌트 기반 간단한 모션 |
| **ProtoPie** | 복잡한 인터랙션 + 햅틱 프로토타이핑 |
| **Principle** | 프로토타이핑 |
| **Rally** | 크로스플랫폼 스펙 전달 |
| **Deus** | 자체 디자인 에디터 (자동 코드 생성, A/B 테스트 통합) |
| **Three.js/WebGL** | 3D 인터랙션 |
| **Lottie** | 벡터 애니메이션 |

### 10.8 모션 디자인 철학

1. **"한 번의 움직임이 100마디 말보다 효과적"** — 복잡한 금융 정보를 모션으로 직관적 전달
2. **기능적 애니메이션만** — 순수 장식 지양, 사용자 피드백/상태 전달/체감 대기시간 감소 등 실질적 기능
3. **A/B 테스트 필수** — 모든 인터랙션은 사업 지표로 검증
4. **자연스러움 = 실제 물리** — 일정 속도가 아닌 가변 속도 (이징/스프링)
5. **접근성** — prefers-reduced-motion 지원, WCAG 준수, 간질 안전

### 10.9 Cappic에 적용할 토스 모션 패턴

| Cappic 기능 | 적용할 토스 패턴 | 근거 |
|---|---|---|
| 카메라 탐색 | RadarPulse + stagger 등장 (20ms 간격) | 토스 탭 전환의 stagger 패턴 |
| 녹화 시작/중지 | scale down 터치 피드백 + 상태 전환 모션 | 토스 버튼 터치 애니메이션 |
| 저장 완료 | BounceCheck (spring dampingRatio=0.5) | 토스 신용점수 축하 모션 |
| 메트릭 숫자 | 숫자 카운팅 애니메이션 | 토스 금액 표시 패턴 |
| 하이라이트 렌더 | 인터랙티브 로딩 (2~30초 대기) | 토스 대출 심사 로딩 |
| 바텀시트 메트릭 | spring(dampingRatio=0.75) 드래그 + 스냅 | 토스 바텀시트 패턴 |
| 화면 전환 | EaseOutCubic 300ms 슬라이드 | 토스 네비게이션 전환 |
| 스켈레톤 로딩 | 시머 효과 + 1초 미만은 생략 | 토스 로딩 전략 |

### 10.10 참고 자료

| 자료 | URL |
|------|-----|
| "인터랙션, 꼭 넣어야 해요?" | toss.tech/article/interaction |
| "Rally로 3분 만에 애니메이션 완성하기" (Slash 23) | youtu.be/Jq4MzgzSDEE |
| "인터랙션, 토스에선 어떻게 개발하나요?" (TMC25) | youtube.com/watch?v=QoPSnAgerpQ |
| "직접 만지고, 돌리는 토스뱅크카드 인터랙션" | toss.tech/article/touch-and-turn-tossbankcard |
| 토스 증권 탭 전환 역분석 | velog.io/@tristanjung1006 |

---

## 부록: 레포별 GitHub 링크

| 레포 | URL |
|------|-----|
| toss-ui | https://github.com/toss/toss-ui |
| use-funnel | https://github.com/toss/use-funnel |
| overlay-kit | https://github.com/toss/overlay-kit |
| react-simplikit | https://github.com/toss/react-simplikit |
| h6s | https://github.com/toss/h6s |
| tossface | https://github.com/toss/tossface |
| suspensive | https://github.com/toss/suspensive |
| frontend-fundamentals | https://github.com/toss/frontend-fundamentals |
| technical-writing | https://github.com/toss/technical-writing |
| es-toolkit | https://github.com/toss/es-toolkit |
| es-hangul | https://github.com/toss/es-hangul |
| granite | https://github.com/toss/granite |
