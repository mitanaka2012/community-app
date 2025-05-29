"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Heart, Mail, Lock, Eye, EyeOff } from "lucide-react"
import Link from "next/link"

export default function LoginScreen() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const isValidEmail = email.includes("@") && email.includes(".")
  const isValidPassword = password.length >= 8
  const canLogin = isValidEmail && isValidPassword

  const handleLogin = () => {
    if (canLogin) {
      // ログイン処理
      window.location.href = "/hakken"
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
      <div className="flex-1 max-w-md mx-auto px-4 py-8 w-full flex items-center">
        <Card className="border-green-200 shadow-lg w-full">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold text-green-700 mb-2">ログイン</CardTitle>
            <div className="w-16 h-1 bg-green-400 mx-auto rounded-full"></div>
            <p className="text-sm text-gray-600 mt-4">練馬区の子育てコミュニティへようこそ</p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Google Login */}
            <Button
              variant="outline"
              className="w-full py-3 border-gray-300 hover:bg-gray-50 flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span>Googleアカウントでログイン</span>
            </Button>

            <div className="relative">
              <Separator />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-white px-3 text-sm text-gray-500">または</span>
              </div>
            </div>

            {/* Email/Password Form */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  メールアドレス
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 border-gray-300 focus:border-green-500 focus:ring-green-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  パスワード
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="パスワードを入力"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 border-gray-300 focus:border-green-500 focus:ring-green-500"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Forgot Password */}
              <div className="text-right">
                <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
                  パスワードを忘れた方
                </Link>
              </div>
            </div>

            {/* Login Button */}
            <Button
              className={`w-full py-3 text-lg font-semibold rounded-lg transition-all ${
                canLogin
                  ? "bg-green-500 hover:bg-green-600 text-white shadow-md"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
              disabled={!canLogin}
              onClick={handleLogin}
            >
              ログイン
            </Button>

            {/* Signup Link */}
            <div className="text-center pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-600">
                アカウントをお持ちでない方は
                <Link href="/welcome" className="text-blue-600 underline ml-1">
                  新規登録
                </Link>
              </p>
            </div>

            {/* App Description */}
            <div className="bg-green-50 p-4 rounded-lg border border-green-100 mt-6">
              <h3 className="text-sm font-medium text-green-800 mb-2">ねりまの子について</h3>
              <p className="text-xs text-green-700 leading-relaxed">
                練馬区の子育て世代のためのコミュニティアプリです。地域の生きた子育て情報の交換、悩みや喜びの共有、不用品の譲渡など、安心して子育てができる環境を一緒に作りましょう。
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
