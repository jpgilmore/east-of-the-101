const G = "var(--font-garamond)";

export default function ChapterOpener({
  number,
  title,
  subtitle,
}: {
  number: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="h-full w-full flex flex-col justify-center p-10">
      <div>
        <p
          className="smallcaps text-[0.6rem] tracking-[0.3em] text-ink-soft"
          style={{ fontFamily: G }}
        >
          chapter
        </p>
        <p
          className="mt-2 text-4xl text-oak leading-none"
          style={{ fontFamily: G }}
        >
          {number}
        </p>
        <h2
          className="mt-6 text-lg leading-tight text-ink"
          style={{ fontFamily: G }}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            className="mt-2 italic text-ink-faded text-xs"
            style={{ fontFamily: G }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
