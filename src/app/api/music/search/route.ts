import { NextRequest, NextResponse } from "next/server";

const DZ = "https://api.deezer.com";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q");
  if (!q || !q.trim()) {
    return NextResponse.json({ data: [], error: "Missing query" }, { status: 400 });
  }
  try {
    const res = await fetch(`${DZ}/search?q=${encodeURIComponent(q)}&limit=15`, {
      signal: AbortSignal.timeout(6000),
    });
    if (!res.ok) {
      return NextResponse.json({ data: [], error: "Deezer API error" }, { status: 502 });
    }
    const json = await res.json();
    return NextResponse.json({ data: json.data || [] });
  } catch {
    return NextResponse.json({ data: [], error: "Request failed" }, { status: 502 });
  }
}
