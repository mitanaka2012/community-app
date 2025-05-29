"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  Settings,
  Edit,
  Heart,
  Gift,
  HelpCircle,
  Bell,
  LogOut,
  ChevronRight,
  Home,
  User,
  MessageCircle,
} from "lucide-react"
import Link from "next/link"

// サンプルデータ
const userData = {
  nickname: "ねりまママ",
  avatar: "/placeholder.svg?height=80&width=80",
  introduction: "練馬区在住の2歳児のママです。最近引っ越してきました！公園情報交換したいです♪",
  postalCode: "176****",
  childrenInfo: "1-3歳（未就園児）",
  interests: ["公園巡り", "離乳食", "絵本", "地域イベント"],
  stats: {
    posts: 12,
    questions: 5,
    items: 3,
    likes: 48,
  },
}

const menuItems = [
  {
    icon: Bell,
    title: "お知らせ",
    description: "アプリからの重要なお知らせ",
    href: "/mypage/notifications",
  },
]

export default function MyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-purple-100 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-purple-700">マイページ</h1>
            </div>
            <Button variant="ghost" size="sm" className="p-2">
              <Settings className="w-5 h-5 text-gray-600" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto px-4 py-6 pb-20">
        {/* Profile Card */}
        <Card className="border-purple-200 shadow-lg mb-6">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4 mb-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src={userData.avatar || "/placeholder.svg"} />
                <AvatarFallback className="bg-purple-100 text-purple-700 text-xl">
                  {userData.nickname.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900 mb-1">{userData.nickname}</h2>
                <p className="text-sm text-gray-600 mb-2">練馬区 {userData.postalCode}</p>
                <Badge variant="secondary" className="bg-pink-50 text-pink-700 border-pink-200">
                  {userData.childrenInfo}
                </Badge>
              </div>
              <Link href="/mypage/edit">
                <Button variant="outline" size="sm" className="border-purple-200 hover:bg-purple-50">
                  <Edit className="w-4 h-4 mr-1" />
                  編集
                </Button>
              </Link>
            </div>

            {/* Introduction */}
            <div className="mb-4">
              <p className="text-gray-700 text-sm leading-relaxed">{userData.introduction}</p>
            </div>

            {/* Interests */}
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">興味・関心</h3>
              <div className="flex flex-wrap gap-2">
                {userData.interests.map((interest) => (
                  <Badge key={interest} variant="outline" className="text-xs">
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 pt-4 border-t border-gray-100">
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Heart className="w-4 h-4 text-green-500 mr-1" />
                  <span className="font-semibold text-gray-900">{userData.stats.posts}</span>
                </div>
                <p className="text-xs text-gray-600">はっけん</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <HelpCircle className="w-4 h-4 text-blue-500 mr-1" />
                  <span className="font-semibold text-gray-900">{userData.stats.questions}</span>
                </div>
                <p className="text-xs text-gray-600">しつもん</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Gift className="w-4 h-4 text-orange-500 mr-1" />
                  <span className="font-semibold text-gray-900">{userData.stats.items}</span>
                </div>
                <p className="text-xs text-gray-600">ゆずりあい</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Heart className="w-4 h-4 text-red-500 mr-1" />
                  <span className="font-semibold text-gray-900">{userData.stats.likes}</span>
                </div>
                <p className="text-xs text-gray-600">いいね</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Menu Items */}
        <Card className="border-gray-200 shadow-sm mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-bold text-gray-900">設定</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {menuItems.map((item, index) => (
              <div key={item.title}>
                <Link href={item.href}>
                  <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <item.icon className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 text-sm">{item.title}</h3>
                        <p className="text-xs text-gray-500">{item.description}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </Link>
                {index < menuItems.length - 1 && <Separator />}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* App Info */}
        <Card className="border-gray-200 shadow-sm mb-6">
          <CardContent className="p-4">
            <div className="space-y-3">
              <Link href="/terms">
                <div className="flex items-center justify-between py-2 hover:bg-gray-50 rounded transition-colors">
                  <span className="text-sm text-gray-700">利用規約</span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </Link>
              <Link href="/privacy-policy">
                <div className="flex items-center justify-between py-2 hover:bg-gray-50 rounded transition-colors">
                  <span className="text-sm text-gray-700">プライバシーポリシー</span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </Link>
              <Link href="/contact">
                <div className="flex items-center justify-between py-2 hover:bg-gray-50 rounded transition-colors">
                  <span className="text-sm text-gray-700">お問い合わせ</span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Logout and Account Deletion */}
        <Card className="border-red-200 shadow-sm">
          <CardContent className="p-4 space-y-3">
            <Button variant="ghost" className="w-full text-red-600 hover:bg-red-50 hover:text-red-700">
              <LogOut className="w-4 h-4 mr-2" />
              ログアウト
            </Button>
            <Separator />
            <Button variant="ghost" className="w-full text-gray-400 cursor-not-allowed" disabled>
              アカウント削除（準備中）
            </Button>
          </CardContent>
        </Card>
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
              <Button variant="ghost" className="flex flex-col items-center space-y-1 py-2 text-gray-400">
                <MessageCircle className="w-5 h-5" />
                <span className="text-xs">メッセージ</span>
              </Button>
            </Link>
            <Link href="/mypage">
              <Button variant="ghost" className="flex flex-col items-center space-y-1 py-2 text-purple-600">
                <User className="w-5 h-5" />
                <span className="text-xs font-medium">マイページ</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
