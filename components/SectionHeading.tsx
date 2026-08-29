import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  eyebrow?: string;
  title: string;
  right?: ReactNode;
  viewAllHref?: string;
  viewAllLabel?: string;
  /** light = bone/paper sections (About) */
  tone?: "dark" | "light";
};

export default function SectionHeading({
  eyebrow,
  title,
  right,
  viewAllHref,
  viewAllLabel = "VIEW ALL",
  tone = "dark",
}: Props) {
  const light = tone === "light";

  return (
    <div
      className={[
        "mb-10 flex items-end justify-between gap-6 border-b pb-4",
        light ? "border-black/10" : "border-white/5",
      ].join(" ")}
    >
      <div>
        {eyebrow && (
          <div
            className={[
              "mb-2 text-micro tracking-widest2 uppercase",
              light ? "text-ink-500" : "text-ink-400",
            ].join(" ")}
          >
            {eyebrow}
          </div>
        )}
        <h2
          className={[
            "font-serif text-3xl leading-none sm:text-4xl md:text-5xl",
            light ? "text-ink-900" : "text-ink-50",
          ].join(" ")}
        >
          {title}
        </h2>
      </div>
      <div className="shrink-0">
        {right ??
          (viewAllHref && (
            <Link
              href={viewAllHref}
              className={[
                "text-tiny tracking-widest2 uppercase",
                light
                  ? "text-ink-700 hover:text-ink-900"
                  : "text-ink-200 hover:text-ink-50",
              ].join(" ")}
            >
              {viewAllLabel} ↗
            </Link>
          ))}
      </div>
    </div>
  );
}
