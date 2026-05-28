"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";
import { Component as ParallaxScrollFeatureSection } from "@/components/ui/parallax-scroll-feature-section";
import { CategoryList } from "@/components/ui/category-list";
import { TextParallaxContentExample } from "@/components/ui/text-parallax-content-scroll";
import { Testimonial } from "@/components/ui/clean-testimonial";
import { FAQAccordionBlock } from "@/components/ui/faq-accordion-block-shadcnui";
import { PremiumMarquee } from "@/components/ui/premium-marquee";
import { NavigationHeader } from "@/components/ui/navigation-header";
import { useRouter } from "next/navigation";
import { 
  ArrowRight, 
  CheckCircle2, 
  Award, 
  Clock, 
  Sparkles, 
  BookOpen, 
  UserCheck, 
  Smile, 
  Users, 
  Calendar, 
  Plus, 
  Minus, 
  Star, 
  ChevronRight,
  ChevronDown,
  ShieldCheck,
  Volume2,
  Menu,
  X
} from "lucide-react";

// Register GASP plugin if window exists
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const teamAvatars = [
  {
    initials: "KB",
    src: "https://i.postimg.cc/C5dwrTSh/pexels-keira-burton-6084282.jpg",
  },
  {
    initials: "MN",
    src: "https://i.postimg.cc/pdZx2Xds/pexels-mikhail-nilov-8350508.jpg",
  },
  {
    initials: "KS",
    src: "https://i.postimg.cc/g0YFBFKW/pexels-ketut-subiyanto-4584483.jpg",
  },
  {
    initials: "AJ",
    src: "https://i.postimg.cc/pVgdcr5d/pexels-ali-jafar-851025332-36904562.jpg",
  },
  {
    initials: "BO",
    src: "https://i.postimg.cc/7LsH3Zyx/pexels-belalobeid-13549654.jpg",
  },
];

const stats = [
  { emoji: "🎓", label: "Certified Quran Tutors", value: "Elite Staff" },
  { emoji: "🕌", label: "1000+ Classes Conducted", value: "Verified" },
  { emoji: "🌍", label: "Students From 20+ Countries", value: "Global" },
  { emoji: "⏰", label: "Flexible Scheduling", value: "24/7 Availability" },
];

