"use client";

import { useEffect, useRef } from "react";

type Props = {
  src: string;
  poster: string;
  alt: string;
};

/**
 * Silent looping video that behaves like a GIF: autoplay, muted, no controls.
 * Falls back to the poster still when the user prefers reduced motion.
 */
export default function LoopingCover({ src, poster, alt }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.muted = true;
    el.defaultMuted = true;

    const play = () => {
      void el.play().catch(() => {});
    };

    play();

    const onVisibility = () => {
      if (document.visibilityState === "visible") play();
    };

    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [src]);

  return (
    <>
      <video
        ref={ref}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={poster}
        aria-label={alt}
        disablePictureInPicture
      >
        <source src={src} type="video/mp4" />
      </video>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={poster}
        alt={alt}
        className="hidden absolute inset-0 h-full w-full object-cover motion-reduce:block"
      />
    </>
  );
}
