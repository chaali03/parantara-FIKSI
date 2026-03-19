"use client"

import { ReactNode, useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

interface Hero03Props {
  title: ReactNode
  subtitle?: string
  className?: string
  variant?: "privacy" | "terms"
}

interface ImageData {
  src: string
  title: string
  category: string
  year: string
}

export function Hero03({ title, subtitle, className = "", variant = "privacy" }: Hero03Props) {
  const isPrivacy = variant === "privacy"
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Detect touch device
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0)
    
    // Scroll to center card on mobile/tablet
    if (scrollContainerRef.current && window.innerWidth < 1024) {
      const container = scrollContainerRef.current
      const centerCard = container.children[2] as HTMLElement // Index 2 is center card
      if (centerCard) {
        const scrollLeft = centerCard.offsetLeft - (container.clientWidth / 2) + (centerCard.clientWidth / 2)
        container.scrollLeft = scrollLeft
      }
    }
  }, [])
  
  const images: ImageData[] = isPrivacy ? [
    {
      src: "/images/profil/profil1.webp",
      title: "PERLINDUNGAN DATA",
      category: "KEAMANAN",
      year: "2024"
    },
    {
      src: "/images/masjid/interior.webp",
      title: "ENKRIPSI DATA",
      category: "TEKNOLOGI",
      year: "2024"
    },
    {
      src: "/images/profil/profil2.webp",
      title: "PRIVASI PENGGUNA",
      category: "KEPATUHAN",
      year: "2024"
    },
    {
      src: "/images/masjid/masjid.webp",
      title: "AKSES AMAN",
      category: "AUTENTIKASI",
      year: "2024"
    },
    {
      src: "/images/profil/profil3.webp",
      title: "INTEGRITAS DATA",
      category: "PERLINDUNGAN",
      year: "2024"
    },
  ] : [
    {
      src: "/images/profil/profil5.webp",
      title: "KETENTUAN HUKUM",
      category: "KEPATUHAN",
      year: "2024"
    },
    {
      src: "/images/profil/profil6.webp",
      title: "PERJANJIAN PENGGUNA",
      category: "KONTRAK",
      year: "2024"
    },
    {
      src: "/images/profil/profil7.webp",
      title: "KEBIJAKAN LAYANAN",
      category: "PANDUAN",
      year: "2024"
    },
    {
      src: "/images/profil/profil8.webp",
      title: "REGULASI",
      category: "HUKUM",
      year: "2024"
    },
    {
      src: "/images/program/komunitas.webp",
      title: "KEWAJIBAN",
      category: "TANGGUNG JAWAB",
      year: "2024"
    },
  ]

  return (
    <section className={`relative min-h-screen flex items-center justify-center overflow-hidden ${className}`}>
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/privacy/bg.webp"
          alt="Background"
          fill
          className="object-cover"
          priority={false}
          loading="lazy"
          quality={60}
          sizes="100vw"
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-white/80" />
      </div>

      <div className="relative z-10 w-full max-w-[1800px] mx-auto px-6 py-24 md:py-32">
        {/* Hero Text - Centered, Balanced Size */}
        <div className="text-center mb-16 md:mb-20 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-gray-900 leading-[1.1] tracking-tight">
              {title}
            </h1>
          </motion.div>

          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="text-base md:text-lg text-gray-500 max-w-3xl mx-auto mt-8 font-light leading-relaxed"
            >
              {subtitle}
            </motion.p>
          )}
        </div>

        {/* Cards Grid - Desktop: centered, Mobile/Tablet: horizontal scroll from center */}
        <div className="relative lg:mx-0 lg:px-0">
          <div 
            ref={scrollContainerRef}
            className="flex items-end gap-4 md:gap-6 overflow-x-auto lg:overflow-visible pb-6 snap-x snap-mandatory lg:snap-none scrollbar-hide lg:justify-center px-[calc(50vw-140px)] lg:px-0"
          >
            {images.map((image, index) => {
              const isCenterCard = index === 2
              const isHovered = hoveredIndex === index
              const isShrunk = hoveredIndex !== null && hoveredIndex !== index
              
              // Default dimensions - consistent across all devices
              const defaultWidth = isCenterCard ? 360 : 280
              const defaultHeight = isCenterCard ? 540 : 460
              
              // Calculate dimensions only when hover state changes
              let cardWidth = defaultWidth
              let cardHeight = defaultHeight
              
              if (isHovered) {
                // Expand when hovered/tapped
                cardWidth = isCenterCard ? 480 : 400
                cardHeight = isCenterCard ? 600 : 520
              } else if (isShrunk) {
                // Shrink when another card is hovered/tapped
                cardWidth = isCenterCard ? 240 : 180
                cardHeight = isCenterCard ? 480 : 400
              }

              const handleInteraction = (e: React.MouseEvent | React.TouchEvent) => {
                e.stopPropagation() // Prevent event bubbling to gap
                if (isTouchDevice) {
                  // Toggle on touch devices
                  setHoveredIndex(hoveredIndex === index ? null : index)
                }
              }

              const handleMouseEnter = () => {
                if (!isTouchDevice) {
                  setHoveredIndex(index)
                }
              }

              const handleMouseLeave = () => {
                if (!isTouchDevice) {
                  setHoveredIndex(null)
                }
              }
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                  }}
                  transition={{ 
                    opacity: { duration: 0.6, delay: index * 0.1 },
                    y: { duration: 0.6, delay: index * 0.1 },
                  }}
                  className="relative flex-shrink-0 snap-center lg:snap-align-none"
                  style={{
                    width: `${cardWidth}px`,
                    height: `${cardHeight}px`,
                    transition: 'width 800ms cubic-bezier(0.4, 0, 0.2, 1), height 800ms cubic-bezier(0.4, 0, 0.2, 1), opacity 700ms ease',
                    opacity: isShrunk ? 0.7 : 1,
                  }}
                >
                  <motion.div
                    className="relative w-full h-full cursor-pointer"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleInteraction}
                    animate={{
                      y: isHovered ? -10 : 0,
                    }}
                    transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                  >
                    <div 
                      className="relative w-full h-full rounded-[48px] overflow-hidden bg-gray-100"
                      style={{
                        boxShadow: isHovered 
                          ? '0 40px 100px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.05)' 
                          : isShrunk
                          ? '0 10px 30px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.03)'
                          : '0 20px 60px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.04)',
                        transition: 'box-shadow 700ms cubic-bezier(0.4, 0, 0.2, 1)',
                      }}
                    >
                      {/* Image */}
                      <div className="absolute inset-0 overflow-hidden">
                        <motion.div
                          className="relative w-full h-full"
                          animate={{
                            scale: isHovered ? 1.1 : 1,
                          }}
                          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
                        >
                          <Image
                            src={image.src}
                            alt={image.title}
                            fill
                            className="object-cover object-center"
                            style={{
                              filter: isHovered 
                                ? 'brightness(0.9) contrast(1.05) saturate(1.1)' 
                                : isShrunk
                                ? 'brightness(0.7) contrast(0.95) saturate(0.85) grayscale(0.3)'
                                : 'brightness(0.8) contrast(1) saturate(1)',
                              transition: 'filter 700ms cubic-bezier(0.4, 0, 0.2, 1)',
                            }}
                            sizes="(max-width: 768px) 280px, (max-width: 1024px) 360px, 400px"
                            loading={index === 2 ? "eager" : "lazy"}
                            priority={index === 2}
                            fetchPriority={index === 2 ? "high" : "low"}
                            quality={75}
                          />
                        </motion.div>
                      </div>
                      
                      {/* Base Gradient */}
                      <div 
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.6) 100%)',
                        }}
                      />
                      
                      {/* Hover Content */}
                      <AnimatePresence>
                        {isHovered && (
                          <>
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.4 }}
                              className="absolute inset-0 pointer-events-none"
                              style={{
                                background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.85) 100%)',
                              }}
                            />
                            
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.4 }}
                              className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 lg:p-10"
                            >
                              <motion.div
                                initial={{ y: 30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: 30, opacity: 0 }}
                                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                              >
                                <p className="text-white/95 text-[10px] md:text-[11px] font-bold tracking-[0.4em] mb-3 md:mb-4 uppercase">
                                  {image.category}
                                </p>
                                <h3 className="text-white text-xl md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4 leading-[1.1] tracking-tight">
                                  {image.title}
                                </h3>
                                <p className="text-white/70 text-sm md:text-base font-light">
                                  {image.year}
                                </p>
                              </motion.div>
                              
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                                className="absolute top-6 right-6 md:top-8 md:right-8 w-2.5 h-2.5 md:w-3 md:h-3 bg-white rounded-full shadow-lg"
                              />
                            </motion.div>
                          </>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
          
          {/* Scroll indicator dots - visible on mobile/tablet */}
          <div className="flex justify-center gap-2 mt-8 lg:hidden">
            {images.map((_, index) => (
              <div
                key={index}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  hoveredIndex === index 
                    ? 'w-8 bg-gray-900' 
                    : 'w-1.5 bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
        
        {/* Hide scrollbar */}
        <style jsx>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
      </div>
    </section>
  )
}
