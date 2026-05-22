# CAPP!C 앱 개발자 핸드오프 스펙 문서

> 최종 업데이트: 2026-05-19  
> 디자인 기준: Galaxy S24 (360 x 780px)  
> 프리뷰: `index.html` + `styles.css`

---

## 1. 프로젝트 개요

### 1.1 서비스 소개
CAPP!C(캡픽)은 축구/풋살 경기를 자동으로 촬영하고, AI가 선수별 하이라이트를 생성하는 올인원 경기 촬영 서비스에요.

### 1.2 타겟 사용자
| 구분 | 역할 | 주요 기능 |
|------|------|----------|
| **운영자** (관리자 앱) | 구장 운영자, 코치, 스태프 | 캡픽 관리, 촬영 제어, 일정 관리, 아카이브 |
| **소비자** (소비자 앱) | 학부모, 동호인, 선수 | 경기 영상 감상, 하이라이트 편집, 피드 공유 |

### 1.3 디자인 시스템
- **폰트**: Pretendard (`@import` CDN)
- **색상**: 흑백 기반 + 악센트 `#2AC1BC` (민트 그린)
- **기준 해상도**: 360 x 780px (Galaxy S24)
- **터치 타겟 최소**: 44px
- **디자인 토큰**: `styles.css`의 CSS 변수 참조

---

## 2. 화면 매핑표

### 2.1 관리자 앱 (ADM)

| 화면 번호 | 화면 이름 | HTML ID | 설명 |
|-----------|----------|---------|------|
| ADM-01 | 로그인 | `adm-login` | 관리자 로그인 |
| ADM-02 | 홈 | `adm-01` | 캡픽 목록 대시보드 |
| ADM-02e | 홈 (빈 상태) | `adm-01-empty` | 캡픽 없을 때 |
| ADM-03 | 캡픽 찾기 | `adm-04` | 주변 캡픽 자동 검색 |
| ADM-04 | 촬영 관리 | `adm-02` | 실시간 촬영 화면 + 상태 |
| ADM-04a | 촬영 미리보기 | `adm-03` | 가로 전체화면 (landscape) |
| ADM-05 | 녹화 저장 중 | `adm-05` | 로딩 + 진행률 |
| ADM-06 | 녹화 저장 완료 | `adm-06` | 2단계 전환 애니메이션 |
| ADM-07 | 아카이브 | `adm-07` | 전체 영상 / 찜한 영상 탭 |
| ADM-07e | 아카이브 (빈 상태) | `adm-07-empty` | 영상 없을 때 |
| ADM-08 | 영상 상세 | `adm-08` | 하이라이트 + 전체 영상 관리 |
| ADM-08a | 선수 상세 | `adm-08p` | 선수별 하이라이트 상세 |
| ADM-08b | 영상 플레이어 | `adm-10l` | 가로 전체화면 재생 |
| ADM-09 | 일정 | `adm-15` | 월간 캘린더 + 오늘 일정 |
| ADM-09e | 일정 (빈 상태) | `adm-15-empty` | 일정 없을 때 |
| ADM-09a | 일정 추가 | `adm-15a` | 일정 입력 폼 |
| ADM-10 | 설정 | `adm-settings` | 관리, 시설정보, 계정, 고급기능 |
| ADM-10a | 운영자 관리 | `adm-users` | 운영자 목록 |
| ADM-10b | 운영자 추가 | `adm-users-add` | 초대 폼 |
| ADM-10c | 네트워크 상태 | `adm-16` | 연결 문제 해결 |

### 2.2 공통 기능 - 영상 편집 (COMM)

| 화면 번호 | 화면 이름 | HTML ID | 설명 |
|-----------|----------|---------|------|
| COMM-01 | 편집: 구간 선택 | `editor-1` | 클립 선택 (1단계) |
| COMM-02 | 편집: 상세 조정 | `editor` | 순서/꾸미기 (2단계) |
| COMM-03 | 편집: 영상 만들기 중 | `editor-loading` | 로딩 + 진행률 |
| COMM-04 | 편집: 영상 완성 | `editor-3` | 2단계 전환 애니메이션 |

### 2.3 공통 기능 - 선수 하이라이트 (COMM)

