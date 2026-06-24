"use client";

import { useState } from "react";
import { suggestTemplates } from "@/lib/api/music";
import Link from "next/link";

interface SmartSuggestProps {
  genre: string;
}

export default function SmartTemplateSuggest({ genre }: SmartSuggestProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [shown, setShown] = useState(false);

  const handleSuggest = async () => {
    setLoading(true);
    setShown(true);
    try {
      const result = await suggestTemplates(genre || "Pop");
      setSuggestions(result);
    } catch {
      setSuggestions([]);
    }
    setLoading(false);
  };

  if (!genre) return null;

  return (
    <div>
      {!shown && (
        <button
          onClick={handleSuggest}
          className="flex items-center gap-2 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-text-secondary transition-colors hover:border-border-hover hover:text-text-primary"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
          Suggest Templates
        </button>
      )}

      {loading && (
        <div className="mt-2 flex items-center gap-2 text-xs text-text-muted">
          <span className="flex h-3 w-3 animate-spin rounded-full border border-neon-indigo border-t-transparent" />
          Analyzing genre...
        </div>
      )}

      {suggestions.length > 0 && !loading && (
        <div className="mt-2 space-y-1">
          <p className="text-[10px] font-medium uppercase tracking-wider text-text-muted">
            Recommended for {genre}
          </p>
          {suggestions.map((t) => (
            <Link
              key={t}
              href={`/templates?q=${t}`}
              className="flex items-center gap-2 rounded-lg bg-surface-lighter px-3 py-1.5 text-xs text-text-secondary hover:text-text-primary transition-colors"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-hologram-teal" />
              {t}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
