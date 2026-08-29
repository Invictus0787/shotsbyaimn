# SHOTS BY AIMN — Portfolio

Photography, film, artist interviews, and editorial documentation by
**Aymane Rouchdi** (Atlanta).

Built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**,
and **Framer Motion** (used sparingly). Deploys cleanly on **Vercel**.

---

## Running locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other scripts:

```bash
npm run build       # production build
npm run start       # run the production build
npm run lint        # eslint
npm run typecheck   # tsc --noEmit
```

---

## Folder structure

```
app/
  layout.tsx              # global layout, fonts, metadata
  page.tsx                # homepage (Hero + all sections)
  work/
    page.tsx              # /work — full project index
    [slug]/page.tsx       # /work/<slug> — dynamic project page
  film/page.tsx           # /film
  editorial/page.tsx      # /editorial
  archive/page.tsx        # /archive (contact sheet)
  about/page.tsx          # /about
  contact/page.tsx        # /contact
  not-found.tsx           # 404
  globals.css

components/
  Navbar.tsx              # sticky top nav + mobile menu
  Hero.tsx                # fullscreen editorial hero
  SectionHeading.tsx      # shared editorial section header
  SelectedWork.tsx        # modular editorial grid
  ProjectCard.tsx         # single project tile
  FeaturedEditorial.tsx   # highlighted interview/doc block
  FilmGrid.tsx            # video thumbnails + modal player
  VideoModal.tsx          # YouTube/Vimeo modal (with toEmbed helper)
  ArchiveGrid.tsx         # contact-sheet style grid
  Lightbox.tsx            # keyboard-accessible fullscreen viewer
  AboutSection.tsx        # bio + portrait
  ContactSection.tsx      # contact form (mailto: based)
  ProjectGallery.tsx      # curated per-project image layout
  Footer.tsx

data/
  site.ts                 # brand, contact info, navigation
  projects.ts             # every project — cover, images, video, credits
  films.ts                # film/motion entries
  archive.ts              # archive frames
  about.ts                # bio + affiliations

public/
  favicon.svg
  images/
    hero/                 # drop your real hero photo here
    projects/
      g-jones/            # one folder per project
      mythm/
      atlanta/
      portraits/
      festival/
    archive/              # loose archive frames
    about/                # portrait
    placeholders/         # auto-generated dark SVGs (safe to keep for now)

scripts/
  gen-placeholders.mjs    # regenerates the placeholder SVGs
```

---

## Where do I drop my photos?

| What you're replacing                | Where the file lives                                            | Where it's referenced           |
| ------------------------------------ | --------------------------------------------------------------- | ------------------------------- |
| **Hero collage frames**              | `public/images/hero/collage/01–32.jpg` + `wash.jpg`             | `data/hero.ts` + `HeroCollage`  |
| **Project cover + gallery images**   | `public/images/projects/<slug>/…`                               | `data/projects.ts`              |
| **Archive frames**                   | `public/images/archive/…`                                       | `data/archive.ts`               |
| **About / portrait image**           | `public/images/about/portrait.jpg`                              | `data/about.ts`                 |
| **Film thumbnails**                  | `public/images/projects/<slug>/thumbnail.jpg` (or anywhere)     | `data/films.ts`                 |

Every image in the site is loaded via `next/image`, which handles
responsive sizing, lazy loading, and format negotiation automatically.
Just point the `src` at your local path.

---

## Adding a new project

1. Create a folder: `public/images/projects/<your-slug>/`
2. Drop your photos in there (e.g. `cover.jpg`, `01.jpg`, `02.jpg`).
3. Open `data/projects.ts` and add a new object:

