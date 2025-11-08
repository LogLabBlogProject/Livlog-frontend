"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { User, Mail, Calendar, Edit2, Save, X, Upload, Settings, Shield } from "lucide-react"
import { blogPosts } from "@/lib/blog-data"
import { ResponsiveLayout } from "@/components/layout/responsive-layout"

export default function ProfilePage() {
  const { user, updateProfile, logout } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [editedProfile, setEditedProfile] = useState({
    name: user?.name || "",
    username: user?.username || "",
    bio: user?.bio || "",
    avatar: user?.avatar || "",
  })

  useEffect(() => {
    if (!user) {
      router.push("/auth/login")
    } else {
      setIsLoading(false)
    }
  }, [user, router])

  if (isLoading || !user) {
    return (
      <ResponsiveLayout>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">로딩 중...</p>
          </div>
        </div>
      </ResponsiveLayout>
    )
  }

  const userPosts = blogPosts.filter((post) => post.author.username === user.username)
  const totalLikes = userPosts.reduce((sum, post) => sum + post.likes, 0)
  const totalComments = userPosts.reduce((sum, post) => sum + post.comments, 0)
  const totalViews = userPosts.reduce((sum, post) => sum + post.views, 0)

  const handleSave = async () => {
    setIsSaving(true)
    const result = await updateProfile(editedProfile)

    if (result.success) {
      toast({
        title: "프로필이 업데이트되었습니다",
        description: "프로필 정보가 성공적으로 저장되었습니다.",
      })
      setIsEditing(false)
    } else {
      toast({
        title: "오류가 발생했습니다",
        description: result.error || "프로필 업데이트에 실패했습니다.",
        variant: "destructive",
      })
    }
    setIsSaving(false)
  }

  const handleCancel = () => {
    setEditedProfile({
      name: user.name,
      username: user.username,
      bio: user.bio || "",
      avatar: user.avatar || "",
    })
    setIsEditing(false)
  }

  const handleLogout = () => {
    logout()
    router.push("/")
    toast({
      title: "로그아웃되었습니다",
      description: "성공적으로 로그아웃되었습니다.",
    })
  }

  return (
    <ResponsiveLayout>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-6 max-w-5xl">
          {/* Profile Header */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Avatar Section */}
                <div className="flex flex-col items-center md:items-start gap-4">
                  <Avatar className="h-32 w-32">
                    <AvatarImage src={isEditing ? editedProfile.avatar : user.avatar} />
                    <AvatarFallback className="text-3xl">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button variant="outline" size="sm" className="w-full md:w-auto bg-transparent">
                      <Upload className="h-4 w-4 mr-2" />
                      사진 변경
                    </Button>
                  )}
                </div>

                {/* Profile Info */}
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div className="flex-1">
                      {isEditing ? (
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">이름</Label>
                            <Input
                              id="name"
                              value={editedProfile.name}
                              onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                              placeholder="이름을 입력하세요"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="username">사용자명</Label>
                            <Input
                              id="username"
                              value={editedProfile.username}
                              onChange={(e) => setEditedProfile({ ...editedProfile, username: e.target.value })}
                              placeholder="사용자명을 입력하세요"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="bio">자기소개</Label>
                            <Textarea
                              id="bio"
                              value={editedProfile.bio}
                              onChange={(e) => setEditedProfile({ ...editedProfile, bio: e.target.value })}
                              placeholder="자기소개를 입력하세요"
                              rows={3}
                            />
                          </div>
                        </div>
                      ) : (
                        <>
                          <h1 className="text-2xl md:text-3xl font-bold mb-2">{user.name}</h1>
                          <p className="text-muted-foreground mb-3">@{user.username}</p>
                          {user.bio && <p className="text-muted-foreground mb-4 text-pretty">{user.bio}</p>}

                          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                            <div className="flex items-center gap-1">
                              <Mail className="h-4 w-4" />
                              {user.email}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              가입일 {new Date(user.createdAt).toLocaleDateString("ko-KR")}
                            </div>
                            {user.role && user.role !== "user" && (
                              <Badge variant="secondary" className="flex items-center gap-1">
                                <Shield className="h-3 w-3" />
                                {user.role === "admin" ? "관리자" : "모더레이터"}
                              </Badge>
                            )}
                          </div>

                          <div className="flex items-center gap-6 text-sm">
                            <div>
                              <span className="font-semibold">{user.followers.toLocaleString()}</span>
                              <span className="text-muted-foreground ml-1">팔로워</span>
                            </div>
                            <div>
                              <span className="font-semibold">{user.following.toLocaleString()}</span>
                              <span className="text-muted-foreground ml-1">팔로잉</span>
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      {isEditing ? (
                        <>
                          <Button onClick={handleSave} disabled={isSaving} size="sm">
                            <Save className="h-4 w-4 mr-2" />
                            {isSaving ? "저장 중..." : "저장"}
                          </Button>
                          <Button onClick={handleCancel} variant="outline" size="sm">
                            <X className="h-4 w-4 mr-2" />
                            취소
                          </Button>
                        </>
                      ) : (
                        <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
                          <Edit2 className="h-4 w-4 mr-2" />
                          프로필 편집
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary">{userPosts.length}</div>
                <div className="text-sm text-muted-foreground">게시물</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary">{totalLikes.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">좋아요</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary">{totalComments.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">댓글</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary">{totalViews.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">조회수</div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs Section */}
          <Tabs defaultValue="activity" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="activity">활동</TabsTrigger>
              <TabsTrigger value="posts">게시물 ({userPosts.length})</TabsTrigger>
              <TabsTrigger value="settings">설정</TabsTrigger>
            </TabsList>

            <TabsContent value="activity" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>최근 활동</CardTitle>
                  <CardDescription>최근 활동 내역을 확인하세요</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userPosts.slice(0, 5).map((post) => (
                      <div
                        key={post.id}
                        className="flex items-start gap-4 p-4 rounded-lg border hover:bg-accent/50 transition-colors"
                      >
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium mb-1 line-clamp-1">{post.title}</h4>
                          <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                            <span>{new Date(post.publishedAt).toLocaleDateString("ko-KR")}</span>
                            <span>조회수 {post.views.toLocaleString()}</span>
                            <span>좋아요 {post.likes.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                    {userPosts.length === 0 && (
                      <div className="text-center py-8">
                        <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">아직 게시물이 없습니다</h3>
                        <p className="text-muted-foreground mb-4">첫 번째 게시물을 작성해보세요!</p>
                        <Button onClick={() => router.push("/write")}>
                          <Edit2 className="h-4 w-4 mr-2" />
                          글쓰기
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="posts" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>내 게시물</CardTitle>
                  <CardDescription>작성한 모든 게시물을 확인하세요</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userPosts.map((post) => (
                      <div
                        key={post.id}
                        className="flex items-start gap-4 p-4 rounded-lg border hover:bg-accent/50 transition-colors"
                      >
                        {post.coverImage && (
                          <img
                            src={post.coverImage || "/placeholder.svg"}
                            alt={post.title}
                            className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-lg flex-shrink-0"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium mb-1 line-clamp-1">{post.title}</h4>
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{post.excerpt}</p>
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            {post.tags.slice(0, 3).map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>{new Date(post.publishedAt).toLocaleDateString("ko-KR")}</span>
                            <span>조회수 {post.views.toLocaleString()}</span>
                            <span>좋아요 {post.likes.toLocaleString()}</span>
                            <span>댓글 {post.comments.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                    {userPosts.length === 0 && (
                      <div className="text-center py-8">
                        <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">아직 게시물이 없습니다</h3>
                        <p className="text-muted-foreground mb-4">첫 번째 게시물을 작성해보세요!</p>
                        <Button onClick={() => router.push("/write")}>
                          <Edit2 className="h-4 w-4 mr-2" />
                          글쓰기
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="mt-6">
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>계정 설정</CardTitle>
                    <CardDescription>계정 관련 설정을 관리하세요</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-lg border">
                      <div>
                        <h4 className="font-medium">이메일 주소</h4>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        변경
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-lg border">
                      <div>
                        <h4 className="font-medium">비밀번호</h4>
                        <p className="text-sm text-muted-foreground">마지막 변경: 30일 전</p>
                      </div>
                      <Button variant="outline" size="sm">
                        변경
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>알림 설정</CardTitle>
                    <CardDescription>알림 수신 방법을 설정하세요</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-lg border">
                      <div>
                        <h4 className="font-medium">이메일 알림</h4>
                        <p className="text-sm text-muted-foreground">새 댓글 및 좋아요 알림</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-lg border">
                      <div>
                        <h4 className="font-medium">푸시 알림</h4>
                        <p className="text-sm text-muted-foreground">브라우저 알림 설정</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>계정 관리</CardTitle>
                    <CardDescription>계정 관련 작업을 수행하세요</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button onClick={handleLogout} variant="destructive" className="w-full">
                      로그아웃
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ResponsiveLayout>
  )
}
