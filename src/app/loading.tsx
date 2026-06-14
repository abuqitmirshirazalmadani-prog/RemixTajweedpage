export default function GlobalLoadingSpace() {
  return (
    <div className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center">
      {/* Absolute top thin gold/lime progress line with pulse */}
      <div className="absolute top-0 left-0 h-[3px] bg-[#C8EB5F] w-full shadow-[0_0_15px_rgba(200,235,95,0.6)] animate-pulse" />
      
      {/* Centered Luxury Brand Signature Loader */}
      <div className="flex flex-col items-center gap-6 select-none pointer-events-none">
        
        {/* Glowing elegant triple golden/lime geometric indicator */}
        <div className="relative w-20 h-20 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-t border-b border-[#C8EB5F]/50 animate-[spin_1.2s_linear_infinite]" />
          <div className="absolute w-14 h-14 rounded-full border-r border-l border-white/20 animate-[spin_2s_linear_infinite_reverse]" />
          <div className="absolute w-7 h-7 rounded-full bg-[#C8EB5F] animate-pulse shadow-[0_0_20px_rgba(200,235,95,0.5)]" />
        </div>

        {/* Minimalist luxury text */}
        <div className="text-center space-y-1.5 mt-2">
          <span className="block font-mono text-[9px] tracking-[0.3em] text-[#C8EB5F] uppercase font-bold animate-pulse">
            Syllabus Loading
          </span>
          <span className="block font-serif text-sm tracking-widest text-neutral-300">
            TAJWEEDPAGE
          </span>
        </div>
      </div>
    </div>
  );
}
