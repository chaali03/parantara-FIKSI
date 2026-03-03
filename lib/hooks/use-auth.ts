// TanStack Query hooks for authentication

import { useMutation } from '@tanstack/react-query'
import { authApi, ApiError } from '@/lib/api-client'

// Register Step 1 - Send OTP
export function useRegisterStep1() {
  return useMutation({
    mutationFn: authApi.registerStep1,
    retry: (failureCount, error) => {
      // Don't retry on rate limit errors
      if (error instanceof ApiError && error.status === 429) {
        return false
      }
      return failureCount < 1
    },
    retryDelay: 1000
  })
}

// Verify OTP
export function useVerifyOTP() {
  return useMutation({
    mutationFn: authApi.verifyOTP,
    retry: (failureCount, error) => {
      if (error instanceof ApiError && error.status === 429) {
        return false
      }
      return failureCount < 1
    },
    retryDelay: 1000
  })
}

// Forgot Password
export function useForgotPassword() {
  return useMutation({
    mutationFn: authApi.forgotPassword,
    retry: (failureCount, error) => {
      if (error instanceof ApiError && error.status === 429) {
        return false
      }
      return failureCount < 1
    },
    retryDelay: 1000
  })
}

// Verify Reset OTP
export function useVerifyResetOTP() {
  return useMutation({
    mutationFn: authApi.verifyResetOTP,
    retry: (failureCount, error) => {
      if (error instanceof ApiError && error.status === 429) {
        return false
      }
      return failureCount < 1
    },
    retryDelay: 1000
  })
}

// Reset Password
export function useResetPassword() {
  return useMutation({
    mutationFn: authApi.resetPassword,
    retry: (failureCount, error) => {
      if (error instanceof ApiError && error.status === 429) {
        return false
      }
      return failureCount < 1
    },
    retryDelay: 1000
  })
}

