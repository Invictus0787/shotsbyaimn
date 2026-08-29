"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { HERO_SPREAD_MS, heroSpreads, type HeroFrame } from "@/data/hero";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

function Print({ frame, priority }: { frame: HeroFrame; priority?: boolean }) {
  return (
    <div
      className="absolute origin-center"
      style={{
        left: frame.x,
        top: frame.y,
        width: frame.w,
        aspectRatio: `${frame.nw} / ${frame.nh}`,
        transform: `rotate(${frame.rot}deg)`,
        zIndex: frame.z,
        boxShadow: "0 14px 40px rgba(0,0,0,0.55)",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={frame.src}
        alt=""
        width={frame.nw}
        height={frame.nh}
        draggable={false}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : "low"}
        className="block h-full w-full object-contain"
      />
    </div>
  );
}

export default function HeroCollage() {
  const reduced = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const count = heroSpreads.length;

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, HERO_SPREAD_MS);
    return () => window.clearInterval(id);
  }, [count, reduced]);

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/hero/wash.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-25"
      />

      {heroSpreads.map((spread, i) => {
        const active = i === index;
        const nearby =
          i === index ||
          i === (index + 1) % count ||
          i === (index - 1 + count) % count;

        if (!nearby) return null;

        return (
          <motion.div
            key={i}
            className="absolute inset-[-2%] [filter:blur(4.5px)]"
            initial={false}
            animate={{
              opacity: active ? 1 : 0,
              x: reduced || !active ? "0%" : "1.1%",
              y: reduced || !active ? "0%" : "-0.7%",
            }}
            transition={{
              opacity: { duration: 1.7, ease: [0.2, 0.6, 0.2, 1] },
              x: { duration: active ? 8 : 1.7, ease: "linear" },
              y: { duration: active ? 8 : 1.7, ease: "linear" },
            }}
            style={{ zIndex: active ? 2 : 1 }}
          >
            {spread.map((frame, fi) => (
              <Print
                key={frame.src}
                frame={frame}
                priority={i === 0 && fi < 4}
              />
            ))}
          </motion.div>
        );
      })}
    </div>
  );
}
