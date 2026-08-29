// ─────────────────────────────────────────────────────────────
// ARCHIVE DATA
// A dense grid of individual frames. Drop images into
// /public/images/archive/ and reference them here. Optionally
// tag each frame with artist / event / year for the lightbox
// caption.
// ─────────────────────────────────────────────────────────────

export type ArchiveFrame = {
  src: string;
  alt: string;
  artist?: string;
  event?: string;
  year?: string;
  aspect?: "portrait" | "landscape" | "square";
};

export const archive: ArchiveFrame[] = [
  { src: "/images/placeholders/archive-01.svg", alt: "Archive frame 01", event: "Sound Haven", year: "2026", aspect: "landscape" },
  { src: "/images/placeholders/archive-02.svg", alt: "Archive frame 02", event: "Atlanta", year: "2026", aspect: "portrait" },
  { src: "/images/placeholders/archive-03.svg", alt: "Archive frame 03", event: "Studio", year: "2026", aspect: "square" },
  { src: "/images/placeholders/archive-04.svg", alt: "Archive frame 04", event: "Backstage", year: "2026", aspect: "landscape" },
  { src: "/images/placeholders/archive-05.svg", alt: "Archive frame 05", event: "Portrait", year: "2026", aspect: "portrait" },
  { src: "/images/placeholders/archive-06.svg", alt: "Archive frame 06", event: "Sound Haven", year: "2026", aspect: "landscape" },
  { src: "/images/placeholders/archive-07.svg", alt: "Archive frame 07", event: "Atlanta", year: "2026", aspect: "portrait" },
  { src: "/images/placeholders/archive-08.svg", alt: "Archive frame 08", event: "Warehouse", year: "2026", aspect: "landscape" },
  { src: "/images/placeholders/archive-09.svg", alt: "Archive frame 09", event: "Portrait", year: "2026", aspect: "portrait" },
  { src: "/images/placeholders/archive-10.svg", alt: "Archive frame 10", event: "Crowd", year: "2026", aspect: "landscape" },
  { src: "/images/placeholders/archive-11.svg", alt: "Archive frame 11", event: "Lighting", year: "2026", aspect: "square" },
  { src: "/images/placeholders/archive-12.svg", alt: "Archive frame 12", event: "Atlanta", year: "2026", aspect: "portrait" },
];
