"use client";

import React, { useState, useEffect, useRef } from "react";
import { Check, ArrowRight } from "lucide-react";

// --- Custom slides data with Quran / Tajweed target audiences ---
const audienceSlides = [
  {
    title: "Beginners & New Seekers",
    subTitle: "START FROM ZERO",
    description: "Welcome to absolute fundamental foundations. Perfect for those who cannot read Arabic yet. Learn individual letters, heavy/light vocal attributes, and build a beautiful, pure recitation from the ground up.",
    image: "https://i.postimg.cc/T2sR66MH/pexels-beyza-yalcin-153182170-34548784.jpg",
    bgColor: "#030406",
    accentColor: "#C8EB5F",
    bullets: [
      "No prior Arabic language required",
      "Noorani Qaida foundation mapping",
      "Individual physical letter phonetics"
    ]
  },
  {
    title: "Improving Grown-Ups",
    subTitle: "ELEVATE FLUENCY",
    description: "Tailored for adults and college students with busy routines. Correct silent letters, eliminate common recitation mistakes, master stopping indicators, and gain absolute verbal confidence in public prayer circles.",
    image: "https://i.postimg.cc/7L4HWnvF/pexels-reojuve-29182968.jpg",
    bgColor: "#090a0d",
    accentColor: "#f39c12",
    bullets: [
      "Flexible, bespoke schedule options",
      "Targeted adult-education methodology",
      "Confidence-boosting live reviews"
    ]
  },
  {
    title: "Phonetic Struggles",
    subTitle: "CORRECT HEAVY LETTERS",
    description: "Struggling to make differences between similar sounding letters (e.g., Taa vs Toa, Seen vs Saad vs Tha)? Get precise visual coaching on jaw articulation and exact tongue placement rules.",
    image: "https://i.postimg.cc/hjptxzYS/pexels-beytlik-7654907.jpg",
    bgColor: "#050608",
    accentColor: "#2ecc71",
    bullets: [
      "Anatomical tongue-map illustrations",
      "Point-by-point muscle-memory drills",
      "Accent mitigation support"
    ]
  },
  {
    title: "Islamic Reverts",
    subTitle: "FAITH & FLOW SANCTUARY",
    description: "Offering a warm, patient, and deeply understanding environment for new Muslims. Overcome pronunciation anxieties and learn the correct flow of the classical Arabic Quranic text gracefully.",
    image: "https://i.postimg.cc/C14msmhM/pexels-bassam-ibram-764485-5251996.jpg",
    bgColor: "#0c0d10",
    accentColor: "#3498db",
    bullets: [
      "Spiritual supportive mentoring",
      "Paced phonetic progression",
      "Dua and short Surah pronunciation focus"
    ]
  },
  {
    title: "Kids & Young Hearts",
    subTitle: "LIFELONG LEGACY",
    description: "Ideal for parents wanting to build early, flawless Quran connections for children. Build correct recitation habits and love for the Book of Allah right from their earliest developmental years.",
    image: "https://i.postimg.cc/nh4ZB9jJ/pexels-derya-59965512-36228547.jpg",
    bgColor: "#06070a",
    accentColor: "#9c27b0",
    bullets: [
      "Highly engaging, positive teaching style",
      "Interactive multi-media reward structure",
      "Weekly diagnostic progress reports"
    ]
  }
];

