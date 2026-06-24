"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getTrending, type TrendingSong } from "@/lib/api/music";

export default function TrendingSection() {
  const [trending, setTrending] = useState<TrendingSong[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTrending()
      .then(setTrending)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading || trending.length === 0) return null;

  return (
    <section className="border-t border-border py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
              Trending
              <span className="bg-gradient-to-r from-retro-pink to-neon-indigo bg-clip-text text-transparent">
                {" "}Now
              </span>
            </h2>
            <p className="mt-2 text-text-secondary">
              Most played songs across the Lyrix community.
            </p>
          </div>
          <Link
            href="/studio"
            className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-hologram-teal hover:text-hologram-teal/80 transition-colors"
          >
            Create lyrics
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12H19M12 5L19 12L12 19" />
            </svg>
          </Link>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trending.slice(0, 8).map((song, i) => (
            <Link
              key={song.id}
              href="/studio"
              className="group flex items-center gap-3 rounded-xl border border-border bg-surface-lighter p-3 transition-all hover:border-border-hover hover:bg-surface-light"
            >
              <span className="text-xs font-bold text-text-muted w-5 text-right shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <img
                src={song.albumArt}
                alt={song.title}
                className="h-10 w-10 rounded-lg object-cover shrink-0"
              />
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium text-text-primary truncate group-hover:text-neon-indigo transition-colors">
                  {song.title}
                </div>
                <div className="text-xs text-text-muted truncate">
                  {song.artist}
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-[10px] font-medium text-hologram-teal">
                  {song.plays}
                </div>
                <div className="text-[10px] text-text-muted">plays</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
