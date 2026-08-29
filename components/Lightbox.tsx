"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect } from "react";

export type LightboxFrame = {
  src: string;
  alt: string;
  caption?: string;
  meta?: string;
};

type Props = {
  frames: LightboxFrame[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (i: number) => void;
};

export default function Lightbox({
  frames,
  index,
  onClose,
  onIndexChange,
}: Props) {
  const open = index !== null;

  const goNext = useCallback(() => {
    if (index === null) return;
    onIndexChange((index + 1) % frames.length);
  }, [index, frames.length, onIndexChange]);

  const goPrev = useCallback(() => {
    if (index === null) return;
    onIndexChange((index - 1 + frames.length) % frames.length);
  }, [index, frames.length, onIndexChange]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose, goNext, goPrev]);

  const current = index !== null ? frames[index] : null;

  return (
    <AnimatePresence>
      {open && current && (
        <motion.div
          className="fixed inset-0 z-[90] flex flex-col bg-ink-950/98"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-5 py-4 md:px-8">
            <div className="text-tiny tracking-widest2 uppercase text-ink-300">
              {String((index ?? 0) + 1).padStart(2, "0")} /{" "}
              {String(frames.length).padStart(2, "0")}
            </div>
            <button
              type="button"
              onClick={onClose}
              className="text-tiny tracking-widest2 uppercase text-ink-200 hover:text-ink-50"
              aria-label="Close viewer"
            >
              CLOSE ✕
            </button>
          </div>

          {/* Image */}
          <div className="relative flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.src}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="absolute inset-0 flex items-center justify-center p-5 md:p-10"
              >
                {/* Cap display size so 1024px files are never stretched. */}
                <Image
                  src={current.src}
                  alt={current.alt}
                  width={1024}
                  height={1024}
                  unoptimized
                  className="h-auto max-h-[calc(100svh-9rem)] w-auto max-w-[min(100%,50rem)] object-contain"
                  priority
                />
              </motion.div>
            </AnimatePresence>

            {/* Prev / Next zones */}
            <button
              type="button"
              onClick={goPrev}
              className="group absolute inset-y-0 left-0 w-1/3 md:w-1/4"
              aria-label="Previous image"
            >
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-tiny tracking-widest2 uppercase text-ink-400 opacity-0 transition-opacity group-hover:opacity-100">
                ← PREV
              </span>
            </button>
            <button
              type="button"
              onClick={goNext}
              className="group absolute inset-y-0 right-0 w-1/3 md:w-1/4"
              aria-label="Next image"
            >
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-tiny tracking-widest2 uppercase text-ink-400 opacity-0 transition-opacity group-hover:opacity-100">
                NEXT →
              </span>
            </button>
          </div>

          {/* Caption bar */}
          <div className="flex flex-col gap-2 border-t border-white/5 px-5 py-4 md:flex-row md:items-center md:justify-between md:px-8">
            <div className="min-w-0 text-tiny tracking-widest2 uppercase text-ink-200">
              {current.meta ?? current.alt}
            </div>
            {current.caption && (
              <div className="truncate text-tiny tracking-widest2 uppercase text-ink-400">
                {current.caption}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
