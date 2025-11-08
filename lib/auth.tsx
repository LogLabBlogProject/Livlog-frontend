"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  bio?: string
  username: string
  followers: number
  following: number
  createdAt: string
  role?: "user" | "moderator" | "admin"
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signup: (
    email: string,
    password: string,
    name: string,
    username: string,
  ) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>
  updateProfile: (data: Partial<User>) => Promise<{ success: boolean; error?: string }>
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const mockUsers: User[] = [
  {
    id: "admin",
    email: "admin@example.com",
    name: "관리자",
    username: "admin",
    avatar: "/placeholder.svg?height=40&width=40",
    bio: "시스템 관리자입니다",
    followers: 2500,
    following: 150,
    createdAt: "2023-01-01",
    role: "admin",
  },
  {
    id: "user1",
    email: "user1@example.com",
    name: "사용자1",
    username: "user1",
    avatar: "/placeholder.svg?height=40&width=40",
    bio: "테스트 사용자 1입니다",
    followers: 1234,
    following: 567,
    createdAt: "2023-03-01",
    role: "user",
  },
  {
    id: "user2",
    email: "user2@example.com",
    name: "사용자2",
    username: "user2",
    avatar: "/placeholder.svg?height=40&width=40",
    bio: "테스트 사용자 2입니다",
    followers: 2100,
    following: 450,
    createdAt: "2023-03-15",
    role: "user",
  },
  {
    id: "4",
    email: "admin2@example.com",
    name: "관리자2",
    username: "admin2",
    avatar: "/placeholder.svg?height=40&width=40",
    bio: "보조 관리자입니다",
    followers: 800,
    following: 100,
    createdAt: "2023-01-15",
    role: "admin",
  },
  {
    id: "5",
    email: "alex@example.com",
    name: "알렉스 이",
    username: "alexlee",
    avatar: "/placeholder.svg?height=40&width=40",
    bio: "프론트엔드 개발자, React 전문가",
    followers: 1800,
    following: 320,
    createdAt: "2023-04-01",
    role: "user",
  },
  {
    id: "6",
    email: "emma@example.com",
    name: "엠마 최",
    username: "emmachoi",
    avatar: "/placeholder.svg?height=40&width=40",
    bio: "스타트업 창업자, 비즈니스 전략가",
    followers: 3200,
    following: 180,
    createdAt: "2023-04-15",
    role: "user",
  },
  {
    id: "7",
    email: "michael@example.com",
    name: "마이클 박",
    username: "michaelpark",
    avatar: "/placeholder.svg?height=40&width=40",
    bio: "데이터 사이언티스트, AI 연구자",
    followers: 2800,
    following: 220,
    createdAt: "2023-05-01",
    role: "user",
  },
  {
    id: "8",
    email: "lisa@example.com",
    name: "리사 정",
    username: "lisajung",
    avatar: "/placeholder.svg?height=40&width=40",
    bio: "라이프스타일 블로거, 미니멀리스트",
    followers: 1500,
    following: 400,
    createdAt: "2023-05-15",
    role: "user",
  },
  {
    id: "9",
    email: "david@example.com",
    name: "데이비드 강",
    username: "davidkang",
    avatar: "/placeholder.svg?height=40&width=40",
    bio: "백엔드 개발자, 클라우드 아키텍트",
    followers: 1600,
    following: 280,
    createdAt: "2023-06-01",
    role: "user",
  },
  {
    id: "10",
    email: "jenny@example.com",
    name: "제니 윤",
    username: "jennyyoon",
    avatar: "/placeholder.svg?height=40&width=40",
    bio: "마케팅 전문가, 브랜딩 컨설턴트",
    followers: 2200,
    following: 350,
    createdAt: "2023-06-15",
    role: "user",
  },
  {
    id: "11",
    email: "kevin@example.com",
    name: "케빈 조",
    username: "kevinjo",
    avatar: "/placeholder.svg?height=40&width=40",
    bio: "게임 개발자, 인디 게임 제작자",
    followers: 900,
    following: 150,
    createdAt: "2023-07-01",
    role: "user",
  },
  {
    id: "12",
    email: "anna@example.com",
    name: "안나 서",
    username: "annaseo",
    avatar: "/placeholder.svg?height=40&width=40",
    bio: "여행 블로거, 사진작가",
    followers: 3500,
    following: 500,
    createdAt: "2023-07-15",
    role: "user",
  },
  {
    id: "13",
    email: "ryan@example.com",
    name: "라이언 한",
    username: "ryanhan",
    avatar: "/placeholder.svg?height=40&width=40",
    bio: "투자 전문가, 핀테크 애널리스트",
    followers: 2600,
    following: 200,
    createdAt: "2023-08-01",
    role: "user",
  },
  {
    id: "14",
    email: "sophia@example.com",
    name: "소피아 임",
    username: "sophiaim",
    avatar: "/placeholder.svg?height=40&width=40",
    bio: "건강 코치, 웰니스 전문가",
    followers: 1900,
    following: 380,
    createdAt: "2023-08-15",
    role: "user",
  },
  {
    id: "15",
    email: "james@example.com",
    name: "제임스 오",
    username: "jamesoh",
    avatar: "/placeholder.svg?height=40&width=40",
    bio: "요리사, 푸드 블로거",
    followers: 2400,
    following: 320,
    createdAt: "2023-09-01",
    role: "user",
  },
  {
    id: "16",
    email: "grace@example.com",
    name: "그레이스 송",
    username: "gracesong",
    avatar: "/placeholder.svg?height=40&width=40",
    bio: "교육 전문가, 온라인 강사",
    followers: 1700,
    following: 250,
    createdAt: "2023-09-15",
    role: "user",
  },
  {
    id: "17",
    email: "daniel@example.com",
    name: "다니엘 류",
    username: "danielryu",
    avatar: "/placeholder.svg?height=40&width=40",
    bio: "환경 운동가, 지속가능성 전문가",
    followers: 1300,
    following: 400,
    createdAt: "2023-10-01",
    role: "user",
  },
  {
    id: "18",
    email: "olivia@example.com",
    name: "올리비아 문",
    username: "oliviamoon",
    avatar: "/placeholder.svg?height=40&width=40",
    bio: "패션 디자이너, 스타일리스트",
    followers: 2900,
    following: 180,
    createdAt: "2023-10-15",
    role: "user",
  },
  {
    id: "19",
    email: "ethan@example.com",
    name: "이든 신",
    username: "ethanshin",
    avatar: "/placeholder.svg?height=40&width=40",
    bio: "음악 프로듀서, 사운드 엔지니어",
    followers: 1100,
    following: 300,
    createdAt: "2023-11-01",
    role: "user",
  },
  {
    id: "20",
    email: "chloe@example.com",
    name: "클로이 백",
    username: "chloebaek",
    avatar: "/placeholder.svg?height=40&width=40",
    bio: "심리학자, 멘탈 헬스 전문가",
    followers: 2100,
    following: 270,
    createdAt: "2023-11-15",
    role: "user",
  },
  {
    id: "21",
    email: "noah@example.com",
    name: "노아 홍",
    username: "noahhong",
    avatar: "/placeholder.svg?height=40&width=40",
    bio: "블록체인 개발자, 크립토 전문가",
    followers: 1800,
    following: 160,
    createdAt: "2023-12-01",
    role: "user",
  },
]

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored auth token
    const storedUser = localStorage.getItem("auth-user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)

    // Mock authentication - in real app, this would be an API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const foundUser = mockUsers.find((u) => u.email === email)
    if (foundUser && password === "Test1234!") {
      setUser(foundUser)
      localStorage.setItem("auth-user", JSON.stringify(foundUser))
      setIsLoading(false)
      return { success: true }
    }

    setIsLoading(false)
    return { success: false, error: "Invalid email or password" }
  }

  const signup = async (email: string, password: string, name: string, username: string) => {
    setIsLoading(true)

    // Mock signup - in real app, this would be an API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Check if user already exists
    if (mockUsers.find((u) => u.email === email || u.username === username)) {
      setIsLoading(false)
      return { success: false, error: "User already exists" }
    }

    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      username,
      followers: 0,
      following: 0,
      createdAt: new Date().toISOString(),
      role: "user",
    }

    mockUsers.push(newUser)
    setUser(newUser)
    localStorage.setItem("auth-user", JSON.stringify(newUser))
    setIsLoading(false)
    return { success: true }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("auth-user")
  }

  const resetPassword = async (email: string) => {
    // Mock password reset
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return { success: true }
  }

  const updateProfile = async (data: Partial<User>) => {
    if (!user) return { success: false, error: "Not authenticated" }

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const updatedUser = { ...user, ...data }
    setUser(updatedUser)
    localStorage.setItem("auth-user", JSON.stringify(updatedUser))
    setIsLoading(false)
    return { success: true }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        resetPassword,
        updateProfile,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
