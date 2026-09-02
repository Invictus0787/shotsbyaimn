"use client";

import { projects } from "@/data/projects";
import EditorialCard from "./EditorialCard";
import SectionHeading from "./SectionHeading";

export default function FeaturedEditorial() {
  const featured = projects.filter((p) => p.featured);
  const list = featured.length > 0 ? featured : projects.slice(0, 1);
  if (list.length === 0) return null;

  const paired = list.length > 1;
  const sharedLocation = list.every((p) => p.location && p.location === list[0].location)
    ? list[0].location
    : null;
  const sharedYear = list.every((p) => p.year === list[0].year) ? list[0].year : null;

  return (
    <section
      id="editorial"
      className="border-t border-white/5 bg-ink-950 px-5 pb-24 pt-12 md:px-8 md:pb-32 md:pt-14"
      aria-label="Featured editorial projects"
    >
      <SectionHeading
        eyebrow="INDEX 03"
        title="EDITORIAL"
        viewAllHref="/editorial"
      />

      {paired && (
        <div className="mb-10 text-micro tracking-widest2 uppercase text-ink-400">
          {[sharedLocation, sharedYear, "ARTIST INTERVIEWS"].filter(Boolean).join(" · ")}
        </div>
      )}

      <div
        className={
          paired
            ? "grid grid-cols-1 gap-y-16 md:grid-cols-2"
            : "flex flex-col items-start"
        }
      >
        {list.map((project, i) => (
          <div
            key={project.slug}
            className={
              paired && i > 0
                ? "border-t border-white/5 pt-16 md:border-l md:border-t-0 md:pt-0 md:pl-10 lg:pl-16"
                : paired
                  ? "md:pr-10 lg:pr-16"
                  : ""
            }
          >
            <EditorialCard
              project={project}
              index={i}
              tone="dark"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
