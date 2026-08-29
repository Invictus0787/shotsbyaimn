/**
 * Viewfinder / lighting-plot overlay. Decorative only — sits behind type.
 */
export default function HeroHud() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-[8] text-ink-50"
      aria-hidden
    >
      {/* Encapsulating frame */}
      <div className="absolute inset-3 border border-white/20 md:inset-5" />
      <div className="absolute inset-[18px] border border-white/[0.08] md:inset-[26px]" />

      {/* Corner brackets */}
      <span className="absolute left-3 top-3 h-7 w-7 md:left-5 md:top-5 md:h-9 md:w-9">
        <span className="absolute left-0 top-0 h-px w-full bg-white/75" />
        <span className="absolute left-0 top-0 h-full w-px bg-white/75" />
      </span>
      <span className="absolute right-3 top-3 h-7 w-7 md:right-5 md:top-5 md:h-9 md:w-9">
        <span className="absolute right-0 top-0 h-px w-full bg-white/75" />
        <span className="absolute right-0 top-0 h-full w-px bg-white/75" />
      </span>
      <span className="absolute bottom-3 left-3 h-7 w-7 md:bottom-5 md:left-5 md:h-9 md:w-9">
        <span className="absolute bottom-0 left-0 h-px w-full bg-white/75" />
        <span className="absolute bottom-0 left-0 h-full w-px bg-white/75" />
      </span>
      <span className="absolute bottom-3 right-3 h-7 w-7 md:bottom-5 md:right-5 md:h-9 md:w-9">
        <span className="absolute bottom-0 right-0 h-px w-full bg-white/75" />
        <span className="absolute bottom-0 right-0 h-full w-px bg-white/75" />
      </span>

      {/* Optical grid + reticles */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern
            id="hero-grid"
            width="8.333"
            height="12.5"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 8.333 0 L 0 0 0 12.5"
              fill="none"
              stroke="rgba(234,230,223,0.07)"
              strokeWidth="0.15"
              vectorEffect="non-scaling-stroke"
            />
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#hero-grid)" />

        {/* Rule of thirds */}
        <line
          x1="33.33"
          y1="6"
          x2="33.33"
          y2="94"
          stroke="rgba(234,230,223,0.12)"
          strokeWidth="0.12"
          vectorEffect="non-scaling-stroke"
        />
        <line
          x1="66.66"
          y1="6"
          x2="66.66"
          y2="94"
          stroke="rgba(234,230,223,0.12)"
          strokeWidth="0.12"
          vectorEffect="non-scaling-stroke"
        />
        <line
          x1="6"
          y1="33.33"
          x2="94"
          y2="33.33"
          stroke="rgba(234,230,223,0.1)"
          strokeWidth="0.12"
          vectorEffect="non-scaling-stroke"
        />
        <line
          x1="6"
          y1="66.66"
          x2="94"
          y2="66.66"
          stroke="rgba(234,230,223,0.1)"
          strokeWidth="0.12"
          vectorEffect="non-scaling-stroke"
        />

        {/* Center crosshair */}
        <line
          x1="48.5"
          y1="50"
          x2="51.5"
          y2="50"
          stroke="rgba(234,230,223,0.45)"
          strokeWidth="0.18"
          vectorEffect="non-scaling-stroke"
        />
        <line
          x1="50"
          y1="47.8"
          x2="50"
          y2="52.2"
          stroke="rgba(234,230,223,0.45)"
          strokeWidth="0.18"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* Circular rangefinder — offset so it doesn't sit on the title */}
      <div className="hero-reticle absolute right-[12%] top-[28%] hidden h-[min(42vw,380px)] w-[min(42vw,380px)] md:block">
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <circle
            cx="50"
            cy="50"
            r="46"
            fill="none"
            stroke="rgba(234,230,223,0.22)"
            strokeWidth="0.4"
          />
          <circle
            cx="50"
            cy="50"
            r="32"
            fill="none"
            stroke="rgba(234,230,223,0.12)"
            strokeWidth="0.35"
            strokeDasharray="1.2 2.4"
          />
          <circle
            cx="50"
            cy="50"
            r="18"
            fill="none"
            stroke="rgba(234,230,223,0.18)"
            strokeWidth="0.3"
          />
          {Array.from({ length: 24 }).map((_, i) => {
            const a = (i / 24) * Math.PI * 2;
            const inner = i % 6 === 0 ? 42 : 44.5;
            return (
              <line
                key={i}
                x1={50 + Math.cos(a) * inner}
                y1={50 + Math.sin(a) * inner}
                x2={50 + Math.cos(a) * 46}
                y2={50 + Math.sin(a) * 46}
                stroke="rgba(234,230,223,0.28)"
                strokeWidth={i % 6 === 0 ? 0.5 : 0.3}
              />
            );
          })}
        </svg>
      </div>

      {/* Scan bar */}
      <div className="hero-scan absolute left-5 right-5 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent md:left-8 md:right-8" />

      {/* Edge ticks */}
      <div className="absolute left-3 right-3 top-3 flex justify-between md:left-5 md:right-5 md:top-5">
        {Array.from({ length: 17 }).map((_, i) => (
          <span
            key={i}
            className={[
              "w-px bg-white/35",
              i % 4 === 0 ? "h-2.5" : "h-1.5",
            ].join(" ")}
          />
        ))}
      </div>
      <div className="absolute bottom-3 left-3 top-3 flex flex-col justify-between md:bottom-5 md:left-5 md:top-5">
        {Array.from({ length: 13 }).map((_, i) => (
          <span
            key={i}
            className={[
              "h-px bg-white/35",
              i % 4 === 0 ? "w-2.5" : "w-1.5",
            ].join(" ")}
          />
        ))}
      </div>

      {/* HUD readouts — below the PORTFOLIO line, clear of the title */}
      <div className="absolute right-6 top-40 hidden text-right md:block md:right-10 md:top-44">
        <div className="flex items-center justify-end gap-2 text-micro tracking-widest2 uppercase text-ink-100/70">
          <span className="hero-pulse inline-block h-1.5 w-1.5 bg-red-500" />
          REC
        </div>
        <div className="mt-3 space-y-1 text-micro tracking-widest2 uppercase text-ink-100/45">
          <div>32 FRAMES</div>
          <div>COLLAGE / CYCLE</div>
          <div>F/1.8 · ISO AUTO</div>
        </div>
      </div>

      <div className="absolute bottom-20 right-6 hidden text-right md:block md:bottom-24 md:right-10">
        <div className="space-y-1 text-micro tracking-widest2 uppercase text-ink-100/40">
          <div>33.7490° N</div>
          <div>84.3880° W</div>
          <div>ATL · 2026</div>
        </div>
      </div>

    </div>
  );
}
