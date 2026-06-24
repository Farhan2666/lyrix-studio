import type { SongResult, LyricsResult, ArtistInfo, TrendingSong } from "@/lib/data/music-data";
import { searchSongs as localSearch, getLyrics as localGetLyrics, getLyricsBySearch as localGetLyricsBySearch, trendingSongs as localTrending, artistDatabase } from "@/lib/data/music-data";

export type { SongResult, LyricsResult, ArtistInfo, TrendingSong };

const DEEZER_API = "https://api.deezer.com";
const LYRIC_OVH = "https://api.lyrics.ovh/v1";

function deezerTrackToResult(t: any): SongResult {
  return {
    id: `deezer-${t.id}`,
    title: t.title,
    artist: t.artist?.name || "Unknown",
    album: t.album?.title || "Unknown",
    albumArt: (t.album?.cover || "").replace("https://", "https://"),
    previewUrl: t.preview || null,
    genre: "Pop",
    duration: t.duration || 0,
    source: "Deezer",
  };
}

export async function searchSongs(query: string): Promise<SongResult[]> {
  if (!query.trim()) return [];
  try {
    const res = await fetch(`${DEEZER_API}/search?q=${encodeURIComponent(query)}&limit=15`, { signal: AbortSignal.timeout(5000) });
    if (!res.ok) throw new Error("Deezer error");
    const json = await res.json();
    if (json.data?.length > 0) return json.data.map(deezerTrackToResult);
  } catch {}
  return localSearch(query);
}

export async function getLyrics(trackId: string): Promise<LyricsResult> {
  // Deezer ID is after "deezer-" prefix
  const deezerId = trackId.replace("deezer-", "");
  try {
    // First get track info to get artist/title
    const trackRes = await fetch(`${DEEZER_API}/track/${deezerId}`, { signal: AbortSignal.timeout(5000) });
    if (trackRes.ok) {
      const track = await trackRes.json();
      if (track.artist?.name && track.title) {
        const lyricRes = await fetch(`${LYRIC_OVH}/${encodeURIComponent(track.artist.name)}/${encodeURIComponent(track.title)}`, { signal: AbortSignal.timeout(5000) });
        if (lyricRes.ok) {
          const lyricJson = await lyricRes.json();
          if (lyricJson.lyrics) {
            return { lyrics: lyricJson.lyrics, source: "lyrics.ovh", copyright: "Lyrics provided by lyrics.ovh" };
          }
        }
      }
    }
  } catch {}
  const local = localGetLyrics(trackId);
  if (local) return local;
  throw new Error("Lyrics not found");
}

export async function getLyricsBySearch(title: string, artist?: string): Promise<LyricsResult> {
  try {
    const url = artist ? `${LYRIC_OVH}/${encodeURIComponent(artist)}/${encodeURIComponent(title)}` : null;
    if (url) {
      const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
      if (res.ok) {
        const json = await res.json();
        if (json.lyrics) return { lyrics: json.lyrics, source: "lyrics.ovh", copyright: "Lyrics provided by lyrics.ovh" };
      }
    }
  } catch {}
  const local = localGetLyricsBySearch(title, artist);
  if (local) return local;
  throw new Error("Lyrics not found");
}

export async function getTrending(): Promise<TrendingSong[]> {
  try {
    const res = await fetch(`${DEEZER_API}/chart/0/tracks?limit=10`, { signal: AbortSignal.timeout(5000) });
    if (res.ok) {
      const json = await res.json();
      if (json.data?.length > 0) {
        return json.data.slice(0, 8).map((t: any, i: number) => ({
          id: `trend-deezer-${t.id}`,
          title: t.title,
          artist: t.artist?.name || "Unknown",
          albumArt: (t.album?.cover || "").replace("https://", "https://"),
          genre: "Pop",
          plays: `${(100 - i * 12)}M`,
        }));
      }
    }
  } catch {}
  return localTrending;
}

export async function getArtistInfo(name: string): Promise<ArtistInfo> {
  try {
    const res = await fetch(`${DEEZER_API}/search/artist?q=${encodeURIComponent(name)}&limit=1`, { signal: AbortSignal.timeout(5000) });
    if (res.ok) {
      const json = await res.json();
      if (json.data?.length > 0) {
        const a = json.data[0];
        const info: ArtistInfo = {
          name: a.name,
          image: a.picture_big || a.picture || "",
          bio: `${a.name} is an artist on Deezer with ${(a.nb_fan || 0).toLocaleString()} fans.`,
          similar: [],
          topTracks: [],
          genre: "Pop",
        };
        try {
          const topRes = await fetch(`${DEEZER_API}/artist/${a.id}/top?limit=5`, { signal: AbortSignal.timeout(3000) });
          if (topRes.ok) {
            const topJson = await topRes.json();
            info.topTracks = (topJson.data || []).map((t: any) => ({ title: t.title, plays: `${(t.rank || 0)}` }));
          }
        } catch {}
        try {
          const relRes = await fetch(`${DEEZER_API}/artist/${a.id}/related?limit=3`, { signal: AbortSignal.timeout(3000) });
          if (relRes.ok) {
            const relJson = await relRes.json();
            info.similar = (relJson.data || []).map((r: any) => ({ name: r.name, image: r.picture || "" }));
          }
        } catch {}
        return info;
      }
    }
  } catch {}
  const local = artistDatabase[name];
  if (local) return local;
  throw new Error("Artist not found");
}

export async function suggestTemplates(genre: string): Promise<string[]> {
  const genreMap: Record<string, string[]> = {
    EDM: ["Neon Pulse", "Cyber Rain"],
    Synthwave: ["Midnight Vapor"],
    "Hip-Hop": ["Urban Flow", "Lo-Fi Beats"],
    Indie: ["Acoustic Warmth", "Jazz Night"],
    Rock: ["Rock Anthem"],
    Pop: ["Neon Pulse"],
    Jazz: ["Jazz Night"],
    Ambient: ["Acoustic Warmth"],
    World: ["Urban Flow"],
  };
  return genreMap[genre] || [];
}

export function getBpmForGenre(genre: string): number {
  const map: Record<string, number> = {
    EDM: 128, Synthwave: 90, "Hip-Hop": 95, Indie: 110, Rock: 140, Pop: 120, Jazz: 70, Ambient: 80, World: 100,
  };
  return map[genre] || 120;
}
