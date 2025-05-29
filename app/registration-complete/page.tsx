"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, CheckCircle, Users, MessageCircle, Gift, Sparkles } from "lucide-react"

export default function RegistrationCompleteScreen() {
  const handleGoToHome = () => {
    window.location.href = "/hakken"
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-green-100">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-green-700">ねりまの子</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 max-w-md mx-auto px-4 py-8 w-full flex items-center">
        <Card className="border-green-200 shadow-lg w-full">
          <CardHeader className="text-center pb-6">
            <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-12 h-12 text-green-500" />
            </div>
            <CardTitle className="text-2xl font-bold text-green-700 mb-2">登録完了！</CardTitle>
            <div className="w-16 h-1 bg-green-400 mx-auto rounded-full"></div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Welcome Message */}
            <div className="text-center space-y-3">
              <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                <p className="text-gray-700 font-medium mb-2">ねりまの子へようこそ！</p>
                <p className="text-sm text-gray-600 leading-relaxed">早速コミュニティに参加してみましょう。</p>
              </div>
            </div>

            {/* Features Preview */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-700 text-center mb-3">これから楽しめる機能</h3>

              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-100 shadow-sm">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-blue-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-700">はっけん</p>
                    <p className="text-xs text-gray-500">地域の生きた子育て情報を発見</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-100 shadow-sm">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-orange-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-700">しつもん</p>
                    <p className="text-xs text-gray-500">子育ての疑問を気軽に相談</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-100 shadow-sm">
                  <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                    <Gift className="w-5 h-5 text-pink-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-700">ゆずりあい</p>
                    <p className="text-xs text-gray-500">不用品の譲渡で助け合い</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <div className="flex items-start space-x-2">
                <Sparkles className="w-4 h-4 text-yellow-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-yellow-800 mb-1">はじめてのコツ</p>
                  <p className="text-xs text-yellow-700 leading-relaxed">
                    まずは「はっけん」で他の方の投稿を見てみましょう。気になる投稿には「いいね」や「ありがとう」で反応してみてくださいね。
                  </p>
                </div>
              </div>
            </div>

            {/* Home Button */}
            <Button
              className="w-full py-4 text-lg font-semibold rounded-lg bg-green-500 hover:bg-green-600 text-white shadow-md transition-all"
              onClick={handleGoToHome}
            >
              ホーム画面へ
            </Button>

            {/* Safety Note */}
            <div className="text-center pt-2">
              <p className="text-xs text-gray-500 leading-relaxed">
                安心・安全なコミュニティを一緒に作っていきましょう
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
