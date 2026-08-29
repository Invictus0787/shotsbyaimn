"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import SectionHeading from "./SectionHeading";

export default function FeaturedEditorial() {
  const project = projects.find((p) => p.featured) ?? projects[1];
  if (!project) return null;

  const portrait = project.cover.aspect === "portrait";

  return (
    <section
      id="editorial"
      className="border-t border-white/5 bg-ink-950 px-5 py-24 md:px-8 md:py-32"
      aria-label="Featured editorial project"
    >
      <SectionHeading
        eyebrow="INDEX 02"
        title="EDITORIAL"
        viewAllHref="/editorial"
      />

      <div className="flex flex-col items-start gap-8 md:flex-row md:gap-10 lg:gap-14">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.2, 0.6, 0.2, 1] }}
          className={portrait ? "w-full max-w-[20rem] shrink-0" : "w-full max-w-2xl shrink-0"}
        >
          <div
            className={[
              "relative w-full overflow-hidden bg-ink-800",
              portrait ? "aspect-[3/4]" : "aspect-[3/2]",
            ].join(" ")}
          >
            <Image
              src={project.cover.src}
              alt={project.cover.alt}
              fill
              sizes="(min-width: 768px) 320px, 80vw"
              unoptimized
              className="object-cover"
            />
          </div>
          <div className="mt-3 text-micro tracking-widest2 uppercase text-ink-400">
            STILL / 01
          </div>
        </motion.div>

        <div className="min-w-0 max-w-md md:pt-1">
          <div className="text-micro tracking-widest2 uppercase text-ink-400">
            {(project.medium ?? "EDITORIAL").toUpperCase()}
          </div>
          <h3 className="mt-3 font-serif text-4xl leading-[0.95] text-ink-50 md:text-5xl">
            {project.title}
          </h3>
          {project.event && (
            <div className="mt-2 text-tiny tracking-widest2 uppercase text-ink-300">
              {project.event}
            </div>
          )}

          <dl className="mt-8 grid grid-cols-[7.5rem_1fr] gap-y-2 text-tiny tracking-widest2 uppercase">
            <dt className="text-ink-400">ARTIST</dt>
            <dd className="text-ink-100">{project.artist ?? project.title}</dd>
            <dt className="text-ink-400">TYPE</dt>
            <dd className="text-ink-100">{project.event ?? "Interview"}</dd>
            <dt className="text-ink-400">LOCATION</dt>
            <dd className="text-ink-100">{project.location ?? "—"}</dd>
            <dt className="text-ink-400">YEAR</dt>
            <dd className="text-ink-100">{project.year}</dd>
          </dl>

          {project.description && (
            <p className="mt-8 text-base leading-relaxed text-ink-200">
              {project.description}
            </p>
          )}

          <div className="mt-10 flex flex-wrap items-center gap-6">
            <Link
              href={`/work/${project.slug}`}
              className="text-tiny tracking-widest2 uppercase text-ink-50 link-underline"
            >
              VIEW PROJECT ↗
            </Link>
            {project.video?.url && (
              <Link
                href={`/work/${project.slug}#film`}
                className="text-tiny tracking-widest2 uppercase text-ink-200 link-underline"
              >
                WATCH ↗
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
