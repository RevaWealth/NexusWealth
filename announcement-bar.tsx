"use client"

import { useState } from "react"
import { X, ExternalLink } from "lucide-react"

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-500 text-white py-2 px-4 text-center relative">
      <div className="flex items-center justify-center space-x-2 text-sm">
        <span>🚀 NWIS Token Presale is LIVE! Early bird discount available.</span>
        <a href="#token-sale" className="underline hover:no-underline flex items-center space-x-1">
          <span>Join Now</span>
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-200"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}
