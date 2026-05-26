"use client";

import React, { useState, useRef } from 'react';
import { cn } from "@/lib/utils";
import { NavigationHeader } from "@/components/ui/navigation-header";
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, CheckCircle2, Star, ChevronDown, Check, Menu, X, ArrowDown } from 'lucide-react';
import { PremiumMarquee } from "@/components/ui/premium-marquee";

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
            <div className="my-auto space-y-10">
                <motion.header className="mb-6" variants={itemVariants}>
                    {logo && (
                        <div className="flex items-center">
                            <Image 
                              src={logo.url} 
                              alt={logo.alt} 
                              width={40} 
                              height={40} 
                              referrerPolicy="no-referrer"
                              className="mr-3 h-10 w-10 rounded-xl object-cover filter brightness-110" 
                            />
                            <div>
                                {logo.text && <p className="text-sm font-bold tracking-widest font-mono text-white uppercase">{logo.text}</p>}
                                {slogan && <p className="text-[9px] tracking-[0.25em] font-mono text-neutral-500 uppercase">{slogan}</p>}
                            </div>
                        </div>
                    )}
                </motion.header>

                <motion.main variants={containerVariants} className="space-y-8">
                    <motion.h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-light leading-tight text-white font-serif tracking-tight uppercase" variants={itemVariants}>
                        {title}
                    </motion.h1>
                    
                    <motion.div className="h-px w-24 bg-[#C8EB5F]" variants={itemVariants}></motion.div>
                    
                    <motion.p className="max-w-xl text-xs sm:text-sm text-neutral-400 font-light leading-relaxed font-sans" variants={itemVariants}>
                        {subtitle}
                    </motion.p>

                    {/* Highly curated key lists */}
                    <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mb-4" variants={itemVariants}>
                      {[
                        "Flexible UK Timings",
                        "One-on-One Quran Classes",
                        "Experienced Quran Tutors",
                        "Beginner-Friendly Learning",
                        "Free Trial Available"
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2.5 text-xs text-neutral-300 font-light">
                          <span className="h-5 w-5 rounded-full border border-[#C8EB5F]/20 bg-[#C8EB5F]/5 flex items-center justify-center shrink-0">
                            <Check className="text-[#C8EB5F] h-3 w-3" />
                          </span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </motion.div>
                    
                    <motion.div className="pt-4" variants={itemVariants}>
                        <Link href={callToAction.href} className="inline-flex items-center justify-center text-xs tracking-[0.2em] uppercase font-mono bg-[#C8EB5F] hover:bg-white text-black font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-[0_4px_30px_rgba(200,235,95,0.22)]">
                            {callToAction.text}
                        </Link>
                    </motion.div>
                </motion.main>
            </div>

            {/* Bottom Section: Footer Info */}
            <motion.footer className="mt-12 w-full pt-8 border-t border-white/5" variants={itemVariants}>
                <div className="grid grid-cols-1 gap-6 text-[10px] tracking-wider font-mono text-neutral-500 sm:grid-cols-3 uppercase">
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
                </div>
            </motion.footer>
        </div>

        {/* Right Side: Image with Clip Path Animation */}
        <motion.div 
          className="absolute inset-y-0 right-0 w-full md:w-1/2 bg-cover bg-center -z-10 md:relative md:z-0 filter grayscale contrast-[110%] brightness-[75%]"
          style={{ 
            backgroundImage: `url(${backgroundImage})`,
          }}
          initial={{ clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' }}
          animate={{ clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)' }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Subtle luxurious overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/85 md:hidden" />
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent hidden md:block" />
        </motion.div>
      </motion.section>
    );
  }
);

HeroSection.displayName = "HeroSection";

// Custom Sub-components for individual luxury Parallax Section layout based on requested framework
const IMG_PADDING = 12;

interface TextParallaxContentProps {
  imgUrl: string;
  subheading: string;
  heading: string;
  children: React.ReactNode;
}

function TextParallaxContent({ imgUrl, subheading, heading, children }: TextParallaxContentProps) {
  return (
    <div
      className="bg-black"
      style={{
        paddingLeft: IMG_PADDING,
        paddingRight: IMG_PADDING,
      }}
    >
      <div className="relative h-[150vh]">
        <StickyImage imgUrl={imgUrl} />
        <OverlayCopy heading={heading} subheading={subheading} />
      </div>
      {children}
    </div>
  );
}

function StickyImage({ imgUrl }: { imgUrl: string }) {
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
      className="sticky z-0 overflow-hidden rounded-3xl"
    >
      <motion.div
        className="absolute inset-0 bg-black/75"
        style={{
          opacity,
        }}
      />
    </motion.div>
  );
}

function OverlayCopy({ subheading, heading }: { subheading: string; heading: string }) {
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
      className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center text-white p-4"
    >
      <p className="mb-2 text-center text-xs md:text-sm tracking-[0.4em] text-[#C8EB5F] uppercase font-mono font-bold">
        {subheading}
      </p>
      <p className="text-center text-3xl sm:text-4xl md:text-6xl font-light font-serif tracking-tight uppercase leading-tight max-w-4xl">
        {heading}
      </p>
    </motion.div>
  );
}

