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
  HelpCircle, 
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
                        "BST / London Custom Free Timetables",
                        "One-on-One Female Alimah Available",
                        "Sanitized Azhari Recitation Audits",
                        "Premium British-Standard Curriculums",
                        "Tailored Adult Tajweed Portals"
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
                alt="Tajweed Online Quran Tutors London" 
                fill 
                className="object-cover object-center brightness-90 saturate-[0.85]"
                sizes="(max-width: 768px) 100vw, 50vw"
                referrerPolicy="no-referrer"
                priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent md:bg-gradient-to-l md:from-black md:via-black/20 md:to-transparent" />
            <div className="absolute bottom-6 left-6 z-10 font-mono text-[9px] tracking-widest text-[#C8EB5F] uppercase bg-black/80 px-4 py-2 border border-white/10 rounded-lg">
                Exclusive London Session Portal
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

export default function LondonQuranClasses() {
  const [courseDropdownOpen, setCourseDropdownOpen] = useState(false);
  const [wordDropdownOpen, setWordDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [usaSubpagesOpen, setUsaSubpagesOpen] = useState(false);
  const [ukSubpagesOpen, setUkSubpagesOpen] = useState(true); // Open UK nested links by default on UK pages
  
  // Modal State
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingType, setBookingType] = useState<"trial" | "demo">("trial");
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Active FAQ index selector
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Individual references for Scroll Parallax feature section to avoid standard React Hooks loops warning
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

  // City-specific highly unique SEO textual statements to avoid keyword replication (Keyword cannibalism)
  const faqData: FAQItem[] = [
    {
      question: "Are there classes tailored for non-native children in London?",
      answer: "Absolutely. Our London course catalogs are mapped specifically to non-Arabic kids living in busy boroughs like Tower Hamlets, Newham, Westminster, and Redbridge. We utilize slow, friendly Noorani Qaida methodologies backed by immersive phonics to build native fluency securely."
    },
    {
      question: "How do you align with London school calendars and timings?",
      answer: "We offer complete timing personalization. Whether you demand late afternoon sessions after primary school or weekend morning slots (BST), our virtual portals are manned 24/7 by certified academic tutors ready to fit into your private family calendar perfectly."
    },
    {
      question: "Can I request native-Arab female scholars specifically?",
      answer: "Yes, we house a selected registry of highly certified female Alimah scholars from Egypt and Jordan specializing in Tajweed. Female adult students and young girls from Greater London can learn live in a completely secure, private environment."
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
              <span className="font-mono text-[8px] tracking-[0.3em] text-[#C8EB5F] block uppercase font-bold">ALIMAH SCHOLARS</span>
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
                  
                  {/* USA Classes Dropdown Arrow Toggle */}
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

                  {/* UK Classes Dropdown Arrow Toggle */}
                  <div className="flex items-center justify-between px-4 py-2 hover:bg-white/5 rounded-xl cursor-pointer" onClick={() => setUkSubpagesOpen(!ukSubpagesOpen)}>
                    <Link href="/quran-classes-in-uk" onClick={(e) => e.stopPropagation()} className="block text-[10px] tracking-wider font-mono text-[#C8EB5F] hover:text-white transition-colors font-bold">
                      Quran Classes in UK ✦
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
                      <Link href="/online-quran-classes-london" className="block px-3 py-1.5 text-[9px] tracking-wider font-mono text-[#C8EB5F] hover:text-[#C8EB5F] hover:bg-white/5 rounded-lg transition-colors font-semibold">
                        • London ✦
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
                  <Link href="/quran-in-the-world/quran-classes-in-europe" className="block px-4 py-3 text-[10px] tracking-wider font-mono text-neutral-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
                    Quran Classes in Europe
                  </Link>
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
                    <ChevronRight size={14} className={cn("transition-transform duration-200", usaSubpagesOpen ? "rotate-90" : "")} />
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
                    className="text-lg tracking-widest uppercase text-[#C8EB5F] hover:text-[#C8EB5F] transition-colors font-serif font-semibold"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Quran Classes in UK ✦
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
                    <Link href="/online-quran-classes-london" className="text-xs uppercase tracking-wider text-[#C8EB5F]" onClick={() => setMobileMenuOpen(false)}>• London ✦</Link>
                    <Link href="/online-quran-classes-manchester" className="text-xs uppercase tracking-wider text-neutral-400 hover:text-[#C8EB5F]" onClick={() => setMobileMenuOpen(false)}>• Manchester</Link>
                    <Link href="/online-quran-classes-birmingham" className="text-xs uppercase tracking-wider text-neutral-400 hover:text-[#C8EB5F]" onClick={() => setMobileMenuOpen(false)}>• Birmingham</Link>
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
              className="w-full bg-[#C8EB5F] p-4 text-black text-xs font-mono font-bold uppercase tracking-widest text-center shadow-lg cursor-pointer mt-auto"
            >
              FREE TRIAL SENSING CLASS
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. HeroSection Component */}
      <HeroSection 
        logo={{
          url: "https://i.postimg.cc/3wBQzY0g/pexels-defrinomaasy-37592506.jpg",
          alt: "TajweedPage Verified Education logo",
          text: "TajweedPage"
        }}
        slogan="LONDON SECTOR PREEMINENCE"
        title={
          <span>
            Elite Online Quran <br/>
            <span className="text-[#C8EB5F] font-serif italic">Classes in London</span>
          </span>
        }
        subtitle="Secure high-caliber live 1-on-1 private virtual portals tailored precisely for children and female adults in Great London. Connect with native Azhari Arab scholars, structured school calendars (BST), and custom progression pathways mapped to British state educational high standards."
        backgroundImage="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1500&auto=format&fit=crop"
        callToAction={{
          text: "SECURE TRIAL PORTAL",
          href: "#trial-inquiry"
        }}
        contactInfo={{
          website: "tajweedpage.com/london",
          phone: "+(92) 323-3260859",
          address: "Central Court, London, E1 6PX"
        }}
      />

      {/* 2. TextParallaxContent Component for Why Students Choose TajweedPage */}
      <div className="bg-black py-20 border-b border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center mb-16">
          <span className="text-[10px] font-mono tracking-[0.3em] text-[#C8EB5F] uppercase">ACADEMIC PARADIGM ADVANTAGE</span>
          <h2 className="text-4xl font-serif font-light uppercase tracking-tight text-white mt-3">Why London Families Cultivate Success Here</h2>
          <p className="text-sm text-neutral-400 font-light max-w-2xl mx-auto mt-4 font-sans leading-relaxed">
            In the heart of London, our personalized educational framework respects the demanding lifestyles of metropolitan families while retaining strict devotion to authentic transmission of Quranic recitation rules.
          </p>
        </div>

        <TextParallaxContent 
          imgUrl="https://i.postimg.cc/3xQMRdgZ/pexels-ilabappa-19404922.jpg"
          subheading="Azhari Scholars"
          heading="Azhari Qualified Teachers in London"
        >
          {/* Custom SEO Content Grid */}
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-6 pb-24 pt-12 md:grid-cols-12 text-white">
            <h3 className="col-span-1 text-2xl font-serif font-light uppercase tracking-wide text-[#C8EB5F] md:col-span-4 leading-snug">
              Exquisite Live Portals With Native Speakers
            </h3>
            <div className="col-span-1 md:col-span-8 space-y-6 text-neutral-300 font-light text-sm sm:text-base leading-relaxed">
              <p>
                London is a global core of diverse Islamic communities, each searching for authentic, deep, and beautifully transmitted classical Quran instruction. We skip ordinary local classroom formulas in favor of highly optimized daily 1-on-1 interactive lessons. This avoids crowded settings so students receive the precise vocal correction and visual feedback they deserve.
              </p>
              <p>
                Our specialized native Arabic-speaking scholars have obtained prestigious traditional certifications (Ijazah) from historic Al-Azhar University. By utilizing slow, measured, and correct pronunciation methodologies, we build unmatched confidence. Non-native English speakers across East London, Redbridge, Tower Hamlets, and Wembley experience an instant leap in their Tajweed recitation capacity.
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
          imgUrl="https://i.postimg.cc/t70cYMVY/pexels-a-darmel-8164736.jpg"
          subheading="Noorani Foundations"
          heading="Phonetic Arabic Structure"
        >
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-6 pb-24 pt-12 md:grid-cols-12 text-white">
            <h3 className="col-span-1 text-2xl font-serif font-light uppercase tracking-wide text-[#C8EB5F] md:col-span-4 leading-snug">
              Scientifically Sound Progression Pathways
            </h3>
            <div className="col-span-1 md:col-span-8 space-y-6 text-neutral-300 font-light text-sm sm:text-base leading-relaxed">
              <p>
                The foundation of correct Quranic vocal habits rests on structured learning curves. Our custom-molded Noorani Qaida syllabus allows younger minds to understand complex sounds through simple visual phonetic elements. We treat correct mouth and tongue articulation (Makharij) with strict attention to perfection right from lesson one.
              </p>
              <p>
                Families across London choose our portals because our tutors avoid traditional rote learning in favor of customized phonetic games and interactive visual whiteboards. We monitor and catalog every individual lesson in a personal digital logbook, enabling London parents to easily verify progress at their own convenience.
              </p>
            </div>
          </div>
        </TextParallaxContent>
      </div>

      {/* 3. Program Available Section */}
      <section className="py-24 bg-zinc-950 border-b border-white/5 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <span className="text-[10px] font-mono tracking-[0.3em] text-[#C8EB5F] uppercase">PREMIUM REGIONAL STUDY PLANS</span>
            <h2 className="text-4xl font-serif font-light uppercase tracking-tight text-white leading-none">Curated London Curriculums</h2>
            <div className="h-px w-24 bg-[#C8EB5F] mx-auto my-4" />
            <p className="text-neutral-400 text-xs sm:text-sm font-light font-sans max-w-2xl mx-auto leading-relaxed">
              Three premium curriculums designed by seasoned Islamic historians, suited to match the rigorous, busy schedules of students in Great London.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Card 1 */}
            <div className="bg-black border border-white/5 hover:border-[#C8EB5F]/35 rounded-[32px] p-8 transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between group shadow-2xl">
              <div className="space-y-6">
                <span className="text-[9px] font-mono tracking-[0.25em] text-[#C8EB5F] uppercase font-bold bg-[#C8EB5F]/5 border border-[#C8EB5F]/15 px-3 py-1 rounded-full inline-block">FOUNDATION</span>
                <h3 className="font-serif text-2xl font-light text-white uppercase group-hover:text-[#C8EB5F] transition-colors mt-2">Noorani Qaida for Kids</h3>
                <p className="text-xs text-neutral-400 font-light font-sans leading-relaxed">
                  The perfect introductory curriculum for children ages 4-12. Focused on slowly building foundational recognition skills, correct phonics, and basic vocal rules to handle Quranic text with ease. Includes interactive digital whiteboards and play-based tools.
                </p>
                <div className="h-px bg-white/5 my-4" />
                <ul className="space-y-3.5 text-xs text-neutral-300 font-mono">
                  <li className="flex gap-2 items-center"><Check size={12} className="text-[#C8EB5F]" /> 2 or 3 Weekly Portals</li>
                  <li className="flex gap-2 items-center"><Check size={12} className="text-[#C8EB5F]" /> Verified Al-Azhar Educators</li>
                  <li className="flex gap-2 items-center"><Check size={12} className="text-[#C8EB5F]" /> Interactive Zoom Portals</li>
                </ul>
              </div>
              <div className="pt-8 mt-8 border-t border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-[9px] font-mono text-neutral-500 uppercase block tracking-wider">MEMBER INVESTMENT</span>
                  <span className="font-serif text-2xl text-white font-medium">£55<span className="text-xs text-neutral-400">/mo</span></span>
                </div>
                <button 
                  onClick={() => {
                    setBookingType("trial");
                    setBookingOpen(true);
                  }}
                  className="px-5 py-3 bg-[#C8EB5F]/10 hover:bg-[#C8EB5F] text-[#C8EB5F] hover:text-black font-mono text-[9px] font-bold uppercase tracking-widest transition-all duration-300 rounded-lg"
                >
                  SECURE PORTAL
                </button>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-black border border-[#C8EB5F]/25 hover:border-[#C8EB5F] rounded-[32px] p-8 transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between relative shadow-[0_0_50px_rgba(200,235,95,0.05)] group">
              <div className="absolute top-6 right-6 font-mono text-[8px] tracking-widest text-black bg-[#C8EB5F] px-3 py-1 uppercase rounded-full font-bold">MOST POPULAR</div>
              <div className="space-y-6">
                <span className="text-[9px] font-mono tracking-[0.25em] text-[#C8EB5F] uppercase font-bold bg-[#C8EB5F]/10 border border-[#C8EB5F]/30 px-3 py-1 rounded-full inline-block">ADULT TAJWEED</span>
                <h3 className="font-serif text-2xl font-light text-white uppercase group-hover:text-[#C8EB5F] transition-colors mt-2">Tajweed Master Series</h3>
                <p className="text-xs text-neutral-400 font-light font-sans leading-relaxed">
                  A comprehensive, deep program for adult ladies and gentlemen who wish to correct vocal mistakes and perfect their recitation. Covering complex classical rules, breath regulation, beautiful melodic structures, and authentic transmission chains.
                </p>
                <div className="h-px bg-white/5 my-4" />
                <ul className="space-y-3.5 text-xs text-neutral-300 font-mono">
                  <li className="flex gap-2 items-center"><Check size={12} className="text-[#C8EB5F]" /> Highly Personalized Tutors</li>
                  <li className="flex gap-2 items-center"><Check size={12} className="text-[#C8EB5F]" /> Exclusive Digital Whiteboards</li>
                  <li className="flex gap-2 items-center"><Check size={12} className="text-[#C8EB5F]" /> Certified Traditional Ijazah Paths</li>
                </ul>
              </div>
              <div className="pt-8 mt-8 border-t border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-[9px] font-mono text-neutral-500 uppercase block tracking-wider">MEMBER INVESTMENT</span>
                  <span className="font-serif text-2xl text-white font-medium">£75<span className="text-xs text-neutral-400">/mo</span></span>
                </div>
                <button 
                  onClick={() => {
                    setBookingType("trial");
                    setBookingOpen(true);
                  }}
                  className="px-5 py-3 bg-[#C8EB5F] hover:bg-white text-black font-mono text-[9px] font-bold uppercase tracking-widest transition-all duration-300 rounded-lg"
                >
                  SECURE PORTAL
                </button>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-black border border-white/5 hover:border-[#C8EB5F]/35 rounded-[32px] p-8 transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between group shadow-2xl">
              <div className="space-y-6">
                <span className="text-[9px] font-mono tracking-[0.25em] text-cyan-400 uppercase font-bold bg-cyan-400/5 border border-cyan-400/15 px-3 py-1 rounded-full inline-block">INTENSIVE</span>
                <h3 className="font-serif text-2xl font-light text-white uppercase group-hover:text-[#C8EB5F] transition-colors mt-2">Hifz Memorization Path</h3>
                <p className="text-xs text-neutral-400 font-light font-sans leading-relaxed">
                  An structured, intensive journey focused on committing selected Juz or the complete Quran to memory. Implements traditional recitation methods coupled with customized modern revision plans to maintain absolute accuracy.
                </p>
                <div className="h-px bg-white/5 my-4" />
                <ul className="space-y-3.5 text-xs text-neutral-300 font-mono">
                  <li className="flex gap-2 items-center"><Check size={12} className="text-cyan-400" /> Daily Lesson Progress Tracking</li>
                  <li className="flex gap-2 items-center"><Check size={12} className="text-cyan-400" /> Personal Memory Logbooks</li>
                  <li className="flex gap-2 items-center"><Check size={12} className="text-cyan-400" /> High Revision Mastery Ratios</li>
                </ul>
              </div>
              <div className="pt-8 mt-8 border-t border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-[9px] font-mono text-neutral-500 uppercase block tracking-wider">MEMBER INVESTMENT</span>
                  <span className="font-serif text-2xl text-white font-medium">£95<span className="text-xs text-neutral-400">/mo</span></span>
                </div>
                <button 
                  onClick={() => {
                    setBookingType("trial");
                    setBookingOpen(true);
                  }}
                  className="px-5 py-3 bg-[#C8EB5F]/10 hover:bg-[#C8EB5F] text-[#C8EB5F] hover:text-black font-mono text-[9px] font-bold uppercase tracking-widest transition-all duration-300 rounded-lg"
                >
                  SECURE PORTAL
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
            <span className="text-[10px] font-mono tracking-[0.3em] text-[#C8EB5F] uppercase">IMMERSIVE INTERACTIVE LEARNING</span>
            <h2 className="text-4xl font-serif font-light uppercase tracking-tight text-white leading-none">How London Classes Stream live</h2>
            <div className="h-px w-24 bg-[#C8EB5F] mx-auto my-4" />
          </div>

          <div className="flex flex-col md:px-0">
            
            {/* Slide 1 */}
            <div
              ref={ref1}
              className="min-h-[80vh] flex flex-col md:flex-row items-center justify-center md:gap-40 gap-12"
            >
              <motion.div style={{ y: translate1 }} className="flex-1 max-w-sm">
                <span className="font-mono text-[10px] tracking-widest text-[#C8EB5F] uppercase block mb-3">STEP ONE</span>
                <h3 className="text-4xl font-serif font-light uppercase tracking-tight text-white leading-tight">Claim Your Free live Auditing Call</h3>
                <motion.p
                  className="text-neutral-400 text-xs sm:text-sm font-light mt-6 leading-relaxed font-sans"
                >
                  Enter your details in our fast inquiry form below. An education manager will contact you over WhatsApp or Email in under 2 hours to learn about your family&apos;s past experience, select the ideal scholar, and lock in a live complementary trial.
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
                    src="https://i.postimg.cc/JnsmXStH/pexels-serhattugg-20558195.jpg"
                    fill
                    className="object-cover brightness-95 saturate-[0.85]"
                    alt="Authentic Quran Learning Foundations"
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
                <span className="font-mono text-[10px] tracking-widest text-[#C8EB5F] uppercase block mb-3">STEP TWO</span>
                <h3 className="text-4xl font-serif font-light uppercase tracking-tight text-white leading-tight">Engage 1-on-1 on Live video</h3>
                <motion.p
                  className="text-neutral-400 text-xs sm:text-sm font-light mt-6 leading-relaxed font-sans"
                >
                  Join your secure, personal video portal using any computer or modern tablet. Your certified Azhari tutor will use digital annotations, vocal corrections, and slow pronunciation exercises to build correct pronunciation habits in a positive, supportive setting.
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
                    alt="Correct live articulation sessions"
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
                <span className="font-mono text-[10px] tracking-widest text-[#C8EB5F] uppercase block mb-3">STEP THREE</span>
                <h3 className="text-4xl font-serif font-light uppercase tracking-tight text-white leading-tight">Verify Progressive Record Logs</h3>
                <motion.p
                  className="text-neutral-400 text-xs sm:text-sm font-light mt-6 leading-relaxed font-sans"
                >
                  Never speculate about your children&apos;s growth. Every live Quran class is fully cataloged, tracking the exact verses memorized and rules mastered. Get weekly updates on your WhatsApp or in your secure personal digital portal.
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
                    src="https://i.postimg.cc/zXZ5LtNC/pexels-ast4rk-34202578.jpg"
                    fill
                    className="object-cover brightness-95"
                    alt="Detailed session logbooks"
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
            <span className="text-[10px] font-mono tracking-[0.3em] text-[#C8EB5F] uppercase">EXPERT ANSWER REGISTRY</span>
            <h2 className="text-3xl font-serif font-light uppercase tracking-tight text-white leading-none">Frequently Asked Questions</h2>
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
            <span className="text-[10px] font-mono tracking-[0.3em] text-[#C8EB5F] uppercase block">CONTACT EDUCATION DESK</span>
            <h2 className="text-4xl md:text-5xl font-serif font-light uppercase tracking-tight text-white leading-tight">
              Embark on an <br />
              <span className="text-[#C8EB5F] italic font-normal font-serif">Aesthetic Quran Journey</span>
            </h2>
            <p className="text-xs sm:text-sm text-neutral-450 font-light leading-relaxed max-w-xl font-sans">
              Enter your family&apos;s details securely. Our chief registry coordinator will contact you directly on WhatsApp or Email within 2 hours to walk through your academic goals, pair your family with a native Al-Azhar qualified tutor, and lock in your first free live demo class.
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
              <span className="text-[9px] font-mono tracking-[0.3em] text-[#C8EB5F] uppercase font-bold block">UK LOCALIZED REGISTRATION PORTAL</span>
              <h3 className="font-serif text-2xl uppercase text-white leading-none font-light">Secure Live Trial Class</h3>
            </div>

            {formSubmitted ? (
              <div className="bg-[#C8EB5F]/10 border border-[#C8EB5F]/20 p-8 rounded-2xl text-center space-y-4">
                <CheckCircle2 className="text-[#C8EB5F] mx-auto animate-bounce" size={32} />
                <h4 className="text-white font-serif text-lg">Inquiry Successfully Registered</h4>
                <p className="text-neutral-400 text-xs font-light leading-relaxed font-sans">
                  Success! We have recorded your preferences. A Chief Academic Advisor will ping you over WhatsApp or Email in under 2 hours to confirm your scheduled slot.
                </p>
                <button 
                  onClick={() => setFormSubmitted(false)}
                  className="text-xs font-mono text-[#C8EB5F] hover:underline"
                >
                  Register Another Student
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
                  <label className="text-[10px] tracking-widest font-mono text-neutral-400 uppercase block mb-1.5">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Salim Ahmed"
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-3.5 text-xs text-white focus:outline-none focus:border-[#C8EB5F]"
                  />
                </div>

                <div>
                  <label className="text-[10px] tracking-widest font-mono text-neutral-400 uppercase block mb-1.5">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. salim@gmail.com"
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-3.5 text-xs text-white focus:outline-none focus:border-[#C8EB5F]"
                  />
                </div>

                <div>
                  <label className="text-[10px] tracking-widest font-mono text-neutral-400 uppercase block mb-1.5">WhatsApp Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +44 7452 209811"
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-3.5 text-xs text-white focus:outline-none focus:border-[#C8EB5F]"
                  />
                </div>

                <div>
                  <label className="text-[10px] tracking-widest font-mono text-neutral-400 uppercase block mb-1.5">Desired Course</label>
                  <select 
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-3.5 text-xs text-white focus:outline-none focus:border-[#C8EB5F]"
                  >
                    <option className="bg-neutral-950">Noorani Qaida for Kids (Foundation)</option>
                    <option className="bg-neutral-950">Tajweed Master Series (Adults Class)</option>
                    <option className="bg-neutral-950">Intensive Hifz Memorization Path</option>
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
                  {bookingType === "trial" ? "COMPLIMENTARY PASS (LONDON)" : "DIAGNOSTIC DEMO CLASS"}
                </span>
                <h3 className="font-serif text-2xl uppercase text-white leading-none font-light">
                  {bookingType === "trial" ? "Claim Your Free Live Trial" : "Schedule Diagnostic Demo"}
                </h3>
                <p className="text-xs text-neutral-400 font-light font-sans">
                  Learn live, 1-on-1 over Zoom with highly certified Arab academic educators in London.
                </p>
              </div>

              {formSubmitted ? (
                <div className="bg-[#C8EB5F]/10 border border-[#C8EB5F]/30 p-6 rounded-2xl text-center space-y-4">
                  <CheckCircle2 className="text-[#C8EB5F] mx-auto animate-bounce" size={32} />
                  <h4 className="text-white font-serif text-lg">Inquiry Confirmed</h4>
                  <p className="text-neutral-400 text-xs font-light leading-relaxed font-sans">
                    Success! We will contact you over WhatsApp/Email within 2 hours to confirm your scheduled slot.
                  </p>
                  <button
                    onClick={() => {
                      setBookingOpen(false);
                      setFormSubmitted(false);
                    }}
                    className="mt-2 text-xs font-mono text-[#C8EB5F] hover:underline cursor-pointer"
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
                    <label className="text-[10px] tracking-widest font-mono text-neutral-400 uppercase block mb-1.5">Full Name</label>
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
                      placeholder="e.g. +44 7452 209811"
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