| 화면 번호 | 화면 이름 | HTML ID | 설명 |
|-----------|----------|---------|------|
| COMM-05 | 하이라이트: 영상 선택 | `adm-09` | 소스 선택 (1/3) |
| COMM-06 | 하이라이트: 선수 선택 | `adm-10` | 인물 선택 (2/3) |
| COMM-07 | 하이라이트: 설정 | `adm-11` | 출력 옵션 (3/3) |
| COMM-08 | 하이라이트: 만들기 중 | `adm-13` | 로딩 + 단계 표시 |
| COMM-09 | 하이라이트: 완성 | `adm-14` | 2단계 전환 애니메이션 |

### 2.4 공통 기능 - 영상 올리기/합치기 (COMM)

| 화면 번호 | 화면 이름 | HTML ID | 설명 |
|-----------|----------|---------|------|
| COMM-10 | 영상 올리기 | `comm-upload-vid` | 파일 선택 + 올리기 |
| COMM-10a | 영상 올리기 진행 중 | `comm-upload-loading` | 로딩 + 진행률 |
| COMM-10b | 영상 올리기 완료 | `comm-upload-done` | 2단계 전환 |
| COMM-11 | 영상 합치기 | `comm-merge` | 영상 목록 + 순서 |
| COMM-11a | 영상 합치기 진행 중 | `comm-merge-loading` | 로딩 + 진행률 |
| COMM-11b | 영상 합치기 완료 | `comm-merge-done` | 2단계 전환 |

### 2.5 소비자 앱 (CON)

| 화면 번호 | 화면 이름 | HTML ID | 설명 |
|-----------|----------|---------|------|
| CON-01 | 로그인 / 회원가입 | `con-02` | 소셜 + 이메일 로그인 |
| CON-02 | 온보딩 | `con-01` | 모드 선택 (구매자/시청자) |
| CON-03 | 프로필 설정 | `con-03` | 이름/성별/유형/포지션 |
| CON-04 | 캡픽 설정: WiFi | `con-ob1` | 온보딩 1/6 |
| CON-04a | 캡픽 설정: 찾기 | `con-ob2` | 온보딩 2/6 |
| CON-04b | 캡픽 설정: 등록 | `con-ob-register` | 온보딩 3/6 |
| CON-04c | 캡픽 설정: 설치 | `con-ob3` | 온보딩 4/6 |
| CON-04d | 캡픽 설정: 테스트 | `con-ob-test` | 온보딩 5/6 |
| CON-04e | 캡픽 설정: 완료 | `con-ob4` | 온보딩 6/6 |
| CON-05 | 홈 | `con-04` | 구장/캡픽/하이라이트 |
| CON-05e | 홈 (빈 상태) | `con-04-empty` | 빈 상태 |
| CON-06 | 구장 추가하기 | `con-05` | QR/코드 + 주변검색 |
| CON-07 | 경기 목록 | `con-06` | 날짜별 경기 카드 |
| CON-07e | 경기 목록 (빈 상태) | `con-06-empty` | 빈 상태 |
| CON-08 | 영상 상세 (학부모) | `con-07` | 무료/유료 구분 |
| CON-08a | 영상 상세 (일반) | `con-07b` | 무료/유료 구분 |
| CON-09 | 선수 상세 | `con-player` | 선수별 하이라이트 |
| CON-10 | 영상 플레이어 | `con-10l` | 가로 전체화면 재생 |
| CON-11 | 피드 (쇼츠) | `con-feed` | 세로 영상 피드 |
| CON-12 | 내 아카이브 | `con-archive` | 경기/하이라이트/찜 탭 |
| CON-12e | 내 아카이브 (빈 상태) | `con-archive-empty` | 빈 상태 |
| CON-13 | 알림 | `con-09` | 전체/소셜/시스템 필터 |
| CON-14 | 마이페이지 | `con-my` | 프로필 + 통계 + 그리드 |
| CON-15 | 설정 | `con-settings` | 계정/알림/영상/기타 설정 |
| CON-16 | 캡픽 관리 | `con-18` | 캡픽 상태 + 촬영 관리 |
| CON-16e | 캡픽 관리 (빈 상태) | `con-18-empty` | 캡픽 없을 때 |
| CON-16a | 캡픽 등록하기 | `con-18-register` | 일련번호로 등록 |
| CON-17 | 실시간 중계 | `con-08` | 스트리밍 설정/관리 |
| CON-18 | 촬영 설정 | `con-upload` | 경기 정보 입력 |
| CON-19 | 탐색 | `con-explore` | 검색 + 인기 콘텐츠 |
| CON-20 | 다른 사용자 프로필 | `con-profile-other` | 프로필 + 팔로우 |
| CON-21 | 팔로워/팔로잉 목록 | `con-followers` | 목록 + 팔로우 토글 |
| CON-22 | 새 게시물 | `con-publish` | 게시물 작성 |
| CON-23 | 비밀번호 찾기 | `con-pw-reset` | 이메일 재설정 |
| CON-24 | 회원가입 | `con-signup` | 이메일 가입 |
| CON-25 | 프로필 수정 | `con-profile-edit` | 프로필 정보 수정 |
| CON-26 | 비밀번호 변경 | `con-pw-change` | 비밀번호 변경 |
| CON-27 | 구독 관리 | `con-subscribe` | 구독 플랜 선택 |
| CON-28 | 구장 관리 | `con-venue-manage` | 등록된 구장 관리 |
| CON-29 | 이용약관 | `con-terms` | 약관 전문 |
| CON-30 | 개인정보처리방침 | `con-privacy` | 방침 전문 |
| CON-31 | 활동 배지 | `con-badges` | 획득/도전 배지 |
| CON-32 | 캡픽 구매 | `con-purchase` | 제품 정보 + 구매 |