interface ExampleContentProps {
  sectionTitle: string;
  description: string;
}

function ExampleContent({ sectionTitle, description }: ExampleContentProps) {
  return (
    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-6 pb-32 pt-16 md:grid-cols-12 relative z-20 bg-black">
      <h3 className="col-span-1 text-2xl sm:text-3xl font-light font-serif tracking-tight text-white uppercase md:col-span-4 leading-tight">
        {sectionTitle}
      </h3>
      <div className="col-span-1 md:col-span-8">
        <p className="mb-6 text-lg sm:text-xl text-neutral-300 font-serif font-light leading-relaxed italic">
          {description}
        </p>
        <p className="mb-8 text-xs sm:text-sm text-neutral-500 font-light leading-relaxed font-mono tracking-wider uppercase">
          ✦ Tailored One-on-One Custom Timings Matching UK Schooling and Job Routines
        </p>
        <Link
          href="/#booking-form"
          className="inline-flex items-center gap-2 rounded-full bg-[#C8EB5F] hover:bg-white text-black text-[11px] font-mono font-bold tracking-widest px-6 py-3 uppercase transition-colors duration-300 gap-1.5"
        >
          Book free trial session <ArrowLeft size={12} className="rotate-180 inline" />
        </Link>
      </div>
    </div>
  );
}

function ProgramParallaxItem({ 
  id, 
  title, 
  description, 
  imageUrl, 
  reverse 
}: { 
  id: number; 
  title: string; 
  description: string; 
  imageUrl: string; 
  reverse: boolean; 
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center start"]
  });

  const opacityContent = useTransform(scrollYProgress, [0, 0.7], [0, 1]);
  const clipProgress = useTransform(scrollYProgress, [0, 0.7], ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]);
  const translateContent = useTransform(scrollYProgress, [0, 1], [-50, 0]);

  return (
    <div 
      ref={containerRef} 
      className={cn(
        "min-h-screen flex flex-col md:flex-row items-center justify-center gap-12 md:gap-40 px-6 sm:px-12 py-16 relative overflow-hidden bg-black",
        reverse ? 'md:flex-row-reverse' : ''
      )}
    >
      <div className={cn(
        "flex flex-col gap-6 w-full max-w-md",
        reverse ? "items-end text-right" : "items-start text-left"
      )}>
        <motion.div style={{ y: translateContent }} className="space-y-4">
          <div className="font-mono text-[#C8EB5F] text-[9px] tracking-[0.4em] uppercase font-bold">
            ✦ MODULE 0{id}
          </div>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-light font-serif tracking-tight text-white uppercase leading-tight">
            {title}
          </h3>
          <motion.p 
            style={{ y: translateContent }} 
            className="text-neutral-400 max-w-sm font-serif font-light leading-relaxed text-base italic"
          >
            {description}
          </motion.p>
        </motion.div>
      </div>

      <motion.div 
        style={{ 
          opacity: opacityContent,
          clipPath: clipProgress,
        }}
        className="relative shrink-0 w-44 h-44 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-3xl overflow-hidden border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
      >
        <Image 
          src={imageUrl} 
          alt={`Section ${id}`} 
          fill
          referrerPolicy="no-referrer"
          className="object-cover filter grayscale contrast-115 hover:grayscale-0 transition-all duration-[1000ms]"
        />
      </motion.div>
    </div>
  );
}

