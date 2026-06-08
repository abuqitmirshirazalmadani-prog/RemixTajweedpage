"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn, handleEmailClick } from "@/lib/utils";
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
import { db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
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
  const [assignedId, setAssignedId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [timing, setTiming] = useState("Morning Slots (6:00 AM - 11:00 AM)");
  const [smtpWarning, setSmtpWarning] = useState(false);

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSmtpWarning(false);

    const generatedId = `TJP-HOM-${Math.floor(100000 + Math.random() * 900000)}`;
    setAssignedId(generatedId);

    const bookingId = "booking_" + Date.now();
    const submissionData = {
      id: bookingId,
      bookingCode: generatedId,
      fullName: fullName,
      email: email,
      phone: phone || "",
      course: bookingType === "trial" ? "Free Trial (Home Page)" : "Demo Class (Home Page)",
      level: `Preferred timing: ${timing}`,
      comments: "Submitted from primary modal on Home Page",
      sourcePage: "Home Page Modal CTA",
      createdAt: new Date().toISOString()
    };

    try {
      // 1. Save data securely to Firebase Firestore
      await setDoc(doc(db, "bookings", bookingId), submissionData);

      // 2. Trigger Next.js API route to send the email
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(submissionData)
      });
      const data = await res.json();
      if (data && data.warning === "SMTP config missing") {
        setSmtpWarning(true);
      }
    } catch (err) {
      console.error("Booking registry error:", err);
    } finally {
      setIsSubmitting(false);
      setFormSubmitted(true);
    }
  };

  const handleReset = () => {
    setFullName("");
    setEmail("");
    setPhone("");
    setAssignedId("");
    setSmtpWarning(false);
    setFormSubmitted(false);
    setBookingOpen(false);
  };
  
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
          "Verified Continuous Reading Chains (Isnad)",
          "Madinah & Al-Azhar Graduate Mentors",
          "Phonetic Letter Articulation Mastery",
          "Personalized One-on-One Live Mentoring",
          "Comprehensive Pronunciation Diagnostics",
          "Live Interactive Vocal Evaluations"
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
          "High-Patience Kids Quran Curriculums",
          "Specialized Sisters Tajweed Circles",
          "Flexible Daily Slot Schedules",
          "Complete Memorization Retention Matrices",
          "Authorized Classical Tajweed Licenses",
          "Interactive Global Learning Ecosystem"
        ]}
        speed="110s"
        variant="subtle"
      />

      {/* 4.5 CUSTOM LEARNING PROGRAMS */}
      <section className="py-28 px-6 md:px-12 bg-neutral-900 border-t border-b border-white/5 relative">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <p className="text-[10px] tracking-[0.2em] uppercase text-[#C8EB5F] flex justify-center items-center gap-2 mb-4">
            <span className="w-7 h-[1px] bg-[#C8EB5F]"></span>
            <span>Choose Your Goal</span>
            <span className="w-7 h-[1px] bg-[#C8EB5F]"></span>
          </p>
          <h2 className="text-4xl md:text-6xl font-light uppercase tracking-tight text-white font-serif text-center">
            CUSTOM LEARNING PROGRAMS
          </h2>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Path 1 */}
          <div className="group relative h-[420px] overflow-hidden rounded-[28px] border border-white/5">
            <img 
              src="https://i.postimg.cc/T2sR66MH/pexels-beyza-yalcin-153182170-34548784.jpg" 
              alt="Quran Master Program" 
              className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-10 group-hover:scale-105 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent z-10" />
            <div className="absolute bottom-0 left-0 right-0 p-8 z-20 space-y-3 text-left">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#C8EB5F]">INTENSIVE SKILLS</span>
              <h3 className="text-3xl font-serif text-white tracking-wide">Classical Tajweed Master Series</h3>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                Master Makharij, Noon Sakinah, Meem Sakinah and Ghunnah. Solid theoretical knowledge paired with heavy practical drills.
              </p>
              <button 
                onClick={() => {
                  setBookingType("trial");
                  setBookingOpen(true);
                }} 
                className="text-xs tracking-widest uppercase text-[#C8EB5F] font-bold block pt-3 hover:text-white transition-colors cursor-pointer"
              >
                RESERVE LEVEL →
              </button>
            </div>
          </div>

          {/* Path 2 */}
          <div className="group relative h-[420px] overflow-hidden rounded-[28px] border border-white/5">
            <img 
              src="https://i.postimg.cc/NMkVNR82/pexels-a-darmel-8164567.jpg" 
              alt="Fast-track articulation" 
              className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-10 group-hover:scale-105 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent z-10" />
            <div className="absolute bottom-0 left-0 right-0 p-8 z-20 space-y-3 text-left">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#C8EB5F]">FLUENCY POLISH</span>
              <h3 className="text-3xl font-serif text-white tracking-wide">Step-By-Step Quran Pronunciation</h3>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                Specially assembled for busy students and adults wishing to wipe out common phonetical deviations and establish clean vocal confidence.
              </p>
              <button 
                onClick={() => {
                  setBookingType("trial");
                  setBookingOpen(true);
                }} 
                className="text-xs tracking-widest uppercase text-[#C8EB5F] font-bold block pt-3 hover:text-white transition-colors cursor-pointer"
              >
                RESERVE LEVEL →
              </button>
            </div>
          </div>

          {/* Path 3 */}
          <div className="group relative h-[420px] overflow-hidden rounded-[28px] border border-white/5">
            <img 
              src="https://i.postimg.cc/J4G6XfF5/pexels-thirdman-7956916.jpg" 
              alt="Elite Hifdh" 
              className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-10 group-hover:scale-105 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent z-10" />
            <div className="absolute bottom-0 left-0 right-0 p-8 z-20 space-y-3 text-left">
              <span className="text-[10px] uppercase font-mono tracking-widest text-amber-300">PREMIUM FOCUS</span>
              <h3 className="text-3xl font-serif text-white tracking-wide">Elite Hifdh & Tajweed Syllabi</h3>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                A dual action program covering both memorization and extreme phonetic checking. Attain double certificates under qualified Sheikhs.
              </p>
              <button 
                onClick={() => {
                  setBookingType("trial");
                  setBookingOpen(true);
                }} 
                className="text-xs tracking-widest uppercase text-amber-300 font-bold block pt-3 hover:text-white transition-colors cursor-pointer"
              >
                RESERVE LEVEL →
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 4.6 TUITION / PRICING FORMULES (MEMBERSHIPS) */}
      <section className="py-32 px-6 md:px-12 bg-black relative overflow-hidden border-t border-b border-white/5">
        {/* Ambient atmospheric backdrops matching 'Choose Your Reality' style */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-r from-transparent via-[#C8EB5F]/5 to-transparent rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "radial-gradient(ellipse at center, #ffffff 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        
        {/* Section Header */}
        <div className="text-center mb-20 relative z-10 space-y-4">
          <p className="inline-flex items-center gap-2 bg-[#C8EB5F]/10 border border-[#C8EB5F]/20 px-3.5 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8EB5F] animate-pulse"></span>
            <span className="text-[10px] tracking-[0.3em] font-mono text-[#C8EB5F] uppercase font-bold">SYLLABUS FORMULES</span>
          </p>
          <h2 className="text-4xl md:text-6xl font-light uppercase tracking-tight text-white font-serif">
            TUITION MEMBERSHIP PLANS
          </h2>
          <p className="text-neutral-500 text-xs font-light max-w-sm mx-auto leading-relaxed">
            Transparent pricing for next-generation individual Quran recitation mastery. Choose a learning pace that matches your life.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch relative z-10">
          
          {/* Plan 1: Standard */}
          <div className="bg-[#090a0d]/80 border border-white/5 p-10 rounded-[32px] flex flex-col justify-between text-left relative overflow-hidden group hover:border-white/15 hover:shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-all duration-500">
            {/* Top delicate hairline dither indicator */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-white/5 group-hover:bg-[#C8EB5F]/20 transition-all duration-500" />
            
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-neutral-500 font-bold">SEGMENT 01</span>
                <span className="text-[9px] uppercase font-mono px-2.5 py-1 rounded-full border border-white/5 bg-white/5 text-neutral-400">
                  Weekly Guidance
                </span>
              </div>
              
              <div>
                <h3 className="text-xl font-serif text-white uppercase tracking-wide group-hover:text-[#C8EB5F] transition-colors duration-300">
                  Standard Recitation
                </h3>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="font-serif text-5xl text-white font-light group-hover:text-[#C8EB5F] transition-colors duration-300">$49</span>
                  <span className="text-xs text-neutral-500 font-mono uppercase tracking-widest">/ month</span>
                </div>
              </div>

              <div className="h-[1px] bg-white/5" />

              <ul className="space-y-4 text-xs text-neutral-400 font-light">
                <li className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-md bg-white/5 flex items-center justify-center text-[#C8EB5F] shrink-0">✓</span>
                  <span>Correct Pronunciation (Makharij)</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-md bg-white/5 flex items-center justify-center text-[#C8EB5F] shrink-0">✓</span>
                  <span>2 Live One-on-One Classes (Weekly)</span>
                </li>
              </ul>
            </div>

            <div className="pt-10">
              <button 
                onClick={() => {
                  setBookingType("trial");
                  setBookingOpen(true);
                }}
                className="w-full text-center border border-white/10 text-white text-[10px] font-bold tracking-[0.2em] uppercase py-4 rounded-2xl hover:text-black hover:bg-[#C8EB5F] hover:border-[#C8EB5F] transition-all duration-300 cursor-pointer"
              >
                CHOOSE STANDARD
              </button>
            </div>
          </div>

          {/* Plan 2: Master Highlighted (Atmospheric glow & recommended state) */}
          <div className="bg-[#0c0d12]/90 border-2 border-[#C8EB5F] p-10 rounded-[32px] flex flex-col justify-between text-left relative overflow-hidden shadow-[0_0_50px_rgba(200,235,95,0.05)]">
            {/* Top visual recommended banner */}
            <div className="absolute top-0 left-0 w-full bg-[#C8EB5F] text-black text-[9px] font-mono font-bold tracking-[0.3em] text-center py-2 uppercase font-semibold">
              Most Popular
            </div>
            
            <div className="space-y-8 pt-6">
              <div className="flex justify-between items-center">
                <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-[#C8EB5F] font-bold">SEGMENT 02</span>
              </div>
              
              <div>
                <h3 className="text-xl font-serif text-white uppercase tracking-wide">
                  Master Tajweed Program
                </h3>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="font-serif text-6xl text-white font-medium">$89</span>
                  <span className="text-xs text-[#C8EB5F] font-mono uppercase tracking-widest">/ month</span>
                </div>
              </div>

              <div className="h-[1px] bg-white/10" />

              <ul className="space-y-4 text-xs text-neutral-200 font-light">
                <li className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-md bg-[#C8EB5F]/15 flex items-center justify-center text-[#C8EB5F] shrink-0">✓</span>
                  <span className="font-normal text-white">4 Live One-on-One Classes (Weekly)</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-md bg-[#C8EB5F]/15 flex items-center justify-center text-[#C8EB5F] shrink-0">✓</span>
                  <span>Tailored Quran Pronunciation Polish</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-md bg-[#C8EB5F]/15 flex items-center justify-center text-[#C8EB5F] shrink-0">✓</span>
                  <span>Weekly Progress homework & Reports</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-md bg-[#C8EB5F]/15 flex items-center justify-center text-[#C8EB5F] shrink-0">✓</span>
                  <span>Course Completion Certificate</span>
                </li>
              </ul>
            </div>

            <div className="pt-10">
              <button 
                onClick={() => {
                  setBookingType("trial");
                  setBookingOpen(true);
                }}
                className="w-full text-center bg-[#C8EB5F] text-black font-bold text-[10px] tracking-[0.2em] uppercase py-4 rounded-2xl hover:bg-white transition-all duration-300 shadow-[0_4px_25px_rgba(200,235,95,0.2)] cursor-pointer"
              >
                CHOOSE MASTER PRO
              </button>
            </div>
          </div>

          {/* Plan 3: VIP Elite */}
          <div className="bg-[#090a0d]/80 border border-white/5 p-10 rounded-[32px] flex flex-col justify-between text-left relative overflow-hidden group hover:border-white/15 hover:shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-all duration-500">
            {/* Top delicate hairline dither indicator */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-white/5 group-hover:bg-[#C8EB5F]/20 transition-all duration-500" />
            
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-neutral-500 font-bold">SEGMENT 03</span>
                <span className="text-[9px] uppercase font-mono px-2.5 py-1 rounded-full border border-white/5 bg-white/5 text-neutral-400">
                  Complete Custom
                </span>
              </div>
              
              <div>
                <h3 className="text-xl font-serif text-white uppercase tracking-wide group-hover:text-[#C8EB5F] transition-colors duration-300">
                  VIP Custom Scholar
                </h3>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="font-serif text-5xl text-white font-light group-hover:text-[#C8EB5F] transition-colors duration-300">$149</span>
                  <span className="text-xs text-neutral-500 font-mono uppercase tracking-widest">/ month</span>
                </div>
              </div>

              <div className="h-[1px] bg-white/5" />

              <ul className="space-y-4 text-xs text-neutral-400 font-light">
                <li className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-md bg-white/5 flex items-center justify-center text-[#C8EB5F] shrink-0">✓</span>
                  <span>6 Live One-on-One Classes (Weekly)</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-md bg-white/5 flex items-center justify-center text-[#C8EB5F] shrink-0">✓</span>
                  <span>Handpicked Elite Scholar assignment</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-md bg-white/5 flex items-center justify-center text-[#C8EB5F] shrink-0">✓</span>
                  <span>Personal audio feedback via WhatsApp</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-md bg-white/5 flex items-center justify-center text-[#C8EB5F] shrink-0">✓</span>
                  <span>Direct Ijazah Path consultation</span>
                </li>
              </ul>
            </div>

            <div className="pt-10">
              <button 
                onClick={() => {
                  setBookingType("trial");
                  setBookingOpen(true);
                }}
                className="w-full text-center border border-white/10 text-white text-[10px] font-bold tracking-[0.2em] uppercase py-4 rounded-2xl hover:text-black hover:bg-[#C8EB5F] hover:border-[#C8EB5F] transition-all duration-300 cursor-pointer"
              >
                CHOOSE ELITE VIP
              </button>
            </div>
          </div>
        </div>
      </section>

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
              onClick={handleReset}
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
                onClick={handleReset}
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
                <button 
                  onClick={(e) => handleEmailClick(e, "Tajweedpage Quran Classes Inquiry")}
                  className="flex flex-col items-center justify-center p-3.5 bg-zinc-950 hover:bg-zinc-900 text-white border border-white/10 text-center transition-all duration-300 rounded-xl cursor-pointer"
                >
                  <span className="text-[10px] font-mono tracking-wider font-bold uppercase text-[#C8EB5F]">Direct Email</span>
                  <span className="text-[8px] font-mono opacity-85 mt-0.5 truncate w-full">abuqitmirshirazalmadani@gmail.com</span>
                </button>
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
                  <p className="text-[#C8EB5F] font-mono text-[10px] uppercase tracking-wider font-bold block mb-1">
                    Assigned ID: #{assignedId}
                  </p>
                  <p className="text-neutral-400 text-xs font-light leading-relaxed">
                    Your details are saved. To secure absolute priority and activate your complimentary Zoom class spot, click the priority <strong>WhatsApp Activation</strong> button below to instantly register your class coordinates with your personal scheduling coordinator.
                  </p>
                  
                  <div className="flex flex-col gap-2 pt-2">
                    <a 
                      href={`https://wa.me/923233260859?text=${encodeURIComponent(`Asalamu Alaikum TajweedPage!\n\nI have successfully submitted a class inquiry on your luxury portal.\n\n📚 *Details*:\n• *Assigned ID*: #${assignedId}\n• *Student Name*: ${fullName}\n• *Desired Class*: ${bookingType === "trial" ? "Free Live Trial" : "Diagnostic Demo Class"}\n• *Preferred Timing*: ${timing}\n\nPlease confirm my live slot! BarakaAllahu Feekum.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#C8EB5F] text-black font-mono text-[11px] tracking-widest font-extrabold py-3.5 rounded-xl hover:bg-white text-center transition-all block animate-pulse hover:animate-none shadow-[0_0_20px_rgba(200,235,95,0.25)] hover:shadow-none"
                    >
                      🔒 ACTIVATE VIA WHATSAPP (INSTANT)
                    </a>
                    
                    <button 
                      onClick={(e) => handleEmailClick(e, `Tajweedpage Form Inquiry #${assignedId}`)}
                      className="bg-zinc-900 text-white border border-white/10 font-mono text-[10px] tracking-widest py-2.5 rounded-lg hover:bg-zinc-850 text-center transition-colors cursor-pointer w-full"
                    >
                      Backup: abuqitmirshirazalmadani@gmail.com
                    </button>
                  </div>

                  <button
                    onClick={handleReset}
                    className="w-full mt-3 bg-white hover:bg-[#C8EB5F] text-black font-sans text-xs font-semibold py-3.5 rounded-xl uppercase tracking-wider text-center transition-all duration-300 cursor-pointer shadow-lg hover:shadow-[0_4px_20px_rgba(200,235,95,0.2)]"
                  >
                    Close & Return to Site
                  </button>
                </div>
              ) : (
                <form 
                  onSubmit={handleBookingSubmit}
                  className="space-y-4"
                >
                  <div>
                    <label className="text-[10px] tracking-widest font-mono text-neutral-400 uppercase block mb-1.5">FullName</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Salim Ahmed"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#C8EB5F]"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] tracking-widest font-mono text-neutral-400 uppercase block mb-1.5">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. salim@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#C8EB5F]"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] tracking-widest font-mono text-neutral-400 uppercase block mb-1.5">WhatsApp Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +1 (555) 420 9100"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#C8EB5F]"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] tracking-widest font-mono text-neutral-400 uppercase block mb-1.5">Class Timings Preferred</label>
                    <select 
                      value={timing}
                      onChange={(e) => setTiming(e.target.value)}
                      className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-xs text-neutral-300 focus:outline-none"
                    >
                      <option value="Morning Slots (6:00 AM - 11:00 AM)">Morning Slots (6:00 AM - 11:00 AM)</option>
                      <option value="Afternoon Slots (12:00 PM - 4:00 PM)">Afternoon Slots (12:00 PM - 4:00 PM)</option>
                      <option value="Evening Slots (5:00 PM - 10:00 PM)">Evening Slots (5:00 PM - 10:00 PM)</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#C8EB5F] p-4 text-black text-[11px] tracking-widest font-mono uppercase font-bold text-center mt-2 shadow-[0_4px_25px_rgba(200,235,95,0.15)] disabled:opacity-50"
                  >
                    {isSubmitting ? "PROCESSING..." : "SECURE LIVE ONE-ON-ONE SEAT"}
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
