declare global {
  interface Window {
    __pageLoadingPending?: boolean
    __pageLoadingShow?: () => void
  }
}

export function triggerPageLoading(): void {
  if (typeof window === "undefined") return
  window.__pageLoadingPending = true

  if (typeof window.__pageLoadingShow === "function") {
    // Inner is mounted — call directly, no timing issues
    window.__pageLoadingShow()
  } else {
    // Inner not yet mounted (e.g. first load) — dispatch event as fallback
    // Inner will also check __pageLoadingPending on mount
    window.dispatchEvent(new CustomEvent("page-navigate"))
  }
}

export function clearPageLoadingPending(): void {
  if (typeof window !== "undefined") window.__pageLoadingPending = false
}
