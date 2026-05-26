"use client";

import React, { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { NavigationHeader } from "@/components/ui/navigation-header";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowUpRight, 
  Check, 
  CheckCircle2, 
  ChevronDown, 
  ChevronRight,
  Mail, 
  Menu, 
  MessageSquare, 
  X,
  ArrowDown
} from "lucide-react";

// Icon component for contact details as requested in the instructions
const InfoIcon = ({ type }: { type: 'website' | 'phone' | 'address' }) => {
    const icons = {
        website: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-[#C8EB5F]">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" x2="22" y1="12" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            </svg>
        ),
        phone: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-[#C8EB5F]">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
        ),
        address: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-[#C8EB5F]">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                <circle cx="12" cy="10" r="3"></circle>
            </svg>
        ),
    };
    return <div className="mr-2 flex-shrink-0">{icons[type]}</div>;
};

// Prop types for the HeroSection component
interface HeroSectionProps {
  className?: string;
  style?: React.CSSProperties;
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
  ({ className, style, logo, slogan, title, subtitle, callToAction, backgroundImage, contactInfo }, ref) => {
    
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
    const itemVariants = {
      hidden: { y: 20, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.5,
          ease: "easeOut" as const,
        },
      },
    };

    return (
      <motion.section
        ref={ref}
        className={cn(
          "relative flex w-full flex-col overflow-hidden bg-black text-[#ffffff] md:flex-row min-h-[90vh] border-b border-white/5",
          className
        )}
        style={style}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Left Side: Content */}
        <div className="flex w-full flex-col justify-between p-8 md:w-1/2 md:p-12 lg:w-3/5 lg:p-16 relative z-10 bg-gradient-to-r from-black via-black/95 to-transparent">
            {/* Top Section: Logo & Main Content */}
            <div className="my-auto space-y-8">
                <motion.header className="mb-6" variants={itemVariants}>
                    {logo && (
                        <div className="flex items-center">
                            <Image 
                              src={logo.url} 
                              alt={logo.alt} 
                              width={40} 
                              height={40} 
                              referrerPolicy="no-referrer"
                              className="mr-3 h-10 w-10 rounded-xl object-cover filter brightness-110 border border-white/10" 
                            />
                            <div>
                                {logo.text && <p className="text-sm font-bold tracking-widest font-mono text-white uppercase">{logo.text}</p>}
                                {slogan && <p className="text-[9px] tracking-[0.25em] font-mono text-neutral-500 uppercase">{slogan}</p>}
                            </div>
                        </div>
                    )}
                </motion.header>

                <motion.main variants={containerVariants} className="space-y-6">
                    <motion.h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-serif font-light leading-tight text-white tracking-tight uppercase" variants={itemVariants}>
                        {title}
                    </motion.h1>
                    
                    <motion.div className="h-px w-24 bg-[#C8EB5F]" variants={itemVariants}></motion.div>
                    
                    <motion.p className="max-w-xl text-xs sm:text-sm text-neutral-400 font-light leading-relaxed font-sans" variants={itemVariants}>
                        {subtitle}
                    </motion.p>

                    {/* Highly curated key lists */}
                    <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mb-4" variants={itemVariants}>
                      {[
                        "Heures flexibles adaptées à la France (CET)",
                        "Enseignants certifiés de l'Université Al-Azhar",
                        "Portails 1-on-1 pour enfants & femmes adult",
                        "Suivi pédagogique personnalisé et rigoureux",
                        "Tableaux blancs interactifs et mémorisation"
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2.5 text-xs text-neutral-300 font-light">
                          <span className="h-5 w-5 rounded-full border border-[#C8EB5F]/20 bg-[#C8EB5F]/5 flex items-center justify-center shrink-0">
                            <Check className="text-[#C8EB5F] h-3 w-3" />
                          </span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </motion.div>

                    <motion.div className="pt-2" variants={itemVariants}>
                        <a 
                          href={callToAction.href} 
                          className="inline-flex items-center justify-center px-8 py-4 bg-[#C8EB5F] hover:bg-white text-black font-mono text-[11px] font-bold uppercase tracking-widest transition-all duration-300 shadow-[0_4px_20px_rgba(200,235,95,0.15)] rounded-lg group"
                        >
                            {callToAction.text}
                            <ArrowUpRight className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </a>
                    </motion.div>
                </motion.main>
            </div>

            {/* Bottom Section: Contact info */}
            <motion.div className="mt-12 flex flex-col sm:flex-row gap-6 border-t border-white/5 pt-8" variants={itemVariants}>
                <div className="flex items-center text-xs text-neutral-500 font-light">
                    <InfoIcon type="website" />
                    <span>{contactInfo.website}</span>
                </div>
                <div className="flex items-center text-xs text-neutral-500 font-light">
                    <InfoIcon type="phone" />
                    <span>{contactInfo.phone}</span>
                </div>
                <div className="flex items-center text-xs text-neutral-500 font-light">
                    <InfoIcon type="address" />
                    <span>{contactInfo.address}</span>
                </div>
            </motion.div>
        </div>

        {/* Right Side: Image/Visual Background cover */}
        <div className="relative w-full md:w-1/2 lg:w-2/5 min-h-[350px] md:min-h-auto">
            <Image 
                src={backgroundImage} 
                alt="Tajweed Online Quran Tutors France" 
                fill 
                className="object-cover object-center brightness-90 saturate-[0.85]"
                sizes="(max-width: 768px) 100vw, 50vw"
                referrerPolicy="no-referrer"
                priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent md:bg-gradient-to-l md:from-black md:via-black/20 md:to-transparent" />
            <div className="absolute bottom-6 left-6 z-10 font-mono text-[9px] tracking-widest text-[#C8EB5F] uppercase bg-black/80 px-4 py-2 border border-white/10 rounded-lg">
                Exclusive France Portal
            </div>
        </div>
      </motion.section>
    );
  }
);
HeroSection.displayName = "HeroSection";

// Parallax scroll elements structure as requested
const IMG_PADDING = 12;

const TextParallaxContent = ({ imgUrl, subheading, heading, children }: { imgUrl: string; subheading: string; heading: string; children: React.ReactNode }) => {
  return (
    <div
      style={{
        paddingLeft: IMG_PADDING,
        paddingRight: IMG_PADDING,
      }}
      className="bg-black py-4"
    >
      <div className="relative h-[150vh]">
        <StickyImage imgUrl={imgUrl} />
        <OverlayCopy heading={heading} subheading={subheading} />
      </div>
      {children}
    </div>
  );
};

const StickyImage = ({ imgUrl }: { imgUrl: string }) => {
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
      className="sticky z-0 overflow-hidden rounded-[32px] border border-white/5"
    >
      <motion.div
        className="absolute inset-0 bg-neutral-950/75"
        style={{
          opacity,
        }}
      />
    </motion.div>
  );
};

