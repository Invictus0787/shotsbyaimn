"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/data/projects";

type Props = {
  project: Project;
  index: number;
  className?: string;
};

/**
 * Equal-width work tiles. Covers are cropped to a shared 3:2 frame
 * so a row of three aligns regardless of source orientation.
 */
export default function ProjectCard({ project, index, className }: Props) {
  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: [0.2, 0.6, 0.2, 1] }}
      className={["group relative flex h-full min-w-0 flex-col", className]
        .filter(Boolean)
        .join(" ")}
    >
      <Link
        href={`/work/${project.slug}`}
        className="flex h-full flex-col"
        aria-label={`${project.title} — ${project.event ?? project.year}`}
      >
        <div className="relative aspect-[3/2] w-full overflow-hidden bg-ink-800">
          <Image
            src={project.cover.src}
            alt={project.cover.alt}
            fill
            sizes="(min-width: 1024px) 33vw, 100vw"
            unoptimized
            className={[
              "object-cover transition-transform duration-[600ms] ease-editorial group-hover:scale-[1.02]",
              project.cover.aspect === "portrait" ? "object-center" : "",
            ].join(" ")}
          />
          <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
          <div className="pointer-events-none absolute left-3 top-3 text-micro tracking-widest2 uppercase text-ink-100/80">
            {num}
          </div>
        </div>

        <div className="mt-4 flex flex-1 items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="text-micro tracking-widest2 uppercase text-ink-400">
              {num} — {project.medium.toUpperCase()}
            </div>
            <h3 className="mt-1 font-serif text-2xl leading-tight text-ink-50">
              {project.title}
            </h3>
            <div className="mt-1 text-tiny tracking-widest2 uppercase text-ink-300">
              {[project.event, project.year].filter(Boolean).join(" · ")}
            </div>
          </div>
          <div className="mt-1 shrink-0 text-tiny tracking-widest2 uppercase text-ink-200 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            VIEW ↗
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
