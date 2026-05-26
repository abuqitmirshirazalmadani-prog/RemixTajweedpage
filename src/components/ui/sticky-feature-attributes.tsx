"use client";

import React, { useState, useEffect, useRef } from "react";
import { CheckCircle2, UserCheck, Compass, Mic, Landmark, ShieldCheck } from "lucide-react";

// --- Data for the feature cards ---
const featureItems = [
  {
    title: "Live One-on-One Classes",
    description: "Personalized Tajweed sessions with full teacher attention. Learn directly from certified mentors focused completely on your vocal and makharij correction.",
    imageUrl: "https://i.postimg.cc/hjptxzYS/pexels-beytlik-7654907.jpg",
    glowColor: "from-[#C8EB5F]/10 to-transparent",
    borderColor: "group-hover:border-[#C8EB5F]/30",
    icon: UserCheck,
    accentColor: "text-[#C8EB5F]"
  },
  {
    title: "Beginner to Advanced Levels",
    description: "Suitable for complete beginners and intermediate readers. Progress structurally from raw letter phonetics to advanced rhythmic rules and full mastery.",
    imageUrl: "https://i.postimg.cc/7L4HWnvF/pexels-reojuve-29182968.jpg",
    glowColor: "from-amber-500/10 to-transparent",
    borderColor: "group-hover:border-amber-500/30",
    icon: Compass,
    accentColor: "text-amber-400"
  },
  {
    title: "Quran Pronunciation Practice",
    description: "Focused training for clear, elegant, and correct recitation. Master physical tongue positions and exact articulation points with high-precision feedback.",
    imageUrl: "https://i.postimg.cc/T2sR66MH/pexels-beyza-yalcin-153182170-34548784.jpg",
    glowColor: "from-emerald-500/10 to-transparent",
    borderColor: "group-hover:border-emerald-500/30",
    icon: Mic,
    accentColor: "text-emerald-400"
  },
  {
    title: "Weekly Progress Monitoring",
    description: "Track your recitation improvements and Tajweed conceptual understanding through tailored homework logs, expert reports, and regular assessments.",
    imageUrl: "https://i.postimg.cc/nh4ZB9jJ/pexels-derya-59965512-36228547.jpg",
    glowColor: "from-blue-500/10 to-transparent",
    borderColor: "group-hover:border-blue-500/30",
    icon: ShieldCheck,
    accentColor: "text-blue-400"
  },
  {
    title: "Course Completion Certificate",
    description: "Earn a formal accredited certificate upon successful completion of your course and final oral boards, confirming your Tajweed proficiency and dedication.",
    imageUrl: "https://i.postimg.cc/23pRBCCv/pexels-rizkysabriansyah-36211946.jpg",
    glowColor: "from-purple-500/10 to-transparent",
    borderColor: "group-hover:border-purple-500/30",
    icon: Landmark,
    accentColor: "text-purple-400"
  }
];

// --- Custom Hook for Scroll Animation ---
const useScrollAnimation = () => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return [ref, inView] as const;
};

// --- Header Component ---
const AnimatedHeader = () => {
  const [headerRef, headerInView] = useScrollAnimation();

  return (
    <div className="mb-10" ref={headerRef}>
      <h3
        className={`text-3xl font-serif text-white uppercase tracking-tight transition-all duration-700 ease-out ${
          headerInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        Structured Course Attributes
      </h3>
      <p
        className={`text-neutral-400 text-xs font-light mt-1 transition-all duration-700 ease-out delay-100 ${
          headerInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        Deep focus, personalized feedback, elite structure.
      </p>
    </div>
  );
};

export function StickyFeatureSection() {
  return (
    <div className="w-full relative z-10 text-white">
      <AnimatedHeader />

      {/* The container for the sticky cards */}
      <div className="relative flex flex-col gap-10">
        {featureItems.map((feature, index) => (
          <div
            key={index}
            className={`w-full group bg-[#090a0d] border border-white/5 grid grid-cols-1 md:grid-cols-12 items-center gap-6 p-8 md:p-10 rounded-[30px] transition-all duration-500 sticky ${feature.borderColor}`}
            style={{
              top: `${120 + index * 16}px`,
              zIndex: (index + 1) * 10,
              boxShadow: `0 -25px 50px -12px rgba(0, 0, 0, 0.95)`,
            }}
          >
            {/* Glowing background hint */}
            <div className={`absolute inset-0 bg-gradient-to-tr ${feature.glowColor} opacity-30 rounded-[30px] pointer-events-none transition-opacity duration-500 group-hover:opacity-60`} />

            {/* Left side card content - col span 7 */}
            <div className="relative z-10 md:col-span-12 lg:col-span-7 flex flex-col justify-center space-y-4">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center ${feature.accentColor}`}>
                  <feature.icon size={16} strokeWidth={1.5} />
                </div>
                <span className="text-[10px] font-mono tracking-widest text-[#C8EB5F] uppercase font-bold">
                  ATTRIBUTE 0{index + 1}
                </span>
              </div>
              
              <h4 className="text-xl md:text-2xl font-serif text-white uppercase tracking-wide group-hover:text-[#C8EB5F] transition-colors duration-300">
                {feature.title}
              </h4>
              
              <p className="text-neutral-400 text-xs font-light leading-relaxed max-w-md">
                {feature.description}
              </p>

              <div className="flex items-center gap-1.5 pt-1 text-[#C8EB5F]/90 text-[10px] font-mono tracking-wider font-light">
                <CheckCircle2 size={12} className="text-[#C8EB5F]" />
                <span>EXPERIENCED MANDATED MASTER GURUS</span>
              </div>
            </div>

            {/* Right side card Image - col span 5 */}
            <div className="relative z-10 md:col-span-12 lg:col-span-5 w-full aspect-[1.5] lg:aspect-[1.3] overflow-hidden rounded-2xl border border-white/10 shadow-lg mt-4 lg:mt-0">
              <img
                src={feature.imageUrl}
                alt={feature.title}
                loading="lazy"
                className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 pointer-events-none"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
