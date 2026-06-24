import { NextResponse } from "next/server";

const DZ = "https://api.deezer.com";

export async function GET() {
  try {
    const res = await fetch(`${DZ}/chart/0/tracks?limit=10`, {
      signal: AbortSignal.timeout(6000),
    });
    if (!res.ok) {
      return NextResponse.json({ data: [], error: "Deezer API error" }, { status: 502 });
    }
    const json = await res.json();
    return NextResponse.json({ tracks: json.data || [] });
  } catch {
    return NextResponse.json({ data: [], error: "Request failed" }, { status: 502 });
  }
}
