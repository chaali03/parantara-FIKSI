"use client"

import { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 relative overflow-hidden">
      {/* Main Login Card - Split Screen */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row"
      >
        {/* Left Side - Image/Illustration */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-emerald-100 to-teal-100 p-12 flex-col items-center justify-center relative">
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src="/images/logo/DanaMasjid.png"
              alt="DanaMasjid"
              width={300}
              height={300}
              className="object-contain"
            />
          </div>
          <div className="absolute bottom-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">DanaMasjid</h2>
            <p className="text-gray-600 text-sm max-w-xs">
              Platform donasi masjid yang transparan dan amanah
            </p>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 p-8 md:p-12 flex items-center justify-center">
          <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-3 lg:hidden">
            <div className="relative w-10 h-10">
              <Image
                src="/images/logo/DanaMasjid.png"
                alt="DanaMasjid Logo"
                fill
                className="object-contain"
              />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Login</h1>
          </div>
          <h1 className="hidden lg:block text-3xl font-bold text-gray-900 mb-2">Admin Login</h1>
          <p className="text-gray-500 text-sm">
            Hey, Enter your details to get sign in to your account
          </p>
        </div>

        {/* Login Form */}
        <form className="space-y-4">
          {/* Email/Phone Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Enter Email / Phone No"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all text-sm"
            />
            <button
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
              </svg>
            </button>
          </div>

          {/* Password Input */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Passcode"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all text-sm"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 text-xs font-medium hover:text-gray-800"
            >
              {showPassword ? "Hide" : "Hide"}
            </button>
          </div>

          {/* Trouble signing in */}
          <div className="text-left">
            <Link href="/forgot-password" className="text-sm text-gray-600 hover:text-gray-800">
              Having trouble in sign in?
            </Link>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-orange-300 to-orange-400 text-gray-900 rounded-xl font-semibold hover:from-orange-400 hover:to-orange-500 transition-all shadow-md"
          >
            Sign in
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-4 bg-white text-gray-500">— Or Sign in with —</span>
          </div>
        </div>

        {/* Social Login Buttons */}
        <div className="flex gap-4 justify-center">
          <button className="flex items-center gap-2 px-6 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span className="text-sm font-medium text-gray-700">Google</span>
          </button>

          <button className="flex items-center gap-2 px-6 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
            </svg>
            <span className="text-sm font-medium text-gray-700">Apple ID</span>
          </button>

          <button className="flex items-center gap-2 px-6 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            <span className="text-sm font-medium text-gray-700">Facebook</span>
          </button>
        </div>

        {/* Sign Up Link */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{" "}
          <Link href="/register" className="text-gray-900 font-semibold hover:underline">
            Request Now
          </Link>
        </p>
          </div>
        </div>
      </motion.div>

      {/* Footer */}
      <div className="absolute bottom-6 left-0 right-0 text-center text-xs text-gray-500">
        Copyright @danamasjid 2025 | Privacy Policy
      </div>
    </div>
  )
}
