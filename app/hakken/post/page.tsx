"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, ArrowLeft, Camera, X, ImageIcon } from "lucide-react"
import Link from "next/link"

const categories = [
  "子どもの健康",
  "保活・幼稚園・保育園",
  "行政手続き・助成金",
  "遊び場・お出かけ",
  "地域のお店・サービス",
  "習い事",
  "妊娠・出産",
  "暮らし・その他",
]

export default function PostHakkenScreen() {
  const [content, setContent] = useState("")
  const [category, setCategory] = useState("")
  const [images, setImages] = useState<string[]>([])

  const canPost = content.trim().length >= 10 && content.length <= 500 && category

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && images.length < 3) {
      Array.from(files).forEach((file) => {
        if (images.length < 3) {
          const reader = new FileReader()
          reader.onload = (e) => {
            if (e.target?.result) {
              setImages((prev) => [...prev, e.target.result as string])
            }
          }
          reader.readAsDataURL(file)
        }
      })
    }
  }

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-green-100 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link href="/hakken">
                <Button variant="ghost" size="sm" className="p-1">
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <Heart className="w-4 h-4 text-white" />
                </div>
                <h1 className="text-lg font-bold text-green-700">はっけんを投稿</h1>
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
        <Card className="border-green-200 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-bold text-green-700 text-center">地域の情報をシェアしよう</CardTitle>
            <div className="w-12 h-1 bg-green-400 mx-auto rounded-full"></div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Content Input */}
            <div className="space-y-2">
              <Label htmlFor="content" className="text-sm font-medium text-gray-700">
                投稿内容 <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="content"
                placeholder="今日の出来事や地域情報をシェアしましょう！&#10;&#10;例：&#10;・光が丘公園で桜が満開でした🌸&#10;・○○小児科の先生がとても親切でした&#10;・練馬区の子育て支援センターに行ってきました"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="border-gray-300 focus:border-green-500 focus:ring-green-500 min-h-[120px] resize-none"
                maxLength={500}
              />
              <div className="flex justify-between items-center">
                <p className="text-xs text-gray-500">10文字以上500文字以下</p>
                <span className={`text-xs ${content.length > 450 ? "text-red-500" : "text-gray-400"}`}>
                  {content.length}/500
                </span>
              </div>
              {content.length > 0 && content.length < 10 && (
                <p className="text-xs text-red-500">10文字以上入力してください</p>
              )}
            </div>

            {/* Category Selection */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                カテゴリ <span className="text-red-500">*</span>
              </Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="border-gray-300 focus:border-green-500 focus:ring-green-500">
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
              <Label className="text-sm font-medium text-gray-700">画像（任意）</Label>

              {/* Image Preview */}
              {images.length > 0 && (
                <div className="grid grid-cols-2 gap-2">
                  {images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`アップロード画像 ${index + 1}`}
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
                    multiple={images.length < 3}
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <Label htmlFor="image-upload" className="cursor-pointer">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-400 hover:bg-green-50 transition-colors">
                      <div className="flex flex-col items-center space-y-2">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                          <Camera className="w-6 h-6 text-gray-400" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">写真を追加</p>
                          <p className="text-xs text-gray-500">最大3枚まで（残り{3 - images.length}枚）</p>
                        </div>
                      </div>
                    </div>
                  </Label>
                </div>
              )}

              <p className="text-xs text-gray-500">
                <ImageIcon className="w-3 h-3 inline mr-1" />
                個人が特定できる情報や、お子さんの顔が映った写真の投稿はお控えください
              </p>
            </div>

            {/* Post Button */}
            <div className="pt-4">
              <Button
                className={`w-full py-3 text-lg font-semibold rounded-lg transition-all ${
                  canPost
                    ? "bg-green-500 hover:bg-green-600 text-white shadow-md"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
                disabled={!canPost}
              >
                投稿する
              </Button>
            </div>

            {/* Guidelines */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="text-sm font-medium text-blue-800 mb-2">投稿のガイドライン</h4>
              <ul className="text-xs text-blue-700 space-y-1">
                <li>• 練馬区の子育てに関する情報をシェアしましょう</li>
                <li>• 個人情報や誹謗中傷は禁止です</li>
                <li>• 商業的な宣伝は控えめにお願いします</li>
                <li>• みんなが気持ちよく利用できるよう心がけましょう</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
