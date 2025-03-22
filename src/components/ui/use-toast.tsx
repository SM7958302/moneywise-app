import React, { useState, useEffect } from "react"

interface ToastProps {
  title: string
  description: string
  variant?: "default" | "destructive"
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastProps[]>([])

  const toast = (props: ToastProps) => {
    setToasts(prev => [...prev, props])
  }

  useEffect(() => {
    if (toasts.length > 0) {
      const timer = setTimeout(() => {
        setToasts(prev => prev.slice(1))
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [toasts])

  return {
    toast,
    toasts
  }
}

export function Toast({ toasts }: { toasts: ToastProps[] }) {
  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {toasts.map((toast, index) => (
        <div
          key={index}
          className={`rounded-lg p-4 shadow-lg ${
            toast.variant === "destructive"
              ? "bg-red-500 text-white"
              : "bg-white text-gray-900"
          }`}
        >
          <h4 className="font-semibold">{toast.title}</h4>
          <p className="text-sm">{toast.description}</p>
        </div>
      ))}
    </div>
  )
} 