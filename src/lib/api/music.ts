const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

async function fetchJSON<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

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
  copyright: string;
}

export interface ArtistInfo {
  name: string;
  image: string;
  bio: string;
  similar: { name: string; image: string }[];
  topTracks: { title: string; plays: string }[];
  genre: string;
}

export interface TrendingSong {
  id: string;
  title: string;
  artist: string;
  albumArt: string;
  genre: string;
  plays: string;
}

export async function searchSongs(query: string): Promise<SongResult[]> {
  const data = await fetchJSON<{ results: SongResult[] }>(
    `${API_URL}/music/search?q=${encodeURIComponent(query)}`
  );
  return data.results;
}

export async function getLyrics(trackId: string): Promise<LyricsResult> {
  const data = await fetchJSON<{ lyrics: LyricsResult }>(
    `${API_URL}/music/lyrics/${trackId}`
  );
  return data.lyrics;
}

export async function getLyricsBySearch(title: string, artist?: string): Promise<LyricsResult> {
  const params = `title=${encodeURIComponent(title)}${artist ? `&artist=${encodeURIComponent(artist)}` : ""}`;
  const data = await fetchJSON<{ lyrics: LyricsResult }>(
    `${API_URL}/music/lyrics?${params}`
  );
  return data.lyrics;
}

export async function getTrending(): Promise<TrendingSong[]> {
  const data = await fetchJSON<{ trending: TrendingSong[] }>(
    `${API_URL}/music/trending`
  );
  return data.trending;
}

export async function getArtistInfo(name: string): Promise<ArtistInfo> {
  const data = await fetchJSON<{ artist: ArtistInfo }>(
    `${API_URL}/music/artist?name=${encodeURIComponent(name)}`
  );
  return data.artist;
}

export async function suggestTemplates(genre: string): Promise<string[]> {
  const data = await fetchJSON<{ templates: string[] }>(
    `${API_URL}/music/suggest-templates?genre=${encodeURIComponent(genre)}`
  );
  return data.templates;
}
