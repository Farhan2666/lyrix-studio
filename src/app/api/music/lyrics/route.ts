import { NextRequest, NextResponse } from "next/server";

const DZ = "https://api.deezer.com";
const LRC = "https://lrclib.net/api";

export async function GET(req: NextRequest) {
  const trackId = req.nextUrl.searchParams.get("trackId");
  const title = req.nextUrl.searchParams.get("title");
  const artist = req.nextUrl.searchParams.get("artist");

  const params = new URLSearchParams();
  const fetchByTrack = async () => {
    if (!trackId) return false;
    const id = trackId.replace("deezer-", "");
    const res = await fetch(`${DZ}/track/${id}`, { signal: AbortSignal.timeout(5000) });
    if (!res.ok) return false;
    const t = await res.json();
    if (!t.artist?.name || !t.title) return false;
    params.set("artist_name", t.artist.name);
    params.set("track_name", t.title);
    return true;
  };

  try {
    if (title && artist) {
      params.set("artist_name", artist);
      params.set("track_name", title);
    } else if (trackId) {
      const ok = await fetchByTrack();
      if (!ok) return NextResponse.json({ error: "Track not found" }, { status: 404 });
    } else {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    const res = await fetch(`${LRC}/get?${params}`, {
      signal: AbortSignal.timeout(6000),
      headers: { "User-Agent": "LyrixStudio/1.0" },
    });
    if (!res.ok) {
      return NextResponse.json({ error: "Lyrics not found" }, { status: 404 });
    }
    const json = await res.json();
    return NextResponse.json({
      lyrics: json.plainLyrics || json.syncedLyrics || "No lyrics available",
      syncedLyrics: json.syncedLyrics || null,
      source: "LRCLIB",
    });
  } catch {
    return NextResponse.json({ error: "Lyrics request failed" }, { status: 502 });
  }
}
