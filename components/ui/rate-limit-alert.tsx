"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Clock, AlertCircle } from "lucide-react"

interface RateLimitAlertProps {
  retryAfter: number
  onComplete?: () => void
}

export function RateLimitAlert({ retryAfter, onComplete }: RateLimitAlertProps) {
  const [timeLeft, setTimeLeft] = useState(retryAfter)

  useEffect(() => {
    if (timeLeft <= 0) {
      onComplete?.()
      return
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          onComplete?.()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft, onComplete])

  return (
    <AnimatePresence>
      {timeLeft > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          className="p-4 bg-orange-50 border-2 border-orange-200 rounded-xl"
        >
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <AlertCircle className="w-5 h-5 text-orange-600" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-orange-900 mb-1">
                Terlalu Banyak Permintaan
              </h4>
              <p className="text-sm text-orange-700 mb-3">
                Anda telah mencapai batas permintaan. Silakan tunggu beberapa saat sebelum mencoba lagi.
              </p>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-orange-600" />
                <span className="font-medium text-orange-900">
                  Coba lagi dalam: <span className="font-bold text-lg">{timeLeft}</span> detik
                </span>
              </div>
              <div className="mt-3 w-full bg-orange-200 rounded-full h-2 overflow-hidden">
                <motion.div
                  className="h-full bg-orange-500"
                  initial={{ width: "100%" }}
                  animate={{ width: "0%" }}
                  transition={{ duration: retryAfter, ease: "linear" }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