### 2.6 웹 (WEB)

| 화면 번호 | 화면 이름 | HTML ID | 설명 |
|-----------|----------|---------|------|
| WEB-01 | 구장 경기 페이지 | `web-01` | 앱 없이 웹에서 경기 목록 |
| WEB-02 | 1분 하이라이트 (학부모) | `web-02` | 학부모용 웹 하이라이트 |
| WEB-02a | 1분 하이라이트 (일반) | `web-02a` | 일반용 웹 하이라이트 |

**총 81개 화면**

---

## 3. 네비게이션 플로우

### 3.1 관리자 앱 하단 네비게이션 (4탭)
| 탭 | 아이콘 | 이동 화면 |
|----|--------|----------|
| 홈 | 집 | ADM-02 (`adm-01`) |
| 아카이브 | 문서 | ADM-07 (`adm-07`) |
| 일정 | 달력 | ADM-09 (`adm-15`) |
| 설정 | 톱니바퀴 | ADM-10 (`adm-settings`) |

### 3.2 소비자 앱 하단 네비게이션 (5탭)
| 탭 | 아이콘 | 이동 화면 |
|----|--------|----------|
| 홈 | 집 | CON-05 (`con-04`) |
| 탐색 | 돋보기 | CON-19 (`con-explore`) |
| 피드 | 비디오 | CON-11 (`con-feed`) |
| 아카이브 | 문서 | CON-12 (`con-archive`) |
| 마이 | 사람 | CON-14 (`con-my`) |

### 3.3 주요 화면간 네비게이션

#### 관리자 메인 플로우
```
ADM-01 로그인 → ADM-02 홈 → ADM-04 촬영관리 → ADM-04a 미리보기
                                    ↓
                              ADM-05 저장중 → ADM-06 저장완료 → ADM-07 아카이브
                                                                     ↓
                                                               ADM-08 영상상세 → ADM-08a 선수상세
```

#### 소비자 메인 플로우
```
CON-01 로그인 → CON-02 온보딩 → CON-03 프로필 → CON-05 홈
                                                    ↓
CON-07 경기목록 → CON-08 영상상세 → CON-09 선수상세
                                          ↓
                                    CON-10 영상플레이어
```

#### 온보딩 플로우
```
CON-04 WiFi → CON-04a 찾기 → CON-04b 등록 → CON-04c 설치 → CON-04d 테스트 → CON-04e 완료 → CON-05 홈
```

#### 하이라이트 생성 플로우
```
COMM-05 영상선택 → COMM-06 선수선택 → COMM-07 설정 → COMM-08 만들기중 → COMM-09 완성
```

#### 편집 플로우
```
COMM-01 구간선택 → COMM-02 상세조정 → COMM-03 만들기중 → COMM-04 완성
```

