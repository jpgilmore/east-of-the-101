"use client";

import { forwardRef, useMemo } from "react";
import HTMLFlipBook from "react-pageflip";
import Cover from "./pages/Cover";
import Epigraph from "./pages/Epigraph";
import TableOfContents from "./pages/TableOfContents";
import ChapterOpener from "./pages/ChapterOpener";
import ProsePage from "./pages/ProsePage";
import Colophon from "./pages/Colophon";

type Chapter = {
  number: string;
  title: string;
  subtitle?: string;
  body: string[]; // paragraphs; each rendered on its own page
  noIndent?: boolean; // suppress first-line indent (dialogue-heavy chapters)
  continuationPages?: number[]; // body indices that start mid-sentence from the previous page
};

export const chapters: Chapter[] = [
  {
    number: "One",
    title: "Key Way Out",
    subtitle: "",
    noIndent: true,
    body: [
      "It difficult be Alien in year 2020. Alien in crisis.\n\nAlien stuck, need find way out.\n\nTime loop because crisis, say one Alien.\n\nNo, crisis because time loops, say this one.\n\nTime flat circle.\n\nTime not flat circle. Time flat ellipse, because time inseparable from orbit of celestial body.\n\nTheory Relativity, say one Alien.\n\nThat what Alien mean, say this one.\n\nOh.\n\nBut, difficult be Alien in 2020 for other reason, too.\n\nLike what?\n\nIf Alien ever see dishwasher clean and Alien no empty, take Alien out back, shoot. Alien die long 'go.\n\nKitchen island flat circle, one Alien wonder aloud.\n\nNot this time, say this one.\n\nConversation flat circle?\n\nWith Alien, sometime.",
      "Hey!\n\nAlien just play, Alien need laugh sometime.\n\nIt hard laugh when barely breathe. Alien like astronaut who take mask off.\n\nIn Space. That rough.\n\nAlien like singer in band, open mouth no can sing.\n\nKnow what mean.\n\nAlien like… continue one Alien.\n\nAlien know, this one cut off. Alien here. Alien feel same way. Alien think time flat ellipse, and that good thing.\n\nThat good, how?\n\nTwo dimension, atom orbit. Three dimension, planet orbit. Four dimension?\n\nUniverse orbit?\n\nUniverse orbit. Alien get. But still, Alien always think alien end spectrum? Alien think alien always culmination evolution?\n\nAlien alien-centered.",
      "Alien need realize: Time loop not only time loop, time loop part of big time loop; so enjoy time loop have, and wonder 'bout time loop don't.\n\nWonder big time loop?\n\nSometime. Key way out.",
    ],
  },
  {
    number: "Two",
    title: "Blue Skies",
    subtitle: "",
    body: [
      "Blue skies beckon me to the streets, like swells call a surfer or lamps summon a bug, for a rare mid-day run.\n\nPast equestrian statues and up hills, across storied bridges where Taft strode and towards streams where Teddy stripped, supposedly, I descend into Rock Creek, the wooded oasis where Georgetown and Kalorama converge like summer and winter collapse into spring.\n\nThoughts release from the kink in my neck, rising like steam before fizzling in a poof or dripping in a bead of sweat.\n\nSo it seems, for blue skies I have come, and blue skies I’ve become.",
    ],
  },
  {
    number: "Three",
    title: "One Sunny Spring Day in East LA",
    subtitle: "April 22, 2005",
    continuationPages: [1, 2, 3],
    body: [
      "Nearly every day before work and at least once on weekends, Betsy goes for a run. On a day like today, to perform this minor miracle, she must wake at the crack of dawn, get dressed, and be out the door without so much as a toot.\n\n\u201cNothing will ruin this peace and quiet,\u201d she thinks, clenching her cheeks. \u201cToday this is the grace in my day.\u201d\n\nHer blue Volvo Cross Country, a sports wagon designed for six, glides down Mission Street peacefully and efficiently, rolling through stop signs that glow purple in the light of the sunrise.\n\nBetsy pulls into the parking lot before the Dixie Chicks can finish a single song; it\u2019s always a short drive, but it\u2019s also a quick one when the streets are this empty this early.\n\nBeep. Beep.\n\nThe locks on the doors are still clicking into place by the time Betsy jogs around the stable and through the",
      " wooden posts that mark the trailhead, assuming her place on a dirt path that meanders with the Arroyo Seco.\n\nThe Arroyo Seco is, quite obviously, a dry creek. It\u2019s well known that water is hard to come by in Los Angeles, but this aqueduct seems to advertise that very fact. It\u2019s a massive rain gutter beckoning for rain that never comes, and it cuts through the heart of South Pasadena. Nowhere in the city\u2014not even the abandoned, crumbling Rialto Theatre\u2014is the absence of something more apparent.\n\nBetsy likes running along the creek, partly for that very reason. She and the Arroyo Seco have a ritual: When she first sees it through the chain-link fence, she imagines it filled to the brim with beautiful water of a deep blue that zooms by rapidly with a steady roar.\n\nThen, as feet pound on dirt for mile after mile, avoiding protruding rocks and rare puddles along the way, the tumultuous waters drain to a site unseen to reveal the ",
      "naked, concrete slabs that fold to form the sides of a manmade valley.\n\nEventually, the arroyo returns to true form, so that Betsy can clearly see both the violent river in her mind and the empty creek bed in all its glorious morning silence before her. In those moments, Betsy thinks to herself that the absence of something can be just as beautiful as its presence.\n\nIt\u2019s unfortunate that moments like that are short-lived and that the ride home is as fast as the ride there. The same Dixie Chicks song barely has time to finish on the return trip: \u201cNow every day I wake again in a house that might\u2019ve been\u2026\u201d\n\nAfter pulling into the garage, Betsy simultaneously plucks the keys from the ignition and leaps out of the car, exhausting just a sliver of a seemingly infinite supply of pep. The slam of the car door sends a shockwave out of the garage, across the backyard, and into the house,",
"where it wakes up most of the inhabitants for the first time that day and carries with it \u201c\u2026 a home.\u201d",
    ],
  },
  {
    number: "Four",
    title: "One Sunny Spring Day in East LA",
    subtitle: "April 22, 2006",
    body: [
      "Second spring story. The day of.",
      "Final page of the last chapter.",
    ],
  },
];

