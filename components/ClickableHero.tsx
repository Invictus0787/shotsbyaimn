"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import Lightbox, { type LightboxFrame } from "./Lightbox";

type Props = {
  cover: LightboxFrame;
  galleryFrames?: LightboxFrame[];
  aspectClass?: string;
  priority?: boolean;
};

/**
 * Compact project showcase. Sized so 1024px source files stay sharp
 * on retina (~672px CSS). Clicking opens the full set in the lightbox.
 */
export default function ClickableHero({
  cover,
  galleryFrames = [],
  aspectClass = "aspect-[3/2]",
  priority = true,
}: Props) {
  const [idx, setIdx] = useState<number | null>(null);
  const frames: LightboxFrame[] = [cover, ...galleryFrames];

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setIdx(0)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.2, 0.6, 0.2, 1] }}
        className={[
          "group relative mx-auto block w-full max-w-2xl cursor-zoom-in overflow-hidden bg-ink-800",
          aspectClass,
        ].join(" ")}
        aria-label={`Open ${cover.alt} in viewer`}
      >
        <Image
          src={cover.src}
          alt={cover.alt}
          fill
          priority={priority}
          sizes="(min-width: 768px) 672px, 92vw"
          unoptimized
          className="object-cover transition-transform duration-[700ms] ease-editorial group-hover:scale-[1.01]"
        />
        <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
        <div className="pointer-events-none absolute bottom-3 right-3 text-micro tracking-widest2 uppercase text-ink-100/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          OPEN VIEWER ↗
        </div>
      </motion.button>

      <Lightbox
        frames={frames}
        index={idx}
        onClose={() => setIdx(null)}
        onIndexChange={setIdx}
      />
    </>
  );
}
