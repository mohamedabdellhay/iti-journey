"use client"

import { useRef, useEffect, useState } from "react"

import { Header } from "./header"
import { ChatInput } from "./chat-input"
import { ChatMessages } from "./chat-messages"

export interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

export function ChatInterface() {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleSendMessage = async (content: string) => {
    if (!content || content.trim() === "") return
    
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: content.trim(),
    }
    
    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            ...messages.map(m => ({
              role: m.role,
              parts: [{ type: "text", text: m.content }]
            })),
            {
              role: "user",
              parts: [{ type: "text", text: content.trim() }]
            }
          ]
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to send message")
      }

      const data = await response.json()
      
      // تحويل الرد من API format إلى Message format
      const allMessages: Message[] = data.map((msg: any) => ({
        id: msg.id,
        role: msg.role,
        content: msg.parts.map((p: any) => p.text).join(""),
      }))

      setMessages(allMessages)
    } catch (error) {
      console.error("Error sending message:", error)
      
      // إضافة رسالة خطأ
      setMessages(prev => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const hasMessages = messages.length > 0

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex flex-1 flex-col items-center justify-center px-4">
        {!hasMessages ? (
          <div className="flex w-full max-w-3xl flex-col items-center gap-8">
            <h1 className="text-3xl font-semibold text-foreground">
              What can I help with?
            </h1>
            <ChatInput onSend={handleSendMessage} isLoading={isLoading} />
          </div>
        ) : (
          <div className="flex w-full max-w-3xl flex-1 flex-col">
            <ChatMessages messages={messages} isLoading={isLoading} />
            <div className="sticky bottom-0 bg-background pb-6 pt-4">
              <ChatInput onSend={handleSendMessage} isLoading={isLoading} />
            </div>
            <div ref={messagesEndRef} />
          </div>
        )}
      </main>

      {!hasMessages && (
        <footer className="py-4 text-center text-sm text-muted-foreground">
          By messaging ChatGPT, you agree to our{" "}
          <a href="#" className="underline hover:text-foreground">
            Terms
          </a>{" "}
          and have read our{" "}
          <a href="#" className="underline hover:text-foreground">
            Privacy Policy
          </a>
          .
        </footer>
      )}
    </div>
  )
}