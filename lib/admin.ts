export interface AdminUser {
  id: string
  email: string
  name: string
  role: "user" | "moderator" | "admin"
  status: "active" | "suspended" | "banned"
  joinedAt: string
  lastActive: string
  postsCount: number
  followersCount: number
}

export interface ReportedContent {
  id: string
  type: "post" | "comment" | "user"
  contentId: string
  reportedBy: string
  reason: string
  description: string
  status: "pending" | "reviewed" | "resolved" | "dismissed"
  createdAt: string
  reviewedBy?: string
  reviewedAt?: string
}

export interface SystemStats {
  totalUsers: number
  activeUsers: number
  totalPosts: number
  publishedPosts: number
  totalComments: number
  reportsCount: number
  userGrowth: { date: string; users: number }[]
  contentGrowth: { date: string; posts: number }[]
}

// Mock admin data
export const mockAdminUsers: AdminUser[] = [
  {
    id: "1",
    email: "john@example.com",
    name: "John Doe",
    role: "user",
    status: "active",
    joinedAt: "2024-01-15",
    lastActive: "2024-01-20",
    postsCount: 12,
    followersCount: 45,
  },
  {
    id: "2",
    email: "jane@example.com",
    name: "Jane Smith",
    role: "moderator",
    status: "active",
    joinedAt: "2024-01-10",
    lastActive: "2024-01-19",
    postsCount: 8,
    followersCount: 32,
  },
  {
    id: "3",
    email: "spam@example.com",
    name: "Spam User",
    role: "user",
    status: "suspended",
    joinedAt: "2024-01-18",
    lastActive: "2024-01-18",
    postsCount: 1,
    followersCount: 0,
  },
]

export const mockReportedContent: ReportedContent[] = [
  {
    id: "1",
    type: "post",
    contentId: "post-1",
    reportedBy: "user-123",
    reason: "spam",
    description: "This post contains spam content",
    status: "pending",
    createdAt: "2024-01-20T10:00:00Z",
  },
  {
    id: "2",
    type: "comment",
    contentId: "comment-1",
    reportedBy: "user-456",
    reason: "harassment",
    description: "Inappropriate language and harassment",
    status: "reviewed",
    createdAt: "2024-01-19T15:30:00Z",
    reviewedBy: "admin-1",
    reviewedAt: "2024-01-20T09:00:00Z",
  },
]

export const mockSystemStats: SystemStats = {
  totalUsers: 1247,
  activeUsers: 892,
  totalPosts: 3456,
  publishedPosts: 3201,
  totalComments: 8934,
  reportsCount: 23,
  userGrowth: [
    { date: "2024-01-14", users: 1180 },
    { date: "2024-01-15", users: 1195 },
    { date: "2024-01-16", users: 1210 },
    { date: "2024-01-17", users: 1225 },
    { date: "2024-01-18", users: 1235 },
    { date: "2024-01-19", users: 1242 },
    { date: "2024-01-20", users: 1247 },
  ],
  contentGrowth: [
    { date: "2024-01-14", posts: 3380 },
    { date: "2024-01-15", posts: 3395 },
    { date: "2024-01-16", posts: 3410 },
    { date: "2024-01-17", posts: 3425 },
    { date: "2024-01-18", posts: 3440 },
    { date: "2024-01-19", posts: 3450 },
    { date: "2024-01-20", posts: 3456 },
  ],
}

export function isAdmin(userRole: string): boolean {
  return userRole === "admin"
}

export function isModerator(userRole: string): boolean {
  return userRole === "moderator" || userRole === "admin"
}
