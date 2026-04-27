# East of the 101

A minimal personal writing portfolio built around an interactive virtual book.
Paper-and-ink aesthetic, California-modern, built with Next.js 15 +
`react-pageflip` + GSAP.

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## How the book works

The book is `react-pageflip` rendering a sequence of `<div class="page">`
siblings. Order equals reading order. See `components/Book.tsx` — the `pages`
array is the entire manuscript.

`react-pageflip` reaches into `window` on init, so it is dynamically imported
with `ssr: false` inside `components/BookShell.tsx`. If you ever see an SSR
error about `window is not defined`, check that import.

### Controls

The `prev / label / next` nav in `BookShell.tsx` talks to the book through its
ref: `bookRef.current.pageFlip().flipPrev()` and `flipNext()`. The center label
(`cover`, `contents`, `ch. i`, etc.) is derived from
`pageFlip().getCurrentPageIndex()` — if you add, remove, or reorder pages in
`Book.tsx`, update the `labelFor()` helper in `BookShell.tsx` to match.

## Where to put your stuff

| What                          | Where                                        |
| ----------------------------- | -------------------------------------------- |
| Chapter text                  | `components/Book.tsx` — the `chapters` array |
| Epigraph / dedication         | `components/pages/Epigraph.tsx`              |
| Colophon / contact            | `components/pages/Colophon.tsx`              |
| Cover title & date            | `components/pages/Cover.tsx`                 |
| P-22 illustration             | `public/art/p22.svg` (replace this file)     |
| Michael / Dodgers illustration | `public/art/michael-dodgers.svg` (replace)   |
| Site title in masthead        | `components/BookShell.tsx`                   |
| Colors, fonts                 | `tailwind.config.ts`, `app/fonts.ts`         |

## Adding more pages per chapter

In `Book.tsx`, after a chapter's `ChapterOpener` and first `ProsePage`, just
push more `<ProsePage paragraphs={[...]} />` entries. Each one is a right-hand
page; react-pageflip will pair them into spreads automatically.

## The ambient motion

GSAP is doing two things in `BookShell.tsx`:

1. A one-time entry reveal — title, byline, book fade up in sequence.
2. An infinite 6-second breathing motion on the book wrap so the object feels
   held rather than pinned.

To dial the breath up or down, change the `y: "+=4"` and `duration: 6` in the
`gsap.to(...)` call. Setting `y: "+=0"` turns it off.

`prefers-reduced-motion` is already honored via a global rule in
`globals.css` — users with motion sensitivity won't see the breath.

## Fonts

`EB Garamond` for body, `IM Fell English` for display. Both are loaded via
`next/font/google` in `app/fonts.ts`, so they are self-hosted at build time
(no FOIT, no request to Google at runtime). Swap them there.

## Deploy

Vercel will deploy this as-is. `npm run build && npm start` works for any
Node host.
