"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { nav, site } from "@/data/site";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300 ease-editorial",
        scrolled
          ? "bg-ink-950/85 backdrop-blur-md border-b border-white/5"
          : "bg-transparent",
      ].join(" ")}
    >
      <div className="mx-auto flex h-14 items-center justify-between px-5 md:px-8">
        <Link
          href="/"
          className="text-tiny tracking-widest2 font-medium uppercase text-ink-50"
          aria-label={`${site.brand} — home`}
        >
          {site.brand}
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-7">
            {nav.map((item) => (
              <li key={item.href}>
                {item.external ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-tiny tracking-widest2 uppercase text-ink-200 hover:text-ink-50 transition-colors"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    className="text-tiny tracking-widest2 uppercase text-ink-200 hover:text-ink-50 transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile trigger */}
        <button
          className="md:hidden inline-flex h-8 w-8 items-center justify-center"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className="relative block h-3 w-5">
            <span
              className={[
                "absolute left-0 right-0 h-px bg-ink-50 transition-transform duration-300",
                menuOpen ? "top-1.5 rotate-45" : "top-0",
              ].join(" ")}
            />
            <span
              className={[
                "absolute left-0 right-0 h-px bg-ink-50 transition-transform duration-300",
                menuOpen ? "top-1.5 -rotate-45" : "top-3",
              ].join(" ")}
            />
          </span>
        </button>
      </div>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className="md:hidden fixed inset-0 top-14 z-40 bg-ink-950"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.2, 0.6, 0.2, 1] }}
          >
            <nav aria-label="Mobile" className="flex flex-col px-5 pt-6">
              <div className="mb-8 text-micro uppercase tracking-widest2 text-ink-400">
                MENU
              </div>
              <ul className="flex flex-col gap-5">
                {nav.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.05 + i * 0.04,
                      duration: 0.3,
                      ease: [0.2, 0.6, 0.2, 1],
                    }}
                  >
                    {item.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => setMenuOpen(false)}
                        className="font-serif text-4xl leading-tight text-ink-50"
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        className="font-serif text-4xl leading-tight text-ink-50"
                      >
                        {item.label}
                      </Link>
                    )}
                  </motion.li>
                ))}
              </ul>

              <div className="mt-12 border-t border-white/5 pt-6 space-y-2 text-tiny uppercase tracking-widest2 text-ink-300">
                <div>{site.location}</div>
                <a href={`mailto:${site.email}`} className="block hover:text-ink-50">
                  {site.email}
                </a>
                <a
                  href={site.instagram.url}
                  target="_blank"
                  rel="noreferrer"
                  className="block hover:text-ink-50"
                >
                  {site.instagram.handle}
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
