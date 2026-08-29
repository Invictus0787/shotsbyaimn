// ─────────────────────────────────────────────────────────────
// PROJECTS DATA
// ─────────────────────────────────────────────────────────────
// To add a new project:
//   1. Create a folder in /public/images/projects/<slug>/
//      e.g. /public/images/projects/g-jones/
//   2. Drop your photos in there (cover.jpg, 01.jpg, 02.jpg…)
//   3. Add a new object below with a matching slug.
//   4. Nothing else — the site auto-generates cards, project
//      pages (/work/<slug>), and metadata from this file.
// ─────────────────────────────────────────────────────────────

export type ImageAspect = "landscape" | "portrait" | "square";

export type ProjectImage = {
  src: string;
  alt: string;
  aspect?: ImageAspect;
  caption?: string;
  /**
   * Layout hint used by the project page renderer.
   * - full: full-bleed image
   * - center: centered portrait
   * - pair-left / pair-right: side-by-side pair
   * - grid: contact-sheet cell
   */
  layout?: "full" | "center" | "pair-left" | "pair-right" | "grid";
};

export type ProjectMedium =
  | "Photography"
  | "Film"
  | "Film / Editorial"
  | "Photo / Video"
  | "Portraiture"
  | "Editorial"
  | "Documentary";

export type Project = {
  slug: string;
  title: string;
  artist?: string;
  event?: string;
  location?: string;
  year: string;
  medium: ProjectMedium;
  /** Cover image shown in the homepage grid & project header */
  cover: ProjectImage;
  /** Short editorial description (2–4 sentences max) */
  description?: string;
  /** Gallery images shown on the /work/<slug> page */
  images?: ProjectImage[];
  /** Optional video (YouTube/Vimeo URL) for film/interview projects */
  video?: {
    url: string;
    thumbnail?: string;
    duration?: string;
  };
  /** Optional credits list for the project page footer */
  credits?: { role: string; name: string }[];
  /** Optional grid span hint for the homepage editorial grid */
  gridSpan?: {
    col?: 1 | 2 | 3 | 4 | 5 | 6;
    row?: 1 | 2;
  };
  /** If true, this project appears in the "Featured Editorial" slot on the homepage */
  featured?: boolean;
  /**
   * How the project page gallery is composed.
   * - editorial: mixed full / pair / center / grid layouts (default)
   * - plates: compact contact-sheet previews (best for 1024px source files)
   */
  galleryLayout?: "editorial" | "plates";
};

// ─────────────────────────────────────────────────────────────
// Replace placeholder image paths (`/images/placeholders/...`)
// with your real image paths as you drop photos in.
//
// Example — once you add /public/images/projects/g-jones/cover.jpg:
//   cover: { src: "/images/projects/g-jones/cover.jpg", ... }
// ─────────────────────────────────────────────────────────────

