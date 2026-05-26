"use client";

import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { NavigationHeader } from "@/components/ui/navigation-header";
import { HorizonCanvas } from "@/components/ui/horizon-hero-section";
import { 
  ContainerAnimated, 
  ContainerInset, 
  ContainerScroll, 
  ContainerStagger 
} from "@/components/ui/hero-video";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card-effect";
import { SyllabusParallaxScroll } from "@/components/ui/syllabus-parallax-scroll";
import { FeatureCard, AnimatedContainer } from "@/components/ui/grid-feature-cards";
import { StickyFeatureSection } from "@/components/ui/sticky-feature-attributes";
import { WhoCanJoinShowcase } from "@/components/ui/who-can-join-showcase";
import { SecureBookingCard } from "@/components/ui/secure-booking-card";
import { StartLearningBanner } from "@/components/ui/start-learning-banner";
import { ReciterReportsMarquee } from "@/components/ui/reciter-reports-marquee";
import { PremiumMarquee } from "@/components/ui/premium-marquee";
import { 
  ArrowLeft, 
  Check, 
  ChevronDown, 
  Sparkles, 
  BookOpen, 
  Award, 
  Clock, 
  UserCheck, 
  Globe, 
  MessageSquare,
  ArrowUpRight,
  BookMarked,
  CheckCircle2,
  Star,
  Volume2,
  ShieldCheck,
  ChevronRight,
  X,
  Menu,
  Compass,
  AlertCircle,
  MapPin,
  Mail
} from "lucide-react";
import React, { useState } from "react";

// Types for structural components
interface FAQItem {
  question: string;
  answer: string;
}

// Icon component for contact details
const InfoIcon = ({ type }: { type: 'website' | 'phone' | 'address' }) => {
  const icons = {
    website: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-[#C8EB5F]">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="2" x2="22" y1="12" y2="12"></line>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
      </svg>
    ),
    phone: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-[#C8EB5F]">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
      </svg>
    ),
    address: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-[#C8EB5F]">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
        <circle cx="12" cy="10" r="3"></circle>
      </svg>
    ),
  };
  return <div className="mr-2 flex-shrink-0">{icons[type]}</div>;
};

// Prop types for the HeroSection component
interface HeroSectionProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  logo?: {
    url: string;
    alt: string;
    text?: string;
  };
  slogan?: string;
  title: React.ReactNode;
  subtitle: string;
  callToAction: {
    text: string;
    href: string;
  };
  backgroundImage: string;
  contactInfo: {
    website: string;
    phone: string;
    address: string;
  };
}

const HeroSection = React.forwardRef<HTMLDivElement, HeroSectionProps>(
  ({ className, logo, slogan, title, subtitle, callToAction, backgroundImage, contactInfo, ...props }, ref) => {
    // Animation variants for the container to orchestrate children animations
    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.15,
          delayChildren: 0.2,
        },
      },
    };
    // Animation variants for individual text/UI elements
    const itemVariants: any = {
      hidden: { y: 20, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.5,
          ease: "easeOut",
        },
      },
    };
    const { onAnimationStart, onDrag, onDragStart, onDragEnd, ...cleanProps } = props as any;
    return (
      <motion.section
        ref={ref}
        className={cn(
          "relative flex w-full flex-col overflow-hidden bg-black text-white md:flex-row min-h-[90vh] pt-32 pb-16 px-6 md:px-12 items-center justify-between gap-12 z-10",
          className
        )}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        {...cleanProps}
      >
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src={backgroundImage} 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-20 object-center mix-blend-luminosity filter brightness-[0.4] contrast-[1.1] scale-[1.02]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black pointer-events-none" />
        </div>

        <div className="relative z-10 flex-1 max-w-2xl flex flex-col justify-center space-y-6 text-left">
          {slogan && (
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-[#C8EB5F] font-mono">
              <Sparkles size={12} className="animate-pulse text-[#C8EB5F]" />
              <span>{slogan}</span>
            </motion.div>
          )}

          {logo && (
            <motion.div variants={itemVariants} className="flex items-center gap-3">
              <img src={logo.url} alt={logo.alt} className="h-8 object-contain" />
              {logo.text && <span className="font-serif tracking-widest font-bold text-sm">{logo.text}</span>}
            </motion.div>
          )}

          <motion.h1 variants={itemVariants} className="text-4xl md:text-7xl font-light leading-[1.05] tracking-tight uppercase text-white font-serif">
            {title}
          </motion.h1>

          <motion.p variants={itemVariants} className="text-sm md:text-base text-neutral-400 leading-relaxed font-light font-sans max-w-xl">
            {subtitle}
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4 pt-4">
            <button 
              onClick={() => {
                const triggerBtn = document.querySelector('[data-booking-trigger="trial"]');
                if (triggerBtn) {
                  (triggerBtn as HTMLElement).click();
                } else {
                  const el = document.getElementById("booking-card");
                  if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
                }
              }}
              className="bg-[#C8EB5F] text-black font-bold text-xs tracking-widest uppercase px-10 py-4 rounded-full hover:bg-white hover:-translate-y-0.5 transition-all text-center cursor-pointer shadow-[0_4px_25px_rgba(200,235,95,0.3)] w-full sm:w-auto"
            >
              {callToAction.text}
            </button>
            <button 
              onClick={() => {
                const el = document.getElementById("booking-card");
                if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
              }}
              className="inline-flex items-center justify-center gap-2 text-white border border-white/10 hover:border-[#C8EB5F] text-xs tracking-widest px-10 py-4 rounded-full uppercase transition-all w-full sm:w-auto bg-neutral-900/40 backdrop-blur-sm"
            >
              See Syllabus Curriculum ↓
            </button>
          </motion.div>

          <motion.div variants={itemVariants} className="pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-[11px] font-mono tracking-wider text-neutral-400">
            <div className="flex items-center">
              <InfoIcon type="website" />
              <span>{contactInfo.website}</span>
            </div>
            <div className="flex items-center">
              <InfoIcon type="phone" />
              <span>{contactInfo.phone}</span>
            </div>
            <div className="flex items-center">
              <InfoIcon type="address" />
              <span>{contactInfo.address}</span>
            </div>
          </motion.div>
        </div>

        <motion.div 
          variants={itemVariants} 
          className="relative z-10 flex-shrink-0 w-full max-w-md aspect-[3/4] bg-neutral-900/40 border border-white/10 rounded-[28px] overflow-hidden shadow-[0_12px_45px_rgba(0,0,0,0.95)]"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30 pointer-events-none z-20" />
          
          <div className="absolute top-4 right-4 z-30 flex items-center gap-2 bg-black/70 px-3 py-1 rounded-full border border-white/10 text-[9px] font-mono tracking-wider font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-white">LIVE RECIPROCAL FEEDBACK</span>
          </div>

          <img
            src="https://img.youtube.com/vi/aga0S7Lt6tY/maxresdefault.jpg"
            alt="Tajweed Recitation Study Page"
            className="absolute inset-0 w-full h-full object-cover opacity-80 transition-transform duration-700 hover:scale-105 z-10"
          />
        </motion.div>
      </motion.section>
    );
  }
);
HeroSection.displayName = "HeroSection";

