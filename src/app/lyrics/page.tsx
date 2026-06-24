"use client";

import { useState, useEffect, useRef } from "react";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import { searchSongs, getLyrics, getTrending, type SongResult, type LyricsResult, type TrendingSong } from "@/lib/api/music";
import { cn } from "@/lib/utils";

export default function LyricsPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SongResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [selectedSong, setSelectedSong] = useState<SongResult | null>(null);
  const [lyrics, setLyrics] = useState<LyricsResult | null>(null);
  const [loadingLyrics, setLoadingLyrics] = useState(false);
  const [trending, setTrending] = useState<TrendingSong[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getTrending().then(setTrending).catch(() => {});
    setTimeout(() => inputRef.current?.focus(), 200);
  }, []);

  useEffect(() => {
    if (!query.trim() || query.length < 2) {
      setResults([]);
      return;
    }
    const timer = setTimeout(async () => {
      setSearching(true);
      try {
        const res = await searchSongs(query);
        setResults(res);
      } catch { setResults([]); }
      setSearching(false);
    }, 200);
    return () => clearTimeout(timer);
  }, [query]);

  const handleSelectSong = async (song: SongResult) => {
    setSelectedSong(song);
    setLoadingLyrics(true);
    setLyrics(null);
    try {
      const l = await getLyrics(song.id);
      setLyrics(l);
    } catch { setLyrics(null); }
    setLoadingLyrics(false);
  };

  const handleTrendingClick = async (song: TrendingSong) => {
    setQuery(song.title);
    setSelectedSong(null);
    setLyrics(null);
    // search for the full song data
    const res = await searchSongs(song.title);
    const found = res.find((s) => s.artist === song.artist);
    if (found) handleSelectSong(found);
  };

  return (
    <>
      <Header />
      <main className="flex-1 pt-16">
        <div className="mx-auto max-w-5xl px-6 py-12">
          <div className="text-center">
            <h1 className="font-heading text-4xl font-bold tracking-tight text-text-primary">
              Lyrics
              <span className="bg-gradient-to-r from-hologram-teal to-neon-indigo bg-clip-text text-transparent"> Reader</span>
            </h1>
            <p className="mt-2 text-text-secondary">
              Search any song and read the lyrics.
            </p>
          </div>

          <div className="relative mx-auto mt-8 max-w-xl">
            <div className="flex items-center gap-3 rounded-2xl border border-border bg-surface-lighter px-4 py-3 focus-within:border-neon-indigo transition-all">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 text-text-muted">
                <circle cx="11" cy="11" r="8" /><path d="M21 21L16.65 16.65" />
              </svg>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by song title, artist, or album..."
                className="flex-1 bg-transparent text-sm text-text-primary outline-none placeholder:text-text-muted"
              />
              {query && (
                <button onClick={() => { setQuery(""); setResults([]); setSelectedSong(null); setLyrics(null); }} className="text-text-muted hover:text-text-primary">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                </button>
              )}
            </div>
          </div>

          <div className="mt-8 flex flex-col lg:flex-row gap-8">
            {/* Search Results / Trending */}
            <div className={cn("w-full", (selectedSong || lyrics) ? "lg:w-80" : "lg:max-w-2xl lg:mx-auto")}>
              {/* Results dropdown */}
              {query.length >= 2 && (
                <div className="mb-6 space-y-1">
                  <p className="text-xs font-medium uppercase tracking-wider text-text-muted px-1 mb-2">
                    {searching ? "Searching..." : `${results.length} result${results.length !== 1 ? "s" : ""} for "${query}"`}
                  </p>
                  {results.map((song) => (
                    <button
                      key={song.id}
                      onClick={() => handleSelectSong(song)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-xl p-3 text-left transition-all hover:bg-surface-lighter",
                        selectedSong?.id === song.id && "bg-surface-lighter border border-neon-indigo/30"
                      )}
                    >
                      <img src={song.albumArt} alt={song.album} className="h-12 w-12 rounded-lg object-cover shrink-0" />
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-medium text-text-primary truncate">{song.title}</div>
                        <div className="text-xs text-text-muted truncate">{song.artist} &middot; {song.album}</div>
                        <div className="mt-0.5 flex items-center gap-2">
                          <span className="text-[10px] font-medium text-hologram-teal uppercase">{song.genre}</span>
                          <span className="text-[10px] text-text-muted">{Math.floor(song.duration / 60)}:{(song.duration % 60).toString().padStart(2, "0")}</span>
                        </div>
                      </div>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-text-muted shrink-0">
                        <path d="M8 2L16 12L8 22" />
                      </svg>
                    </button>
                  ))}
                </div>
              )}

              {/* Trending (shown when no search) */}
              {query.length < 2 && trending.length > 0 && (
                <div>
                  <h2 className="font-heading text-lg font-semibold text-text-primary mb-4">Trending Songs</h2>
                  <div className="space-y-2">
                    {trending.map((song, i) => (
                      <button
                        key={song.id}
                        onClick={() => { setQuery(song.title); handleTrendingClick(song); }}
                        className="flex w-full items-center gap-3 rounded-xl p-3 text-left transition-all hover:bg-surface-lighter"
                      >
                        <span className="text-xs font-bold text-text-muted w-5 text-right shrink-0">{String(i + 1).padStart(2, "0")}</span>
                        <img src={song.albumArt} alt={song.title} className="h-10 w-10 rounded-lg object-cover shrink-0" />
                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-medium text-text-primary truncate">{song.title}</div>
                          <div className="text-xs text-text-muted truncate">{song.artist}</div>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="text-[10px] font-medium text-hologram-teal">{song.plays}</div>
                          <div className="text-[10px] text-text-muted">plays</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Lyrics Display */}
            <div className={cn("flex-1", !selectedSong && !lyrics && "hidden lg:flex lg:items-center lg:justify-center")}>
              {!selectedSong && !loadingLyrics && (
                <div className="text-center py-16">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto text-text-muted">
                    <path d="M9 18V5L21 3V16" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="6" cy="18" r="3" />
                    <circle cx="18" cy="16" r="3" />
                  </svg>
                  <p className="mt-4 text-sm text-text-muted">Search for a song to read its lyrics</p>
                </div>
              )}

              {loadingLyrics && (
                <div className="flex items-center justify-center py-16">
                  <span className="flex h-6 w-6 animate-spin rounded-full border-2 border-neon-indigo border-t-transparent" />
                </div>
              )}

              {selectedSong && lyrics && !loadingLyrics && (
                <div className="rounded-2xl border border-border bg-surface-lighter overflow-hidden">
                  <div className="flex items-center gap-4 border-b border-border p-5">
                    <img src={selectedSong.albumArt} alt={selectedSong.album} className="h-16 w-16 rounded-xl object-cover" />
                    <div>
                      <h2 className="font-heading text-xl font-bold text-text-primary">{selectedSong.title}</h2>
                      <p className="text-sm text-text-muted">{selectedSong.artist} &middot; {selectedSong.album}</p>
                      <div className="mt-1 flex items-center gap-2">
                        <span className="text-[10px] font-medium text-hologram-teal uppercase border border-hologram-teal/30 rounded-full px-2 py-0.5">{selectedSong.genre}</span>
                        <span className="text-[10px] text-text-muted">{lyrics.source}</span>
                      </div>
                    </div>
                  </div>

                  <div className="px-6 py-8">
                    <div className="space-y-4 text-center">
                      {lyrics.lyrics.split("\n\n").map((verse, i) => (
                        <p key={i} className="text-base leading-relaxed text-text-primary whitespace-pre-line">
                          {verse}
                        </p>
                      ))}
                    </div>

                    <div className="mt-8 border-t border-border pt-4 text-center text-[10px] text-text-muted">
                      {lyrics.copyright}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
