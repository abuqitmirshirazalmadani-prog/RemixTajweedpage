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
                        "Flexibele uren afgestemd op Nederlandse tijd",
                        "Gecertificeerde docenten van de Al-Azhar Universiteit",
                        "Exclusieve 1-op-1 portalen voor kinderen & zusters",
                        "Volledige voortgangsregistratie en wekelijkse logs",
                        "Interactieve digitale hulpmiddelen en Tajweed"
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
                alt="Tajweed Online Quran Tutors Netherlands" 
                fill 
                className="object-cover object-center brightness-90 saturate-[0.85]"
                sizes="(max-width: 768px) 100vw, 50vw"
                referrerPolicy="no-referrer"
                priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent md:bg-gradient-to-l md:from-black md:via-black/20 md:to-transparent" />
            <div className="absolute bottom-6 left-6 z-10 font-mono text-[9px] tracking-widest text-[#C8EB5F] uppercase bg-black/80 px-4 py-2 border border-white/10 rounded-lg">
                Exclusive Netherlands Portal
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

export default function NetherlandsQuranClasses() {
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
      question: "Zijn er Nederlands sprekende coördinatoren of helpdesks beschikbaar?",
      answer: "Ja, we bieden complete coördinatie-ondersteuning aan in het Nederlands. Hoewel de geleerden hoofdzakelijk in het klassiek Arabisch reciteren en regels uitleggen in duidelijk Engels of Nederlands, helpt onze helpdesk u vlot met de administratie."
    },
    {
      question: "Hoe sluiten de lessen aan bij Nederlandse schoolvakanties en roosters?",
      answer: "We bieden uiterst flexibele planningen voor gezinnen in de Randstad (Amsterdam, Utrecht, Den Haag, Rotterdam). U bent vrij om lessen in te boeken na primair dagonderwijs, in de late middag of vroege ochtenduren tijdens het weekend."
    },
    {
      question: "Kan ik een vrouwelijke docent (Alimah) aanvragen voor zusters of jonge meiden?",
      answer: "Zeker. We beheren een uitgelezen databestand van vrouwelijke Alimah docenten met traditionele verbindingen aan Al-Azhar, speciaal voor dames en dochters in Nederland om in een uiterst discrete omgeving live te studeren."
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
              <span className="font-mono text-[8px] tracking-[0.3em] text-[#C8EB5F] block uppercase font-bold">PORTAAL NEDERLAND</span>
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

                  {/* Europe Dropdown - Default Open inside Netherlands */}
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
                      <Link href="/online-quran-classes-france" className="block px-3 py-1.5 text-[9px] tracking-wider font-mono text-neutral-400 hover:text-[#C8EB5F] hover:bg-white/5 rounded-lg transition-colors">
                        • France
                      </Link>
                      <Link href="/online-quran-classes-netherlands" className="block px-3 py-1.5 text-[9px] tracking-wider font-mono text-[#C8EB5F] hover:text-[#C8EB5F] hover:bg-white/5 rounded-lg transition-colors font-semibold font-bold">
                        • Netherlands ✦
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
                    <Link href="/online-quran-classes-france" className="text-xs uppercase tracking-wider text-neutral-400 hover:text-[#C8EB5F]" onClick={() => setMobileMenuOpen(false)}>• France</Link>
                    <Link href="/online-quran-classes-netherlands" className="text-xs uppercase tracking-wider text-[#C8EB5F]" onClick={() => setMobileMenuOpen(false)}>• Netherlands ✦</Link>
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
          url: "https://i.postimg.cc/T1XdXCYZ/pexels-sevval-karatas-58866204-15006786.jpg",
          alt: "TajweedPage Verified Education logo Netherlands",
          text: "TajweedPage"
        }}
        slogan="DUTCH LOCAL REGION"
        title={
          <span>
            Premium Online Quran <br/>
            <span className="text-[#C8EB5F] font-serif italic">Classes in Netherlands</span>
          </span>
        }
        subtitle="Studeer klassiek Arabisch en Tajweed via een exclusief 1-op-1 digitaal portaal, speciaal ontworpen voor kinderen, zusters en volwassenen in Nederland. Gegeven door gecertificeerde Azkhari docenten met aangepaste roosters in de Nederlandse tijdzone."
        backgroundImage="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1500&auto=format&fit=crop"
        callToAction={{
          text: "VERZEKER GRATIS PROEFLES",
          href: "#trial-inquiry"
        }}
        contactInfo={{
          website: "tajweedpage.com/nl",
          phone: "+(92) 323-3260859",
          address: "Keizersgracht, 1016 GD Amsterdam, Netherlands"
        }}
      />

      {/* 2. TextParallaxContent Component for Why Students Choose TajweedPage */}
      <div className="bg-black py-20 border-b border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center mb-16">
          <span className="text-[10px] font-mono tracking-[0.3em] text-[#C8EB5F] uppercase">EXCEPTIONEEL ONDERWIJS MODEL</span>
          <h2 className="text-4xl font-serif font-light uppercase tracking-tight text-white mt-3">Waarom Gezinnen in Nederland Voor Ons Kiezen</h2>
          <p className="text-sm text-neutral-400 font-light max-w-2xl mx-auto mt-4 font-sans leading-relaxed">
            Volledig afgestemd op de drukke levensstijlen in Amsterdam, Rotterdam, Den Haag en Utrecht. Wij combineren traditionele mondelinge overdracht met digitale dashboards.
          </p>
        </div>

        <TextParallaxContent 
          imgUrl="https://i.postimg.cc/mkwsW4n4/pexels-qamar-rehman-94539242-11758987.jpg"
          subheading="Al-Azhar Academici"
          heading="Top Azhari Geleerden voor Nederland"
        >
          {/* Custom SEO Content Grid */}
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-6 pb-24 pt-12 md:grid-cols-12 text-white">
            <h3 className="col-span-1 text-2xl font-serif font-light uppercase tracking-wide text-[#C8EB5F] md:col-span-4 leading-snug">
              Een 1-op-1 Leeromgeving voor Maximaal Resultat
            </h3>
            <div className="col-span-1 md:col-span-8 space-y-6 text-neutral-300 font-light text-sm sm:text-base leading-relaxed">
              <p>
                In Nederland is de vraag naar kwalitatief hoogwaardig Quran-onderwijs voor kinderen en volwassenen nog nooit zo groot geweest. Lokale moskeeën of gemeenschapscursussen hebben vaak te maken met lange wachtlijsten of overvolle klassen, waardoor er weinig ruimte is voor individuele feedback op de uitspraak (Makharij). Ons online platform biedt de perfecte oplossing met exclusieve 1-op-1 begeleiding.
              </p>
              <p>
                Elke docent in ons team bezit een legitieme Ijazah (traditionele onderwijsbevoegdheid) van toonaangevende universiteiten zoals Al-Azhar in Egypte. Dit garandeert dat correcte tongposities en uitspraakregels vanaf dag één nauwkeurig worden aangeleerd. Nederlandse studenten ervaren een inspirerende en geduldige sfeer die hun zelfvertrouwen stimuleert.
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
          imgUrl="https://i.postimg.cc/4xjjMn3K/pexels-ebahir-33451744.jpg"
          subheading="Noorani Methode"
          heading="Degelijke Fonetische Basis"
        >
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-6 pb-24 pt-12 md:grid-cols-12 text-white">
            <h3 className="col-span-1 text-2xl font-serif font-light uppercase tracking-wide text-[#C8EB5F] md:col-span-4 leading-snug">
              Perfect Inpasbaar in het Gezinsleven
            </h3>
            <div className="col-span-1 md:col-span-8 space-y-6 text-neutral-300 font-light text-sm sm:text-base leading-relaxed">
              <p>
                Het correct leren reciteren van de Koran is een stapsgewijs proces. Onze Noorani Qaida-methodiek stelt jonge jonge geesten en volwassenen in staat om op een speelse maar trefzekere wijze de letters en klanken onder de knie te krijgen.
              </p>
              <p>
                Onze administratieve ondersteuning is beschikbaar om alles soepel te coördineren, en de vorderingen van uw kind zijn doorlopend in te zien via een beveiligd online dashboard.
              </p>
            </div>
          </div>
        </TextParallaxContent>
      </div>

      {/* 3. Program Available Section */}
      <section className="py-24 bg-zinc-950 border-b border-white/5 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <span className="text-[10px] font-mono tracking-[0.3em] text-[#C8EB5F] uppercase">EXCLUSIEVE LEERPLANNEN</span>
            <h2 className="text-4xl font-serif font-light uppercase tracking-tight text-white leading-none">Onze Lespakketten in Nederland</h2>
            <div className="h-px w-24 bg-[#C8EB5F] mx-auto my-4" />
            <p className="text-neutral-400 text-xs sm:text-sm font-light font-sans max-w-2xl mx-auto leading-relaxed">
              Drie zorgvuldig samengestelde studietrajecten die aansluiten bij de agenda van drukke Nederlandse gezinnen.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Card 1 */}
            <div className="bg-black border border-white/5 hover:border-[#C8EB5F]/35 rounded-[32px] p-8 transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between group shadow-2xl">
              <div className="space-y-6">
                <span className="text-[9px] font-mono tracking-[0.25em] text-[#C8EB5F] uppercase font-bold bg-[#C8EB5F]/5 border border-[#C8EB5F]/15 px-3 py-1 rounded-full inline-block">KINDEREN (4-12 JAAR)</span>
                <h3 className="font-serif text-2xl font-light text-white uppercase group-hover:text-[#C8EB5F] transition-colors mt-2">Noorani Qaida</h3>
                <p className="text-xs text-neutral-400 font-light font-sans leading-relaxed">
                  Speciaal ontwikkeld voor jonge beginners. Spelenderwijs letters herkennen, klanken correct verbinden en de basisprincipes van het Arabisch lezen beheersen. Inclusief interactieve digitale schoolborden.
                </p>
                <div className="h-px bg-white/5 my-4" />
                <ul className="space-y-3.5 text-xs text-neutral-300 font-mono">
                  <li className="flex gap-2 items-center"><Check size={12} className="text-[#C8EB5F]" /> 2 of 3 Lessen per week</li>
                  <li className="flex gap-2 items-center"><Check size={12} className="text-[#C8EB5F]" /> Azhari Gecertificeerde Docenten</li>
                  <li className="flex gap-2 items-center"><Check size={12} className="text-[#C8EB5F]" /> Live Zoom-portalen</li>
                </ul>
              </div>
              <div className="pt-8 mt-8 border-t border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-[9px] font-mono text-neutral-500 uppercase block tracking-wider">INVESTERING</span>
                  <span className="font-serif text-2xl text-white font-medium">€59<span className="text-xs text-neutral-405">/mnd</span></span>
                </div>
                <button 
                  onClick={() => {
                    setBookingType("trial");
                    setBookingOpen(true);
                  }}
                  className="px-5 py-3 bg-[#C8EB5F]/10 hover:bg-[#C8EB5F] text-[#C8EB5F] hover:text-black font-mono text-[9px] font-bold uppercase tracking-widest transition-all duration-300 rounded-lg"
                >
                  NU VERZEKEREN
                </button>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-black border border-[#C8EB5F]/25 hover:border-[#C8EB5F] rounded-[32px] p-8 transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between relative shadow-[0_0_50px_rgba(200,235,95,0.05)] group">
              <div className="absolute top-6 right-6 font-mono text-[8px] tracking-widest text-black bg-[#C8EB5F] px-3 py-1 uppercase rounded-full font-bold">MEEST GEKOZEN</div>
              <div className="space-y-6">
                <span className="text-[9px] font-mono tracking-[0.25em] text-[#C8EB5F] uppercase font-bold bg-[#C8EB5F]/10 border border-[#C8EB5F]/30 px-3 py-1 rounded-full inline-block">VOLWASSENEN & SENIOREN</span>
                <h3 className="font-serif text-2xl font-light text-white uppercase group-hover:text-[#C8EB5F] transition-colors mt-2">Tajweed Master Series</h3>
                <p className="text-xs text-neutral-400 font-light font-sans leading-relaxed">
                  Een diepgaande en gedetailleerde studie voor broeders of zusters die vorderingen willen maken en Arabische fouten in de uitspraak willen uitsluiten. Uitgebreide aandacht voor ademhaling en melodieuze voordracht.
                </p>
                <div className="h-px bg-white/5 my-4" />
                <ul className="space-y-3.5 text-xs text-neutral-300 font-mono">
                  <li className="flex gap-2 items-center"><Check size={12} className="text-[#C8EB5F]" /> Persoonlijke Toegewijde Docent</li>
                  <li className="flex gap-2 items-center"><Check size={12} className="text-[#C8EB5F]" /> Geavanceerde Leereenheden</li>
                  <li className="flex gap-2 items-center"><Check size={12} className="text-[#C8EB5F]" /> Officiële certificering mogelijk</li>
                </ul>
              </div>
              <div className="pt-8 mt-8 border-t border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-[9px] font-mono text-neutral-500 uppercase block tracking-wider">INVESTERING</span>
                  <span className="font-serif text-2xl text-white font-medium">€79<span className="text-xs text-neutral-405">/mnd</span></span>
                </div>
                <button 
                  onClick={() => {
                    setBookingType("trial");
                    setBookingOpen(true);
                  }}
                  className="px-5 py-3 bg-[#C8EB5F] hover:bg-white text-black font-mono text-[9px] font-bold uppercase tracking-widest transition-all duration-300 rounded-lg"
                >
                  NU VERZEKEREN
                </button>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-black border border-white/5 hover:border-[#C8EB5F]/35 rounded-[32px] p-8 transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between group shadow-2xl">
              <div className="space-y-6">
                <span className="text-[9px] font-mono tracking-[0.25em] text-cyan-400 uppercase font-bold bg-cyan-400/5 border border-cyan-400/15 px-3 py-1 rounded-full inline-block">INTENSIEF</span>
                <h3 className="font-serif text-2xl font-light text-white uppercase group-hover:text-[#C8EB5F] transition-colors mt-2">Hifz Memoriseringsprogramma</h3>
                <p className="text-xs text-neutral-400 font-light font-sans leading-relaxed">
                  Een intensief en gestructureerd traject gericht op het memoriseren van geselecteerde hoofdstukken (Juz) of de gehele Quran, inclusief herhalingsschema&apos;s voor een onberispelijke nauwkeurigheid.
                </p>
                <div className="h-px bg-white/5 my-4" />
                <ul className="space-y-3.5 text-xs text-neutral-300 font-mono">
                  <li className="flex gap-2 items-center"><Check size={12} className="text-cyan-400" /> Dagelijkse Voortgangstracking</li>
                  <li className="flex gap-2 items-center"><Check size={12} className="text-cyan-400" /> Digitaal Memoriseringsboek</li>
                  <li className="flex gap-2 items-center"><Check size={12} className="text-cyan-400" /> Evaluatie door Arabische Geleerden</li>
                </ul>
              </div>
              <div className="pt-8 mt-8 border-t border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-[9px] font-mono text-neutral-500 uppercase block tracking-wider">INVESTERING</span>
                  <span className="font-serif text-2xl text-white font-medium">€99<span className="text-xs text-neutral-405">/mnd</span></span>
                </div>
                <button 
                  onClick={() => {
                    setBookingType("trial");
                    setBookingOpen(true);
                  }}
                  className="px-5 py-3 bg-[#C8EB5F]/10 hover:bg-[#C8EB5F] text-[#C8EB5F] hover:text-black font-mono text-[9px] font-bold uppercase tracking-widest transition-all duration-300 rounded-lg"
                >
                  NU VERZEKEREN
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
            <span className="text-[10px] font-mono tracking-[0.3em] text-[#C8EB5F] uppercase">EXCLUSIEF STAP-VOOR-STAP MODEL</span>
            <h2 className="text-4xl font-serif font-light uppercase tracking-tight text-white leading-none">Hoe Onze Lessen Live Gaan</h2>
            <div className="h-px w-24 bg-[#C8EB5F] mx-auto my-4" />
          </div>

          <div className="flex flex-col md:px-0">
            
            {/* Slide 1 */}
            <div
              ref={ref1}
              className="min-h-[80vh] flex flex-col md:flex-row items-center justify-center md:gap-40 gap-12"
            >
              <motion.div style={{ y: translate1 }} className="flex-1 max-w-sm">
                <span className="font-mono text-[10px] tracking-widest text-[#C8EB5F] uppercase block mb-3">STAP EEN</span>
                <h3 className="text-4xl font-serif font-light uppercase tracking-tight text-white leading-tight">Vraag Uw Gratis Proefles Aan</h3>
                <motion.p
                  className="text-neutral-400 text-xs sm:text-sm font-light mt-6 leading-relaxed font-sans"
                >
                  Voer uw gegevens veilig in op ons digitale inschrijfformulier. Een coördinator neemt binnen 2 uur via WhatsApp of e-mail contact met u op om uw wensen en tijden te bespreken en uw gratis proefles vast te leggen.
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
                    src="https://i.postimg.cc/FzF6cLPQ/pexels-a-darmel-8164744.jpg"
                    fill
                    className="object-cover brightness-95 saturate-[0.85]"
                    alt="Authentic Quran Learning Foundations Netherlands"
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
                <span className="font-mono text-[10px] tracking-widest text-[#C8EB5F] uppercase block mb-3">STAP TWEE</span>
                <h3 className="text-4xl font-serif font-light uppercase tracking-tight text-white leading-tight">Studeer 1-op-1 Live in Realtime</h3>
                <motion.p
                  className="text-neutral-400 text-xs sm:text-sm font-light mt-6 leading-relaxed font-sans"
                >
                  Neem live deel aan uw les op tablet of computer. Uw Azkhari docent begeleidt u stap voor stap, verbetert klankafwijkingen nauwgezet en belicht de Tajweed-regels op een heldere, geduldige wijze.
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
                    alt="Correct live articulation sessions in Netherlands"
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
                <span className="font-mono text-[10px] tracking-widest text-[#C8EB5F] uppercase block mb-3">STAP DRIE</span>
                <h3 className="text-4xl font-serif font-light uppercase tracking-tight text-white leading-tight">Voortgangsregistratie & Logboeken</h3>
                <motion.p
                  className="text-neutral-400 text-xs sm:text-sm font-light mt-6 leading-relaxed font-sans"
                >
                  Niets wordt aan het toeval overgelaten. Elke geleerde les, behaalde fonetische mijlpaal en te herhalen verzen worden genoteerd in uw beveiligde online dagboek. Ontvang wekelijks updates via WhatsApp.
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
                    src="https://i.postimg.cc/cLfcxJm2/pexels-yusuf-miah-70201554-11802952-(1).jpg"
                    fill
                    className="object-cover brightness-95"
                    alt="Detailed session logbooks Netherlands"
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
            <span className="text-[10px] font-mono tracking-[0.3em] text-[#C8EB5F] uppercase">ANTWOORDEN REGISTRY</span>
            <h2 className="text-3xl font-serif font-light uppercase tracking-tight text-white leading-none">Veelgestelde Vragen</h2>
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
            <span className="text-[10px] font-mono tracking-[0.3em] text-[#C8EB5F] uppercase block">CONTACT RECEPTIE DESK</span>
            <h2 className="text-4xl md:text-5xl font-serif font-light uppercase tracking-tight text-white leading-tight">
              Start Vandaag Nog <br />
              <span className="text-[#C8EB5F] italic font-normal font-serif">Uw Reis in Nederland</span>
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed max-w-xl font-sans">
              Vul ons veilige formulier in. Onze hoofdcoördinator neemt binnen 2 uur rechtstreeks contact met u op via WhatsApp of e-mail om uw doelen te bespreken, uw kind te koppelen aan een Azkhari leraar en uw gratis proefles in te plannen.
            </p>

            <div className="space-y-4 border-t border-white/5 pt-8">
              <div className="flex gap-4 items-center text-left">
                <div className="w-10 h-10 rounded-full bg-zinc-950 border border-white/10 flex items-center justify-center shrink-0">
                  <Mail className="text-[#C8EB5F]" size={16} />
                </div>
                <div>
                  <span className="text-[9px] font-mono text-neutral-500 uppercase block tracking-wider mb-0.5">SECURE INQUIRY EMAIL</span>
                  <div className="flex flex-col">
                    <a href="mailto:hello@abuqitmirlabs.tech" className="text-xs font-mono text-[#C8EB5F] hover:text-white transition-colors font-bold underline leading-normal">hello@abuqitmirlabs.tech</a>
                    <a href="mailto:abuqitmirshirazalmadani@gmail.com" className="text-[10px] font-mono text-neutral-400 hover:text-[#C8EB5F] transition-colors leading-normal">abuqitmirshirazalmadani@gmail.com</a>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <div className="w-10 h-10 rounded-full bg-zinc-950 border border-white/10 flex items-center justify-center shrink-0">
                  <MessageSquare className="text-emerald-400" size={16} />
                </div>
                <div>
                  <span className="text-[9px] font-mono text-neutral-500 uppercase block tracking-wider">WHATSAPP DIRECT CONCIERGE</span>
                  <a href="https://wa.me/923233260859?text=Asalamu%20Alaikum,%20I%20am%20interested%20in%20taking%20Tajweed%2520online%2520classes%2520with%2520Tajweedpage." target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-emerald-400 hover:text-white transition-colors">+92 323 3260859</a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-zinc-950 border border-white/5 p-8 rounded-[36px] shadow-2xl">
            <div className="mb-6 space-y-2">
              <span className="text-[9px] font-mono tracking-[0.3em] text-[#C8EB5F] uppercase font-bold block">REGISTRATIE NEDERLAND</span>
              <h3 className="font-serif text-2xl uppercase text-white leading-none font-light">Claim Gratis Proefles</h3>
            </div>

            {formSubmitted ? (
              <div className="bg-[#C8EB5F]/10 border border-[#C8EB5F]/20 p-8 rounded-2xl text-center space-y-4">
                <CheckCircle2 className="text-[#C8EB5F] mx-auto animate-bounce" size={32} />
                <h4 className="text-white font-serif text-lg">Aanvraag Succesvol Ontvangen</h4>
                <p className="text-neutral-400 text-xs font-light leading-relaxed font-sans">
                  Gelukt! We hebben uw voorkeuren genoteerd. Onze coördinator neemt binnen 2 uur contact met u op.
                </p>
                <button 
                  onClick={() => setFormSubmitted(false)}
                  className="text-xs font-mono text-[#C8EB5F] hover:underline"
                >
                  Nog een student registreren
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
                  <label className="text-[10px] tracking-widest font-mono text-neutral-400 uppercase block mb-1.5">Volledige Naam</label>
                  <input
                    type="text"
                    required
                    placeholder="bijv. Salim Ahmed"
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-3.5 text-xs text-white focus:outline-none focus:border-[#C8EB5F]"
                  />
                </div>

                <div>
                  <label className="text-[10px] tracking-widest font-mono text-neutral-400 uppercase block mb-1.5">E-mailadres</label>
                  <input
                    type="email"
                    required
                    placeholder="bijv. salim@gmail.com"
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-3.5 text-xs text-white focus:outline-none focus:border-[#C8EB5F]"
                  />
                </div>

                <div>
                  <label className="text-[10px] tracking-widest font-mono text-neutral-400 uppercase block mb-1.5">WhatsApp Nummer</label>
                  <input
                    type="tel"
                    required
                    placeholder="bijv. +31 6 12345678"
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-3.5 text-xs text-white focus:outline-none focus:border-[#C8EB5F]"
                  />
                </div>

                <div>
                  <label className="text-[10px] tracking-widest font-mono text-neutral-400 uppercase block mb-1.5">Gewenste Studie</label>
                  <select 
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-3.5 text-xs text-white focus:outline-none focus:border-[#C8EB5F]"
                  >
                    <option className="bg-neutral-950">Noorani Qaida voor Kinderen (Basis)</option>
                    <option className="bg-neutral-950">Tajweed Master Series (Volwassenen)</option>
                    <option className="bg-neutral-950">Intensieve Hifz Memorisering</option>
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
          href="mailto:hello@abuqitmirlabs.tech" 
          className="group relative flex items-center justify-center w-14 h-14 bg-neutral-900 text-white rounded-full border border-white/10 shadow-lg hover:bg-[#C8EB5F] hover:text-black hover:scale-110 transition-all duration-300"
        >
          <span className="absolute right-16 bg-white text-black text-[10px] font-bold px-3 py-2 rounded-lg opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-305 whitespace-nowrap shadow-xl flex items-center gap-2">
            Send Email
            <div className="absolute top-1/2 -right-1 -mt-1 w-2 h-2 bg-white rotate-45" />
          </span>
          <Mail size={22} />
        </a>

        <a 
          href="https://wa.me/923233260859?text=Asalamu%20Alaikum,%20I%20am%20interested%20in%20taking%20Tajweed%2520online%2520classes%2520with%2520Tajweedpage." 
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
                  {bookingType === "trial" ? "COMPLIMENTAIRE ENROLLMENT (NL)" : "DIAGNOSTIC DEMO LES"}
                </span>
                <h3 className="font-serif text-2xl uppercase text-white leading-none font-light">
                  {bookingType === "trial" ? "Claim Gratis Proefles" : "Plannen van uw Proefles"}
                </h3>
                <p className="text-xs text-neutral-400 font-light font-sans">
                  Studeer realtime, 1-op-1 via Zoom met gecertificeerde geleerden uit Al-Azhar.
                </p>
              </div>

              {formSubmitted ? (
                <div className="bg-[#C8EB5F]/10 border border-[#C8EB5F]/30 p-6 rounded-2xl text-center space-y-4">
                  <CheckCircle2 className="text-[#C8EB5F] mx-auto animate-bounce" size={32} />
                  <h4 className="text-white font-serif text-lg">Inquiry Confirmed</h4>
                  <p className="text-neutral-400 text-xs font-light leading-relaxed font-sans">
                    Succes! Uw leraar neemt binnen 2 uur contact met u op.
                  </p>
                  <button
                    onClick={() => {
                      setBookingOpen(false);
                      setFormSubmitted(false);
                    }}
                    className="mt-2 text-xs font-mono text-[#C8EB5F] hover:underline cursor-pointer"
                  >
                    Terug naar de site
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
                    <label className="text-[10px] tracking-widest font-mono text-neutral-400 uppercase block mb-1.5">Volledige Naam</label>
                    <input
                      type="text"
                      required
                      placeholder="bijv. Salim Ahmed"
                      className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#C8EB5F]"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] tracking-widest font-mono text-neutral-400 uppercase block mb-1.5">E-mailadres</label>
                    <input
                      type="email"
                      required
                      placeholder="bijv. salim@gmail.com"
                      className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#C8EB5F]"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] tracking-widest font-mono text-neutral-400 uppercase block mb-1.5">WhatsApp Nummer</label>
                    <input
                      type="tel"
                      required
                      placeholder="bijv. +31 6 12345678"
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