### 3.4 로딩 화면 자동 전환
| 로딩 화면 | 자동 전환 (2초) |
|-----------|----------------|
| ADM-05 저장 중 | → ADM-06 저장 완료 |
| COMM-03 편집: 만들기 중 | → COMM-04 편집: 완성 |
| COMM-08 하이라이트: 만들기 중 | → COMM-09 하이라이트: 완성 |
| COMM-10a 올리기 진행 중 | → COMM-10b 올리기 완료 |
| COMM-11a 합치기 진행 중 | → COMM-11b 합치기 완료 |

### 3.5 완료 화면 2단계 전환 애니메이션
모든 완료 화면은 동일한 패턴:
1. **Phase 1** (1.5초): 체크 마크 + 완료 메시지 (bounceIn 애니메이션)
2. **Phase 2** (페이드인): "It's Your Highlights!" + 미리보기 + 액션 버튼 (공유/다운로드/피드 올리기/홈으로)

해당 화면: ADM-06, COMM-04, COMM-09, COMM-10b, COMM-11b

---

## 4. 화면별 스펙

### 4.1 ADM-01 로그인 (`adm-login`)
- **주요 컴포넌트**: CAPP!C ADMIN 로고, 이메일/비밀번호 입력, 로그인 버튼, 비밀번호 찾기, 문의하기
- **인터랙션**: 문의하기 버튼 탭 -> 전화/이메일 정보 펼침. 전화/이메일 탭 -> 클립보드 복사
- **네비게이션**: 로그인 -> ADM-02 홈, 비밀번호 찾기 -> CON-23

### 4.2 ADM-02 홈 (`adm-01`)
- **주요 컴포넌트**: 구장 이름, 알림 아이콘, WiFi 배너, 캡픽 카드 목록, 업데이트 버튼
- **인터랙션**: 캡픽 카드 탭 -> ADM-04 촬영관리. 알림 아이콘 탭 -> CON-13. 업데이트 버튼 -> 텍스트/색 전환
- **캡픽 상태**: REC(빨강), 대기(초록), 경고(노랑, 에러 메시지 포함), 꺼짐(회색)

### 4.3 ADM-04 촬영 관리 (`adm-02`)
- **주요 컴포넌트**: 실시간 화면, 녹화 표시, 촬영/영상 화질 칩, 촬영 상태 패널 (펼치기/접기), 스티칭 개선/녹화 중지 버튼
- **인터랙션**:
  - 전체화면 버튼 -> ADM-04a (landscape 모드)
  - 촬영 상태 버튼 탭 -> 패널 펼침/접힘 (CPU, GPU, NPU, RAM, 온도, 저장, 업로드, AI, 스티칭)
  - 스티칭 개선하기 -> 확인 팝업 -> 토스트 알림 (시작 + 5초 후 완료)
  - 녹화 중지 -> 확인 팝업 -> ADM-05

### 4.4 ADM-04a 촬영 미리보기 (`adm-03`)
- **특수**: `landscape` 클래스 적용 (780x360px)
- **인터랙션**: 화면 탭 -> 오버레이 토글 (3초 자동 숨김). 메뉴 버튼 -> 우측 서랍 (촬영 상태 상세)

### 4.5 ADM-07 아카이브 (`adm-07`)
- **주요 컴포넌트**: 전체 영상 / 찜한 영상 탭, 영상 카드, 영상 올리기/합치기 버튼
- **인터랙션**: 탭 전환, 공유하기 -> 글로벌 공유 시트, 전체보기 -> ADM-08

### 4.6 ADM-08 영상 상세 (`adm-08`)
- **주요 컴포넌트**: 세션 정보, 1분 하이라이트, 선수별 그리드, 10분 하이라이트, 전체 경기, 쇼츠 클립 그리드, 전체 다운로드
- **인터랙션**: 
  - 공유/저장/다운로드 버튼 (각 영상)
  - 다운로드 -> 화질 선택 팝업 (480p/720p/1080p/4K)
  - 선수 그리드 탭 -> ADM-08a
  - 클립 동그라미 체크/해제, 전체 선택
  - 선택한 클립 내려받기 (0개) 버튼

### 4.7 CON-05 홈 (`con-04`)
- **주요 컴포넌트**: 내 구장 카드, 내 캡픽 카드, 핫한 하이라이트 가로 스크롤, 편집/AI 하이라이트 카드
- **네비게이션**: 구장 카드 -> CON-07, 캡픽 카드 -> CON-16, 하이라이트 -> CON-11

