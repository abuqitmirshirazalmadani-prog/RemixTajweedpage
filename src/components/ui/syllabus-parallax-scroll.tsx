"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDown, BookOpen, Volume2, BookMarked, Award } from "lucide-react";

interface SyllabusSection {
  id: number;
  title: string;
  sub: string;
  description: string;
  level: string;
  imageUrl: string;
  reverse: boolean;
  icon: React.ReactNode;
}

const sectionsData = (): SyllabusSection[] => [
  {
    id: 1,
    title: "Makharij & Articulation",
    sub: "Introduction to phonetics",
    description: "Learn the correct pronunciation points of Arabic letters for accurate Quran recitation. Our tutors show precise tongue and jaw articulation to establish impeccable fundamentals.",
    level: "FOUNDATION LEVEL",
    imageUrl: "https://i.postimg.cc/C14msmhM/pexels-bassam-ibram-764485-5251996.jpg",
    reverse: false,
    icon: <BookOpen size={20} />
  },
  {
    id: 2,
    title: "Pronunciation Polish",
    sub: "Fluency adjustments",
    description: "Improve fluency, confidence, and clarity while reading the Holy Quran. Eliminate subtle mistakes in short vowels, stop transitions, and silent letters through rapid recitatory drill cycles.",
    level: "FLUENCY LEVEL",
    imageUrl: "https://i.postimg.cc/HsN3zJgD/pexels-mohammad-kheir-213166482-34446394.jpg",
    reverse: true,
    icon: <Volume2 size={20} />
  },
  {
    id: 3,
    title: "Technical Tajweed Rules",
    sub: "Technical regulations",
    description: "Understand important concepts with interactive visual guides: Noon/Meem Sakinah rules, Ghunnah nasalizations, Madd durations, and Qalqalah vibration properties.",
    level: "TECHNICAL RULES",
    imageUrl: "https://i.postimg.cc/zfCjq0Rn/pexels-murad-khan-2157016942-35398672.jpg",
    reverse: false,
    icon: <BookMarked size={20} />
  },
  {
    id: 4,
    title: "Live Practical Recitation",
    sub: "Certificate pass preparation",
    description: "Apply Tajweed rules directly to Quranic surahs. Receive real-time vocal feedback from certified mentors and successfully complete oral boards to secure the official course certificate.",
    level: "PRACTICAL MASTERY",
    imageUrl: "https://i.postimg.cc/4ySvW0rT/pexels-a-darmel-8164599.jpg",
    reverse: true,
    icon: <Award size={20} />
  }
];

function SyllabusScrollCard({ section }: { section: SyllabusSection }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "center start"]
  });

  const opacityContent = useTransform(scrollYProgress, [0, 0.4, 0.9], [0, 1, 1]);
  const clipProgress = useTransform(scrollYProgress, [0, 0.7], ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]);
  const translateContent = useTransform(scrollYProgress, [0, 1], [-60, 0]);

  return (
    <div
      ref={cardRef}
      className={`min-h-screen py-24 flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20 lg:gap-28 max-w-7xl mx-auto px-6 ${
        section.reverse ? "md:flex-row-reverse" : ""
      }`}
    >
      <motion.div
        style={{ y: translateContent, opacity: opacityContent }}
        className="w-full md:w-1/2 space-y-6"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 text-[#C8EB5F] flex items-center justify-center rounded-xl bg-[#C8EB5F]/5 border border-[#C8EB5F]/15">
            {section.icon}
          </div>
          <div>
            <span className="text-[10px] font-mono tracking-[0.25em] text-[#C8EB5F] uppercase font-bold block">
              PILLAR 0{section.id} / {section.level}
            </span>
            <span className="text-[11px] font-sans text-neutral-500 uppercase tracking-wider block">
              {section.sub}
            </span>
          </div>
        </div>

        <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-serif text-white uppercase tracking-tight font-light leading-none">
          {section.title}
        </h3>
        
        <p className="text-neutral-450 text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-md font-sans">
          {section.description}
        </p>
      </motion.div>

      <motion.div
        style={{
          opacity: opacityContent,
          clipPath: clipProgress,
        }}
        className="w-full md:w-1/2 flex justify-center items-center"
      >
        <div className="relative w-full max-w-lg aspect-[1.4] rounded-[36px] overflow-hidden border border-white/10 group bg-zinc-950 shadow-[0_12px_45px_rgba(0,0,0,0.65)]">
          <img
            src={section.imageUrl}
            className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700 pointer-events-none"
            alt={section.title}
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-x-0 bottom-0 top-[40%] bg-gradient-to-t from-black via-black/20 to-transparent pointer-events-none z-10" />
        </div>
      </motion.div>
    </div>
  );
}

export function SyllabusParallaxScroll() {
  const sections = sectionsData();

  return (
    <div id="syllabus" className="bg-black text-white py-16 relative">
      
      {/* Absolute high-contrast design background accents */}
      <div className="absolute inset-0 bg-neutral-900/10 pointer-events-none z-0" />

      {/* Structured luxury header */}
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center px-6 relative z-10">
        <span className="text-[10px] tracking-[0.35em] text-[#C8EB5F] font-mono uppercase font-bold mb-4">
          MASTER'S CURRICULUM MILESTONES
        </span>
        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-serif text-white uppercase tracking-tight max-w-4xl font-light leading-tight">
          Syllabus Pillars <br/>
          <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-[#C8EB5F] to-emerald-300">From Fundamental to Master</span>
        </h2>
        <p className="mt-8 flex items-center gap-2 text-xs font-mono tracking-[0.25em] text-neutral-500 uppercase select-none">
          SCROLL TO EXPLORE SYLLABUS <ArrowDown size={14} className="animate-bounce text-[#C8EB5F]" />
        </p>
      </div>

      {/* Sequential list of parallax scrolled items */}
      <div className="flex flex-col relative z-10">
        {sections.map((section) => (
          <SyllabusScrollCard key={section.id} section={section} />
        ))}
      </div>

      {/* Completion label */}
      <div className="min-h-[25vh] flex flex-col items-center justify-center text-center px-6 border-b border-white/5 relative z-10">
        <span className="text-xs font-mono tracking-widest text-[#C8EB5F] uppercase">PROVEN SCHOLASTIC ACCURACY_</span>
        <p className="text-neutral-500 text-[10px] uppercase font-mono mt-2 tracking-widest">
          Comprehensive learning. Measured milestones. Pure legacy.
        </p>
      </div>
    </div>
  );
}
