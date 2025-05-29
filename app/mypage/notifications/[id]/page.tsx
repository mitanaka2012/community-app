"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Bell, Clock, Home, HelpCircle, User, MessageCircle } from "lucide-react"
import Link from "next/link"

// サンプルデータ（実際のアプリでは、IDに基づいてデータを取得）
const notificationData = {
  1: {
    id: 1,
    title: "アプリバージョン1.2.0をリリースしました",
    publishedAt: "2024年12月15日 10:00",
    content: `いつも「ねりまの子」をご利用いただき、ありがとうございます。

本日、アプリバージョン1.2.0をリリースいたしました。

【主な更新内容】
• メッセージ機能の追加
• プロフィール編集機能の改善
• 投稿時の画像アップロード機能の向上
• 各種バグの修正とパフォーマンスの改善

【メッセージ機能について】
ユーザー同士で直接やり取りができるメッセージ機能を追加しました。ゆずりあいの受け渡し相談や、はっけん・しつもんへのより詳細なやり取りにご活用ください。

【今後の予定】
今後も皆様により良いサービスを提供できるよう、機能の改善・追加を継続してまいります。

ご不明な点やご要望がございましたら、お気軽にお問い合わせください。

今後とも「ねりまの子」をよろしくお願いいたします。`,
  },
  2: {
    id: 2,
    title: "年末年始のサポート対応について",
    publishedAt: "2024年12月10日 14:30",
    content: `いつも「ねりまの子」をご利用いただき、ありがとうございます。

年末年始期間中のお問い合わせ対応についてお知らせいたします。

【対応期間】
2024年12月29日（日）〜 2025年1月3日（金）

【対応内容】
上記期間中は、お問い合わせへの回答が遅れる場合がございます。
緊急性の高いお問い合わせについては、可能な限り対応いたしますが、通常よりもお時間をいただく場合がございます。

【通常対応再開】
2025年1月6日（月）より、通常通りの対応を再開いたします。

ご利用の皆様にはご不便をおかけいたしますが、何卒ご理解のほどよろしくお願いいたします。`,
  },
  3: {
    id: 3,
    title: "利用規約の一部改定について",
    publishedAt: "2024年12月5日 16:00",
    content: `いつも「ねりまの子」をご利用いただき、ありがとうございます。

この度、利用規約の一部を改定いたします。

【改定日】
2024年12月20日（金）

【主な改定内容】
1. プライバシー保護に関する条項の追加
2. メッセージ機能利用時の注意事項の明記
3. 禁止行為に関する条項の詳細化

【改定の背景】
新機能の追加に伴い、より安全で快適にサービスをご利用いただくため、利用規約の見直しを行いました。

【確認方法】
改定後の利用規約は、アプリ内の「マイページ」→「利用規約」からご確認いただけます。

引き続き安心してご利用いただけるよう努めてまいりますので、今後ともよろしくお願いいたします。`,
  },
  4: {
    id: 4,
    title: "メンテナンス完了のお知らせ",
    publishedAt: "2024年12月1日 9:00",
    content: `いつも「ねりまの子」をご利用いただき、ありがとうございます。

12月1日（日）午前2:00〜午前6:00に実施いたしましたメンテナンスが完了いたしました。

【メンテナンス内容】
• サーバーの安定性向上
• セキュリティの強化
• データベースの最適化

メンテナンス期間中はアプリをご利用いただけず、ご不便をおかけいたしました。

現在、すべての機能が正常に動作しております。
もし何かご不明な点やトラブルがございましたら、お気軽にお問い合わせください。

今後ともよろしくお願いいたします。`,
  },
  5: {
    id: 5,
    title: "新機能「ゆずりあい」をリリースしました",
    publishedAt: "2024年11月25日 12:00",
    content: `いつも「ねりまの子」をご利用いただき、ありがとうございます。

本日、新機能「ゆずりあい」をリリースいたしました！

【ゆずりあい機能とは】
地域の皆様同士で、不用品の譲渡や必要なものの交換ができる機能です。

【主な特徴】
• 「あげます」「ください」の2つのカテゴリで投稿可能
• 写真付きで商品の状態を詳しく紹介
• 安全な受け渡し方法の選択
• カテゴリ別での検索・絞り込み

【安全にご利用いただくために】
• 受け渡しは人通りの多い場所で行ってください
• 個人情報の交換は慎重に行ってください
• 金銭の授受は原則として行わないでください

子育て用品の有効活用や、地域コミュニティの活性化にお役立てください。

ご不明な点がございましたら、お気軽にお問い合わせください。`,
  },
}

export default function NotificationDetail({ params }: { params: { id: string } }) {
  const notification = notificationData[params.id as keyof typeof notificationData]

  if (!notification) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
        <div className="max-w-md mx-auto px-4 py-8">
          <p className="text-center text-gray-500">お知らせが見つかりません</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-blue-100 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center space-x-3">
            <Link href="/mypage/notifications">
              <Button variant="ghost" size="sm" className="p-1">
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <Bell className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-lg font-bold text-blue-700 line-clamp-1">{notification.title}</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto px-4 py-6 pb-20">
        <Card className="border-blue-200 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-bold text-blue-700 leading-relaxed">{notification.title}</CardTitle>
            <div className="flex items-center space-x-1 text-sm text-gray-500 pt-2">
              <Clock className="w-4 h-4" />
              <span>{notification.publishedAt}</span>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="prose prose-sm max-w-none">
              {notification.content.split("\n").map((paragraph, index) => (
                <p key={index} className="text-gray-700 leading-relaxed mb-3">
                  {paragraph}
                </p>
              ))}
            </div>
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
