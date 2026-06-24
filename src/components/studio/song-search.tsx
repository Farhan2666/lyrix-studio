"use client";

import { useState, useEffect, useRef } from "react";
import { searchSongs, getLyrics, type SongResult } from "@/lib/api/music";
import { useStudioStore } from "@/store/studio-store";
import { cn } from "@/lib/utils";

interface SongSearchProps {
  open: boolean;
  onClose: () => void;
}

export default function SongSearch({ open, onClose }: SongSearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SongResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<SongResult | null>(null);
  const [importingLyrics, setImportingLyrics] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { setLyrics, setAudioFile, updateDesignProps } = useStudioStore();

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery("");
      setResults([]);
      setSelected(null);
    }
  }, [open]);

  useEffect(() => {
    if (!query.trim() || query.length < 2) {
      setResults([]);
      return;
    }
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await searchSongs(query);
        setResults(res);
      } catch {
        setResults([]);
      }
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  const handleImport = async (song: SongResult) => {
    setSelected(song);
    setImportingLyrics(true);
    try {
      const lyricData = await getLyrics(song.id);
      const lines = lyricData.lyrics
        .split("\n")
        .filter(Boolean)
        .map((text, i) => ({
          id: `lyric-${Date.now()}-${i}`,
          text,
          timestamp: i * 5,
          duration: 5,
        }));
      setLyrics(lines);
      updateDesignProps({
        animation: {
          preset: "fade",
          speed: 1,
          bpm: getBpmForGenre(song.genre),
        },
      });
    } catch {
      // silent fail - user can add lyrics manually
    }
    setImportingLyrics(false);
    onClose();
  };

  const getBpmForGenre = (genre: string): number => {
    const bpmMap: Record<string, number> = {
      EDM: 128,
      Synthwave: 90,
      "Hip-Hop": 95,
      Indie: 110,
      Rock: 140,
      Pop: 120,
      Jazz: 70,
      Ambient: 80,
      World: 100,
    };
    return bpmMap[genre] || 120;
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-lg mx-4 rounded-2xl border border-border bg-surface shadow-2xl overflow-hidden">
        <div className="flex items-center gap-3 border-b border-border px-4 py-3">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-text-muted shrink-0">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21L16.65 16.65" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search songs, artists, albums..."
            className="flex-1 bg-transparent text-sm text-text-primary outline-none placeholder:text-text-muted"
          />
          <button onClick={onClose} className="text-xs text-text-muted hover:text-text-primary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto p-2">
          {loading && (
            <div className="flex items-center justify-center py-8">
              <span className="flex h-5 w-5 animate-spin rounded-full border-2 border-neon-indigo border-t-transparent" />
            </div>
          )}

          {!loading && query.length >= 2 && results.length === 0 && (
            <div className="py-8 text-center text-sm text-text-muted">No songs found for &ldquo;{query}&rdquo;</div>
          )}

          {results.map((song) => (
            <button
              key={song.id}
              onClick={() => handleImport(song)}
              disabled={importingLyrics}
              className={cn(
                "flex w-full items-center gap-3 rounded-xl p-3 text-left transition-all hover:bg-surface-lighter",
                selected?.id === song.id && "bg-surface-lighter"
              )}
            >
              <img
                src={song.albumArt}
                alt={song.album}
                className="h-12 w-12 rounded-lg object-cover"
              />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-text-primary truncate">
                  {song.title}
                </div>
                <div className="text-xs text-text-muted truncate">
                  {song.artist} &middot; {song.album}
                </div>
                <div className="mt-0.5 flex items-center gap-2">
                  <span className="text-[10px] font-medium text-hologram-teal uppercase">
                    {song.genre}
                  </span>
                  <span className="text-[10px] text-text-muted">
                    {Math.floor(song.duration / 60)}:{(song.duration % 60).toString().padStart(2, "0")}
                  </span>
                </div>
              </div>
              <div className="shrink-0 rounded-full bg-neon-indigo/20 px-3 py-1 text-[10px] font-medium text-neon-indigo">
                Import
              </div>
            </button>
          ))}
        </div>

        <div className="border-t border-border px-4 py-2.5 text-center text-[10px] text-text-muted">
          Powered by Lyrix Studio Music Search
        </div>
      </div>
    </div>
  );
}
