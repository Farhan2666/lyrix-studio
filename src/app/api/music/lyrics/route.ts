import { NextRequest, NextResponse } from "next/server";

const DZ = "https://api.deezer.com";
const LY = "https://api.lyrics.ovh/v1";

export async function GET(req: NextRequest) {
  const trackId = req.nextUrl.searchParams.get("trackId");
  const title = req.nextUrl.searchParams.get("title");
  const artist = req.nextUrl.searchParams.get("artist");

  try {
    if (title && artist) {
      const res = await fetch(`${LY}/${encodeURIComponent(artist)}/${encodeURIComponent(title)}`, {
        signal: AbortSignal.timeout(6000),
      });
      if (res.ok) {
        const json = await res.json();
        if (json.lyrics) {
          return NextResponse.json({ lyrics: json.lyrics, source: "lyrics.ovh" });
        }
      }
    }

    if (trackId) {
      const id = trackId.replace("deezer-", "");
      const trackRes = await fetch(`${DZ}/track/${id}`, { signal: AbortSignal.timeout(5000) });
      if (trackRes.ok) {
        const track = await trackRes.json();
        if (track.artist?.name && track.title) {
          const res = await fetch(`${LY}/${encodeURIComponent(track.artist.name)}/${encodeURIComponent(track.title)}`, {
            signal: AbortSignal.timeout(6000),
          });
          if (res.ok) {
            const json = await res.json();
            if (json.lyrics) {
              return NextResponse.json({ lyrics: json.lyrics, source: "lyrics.ovh" });
            }
          }
        }
      }
    }

    return NextResponse.json({ error: "Lyrics not found" }, { status: 404 });
  } catch {
    return NextResponse.json({ error: "Lyrics request failed" }, { status: 502 });
  }
}
