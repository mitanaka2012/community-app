"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Heart, Users, Gift, Shield } from "lucide-react"

export default function WelcomeScreen() {
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false)

  const canProceed = agreedToTerms && agreedToPrivacy

  const handleStart = () => {
    if (canProceed) {
      window.location.href = "/signup"
    }
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
      <div className="flex-1 max-w-md mx-auto px-4 py-6 w-full">
        <Card className="border-green-200 shadow-lg">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold text-green-700 mb-2">ねりまの子へようこそ！</CardTitle>
            <div className="w-16 h-1 bg-green-400 mx-auto rounded-full"></div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* App Description */}
            <div className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                <p className="text-gray-700 text-sm leading-relaxed">
                  練馬区の子育て世代のためのコミュニティアプリです。
                  <br />
                  <strong className="text-green-700">子どもたちがのびのびと成長するのを楽しく見守れるように</strong>、
                  <strong className="text-green-700">新しく親になる方が不安にならないように</strong>、
                  地域の皆さんと情報交換や助け合いをしましょう。
                </p>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-100">
                  <Users className="w-5 h-5 text-blue-500" />
                  <span className="text-sm text-gray-700">地域の生きた子育て情報の交換</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-100">
                  <Heart className="w-5 h-5 text-pink-500" />
                  <span className="text-sm text-gray-700">子育ての悩みや喜びの共有</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-100">
                  <Gift className="w-5 h-5 text-orange-500" />
                  <span className="text-sm text-gray-700">不用品の譲渡・助け合い</span>
                </div>
              </div>
            </div>

            {/* Agreement Checkboxes */}
            <div className="space-y-4 pt-4 border-t border-gray-100">
              <div className="flex items-start space-x-3">
                <Checkbox id="terms" checked={agreedToTerms} onCheckedChange={setAgreedToTerms} className="mt-1" />
                <label htmlFor="terms" className="text-sm text-gray-700 leading-relaxed cursor-pointer">
                  <span className="text-red-500">*</span>
                  <span className="underline text-blue-600">利用規約</span>に同意する
                </label>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="privacy"
                  checked={agreedToPrivacy}
                  onCheckedChange={setAgreedToPrivacy}
                  className="mt-1"
                />
                <label htmlFor="privacy" className="text-sm text-gray-700 leading-relaxed cursor-pointer">
                  <span className="text-red-500">*</span>
                  <span className="underline text-blue-600">プライバシーポリシー</span>に同意する
                </label>
              </div>
            </div>

            {/* Start Button */}
            <Button
              className={`w-full py-3 text-lg font-semibold rounded-lg transition-all ${
                canProceed
                  ? "bg-green-500 hover:bg-green-600 text-white shadow-md"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
              disabled={!canProceed}
              onClick={handleStart}
            >
              始める
            </Button>

            {/* Safety Note */}
            <div className="flex items-center justify-center space-x-2 pt-2">
              <Shield className="w-4 h-4 text-green-500" />
              <span className="text-xs text-gray-500">安心・安全なコミュニティを目指しています</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
