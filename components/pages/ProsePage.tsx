export default function ProsePage({
  paragraph,
  firstInChapter = false,
  pageWidth,
  pageHeight,
  printedPageNum,
  chapterTitle,
  noIndent = false,
  midSentenceStart = false,
}: {
  paragraph: string;
  firstInChapter?: boolean;
  pageWidth: number;
  pageHeight: number;
  printedPageNum: number;
  chapterTitle: string;
  noIndent?: boolean;
  midSentenceStart?: boolean;
}) {
  const blocks = paragraph.split(/\n\n+/).map(b => b.trim());

  // Every typographic value is a proportion of the rendered page size so the
  // layout feels correct whether the page is 300 px wide on a laptop or
  // 480 px wide on a large monitor.
  const fontSize   = Math.max(12, Math.min(17, Math.round(pageWidth * 0.038)));
  const lineHeight = 1.58;
  const padH       = Math.round(pageWidth  * 0.083); // tighter side margins, like Didion
  const padV       = Math.round(pageHeight * 0.055); // closer to top/bottom edge
  const headerSize = Math.max(9,  Math.round(fontSize * 0.76)); // header smaller than body but legible
  const indent     = fontSize * 1.2; // px — classic first-line book indent

  // Verso (even page): page-num outside-left, book title centred.
  // Recto (odd page):  chapter title centred, page-num outside-right.
  const isEven = printedPageNum % 2 === 0;

  const runnerStyle: React.CSSProperties = {
    fontFamily:   "var(--font-garamond)",
    fontSize:      headerSize,
    letterSpacing: "0.15em",
    fontVariant:   "small-caps",
    color:         "var(--ink)",
  };

  return (
    <div
      className="h-full w-full flex flex-col"
      style={{ padding: `${padV}px ${padH}px` }}
    >
      {/* ── Running header ── */}
      <header
        className="flex-shrink-0 flex items-baseline"
        style={{
          ...runnerStyle,
          paddingBottom:  Math.round(headerSize * 1.1),
          borderBottom:   "0.5px solid rgba(28,25,23,0.18)",
          marginBottom:   Math.round(fontSize * 0.9),
        }}
      >
        {isEven ? (
          <>
            <span style={{ flex: "0 0 auto", minWidth: "2ch" }}>
              {printedPageNum}
            </span>
            <span style={{ flex: 1, textAlign: "center", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", padding: "0 6px" }}>
              east of the 101
            </span>
            {/* right spacer keeps the title centred */}
            <span style={{ flex: "0 0 auto", minWidth: "2ch" }} />
          </>
        ) : (
          <>
            <span style={{ flex: "0 0 auto", minWidth: "2ch" }} />
            <span style={{ flex: 1, textAlign: "center", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", padding: "0 6px" }}>
              {chapterTitle}
            </span>
            <span style={{ flex: "0 0 auto", minWidth: "2ch", textAlign: "right" }}>
              {printedPageNum}
            </span>
          </>
        )}
      </header>

      {/* ── Body text ── */}
      <article
        style={{
          flex:        1,
          fontFamily:  "var(--font-garamond)",
          fontSize,
          lineHeight,
          color:       "var(--ink)",
          textAlign:   "justify",
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          hyphens:     "auto" as any,
        }}
      >
        {blocks.map((block, i) => (
          <p
            key={i}
            style={{
              margin:      0,
              // First paragraph of a chapter opening: no indent (book convention).
              // Every other paragraph: classic first-line indent.
              textIndent: noIndent || (i === 0 && (firstInChapter || midSentenceStart)) ? 0 : indent,
            }}
          >
            {block}
          </p>
        ))}
      </article>
    </div>
  );
}
