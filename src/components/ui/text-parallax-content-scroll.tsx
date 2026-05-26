"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionData {
  id: number;
  subheading: string;
  heading: string;
  p1: string;
  p2?: string;
  imgUrl: string;
  accentColor: string;
}

const sections: SectionData[] = [
  {
    id: 1,
    subheading: "01 / INTERACTIVE LEARNING",
    heading: "Interactive Quran Learning",
    p1: "We make Quran learning engaging and easy with live one-on-one classes, step-by-step guidance, and interactive teaching methods that help students stay motivated and focused.",
    p2: "By blending classical instruction with modern screens, we create an environment where the sacred text feels alive and readily accessible.",
    imgUrl: "https://i.postimg.cc/DfM8L5cn/pexels-timur-weber-9127606.jpg",
    accentColor: "#C8EB5F"
  },
  {
    id: 2,
    subheading: "02 / PERSONALIZED FOCUS",
    heading: "Personalized Attention",
    p1: "Every student learns differently. That’s why our teachers provide personalized lessons based on your learning speed, goals, age, and Quran reading level.",
    p2: "No crowd distractions, no fast-paced classroom pressure. Just deep, focused focus on your makharij and pronunciation.",
    imgUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1600&q=80",
    accentColor: "#34D399"
  },
  {
    id: 3,
    subheading: "03 / METRIC IMPROVEMENT",
    heading: "Progress Tracking & Feedback",
    p1: "Track your Quran learning journey with regular progress updates, Tajweed improvement monitoring, and performance feedback for both students and parents.",
    p2: "Receive highly detailed weekly logbooks and feedback files summarizing lesson completions and articulation mastery levels.",
    imgUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80",
    accentColor: "#FBBF24"
  },
  {
    id: 4,
    subheading: "04 / ACCESSIBLE PLANS",
    heading: "Affordable Learning Plans",
    p1: "High-quality Quran education at affordable pricing with flexible plans designed for kids, adults, families, and beginners worldwide.",
    p2: "We believe financial situations should never block Quranic literacy. Choose customized tracks that fit your family’s budget.",
    imgUrl: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=1600&q=80",
    accentColor: "#F43F5E"
  },
  {
    id: 5,
    subheading: "05 / GLOBAL STANDARD",
    heading: "International Student Support",
    p1: "We proudly teach students from the USA, UK, Canada, Australia, UAE, Saudi Arabia, and many other countries with flexible schedules that fit your timezone.",
    p2: "Our custom server infrastructure coordinates slots naturally without double bookings so you always get your lesson on time.",
    imgUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80",
    accentColor: "#3B82F6"
  },
  {
    id: 6,
    subheading: "06 / VERIFIED ELITE",
    heading: "Female & Male Qualified Tutors",
    p1: "Choose experienced male or female Quran teachers for a comfortable and professional learning experience.",
    p2: "Our teachers are certified, patient scholars holding verified academic permissions to instruct both children and mature pupils.",
    imgUrl: "https://i.postimg.cc/5N8QJL8w/pexels-saurabh-x-pro-1243574221-23533701.jpg",
    accentColor: "#A78BFA"
  },
  {
    id: 7,
    subheading: "07 / ABSOLUTE FLEXIBILITY",
    heading: "Flexible Timings for Busy Families",
    p1: "Morning, evening, and weekend classes available to match school, work, and family schedules.",
    p2: "Reschedule lessons easily through automated structures or pause tracks temporarily during family holidays.",
    imgUrl: "https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&w=1600&q=80",
    accentColor: "#EC4899"
  },
  {
    id: 8,
    subheading: "08 / COMPLIMENTARY INTRO",
    heading: "Free Trial Class Available",
    p1: "Experience our teaching quality before joining with a free trial class and discover how easy Quran learning can be.",
    p2: "Receive a baseline diagnostic report from our senior advisor absolutely free. No commitments or credit cards required.",
    imgUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1600&q=80",
    accentColor: "#C8EB5F"
  }
];

const IMG_PADDING = 12;

interface TextParallaxContentProps {
  imgUrl: string;
  subheading: string;
  heading: string;
  children: React.ReactNode;
}

