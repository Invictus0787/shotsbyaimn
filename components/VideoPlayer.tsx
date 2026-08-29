"use client";

type Props = {
  src: string;
  poster?: string;
  title?: string;
};

/**
 * Native player for local files. No autoplay, no audio until the viewer hits play.
 * Original .mov / .mp4 is served as-is (no recompression).
 */
export default function VideoPlayer({ src, poster, title }: Props) {
  return (
    <video
      className="h-full w-full bg-black"
      controls
      playsInline
      preload="metadata"
      poster={poster}
      title={title}
    >
      <source src={src} type="video/quicktime" />
      <source src={src} type="video/mp4" />
    </video>
  );
}
