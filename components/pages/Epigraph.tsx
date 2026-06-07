const G = "var(--font-garamond)";

export default function Epigraph() {
  return (
    <div className="h-full w-full flex flex-col justify-center p-10">
      <div className="max-w-[95%] mx-auto">

        <div className="text-center">
          <div
            className="italic text-ink-faded leading-relaxed text-sm"
            style={{ fontFamily: G }}
          >
            <p>You&apos;re doing it wrong, dissecting the bird trying to find the song.</p>
            <p className="mt-4">It&apos;s a miracle that we&apos;re here at all.</p>
          </div>
          <p
            className="mt-6 smallcaps text-[0.6rem] tracking-[0.2em] text-ink-soft"
            style={{ fontFamily: G }}
          >
            craigie opening for steinbeck
          </p>
        </div>

        <div className="mt-6 flex items-center justify-center gap-4 text-ink-soft/40">
          <span className="h-px w-8 bg-current" />
          <span style={{ fontFamily: G }}>✻</span>
          <span className="h-px w-8 bg-current" />
        </div>

        <div className="mt-6 text-center">
          <div
            className="italic text-ink-faded leading-relaxed text-sm"
            style={{ fontFamily: G }}
          >
            <p>Sometimes I get in my head and think that I&apos;m somebody, and then I am easily offended,</p>
            <p className="mt-4">but when I know I&apos;m nobody, I could never be offended.</p>
          </div>
          <p
            className="mt-6 smallcaps text-[0.6rem] tracking-[0.2em] text-ink-soft"
            style={{ fontFamily: G }}
          >
            tyson well after holyfield
          </p>
        </div>

      </div>
    </div>
  );
}
