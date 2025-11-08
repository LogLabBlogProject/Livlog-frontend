# Livlog - 모던 블로그 플랫폼

**Livlog**는 인스타그램 스타일의 모바일 피드와 전통적인 데스크톱 레이아웃을 갖춘 **모던 블로그 플랫폼**입니다. 사용자 친화적이고 직관적인 인터페이스로 누누나 쉽게 글을 작성하고 공유할 수 있습니다.

---

## 📋 목차

- [주요 기능](#주요-기능)
- [기술 스택](#기술-스택)
- [시스템 요구사항](#시스템-요구사항)
- [설치 및 실행](#설치-및-실행)
- [프로젝트 구조](#프로젝트-구조)
- [주요 페이지 및 기능](#주요-페이지-및-기능)
- [사용자 역할](#사용자-역할)
- [테스트 계정](#테스트-계정)
- [API 및 데이터 구조](#api-및-데이터-구조)
- [스타일 및 디자인](#스타일-및-디자인)
- [국제화(i18n)](#국제화i18n)
- [개발 가이드](#개발-가이드)
- [문제 해결](#문제-해결)
- [라이센스](#라이센스)

---

## 🌟 주요 기능

### 사용자 기능

| 기능 | 설명 |
|------|------|
| **회원가입 & 로그인** | 이메일 기반 인증으로 안전한 계정 생성 및 로그인 |
| **프로필 관리** | 프로필 사진, 닉네임, 자기소개 등 개인 정보 편집 |
| **글쓰기** | 제목, 내용, 이미지, 카테고리, 태그와 함께 글 작성 |
| **피드 보기** | 메인 피드에서 추천 글과 팔로우하는 작가의 글 확인 |
| **검색** | 제목, 내용, 카테고리, 태그별 글 검색 |
| **알림** | 댓글, 좋아요, 팔로우 등의 상호작용 알림 수신 |
| **반응형 디자인** | 모바일, 태블릿, PC 모든 기기에 최적화된 UI/UX |

### 관리자 기능

| 기능 | 설명 |
|------|------|
| **사용자 관리** | 사용자 계정 조회, 상태 변경, 차단 및 정지 |
| **글 관리** | 게시된 글 검토, 승인, 거절, 삭제 |
| **댓글 관리** | 부적절한 댓글 검토 및 삭제 |
| **카테고리 관리** | 카테고리 추가, 수정, 삭제 |
| **태그 관리** | 태그 생성 및 관리 |
| **분석** | 사용자 통계, 글 조회수, 인기 콘텐츠 분석 |
| **콘텐츠 모더레이션** | 부적절한 콘텐츠 검토 및 처리 |
| **설정** | 플랫폼 설정 및 정책 관리 |

---

## 🛠 기술 스택

### 프론트엔드

| 기술 | 버전 | 용도 |
|------|------|------|
| **Next.js** | 16 | React 기반 풀스택 프레임워크 |
| **React** | 19+ | UI 컴포넌트 라이브러리 |
| **TypeScript** | 5+ | 정적 타입 검사 |
| **Tailwind CSS** | 4 | 유틸리티 기반 스타일링 |
| **Shadcn/ui** | Latest | 고급 UI 컴포넌트 |
| **SWR** | Latest | 클라이언트 데이터 페칭 및 캐싱 |

### 개발 도구

| 도구 | 용도 |
|------|------|
| **Vercel** | 배포 및 호스팅 |
| **ESLint** | 코드 품질 검사 |
| **Prettier** | 코드 포맷팅 |
| **Git** | 버전 관리 |

---

## 💻 시스템 요구사항

### 최소 요구사항

- **Node.js**: v18.17 이상
- **npm**: v9 이상 (또는 yarn, pnpm)
- **메모리**: 512MB 이상
- **디스크 공간**: 1GB 이상

### 개발 환경 권장사항

- **Node.js**: v20 LTS 이상
- **npm**: v10 이상
- **메모리**: 2GB 이상
- **운영체제**: macOS, Linux, Windows (WSL2 권장)

---

## 🚀 설치 및 실행

### 1단계: 저장소 클론

\`\`\`bash
git clone https://github.com/your-username/livlog.git
cd livlog
\`\`\`

### 2단계: 의존성 설치

\`\`\`bash
npm install
\`\`\`

### 3단계: 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 변수를 추가하세요:

\`\`\`env
# 다음 기본 변수들이 자동으로 제공됩니다
NEXT_PUBLIC_APP_NAME=Livlog
NEXT_PUBLIC_APP_URL=http://localhost:3000
\`\`\`

### 4단계: 개발 서버 실행

\`\`\`bash
npm run dev
\`\`\`

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 애플리케이션에 접근하세요.

### 5단계: 프로덕션 빌드

\`\`\`bash
npm run build
npm run start
\`\`\`

---

## 📁 프로젝트 구조

\`\`\`
livlog/
├── app/                              # Next.js 앱 라우터
│   ├── page.tsx                      # 메인 홈페이지
│   ├── layout.tsx                    # 루트 레이아웃
│   ├── globals.css                   # 전역 스타일
│   ├── auth/                         # 인증 페이지
│   │   ├── login/
│   │   ├── signup/
│   │   ├── reset-password/
│   │   └── verify-email/
│   ├── write/                        # 글쓰기 페이지
│   ├── search/                       # 검색 페이지
│   ├── profile/                      # 사용자 프로필 페이지
│   ├── notifications/                # 알림 페이지
│   ├── author/                       # 작가 프로필 페이지
│   ├── dashboard/                    # 사용자 대시보드
│   │   ├── page.tsx
│   │   ├── posts/
│   │   ├── settings/
│   │   └── subscribers/
│   └── admin/                        # 관리자 대시보드
│       ├── layout.tsx                # 관리자 레이아웃
│       ├── page.tsx                  # 관리자 홈
│       ├── users/                    # 사용자 관리
│       ├── posts/                    # 글 관리
│       ├── comments/                 # 댓글 관리
│       ├── categories/               # 카테고리 관리
│       ├── tags/                     # 태그 관리
│       ├── moderation/               # 콘텐츠 모더레이션
│       ├── analytics/                # 분석
│       └── settings/                 # 설정
│
├── components/                       # React 컴포넌트
│   ├── layout/                       # 레이아웃 컴포넌트
│   │   ├── responsive-layout.tsx    # 반응형 래퍼
│   │   ├── top-header.tsx           # 상단 헤더
│   │   ├── desktop-sidebar.tsx      # 데스크톱 사이드바
│   │   └── mobile-navigation.tsx    # 모바일 하단 네비게이션
│   ├── auth/                         # 인증 관련 컴포넌트
│   │   ├── login-form.tsx
│   │   ├── signup-form.tsx
│   │   ├── reset-password-form.tsx
│   │   └── protected-route.tsx
│   ├── feed/                         # 피드 관련 컴포넌트
│   │   ├── main-feed.tsx            # 메인 피드
│   │   ├── feed-section.tsx         # 피드 섹션
│   │   ├── desktop-post-card.tsx    # 데스크톱 글 카드
│   │   └── mobile-post-card.tsx     # 모바일 글 카드
│   ├── editor/                       # 에디터 컴포넌트
│   │   ├── post-editor.tsx          # 글 작성 에디터
│   │   └── rich-text-editor.tsx     # 리치 텍스트 에디터
│   ├── admin/                        # 관리자 컴포넌트
│   │   ├── admin-dashboard.tsx      # 관리자 대시보드
│   │   ├── user-management.tsx      # 사용자 관리
│   │   ├── posts-management.tsx     # 글 관리
│   │   ├── comments-management.tsx  # 댓글 관리
│   │   ├── categories-management.tsx # 카테고리 관리
│   │   ├── tags-management.tsx      # 태그 관리
│   │   └── content-moderation.tsx   # 콘텐츠 모더레이션
│   ├── dashboard/                    # 사용자 대시보드 컴포넌트
│   │   ├── analytics-overview.tsx   # 분석 개요
│   │   ├── blog-settings.tsx        # 블로그 설정
│   │   └── subscriber-management.tsx # 구독자 관리
│   ├── ui/                           # shadcn/ui 컴포넌트
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── textarea.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── tabs.tsx
│   │   └── ... (기타 UI 컴포넌트)
│   ├── theme-provider.tsx            # 테마 제공자
│   ├── header.tsx                    # 헤더 컴포넌트
│   └── language-toggle.tsx           # 언어 토글 (향후 사용)
│
├── lib/                              # 유틸리티 및 라이브러리
│   ├── auth.tsx                      # 인증 로직 및 모의 사용자
│   ├── i18n.tsx                      # 국제화(i18n)
│   ├── post-management.tsx           # 글 관리 로직
│   ├── analytics.tsx                 # 분석 로직
│   ├── admin.ts                      # 관리자 유틸리티
│   └── utils.ts                      # 공통 유틸리티 함수
│
├── hooks/                            # React 커스텀 훅
│   ├── use-mobile.tsx                # 모바일 감지
│   └── use-toast.ts                  # 토스트 알림 훅
│
├── public/                           # 정적 자산
│   ├── images/                       # 이미지 파일
│   └── icons/                        # 아이콘 파일
│
├── package.json                      # 의존성 및 스크립트
├── tsconfig.json                     # TypeScript 설정
├── next.config.mjs                   # Next.js 설정
└── README.md                         # 이 파일
\`\`\`

---

## 📄 주요 페이지 및 기능

### 공개 페이지

#### 1. **메인 홈페이지 (`/`)**
- **목적**: 블로그의 첫 인상을 제공하는 시작 페이지
- **기능**:
  - 추천 글 피드 (3열 그리드)
  - 무한 스크롤 기능
  - 팔로우하는 작가의 글 섹션
  - 글 카드에 작가 정보 표시
- **반응형**: 모바일(1열), 태블릿(2열), PC(3열)

#### 2. **검색 페이지 (`/search`)**
- **목적**: 글을 검색하고 필터링
- **기능**:
  - 키워드 검색
  - 카테고리별 필터링
  - 태그별 필터링
  - 날짜 정렬
  - 인기도 정렬
- **반응형**: 완벽한 모바일 지원

### 인증 페이지

#### 3. **로그인 페이지 (`/auth/login`)**
- **기능**: 이메일과 비밀번호로 로그인
- **테스트 계정 표시**: 로그인 폼에 테스트 계정 정보 표시

#### 4. **회원가입 페이지 (`/auth/signup`)**
- **기능**:
  - 새 계정 생성
  - 이메일 검증
  - 비밀번호 강도 확인

#### 5. **비밀번호 재설정 (`/auth/reset-password`)**
- **기능**: 잊어버린 비밀번호 재설정

### 인증된 사용자 페이지

#### 6. **글쓰기 페이지 (`/write`)**
- **기능**:
  - 리치 텍스트 에디터
  - 제목, 요약, 내용 작성
  - 이미지 업로드
  - 카테고리, 태그 설정
  - 게시 또는 임시저장
  - 예약 발행 설정
- **반응형**: 모바일, 태블릿, PC 모두 최적화

#### 7. **프로필 페이지 (`/profile`)**
- **기능**:
  - 사용자 정보 표시 (프로필 사진, 이름, 이메일 등)
  - 프로필 편집 (닉네임, 자기소개, 프로필 사진)
  - 작성한 글 목록
  - 활동 통계 (글, 좋아요, 댓글, 조회수)
- **반응형**: 모바일 하단바 포함

#### 8. **알림 페이지 (`/notifications`)**
- **기능**:
  - 읽은/안 읽은 알림 구분
  - 알림 정렬 (최신, 오래된 순)
  - 알림 삭제
  - 현대적인 카드 기반 UI
- **반응형**: 모바일 하단바 포함

### 사용자 대시보드

#### 9. **대시보드 (`/dashboard`)**
- **기능**: 사용자의 블로그 통계 및 관리 페이지

#### 10. **글 관리 (`/dashboard/posts`)**
- **기능**: 작성한 글 목록, 상태 확인

#### 11. **구독자 관리 (`/dashboard/subscribers`)**
- **기능**: 블로그 구독자 목록 확인

### 관리자 페이지

#### 12. **관리자 대시보드 (`/admin`)**
- **기능**:
  - 플랫폼 통계 (사용자, 글, 댓글 수)
  - 인기 글 목록
  - 최근 활동
  - 관리자 메뉴 (사이드바)
  - 토글 가능한 사이드바 (확장/축소)
- **반응형**: 모바일, 태블릿, PC 모두 지원

#### 13. **사용자 관리 (`/admin/users`)**
- **기능**:
  - 사용자 목록 조회
  - 사용자 상태 변경
  - 사용자 차단/정지
  - 권한 관리

#### 14. **글 관리 (`/admin/posts`)**
- **기능**:
  - 게시된 글 목록
  - 글 승인/거절
  - 글 삭제
  - 글 상태 관리

#### 15. **댓글 관리 (`/admin/comments`)**
- **기능**: 부적절한 댓글 검토 및 삭제

#### 16. **카테고리 관리 (`/admin/categories`)**
- **기능**: 카테고리 추가, 수정, 삭제

#### 17. **태그 관리 (`/admin/tags`)**
- **기능**: 태그 생성 및 관리

#### 18. **콘텐츠 모더레이션 (`/admin/moderation`)**
- **기능**: 부적절한 콘텐츠 검토 및 처리

#### 19. **분석 (`/admin/analytics`)**
- **기능**: 플랫폼 통계 및 분석

#### 20. **설정 (`/admin/settings`)**
- **기능**: 플랫폼 설정 및 정책 관리

---

## 👥 사용자 역할

### 1. 일반 사용자 (User)

**권한:**
- 계정 생성 및 관리
- 글 작성, 수정, 삭제
- 다른 글 보기 및 댓글
- 작가 팔로우
- 프로필 관리
- 알림 조회

**메뉴 (프로필 클릭 시):**
- 내 프로필
- 설정
- 로그아웃

### 2. 관리자 (Admin)

**권한:**
- 모든 사용자 기능
- 사용자 관리
- 글 관리 및 검토
- 댓글 관리
- 카테고리 및 태그 관리
- 콘텐츠 모더레이션
- 분석 및 통계 확인
- 플랫폼 설정

**메뉴 (프로필 클릭 시):**
- 관리자 대시보드
- 설정
- 로그아웃

---

## 🔐 테스트 계정

다음 테스트 계정으로 모든 기능을 테스트할 수 있습니다. 모든 계정의 비밀번호는 **`Test1234!`**입니다.

### 관리자 계정

| 이메일 | 비밀번호 | 역할 |
|--------|---------|------|
| `admin@example.com` | `Test1234!` | 관리자 |

### 일반 사용자 계정

| 이메일 | 비밀번호 | 역할 |
|--------|---------|------|
| `user1@example.com` | `Test1234!` | 사용자 |
| `user2@example.com` | `Test1234!` | 사용자 |

**테스트 계정 위치:** `/lib/auth.tsx`의 `mockUsers` 배열에서 확인 및 수정 가능

### 테스트 시나리오

1. **일반 사용자 흐름 테스트:**
   - `user1@example.com`으로 로그인
   - 프로필 페이지에서 정보 편집
   - 새 글 작성
   - 메인 피드에서 글 보기 및 검색
   - 알림 확인

2. **관리자 흐름 테스트:**
   - `admin@example.com`으로 로그인
   - 프로필 클릭 시 "관리자 대시보드" 옵션 확인
   - 관리자 대시보드에서 사용자, 글, 댓글 관리
   - 각 관리 페이지의 기능 테스트

---

## 📊 API 및 데이터 구조

### 사용자 데이터 구조

\`\`\`typescript
interface User {
  id: string;
  email: string;
  name: string;
  username: string;
  bio?: string;
  avatar?: string;
  role: 'user' | 'admin';
  isActive: boolean;
  isBanned: boolean;
  createdAt: Date;
  updatedAt: Date;
}
\`\`\`

### 글 데이터 구조

\`\`\`typescript
interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: User;
  category: Category;
  tags: Tag[];
  featuredImage?: string;
  status: 'published' | 'draft' | 'archived';
  views: number;
  likes: number;
  comments: number;
  isScheduled: boolean;
  scheduledDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
}
\`\`\`

### 카테고리 데이터 구조

\`\`\`typescript
interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
  postCount: number;
  createdAt: Date;
}
\`\`\`

### 태그 데이터 구조

\`\`\`typescript
interface Tag {
  id: string;
  name: string;
  slug: string;
  postCount: number;
  createdAt: Date;
}
\`\`\`

### 댓글 데이터 구조

\`\`\`typescript
interface Comment {
  id: string;
  content: string;
  author: User;
  post: Post;
  likes: number;
  status: 'published' | 'pending' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}
\`\`\`

### 알림 데이터 구조

\`\`\`typescript
interface Notification {
  id: string;
  recipient: User;
  type: 'comment' | 'like' | 'follow';
  content: string;
  link?: string;
  isRead: boolean;
  createdAt: Date;
}
\`\`\`

---

## 🎨 스타일 및 디자인

### 디자인 시스템

**Livlog**는 현대적이고 세련된 디자인 시스템을 사용합니다.

### 색상 팔레트

#### 라이트 모드

| 색상명 | HEX 값 | 용도 |
|--------|--------|------|
| 배경 | `#ffffff` | 배경색 |
| 텍스트 | `#0f172a` | 기본 텍스트 |
| 카드 | `#ffffff` | 카드 배경 |
| 기본 | `#1e293b` | 버튼, 강조 |
| 보조 | `#f8fafc` | 보조 요소 |
| 테두리 | `#e2e8f0` | 테두리색 |
| 위험 | `#ef4444` | 삭제, 오류 |

#### 다크 모드

| 색상명 | HEX 값 | 용도 |
|--------|--------|------|
| 배경 | `#0f172a` | 배경색 |
| 텍스트 | `#f1f5f9` | 기본 텍스트 |
| 카드 | `#1e293b` | 카드 배경 |
| 기본 | `#f1f5f9` | 버튼, 강조 |
| 보조 | `#334155` | 보조 요소 |
| 테두리 | `#334155` | 테두리색 |
| 위험 | `#ef4444` | 삭제, 오류 |

### 타이포그래피

- **헤딩 폰트**: Work Sans (600-700 weight)
- **본문 폰트**: Open Sans (400-500 weight)
- **줄 높이**: 1.6-1.7

### 레이아웃

- **Flexbox**: 대부분의 레이아웃에 사용
- **Grid**: 복잡한 2D 레이아웃에만 사용
- **반응형**: 모바일 우선 설계

### 반응형 브레이크포인트

| 기기 | 너비 | 클래스 |
|------|------|--------|
| 모바일 | < 768px | 기본 |
| 태블릿 | 768px - 1024px | `md:` |
| PC | > 1024px | `lg:` |

### 테마 시스템

- **시스템 기반**: 사용자의 OS 설정에 따라 자동으로 라이트/다크 모드 적용
- **수동 선택**: 불가능 (시스템 설정 따름)
- **전환**: 새로고침 시 즉시 적용

---

## 🌍 국제화(i18n)

### 지원 언어

현재 **한국어**만 지원하며, 추후 영어 등 다른 언어 추가 예정입니다.

| 언어 | 코드 | 상태 |
|------|------|------|
| 한국어 | `ko` | ✅ 지원 |
| 영어 | `en` | ⏳ 예정 |

### 언어 자동 감지

- 사용자의 브라우저 언어 설정에 따라 자동으로 인터페이스 언어 결정
- 수동 언어 변경 옵션 없음 (자동 감지만 사용)

### i18n 설정

국제화 설정은 `/lib/i18n.tsx`에서 관리됩니다.

\`\`\`typescript
// 예시: 언어 자동 감지
const browserLanguage = navigator.language; // 'ko-KR', 'en-US' 등
\`\`\`

---

## 📖 개발 가이드

### 새로운 페이지 추가

1. **라우트 생성**: `app/[새-페이지]/page.tsx` 파일 생성
2. **레이아웃 적용**: `ResponsiveLayout` 또는 `ProtectedRoute` 래핑
3. **반응형 처리**: 모바일, 태블릿, PC 환경 테스트

### 새로운 컴포넌트 추가

1. **컴포넌트 생성**: `components/[카테고리]/[이름].tsx`
2. **스타일링**: Tailwind CSS 유틸리티 사용
3. **타입 정의**: TypeScript 인터페이스 작성

### 새로운 기능 추가

1. **로직 작성**: `lib/` 디렉토리에 파일 생성
2. **훅 작성**: `hooks/` 디렉토리에 커스텀 훅 생성
3. **컴포넌트 통합**: 해당 컴포넌트에서 사용

### 코드 스타일 가이드

- **들여쓰기**: 2칸 스페이스
- **세미콜론**: 필수
- **따옴표**: 큰따옴표(`"`) 사용
- **파일명**: 케밥-케이스 사용 (예: `post-editor.tsx`)
- **컴포넌트명**: PascalCase 사용 (예: `PostEditor`)
- **변수명**: camelCase 사용 (예: `postTitle`)

### 커밋 메시지 규칙

\`\`\`
[타입] 주제

예시:
[feat] 사용자 프로필 페이지 추가
[fix] 모바일 네비게이션 버그 수정
[docs] README 업데이트
[style] 코드 포맷팅
[refactor] 컴포넌트 구조 개선
\`\`\`

---

## 🐛 문제 해결

### 자주 발생하는 문제

#### 1. 로그인이 되지 않음

**원인**: 테스트 계정 정보 오류

**해결방법**:
1. 올바른 이메일과 비밀번호 확인
2. 모든 계정의 비밀번호는 `Test1234!`
3. `/lib/auth.tsx`에서 mockUsers 배열 확인

#### 2. 모바일에서 하단바가 보이지 않음

**원인**: 반응형 레이아웃 문제

**해결방법**:
1. 페이지가 `ResponsiveLayout`으로 래핑되었는지 확인
2. CSS 미디어 쿼리 확인
3. 브라우저 개발자 도구에서 모바일 크기 시뮬레이션

#### 3. 다크 모드가 작동하지 않음

**원인**: 시스템 테마 감지 실패

**해결방법**:
1. OS 테마 설정 확인 (라이트/다크 모드)
2. 브라우저 새로고침
3. 개발자 도구에서 `prefers-color-scheme` 확인

#### 4. 글 작성 후 저장되지 않음

**원인**: 폼 검증 오류

**해결방법**:
1. 필수 필드 확인 (제목, 내용)
2. 콘솔에서 오류 메시지 확인
3. 네트워크 탭에서 API 호출 상태 확인

#### 5. 관리자 메뉴가 표시되지 않음

**원인**: 관리자 계정으로 로그인하지 않음

**해결방법**:
1. `admin@example.com`으로 로그인
2. 프로필 사진 클릭
3. "관리자 대시보드" 옵션 확인

### 개발자 모드

브라우저 콘솔에서 다음 명령어로 디버깅할 수 있습니다:

\`\`\`javascript
// 현재 사용자 정보 확인
localStorage.getItem('currentUser')

// 모든 글 조회
localStorage.getItem('posts')

// 모든 사용자 조회
localStorage.getItem('mockUsers')
\`\`\`

---

## 📝 라이센스

이 프로젝트는 **MIT 라이센스**를 따릅니다. 자유롭게 사용, 수정, 배포할 수 있습니다.

---

## 💬 피드백 및 지원

문제가 발생하거나 기능 제안이 있으시면 [GitHub Issues](https://github.com/your-username/livlog/issues)에 등록해주세요.

### 자주하는 질문 (FAQ)

**Q. 글을 삭제할 수 있나요?**
A. 예, 글 작성자는 글 상세 페이지에서 삭제 버튼으로 삭제할 수 있습니다. 관리자도 관리자 대시보드에서 글을 삭제할 수 있습니다.

**Q. 비밀번호를 변경할 수 있나요?**
A. 프로필 페이지의 설정 탭에서 비밀번호를 변경할 수 있습니다.

**Q. 블로그를 비공개로 설정할 수 있나요?**
A. 현재는 모든 글이 공개됩니다. 비공개 기능은 추후 업데이트 예정입니다.

**Q. 메일 알림을 받을 수 있나요?**
A. 현재는 사이트 내 알림만 제공합니다. 메일 알림은 추후 업데이트 예정입니다.

---

**마지막 업데이트**: 2025년 11월
**버전**: 1.0.0

---

**Livlog를 이용해주셔서 감사합니다! 🚀**
