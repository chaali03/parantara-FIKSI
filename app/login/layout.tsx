'use client'

import Script from "next/script"
import { AuthProvider } from "@/lib/auth-context"

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      {/* Preload critical resources for login page */}
      <link rel="preload" as="image" href="/images/login/loginnnn.webp" fetchPriority="high" />
      <link rel="preload" as="video" href="/vidio/login.mp4" />
      
      {/* Structured Data for Login Page - defer to avoid blocking */}
      <Script
        id="login-page-schema"
        type="application/ld+json"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Login Admin - DanaMasjid",
            "description": "Masuk ke dashboard admin DanaMasjid untuk mengelola donasi masjid Anda",
            "url": "https://danamasjid.com/login",
            "isPartOf": {
              "@type": "WebSite",
              "name": "DanaMasjid",
              "url": "https://danamasjid.com"
            }
          })
        }}
      />
      {children}
    </AuthProvider>
  )
}
