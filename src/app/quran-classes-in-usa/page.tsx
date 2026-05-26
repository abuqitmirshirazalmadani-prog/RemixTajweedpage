"use client";

import React, { useState, useRef, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { NavigationHeader } from "@/components/ui/navigation-header";
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, CheckCircle2, Star, ChevronDown, ChevronRight, Check, ArrowUpRight, ArrowDown, HelpCircle, Menu, X } from 'lucide-react';
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
                        "Flexible US Timings (EST/CST/PST)",
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

const IMG_PADDING = 12;

interface TextParallaxContentProps {
  imgUrl: string;
  subheading: string;
  heading: string;
  children: React.ReactNode;
}

const TextParallaxContent = ({ imgUrl, subheading, heading, children }: TextParallaxContentProps) => {
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

  const y = useTransform(scrollYProgress, [0, 1], [250, -250]);
  const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0]);

  return (
    <motion.div
      style={{
        y,
        opacity,
      }}
      ref={targetRef}
      className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center text-white px-4"
    >
      <p className="mb-4 text-center text-xs tracking-[0.4em] font-mono uppercase text-[#C8EB5F]">
        {subheading}
      </p>
      <p className="text-center text-3xl sm:text-4xl md:text-6xl font-serif font-light uppercase tracking-tight max-w-4xl leading-tight">
        {heading}
      </p>
    </motion.div>
  );
};

interface ExampleContentProps {
  title: string;
  desc: string;
  ctaText: string;
  ctaHref: string;
}

const ExampleContent = ({ title, desc, ctaText, ctaHref }: ExampleContentProps) => (
  <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 pb-32 pt-16 md:grid-cols-12 bg-black border-y border-white/5 my-4">
    <div className="col-span-1 md:col-span-5 flex flex-col justify-center">
      <h4 className="text-[10px] tracking-[0.3em] font-mono text-[#C8EB5F] uppercase mb-4">
        ACADEMIC QUALITY
      </h4>
      <h3 className="text-3xl sm:text-4xl font-serif font-light text-white leading-tight uppercase">
        {title}
      </h3>
      <div className="h-px w-16 bg-[#C8EB5F]/40 mt-6" />
    </div>
    <div className="col-span-1 md:col-span-7 flex flex-col justify-center">
      <p className="mb-8 text-sm sm:text-base text-neutral-400 font-light leading-relaxed font-sans max-w-2xl">
        {desc}
      </p>
      <Link 
        href={ctaHref}
        className="group inline-flex items-center gap-2 w-fit rounded-full border border-white/10 bg-white/5 px-8 py-3.5 text-xs font-mono tracking-widest text-white uppercase transition-all hover:bg-[#C8EB5F] hover:text-black hover:border-[#C8EB5F]"
      >
        <span>{ctaText}</span>
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
      </Link>
    </div>
  </div>
);

const pgSections = [
  {
    id: 1,
    title: "Quran Reading Lessons",
    description: "Our comprehensive curriculum develops confident, fluent recitation from the outset. Tailored for both young students and working adults, this course emphasizes smooth syllable blending, correct letter joining, and a natural recitation pace.",
    imageUrl: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?q=80&w=600&auto=format&fit=crop",
    reverse: false
  },
  {
    id: 2,
    title: "Tajweed Learning",
    description: "Master the rules of classical pronunciation. Dive deep into articulation points (Makharij), characteristics of letters (Sifat), and correct breathing control under absolute expert evaluation.",
    imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=600&auto=format&fit=crop",
    reverse: true
  },
  {
    id: 3,
    title: "Noorani Qaida",
    description: "The essential phonetics workbook for absolute beginners and children. Establish spelling rules, letter identification, throat letters, and voice coordination step-by-step.",
    imageUrl: "https://i.postimg.cc/GmPhqPXq/Benefits-of-learning-Noorani-Qaida.webp",
    reverse: false
  },
  {
    id: 4,
    title: "Hifz Support",
    description: "Personalized Quran memorization with highly structured repetition schedules. We help you memorize designated portions or the entire Holy Quran with proper retention guidelines.",
    imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=600&auto=format&fit=crop",
    reverse: true
  },
  {
    id: 5,
    title: "Islamic Studies",
    description: "A comprehensive addition including historical perspectives, prophetic supplications, standard prayers (Salah), and daily life ethics to cultivate standard moral growth.",
    imageUrl: "https://i.postimg.cc/9fKmfx0D/pexels-zeynep-sude-emek-193601188-20785857.jpg",
    reverse: false
  }
];

