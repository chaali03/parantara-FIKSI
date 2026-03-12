"use client"

import { useState, useRef, useEffect } from "react"

interface OptimizedVideoProps {
  src: string
  poster?: string
  className?: string
  autoPlay?: boolean
  muted?: boolean
  loop?: boolean
  playsInline?: boolean
  preload?: "none" | "metadata" | "auto"
  loading?: "lazy" | "eager"
  width?: number
  height?: number
}

export function OptimizedVideo({
  src,
  poster,
  className = "",
  autoPlay = false,
  muted = true,
  loop = false,
  playsInline = true,
  preload = "none",
  loading = "lazy",
  width,
  height
}: OptimizedVideoProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [shouldLoad, setShouldLoad] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const observerRef = useRef<IntersectionObserver>()

  useEffect(() => {
    // If autoPlay is true or loading is eager, load immediately
    if (autoPlay || loading === "eager") {
      setShouldLoad(true)
      return
    }

    // Only load video when it's near viewport and loading is lazy
    if (loading === "lazy") {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setShouldLoad(true)
              observerRef.current?.disconnect()
            }
          })
        },
        { rootMargin: "100px" }
      )

      if (videoRef.current) {
        observerRef.current.observe(videoRef.current)
      }
    }

    return () => observerRef.current?.disconnect()
  }, [loading, autoPlay])

  const handleLoadedData = () => {
    setIsLoaded(true)
  }

  // Calculate aspect ratio to prevent CLS
  const aspectRatio = width && height ? (height / width) * 100 : undefined

  return (
    <div 
      className={`relative ${className}`}
      style={aspectRatio ? { paddingBottom: `${aspectRatio}%` } : undefined}
    >
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
        </div>
      )}
      
      <video
        ref={videoRef}
        className={`${aspectRatio ? 'absolute inset-0' : ''} w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        playsInline={playsInline}
        poster={poster}
        onLoadedData={handleLoadedData}
        preload={preload}
        width={width}
        height={height}
        style={{
          transform: 'translate3d(0, 0, 0)',
          backfaceVisibility: 'hidden',
          perspective: '1000px'
        }}
      >
        {shouldLoad && <source src={src} type="video/mp4" />}
        Your browser does not support the video tag.
      </video>
    </div>
  )
}