const OverlayCopy = ({ subheading, heading }: { subheading: string; heading: string }) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [250, -250]);
  const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0]);
  return (
    <motion.div
      style={{
        y,
        opacity,
      }}
      ref={targetRef}
      className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center text-white p-6"
    >
      <p className="mb-2 text-center text-xs md:mb-4 md:text-sm font-mono tracking-[0.3em] uppercase text-[#C8EB5F]">
        {subheading}
      </p>
      <p className="text-center text-3xl sm:text-4xl md:text-6xl font-serif font-light max-w-4xl uppercase tracking-tight leading-tight">{heading}</p>
    </motion.div>
  );
};

// FAQ Type
interface FAQItem {
  question: string;
  answer: string;
}

export default function FranceQuranClasses() {
  const [courseDropdownOpen, setCourseDropdownOpen] = useState(false);
  const [wordDropdownOpen, setWordDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [usaSubpagesOpen, setUsaSubpagesOpen] = useState(false);
  const [ukSubpagesOpen, setUkSubpagesOpen] = useState(false);
  const [europeSubpagesOpen, setEuropeSubpagesOpen] = useState(true); // Default open in Europe pages
  
  // Modal State
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingType, setBookingType] = useState<"trial" | "demo">("trial");
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Active FAQ index selector
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Individual references for Scroll Parallax feature section
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);

  const scroll1 = useScroll({ target: ref1, offset: ["start end", "center start"] }).scrollYProgress;
  const scroll2 = useScroll({ target: ref2, offset: ["start end", "center start"] }).scrollYProgress;
  const scroll3 = useScroll({ target: ref3, offset: ["start end", "center start"] }).scrollYProgress;

  const opacity1 = useTransform(scroll1, [0, 0.7], [0, 1]);
  const opacity2 = useTransform(scroll2, [0, 0.7], [0, 1]);
  const opacity3 = useTransform(scroll3, [0, 0.7], [0, 1]);

  const clipProgress1 = useTransform(scroll1, [0, 0.7], ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]);
  const clipProgress2 = useTransform(scroll2, [0, 0.7], ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]);
  const clipProgress3 = useTransform(scroll3, [0, 0.7], ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]);

  const translate1 = useTransform(scroll1, [0, 1], [-50, 0]);
  const translate2 = useTransform(scroll2, [0, 1], [-50, 0]);
  const translate3 = useTransform(scroll3, [0, 1], [-50, 0]);

  // Unique local SEO Questions and Answers modeled after low-competition keywords:
  const faqData: FAQItem[] = [
    {
      question: "La coordination et l'assistance se font-elles en français ?",
      answer: "Absolument. Notre équipe de support de la réception gère vos démarches et la planification en langue française. Tandis que nos tuteurs arabes dispensent les corrections en prononciation classique et utilisent le français ou l'anglais pour expliquer les règles de Tajwid de manière fluide."
    },
    {
      question: "Puis-je planifier les cours en dehors des heures d'école en France ?",
      answer: "Oui, totalement. Que vous habitiez à Paris, Lyon, Marseille ou Lille, nous adaptons les heures de connexion selon votre convenance : après l'école primaire ou le collège, en fin de soirée, ou pendant les matinées du samedi et du dimanche."
    },
    {
      question: "Proposez-vous des enseignantes de Coran certifiées (Alimah) ?",
      answer: "Oui, nous disposons d'un registre distingué d'enseignantes arabes diplômées de l'Université Al-Azhar, dédiées exclusivement aux sœurs et aux jeunes filles. Les cours individuels se déroulent sur Zoom en toute intimité."
    }
  ];

  return (
    <main className="min-h-screen bg-black text-white font-sans selection:bg-[#C8EB5F] selection:text-black leading-normal">
      
      {/* Premium Header/Navigation */}
      <NavigationHeader onTrialClick={() => {}} />
      <nav className="hidden sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/5 py-4 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#C8EB5F] text-black font-mono font-bold flex items-center justify-center text-sm shadow-[0_0_15px_rgba(200,235,95,0.4)]">
              TP
            </div>
            <div>
              <span className="font-serif text-base tracking-widest text-white block uppercase">TajweedPage</span>
              <span className="font-mono text-[8px] tracking-[0.3em] text-[#C8EB5F] block uppercase font-bold">PORTAIL EUROPE</span>
            </div>
          </Link>

          {/* Desktop Navigation links */}
          <div className="hidden lg:flex items-center gap-8 text-xs font-mono tracking-widest uppercase">
            
            {/* Courses Dropdown */}
            <div 
              className="relative group py-2"
              onMouseEnter={() => setCourseDropdownOpen(true)}
              onMouseLeave={() => setCourseDropdownOpen(false)}
            >
              <button className="flex items-center gap-1 hover:text-[#C8EB5F] transition-colors duration-300 outline-none cursor-pointer">
                <span>Courses</span>
                <ChevronDown size={11} className={cn("transition-transform duration-300", courseDropdownOpen ? "rotate-180" : "")} />
              </button>
              
              <div className={cn(
                "absolute top-full left-1/2 -translate-x-1/2 pt-2 w-72 transition-all duration-300 z-50",
                courseDropdownOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2 pointer-events-none"
              )}>
                <div className="bg-zinc-950 border border-white/10 rounded-2xl p-2.5 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
                                    <Link href="/courses/tajweed-course" className="block px-4 py-2.5 text-[10px] tracking-wider font-mono text-neutral-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
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
                </div>
              </div>
            </div>

            <Link href="/quran-classes-for-kids" className="hover:text-[#C8EB5F] transition-colors duration-300">Kids Quran</Link>
            
            {/* World Timings dropdown */}
            <div 
              className="relative group py-2"
              onMouseEnter={() => setWordDropdownOpen(true)}
              onMouseLeave={() => setWordDropdownOpen(false)}
            >
              <button className="flex items-center gap-1 hover:text-[#C8EB5F] transition-colors duration-300 outline-none cursor-pointer">
                <span className="text-[#C8EB5F] font-bold uppercase tracking-widest">Quran in the world</span>
                <ChevronDown size={11} className={cn("transition-transform duration-300 text-[#C8EB5F]", wordDropdownOpen ? "rotate-180" : "")} />
              </button>
              
              <div className={cn(
                "absolute top-full left-1/2 -translate-x-1/2 pt-2 w-56 transition-all duration-300 z-50",
                wordDropdownOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2 pointer-events-none"
              )}>
                <div className="bg-zinc-950 border border-white/10 rounded-2xl p-2.5 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
                  
                  {/* USA Classes Dropdown */}
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
                      <Link href="/online-quran-classes-california" className="block px-3 py-1.5 text-[9px] tracking-wider font-mono text-neutral-400 hover:text-[#C8EB5F] hover:bg-white/5 rounded-lg transition-colors">
                        • California
                      </Link>
                      <Link href="/online-quran-classes-chicago" className="block px-3 py-1.5 text-[9px] tracking-wider font-mono text-neutral-400 hover:text-[#C8EB5F] hover:bg-white/5 rounded-lg transition-colors">
                        • Chicago
                      </Link>
                      <Link href="/online-quran-classes-new-york" className="block px-3 py-1.5 text-[9px] tracking-wider font-mono text-neutral-400 hover:text-[#C8EB5F] hover:bg-white/5 rounded-lg transition-colors">
                        • New York
                      </Link>
                      <Link href="/online-quran-classes-texas" className="block px-3 py-1.5 text-[9px] tracking-wider font-mono text-neutral-400 hover:text-[#C8EB5F] hover:bg-white/5 rounded-lg transition-colors">
                        • Texas
                      </Link>
                    </div>
                  )}

                  <div className="h-px bg-white/5 my-1" />

                  {/* UK Classes Dropdown */}
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
                      <Link href="/online-quran-classes-london" className="block px-3 py-1.5 text-[9px] tracking-wider font-mono text-neutral-400 hover:text-[#C8EB5F] hover:bg-white/5 rounded-lg transition-colors">
                        • London
                      </Link>
                      <Link href="/online-quran-classes-manchester" className="block px-3 py-1.5 text-[9px] tracking-wider font-mono text-neutral-400 hover:text-[#C8EB5F] hover:bg-white/5 rounded-lg transition-colors">
                        • Manchester
                      </Link>
                      <Link href="/online-quran-classes-birmingham" className="block px-3 py-1.5 text-[9px] tracking-wider font-mono text-neutral-400 hover:text-[#C8EB5F] hover:bg-white/5 rounded-lg transition-colors">
                        • Birmingham
                      </Link>
                    </div>
                  )}

                  <div className="h-px bg-white/5 my-1" />

                  {/* Europe Dropdown - Default Open inside France */}
                  <div className="flex items-center justify-between px-4 py-2 hover:bg-white/5 rounded-xl cursor-pointer" onClick={() => setEuropeSubpagesOpen(!europeSubpagesOpen)}>
                    <Link href="/quran-in-the-world/quran-classes-in-europe" onClick={(e) => e.stopPropagation()} className="block text-[10px] tracking-wider font-mono text-[#C8EB5F] hover:text-[#C8EB5F] transition-colors font-bold">
                      Quran Classes in Europe ✦
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
                      <Link href="/online-quran-classes-germany" className="block px-3 py-1.5 text-[9px] tracking-wider font-mono text-neutral-400 hover:text-[#C8EB5F] hover:bg-white/5 rounded-lg transition-colors font-light">
                        • Germany
                      </Link>
                      <Link href="/online-quran-classes-france" className="block px-3 py-1.5 text-[9px] tracking-wider font-mono text-[#C8EB5F] hover:text-[#C8EB5F] hover:bg-white/5 rounded-lg transition-colors font-semibold">
                        • France ✦
                      </Link>
                      <Link href="/online-quran-classes-netherlands" className="block px-3 py-1.5 text-[9px] tracking-wider font-mono text-neutral-400 hover:text-[#C8EB5F] hover:bg-white/5 rounded-lg transition-colors">
                        • Netherlands
                      </Link>
                    </div>
                  )}

                  <div className="h-px bg-white/5 my-1" />
                  <Link href="/quran-in-the-world" className="block px-4 py-3 text-[10px] tracking-wider font-mono text-neutral-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
                    All Global Timings
                  </Link>
                </div>
              </div>
            </div>

          </div>

          <button 
            onClick={() => {
              setBookingType("trial");
              setBookingOpen(true);
            }}
            className="hidden sm:block px-6 py-2.5 bg-white text-black font-mono text-[10px] font-bold uppercase tracking-widest rounded-lg hover:bg-[#C8EB5F] transition-all duration-300 cursor-pointer"
          >
            FREE TRIAL CLASS
          </button>

          {/* Handheld Hamburger button */}
          <button 
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2 text-white hover:text-[#C8EB5F] transition-colors"
          >
            <Menu size={24} />
          </button>

        </div>
      </nav>

      {/* Handheld full screen drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed inset-0 z-50 bg-black/98 flex flex-col p-6 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="font-serif text-lg tracking-widest text-[#C8EB5F] uppercase">TAJWEEDPAGE</span>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-neutral-400 hover:text-white">
                <X size={24} />
              </button>
            </div>

            <div className="flex flex-col gap-6 items-center text-center my-auto py-8">
              <Link href="/courses/tajweed-course" className="text-lg tracking-widest uppercase text-white hover:text-[#C8EB5F]" onClick={() => setMobileMenuOpen(false)}>Tajweed Course</Link>
              <Link href="/quran-classes-for-kids" className="text-lg tracking-widest uppercase text-white hover:text-[#C8EB5F]" onClick={() => setMobileMenuOpen(false)}>Kids Quran</Link>
              
              {/* USA Mobile Collapsible Subitems */}
              <div className="flex flex-col items-center gap-1.5">
                <div className="flex items-center gap-2">
                  <Link 
                    href="/quran-classes-in-usa" 
                    className="text-lg tracking-widest uppercase text-white hover:text-[#C8EB5F] transition-colors font-serif font-light"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Quran Classes in USA
                  </Link>
                  <button 
                    onClick={() => setUsaSubpagesOpen(!usaSubpagesOpen)}
                    className="p-1 hover:text-[#C8EB5F] text-neutral-450 focus:outline-none"
                  >
                    <ChevronRight size={14} className={cn("transition-transform duration-200", usaSubpagesOpen ? "rotate-90 text-[#C8EB5F]" : "")} />
                  </button>
                </div>
                {usaSubpagesOpen && (
                  <div className="flex flex-col items-center gap-1 pl-3 border-l border-white/10 my-1 animate-fadeIn">
                    <Link href="/online-quran-classes-california" className="text-xs uppercase tracking-wider text-neutral-400 hover:text-[#C8EB5F]" onClick={() => setMobileMenuOpen(false)}>• California</Link>
                    <Link href="/online-quran-classes-chicago" className="text-xs uppercase tracking-wider text-neutral-400 hover:text-[#C8EB5F]" onClick={() => setMobileMenuOpen(false)}>• Chicago</Link>
                    <Link href="/online-quran-classes-new-york" className="text-xs uppercase tracking-wider text-neutral-400 hover:text-[#C8EB5F]" onClick={() => setMobileMenuOpen(false)}>• New York</Link>
                    <Link href="/online-quran-classes-texas" className="text-xs uppercase tracking-wider text-neutral-400 hover:text-[#C8EB5F]" onClick={() => setMobileMenuOpen(false)}>• Texas</Link>
                  </div>
                )}
              </div>

              {/* UK Mobile Collapsible Subitems */}
              <div className="flex flex-col items-center gap-1.5">
                <div className="flex items-center gap-2">
                  <Link 
                    href="/quran-classes-in-uk" 
                    className="text-lg tracking-widest uppercase text-white hover:text-[#C8EB5F] transition-colors font-serif font-light"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Quran Classes in UK
                  </Link>
                  <button 
                    onClick={() => setUkSubpagesOpen(!ukSubpagesOpen)}
                    className="p-1 hover:text-[#C8EB5F] text-neutral-450 focus:outline-none"
                  >
                    <ChevronRight size={14} className={cn("transition-transform duration-200", ukSubpagesOpen ? "rotate-90 text-[#C8EB5F]" : "")} />
                  </button>
                </div>
                {ukSubpagesOpen && (
                  <div className="flex flex-col items-center gap-1 pl-3 border-l border-white/10 my-1 animate-fadeIn">
                    <Link href="/online-quran-classes-london" className="text-xs uppercase tracking-wider text-neutral-400 hover:text-[#C8EB5F]" onClick={() => setMobileMenuOpen(false)}>• London</Link>
                    <Link href="/online-quran-classes-manchester" className="text-xs uppercase tracking-wider text-neutral-400 hover:text-[#C8EB5F]" onClick={() => setMobileMenuOpen(false)}>• Manchester</Link>
                    <Link href="/online-quran-classes-birmingham" className="text-xs uppercase tracking-wider text-neutral-400 hover:text-[#C8EB5F]" onClick={() => setMobileMenuOpen(false)}>• Birmingham</Link>
                  </div>
                )}
              </div>

              {/* Europe Mobile Collapsible Subitems */}
              <div className="flex flex-col items-center gap-1.5">
                <div className="flex items-center gap-2">
                  <Link 
                    href="/quran-in-the-world/quran-classes-in-europe" 
                    className="text-lg tracking-widest uppercase text-[#C8EB5F] hover:text-[#C8EB5F] transition-colors font-serif font-semibold"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Quran Classes in Europe ✦
                  </Link>
                  <button 
                    onClick={() => setEuropeSubpagesOpen(!europeSubpagesOpen)}
                    className="p-1 hover:text-[#C8EB5F] text-neutral-450 focus:outline-none"
                  >
                    <ChevronRight size={14} className={cn("transition-transform duration-200", europeSubpagesOpen ? "rotate-90 text-[#C8EB5F]" : "")} />
                  </button>
                </div>
                {europeSubpagesOpen && (
                  <div className="flex flex-col items-center gap-1 pl-3 border-l border-white/10 my-1 animate-fadeIn">
                    <Link href="/online-quran-classes-germany" className="text-xs uppercase tracking-wider text-neutral-400 hover:text-[#C8EB5F]" onClick={() => setMobileMenuOpen(false)}>• Germany</Link>
                    <Link href="/online-quran-classes-france" className="text-xs uppercase tracking-wider text-[#C8EB5F]" onClick={() => setMobileMenuOpen(false)}>• France ✦</Link>
                    <Link href="/online-quran-classes-netherlands" className="text-xs uppercase tracking-wider text-neutral-400 hover:text-[#C8EB5F]" onClick={() => setMobileMenuOpen(false)}>• Netherlands</Link>
                  </div>
                )}
              </div>

              <Link href="/free-trial" className="text-lg tracking-widest uppercase text-[#C8EB5F] hover:text-white" onClick={() => setMobileMenuOpen(false)}>Book Free Trial</Link>
            </div>

            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                setBookingType("trial");
                setBookingOpen(true);
              }}
              className="w-full bg-[#C8EB5F] p-4 text-black text-xs font-mono font-bold uppercase tracking-widest text-center shadow-lg cursor-pointer mt-auto rounded-xl"
            >
              FREE TRIAL SENSING CLASS
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. HeroSection Component */}
      <HeroSection 
        logo={{
          url: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=120&auto=format&fit=crop",
          alt: "TajweedPage Verified Education logo France",
          text: "TajweedPage"
        }}
        slogan="EXCELLENCE ACADÉMIQUE FRANCE"
        title={
          <span>
            Cours de Coran en Ligne <br/>
            <span className="text-[#C8EB5F] font-serif italic">En Direct en France</span>
          </span>
        }
        subtitle="Découvrez des cours de Coran en ligne haut de gamme et personnalisés (1-to-1) pour enfants, femmes et adultes en France. Apprenez en toute sérénité avec des professeurs natifs certifiés d'Al-Azhar, selon des horaires flexibles synchronisés sur le fuseau horaire français."
        backgroundImage="https://i.postimg.cc/WbGDtqBG/pexels-a-darmel-8164752.jpg"
        callToAction={{
          text: "RÉSERVER MON COURS D'ESSAI",
          href: "#trial-inquiry"
        }}
        contactInfo={{
          website: "tajweedpage.com/fr",
          phone: "+33 (0) 1 45 61 72 83",
          address: "Rue de la Paix, 75002 Paris, France"
        }}
      />

      {/* 2. TextParallaxContent Component for Why Students Choose TajweedPage */}
      <div className="bg-black py-20 border-b border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center mb-16">
          <span className="text-[10px] font-mono tracking-[0.3em] text-[#C8EB5F] uppercase">CULTURE DU SUCCÈS</span>
          <h2 className="text-4xl font-serif font-light uppercase tracking-tight text-white mt-3">Pourquoi Choisir Notre Académie en France</h2>
          <p className="text-sm text-neutral-400 font-light max-w-2xl mx-auto mt-4 font-sans leading-relaxed">
            Adapté aux rythmes de vie exigeants des familles à Paris, Lyon, Marseille et Toulouse, notre système allie la transmission orale traditionnelle du Tajwid aux outils digitaux interactifs.
          </p>
        </div>

        <TextParallaxContent 
          imgUrl="https://i.postimg.cc/g0Tj1Vh9/pexels-rdne-7249256-(1).jpg"
          subheading="Professeurs d'Al-Azhar"
          heading="Savant Arabes pour la Communauté en France"
        >
          {/* Custom SEO Content Grid */}
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-6 pb-24 pt-12 md:grid-cols-12 text-white">
            <h3 className="col-span-1 text-2xl font-serif font-light uppercase tracking-wide text-[#C8EB5F] md:col-span-4 leading-snug">
              Des cours individuels focalisés sur votre progression
            </h3>
            <div className="col-span-1 md:col-span-8 space-y-6 text-neutral-300 font-light text-sm sm:text-base leading-relaxed">
              <p>
                La communauté musulmane de France recherche de véritables alternatives qualitatives pour apprendre la récitation authentique du Coran. Les salles de classe surpeuplées limitent la correction phonétique fine. Notre portail haut de gamme résout cela en fournissant un suivi individuel strict sur Zoom.
              </p>
              <p>
                Nos enseignants sont titulaires d'une Ijazah prestigieuse (chaîne de transmission traditionnelle) d'institutions d'élite comme Al-Azhar. Cela garantit l'acquisition d'une articulation buccale irréprochable (Makharij). Les étudiants francophones bénéficient d'une méthode progressive, pédagogique et bienveillante pour lire avec fluidité et excellence.
              </p>
              <div className="pt-2">
                <button 
                  onClick={() => {
                    setBookingType("demo");
                    setBookingOpen(true);
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 border border-[#C8EB5F] hover:bg-[#C8EB5F] hover:text-black text-[#C8EB5F] font-mono text-[10px] uppercase font-bold tracking-widest transition-all rounded-lg"
                >
                  AUDIT TEACHER REGISTER <ArrowUpRight size={12} />
                </button>
              </div>
            </div>
          </div>
        </TextParallaxContent>

        <TextParallaxContent 
          imgUrl="https://i.postimg.cc/cCQJKPby/pexels-a-darmel-8164713.jpg"
          subheading="Méthode Noorani"
          heading="Fondations Phonetiques Rigoureuses"
        >
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-6 pb-24 pt-12 md:grid-cols-12 text-white">
            <h3 className="col-span-1 text-2xl font-serif font-light uppercase tracking-wide text-[#C8EB5F] md:col-span-4 leading-snug">
              Un Agenda Parfaitement Synchronisé
            </h3>
            <div className="col-span-1 md:col-span-8 space-y-6 text-neutral-300 font-light text-sm sm:text-base leading-relaxed">
              <p>
                Les fondations phonétiques de la lecture reposent sur une rigueur minutieuse. Notre programme de Noorani Qaida aide les plus jeunes comme les adultes à maîtriser sans effort les sons arabes les plus complexes.
              </p>
              <p>
                Les parents de France privilégient nos séances individuelles en raison de leur flexibilité absolue. Notre équipe administrative assure un suivi en français, et les progrès de chaque élève sont consignés en direct dans un tableau de bord numérique accessible 24/7.
              </p>
            </div>
          </div>
        </TextParallaxContent>
      </div>

      {/* 3. Program Available Section */}
      <section className="py-24 bg-zinc-950 border-b border-white/5 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <span className="text-[10px] font-mono tracking-[0.3em] text-[#C8EB5F] uppercase">PROGRAMMES EXCLUSIFS</span>
            <h2 className="text-4xl font-serif font-light uppercase tracking-tight text-white leading-none">Nos Formules d&apos;Étude pour la France</h2>
            <div className="h-px w-24 bg-[#C8EB5F] mx-auto my-4" />
            <p className="text-neutral-400 text-xs sm:text-sm font-light font-sans max-w-2xl mx-auto leading-relaxed">
              Trois cursus d&apos;élite structurés par des spécialistes de l&apos;éducation islamique pour répondre aux emplois du temps rigoureux des familles en France.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Card 1 */}
            <div className="bg-black border border-white/5 hover:border-[#C8EB5F]/35 rounded-[32px] p-8 transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between group shadow-2xl">
              <div className="space-y-6">
                <span className="text-[9px] font-mono tracking-[0.25em] text-[#C8EB5F] uppercase font-bold bg-[#C8EB5F]/5 border border-[#C8EB5F]/15 px-3 py-1 rounded-full inline-block">FONDATIONS (4-12 ANS)</span>
                <h3 className="font-serif text-2xl font-light text-white uppercase group-hover:text-[#C8EB5F] transition-colors mt-2">Noorani Qaida</h3>
                <p className="text-xs text-neutral-400 font-light font-sans leading-relaxed">
                  Idéal pour les enfants débutants. Un apprentissage ludique et structuré de la phonétique arabe, des règles de base de la lecture et de la liaison des lettres. Utilisation de supports et tableaux interactifs de dernière génération.
                </p>
                <div className="h-px bg-white/5 my-4" />
                <ul className="space-y-3.5 text-xs text-neutral-300 font-mono">
                  <li className="flex gap-2 items-center"><Check size={12} className="text-[#C8EB5F]" /> 2 ou 3 Sessions par semaine</li>
                  <li className="flex gap-2 items-center"><Check size={12} className="text-[#C8EB5F]" /> Enseignants d&apos;Al-Azhar</li>
                  <li className="flex gap-2 items-center"><Check size={12} className="text-[#C8EB5F]" /> Portails interactifs Zoom</li>
                </ul>
              </div>
              <div className="pt-8 mt-8 border-t border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-[9px] font-mono text-neutral-500 uppercase block tracking-wider">INVESTISSEMENT</span>
                  <span className="font-serif text-2xl text-white font-medium">€59<span className="text-xs text-neutral-405">/mois</span></span>
                </div>
                <button 
                  onClick={() => {
                    setBookingType("trial");
                    setBookingOpen(true);
                  }}
                  className="px-5 py-3 bg-[#C8EB5F]/10 hover:bg-[#C8EB5F] text-[#C8EB5F] hover:text-black font-mono text-[9px] font-bold uppercase tracking-widest transition-all duration-300 rounded-lg"
                >
                  S&apos;INSCRIRE
                </button>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-black border border-[#C8EB5F]/25 hover:border-[#C8EB5F] rounded-[32px] p-8 transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between relative shadow-[0_0_50px_rgba(200,235,95,0.05)] group">
              <div className="absolute top-6 right-6 font-mono text-[8px] tracking-widest text-black bg-[#C8EB5F] px-3 py-1 uppercase rounded-full font-bold">RECOMMANDÉ</div>
              <div className="space-y-6">
                <span className="text-[9px] font-mono tracking-[0.25em] text-[#C8EB5F] uppercase font-bold bg-[#C8EB5F]/10 border border-[#C8EB5F]/30 px-3 py-1 rounded-full inline-block">POST-DÉBUTANT ET ADULTE</span>
                <h3 className="font-serif text-2xl font-light text-white uppercase group-hover:text-[#C8EB5F] transition-colors mt-2">Tajweed Master Series</h3>
                <p className="text-xs text-neutral-400 font-light font-sans leading-relaxed">
                  Un programme approfondi destiné aux sœurs ou frères désireux d&apos;éradiquer les erreurs de prononciation et de parfaire la mélodie de récitation. Intègre les règles complexes de Tajwid et l&apos;obtention de diplômes (Ijazah).
                </p>
                <div className="h-px bg-white/5 my-4" />
                <ul className="space-y-3.5 text-xs text-neutral-300 font-mono">
                  <li className="flex gap-2 items-center"><Check size={12} className="text-[#C8EB5F]" /> Professeurs Dédiés Personnels</li>
                  <li className="flex gap-2 items-center"><Check size={12} className="text-[#C8EB5F]" /> Contenu Pédagogique Avancé</li>
                  <li className="flex gap-2 items-center"><Check size={12} className="text-[#C8EB5F]" /> Cursus officiel Al-Azhar</li>
                </ul>
              </div>
              <div className="pt-8 mt-8 border-t border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-[9px] font-mono text-neutral-500 uppercase block tracking-wider">INVESTISSEMENT</span>
                  <span className="font-serif text-2xl text-white font-medium">€79<span className="text-xs text-neutral-405">/mois</span></span>
                </div>
                <button 
                  onClick={() => {
                    setBookingType("trial");
                    setBookingOpen(true);
                  }}
                  className="px-5 py-3 bg-[#C8EB5F] hover:bg-white text-black font-mono text-[9px] font-bold uppercase tracking-widest transition-all duration-300 rounded-lg"
                >
                  S&apos;INSCRIRE
                </button>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-black border border-white/5 hover:border-[#C8EB5F]/35 rounded-[32px] p-8 transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between group shadow-2xl">
              <div className="space-y-6">
                <span className="text-[9px] font-mono tracking-[0.25em] text-cyan-400 uppercase font-bold bg-cyan-400/5 border border-cyan-400/15 px-3 py-1 rounded-full inline-block">CURSUS INTENSIF</span>
                <h3 className="font-serif text-2xl font-light text-white uppercase group-hover:text-[#C8EB5F] transition-colors mt-2">Mémorisation Hifz</h3>
                <p className="text-xs text-neutral-400 font-light font-sans leading-relaxed">
                  Un parcours rigoureux pour mémoriser les chapitres sélectionnés (Jouz) ou le Coran complet. Allie les méthodes traditionnelles de mémorisation orale et de révision des versets pour une exactitude spirituelle parfaite.
                </p>
                <div className="h-px bg-white/5 my-4" />
                <ul className="space-y-3.5 text-xs text-neutral-300 font-mono">
                  <li className="flex gap-2 items-center"><Check size={12} className="text-cyan-400" /> Suivi quotidien des versets révisés</li>
                  <li className="flex gap-2 items-center"><Check size={12} className="text-cyan-400" /> Cahier de Mémorisation digital</li>
                  <li className="flex gap-2 items-center"><Check size={12} className="text-cyan-400" /> Évaluation par des érudits arabes</li>
                </ul>
              </div>
              <div className="pt-8 mt-8 border-t border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-[9px] font-mono text-neutral-500 uppercase block tracking-wider">INVESTISSEMENT</span>
                  <span className="font-serif text-2xl text-white font-medium">€99<span className="text-xs text-neutral-405">/mois</span></span>
                </div>
                <button 
                  onClick={() => {
                    setBookingType("trial");
                    setBookingOpen(true);
                  }}
                  className="px-5 py-3 bg-[#C8EB5F]/10 hover:bg-[#C8EB5F] text-[#C8EB5F] hover:text-black font-mono text-[9px] font-bold uppercase tracking-widest transition-all duration-300 rounded-lg"
                >
                  S&apos;INSCRIRE
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4. Start Learning Quran - Live Scroll Parallax Feature Section */}
      <section className="py-24 bg-black border-b border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
            <span className="text-[10px] font-mono tracking-[0.3em] text-[#C8EB5F] uppercase">APPRENDRE EN IMMERSION</span>
            <h2 className="text-4xl font-serif font-light uppercase tracking-tight text-white leading-none">Votre Parcours Pas à Pas en France</h2>
            <div className="h-px w-24 bg-[#C8EB5F] mx-auto my-4" />
          </div>

          <div className="flex flex-col md:px-0">
            
            {/* Slide 1 */}
            <div
              ref={ref1}
              className="min-h-[80vh] flex flex-col md:flex-row items-center justify-center md:gap-40 gap-12"
            >
              <motion.div style={{ y: translate1 }} className="flex-1 max-w-sm">
                <span className="font-mono text-[10px] tracking-widest text-[#C8EB5F] uppercase block mb-3">CONQUÊTE 1</span>
                <h3 className="text-4xl font-serif font-light uppercase tracking-tight text-white leading-tight">Obtenez votre audit d&apos;essai gratuit</h3>
                <motion.p
                  className="text-neutral-400 text-xs sm:text-sm font-light mt-6 leading-relaxed font-sans"
                >
                  Complétez vos préférences de formation sur notre site en moins de 2 minutes. Un responsable pédagogique francophone vous contactera directement sur WhatsApp ou par e-mail sous 2 heures pour désigner l&apos;enseignant et fixer votre session d&apos;essai.
                </motion.p>
              </motion.div>
              
              <motion.div
                style={{
                  opacity: opacity1,
                  clipPath: clipProgress1,
                }}
                className="relative flex-1 max-w-md"
              >
                <div className="relative aspect-square w-full rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-zinc-950">
                  <Image
                    src="https://i.postimg.cc/02sjg2zQ/pexels-talha-sungu-244411152-13202918.jpg"
                    fill
                    className="object-cover brightness-95 saturate-[0.85]"
                    alt="Authentic Quran Learning Foundations France"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                </div>
              </motion.div>
            </div>

            {/* Slide 2 */}
            <div
              ref={ref2}
              className="min-h-[80vh] flex flex-col md:flex-row-reverse items-center justify-center md:gap-40 gap-12"
            >
              <motion.div style={{ y: translate2 }} className="flex-1 max-w-sm">
                <span className="font-mono text-[10px] tracking-widest text-[#C8EB5F] uppercase block mb-3">CONQUÊTE 2</span>
                <h3 className="text-4xl font-serif font-light uppercase tracking-tight text-white leading-tight">Suivez vos cours 1-to-1 en live</h3>
                <motion.p
                  className="text-neutral-400 text-xs sm:text-sm font-light mt-6 leading-relaxed font-sans"
                >
                  Connectez-vous à votre espace virtuel privatisé depuis votre ordinateur ou tablette. Votre érudit de l&apos;Université Al-Azhar applique des correctifs phonétiques slow-motion et surligne les zones de mémorisation en direct.
                </motion.p>
              </motion.div>

              <motion.div
                style={{
                  opacity: opacity2,
                  clipPath: clipProgress2,
                }}
                className="relative flex-1 max-w-md"
              >
                <div className="relative aspect-square w-full rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-zinc-950">
                  <Image
                    src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1024&auto=format&fit=crop"
                    fill
                    className="object-cover brightness-95"
                    alt="Correct live articulation sessions in France"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                </div>
              </motion.div>
            </div>

            {/* Slide 3 */}
            <div
              ref={ref3}
              className="min-h-[80vh] flex flex-col md:flex-row items-center justify-center md:gap-40 gap-12"
            >
              <motion.div style={{ y: translate3 }} className="flex-1 max-w-sm">
                <span className="font-mono text-[10px] tracking-widest text-[#C8EB5F] uppercase block mb-3">CONQUÊTE 3</span>
                <h3 className="text-4xl font-serif font-light uppercase tracking-tight text-white leading-tight">Consultez nos livrets de suivi interactifs</h3>
                <motion.p
                  className="text-neutral-400 text-xs sm:text-sm font-light mt-6 leading-relaxed font-sans"
                >
                  Ne laissez aucune place au hasard. Les chapitres appris, les erreurs corrigées et les prochaines sourates à mémoriser sont répertoriés à l&apos;issue de chaque classe dans votre espace de suivi. Recevez des bilans hebdomadaires directs sur WhatsApp.
                </motion.p>
              </motion.div>

              <motion.div
                style={{
                  opacity: opacity3,
                  clipPath: clipProgress3,
                }}
                className="relative flex-1 max-w-md"
              >
                <div className="relative aspect-square w-full rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-zinc-950">
                  <Image
                    src="https://i.postimg.cc/nLCcKXPr/pexels-pok-rie-33563-945030.jpg"
                    fill
                    className="object-cover brightness-95"
                    alt="Detailed session logbooks France"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                </div>
              </motion.div>
            </div>

          </div>

        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="py-24 bg-zinc-950 border-b border-white/5 relative">
        <div className="max-w-4xl mx-auto px-6">
          
          <div className="text-center mb-16 space-y-4">
            <span className="text-[10px] font-mono tracking-[0.3em] text-[#C8EB5F] uppercase">REGISTRE DE RÉPONSES</span>
            <h2 className="text-3xl font-serif font-light uppercase tracking-tight text-white leading-none">Questions Fréquemment Posées</h2>
            <div className="h-px w-20 bg-[#C8EB5F] mx-auto my-4" />
          </div>

          <div className="space-y-4">
            {faqData.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div 
                  key={index} 
                  className="border border-white/5 bg-black rounded-2xl overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
                  >
                    <span className="font-serif text-base uppercase text-white tracking-wide pr-4">{faq.question}</span>
                    <ChevronDown size={16} className={cn("text-[#C8EB5F] shrink-0 transition-transform duration-300", isOpen ? "rotate-180" : "")} />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="px-6 pb-6 text-xs sm:text-sm text-neutral-400 font-light font-sans leading-relaxed border-t border-white/5 pt-4">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Contact & Demo Form Section */}
      <section id="trial-inquiry" className="py-24 bg-black border-b border-white/5 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="space-y-8">
            <span className="text-[10px] font-mono tracking-[0.3em] text-[#C8EB5F] uppercase block">BUREAU D&apos;ASSISTANCE</span>
            <h2 className="text-4xl md:text-5xl font-serif font-light uppercase tracking-tight text-white leading-tight">
              Inscrivez Votre Famille <br />
              <span className="text-[#C8EB5F] italic font-normal font-serif">Aujourd&apos;hui en France</span>
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed max-w-xl font-sans">
              Complétez notre formulaire sécurisé de demande d&apos;inscription. Un coordinateur d&apos;assistance francophone vous recontactera sous 2 heures par WhatsApp ou e-mail pour confirmer les horaires, choisir l&apos;enseignant adéquat et verrouiller votre essai gratuit.
            </p>

            <div className="space-y-4 border-t border-white/5 pt-8">
              <div className="flex gap-4 items-center">
                <div className="w-10 h-10 rounded-full bg-zinc-950 border border-white/10 flex items-center justify-center shrink-0">
                  <Mail className="text-[#C8EB5F]" size={16} />
                </div>
                <div>
                  <span className="text-[9px] font-mono text-neutral-500 uppercase block tracking-wider">SECURE INQUIRY EMAIL</span>
                  <a href="mailto:abuqitmirshirazalmadani@gmail.com" className="text-xs font-mono text-white hover:text-[#C8EB5F]">abuqitmirshirazalmadani@gmail.com</a>
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <div className="w-10 h-10 rounded-full bg-zinc-950 border border-white/10 flex items-center justify-center shrink-0">
                  <MessageSquare className="text-emerald-400" size={16} />
                </div>
                <div>
                  <span className="text-[9px] font-mono text-neutral-500 uppercase block tracking-wider">WHATSAPP DIRECT CONCIERGE</span>
                  <a href="https://wa.me/923708201211?text=Asalamu%20Alaikum,%20I%20am%20interested%20in%20taking%20Tajweed%2520online%2520classes%2520with%2520Tajweedpage." target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-emerald-400 hover:text-white transition-colors">+92 370 8201211</a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-zinc-950 border border-white/5 p-8 rounded-[36px] shadow-2xl">
            <div className="mb-6 space-y-2">
              <span className="text-[9px] font-mono tracking-[0.3em] text-[#C8EB5F] uppercase font-bold block">PORTAIL D&apos;ENREGISTREMENT FRANCE</span>
              <h3 className="font-serif text-2xl uppercase text-white leading-none font-light">Espace d&apos;Essai Sécurisé</h3>
            </div>

            {formSubmitted ? (
              <div className="bg-[#C8EB5F]/10 border border-[#C8EB5F]/20 p-8 rounded-2xl text-center space-y-4">
                <CheckCircle2 className="text-[#C8EB5F] mx-auto animate-bounce" size={32} />
                <h4 className="text-white font-serif text-lg">Demande Enregistrée avec Succès</h4>
                <p className="text-neutral-400 text-xs font-light leading-relaxed font-sans">
                  Succès ! Un coordinateur de notre secrétariat vous contactera par WhatsApp ou e-mail sous 2 heures pour valider votre heure d&apos;essai.
                </p>
                <button 
                  onClick={() => setFormSubmitted(false)}
                  className="text-xs font-mono text-[#C8EB5F] hover:underline"
                >
                  Enregistrer un autre élève
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
                  <label className="text-[10px] tracking-widest font-mono text-neutral-400 uppercase block mb-1.5">Nom Complet</label>
                  <input
                    type="text"
                    required
                    placeholder="ex. Salim Ahmed"
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-3.5 text-xs text-white focus:outline-none focus:border-[#C8EB5F]"
                  />
                </div>

                <div>
                  <label className="text-[10px] tracking-widest font-mono text-neutral-400 uppercase block mb-1.5">Adresse Email</label>
                  <input
                    type="email"
                    required
                    placeholder="ex. salim@gmail.com"
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-3.5 text-xs text-white focus:outline-none focus:border-[#C8EB5F]"
                  />
                </div>

                <div>
                  <label className="text-[10px] tracking-widest font-mono text-neutral-400 uppercase block mb-1.5">Numéro WhatsApp</label>
                  <input
                    type="tel"
                    required
                    placeholder="ex. +33 6 12 34 56 78"
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-3.5 text-xs text-white focus:outline-none focus:border-[#C8EB5F]"
                  />
                </div>

                <div>
                  <label className="text-[10px] tracking-widest font-mono text-neutral-400 uppercase block mb-1.5">Cours Désiré</label>
                  <select 
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-3.5 text-xs text-white focus:outline-none focus:border-[#C8EB5F]"
                  >
                    <option className="bg-neutral-950">Noorani Qaida pour Enfants (Fondations)</option>
                    <option className="bg-neutral-950">Tajweed Master Series (Adultes / Sœurs)</option>
                    <option className="bg-neutral-950">Mémorisation Intensive Hifz</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#C8EB5F] p-4 text-black text-[11px] tracking-widest font-mono uppercase font-bold text-center mt-2 shadow-[0_4px_25px_rgba(200,235,95,0.15)] rounded-lg cursor-pointer"
                >
                  SECURE LIVE TRIAL NOW
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* Premium Multi-column Footer */}
      

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-4 items-end">
        <a 
          href="mailto:abuqitmirshirazalmadani@gmail.com" 
          className="group relative flex items-center justify-center w-14 h-14 bg-neutral-900 text-white rounded-full border border-white/10 shadow-lg hover:bg-[#C8EB5F] hover:text-black hover:scale-110 transition-all duration-300"
        >
          <span className="absolute right-16 bg-white text-black text-[10px] font-bold px-3 py-2 rounded-lg opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-305 whitespace-nowrap shadow-xl flex items-center gap-2">
            Send Email
            <div className="absolute top-1/2 -right-1 -mt-1 w-2 h-2 bg-white rotate-45" />
          </span>
          <Mail size={22} />
        </a>

        <a 
          href="https://wa.me/923708201211?text=Asalamu%20Alaikum,%20I%20am%20interested%20in%20taking%20Tajweed%2520online%2520classes%2520with%2520Tajweedpage." 
          target="_blank" 
          rel="noopener noreferrer" 
          className="group relative flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:shadow-[0_0_30px_rgba(37,211,102,0.6)] hover:scale-110 transition-all duration-300"
        >
          <span className="absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75 animate-ping" />
          <span className="absolute right-16 bg-white text-black text-[10px] font-bold px-3 py-2 rounded-lg opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-350 whitespace-nowrap shadow-xl flex items-center gap-2">
            Chat on WhatsApp
            <div className="absolute top-1/2 -right-1 -mt-1 w-2 h-2 bg-white rotate-45" />
          </span>
          <MessageSquare size={24} className="relative z-10" />
          <span className="absolute top-0 right-0 z-20 w-3 h-3 bg-red-500 border-2 border-neutral-900 rounded-full" />
        </a>
      </div>

      {/* Booking Dialogue Modal */}
      <AnimatePresence>
        {bookingOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
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

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="relative w-full max-w-lg bg-zinc-950 border border-[#C8EB5F]/25 p-8 sm:p-10 rounded-[36px] shadow-[0_0_50px_rgba(200,235,95,0.1)] z-10"
            >
              <button 
                onClick={() => {
                  setBookingOpen(false);
                  setFormSubmitted(false);
                }}
                className="absolute top-6 right-6 text-neutral-400 hover:text-white font-mono text-xs uppercase tracking-widest cursor-pointer"
              >
                [ CLOSE ]
              </button>

              <div className="space-y-4 mb-6">
                <span className="text-[9px] tracking-[0.3em] font-semibold text-[#C8EB5F] uppercase font-mono block">
                  {bookingType === "trial" ? "SÉANCE D&apos;ESSAI GRATUITE (FRANCE)" : "CURSUS DIAGNOSTIQUE DEMO"}
                </span>
                <h3 className="font-serif text-2xl uppercase text-white leading-none font-light">
                  {bookingType === "trial" ? "Obtenez un Cours d&apos;Essai Gratuit" : "Planifier mon cours diagnostique"}
                </h3>
                <p className="text-xs text-neutral-400 font-light font-sans">
                  Apprenez en tête-à-tête sur Zoom avec des professeurs d&apos;Al-Azhar en France.
                </p>
              </div>

              {formSubmitted ? (
                <div className="bg-[#C8EB5F]/10 border border-[#C8EB5F]/30 p-6 rounded-2xl text-center space-y-4">
                  <CheckCircle2 className="text-[#C8EB5F] mx-auto animate-bounce" size={32} />
                  <h4 className="text-white font-serif text-lg">Inquiry Confirmed</h4>
                  <p className="text-neutral-400 text-xs font-light leading-relaxed font-sans">
                    Succès ! Un coordinateur vous contactera directement sous 2 heures par WhatsApp ou e-mail.
                  </p>
                  <button
                    onClick={() => {
                      setBookingOpen(false);
                      setFormSubmitted(false);
                    }}
                    className="mt-2 text-xs font-mono text-[#C8EB5F] hover:underline cursor-pointer"
                  >
                    Retourner sur le site
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
                    <label className="text-[10px] tracking-widest font-mono text-neutral-400 uppercase block mb-1.5">Nom Complet</label>
                    <input
                      type="text"
                      required
                      placeholder="ex. Salim Ahmed"
                      className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#C8EB5F]"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] tracking-widest font-mono text-neutral-400 uppercase block mb-1.5">Adresse Email</label>
                    <input
                      type="email"
                      required
                      placeholder="ex. salim@gmail.com"
                      className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#C8EB5F]"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] tracking-widest font-mono text-neutral-400 uppercase block mb-1.5">Numéro WhatsApp</label>
                    <input
                      type="tel"
                      required
                      placeholder="ex. +33 6 12 34 56 78"
                      className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#C8EB5F]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#C8EB5F] p-4 text-black text-[11px] tracking-widest font-mono uppercase font-bold text-center mt-2 shadow-[0_4px_25px_rgba(200,235,95,0.15)] cursor-pointer rounded-lg"
                  >
                    SECURE LIVE TRIAL
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
