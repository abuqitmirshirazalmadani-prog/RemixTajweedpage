"use client";

import React, { useEffect, useRef, useState } from "react";
import { Check, ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function cx(...parts: Array<string | undefined | false | null>): string {
  return parts.filter(Boolean).join(" ");
}

export interface FlowSectionProps {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  "aria-label"?: string;
}

export const FlowSection: React.FC<FlowSectionProps> = ({
  className,
  style = {},
  children,
  "aria-label": ariaLabel,
}) => (
  <section
    data-flow-section
    aria-label={ariaLabel}
    className={cx("relative min-h-screen w-full overflow-hidden flex flex-col justify-between", className)}
    style={style}
  >
    <div
      data-flow-inner
      className={cx(
        "flow-art-container relative flex min-h-screen w-full flex-col justify-between gap-6 px-[4vw] pt-[clamp(2rem,8vw,4vw)] pb-[4vw]",
        "will-change-transform"
      )}
      style={{ transformOrigin: "bottom left" }}
    >
      {children}
    </div>
  </section>
);

export interface FlowArtProps {
  children: React.ReactNode;
  className?: string;
  "aria-label"?: string;
}

const childCount = (children: React.ReactNode) => React.Children.count(children);

export const FlowArt: React.FC<FlowArtProps> = ({
  children,
  className,
  "aria-label": ariaLabel = "Story scroll",
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useGSAP(
    () => {
      if (!containerRef.current || reducedMotion) return;

      const sections = Array.from(
        containerRef.current.querySelectorAll<HTMLElement>("[data-flow-section]")
      );
      if (sections.length === 0) return;

      const triggers: ScrollTrigger[] = [];

      sections.forEach((section, i) => {
        gsap.set(section, { zIndex: i + 1 });

        const inner = section.querySelector<HTMLElement>(".flow-art-container");
        if (!inner) return;

        if (i > 0) {
          gsap.set(inner, { rotation: 30, transformOrigin: "bottom left" });
          const tween = gsap.to(inner, {
            rotation: 0,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "top 25%",
              scrub: true,
            },
          });
          if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
        }

        if (i < sections.length - 1) {
          triggers.push(
            ScrollTrigger.create({
              trigger: section,
              start: "bottom bottom",
              end: "bottom top",
              pin: true,
              pinSpacing: false,
            })
          );
        }
      });

      ScrollTrigger.refresh();

      return () => {
        triggers.forEach((t) => t.kill());
      };
    },
    { scope: containerRef, dependencies: [childCount(children), reducedMotion] }
  );

  return (
    <main
      ref={containerRef}
      aria-label={ariaLabel}
      className={cx("w-full overflow-x-hidden", className)}
    >
      {children}
    </main>
  );
};

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
  return (
    <FlowArt className="bg-black text-white py-0">
      {audienceSlides.map((slide, index) => (
        <FlowSection
          key={index}
          className="bg-black border-b border-white/5"
          style={{ backgroundColor: slide.bgColor }}
          aria-label={slide.title}
        >
          {/* Top Header Row */}
          <div className="flex items-center justify-between border-b border-white/5 pb-4 w-full max-w-7xl mx-auto z-20">
            <div className="flex items-center gap-3">
              <span className="text-[10px] tracking-[0.25em] font-mono font-bold text-[#C8EB5F] uppercase">
                TARGET AUDIENCE SCOPE
              </span>
              <span className="text-white/20 hidden sm:inline">|</span>
              <span
                style={{ fontFamily: "var(--font-cormorant), serif" }}
                className="text-xs sm:text-sm italic tracking-wide text-neutral-400 font-light hidden sm:inline"
              >
                Who Can Join This Course?
              </span>
            </div>
            <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
              [ SEGMENT 0{index + 1} / 0{audienceSlides.length} ]
            </div>
          </div>

          {/* Core Content Grid */}
          <div className="w-full max-w-7xl mx-auto my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center flex-1 py-8 lg:py-12 z-20">
            {/* Left Column: Descriptions and Bullets */}
            <div className="lg:col-span-7 space-y-6 lg:space-y-8">
              <div className="space-y-3">
                <span className="text-[#C8EB5F] font-mono text-[10px] sm:text-xs tracking-widest uppercase block">
                  {slide.subTitle}
                </span>
                <h3
                  style={{ fontFamily: "var(--font-cormorant), serif" }}
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-white tracking-wide uppercase leading-tight"
                >
                  {slide.title}
                </h3>
                <div className="w-16 h-[1px] bg-white/20" />
              </div>

              <p className="text-neutral-300 text-xs sm:text-sm md:text-base font-light leading-relaxed max-w-2xl">
                {slide.description}
              </p>

              {/* Bullet points mapping with luxury checkmark dots */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-white/10">
                {slide.bullets.map((bullet, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm font-light text-neutral-200">
                    <span className="mt-1 flex items-center justify-center w-4 h-4 rounded-full bg-[#C8EB5F]/10 border border-[#C8EB5F]/20 shrink-0">
                      <Check size={10} className="text-[#C8EB5F]" />
                    </span>
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Immersive Photography with glowing effect */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              {/* Blur backdrop light */}
              <div
                className="absolute w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] rounded-full blur-[100px] opacity-10 transition-all duration-1000 pointer-events-none"
                style={{ backgroundColor: slide.accentColor }}
              />

              {/* Floating Frame with cinematic depth */}
              <div className="relative w-full aspect-[4/3] max-w-sm rounded-[24px] overflow-hidden border border-white/10 shadow-[0_25px_50px_rgba(0,0,0,0.9)] bg-neutral-950 flex justify-center items-center group">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-1000 pointer-events-none transform scale-100 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = `https://placehold.co/800x600/111111/cccccc?text=Segment+0${index + 1}`;
                  }}
                />

                {/* Visual indicator watermark */}
                <div className="absolute bottom-4 right-4 bg-black/85 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-[9px] font-mono uppercase tracking-widest text-[#C8EB5F]">
                  REVELATION 0{index + 1}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Footer Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-white/5 w-full max-w-7xl mx-auto gap-4 z-20">
            <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest text-center sm:text-left">
              * Dedicated Quran & Tajweed Academy | Developed by <a href="https://abuqitmirlabs.tech" target="_blank" rel="noopener noreferrer" className="text-[#C8EB5F] hover:text-white transition-colors underline font-medium">AbuQitmirLabs.tech</a>
            </span>
            <a
              href="#booking-card"
              className="inline-flex items-center gap-2.5 px-6 py-2.5 bg-white text-black font-semibold text-[10px] tracking-[0.25em] uppercase rounded-full hover:bg-[#C8EB5F] hover:text-black transition-all duration-300 shadow-xl border border-white/10 group active:scale-95"
            >
              <span>RESERVE BLUEPRINT SEAT</span>
              <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </FlowSection>
      ))}
    </FlowArt>
  );
}
