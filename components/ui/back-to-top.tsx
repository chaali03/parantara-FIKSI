"use client"

import { useState, useEffect } from "react"
import { ArrowUp } from "lucide-react"

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    let rafId: number
    let ticking = false

    const toggleVisibility = () => {
      if (!ticking) {
        rafId = requestAnimationFrame(() => {
          const scrollY = window.pageYOffset || document.documentElement.scrollTop
          setIsVisible(scrollY > 300)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", toggleVisibility, { passive: true })
    return () => {
      window.removeEventListener("scroll", toggleVisibility)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <button
      onClick={scrollToTop}
      suppressHydrationWarning
      className={`fixed bottom-8 right-8 z-40 p-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full shadow-2xl transition-all duration-300 transform ${
        isVisible 
          ? 'opacity-100 scale-100 translate-y-0' 
          : 'opacity-0 scale-50 translate-y-4 pointer-events-none'
      }`}
      aria-label="Back to top"
    >
      <ArrowUp className="w-6 h-6" />
    </button>
  )
}
