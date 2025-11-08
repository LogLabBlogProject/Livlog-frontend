"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bell, Heart, MessageCircle, UserPlus, Settings, Check, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { ResponsiveLayout } from "@/components/layout/responsive-layout"

interface Notification {
  id: string
  type: "like" | "comment" | "follow" | "system"
  title: string
  message: string
  isRead: boolean
  createdAt: string
  actionUrl?: string
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "like",
    title: "New Like",
    message: "Sarah Wilson liked your post 'Getting Started with Next.js 15'",
    isRead: false,
    createdAt: "2024-01-20T10:30:00Z",
    actionUrl: "/post/getting-started-nextjs-15",
  },
  {
    id: "2",
    type: "comment",
    title: "New Comment",
    message: "John Doe commented on your post 'The Future of Web Development'",
    isRead: false,
    createdAt: "2024-01-20T09:15:00Z",
    actionUrl: "/post/future-web-development",
  },
  {
    id: "3",
    type: "follow",
    title: "New Follower",
    message: "Mike Johnson started following you",
    isRead: true,
    createdAt: "2024-01-19T16:45:00Z",
    actionUrl: "/author/mike-johnson",
  },
  {
    id: "4",
    type: "system",
    title: "System Update",
    message: "New features have been added to the platform. Check out the changelog!",
    isRead: true,
    createdAt: "2024-01-19T14:20:00Z",
    actionUrl: "/changelog",
  },
  {
    id: "5",
    type: "like",
    title: "New Like",
    message: "Alice Brown liked your post 'Design Systems Best Practices'",
    isRead: true,
    createdAt: "2024-01-18T11:30:00Z",
    actionUrl: "/post/design-systems-best-practices",
  },
]

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [filter, setFilter] = useState<string>("all")
  const { toast } = useToast()

  const filteredNotifications = notifications.filter((notification) => {
    if (filter === "unread") return !notification.isRead
    if (filter === "read") return notification.isRead
    if (filter !== "all") return notification.type === filter
    return true
  })

  const handleMarkAsRead = (notificationId: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === notificationId ? { ...notification, isRead: true } : notification,
      ),
    )
  }

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, isRead: true })))
    toast({
      title: "All notifications marked as read",
      description: "All your notifications have been marked as read.",
    })
  }

  const handleDeleteNotification = (notificationId: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== notificationId))
    toast({
      title: "Notification deleted",
      description: "The notification has been removed.",
    })
  }

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "like":
        return <Heart className="h-4 w-4 text-red-500" />
      case "comment":
        return <MessageCircle className="h-4 w-4 text-blue-500" />
      case "follow":
        return <UserPlus className="h-4 w-4 text-green-500" />
      case "system":
        return <Settings className="h-4 w-4 text-purple-500" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  const unreadCount = notifications.filter((n) => !n.isRead).length

  return (
    <ResponsiveLayout>
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 max-w-5xl">
          <div className="space-y-6 sm:space-y-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <div className="space-y-1">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                  알림
                </h1>
                <p className="text-sm sm:text-base text-muted-foreground">
                  {unreadCount > 0 ? `${unreadCount}개의 읽지 않은 알림이 있습니다` : "모든 알림을 확인했습니다"}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
                <Select value={filter} onValueChange={setFilter}>
                  <SelectTrigger className="w-full sm:w-[180px] h-10 rounded-xl border-border/50 bg-background/50 backdrop-blur-sm">
                    <SelectValue placeholder="필터" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">모든 알림</SelectItem>
                    <SelectItem value="unread">읽지 않음</SelectItem>
                    <SelectItem value="read">읽음</SelectItem>
                    <SelectItem value="like">좋아요</SelectItem>
                    <SelectItem value="comment">댓글</SelectItem>
                    <SelectItem value="follow">팔로우</SelectItem>
                    <SelectItem value="system">시스템</SelectItem>
                  </SelectContent>
                </Select>
                {unreadCount > 0 && (
                  <Button
                    onClick={handleMarkAllAsRead}
                    variant="outline"
                    className="h-10 rounded-xl border-border/50 bg-background/50 backdrop-blur-sm hover:bg-accent/50"
                  >
                    <Check className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">모두 읽음 처리</span>
                    <span className="sm:hidden">모두 읽음</span>
                  </Button>
                )}
              </div>
            </div>

            <div className="space-y-3 sm:space-y-4">
              {filteredNotifications.length === 0 ? (
                <Card className="border-border/50 bg-background/50 backdrop-blur-sm shadow-lg">
                  <CardContent className="py-12 sm:py-16">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-muted/50 mb-4 sm:mb-6">
                        <Bell className="h-8 w-8 sm:h-10 sm:w-10 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-semibold mb-2">알림이 없습니다</h3>
                      <p className="text-sm sm:text-base text-muted-foreground">
                        새로운 알림이 있으면 여기에 표시됩니다
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                filteredNotifications.map((notification) => (
                  <Card
                    key={notification.id}
                    className={`border-border/50 backdrop-blur-sm transition-all duration-200 hover:shadow-md ${
                      !notification.isRead
                        ? "bg-blue-50/80 dark:bg-blue-950/20 border-blue-200/50 dark:border-blue-800/50 shadow-sm"
                        : "bg-background/50 hover:bg-accent/30"
                    }`}
                  >
                    <CardContent className="p-4 sm:p-5">
                      <div className="flex items-start gap-3 sm:gap-4">
                        <div className="flex-shrink-0 mt-0.5">
                          <div
                            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center ${
                              notification.type === "like"
                                ? "bg-red-100 dark:bg-red-950/30"
                                : notification.type === "comment"
                                  ? "bg-blue-100 dark:bg-blue-950/30"
                                  : notification.type === "follow"
                                    ? "bg-green-100 dark:bg-green-950/30"
                                    : "bg-purple-100 dark:bg-purple-950/30"
                            }`}
                          >
                            {getNotificationIcon(notification.type)}
                          </div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-semibold text-sm sm:text-base">{notification.title}</h4>
                                {!notification.isRead && (
                                  <Badge
                                    variant="secondary"
                                    className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full"
                                  >
                                    새로움
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                                {notification.message}
                              </p>
                              <p className="text-xs text-muted-foreground/80">
                                {new Date(notification.createdAt).toLocaleString("ko-KR", {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </p>
                            </div>

                            <div className="flex items-center gap-1 sm:gap-2 self-end sm:self-start">
                              {!notification.isRead && (
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleMarkAsRead(notification.id)}
                                  className="h-8 w-8 p-0 rounded-lg hover:bg-accent/50"
                                  title="읽음 처리"
                                >
                                  <Check className="h-4 w-4" />
                                </Button>
                              )}
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleDeleteNotification(notification.id)}
                                className="h-8 w-8 p-0 rounded-lg text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30"
                                title="삭제"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </ResponsiveLayout>
  )
}
