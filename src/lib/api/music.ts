export interface SongResult {
  id: string;
  title: string;
  artist: string;
  album: string;
  albumArt: string;
  previewUrl: string | null;
  genre: string;
  duration: number;
  source: string;
}

export interface LyricsResult {
  lyrics: string;
  source: string;
  copyright?: string;
}

export interface TrendingSong {
  id: string;
  title: string;
  artist: string;
  albumArt: string;
  genre: string;
  plays: string;
}

export interface ArtistInfo {
  name: string;
  image: string;
  bio: string;
  nb_fan?: number;
  similar: { name: string; image: string }[];
  topTracks: { title: string; rank?: number; plays?: string }[];
  genre: string;
}

function deezerToSong(t: any): SongResult {
  return {
    id: `deezer-${t.id}`,
    title: t.title,
    artist: t.artist?.name || "Unknown",
    album: t.album?.title || "Unknown",
    albumArt: (t.album?.cover || "").replace("http://", "https://"),
    previewUrl: t.preview || null,
    genre: "Pop",
    duration: t.duration || 0,
    source: "Deezer",
  };
}

export async function searchSongs(query: string): Promise<SongResult[]> {
  if (!query.trim()) return [];
  const res = await fetch(`/api/music/search?q=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error("Search failed");
  const json = await res.json();
  return (json.data || []).map(deezerToSong);
}

export async function getLyrics(trackId: string): Promise<LyricsResult> {
  const res = await fetch(`/api/music/lyrics?trackId=${encodeURIComponent(trackId)}`);
  if (!res.ok) throw new Error("Lyrics not found");
  return res.json();
}

export async function getLyricsBySearch(title: string, artist?: string): Promise<LyricsResult> {
  const params = new URLSearchParams({ title });
  if (artist) params.set("artist", artist);
  const res = await fetch(`/api/music/lyrics?${params}`);
  if (!res.ok) throw new Error("Lyrics not found");
  return res.json();
}

export async function getTrending(): Promise<TrendingSong[]> {
  const res = await fetch("/api/music/trending");
  if (!res.ok) throw new Error("Trending fetch failed");
  const json = await res.json();
  return (json.tracks || []).slice(0, 8).map((t: any, i: number) => ({
    id: `deezer-${t.id}`,
    title: t.title,
    artist: t.artist?.name || "Unknown",
    albumArt: (t.album?.cover || "").replace("http://", "https://"),
    genre: "Pop",
    plays: `${(100 - i * 12)}M`,
  }));
}

export async function getArtistInfo(name: string): Promise<ArtistInfo> {
  const res = await fetch(`/api/music/artist?name=${encodeURIComponent(name)}`);
  if (!res.ok) throw new Error("Artist not found");
  const a = await res.json();
  return {
    name: a.name,
    image: a.image || "",
    bio: `${a.name} has ${(a.nb_fan || 0).toLocaleString()} fans on Deezer.`,
    nb_fan: a.nb_fan,
    similar: a.similar || [],
    topTracks: a.topTracks || [],
    genre: "Pop",
  };
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
