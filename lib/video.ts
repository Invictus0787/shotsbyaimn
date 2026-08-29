/**
 * YouTube / Vimeo → embed URL.
 * Local files (e.g. /videos/interview.mov) are played natively.
 */
export function toEmbed(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtube.com")) {
      const v = u.searchParams.get("v");
      if (v) return `https://www.youtube.com/embed/${v}?rel=0`;
    }
    if (u.hostname === "youtu.be") {
      const id = u.pathname.replace("/", "");
      if (id) return `https://www.youtube.com/embed/${id}?rel=0`;
    }
    if (u.hostname.includes("vimeo.com")) {
      const id = u.pathname.replace("/", "");
      if (id) return `https://player.vimeo.com/video/${id}`;
    }
  } catch {
    // fall through
  }
  return null;
}

export function isFileVideo(url: string): boolean {
  return url.startsWith("/") && /\.(mov|mp4|webm|m4v)$/i.test(url);
}
