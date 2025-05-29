"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { HelpCircle, ArrowLeft, Camera, X, ImageIcon, AlertCircle, Gift } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

const categories = [
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

export default function PostShitsumonScreen() {
  const searchParams = useSearchParams()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState("")
  const [images, setImages] = useState<string[]>([])

  // URLパラメータからカテゴリを設定
  useEffect(() => {
    const categoryParam = searchParams.get("category")
    if (categoryParam && categories.includes(categoryParam)) {
      setCategory(categoryParam)
    }
  }, [searchParams])

  const canPost = title.trim().length >= 5 && content.trim().length >= 20 && content.length <= 1000 && category

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && images.length < 3) {
      const newImages: string[] = []
      const filesToProcess = Array.from(files).slice(0, 3 - images.length)

      let processedCount = 0
      filesToProcess.forEach((file) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          if (e.target?.result) {
            newImages.push(e.target.result as string)
            processedCount++

            if (processedCount === filesToProcess.length) {
              setImages((prev) => [...prev, ...newImages])
            }
          }
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

  const isYuzuriai = category === "不用品譲り合い"

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
              <div className="flex items-center space-x-2">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    isYuzuriai ? "bg-orange-500" : "bg-blue-500"
                  }`}
                >
                  {isYuzuriai ? <Gift className="w-4 h-4 text-white" /> : <HelpCircle className="w-4 h-4 text-white" />}
                </div>
                <h1 className={`text-lg font-bold ${isYuzuriai ? "text-orange-700" : "text-blue-700"}`}>
                  {isYuzuriai ? "ゆずりあいを投稿" : "しつもんを投稿"}
                </h1>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="text-gray-500">
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto px-4 py-6">
        <Card className={`shadow-lg ${isYuzuriai ? "border-orange-200" : "border-blue-200"}`}>
          <CardHeader className="pb-4">
            <CardTitle className={`text-lg font-bold text-center ${isYuzuriai ? "text-orange-700" : "text-blue-700"}`}>
              {isYuzuriai ? "地域で助け合おう" : "子育ての疑問を相談しよう"}
            </CardTitle>
            <div className={`w-12 h-1 mx-auto rounded-full ${isYuzuriai ? "bg-orange-400" : "bg-blue-400"}`}></div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Title Input */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-medium text-gray-700">
                {isYuzuriai ? "アイテム名・タイトル" : "質問タイトル"} <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                placeholder={isYuzuriai ? "例：ベビーベッド（木製）をお譲りします" : "質問の要点を短くまとめましょう"}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`border-gray-300 focus:ring-1 ${
                  isYuzuriai
                    ? "focus:border-orange-500 focus:ring-orange-500"
                    : "focus:border-blue-500 focus:ring-blue-500"
                }`}
                maxLength={50}
              />
              <div className="flex justify-between items-center">
                <p className="text-xs text-gray-500">5文字以上50文字以下</p>
                <span className={`text-xs ${title.length > 45 ? "text-red-500" : "text-gray-400"}`}>
                  {title.length}/50
                </span>
              </div>
              {title.length > 0 && title.length < 5 && (
                <p className="text-xs text-red-500">5文字以上入力してください</p>
              )}
            </div>

            {/* Content Input */}
            <div className="space-y-2">
              <Label htmlFor="content" className="text-sm font-medium text-gray-700">
                {isYuzuriai ? "詳細説明" : "質問内容"} <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="content"
                placeholder={
                  isYuzuriai
                    ? "アイテムの状態、サイズ、使用期間、受け渡し方法などを詳しく書いてください&#10;&#10;例：&#10;・生後6ヶ月まで使用&#10;・目立った傷はなし&#10;・マットレス付き&#10;・光が丘公園で手渡し希望"
                    : "具体的に知りたいことを詳しく書きましょう&#10;&#10;例：&#10;・いつ頃から症状が出ているか&#10;・どんな状況で困っているか&#10;・これまで試したことがあるか&#10;・どんな情報を求めているか"
                }
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className={`border-gray-300 min-h-[150px] resize-none focus:ring-1 ${
                  isYuzuriai
                    ? "focus:border-orange-500 focus:ring-orange-500"
                    : "focus:border-blue-500 focus:ring-blue-500"
                }`}
                maxLength={1000}
              />
              <div className="flex justify-between items-center">
                <p className="text-xs text-gray-500">20文字以上1000文字以下</p>
                <span className={`text-xs ${content.length > 950 ? "text-red-500" : "text-gray-400"}`}>
                  {content.length}/1000
                </span>
              </div>
              {content.length > 0 && content.length < 20 && (
                <p className="text-xs text-red-500">20文字以上入力してください</p>
              )}
            </div>

            {/* Category Selection */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                カテゴリ <span className="text-red-500">*</span>
              </Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger
                  className={`border-gray-300 focus:ring-1 ${
                    isYuzuriai
                      ? "focus:border-orange-500 focus:ring-orange-500"
                      : "focus:border-blue-500 focus:ring-blue-500"
                  }`}
                >
                  <SelectValue placeholder="カテゴリを選択してください" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Image Upload */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-gray-700">
                {isYuzuriai ? "アイテム写真（推奨）" : "参考画像（任意）"}
              </Label>

              {/* Image Preview */}
              {images.length > 0 && (
                <div className="grid grid-cols-2 gap-2">
                  {images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`${isYuzuriai ? "アイテム" : "参考"}画像 ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg border border-gray-200"
                      />
                      <Button
                        variant="destructive"
                        size="sm"
                        className="absolute top-1 right-1 w-6 h-6 p-0 rounded-full"
                        onClick={() => removeImage(index)}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {/* Upload Button */}
              {images.length < 3 && (
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <Label htmlFor="image-upload" className="cursor-pointer">
                    <div
                      className={`border-2 border-dashed border-gray-300 rounded-lg p-6 text-center transition-colors ${
                        isYuzuriai
                          ? "hover:border-orange-400 hover:bg-orange-50"
                          : "hover:border-blue-400 hover:bg-blue-50"
                      }`}
                    >
                      <div className="flex flex-col items-center space-y-2">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                          <Camera className="w-6 h-6 text-gray-400" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">
                            {isYuzuriai ? "アイテム写真を追加" : "参考画像を追加"}
                          </p>
                          <p className="text-xs text-gray-500">最大3枚まで（残り{3 - images.length}枚）</p>
                        </div>
                      </div>
                    </div>
                  </Label>
                </div>
              )}

              <p className="text-xs text-gray-500">
                <ImageIcon className="w-3 h-3 inline mr-1" />
                {isYuzuriai
                  ? "アイテムの状態がよくわかる写真を撮影してください"
                  : "症状や状況がわかる画像があると、より具体的な回答が得られます"}
              </p>
            </div>

            {/* Post Button */}
            <div className="pt-4">
              <Button
                className={`w-full py-3 text-lg font-semibold rounded-lg transition-all ${
                  canPost
                    ? `text-white shadow-md ${
                        isYuzuriai ? "bg-orange-500 hover:bg-orange-600" : "bg-blue-500 hover:bg-blue-600"
                      }`
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
                disabled={!canPost}
              >
                {isYuzuriai ? "ゆずりあいを投稿する" : "質問を投稿する"}
              </Button>
            </div>

            {/* Guidelines */}
            <div
              className={`p-4 rounded-lg border ${
                isYuzuriai ? "bg-yellow-50 border-yellow-200" : "bg-orange-50 border-orange-200"
              }`}
            >
              <div className="flex items-start space-x-2">
                <AlertCircle className={`w-4 h-4 mt-0.5 ${isYuzuriai ? "text-yellow-500" : "text-orange-500"}`} />
                <div>
                  <h4 className={`text-sm font-medium mb-2 ${isYuzuriai ? "text-yellow-800" : "text-orange-800"}`}>
                    {isYuzuriai ? "安全な取引のために" : "質問のコツ"}
                  </h4>
                  <ul className={`text-xs space-y-1 ${isYuzuriai ? "text-yellow-700" : "text-orange-700"}`}>
                    {isYuzuriai ? (
                      <>
                        <li>• 受け渡しは人通りの多い場所で行いましょう</li>
                        <li>• 個人情報（住所、電話番号）の交換は慎重に</li>
                        <li>• 金銭の授受は原則として行いません</li>
                        <li>• トラブル時は運営にご相談ください</li>
                      </>
                    ) : (
                      <>
                        <li>• 具体的な状況や背景を詳しく書きましょう</li>
                        <li>• 緊急性がある場合は医療機関に直接相談してください</li>
                        <li>• 個人情報（住所、電話番号など）は書かないでください</li>
                        <li>• 他の方の回答にはお礼のコメントをしましょう</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
