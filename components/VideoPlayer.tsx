"use client";

type Props = {
  src: string;
  poster?: string;
  title?: string;
};

function mimeFor(src: string): string | undefined {
  const lower = src.split("?")[0].toLowerCase();
  if (lower.endsWith(".mp4") || lower.endsWith(".m4v")) return "video/mp4";
  if (lower.endsWith(".webm")) return "video/webm";
  return undefined;
}

/**
 * Native player for local files. No autoplay, no audio until the viewer hits play.
 */
export default function VideoPlayer({ src, poster, title }: Props) {
  const type = mimeFor(src);
  return (
    <video
      className="absolute inset-0 h-full w-full bg-black"
      controls
      playsInline
      preload="metadata"
      poster={poster}
      title={title}
    >
      <source src={src} {...(type ? { type } : {})} />
    </video>
  );
}
