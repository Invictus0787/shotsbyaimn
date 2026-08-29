"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { isFileVideo, toEmbed } from "@/lib/video";
import VideoPlayer from "./VideoPlayer";

type Props = {
  open: boolean;
  onClose: () => void;
  url: string | null;
  title?: string;
  poster?: string;
};

export default function VideoModal({ open, onClose, url, title, poster }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const embed = url && !isFileVideo(url) ? toEmbed(url) : null;
  const file = url && isFileVideo(url) ? url : null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-ink-950/95 p-5 md:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          role="dialog"
          aria-modal="true"
          aria-label={title ?? "Video player"}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.2, 0.6, 0.2, 1] }}
            className="relative w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between text-tiny tracking-widest2 uppercase text-ink-300">
              <span>{title ?? "NOW PLAYING"}</span>
              <button
                type="button"
                onClick={onClose}
                className="hover:text-ink-50"
                aria-label="Close video"
              >
                CLOSE ✕
              </button>
            </div>
            <div className="relative aspect-video w-full overflow-hidden bg-black">
              {file ? (
                <VideoPlayer src={file} poster={poster} title={title} />
              ) : embed ? (
                <iframe
                  src={embed}
                  title={title ?? "Video"}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center p-6 text-center text-ink-300">
                  <div>
                    <div className="text-micro tracking-widest2 uppercase text-ink-500">
                      NO VIDEO
                    </div>
                    <div className="mt-2 text-tiny tracking-widest2 uppercase">
                      ADD A LOCAL FILE OR YOUTUBE / VIMEO URL
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
