"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageCircle, Clock, Home, HelpCircle, User } from "lucide-react"
import Link from "next/link"

// サンプルデータ
const conversations = [
  {
    id: 1,
    user: {
      nickname: "ベテランママ",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    lastMessage: "ベビーベッドの件、ありがとうございました！とても助かりました。",
    lastMessageTime: "5分前",
  },
  {
    id: 2,
    user: {
      nickname: "新米パパ",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    lastMessage: "チャイルドシートの受け渡し場所について相談させてください",
    lastMessageTime: "1時間前",
  },
  {
    id: 3,
    user: {
      nickname: "公園大好きママ",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    lastMessage: "光が丘公園の情報ありがとうございます！",
    lastMessageTime: "3時間前",
  },
  {
    id: 4,
    user: {
      nickname: "絵本大好きママ",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    lastMessage: "絵本セットの件でお聞きしたいことがあります",
    lastMessageTime: "昨日",
  },
  {
    id: 5,
    user: {
      nickname: "保活ママ",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    lastMessage: "保育園の情報交換ありがとうございました",
    lastMessageTime: "2日前",
  },
]

export default function MessagesList() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-green-100 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-green-700">メッセージ</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Conversations List */}
      <div className="max-w-md mx-auto px-4 py-4">
        {conversations.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 text-sm">まだメッセージがありません</p>
            <p className="text-gray-400 text-xs mt-1">投稿にコメントしたり、ゆずりあいでメッセージを送ってみましょう</p>
          </div>
        ) : (
          <div className="space-y-2">
            {conversations.map((conversation) => (
              <Link key={conversation.id} href={`/messages/${conversation.id}`}>
                <Card className="border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={conversation.user.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-green-100 text-green-700">
                          {conversation.user.nickname.charAt(0)}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-medium text-gray-900 text-sm truncate">{conversation.user.nickname}</h3>
                          <div className="flex items-center space-x-1 text-xs text-gray-500">
                            <Clock className="w-3 h-3" />
                            <span>{conversation.lastMessageTime}</span>
                          </div>
                        </div>
                        <p className="text-sm line-clamp-1 text-gray-600">{conversation.lastMessage}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
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