```ts
{
  slug: "your-slug",                    // becomes /work/your-slug
  title: "PROJECT TITLE",
  artist: "Artist Name",                // optional
  event: "Sound Haven",                 // optional
  location: "Atlanta, GA",              // optional
  year: "2026",
  medium: "Photography",                // or "Film / Editorial", etc.
  cover: {
    src: "/images/projects/your-slug/cover.jpg",
    alt: "…",
    aspect: "landscape",                // "landscape" | "portrait" | "square"
  },
  description: "A short editorial paragraph.",
  gridSpan: { col: 4, row: 2 },         // homepage grid weight (2–6)
  images: [
    { src: "/images/projects/your-slug/01.jpg", alt: "…", aspect: "landscape", layout: "full" },
    { src: "/images/projects/your-slug/02.jpg", alt: "…", aspect: "portrait",  layout: "center" },
    { src: "/images/projects/your-slug/03.jpg", alt: "…", aspect: "landscape", layout: "pair-left" },
    { src: "/images/projects/your-slug/04.jpg", alt: "…", aspect: "landscape", layout: "pair-right" },
  ],
  credits: [
    { role: "Photography", name: "Aymane Rouchdi" },
    { role: "Artist", name: "…" },
  ],
}
```

That's it — the homepage grid, `/work`, and `/work/<slug>` will all
update automatically. Set `featured: true` on **one** project to put
it in the "Featured Editorial" homepage slot.

### Gallery layout hints (`layout` field)

Each gallery image can carry an optional `layout` hint so the project
page composes intentional rhythm instead of a uniform stack:

| Value         | Behavior                                              |
| ------------- | ------------------------------------------------------ |
| `full`        | Full-width image (default)                             |
| `center`      | Centered, portrait-friendly (max ~70vh)                |
| `pair-left`   | Left half of a two-image asymmetric row                |
| `pair-right`  | Right half of a two-image asymmetric row (nudged down) |
| `grid`        | Contact-sheet grid cell (consecutive `grid` images group into a 4-col row) |

Consecutive `pair-left` + `pair-right` images auto-pair. Consecutive
`grid` images auto-group into a contact sheet.

---

## Adding a film / video

Edit `data/films.ts` and add:

```ts
{
  slug: "your-film",
  title: "FILM TITLE",
  artist: "Artist",
  event: "Event",
  year: "2026",
  thumbnail: "/images/projects/your-film/thumb.jpg",
  videoUrl: "https://www.youtube.com/watch?v=XXXXX",  // or vimeo.com/XXXXX
  duration: "04:12",
  description: "…",
}
```

The film grid parses YouTube/Vimeo URLs automatically and plays them
in an inline modal (no autoplay, no audio surprises).

---

## Editing the biography, contact info, and navigation

- **Bio + affiliations** → `data/about.ts`
- **Email, Instagram, brand, location, SEO copy** → `data/site.ts`
- **Nav items** → `data/site.ts` (`nav` array)

The contact form composes a `mailto:` message. If you later add a real
form endpoint (Formspree, Resend, Basin, etc.), swap the `handleSubmit`
inside `components/ContactSection.tsx` — everything else stays the same.

---

## Placeholders

The initial site ships with dark editorial SVG placeholders in
`public/images/placeholders/`. They're intentionally understated so
the design reads as finished even before real photographs are added.

Regenerate them at any time:

```bash
node scripts/gen-placeholders.mjs
```

You can safely delete `public/images/placeholders/` once every path
in `data/*.ts` points at real photographs.

---

## Design intent (for future edits)

- Palette: near-black, charcoal, off-white, muted gray. **Photography
  provides all the color.** Warm off-white (`bone`) is used only for
  editorial sections (About, Editorial index).
- Type: `Instrument Serif` (editorial display) + `Inter` (UI).
- Motion: `framer-motion` used only for entrance fades, hover state,
  lightbox, and modal transitions. Nothing bounces, floats, or parallaxes.
- Layout: 12-column grid with intentional off-grid nudges. Thin
  hairline rules, uppercase micro-labels, tight tracking, and numbered
  index blocks (`01`, `02`, …) throughout.
- No rounded corners. No gradients (except a subtle vignette on the
  hero for legibility). No glow. No glass.

---

## Deploy

Push the repo to GitHub and import it on
[vercel.com](https://vercel.com). Zero configuration required —
Vercel detects Next.js automatically.

Add your custom domain in the Vercel dashboard once ready.
