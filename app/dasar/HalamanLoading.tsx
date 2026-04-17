import "./HalamanLoading.css";

interface Props {
  devMode?: boolean;
}

export default function HalamanLoading({ devMode = false }: Props) {
  return (
    <div
      className="relative flex items-center justify-center overflow-hidden font-mono"
      style={{ minHeight: devMode ? "calc(100vh - 1.75rem)" : "100vh" }}
    >
      {/* Grid background */}
      <div className="absolute inset-0 grid grid-cols-12 grid-rows-8 pointer-events-none animate-bounce">
        {Array.from({ length: 96 }).map((_, i) => (
          <div key={i} className="border border-neutral-300/10" />
        ))}
      </div>

      {/* Scanline */}
      <div className="absolute -left-10 -right-10 h-px bg-linear-to-r -rotate-6 from-transparent via-sky-400/40 to-transparent animate-[scan_1.5s_linear_infinite] pointer-events-none" />
      <div className="absolute -left-10 -right-10 h-px bg-linear-to-r rotate-45 from-transparent via-amber-400/20 to-transparent animate-[scan2_3s_linear_infinite] pointer-events-none" />

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Morphing ring group */}
        <div className="relative w-32 h-32">
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 border-r-blue-500 animate-[morph-spin_2.4s_linear_infinite]" />
          {/* Middle ring */}
          <div className="absolute inset-5 rounded-full border-2 border-transparent border-b-violet-700 border-l-violet-700 animate-[morph-spin_1.8s_linear_infinite_reverse]" />
          {/* Inner ring */}
          <div className="absolute inset-10 rounded-full border-2 border-transparent border-t-orange-400 border-b-orange-400 animate-[morph-spin_2.4s_linear_infinite]" />

          {/* Core dot */}
          <div className="absolute inset-12 rounded-full bg-linear-to-br from-teal-500 via-sky-400 to-teal-500 animate-[pulse-dot_1s_ease-in-out_infinite]" />
        </div>

        {/* Wave dots */}
        <div className="flex gap-3 items-end mt-16">
          {[
            "bg-orange-600",
            "bg-amber-400",
            "bg-pink-300",
            "bg-purple-400",
            "bg-blue-600",
            "bg-teal-400",
          ].map((color, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${color} animate-[wave-dot_1.4s_ease-in-out_infinite]`}
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>

        {/* Label */}
        <div>
          <p
            className={`text-[13px] font-bold tracking-[0.22em] uppercase text-black/60 text-center mb-3 transition-opacity duration-400`}
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Loading
          </p>
        </div>
      </div>
    </div>
  );
}
