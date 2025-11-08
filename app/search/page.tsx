"use client"

import { useState } from "react"
import { Search, SlidersHorizontal, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { blogPosts } from "@/lib/blog-data"
import { MobilePostCard } from "@/components/feed/mobile-post-card"
import { DesktopPostCard } from "@/components/feed/desktop-post-card"
import { useMobile } from "@/hooks/use-mobile"
import { ResponsiveLayout } from "@/components/layout/responsive-layout"

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("latest")
  const [dateRange, setDateRange] = useState("all")
  const [mediaType, setMediaType] = useState("all")
  const [showFilters, setShowFilters] = useState(false)
  const isMobile = useMobile()

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesMediaType =
      mediaType === "all" ||
      (mediaType === "image" && post.coverImage) ||
      (mediaType === "video" && post.coverImage?.includes("video")) ||
      (mediaType === "text" && !post.coverImage)

    const postDate = new Date(post.publishedAt)
    const now = new Date()
    const daysDiff = Math.floor((now.getTime() - postDate.getTime()) / (1000 * 60 * 60 * 24))

    const matchesDateRange =
      dateRange === "all" ||
      (dateRange === "today" && daysDiff === 0) ||
      (dateRange === "week" && daysDiff <= 7) ||
      (dateRange === "month" && daysDiff <= 30) ||
      (dateRange === "year" && daysDiff <= 365)

    return matchesSearch && matchesMediaType && matchesDateRange
  })

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case "popular":
        return b.likes - a.likes
      case "comments":
        return b.comments - a.comments
      case "oldest":
        return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()
      default:
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    }
  })

  const activeFiltersCount = [sortBy !== "latest", dateRange !== "all", mediaType !== "all"].filter(Boolean).length

  return (
    <ResponsiveLayout>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-6 max-w-6xl">
          <div className="mb-8 space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  placeholder="글, 작성자, 태그 검색..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 text-base rounded-xl border-border/50 focus:border-primary/50 bg-card/50"
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-accent/50 rounded-lg"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <Button
                variant={showFilters ? "default" : "outline"}
                onClick={() => setShowFilters(!showFilters)}
                className="h-12 px-6 rounded-xl font-medium relative"
              >
                <SlidersHorizontal className="h-5 w-5 mr-2" />
                필터
                {activeFiltersCount > 0 && (
                  <Badge className="ml-2 h-5 w-5 p-0 flex items-center justify-center rounded-full bg-primary text-primary-foreground">
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
            </div>

            {showFilters && (
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 space-y-4 animate-slide-down">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">정렬 기준</label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="h-11 rounded-lg bg-background/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="latest">최신순</SelectItem>
                        <SelectItem value="oldest">오래된순</SelectItem>
                        <SelectItem value="popular">인기순</SelectItem>
                        <SelectItem value="comments">댓글 많은 순</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">날짜 범위</label>
                    <Select value={dateRange} onValueChange={setDateRange}>
                      <SelectTrigger className="h-11 rounded-lg bg-background/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">전체 기간</SelectItem>
                        <SelectItem value="today">오늘</SelectItem>
                        <SelectItem value="week">이번 주</SelectItem>
                        <SelectItem value="month">이번 달</SelectItem>
                        <SelectItem value="year">올해</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">미디어 유형</label>
                    <Select value={mediaType} onValueChange={setMediaType}>
                      <SelectTrigger className="h-11 rounded-lg bg-background/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">모든 유형</SelectItem>
                        <SelectItem value="image">이미지</SelectItem>
                        <SelectItem value="video">비디오</SelectItem>
                        <SelectItem value="text">텍스트만</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSortBy("latest")
                      setDateRange("all")
                      setMediaType("all")
                    }}
                    className="rounded-lg"
                  >
                    초기화
                  </Button>
                  <Button size="sm" onClick={() => setShowFilters(false)} className="rounded-lg">
                    적용
                  </Button>
                </div>
              </div>
            )}
          </div>

          {searchQuery && (
            <div className="mb-6 pb-6 border-b border-border/50">
              <h2 className="text-xl font-semibold mb-3">
                <span className="text-primary">"{searchQuery}"</span>에 대한{" "}
                <span className="text-primary">{sortedPosts.length}개</span> 결과
              </h2>
              {activeFiltersCount > 0 && (
                <div className="flex flex-wrap gap-2">
                  {sortBy !== "latest" && (
                    <Badge variant="secondary" className="rounded-lg">
                      정렬: {sortBy === "popular" ? "인기순" : sortBy === "comments" ? "댓글순" : "오래된순"}
                    </Badge>
                  )}
                  {dateRange !== "all" && (
                    <Badge variant="secondary" className="rounded-lg">
                      기간:{" "}
                      {dateRange === "today"
                        ? "오늘"
                        : dateRange === "week"
                          ? "이번 주"
                          : dateRange === "month"
                            ? "이번 달"
                            : "올해"}
                    </Badge>
                  )}
                  {mediaType !== "all" && (
                    <Badge variant="secondary" className="rounded-lg">
                      유형: {mediaType === "image" ? "이미지" : mediaType === "video" ? "비디오" : "텍스트"}
                    </Badge>
                  )}
                </div>
              )}
            </div>
          )}

          {searchQuery === "" ? (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted/50 mb-4">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">검색 시작하기</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                키워드를 입력하여 글, 작성자 또는 주제를 찾아보세요
              </p>
            </div>
          ) : sortedPosts.length === 0 ? (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted/50 mb-4">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">결과를 찾을 수 없습니다</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">검색어나 필터를 조정해보세요</p>
              <Button variant="outline" onClick={() => setSearchQuery("")} className="rounded-xl">
                검색 지우기
              </Button>
            </div>
          ) : (
            <div
              className={isMobile ? "grid grid-cols-1 gap-6" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"}
            >
              {sortedPosts.map((post) =>
                isMobile ? <MobilePostCard key={post.id} post={post} /> : <DesktopPostCard key={post.id} post={post} />,
              )}
            </div>
          )}
        </div>
      </div>
    </ResponsiveLayout>
  )
}
