"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/studio", label: "Studio" },
  { href: "/lyrics", label: "Lyrics" },
  { href: "/templates", label: "Templates" },
  { href: "/export", label: "Export" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-surface/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-neon-indigo to-hologram-teal text-sm font-bold text-white">
            L
          </div>
          <span className="font-heading text-lg font-bold tracking-tight text-text-primary">
            Lyrix
            <span className="text-neon-indigo">Studio</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/studio"
            className="rounded-full bg-gradient-to-r from-neon-indigo to-hologram-teal px-5 py-2 text-sm font-semibold text-white transition-all hover:shadow-[0_0_20px_rgba(110,0,255,0.4)]"
          >
            Start Creating
          </Link>
        </nav>

        <button
          className="relative flex h-10 w-10 items-center justify-center md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <div className="flex flex-col gap-1.5">
            <span
              className={cn(
                "block h-0.5 w-5 bg-text-primary transition-all",
                mobileOpen && "translate-y-2 rotate-45"
              )}
            />
            <span
              className={cn(
                "block h-0.5 w-5 bg-text-primary transition-all",
                mobileOpen && "opacity-0"
              )}
            />
            <span
              className={cn(
                "block h-0.5 w-5 bg-text-primary transition-all",
                mobileOpen && "-translate-y-2 -rotate-45"
              )}
            />
          </div>
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-surface px-6 pb-6 pt-4 md:hidden">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/studio"
              className="mt-2 rounded-full bg-gradient-to-r from-neon-indigo to-hologram-teal px-5 py-2.5 text-center text-sm font-semibold text-white"
              onClick={() => setMobileOpen(false)}
            >
              Start Creating
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
