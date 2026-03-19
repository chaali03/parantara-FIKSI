import { NextResponse } from "next/server"

export const revalidate = 86400

export async function GET(_: Request, { params }: { params: { provinceId: string } }) {
  try {
    const res = await fetch(
      `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${params.provinceId}.json`,
      { next: { revalidate: 86400 } }
    )
    if (!res.ok) throw new Error("upstream error")
    const data = await res.json()
    return NextResponse.json(data, {
      headers: { "Cache-Control": "public, max-age=86400, stale-while-revalidate=3600" },
    })
  } catch {
    return NextResponse.json([], { status: 502 })
  }
}
