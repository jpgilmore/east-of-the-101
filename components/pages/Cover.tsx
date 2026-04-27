export default function Cover() {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-10 text-ink">
      <div className="text-center">
        <h1
          className="italic text-xl md:text-2xl leading-snug"
          style={{ fontFamily: "var(--font-fell)" }}
        >
          east of the 101
        </h1>
        <p className="mt-3 smallcaps text-[0.65rem] tracking-[0.25em] text-ink-soft">
          self-published works in progress
        </p>
      </div>
      <div className="absolute bottom-10 left-0 right-0 text-center">
        <p className="smallcaps text-[0.65rem] tracking-[0.25em] text-ink-soft mb-2">
          written by jack gilmore
        </p>
        <p
          className="italic text-[0.7rem] text-ink-soft/70"
          style={{ fontFamily: "var(--font-fell)" }}
        >
          los angeles · mmxxvi
        </p>
      </div>
    </div>
  );
}