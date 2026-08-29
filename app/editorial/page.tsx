import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Editorials",
  description:
    "Long-form artist interviews, documentary, and editorial features.",
};

export default function EditorialPage() {
  const editorial = projects.filter(
    (p) =>
      p.medium.includes("Editorial") ||
      p.medium === "Documentary" ||
      p.medium === "Film / Editorial",
  );

  return (
    <div className="bg-bone text-ink-900 min-h-screen pt-28 md:pt-32">
      <div className="px-5 pb-20 md:px-8 md:pb-32">
        <div className="mb-14 flex items-end justify-between border-b border-black/10 pb-4">
          <div>
            <div className="text-micro tracking-widest2 uppercase text-ink-500">
              INDEX — WRITING · INTERVIEWS · DOCUMENTARY
            </div>
            <h1 className="mt-2 font-serif text-5xl leading-none text-ink-900 md:text-7xl">
              EDITORIALS
            </h1>
          </div>
          <div className="text-micro tracking-widest2 uppercase text-ink-500">
            {String(editorial.length).padStart(2, "0")} PIECES
          </div>
        </div>

        {editorial.length === 0 ? (
          <p className="max-w-xl text-lg text-ink-700">
            Editorial features and long-form interviews will be published here.
          </p>
        ) : (
          <ul className="divide-y divide-black/10">
            {editorial.map((p, i) => {
              const portrait = p.cover.aspect === "portrait";
              return (
                <li key={p.slug}>
                  <Link
                    href={`/work/${p.slug}`}
                    className="group grid grid-cols-12 items-center gap-x-4 gap-y-6 py-10 md:py-14"
                  >
                    <div className="col-span-2 text-micro tracking-widest2 uppercase text-ink-500">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="col-span-6 md:col-span-5">
                      <h2 className="font-serif text-3xl leading-tight text-ink-900 md:text-4xl">
                        {p.title}
                      </h2>
                      <div className="mt-1 text-tiny tracking-widest2 uppercase text-ink-600">
                        {[p.artist, p.event, p.year].filter(Boolean).join(" · ")}
                      </div>
                    </div>
                    <div className="col-span-4 justify-self-end text-tiny tracking-widest2 uppercase text-ink-700 md:order-last md:col-span-1">
                      READ ↗
                    </div>
                    <div className="col-span-12 md:col-span-4">
                      <div
                        className={[
                          "relative w-full overflow-hidden bg-ink-200",
                          portrait ? "aspect-[3/4]" : "aspect-[3/2]",
                        ].join(" ")}
                      >
                        <Image
                          src={p.cover.src}
                          alt={p.cover.alt}
                          fill
                          sizes="(min-width: 768px) 33vw, 92vw"
                          unoptimized
                          className="object-cover transition-transform duration-500 ease-editorial group-hover:scale-[1.02]"
                        />
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
