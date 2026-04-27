"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { pageMeta } from "./Book";

// react-pageflip touches window on init → must be client-only
const Book = dynamic(() => import("./Book"), {
  ssr: false,
  loading: () => null,
});

export default function BookShell() {
  const bookRef = useRef<any>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);
  const [pageIndex, setPageIndex] = useState(0);

  // Size the book: ~1/3 viewport width, leaving room for nav bar. Portrait ratio.
  useEffect(() => {
    const compute = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      // Reserve 56px for the bottom nav bar + some padding for chapter header.
      const maxH = (vh - 56) * 0.86;
      const maxW = vw * 0.35;
      const byHeight = { h: maxH, w: maxH * 0.72 };
      const byWidth = { w: maxW, h: maxW / 0.72 };
      const chosen = byHeight.w <= maxW ? byHeight : byWidth;
      // Clamp so it never gets absurd on very large or very small screens.
      const w = Math.max(280, Math.min(480, Math.round(chosen.w)));
      const h = Math.max(400, Math.min(680, Math.round(chosen.h)));
      setSize({ w, h });
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  // Ambient GSAP: a barely-there breath on the wrapper so the book feels held.
  useEffect(() => {
    if (!wrapRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(wrapRef.current, {
        opacity: 0,
        y: 16,
        duration: 1.4,
        ease: "power3.out",
      });
      gsap.to(wrapRef.current, {
        y: "+=3",
        duration: 6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    });
    return () => ctx.revert();
  }, [size]);

  // Poll the current page index from react-pageflip so we can label it.
  useEffect(() => {
    const id = setInterval(() => {
      const pf = bookRef.current?.pageFlip?.();
      if (!pf) return;
      const idx = pf.getCurrentPageIndex?.() ?? 0;
      setPageIndex(idx);
    }, 200);
    return () => clearInterval(id);
  }, []);

  const flipPrev = () => {
    const pf = bookRef.current?.pageFlip?.();
    if (!pf) return;
    // Index 0 is the invisible spacer — never land on it.
    if ((pf.getCurrentPageIndex?.() ?? 0) > 1) pf.flipPrev();
  };
  const flipNext = () => bookRef.current?.pageFlip?.()?.flipNext();
  // pf.flip() is 1-based: flip(n) navigates to the child at 0-based position n-1.
  // All index arguments must be incremented by 1 to land on the intended page.
  // TOC is at 0-based index 3 → pass 3.
  const flipToToc  = () => bookRef.current?.pageFlip?.()?.flip(3);
  const flipToPage = (idx: number) => bookRef.current?.pageFlip?.()?.flip(idx + 1);

  const total = pageMeta.length;
  const current = pageMeta[pageIndex];
  const pageLabel = labelFor(pageIndex, total, current?.kind);
  const isProse = current?.kind === "prose";

  const bookW = size?.w ?? 320;
  const navBtnClass = "text-[0.75rem] tracking-[0.2em] text-neutral-400 hover:text-white transition-colors";

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      {/* Book with stacked-page effect via box-shadow */}
      <div ref={wrapRef} className="will-change-transform flex-shrink-0">
        <div
          style={{
            boxShadow:
              "4px 3px 0 0 #d9d5cb, 8px 6px 0 0 #c5c1b6, 10px 8px 12px 0 rgba(0,0,0,0.3)",
          }}
        >
          {size && <Book ref={bookRef} width={size.w} height={size.h} onChapterSelect={flipToPage} />}
        </div>
      </div>

      {/* Navigation — sits just below the book, full-width dark strip */}
      <nav
        aria-label="Book navigation"
        className="w-full flex items-end justify-center select-none pb-3"
        style={{ height: 72, background: "#111", marginTop: 14 }}
      >
        <div
          className="flex items-center justify-between"
          style={{ width: bookW }}
        >
          <button
            onClick={flipPrev}
            className={navBtnClass}
            style={{ fontFamily: "var(--font-fell)" }}
            aria-label="Previous page"
          >
            ← prev
          </button>

          {isProse ? (
            <button
              onClick={flipToToc}
              className={navBtnClass}
              style={{ fontFamily: "var(--font-fell)" }}
              aria-label="Back to contents"
            >
              ○ back to contents ○
            </button>
          ) : (
            <span
              className="text-[0.75rem] tracking-[0.2em] text-neutral-400 cursor-default min-w-[6ch] text-center tabular-nums"
              style={{ fontFamily: "var(--font-fell)" }}
              aria-live="polite"
            >
              {pageLabel}
            </span>
          )}

          <button
            onClick={flipNext}
            className={navBtnClass}
            style={{ fontFamily: "var(--font-fell)" }}
            aria-label="Next page"
          >
            next →
          </button>
        </div>
      </nav>
    </div>
  );
}

function labelFor(idx: number, total: number, kind?: string): string {
  if (!kind || kind === "spacer" || kind === "cover" || kind === "epigraph" || kind === "toc" || kind === "colophon") {
    return "· · ·";
  }
  // Subtract 1 from both idx and total to cancel the invisible spacer at index 0.
  return `${idx - 1} of ${total - 2}`;
}

