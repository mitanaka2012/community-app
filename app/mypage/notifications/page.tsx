"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Bell, Clock, Home, HelpCircle, User, MessageCircle } from "lucide-react"
import Link from "next/link"

// サンプルデータ
const notifications = [
  {
    id: 1,
    title: "アプリバージョン1.2.0をリリースしました",
    date: "12月15日",
    content: "新機能の追加とバグ修正を行いました。詳細は本文をご確認ください。",
    publishedAt: "2024年12月15日 10:00",
  },
  {
    id: 2,
    title: "年末年始のサポート対応について",
    date: "12月10日",
    content: "年末年始期間中のお問い合わせ対応についてお知らせいたします。",
    publishedAt: "2024年12月10日 14:30",
  },
  {
    id: 3,
    title: "利用規約の一部改定について",
    date: "12月5日",
    content: "利用規約の一部を改定いたします。改定内容をご確認ください。",
    publishedAt: "2024年12月5日 16:00",
  },
  {
    id: 4,
    title: "メンテナンス完了のお知らせ",
    date: "12月1日",
    content: "12月1日に実施したメンテナンスが完了いたしました。",
    publishedAt: "2024年12月1日 9:00",
  },
  {
    id: 5,
    title: "新機能「ゆずりあい」をリリースしました",
    date: "11月25日",
    content: "地域での物品の譲渡・交換ができる新機能をリリースしました。",
    publishedAt: "2024年11月25日 12:00",
  },
]

export default function NotificationsList() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-blue-100 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center space-x-3">
            <Link href="/mypage">
              <Button variant="ghost" size="sm" className="p-1">
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <Bell className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-blue-700">お知らせ</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="max-w-md mx-auto px-4 py-4 pb-20">
        {notifications.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 text-sm">お知らせはありません</p>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map((notification) => (
              <Link key={notification.id} href={`/mypage/notifications/${notification.id}`}>
                <Card className="border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      {/* Title */}
                      <h3 className="font-semibold text-gray-900 text-sm leading-relaxed line-clamp-2">
                        {notification.title}
                      </h3>

                      {/* Content Preview */}
                      <p className="text-gray-600 text-xs leading-relaxed line-clamp-2">{notification.content}</p>

                      {/* Date */}
                      <div className="flex items-center space-x-1 text-xs text-gray-500 pt-1">
                        <Clock className="w-3 h-3" />
                        <span>{notification.date}</span>
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