export default function Home() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // States for interactive booking
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingType, setBookingType] = useState<"trial" | "demo">("trial");
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // GSAP animations on scroll
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal cinematic sections
      gsap.utils.toArray(".reveal-section").forEach((elem: any) => {
        gsap.fromTo(
          elem,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: elem,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // Parallax depth animation for majestic certificate/tablet backgrounds
      gsap.utils.toArray(".parallax-depth").forEach((elem: any) => {
        gsap.fromTo(
          elem,
          { y: -30 },
          {
            y: 30,
            ease: "none",
            scrollTrigger: {
              trigger: elem,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white selection:bg-[#C8EB5F] selection:text-black font-sans overflow-x-hidden relative">
      
      {/* Decorative luxury radial glow zones */}
      <div className="absolute top-0 left-0 w-[50vw] h-[50vh] bg-[#C8EB5F]/5 rounded-full blur-[160px] pointer-events-none z-0" />
      <div className="absolute top-[40vh] right-0 w-[45vw] h-[45vh] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-[20vh] left-10 w-[400px] h-[400px] bg-amber-400/5 rounded-full blur-[130px] pointer-events-none z-0" />

      {/* Top Navigation Board */}
      <NavigationHeader currentPage="home" onTrialClick={() => {
        setBookingType("trial");
        setBookingOpen(true);
      }} />

      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen w-full flex flex-col justify-end pt-32 pb-16 sm:pb-24 overflow-hidden bg-[#020202]">
        
        {/* Unsplash Islamic architecture high-contrast cover with extreme overlay */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://i.postimg.cc/7LsH3Zyx/pexels-belalobeid-13549654.jpg" 
            alt="Cinematic Quran and geometric lighting background"
            fill
            className="object-cover object-center opacity-40 scale-105 filter grayscale contrast-125"
            priority
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/80" />
        </div>

        {/* Content Box */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 space-y-12">
          
          {/* Avatar stack + Trusted Indicator */}
          <div className="space-y-4">
            <div className="flex -space-x-3 items-center">
              {teamAvatars.map((member, i) => (
                <div
                  key={i}
                  className="size-11 sm:size-13 rounded-full border-2 border-primary overflow-hidden bg-neutral-800 shrink-0 relative"
                  style={{ zIndex: teamAvatars.length - i }}
                >
                  <img 
                    alt="Patience-trained Quran Teacher" 
                    src={member.src} 
                    className="object-cover w-full h-full"
                    referrerPolicy="no-referrer" 
                  />
                </div>
              ))}
              <div className="pl-6 flex flex-col justify-center">
                <div className="flex items-center gap-1.5 text-[#C8EB5F]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={11} className="fill-current" />
                  ))}
                </div>
                <span className="text-[10px] tracking-wider text-neutral-400 font-mono uppercase block mt-0.5">
                  COMMITTED TO THE PROPHETIC TRADITION
                </span>
              </div>
            </div>

            {/* Scrolling Stats Marquee */}
            <div className="relative overflow-hidden w-full max-w-4xl py-3 border-y border-white/10 bg-black/40 backdrop-blur-sm [--gap:2.5rem] [--duration:25s]">
              <div className="flex animate-marquee gap-[var(--gap)] whitespace-nowrap">
                {stats.map((stat, idx) => (
                  <div className="flex items-center gap-3 shrink-0" key={idx}>
                    <span className="font-bold text-[#C8EB5F] text-sm tracking-wider font-mono">{stat.value}</span>
                    <span className="text-[10px] text-white/70 uppercase tracking-[0.15em] font-mono">{stat.label}</span>
                    <span className="text-xs">{stat.emoji}</span>
                  </div>
                ))}
                {/* Loop statistics again for absolute infinite flow */}
                {stats.map((stat, idx) => (
                  <div className="flex items-center gap-3 shrink-0" key={`dup-${idx}`}>
                    <span className="font-bold text-[#C8EB5F] text-sm tracking-wider font-mono">{stat.value}</span>
                    <span className="text-[10px] text-white/70 uppercase tracking-[0.15em] font-mono">{stat.label}</span>
                    <span className="text-xs">{stat.emoji}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Typographic Heading Column with custom deal details */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            
            {/* Title & Action left-side */}
            <div className="lg:col-span-8 space-y-6">
              
              <h1 className="font-serif text-white font-light text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.05] tracking-tight uppercase">
                Learn Quran Online <br />
                <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-[#C8EB5F] to-emerald-300">
                  With Proper Tajweed
                </span>
              </h1>

              {/* Action row with matching demo booking fields */}
              <div className="flex flex-wrap gap-4 pt-2">
                
                <button 
                  onClick={() => {
                    setBookingType("trial");
                    setBookingOpen(true);
                  }}
                  className="bg-[#C8EB5F] text-black hover:bg-white text-xs sm:text-sm font-bold tracking-wider px-8 py-4 font-mono uppercase rounded-none transition-all duration-300 shadow-[0_0_30px_rgba(200,235,95,0.2)] flex items-center gap-3 group"
                >
                  Start Free Trial
                  <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
                </button>

                <button 
                  onClick={() => {
                    setBookingType("demo");
                    setBookingOpen(true);
                  }}
                  className="border border-white/20 hover:border-[#C8EB5F] text-white hover:text-[#C8EB5F] text-xs sm:text-sm font-bold tracking-wider px-8 py-4 font-mono uppercase rounded-none transition-colors duration-300 flex items-center gap-2"
                >
                  Book Demo Class
                </button>

              </div>

            </div>

            {/* Subheading Right side with large editorial block spacing */}
            <div className="lg:col-span-4 lg:pl-6">
              <p className="text-sm md:text-base lg:text-lg text-neutral-350 italic font-serif leading-relaxed font-light text-left lg:text-right">
                "Professional online Quran classes for kids and adults with expert Tajweed teachers. Flexible timings, female tutors, and one-on-one learning."
              </p>
            </div>

          </div>

        </div>

      </section>

      <PremiumMarquee 
        items={[
          "Online Quran Academy Platform",
          "Interactive Online Quran Classes",
          "High-Quality Quran Learning Online",
          "Expert Online Quran Tutor Consultation",
          "Specialized Quran Classes For Kids",
          "Learn Tajweed Online Comfortably",
          "Madinah-Certified Online Quran Teachers",
          "Structured Online Islamic Education",
          "Virtual Quran Learning Worldwide",
          "Comprehensive Quran Reading Course"
        ]}
        speed="80s"
        variant="brand"
      />

      {/* 2. TRUST SECTION */}
      <ParallaxScrollFeatureSection />

      {/* 3. COURSES SECTION */}
      <CategoryList
        title="Our Quran Courses"
        subtitle="Exclusive Syllabus Structured for Every Level"
        className="border-t border-white/5"
        categories={[
          {
            id: "quran-reading",
            title: "📖 Quran Reading Course",
            subtitle: "Learn to read the Holy Quran fluently with proper pronunciation and confidence. Perfect for beginners and students who want to improve their recitation skills step by step.",
            featured: true,
            onClick: () => {
              router.push("/courses/quran-reading-classes-online");
            },
            icon: <ArrowRight className="w-6 h-6" />
          },
          {
            id: "tajweed-course",
            title: "🌙 Tajweed Course",
            subtitle: "Master the rules of Tajweed and improve your Quran pronunciation with expert guidance. Learn Makharij, articulation points, and correct recitation techniques in an easy and structured way.",
            featured: true,
            onClick: () => {
              router.push("/courses/tajweed-course");
            },
            icon: <ArrowRight className="w-6 h-6" />
          },
          {
            id: "hifz-program",
            title: "🕋 Hifz Program",
            subtitle: "Memorize the Holy Quran with personalized lesson plans, daily revision schedules, and one-on-one support from experienced Huffaz teachers.",
            onClick: () => {
              router.push("/courses/online-hifz-classes");
            },
            icon: <ArrowRight className="w-6 h-6" />
          },
          {
            id: "noorani-qaida",
            title: "📚 Noorani Qaida Course",
            subtitle: "Build a strong Quranic foundation by learning Arabic letters, pronunciation, joining rules, and basic reading skills through the Noorani Qaida method.",
            onClick: () => {
              router.push("/courses/online-noorani-qaida-classes");
            },
            icon: <ArrowRight className="w-6 h-6" />
          },
          {
            id: "islamic-studies",
            title: "☪️ Islamic Studies",
            subtitle: "Explore essential Islamic teachings including Duas, basic Fiqh, Islamic manners, Seerah, daily Sunnahs, and foundational Islamic knowledge for kids and adults.",
            onClick: () => {
              router.push("/courses/islamic-studies-classes-for-kids");
            },
            icon: <ArrowRight className="w-6 h-6" />
          },
          {
            id: "one-on-one",
            title: "👩‍🏫 One-on-One Online Classes",
            subtitle: "All courses include live personalized sessions with qualified male and female Quran tutors for students worldwide.",
            onClick: () => {
              router.push("/courses/female-quran-teacher-online");
            },
            icon: <ArrowRight className="w-6 h-6" />
          },
          {
            id: "flexible-timings",
            title: "🌍 Flexible Timings For International Students",
            subtitle: "Convenient class schedules available for students in the USA, UK, Canada, Australia, UAE, and other countries.",
            onClick: () => {
              router.push("/quran-in-the-world");
            },
            icon: <ArrowRight className="w-6 h-6" />
          },
          {
            id: "free-trial",
            title: "🎁 Free Trial Class Available",
            subtitle: "Start with a free demo class and experience our professional Quran teaching system before enrolling.",
            featured: true,
            onClick: () => {
              setBookingType("trial");
              setBookingOpen(true);
            },
            icon: <ArrowRight className="w-6 h-6" />
          }
        ]}
      />

      {/* 4. WHY CHOOSE US */}
      <TextParallaxContentExample 
        onCtaclick={() => {
          setBookingType("trial");
          setBookingOpen(true);
        }}
      />

      <PremiumMarquee 
        items={[
          "Easy Quran Lessons For Beginners",
          "Affordable Online Quran Tutor Matching",
          "Dedicated Online Quran Classes For Sisters",
          "Custom Beginner Quran Reading Course",
          "Flexible Daily Timings For Active Lifestyles",
          "Empathetic Online Quran Teacher For Kids",
          "One-On-One Tajweed Classes Online",
          "Virtual Quran Classes For Adult Beginners"
        ]}
        speed="110s"
        variant="subtle"
      />

      {/* 5.parent TESTIMONIALS */}
      <section className="relative z-10 py-24 sm:py-32 bg-black border-t border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
          
          <div className="text-center space-y-4">
            <span className="text-[10px] tracking-[0.3em] font-semibold text-[#C8EB5F] uppercase font-mono block">
              PARENTAL ENDORSEMENTS
            </span>
            <h2 className="text-4xl sm:text-6xl font-serif font-light uppercase text-white">
              Endorsed By <span className="italic">Grateful Families</span>
            </h2>
            <p className="text-neutral-400 text-sm max-w-xl mx-auto font-light leading-relaxed">
              Read how parents and students situated across global zones balance daily routines with interactive Quranic excellence.
            </p>
          </div>

          <Testimonial />

        </div>
      </section>

      {/* 6. FAQ SECTION */}
      <FAQAccordionBlock 
        onCtaclick={() => {
          setBookingType("trial");
          setBookingOpen(true);
        }}
      />

      {/* FOOTER */}
      

      {/* 8. INTERACTIVE DIALOG MODAL FOR TRIALS & DEMOS */}
      <AnimatePresence>
        {bookingOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Dark overlay backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setBookingOpen(false);
                setFormSubmitted(false);
              }}
              className="absolute inset-0 bg-black/85 backdrop-blur-sm"
            />

            {/* Modal Body Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="relative w-full max-w-lg bg-zinc-950 border border-[#C8EB5F]/20 p-8 sm:p-10 rounded-[36px] shadow-[0_0_50px_rgba(200,235,95,0.1)] z-10"
            >
              <button 
                onClick={() => {
                  setBookingOpen(false);
                  setFormSubmitted(false);
                }}
                className="absolute top-6 right-6 text-neutral-400 hover:text-white font-mono text-xs uppercase tracking-widest"
              >
                [ CLOSE ]
              </button>

              <div className="space-y-4 mb-6">
                <span className="text-[9px] tracking-[0.3em] font-semibold text-[#C8EB5F] uppercase font-mono block">
                  {bookingType === "trial" ? "COMPLIMENTARY PASS" : "DIAGNOSTIC DEMO CLASS"}
                </span>
                <h3 className="font-serif text-2xl uppercase text-white leading-none">
                  {bookingType === "trial" ? "Claim Your Free Live Trial" : "Schedule Diagnostic Demo"}
                </h3>
                <p className="text-xs text-neutral-400 font-light">
                  Learn live, one-on-one over Zoom or Teams with a qualified certified scholar.
                </p>
              </div>

              {/* Direct Instant Booking Channels */}
              <div className="grid grid-cols-2 gap-3 mb-6 p-4 bg-zinc-900/60 rounded-2xl border border-white/5">
                <a 
                  href="https://wa.me/923233260859?text=Asalamu%20Alaikum,%20I%20am%20interested%20in%20taking%20Tajweed%20online%20classes%20with%20Tajweedpage."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center p-3.5 bg-[#C8EB5F] hover:bg-white text-black text-center transition-all duration-300 rounded-xl"
                >
                  <span className="text-[10px] font-mono tracking-wider font-extrabold uppercase">WhatsApp Admin</span>
                  <span className="text-[9px] font-mono opacity-80 mt-0.5">+923233260859</span>
                </a>
                <a 
                  href="mailto:abuqitmirshirazalmadani@gmail.com?subject=Tajweedpage%20Quran%20Classes%20Inquiry"
                  className="flex flex-col items-center justify-center p-3.5 bg-zinc-950 hover:bg-zinc-900 text-white border border-white/10 text-center transition-all duration-300 rounded-xl"
                >
                  <span className="text-[10px] font-mono tracking-wider font-bold uppercase text-[#C8EB5F]">Direct Email</span>
                  <span className="text-[8px] font-mono opacity-85 mt-0.5 truncate w-full">abuqitmirshirazalmadani@gmail.com</span>
                </a>
              </div>

              <div className="relative flex py-2 items-center mb-4">
                <div className="flex-grow border-t border-white/5"></div>
                <span className="flex-shrink mx-4 text-[9px] font-mono text-neutral-500 uppercase tracking-widest">or fill reservation form</span>
                <div className="flex-grow border-t border-white/5"></div>
              </div>

              {formSubmitted ? (
                <div className="bg-[#C8EB5F]/10 border border-[#C8EB5F]/30 p-6 rounded-2xl text-center space-y-4">
                  <CheckCircle2 className="text-[#C8EB5F] mx-auto animate-bounce" size={32} />
                  <h4 className="text-white font-serif text-lg">Inquiry Confirmed</h4>
                  <p className="text-neutral-400 text-xs font-light leading-relaxed">
                    Success! A coordinator situated inside your specific timezone will contact you over WhatsApp/Email within 2 hours to locks in the exact slots.
                  </p>
                  
                  <div className="flex flex-col gap-2 pt-2">
                    <a 
                      href="https://wa.me/923233260859?text=Asalamu%20Alaikum,%20I%20have%20just%20submitted%20a%20booking%20request%20on%20Tajweedpage."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#C8EB5F] text-black font-mono text-[10px] tracking-widest font-bold py-2.5 rounded-lg hover:bg-white text-center transition-colors"
                    >
                      Instant WhatsApp Follow-up
                    </a>
                    <a 
                      href="mailto:abuqitmirshirazalmadani@gmail.com?subject=Tajweedpage%20Form%20Submission"
                      className="bg-zinc-900 text-white border border-white/10 font-mono text-[10px] tracking-widest py-2.5 rounded-lg hover:bg-zinc-805 text-center transition-colors"
                    >
                      Email: abuqitmirshirazalmadani@gmail.com
                    </a>
                  </div>

                  <button
                    onClick={() => {
                      setBookingOpen(false);
                      setFormSubmitted(false);
                    }}
                    className="mt-2 text-xs font-mono text-neutral-400 hover:text-white hover:underline block mx-auto"
                  >
                    Return to site
                  </button>
                </div>
              ) : (
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    setFormSubmitted(true);
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="text-[10px] tracking-widest font-mono text-neutral-400 uppercase block mb-1.5">FullName</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Salim Ahmed"
                      className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#C8EB5F]"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] tracking-widest font-mono text-neutral-400 uppercase block mb-1.5">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. salim@gmail.com"
                      className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#C8EB5F]"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] tracking-widest font-mono text-neutral-400 uppercase block mb-1.5">WhatsApp Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +1 (555) 420 9100"
                      className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#C8EB5F]"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] tracking-widest font-mono text-neutral-400 uppercase block mb-1.5">Class Timings Preferred</label>
                    <select className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-xs text-neutral-300 focus:outline-none">
                      <option>Morning Slots (6:00 AM - 11:00 AM)</option>
                      <option>Afternoon Slots (12:00 PM - 4:00 PM)</option>
                      <option>Evening Slots (5:00 PM - 10:00 PM)</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#C8EB5F] p-4 text-black text-[11px] tracking-widest font-mono uppercase font-bold text-center mt-2 shadow-[0_4px_25px_rgba(200,235,95,0.15)]"
                  >
                    SECURE LIVE ONE-ON-ONE SEAT
                  </button>
                </form>
              )}

            </motion.div>

          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
