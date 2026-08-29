"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { site } from "@/data/site";
import HeroCollage from "./HeroCollage";
import HeroHud from "./HeroHud";

export default function Hero() {
  return (
    <section
      className="relative isolate h-[100svh] min-h-[560px] w-full overflow-hidden bg-ink-950"
      aria-label="Introduction"
    >
      <HeroCollage />
      <HeroHud />

      {/* Grain + scanlines */}
      <div
        className="pointer-events-none absolute inset-0 z-[7] opacity-[0.1] mix-blend-overlay"
        aria-hidden
        style={{
          backgroundImage: "url(/images/hero/grain.png)",
          backgroundSize: "180px 180px",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-[7] opacity-[0.07]"
        aria-hidden
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, transparent 0px, transparent 2px, rgba(0,0,0,0.22) 3px)",
        }}
      />

      {/* Color grade + title legibility */}
      <div
        className="pointer-events-none absolute inset-0 z-[6]"
        aria-hidden
        style={{
          background: [
            "radial-gradient(ellipse 70% 55% at 78% 22%, rgba(190,24,48,0.14), transparent 58%)",
            "radial-gradient(ellipse 50% 45% at 18% 82%, rgba(12,18,48,0.24), transparent 55%)",
            "radial-gradient(ellipse 55% 50% at 22% 68%, rgba(8,8,10,0.36), transparent 70%)",
            "linear-gradient(to bottom, rgba(8,8,10,0.34) 0%, rgba(8,8,10,0.04) 36%, rgba(8,8,10,0.12) 58%, rgba(8,8,10,0.66) 100%)",
          ].join(","),
        }}
      />

      {/* Overlay text */}
      <div className="relative z-10 flex h-full flex-col justify-between px-5 pt-24 pb-8 md:px-8 md:pt-28 md:pb-10">
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5, ease: [0.2, 0.6, 0.2, 1] }}
          className="flex items-start justify-between text-ink-100"
        >
          <div className="text-micro tracking-widest2 uppercase text-ink-200">
            01 / INDEX
          </div>
          <div className="text-micro tracking-widest2 uppercase text-ink-200 hidden sm:block">
            {new Date().getFullYear()} — PORTFOLIO
          </div>
        </motion.div>

        <div className="max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.2, 0.6, 0.2, 1] }}
            className="font-serif text-[16vw] leading-[0.9] tracking-tight text-ink-50 sm:text-[12vw] md:text-[9.5vw] lg:text-[8.5rem]"
            style={{ textShadow: "0 2px 28px rgba(0,0,0,0.55)" }}
          >
            {site.brand.split(" ").map((word, i) => (
              <span key={i} className="block">
                {word}
              </span>
            ))}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5, ease: [0.2, 0.6, 0.2, 1] }}
            className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-tiny tracking-widest2 uppercase text-ink-200"
          >
            <span>{site.descriptor}</span>
            <span className="hidden sm:inline text-ink-500">/</span>
            <span>{site.location}</span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex items-end justify-between text-ink-200"
        >
          <Link
            href="/work"
            className="text-tiny tracking-widest2 uppercase link-underline"
          >
            SELECTED WORK ↓
          </Link>
          <div className="text-micro tracking-widest2 uppercase text-ink-300 hidden md:block">
            SCROLL
          </div>
        </motion.div>
      </div>
    </section>
  );
}
