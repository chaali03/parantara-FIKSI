import { NextResponse } from "next/server"

// Cache provinces for 24 hours - avoids emsifa.com being in critical path
export const revalidate = 86400

export async function GET() {
  try {
    const res = await fetch("https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json", {
      next: { revalidate: 86400 },
    })
    if (!res.ok) throw new Error("upstream error")
    const data = await res.json()
    return NextResponse.json(data, {
      headers: { "Cache-Control": "public, max-age=86400, stale-while-revalidate=3600" },
    })
  } catch {
    return NextResponse.json([], { status: 502 })
  }
}