export const projects: Project[] = [
  {
    slug: "g-jones-sound-haven",
    title: "G JONES",
    artist: "Sound Haven Music Festival 2026",
    event: "Sound Haven",
    location: "Jaceland, TN",
    year: "2026",
    medium: "Photography",
    cover: {
      src: "/images/projects/g-jones/13.png",
      alt: "Wide — crowd facing the stage under head-silhouette projections",
      aspect: "landscape",
    },
    description:
      "A night of low-end frequencies and stage haze. Selected frames from G Jones' Sound Haven set — the light rig, the LED architecture, and the figure inside it.",
    galleryLayout: "plates",
    images: [
      { src: "/images/projects/g-jones/03.png", alt: "G Jones at the Pioneer DJ decks, looking over his shoulder", aspect: "landscape" },
      { src: "/images/projects/g-jones/08.png", alt: "G Jones silhouetted between LED panel structures", aspect: "landscape" },
      { src: "/images/projects/g-jones/12.png", alt: "Stage covered in repeating head-silhouette projections", aspect: "landscape" },
      { src: "/images/projects/g-jones/09.png", alt: "G Jones silhouetted at the decks, radial beams cutting through haze", aspect: "landscape" },
      { src: "/images/projects/g-jones/19.png", alt: "Wide stage — silhouette and light", aspect: "landscape" },
      { src: "/images/projects/g-jones/16.png", alt: "R.A.V.E. — Realizing Alternative — projected on LED wall", aspect: "landscape" },
      { src: "/images/projects/g-jones/01.png", alt: "Circular lighting rig over the stage", aspect: "landscape" },
      { src: "/images/projects/g-jones/14.png", alt: "Faceted LED booth from the crowd", aspect: "landscape" },
      { src: "/images/projects/g-jones/15.png", alt: "LED architecture, backlit stage", aspect: "landscape" },
    ],
    credits: [
      { role: "Photography", name: "Aymane Rouchdi" },
      { role: "Artist", name: "G Jones" },
      { role: "Event", name: "Sound Haven" },
      { role: "Location", name: "Jaceland, TN" },
    ],
  },
  {
    slug: "fly-sound-haven",
    title: "FLY",
    artist: "Sound Haven Music Festival 2026",
    event: "Sound Haven",
    location: "Jaceland, TN",
    year: "2026",
    medium: "Photography",
    cover: {
      src: "/images/projects/fly/cover.png",
      alt: "FLY stage — magenta production, LED screens, crowd at Sound Haven",
      aspect: "landscape",
    },
    description:
      "Magenta haze, LED architecture, and the figure in the booth. Selected frames from FLY's Sound Haven set — the production, the decks, and the night around them.",
    galleryLayout: "plates",
    images: [
      { src: "/images/projects/fly/01.png", alt: "FLY at the Pioneer decks, Sound Haven", aspect: "landscape" },
      { src: "/images/projects/fly/04.png", alt: "FLY from behind at the decks", aspect: "landscape" },
      { src: "/images/projects/fly/06.png", alt: "FLY at the decks, twilight", aspect: "landscape" },
      { src: "/images/projects/fly/07.png", alt: "FLY looking out over the crowd", aspect: "landscape" },
      { src: "/images/projects/fly/09.png", alt: "FLY at the booth, Sound Haven", aspect: "landscape" },
      { src: "/images/projects/fly/10.png", alt: "FLY on stage, Sound Haven", aspect: "landscape" },
      { src: "/images/projects/fly/11.png", alt: "FLY at the decks", aspect: "landscape" },
      { src: "/images/projects/fly/13.png", alt: "FLY, Sound Haven 2026", aspect: "landscape" },
      { src: "/images/projects/fly/14.png", alt: "FLY at the Pioneer mixer", aspect: "landscape" },
      { src: "/images/projects/fly/15.png", alt: "FLY on stage", aspect: "landscape" },
      { src: "/images/projects/fly/16.png", alt: "FLY at the booth", aspect: "landscape" },
      { src: "/images/projects/fly/17.png", alt: "FLY stage production, Sound Haven", aspect: "landscape" },
      { src: "/images/projects/fly/02.png", alt: "FLY LED booth with spark fountains", aspect: "landscape" },
      { src: "/images/projects/fly/19.png", alt: "FLY stage from the crowd — LED wings", aspect: "landscape" },
      { src: "/images/projects/fly/20.png", alt: "FLY at Sound Haven", aspect: "landscape" },
      { src: "/images/projects/fly/21.png", alt: "FLY, Sound Haven 2026", aspect: "landscape" },
      { src: "/images/projects/fly/23.png", alt: "FLY stage at night", aspect: "landscape" },
      { src: "/images/projects/fly/24.png", alt: "FLY LED screens from the field", aspect: "landscape" },
      { src: "/images/projects/fly/25.png", alt: "FLY stage, Sound Haven", aspect: "landscape" },
      { src: "/images/projects/fly/26.png", alt: "FLY production at night", aspect: "landscape" },
      { src: "/images/projects/fly/27.png", alt: "FLY stage with crowd", aspect: "landscape" },
      { src: "/images/projects/fly/28.png", alt: "FLY LED architecture", aspect: "landscape" },
      { src: "/images/projects/fly/29.png", alt: "FLY set, Sound Haven", aspect: "landscape" },
      { src: "/images/projects/fly/30.png", alt: "FLY stage wash", aspect: "landscape" },
      { src: "/images/projects/fly/03.png", alt: "FLY at the decks", aspect: "portrait" },
      { src: "/images/projects/fly/05.png", alt: "FLY, Sound Haven 2026", aspect: "portrait" },
      { src: "/images/projects/fly/08.png", alt: "FLY in the booth", aspect: "portrait" },
      { src: "/images/projects/fly/12.png", alt: "FLY at the Pioneer decks", aspect: "portrait" },
      { src: "/images/projects/fly/22.png", alt: "FLY on stage", aspect: "portrait" },
      { src: "/images/projects/fly/32.png", alt: "FLY at the mixer", aspect: "portrait" },
      { src: "/images/projects/fly/31.png", alt: "FLY stage, Sound Haven 2026", aspect: "landscape" },
    ],
    credits: [
      { role: "Photography", name: "Aymane Rouchdi" },
      { role: "Artist", name: "FLY" },
      { role: "Event", name: "Sound Haven" },
      { role: "Location", name: "Jaceland, TN" },
    ],
  },
  {
    slug: "andy-bruh-aisle-5",
    title: "ANDY BRUH",
    artist: "Aisle 5, Atlanta",
    event: "Aisle 5",
    location: "Atlanta, GA",
    year: "2026",
    medium: "Photography",
    cover: {
      src: "/images/projects/andy-bruh/cover.png",
      alt: "Andy Bruh at the decks — ANDY BRUH on the LED wall, Aisle 5",
      aspect: "landscape",
    },
    description:
      "Red vinyl, Pioneer decks, and the name on the wall. Selected frames from Andy Bruh's Aisle 5 set — the booth, the crowd, and the LED architecture behind him.",
    galleryLayout: "plates",
    images: [
      { src: "/images/projects/andy-bruh/01.png", alt: "Crowd at Aisle 5 — child on shoulders under disco balls", aspect: "landscape" },
      { src: "/images/projects/andy-bruh/02.png", alt: "Andy Bruh silhouetted against LED graphics, red wash", aspect: "landscape" },
      { src: "/images/projects/andy-bruh/03.png", alt: "From the booth — Pioneer decks, red vinyl, crowd at Aisle 5", aspect: "landscape" },
      { src: "/images/projects/andy-bruh/04.png", alt: "Andy Bruh at the decks, Aisle 5", aspect: "landscape" },
      { src: "/images/projects/andy-bruh/05.png", alt: "Over the booth — turntable, laptop, crowd behind the barricade", aspect: "landscape" },
      { src: "/images/projects/andy-bruh/06.png", alt: "Andy Bruh at the laptop, teal wash", aspect: "landscape" },
      { src: "/images/projects/andy-bruh/07.png", alt: "Andy Bruh with arm raised over the booth, Aisle 5", aspect: "landscape" },
      { src: "/images/projects/andy-bruh/08.png", alt: "ANDY BRUH on the LED wall, silhouette at the decks", aspect: "landscape" },
      { src: "/images/projects/andy-bruh/09.png", alt: "ANDY on LED, neon green wash", aspect: "landscape" },
      { src: "/images/projects/andy-bruh/10.png", alt: "Andy Bruh at the booth, Aisle 5", aspect: "landscape" },
      { src: "/images/projects/andy-bruh/11.png", alt: "Andy Bruh at the decks", aspect: "landscape" },
      { src: "/images/projects/andy-bruh/12.png", alt: "Andy Bruh, Aisle 5 2026", aspect: "landscape" },
      { src: "/images/projects/andy-bruh/13.png", alt: "Andy Bruh mixing, Aisle 5", aspect: "landscape" },
      { src: "/images/projects/andy-bruh/14.png", alt: "Andy Bruh at the decks, red vinyl", aspect: "landscape" },
      { src: "/images/projects/andy-bruh/15.png", alt: "Andy Bruh, Aisle 5", aspect: "landscape" },
      { src: "/images/projects/andy-bruh/16.png", alt: "ANDY BRUH on LED — silhouette at the booth", aspect: "landscape" },
      { src: "/images/projects/andy-bruh/17.png", alt: "ANDY on LED, neon green stage lights", aspect: "landscape" },
      { src: "/images/projects/andy-bruh/18.png", alt: "Andy Bruh at the decks — ANDY BRUH on the LED wall", aspect: "landscape" },
      { src: "/images/projects/andy-bruh/20.png", alt: "ANDY BRUH on LED, orange wash", aspect: "landscape" },
      { src: "/images/projects/andy-bruh/21.png", alt: "LED visuals, silhouette at the booth", aspect: "landscape" },
      { src: "/images/projects/andy-bruh/22.png", alt: "Andy Bruh looking out over the crowd, blue wash", aspect: "landscape" },
      { src: "/images/projects/andy-bruh/23.png", alt: "ANDY BRUH on teal LED", aspect: "landscape" },
      { src: "/images/projects/andy-bruh/24.png", alt: "Andy Bruh at the decks, Aisle 5", aspect: "landscape" },
      { src: "/images/projects/andy-bruh/25.png", alt: "Andy Bruh, Aisle 5 2026", aspect: "landscape" },
    ],
    credits: [
      { role: "Photography", name: "Aymane Rouchdi" },
      { role: "Artist", name: "Andy Bruh" },
      { role: "Event", name: "Aisle 5" },
      { role: "Location", name: "Atlanta, GA" },
    ],
  },
  {
    slug: "eptic-believe-music-hall",
    title: "EPTIC",
    artist: "Believe Music Hall, Atlanta",
    event: "Believe Music Hall",
    location: "Atlanta, GA",
    year: "2026",
    medium: "Photography",
    cover: {
      src: "/images/projects/eptic/cover.png",
      alt: "Eptic at the decks looking out over the crowd — Believe Music Hall",
      aspect: "landscape",
    },
    description:
      "Lasers, LED skulls, and the name on the wall. Selected frames from Eptic's Believe Music Hall set — the booth, the floor, and the production around him.",
    galleryLayout: "plates",
    images: [
      { src: "/images/projects/eptic/02.png", alt: "Eptic at Believe Music Hall", aspect: "landscape" },
      { src: "/images/projects/eptic/03.png", alt: "Crowd under red lasers, Eptic silhouetted at the booth", aspect: "landscape" },
      { src: "/images/projects/eptic/04.png", alt: "EPTIC on the LED wall — crowd and glow sticks", aspect: "landscape" },
      { src: "/images/projects/eptic/05.png", alt: "Wide from the hall — EPTIC on triple screens, blue haze", aspect: "landscape" },
      { src: "/images/projects/eptic/06.png", alt: "From the balcony — EPTIC on the LED wall, Believe Music Hall", aspect: "landscape" },
      { src: "/images/projects/eptic/07.png", alt: "Crowd at Believe Music Hall", aspect: "landscape" },
      { src: "/images/projects/eptic/08.png", alt: "Red lasers over the floor, monster graphic on the LED", aspect: "landscape" },
      { src: "/images/projects/eptic/09.png", alt: "From the booth — Pioneer decks, crowd, Believe Music Hall", aspect: "landscape" },
      { src: "/images/projects/eptic/10.png", alt: "Crowd facing three-eyed skull visuals on the LED wall", aspect: "landscape" },
      { src: "/images/projects/eptic/11.png", alt: "EPTIC on triple screens, purple spots through haze", aspect: "landscape" },
      { src: "/images/projects/eptic/12.png", alt: "Skull logo on LED, red and green lasers", aspect: "landscape" },
      { src: "/images/projects/eptic/13.png", alt: "Eptic at Believe Music Hall, 2026", aspect: "landscape" },
      { src: "/images/projects/eptic/15.png", alt: "From above — red lasers and skull screens over the crowd", aspect: "landscape" },
      { src: "/images/projects/eptic/16.png", alt: "Crowd reaching toward EPTIC on the LED wall", aspect: "landscape" },
      { src: "/images/projects/eptic/17.png", alt: "From the booth looking out — Pioneer decks, magenta wash", aspect: "landscape" },
      { src: "/images/projects/eptic/14.png", alt: "Eptic at the decks, arm raised", aspect: "portrait" },
      { src: "/images/projects/eptic/18.png", alt: "Eptic at the mixer, skull graphic on the LED behind him", aspect: "portrait" },
    ],
    credits: [
      { role: "Photography", name: "Aymane Rouchdi" },
      { role: "Artist", name: "Eptic" },
      { role: "Event", name: "Believe Music Hall" },
      { role: "Location", name: "Atlanta, GA" },
    ],
  },
  {
    slug: "truth-terminal-west",
    title: "TRUTH",
    artist: "Terminal West, Atlanta",
    event: "Terminal West",
    location: "Atlanta, GA",
    year: "2026",
    medium: "Photography",
    cover: {
      src: "/images/projects/truth/cover.png",
      alt: "Truth at the Pioneer decks, green wash — Terminal West",
      aspect: "portrait",
    },
    description:
      "Fisheye, red wash, and the name on the wall. Selected frames from Truth's Terminal West set — the booth, the floor, and the light around him.",
    galleryLayout: "plates",
    images: [
      { src: "/images/projects/truth/02.png", alt: "Truth at Terminal West", aspect: "landscape" },
      { src: "/images/projects/truth/03.png", alt: "Truth at the booth, Terminal West", aspect: "landscape" },
      { src: "/images/projects/truth/04.png", alt: "Truth, Terminal West 2026", aspect: "landscape" },
      { src: "/images/projects/truth/06.png", alt: "Crowd at Terminal West", aspect: "landscape" },
      { src: "/images/projects/truth/07.png", alt: "Truth at the decks", aspect: "landscape" },
      { src: "/images/projects/truth/08.png", alt: "Truth, Terminal West", aspect: "landscape" },
      { src: "/images/projects/truth/09.png", alt: "Stage at Terminal West", aspect: "landscape" },
      { src: "/images/projects/truth/10.png", alt: "Truth at Terminal West", aspect: "landscape" },
      { src: "/images/projects/truth/11.png", alt: "Truth at the booth", aspect: "landscape" },
      { src: "/images/projects/truth/12.png", alt: "Truth, Terminal West 2026", aspect: "landscape" },
      { src: "/images/projects/truth/14.png", alt: "Truth at the decks, Terminal West", aspect: "landscape" },
      { src: "/images/projects/truth/15.png", alt: "Crowd facing the stage, Terminal West", aspect: "landscape" },
      { src: "/images/projects/truth/16.png", alt: "Truth at Terminal West", aspect: "landscape" },
      { src: "/images/projects/truth/17.png", alt: "Truth, Terminal West", aspect: "landscape" },
      { src: "/images/projects/truth/18.png", alt: "Truth silhouetted at the booth, red wash", aspect: "landscape" },
      { src: "/images/projects/truth/19.png", alt: "Crowd facing red and white spots at Terminal West", aspect: "landscape" },
      { src: "/images/projects/truth/20.png", alt: "Truth at the booth, blue wash — TERMINAL WEST neon", aspect: "landscape" },
      { src: "/images/projects/truth/21.png", alt: "Truth silhouetted under blue spots, Terminal West", aspect: "landscape" },
      { src: "/images/projects/truth/23.png", alt: "From the booth looking out — DARK & DANGEROUS jersey, crowd", aspect: "landscape" },
      { src: "/images/projects/truth/24.png", alt: "Truth silhouetted at the booth, red wash", aspect: "landscape" },
      { src: "/images/projects/truth/25.png", alt: "TRUTH on the LED wall, magenta wash", aspect: "landscape" },
      { src: "/images/projects/truth/26.png", alt: "Truth at the decks, octopus graphic on the LED", aspect: "landscape" },
      { src: "/images/projects/truth/27.png", alt: "Red stage lights over the booth, Terminal West", aspect: "landscape" },
      { src: "/images/projects/truth/28.png", alt: "TRUTH on the LED wall, blue and purple wash", aspect: "landscape" },
      { src: "/images/projects/truth/29.png", alt: "Truth silhouetted under red beams", aspect: "landscape" },
      { src: "/images/projects/truth/30.png", alt: "Crowd facing the stage, blue wash, Terminal West", aspect: "landscape" },
      { src: "/images/projects/truth/31.png", alt: "Truth at the booth, TERMINAL WEST neon, purple wash", aspect: "landscape" },
      { src: "/images/projects/truth/32.png", alt: "Crowd facing white beams and LED visuals", aspect: "landscape" },
      { src: "/images/projects/truth/33.png", alt: "TRUTH on the LED wall, Pioneer decks in the foreground", aspect: "landscape" },
      { src: "/images/projects/truth/05.png", alt: "Truth at the decks, Terminal West", aspect: "portrait" },
      { src: "/images/projects/truth/13.png", alt: "Truth at the booth, Terminal West", aspect: "portrait" },
      { src: "/images/projects/truth/22.png", alt: "Truth at the mixer, Deep jersey, blue wash", aspect: "portrait" },
    ],
    credits: [
      { role: "Photography", name: "Aymane Rouchdi" },
      { role: "Artist", name: "Truth" },
      { role: "Event", name: "Terminal West" },
      { role: "Location", name: "Atlanta, GA" },
    ],
  },
  {
    slug: "its-murph-def-warehouse",
    title: "IT'S MURPH",
    artist: "DEF: Warehouse, Atlanta",
    event: "DEF: Warehouse",
    location: "Atlanta, GA",
    year: "2026",
    medium: "Photography",
    cover: {
      src: "/images/projects/its-murph/cover.png",
      alt: "It's Murph at the Pioneer decks, red bar overhead — DEF: Warehouse",
      aspect: "landscape",
    },
    description:
      "Red bars, DEF neon, and confetti in the haze. Selected frames from It's Murph at DEF: Warehouse — the booth, the floor, and the light around him.",
    galleryLayout: "plates",
    images: [
      { src: "/images/projects/its-murph/03.png", alt: "It's Murph at the booth, confetti on the decks — DEF: Warehouse", aspect: "landscape" },
      { src: "/images/projects/its-murph/04.png", alt: "DEF neon through red smoke, crowd in silhouette", aspect: "landscape" },
      { src: "/images/projects/its-murph/05.png", alt: "It's Murph at the decks under red wash, packed floor", aspect: "landscape" },
      { src: "/images/projects/its-murph/06.png", alt: "DEF logo and orange bars over the warehouse crowd", aspect: "landscape" },
      { src: "/images/projects/its-murph/07.png", alt: "It's Murph arms up, DEF neon behind him", aspect: "landscape" },
      { src: "/images/projects/its-murph/08.png", alt: "From the back of the hall — orange bar, DEF logo, crowd", aspect: "landscape" },
      { src: "/images/projects/its-murph/09.png", alt: "It's Murph at the booth, blue neon, DEF logo", aspect: "landscape" },
      { src: "/images/projects/its-murph/10.png", alt: "Blue neon over the warehouse, DEF logo, crowd in silhouette", aspect: "landscape" },
      { src: "/images/projects/its-murph/11.png", alt: "From behind It's Murph — graphic tee, headphones, red wash", aspect: "landscape" },
      { src: "/images/projects/its-murph/12.png", alt: "It's Murph at the decks, white LED bar through haze", aspect: "landscape" },
      { src: "/images/projects/its-murph/13.png", alt: "From the booth looking out — Pioneer decks, packed warehouse", aspect: "landscape" },
      { src: "/images/projects/its-murph/14.png", alt: "Confetti drop and smoke over the crowd, DEF: Warehouse", aspect: "landscape" },
      { src: "/images/projects/its-murph/15.png", alt: "Confetti and haze over raised hands", aspect: "landscape" },
      { src: "/images/projects/its-murph/16.png", alt: "Confetti blast over the warehouse floor", aspect: "landscape" },
      { src: "/images/projects/its-murph/17.png", alt: "Red confetti and red bar over the crowd", aspect: "landscape" },
      { src: "/images/projects/its-murph/02.png", alt: "It's Murph in profile, hands together — DEF: Warehouse", aspect: "portrait" },
    ],
    credits: [
      { role: "Photography", name: "Aymane Rouchdi" },
      { role: "Artist", name: "It's Murph" },
      { role: "Event", name: "DEF: Warehouse" },
      { role: "Location", name: "Atlanta, GA" },
    ],
  },
  {
    slug: "ravenscoon",
    title: "RAVENSCOON",
    artist: "Ravenscoon",
    event: "Artist Interview",
    location: "Okeechobee Music Festival",
    year: "2026",
    medium: "Film / Editorial",
    featured: true,
    cover: {
      src: "/images/projects/ravenscoon/cover.jpg",
      alt: "Ravenscoon — artist interview",
      aspect: "portrait",
    },
    description:
      "A long-form conversation with Ravenscoon — process, sound design, and the space between the underground and the stage.",
    video: {
      url: "/videos/ravenscoon-interview.mp4",
      thumbnail: "/images/projects/ravenscoon/cover.jpg",
    },
    credits: [
      { role: "Film", name: "Aymane Rouchdi" },
      { role: "Artist", name: "Ravenscoon" },
      { role: "Location", name: "Okeechobee Music Festival" },
    ],
  },
  {
    slug: "portraits",
    title: "PORTRAITS",
    event: "Ongoing",
    year: "—",
    medium: "Portraiture",
    galleryLayout: "plates",
    cover: {
      src: "/images/projects/portraits/cover.jpg",
      alt: "Portrait",
      aspect: "landscape",
    },
    description: "An open portrait series of artists, producers, and collaborators.",
    images: [
      // caption: leave blank — fill in each artist ID yourself
      { src: "/images/projects/portraits/01.png", alt: "Portrait", aspect: "portrait", caption: "G Jones" },
      { src: "/images/projects/portraits/02.png", alt: "Portrait", aspect: "portrait", caption: "Andy Bruh" },
      { src: "/images/projects/portraits/03.png", alt: "Portrait", aspect: "portrait", caption: "Mythm" },
      { src: "/images/projects/portraits/04.png", alt: "Portrait", aspect: "portrait", caption: "Daggz" },
      { src: "/images/projects/portraits/05.png", alt: "Portrait", aspect: "portrait", caption: "FLY" },
      { src: "/images/projects/portraits/06.png", alt: "Portrait", aspect: "portrait", caption: "Eptic" },
      { src: "/images/projects/portraits/07.png", alt: "Portrait", aspect: "portrait", caption: "Truth" },
    ],
  },
];

// Helper for the [slug] route.
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}
