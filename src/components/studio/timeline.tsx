"use client";

import { useStudioStore } from "@/store/studio-store";
import { useRef, useState } from "react";
import { formatDuration } from "@/lib/utils";
import SongSearch from "./song-search";

export default function Timeline() {
  const { lyrics, currentLine, setCurrentLine, isPlaying, setIsPlaying, currentTime, setCurrentTime, setAudioFile, setLyrics } = useStudioStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showLyricInput, setShowLyricInput] = useState(false);
  const [lyricText, setLyricText] = useState("");
  const [showSongSearch, setShowSongSearch] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAudioFile(file);
    }
  };

  const handleAddLyrics = () => {
    if (!lyricText.trim()) return;
    const lines = lyricText
      .split("\n")
      .filter(Boolean)
      .map((text, i) => ({
        id: `line-${Date.now()}-${i}`,
        text,
        timestamp: i * 5,
        duration: 5,
      }));
    setLyrics(lines);
    setLyricText("");
    setShowLyricInput(false);
  };

  return (
    <div className="flex flex-col rounded-2xl border border-border bg-surface-lighter">
      <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-neon-indigo text-white transition-all hover:bg-neon-indigo/80"
            disabled={lyrics.length === 0}
          >
            {isPlaying ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5,3 19,12 5,21" />
              </svg>
            )}
          </button>
          <span className="text-xs text-text-muted tabular-nums">
            {formatDuration(currentTime)} / {formatDuration(lyrics.length > 0 ? lyrics.length * 5 : 0)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSongSearch(true)}
            className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-neon-indigo/20 to-hologram-teal/20 border border-neon-indigo/30 px-3 py-1.5 text-xs font-medium text-hologram-teal transition-all hover:shadow-[0_0_15px_rgba(0,255,224,0.2)]"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21L16.65 16.65" />
            </svg>
            Search Song
          </button>
          <div className="h-4 w-px bg-border" />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-text-secondary transition-colors hover:border-border-hover hover:text-text-primary"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M21 15V19C21 20.1 20.1 21 19 21H5C3.9 21 3 20.1 3 19V15" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            Audio
          </button>
          <button
            onClick={() => setShowLyricInput(!showLyricInput)}
            className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-text-secondary transition-colors hover:border-border-hover hover:text-text-primary"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Lyrics
          </button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="audio/*"
          className="hidden"
          onChange={handleFileUpload}
        />

        <SongSearch open={showSongSearch} onClose={() => setShowSongSearch(false)} />
      </div>

      {showLyricInput && (
        <div className="border-b border-border p-4">
          <textarea
            value={lyricText}
            onChange={(e) => setLyricText(e.target.value)}
            placeholder="Paste your lyrics here, one line per verse..."
            rows={5}
            className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary outline-none placeholder:text-text-muted focus:border-neon-indigo resize-none"
          />
          <div className="mt-2 flex justify-end gap-2">
            <button
              onClick={() => setShowLyricInput(false)}
              className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-text-secondary hover:text-text-primary"
            >
              Cancel
            </button>
            <button
              onClick={handleAddLyrics}
              className="rounded-lg bg-neon-indigo px-3 py-1.5 text-xs font-medium text-white hover:bg-neon-indigo/80"
            >
              Add Lyrics
            </button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto px-4 py-3">
        <div className="flex items-end gap-1" style={{ height: 48 }}>
          {lyrics.length === 0 ? (
            <div className="flex w-full items-center justify-center text-xs text-text-muted h-full">
              Add audio and lyrics to see waveform
            </div>
          ) : (
            Array.from({ length: 80 }).map((_, i) => {
              const height = Math.random() * 28 + 4;
              return (
                <div
                  key={i}
                  className="flex-1 rounded-full transition-all"
                  style={{
                    height: `${height}px`,
                    background:
                      i === Math.floor((currentTime / (lyrics.length * 5)) * 80)
                        ? "linear-gradient(to top, #6E00FF, #00FFE0)"
                        : "rgba(208, 213, 249, 0.15)",
                  }}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
