// ─────────────────────────────────────────────────────────────
// GLOBAL SITE CONFIG
// Edit brand info, contact details, and nav here. This is the
// single source of truth for the entire site's copy.
// ─────────────────────────────────────────────────────────────

export const site = {
  brand: "SHOTS BY AIMN",
  name: "Aymane Rouchdi",
  descriptor: "PHOTO / VIDEO / EDITORIAL",
  location: "ATLANTA",
  url: "https://shotsbyaimn.com", // change once you have a real domain
  email: "shotsbyaimn@gmail.com",
  instagram: {
    handle: "@shotsbyaimn",
    url: "https://instagram.com/shotsbyaimn",
  },
  seo: {
    title: "SHOTS BY AIMN — Aymane Rouchdi",
    description:
      "SHOTS BY AIMN — Photography, film, artist interviews, and editorial documentation by Atlanta-based photographer Aymane Rouchdi.",
    keywords: [
      "shots by aimn",
      "aymane rouchdi",
      "atlanta photographer",
      "concert photography",
      "festival photography",
      "artist interviews",
      "electronic music",
      "documentary",
      "editorial",
    ],
  },
} as const;

// ─────────────────────────────────────────────────────────────
// NAVIGATION
// Edit menu items here.
// ─────────────────────────────────────────────────────────────
export const nav: { label: string; href: string; external?: boolean }[] = [
  { label: "WORK", href: "/work" },
  { label: "EDITORIALS", href: "/editorial" },
  { label: "ABOUT", href: "/about" },
  { label: "CONTACT", href: "/contact" },
  { label: "INSTAGRAM", href: "https://instagram.com/shotsbyaimn", external: true },
];
