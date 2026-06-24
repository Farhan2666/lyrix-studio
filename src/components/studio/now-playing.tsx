"use client";

import { useStudioStore } from "@/store/studio-store";
import { useState, useEffect } from "react";
import { getArtistInfo, getLyrics, type ArtistInfo } from "@/lib/api/music";

export default function NowPlaying() {
  const { lyrics, currentLine, currentTime, isPlaying, designProps } = useStudioStore();
  const [artistInfo, setArtistInfo] = useState<ArtistInfo | null>(null);
  const [showInfo, setShowInfo] = useState(false);

  const currentLyric = lyrics[currentLine];

  useEffect(() => {
    if (currentLyric) {
      const timer = setTimeout(() => {
        // Auto-scroll to current line handled by parent
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [currentLine, currentLyric]);

  const progress =
    lyrics.length > 0 ? ((currentLine + 1) / lyrics.length) * 100 : 0;

  return (
    <div className="flex items-center gap-4 rounded-xl border border-border bg-surface-lighter px-4 py-2.5">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-neon-indigo to-hologram-teal text-white">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5,3 19,12 5,21" />
          </svg>
        </div>
        <div className="min-w-0">
          {lyrics.length > 0 ? (
            <>
              <p className="text-sm font-medium text-text-primary truncate">
                {currentLyric?.text || "Lyrics loaded"}
              </p>
              <p className="text-xs text-text-muted">
                Line {currentLine + 1} of {lyrics.length}
                {isPlaying && (
                  <span className="ml-2 text-hologram-teal">
                    &bull; {Math.floor(currentTime)}s
                  </span>
                )}
              </p>
            </>
          ) : (
            <>
              <p className="text-sm font-medium text-text-muted">No track loaded</p>
              <p className="text-xs text-text-muted">
                Search for a song to get started
              </p>
            </>
          )}
        </div>
      </div>

      {lyrics.length > 0 && (
        <div className="hidden sm:flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span
              className="flex h-1.5 w-1.5 rounded-full bg-hologram-teal"
              style={{ animation: "pulse-glow 2s infinite" }}
            />
            <span className="text-[10px] font-medium text-text-muted uppercase tracking-wider">
              {designProps.animation.bpm} BPM
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-text-muted uppercase tracking-wider">
              {designProps.animation.preset}
            </span>
          </div>
        </div>
      )}

      <div className="hidden lg:block w-24">
        <div className="flex h-1.5 rounded-full bg-surface overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-neon-indigo to-hologram-teal transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
