"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Send, MoreVertical, Home, HelpCircle, User, MessageCircle } from "lucide-react"
import Link from "next/link"

// サンプルデータ
const chatData = {
  user: {
    nickname: "ベテランママ",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  messages: [
    {
      id: 1,
      senderId: "other",
      content: "こんにちは！ベビーベッドの件でメッセージさせていただきました。",
      timestamp: "14:30",
      date: "今日",
    },
    {
      id: 2,
      senderId: "me",
      content: "こんにちは！ご連絡ありがとうございます。ベビーベッドはまだ募集中です。",
      timestamp: "14:32",
      date: "今日",
    },
    {
      id: 3,
      senderId: "other",
      content: "ありがとうございます！状態はいかがでしょうか？傷や汚れなどはありますか？",
      timestamp: "14:35",
      date: "今日",
    },
    {
      id: 4,
      senderId: "me",
      content: "使用感はありますが、大きな傷や汚れはありません。写真を追加で撮影しましたので、投稿を更新しますね。",
      timestamp: "14:38",
      date: "今日",
    },
    {
      id: 5,
      senderId: "other",
      content: "ありがとうございます！確認させていただきます。受け渡しは光が丘公園付近でお願いできますでしょうか？",
      timestamp: "14:40",
      date: "今日",
    },
    {
      id: 6,
      senderId: "me",
      content: "光が丘公園でしたら大丈夫です。土日の午前中はいかがでしょうか？",
      timestamp: "14:42",
      date: "今日",
    },
    {
      id: 7,
      senderId: "other",
      content: "土曜日の午前中でお願いします！10時頃はいかがでしょうか？",
      timestamp: "14:45",
      date: "今日",
    },
    {
      id: 8,
      senderId: "me",
      content: "土曜日の10時で大丈夫です。公園の正面入り口でお待ちしています。",
      timestamp: "14:47",
      date: "今日",
    },
  ],
}

export default function ChatScreen() {
  const [newMessage, setNewMessage] = useState("")
  const [messages, setMessages] = useState(chatData.messages)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const now = new Date()
      const timestamp = `${now.getHours()}:${now.getMinutes().toString().padStart(2, "0")}`

      const message = {
        id: messages.length + 1,
        senderId: "me",
        content: newMessage.trim(),
        timestamp,
        date: "今日",
      }

      setMessages([...messages, message])
      setNewMessage("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-green-100 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link href="/messages">
                <Button variant="ghost" size="sm" className="p-1">
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                </Button>
              </Link>
              <div className="flex items-center space-x-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={chatData.user.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-green-100 text-green-700">
                    {chatData.user.nickname.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-lg font-bold text-green-700">{chatData.user.nickname}</h1>
                </div>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="p-2">
              <MoreVertical className="w-5 h-5 text-gray-600" />
            </Button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 max-w-md mx-auto w-full px-4 py-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message, index) => {
            const isMe = message.senderId === "me"
            const showDate = index === 0 || messages[index - 1].date !== message.date

            return (
              <div key={message.id}>
                {showDate && (
                  <div className="text-center my-4">
                    <span className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full">{message.date}</span>
                  </div>
                )}
                <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`flex items-end space-x-2 max-w-[80%] ${isMe ? "flex-row-reverse space-x-reverse" : ""}`}
                  >
                    {!isMe && (
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={chatData.user.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-green-100 text-green-700 text-xs">
                          {chatData.user.nickname.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={`px-4 py-2 rounded-2xl ${
                        isMe
                          ? "bg-green-500 text-white rounded-br-md"
                          : "bg-white border border-gray-200 text-gray-900 rounded-bl-md"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.content}</p>
                      <p className={`text-xs mt-1 ${isMe ? "text-green-100" : "text-gray-500"}`}>{message.timestamp}</p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Input */}
      <div className="bg-white border-t border-gray-200 sticky bottom-16 z-10">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-end space-x-2">
            <div className="flex-1">
              <Input
                placeholder="メッセージを入力..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="border-gray-300 focus:border-green-500 focus:ring-green-500 resize-none"
                maxLength={500}
              />
            </div>
            <Button
              size="sm"
              className={`px-4 py-2 ${
                newMessage.trim()
                  ? "bg-green-500 hover:bg-green-600 text-white"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
              disabled={!newMessage.trim()}
              onClick={handleSendMessage}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex justify-between items-center mt-1">
            <p className="text-xs text-gray-500">Enterで送信</p>
            <span className="text-xs text-gray-400">{newMessage.length}/500</span>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10">
        <div className="max-w-md mx-auto px-4 py-2">
          <div className="flex items-center justify-around">
            <Link href="/hakken">
              <Button variant="ghost" className="flex flex-col items-center space-y-1 py-2 text-gray-400">
                <Home className="w-5 h-5" />
                <span className="text-xs">はっけん</span>
              </Button>
            </Link>
            <Link href="/shitsumon">
              <Button variant="ghost" className="flex flex-col items-center space-y-1 py-2 text-gray-400">
                <HelpCircle className="w-5 h-5" />
                <span className="text-xs">しつもん</span>
              </Button>
            </Link>
            <Link href="/messages">
              <Button variant="ghost" className="flex flex-col items-center space-y-1 py-2 text-green-600">
                <MessageCircle className="w-5 h-5" />
                <span className="text-xs font-medium">メッセージ</span>
              </Button>
            </Link>
            <Link href="/mypage">
              <Button variant="ghost" className="flex flex-col items-center space-y-1 py-2 text-gray-400">
                <User className="w-5 h-5" />
                <span className="text-xs">マイページ</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
