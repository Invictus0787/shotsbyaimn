import Link from "next/link";
import { site } from "@/data/site";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/5 bg-ink-950 text-ink-300">
      <div className="mx-auto grid grid-cols-1 gap-8 px-5 py-12 md:grid-cols-3 md:px-8">
        <div>
          <div className="text-tiny tracking-widest2 uppercase text-ink-100">
            {site.brand}
          </div>
          <div className="mt-1 text-tiny tracking-widest2 uppercase text-ink-400">
            {site.location}
          </div>
        </div>

        <div className="flex flex-col gap-1 text-tiny tracking-widest2 uppercase">
          <a
            href={site.instagram.url}
            target="_blank"
            rel="noreferrer"
            className="w-fit hover:text-ink-50"
          >
            INSTAGRAM ↗
          </a>
          <a href={`mailto:${site.email}`} className="w-fit hover:text-ink-50">
            EMAIL ↗
          </a>
        </div>

        <div className="flex flex-col gap-1 text-tiny tracking-widest2 uppercase md:items-end">
          <Link href="/work" className="hover:text-ink-50">
            WORK
          </Link>
          <Link href="/contact" className="hover:text-ink-50">
            CONTACT
          </Link>
          <div className="mt-4 text-ink-500">© {year}</div>
        </div>
      </div>
    </footer>
  );
}