const ProgramItem = ({ section }: { section: typeof pgSections[0] }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center start"]
  });

  const opacityContent = useTransform(scrollYProgress, [0, 0.7], [0, 1]);
  const clipProgress = useTransform(scrollYProgress, [0, 0.7], ["inset(0% 100% 0% 0%)", "inset(0% 0% 0% 0%)"]);
  
  // Staggered vertical translations for text layers
  const translateContent1 = useTransform(scrollYProgress, [0, 1], [-80, 0]);
  const translateContent2 = useTransform(scrollYProgress, [0, 1], [-40, 0]);
  
  // Parallax motion for the image inside its masking container
  const imageParallax = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <div 
      ref={ref} 
      className={cn(
        "h-screen flex flex-col md:flex-row items-center justify-center md:gap-40 gap-12 px-6 md:px-12 bg-black overflow-hidden relative border-b border-white/5",
        section.reverse ? 'md:flex-row-reverse' : ''
      )}
    >
      <motion.div style={{ y: translateContent1 }} className="flex-1 max-w-sm z-10">
        <h3 className="text-4xl md:text-5xl font-serif font-light text-white tracking-tight leading-tight uppercase">
          {section.title}
        </h3>
        <motion.p 
          style={{ y: translateContent2 }} 
          className="text-neutral-400 font-sans font-light text-sm sm:text-base mt-8 leading-relaxed"
        >
          {section.description}
        </motion.p>
        <div className="mt-8">
          <Link
            href="/#booking-form"
            className="group inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#C8EB5F] uppercase hover:underline"
          >
            <span>LEARN MORE</span>
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 text-[#C8EB5F]" />
          </Link>
        </div>
      </motion.div>
      <div className="flex-1 flex justify-center items-center z-10 w-full">
        <motion.div 
          style={{ 
            opacity: opacityContent,
            clipPath: clipProgress,
          }}
          className="relative w-full max-w-sm aspect-square overflow-hidden rounded-[2.5rem] border border-white/5 shadow-2xl bg-zinc-900"
        >
          <motion.img 
            style={{ y: imageParallax }}
            src={section.imageUrl} 
            className="absolute left-0 w-full h-[130%] -top-[15%] object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-110" 
            alt={section.title}
          />
        </motion.div>
      </div>
    </div>
  );
};

// Define the type for a single category item
interface Category {
  id: string | number;
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  featured?: boolean;
}

// Define the props for the CategoryList component
interface CategoryListProps {
  title: string;
  subtitle?: string;
  categories: Category[];
  headerIcon?: React.ReactNode;
  className?: string;
}

