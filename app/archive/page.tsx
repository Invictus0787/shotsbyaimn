import type { Metadata } from "next";
import ArchiveGrid from "@/components/ArchiveGrid";

export const metadata: Metadata = {
  title: "Archive",
  description: "Photo archive — contact-sheet style selected frames.",
};

export default function ArchivePage() {
  return (
    <div className="pt-24 md:pt-28">
      <div className="px-5 md:px-8">
        <div className="mb-4 text-micro tracking-widest2 uppercase text-ink-400">
          INDEX — CONTACT SHEET
        </div>
        <h1 className="font-serif text-5xl leading-none text-ink-50 md:text-7xl">
          ARCHIVE
        </h1>
        <p className="mt-6 max-w-xl text-tiny tracking-widest2 uppercase text-ink-300">
          SELECTED FRAMES · ONGOING
        </p>
      </div>
      <ArchiveGrid />
    </div>
  );
}
