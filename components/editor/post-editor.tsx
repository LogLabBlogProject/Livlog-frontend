"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RichTextEditor } from "./rich-text-editor"
import { MediaUpload } from "./media-upload"
import { usePostManagement } from "@/lib/post-management"
import { mockCategories } from "@/lib/blog-data"
import { useToast } from "@/hooks/use-toast"
import { Save, Send, CalendarIcon, EyeOff, Users, Globe, Clock, X, Plus } from "lucide-react"
import { format } from "date-fns"

export function PostEditor() {
  const { currentDraft, saveDraft, publishPost, autoSave, setAutoSave } = usePostManagement()
  const { toast } = useToast()

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [coverImage, setCoverImage] = useState("")
  const [category, setCategory] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  const [visibility, setVisibility] = useState<"public" | "private" | "followers-only">("public")
  const [scheduledDate, setScheduledDate] = useState<Date>()
  const [isScheduled, setIsScheduled] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isPublishing, setIsPublishing] = useState(false)

  // Load current draft data
  useEffect(() => {
    if (currentDraft) {
      setTitle(currentDraft.title)
      setContent(currentDraft.content)
      setExcerpt(currentDraft.excerpt)
      setCoverImage(currentDraft.coverImage || "")
      setCategory(currentDraft.category)
      setTags(currentDraft.tags)
      setVisibility(currentDraft.visibility)
      if (currentDraft.scheduledAt) {
        setScheduledDate(new Date(currentDraft.scheduledAt))
        setIsScheduled(true)
      }
    }
  }, [currentDraft])

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await saveDraft({
        title,
        content,
        excerpt,
        coverImage,
        category,
        tags,
        visibility,
        scheduledAt: isScheduled && scheduledDate ? scheduledDate.toISOString() : undefined,
      })
      toast({
        title: "Draft saved",
        description: "Your post has been saved as a draft",
      })
    } catch (error) {
      toast({
        title: "Error saving draft",
        description: "Please try again",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handlePublish = async () => {
    if (!title.trim() || !content.trim()) {
      toast({
        title: "Missing required fields",
        description: "Please add a title and content before publishing",
        variant: "destructive",
      })
      return
    }

    setIsPublishing(true)
    try {
      // Save first
      const draftId = await saveDraft({
        title,
        content,
        excerpt,
        coverImage,
        category,
        tags,
        visibility,
        scheduledAt: isScheduled && scheduledDate ? scheduledDate.toISOString() : undefined,
      })

      // Then publish
      const success = await publishPost(draftId, isScheduled && scheduledDate ? scheduledDate.toISOString() : undefined)

      if (success) {
        toast({
          title: isScheduled ? "Post scheduled" : "Post published",
          description: isScheduled
            ? `Your post will be published on ${format(scheduledDate!, "PPP")}`
            : "Your post is now live",
        })

        // Reset form
        setTitle("")
        setContent("")
        setExcerpt("")
        setCoverImage("")
        setCategory("")
        setTags([])
        setVisibility("public")
        setScheduledDate(undefined)
        setIsScheduled(false)
      }
    } catch (error) {
      toast({
        title: "Error publishing post",
        description: "Please try again",
        variant: "destructive",
      })
    } finally {
      setIsPublishing(false)
    }
  }

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleImageSelect = (url: string, alt?: string) => {
    setCoverImage(url)
  }

  const getVisibilityIcon = () => {
    switch (visibility) {
      case "public":
        return <Globe className="h-4 w-4" />
      case "private":
        return <EyeOff className="h-4 w-4" />
      case "followers-only":
        return <Users className="h-4 w-4" />
    }
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold">글쓰기</h1>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-2 px-3 py-2 sm:px-0 sm:py-0">
            <Switch checked={autoSave} onCheckedChange={setAutoSave} id="auto-save" />
            <Label htmlFor="auto-save" className="text-sm whitespace-nowrap">
              자동 저장
            </Label>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleSave}
              disabled={isSaving}
              className="flex-1 sm:flex-none bg-transparent"
            >
              <Save className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">{isSaving ? "저장 중..." : "임시저장"}</span>
              <span className="sm:hidden">{isSaving ? "저장 중..." : "저장"}</span>
            </Button>
            <Button onClick={handlePublish} disabled={isPublishing} className="flex-1 sm:flex-none">
              {isScheduled ? <Clock className="h-4 w-4 mr-2" /> : <Send className="h-4 w-4 mr-2" />}
              <span className="hidden sm:inline">
                {isPublishing ? "발행 중..." : isScheduled ? "예약 발행" : "발행하기"}
              </span>
              <span className="sm:hidden">{isPublishing ? "발행 중..." : "발행"}</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Main Editor */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">제목</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="게시물 제목을 입력하세요..."
              className="text-base sm:text-lg font-semibold"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">요약</Label>
            <Textarea
              id="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="게시물에 대한 간단한 설명을 작성하세요..."
              rows={3}
              className="resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label>내용</Label>
            <RichTextEditor value={content} onChange={setContent} placeholder="게시물 내용을 작성하세요..." />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4 sm:space-y-6">
          {/* Publishing Options */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">발행 설정</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>공개 범위</Label>
                <Select value={visibility} onValueChange={(value: any) => setVisibility(value)}>
                  <SelectTrigger>
                    <SelectValue>
                      <div className="flex items-center gap-2">
                        {getVisibilityIcon()}
                        <span className="capitalize">
                          {visibility === "public"
                            ? "전체 공개"
                            : visibility === "followers-only"
                              ? "팔로워 공개"
                              : "비공개"}
                        </span>
                      </div>
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        전체 공개
                      </div>
                    </SelectItem>
                    <SelectItem value="followers-only">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        팔로워 공개
                      </div>
                    </SelectItem>
                    <SelectItem value="private">
                      <div className="flex items-center gap-2">
                        <EyeOff className="h-4 w-4" />
                        비공개
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="schedule" checked={isScheduled} onCheckedChange={setIsScheduled} />
                <Label htmlFor="schedule">예약 발행</Label>
              </div>

              {isScheduled && (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {scheduledDate ? format(scheduledDate, "PPP") : "날짜 선택"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={scheduledDate} onSelect={setScheduledDate} initialFocus />
                  </PopoverContent>
                </Popover>
              )}
            </CardContent>
          </Card>

          {/* Cover Image */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">커버 이미지</CardTitle>
            </CardHeader>
            <CardContent>
              {coverImage ? (
                <div className="space-y-3">
                  <div className="relative aspect-video rounded-lg overflow-hidden">
                    <img src={coverImage || "/placeholder.svg"} alt="Cover" className="w-full h-full object-cover" />
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => setCoverImage("")}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <MediaUpload
                  onImageSelect={handleImageSelect}
                  trigger={
                    <Button variant="outline" className="w-full bg-transparent">
                      <Plus className="h-4 w-4 mr-2" />
                      커버 이미지 추가
                    </Button>
                  }
                />
              )}
            </CardContent>
          </Card>

          {/* Category */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">카테고리</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="카테고리 선택" />
                </SelectTrigger>
                <SelectContent>
                  {mockCategories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.name}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">태그</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex gap-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="태그 추가..."
                  onKeyPress={(e) => e.key === "Enter" && addTag()}
                />
                <Button onClick={addTag} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="gap-1">
                      {tag}
                      <button onClick={() => removeTag(tag)}>
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
