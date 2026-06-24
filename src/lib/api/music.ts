import {
  searchSongs as localSearch,
  getLyrics as localGetLyrics,
  getLyricsBySearch as localGetLyricsBySearch,
  trendingSongs,
  artistDatabase,
  musicCatalog,
  genreBpmMap,
  type SongResult,
  type LyricsResult,
  type ArtistInfo,
  type TrendingSong,
} from "@/lib/data/music-data";

// All data is local — no backend calls needed.
// Works entirely offline, deployed on Vercel with zero dependencies.

export type { SongResult, LyricsResult, ArtistInfo, TrendingSong };

export async function searchSongs(query: string): Promise<SongResult[]> {
  return localSearch(query);
}

export async function getLyrics(trackId: string): Promise<LyricsResult> {
  const result = localGetLyrics(trackId);
  if (!result) throw new Error("Lyrics not found");
  return result;
}

export async function getLyricsBySearch(title: string, artist?: string): Promise<LyricsResult> {
  const result = localGetLyricsBySearch(title, artist);
  if (!result) throw new Error("Lyrics not found");
  return result;
}

export async function getTrending(): Promise<TrendingSong[]> {
  return trendingSongs;
}

export async function getArtistInfo(name: string): Promise<ArtistInfo> {
  const info = artistDatabase[name];
  if (info) return info;
  const track = musicCatalog.find((s) => s.artist.toLowerCase().includes(name.toLowerCase()));
  if (track && artistDatabase[track.artist]) return artistDatabase[track.artist];
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
  return genreBpmMap[genre] || 120;
}
