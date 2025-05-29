"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MessageCircle } from "lucide-react"
import Link from "next/link"

interface MessageIconProps {
  unreadCount?: number
}

export function MessageIcon({ unreadCount = 0 }: MessageIconProps) {
  return (
    <Link href="/messages">
      <Button variant="ghost" size="sm" className="p-2 relative">
        <MessageCircle className="w-5 h-5 text-gray-600" />
        {unreadCount > 0 && (
          <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 py-0 min-w-[18px] h-4 flex items-center justify-center rounded-full">
            {unreadCount > 99 ? "99+" : unreadCount}
          </Badge>
        )}
      </Button>
    </Link>
  )
}
