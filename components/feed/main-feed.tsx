"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { FeedSection } from "./feed-section"
import { mockPosts, getRecommendedPosts } from "@/lib/blog-data"
import { useToast } from "@/hooks/use-toast"

export function MainFeed() {
  const [posts, setPosts] = useState(mockPosts)
  const [displayedPosts, setDisplayedPosts] = useState<typeof mockPosts>([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const observerTarget = useRef<HTMLDivElement>(null)

  const POSTS_PER_PAGE = 12
  const recommendedPosts = getRecommendedPosts()

  const loadMorePosts = useCallback(() => {
    if (isLoading || !hasMore) return

    setIsLoading(true)
    setTimeout(() => {
      const startIndex = (page - 1) * POSTS_PER_PAGE
      const endIndex = startIndex + POSTS_PER_PAGE
      const newPosts = recommendedPosts.slice(startIndex, endIndex)

      if (newPosts.length === 0) {
        setHasMore(false)
      } else {
        setDisplayedPosts((prev) => [...prev, ...newPosts])
        setPage((prev) => prev + 1)
      }
      setIsLoading(false)
    }, 500)
  }, [page, isLoading, hasMore, recommendedPosts])

  useEffect(() => {
    // 초기 로드
    setDisplayedPosts(recommendedPosts.slice(0, POSTS_PER_PAGE))
    setPage(2)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMorePosts()
        }
      },
      { threshold: 0.1 },
    )

    const currentTarget = observerTarget.current
    if (currentTarget) {
      observer.observe(currentTarget)
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget)
      }
    }
  }, [loadMorePosts, hasMore, isLoading])

  const handleLike = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
          : post,
      ),
    )
    setDisplayedPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
          : post,
      ),
    )
  }

  const handleBookmark = (postId: string) => {
    setPosts((prev) => prev.map((post) => (post.id === postId ? { ...post, isBookmarked: !post.isBookmarked } : post)))
    setDisplayedPosts((prev) =>
      prev.map((post) => (post.id === postId ? { ...post, isBookmarked: !post.isBookmarked } : post)),
    )

    const post = posts.find((p) => p.id === postId)
    if (post) {
      toast({
        title: post.isBookmarked ? "북마크에서 제거됨" : "북마크에 추가됨",
        description: post.title,
      })
    }
  }

  const handleShare = (postId: string) => {
    const post = posts.find((p) => p.id === postId)
    if (post) {
      navigator.clipboard.writeText(`${window.location.origin}/post/${postId}`)
      toast({
        title: "링크 복사됨!",
        description: "게시물 링크가 클립보드에 복사되었습니다",
      })
    }
  }

  return (
    <div className="space-y-16 animate-fade-in">
      <section className="text-center space-y-6 py-8">
        <h1 className="text-4xl md:text-5xl font-light tracking-tight">생각을 나누는 공간</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          깊이 있는 글과 다양한 관점을 만나보세요
        </p>
      </section>

      <FeedSection
        title="추천 게시물"
        posts={displayedPosts}
        showAll
        onLike={handleLike}
        onBookmark={handleBookmark}
        onShare={handleShare}
        columns={3}
      />

      <div ref={observerTarget} className="flex justify-center py-8">
        {isLoading && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <div className="h-5 w-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <span>로딩 중...</span>
          </div>
        )}
        {!hasMore && displayedPosts.length > 0 && (
          <p className="text-muted-foreground text-sm">모든 게시물을 불러왔습니다</p>
        )}
      </div>
    </div>
  )
}