function ProgramsAvailableSection() {
  const sections = [
    {
      id: 1,
      title: "Quran Reading Lessons",
      description: "Step-by-step guidance designed specifically for native English speakers to grasp letter shapes and phonetic sounds with expert ease.",
      imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800',
      reverse: false
    },
    {
      id: 2,
      title: "Tajweed Course",
      description: "Intensive accent-refinement and rule application for reciting the Holy Quran with pristine classic precision.",
      imageUrl: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=800',
      reverse: true
    },
    {
      id: 3,
      title: "Noorani Qaida",
      description: "The highly acclaimed initial phonetic syllabus for kids and beginners to build a steady foundational script.",
      imageUrl: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=800',
      reverse: false
    },
    {
      id: 4,
      title: "Hifz Program",
      description: "Systematic memory revision techniques and targeted retention intervals with elite handpicked scholars.",
      imageUrl: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?q=80&w=800',
      reverse: true
    },
    {
      id: 5,
      title: "Islamic Studies",
      description: "Comprehensive auxiliary concepts including prayer structures, daily Duas, and critical historical Islamic ethics.",
      imageUrl: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=800',
      reverse: false
    }
  ];

  return (
    <div className="bg-black text-white relative">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C8EB5F]/20 to-transparent" />
      
      {/* Intro block from user's template styling */}
      <div className='min-h-screen w-full flex flex-col items-center justify-center text-center px-6 relative bg-black'>
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(200,235,95,0.02),transparent_60%)]" />
        
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[9px] uppercase tracking-[0.4em] text-[#C8EB5F] font-mono mb-6">
          <span className="h-1.5 w-1.5 rounded-full bg-[#C8EB5F] animate-pulse" />
          UK ACADEMIC SYLLABI
        </div>
        
        <h2 className='text-4xl sm:text-5xl md:text-7xl font-light font-serif tracking-tight text-white uppercase max-w-4xl leading-tight'>
          Programs Available <br />for <span className="text-[#C8EB5F]">UK Students</span>
        </h2>
        
        <p className='mt-10 flex items-center gap-2 text-xs font-mono tracking-[0.25em] text-neutral-400 uppercase'>
          SCROLL TO EXPLORE <ArrowDown size={14} className="text-[#C8EB5F] animate-bounce" />
        </p>
      </div>

      {/* Parallax elements */}
      <div className="flex flex-col md:px-0">
        {sections.map((section) => (
          <ProgramParallaxItem 
            key={section.id}
            id={section.id}
            title={section.title}
            description={section.description}
            imageUrl={section.imageUrl}
            reverse={section.reverse}
          />
        ))}
      </div>

      {/* Quick Conclusion line matching template */}
      <div className='py-24 w-full flex flex-col items-center justify-center text-center border-t border-white/5 bg-black'>
        <h4 className='text-3xl sm:text-5xl font-light font-serif tracking-tight text-neutral-400 uppercase italic'>
          Pristine Recitation Is Within Reach
        </h4>
        <p className="text-xs sm:text-sm text-neutral-500 font-mono tracking-widest mt-4 uppercase">
          ELEVATE YOUR HOUSEHOLD WITH TAJWEED ACADEMIC STANDARD ✦
        </p>
      </div>
    </div>
  );
}

interface FAQCategory {
  id: string;
  title: string;
  subtitle: string;
}

