"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import VideoModal from "./VideoModal";
import { films } from "@/data/films";

export default function FilmGrid() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const current = openIdx !== null ? films[openIdx] : null;

  return (
    <section
      id="film"
      className="border-t border-white/5 px-5 py-24 md:px-8 md:py-32"
    >
      <SectionHeading
        eyebrow="INDEX 03"
        title="FILM / MOTION"
        viewAllHref="/film"
      />

      <div className="grid grid-cols-1 gap-x-6 gap-y-14 md:grid-cols-6">
        {films.map((film, i) => {
          // Alternate large / small tiles for cinematic rhythm
          const large = i === 0;
          const colClass = large
            ? "md:col-span-6"
            : i === 1
            ? "md:col-span-4"
            : "md:col-span-2";

          return (
            <motion.button
              key={film.slug}
              type="button"
              onClick={() => setOpenIdx(i)}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: [0.2, 0.6, 0.2, 1] }}
              className={["group text-left", colClass].join(" ")}
              aria-label={`Play ${film.title}`}
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-ink-800">
                <Image
                  src={film.thumbnail}
                  alt={film.title}
                  fill
                  sizes={large ? "100vw" : "50vw"}
                  className="object-cover transition-transform duration-[600ms] ease-editorial group-hover:scale-[1.02]"
                />
                <div className="pointer-events-none absolute inset-0 bg-black/10 transition-opacity duration-300 group-hover:bg-black/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-14 w-14 items-center justify-center border border-white/60 text-ink-50 transition-transform duration-300 group-hover:scale-105">
                    ▶
                  </span>
                </div>
                {film.duration && (
                  <div className="absolute bottom-3 right-3 text-micro tracking-widest2 uppercase text-ink-100">
                    {film.duration}
                  </div>
                )}
              </div>

              <div className="mt-4 flex items-baseline justify-between gap-4">
                <div className="min-w-0">
                  <div className="text-micro tracking-widest2 uppercase text-ink-400">
                    {String(i + 1).padStart(2, "0")} — FILM
                  </div>
                  <h3 className="mt-1 truncate font-serif text-2xl leading-tight text-ink-50 md:text-3xl">
                    {film.title}
                  </h3>
                  <div className="mt-1 text-tiny tracking-widest2 uppercase text-ink-300">
                    {[film.artist, film.event, film.year]
                      .filter(Boolean)
                      .join(" · ")}
                  </div>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      <VideoModal
        open={openIdx !== null}
        onClose={() => setOpenIdx(null)}
        url={current?.videoUrl ?? null}
        title={current?.title}
        poster={current?.thumbnail}
      />
    </section>
  );
}
