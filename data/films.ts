// ─────────────────────────────────────────────────────────────
// FILM / MOTION DATA
// Add a new film by appending an object below. Drop the poster
// image into /public/images/projects/<slug>/ (or anywhere in
// /public/images/) and paste the YouTube/Vimeo URL.
// ─────────────────────────────────────────────────────────────

export type Film = {
  slug: string;
  title: string;
  artist?: string;
  event?: string;
  year: string;
  thumbnail: string;
  /** YouTube or Vimeo URL. The Lightbox will parse and embed it. */
  videoUrl: string;
  description?: string;
  duration?: string;
};

export const films: Film[] = [
  {
    slug: "ravenscoon",
    title: "RAVENSCOON",
    artist: "Ravenscoon",
    event: "Artist Interview",
    year: "2026",
    thumbnail: "/images/projects/ravenscoon/cover.jpg",
    videoUrl: "/videos/ravenscoon-interview.mov",
    description: "Long-form artist interview.",
  },
  {
    slug: "sound-haven-recap",
    title: "SOUND HAVEN — RECAP",
    event: "Sound Haven",
    year: "2026",
    thumbnail: "/images/placeholders/film-02.svg",
    videoUrl: "https://www.youtube.com/watch?v=REPLACE_ME",
    description: "Festival recap film.",
    duration: "03:41",
  },
  {
    slug: "atlanta-underground",
    title: "ATLANTA — UNDERGROUND",
    event: "Documentary Short",
    year: "2026",
    thumbnail: "/images/placeholders/film-03.svg",
    videoUrl: "https://www.youtube.com/watch?v=REPLACE_ME",
    description: "Short documentary on the Atlanta underground scene.",
    duration: "07:22",
  },
];
