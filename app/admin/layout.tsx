"use client"

import type React from "react"
import { useState } from "react"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { Button } from "@/components/ui/button"
import {
  Shield,
  Users,
  AlertTriangle,
  Settings,
  BarChart3,
  FileText,
  MessageSquare,
  Folder,
  Tag,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const adminNavItems = [
  {
    title: "대시보드",
    url: "/admin",
    icon: BarChart3,
  },
  {
    title: "사용자 관리",
    url: "/admin/users",
    icon: Users,
  },
  {
    title: "게시물 관리",
    url: "/admin/posts",
    icon: FileText,
  },
  {
    title: "댓글 관리",
    url: "/admin/comments",
    icon: MessageSquare,
  },
  {
    title: "카테고리",
    url: "/admin/categories",
    icon: Folder,
  },
  {
    title: "태그",
    url: "/admin/tags",
    icon: Tag,
  },
  {
    title: "콘텐츠 검토",
    url: "/admin/moderation",
    icon: AlertTriangle,
  },
  {
    title: "분석",
    url: "/admin/analytics",
    icon: BarChart3,
  },
  {
    title: "플랫폼 설정",
    url: "/admin/settings",
    icon: Settings,
  },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <ProtectedRoute requireAdmin>
      <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <aside
          className={cn(
            "fixed left-0 top-0 z-40 h-screen border-r border-slate-200/60 dark:border-slate-800/60 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl transition-all duration-300 ease-in-out",
            isCollapsed ? "w-20" : "w-72",
            "lg:relative lg:translate-x-0",
          )}
        >
          <div className="flex h-16 items-center justify-between border-b border-slate-200/60 dark:border-slate-800/60 px-4 bg-gradient-to-r from-slate-900 to-slate-800 dark:from-slate-950 dark:to-slate-900">
            {!isCollapsed && (
              <div className="flex items-center gap-3 animate-in fade-in duration-200">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/20">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white">관리자 패널</h2>
                  <p className="text-xs text-slate-300">Admin Dashboard</p>
                </div>
              </div>
            )}
            {isCollapsed && (
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/20 mx-auto">
                <Shield className="h-5 w-5 text-white" />
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className={cn(
                "h-9 w-9 rounded-lg hover:bg-white/10 text-white flex-shrink-0",
                isCollapsed && "absolute right-2",
              )}
            >
              {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          </div>

          <nav className="flex-1 space-y-1 p-3 overflow-y-auto h-[calc(100vh-4rem)]">
            {adminNavItems.map((item) => {
              const isActive = pathname === item.url
              return (
                <Link
                  key={item.url}
                  href={item.url}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/20"
                      : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white",
                    isCollapsed && "justify-center px-2",
                  )}
                  title={isCollapsed ? item.title : undefined}
                >
                  <item.icon className={cn("h-5 w-5 flex-shrink-0", isActive && "text-white")} />
                  {!isCollapsed && (
                    <span className="whitespace-nowrap animate-in fade-in duration-200">{item.title}</span>
                  )}
                </Link>
              )
            })}
          </nav>
        </aside>

        <main className={cn("flex-1 transition-all duration-300", isCollapsed ? "lg:ml-0" : "lg:ml-0", "w-full")}>
          <div className="min-h-screen p-4 sm:p-6 lg:p-8">
            <div className="mx-auto max-w-7xl w-full">{children}</div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
