"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import Lightbox, { type LightboxFrame } from "./Lightbox";
import { archive } from "@/data/archive";

export default function ArchiveGrid({ showHeading = true }: { showHeading?: boolean }) {
  const [idx, setIdx] = useState<number | null>(null);

  const frames: LightboxFrame[] = archive.map((f) => ({
    src: f.src,
    alt: f.alt,
    caption: [f.event, f.year].filter(Boolean).join(" · "),
    meta: [f.artist, f.event, f.year].filter(Boolean).join(" · "),
  }));

  return (
    <section
      id="archive"
      className="border-t border-white/5 px-5 py-24 md:px-8 md:py-32"
    >
      {showHeading && (
        <SectionHeading
          eyebrow="INDEX 03"
          title="ARCHIVE"
          right={
            <div className="text-micro tracking-widest2 uppercase text-ink-400">
              CONTACT SHEET / SELECTED
            </div>
          }
        />
      )}

      <div className="grid grid-cols-2 gap-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {archive.map((frame, i) => {
          const ratio =
            frame.aspect === "portrait"
              ? "aspect-[3/4]"
              : frame.aspect === "square"
              ? "aspect-square"
              : "aspect-[4/3]";

          return (
            <motion.button
              key={frame.src + i}
              type="button"
              onClick={() => setIdx(i)}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.4,
                delay: (i % 6) * 0.03,
                ease: [0.2, 0.6, 0.2, 1],
              }}
              className={["group relative overflow-hidden bg-ink-800", ratio].join(" ")}
              aria-label={`Open frame ${i + 1}`}
            >
              <Image
                src={frame.src}
                alt={frame.alt}
                fill
                sizes="(min-width: 1024px) 16vw, (min-width: 640px) 33vw, 50vw"
                className="object-cover transition-transform duration-500 ease-editorial group-hover:scale-[1.03]"
              />
              <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
              <div className="pointer-events-none absolute left-2 top-2 text-[10px] tracking-widest2 uppercase text-ink-100/70">
                {String(i + 1).padStart(3, "0")}
              </div>
            </motion.button>
          );
        })}
      </div>

      <Lightbox
        frames={frames}
        index={idx}
        onClose={() => setIdx(null)}
        onIndexChange={setIdx}
      />
    </section>
  );
}
