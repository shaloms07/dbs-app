import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

/**
 * InAppBrowser
 * A full-screen modal overlay that renders a website in an iframe,
 * simulating a native in-app browser experience.
 *
 * Props:
 *   url        – The URL to load
 *   title      – Display title in the toolbar
 *   isOpen     – Whether the browser is visible
 *   onClose    – Callback to close the browser
 */
export default function InAppBrowser({ url, title, isOpen, onClose }) {
  const [loaded, setLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const iframeRef = useRef(null);

  // Reset state whenever a new URL is loaded
  useEffect(() => {
    if (isOpen) {
      setLoaded(false);
      setHasError(false);
    }
  }, [isOpen, url]);

  // Lock body scroll while open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const displayUrl = (() => {
    try {
      return new URL(url).hostname;
    } catch {
      return url;
    }
  })();

  return createPortal(
    <div
      className="fixed inset-0 z-[1100] flex flex-col"
      style={{ background: 'rgba(10,15,30,0.88)', backdropFilter: 'blur(6px)' }}
      role="dialog"
      aria-modal="true"
      aria-label={`In-app browser: ${title}`}
    >
      {/* ── Toolbar ──────────────────────────────────────────── */}
      <div
        className="flex flex-shrink-0 items-center gap-3 px-4 py-3 text-white"
        style={{
          background: 'linear-gradient(135deg,#273471 0%,#0058D1 60%,#00D3FF 100%)',
          boxShadow: '0 4px 20px rgba(0,40,96,0.35)',
        }}
      >
        {/* Close */}
        <button
          id="in-app-browser-close-btn"
          onClick={onClose}
          className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl text-lg transition-all hover:bg-white/20 active:scale-95"
          aria-label="Close browser"
          style={{ background: 'rgba(255,255,255,0.14)' }}
        >
          ✕
        </button>

        {/* Title + URL */}
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold leading-tight text-white">{title}</p>
          <p className="truncate text-[10px] font-medium text-white/60">{displayUrl}</p>
        </div>

        {/* Open in new tab */}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          id="in-app-browser-open-external-btn"
          className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl text-base transition-all hover:bg-white/20 active:scale-95"
          title="Open in new tab"
          style={{ background: 'rgba(255,255,255,0.14)' }}
          aria-label="Open in new browser tab"
        >
          ↗
        </a>
      </div>

      {/* ── URL Bar ──────────────────────────────────────────── */}
      <div
        className="flex flex-shrink-0 items-center gap-2 px-4 py-2"
        style={{
          background: 'rgba(255,255,255,0.05)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        {/* Lock icon */}
        <span className="text-xs text-emerald-400" aria-label="Secure connection">
          🔒
        </span>
        <span
          className="min-w-0 flex-1 truncate rounded-lg px-3 py-1.5 text-xs text-white/70"
          style={{ background: 'rgba(255,255,255,0.08)' }}
        >
          {url}
        </span>
      </div>

      {/* ── iFrame Content ───────────────────────────────────── */}
      <div className="relative flex-1 overflow-hidden rounded-b-none">
        {/* Loading spinner */}
        {!loaded && !hasError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-white">
            <div
              className="h-12 w-12 animate-spin rounded-full border-4 border-white/20"
              style={{ borderTopColor: '#00D3FF' }}
            />
            <p className="text-sm font-medium text-white/70">Loading {displayUrl}…</p>
          </div>
        )}

        {/* Error state */}
        {hasError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 text-center text-white">
            <span className="text-5xl">🚫</span>
            <p className="text-lg font-bold">Unable to load page</p>
            <p className="text-sm text-white/60">
              This site may not allow embedding. Tap ↗ above to open it in your browser.
            </p>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 rounded-2xl px-6 py-3 text-sm font-bold transition-all active:scale-95"
              style={{ background: 'linear-gradient(135deg,#0058D1,#00D3FF)', color: '#fff' }}
            >
              Open in Browser ↗
            </a>
          </div>
        )}

        <iframe
          ref={iframeRef}
          src={url}
          title={title}
          className="h-full w-full border-0 bg-white"
          style={{
            display: hasError ? 'none' : 'block',
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}
          onLoad={() => setLoaded(true)}
          onError={() => setHasError(true)}
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-top-navigation"
          referrerPolicy="no-referrer-when-downgrade"
          aria-label={`${title} website`}
        />
      </div>
    </div>,
    document.body
  );
}
