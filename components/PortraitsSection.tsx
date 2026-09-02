"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Lightbox, { type LightboxFrame } from "./Lightbox";
import SectionHeading from "./SectionHeading";
import { portraits } from "@/data/portraits";

type Props = {
  /** Homepage strip vs the dedicated /portraits page */
  standalone?: boolean;
};

export default function PortraitsSection({ standalone = false }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{
    down: boolean;
    startX: number;
    startScroll: number;
    moved: boolean;
  }>({ down: false, startX: 0, startScroll: 0, moved: false });
  const [idx, setIdx] = useState<number | null>(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      const max = el.scrollWidth - el.clientWidth;
      const atStart = el.scrollLeft <= 0;
      const atEnd = el.scrollLeft >= max - 1;
      if ((e.deltaY < 0 && atStart) || (e.deltaY > 0 && atEnd)) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const frames: LightboxFrame[] = portraits.map((p) => ({
    src: p.src,
    alt: p.alt,
    caption: p.caption,
    meta: p.caption,
  }));

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Touch keeps native momentum scrolling. Mouse-only custom drag.
    if (e.pointerType !== "mouse") return;
    const el = trackRef.current;
    if (!el) return;
    drag.current = {
      down: true,
      startX: e.clientX,
      startScroll: el.scrollLeft,
      moved: false,
    };
    el.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = trackRef.current;
    if (!el || !drag.current.down) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 6) drag.current.moved = true;
    el.scrollLeft = drag.current.startScroll - dx;
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = trackRef.current;
    if (el && drag.current.down) {
      try {
        el.releasePointerCapture(e.pointerId);
      } catch {
        /* already released */
      }
    }
    drag.current.down = false;
  };

  return (
    <section
      id="portraits"
      className={[
        "border-t border-white/5",
        standalone ? "px-0 pb-24 pt-28 md:pb-32 md:pt-32" : "px-0 py-12 md:py-14",
      ].join(" ")}
      aria-label="Portraits"
    >
      <div className="px-5 md:px-8">
        <SectionHeading
          eyebrow={standalone ? "INDEX — PORTRAITURE" : "INDEX 02"}
          title="PORTRAITS"
          viewAllHref={standalone ? undefined : "/portraits"}
        />
        <p className="mb-6 max-w-xl text-tiny tracking-widest2 uppercase text-ink-300">
          ARTISTS · PRODUCERS · COLLABORATORS · ONGOING
        </p>
      </div>

      <div
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className="portraits-track cursor-grab overflow-x-auto overflow-y-hidden pb-2 select-none snap-x snap-proximity scroll-pl-[max(1.25rem,env(safe-area-inset-left))] scroll-pr-[max(1.25rem,env(safe-area-inset-right))] active:cursor-grabbing md:scroll-pl-8 md:scroll-pr-8"
      >
        <div className="flex w-max gap-4 pl-[max(1.25rem,env(safe-area-inset-left))] pr-[max(1.25rem,env(safe-area-inset-right))] md:gap-5 md:px-8">
        {portraits.map((portrait, i) => (
          <figure
            key={portrait.src}
            className="w-[min(72vw,20rem)] shrink-0 snap-start sm:w-[min(48vw,22rem)]"
          >
            <button
              type="button"
              onClick={() => {
                if (drag.current.moved) return;
                setIdx(i);
              }}
              className="group relative block aspect-[2/3] w-full touch-manipulation overflow-hidden bg-ink-800 text-left"
              aria-label={`View portrait of ${portrait.caption}`}
            >
              <Image
                src={portrait.src}
                alt={portrait.alt}
                fill
                sizes="(min-width: 768px) 352px, 72vw"
                unoptimized
                draggable={false}
                className="object-cover transition-transform duration-[600ms] ease-editorial group-hover:scale-[1.02]"
              />
            </button>
            <figcaption className="mt-4 flex items-baseline justify-between gap-4">
              <div>
                <div className="text-micro tracking-widest2 uppercase text-ink-400">
                  {String(i + 1).padStart(2, "0")} — PORTRAIT
                </div>
                <div className="mt-1 font-serif text-2xl leading-tight uppercase text-ink-50">
                  {portrait.caption}
                </div>
              </div>
            </figcaption>
          </figure>
        ))}
        </div>
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
