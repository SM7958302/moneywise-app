"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Share2 } from "lucide-react"

interface ShareButtonProps {
  title: string
  text: string
  url?: string
}

export function ShareButton({ title, text, url }: ShareButtonProps) {
  const [canShare, setCanShare] = useState(false)
  const [mounted, setMounted] = useState(false)
  const shareUrl = url || (mounted ? window.location.href : "")

  useEffect(() => {
    setMounted(true)
    setCanShare(!!navigator.share)
  }, [])

  const shareData = {
    title,
    text,
    url: shareUrl,
  }

  const handleShare = async () => {
    try {
      if (canShare) {
        await navigator.share(shareData)
      }
    } catch (err) {
      console.log("Error sharing:", err)
    }
  }

  const handleCopyLink = () => {
    const shareText = `${title}\n${text}\n${shareUrl}`
    navigator.clipboard.writeText(shareText)
  }

  const handleTwitterShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text
    )}&url=${encodeURIComponent(shareUrl)}`
    window.open(twitterUrl, "_blank")
  }

  const handleWhatsAppShare = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
      `${title}\n${text}\n${shareUrl}`
    )}`
    window.open(whatsappUrl, "_blank")
  }

  if (!mounted) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {canShare && (
          <DropdownMenuItem onClick={handleShare}>
            Share...
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={handleTwitterShare}>
          Share on Twitter
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleWhatsAppShare}>
          Share on WhatsApp
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleCopyLink}>
          Copy Link
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 