export function WhoCanJoinShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // --- Check screen size on client to avoid hydration mismatch ---
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // --- Scroll Handler for Window Scroll on Desktop ---
  useEffect(() => {
    if (!isDesktop) return;

    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const totalHeight = rect.height - window.innerHeight;
      
      // Calculate scroll progress through this specific container
      const scrolled = -rect.top;
      
      if (scrolled >= 0 && scrolled <= totalHeight) {
        const step = totalHeight / audienceSlides.length;
        const currentActiveIndex = Math.min(
          audienceSlides.length - 1,
          Math.max(0, Math.floor(scrolled / step))
        );
        setActiveIndex(currentActiveIndex);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDesktop]);

  const handleDotClick = (index: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const containerTop = rect.top + scrollTop;
    const totalHeight = rect.height - window.innerHeight;
    const step = totalHeight / audienceSlides.length;

    // Direct scroll to the step point with a tiny offset buffer
    const targetScrollY = containerTop + (step * index) + 15;

    window.scrollTo({
      top: targetScrollY,
      behavior: "smooth"
    });
  };

  const currentSlide = audienceSlides[activeIndex];

  // Grid background style
  const gridPatternStyle = {
    "--grid-color": "rgba(255, 255, 255, 0.03)",
    backgroundImage: `
      linear-gradient(to right, var(--grid-color) 1px, transparent 1px),
      linear-gradient(to bottom, var(--grid-color) 1px, transparent 1px)
    `,
    backgroundSize: "3.5rem 3.5rem"
  } as React.CSSProperties;

  return (
    <>
      {/* Mobile/Tablet view (CSS controlled) */}
      <div className="block lg:hidden">
        <section 
          id="who-can-join-showcase-mobile"
          className="relative w-full bg-[#050608] py-24 px-6 md:px-12 border-t border-b border-white/5"
        >
          <div className="max-w-xl mx-auto text-center space-y-4 mb-16">
            <span className="text-[10px] tracking-[0.25em] font-mono font-bold text-[#C8EB5F] uppercase block">
              TARGET AUDIENCE SCOPE
            </span>
            <h2 className="text-3xl md:text-4xl font-light font-serif tracking-tight text-white uppercase leading-none">
              Who Can Join This Course?
            </h2>
            <p className="text-neutral-500 text-xs font-light max-w-sm mx-auto leading-relaxed">
              Our online Tajweed lessons have zero age bar or academic boundaries. We align our learning tracks perfectly to your exact background.
            </p>
          </div>

          <div className="max-w-2xl mx-auto space-y-12">
            {audienceSlides.map((slide, index) => (
              <div 
                key={index} 
                className="bg-[#090a0d] border border-white/5 rounded-[30px] p-6 md:p-8 space-y-6 relative overflow-hidden group hover:border-white/10 transition-all duration-300 shadow-xl"
              >
                <div 
                  className="absolute top-0 left-0 w-full h-[3px] transition-all duration-350" 
                  style={{ backgroundColor: slide.accentColor }} 
                />
                
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest">SEGMENT 0{index + 1}</span>
                  <span className="text-[9px] font-mono px-2.5 py-1 rounded-full border border-white/10 bg-white/5 text-white/95">
                    {slide.subTitle}
                  </span>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xl md:text-2xl font-serif text-white uppercase tracking-wide group-hover:text-[#C8EB5F] transition-colors duration-300">
                    {slide.title}
                  </h3>
                  <p className="text-neutral-400 text-xs md:text-sm font-light leading-relaxed">
                    {slide.description}
                  </p>
                </div>

                {/* Responsive Cinematic Image */}
                <div className="relative aspect-[1.5] w-full overflow-hidden rounded-2xl border border-white/10 shadow-lg">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 pointer-events-none"
                    referrerPolicy="no-referrer"
                    onError={(e) => { 
                      const target = e.target as HTMLImageElement;
                      target.onerror = null; 
                      target.src = `https://placehold.co/600x400/222222/cccccc?text=Segment+Image`; 
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Bullet points mapping */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 border-t border-white/5 pt-5">
                  {slide.bullets.map((bullet, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs font-light text-neutral-350">
                      <Check size={13} className="text-[#C8EB5F] shrink-0" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* CTA booking trigger bottom */}
          <div className="text-center pt-12">
            <a
              href="#booking-card"
              className="inline-flex items-center gap-2.5 px-9 py-4 bg-white text-black font-semibold text-xs tracking-widest uppercase rounded-full hover:bg-[#C8EB5F] hover:text-black transition-all duration-300 shadow-xl border border-white/15"
            >
              <span>Reserve Your Timings</span>
              <ArrowRight size={14} />
            </a>
          </div>
        </section>
      </div>

      {/* Desktop Sticky View (CSS controlled) */}
      <div className="hidden lg:block">
        <section 
          ref={containerRef}
          id="who-can-join-showcase"
          className="relative w-full"
          style={{ height: `${audienceSlides.length * 100}vh` }}
        >
      <div 
        className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden transition-all duration-700"
        style={{ backgroundColor: currentSlide.bgColor }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 h-full w-full max-w-7xl mx-auto items-center px-6 md:px-12 relative">
          
          {/* Left Column: Pagination, Headers, Paragraphs, Bullets - col span 7 */}
          <div className="relative md:col-span-12 lg:col-span-7 flex flex-col justify-center h-full max-w-xl z-20 space-y-6 lg:border-r lg:border-white/5 lg:pr-12 py-12">
            
            {/* Top Subtitle Progress Header */}
            <div className="flex flex-col gap-2">
              <span className="text-[10px] tracking-[0.25em] font-mono font-bold text-[#C8EB5F] uppercase">
                TARGET AUDIENCE SCOPE
              </span>
              <h2 className="text-4xl md:text-5xl font-light font-serif tracking-tight text-white uppercase leading-none">
                Who Can Join This Course?
              </h2>
            </div>

            {/* Custom Pagination Bars */}
            <div className="flex items-center gap-2 pt-2">
              {audienceSlides.map((slide, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className="group relative flex flex-col py-2 cursor-pointer focus:outline-none"
                  aria-label={`Jump to segment ${index + 1}`}
                >
                  <div 
                    className={`h-[3px] rounded-full transition-all duration-500 ease-in-out ${
                      index === activeIndex 
                        ? "w-10 bg-[#C8EB5F]" 
                        : "w-5 bg-white/20 group-hover:bg-white/40"
                    }`}
                  />
                  <span className="absolute top-5 left-0 text-[8px] font-mono text-neutral-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {slide.subTitle}
                  </span>
                </button>
              ))}
            </div>

            {/* Description Body & Dynamic content transitions */}
            <div className="relative h-[250px] md:h-[220px] w-full pt-4">
              {audienceSlides.map((slide, index) => {
                const isActive = index === activeIndex;
                return (
                  <div
                    key={index}
                    className={`absolute inset-0 flex flex-col gap-4 transition-all duration-700 ease-out ${
                      isActive
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 translate-y-6 pointer-events-none"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase tracking-widest font-mono text-neutral-500">SEGMENT 0{index + 1}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-white/10 bg-white/5 text-white/90">
                        {slide.subTitle}
                      </span>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-serif text-white tracking-wide uppercase">
                      {slide.title}
                    </h3>
                    
                    <p className="text-neutral-400 text-xs md:text-sm font-light leading-relaxed">
                      {slide.description}
                    </p>

                    {/* Bullets lists */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      {slide.bullets.map((bullet, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-[11px] font-light text-neutral-300">
                          <Check size={12} className="text-[#C8EB5F] shrink-0" />
                          <span>{bullet}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Form Selector Trigger */}
            <div className="pt-4 flex items-center gap-4">
              <a
                href="#booking-card"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-black font-semibold text-xs tracking-widest uppercase rounded-full hover:bg-[#C8EB5F] transition-all duration-300 shadow-xl group border border-white/10"
              >
                <span>Reserve Your Timings</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest hidden sm:inline">
                * Zero restrictions on background
              </span>
            </div>

          </div>

          {/* Right Column: Image Content with dynamic Translate, styled with grid - col span 5 */}
          <div 
            className="hidden lg:flex md:col-span-12 lg:col-span-5 items-center justify-center p-8 relative h-full w-full"
            style={gridPatternStyle}
          >
            {/* Glowing Backdrop according to current slide accent */}
            <div 
              className="absolute w-[250px] h-[250px] rounded-full blur-[100px] opacity-20 transition-all duration-1000"
              style={{ backgroundColor: currentSlide.accentColor }}
            />

            <div className="relative w-[75%] aspect-[0.75] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-white/10 bg-zinc-950/80 z-10 group">
              <div 
                className="absolute top-0 left-0 w-full h-full transition-transform duration-700 ease-out"
                style={{ transform: `translateY(-${activeIndex * 100}%)` }}
              >
                {audienceSlides.map((slide, index) => (
                  <div key={index} className="w-full h-full relative">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="h-full w-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-1000 pointer-events-none"
                      referrerPolicy="no-referrer"
                      onError={(e) => { 
                        const target = e.target as HTMLImageElement;
                        target.onerror = null; 
                        target.src = `https://placehold.co/600x800/222222/cccccc?text=Segment+Image`; 
                      }}
                    />
                    {/* Shadow overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
      </div>
    </>
  );
}
