import Link from "next/link";
import { about } from "@/data/about";
import LoopingCover from "./LoopingCover";
import SectionHeading from "./SectionHeading";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="border-t border-white/5 bg-bone px-5 py-24 text-ink-900 md:px-8 md:py-32"
      aria-label="About"
    >
      <SectionHeading
        eyebrow="INDEX 04"
        title="ABOUT"
        tone="light"
      />

      <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="relative aspect-[1080/1584] w-full overflow-hidden bg-ink-100">
            <LoopingCover
              src={about.portrait.src}
              poster={about.portrait.poster}
              alt={about.portrait.alt}
            />
          </div>
          <div className="mt-3 flex items-center justify-between text-micro tracking-widest2 uppercase text-ink-500">
            <span>PORTRAIT</span>
            <span>ATLANTA</span>
          </div>
        </div>

        <div className="md:col-span-7 md:pl-4">
          <h3 className="font-serif text-5xl leading-[0.95] text-ink-900 md:text-6xl">
            {about.name}
          </h3>

          <div className="mt-8 max-w-xl space-y-5 text-base leading-relaxed text-ink-800">
            {about.bio.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="mt-12">
            <div className="text-micro tracking-widest2 uppercase text-ink-500">
              {about.affiliationsLabel}
            </div>
            <ul className="mt-4 grid grid-cols-1 gap-1 sm:grid-cols-2">
              {about.affiliations.map((item) => (
                <li
                  key={item}
                  className="border-t border-black/10 py-2 text-tiny tracking-widest2 uppercase text-ink-800"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-6">
            <Link
              href="/contact"
              className="text-tiny tracking-widest2 uppercase text-ink-900 link-underline"
            >
              WORK WITH ME ↗
            </Link>
            <Link
              href="/work"
              className="text-tiny tracking-widest2 uppercase text-ink-700 link-underline"
            >
              VIEW WORK ↗
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
