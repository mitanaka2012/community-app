"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Heart, ArrowLeft, Camera, User, Tag } from "lucide-react"

export default function ProfileOptionalScreen() {
  const [introduction, setIntroduction] = useState("")
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [profileImage, setProfileImage] = useState<string | null>(null)

  const interests = [
    "公園巡り",
    "離乳食",
    "保活",
    "習い事",
    "ママ友探し",
    "ベビー用品",
    "絵本",
    "行政手続き",
    "防災",
    "健康",
    "地域イベント",
    "幼稚園情報",
    "小児科",
    "予防接種",
    "発達相談",
    "学童保育",
    "中学受験",
    "部活動",
  ]

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest))
    } else {
      setSelectedInterests([...selectedInterests, interest])
    }
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-green-100">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" className="p-1">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <Heart className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-lg font-bold text-green-700">ねりまの子</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="max-w-md mx-auto px-4 py-3">
        <div className="flex items-center space-x-2">
          <div className="flex-1 h-2 bg-green-200 rounded-full">
            <div className="h-2 bg-green-500 rounded-full w-full"></div>
          </div>
          <span className="text-sm text-gray-600">2/2</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 max-w-md mx-auto px-4 pb-6 w-full">
        <Card className="border-green-200 shadow-lg">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl font-bold text-green-700">プロフィールを充実させましょう（任意）</CardTitle>
            <p className="text-sm text-gray-600 mt-1">（任意）</p>
            <div className="w-12 h-1 bg-green-400 mx-auto rounded-full"></div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Profile Image */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                <Camera className="w-4 h-4" />
                <span>プロフィール画像</span>
              </Label>
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center border-2 border-dashed border-gray-300 overflow-hidden">
                  {profileImage ? (
                    <img
                      src={profileImage || "/placeholder.svg"}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-8 h-8 text-gray-400" />
                  )}
                </div>
                <div className="flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="profile-image"
                  />
                  <Label htmlFor="profile-image" className="cursor-pointer">
                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <span>画像を選択</span>
                    </Button>
                  </Label>
                  <p className="text-xs text-gray-500 mt-1">個人が特定できない、お子さんの顔が映っていない画像を推奨</p>
                </div>
              </div>
            </div>

            {/* Self Introduction */}
            <div className="space-y-2">
              <Label htmlFor="introduction" className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>自己紹介文</span>
              </Label>
              <Textarea
                id="introduction"
                placeholder="例：練馬区在住の○○です。最近引っ越してきました！○歳児のママです。公園情報交換したいです♪"
                value={introduction}
                onChange={(e) => setIntroduction(e.target.value)}
                className="border-gray-300 focus:border-green-500 focus:ring-green-500 min-h-[100px]"
                maxLength={200}
              />
              <div className="flex justify-between items-center">
                <p className="text-xs text-gray-500">200文字程度まで</p>
                <span className="text-xs text-gray-400">{introduction.length}/200</span>
              </div>
            </div>

            {/* Interests */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                <Tag className="w-4 h-4" />
                <span>興味・関心</span>
                <span className="text-xs text-gray-500">（複数選択可）</span>
              </Label>
              <div className="grid grid-cols-2 gap-2">
                {interests.map((interest) => (
                  <Badge
                    key={interest}
                    variant={selectedInterests.includes(interest) ? "default" : "outline"}
                    className={`cursor-pointer text-center justify-center py-2 transition-all ${
                      selectedInterests.includes(interest)
                        ? "bg-green-500 hover:bg-green-600 text-white"
                        : "hover:bg-green-50 hover:border-green-300"
                    }`}
                    onClick={() => toggleInterest(interest)}
                  >
                    {interest}
                  </Badge>
                ))}
              </div>
              {selectedInterests.length > 0 && (
                <p className="text-xs text-gray-600">選択中：{selectedInterests.length}個</p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4">
              <Button className="w-full py-3 text-lg font-semibold rounded-lg bg-green-500 hover:bg-green-600 text-white shadow-md transition-all">
                登録を完了する
              </Button>

              <Button
                variant="outline"
                className="w-full py-3 text-lg font-semibold rounded-lg border-gray-300 hover:bg-gray-50 transition-all"
              >
                スキップする
              </Button>
            </div>

            {/* Note */}
            <div className="text-center pt-2">
              <p className="text-xs text-gray-500">後からプロフィールページで変更できます</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
