"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

export interface Draft {
  id: string
  title: string
  content: string
  excerpt: string
  coverImage?: string
  tags: string[]
  category: string
  visibility: "public" | "private" | "followers-only"
  scheduledAt?: string
  createdAt: string
  updatedAt: string
  wordCount: number
  readTime: number
}

export interface PostManagementContextType {
  drafts: Draft[]
  currentDraft: Draft | null
  saveDraft: (draft: Partial<Draft>) => Promise<string>
  loadDraft: (id: string) => void
  deleteDraft: (id: string) => void
  publishPost: (draftId: string, scheduledAt?: string) => Promise<boolean>
  autoSave: boolean
  setAutoSave: (enabled: boolean) => void
}

const PostManagementContext = createContext<PostManagementContextType | undefined>(undefined)

const defaultDraft: Omit<Draft, "id" | "createdAt" | "updatedAt"> = {
  title: "",
  content: "",
  excerpt: "",
  tags: [],
  category: "",
  visibility: "public",
  wordCount: 0,
  readTime: 0,
}

export function PostManagementProvider({ children }: { children: React.ReactNode }) {
  const [drafts, setDrafts] = useState<Draft[]>([])
  const [currentDraft, setCurrentDraft] = useState<Draft | null>(null)
  const [autoSave, setAutoSave] = useState(true)

  // Load drafts from localStorage on mount
  useEffect(() => {
    const savedDrafts = localStorage.getItem("blog-drafts")
    if (savedDrafts) {
      setDrafts(JSON.parse(savedDrafts))
    }
  }, [])

  // Save drafts to localStorage whenever drafts change
  useEffect(() => {
    localStorage.setItem("blog-drafts", JSON.stringify(drafts))
  }, [drafts])

  // Auto-save current draft
  useEffect(() => {
    if (!autoSave || !currentDraft) return

    const autoSaveInterval = setInterval(() => {
      if (currentDraft.title || currentDraft.content) {
        saveDraft(currentDraft)
      }
    }, 30000) // Auto-save every 30 seconds

    return () => clearInterval(autoSaveInterval)
  }, [currentDraft, autoSave])

  const calculateReadTime = (content: string): number => {
    const wordsPerMinute = 200
    const wordCount = content.split(/\s+/).filter((word) => word.length > 0).length
    return Math.ceil(wordCount / wordsPerMinute)
  }

  const saveDraft = async (draftData: Partial<Draft>): Promise<string> => {
    const now = new Date().toISOString()
    const wordCount = draftData.content ? draftData.content.split(/\s+/).filter((word) => word.length > 0).length : 0
    const readTime = draftData.content ? calculateReadTime(draftData.content) : 0

    if (currentDraft?.id) {
      // Update existing draft
      const updatedDraft: Draft = {
        ...currentDraft,
        ...draftData,
        updatedAt: now,
        wordCount,
        readTime,
      }

      setDrafts((prev) => prev.map((d) => (d.id === currentDraft.id ? updatedDraft : d)))
      setCurrentDraft(updatedDraft)
      return currentDraft.id
    } else {
      // Create new draft
      const newDraft: Draft = {
        ...defaultDraft,
        ...draftData,
        id: Date.now().toString(),
        createdAt: now,
        updatedAt: now,
        wordCount,
        readTime,
      }

      setDrafts((prev) => [...prev, newDraft])
      setCurrentDraft(newDraft)
      return newDraft.id
    }
  }

  const loadDraft = (id: string) => {
    const draft = drafts.find((d) => d.id === id)
    if (draft) {
      setCurrentDraft(draft)
    }
  }

  const deleteDraft = (id: string) => {
    setDrafts((prev) => prev.filter((d) => d.id !== id))
    if (currentDraft?.id === id) {
      setCurrentDraft(null)
    }
  }

  const publishPost = async (draftId: string, scheduledAt?: string): Promise<boolean> => {
    // Mock publishing - in real app, this would be an API call
    const draft = drafts.find((d) => d.id === draftId)
    if (!draft) return false

    // Remove from drafts after publishing
    setDrafts((prev) => prev.filter((d) => d.id !== draftId))
    if (currentDraft?.id === draftId) {
      setCurrentDraft(null)
    }

    return true
  }

  return (
    <PostManagementContext.Provider
      value={{
        drafts,
        currentDraft,
        saveDraft,
        loadDraft,
        deleteDraft,
        publishPost,
        autoSave,
        setAutoSave,
      }}
    >
      {children}
    </PostManagementContext.Provider>
  )
}

export function usePostManagement() {
  const context = useContext(PostManagementContext)
  if (context === undefined) {
    throw new Error("usePostManagement must be used within a PostManagementProvider")
  }
  return context
}
