import ProjectCard from "./ProjectCard";
import SectionHeading from "./SectionHeading";
import { getWorkProjects } from "@/data/projects";

export default function SelectedWork() {
  const list = getWorkProjects();

  return (
    <section id="work" className="px-5 pt-24 pb-12 md:px-8 md:pt-32 md:pb-14">
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
