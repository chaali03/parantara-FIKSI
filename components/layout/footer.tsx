"use client"

import Link from "next/link"
import { Twitter, Linkedin, Instagram, Facebook } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { PolicyModal } from "@/components/policy-modal"
import { AnimatedSection } from "@/components/animations/animated-section"
import { motion } from "framer-motion"

export function Footer() {
  const [isPolicyOpen, setIsPolicyOpen] = useState(false)
  
  return (
    <AnimatedSection animation="slideUp" className="relative lg:mt-32">
      {/* Background Image */}
      <motion.div 
        initial={{ opacity: 0, scale: 1.05 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
        className="absolute -top-[30vw] sm:-top-[25vw] md:-top-[20vw] left-0 right-0 w-full h-[40vw] z-0 overflow-hidden"
      >
        <Image src="/images/masjid2.webp" alt="Masjid Background" fill className="object-cover object-center" priority />
      </motion.div>

      {/* Large Text Overlay */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        viewport={{ once: true }}
        className="absolute -top-[25vw] sm:-top-[20vw] md:-top-[15vw] left-0 right-0 flex items-end justify-center overflow-visible pointer-events-none z-10"
      >
        <h2 className="font-bold text-center text-[28vw] sm:text-[25vw] md:text-[22vw] lg:text-[20vw] leading-[0.85] tracking-tighter text-white whitespace-nowrap">
          MASJID
        </h2>
      </motion.div>

      <footer id="contact" className="relative z-20 border-t border-border py-16 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-center gap-8"
          >
            <div className="flex flex-col items-center md:items-start">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <div className="relative w-12 h-12">
                  <Image
                    src="/images/logo/DanaMasjid.webp"
                    alt="DanaMasjid Logo"
                    fill
                    sizes="48px"
                    className="object-contain"
                  />
                </div>
              </Link>
              <p className="text-sm text-muted-foreground text-center md:text-left">
                laporan masjid yang transparan dan amanah.
              </p>
            </div>

            <div className="flex gap-4">
              <Link
                href="#"
                aria-label="Twitter"
                className="w-10 h-10 border border-border rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </Link>
              <Link
                href="#"
                aria-label="LinkedIn"
                className="w-10 h-10 border border-border rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </Link>
              <Link
                href="#"
                aria-label="Instagram"
                className="w-10 h-10 border border-border rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </Link>
              <Link
                href="#"
                aria-label="Facebook"
                className="w-10 h-10 border border-border rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="pt-8 mt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4"
          >
            <p className="text-xs text-muted-foreground">© 2026 DanaMasjid. Hak cipta dilindungi.</p>
            <div className="flex items-center gap-4">
              <Link
                href="/kebijakan-privasi"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors underline"
              >
                Kebijakan Privasi
              </Link>
              <span className="text-xs text-muted-foreground">•</span>
              <Link
                href="/syarat-ketentuan"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors underline"
              >
                Syarat & Ketentuan
              </Link>
            </div>
            <p className="text-xs text-muted-foreground">DanaMasjid - Platform Donasi Masjid Terpercaya</p>
          </motion.div>
        </div>
      </footer>

      <PolicyModal open={isPolicyOpen} onOpenChange={setIsPolicyOpen} />
    </AnimatedSection>
  )
}