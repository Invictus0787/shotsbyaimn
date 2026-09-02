import type { Metadata } from "next";
import { projects } from "@/data/projects";
import EditorialCard from "@/components/EditorialCard";

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
  const sharedLocation = editorial.every(
    (p) => p.location && p.location === editorial[0]?.location,
  )
    ? editorial[0]?.location
    : null;
  const sharedYear = editorial.every((p) => p.year === editorial[0]?.year)
    ? editorial[0]?.year
    : null;
  const sharedKicker =
    editorial.length > 1
      ? [sharedLocation, sharedYear, "ARTIST INTERVIEWS"].filter(Boolean).join(" · ")
      : null;

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
          <>
            {sharedKicker && (
              <div className="mb-10 text-micro tracking-widest2 uppercase text-ink-500">
                {sharedKicker}
              </div>
            )}
            <div className="grid grid-cols-1 gap-y-16 md:grid-cols-2">
              {editorial.map((p, i) => (
                <div
                  key={p.slug}
                  className={
                    i > 0
                      ? "border-t border-black/10 pt-16 md:border-l md:border-t-0 md:pt-0 md:pl-10 lg:pl-16"
                      : "md:pr-10 lg:pr-16"
                  }
                >
                  <EditorialCard
                    project={p}
                    index={i}
                    tone="light"
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
