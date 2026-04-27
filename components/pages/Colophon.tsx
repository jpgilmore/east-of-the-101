const G = "var(--font-garamond)";

export default function Colophon() {
  return (
    <div className="h-full w-full flex flex-col justify-center p-10">
      <div className="max-w-[80%] mx-auto text-center">
        <p
          className="smallcaps text-[0.6rem] tracking-[0.3em] text-ink-soft mb-5"
          style={{ fontFamily: G }}
        >
          colophon
        </p>
        <div
          className="italic text-ink-faded leading-relaxed text-xs"
          style={{ fontFamily: G }}
        >
          <p>
            Written in Los Angeles, DC, and Berkeley mostly, but in all instances,
            <br />
            East of the 101.
          </p>
          <p className="mt-3">Printed, set, and bound on the web.</p>
        </div>
      </div>
    </div>
  );
}
