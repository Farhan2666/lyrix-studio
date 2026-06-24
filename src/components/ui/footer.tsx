export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-neon-indigo to-hologram-teal text-xs font-bold text-white">
                L
              </div>
              <span className="font-heading text-base font-bold text-text-primary">
                Lyrix<span className="text-neon-indigo">Studio</span>
              </span>
            </div>
            <p className="mt-3 text-sm text-text-muted">
              Paint Your Sound — Platform desain lirik real-time.
            </p>
          </div>
          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-text-muted">
              Product
            </h4>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li><a href="/studio" className="hover:text-text-primary transition-colors">Studio</a></li>
              <li><a href="/templates" className="hover:text-text-primary transition-colors">Templates</a></li>
              <li><a href="/export" className="hover:text-text-primary transition-colors">Export</a></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-text-muted">
              Integrations
            </h4>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li><span className="cursor-default">Philips Hue</span></li>
              <li><span className="cursor-default">Nanoleaf</span></li>
              <li><span className="cursor-default">Spotify</span></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-text-muted">
              Legal
            </h4>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li><span className="cursor-default">Privacy</span></li>
              <li><span className="cursor-default">Terms</span></li>
              <li><span className="cursor-default">DMCA</span></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-border pt-6 text-center text-xs text-text-muted">
          &copy; {new Date().getFullYear()} Lyrix Studio. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
