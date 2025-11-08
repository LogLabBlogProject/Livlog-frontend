export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  author: {
    id: string
    name: string
    username: string
    avatar: string
  }
  coverImage: string
  tags: string[]
  category: string
  publishedAt: string
  readTime: number
  likes: number
  comments: number
  bookmarks: number
  isLiked: boolean
  isBookmarked: boolean
  featured: boolean
}

export interface BlogCategory {
  id: string
  name: string
  slug: string
  count: number
}

// Mock users data
const mockUsers = [
  { id: "4", name: "사라 김", username: "sarahkim", avatar: "/placeholder.svg?height=40&width=40" },
  { id: "5", name: "알렉스 이", username: "alexlee", avatar: "/placeholder.svg?height=40&width=40" },
  { id: "6", name: "엠마 최", username: "emmachoi", avatar: "/placeholder.svg?height=40&width=40" },
  { id: "8", name: "리사 정", username: "lisajung", avatar: "/placeholder.svg?height=40&width=40" },
  // Add more users as needed
]

// Mock blog posts data
export const mockPosts: BlogPost[] = [
  {
    id: "1",
    title: "2024년 웹 개발 트렌드: 주목해야 할 기술들",
    excerpt: "AI 통합부터 새로운 프레임워크까지, 웹 개발의 미래를 형성하는 최신 트렌드와 기술을 탐구합니다.",
    content: "전체 기사 내용...",
    author: {
      id: "4",
      name: "사라 김",
      username: "sarahkim",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    coverImage: "/web-development-futuristic.jpg",
    tags: ["웹개발", "기술", "AI", "프레임워크"],
    category: "기술",
    publishedAt: "2024-01-15T10:00:00Z",
    readTime: 8,
    likes: 234,
    comments: 45,
    bookmarks: 67,
    isLiked: false,
    isBookmarked: false,
    featured: true,
  },
  {
    id: "2",
    title: "React 서버 컴포넌트 완전 정복 가이드",
    excerpt: "React 서버 컴포넌트에 대한 심층 분석과 React 애플리케이션 구축 방식의 혁신적 변화를 알아봅니다.",
    content: "전체 기사 내용...",
    author: {
      id: "5",
      name: "알렉스 이",
      username: "alexlee",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    coverImage: "/react-server-components.png",
    tags: ["React", "서버컴포넌트", "JavaScript", "프론트엔드"],
    category: "개발",
    publishedAt: "2024-01-14T14:30:00Z",
    readTime: 12,
    likes: 189,
    comments: 32,
    bookmarks: 89,
    isLiked: true,
    isBookmarked: true,
    featured: true,
  },
  {
    id: "3",
    title: "확장 가능한 디자인 시스템: 엔터프라이즈 레벨에서의 교훈",
    excerpt: "조직과 함께 성장하고 여러 팀을 지원할 수 있는 디자인 시스템을 만들고 유지하는 방법을 알아봅니다.",
    content: "전체 기사 내용...",
    author: {
      id: "4",
      name: "사라 김",
      username: "sarahkim",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    coverImage: "/design-system-enterprise.jpg",
    tags: ["디자인시스템", "UX", "엔터프라이즈", "확장성"],
    category: "디자인",
    publishedAt: "2024-01-13T09:15:00Z",
    readTime: 10,
    likes: 156,
    comments: 28,
    bookmarks: 45,
    isLiked: false,
    isBookmarked: false,
    featured: false,
  },
  {
    id: "4",
    title: "지속 가능한 스타트업 구축하기: 창업자의 여정",
    excerpt: "일과 삶의 균형을 유지하면서 지속 가능한 성장 방식으로 성공적인 스타트업을 구축한 경험을 공유합니다.",
    content: "전체 기사 내용...",
    author: {
      id: "6",
      name: "엠마 최",
      username: "emmachoi",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    coverImage: "/startup-sustainable-business.jpg",
    tags: ["스타트업", "창업", "비즈니스", "지속가능성"],
    category: "비즈니스",
    publishedAt: "2024-01-12T16:45:00Z",
    readTime: 15,
    likes: 298,
    comments: 67,
    bookmarks: 123,
    isLiked: true,
    isBookmarked: false,
    featured: true,
  },
  {
    id: "5",
    title: "디지털 시대의 미니멀 라이프",
    excerpt: "점점 더 연결되는 디지털 세상에서 미니멀리즘을 실천하는 방법을 알아봅니다.",
    content: "전체 기사 내용...",
    author: {
      id: "8",
      name: "리사 정",
      username: "lisajung",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    coverImage: "/minimalist-lifestyle-digital.jpg",
    tags: ["라이프스타일", "미니멀리즘", "디지털웰니스", "생산성"],
    category: "라이프스타일",
    publishedAt: "2024-01-11T11:20:00Z",
    readTime: 6,
    likes: 167,
    comments: 23,
    bookmarks: 78,
    isLiked: false,
    isBookmarked: true,
    featured: false,
  },
  ...Array.from({ length: 95 }, (_, i) => ({
    id: (i + 6).toString(),
    title: `블로그 포스트 ${i + 6}: ${["기술", "디자인", "비즈니스", "라이프스타일", "여행", "음식", "건강", "금융"][i % 8]} 관련 내용`,
    excerpt: `이것은 ${i + 6}번째 블로그 포스트의 요약입니다. 다양한 주제에 대한 흥미로운 내용을 다룹니다.`,
    content: "전체 기사 내용...",
    author: {
      id: mockUsers[i % mockUsers.length].id,
      name: mockUsers[i % mockUsers.length].name,
      username: mockUsers[i % mockUsers.length].username,
      avatar: mockUsers[i % mockUsers.length].avatar || "/placeholder.svg?height=40&width=40",
    },
    coverImage: `/placeholder.svg?height=300&width=600&query=blog post ${i + 6}`,
    tags: [
      ["기술", "개발"],
      ["디자인", "UX"],
      ["비즈니스", "창업"],
      ["라이프스타일", "건강"],
      ["여행", "문화"],
      ["음식", "요리"],
      ["건강", "웰니스"],
      ["금융", "투자"],
    ][i % 8],
    category: ["기술", "디자인", "비즈니스", "라이프스타일", "여행", "음식", "건강", "금융"][i % 8],
    publishedAt: new Date(
      2024,
      0,
      Math.floor(Math.random() * 30) + 1,
      Math.floor(Math.random() * 24),
      Math.floor(Math.random() * 60),
    ).toISOString(),
    readTime: Math.floor(Math.random() * 15) + 3,
    likes: Math.floor(Math.random() * 500) + 10,
    comments: Math.floor(Math.random() * 100) + 5,
    bookmarks: Math.floor(Math.random() * 200) + 5,
    isLiked: Math.random() > 0.7,
    isBookmarked: Math.random() > 0.8,
    featured: Math.random() > 0.9,
  })),
]

export const mockCategories: BlogCategory[] = [
  { id: "1", name: "기술", slug: "technology", count: 42 },
  { id: "2", name: "디자인", slug: "design", count: 28 },
  { id: "3", name: "비즈니스", slug: "business", count: 35 },
  { id: "4", name: "라이프스타일", slug: "lifestyle", count: 19 },
  { id: "5", name: "개발", slug: "development", count: 56 },
  { id: "6", name: "여행", slug: "travel", count: 23 },
  { id: "7", name: "음식", slug: "food", count: 31 },
  { id: "8", name: "건강", slug: "health", count: 17 },
  { id: "9", name: "금융", slug: "finance", count: 25 },
]

// Helper functions
export function getFeaturedPosts(): BlogPost[] {
  return mockPosts.filter((post) => post.featured)
}

export function getPostsByCategory(category: string): BlogPost[] {
  return mockPosts.filter((post) => post.category.toLowerCase() === category.toLowerCase())
}

export function getTrendingPosts(): BlogPost[] {
  return [...mockPosts].sort((a, b) => b.likes - a.likes).slice(0, 6)
}

export function getRecommendedPosts(): BlogPost[] {
  return [...mockPosts].sort((a, b) => b.readTime - a.readTime).slice(0, 6)
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

  if (diffInHours < 1) return "방금 전"
  if (diffInHours < 24) return `${diffInHours}시간 전`
  if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}일 전`
  return date.toLocaleDateString("ko-KR")
}

export const blogPosts = mockPosts
