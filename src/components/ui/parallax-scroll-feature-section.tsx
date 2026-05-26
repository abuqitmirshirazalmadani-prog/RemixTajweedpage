"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDown } from "lucide-react";

interface SectionProps {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  reverse: boolean;
}

const sections: SectionProps[] = [
  {
    id: 1,
    title: "Certified Quran Teachers",
    description: "Learn from experienced and qualified Quran tutors who specialize in Tajweed, Quran recitation, and Islamic studies with verified authentication chains.",
    imageUrl: "https://i.postimg.cc/pdF9LjjV/pexels-daneswara-eka-2157956675-36451941.jpg",
    reverse: false
  },
  {
    id: 2,
    title: "Female Quran Tutors Available",
    description: "Comfortable and secure learning environment for sisters and children with professional, certified female teachers holding high-level Tajweed credentials.",
    imageUrl: "https://i.postimg.cc/y6vNBjGg/pexels-firman-marek-brew-2148918143-36319872.jpg",
    reverse: true
  },
  {
    id: 3,
    title: "Kids-Friendly Learning System",
    description: "Interactive teaching methods designed especially for children to make Quran learning easy, engaging, and enjoyable. No boring lectures, only active practice.",
    imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=850&q=80",
    reverse: false
  },
  {
    id: 4,
    title: "Flexible Class Timings",
    description: "Choose schedules that match your daily routine whether you live in the USA, UK, Canada, Australia, or anywhere else across global time boundaries.",
    imageUrl: "https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&w=850&q=80",
    reverse: true
  },
  {
    id: 5,
    title: "One-on-One Online Classes",
    description: "Personalized Quran lessons with full teacher attention to help students improve faster, gain confidence, and establish accurate articulation rules.",
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=850&q=80",
    reverse: false
  },
  {
    id: 6,
    title: "Progress Tracking & Reports",
    description: "Parents receive regular high-fidelity logs, video feedback snippets, and detailed reports outlining development phases and monthly achievements.",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=850&q=80",
    reverse: true
  },
  {
    id: 7,
    title: "Worldwide Students",
    description: "Trusted by thousands of families across multiple continents for professional online Quran education incorporating modern instructional methodologies.",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=850&q=80",
    reverse: false
  },
  {
    id: 8,
    title: "Beginner to Advanced Courses",
    description: "Whether you are beginning with Noorani Qaida phonics or polishing high-level Tajweed rules, we customize structured tracks for every stage of mastery.",
    imageUrl: "https://i.postimg.cc/rmyLPXMG/pexels-rdne-7249256.jpg",
    reverse: true
  },
  {
    id: 9,
    title: "Safe & Professional Environment",
    description: "Secure online workspaces with respectful certified tutors, professional communication standards, and student-focused growth environments.",
    imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=850&q=80",
    reverse: false
  },
  {
    id: 10,
    title: "Free Trial Classes",
    description: "Start with a live one-on-one diagnostic class to experience our signature teacher patience and high-level educational quality before registering.",
    imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=850&q=80",
    reverse: true
  }
];

function ScrollCard({ section }: { section: SectionProps }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center start"]
  });

  const opacityContent = useTransform(scrollYProgress, [0, 0.4, 0.9], [0, 1, 1]);
  const clipProgress = useTransform(scrollYProgress, [0, 0.7], ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]);
  const translateContent = useTransform(scrollYProgress, [0, 1], [-60, 0]);

  return (
    <div
      ref={ref}
      className={`min-h-screen py-20 flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 lg:gap-32 max-w-7xl mx-auto px-6 ${
        section.reverse ? "md:flex-row-reverse" : ""
      }`}
    >
      <motion.div
        style={{ y: translateContent, opacity: opacityContent }}
        className="w-full md:w-1/2 space-y-6"
      >
        <span className="text-[10px] md:text-xs font-mono tracking-[0.3em] text-[#C8EB5F] uppercase font-bold block">
          0{section.id} / WHY TRUST US
        </span>
        <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-white uppercase tracking-tight font-light leading-none">
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
        <div className="relative w-full max-w-md aspect-[4/3] rounded-[40px] overflow-hidden border border-white/10 group bg-zinc-950">
          <img
            src={section.imageUrl}
            className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700"
            alt={section.title}
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
        </div>
      </motion.div>
    </div>
  );
}

export function Component() {
  return (
    <div className="bg-black text-white py-16">
      {/* Intro Header */}
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center px-6">
        <span className="text-[10px] tracking-[0.35em] text-[#C8EB5F] font-mono uppercase font-bold mb-4">
          COGNITIVE SELECTION
        </span>
        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-serif text-white uppercase tracking-tight max-w-4xl font-light leading-tight">
          Why Families Trust <span className="italic block text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-[#C8EB5F] to-emerald-300">TajweedPage.com</span>
        </h2>
        <p className="mt-8 flex items-center gap-2 text-xs font-mono tracking-[0.25em] text-neutral-500 uppercase">
          SCROLL TO UNLOCK DETAILS <ArrowDown size={14} className="animate-bounce" />
        </p>
      </div>

      <div className="flex flex-col relative z-10">
        {sections.map((section) => (
          <ScrollCard key={section.id} section={section} />
        ))}
      </div>

      <div className="min-h-[25vh] flex flex-col items-center justify-center text-center px-6 border-b border-white/5">
        <span className="text-xs font-mono tracking-widest text-[#C8EB5F] uppercase">MASTERY CONFIRMED_</span>
        <p className="text-neutral-500 text-[10px] uppercase font-mono mt-2 tracking-widest">
          Every lesson live. One expert. Infinite growth.
        </p>
      </div>
    </div>
  );
}
