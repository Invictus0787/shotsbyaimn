import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-start justify-center px-5 pt-28 md:px-8">
      <div className="text-micro tracking-widest2 uppercase text-ink-400">
        ERROR — 404
      </div>
      <h1 className="mt-4 font-serif text-6xl leading-none text-ink-50 md:text-8xl">
        NOT FOUND
      </h1>
      <p className="mt-6 max-w-md text-tiny tracking-widest2 uppercase text-ink-300">
        THE PAGE YOU REQUESTED DOES NOT EXIST.
      </p>
      <Link
        href="/"
        className="mt-8 text-tiny tracking-widest2 uppercase text-ink-100 link-underline"
      >
        RETURN HOME ↗
      </Link>
    </div>
  );
}
