"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/data/projects";

type Props = {
  project: Project;
  index: number;
  /** dark = homepage ink panel; light = bone editorial index */
  tone?: "dark" | "light";
};

export default function EditorialCard({
  project,
  index,
  tone = "dark",
}: Props) {
  const light = tone === "light";
  const num = String(index + 1).padStart(2, "0");
  const portrait = project.cover.aspect === "portrait";

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.2, 0.6, 0.2, 1] }}
      className="flex min-w-0 flex-col"
    >
      <Link href={`/work/${project.slug}`} className="group block">
        <div
          className={[
            "relative w-full max-w-[22rem] overflow-hidden",
            light ? "bg-ink-200" : "bg-ink-800",
            portrait ? "aspect-[3/4]" : "aspect-[3/2]",
          ].join(" ")}
        >
          <Image
            src={project.cover.src}
            alt={project.cover.alt}
            fill
            sizes="(min-width: 768px) 40vw, 92vw"
            unoptimized
            className="object-cover transition-transform duration-[600ms] ease-editorial group-hover:scale-[1.02]"
          />
        </div>
        <div
          className={[
            "mt-3 text-micro tracking-widest2 uppercase",
            light ? "text-ink-500" : "text-ink-400",
          ].join(" ")}
        >
          STILL / {num}
        </div>
      </Link>

      <div className="mt-8 min-w-0">
        <div
          className={[
            "text-micro tracking-widest2 uppercase",
            light ? "text-ink-500" : "text-ink-400",
          ].join(" ")}
        >
          {(project.medium ?? "EDITORIAL").toUpperCase()}
        </div>
        <h3
          className={[
            "mt-3 font-serif text-4xl leading-[0.95] md:text-5xl",
            light ? "text-ink-900" : "text-ink-50",
          ].join(" ")}
        >
          {project.title}
        </h3>
        {project.event && (
          <div
            className={[
              "mt-2 text-tiny tracking-widest2 uppercase",
              light ? "text-ink-600" : "text-ink-300",
            ].join(" ")}
          >
            {project.event}
          </div>
        )}

        <dl className="mt-8 grid grid-cols-[7.5rem_1fr] gap-y-2 text-tiny tracking-widest2 uppercase">
          <dt className={light ? "text-ink-500" : "text-ink-400"}>ARTIST</dt>
          <dd className={light ? "text-ink-900" : "text-ink-100"}>
            {project.artist ?? project.title}
          </dd>
          <dt className={light ? "text-ink-500" : "text-ink-400"}>TYPE</dt>
          <dd className={light ? "text-ink-900" : "text-ink-100"}>
            {project.event ?? "Interview"}
          </dd>
          <dt className={light ? "text-ink-500" : "text-ink-400"}>LOCATION</dt>
          <dd className={light ? "text-ink-900" : "text-ink-100"}>
            {project.location ?? "—"}
          </dd>
          <dt className={light ? "text-ink-500" : "text-ink-400"}>YEAR</dt>
          <dd className={light ? "text-ink-900" : "text-ink-100"}>
            {project.year}
          </dd>
        </dl>

        {project.description && (
          <p
            className={[
              "mt-8 max-w-md text-base leading-relaxed",
              light ? "text-ink-700" : "text-ink-200",
            ].join(" ")}
          >
            {project.description}
          </p>
        )}

        <div className="mt-10 flex flex-wrap items-center gap-6">
          <Link
            href={`/work/${project.slug}`}
            className={[
              "text-tiny tracking-widest2 uppercase link-underline",
              light ? "text-ink-900" : "text-ink-50",
            ].join(" ")}
          >
            VIEW PROJECT ↗
          </Link>
          {project.video?.url && (
            <Link
              href={`/work/${project.slug}#film`}
              className={[
                "text-tiny tracking-widest2 uppercase link-underline",
                light ? "text-ink-700" : "text-ink-200",
              ].join(" ")}
            >
              WATCH ↗
            </Link>
          )}
        </div>
      </div>
    </motion.article>
  );
}