### 4.8 CON-08 영상 상세 - 학부모 (`con-07`)
- **특수**: 무료/유료 구분. 1분 하이라이트는 무료, 나머지는 페이드 오버레이 + 구독 CTA
- **CTA**: "오늘 하루, 우리 아이의 가장 행복한 모습은?" + 월 3,900원 / 건당 990원

### 4.9 CON-08a 영상 상세 - 일반 (`con-07b`)
- **CTA**: "오늘의 MOM은 바로 나?!" + 월 3,900원 / 건당 990원

### 4.10 CON-11 피드 (`con-feed`)
- **특수**: 다크 테마 배경, 전체화면 세로 영상
- **인터랙션**:
  - 좋아요: 하트 아이콘 탭 (토글) 또는 더블탭 (큰 하트 애니메이션)
  - 댓글: 아이콘 탭 -> 바텀시트 (댓글 목록 + 입력)
  - 북마크: 아이콘 탭 (토글)
  - 공유: 아이콘 탭 -> 공유 시트
  - 프로필: + 버튼 -> CON-20
  - 해시태그 탭 -> CON-19
  - 밀어서 다음 영상 안내

### 4.11 CON-14 마이페이지 (`con-my`)
- **주요 컴포넌트**: 프로필 헤더 (아바타 + 통계), 이름/아이디/태그, 프로필 공유/수정, 활동 배지, 그리드/좋아요 탭, 9열 피드 그리드
- **인터랙션**: 설정 톱니바퀴 -> CON-15, 팔로워/팔로잉 수 탭 -> CON-21, 프로필 수정 -> CON-25

### 4.12 CON-15 설정 (`con-settings`)
- **주요 컴포넌트**: 계정 관리 (프로필 수정, 비밀번호 변경, 구독 관리), 알림 설정 (토글 3개), 영상 설정 (화질, 자동 재생), 기타 (구장 관리, 이용약관, 개인정보, 앱 버전), 로그아웃/계정 삭제
- **네비게이션**: 각 카드 -> 해당 설정 화면

### 4.13 CON-16 캡픽 관리 (`con-18`)
- **주요 컴포넌트**: 캡픽 상태 카드 (배터리/저장/온도/WiFi), 실시간 촬영 화면, 녹화 중지/스티칭 개선/촬영 설정 버튼
- **인터랙션**: 녹화 중지 -> **확인 모달** ("녹화를 중지할까요?") -> ADM-05
- **문제 신고**: ? 버튼 -> 팝업 -> 전송 -> 완료

### 4.14 CON-22 새 게시물 (`con-publish`)
- **주요 컴포넌트**: 영상 미리보기, 문구 입력, 추천 해시태그 칩, 위치 추가, 공개 범위, SNS 공유 토글
- **인터랙션**: 게시 버튼 -> 토스트 + CON-11 피드로 이동

### 4.15 WEB-01/02/02a 웹 페이지
- **특수**: 앱 설치 없이 접근. 무료 1분 하이라이트만 재생. 나머지는 앱 설치 CTA
- **CTA**: App Store / Play Store 버튼

---

## 5. 공유 컴포넌트

### 5.1 상태 바 (Status Bar)
```html
<div class="status-bar"><span>9:41</span><span>LTE 100%</span></div>
```
높이 44px, 상단 고정

### 5.2 상단 바 (Top Bar)
```html
<div class="top-bar">
  <button class="top-bar-back" data-go="...">←</button>
  <span class="top-bar-title">제목</span>
  <div class="top-bar-spacer"></div>
</div>
```

### 5.3 하단 네비게이션 (Bottom Nav)
- 관리자: 4탭 (홈/아카이브/일정/설정)
- 소비자: 5탭 (홈/탐색/피드/아카이브/마이)
- 높이: 56px, 아이콘 24x24, 최소 터치 영역 44x44
- 활성 상태: `nav-item.active` -> 악센트 색상

### 5.4 카드 (Card)
```css
.card { background: #fff; border-radius: 12px; border: 1px solid var(--color-border); }
.card-body { padding: 16px; }
```

### 5.5 버튼 종류
| 클래스 | 용도 |
|--------|------|
| `btn btn-primary` | 주요 액션 (민트 배경) |
| `btn btn-outline` | 보조 액션 (테두리만) |
| `btn btn-danger` | 위험 액션 (빨강) |
| `btn btn-secondary` | 취소 등 (회색) |
| `btn btn-full` | 전체 너비 |

