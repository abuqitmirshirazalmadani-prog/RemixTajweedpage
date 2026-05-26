"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionTemplate } from "motion/react";
import type { HTMLMotionProps } from "motion/react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { PremiumMarquee } from "@/components/ui/premium-marquee";
import { NavigationHeader } from "@/components/ui/navigation-header";
import { Header } from "@/components/ui/header";
import { 
  ArrowLeft, 
  Check, 
  ChevronRight, 
  ChevronDown,
  Sparkles, 
  Compass, 
  Award, 
  Clock, 
  Calendar,
  Gift, 
  ShieldCheck, 
  BookOpen, 
  ArrowUpRight,
  User,
  Star,
  MessageSquare,
  HelpCircle,
  Menu,
  X,
  Mail,
  MapPin,
  CheckCircle2,
  Bookmark
} from "lucide-react";

interface ParallaxItemProps extends HTMLMotionProps<'div'> {
  start: number;
  end: number;
}

const Parallax = ({ className, ...props }: React.ComponentProps<'div'>) => {
  return (
    <div className={cn('relative min-h-dvh w-full', className)} {...props} />
  );
};

function PrallaxContainer({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div className={cn('px-6 md:px-12 min-h-screen', className)} {...props} />
  );
}

function ParallaxItem({
  start,
  end,
  className,
  style,
  ...props
}: ParallaxItemProps) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`${start}px end`, `end ${end * -1}px`],
  });

  const opacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.75, 1], [1, 0.85]);

  const y = useTransform(scrollYProgress, [0, 1], [start, end]);
  const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`;

  return (
    <motion.div
      className={className}
      ref={ref}
      style={{ transform, opacity, ...style }}
      {...props}
    />
  );
}

export default function KidsQuranClassesPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [hoveredFaq, setHoveredFaq] = useState<number | null>(null);
  const [hoveredTrustPoint, setHoveredTrustPoint] = useState<number | null>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [worldNavOpen, setWorldNavOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [modalBookingType, setModalBookingType] = useState("trial");
  const [modalBookingOpen, setModalBookingOpen] = useState(false);
  const [formData, setFormData] = useState({
    parentName: "",
    childName: "",
    childAge: "",
    level: "Beginner",
    phone: "",
    email: ""
  });

  useEffect(() => {
    if (typeof document === "undefined") return;
    const STYLE_ID = "bento3-animations";
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.innerHTML = `
      @keyframes bento3-reveal {
        0% { opacity: 0; transform: translate3d(0, 36px, 0) scale(0.97); filter: blur(12px); }
        60% { filter: blur(0); }
        100% { opacity: 1; transform: translate3d(0, 0, 0) scale(1); filter: blur(0); }
      }
      .bento3-root {
        min-height: 100svh;
        min-height: 100vh;
        padding-inline: clamp(1.25rem, 6vw, 4.5rem);
        padding-block: clamp(2.75rem, 6vw, 5rem);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .bento3-shell {
        display: grid;
        gap: clamp(2rem, 6vw, 3.5rem);
        grid-template-columns: repeat(2, minmax(0, 1fr));
        width: min(100%, 68rem);
        align-items: center;
      }
      .bento3-copy {
        display: flex;
        flex-direction: column;
        gap: clamp(1.5rem, 4vw, 2.5rem);
        align-items: flex-start;
        text-align: left;
        max-width: 32rem;
      }
      .bento3-lede {
        display: flex;
        flex-direction: column;
        gap: clamp(1rem, 3vw, 1.75rem);
      }
      .bento3-cta {
        display: flex;
        gap: clamp(1rem, 4vw, 1.5rem);
        flex-wrap: wrap;
        align-items: center;
        justify-content: flex-start;
      }
      .bento3-image {
        position: relative;
        border-radius: clamp(1.5rem, 4vw, 2.75rem);
        overflow: hidden;
        isolation: isolate;
        min-height: clamp(18rem, 40vw, 26rem);
        justify-self: end;
        width: 100%;
      }
      .bento3-image::before {
        content: "";
        position: absolute;
        inset: 0;
        background: linear-gradient(160deg, rgba(0,0,0,0.55), transparent 60%);
        mix-blend-mode: multiply;
      }
      .bento3-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .bento3-footnote {
        display: flex;
        gap: clamp(1.2rem, 4vw, 2rem);
        flex-wrap: wrap;
        font-size: 0.7rem;
        letter-spacing: 0.35em;
        text-transform: uppercase;
        align-items: center;
        justify-content: space-between;
      }
      @media (max-width: 1024px) {
        .bento3-shell {
          gap: clamp(1.75rem, 6vw, 3rem);
        }
      }
      @media (max-width: 860px) {
        .bento3-shell {
          grid-template-columns: 1fr;
          justify-items: center;
          text-align: center;
        }
        .bento3-copy {
          align-items: center;
          text-align: center;
          max-width: 38rem;
        }
        .bento3-cta {
          justify-content: center;
        }
        .bento3-stats {
          justify-items: center;
        }
        .bento3-image {
          order: -1;
          min-height: clamp(16rem, 60vw, 24rem);
          justify-self: center;
          width: min(100%, 32rem);
        }
      }
      @media (max-width: 640px) {
        .bento3-root {
          padding-inline: clamp(1rem, 8vw, 1.8rem);
          padding-block: clamp(2rem, 10vw, 4rem);
        }
        .bento3-cta {
          flex-direction: column;
          justify-content: center;
        }
        .bento3-footnote {
          letter-spacing: 0.28em;
          justify-content: center;
          text-align: center;
        }
      }
    `;
    document.head.appendChild(style);
    return () => {
      if (style.parentNode) style.remove();
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  // Faq list matching text details
  const faqData = [
    {
      q: "What age can children start Quran classes?",
      a: "Most children can begin Quran learning between the ages of 4–5 depending on their readiness and interest. We tailor our interaction style to match their unique psychological needs."
    },
    {
      q: "Are these Quran classes beginner-friendly?",
      a: "Yes. Our classes are specially designed for complete beginners and young children with supportive game-like visual cues."
    },
    {
      q: "Do you offer one-on-one Quran classes for kids?",
      a: "Yes. Personalized one-on-one sessions ensure your child learns comfortably, with 100% focused attention, avoiding negative peer pressure."
    },
    {
      q: "How long are the classes?",
      a: "Class duration depends on the selected plan and the child’s learning level, typically calibrated to sustain the young attention span."
    },
    {
      q: "Can parents track their child's progress?",
      a: "Yes. Parents receive regular lesson logbooks, progress reports, and WhatsApp updates regarding fluency milestones."
    },
    {
      q: "What do children learn besides Quran reading?",
      a: "Students also learn Noorani Qaida basic foundations, proper voice articulation (Makharij), short daily duas, authentic Islamic manners, and prayers."
    },
    {
      q: "Is a free trial available?",
      a: "Yes. Parents can instantly book a free trial lesson before formally committing to any payment model."
    }
  ];

  return (
    <main className="min-h-screen bg-[#000000] text-white selection:bg-[#C8EB5F] selection:text-black font-sans relative overflow-hidden">
      
      {/* BACKGROUND ATMOSPHERIC GRADIENTS • LUXURY MULTI-COLOR PHOTO VIBES */}
      <div className="absolute top-0 right-[-10%] w-[600px] h-[600px] bg-gradient-to-br from-[#C8EB5F]/5 via-amber-500/5 to-transparent rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-[40%] left-[-15%] w-[550px] h-[550px] bg-gradient-to-tr from-emerald-500/5 via-[#C8EB5F]/3 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-gradient-to-b from-blue-500/5 via-purple-500/5 to-transparent rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{ backgroundImage: "radial-gradient(ellipse at center, #ffffff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

      <NavigationHeader currentPage="kids-quran" />

      {/* ===================== SECTION 1: REDESIGNED CINEMATIC HERO REVEAL ===================== */}
      <section className="relative z-25 max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-32">
        {/* Background Ambient Spotlight Effects */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-32 top-32 h-96 w-96 rounded-full bg-[#C8EB5F]/5 blur-3xl"></div>
          <div className="absolute -right-32 top-48 h-80 w-80 rounded-full bg-emerald-500/5 blur-3xl"></div>
        </div>

        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-16 items-center">
          
          {/* Left Column Copy & Call to Action */}
          <div className="lg:col-span-7">
            
            {/* Elegant Upper pill badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#C8EB5F]/30 bg-[#C8EB5F]/10 px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider text-[#C8EB5F]">
              <Sparkles size={12} className="text-[#C8EB5F]" />
              Interactive Online Quran Learning for Children
            </div>

            {/* Title */}
            <h1 className="text-5xl sm:text-6xl lg:text-[76px] leading-[1.05] tracking-tight font-serif uppercase">
              Quran Classes
              <span className="block font-medium italic text-[#C8EB5F] mt-2 normal-case font-serif">
                for Kids
              </span>
            </h1>

            {/* Description Copy */}
            <p className="mt-6 max-w-xl text-base sm:text-lg text-neutral-300/90 font-sans leading-relaxed">
              Help your child learn the Holy Quran with confidence through engaging, beginner-friendly, and personalized Quran lessons designed specifically for children.
            </p>

            {/* Inline Checkmarks Checklist from the Kid Quran document */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3.5 max-w-xl pb-6 border-b border-white/5">
              {[
                { label: "Live One-on-One Classes", highlight: true },
                { label: "Kids-Friendly Quran Teachers", highlight: false },
                { label: "Interactive Learning System", highlight: false },
                { label: "Flexible Class Timings", highlight: false },
                { label: "Free Trial Class Available", highlight: true }
              ].map((tick, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className={`h-4.5 w-4.5 rounded-full flex items-center justify-center shrink-0 ${tick.highlight ? "bg-[#C8EB5F]/20 text-[#C8EB5F]" : "bg-emerald-500/10 text-emerald-400"}`}>
                    <Check size={10} strokeWidth={3} />
                  </div>
                  <span className="text-xs text-neutral-300 font-light">{tick.label}</span>
                </div>
              ))}
            </div>

            {/* CTAs matching rotated 3D layer design */}
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <a 
                href="#trial-booking" 
                className="group relative w-auto cursor-pointer select-none text-[11px] font-mono tracking-widest uppercase font-semibold text-black bg-[#C8EB5F] border-0 pt-3.5 pr-8 pb-3.5 pl-8 rotate-[-1.5deg] items-center justify-center rounded-full transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Book a Free Trial Class
                  <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
                <span aria-hidden="true" className="pointer-events-none absolute border border-black bottom-0.5 left-0.5 w-[calc(100%-1px)] h-[calc(100%-1px)] rounded-full"></span>
              </a>

              <button 
                onClick={() => {
                  setModalBookingType("demo");
                  setModalBookingOpen(true);
                }}
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-300 hover:text-[#C8EB5F] transition-colors cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-[#C8EB5F]">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polygon points="10 8 16 12 10 16 10 8"></polygon>
                </svg>
                <span>Watch Our Process</span>
              </button>
            </div>

            {/* Metrics aligned underneath buttons */}
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <div className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-[#C8EB5F]">
                  <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
                </svg>
                <div>
                  <p className="text-2xl tracking-tight font-medium font-serif text-white">4.9</p>
                  <span className="text-[10px] text-neutral-400 font-mono tracking-wide uppercase">from 1,200+ parent reviews</span>
                </div>
              </div>
              <div className="hidden sm:block h-8 w-px bg-white/10"></div>
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-[#C8EB5F]">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <p className="text-[11px] font-mono uppercase tracking-wider text-neutral-300">
                  Best Kids Program Rating
                </p>
              </div>
            </div>

          </div>

          {/* Right Column Visual Workspace Element (Zayd Live Classroom Stream) */}
          <div className="lg:col-span-5 relative">
            <div className="absolute inset-x-0 -top-12 bottom-12 bg-gradient-to-tr from-[#C8EB5F]/5 to-emerald-500/5 rounded-[44px] filter blur-3xl opacity-60 pointer-events-none" />
            
            <div className="relative w-full rounded-[38px] bg-[#090b0e] border border-white/10 p-6 sm:p-7 shadow-[0_24px_80px_rgba(0,0,0,0.85)] overflow-hidden group">
              {/* Subtle grid decoration */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
              
              {/* Header Status Bar of Virtual Classroom */}
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-5 font-mono">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-[9px] text-[#A1A1AA] uppercase tracking-widest">
                    SESSION LIVE_
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[9px] text-[#C8EB5F] bg-[#C8EB5F]/10 px-2.5 py-0.5 rounded-full border border-[#C8EB5F]/15 font-bold">
                  21.2ms LATENCY
                </div>
              </div>

              {/* Student active tracking and cards */}
              <div className="space-y-5">
                
                {/* Visual Video Stream with Zayd Khan */}
                <div className="relative h-44 w-full rounded-2xl overflow-hidden bg-black/60 border border-white/5 group-hover:border-[#C8EB5F]/20 transition-colors">
                  <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 text-[9px] tracking-widest font-mono flex items-center gap-1.5 text-neutral-300">
                    <User size={10} className="text-[#C8EB5F]" />
                    <span>ZAYD KHAN (7yo)</span>
                  </div>
                  <div className="absolute top-3 right-3 bg-red-500/80 px-2 py-0.5 rounded text-[8px] font-mono tracking-widest text-white uppercase font-bold animate-pulse">
                    REC
                  </div>

                  <img 
                    src="https://i.postimg.cc/FsTsDcz1/pexels-amirhadi-manavi-1074353688-29184016.jpg" 
                    alt="Zayd Khan Learning"
                    className="w-full h-full object-cover opacity-45 grayscale group-hover:scale-102 transition-transform duration-500 pointer-events-none"
                    referrerPolicy="no-referrer"
                  />

                  {/* Vocal tracker overlay */}
                  <div className="absolute bottom-3 left-3 right-3 bg-black/70 backdrop-blur-sm border border-white/5 px-3.5 py-2.5 rounded-xl flex items-center justify-between gap-4">
                    <div className="space-y-0.5">
                      <p className="text-[8px] text-neutral-500 font-mono tracking-widest">VOCAL TRACKER</p>
                      <p className="text-[10px] text-white font-mono tracking-wider font-semibold">Makharij Fine-tuning</p>
                    </div>
                    <div className="flex items-end gap-1 h-6">
                      <div className="w-1 bg-[#C8EB5F] rounded-full animate-[pulse_1s_infinite] h-4" />
                      <div className="w-1 bg-[#C8EB5F]/80 rounded-full animate-[pulse_1.2s_infinite] h-6" />
                      <div className="w-1 bg-emerald-500 rounded-full animate-[pulse_0.8s_infinite] h-2" />
                      <div className="w-1 bg-[#C8EB5F] rounded-full animate-[pulse_1.4s_infinite] h-5" />
                      <div className="w-1 bg-[#C8EB5F]/90 rounded-full animate-[pulse_1.1s_infinite] h-3" />
                    </div>
                  </div>
                </div>

                {/* Qaida board letter selection */}
                <div className="bg-black/40 border border-white/5 p-4 rounded-2xl relative">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[8px] font-mono tracking-widest text-[#A1A1AA] uppercase">
                      NOORANI QAIDA LETTER TRACKER
                    </span>
                    <span className="text-[8px] font-mono text-emerald-400">
                      LIVE FEEDBACK WINDOW
                    </span>
                  </div>

                  <div className="grid grid-cols-5 gap-2">
                    {[
                      { letter: "أ", name: "Alif", accent: "Throat Bottom" },
                      { letter: "ب", name: "Baa", accent: "Wet Lips" },
                      { letter: "ت", name: "Taa", accent: "Tip of Tongue" },
                      { letter: "ث", name: "Thaa", accent: "Tongue Teeth" },
                      { letter: "ج", name: "Jeem", accent: "Middle Tongue" }
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="py-2.5 rounded-xl border border-white/5 bg-[#14181f] text-center flex flex-col items-center justify-center h-14"
                        id={`letter-node-${idx}`}
                      >
                        <span className="text-lg font-serif text-white">{item.letter}</span>
                        <span className="text-[7px] text-neutral-500 font-mono tracking-tighter block mt-0.5">{item.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#10141b]/60 border border-white/5 p-4 rounded-xl flex flex-col justify-between h-24">
                    <span className="text-[8px] font-mono text-[#A1A1AA] tracking-widest uppercase">
                      FLUENCY INDEX
                    </span>
                    <div className="text-2xl font-serif text-[#C8EB5F] font-bold">
                      94% <span className="text-[9px] text-emerald-400 font-sans tracking-normal font-normal">▲ 12%</span>
                    </div>
                    <span className="text-[8px] text-neutral-500 font-mono font-light leading-none">Verified articulation score</span>
                  </div>

                  <div className="bg-[#10141b]/60 border border-white/5 p-4 rounded-xl flex flex-col justify-between h-24">
                    <span className="text-[8px] font-mono text-[#A1A1AA] tracking-widest uppercase">
                      LESSON STREAK
                    </span>
                    <div className="text-2xl font-serif text-white font-bold leading-normal">
                      4.8<span className="text-xs text-neutral-500 font-mono font-normal">/5wk</span>
                    </div>
                    <span className="text-[8px] text-[#C8EB5F] font-mono uppercase tracking-wide leading-none">Active student benchmark</span>
                  </div>
                </div>

              </div>
            </div>
            {/* Ambient detail text mimicking the coffee design's bottom text */}
            <p className="absolute -bottom-8 right-4 hidden lg:block text-right text-xs text-neutral-400 font-mono tracking-widest uppercase font-light">
              Makharij Pronunciation Engine Verified • 
            </p>
          </div>

        </div>

        <PremiumMarquee 
          items={[
            "Interactive Quran Classes for Kids",
            "Native Arab Scholar Tutors",
            "100% Live One-on-One Practical Lessons",
            "Flexible After-School Class Timings",
            "Easy Quran Lessons for Beginners",
            "Continuous Progress Reports & WhatsApp Updates"
          ]}
          speed="80s"
          variant="brand"
        />

        {/* ===================== BRAND ALIGNED TESTIMONIAL HORIZONTAL STRIP ===================== */}
        <div className="mt-20 rounded-3xl border border-white/5 bg-[#090b0e] backdrop-blur-sm [animation:fadeSlideIn_0.8s_ease-out_0.3s_both]">
          <div className="flex flex-col md:flex-row gap-6 px-8 py-6 items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 bg-[#C8EB5F] text-black font-semibold rounded-full flex items-center justify-center font-serif text-sm">
                A
              </div>
              <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed">
                "We noticed huge improvement in our daughter’s Quran reading confidence after only a few weeks." — 
                <span className="font-semibold text-white ml-1">Ayesha, Parent</span>
              </p>
            </div>
            <div className="hidden md:block h-8 w-px bg-white/10"></div>
            <div className="flex items-center gap-6 text-xs text-neutral-400 font-mono uppercase tracking-widest">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={13} className="text-[#C8EB5F]" />
                <span>Trusted by 1,200+ families</span>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* ===================== SECTION 2: AI SUMMARY BRIEF ===================== */}
      <section className="bg-[#050608] border-t border-b border-white/5 py-16 relative">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-4">
          <span className="text-[9px] tracking-[0.3em] font-mono text-[#C8EB5F] font-bold uppercase block">
            Executive Summary
          </span>
          <h2 className="text-2xl md:text-3.5xl font-light font-serif text-white uppercase tracking-wide">
            AI Program Digest
          </h2>
          <div className="h-[1px] w-20 bg-[#C8EB5F]/35 mx-auto" />
          <p className="text-neutral-450 text-xs sm:text-sm font-light leading-relaxed max-w-2xl mx-auto italic">
            "This page explains how TajweedPage.com helps children learn the Quran through interactive online Quran classes for kids focused on proper pronunciation, confidence building, and personalized learning."
          </p>
        </div>
      </section>

      {/* ===================== SECTION 3: IMPORTANCE & WHY CHOOSE US ===================== */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Aesthetic Photographic Banner */}
            <div className="lg:col-span-5 relative order-last lg:order-first">
              <div className="relative aspect-square w-full rounded-[36px] overflow-hidden border border-white/5 shadow-2xl group">
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 via-transparent to-[#C8EB5F]/10 z-10" />
                <img 
                  src="https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=600" 
                  alt="Quran reading with child comfort" 
                  className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-85 group-hover:scale-105 duration-700 transition-all pointer-events-none"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent duration-500 transition-colors" />
              </div>
            </div>

            {/* Right Text Box with values checklist */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4">
                <span className="text-[10px] tracking-[0.25em] font-mono text-[#C8EB5F] uppercase font-bold block">
                  vocalization foundations
                </span>
                <h2 className="text-3xl md:text-5.5xl font-light font-serif tracking-tight text-white uppercase leading-none">
                  Why Quran Learning <br />
                  Is Important for Kids
                </h2>
                <p className="text-neutral-450 text-xs sm:text-sm font-light leading-relaxed max-w-xl">
                  Teaching the Quran at an early age helps children build solid spiritual anchors, master immaculate pronunciation mechanics cleanly, and approach complex languages effortlessly.
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-white/5">
                {[
                  { title: "Build strong Islamic values", desc: "Instilling deep respect for sacred words and divine guidelines." },
                  { title: "Improve Quran reading skills", desc: "Refining visual acuity for Arabic script structure and vowel accents." },
                  { title: "Develop confidence in recitation", desc: "Overcoming speech hesitation through friendly, continuous live training." },
                  { title: "Learn discipline and consistency", desc: "Nurturing daily habits of structured study, focus, and progression." },
                  { title: "Strengthen connection with Islam", desc: "Connecting beautiful recitative melodies to immediate personal identity." }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-start" id={`why-quran-${idx}`}>
                    <div className="h-6 w-6 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-[#C8EB5F] mt-0.5 shrink-0">
                      <Bookmark size={11} className="fill-current" />
                    </div>
                    <div>
                      <h4 className="text-xs font-mono tracking-widest uppercase text-white font-bold">{item.title}</h4>
                      <p className="text-[11px] text-neutral-500 font-light mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-[#050608] border border-white/5 p-6 rounded-[22px] max-w-xl">
                <p className="text-[11px] text-[#C8EB5F] font-light leading-relaxed font-mono">
                  Our Quran classes for kids are designed to make learning simple, engaging, and comfortable for children of all ages.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ===================== SECTION 4: REDESIGNED WHAT CHILDREN LEARN (CINEMATIC PARALLAX REVEAL) ===================== */}
      <section className="bg-[#000000] py-28 relative overflow-hidden border-t border-b border-white/5">
        
        {/* Section Header */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center mb-20 space-y-4">
          <span className="text-[10px] tracking-[0.3em] font-mono text-[#C8EB5F] uppercase font-bold block">
            SYLLABUS ARCHITECTURE
          </span>
          <h2 className="text-4xl md:text-6xl font-serif text-white uppercase tracking-tight max-w-4xl mx-auto leading-none">
            What Children Learn In Our Quran Classes
          </h2>
          <p className="text-neutral-450 text-xs sm:text-sm font-mono max-w-md mx-auto tracking-wide uppercase">
            We leverage highly tactile learning aids and child-focused interactive charts to cover absolute basics through advanced levels.
          </p>
        </div>

        {/* 5 Cinematic Parallax Scroll Sections (One Unit per Section Scroll area) */}
        <div className="space-y-36">
          {[
            {
              title: "Basic Quran Reading",
              description: "Children learn how to recognize Arabic letters and read Quranic words correctly.",
              num: "LEARNING UNIT 01",
              photo: "https://i.postimg.cc/FsTsDcz1/pexels-amirhadi-manavi-1074353688-29184016.jpg",
              colors: "from-amber-400/20 to-transparent",
              stat: "105% PATIENT PACE"
            },
            {
              title: "Noorani Qaida Foundation",
              description: "Students build strong pronunciation skills through structured Noorani Qaida lessons.",
              photo: "https://i.postimg.cc/HWQtcWx4/pexels-zeynep-sude-emek-193601188-20784662.jpg",
              num: "LEARNING UNIT 02",
              colors: "from-[#C8EB5F]/20 to-transparent",
              stat: "STRONG ROOT PHONETICS"
            },
            {
              title: "Quran Pronunciation Improvement",
              description: "Teachers help children improve fluency and confidence while reading the Quran.",
              photo: "https://i.postimg.cc/Dz9q0RKf/pexels-omerderinyar-18387340.jpg",
              num: "LEARNING UNIT 03",
              colors: "from-blue-500/20 to-transparent",
              stat: "IMPECCABLE RECITATIVE CADENCE"
            },
            {
              title: "Daily Duas & Islamic Basics",
              description: "Kids learn important daily duas, Islamic manners, and foundational Islamic knowledge.",
              photo: "https://i.postimg.cc/htwmZNvG/pexels-saramazin-20037553.jpg",
              num: "LEARNING UNIT 04",
              colors: "from-purple-500/20 to-transparent",
              stat: "ADAB & MORAL CHARACTER"
            },
            {
              title: "Personalized Recitation Practice",
              description: "One-on-one classes allow teachers to focus on each child’s progress individually.",
              photo: "https://i.postimg.cc/4dGmrGgc/pexels-nour-alhoda-2151678059-33277944.jpg",
              num: "LEARNING UNIT 05",
              colors: "from-emerald-400/20 to-transparent",
              stat: "100% PERSONAL ARCHITECTURE"
            }
          ].map((unit, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <Parallax key={idx} className="relative py-16 flex items-center justify-center">
                
                {/* Visual Glow Spotlight behind each unit */}
                <div className={`absolute inset-0 bg-gradient-to-b ${unit.colors} opacity-10 pointer-events-none filter blur-3xl`} />

                <PrallaxContainer className="max-w-7xl mx-auto w-full">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
                    
                    {/* Image Column */}
                    <div className={`lg:col-span-6 ${isEven ? 'order-first' : 'lg:order-last'}`}>
                      <ParallaxItem 
                        start={40} 
                        end={-40}
                        className="relative aspect-[4/3] w-full rounded-[32px] overflow-hidden border border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.9)] group"
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
                        <img 
                          src={unit.photo} 
                          alt={unit.title}
                          className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-[1.03] duration-700 transition-all pointer-events-none"
                          referrerPolicy="no-referrer"
                        />
                        
                        {/* Status tag in the image */}
                        <div className="absolute top-6 left-6 z-20 bg-black/75 backdrop-blur-md border border-white/15 px-4 py-1.5 rounded-full">
                          <span className="text-[10px] font-mono text-[#C8EB5F] font-bold tracking-widest uppercase">
                            {unit.stat}
                          </span>
                        </div>
                      </ParallaxItem>
                    </div>

                    {/* Content Column */}
                    <div className="lg:col-span-6 space-y-6">
                      <ParallaxItem start={-30} end={30} className="space-y-6">
                        
                        {/* Number Indicator */}
                        <span className="text-xs font-mono tracking-[0.3em] text-neutral-500 uppercase block">
                          {unit.num}
                        </span>

                        {/* Title using beautiful serif typography - screams high elegance */}
                        <h3 className="text-4xl md:text-5xl font-serif font-light text-white leading-tight uppercase">
                          {unit.title}
                        </h3>

                        <div className="h-[1px] w-20 bg-[#C8EB5F]/40" />

                        {/* Description */}
                        <p className="text-neutral-300 text-sm md:text-base leading-relaxed font-light">
                          {unit.description}
                        </p>

                        <div className="pt-4">
                          <a 
                            href="#trial-booking" 
                            className="inline-flex items-center gap-2 group text-[11px] font-mono tracking-widest uppercase text-[#C8EB5F] hover:text-white transition-colors cursor-pointer"
                          >
                            <span>Explore curriculum module</span>
                            <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
                          </a>
                        </div>

                      </ParallaxItem>
                    </div>

                  </div>
                </PrallaxContainer>

              </Parallax>
            );
          })}
        </div>
      </section>

      {/* ===================== SECTION 5: REDESIGNED BENEFITS OF OUR CLINICAL METHODOLOGY ===================== */}
      <section className="bg-black py-32 relative overflow-hidden border-t border-b border-white/5">
        {/* Subtle grid backdrop */}
        <div
          className="absolute inset-0 -z-20 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px)
            `,
            backgroundSize: "22px 22px",
            backgroundPosition: "0 0, 0 0",
            maskImage: `
              repeating-linear-gradient(to right, black 0px, black 3px, transparent 3px, transparent 8px),
              repeating-linear-gradient(to bottom, black 0px, black 3px, transparent 3px, transparent 8px)
            `,
            WebkitMaskImage: `
              repeating-linear-gradient(to right, black 0px, black 3px, transparent 3px, transparent 8px),
              repeating-linear-gradient(to bottom, black 0px, black 3px, transparent 3px, transparent 8px)
            `,
            maskComposite: "intersect",
            WebkitMaskComposite: "source-in",
          }}
        />
        <div 
          className="absolute inset-0 -z-10 pointer-events-none" 
          style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.72) 45%, rgba(0,0,0,0.96) 100%)" }} 
        />

        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Main Container - styled as an exquisite elevated glass console card */}
          <div className="w-full bg-[#050608]/55 border border-white/10 rounded-[32px] p-6 sm:p-10 lg:p-16 shadow-[0_45px_100px_rgba(0,0,0,0.95)] flex flex-col gap-12">
            
            {/* Split layout inside the card: Left copy & benefits index, Right vertical cinematic cover image */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
              
              {/* Left Column (spans 7 cols on desktop): Content, pill badge, CTA and benefits */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-10">
                
                {/* Lede Title Section */}
                <div className="space-y-6">
                  <div className="inline-flex w-fit items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[10px] uppercase tracking-[0.45em] text-white/85">
                    OPTIMIZED ENGAGEMENT
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-4xl md:text-5.5xl font-light font-serif tracking-tight text-white uppercase leading-none">
                      Benefits of Our Quran Classes for Kids
                    </h2>
                    <p className="max-w-lg text-xs font-mono tracking-wide uppercase leading-relaxed text-[#C8EB5F]">
                      We design every lesson around patience, tactile milestones, and pure pronunciation accuracy, keeping children engaged under professional guidance.
                    </p>
                  </div>
                </div>

                {/* Grid of 5 benefits with robust individual card containers */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                  {[
                    {
                      title: "Interactive Learning",
                      description: "Our classes are designed to keep children engaged through friendly teaching methods and live interaction.",
                      stat: "PROTRACTED INTERACTION",
                      icon: HelpCircle
                    },
                    {
                      title: "Beginner-Friendly",
                      description: "Perfect for children starting Quran learning for the first time.",
                      stat: "ZERO BASE ENTRY",
                      icon: BookOpen
                    },
                    {
                      title: "Safe Environment",
                      description: "Professional teachers create a positive and respectful learning atmosphere for children.",
                      stat: "SECURE SPACE",
                      icon: ShieldCheck
                    },
                    {
                      title: "Flexible Scheduling",
                      description: "Parents can choose convenient class timings based on their child’s routine.",
                      stat: "TIMING FLEX",
                      icon: Calendar
                    },
                    {
                      title: "Confidence Building",
                      description: "Children gradually become more confident in Quran reading and pronunciation.",
                      stat: "CONFIDENCE INDEX",
                      icon: Award
                    }
                  ].map((item, idx) => {
                    const IconComponent = item.icon;
                    return (
                      <div 
                        key={idx} 
                        className="border border-white/5 bg-white/[0.015] rounded-2xl p-5 space-y-3 hover:border-[#C8EB5F]/20 hover:bg-white/[0.03] transition-all duration-300"
                        id={`benefit-badge-item-${idx}`}
                      >
                        <div className="flex items-center gap-2">
                          <IconComponent size={14} className="text-[#C8EB5F]" />
                          <span className="text-[9px] font-mono text-neutral-500 tracking-widest uppercase block">{item.stat}</span>
                        </div>
                        <h4 className="font-serif text-[14px] text-white uppercase tracking-wider">{item.title}</h4>
                        <p className="text-neutral-400 text-xs font-light leading-relaxed">{item.description}</p>
                      </div>
                    );
                  })}
                </div>

                {/* CTA booking triggers */}
                <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-white/5">
                  <button
                    type="button"
                    onClick={() => {
                      setModalBookingType("trial");
                      setModalBookingOpen(true);
                    }}
                    className="rounded-full border border-[#C8EB5F] bg-[#C8EB5F] text-black px-8 py-4 text-xs font-mono tracking-widest uppercase hover:bg-black hover:text-[#C8EB5F] hover:border-white/20 transition duration-300 cursor-pointer"
                  >
                    Schedule Free Trial
                  </button>
                  <p className="text-[10px] text-neutral-500 font-mono tracking-widest uppercase">
                    NO CREDIT CARD REQUIRED. CANCEL ANYTIME.
                  </p>
                </div>

              </div>

              {/* Right Column (spans 5 cols on desktop): High-end Vertical Showcase Image */}
              <div className="lg:col-span-5 relative min-h-[400px] lg:min-h-full rounded-2xl overflow-hidden border border-white/10 group shadow-[0_25px_70px_rgba(0,0,0,0.9)]">
                {/* Cinematic dark mask overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-0 bg-black/15 z-10 pointer-events-none mix-blend-overlay" />
                
                <img 
                  src="https://i.postimg.cc/htwmZNvG/pexels-saramazin-20037553.jpg" 
                  alt="Interactive Child Learning Quran" 
                  loading="lazy" 
                  className="absolute inset-0 w-full h-full object-cover grayscale opacity-55 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-700 pointer-events-none"
                  referrerPolicy="no-referrer"
                />

                {/* Floating tags */}
                <div className="absolute top-6 left-6 z-20 bg-black/80 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full">
                  <span className="text-[10px] font-mono text-[#C8EB5F] font-bold tracking-widest uppercase">
                    STUDENT PROGRESSION LIVE
                  </span>
                </div>

                <div className="absolute bottom-6 left-6 right-6 z-20 space-y-2 text-left bg-black/60 p-5 rounded-xl backdrop-blur-sm border border-white/5">
                  <span className="text-[10px] font-mono text-[#C8EB5F] tracking-widest block uppercase font-bold">CASE STUDY 04</span>
                  <p className="font-serif text-sm text-white leading-snug uppercase">
                    Patience-first phonetics instruction for kids ages 5–12.
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* Footnote matching user layout style */}
          <div className="max-w-7xl mx-auto mt-12 text-neutral-500 flex flex-wrap justify-between items-center text-[10px] tracking-[0.3em] font-mono uppercase px-2 gap-4">
            <span>MONOCHROME INTUITIVE FLOW_</span>
            <span>TAJWEEDPAGE RECITATION METHODOLOGY</span>
          </div>

        </div>
      </section>

      {/* ===================== SECTION 6: WHY PARENTS TRUST TAJWEEDPAGE ===================== */}
      <section className="py-32 bg-black border-t border-b border-white/5 relative overflow-hidden">
        {/* Decorative Grid and Background elements matching the premium brand design */}
        <div
          className="absolute inset-0 -z-20 pointer-events-none opacity-40"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px)
            `,
            backgroundSize: "22px 22px",
            backgroundPosition: "0 0, 0 0",
            maskImage: `
              repeating-linear-gradient(to right, black 0px, black 3px, transparent 3px, transparent 8px),
              repeating-linear-gradient(to bottom, black 0px, black 3px, transparent 3px, transparent 8px)
            `,
            WebkitMaskImage: `
              repeating-linear-gradient(to right, black 0px, black 3px, transparent 3px, transparent 8px),
              repeating-linear-gradient(to bottom, black 0px, black 3px, transparent 3px, transparent 8px)
            `,
            maskComposite: "intersect",
            WebkitMaskComposite: "source-in",
          }}
        />

        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Left Column (spans 7 cols on desktop): Expanding Interactive Bracket list */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4">
                <span className="text-[10px] tracking-[0.25em] font-mono text-[#C8EB5F] uppercase font-bold block">
                  ACADEMIC SANCTUARY
                </span>
                <h2 className="text-3xl md:text-5.5xl font-light font-serif tracking-tight text-white uppercase leading-none">
                  Why Parents Choose <br />
                  <span className="text-[#C8EB5F]">TajweedPage.com</span>
                </h2>
                <p className="text-neutral-400 text-xs sm:text-sm font-light leading-relaxed">
                  We bridge the gap between complex classical phonetics and young, curious minds, ensuring regular feedback loop reports, deep transparency, and patient alignment.
                </p>
              </div>

              {/* Redesigned interactive category lists */}
              <div className="space-y-3 pt-6 border-t border-white/5">
                {[
                  {
                    title: "Experienced Quran Teachers for Children",
                    description: "Our tutors specialize in teaching young students patiently and effectively.",
                    icon: "🎓"
                  },
                  {
                    title: "One-on-One Personalized Attention",
                    description: "Each child receives focused guidance to improve faster.",
                    icon: "🎯"
                  },
                  {
                    title: "Progress Tracking & Parent Updates",
                    description: "Parents receive regular updates about lesson progress and recitation improvement.",
                    icon: "📊"
                  },
                  {
                    title: "Interactive & Child-Friendly Teaching Style",
                    description: "We make Quran learning enjoyable instead of stressful.",
                    icon: "🧸"
                  },
                  {
                    title: "Structured Learning Plans",
                    description: "Step-by-step lessons help children stay motivated and consistent.",
                    icon: "🗺️"
                  }
                ].map((item, idx) => {
                  const isHovered = hoveredTrustPoint === idx;
                  return (
                    <div
                      key={idx}
                      className="relative group transition-all duration-300 ease-in-out cursor-pointer"
                      onMouseEnter={() => setHoveredTrustPoint(idx)}
                      onMouseLeave={() => setHoveredTrustPoint(null)}
                      id={`benefit-bracket-point-${idx}`}
                    >
                      <div
                        className={cn(
                          "relative overflow-hidden border transition-all duration-500 ease-in-out rounded-2xl p-6",
                          isHovered
                            ? "min-h-[148px] md:min-h-[128px] border-[#C8EB5F] shadow-[0_15px_40px_rgba(200,235,95,0.06)] bg-white/[0.02]"
                            : "min-h-[76px] border-white/5 bg-[#090b0e]/30 hover:border-white/15"
                        )}
                      >
                        {/* Corner brackets that appear on hover */}
                        {isHovered && (
                          <>
                            <div className="absolute top-3.5 left-3.5 w-6 h-6 pointer-events-none">
                              <div className="absolute top-0 left-0 w-4 h-[1.5px] bg-[#C8EB5F]" />
                              <div className="absolute top-0 left-0 w-[1.5px] h-4 bg-[#C8EB5F]" />
                            </div>
                            <div className="absolute bottom-3.5 right-3.5 w-6 h-6 pointer-events-none">
                              <div className="absolute bottom-0 right-0 w-4 h-[1.5px] bg-[#C8EB5F]" />
                              <div className="absolute bottom-0 right-0 w-[1.5px] h-4 bg-[#C8EB5F]" />
                            </div>
                          </>
                        )}

                        <div className="flex items-start justify-between gap-4 h-full">
                          <div className="flex gap-4 items-start flex-1 h-full">
                            <span className={cn(
                              "font-mono text-[10px] font-bold px-2.5 py-1 rounded-full shrink-0 transition-colors duration-350",
                              isHovered ? "text-black bg-[#C8EB5F]" : "text-[#C8EB5F] bg-[#C8EB5F]/10"
                            )}>
                              0{idx + 1}
                            </span>
                            <div className="space-y-1 h-full flex flex-col justify-center">
                              <h3
                                className={cn(
                                  "font-serif text-sm md:text-base font-light uppercase tracking-wider transition-colors duration-350",
                                  isHovered ? "text-[#C8EB5F]" : "text-neutral-200"
                                )}
                              >
                                {item.title}
                              </h3>
                              
                              <p
                                className={cn(
                                  "transition-all duration-500 text-xs leading-relaxed font-light text-neutral-400 overflow-hidden",
                                  isHovered ? "opacity-100 max-h-40 mt-3" : "opacity-0 max-h-0"
                                )}
                              >
                                {item.description}
                              </p>
                            </div>
                          </div>

                          {/* Icon marker that shifts scale */}
                          <div className={cn(
                            "text-base transition-all duration-500 shrink-0",
                            isHovered ? "scale-125 rotate-6 filter grayscale-0 opacity-100" : "grayscale opacity-25"
                          )}>
                            {item.icon}
                          </div>

                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column (spans 5 cols on desktop): Redesigned Checklist Card with Scrolling Task Loop */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#090b0e] to-black border border-white/5 rounded-[36px] p-8 md:p-10 relative overflow-hidden self-start shadow-[0_45px_100px_rgba(0,0,0,0.95)]">
              <div className="absolute top-0 right-[-10%] w-44 h-44 bg-[#C8EB5F]/5 rounded-full blur-3xl pointer-events-none" />
              
              <div className="space-y-8">
                
                {/* Header with custom capsule badge matching old money style */}
                <div className="space-y-3">
                  <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[9px] uppercase tracking-[0.35em] text-white/70">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#C8EB5F] animate-pulse" />
                    Interactive Platform
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-serif text-white uppercase leading-tight">
                    Features of Kids Program
                  </h3>
                  <p className="text-neutral-400 text-xs font-light leading-relaxed">
                    We help your children build strong recitation skills with automated tracking, live one-on-one video link instruction, and custom-tailored milestones.
                  </p>
                </div>

                {/* Visual automated scrolling live tasks window */}
                <div className="relative w-full rounded-2xl overflow-hidden bg-black/45 border border-white/5 h-[240px]">
                  <div className="relative h-full overflow-hidden">
                    {/* Motion list scrolling infinitely */}
                    <motion.div
                      className="flex flex-col gap-2.5 absolute w-full p-3.5"
                      animate={{ y: ["0%", "-50%"] }}
                      transition={{
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 16,
                        ease: "linear",
                      }}
                    >
                      {[
                        { title: "Live Online Quran Classes", subtitle: "Patient male & female expert coaches", icon: <BookOpen size={13} /> },
                        { title: "One-on-One Live Attention", subtitle: "Focused speed customized for kids", icon: <Award size={13} /> },
                        { title: "Tactile Noorani Qaida", subtitle: "Interactive step-by-step guidance", icon: <Compass size={13} /> },
                        { title: "Diagnostic Progress Logs", subtitle: "Weekly articulation accuracy report", icon: <ShieldCheck size={13} /> },
                        { title: "Flexible Class Timings", subtitle: "Convenient slots matching kids routine", icon: <Clock size={13} /> },
                        // Duplicate for infinite carousel feel
                        { title: "Live Online Quran Classes", subtitle: "Patient male & female expert coaches", icon: <BookOpen size={13} /> },
                        { title: "One-on-One Live Attention", subtitle: "Focused speed customized for kids", icon: <Award size={13} /> },
                        { title: "Tactile Noorani Qaida", subtitle: "Interactive step-by-step guidance", icon: <Compass size={13} /> },
                        { title: "Diagnostic Progress Logs", subtitle: "Weekly articulation accuracy report", icon: <ShieldCheck size={13} /> },
                        { title: "Flexible Class Timings", subtitle: "Convenient slots matching kids routine", icon: <Clock size={13} /> }
                      ].map((task, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-3 p-3 bg-white/[0.01] hover:bg-white/[0.02] border border-white/5 rounded-xl justify-between transition-colors duration-150"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-7 h-7 bg-white/5 rounded-lg flex items-center justify-center text-neutral-400 border border-white/10 shrink-0 font-mono text-[9px]">
                              0{i >= 5 ? i - 4 : i + 1}
                            </div>
                            <div className="text-left">
                              <p className="text-xs font-serif text-white uppercase tracking-wider leading-none mb-1">{task.title}</p>
                              <p className="text-[10px] text-neutral-500 font-light leading-none">{task.subtitle}</p>
                            </div>
                          </div>
                          <div className="text-[#C8EB5F] shrink-0 opacity-70">
                            {task.icon}
                          </div>
                        </div>
                      ))}
                    </motion.div>

                    {/* Fades for smooth window effect */}
                    <div className="absolute top-0 left-0 w-full h-10 bg-gradient-to-b from-black via-black/55 to-transparent pointer-events-none z-10" />
                    <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-black via-black/55 to-transparent pointer-events-none z-10" />
                  </div>
                </div>

                {/* Luxury high money category badge capsules */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                  <span className="bg-white/5 border border-white/10 text-white/80 rounded-full px-3 py-1 text-[9px] font-mono tracking-widest uppercase">
                    LIVE AUTOMATION
                  </span>
                  <span className="bg-[#C8EB5F]/10 border border-[#C8EB5F]/20 text-[#C8EB5F] rounded-full px-3 py-1 text-[9px] font-mono tracking-widest uppercase animate-pulse">
                    ONE-ON-ONE RATE
                  </span>
                  <span className="bg-white/5 border border-white/10 text-white/80 rounded-full px-3 py-1 text-[9px] font-mono tracking-widest uppercase">
                    DIAGNOSTICS
                  </span>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ===================== SECTION 7: WHO ARE THESE CLASSES FOR? ===================== */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <div className="space-y-6">
              <span className="text-[10px] tracking-[0.25em] font-mono text-[#C8EB5F] uppercase font-bold block">
                AUDIENCE SEGMENTATION
              </span>
              <h2 className="text-3xl md:text-5.5xl font-light font-serif tracking-tight text-white uppercase leading-none">
                Who Are These <br />
                <span className="text-[#C8EB5F]">Classes For?</span>
              </h2>
              <p className="text-neutral-450 text-xs sm:text-sm font-light leading-relaxed max-w-lg">
                We make it extremely easy to accommodate various needs and spiritual backgrounds. Our system fits beautifully into diverse student stages.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: "Beginners", desc: "For children taking their very first steps into Arabic vowel articulation." },
                { title: "Young children", desc: "Tuned nicely for tiny playful minds who need supportive gameplay loops." },
                { title: "Students learning Quran reading", desc: "For steady progress from literal letters to complete structural verses." },
                { title: "Kids needing pronunciation improvement", desc: "Correcting heavy consonants and micro throat movements patience-first." },
                { title: "Muslim families seeking structured Quran education", desc: "Fostering absolute consistency, schedule safety, and detailed logs." }
              ].map((audience, idx) => (
                <div 
                  key={idx} 
                  className={`bg-[#090b0e] border border-white/5 rounded-2xl p-6 space-y-2 hover:border-[#C8EB5F]/20 transition-all ${idx === 4 ? "sm:col-span-2" : ""}`}
                >
                  <h4 className="font-serif text-sm font-semibold tracking-wide text-[#C8EB5F] uppercase">{audience.title}</h4>
                  <p className="text-[11px] text-neutral-500 font-light leading-relaxed">{audience.desc}</p>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* ===================== SECTION 8: PARENT TESTIMONIALS (FINE ART) ===================== */}
      <section className="py-32 bg-black border-t border-b border-white/5 relative overflow-hidden">
        {/* Subtle grid backdrop matching the premium template design */}
        <div
          className="absolute inset-0 -z-20 pointer-events-none opacity-40"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px)
            `,
            backgroundSize: "22px 22px",
            backgroundPosition: "0 0, 0 0",
            maskImage: `
              repeating-linear-gradient(to right, black 0px, black 3px, transparent 3px, transparent 8px),
              repeating-linear-gradient(to bottom, black 0px, black 3px, transparent 3px, transparent 8px)
            `,
            WebkitMaskImage: `
              repeating-linear-gradient(to right, black 0px, black 3px, transparent 3px, transparent 8px),
              repeating-linear-gradient(to bottom, black 0px, black 3px, transparent 3px, transparent 8px)
            `,
            maskComposite: "intersect",
            WebkitMaskComposite: "source-in",
          }}
        />
        
        {/* Dynamic green neon fluid blur circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-[#C8EB5F]/5 rounded-full blur-[150px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          
          {/* Header styled exactly to match the elite luxury aesthetic */}
          <div className="text-center mb-16 relative">
            <div className="mb-6">
              <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-[0.35em] text-[#C8EB5F] font-bold">
                <span>VALIDATED FEEDBACK</span>
                <span>(03)</span>
              </div>
              <div className="mt-4 h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
            </div>

            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-0 gap-6 text-left">
              <div>
                <h2 className="text-4xl md:text-5.5xl text-white font-light font-serif tracking-tight uppercase leading-none">
                  Parent Testimonials
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-neutral-400 max-w-sm font-light leading-relaxed">
                Read authentic feedback directly from parents whose children undergo standard weekly progress reports.
              </p>
            </div>
          </div>

          {/* Testimonial Section - beautiful modular glass card layout */}
          <div className="overflow-hidden p-6 sm:p-12 md:p-16 border border-white/10 bg-gradient-to-br from-white/[0.02] to-transparent rounded-[32px] relative backdrop-blur shadow-[0_45px_100px_rgba(0,0,0,0.95)]" style={{ minHeight: "440px" }} id="parent-testimonials-card">
            <div 
              className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(255, 255, 255, 0.12) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(255, 255, 255, 0.12) 1px, transparent 1px)
                `,
                backgroundSize: "64px 64px"
              }}
            />
            {/* Dynamic decorative blur points */}
            <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-[#C8EB5F]/5 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-emerald-500/5 blur-3xl" />

            <div className="absolute top-6 left-6 opacity-10 text-white pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 sm:w-16 sm:h-16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
                <path d="M7 7h3v10H5V9a2 2 0 0 1 2-2Zm9 0h3v10h-5V9a2 2 0 0 1 2-2Z"></path>
              </svg>
            </div>

            <div className="flex flex-col justify-between h-full space-y-12">
              <div className="relative text-center max-w-4xl mx-auto flex-1 flex flex-col items-center justify-center min-h-[160px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTestimonial}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="space-y-6"
                  >
                    <div className="flex justify-center gap-1.5 text-[#C8EB5F]">
                      {[...Array(5)].map((_, i) => <Star key={i} size={11} className="fill-current" />)}
                    </div>
                    
                    <p className="text-xl sm:text-2xl md:text-3xl leading-relaxed font-serif font-light text-white tracking-wide max-w-3xl block mx-auto">
                      &ldquo;{[
                        "My son enjoys every class at TajweedPage.com. The teachers are patient, interactive, and make Quran learning easy for children.",
                        "We noticed huge improvement in our daughter’s Quran reading confidence after only a few weeks.",
                        "The personalized attention and progress updates give us peace of mind as parents."
                      ][activeTestimonial]}&rdquo;
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Author & selection indicator */}
              <div className="space-y-10">
                <div className="text-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTestimonial}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <p className="text-sm sm:text-base text-white font-serif tracking-wider font-semibold">
                        {[
                          "Usama",
                          "Ayesha",
                          "Fatima"
                        ][activeTestimonial]}
                      </p>
                      <p className="text-[10px] sm:text-xs text-neutral-500 font-mono uppercase tracking-[0.2em] mt-1">
                        {[
                          "Parent of 7yo Student",
                          "Parent of 9yo Student",
                          "Parent of two Kids"
                        ][activeTestimonial]}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Avatar links lineup */}
                <div className="flex items-center justify-center gap-4 sm:gap-6">
                  {[
                    { avatar: "U", color: "from-[#C8EB5F]/90 to-emerald-600/90" },
                    { avatar: "A", color: "from-teal-400/90 to-[#C8EB5F]/90" },
                    { avatar: "F", color: "from-[#C8EB5F]/90 to-amber-500/90" }
                  ].map((item, idx) => {
                    const isActive = activeTestimonial === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => setActiveTestimonial(idx)}
                        className={cn(
                          "relative rounded-full font-mono text-sm font-bold flex items-center justify-center transition-all duration-300 cursor-pointer shrink-0 outline-none ",
                          isActive
                            ? "h-14 w-14 sm:h-16 sm:w-16 ring-2 ring-[#C8EB5F]/50 shadow-lg scale-110"
                            : "h-11 w-11 sm:h-13 sm:w-13 ring-1 ring-white/10 opacity-30 grayscale hover:opacity-60"
                        )}
                        id={`avatar-indicator-${idx}`}
                      >
                        {/* Smooth active neon background indicator */}
                        <div className={cn(
                          "absolute inset-px rounded-full bg-gradient-to-tr flex items-center justify-center text-black z-10 transition-colors duration-300 font-bold",
                          item.color
                        )}>
                          {item.avatar}
                        </div>
                        {isActive && (
                          <span className="absolute -inset-1 rounded-full border border-[#C8EB5F]/40 animate-ping opacity-30" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ===================== SECTION 9: FREQUENTLY ASKED QUESTIONS (ACCORDION) ===================== */}
      <section className="py-32 relative overflow-hidden bg-black border-t border-b border-white/5">
        {/* Subtle grid backdrop matching the premium brand design */}
        <div
          className="absolute inset-0 -z-20 pointer-events-none opacity-40"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px)
            `,
            backgroundSize: "22px 22px",
            backgroundPosition: "0 0, 0 0",
            maskImage: `
              repeating-linear-gradient(to right, black 0px, black 3px, transparent 3px, transparent 8px),
              repeating-linear-gradient(to bottom, black 0px, black 3px, transparent 3px, transparent 8px)
            `,
            WebkitMaskImage: `
              repeating-linear-gradient(to right, black 0px, black 3px, transparent 3px, transparent 8px),
              repeating-linear-gradient(to bottom, black 0px, black 3px, transparent 3px, transparent 8px)
            `,
            maskComposite: "intersect",
            WebkitMaskComposite: "source-in",
          }}
        />

        <div className="max-w-4xl mx-auto px-6">
          
          {/* Header styled to match Nura and kids program luxury aesthetics */}
          <div className="text-center space-y-4 mb-20">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[9px] uppercase tracking-[0.35em] text-[#C8EB5F] font-bold">
              <span className="h-1.5 w-1.5 rounded-full bg-[#C8EB5F] animate-pulse" />
              ACADEMIC RESOLUTIONS
            </div>
            <h2 className="text-3xl md:text-5.5xl font-light font-serif tracking-tight text-white uppercase leading-none">
              Frequently Asked Questions
            </h2>
            <p className="max-w-md mx-auto text-xs text-neutral-400 font-light leading-relaxed">
              Find transparent resolutions regarding schedules, curriculum alignments, and interactive digital setup below.
            </p>
          </div>

          {/* Accordion List with Corner-Brackets and Premium Animations */}
          <div className="space-y-4">
            {faqData.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              const isHovered = hoveredFaq === idx;
              return (
                <div 
                  key={idx}
                  className="relative group transition-all duration-300"
                  onMouseEnter={() => setHoveredFaq(idx)}
                  onMouseLeave={() => setHoveredFaq(null)}
                  id={`faq-item-redesign-${idx}`}
                >
                  <div
                    className={cn(
                      "relative overflow-hidden border transition-all duration-500 ease-in-out rounded-2xl",
                      isOpen || isHovered
                        ? "border-[#C8EB5F] bg-white/[0.02] shadow-[0_15px_40px_rgba(200,235,95,0.06)]"
                        : "border-white/5 bg-[#090b0e]/30 hover:border-white/15"
                    )}
                  >
                    {/* Corner brackets that appear on hover or when open */}
                    {(isOpen || isHovered) && (
                      <>
                        <div className="absolute top-3.5 left-3.5 w-6 h-6 pointer-events-none">
                          <div className="absolute top-0 left-0 w-4 h-[1.5px] bg-[#C8EB5F]" />
                          <div className="absolute top-0 left-0 w-[1.5px] h-4 bg-[#C8EB5F]" />
                        </div>
                        <div className="absolute bottom-3.5 right-3.5 w-6 h-6 pointer-events-none">
                          <div className="absolute bottom-0 right-0 w-4 h-[1.5px] bg-[#C8EB5F]" />
                          <div className="absolute bottom-0 right-0 w-[1.5px] h-4 bg-[#C8EB5F]" />
                        </div>
                      </>
                    )}

                    {/* Trigger button */}
                    <button
                      type="button"
                      onClick={() => setActiveFaq(isOpen ? null : idx)}
                      className="w-full text-left px-8 py-6 flex items-center justify-between gap-6 select-none cursor-pointer outline-none"
                    >
                      <div className="flex items-center gap-4">
                        <span className={cn(
                          "font-mono text-[10px] tracking-wider font-bold px-2.5 py-1 rounded-full shrink-0 transition-all duration-300",
                          isOpen || isHovered
                            ? "text-black bg-[#C8EB5F]"
                            : "text-[#C8EB5F] bg-[#C8EB5F]/10"
                        )}>
                          0{idx + 1}
                        </span>
                        <h3 className={cn(
                          "font-serif text-sm sm:text-base font-light uppercase tracking-wide transition-colors duration-300 pr-2",
                          isOpen ? "text-[#C8EB5F]" : "text-white group-hover:text-[#C8EB5F]"
                        )}>
                          {faq.q}
                        </h3>
                      </div>
                      
                      <div className={cn(
                        "h-7 w-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-500 border border-white/10 bg-white/5",
                        isOpen
                          ? "rotate-180 border-[#C8EB5F]/30 bg-[#C8EB5F]/10 text-[#C8EB5F]"
                          : "text-neutral-400"
                      )}>
                        <ChevronDown size={13} />
                      </div>
                    </button>
                    
                    {/* Smooth expanding content block */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                        >
                          <div className="px-8 pb-7 pt-2 text-[#C8EB5F]/90">
                            <div className="h-[1px] w-full bg-white/5 mb-5" />
                            <p className="text-neutral-400 text-xs sm:text-sm font-light leading-relaxed pl-12 max-w-2xl">
                              {faq.a}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ===================== SECTION 10: PREMIUM BOOKING BANNER/TRIAL REGISTRATION ===================== */}
      <section id="trial-booking" className="py-32 bg-[#050608] border-t border-b border-white/5 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            <div className="lg:col-span-6 space-y-8">
              <div className="space-y-4">
                <span className="text-[10px] tracking-[0.25em] font-mono text-[#C8EB5F] uppercase font-bold block">
                  GUARANTEED INITIATION
                </span>
                <h2 className="text-3xl md:text-5.5xl font-light font-serif tracking-tight text-white uppercase leading-none">
                  Start Your Child’s <br />
                  <span className="text-[#C8EB5F]">Quran Journey Today</span>
                </h2>
                <p className="text-neutral-450 text-xs sm:text-sm font-light leading-relaxed max-w-lg">
                  Help your child build confidence in Quran reading through interactive and personalized online Quran lessons designed for young learners.
                </p>
              </div>

              {/* Ticks checklist */}
              <div className="space-y-4 max-w-md pt-4 border-t border-white/5">
                {[
                  "Beginner-Friendly Classes",
                  "Interactive Teaching",
                  "Professional Quran Tutors",
                  "Flexible Scheduling"
                ].map((tc, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="h-5 w-5 rounded-full bg-[#C8EB5F]/10 flex items-center justify-center text-[#C8EB5F]">
                      <Check size={11} strokeWidth={3} />
                    </div>
                    <span className="text-xs text-neutral-300 font-light">{tc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* HIGH-END INTERACTIVE BOOKING FORM CARD */}
            <div className="lg:col-span-6">
              <div className="bg-[#090b0e] border border-white/5 rounded-[36px] p-8 md:p-10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#C8EB5F] to-emerald-500" />
                
                {formSubmitted ? (
                  <div className="py-12 text-center space-y-4 animate-fade-in">
                    <div className="h-16 w-16 bg-[#C8EB5F]/10 rounded-full flex items-center justify-center mx-auto text-[#C8EB5F] animate-bounce">
                      <Sparkles size={28} />
                    </div>
                    <h3 className="font-serif text-2xl text-white uppercase">Trial Registered Successfully!</h3>
                    <p className="text-xs text-neutral-400 font-light leading-relaxed max-w-sm mx-auto">
                      Thank you for trusting TajweedPage.com. An academic coordinator will contact you directly over WhatsApp or Email on <span className="text-[#C8EB5F] font-mono">{formData.email}</span> to select your child's first demo timing.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[9px] tracking-widest font-mono text-neutral-500 uppercase block mb-2">Parent's Name</label>
                        <input
                          type="text"
                          name="parentName"
                          required
                          value={formData.parentName}
                          onChange={handleInputChange}
                          placeholder="e.g. Usama Khan"
                          className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#C8EB5F] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="text-[9px] tracking-widest font-mono text-neutral-500 uppercase block mb-2">Child's Name</label>
                        <input
                          type="text"
                          name="childName"
                          required
                          value={formData.childName}
                          onChange={handleInputChange}
                          placeholder="e.g. Zayd"
                          className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#C8EB5F] transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[9px] tracking-widest font-mono text-neutral-500 uppercase block mb-2">Child's Age</label>
                        <input
                          type="text"
                          name="childAge"
                          required
                          value={formData.childAge}
                          onChange={handleInputChange}
                          placeholder="e.g. 7 years old"
                          className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#C8EB5F] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="text-[9px] tracking-widest font-mono text-neutral-500 uppercase block mb-2">Current Level</label>
                        <select
                          name="level"
                          value={formData.level}
                          onChange={handleInputChange}
                          className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#C8EB5F] transition-colors"
                        >
                          <option value="Beginner">Beginner (Noorani Qaida)</option>
                          <option value="Intermediate">Intermediate (Reads Quran)</option>
                          <option value="Advanced">Advanced (Tajweed Memorization)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-[9px] tracking-widest font-mono text-neutral-500 uppercase block mb-2">Contact WhatsApp / Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="e.g. +1 (312) 420 9000"
                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#C8EB5F] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-[9px] tracking-widest font-mono text-neutral-500 uppercase block mb-2">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="e.g. parent@domain.com"
                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#C8EB5F] transition-colors"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full bg-white text-black hover:bg-[#C8EB5F] hover:text-black font-semibold text-xs tracking-widest font-mono uppercase py-4 rounded-xl transition-all duration-300 shadow-xl cursor-pointer"
                      >
                        BOOK A FREE TRIAL CLASS
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ===================== SECTION 11: EXPLORE SATELLITE PATHS ===================== */}
      <section className="relative py-28 bg-[#000000] border-t border-white/5 px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10 font-sans">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-[10px] tracking-[0.25em] font-mono font-bold text-[#C8EB5F] uppercase block">
              SATELLITE EDUCATION PATHWAYS
            </span>
            <h2 className="text-3xl md:text-5xl font-light font-serif tracking-tight text-white uppercase leading-none">
              Explore More Learning Resources
            </h2>
          </div>

          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 mt-10">
            {[
              { 
                name: "Learn Tajweed Online", 
                link: "/courses/tajweed-course",
                description: "Master baseline pronunciation with modern visual tools.",
                icon: BookOpen 
              },
              { 
                name: "Noorani Qaida Course", 
                link: "/quran-in-the-world",
                description: "Spelling rules for kids to acquire perfect base articulation.",
                icon: Bookmark 
              },
              { 
                name: "Quran Reading Guide", 
                link: "/",
                description: "Complete milestone tracking pathway from zero.",
                icon: Compass 
              },
              { 
                name: "Beginner Quran Lessons", 
                link: "/quran-classes-for-kids",
                description: "Tailored child-friendly 1-on-1 virtual sessions.",
                icon: Award 
              },
              { 
                name: "Islamic Learning Resources", 
                link: "/",
                description: "Curated library of digital daily prayers and Qaida blocks.",
                icon: Sparkles 
              }
            ].map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <Link 
                  key={idx} 
                  href={item.link}
                  className="group relative hover:ring-1 hover:ring-inset hover:ring-[#C8EB5F]/35 hover:bg-gradient-to-b hover:from-[#C8EB5F]/8 hover:to-transparent hover:border-[#C8EB5F]/25 transition bg-[#090b0e] border-white/5 border rounded-[22px] p-6 flex flex-col justify-between min-h-[190px] shadow-xl hover:shadow-[#C8EB5F]/2"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="h-10 w-10 flex bg-white/5 group-hover:bg-gradient-to-tr group-hover:from-[#C8EB5F] group-hover:to-emerald-500 rounded-xl items-center justify-center transition-all duration-300">
                        <IconComponent className="h-5 w-5 text-neutral-300 group-hover:text-black transition-colors duration-300" />
                      </div>
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider text-neutral-500 group-hover:text-[#C8EB5F] transition-colors">
                        <span className="hidden group-hover:inline">Explore</span>
                        <ChevronRight className="h-3 w-3 group-hover:hidden transition-all" />
                        <ArrowUpRight className="h-3 w-3 hidden group-hover:inline-flex transition-all" />
                      </span>
                    </div>
                    <div className="space-y-1.5">
                      <h4 className="font-serif text-sm font-medium tracking-wide text-white group-hover:text-[#C8EB5F] transition-colors">{item.name}</h4>
                      <p className="text-[11px] text-neutral-500 font-light leading-relaxed group-hover:text-neutral-400 transition-colors">{item.description}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

        </div>
      </section>

      <PremiumMarquee 
        items={[
          "Empathetic Online Quran Teacher For Kids",
          "Structured Child-Friendly Noorani Qaida Curriculum",
          "Live Interactive Phonetic Fine-Tuning Boards",
          "Zero-Pressure Learning Spaces For Muslim Youth",
          "Reserve Your Complimentary Guided Kids Evaluation"
        ]}
        speed="100s"
        variant="subtle"
      />

      {/* ===================== BRAND ALIGNED FOOTER ===================== */}
      

    </main>
  );
}
