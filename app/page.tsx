"use client";

import { Header } from "@/components/layout"
import dynamic from "next/dynamic"
import { Suspense, useEffect } from "react"

declare global {
  interface Window { __scrollTarget?: string }
}

// Invisible placeholder — sections load silently, no lottie spam per-section
const P = ({ h }: { h: string }) => <div style={{ minHeight: h }} />

function scrollToId(id: string) {
  let attempts = 0
  const tryScroll = () => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" })
    } else if (attempts++ < 40) {
      setTimeout(tryScroll, 150)
    }
  }
  tryScroll()
}

const HeroSection = dynamic(() => import("@/components/sections").then(mod => ({ default: mod.HeroSection })), {
  loading: () => <div className="h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50" />,
  ssr: true,
})
const StatsSection = dynamic(() => import("@/components/sections").then(mod => ({ default: mod.StatsSection })), { ssr: false })
const ServicesSection = dynamic(() => import("@/components/sections").then(mod => ({ default: mod.ServicesSection })), { ssr: false })
const Marquee = dynamic(() => import("@/components/client-wrappers").then(mod => ({ default: mod.Marquee })), { ssr: false })
const FeaturesSection = dynamic(() => import("@/components/sections").then(mod => ({ default: mod.FeaturesSection })), { ssr: false })
const DonationProgramsSection = dynamic(() => import("@/components/sections").then(mod => ({ default: mod.DonationProgramsSection })), { ssr: false })
const ScrollingAnimation = dynamic(() => import("@/components/client-wrappers").then(mod => ({ default: mod.ScrollingAnimation })), { ssr: false })
const TestimonialsSection = dynamic(() => import("@/components/sections").then(mod => ({ default: mod.TestimonialsSection })), { ssr: false })
const FAQSection = dynamic(() => import("@/components/sections").then(mod => ({ default: mod.FAQSection })), { ssr: false })
const CTASection = dynamic(() => import("@/components/sections").then(mod => ({ default: mod.CTASection })), { ssr: false })
const Footer = dynamic(() => import("@/components/layout").then(mod => ({ default: mod.Footer })), { ssr: false })

export default function Home() {
  useEffect(() => {
    // Check for pending scroll target (set by header when navigating from another page)
    const target = window.__scrollTarget
    if (target) {
      window.__scrollTarget = undefined
      scrollToId(target)
      return
    }
    // Also handle URL hash (direct link)
    if (window.location.hash) {
      scrollToId(window.location.hash.slice(1))
    }
  }, [])

  return (
    <main className="min-h-screen bg-background" suppressHydrationWarning>
      <Header />
      <HeroSection />
      <Suspense fallback={<P h="256px" />}><StatsSection /></Suspense>
      <Suspense fallback={<P h="384px" />}><ServicesSection /></Suspense>
      <Suspense fallback={<P h="384px" />}><FeaturesSection /></Suspense>
      <Suspense fallback={<P h="128px" />}><CTASection /></Suspense>
      <Suspense fallback={<P h="128px" />}><Marquee /></Suspense>
      <div id="program" style={{ scrollMarginTop: "100px" }} />
      <Suspense fallback={<P h="800px" />}><DonationProgramsSection /></Suspense>
      <Suspense fallback={<P h="384px" />}><ScrollingAnimation /></Suspense>
      <Suspense fallback={<P h="384px" />}><TestimonialsSection /></Suspense>
      <Suspense fallback={<P h="384px" />}><FAQSection /></Suspense>
      <Suspense fallback={<P h="256px" />}><Footer /></Suspense>
    </main>
  )
}