export default function TajweedCoursePage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // States for header/footer interactive booking modal
  const [modalBookingOpen, setModalBookingOpen] = useState(false);
  const [modalBookingType, setModalBookingType] = useState<"trial" | "demo">("trial");
  const [modalFormSubmitted, setModalFormSubmitted] = useState(false);

  // Active language for educational customization
  const [currentLang, setCurrentLang] = useState<"en" | "fr" | "ar">("en");

  // Mobile menu visibility
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Dropdown visibility
  const [worldMenuOpen, setWorldMenuOpen] = useState(false);
  const [courseDropdownOpen, setCourseDropdownOpen] = useState(false);
  const [usaSubpagesOpen, setUsaSubpagesOpen] = useState(false);
  const [ukSubpagesOpen, setUkSubpagesOpen] = useState(false);
  const [europeSubpagesOpen, setEuropeSubpagesOpen] = useState(false);

  // Scroll to Form helper
  const scrollToForm = () => {
    const el = document.getElementById("booking-card");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const faqs: FAQItem[] = [
    {
      question: "What is the best way to learn Tajweed online?",
      answer: "The best way is through structured live lessons with qualified teachers who provide pronunciation correction and step-by-step guidance."
    },
    {
      question: "Can beginners join this Tajweed course?",
      answer: "Yes. Our lessons are beginner-friendly and designed for students with little or no prior experience."
    },
    {
      question: "How long does it take to learn Tajweed?",
      answer: "Most students notice improvement within a few weeks depending on consistency and practice."
    },
    {
      question: "Do you provide one-on-one Tajweed classes?",
      answer: "Yes. Personalized one-on-one lessons help students improve faster."
    },
    {
      question: "Will I learn Makharij rules in this course?",
      answer: "Yes. Makharij and Arabic articulation are important parts of the curriculum."
    },
    {
      question: "Is this Tajweed course suitable for adults?",
      answer: "Absolutely. We offer online Tajweed classes for adults of all ages."
    },
    {
      question: "Do students receive a certificate?",
      answer: "Yes. Students can receive a Tajweed course completion certificate after finishing the program."
    }
  ];

  // Dynamic language copy mapping
  const pageTranslations = {
    en: {
      location: "Global Virtual Academy",
      titleMain: "Master Quran Recitation",
      titleSub: "Step by Step",
      titleWith: " With Native Scholars",
      description: "Master Quran recitation with proper pronunciation, Makharij, and Tajweed rules through personalized online lessons designed for beginners and adults worldwide.",
      trialBtn: "FREE LIVE TRIAL",
      hoursLabel: "Global Timezones Match",
      interactiveLabel: "100% Personalized Classes"
    },
    fr: {
      location: "Académie Virtuelle Globale",
      titleMain: "Maîtrisez la Récitation du Coran",
      titleSub: "Étape par Étape",
      titleWith: " Avec de Nobles Savants",
      description: "Apprenez à réciter le Coran avec une prononciation parfaite, le respect du Makharij et des règles de Tajweed via des cours en ligne sur-mesure pour débutants et adultes.",
      trialBtn: "ESSAI GRATUIT",
      hoursLabel: "Adapté à Votre Fuseau",
      interactiveLabel: "Cours 100% Personnalisés"
    },
    ar: {
      location: "الأكاديمية الافتراضية العالمية",
      titleMain: "أتقن تلاوة القرآن الكريم",
      titleSub: "خطوة بخطرة",
      titleWith: " مع كبار القراء المتخصصين",
      description: "أتقن مخارج الحروف وأحكام التجويد من خلال جلسات فردية مباشرة مصممة خصيصاً للمبتدئين والكبار لتلاوة صحيحة خالية من الأخطاء.",
      trialBtn: "تواصل معنا مباشرة",
      hoursLabel: "جميع الأوقات متاحة عالمياً",
      interactiveLabel: "حصص فردية مخصصة بالكامل"
    }
  };

  const copy = pageTranslations[currentLang];

  return (
    <main className="min-h-screen bg-[#060709] text-white selection:bg-[#C8EB5F] selection:text-black font-sans relative overflow-x-hidden pb-12">
      
      {/* Absolute background paper-slate noise overlay exactly like the premium HTML Gym site */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg_xmlns=%22http://www.w3.org/2000/svg%22_width=%22300%22_height=%22300%22%3E%3Cfilter_id=%22n%22%3E%3CfeTurbulence_type=%22fractalNoise%22_baseFrequency=%220.75%22_numOctaves=%224%22_stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect_width=%22300%22_height=%22300%22_filter=%22url(%23n)%22_opacity=%220.03%22/%3E%3C/svg%3E')] pointer-events-none z-10" />

      {/* Decorative luxury radial glow zones */}
      <div className="absolute top-0 left-0 w-full h-[1200px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#C8EB5F]/5 via-[#060709] to-transparent pointer-events-none z-0" />
      <div className="absolute top-[30%] right-[-10%] w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] bg-[#C8EB5F]/5 rounded-full blur-[130px] pointer-events-none z-0" />

      {/* Top Navigation Board */}
      <header className="fixed top-0 left-0 w-full z-40 bg-black/60 backdrop-blur-md border-b border-white/5 py-4 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          
          {/* Logo with horizontal visual lines */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex flex-col gap-[3px] text-[#C8EB5F] group-hover:scale-105 transition-transform duration-300">
              <div className="w-8 h-[2.5px] bg-current rounded-sm" />
              <div className="w-8 h-[2.5px] bg-current rounded-sm" />
              <div className="w-5 h-[2.5px] bg-current rounded-sm" />
              <div className="w-8 h-[2.5px] bg-current rounded-sm" />
            </div>
            <span className="font-serif tracking-[0.2em] font-bold text-white group-hover:text-[#C8EB5F] transition-colors text-sm sm:text-base">
              TAJWEEDPAGE
            </span>
          </Link>

          {/* Quick links */}
          <nav className="hidden md:flex items-center gap-8 text-[11px] font-mono tracking-widest text-[#eeeeee]">
            {/* Courses Dropdown */}
            <div 
              className="relative group py-2"
              onMouseEnter={() => setCourseDropdownOpen(true)}
              onMouseLeave={() => setCourseDropdownOpen(false)}
            >
              <button className="flex items-center gap-1 hover:text-[#C8EB5F] transition-colors duration-300 outline-none cursor-pointer">
                <span className="text-[#C8EB5F] font-bold uppercase tracking-widest">courses</span>
                <ChevronDown size={11} className={cn("transition-transform duration-300 text-[#C8EB5F]", courseDropdownOpen ? "rotate-180" : "")} />
              </button>
              
              <div className={cn(
                "absolute top-full left-1/2 -translate-x-1/2 pt-2 w-72 transition-all duration-300 z-50",
                courseDropdownOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2 pointer-events-none"
              )}>
                <div className="bg-zinc-950 border border-white/10 rounded-2xl p-2.5 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
                  <Link href="/courses/tajweed-course" className="block px-4 py-2.5 text-[10px] tracking-wider font-mono text-[#C8EB5F] hover:bg-white/5 rounded-xl transition-colors font-bold">
                    Tajweed Course Master Series
                  </Link>
                  <div className="h-px bg-white/5 my-1" />
                  <Link href="/courses/female-quran-teacher-online" className="block px-4 py-2.5 text-[10px] tracking-wider font-mono text-neutral-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
                    Female Quran Teacher Online
                  </Link>
                  <div className="h-px bg-white/5 my-1" />
                  <Link href="/courses/online-noorani-qaida-classes" className="block px-4 py-2.5 text-[10px] tracking-wider font-mono text-neutral-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
                    Online Noorani Qaida Classes
                  </Link>
                  <div className="h-px bg-white/5 my-1" />
                  <Link href="/courses/online-hifz-classes" className="block px-4 py-2.5 text-[10px] tracking-wider font-mono text-neutral-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
                    Online Hifz Classes
                  </Link>
                  <div className="h-px bg-white/5 my-1" />
                  <Link href="/courses/quran-reading-classes-online" className="block px-4 py-2.5 text-[10px] tracking-wider font-mono text-neutral-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
                    Quran Reading Classes Online
                  </Link>
                  <div className="h-px bg-white/5 my-1" />
                  <Link href="/courses/islamic-studies-classes-for-kids" className="block px-4 py-2.5 text-[10px] tracking-wider font-mono text-neutral-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
                    Islamic Studies for Kids
                  </Link>
                  <div className="h-px bg-white/5 my-1" />
                  <Link href="/courses/beginner-quran-classes-online" className="block px-4 py-2.5 text-[10px] tracking-wider font-mono text-neutral-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
                    Beginner Quran Classes Online
                  </Link>
                </div>
              </div>
            </div>

            <Link href="/quran-classes-for-kids" className="hover:text-[#C8EB5F] transition-colors duration-300">Kids Quran</Link>
            <Link href="/blog" className="hover:text-[#C8EB5F] transition-colors duration-300">Journal</Link>
            
            {/* World Timings dropdown */}
            <div 
              className="relative group py-2"
              onMouseEnter={() => setWorldMenuOpen(true)}
              onMouseLeave={() => setWorldMenuOpen(false)}
            >
              <button className="flex items-center gap-1 hover:text-[#C8EB5F] transition-colors duration-300 outline-none cursor-pointer">
                <span className="text-[#C8EB5F] font-bold uppercase tracking-widest">Quran in the world</span>
                <ChevronDown size={11} className={cn("transition-transform duration-300 text-[#C8EB5F]", worldMenuOpen ? "rotate-180" : "")} />
              </button>
              
              <div className={cn(
                "absolute top-full left-1/2 -translate-x-1/2 pt-2 w-56 transition-all duration-300 z-50",
                worldMenuOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2 pointer-events-none"
              )}>
                <div className="bg-zinc-950 border border-white/10 rounded-2xl p-2.5 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
                  <div className="flex items-center justify-between px-4 py-2 hover:bg-white/5 rounded-xl cursor-pointer" onClick={() => setUsaSubpagesOpen(!usaSubpagesOpen)}>
                    <Link href="/quran-classes-in-usa" onClick={(e) => e.stopPropagation()} className="block text-[10px] tracking-wider font-mono text-neutral-400 hover:text-white transition-colors font-bold">
                      Quran Classes in USA
                    </Link>
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setUsaSubpagesOpen(!usaSubpagesOpen);
                      }}
                      className="p-0.5 hover:text-[#C8EB5F] text-neutral-400 focus:outline-none transition-colors"
                    >
                      <ChevronRight size={12} className={cn("transition-transform duration-200", usaSubpagesOpen ? "rotate-90 text-[#C8EB5F]" : "")} />
                    </button>
                  </div>
                  {usaSubpagesOpen && (
                    <div className="pl-4 pr-1 py-1 space-y-0.5 border-l border-white/10 ml-4 mb-2">
                      <Link href="/online-quran-classes-california" className="block px-3 py-1.5 text-[9px] tracking-wider font-mono text-neutral-400 hover:text-[#C8EB5F] hover:bg-white/5 rounded-lg transition-colors overflow-hidden text-ellipsis whitespace-nowrap">
                        • California
                      </Link>
                      <Link href="/online-quran-classes-chicago" className="block px-3 py-1.5 text-[9px] tracking-wider font-mono text-neutral-400 hover:text-[#C8EB5F] hover:bg-white/5 rounded-lg transition-colors overflow-hidden text-ellipsis whitespace-nowrap">
                        • Chicago
                      </Link>
                      <Link href="/online-quran-classes-new-york" className="block px-3 py-1.5 text-[9px] tracking-wider font-mono text-neutral-400 hover:text-[#C8EB5F] hover:bg-white/5 rounded-lg transition-colors overflow-hidden text-ellipsis whitespace-nowrap">
                        • New York
                      </Link>
                      <Link href="/online-quran-classes-texas" className="block px-3 py-1.5 text-[9px] tracking-wider font-mono text-neutral-400 hover:text-[#C8EB5F] hover:bg-white/5 rounded-lg transition-colors overflow-hidden text-ellipsis whitespace-nowrap">
                        • Texas
                      </Link>
                    </div>
                  )}
                  <div className="h-px bg-white/5 my-1" />
                  <div className="flex items-center justify-between px-4 py-2 hover:bg-white/5 rounded-xl cursor-pointer" onClick={() => setUkSubpagesOpen(!ukSubpagesOpen)}>
                    <Link href="/quran-classes-in-uk" onClick={(e) => e.stopPropagation()} className="block text-[10px] tracking-wider font-mono text-neutral-400 hover:text-white transition-colors font-bold">
                      Quran Classes in UK
                    </Link>
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setUkSubpagesOpen(!ukSubpagesOpen);
                      }}
                      className="p-0.5 hover:text-[#C8EB5F] text-neutral-400 focus:outline-none transition-colors"
                    >
                      <ChevronRight size={12} className={cn("transition-transform duration-200", ukSubpagesOpen ? "rotate-90 text-[#C8EB5F]" : "")} />
                    </button>
                  </div>
                  {ukSubpagesOpen && (
                    <div className="pl-4 pr-1 py-1 space-y-0.5 border-l border-white/10 ml-4 mb-2">
                      <Link href="/online-quran-classes-london" className="block px-3 py-1.5 text-[9px] tracking-wider font-mono text-neutral-400 hover:text-[#C8EB5F] hover:bg-white/5 rounded-lg transition-colors overflow-hidden text-ellipsis whitespace-nowrap">
                        • London
                      </Link>
                      <Link href="/online-quran-classes-manchester" className="block px-3 py-1.5 text-[9px] tracking-wider font-mono text-neutral-400 hover:text-[#C8EB5F] hover:bg-white/5 rounded-lg transition-colors overflow-hidden text-ellipsis whitespace-nowrap">
                        • Manchester
                      </Link>
                      <Link href="/online-quran-classes-birmingham" className="block px-3 py-1.5 text-[9px] tracking-wider font-mono text-neutral-400 hover:text-[#C8EB5F] hover:bg-white/5 rounded-lg transition-colors overflow-hidden text-ellipsis whitespace-nowrap">
                        • Birmingham
                      </Link>
                    </div>
                  )}
                  <div className="h-px bg-white/5 my-1" />
                  <div className="flex items-center justify-between px-4 py-2 hover:bg-white/5 rounded-xl cursor-pointer" onClick={() => setEuropeSubpagesOpen(!europeSubpagesOpen)}>
                    <Link href="/quran-in-the-world/quran-classes-in-europe" onClick={(e) => e.stopPropagation()} className="block text-[10px] tracking-wider font-mono text-neutral-400 hover:text-white transition-colors font-bold">
                      Quran Classes in Europe
                    </Link>
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setEuropeSubpagesOpen(!europeSubpagesOpen);
                      }}
                      className="p-0.5 hover:text-[#C8EB5F] text-neutral-400 focus:outline-none transition-colors"
                    >
                      <ChevronRight size={12} className={cn("transition-transform duration-200", europeSubpagesOpen ? "rotate-90 text-[#C8EB5F]" : "")} />
                    </button>
                  </div>
                  {europeSubpagesOpen && (
                    <div className="pl-4 pr-1 py-1 space-y-0.5 border-l border-white/10 ml-4 mb-2">
                      <Link href="/online-quran-classes-germany" className="block px-3 py-1.5 text-[9px] tracking-wider font-mono text-neutral-400 hover:text-[#C8EB5F] hover:bg-white/5 rounded-lg transition-colors overflow-hidden text-ellipsis whitespace-nowrap">
                        • Germany
                      </Link>
                      <Link href="/online-quran-classes-france" className="block px-3 py-1.5 text-[9px] tracking-wider font-mono text-neutral-400 hover:text-[#C8EB5F] hover:bg-white/5 rounded-lg transition-colors overflow-hidden text-ellipsis whitespace-nowrap">
                        • France
                      </Link>
                      <Link href="/online-quran-classes-netherlands" className="block px-3 py-1.5 text-[9px] tracking-wider font-mono text-neutral-400 hover:text-[#C8EB5F] hover:bg-white/5 rounded-lg transition-colors overflow-hidden text-ellipsis whitespace-nowrap">
                        • Netherlands
                      </Link>
                    </div>
                  )}
                  <div className="h-px bg-white/5 my-1" />
                  <Link href="/quran-in-the-world" className="block px-4 py-3 text-[10px] tracking-wider font-mono text-neutral-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-semibold">
                    All Global Timings
                  </Link>
                </div>
              </div>
            </div>
          </nav>

          {/* Core Action & Interactive Language Switcher */}
          <div className="flex items-center gap-4">
            
            {/* Custom Language Indicator Panel (EN | FR | AR) */}
            <div className="hidden lg:flex items-center gap-1.5 border border-white/5 bg-zinc-950 px-2.5 py-1 rounded-full text-[10px] font-mono font-medium tracking-wider">
              <button 
                className={`px-2 py-0.5 rounded transition-colors ${currentLang === "en" ? "text-black bg-[#C8EB5F] font-bold" : "text-[#777] hover:text-white"}`}
                onClick={() => setCurrentLang("en")}
              >
                EN
              </button>
              <span className="text-white/10">|</span>
              <button 
                className={`px-2 py-0.5 rounded transition-colors ${currentLang === "fr" ? "text-black bg-[#C8EB5F] font-bold" : "text-[#777] hover:text-white"}`}
                onClick={() => setCurrentLang("fr")}
              >
                FR
              </button>
              <span className="text-white/10">|</span>
              <button 
                className={`px-2 py-0.5 rounded transition-colors ${currentLang === "ar" ? "text-black bg-[#C8EB5F] font-bold" : "text-[#777] hover:text-white"}`}
                onClick={() => setCurrentLang("ar")}
              >
                العربية
              </button>
            </div>

            <button 
              data-booking-trigger="trial"
              onClick={() => {
                setModalBookingType("trial");
                setModalBookingOpen(true);
              }}
              className="hidden sm:inline-block bg-[#C8EB5F] text-black hover:bg-white text-[11px] font-mono font-bold tracking-widest px-5 py-2.5 rounded-full uppercase transition-colors duration-300 shadow-[0_4px_20px_rgba(200,235,95,0.15)] cursor-pointer"
            >
              FREE TRIAL
            </button>

            {/* Hamburger Mobile Menu Toggle Button */}
            <button 
              className="md:hidden flex flex-col gap-1.5 p-2 z-50 text-white" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={22} className="text-[#C8EB5F]" /> : <Menu size={22} />}
            </button>
          </div>

        </div>
      </header>

      {/* MOBILE EXTRA DROP-DOWN MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-xl z-40 flex flex-col items-center justify-start gap-4 border-b border-[#C8EB5F]/20 pt-20 pb-12 overflow-y-auto px-6"
          >
            <span className="text-[10px] tracking-[0.2em] font-mono text-[#C8EB5F] uppercase font-bold mb-1">Our Featured Courses</span>
            
            <Link 
              href="/courses/female-quran-teacher-online" 
              className="text-sm tracking-widest uppercase text-white hover:text-[#C8EB5F] transition-colors font-serif font-light"
              onClick={() => setMobileMenuOpen(false)}
            >
              Female Quran Teacher Online
            </Link>
            <Link 
              href="/courses/online-noorani-qaida-classes" 
              className="text-sm tracking-widest uppercase text-white hover:text-[#C8EB5F] transition-colors font-serif font-light"
              onClick={() => setMobileMenuOpen(false)}
            >
              Online Noorani Qaida Classes
            </Link>
            <Link 
              href="/courses/online-hifz-classes" 
              className="text-sm tracking-widest uppercase text-white hover:text-[#C8EB5F] transition-colors font-serif font-light"
              onClick={() => setMobileMenuOpen(false)}
            >
              Online Hifz Classes
            </Link>
            <Link 
              href="/courses/quran-reading-classes-online" 
              className="text-sm tracking-widest uppercase text-white hover:text-[#C8EB5F] transition-colors font-serif font-light"
              onClick={() => setMobileMenuOpen(false)}
            >
              Quran Reading Classes Online
            </Link>
            <Link 
              href="/courses/islamic-studies-classes-for-kids" 
              className="text-sm tracking-widest uppercase text-white hover:text-[#C8EB5F] transition-colors font-serif font-light"
              onClick={() => setMobileMenuOpen(false)}
            >
              Islamic Studies For Kids
            </Link>
            <Link 
              href="/courses/beginner-quran-classes-online" 
              className="text-sm tracking-widest uppercase text-white hover:text-[#C8EB5F] transition-colors font-serif font-light"
              onClick={() => setMobileMenuOpen(false)}
            >
              Beginner Quran Classes
            </Link>

            <div className="w-1/2 h-px bg-white/15 my-2" />

            <Link 
              href="/courses/tajweed-course" 
              className="text-base tracking-widest uppercase text-white hover:text-[#C8EB5F] transition-colors font-serif font-semibold"
              onClick={() => setMobileMenuOpen(false)}
            >
              Tajweed Course
            </Link>
            <Link 
              href="/quran-classes-for-kids" 
              className="text-base tracking-widest uppercase text-[#aaaaaa] hover:text-white transition-colors font-serif font-light"
              onClick={() => setMobileMenuOpen(false)}
            >
              Kids Quran
            </Link>
            <div className="flex flex-col items-center gap-1.5">
              <div className="flex items-center gap-2">
                <Link 
                  href="/quran-classes-in-usa" 
                  className="text-base tracking-widest uppercase text-[#aaaaaa] hover:text-white transition-colors font-serif font-light"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Quran Classes in USA
                </Link>
                <button
                  onClick={() => setUsaSubpagesOpen(!usaSubpagesOpen)}
                  className="p-1 hover:text-[#C8EB5F] text-neutral-400 transition-colors focus:outline-none"
                >
                  <ChevronRight size={14} className={cn("transition-transform duration-200", usaSubpagesOpen ? "rotate-90 text-[#C8EB5F]" : "")} />
                </button>
              </div>
              {usaSubpagesOpen && (
                <div className="flex flex-col items-center gap-1 pl-3 border-l border-white/10 my-1 animate-fadeIn">
                  <Link href="/online-quran-classes-california" className="text-xs uppercase tracking-wider text-neutral-400 hover:text-[#C8EB5F]" onClick={() => setMobileMenuOpen(false)}>• California</Link>
                  <Link href="/online-quran-classes-chicago" className="text-xs uppercase tracking-wider text-[#aaaaaa] hover:text-[#C8EB5F]" onClick={() => setMobileMenuOpen(false)}>• Chicago</Link>
                  <Link href="/online-quran-classes-new-york" className="text-xs uppercase tracking-wider text-[#aaaaaa] hover:text-[#C8EB5F]" onClick={() => setMobileMenuOpen(false)}>• New York</Link>
                  <Link href="/online-quran-classes-texas" className="text-xs uppercase tracking-wider text-[#aaaaaa] hover:text-[#C8EB5F]" onClick={() => setMobileMenuOpen(false)}>• Texas</Link>
                </div>
              )}
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <div className="flex items-center gap-2">
                <Link 
                  href="/quran-classes-in-uk" 
                  className="text-base tracking-widest uppercase text-[#aaaaaa] hover:text-white transition-colors font-serif font-light"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Quran Classes in UK
                </Link>
                <button
                  onClick={() => setUkSubpagesOpen(!ukSubpagesOpen)}
                  className="p-1 hover:text-[#C8EB5F] text-neutral-400 transition-colors focus:outline-none"
                >
                  <ChevronRight size={14} className={cn("transition-transform duration-200", ukSubpagesOpen ? "rotate-90 text-[#C8EB5F]" : "")} />
                </button>
              </div>
              {ukSubpagesOpen && (
                <div className="flex flex-col items-center gap-1 pl-3 border-l border-white/10 my-1 animate-fadeIn">
                  <Link href="/online-quran-classes-london" className="text-xs uppercase tracking-wider text-neutral-400 hover:text-[#C8EB5F]" onClick={() => setMobileMenuOpen(false)}>• London</Link>
                  <Link href="/online-quran-classes-manchester" className="text-xs uppercase tracking-wider text-[#aaaaaa] hover:text-[#C8EB5F]" onClick={() => setMobileMenuOpen(false)}>• Manchester</Link>
                  <Link href="/online-quran-classes-birmingham" className="text-xs uppercase tracking-wider text-[#aaaaaa] hover:text-[#C8EB5F]" onClick={() => setMobileMenuOpen(false)}>• Birmingham</Link>
                </div>
              )}
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <div className="flex items-center gap-2">
                <Link 
                  href="/quran-in-the-world/quran-classes-in-europe" 
                  className="text-base tracking-widest uppercase text-[#aaaaaa] hover:text-white transition-colors font-serif font-light"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Quran Classes in Europe
                </Link>
                <button
                  onClick={() => setEuropeSubpagesOpen(!europeSubpagesOpen)}
                  className="p-1 hover:text-[#C8EB5F] text-neutral-400 transition-colors focus:outline-none"
                >
                  <ChevronRight size={14} className={cn("transition-transform duration-200", europeSubpagesOpen ? "rotate-90 text-[#C8EB5F]" : "")} />
                </button>
              </div>
              {europeSubpagesOpen && (
                <div className="flex flex-col items-center gap-1 pl-3 border-l border-white/10 my-1 animate-fadeIn">
                  <Link href="/online-quran-classes-germany" className="text-xs uppercase tracking-wider text-[#777] hover:text-[#C8EB5F]" onClick={() => setMobileMenuOpen(false)}>• Germany</Link>
                  <Link href="/online-quran-classes-france" className="text-xs uppercase tracking-wider text-[#777] hover:text-[#C8EB5F]" onClick={() => setMobileMenuOpen(false)}>• France</Link>
                  <Link href="/online-quran-classes-netherlands" className="text-xs uppercase tracking-wider text-[#777] hover:text-[#C8EB5F]" onClick={() => setMobileMenuOpen(false)}>• Netherlands</Link>
                </div>
              )}
            </div>
            <Link 
              href="/quran-in-the-world" 
              className="text-base tracking-widest uppercase text-[#aaaaaa] hover:text-white transition-colors font-serif font-light"
              onClick={() => setMobileMenuOpen(false)}
            >
              All Global Timings
            </Link>

            {/* mobile lang indicators */}
            <div className="flex gap-4 border border-white/10 bg-zinc-950 px-4 py-2 rounded-full font-mono text-xs mt-2">
              <button onClick={() => { setCurrentLang("en"); setMobileMenuOpen(false); }} className={currentLang === "en" ? "text-[#C8EB5F] font-bold" : "text-[#777]"}>EN</button>
              <button onClick={() => { setCurrentLang("fr"); setMobileMenuOpen(false); }} className={currentLang === "fr" ? "text-[#C8EB5F] font-bold" : "text-[#777]"}>FR</button>
              <button onClick={() => { setCurrentLang("ar"); setMobileMenuOpen(false); }} className={currentLang === "ar" ? "text-[#C8EB5F] font-bold" : "text-[#777]"}>العربية</button>
            </div>

            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                setModalBookingType("trial");
                setModalBookingOpen(true);
              }}
              className="bg-[#C8EB5F] text-black text-xs font-bold tracking-widest uppercase px-8 py-3 rounded-full mt-4 cursor-pointer"
            >
              FREE TRIAL
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===================== IMMERSIVE HERO SECTION ===================== */}
      <HeroSection 
        slogan={copy.location}
        title={
          <>
            {copy.titleMain} <br />
            <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-[#C8EB5F] to-emerald-300">
              {copy.titleSub}
            </span>
            <span className="text-neutral-400 font-sans block text-sm sm:text-lg md:text-2xl tracking-normal normal-case font-light mt-4">
              {copy.titleWith}
            </span>
          </>
        }
        subtitle={copy.description}
        callToAction={{
          text: currentLang === "en" ? "Start One-to-One Now" : (currentLang === "fr" ? "Commencer en Solo" : "ابدأ الجلسة الفردية الآن"),
          href: "#booking-card"
        }}
        backgroundImage="https://i.postimg.cc/7LsH3Zyx/pexels-belalobeid-13549654.jpg"
        contactInfo={{
          website: "tajweedpage.com",
          phone: "+1 (516) 259-2513",
          address: "NY, USA"
        }}
      />

      {/* ===================== BRAND MARQUEE TEXT ===================== */}
      <PremiumMarquee 
        items={[
          "Noon Sakinah Rules Mastery",
          "Pronunciation Articulation Corrected",
          "Native Arab Scholar Tutors",
          "100% Live 1-on-1 Zoom Classes",
          "Madd Regulations",
          "Qalqalah Shaking Sound",
          "Free Trial Passport",
          "Global USA Compatibility",
          "Progress Sheets & Lessons Handouts",
          "Easy Quran Lessons For Beginners",
          "Affordable Online Quran Tutor Support",
          "Online Quran Classes For Sisters",
          "Beginner Quran Reading Course",
          "Learn Quran Online Step By Step",
          "Online Quran Classes With Flexible Timing",
          "Online Quran Academy For Adults",
          "Online Tajweed Lessons For Beginners",
          "Quran Pronunciation Improvement Classes",
          "Online Quran Classes For Reverts",
          "Quran Classes For Working Adults",
          "Online Quran Teacher For Kids",
          "One-On-One Tajweed Classes Online",
          "Virtual Quran Classes For Beginners"
        ]}
        speed="150s"
        variant="brand"
      />

      {/* ===================== RECITATION TRANSFORMATION (BEFORE/AFTER STUDY) ===================== */}
      <section className="py-28 px-6 md:px-12 bg-neutral-950 relative border-b border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-[#C8EB5F] flex items-center gap-2 mb-4">
              <span className="w-7 h-[1px] bg-[#C8EB5F]"></span>
              <span>Measurable Progress Cycles</span>
            </p>
            <h2 className="text-4xl md:text-6xl font-light uppercase tracking-tight text-white leading-none font-serif">
              RECITATION TRANSFORMATION
            </h2>
          </div>
          <p className="text-sm text-neutral-400 font-light leading-relaxed max-w-lg">
            Witness the structured linguistic transition of the vocal rhythm after completing 30 days of customized step-by-step guidance.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card: Before Studio learning with 3D Card Effect */}
          <CardContainer containerClassName="py-0 w-full" className="w-full">
            <CardBody className="bg-zinc-950/80 border border-red-500/15 rounded-[36px] p-8 md:p-10 space-y-6 relative overflow-hidden group hover:border-red-500/30 transition-all duration-300 w-full h-auto min-h-[460px]">
              <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 rounded-full blur-2xl pointer-events-none" />
              
              <CardItem translateZ={40} className="flex items-center justify-between w-full">
                <span className="text-[10px] tracking-widest uppercase font-mono text-red-400 bg-red-400/10 px-3 py-1 rounded">
                  INITIAL DIFFICULTY (AVANT)
                </span>
                <Volume2 className="text-red-400/40" size={18} />
              </CardItem>
              
              <CardItem translateZ={60} className="w-full block">
                <h3 className="text-2xl font-serif text-white uppercase tracking-wide">Common Recitation Obstacles</h3>
              </CardItem>
              
              <CardItem translateZ={80} className="w-full block pt-2">
                <ul className="space-y-4 text-xs font-light text-neutral-400">
                  <li className="flex gap-3 items-start">
                    <span className="shrink-0 text-red-500 text-sm">✕</span>
                    <span>Incorrect articulation points leading to mispronounced Arabic letters (Makharij mistakes).</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <span className="shrink-0 text-red-500 text-sm">✕</span>
                    <span>Inconsistent length of vowel elongation (Madd regulations skipped or over-extended).</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <span className="shrink-0 text-red-500 text-sm">✕</span>
                    <span>Mixing up similar-sounding Arabic letters (e.g. Qaf vs Kaf, Haa vs Haa', Sad vs Seen).</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <span className="shrink-0 text-red-500 text-sm">✕</span>
                    <span>Struggling with stops and breathing flow causing irregular Quranic melody breakages.</span>
                  </li>
                </ul>
              </CardItem>
            </CardBody>
          </CardContainer>

          {/* Card: After 30 Days learning with 3D Card Effect */}
          <CardContainer containerClassName="py-0 w-full" className="w-full">
            <CardBody className="bg-[#0c0d10] border border-[#C8EB5F]/20 rounded-[36px] p-8 md:p-10 space-y-6 relative overflow-hidden group hover:border-[#C8EB5F]/40 transition-all duration-300 shadow-[0_4px_30px_rgba(200,235,95,0.05)] w-full h-auto min-h-[460px]">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#C8EB5F]/5 rounded-full blur-2xl pointer-events-none" />
              
              <CardItem translateZ={40} className="flex items-center justify-between w-full">
                <span className="text-[10px] tracking-widest uppercase font-mono text-black bg-[#C8EB5F]/90 px-3 py-1 rounded font-bold">
                  PRO TRANSFORMATION (APRÈS)
                </span>
                <ShieldCheck className="text-[#C8EB5F]" size={18} />
              </CardItem>

              <CardItem translateZ={60} className="w-full block">
                <h3 className="text-2xl font-serif text-white uppercase tracking-wide">Master Vocal Performance</h3>
              </CardItem>

              <CardItem translateZ={80} className="w-full block pt-2">
                <ul className="space-y-4 text-xs font-light text-neutral-300">
                  <li className="flex gap-3 items-start">
                    <span className="shrink-0 text-[#C8EB5F]">✓</span>
                    <span className="font-normal text-white">Precise voice placement and physical jaw articulation point matching exactly where letters originate.</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <span className="shrink-0 text-[#C8EB5F]">✓</span>
                    <span className="font-normal text-white">Perfect application of equal ratios for Madd movements, ensuring proper rhythmic length.</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <span className="shrink-0 text-[#C8EB5F]">✓</span>
                    <span className="font-normal text-white">Confident vocal separation of light and heavy phonetic Arabic syllables without confusion.</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <span className="shrink-0 text-[#C8EB5F]">✓</span>
                    <span className="font-normal text-white">Beautiful smooth flow of breathing and pause rule control utilizing appropriate stop symbols (Waqf).</span>
                  </li>
                </ul>
              </CardItem>
            </CardBody>
          </CardContainer>

        </div>
      </section>

      {/* ===================== SYLLABUS HIGHLIGHT MILESTONES (PARALLAX SCROLL FEATURE) ===================== */}
      <SyllabusParallaxScroll />

      {/* ===================== EXPANDED SATELLITE CORE DETAILS GRID ===================== */}
      <section className="py-24 px-6 md:px-12 bg-neutral-950/40 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column blocks: Why Students thrive, Course Features and FAQs */}
          <div className="lg:col-span-7 space-y-20">
            
            {/* 1. Why Choose TajweedPage.com */}
            <div className="space-y-6">
              <h3 className="text-3xl font-serif text-white uppercase tracking-tight">Why Choose TajweedPage.com</h3>
              <AnimatedContainer
                delay={0.15}
                className="grid grid-cols-1 sm:grid-cols-2 border border-white/5 rounded-[30px] overflow-hidden shadow-[0_4px_30px_rgba(200,235,95,0.01)]"
              >
                {[
                  {
                    title: "Certified Tajweed Teachers",
                    icon: UserCheck,
                    description: "Experienced Quran tutors holding direct mastery Ijazah, specialized in Tajweed methodology and Quran recitation improvement."
                  },
                  {
                    title: "Interactive Online Learning",
                    icon: Globe,
                    description: "Live video or audio sessions with modern interactive teaching tools and real-time recitation exercises."
                  },
                  {
                    title: "Structured Tajweed Curriculum",
                    icon: BookMarked,
                    description: "A clear, step-by-step learning path moving systematically from simple sounds to complicated stops for long-term improvement."
                  },
                  {
                    title: "Progress Tracking",
                    icon: Award,
                    description: "Every student gets tailored homework sheets, detailed weekly feedback reports, and precise improvement tips."
                  }
                ].map((feature, i) => (
                  <FeatureCard key={i} feature={feature} />
                ))}
              </AnimatedContainer>
            </div>

            {/* Custom Marquee with Regional/Geographic Quran Tutor and Class Keywords */}
            <PremiumMarquee 
              items={[
                "affordable Quran classes Europe",
                "Quran tutor for American students",
                "Quran classes for British Muslims",
                "Quran classes for European families",
                "online Quran classes Germany",
                "online Quran classes Netherlands",
                "online Quran classes France",
                "online Quran classes Canada",
                "online Quran classes Australia"
              ]}
              speed="120s"
              variant="subtle"
              className="rounded-2xl my-4 py-3"
            />

            {/* 2. Course Features Check items */}
            <StickyFeatureSection />

            {/* 3. Who can join lists */}
            {/* Moved to full bleed showcase section below */}

            {/* 4. Real-time FAQ list with premium card layout */}
            <div className="space-y-6">
              <div>
                <h3 className="text-3xl font-serif text-white uppercase tracking-tight">Frequently Answered Queries</h3>
                <p className="text-neutral-450 text-xs font-light mt-1">
                  Everything you need to know about working with TajweedPage.com.
                </p>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div 
                      key={index} 
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className={`border rounded-2xl p-5 md:p-6 transition-all duration-300 cursor-pointer select-none ${
                        isOpen 
                          ? "border-[#C8EB5F]/40 bg-[#0d0f13] shadow-[0_4px_30px_rgba(200,235,95,0.02)]" 
                          : "border-white/5 bg-[#07080a] hover:border-white/10 hover:shadow-md hover:shadow-black/40"
                      }`}
                    >
                      <div className="w-full flex justify-between items-center text-left group">
                        <h4 className={`text-sm md:text-base font-serif tracking-wide transition-colors ${
                          isOpen ? "text-[#C8EB5F]" : "text-neutral-200 group-hover:text-white"
                        }`}>
                          {faq.question}
                        </h4>
                        <div className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${
                          isOpen 
                            ? "bg-[#C8EB5F] border-[#C8EB5F] text-black" 
                            : "bg-white/5 border-white/5 text-neutral-400 group-hover:text-white"
                        }`}>
                          <ChevronDown 
                            size={14} 
                            className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} 
                          />
                        </div>
                      </div>
                      
                      <motion.div
                        initial={false}
                        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                        className="overflow-hidden"
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <p className="text-neutral-400 text-xs md:text-sm leading-relaxed font-light pt-4 border-t border-white/5 mt-4">
                          {faq.answer}
                        </p>
                      </motion.div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column Sticky Reservation Card */}
          <div className="lg:col-span-5 lg:sticky lg:top-[90px] self-start space-y-6">
            
            {/* Sticky Card form */}
            <SecureBookingCard />

            {/* Satellites trust badges */}
            <div className="bg-zinc-950 p-6 rounded-[28px] border border-white/5 space-y-3.5">
              <span className="text-[10px] tracking-[0.2em] font-mono text-neutral-500 uppercase block font-bold">AUTHENTICATION SHIELDS</span>
              <div className="flex justify-between text-xs text-neutral-400 pb-1.5 border-b border-white/5 font-light">
                <span>Verified Ijazah Scholars</span>
                <span className="text-white font-mono font-medium">100% Certified</span>
              </div>
              <div className="flex justify-between text-xs text-neutral-400 pb-1.5 border-b border-white/5 font-light">
                <span>Direct 1-on-1 Lessons</span>
                <span className="text-white font-mono font-medium">No Crowds</span>
              </div>
              <div className="flex justify-between text-xs text-neutral-400 font-light">
                <span>Complimentary Pass Setup</span>
                <span className="text-emerald-400 font-mono font-bold">1 Session Included</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ===================== START LEARNING TODAY BANNER ===================== */}
      <StartLearningBanner />

      {/* ===================== WHO CAN JOIN THIS COURSE (VERTICAL STICKY SLIDES SHOWCASE) ===================== */}
      <WhoCanJoinShowcase />

      {/* ===================== FOCUSED LEARNING PATHS (WORKOUTS SECTION) ===================== */}
      <section className="py-28 px-6 md:px-12 bg-neutral-900 border-t border-b border-white/5 relative">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <p className="text-[10px] tracking-[0.2em] uppercase text-[#C8EB5F] flex justify-center items-center gap-2 mb-4">
            <span className="w-7 h-[1px] bg-[#C8EB5F]"></span>
            <span>Choose Your Goal</span>
            <span className="w-7 h-[1px] bg-[#C8EB5F]"></span>
          </p>
          <h2 className="text-4xl md:text-6xl font-light uppercase tracking-tight text-white font-serif">
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
            <div className="absolute bottom-0 left-0 right-0 p-8 z-20 space-y-3">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#C8EB5F]">INTENSIVE SKILLS</span>
              <h3 className="text-3xl font-serif text-white tracking-wide">Classical Tajweed Master Series</h3>
              <p className="text-xs text-neutral-405 font-light">
                Master Makharij, Noon Sakinah, Meem Sakinah and Ghunnah. Solid theoretical knowledge paired with heavy practical drills.
              </p>
              <button onClick={scrollToForm} className="text-xs tracking-widest uppercase text-[#C8EB5F] font-bold block pt-3 hover:text-white transition-colors">
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
            <div className="absolute bottom-0 left-0 right-0 p-8 z-20 space-y-3">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#C8EB5F]">FLUENCY POLISH</span>
              <h3 className="text-3xl font-serif text-white tracking-wide">Step-By-Step Quran Pronunciation</h3>
              <p className="text-xs text-neutral-405 font-light">
                Specially assembled for busy students and adults wishing to wipe out common phonetical deviations and establish clean vocal confidence.
              </p>
              <button onClick={scrollToForm} className="text-xs tracking-widest uppercase text-[#C8EB5F] font-bold block pt-3 hover:text-white transition-colors">
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
            <div className="absolute bottom-0 left-0 right-0 p-8 z-20 space-y-3">
              <span className="text-[10px] uppercase font-mono tracking-widest text-amber-300">PREMIUM FOCUS</span>
              <h3 className="text-3xl font-serif text-white tracking-wide">Elite Hifdh & Tajweed Syllabi</h3>
              <p className="text-xs text-neutral-405 font-light">
                A dual action program covering both memorization and extreme phonetic checking. Attain double certificates under qualified Sheikhs.
              </p>
              <button onClick={scrollToForm} className="text-xs tracking-widest uppercase text-amber-300 font-bold block pt-3 hover:text-white transition-colors">
                RESERVE LEVEL →
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ===================== TUITION / PRICING FORMULES (MEMBERSHIPS) ===================== */}
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
          <p className="text-neutral-500 text-xs font-light max-w-md mx-auto leading-relaxed">
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
                  <span>4 Live One-on-One Classes</span>
                </li>
                <li className="flex items-center gap-3 text-neutral-600 line-through">
                  <span className="w-5 h-5 rounded-md bg-[#090a0d] flex items-center justify-center text-neutral-700 shrink-0">✕</span>
                  <span>Personalized Study Reports</span>
                </li>
                <li className="flex items-center gap-3 text-neutral-600 line-through">
                  <span className="w-5 h-5 rounded-md bg-[#090a0d] flex items-center justify-center text-neutral-700 shrink-0">✕</span>
                  <span>Course Completion Certificate</span>
                </li>
              </ul>
            </div>

            <div className="pt-10">
              <button 
                onClick={scrollToForm}
                className="w-full text-center border border-white/10 text-white text-[10px] font-bold tracking-[0.2em] uppercase py-4.5 rounded-2xl hover:text-black hover:bg-[#C8EB5F] hover:border-[#C8EB5F] transition-all duration-300 cursor-pointer"
              >
                CHOOSE STANDARD
              </button>
            </div>
          </div>

          {/* Plan 2: Master Highlighted (Atmospheric glow & recommended state) */}
          <div className="bg-[#0c0d12]/90 border-2 border-[#C8EB5F] p-10 rounded-[32px] flex flex-col justify-between text-left relative overflow-hidden shadow-[0_0_50px_rgba(200,235,95,0.05)]">
            {/* Top visual recommended banner */}
            <div className="absolute top-0 left-0 w-full bg-[#C8EB5F] text-black text-[9px] font-mono font-bold tracking-[0.3em] text-center py-2 uppercase">
              RECOMMENDED SCHOLAR PACKAGE
            </div>
            
            <div className="space-y-8 pt-6">
              <div className="flex justify-between items-center">
                <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-[#C8EB5F] font-bold">SEGMENT 02</span>
                <span className="text-[9px] uppercase font-mono px-2.5 py-1 rounded-full border border-[#C8EB5F]/20 bg-[#C8EB5F]/10 text-[#C8EB5F]">
                  Most Popular
                </span>
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
                  <span className="font-normal text-white">8 Live One-on-One Classes (Twice Weekly)</span>
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
                onClick={scrollToForm}
                className="w-full text-center bg-[#C8EB5F] text-black font-bold text-[10px] tracking-[0.2em] uppercase py-4.5 rounded-2xl hover:bg-white transition-all duration-300 shadow-[0_4px_25px_rgba(200,235,95,0.2)] cursor-pointer"
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
                  <span>12 Live One-on-One Classes (Flexible)</span>
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
                onClick={scrollToForm}
                className="w-full text-center border border-white/10 text-white text-[10px] font-bold tracking-[0.2em] uppercase py-4.5 rounded-2xl hover:text-black hover:bg-[#C8EB5F] hover:border-[#C8EB5F] transition-all duration-300 cursor-pointer"
              >
                CHOOSE ELITE VIP
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ===================== HANDPICKED NATIVE SCHOLARS TEAM ===================== */}
      <section className="py-28 px-6 md:px-12 bg-neutral-900 border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <p className="text-[10px] tracking-[0.2em] uppercase text-[#C8EB5F] flex justify-center items-center gap-2 mb-4">
            <span className="w-7 h-[1px] bg-[#C8EB5F]"></span>
            <span>Native Certified Tutors</span>
            <span className="w-7 h-[1px] bg-[#C8EB5F]"></span>
          </p>
          <h2 className="text-4xl md:text-6xl font-light uppercase tracking-tight text-white font-serif">
            OUR NOBLE MOTIVATED SCHOLARS
          </h2>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Scholar 1 */}
          <div className="group text-center">
            <div className="relative overflow-hidden mb-6 h-[340px] rounded-[24px] border border-white/10">
              <img 
                src="https://i.postimg.cc/L6sdsPsz/pexels-sultan-175963006-18297623.jpg" 
                alt="Al-Sheikh Salim Ahmed" 
                className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500"
              />
              <div className="absolute top-4 left-4 bg-black/80 px-2 py-1 rounded text-[8px] font-mono text-[#C8EB5F]">MADINAH UNIVERSITY</div>
            </div>
            <h3 className="font-serif text-2xl text-white">Al-Sheikh Salim Ahmed</h3>
            <p className="text-[10px] tracking-widest text-[#C8EB5F] uppercase font-mono mt-1">HEAD TAJWEED EVALUATOR</p>
          </div>

          {/* Scholar 2 */}
          <div className="group text-center">
            <div className="relative overflow-hidden mb-6 h-[340px] rounded-[24px] border border-white/10">
              <img 
                src="https://i.postimg.cc/0yxtVM62/pexels-hamidoffstudio-19250801.jpg" 
                alt="Ustadha Rida Al-Alami" 
                className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500"
              />
              <div className="absolute top-4 left-4 bg-black/80 px-2 py-1 rounded text-[8px] font-mono text-[#C8EB5F]">AL-AZHAR UNIVERSITY</div>
            </div>
            <h3 className="font-serif text-2xl text-white">Ustadha Rida Al-Alami</h3>
            <p className="text-[10px] tracking-widest text-[#C8EB5F] uppercase font-mono mt-1">FEMALE SYLLABUS MENTOR</p>
          </div>

          {/* Scholar 3 */}
          <div className="group text-center">
            <div className="relative overflow-hidden mb-6 h-[340px] rounded-[24px] border border-white/10">
              <img 
                src="https://i.postimg.cc/139HpkTd/pexels-bakr-magrabi-928159-5352949.jpg" 
                alt="Al-Sheikh Youssef Khan" 
                className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500"
              />
              <div className="absolute top-4 left-4 bg-black/80 px-2 py-1 rounded text-[8px] font-mono text-[#C8EB5F]">UMM AL-QURA IJAZAH</div>
            </div>
            <h3 className="font-serif text-2xl text-white">Al-Sheikh Youssef Khan</h3>
            <p className="text-[10px] tracking-widest text-[#C8EB5F] uppercase font-mono mt-1">ARABIC PHONETICS SPECIALIST</p>
          </div>

        </div>
      </section>

      {/* ===================== REACTION FEEDBACK TESTIMONIALS SCROLLING MARQUEE ===================== */}
      <ReciterReportsMarquee />

      {/* ===================== EXPLORE ADDITIONAL SATELLITE LINKS ===================== */}
      <section className="relative py-28 bg-[#050608] border-t border-white/5 px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10 font-sans">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-[10px] tracking-[0.25em] font-mono font-bold text-[#C8EB5F] uppercase block">
              SATELLITE EDUCATION PATHWAYS
            </span>
            <h2 className="text-3xl md:text-5xl font-light font-serif tracking-tight text-white uppercase leading-none">
              Explore More Learning Resources
            </h2>
            <p className="text-neutral-500 text-xs font-light max-w-md mx-auto leading-relaxed">
              Further your knowledge of Quranic phonetics, structured articulation rules, and pronunciation guidelines through our curated pathways.
            </p>
          </div>

          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 mt-10">
            {[
              { 
                name: "Noorani Qaida Course", 
                link: "/quran-in-the-world",
                description: "Master baseline spelling & fundamental phonetic rules.",
                icon: BookOpen 
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
                icon: BookMarked 
              },
              { 
                name: "Common Tajweed Mistakes", 
                link: "/",
                description: "Avoid core vocalization and elongation errors.",
                icon: AlertCircle 
              },
              { 
                name: "Quran Memorization Tips", 
                link: "/",
                description: "Modern retention and spacing frameworks.",
                icon: Award 
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

      {/* ===================== FOOTER AT INDENTED LEVEL ===================== */}
      

      {/* ===================== FLOATING CHAT WIDGET ===================== */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 group">
        <span className="bg-black/90 border border-[#C8EB5F]/30 text-[#C8EB5F] text-[10px] tracking-widest uppercase px-3 py-1.5 rounded-full opacity-0 translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 backdrop-blur-md pointer-events-none">
          Live WhatsApp Support
        </span>
        <a 
          href="https://wa.me/923708201211?text=Asalamu%20Alaikum,%20I%20am%20interested%20in%20taking%20Tajweed%2520online%2520classes%2520with%2520Tajweedpage." 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-14 h-14 rounded-full bg-[#C8EB5F] flex items-center justify-center shadow-[0_4px_24px_rgba(200,235,95,0.35)] hover:scale-110 transition-transform duration-300 relative"
          aria-label="WhatsApp"
        >
          <div className="absolute inset-[-4px] rounded-full border border-[#C8EB5F]/30 animate-ping pointer-events-none" />
          <MessageSquare size={24} className="text-black" />
        </a>
      </div>

      {/* ===================== COMPLIMENTARY TRIAL SCREEN MODAL ===================== */}
      <AnimatePresence>
        {modalBookingOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Backdrop click close */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setModalBookingOpen(false);
                setModalFormSubmitted(false);
              }}
              className="absolute inset-0 bg-black/85 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="relative w-full max-w-lg bg-zinc-950 border border-[#C8EB5F]/20 p-8 sm:p-10 rounded-[30px] shadow-[0_0_50px_rgba(200,235,95,0.15)] z-10"
            >
              <button 
                onClick={() => {
                  setModalBookingOpen(false);
                  setModalFormSubmitted(false);
                }}
                className="absolute top-6 right-6 text-neutral-400 hover:text-white font-mono text-xs uppercase"
              >
                [ CLOSE ]
              </button>

              <div className="space-y-4 mb-6">
                <span className="text-[9px] tracking-[0.3em] font-semibold text-[#C8EB5F] uppercase font-mono block">
                  {modalBookingType === "trial" ? "COMPLIMENTARY SEAT PASS" : "DIAGNOSTIC TELEPHONY DEMO"}
                </span>
                <h3 className="font-serif text-2xl uppercase text-white leading-none">
                  {modalBookingType === "trial" ? "Claim Free Live Trial Trial" : "Diagnostic Scholar Session"}
                </h3>
                <p className="text-xs text-neutral-400 font-light">
                  Learn live, one-on-one with a qualified certified scholar tutor. No setup payments required.
                </p>
              </div>

              {modalFormSubmitted ? (
                <div className="bg-[#C8EB5F]/10 border border-[#C8EB5F]/20 p-6 rounded-2xl text-center space-y-4">
                  <CheckCircle2 className="text-[#C8EB5F] mx-auto animate-bounce" size={32} />
                  <h4 className="text-white font-serif text-lg">Inquiry Confirmed Successfully</h4>
                  <p className="text-[#aaa] text-xs font-light leading-relaxed">
                    Success! A dynamic scholar coordinator matching your timezone parameters will contact you in less than 2 hours to confirm class coordinates.
                  </p>
                </div>
              ) : (
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    setModalFormSubmitted(true);
                  }}
                  className="space-y-4 font-sans"
                >
                  <div>
                    <label className="text-[10px] tracking-widest font-mono text-neutral-400 uppercase block mb-1.5">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Salim Ahmed"
                      className="w-full bg-[#060709] border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#C8EB5F]"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] tracking-widest font-mono text-neutral-400 uppercase block mb-1.5">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. salim@gmail.com"
                      className="w-full bg-[#060709] border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#C8EB5F]"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] tracking-widest font-mono text-neutral-400 uppercase block mb-1.5">WhatsApp Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +1 (555) 420 9100"
                      className="w-full bg-[#060709] border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#C8EB5F]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#C8EB5F] p-4 text-black text-[11px] font-bold tracking-widest uppercase text-center mt-2 cursor-pointer rounded-xl"
                  >
                    SECURE MY FREE PASS
                  </button>
                </form>
              )}

            </motion.div>

          </div>
        )}
      </AnimatePresence>

    </main>
  );
}
