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
  HelpCircle,
  Gift,
  User,
  Home,
} from "lucide-react"
import Link from "next/link"

// サンプルデータ
const posts = [
  {
    id: 1,
    author: "ねりまママ",
    avatar: "/placeholder.svg?height=40&width=40",
    time: "5分前",
    category: "遊び場・お出かけ",
    content:
      "光が丘公園の桜が満開でした🌸 お花見しながらピクニックしている家族がたくさんいて、とても和やかな雰囲気でした。駐車場も空いていたので、お出かけにおすすめです！",
    images: ["/placeholder.svg?height=200&width=300"],
    likes: 12,
    comments: 3,
    recentComments: [
      { author: "公園大好きパパ", content: "素敵な写真ですね！今度行ってみます", time: "3分前" },
      { author: "さくらママ", content: "桜きれいですね〜✨", time: "1分前" },
    ],
  },
  {
    id: 2,
    author: "新米パパ",
    avatar: "/placeholder.svg?height=40&width=40",
    time: "1時間前",
    category: "子どもの健康",
    content:
      "1歳の息子が初めて歩きました！練馬区の小児科で発達相談を受けていたのですが、先生に「順調ですね」と言われて安心しました。同じくらいの月齢のお子さんをお持ちの方、一緒に成長を見守りませんか？",
    images: [],
    likes: 8,
    comments: 5,
    recentComments: [
      { author: "ベテランママ", content: "おめでとうございます！成長が楽しみですね", time: "45分前" },
      { author: "同じ月齢ママ", content: "うちもちょうど1歳です！お友達になりたいです", time: "30分前" },
    ],
  },
  {
    id: 3,
    author: "保活ママ",
    avatar: "/placeholder.svg?height=40&width=40",
    time: "3時間前",
    category: "保活・幼稚園・保育園",
    content:
      "来年度の保育園申し込みが始まりますね。練馬区の保育課に相談に行ってきました。必要書類が多くて大変ですが、職員の方が丁寧に説明してくれました。同じく保活中の方、情報交換しましょう！",
    images: [],
    likes: 15,
    comments: 7,
    recentComments: [
      {
        author: "保活先輩ママ",
        content: "大変ですが頑張ってください！何か質問があれば聞いてくださいね",
        time: "2時間前",
      },
    ],
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
  "暮らし・その他",
]

export default function HakkenTimeline() {
  const [selectedCategory, setSelectedCategory] = useState("すべて")
  const [showPostMenu, setShowPostMenu] = useState(false)

  const filteredPosts =
    selectedCategory === "すべて" ? posts : posts.filter((post) => post.category === selectedCategory)

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-green-100 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-green-700">はっけん</h1>
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
                    ? "bg-green-500 hover:bg-green-600 text-white"
                    : "hover:bg-green-50 hover:border-green-300"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="max-w-md mx-auto px-4 py-4 pb-20">
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <Card key={post.id} className="border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                {/* Post Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={post.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-green-100 text-green-700">{post.author.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{post.author}</p>
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        <span>{post.time}</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="p-1">
                    <MoreHorizontal className="w-4 h-4 text-gray-400" />
                  </Button>
                </div>

                {/* Category */}
                <div className="mb-3">
                  <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">
                    <MapPin className="w-3 h-3 mr-1" />
                    {post.category}
                  </Badge>
                </div>

                {/* Post Content */}
                <div className="mb-3">
                  <p className="text-gray-700 text-sm leading-relaxed">{post.content}</p>
                </div>

                {/* Images */}
                {post.images.length > 0 && (
                  <div className="mb-3">
                    <div className="grid grid-cols-1 gap-2">
                      {post.images.map((image, index) => (
                        <img
                          key={index}
                          src={image || "/placeholder.svg"}
                          alt={`投稿画像 ${index + 1}`}
                          className="w-full h-48 object-cover rounded-lg border border-gray-200"
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Reaction Buttons */}
                <div className="flex items-center space-x-4 mb-3 pt-2 border-t border-gray-100">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center space-x-1 text-gray-600 hover:text-red-500"
                  >
                    <Heart className="w-4 h-4" />
                    <span className="text-sm">{post.likes}</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center space-x-1 text-gray-600 hover:text-blue-500"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-sm">{post.comments}</span>
                  </Button>
                </div>

                {/* Recent Comments */}
                {post.recentComments.length > 0 && (
                  <div className="space-y-2">
                    {post.recentComments.map((comment, index) => (
                      <div key={index} className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-start space-x-2">
                          <Avatar className="w-6 h-6">
                            <AvatarFallback className="bg-gray-200 text-gray-600 text-xs">
                              {comment.author.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="text-xs font-medium text-gray-700">{comment.author}</span>
                              <span className="text-xs text-gray-500">{comment.time}</span>
                            </div>
                            <p className="text-xs text-gray-600">{comment.content}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                    {post.comments > post.recentComments.length && (
                      <Button variant="ghost" size="sm" className="text-blue-600 text-xs p-0 h-auto">
                        {post.comments}件のコメントをすべて表示
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-20 right-4 z-20">
        <Button
          className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 shadow-lg"
          onClick={() => setShowPostMenu(!showPostMenu)}
        >
          <Plus className="w-6 h-6 text-white" />
        </Button>

        {/* Post Menu */}
        {showPostMenu && (
          <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-lg border border-gray-200 p-2 min-w-[160px]">
            <Link href="/hakken/post">
              <Button variant="ghost" className="w-full justify-start text-sm py-2 px-3 hover:bg-green-50">
                <Heart className="w-4 h-4 mr-2 text-green-500" />
                はっけんを投稿
              </Button>
            </Link>
            <Link href="/shitsumon/post">
              <Button variant="ghost" className="w-full justify-start text-sm py-2 px-3 hover:bg-blue-50">
                <HelpCircle className="w-4 h-4 mr-2 text-blue-500" />
                しつもんを投稿
              </Button>
            </Link>
            <Link href="/shitsumon/post?category=不用品譲り合い">
              <Button variant="ghost" className="w-full justify-start text-sm py-2 px-3 hover:bg-orange-50">
                <Gift className="w-4 h-4 mr-2 text-orange-500" />
                ゆずりあいを投稿
              </Button>
            </Link>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10">
        <div className="max-w-md mx-auto px-4 py-2">
          <div className="flex items-center justify-around">
            <Link href="/hakken">
              <Button variant="ghost" className="flex flex-col items-center space-y-1 py-2 text-green-600">
                <Home className="w-5 h-5" />
                <span className="text-xs font-medium">はっけん</span>
              </Button>
            </Link>
            <Link href="/shitsumon">
              <Button variant="ghost" className="flex flex-col items-center space-y-1 py-2 text-gray-400">
                <HelpCircle className="w-5 h-5" />
                <span className="text-xs">しつもん</span>
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