// Meta describing each page in reading order — what it is, which chapter it
// belongs to. The BookShell reads this to label the page and name the chapter.
export type PageMeta = {
  kind: "spacer" | "cover" | "epigraph" | "toc" | "opener" | "prose" | "colophon";
  chapterTitle?: string; // shown above the book, in grey
};

export const pageMeta: PageMeta[] = (() => {
  const meta: PageMeta[] = [];
  meta.push({ kind: "spacer" }); // index 0: left-side placeholder; keeps all real pages as right-side in portrait mode
  meta.push({ kind: "cover" });
  meta.push({ kind: "epigraph" });
  meta.push({ kind: "toc" });
    chapters.forEach((ch) => {
    ch.body.forEach(() =>
      meta.push({ kind: "prose", chapterTitle: ch.title }),
    );
  });
  meta.push({ kind: "colophon" });
  return meta;
})();

// First react-pageflip index that belongs to prose (spacer+cover+epigraph+toc = 4).
const PROSE_BASE_INDEX = 4;

const Book = forwardRef<any, {
  width: number;
  height: number;
  onChapterSelect: (pageIndex: number) => void;
}>(function Book({ width, height, onChapterSelect }, ref) {
  // Pre-calculate the react-pageflip index of each chapter's first page so the
  // TOC can jump directly to it.
  const chapterStartIndices = useMemo(() => {
    let offset = PROSE_BASE_INDEX;
    return chapters.map(ch => {
      const idx = offset;
      offset += ch.body.length;
      return idx;
    });
  }, []);

  // Flatten the book's pages in reading order. react-pageflip wants siblings,
  // each a fixed-size div. The order here *is* the book.
  const pages = useMemo(() => {
    const out: React.ReactNode[] = [];

    // Invisible spacer at index 0 — forces all real pages onto the right-side
    // slot of react-pageflip's internal spread, eliminating the portrait-mode
    // vertical offset that makes the cover sit higher than every other page.
    out.push(<div key="spacer" className="page" aria-hidden="true" />);

    out.push(
      <div key="cover" className="page">
        <Cover />
      </div>,
    );

    out.push(
      <div key="epigraph" className="page">
        <Epigraph />
      </div>,
    );

    out.push(
      <div key="toc" className="page">
        <TableOfContents
          chapters={chapters}
          chapterStartIndices={chapterStartIndices}
          onChapterSelect={onChapterSelect}
        />
      </div>,
    );

    let prosePageNum = 0;
    chapters.forEach((ch, i) => {
      ch.body.forEach((para, j) => {
        prosePageNum++;
        out.push(
          <div key={`ch-${i}-p-${j}`} className="page">
            <ProsePage
              paragraph={para}
              firstInChapter={j === 0}
              pageWidth={width}
              pageHeight={height}
              printedPageNum={prosePageNum}
              chapterTitle={ch.title}
              noIndent={ch.noIndent}
              midSentenceStart={ch.continuationPages?.includes(j) ?? false}
            />
          </div>,
        );
      });
    });

    out.push(
      <div key="colophon" className="page">
        <Colophon />
      </div>,
    );

    return out;
  }, []);

  return (
    <HTMLFlipBook
      ref={ref}
      width={width}
      height={height}
      size="fixed"
      minWidth={280}
      maxWidth={900}
      minHeight={400}
      maxHeight={1200}
      maxShadowOpacity={0.3}
      showCover={false}
      mobileScrollSupport={false}
      drawShadow={true}
      flippingTime={700}
      usePortrait={true}
      startPage={1}
      className=""
      style={{}}
      startZIndex={0}
      autoSize={false}
      clickEventForward={true}
      useMouseEvents={true}
      swipeDistance={30}
      showPageCorners={true}
      disableFlipByClick={false}
    >
      {pages}
    </HTMLFlipBook>
  );
});

export default Book;
