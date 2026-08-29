import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ClickableHero from "@/components/ClickableHero";
import ProjectGallery from "@/components/ProjectGallery";
import type { LightboxFrame } from "@/components/Lightbox";
import {
  getAllProjectSlugs,
  getProjectBySlug,
  projects,
} from "@/data/projects";
import { isFileVideo, toEmbed } from "@/lib/video";
import VideoPlayer from "@/components/VideoPlayer";

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const project = getProjectBySlug(params.slug);
  if (!project) return { title: "Not found" };
  return {
    title: `${project.title} — ${project.event ?? project.year}`,
    description:
      project.description ??
      `${project.title} by Aymane Rouchdi — ${project.medium}.`,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [{ url: project.cover.src }],
    },
  };
}

export default function ProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = getProjectBySlug(params.slug);
  if (!project) return notFound();

  const currentIdx = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(currentIdx + 1) % projects.length];

  // Hero uses the photo's native aspect (3:2 for landscape) so nothing is
  // cropped — the same frame the viewer sees when they click into the
  // lightbox.
  const heroAspect =
    project.cover.aspect === "portrait"
      ? project.medium === "Portraiture" || project.medium === "Photography"
        ? "aspect-[2/3]"
        : "aspect-[3/4]"
      : "aspect-[3/2]";

  // Build the shared lightbox frame array — cover first, then gallery.
  // Both ClickableHero and ProjectGallery use this same set so the viewer
  // can browse the entire project as one continuous sequence.
  const coverFrame: LightboxFrame = {
    src: project.cover.src,
    alt: project.cover.alt,
    caption: project.cover.caption,
    meta: `${project.title} — ${project.event ?? project.year}`,
  };
  const galleryFrames: LightboxFrame[] = (project.images ?? []).map((img) => ({
    src: img.src,
    alt: img.alt,
    caption: img.caption,
    meta: img.alt,
  }));
  const coverInGallery = galleryFrames.some((f) => f.src === coverFrame.src);
  const heroGallery = galleryFrames.filter((f) => f.src !== coverFrame.src);

  return (
    <article className="pb-24">
      <header className="mx-auto max-w-4xl px-5 pt-28 md:px-8 md:pt-32">
        <div className="mb-6 flex items-center gap-4 text-micro tracking-widest2 uppercase text-ink-400">
          <Link href="/work" className="hover:text-ink-50">
            ← WORK
          </Link>
          <span className="h-px w-8 bg-white/10" />
          <span>{project.medium.toUpperCase()}</span>
        </div>

        <ClickableHero
          cover={coverFrame}
          galleryFrames={heroGallery}
          aspectClass={heroAspect}
        />
      </header>

      <section className="mx-auto max-w-4xl px-5 pt-10 md:px-8 md:pt-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          <div className="md:col-span-7">
            <h1 className="font-serif text-5xl leading-[0.9] text-ink-50 md:text-6xl">
              {project.title}
            </h1>
            {project.artist && project.artist !== project.title && (
              <div className="mt-3 font-serif text-xl text-ink-300">
                {project.artist}
              </div>
            )}
          </div>

          <dl className="md:col-span-5 grid grid-cols-[110px_1fr] gap-y-2 self-end text-tiny tracking-widest2 uppercase">
            {project.event && (
              <>
                <dt className="text-ink-500">EVENT</dt>
                <dd className="text-ink-100">{project.event}</dd>
              </>
            )}
            {project.location && (
              <>
                <dt className="text-ink-500">LOCATION</dt>
                <dd className="text-ink-100">{project.location}</dd>
              </>
            )}
            <dt className="text-ink-500">YEAR</dt>
            <dd className="text-ink-100">{project.year}</dd>
            <dt className="text-ink-500">MEDIUM</dt>
            <dd className="text-ink-100">{project.medium}</dd>
          </dl>
        </div>

        {project.description && (
          <p className="mt-8 max-w-xl text-base leading-relaxed text-ink-200">
            {project.description}
          </p>
        )}

        <div className="mt-10 h-px w-full bg-white/5" />
      </section>

      {/* Video (if any) */}
      {project.video?.url && (isFileVideo(project.video.url) || toEmbed(project.video.url)) && (
        <section id="film" className="mx-auto max-w-4xl px-5 pt-16 md:px-8">
          <div className="mb-4 text-micro tracking-widest2 uppercase text-ink-400">
            FILM
          </div>
          <div className="relative aspect-video w-full overflow-hidden bg-black">
            {isFileVideo(project.video.url) ? (
              <VideoPlayer
                src={project.video.url}
                poster={project.video.thumbnail ?? project.cover.src}
                title={project.title}
              />
            ) : (
              <iframe
                src={toEmbed(project.video.url) ?? undefined}
                title={project.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            )}
          </div>
        </section>
      )}

      {/* Gallery */}
      {project.images && project.images.length > 0 && (
        <section className="px-5 pt-12 md:px-8 md:pt-14">
          <div className="mx-auto mb-6 flex max-w-4xl items-center justify-between text-micro tracking-widest2 uppercase text-ink-400">
            <span>PLATES</span>
            <span>
              {String(project.images.length).padStart(2, "0")} FRAMES
            </span>
          </div>
          <ProjectGallery
            images={project.images}
            prependFrame={coverInGallery ? undefined : coverFrame}
            layout={project.galleryLayout ?? "editorial"}
          />
        </section>
      )}

      {/* Credits */}
      {project.credits && project.credits.length > 0 && (
        <section className="mx-auto max-w-4xl px-5 pt-14 md:px-8 md:pt-16">
          <div className="mb-6 text-micro tracking-widest2 uppercase text-ink-400">
            CREDITS
          </div>
          <dl className="grid grid-cols-[140px_1fr] gap-y-2 text-tiny tracking-widest2 uppercase">
            {project.credits.map((c) => (
              <div key={c.role} className="contents">
                <dt className="text-ink-500">{c.role.toUpperCase()}</dt>
                <dd className="text-ink-100">{c.name}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      <section className="mx-auto mt-16 max-w-4xl border-t border-white/5 px-5 pt-8 md:px-8">
        <Link
          href={`/work/${next.slug}`}
          className="group flex items-center justify-between gap-6"
        >
          <div>
            <div className="text-micro tracking-widest2 uppercase text-ink-400">
              NEXT PROJECT
            </div>
            <div className="mt-2 font-serif text-3xl leading-tight text-ink-50 md:text-4xl">
              {next.title}
            </div>
            <div className="mt-1 text-tiny tracking-widest2 uppercase text-ink-300">
              {[next.event, next.year].filter(Boolean).join(" · ")}
            </div>
          </div>
          <div className="text-tiny tracking-widest2 uppercase text-ink-200 transition-transform duration-300 group-hover:translate-x-1">
            →
          </div>
        </Link>
      </section>
    </article>
  );
}
