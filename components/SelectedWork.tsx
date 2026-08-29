import ProjectCard from "./ProjectCard";
import SectionHeading from "./SectionHeading";
import { projects } from "@/data/projects";

export default function SelectedWork() {
  const list = projects.filter((p) => !p.featured);

  return (
    <section id="work" className="px-5 py-24 md:px-8 md:py-32">
      <SectionHeading
        eyebrow="INDEX 01"
        title="SELECTED WORK"
        viewAllHref="/work"
      />

      <div className="grid grid-cols-1 items-stretch gap-x-6 gap-y-12 sm:grid-cols-2">
        {list.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
