"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import Lightbox, { type LightboxFrame } from "./Lightbox";
import type { ProjectImage } from "@/data/projects";

/**
 * Renders a curated project gallery.
 *
 * editorial — mixed full / pair / center / grid layouts
 * plates    — compact 2–3 column previews (keeps 1024px files sharp)
 *
 * Optional `prependFrame` is added to the lightbox at index 0
 * (but NOT rendered in the grid).
 */
export default function ProjectGallery({
  images,
  prependFrame,
  layout = "editorial",
}: {
  images: ProjectImage[];
  prependFrame?: LightboxFrame;
  layout?: "editorial" | "plates";
}) {
  const [idx, setIdx] = useState<number | null>(null);

  const galleryFrames: LightboxFrame[] = images.map((img) => ({
    src: img.src,
    alt: img.alt,
    caption: img.caption,
    meta: img.alt,
  }));
  const frames: LightboxFrame[] = prependFrame
    ? [prependFrame, ...galleryFrames]
    : galleryFrames;
  const offset = prependFrame ? 1 : 0;
  const openAt = (gridIndex: number) => setIdx(gridIndex + offset);

  return (
    <>
      {layout === "plates" ? (
        <PlatesGrid images={images} onOpen={openAt} />
      ) : (
        <EditorialRows images={images} onOpen={openAt} />
      )}
      <Lightbox
        frames={frames}
        index={idx}
        onClose={() => setIdx(null)}
        onIndexChange={setIdx}
      />
    </>
  );
}

function PlatesGrid({
  images,
  onOpen,
}: {
  images: ProjectImage[];
  onOpen: (i: number) => void;
}) {
  return (
    <div className="mx-auto grid max-w-4xl grid-cols-2 gap-2 sm:gap-3 md:grid-cols-3">
      {images.map((image, i) => {
        const portrait = image.aspect === "portrait";
        return (
          <FrameBlock
            key={image.src + i}
            image={image}
            index={i}
            onOpen={onOpen}
            forceRatio
            ratioClass={portrait ? "aspect-[2/3]" : "aspect-[3/2]"}
            sizes="(min-width: 768px) 280px, 50vw"
          />
        );
      })}
    </div>
  );
}

function EditorialRows({
  images,
  onOpen,
}: {
  images: ProjectImage[];
  onOpen: (i: number) => void;
}) {
  const rows: React.ReactNode[] = [];
  let i = 0;
  while (i < images.length) {
    const img = images[i];
    const layout = img.layout ?? "full";

    if (layout === "pair-left" && images[i + 1]?.layout === "pair-right") {
      const next = images[i + 1];
      rows.push(
        <div
          key={`pair-${i}`}
          className="mx-auto grid max-w-3xl grid-cols-1 gap-4 md:grid-cols-12"
        >
          <FrameBlock
            image={img}
            index={i}
            onOpen={onOpen}
            className="md:col-span-7"
            sizes="(min-width: 768px) 380px, 100vw"
          />
          <FrameBlock
            image={next}
            index={i + 1}
            onOpen={onOpen}
            className="md:col-span-5 md:mt-10"
            sizes="(min-width: 768px) 280px, 100vw"
          />
        </div>,
      );
      i += 2;
      continue;
    }

    if (layout === "grid") {
      const group: { img: ProjectImage; idx: number }[] = [];
      while (i < images.length && images[i].layout === "grid") {
        group.push({ img: images[i], idx: i });
        i++;
      }
      rows.push(
        <div
          key={`grid-${i}`}
          className="mx-auto grid max-w-3xl grid-cols-2 gap-1 md:grid-cols-4"
        >
          {group.map(({ img: g, idx: gi }) => (
            <FrameBlock
              key={gi}
              image={g}
              index={gi}
              onOpen={onOpen}
              forceRatio
              ratioClass="aspect-[3/2]"
              sizes="(min-width: 768px) 180px, 50vw"
            />
          ))}
        </div>,
      );
      continue;
    }

    if (layout === "center") {
      rows.push(
        <div key={`center-${i}`} className="mx-auto w-full max-w-[220px]">
          <FrameBlock
            image={img}
            index={i}
            onOpen={onOpen}
            sizes="220px"
          />
        </div>,
      );
      i++;
      continue;
    }

    rows.push(
      <div key={`full-${i}`} className="mx-auto max-w-xl">
        <FrameBlock
          image={img}
          index={i}
          onOpen={onOpen}
          sizes="(min-width: 640px) 576px, 100vw"
        />
      </div>,
    );
    i++;
  }

  return <div className="space-y-10 md:space-y-14">{rows}</div>;
}

function FrameBlock({
  image,
  index,
  onOpen,
  className,
  forceRatio,
  ratioClass,
  sizes = "(min-width: 768px) 280px, 50vw",
}: {
  image: ProjectImage;
  index: number;
  onOpen: (i: number) => void;
  className?: string;
  forceRatio?: boolean;
  ratioClass?: string;
  sizes?: string;
}) {
  const aspect = forceRatio
    ? ratioClass ?? ""
    : image.aspect === "portrait"
    ? "aspect-[2/3]"
    : image.aspect === "square"
    ? "aspect-square"
    : "aspect-[3/2]";

  return (
    <motion.figure
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.4, ease: [0.2, 0.6, 0.2, 1] }}
      className={className}
    >
      <button
        type="button"
        onClick={() => onOpen(index)}
        className={[
          "group relative block w-full cursor-zoom-in overflow-hidden bg-ink-800",
          aspect,
        ].join(" ")}
        aria-label={`Open ${image.alt}`}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          unoptimized
          className="object-cover transition-transform duration-[500ms] ease-editorial group-hover:scale-[1.02]"
        />
        <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/15" />
      </button>
          {image.caption !== undefined && (
            <figcaption className="mt-2 flex items-center justify-between text-micro tracking-widest2 uppercase text-ink-400">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <span>{image.caption || "\u2014"}</span>
            </figcaption>
          )}
    </motion.figure>
  );
}
