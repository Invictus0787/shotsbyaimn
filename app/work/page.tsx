import type { Metadata } from "next";
import ProjectCard from "@/components/ProjectCard";
import { getWorkProjects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected photography, film, and editorial work by Aymane Rouchdi.",
};

export default function WorkPage() {
  const list = getWorkProjects();

  return (
    <div className="px-5 pt-28 pb-24 md:px-8 md:pt-32 md:pb-32">
      <div className="mb-14 flex items-end justify-between border-b border-white/5 pb-4">
        <div>
          <div className="text-micro tracking-widest2 uppercase text-ink-400">
            INDEX — ALL
          </div>
          <h1 className="mt-2 font-serif text-5xl leading-none text-ink-50 md:text-7xl">
            WORK
          </h1>
        </div>
        <div className="text-micro tracking-widest2 uppercase text-ink-400">
          {String(list.length).padStart(2, "0")} PROJECTS
        </div>
      </div>

      <div className="grid grid-cols-1 items-stretch gap-x-6 gap-y-12 sm:grid-cols-2">
        {list.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </div>
    </div>
  );
}