const CategoryList = ({
  title,
  subtitle,
  categories,
  headerIcon,
  className,
}: CategoryListProps) => {
  const [hoveredItem, setHoveredItem] = useState<string | number | null>(null);

  return (
    <div className={cn("w-full bg-black text-white py-24 px-6 border-t border-white/5", className)}>
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          {headerIcon && (
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#C8EB5F]/10 border border-[#C8EB5F]/20 mb-6 text-[#C8EB5F]">
              {headerIcon}
            </div>
          )}
          <p className="text-[10px] tracking-[0.4em] font-mono text-[#C8EB5F] uppercase mb-4">ANSWERS & ASSURANCES</p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-light text-white tracking-tight uppercase leading-tight max-w-2xl mx-auto">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-4 text-xs font-mono tracking-widest uppercase text-neutral-500">{subtitle}</p>
          )}
          <div className="h-px w-24 bg-[#C8EB5F]/40 mx-auto mt-8" />
        </div>

        {/* Categories List */}
        <div className="space-y-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className="relative group rounded-2xl overflow-hidden"
              onMouseEnter={() => setHoveredItem(category.id)}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={category.onClick}
            >
              <div
                className={cn(
                  "relative overflow-hidden border transition-all duration-300 ease-in-out cursor-pointer flex flex-col justify-center rounded-2xl",
                  // Hover state styles
                  hoveredItem === category.id
                    ? 'min-h-[8rem] sm:h-32 border-[#C8EB5F] shadow-lg shadow-[#C8EB5F]/10 bg-zinc-900/80'
                    : 'min-h-[6rem] sm:h-24 border-white/5 hover:border-[#C8EB5F]/30 bg-zinc-950/40'
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
                <div className="flex items-center justify-between h-full px-6 md:px-8 py-4 sm:py-0">
                  <div className="flex-1">
                    <h3
                      className={cn(
                        "font-serif font-light uppercase tracking-wide transition-colors duration-300",
                        category.featured ? 'text-xl sm:text-2xl md:text-3xl' : 'text-lg sm:text-xl md:text-2xl',
                        hoveredItem === category.id ? 'text-[#C8EB5F]' : 'text-white'
                      )}
                    >
                      {category.title}
                    </h3>
                    {category.subtitle && (
                      <p
                        className={cn(
                          "mt-2 transition-colors duration-300 text-xs sm:text-sm font-light font-sans",
                           hoveredItem === category.id ? 'text-neutral-300' : 'text-neutral-500'
                        )}
                      >
                        {category.subtitle}
                      </p>
                    )}
                  </div>

                  {/* Icon appears on the right on hover */}
                  {category.icon && (
                    <div className={cn(
                      "text-[#C8EB5F] transition-all duration-300 ml-4 shrink-0",
                      hoveredItem === category.id ? "opacity-100 scale-100" : "opacity-0 scale-75"
                    )}>
                      {category.icon}
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
};

interface VerticalMarqueeProps {
  children: React.ReactNode;
  pauseOnHover?: boolean;
  reverse?: boolean;
  className?: string;
  speed?: number;
  onItemsRef?: (items: HTMLElement[]) => void;
}

function VerticalMarquee({
  children,
  pauseOnHover = false,
  reverse = false,
  className,
  speed = 30,
  onItemsRef,
}: VerticalMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (onItemsRef && containerRef.current) {
      const items = Array.from(containerRef.current.querySelectorAll('.marquee-item')) as HTMLElement[];
      onItemsRef(items);
    }
  }, [onItemsRef]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "group flex flex-col overflow-hidden",
        className
      )}
      style={
        {
          "--duration": `${speed}s`,
        } as React.CSSProperties
      }
    >
      <div
        className={cn(
          "flex shrink-0 flex-col animate-marquee-vertical",
          reverse && "[animation-direction:reverse]",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
      >
        {children}
      </div>
      <div
        className={cn(
          "flex shrink-0 flex-col animate-marquee-vertical",
          reverse && "[animation-direction:reverse]",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
        aria-hidden="true"
      >
        {children}
      </div>
    </div>
  );
}

const marqueeItems = [
  "Flexible Schedules",
  "Expert Quran Tutors",
  "One-on-One Live Lessons",
  "Kids Quran Classes",
  "Tajweed Pronunciation",
  "Noorani Qaida Lessons",
  "Hifz Memorization Support",
  "Islamic Character Studies"
];

const CTAWithVerticalMarquee = () => {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const marqueeContainer = marqueeRef.current;
    if (!marqueeContainer) return;

    const updateOpacity = () => {
      const items = marqueeContainer.querySelectorAll('.marquee-item');
      const containerRect = marqueeContainer.getBoundingClientRect();
      const centerY = containerRect.top + containerRect.height / 2;

      items.forEach((item) => {
        const itemRect = item.getBoundingClientRect();
        const itemCenterY = itemRect.top + itemRect.height / 2;
        const distance = Math.abs(centerY - itemCenterY);
        const maxDistance = containerRect.height / 2;
        const normalizedDistance = Math.min(distance / maxDistance, 1);
        const opacity = 1 - normalizedDistance * 0.75;
        (item as HTMLElement).style.opacity = opacity.toString();
      });
    };

    const animationFrame = () => {
      updateOpacity();
      requestAnimationFrame(animationFrame);
    };

    const frame = requestAnimationFrame(animationFrame);

    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6 py-24 overflow-hidden border-t border-white/5 relative">
      <div className="absolute top-1/2 left-[80%] -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#C8EB5F]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="w-full max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Content */}
          <div className="space-y-10 max-w-xl">
            <p className="text-[10px] tracking-[0.4em] font-mono text-[#C8EB5F] uppercase">EXECUTIVE ENROLLMENT</p>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif font-light leading-tight tracking-tight text-white uppercase">
              Start Learning Quran <br />Online in the <span className="italic text-[#C8EB5F]">USA</span>
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 font-sans font-light leading-relaxed max-w-md">
              Join personalized Quran lessons designed for Muslim families and students living in America. Experience a luxury 1-on-1 tutoring dynamic crafted for US lifestyles.
            </p>
            <div className="pt-4 flex flex-wrap gap-6">
              <Link 
                href="/#booking-form"
                className="group inline-flex items-center justify-center text-xs tracking-widest font-mono bg-[#C8EB5F] hover:bg-white text-black font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-[0_4px_30px_rgba(200,235,95,0.15)] uppercase"
              >
                <span>Book Your Free Trial</span>
                <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </div>
          </div>

          {/* Right Marquee */}
          <div ref={marqueeRef} className="relative h-[550px] lg:h-[650px] flex items-center justify-center">
            <div className="relative w-full h-full border-l border-white/5 pl-8 md:pl-16">
              <VerticalMarquee speed={22} className="h-full">
                {marqueeItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light tracking-wide py-8 marquee-item text-neutral-500 uppercase transition-opacity duration-300"
                  >
                    ✦ {item}
                  </div>
                ))}
              </VerticalMarquee>
              
              {/* Top vignette overlay */}
              <div className="pointer-events-none absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black via-black/40 to-transparent z-10"></div>
              
              {/* Bottom vignette overlay */}
              <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black via-black/40 to-transparent z-10"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function QuranClassesUSAPage() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [usaSubpagesOpen, setUsaSubpagesOpen] = useState(false);

  return (
    <main className="min-h-screen bg-black text-white font-sans selection:bg-[#C8EB5F] selection:text-black">
      
      {/* Luxury Navigation Header */}
      <NavigationHeader onTrialClick={() => {}} />
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
                  <div className="flex items-center justify-between px-4 py-2 hover:bg-white/5 rounded-xl cursor-pointer" onClick={() => setUsaSubpagesOpen(!usaSubpagesOpen)}>
                    <Link href="/quran-classes-in-usa" onClick={(e) => e.stopPropagation()} className="block text-[10px] tracking-wider font-mono text-[#C8EB5F] hover:text-white transition-colors font-semibold">
                      Quran Classes in USA ✦
                    </Link>
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setUsaSubpagesOpen(!usaSubpagesOpen);
                      }}
                      className="p-0.5 hover:text-[#C8EB5F] text-neutral-450 focus:outline-none transition-colors"
                    >
                      <ChevronRight size={12} className={cn("transition-transform duration-200", usaSubpagesOpen ? "rotate-90 text-[#C8EB5F]" : "")} />
                    </button>
                  </div>
                  {usaSubpagesOpen && (
                    <div className="pl-4 pr-1 py-1 space-y-0.5 border-l border-white/10 ml-4 mb-2">
                      <Link href="/online-quran-classes-california" className="block px-3 py-1.5 text-[9px] tracking-wider font-mono text-neutral-400 hover:text-[#C8EB5F] hover:bg-white/5 rounded-lg transition-colors font-light">
                        • California
                      </Link>
                      <Link href="/online-quran-classes-chicago" className="block px-3 py-1.5 text-[9px] tracking-wider font-mono text-neutral-400 hover:text-[#C8EB5F] hover:bg-white/5 rounded-lg transition-colors font-light">
                        • Chicago
                      </Link>
                      <Link href="/online-quran-classes-new-york" className="block px-3 py-1.5 text-[9px] tracking-wider font-mono text-neutral-400 hover:text-[#C8EB5F] hover:bg-white/5 rounded-lg transition-colors font-light">
                        • New York
                      </Link>
                      <Link href="/online-quran-classes-texas" className="block px-3 py-1.5 text-[9px] tracking-wider font-mono text-neutral-400 hover:text-[#C8EB5F] hover:bg-white/5 rounded-lg transition-colors font-light">
                        • Texas
                      </Link>
                    </div>
                  )}
                  <div className="h-px bg-white/5 my-1" />
                  <Link href="/quran-classes-in-uk" className="block px-4 py-3 text-[10px] tracking-wider font-mono text-neutral-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
                    Quran Classes in UK
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
            <Link href="/" className="hidden sm:inline-block bg-[#C8EB5F] text-black hover:bg-white text-[11px] font-mono font-bold tracking-widest px-5 py-2.5 rounded-full uppercase transition-colors duration-300">
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
              <div className="flex items-center gap-2">
                <Link 
                  href="/quran-classes-in-usa" 
                  className="text-lg tracking-widest uppercase text-[#C8EB5F] hover:text-[#C8EB5F] transition-colors font-serif font-semibold"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Quran Classes in USA ✦
                </Link>
                <button
                  onClick={() => setUsaSubpagesOpen(!usaSubpagesOpen)}
                  className="p-1 hover:text-[#C8EB5F] text-neutral-450 transition-colors focus:outline-none"
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
            <Link 
              href="/quran-classes-in-uk" 
              className="text-lg tracking-widest uppercase text-white hover:text-[#C8EB5F] transition-colors font-serif font-light"
              onClick={() => setMobileMenuOpen(false)}
            >
              Quran Classes in UK
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
            alt: "TajweedPage.com USA Logo",
            text: "TajweedPage USA"
          }}
          slogan="NEW YORK & HOUSTON ACADEMIC SYSTEM"
          title={<>Online Quran Classes USA <br /><span className="text-[#C8EB5F]">Professional Quran Learning</span> for US Students</>}
          subtitle="Structured Quran lessons for children, adults, and beginners with flexible schedules designed for students across the United States."
          callToAction={{
            text: "CLAIM FREE US INTRO SLOT",
            href: "/#booking-form"
          }}
          backgroundImage="https://i.postimg.cc/XN1bjzx0/pexels-a-darmel-8164584.jpg"
          contactInfo={{
            website: "tajweedpage.com/usa",
            phone: "+1 212 555 0199",
            address: "Manhattan, New York, USA"
          }}
        />
      </div>

      <PremiumMarquee 
        items={[
          "Online Quran Classes USA",
          "Professional US Quran Tutor Accompaniment",
          "100% Live One-On-One Adaptive Sessions",
          "Flexible Eastern, Central, and Pacific Timings",
          "Certified Native Arab Scholar Tutors",
          "Noorani Qaida & Tajweed Academic Tracks"
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
            This page explains how TajweedPage.com helps students in the US learn the Quran online through personalized classes, flexible schedules, and professional Quran teaching.
          </p>

          <div className="pt-6 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent max-w-md mx-auto" />
          
          <p className="text-xs sm:text-sm text-neutral-500 font-light leading-relaxed max-w-lg mx-auto">
            Curated one-on-one session planners correspond directly with US Eastern, Central, and Pacific timezone adjustments for seamless family schedules.
          </p>
        </div>
      </section>

      {/* Why Students in the USA Choose TajweedPage.com Parallax Sections */}
      <div className="bg-black pt-32 pb-16 text-center px-4">
        <p className="text-[10px] tracking-[0.4em] font-mono text-[#C8EB5F] uppercase mb-4">EXCLUSIVE ADVANTAGE</p>
        <h2 className="text-4xl sm:text-5xl md:text-7xl font-serif font-light text-white tracking-tight uppercase leading-none max-w-5xl mx-auto">
          Why Students in the <span className="italic text-[#C8EB5F]">USA</span> Choose TajweedPage
        </h2>
        <div className="h-px w-24 bg-[#C8EB5F]/40 mx-auto mt-8" />
      </div>

      <div className="bg-black">
        <TextParallaxContent
          imgUrl="https://images.unsplash.com/photo-1495364141860-b0d03eccd065?q=80&w=1600&auto=format&fit=crop"
          subheading="01 / SCHEDULE"
          heading="Flexible American Time Zones"
        >
          <ExampleContent 
            title="Schedules Crafted For US Lifestyles"
            desc="We understand the fast-paced American lifestyle and busy academic calendar. Classes are available according to EST, CST, MST, and PST schedules so you never have to choose between education and comfort."
            ctaText="Reserve Your Slot"
            ctaHref="/#booking-form"
          />
        </TextParallaxContent>

        <TextParallaxContent
          imgUrl="https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1600&auto=format&fit=crop"
          subheading="02 / CURRICULUM"
          heading="Personalized Quran Learning"
        >
          <ExampleContent 
            title="Bespoke One-on-One Quran Lessons"
            desc="No two students learn at the same pace. We provide highly personalized one-on-one Quran lessons tailored specifically for children, adults, and absolute beginners for high retention."
            ctaText="Start Bespoke Lesson"
            ctaHref="/#booking-form"
          />
        </TextParallaxContent>

        <TextParallaxContent
          imgUrl="https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=1600&auto=format&fit=crop"
          subheading="03 / INSTRUCTORS"
          heading="Qualified Quran Teachers"
        >
          <ExampleContent 
            title="Authoritative & Elite Quran Tutors"
            desc="Pronunciation correction requires precision. Our professional tutors with experience teaching international students ensure flawless recitation guidance and clear english-medium delivery."
            ctaText="Meet Our Tutors"
            ctaHref="/#booking-form"
          />
        </TextParallaxContent>

        <TextParallaxContent
          imgUrl="https://i.postimg.cc/dtxFLhSh/pexels-jahratreza-36188877.jpg"
          subheading="04 / TECHNOLOGY"
          heading="Interactive Online Learning"
        >
          <ExampleContent 
            title="Live Sessions With Precision Feedback"
            desc="Experience premium real-time interactive lectures. Benefit from live sessions with personalized recitation correction, high-definition audio pacing, and tablet whiteboards."
            ctaText="Register For Trial"
            ctaHref="/#booking-form"
          />
        </TextParallaxContent>
      </div>

      {/* Scrollable Programs Section */}
      <div className="bg-black pt-32 pb-8 text-center px-4 border-t border-white/5">
        <p className="text-[10px] tracking-[0.4em] font-mono text-[#C8EB5F] uppercase mb-4">ACADEMIC PATHWAYS</p>
        <h2 className="text-4xl sm:text-5xl md:text-7xl font-serif font-light text-white tracking-tight uppercase leading-none max-w-5xl mx-auto">
          Programs Available for <span className="italic text-[#C8EB5F]">USA</span> Students
        </h2>
        <p className="mt-8 flex items-center justify-center gap-2 text-zinc-500 text-xs font-mono tracking-widest uppercase">
          SCROLL TO EXPLORE <ArrowDown size={14} className="text-[#C8EB5F] animate-bounce" />
        </p>
        <div className="h-px w-24 bg-[#C8EB5F]/40 mx-auto mt-8" />
      </div>

      <div className="flex flex-col">
        {pgSections.map((section) => (
          <ProgramItem key={section.id} section={section} />
        ))}
      </div>

      {/* Frequently Asked Questions FAQ Section */}
      <CategoryList
        title="Frequently Asked Questions"
        subtitle="Hassle-Free Online Instruction"
        headerIcon={<HelpCircle className="h-8 w-8 text-[#C8EB5F]" />}
        categories={[
          {
            id: "faq-1",
            title: "Are classes available in USA timings?",
            subtitle: "Yes. Flexible schedules are available across all major USA time zones.",
            icon: <ArrowUpRight className="h-5 w-5" />,
          },
          {
            id: "faq-2",
            title: "Can beginners join?",
            subtitle: "Yes. Classes are suitable for beginners and advanced students.",
            icon: <ArrowUpRight className="h-5 w-5" />,
          },
          {
            id: "faq-3",
            title: "Is a free trial available?",
            subtitle: "Yes. Students can book a free trial class before enrollment.",
            icon: <ArrowUpRight className="h-5 w-5" />,
          }
        ]}
      />

      {/* CTA Section with Vertical Scrolling Marquee of Courses/Benefits */}
      <CTAWithVerticalMarquee />

      <PremiumMarquee 
        items={[
          "Premier USA Online Quran Academy",
          "Quran Learning Online For Kids & Adults",
          "Experienced Female Quran Tutors Online",
          "Zero-Judgment Multi-TimeZone Classrooms",
          "Reserve Your Complimentary US Trial Slot"
        ]}
        speed="100s"
        variant="subtle"
      />

      {/* FOOTER */}
      

    </main>
  );
}
