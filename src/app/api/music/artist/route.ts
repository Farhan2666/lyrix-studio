import { NextRequest, NextResponse } from "next/server";

const DZ = "https://api.deezer.com";

export async function GET(req: NextRequest) {
  const name = req.nextUrl.searchParams.get("name");
  if (!name) {
    return NextResponse.json({ error: "Missing artist name" }, { status: 400 });
  }

  try {
    const searchRes = await fetch(`${DZ}/search/artist?q=${encodeURIComponent(name)}&limit=1`, {
      signal: AbortSignal.timeout(6000),
    });
    if (!searchRes.ok) throw new Error("Deezer error");
    const searchJson = await searchRes.json();
    if (!searchJson.data?.length) {
      return NextResponse.json({ error: "Artist not found" }, { status: 404 });
    }

    const a = searchJson.data[0];
    const info: Record<string, unknown> = {
      name: a.name,
      image: a.picture_big || a.picture || "",
      nb_fan: a.nb_fan || 0,
    };

    const [topRes, relRes] = await Promise.allSettled([
      fetch(`${DZ}/artist/${a.id}/top?limit=5`, { signal: AbortSignal.timeout(4000) }),
      fetch(`${DZ}/artist/${a.id}/related?limit=3`, { signal: AbortSignal.timeout(4000) }),
    ]);

    if (topRes.status === "fulfilled" && topRes.value.ok) {
      const topJson = await topRes.value.json();
      info.topTracks = (topJson.data || []).map((t: any) => ({ title: t.title, rank: t.rank }));
    }
    if (relRes.status === "fulfilled" && relRes.value.ok) {
      const relJson = await relRes.value.json();
      info.similar = (relJson.data || []).map((r: any) => ({
        name: r.name,
        image: r.picture || "",
      }));
    }

    return NextResponse.json(info);
  } catch {
    return NextResponse.json({ error: "Artist request failed" }, { status: 502 });
  }
}
