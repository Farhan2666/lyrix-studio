"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number }[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.1,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(110, 0, 255, ${p.alpha})`;
        ctx.fill();
      });

      particles.forEach((a, i) => {
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(0, 255, 224, ${0.08 * (1 - dist / 150)})`;
            ctx.stroke();
          }
        }
      });

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden pt-16">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-neon-indigo/5 via-transparent to-surface" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface-lighter px-4 py-1.5 text-xs font-medium text-hologram-teal">
          <span className="flex h-2 w-2 rounded-full bg-hologram-teal animate-pulse-glow" />
          Real-time Lyric Design Platform
        </div>

        <h1 className="font-heading text-5xl font-bold leading-tight tracking-tight text-text-primary sm:text-6xl lg:text-7xl">
          Paint Your
          <br />
          <span className="bg-gradient-to-r from-neon-indigo via-hologram-teal to-retro-pink bg-clip-text text-transparent">
            Sound
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-text-secondary">
          Platform desain lirik real-time pertama yang mengubah teks lagu menjadi
          kanvas visual interaktif — dengan kontrol penuh dan integrasi perangkat
          eksternal.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/studio"
            className="group relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-neon-indigo to-hologram-teal px-8 py-3.5 text-sm font-semibold text-white transition-all hover:shadow-[0_0_30px_rgba(110,0,255,0.5)]"
          >
            Start Creating
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="transition-transform group-hover:translate-x-0.5"
            >
              <path
                d="M6 3L11 8L6 13"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
          <Link
            href="/templates"
            className="inline-flex items-center gap-2 rounded-full border border-border px-8 py-3.5 text-sm font-medium text-text-primary transition-colors hover:border-border-hover hover:bg-surface-lighter"
          >
            Browse Templates
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-6 sm:gap-12">
          {[
            { value: "4K", label: "Video Export" },
            { value: "60", label: "FPS Animation" },
            { value: "15+", label: "Device Sync" },
          ].map((stat) => (
            <div key={stat.value}>
              <div className="font-heading text-2xl font-bold text-text-primary sm:text-3xl">
                {stat.value}
              </div>
              <div className="mt-1 text-xs text-text-muted">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
