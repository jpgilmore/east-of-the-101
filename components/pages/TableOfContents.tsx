const G = "var(--font-garamond)";

const ROMAN: Record<string, string> = {
  One: "I", Two: "II", Three: "III", Four: "IV", Five: "V",
  Six: "VI", Seven: "VII", Eight: "VIII", Nine: "IX", Ten: "X",
};

type Chapter = {
  number: string;
  title: string;
  subtitle?: string;
};

export default function TableOfContents({
  chapters,
  chapterStartIndices,
  onChapterSelect,
}: {
  chapters: Chapter[];
  chapterStartIndices: number[];
  onChapterSelect: (pageIndex: number) => void;
}) {
  return (
    <div className="h-full w-full flex flex-col p-10">
      <header className="mb-8">
        <p
          className="smallcaps text-[0.6rem] tracking-[0.3em] text-ink-soft"
          style={{ fontFamily: G }}
        >
          contents
        </p>
      </header>

      <ol className="flex-1 space-y-5">
        {chapters.map((ch, i) => (
          <li key={i} className="flex flex-col">
            <button
              className="flex items-baseline gap-3 text-left group"
              onClick={() => onChapterSelect(chapterStartIndices[i])}
            >
              <span
                className="text-oak text-xs w-8 shrink-0 group-hover:text-ink transition-colors"
                style={{ fontFamily: G }}
              >
                {ROMAN[ch.number] ?? ch.number}.
              </span>
              <span
                className="text-ink text-sm leading-snug flex-1 group-hover:underline underline-offset-2"
                style={{ fontFamily: G }}
              >
                {ch.title}
              </span>
            </button>
            {ch.subtitle && (
              <span
                className="ml-11 smallcaps text-[0.6rem] text-ink-soft mt-1"
                style={{ fontFamily: G }}
              >
                {ch.subtitle}
              </span>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
