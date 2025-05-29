"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Heart, MessageCircle, ArrowLeft, Send, Clock, MapPin, MoreHorizontal, Flag, Share2 } from "lucide-react"
import Link from "next/link"

// サンプルデータ
const post = {
  id: 1,
  author: "ねりまママ",
  avatar: "/placeholder.svg?height=40&width=40",
  time: "5分前",
  category: "遊び場・お出かけ",
  content:
    "光が丘公園の桜が満開でした🌸 お花見しながらピクニックしている家族がたくさんいて、とても和やかな雰囲気でした。駐車場も空いていたので、お出かけにおすすめです！",
  images: ["/placeholder.svg?height=300&width=400"],
  likes: 12,
  isLiked: false,
  comments: [
    {
      id: 1,
      author: "公園大好きパパ",
      avatar: "/placeholder.svg?height=32&width=32",
      content: "素敵な写真ですね！今度行ってみます",
      time: "3分前",
    },
    {
      id: 2,
      author: "さくらママ",
      avatar: "/placeholder.svg?height=32&width=32",
      content: "桜きれいですね〜✨ うちも今度お花見に行こうと思います！",
      time: "1分前",
    },
    {
      id: 3,
      author: "光が丘住民",
      avatar: "/placeholder.svg?height=32&width=32",
      content: "地元の公園の情報ありがとうございます！駐車場の情報も助かります",
      time: "30秒前",
    },
  ],
}

export default function PostDetailScreen() {
  const [newComment, setNewComment] = useState("")
  const [isLiked, setIsLiked] = useState(post.isLiked)
  const [likeCount, setLikeCount] = useState(post.likes)

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1)
  }

  const handleSendComment = () => {
    if (newComment.trim()) {
      // コメント送信処理
      setNewComment("")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-green-100 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link href="/hakken">
                <Button variant="ghost" size="sm" className="p-1">
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                </Button>
              </Link>
              <h1 className="text-lg font-bold text-green-700">{post.author}</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="p-2">
                <Share2 className="w-4 h-4 text-gray-600" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <MoreHorizontal className="w-4 h-4 text-gray-600" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto px-4 py-4 pb-20">
        {/* Post Detail */}
        <Card className="border-gray-200 shadow-sm mb-4">
          <CardContent className="p-4">
            {/* Post Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={post.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-green-100 text-green-700">{post.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-gray-900">{post.author}</p>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Clock className="w-3 h-3" />
                    <span>{post.time}</span>
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="p-1">
                <Flag className="w-4 h-4 text-gray-400" />
              </Button>
            </div>

            {/* Category */}
            <div className="mb-4">
              <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">
                <MapPin className="w-3 h-3 mr-1" />
                {post.category}
              </Badge>
            </div>

            {/* Post Content */}
            <div className="mb-4">
              <p className="text-gray-700 leading-relaxed">{post.content}</p>
            </div>

            {/* Images */}
            {post.images.length > 0 && (
              <div className="mb-4">
                <div className="grid grid-cols-1 gap-2">
                  {post.images.map((image, index) => (
                    <img
                      key={index}
                      src={image || "/placeholder.svg"}
                      alt={`投稿画像 ${index + 1}`}
                      className="w-full h-64 object-cover rounded-lg border border-gray-200"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Reaction Buttons */}
            <div className="flex items-center space-x-4 pt-3 border-t border-gray-100">
              <Button
                variant="ghost"
                size="sm"
                className={`flex items-center space-x-1 ${
                  isLiked ? "text-red-500" : "text-gray-600 hover:text-red-500"
                }`}
                onClick={handleLike}
              >
                <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
                <span>{likeCount}</span>
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center space-x-1 text-gray-600">
                <MessageCircle className="w-5 h-5" />
                <span>{post.comments.length}</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Comments Section */}
        <Card className="border-gray-200 shadow-sm">
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-900 mb-4">コメント ({post.comments.length})</h3>

            <div className="space-y-4">
              {post.comments.map((comment, index) => (
                <div key={comment.id}>
                  <div className="flex items-start space-x-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={comment.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-gray-100 text-gray-600 text-xs">
                        {comment.author.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-sm font-medium text-gray-700">{comment.author}</span>
                        <span className="text-xs text-gray-500">{comment.time}</span>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">{comment.content}</p>
                    </div>
                  </div>
                  {index < post.comments.length - 1 && <Separator className="mt-4" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Comment Input (Fixed at bottom) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center space-x-3">
            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-green-100 text-green-700 text-xs">あ</AvatarFallback>
            </Avatar>
            <div className="flex-1 flex items-center space-x-2">
              <Input
                placeholder="コメントを入力..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                onKeyPress={(e) => e.key === "Enter" && handleSendComment()}
              />
              <Button
                size="sm"
                className={`px-3 ${
                  newComment.trim()
                    ? "bg-green-500 hover:bg-green-600 text-white"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
                disabled={!newComment.trim()}
                onClick={handleSendComment}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
