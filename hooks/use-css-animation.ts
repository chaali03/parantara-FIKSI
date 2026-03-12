import { useEffect, useRef, useState } from 'react'

interface UseCSSAnimationOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
  animationClass?: string
}

export function useCSSAnimation(
  options: UseCSSAnimationOptions = {}
) {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    triggerOnce = true,
    animationClass = 'animate-optimized-fade-in'
  } = options

  const [isVisible, setIsVisible] = useState(false)
  const [hasTriggered, setHasTriggered] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting
        
        if (isIntersecting && (!triggerOnce || !hasTriggered)) {
          setIsVisible(true)
          element.classList.add(animationClass)
          
          if (triggerOnce) {
            setHasTriggered(true)
          }
          
          // Remove will-change after animation completes
          setTimeout(() => {
            element.classList.remove('animating')
          }, 600)
          
        } else if (!triggerOnce && !isIntersecting) {
          setIsVisible(false)
          element.classList.remove(animationClass)
        }
      },
      {
        threshold,
        rootMargin,
      }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [threshold, rootMargin, triggerOnce, hasTriggered, animationClass])

  return { ref, isVisible }
}