"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Heart, ArrowLeft, User, MapPin, Baby } from "lucide-react"

export default function ProfileRequiredScreen() {
  const [nickname, setNickname] = useState("")
  const [postalCode, setPostalCode] = useState("")
  const [hasChildren, setHasChildren] = useState("")
  const [childrenAges, setChildrenAges] = useState<string[]>([])
  const [dueDate, setDueDate] = useState("")

  const isValidNickname = nickname.length >= 2 && nickname.length <= 15
  const isValidPostalCode =
    /^[0-9]{7}$/.test(postalCode) &&
    (postalCode.startsWith("176") ||
      postalCode.startsWith("177") ||
      postalCode.startsWith("178") ||
      postalCode.startsWith("179"))

  const hasValidChildrenInfo =
    hasChildren === "no-children" ||
    hasChildren === "ended" ||
    (hasChildren === "has-children" && childrenAges.length > 0)

  const canProceed = isValidNickname && isValidPostalCode && hasChildren && hasValidChildrenInfo

  const handleChildrenAgeChange = (age: string, checked: boolean) => {
    if (checked) {
      setChildrenAges([...childrenAges, age])
    } else {
      setChildrenAges(childrenAges.filter((a) => a !== age))
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
            <div className="h-2 bg-green-500 rounded-full w-1/2"></div>
          </div>
          <span className="text-sm text-gray-600">1/2</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 max-w-md mx-auto px-4 pb-6 w-full">
        <Card className="border-green-200 shadow-lg">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl font-bold text-green-700">プロフィールを設定しましょう</CardTitle>
            <div className="w-12 h-1 bg-green-400 mx-auto rounded-full"></div>
          </CardHeader>

          <CardContent className="space-y-6">
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
                placeholder="例：ねりまママ"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="border-gray-300 focus:border-green-500 focus:ring-green-500"
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

            {/* Postal Code */}
            <div className="space-y-2">
              <Label htmlFor="postalCode" className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>
                  練馬区の郵便番号 <span className="text-red-500">*</span>
                </span>
              </Label>
              <Input
                id="postalCode"
                placeholder="1760001"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value.replace(/[^0-9]/g, ""))}
                className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                maxLength={7}
              />
              <p className="text-xs text-gray-500">半角数字7桁（例：1760001）</p>
              {postalCode.length === 7 && !isValidPostalCode && (
                <p className="text-xs text-red-500">練馬区の郵便番号を入力してください（176-179で始まる番号）</p>
              )}
              <p className="text-xs text-blue-600">これを練馬区在住の簡易確認とさせていただきます</p>
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
              <div className="space-y-3 p-4 bg-green-50 rounded-lg border border-green-100">
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

            {/* Next Button */}
            <Button
              className={`w-full py-3 text-lg font-semibold rounded-lg transition-all ${
                canProceed
                  ? "bg-green-500 hover:bg-green-600 text-white shadow-md"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
              disabled={!canProceed}
            >
              次へ
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
