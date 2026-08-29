import type { Metadata } from "next";
import FilmGrid from "@/components/FilmGrid";

export const metadata: Metadata = {
  title: "Film",
  description:
    "Selected film, motion, and video work — artist interviews, festival recaps, and documentary.",
};

export default function FilmPage() {
  return (
    <div className="pt-24 md:pt-28">
      <div className="px-5 md:px-8">
        <div className="mb-4 text-micro tracking-widest2 uppercase text-ink-400">
          INDEX — MOTION
        </div>
        <h1 className="font-serif text-5xl leading-none text-ink-50 md:text-7xl">
          FILM
        </h1>
        <p className="mt-6 max-w-xl text-tiny tracking-widest2 uppercase text-ink-300">
          ARTIST INTERVIEWS · DOCUMENTARY · FESTIVAL RECAPS
        </p>
      </div>
      <FilmGrid />
    </div>
  );
}
