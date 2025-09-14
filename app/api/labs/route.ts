import { NextResponse } from "next/server"
import { mockData } from "@/lib/data"

export async function GET() {
  try {
    const labs = mockData.getLabs()
    return NextResponse.json(labs)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch labs" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    // In a real app, this would save to database
    console.log("Creating lab:", body)
    return NextResponse.json({ success: true, id: Date.now().toString() })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create lab" }, { status: 500 })
  }
}
