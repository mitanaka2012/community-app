"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Camera, User, Baby, Heart, Tag, AlertCircle, Home, HelpCircle, MessageCircle } from "lucide-react"
import Link from "next/link"

// 初期データ（現在のプロフィール情報）
const initialData = {
  profileImage: "/placeholder.svg?height=80&width=80",
  nickname: "ねりまママ",
  hasChildren: "has-children",
  childrenAges: ["1-3"],
  dueDate: "",
  introduction: "練馬区在住の2歳児のママです。最近引っ越してきました！公園情報交換したいです♪",
  interests: ["公園巡り", "離乳食", "絵本", "地域イベント"],
}

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

export default function ProfileEditScreen() {
  const [profileImage, setProfileImage] = useState(initialData.profileImage)
  const [nickname, setNickname] = useState(initialData.nickname)
  const [hasChildren, setHasChildren] = useState(initialData.hasChildren)
  const [childrenAges, setChildrenAges] = useState<string[]>(initialData.childrenAges)
  const [dueDate, setDueDate] = useState(initialData.dueDate)
  const [introduction, setIntroduction] = useState(initialData.introduction)
  const [selectedInterests, setSelectedInterests] = useState<string[]>(initialData.interests)
  const [hasChanges, setHasChanges] = useState(false)

  // 変更検知
  useEffect(() => {
    const currentData = {
      profileImage,
      nickname,
      hasChildren,
      childrenAges,
      dueDate,
      introduction,
      interests: selectedInterests,
    }

    const hasDataChanged =
      profileImage !== initialData.profileImage ||
      nickname !== initialData.nickname ||
      hasChildren !== initialData.hasChildren ||
      JSON.stringify(childrenAges) !== JSON.stringify(initialData.childrenAges) ||
      dueDate !== initialData.dueDate ||
      introduction !== initialData.introduction ||
      JSON.stringify(selectedInterests) !== JSON.stringify(initialData.interests)

    setHasChanges(hasDataChanged)
  }, [profileImage, nickname, hasChildren, childrenAges, dueDate, introduction, selectedInterests])

  const isValidNickname = nickname.length >= 2 && nickname.length <= 15
  const hasValidChildrenInfo =
    hasChildren === "no-children" ||
    hasChildren === "ended" ||
    (hasChildren === "has-children" && childrenAges.length > 0)

  const canSave = isValidNickname && hasChildren && hasValidChildrenInfo && hasChanges

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

  const handleChildrenAgeChange = (age: string, checked: boolean) => {
    if (checked) {
      setChildrenAges([...childrenAges, age])
    } else {
      setChildrenAges(childrenAges.filter((a) => a !== age))
    }
  }

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest))
    } else {
      setSelectedInterests([...selectedInterests, interest])
    }
  }

  const handleSave = () => {
    // ここで保存処理を実行
    console.log("プロフィールを保存:", {
      profileImage,
      nickname,
      hasChildren,
      childrenAges,
      dueDate,
      introduction,
      interests: selectedInterests,
    })
    // 保存後はマイページに戻る
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-purple-100 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link href="/mypage">
                <Button variant="ghost" size="sm" className="p-1">
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                </Button>
              </Link>
              <h1 className="text-lg font-bold text-purple-700">プロフィール編集</h1>
            </div>
            <Link href="/mypage">
              <Button variant="ghost" size="sm" className="text-gray-500">
                キャンセル
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto px-4 py-6 pb-24">
        <Card className="border-purple-200 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-bold text-purple-700 text-center">プロフィール情報</CardTitle>
            <div className="w-12 h-1 bg-purple-400 mx-auto rounded-full"></div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Profile Image */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                <Camera className="w-4 h-4" />
                <span>プロフィール画像</span>
              </Label>
              <div className="flex items-center space-x-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={profileImage || "/placeholder.svg"} />
                  <AvatarFallback className="bg-purple-100 text-purple-700 text-xl">
                    <User className="w-8 h-8" />
                  </AvatarFallback>
                </Avatar>
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
                      <span>画像を変更</span>
                    </Button>
                  </Label>
                  <p className="text-xs text-gray-500 mt-1">個人が特定できない、お子さんの顔が映っていない画像を推奨</p>
                </div>
              </div>
            </div>

            {/* Nickname */}
            <div className="space-y-2">
              <Label htmlFor="nickname" className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>
                  ニックネーム <span className="text-red-500">*</span>
                </span>
              </Label>
              <Input
                id="nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                maxLength={15}
              />
              <div className="flex justify-between items-center">
                <p className="text-xs text-gray-500">2〜15文字（ひらがな、カタカナ、漢字、半角英数字）</p>
                <span className="text-xs text-gray-400">{nickname.length}/15</span>
              </div>
              {nickname.length > 0 && !isValidNickname && (
                <p className="text-xs text-red-500">2文字以上15文字以下で入力してください</p>
              )}
              <p className="text-xs text-orange-600">公序良俗に反するニックネームはご遠慮ください</p>
            </div>

            {/* Children Status */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                <Baby className="w-4 h-4" />
                <span>
                  お子さんの有無 <span className="text-red-500">*</span>
                </span>
              </Label>
              <RadioGroup value={hasChildren} onValueChange={setHasChildren}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="has-children" id="has-children" />
                  <Label htmlFor="has-children" className="text-sm cursor-pointer">
                    子どもがいます
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no-children" id="no-children" />
                  <Label htmlFor="no-children" className="text-sm cursor-pointer">
                    子どもが欲しいと考えています
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="ended" id="ended" />
                  <Label htmlFor="ended" className="text-sm cursor-pointer">
                    子育ては終えましたが、地域に貢献したい
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Children Ages (conditional) */}
            {hasChildren === "has-children" && (
              <div className="space-y-3 p-4 bg-purple-50 rounded-lg border border-purple-100">
                <Label className="text-sm font-medium text-gray-700">
                  お子さんの年齢層 <span className="text-red-500">*</span>
                  <span className="text-xs text-gray-500 ml-2">（複数選択可）</span>
                </Label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: "0", label: "0歳（乳幼児）" },
                    { id: "1-3", label: "1-3歳（未就園児）" },
                    { id: "4-6", label: "4-6歳（幼稚園・保育園）" },
                    { id: "elementary", label: "小学生" },
                    { id: "junior", label: "中学生" },
                    { id: "high", label: "高校生" },
                  ].map((age) => (
                    <div key={age.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={age.id}
                        checked={childrenAges.includes(age.id)}
                        onCheckedChange={(checked) => handleChildrenAgeChange(age.id, checked as boolean)}
                      />
                      <Label htmlFor={age.id} className="text-xs cursor-pointer">
                        {age.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Due Date (conditional) */}
            {hasChildren === "no-children" && (
              <div className="space-y-2 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <Label htmlFor="dueDate" className="text-sm font-medium text-gray-700">
                  出産予定日（任意）
                </Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            )}

            {/* Self Introduction */}
            <div className="space-y-2">
              <Label htmlFor="introduction" className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                <Heart className="w-4 h-4" />
                <span>自己紹介文</span>
              </Label>
              <Textarea
                id="introduction"
                value={introduction}
                onChange={(e) => setIntroduction(e.target.value)}
                className="border-gray-300 focus:border-purple-500 focus:ring-purple-500 min-h-[100px]"
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
                        ? "bg-purple-500 hover:bg-purple-600 text-white"
                        : "hover:bg-purple-50 hover:border-purple-300"
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

            {/* Notice */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 text-gray-500 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-700 mb-1">ご注意</p>
                  <p className="text-xs text-gray-600">練馬区の郵便番号は登録後に変更できません。</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Save Button (Fixed at bottom) */}
      <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-gray-200 z-20">
        <div className="max-w-md mx-auto px-4 py-3">
          <Button
            className={`w-full py-3 text-lg font-semibold rounded-lg transition-all ${
              canSave
                ? "bg-purple-500 hover:bg-purple-600 text-white shadow-md"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
            disabled={!canSave}
            onClick={handleSave}
          >
            {hasChanges ? "変更を保存する" : "変更がありません"}
          </Button>
        </div>
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