function FAQSection() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const categories: FAQCategory[] = [
    {
      id: "faq-1",
      title: "Are classes suitable for beginners?",
      subtitle: "Yes. Beginner-friendly Quran lessons are available for all age groups.",
    },
    {
      id: "faq-2",
      title: "Do you offer flexible UK schedules?",
      subtitle: "Yes. Classes are available according to UK time zones.",
    },
    {
      id: "faq-3",
      title: "Is there a free trial class?",
      subtitle: "Yes. Students can start with a free trial session.",
    },
  ];

  return (
    <div className="w-full bg-black text-white py-24 px-6 relative border-t border-white/5">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_bottom,rgba(200,235,95,0.02),transparent_70%)]" />
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[9px] uppercase tracking-[0.4em] text-[#C8EB5F] font-mono mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-[#C8EB5F] animate-pulse" />
            ACADEMIC CONCIERGE Q&A
          </div>
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-light font-serif tracking-tight text-white uppercase leading-tight max-w-2xl mx-auto">
            Frequently Asked Questions
          </h2>
        </div>

        {/* Categories List */}
        <div className="space-y-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className="relative group"
              onMouseEnter={() => setHoveredItem(category.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div
                className={cn(
                  "relative overflow-hidden border bg-zinc-950 transition-all duration-300 ease-in-out cursor-pointer rounded-2xl",
                  hoveredItem === category.id
                    ? 'min-h-[140px] border-[#C8EB5F] shadow-lg shadow-[#C8EB5F]/5 bg-[#C8EB5F]/5'
                    : 'min-h-[88px] border-white/10 hover:border-[#C8EB5F]/40'
                )}
              >
                {/* Corner brackets that appear on hover */}
                {hoveredItem === category.id && (
                  <>
                    <div className="absolute top-4 left-4 w-6 h-6">
                      <div className="absolute top-0 left-0 w-4 h-0.5 bg-[#C8EB5F]" />
                      <div className="absolute top-0 left-0 w-0.5 h-4 bg-[#C8EB5F]" />
                    </div>
                    <div className="absolute bottom-4 right-4 w-6 h-6">
                      <div className="absolute bottom-0 right-0 w-4 h-0.5 bg-[#C8EB5F]" />
                      <div className="absolute bottom-0 right-0 w-0.5 h-4 bg-[#C8EB5F]" />
                    </div>
                  </>
                )}

                {/* Content */}
                <div className="flex items-center justify-between min-h-[88px] px-6 sm:px-10 py-5">
                  <div className="flex-1 pr-4">
                    <h3
                      className={cn(
                        "font-serif text-lg sm:text-xl font-medium tracking-wide transition-colors duration-300",
                        hoveredItem === category.id ? 'text-[#C8EB5F]' : 'text-neutral-200'
                      )}
                    >
                      {category.title}
                    </h3>
                    
                    <p
                      className={cn(
                        "mt-2 text-sm sm:text-base font-serif italic text-neutral-400 font-light leading-relaxed transition-all duration-300",
                        hoveredItem === category.id ? 'opacity-100 max-h-40 visible translate-y-0' : 'opacity-0 max-h-0 invisible -translate-y-2'
                      )}
                    >
                      {category.subtitle}
                    </p>
                  </div>

                  {/* Icon appears on the right on hover */}
                  {hoveredItem === category.id && (
                    <div className="text-[#C8EB5F] font-mono text-[9px] tracking-widest hidden sm:block">
                      ✦ EXPLAINED
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface Category {
  id: string | number;
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  featured?: boolean;
}

interface CategoryListProps {
  title: string;
  subtitle?: string;
  categories: Category[];
  headerIcon?: React.ReactNode;
  className?: string;
}

const startQuranCategories: Category[] = [
  {
    id: "step-1",
    title: "Noorani Qaida & Basic Phonetics",
    subtitle: "Ideal beginner module designed for native children or adults with no prior Arabic background.",
    featured: false,
  },
  {
    id: "step-2",
    title: "Elegant Recitation & Advanced Tajweed",
    subtitle: "Comprehensive phonetic coaching focusing on advanced speech rules & correct vocalization.",
    featured: true,
  },
  {
    id: "step-3",
    title: "Interactive Memorization Schedules",
    subtitle: "Highly engaging one-on-one sessions structured matching domestic school routines in the UK.",
    featured: false,
  }
];

const CategoryList = ({
  title,
  subtitle,
  categories,
  headerIcon,
  className,
}: CategoryListProps) => {
  const [hoveredItem, setHoveredItem] = useState<string | number | null>(null);

  return (
    <div className={cn("w-full bg-black text-white py-28 px-6 relative border-t border-white/5", className)}>
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,rgba(200,235,95,0.015),transparent_60%)]" />
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          {headerIcon ? (
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#C8EB5F]/80 to-[#C8EB5F] mb-6 text-black">
              {headerIcon}
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[9px] uppercase tracking-[0.4em] text-[#C8EB5F] font-mono mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-[#C8EB5F] animate-pulse" />
              EXCLUSIVE UK ENROLMENT
            </div>
          )}
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-light font-serif tracking-tight text-white mb-4 uppercase max-w-3xl mx-auto leading-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-sm sm:text-base text-neutral-400 font-serif font-light italic max-w-2xl mx-auto leading-relaxed mt-4">
              {subtitle}
            </p>
          )}
        </div>

        {/* Categories List */}
        <div className="space-y-3">
          {categories.map((category) => (
            <div
              key={category.id}
              className="relative group"
              onMouseEnter={() => setHoveredItem(category.id)}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={category.onClick}
            >
              <div
                className={cn(
                  "relative overflow-hidden border bg-zinc-950 transition-all duration-300 ease-in-out cursor-pointer rounded-2xl",
                  // Hover state styles
                  hoveredItem === category.id
                    ? 'min-h-[140px] border-[#C8EB5F] shadow-lg shadow-[#C8EB5F]/10 bg-[#C8EB5F]/5'
                    : 'min-h-[88px] border-white/10 hover:border-[#C8EB5F]/50'
                )}
              >
                {/* Corner brackets that appear on hover */}
                {hoveredItem === category.id && (
                  <>
                    <div className="absolute top-4 left-4 w-6 h-6 animate-pulse">
                      <div className="absolute top-0 left-0 w-4 h-0.5 bg-[#C8EB5F]" />
                      <div className="absolute top-0 left-0 w-0.5 h-4 bg-[#C8EB5F]" />
                    </div>
                    <div className="absolute bottom-4 right-4 w-6 h-6 animate-pulse">
                      <div className="absolute bottom-0 right-0 w-4 h-0.5 bg-[#C8EB5F]" />
                      <div className="absolute bottom-0 right-0 w-0.5 h-4 bg-[#C8EB5F]" />
                    </div>
                  </>
                )}

                {/* Content */}
                <div className="flex items-center justify-between min-h-[88px] px-6 sm:px-10 py-5">
                  <div className="flex-1 pr-4">
                    <h3
                      className={cn(
                        "font-serif font-medium tracking-wide transition-colors duration-300",
                        category.featured ? 'text-2xl sm:text-3xl' : 'text-lg sm:text-xl',
                        hoveredItem === category.id ? 'text-[#C8EB5F]' : 'text-neutral-200'
                      )}
                    >
                      {category.title}
                    </h3>
                    {category.subtitle && (
                      <p
                        className={cn(
                          "mt-2 text-sm sm:text-base font-serif italic text-neutral-400 font-light leading-relaxed transition-all duration-300",
                          hoveredItem === category.id
                            ? 'opacity-100 max-h-40 visible translate-y-0 text-white/95'
                            : 'opacity-0 max-h-0 invisible -translate-y-2'
                        )}
                      >
                        {category.subtitle}
                      </p>
                    )}
                  </div>

                  {/* Icon appears on the right on hover */}
                  {category.icon && hoveredItem === category.id ? (
                    <div className="text-[#C8EB5F] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {category.icon}
                    </div>
                  ) : hoveredItem === category.id ? (
                    <div className="text-[#C8EB5F] font-mono text-[9px] tracking-widest hidden sm:block animate-pulse">
                      ✦ JOIN
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button as requested */}
        <div className="text-center mt-16">
          <Link
            href="/#booking-form"
            className="inline-flex items-center gap-2 rounded-full bg-[#C8EB5F] hover:bg-white text-black text-[11px] font-mono font-bold tracking-widest px-8 py-4 uppercase transition-colors duration-300"
          >
            Book Your Free Trial
          </Link>
        </div>
      </div>
    </div>
  );
};

export default function QuranClassesUKPage() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingType, setBookingType] = useState<"trial" | "demo">("trial");
  const [formSubmitted, setFormSubmitted] = useState(false);

  return (
    <main className="min-h-screen bg-black text-white font-sans selection:bg-[#C8EB5F] selection:text-black">
      
      {/* Luxury Navigation Header */}
      <NavigationHeader onTrialClick={() => { setBookingType("trial"); setBookingOpen(true); }} />
      <header className="hidden fixed top-0 left-0 w-full z-50 h-[76px] flex items-center justify-between px-6 md:px-12 bg-black/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl w-full mx-auto flex items-center justify-between">
          
          <Link href="/" className="group flex items-center gap-3">
            <div className="flex flex-col gap-1 items-end shrink-0 opacity-80 group-hover:opacity-100 transition-opacity">
              <div className="w-5 h-[2px] bg-[#C8EB5F] rounded-sm" />
              <div className="w-8 h-[2px] bg-white rounded-sm" />
            </div>
            <span className="font-serif tracking-[0.25em] font-bold text-white group-hover:text-[#C8EB5F] transition-colors text-xs uppercase sm:text-sm">
              TAJWEEDPAGE
            </span>
          </Link>

          {/* Nav menu */}
          <nav className="hidden md:flex items-center gap-8 text-[11px] font-mono tracking-widest text-[#eeeeee]">
            
            <Link href="/quran-classes-for-kids" className="hover:text-[#C8EB5F] transition-colors duration-300">Kids Quran</Link>
            
            {/* World Timings dropdown */}
            <div 
              className="relative group py-2"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button className="flex items-center gap-1 hover:text-[#C8EB5F] transition-colors duration-300 outline-none cursor-pointer">
                <span className="text-[#C8EB5F] font-bold uppercase tracking-widest">Quran in the world</span>
                <ChevronDown size={11} className={cn("transition-transform duration-300 text-[#C8EB5F]", dropdownOpen ? "rotate-180" : "")} />
              </button>
              
              <div className={cn(
                "absolute top-full left-1/2 -translate-x-1/2 pt-2 w-56 transition-all duration-300 z-50",
                dropdownOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2 pointer-events-none"
              )}>
                <div className="bg-zinc-950 border border-white/10 rounded-2xl p-2.5 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
                  <Link href="/quran-classes-in-usa" className="block px-4 py-2.5 text-[10px] tracking-wider font-mono text-neutral-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-bold">
                    Quran Classes in USA
                  </Link>
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
                  <div className="h-px bg-white/5 my-1" />
                  <Link href="/quran-classes-in-uk" className="block px-4 py-3 text-[10px] tracking-wider font-mono text-[#C8EB5F] hover:text-white hover:bg-[#C8EB5F]/5 rounded-xl transition-colors font-semibold">
                    Quran Classes in UK ✦
                  </Link>
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
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/" className="hidden sm:inline-block bg-[#C8EB5F] text-black hover:bg-white text-[11px] font-mono font-bold tracking-widest px-5 py-2.5 rounded-full uppercase transition-colors duration-300 font-semibold">
              FREE TRIAL
            </Link>

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
            className="fixed inset-0 bg-black/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-6 border-b border-[#C8EB5F]/20 pt-16"
          >
            <Link 
              href="/courses/tajweed-course" 
              className="text-lg tracking-widest uppercase text-white hover:text-[#C8EB5F] transition-colors font-serif font-light"
              onClick={() => setMobileMenuOpen(false)}
            >
              Tajweed Course
            </Link>
            <Link 
              href="/quran-classes-for-kids" 
              className="text-lg tracking-widest uppercase text-white hover:text-[#C8EB5F] transition-colors font-serif font-light"
              onClick={() => setMobileMenuOpen(false)}
            >
              Kids Quran
            </Link>
            <div className="flex flex-col items-center gap-1.5">
              <Link 
                href="/quran-classes-in-usa" 
                className="text-lg tracking-widest uppercase text-white hover:text-[#C8EB5F] transition-colors font-serif font-light"
                onClick={() => setMobileMenuOpen(false)}
              >
                Quran Classes in USA
              </Link>
              <div className="flex flex-col items-center gap-1 pl-3 border-l border-white/10 my-1">
                <Link href="/online-quran-classes-california" className="text-xs uppercase tracking-wider text-neutral-400 hover:text-[#C8EB5F]" onClick={() => setMobileMenuOpen(false)}>• California</Link>
                <Link href="/online-quran-classes-chicago" className="text-xs uppercase tracking-wider text-neutral-400 hover:text-[#C8EB5F]" onClick={() => setMobileMenuOpen(false)}>• Chicago</Link>
                <Link href="/online-quran-classes-new-york" className="text-xs uppercase tracking-wider text-neutral-400 hover:text-[#C8EB5F]" onClick={() => setMobileMenuOpen(false)}>• New York</Link>
                <Link href="/online-quran-classes-texas" className="text-xs uppercase tracking-wider text-neutral-400 hover:text-[#C8EB5F]" onClick={() => setMobileMenuOpen(false)}>• Texas</Link>
              </div>
            </div>
            <Link 
              href="/quran-classes-in-uk" 
              className="text-lg tracking-widest uppercase text-[#C8EB5F] hover:text-[#C8EB5F] transition-colors font-serif font-semibold"
              onClick={() => setMobileMenuOpen(false)}
            >
              Quran Classes in UK ✦
            </Link>
            <Link 
              href="/quran-in-the-world/quran-classes-in-europe" 
              className="text-lg tracking-widest uppercase text-white hover:text-[#C8EB5F] transition-colors font-serif font-light"
              onClick={() => setMobileMenuOpen(false)}
            >
              Quran Classes in Europe
            </Link>
            <Link 
              href="/quran-in-the-world" 
              className="text-lg tracking-widest uppercase text-white hover:text-[#C8EB5F] transition-colors font-serif font-light"
              onClick={() => setMobileMenuOpen(false)}
            >
              All Global Timings
            </Link>

            <Link 
              href="/#booking-form"
              onClick={() => setMobileMenuOpen(false)}
              className="bg-[#C8EB5F] text-black text-xs font-bold font-mono tracking-widest uppercase px-8 py-3.5 rounded-full mt-4"
            >
              FREE TRIAL CLASS
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero section */}
      <div className="pt-[76px]">
        <HeroSection 
          logo={{
            url: "https://i.postimg.cc/7LsH3Zyx/pexels-belalobeid-13549654.jpg",
            alt: "TajweedPage.com UK Logo",
            text: "TajweedPage UK"
          }}
          slogan="OLD MONEY LONDON ACADEMIC SYSTEM"
          title={<>Online Quran Classes UK <br /><span className="text-[#C8EB5F]">Professional Quran Learning</span> for UK Students</>}
          subtitle="Structured Quran lessons for children, adults, and beginners with flexible schedules designed for students across the United Kingdom."
          callToAction={{
            text: "CLAIM FREE UK INTRO SLOT",
            href: "/#booking-form"
          }}
          backgroundImage="https://i.postimg.cc/VLSHr9Xf/pexels-mrashid-15070484.jpg"
          contactInfo={{
            website: "tajweedpage.com/uk",
            phone: "+44 20 7946 0958",
            address: "Mayfair, London, United Kingdom"
          }}
        />
      </div>

      <PremiumMarquee 
        items={[
          "Online Quran Classes UK",
          "Professional British Quran Tutor Accompaniment",
          "100% Live One-On-One Adaptive Sessions",
          "Flexible London & Manchester GMT/BST Timings",
          "Certified Native Arab Scholar Tutors",
          "Islamic Studies for Children & Adults UK"
        ]}
        speed="80s"
        variant="brand"
      />

      {/* Luxury Content / Summary Section */}
      <section className="py-24 relative overflow-hidden bg-black">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#C8EB5F]/5 rounded-full blur-[140px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center space-y-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[10px] uppercase tracking-[0.35em] text-[#C8EB5F] font-bold">
            <span className="h-1.5 w-1.5 rounded-full bg-[#C8EB5F] animate-pulse" />
            ACADEMIC EXECUTIVE SUMMARY
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light font-serif tracking-tight text-white uppercase leading-tight max-w-2xl mx-auto">
            Summary
          </h2>

          <p className="text-lg sm:text-xl text-neutral-300 font-serif font-light leading-relaxed max-w-3xl mx-auto italic">
            This page explains how TajweedPage.com helps students in the UK learn the Quran online through personalized classes, flexible schedules, and professional Quran teaching.
          </p>

          <div className="pt-6 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent max-w-md mx-auto" />
          
          <p className="text-xs sm:text-sm text-neutral-500 font-light leading-relaxed max-w-lg mx-auto">
            Curated one-on-one session planners correspond directly with London, Birmingham, and Manchester timezone adjustments for seamless family schedules.
          </p>
        </div>
      </section>

      {/* Cinematic Parallax Scrolling Feature Section (Why UK Families Choose TajweedPage.com) */}
      <section className="bg-black relative pt-16">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C8EB5F]/20 to-transparent" />
        
        {/* Section Luxury Banner */}
        <div className="py-24 text-center px-6 relative z-10 bg-black">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[9px] uppercase tracking-[0.4em] text-[#C8EB5F] font-mono mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-[#C8EB5F] animate-pulse" />
            ELITE ACADEMIC STANDARDS
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-light font-serif tracking-tight text-white uppercase leading-tight max-w-4xl mx-auto">
            Why UK Families <br /><span className="text-[#C8EB5F]">Choose TajweedPage.com</span>
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 font-mono tracking-widest mt-6 uppercase">
            SCROLL DOWN FOR ADAPTIVE DETAILED BLOCKS ✦
          </p>
          <div className="mt-8 h-12 w-[1px] bg-gradient-to-b from-[#C8EB5F]/50 to-transparent mx-auto" />
        </div>

        {/* 4 Custom Parallax Scrolling Cards via requested layout */}
        <div className="space-y-4">
          <TextParallaxContent
            imgUrl="https://images.unsplash.com/photo-1513829096960-ef2297c37adf?q=80&w=1200"
            subheading="01 / CONVENIENT TIMINGS"
            heading="UK-Friendly Class Schedules"
          >
            <ExampleContent 
              sectionTitle="Schedules Crafted For the United Kingdom"
              description="Convenient lesson timings for students across the United Kingdom."
            />
          </TextParallaxContent>

          <TextParallaxContent
            imgUrl="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1200"
            subheading="02 / INDIVIDUAL ATTENTION"
            heading="Personalized Quran Lessons"
          >
            <ExampleContent 
              sectionTitle="One-On-One Tailored Focus"
              description="Individual attention for better Quran learning progress."
            />
          </TextParallaxContent>

          <TextParallaxContent
            imgUrl="https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1200"
            subheading="03 / CERTIFIED SCHOLARS"
            heading="Professional Quran Teachers"
          >
            <ExampleContent 
              sectionTitle="Vetted Native Islamic Experts"
              description="Experienced tutors specialized in Quran recitation and Islamic learning."
            />
          </TextParallaxContent>

          <TextParallaxContent
            imgUrl="https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=1200"
            subheading="04 / VIVID COMPREHENSION"
            heading="Interactive Learning Environment"
          >
            <ExampleContent 
              sectionTitle="Active Recitation & Instant Correction"
              description="Live online sessions with recitation practice and correction."
            />
          </TextParallaxContent>
        </div>
      </section>

      {/* Programs Available for UK Students section (Parallax custom design) */}
      <ProgramsAvailableSection />

      {/* Frequently Asked Questions section with hover custom accordion categories */}
      <FAQSection />

      {/* Start Learning Quran Online in the UK (Luxury Category List Integration) */}
      <CategoryList 
        title="Start Learning Quran Online in the UK"
        subtitle="Join interactive Quran learning programs designed for Muslim families living in the United Kingdom."
        categories={startQuranCategories}
      />

      <PremiumMarquee 
        items={[
          "Premier UK Online Quran Academy",
          "Quran Learning Online For Kids & Adults",
          "Experienced Female Quran Tutors Online",
          "Zero-Judgment Family Study Plans",
          "Book Your Complimentary UK Guided Trial"
        ]}
        speed="100s"
        variant="subtle"
      />

      {/* Elegant Footer block */}
      

      {/* INTERACTIVE DIALOG MODAL FOR TRIALS & DEMOS */}
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

              <div className="space-y-4 mb-6 text-left">
                <span className="text-[9px] tracking-[0.3em] font-semibold text-[#C8EB5F] uppercase font-mono block">
                  {bookingType === "trial" ? "COMPLIMENTARY PASS" : "DIAGNOSTIC DEMO CLASS"}
                </span>
                <h3 className="font-serif text-2xl uppercase text-white leading-none font-light">
                  {bookingType === "trial" ? "Claim Your Free Live Trial" : "Schedule Diagnostic Demo"}
                </h3>
                <p className="text-xs text-neutral-400 font-light leading-relaxed font-serif italic">
                  Learn live, one-on-one over Zoom or Teams with a qualified certified scholar.
                </p>
              </div>

              {formSubmitted ? (
                <div className="bg-[#C8EB5F]/10 border border-[#C8EB5F]/30 p-6 rounded-2xl text-center space-y-4">
                  <CheckCircle2 className="text-[#C8EB5F] mx-auto animate-bounce" size={32} />
                  <h4 className="text-white font-serif text-lg font-light">Inquiry Confirmed</h4>
                  <p className="text-neutral-400 text-xs font-light leading-relaxed font-serif italic">
                    Success! A academy registrar situated inside UK/London zones will contact you over WhatsApp/Email within 2 hours to confirm details & lock in custom schedule.
                  </p>
                  <button
                    onClick={() => {
                      setBookingOpen(false);
                      setFormSubmitted(false);
                    }}
                    className="mt-2 text-xs font-mono text-[#C8EB5F] hover:underline uppercase tracking-wider"
                  >
                    Return to classes
                  </button>
                </div>
              ) : (
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    setFormSubmitted(true);
                  }}
                  className="space-y-4 text-left"
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
                      placeholder="e.g. +44 7946 0958"
                      className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#C8EB5F]"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] tracking-widest font-mono text-neutral-400 uppercase block mb-1.5">Class Timings Preferred</label>
                    <select className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-xs text-neutral-300 focus:outline-none">
                      <option>Morning Slots (6:00 AM - 11:00 AM BST)</option>
                      <option>Afternoon Slots (12:00 PM - 4:00 PM BST)</option>
                      <option>Evening Slots (5:00 PM - 10:00 PM BST)</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#C8EB5F] p-4 text-black text-[11px] tracking-widest font-mono uppercase font-bold text-center mt-2 shadow-[0_4px_25px_rgba(200,235,95,0.15)] hover:bg-white transition-colors duration-300 rounded-full"
                  >
                    SECURE LIVE ONE-ON-ONE SEAT
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