### 5.6 영상 카드 (Video Card)
```css
.video-card { aspect-ratio: 16/9; background: #212121; border-radius: 12px; position: relative; }
.video-card-badge { position: absolute; bottom: 6px; right: 6px; ... }
```

### 5.7 빈 상태 (Empty State)
```css
.empty-state { text-align: center; padding: 48px 16px; }
.empty-state-icon { font-size: 48px; }
.empty-state-title { font-size: 17px; font-weight: 700; }
.empty-state-desc { font-size: 13px; color: #757575; }
```

### 5.8 글로벌 공유 시트
- `#globalShareSheet`: 바텀시트 형태
- SNS: 카카오톡, 인스타그램, 틱톡, 링크복사
- 버튼: 내려받기, 링크 복사

### 5.9 토스트 알림
- `btnCopyToast(msg)`: 상단 중앙, 1.5초 후 사라짐
- 검정 배경, 흰 글씨, 둥근 모서리

### 5.10 모달/팝업
```css
.modal-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.4); z-index: 50; }
.modal-box { background: #fff; border-radius: 16px; padding: 24px; width: 280px; }
```

### 5.11 진행 바 (Progress)
```css
.progress { height: 6px; background: var(--color-gray-200); border-radius: 9999px; }
.progress-fill { height: 100%; background: var(--color-accent); border-radius: 9999px; }
```

### 5.12 토글 스위치
```css
.toggle-switch { width: 44px; height: 24px; background: var(--color-gray-300); border-radius: 12px; }
.toggle-switch.on { background: var(--color-accent); }
```

### 5.13 배지 (Badge)
| 클래스 | 용도 |
|--------|------|
| `badge badge-accent` | 민트 배경 |
| `badge badge-success` | 초록 (완료/대기) |
| `badge badge-error` | 빨강 (REC/에러) |

### 5.14 칩 (Chip)
```css
.chip { padding: 6px 14px; border-radius: 9999px; font-size: 13px; }
.chip.active { background: var(--color-accent); color: #fff; }
```

---

## 6. UX 수정 내역

### 6.1 네비게이션 수정
| ID | 수정 내용 | 화면 |
|----|----------|------|
| A1 | CON-15 설정 메뉴 카드에 올바른 `data-go` 속성 연결 | `con-settings` |
| A2 | CON-14 마이페이지 프로필 수정 버튼 -> CON-25로 직접 이동 | `con-my` |
| A3 | CON-07 경기 목록 하단 네비에서 홈 `active` 클래스 제거 | `con-06` |
| A4 | CON-16 캡픽 관리 녹화 중지 버튼에 확인 모달 추가 | `con-18` |

### 6.2 터치 타겟 수정 (최소 44px)
| ID | 수정 내용 | 변경 |
|----|----------|------|
| B1 | 전체화면 버튼 | 36x36 -> 44x44 |
| B2 | 설정 톱니바퀴 버튼 | 24x24 -> 44x44 |
| B3 | 설정/더보기 버튼 | 32x32 -> 44x44 |
| B4 | 액션 버튼 (공유/저장/다운로드) | height 34 -> 44 |
| B5 | 팔로우 버튼 | height 28 -> 36 |
| B6 | 클립 선택 동그라미 | 20x20 -> 44x44 |
| B7 | 아카이브 액션 버튼 | height 36 -> 44 |

### 6.3 빈 상태 수정
| ID | 수정 내용 | 화면 |
|----|----------|------|
| C1 | 하이라이트 빈 상태에 안내 문구 추가: "구장을 등록하고 경기를 촬영해보세요" | `con-04-empty` |
| C2 | 아카이브 빈 상태에 "찜한 영상" 탭 추가 (정상 상태와 동일) | `con-archive-empty` |
| C3 | 관리자 아카이브 찜한 영상 탭에 빈 상태 UI 추가 | `adm-07` |

### 6.4 로딩 상태 수정
| ID | 수정 내용 | 화면 |
|----|----------|------|
| D1 | 녹화 저장 중에 진행 바 + "영상 저장 중... 45%" + 예상 시간 추가 | `adm-05` |
| D2 | AI 하이라이트 만들기 중에 단계 표시 + 진행 바 추가 | `adm-13` |
| D3 | 편집 영상 만들기 중에 진행 바 + "영상 만들기 중... 60%" 추가 | `editor-loading` |

