"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

export interface AnalyticsData {
  views: {
    total: number
    daily: { date: string; views: number }[]
    weekly: { date: string; views: number }[]
    monthly: { date: string; views: number }[]
  }
  visitors: {
    total: number
    unique: number
    returning: number
    daily: { date: string; visitors: number }[]
  }
  subscribers: {
    total: number
    growth: number
    daily: { date: string; subscribers: number }[]
  }
  engagement: {
    likes: number
    comments: number
    shares: number
    bookmarks: number
    daily: { date: string; likes: number; comments: number }[]
  }
  topPosts: {
    id: string
    title: string
    views: number
    likes: number
    comments: number
  }[]
  demographics: {
    devices: { name: string; value: number }[]
    countries: { name: string; value: number }[]
    referrers: { name: string; value: number }[]
  }
}

interface AnalyticsContextType {
  data: AnalyticsData
  timeRange: "7d" | "30d" | "90d"
  setTimeRange: (range: "7d" | "30d" | "90d") => void
  isLoading: boolean
  refreshData: () => Promise<void>
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined)

// Mock analytics data
const generateMockData = (days: number): AnalyticsData => {
  const dates = Array.from({ length: days }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (days - 1 - i))
    return date.toISOString().split("T")[0]
  })

  return {
    views: {
      total: 12543,
      daily: dates.map((date) => ({
        date,
        views: Math.floor(Math.random() * 500) + 100,
      })),
      weekly: dates
        .filter((_, i) => i % 7 === 0)
        .map((date) => ({
          date,
          views: Math.floor(Math.random() * 3000) + 1000,
        })),
      monthly: dates
        .filter((_, i) => i % 30 === 0)
        .map((date) => ({
          date,
          views: Math.floor(Math.random() * 10000) + 5000,
        })),
    },
    visitors: {
      total: 8934,
      unique: 7234,
      returning: 1700,
      daily: dates.map((date) => ({
        date,
        visitors: Math.floor(Math.random() * 300) + 50,
      })),
    },
    subscribers: {
      total: 1234,
      growth: 12.5,
      daily: dates.map((date) => ({
        date,
        subscribers: Math.floor(Math.random() * 20) + 5,
      })),
    },
    engagement: {
      likes: 2345,
      comments: 567,
      shares: 234,
      bookmarks: 890,
      daily: dates.map((date) => ({
        date,
        likes: Math.floor(Math.random() * 50) + 10,
        comments: Math.floor(Math.random() * 20) + 5,
      })),
    },
    topPosts: [
      { id: "1", title: "The Future of Web Development", views: 2345, likes: 234, comments: 45 },
      { id: "2", title: "React Server Components Guide", views: 1890, likes: 189, comments: 32 },
      { id: "3", title: "Design Systems at Scale", views: 1567, likes: 156, comments: 28 },
      { id: "4", title: "Building Sustainable Startups", views: 1234, likes: 298, comments: 67 },
      { id: "5", title: "Minimalist Living Guide", views: 987, likes: 167, comments: 23 },
    ],
    demographics: {
      devices: [
        { name: "Desktop", value: 45 },
        { name: "Mobile", value: 40 },
        { name: "Tablet", value: 15 },
      ],
      countries: [
        { name: "United States", value: 35 },
        { name: "United Kingdom", value: 20 },
        { name: "Canada", value: 15 },
        { name: "Germany", value: 12 },
        { name: "Others", value: 18 },
      ],
      referrers: [
        { name: "Direct", value: 40 },
        { name: "Google", value: 30 },
        { name: "Social Media", value: 20 },
        { name: "Other", value: 10 },
      ],
    },
  }
}

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<AnalyticsData>(generateMockData(30))
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d">("30d")
  const [isLoading, setIsLoading] = useState(false)

  const refreshData = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const days = timeRange === "7d" ? 7 : timeRange === "30d" ? 30 : 90
    setData(generateMockData(days))
    setIsLoading(false)
  }

  useEffect(() => {
    refreshData()
  }, [timeRange])

  return (
    <AnalyticsContext.Provider
      value={{
        data,
        timeRange,
        setTimeRange,
        isLoading,
        refreshData,
      }}
    >
      {children}
    </AnalyticsContext.Provider>
  )
}

export function useAnalytics() {
  const context = useContext(AnalyticsContext)
  if (context === undefined) {
    throw new Error("useAnalytics must be used within an AnalyticsProvider")
  }
  return context
}