const TextParallaxContent = ({
  imgUrl,
  subheading,
  heading,
  children,
}: TextParallaxContentProps) => {
  return (
    <div
      style={{
        paddingLeft: IMG_PADDING,
        paddingRight: IMG_PADDING,
      }}
      className="bg-black text-white"
    >
      <div className="relative h-[120vh]">
        <StickyImage imgUrl={imgUrl} />
        <OverlayCopy heading={heading} subheading={subheading} />
      </div>
      {children}
    </div>
  );
};

interface StickyImageProps {
  imgUrl: string;
}

const StickyImage = ({ imgUrl }: StickyImageProps) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <motion.div
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: `calc(100vh - ${IMG_PADDING * 2}px)`,
        top: IMG_PADDING,
        scale,
      }}
      ref={targetRef}
      className="sticky z-0 overflow-hidden rounded-[40px] border border-white/5 bg-zinc-950"
    >
      <motion.div
        className="absolute inset-0 bg-neutral-950/80"
        style={{
          opacity,
        }}
      />
    </motion.div>
  );
};

interface OverlayCopyProps {
  subheading: string;
  heading: string;
}

const OverlayCopy = ({ subheading, heading }: OverlayCopyProps) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [200, -200]);
  const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0]);

  return (
    <motion.div
      style={{
        y,
        opacity,
      }}
      ref={targetRef}
      className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center text-white px-6"
    >
      <p className="mb-4 text-center text-xs md:text-sm font-mono tracking-[0.35em] text-[#C8EB5F] uppercase font-bold">
        {subheading}
      </p>
      <h3 className="text-center font-serif uppercase tracking-tight text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-none max-w-4xl">
        {heading}
      </h3>
    </motion.div>
  );
};

interface ExampleContentProps {
  p1: string;
  p2?: string;
  accentColor: string;
  heading: string;
  onCtaclick: () => void;
}

const ExampleContent = ({ p1, p2, accentColor, heading, onCtaclick }: ExampleContentProps) => (
  <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-6 pb-24 pt-12 md:grid-cols-12 border-b border-white/5 bg-black">
    <div className="col-span-1 md:col-span-4 space-y-2">
      <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase block">CORE BENEFIT</span>
      <h4 className="text-2xl sm:text-3xl font-serif text-white uppercase font-light leading-tight">
        Why it matters <br />
        <span style={{ color: accentColor }} className="italic font-normal">for your home.</span>
      </h4>
    </div>
    <div className="col-span-1 md:col-span-8 space-y-6">
      <p className="text-base sm:text-lg text-neutral-350 font-sans font-light leading-relaxed">
        {p1}
      </p>
      {p2 && (
        <p className="text-sm text-neutral-500 font-sans font-light leading-relaxed">
          {p2}
        </p>
      )}
      <button
        onClick={onCtaclick}
        className="group inline-flex items-center gap-2 border border-white/10 hover:border-[#C8EB5F]/50 px-6 py-3 text-xs font-mono tracking-widest text-white hover:text-[#C8EB5F] uppercase transition-all duration-300 rounded-none cursor-pointer"
      >
        <span>Enroll in this benefit</span>
        <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </button>
    </div>
  </div>
);

interface ParallaxSectionProps {
  onCtaclick: () => void;
}

export function TextParallaxContentExample({ onCtaclick }: ParallaxSectionProps) {
  return (
    <div id="trust-parallax-section" className="bg-black pt-16">
      {/* Intro Header */}
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6 bg-black">
        <span className="text-[10px] tracking-[0.35em] text-[#C8EB5F] font-mono uppercase font-bold mb-4">
          SYSTEM ADVANTAGES
        </span>
        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-serif text-white uppercase tracking-tight max-w-5xl font-light leading-tight">
          Why Choose <br />
          <span className="italic block text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-[#C8EB5F] to-emerald-300">TajweedPage.com?</span>
        </h2>
        <p className="mt-8 text-[10px] sm:text-xs text-neutral-450 uppercase tracking-[0.25em] max-w-md mx-auto leading-relaxed">
          A premium synthesis of qualified instructors, flexible schedules, and verified progress tracking.
        </p>
      </div>

      {sections.map((section) => (
        <TextParallaxContent
          key={section.id}
          imgUrl={section.imgUrl}
          subheading={section.subheading}
          heading={section.heading}
        >
          <ExampleContent
            p1={section.p1}
            p2={section.p2}
            accentColor={section.accentColor}
            heading={section.heading}
            onCtaclick={onCtaclick}
          />
        </TextParallaxContent>
      ))}
    </div>
  );
}
