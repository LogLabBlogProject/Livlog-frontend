"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export const translations = {
  ko: {
    // Navigation
    home: "홈",
    search: "검색",
    categories: "카테고리",
    about: "소개",
    contact: "연락처",
    login: "로그인",
    signup: "회원가입",
    logout: "로그아웃",
    dashboard: "대시보드",
    profile: "프로필",
    settings: "설정",

    // Navigation items
    "nav.home": "홈",
    "nav.search": "검색",
    "nav.trending": "인기",
    "nav.bookmarks": "북마크",
    "nav.dashboard": "대시보드",
    "nav.myPosts": "내 게시물",
    "nav.subscribers": "구독자",
    "nav.settings": "설정",
    "nav.admin": "관리자",
    "nav.myBlog": "내 블로그",
    "nav.administration": "관리",
    "nav.categories": "카테고리",
    "nav.writePost": "글 쓰기",
    "nav.notifications": "알림",

    // Search
    "search.placeholder": "게시물, 작성자, 주제 검색...",

    // Authentication
    "auth.signIn": "로그인",
    "auth.signUp": "회원가입",
    email: "이메일",
    password: "비밀번호",
    confirm_password: "비밀번호 확인",
    forgot_password: "비밀번호 찾기",
    reset_password: "비밀번호 재설정",
    remember_me: "로그인 상태 유지",
    sign_in: "로그인",
    sign_up: "회원가입",
    create_account: "계정 만들기",

    // Brand
    "brand.tagline": "당신의 이야기를 공유하세요",

    // Common actions
    save: "저장",
    cancel: "취소",
    delete: "삭제",
    edit: "편집",
    create: "생성",
    update: "업데이트",
    submit: "제출",
    back: "뒤로",
    next: "다음",
    previous: "이전",
    loading: "로딩 중...",
    search_placeholder: "검색어를 입력하세요...",

    // Blog content
    read_more: "더 읽기",
    read_time: "분 읽기",
    published: "게시됨",
    updated: "업데이트됨",
    author: "작성자",
    tags: "태그",
    category: "카테고리",
    comments: "댓글",
    likes: "좋아요",
    shares: "공유",
    views: "조회수",

    // Language
    language: "언어",
    korean: "한국어",
    english: "English",

    // Theme
    light_mode: "라이트 모드",
    dark_mode: "다크 모드",
    system_theme: "시스템 테마",
  },
  en: {
    // Navigation
    home: "Home",
    search: "Search",
    categories: "Categories",
    about: "About",
    contact: "Contact",
    login: "Login",
    signup: "Sign Up",
    logout: "Logout",
    dashboard: "Dashboard",
    profile: "Profile",
    settings: "Settings",

    // Navigation items
    "nav.home": "Home",
    "nav.search": "Search",
    "nav.trending": "Trending",
    "nav.bookmarks": "Bookmarks",
    "nav.dashboard": "Dashboard",
    "nav.myPosts": "My Posts",
    "nav.subscribers": "Subscribers",
    "nav.settings": "Settings",
    "nav.admin": "Admin",
    "nav.myBlog": "My Blog",
    "nav.administration": "Administration",
    "nav.categories": "Categories",
    "nav.writePost": "Write Post",
    "nav.notifications": "Notifications",

    // Search
    "search.placeholder": "Search posts, authors, topics...",

    // Authentication
    "auth.signIn": "Sign In",
    "auth.signUp": "Sign Up",
    email: "Email",
    password: "Password",
    confirm_password: "Confirm Password",
    forgot_password: "Forgot Password",
    reset_password: "Reset Password",
    remember_me: "Remember Me",
    sign_in: "Sign In",
    sign_up: "Sign Up",
    create_account: "Create Account",

    // Brand
    "brand.tagline": "Share your story",

    // Common actions
    save: "Save",
    cancel: "Cancel",
    delete: "Delete",
    edit: "Edit",
    create: "Create",
    update: "Update",
    submit: "Submit",
    back: "Back",
    next: "Next",
    previous: "Previous",
    loading: "Loading...",
    search_placeholder: "Enter search terms...",

    // Blog content
    read_more: "Read More",
    read_time: "min read",
    published: "Published",
    updated: "Updated",
    author: "Author",
    tags: "Tags",
    category: "Category",
    comments: "Comments",
    likes: "Likes",
    shares: "Shares",
    views: "Views",

    // Language
    language: "Language",
    korean: "한국어",
    english: "English",

    // Theme
    light_mode: "Light Mode",
    dark_mode: "Dark Mode",
    system_theme: "System Theme",
  },
}

export type Language = keyof typeof translations
export type TranslationKey = keyof typeof translations.ko

interface I18nContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: TranslationKey, fallback?: string) => string
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

function detectBrowserLanguage(): Language {
  if (typeof window === "undefined") return "ko"

  const browserLang = navigator.language || navigator.languages?.[0] || "ko"

  // Check if browser language matches supported languages
  if (browserLang.startsWith("ko")) return "ko"
  if (browserLang.startsWith("en")) return "en"

  // Default to Korean
  return "ko"
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("ko")

  useEffect(() => {
    const detectedLanguage = detectBrowserLanguage()
    setLanguageState(detectedLanguage)
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("language", lang)
  }

  const t = (key: TranslationKey, fallback?: string): string => {
    return translations[language]?.[key] || translations.en?.[key] || fallback || key
  }

  return <I18nContext.Provider value={{ language, setLanguage, t }}>{children}</I18nContext.Provider>
}

export function useTranslation() {
  const context = useContext(I18nContext)
  if (context === undefined) {
    throw new Error("useTranslation must be used within an I18nProvider")
  }
  return context
}
