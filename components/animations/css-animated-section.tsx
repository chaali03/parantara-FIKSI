"use client"

import { ReactNode } from "react"
import { useCSSAnimation } from "@/hooks/use-css-animation"

interface CSSAnimatedSectionProps {
  children: ReactNode
  className?: string
  animation?: "fadeIn" | "slideUp" | "slideLeft" | "scaleIn"
  delay?: number
  threshold?: number
}

const animationClasses = {
  fadeIn: "animate-optimized-fade-in",
  slideUp: "animate-optimized-slide-up", 
  slideLeft: "animate-optimized-slide-left",
  scaleIn: "animate-optimized-scale-in"
}

const delayClasses = {
  0: "",
  100: "animate-delay-100",
  200: "animate-delay-200", 
  300: "animate-delay-300",
  400: "animate-delay-400",
  500: "animate-delay-500"
}

export function CSSAnimatedSection({
  children,
  className = "",
  animation = "fadeIn",
  delay = 0,
  threshold = 0.1
}: CSSAnimatedSectionProps) {
  const animationClass = animationClasses[animation]
  const delayClass = delayClasses[delay as keyof typeof delayClasses] || ""
  
  const { ref } = useCSSAnimation({
    threshold,
    triggerOnce: true,
    animationClass: `${animationClass} ${delayClass}`.trim()
  })

  return (
    <section
      ref={ref}
      className={`opacity-0 ${className}`}
      style={{ willChange: 'transform, opacity' }}
    >
      {children}
    </section>
  )
}