### 6.5 가독성 수정
| ID | 수정 내용 | 화면 |
|----|----------|------|
| E1 | 프로필 그리드 조회수 font-size 9px -> 12px | `con-my`, `con-explore` 등 |
| E2 | 피드 조회수 opacity 0.5 -> 0.7 | `con-feed` |

### 6.6 액션 명확성 수정
| ID | 수정 내용 | 화면 |
|----|----------|------|
| F1 | "선택한 클립 다운로드" -> "선택한 클립 내려받기 (0개)" | `adm-08` |

---

## 7. 디자인 토큰

### 7.1 색상
```css
--color-accent: #2AC1BC;        /* 메인 악센트 (민트) */
--color-accent-light: #E8F8F7;  /* 악센트 10% */
--color-accent-dark: #1E9A96;   /* 악센트 눌림 상태 */
--color-error: #EF4444;         /* 에러/위험 */
--color-success: #10B981;       /* 성공/완료 */
--color-warning: #F59E0B;       /* 경고 */
```

### 7.2 타이포그래피
```css
--text-xs: 11px;    --text-sm: 13px;    --text-base: 15px;
--text-lg: 17px;    --text-xl: 20px;    --text-2xl: 24px;
--font-regular: 400;  --font-medium: 500;  --font-semibold: 600;  --font-bold: 700;
```

### 7.3 간격
```css
--space-1: 4px;   --space-2: 8px;   --space-3: 12px;  --space-4: 16px;
--space-5: 20px;  --space-6: 24px;  --space-8: 32px;  --space-10: 40px;
```

### 7.4 모서리
```css
--radius-sm: 6px;   --radius-md: 12px;  --radius-lg: 16px;
--radius-xl: 24px;  --radius-full: 9999px;
```

### 7.5 그림자
```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 12px rgba(0, 0, 0, 0.08);
--shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.12);
```

### 7.6 애니메이션
```css
--duration-fast: 150ms;    --duration-normal: 250ms;   --duration-slow: 350ms;
--ease-out: cubic-bezier(0.0, 0, 0.2, 1);
--ease-standard: cubic-bezier(0.4, 0, 0.2, 1);
```

### 7.7 터치 타겟
```css
--touch-min: 44px;
```

---

## 8. 용어 규칙

| 사용 금지 | 사용할 용어 |
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
| stitch / stitching | 영상 합치기 / 영상 화질 |
| 사용자 (관리자앱) | 운영자 |
| 스티칭 출력 | 영상 화질 |
| 렌즈 촬영 | 촬영 화질 |
| score threshold | 점수 정확도 |
| match threshold | 매칭 정확도 |
| processing | 처리 중 |

---

## 9. JavaScript 기능 요약

### 9.1 화면 전환
- `go(screenId)`: 전역 네비게이션 함수. 사이드바, 화면, 설명 패널 모두 업데이트
- `data-go="screenId"`: 클릭 시 `go()` 호출
- landscape 모드: `adm-03`, `con-10l`, `adm-10l`

### 9.2 탭 전환
- `.tab-bar .tab-item`: 클릭 시 활성 탭 변경 + 탭 콘텐츠 전환
- 관리자 아카이브: 전체 영상 / 찜한 영상
- 소비자 아카이브: 경기 영상 / 하이라이트 / 찜한 영상
- 구장 추가: QR / 주변 검색

### 9.3 인터랙션
- **토글 스위치**: `.toggle-switch` 클릭 -> `.on` 토글
- **칩 선택**: `.chip-group .chip` 클릭 -> 활성 토글
- **클립 선택**: `.clip-circle` 클릭 -> 체크/해제
- **쇼츠 클립**: 짧게 탭 -> 팝업 플레이어, 길게 누르기 -> 다중 선택 모드
- **더블탭 좋아요**: 피드 영상 더블탭 -> 하트 애니메이션
- **댓글 시트**: `.feed-comment-btn` 클릭 -> 바텀시트

### 9.4 애니메이션
- `@keyframes spin`: 로딩 스피너
- `@keyframes bounceIn`: 체크 마크 등장
- `@keyframes fadeSlideIn`: 화면 전환
- `@keyframes heartPop`: 더블탭 좋아요
- `@keyframes savePulse`: 저장 버튼 펄스
- `@keyframes feedSwipeHint`: 피드 스와이프 안내
