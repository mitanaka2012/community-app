"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  Heart,
  MessageCircle,
  ArrowLeft,
  Send,
  Clock,
  MapPin,
  MoreHorizontal,
  Flag,
  Share2,
  CheckCircle,
  ThumbsUp,
  Home,
  BugIcon as QuestionMark,
  Mail,
  User,
} from "lucide-react"
import Link from "next/link"

// サンプルデータ
const question = {
  id: 1,
  author: "新米ママ",
  avatar: "/placeholder.svg?height=40&width=40",
  time: "10分前",
  category: "子どもの健康",
  title: "1歳児の発熱時の対応について教えてください",
  content:
    "1歳の息子が昨夜から38度の熱を出しています。初めての発熱で不安です。練馬区でおすすめの小児科や、夜間の対応について教えていただけませんか？また、家庭でできる対処法があれば知りたいです。",
  images: [],
  likes: 3,
  isLiked: false,
  answers: [
    {
      id: 1,
      author: "ベテランママ",
      avatar: "/placeholder.svg?height=32&width=32",
      content:
        "お疲れ様です。1歳の発熱は心配ですね。練馬区なら光が丘病院の小児科がおすすめです。夜間は練馬区夜間救急こどもクリニック（平日19:30-22:30）があります。水分補給をこまめに、解熱剤は38.5度以上で使用してください。",
      time: "8分前",
      likes: 5,
      isLiked: false,
      isBestAnswer: true,
    },
    {
      id: 2,
      author: "小児科ナース",
      avatar: "/placeholder.svg?height=32&width=32",
      content:
        "看護師です。発熱時は脱水に注意してください。母乳やミルク、白湯を少しずつ頻回に。服装は薄着にして、部屋の温度も調整してあげてください。ぐったりしている、呼吸が苦しそうなら早めに受診を。",
      time: "5分前",
      likes: 8,
      isLiked: false,
      isBestAnswer: false,
    },
    {
      id: 3,
      author: "同じ月齢ママ",
      avatar: "/placeholder.svg?height=32&width=32",
      content:
        "うちも先月同じような状況でした。練馬区の小児科なら、石神井公園駅近くの○○小児科も親切でした。夜間は不安ですが、#8000（小児救急電話相談）も利用できますよ。お大事にしてください。",
      time: "2分前",
      likes: 2,
      isLiked: false,
      isBestAnswer: false,
    },
  ],
}

export default function QuestionDetailScreen() {
  const [newAnswer, setNewAnswer] = useState("")
  const [isLiked, setIsLiked] = useState(question.isLiked)
  const [likeCount, setLikeCount] = useState(question.likes)

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1)
  }

  const handleSendAnswer = () => {
    if (newAnswer.trim()) {
      // 回答送信処理
      setNewAnswer("")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-blue-100 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link href="/shitsumon">
                <Button variant="ghost" size="sm" className="p-1">
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                </Button>
              </Link>
              <h1 className="text-lg font-bold text-blue-700 line-clamp-1">{question.title}</h1>
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
      <div className="max-w-md mx-auto px-4 py-4 pb-24">
        {/* Question Detail */}
        <Card className="border-gray-200 shadow-sm mb-4">
          <CardContent className="p-4">
            {/* Question Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={question.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-blue-100 text-blue-700">{question.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-gray-900">{question.author}</p>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Clock className="w-3 h-3" />
                    <span>{question.time}</span>
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="p-1">
                <Flag className="w-4 h-4 text-gray-400" />
              </Button>
            </div>

            {/* Category */}
            <div className="mb-4">
              <Badge variant="secondary" className="bg-purple-50 text-purple-700 border-purple-200">
                <MapPin className="w-3 h-3 mr-1" />
                {question.category}
              </Badge>
            </div>

            {/* Question Title */}
            <div className="mb-3">
              <h2 className="text-lg font-semibold text-gray-900 leading-relaxed">{question.title}</h2>
            </div>

            {/* Question Content */}
            <div className="mb-4">
              <p className="text-gray-700 leading-relaxed">{question.content}</p>
            </div>

            {/* Images */}
            {question.images.length > 0 && (
              <div className="mb-4">
                <div className="grid grid-cols-1 gap-2">
                  {question.images.map((image, index) => (
                    <img
                      key={index}
                      src={image || "/placeholder.svg"}
                      alt={`質問画像 ${index + 1}`}
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
              <div className="flex items-center space-x-1 text-gray-600">
                <MessageCircle className="w-5 h-5" />
                <span>{question.answers.length}件の回答</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Answers Section */}
        <Card className="border-gray-200 shadow-sm">
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-900 mb-4">回答 ({question.answers.length})</h3>

            <div className="space-y-4">
              {question.answers.map((answer, index) => (
                <div key={answer.id}>
                  <div className="flex items-start space-x-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={answer.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-gray-100 text-gray-600 text-sm">
                        {answer.author.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-sm font-medium text-gray-700">{answer.author}</span>
                        <span className="text-xs text-gray-500">{answer.time}</span>
                        {answer.isBestAnswer && (
                          <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            ベストアンサー
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed mb-3">{answer.content}</p>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 p-0 h-auto"
                        >
                          <ThumbsUp className="w-3 h-3" />
                          <span className="text-xs">{answer.likes}</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="text-xs text-gray-500 p-0 h-auto">
                          返信
                        </Button>
                      </div>
                    </div>
                  </div>
                  {index < question.answers.length - 1 && <Separator className="mt-4" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Answer Input (Fixed at bottom) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-blue-100 text-blue-700 text-xs">あ</AvatarFallback>
              </Avatar>
              <span className="text-sm text-gray-600">回答を投稿</span>
            </div>
            <div className="flex items-end space-x-2">
              <Textarea
                placeholder="この質問に回答してみましょう..."
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 min-h-[60px] resize-none"
                rows={2}
              />
              <Button
                size="sm"
                className={`px-4 py-2 ${
                  newAnswer.trim()
                    ? "bg-blue-500 hover:bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
                disabled={!newAnswer.trim()}
                onClick={handleSendAnswer}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="grid grid-cols-4 gap-4">
            <Link href="/" className="flex flex-col items-center justify-center">
              <Home className="w-5 h-5" />
              <span className="text-xs">はっけん</span>
            </Link>
            <Link href="/shitsumon" className="flex flex-col items-center justify-center">
              <QuestionMark className="w-5 h-5" />
              <span className="text-xs">しつもん</span>
            </Link>
            <Link href="/messages" className="flex flex-col items-center justify-center">
              <Mail className="w-5 h-5" />
              <span className="text-xs">メッセージ</span>
            </Link>
            <Link href="/mypage" className="flex flex-col items-center justify-center">
              <User className="w-5 h-5" />
              <span className="text-xs">マイページ</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
