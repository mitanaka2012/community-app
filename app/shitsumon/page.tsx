"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Heart,
  MessageCircle,
  Plus,
  Search,
  Filter,
  MapPin,
  Clock,
  MoreHorizontal,
  Home,
  HelpCircle,
  User,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"

// サンプルデータ
const questions = [
  {
    id: 1,
    author: "新米ママ",
    avatar: "/placeholder.svg?height=40&width=40",
    time: "10分前",
    category: "子どもの健康",
    title: "1歳児の発熱時の対応について教えてください",
    content:
      "1歳の息子が昨夜から38度の熱を出しています。練馬区でおすすめの小児科や、夜間の対応について教えていただけませんか？",
    likes: 3,
    answers: 5,
    hasAnswer: true,
    isUrgent: false,
  },
  {
    id: 2,
    author: "保活中パパ",
    avatar: "/placeholder.svg?height=40&width=40",
    time: "2時間前",
    category: "保活・幼稚園・保育園",
    title: "練馬区の保育園申し込みの必要書類について",
    content:
      "来年度の保育園申し込みを予定しています。練馬区の必要書類で、就労証明書以外に準備しておくべきものはありますか？",
    likes: 8,
    answers: 12,
    hasAnswer: true,
    isUrgent: false,
  },
  {
    id: 3,
    author: "転入ママ",
    avatar: "/placeholder.svg?height=40&width=40",
    time: "5時間前",
    category: "行政手続き・助成金",
    title: "練馬区に転入時の子育て関連手続きについて",
    content:
      "他県から練馬区に引っ越してきました。子どもの医療費助成や児童手当の手続きで注意すべき点があれば教えてください。",
    likes: 6,
    answers: 8,
    hasAnswer: true,
    isUrgent: false,
  },
  {
    id: 4,
    author: "公園探し中ママ",
    avatar: "/placeholder.svg?height=40&width=40",
    time: "1日前",
    category: "遊び場・お出かけ",
    title: "2歳児におすすめの練馬区内の公園を教えてください",
    content: "2歳の娘と一緒に楽しめる公園を探しています。遊具が充実していて、駐車場もある公園があれば教えてください。",
    likes: 15,
    answers: 23,
    hasAnswer: true,
    isUrgent: false,
  },
  {
    id: 5,
    author: "断捨離ママ",
    avatar: "/placeholder.svg?height=40&width=40",
    time: "1日前",
    category: "不用品譲り合い",
    title: "ベビーベッド（木製）をお譲りします",
    content:
      "生後6ヶ月まで使用していました。木製で丈夫な作りです。目立った傷はありませんが、使用感があります。マットレスも一緒にお譲りします。",
    likes: 5,
    answers: 3,
    hasAnswer: false,
    isUrgent: false,
  },
  {
    id: 6,
    author: "習い事検討中ママ",
    avatar: "/placeholder.svg?height=40&width=40",
    time: "2日前",
    category: "習い事",
    title: "3歳から始められる習い事でおすすめはありますか？",
    content: "3歳の息子に何か習い事をさせたいと考えています。練馬区内で評判の良い教室があれば教えてください。",
    likes: 4,
    answers: 0,
    hasAnswer: false,
    isUrgent: false,
  },
]

const categories = [
  "すべて",
  "子どもの健康",
  "保活・幼稚園・保育園",
  "行政手続き・助成金",
  "遊び場・お出かけ",
  "地域のお店・サービス",
  "習い事",
  "妊娠・出産",
  "不用品譲り合い",
  "暮らし・その他",
]

export default function ShitsumonList() {
  const [selectedCategory, setSelectedCategory] = useState("すべて")
  const [showPostMenu, setShowPostMenu] = useState(false)

  const filteredQuestions =
    selectedCategory === "すべて" ? questions : questions.filter((q) => q.category === selectedCategory)

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-blue-100 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-blue-700">しつもん</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="p-2">
                <Search className="w-5 h-5 text-gray-600" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <Filter className="w-5 h-5 text-gray-600" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className={`cursor-pointer whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? "bg-blue-500 hover:bg-blue-600 text-white"
                    : "hover:bg-blue-50 hover:border-blue-300"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Questions List */}
      <div className="max-w-md mx-auto px-4 py-4 pb-20">
        <div className="space-y-4">
          {filteredQuestions.map((question) => (
            <Card key={question.id} className="border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                {/* Question Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={question.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-blue-100 text-blue-700">{question.author.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{question.author}</p>
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        <span>{question.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {question.hasAnswer && (
                      <div className="flex items-center space-x-1">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-xs text-green-600 font-medium">回答済み</span>
                      </div>
                    )}
                    <Button variant="ghost" size="sm" className="p-1">
                      <MoreHorizontal className="w-4 h-4 text-gray-400" />
                    </Button>
                  </div>
                </div>

                {/* Category */}
                <div className="mb-3">
                  <Badge
                    variant="secondary"
                    className={`${
                      question.category === "不用品譲り合い"
                        ? "bg-orange-50 text-orange-700 border-orange-200"
                        : "bg-purple-50 text-purple-700 border-purple-200"
                    }`}
                  >
                    <MapPin className="w-3 h-3 mr-1" />
                    {question.category}
                  </Badge>
                </div>

                {/* Question Title */}
                <div className="mb-2">
                  <h3 className="font-semibold text-gray-900 text-sm leading-relaxed">{question.title}</h3>
                </div>

                {/* Question Preview */}
                <div className="mb-3">
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">{question.content}</p>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center space-x-1 text-gray-600 hover:text-red-500"
                    >
                      <Heart className="w-4 h-4" />
                      <span className="text-sm">{question.likes}</span>
                    </Button>
                    <div className="flex items-center space-x-1 text-gray-600">
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-sm">{question.answers}</span>
                      <span className="text-xs text-gray-500">
                        {question.category === "不用品譲り合い" ? "メッセージ" : "回答"}
                      </span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="text-blue-600 border-blue-200 hover:bg-blue-50">
                    {question.category === "不用品譲り合い" ? "メッセージ" : "回答する"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-20 right-4 z-20">
        <Link href="/shitsumon/post">
          <Button className="w-14 h-14 rounded-full bg-blue-500 hover:bg-blue-600 shadow-lg">
            <Plus className="w-6 h-6 text-white" />
          </Button>
        </Link>
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
              <Button variant="ghost" className="flex flex-col items-center space-y-1 py-2 text-blue-600">
                <HelpCircle className="w-5 h-5" />
                <span className="text-xs font-medium">しつもん</span>
              </Button>
            </Link>
            <Link href="/messages">
              <Button variant="ghost" className="flex flex-col items-center space-y-1 py-2 text-gray-400">
                <MessageCircle className="w-5 h-5" />
                <span className="text-xs">メッセージ</span>
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
