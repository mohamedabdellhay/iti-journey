"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Paperclip, Globe, Layers, AudioWaveform } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ChatInputProps {
  onSend: (message: string) => void
  isLoading: boolean
}

export function ChatInput({ onSend, isLoading }: ChatInputProps) {
  const [input, setInput] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [input])

  const handleSubmit = () => {
    if (input.trim() && !isLoading) {
      onSend(input.trim())
      setInput("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className="w-full rounded-3xl border border-border bg-secondary/50 p-3 shadow-sm">
      <textarea
        ref={textareaRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask anything"
        rows={1}
        className="max-h-48 w-full resize-none bg-transparent px-2 py-1 text-foreground placeholder:text-muted-foreground focus:outline-none"
        disabled={isLoading}
      />
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="size-9 rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground"
          >
            <Paperclip className="size-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="size-9 rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground"
          >
            <Globe className="size-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="size-9 rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground"
          >
            <Layers className="size-5" />
          </Button>
        </div>

        <Button
          onClick={handleSubmit}
          disabled={!input.trim() || isLoading}
          className="flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary/80 disabled:opacity-50"
        >
          <AudioWaveform className="size-4" />
          Voice
        </Button>
      </div>
    </div>
  )
}
