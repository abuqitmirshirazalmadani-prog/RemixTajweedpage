"use client";

import React, { useState, useRef } from 'react';
import { cn } from "@/lib/utils";
import { NavigationHeader } from "@/components/ui/navigation-header";
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import Link from 'next/link';
import Image from 'next/image';
import { PremiumMarquee } from "@/components/ui/premium-marquee";
import { 
  ArrowLeft, 
  CheckCircle2, 
  Star, 
  ChevronDown, 
  Check, 
  Menu, 
  X, 
  ArrowDown, 
  Globe, 
  MapPin, 
  Clock, 
  BookOpen, 
  Heart, 
  Users, 
  Sparkles,
  Inbox,
  ArrowUpRight
} from 'lucide-react';

// Icon component for contact details as specified in prompt
const InfoIcon = ({ type }: { type: 'website' | 'phone' | 'address' }) => {
    const icons = {
        website: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 sm:h-5 sm:w-5 text-[#C8EB5F]">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" x2="22" y1="12" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            </svg>
        ),
        phone: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 sm:h-5 sm:w-5 text-[#C8EB5F]">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
        ),
        address: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 sm:h-5 sm:w-5 text-[#C8EB5F]">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                <circle cx="12" cy="10" r="3"></circle>
            </svg>
        ),
    };
    return <div className="mr-2 flex-shrink-0">{icons[type]}</div>;
};

// Prop types for the HeroSection component as specified in prompt
interface HeroSectionProps {
  className?: string;
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
  onActionClick?: () => void;
}

const HeroSection = React.forwardRef<HTMLDivElement, HeroSectionProps>(
  ({ className, logo, slogan, title, subtitle, callToAction, backgroundImage, contactInfo, onActionClick }, ref) => {
    
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
          ease: "easeInOut" as any,
        },
      },
    };
    
    return (
      <motion.section
        ref={ref}
        className={cn(
          "relative flex w-full flex-col overflow-hidden bg-black text-white md:flex-row min-h-[90vh] border-b border-white/5",
          className
        )}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Left Side: Content */}
        <div className="flex w-full flex-col justify-between p-6 sm:p-10 md:w-1/2 md:p-12 lg:w-3/5 lg:p-16 relative z-10 bg-gradient-to-r from-black via-black/95 to-transparent">
            {/* Top Section: Logo & Main Content */}
            <div className="my-auto space-y-8 sm:space-y-10">
                <motion.header className="mb-6 sm:mb-10" variants={itemVariants}>
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
                                {logo.text && <p className="text-xs sm:text-sm font-bold tracking-widest font-mono text-white uppercase">{logo.text}</p>}
                                {slogan && <p className="text-[9px] tracking-[0.25em] font-mono text-neutral-500 uppercase">{slogan}</p>}
                            </div>
                        </div>
                    )}
                </motion.header>

                <motion.main variants={containerVariants} className="space-y-6 sm:space-y-8">
                    <motion.h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-light leading-tight text-white font-serif tracking-tight uppercase" variants={itemVariants}>
                        {title}
                    </motion.h1>
                    
                    <motion.div className="h-[2px] w-24 bg-[#C8EB5F]" variants={itemVariants}></motion.div>
                    
                    <motion.p className="max-w-xl text-xs sm:text-sm text-neutral-400 font-light leading-relaxed font-sans" variants={itemVariants}>
                        {subtitle}
                    </motion.p>

                    {/* Features list as requested */}
                    <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-w-lg mb-2" variants={itemVariants}>
                      {[
                        "Flexible European Timings",
                        "Live One-on-One Classes",
                        "Beginner-Friendly Programs",
                        "Experienced Quran Tutors",
                        "Free Trial Class"
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2.5 text-xs text-neutral-300 font-light">
                          <span className="h-5 w-5 rounded-full border border-[#C8EB5F]/20 bg-[#C8EB5F]/5 flex items-center justify-center shrink-0">
                            <Check className="text-[#C8EB5F] h-3 w-3" />
                          </span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </motion.div>
                    
                    <motion.div className="pt-2 sm:pt-4" variants={itemVariants}>
                        <button 
                          onClick={() => {
                            if (onActionClick) {
                              onActionClick();
                            } else if (typeof window !== "undefined") {
                              const el = document.getElementById("booking-box");
                              if (el) el.scrollIntoView({ behavior: 'smooth' });
                            }
                          }}
                          className="inline-flex items-center justify-center text-xs tracking-[0.2em] uppercase font-mono bg-[#C8EB5F] hover:bg-white text-black font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-[0_4px_30px_rgba(200,235,95,0.22)]"
                        >
                            {callToAction.text}
                        </button>
                    </motion.div>
                </motion.main>
            </div>

            {/* Bottom Section: Footer Info */}
            <motion.footer className="mt-12 sm:mt-16 w-full pt-6 border-t border-white/5" variants={itemVariants}>
                <div className="grid grid-cols-1 gap-4 text-[9px] sm:text-[10px] tracking-wider font-mono text-neutral-500 sm:grid-cols-3 uppercase">
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
          className="absolute inset-y-0 right-0 w-full md:w-1/2 bg-cover bg-center -z-10 md:relative md:z-0 filter grayscale contrast-[110%] brightness-[70%]"
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
      className="bg-black"
    >
      <div className="relative h-[120vh] sm:h-[135vh]">
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
      className="sticky z-0 overflow-hidden rounded-[32px] md:rounded-[48px] filter grayscale hover:grayscale-0 transition-all duration-[1.2s] ease-out brightness-[40%] border border-white/5 opacity-90 hover:opacity-100"
    >
      <motion.div
        className="absolute inset-0 bg-neutral-950/40"
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
      className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center text-white px-4 z-10 pointer-events-none select-none"
    >
      <p className="mb-4 text-center text-[10px] sm:text-xs font-mono tracking-[0.3em] text-[#C8EB5F] uppercase bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-[#C8EB5F]/20">
        {subheading}
      </p>
      <h3 className="text-center text-3xl sm:text-5xl md:text-6xl font-light font-serif uppercase tracking-[0.03em] max-w-4xl leading-tight">
        {heading}
      </h3>
    </motion.div>
  );
};

interface ExampleContentProps {
  heading: string;
  text1: string;
  text2: string;
  buttonHref: string;
  onButtonClick?: () => void;
}

const ExampleContent = ({ 
  heading, 
  text1, 
  text2, 
  buttonHref,
  onButtonClick
}: ExampleContentProps) => (
  <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 px-6 pb-28 pt-16 md:grid-cols-12 text-white bg-black">
    <h3 className="col-span-1 text-2xl sm:text-3xl font-light font-serif tracking-tight text-white md:col-span-5 uppercase leading-tight select-none">
      {heading}
    </h3>
    <div className="col-span-1 md:col-span-7 space-y-6">
      <p className="text-base sm:text-lg text-neutral-300 font-light font-sans leading-relaxed">
        {text1}
      </p>
      <p className="text-sm sm:text-base text-neutral-400 font-serif font-light leading-relaxed italic border-l border-[#C8EB5F]/30 pl-4">
        {text2}
      </p>
      <div className="pt-2">
        <a 
          href={buttonHref}
          onClick={(e) => {
            if (onButtonClick) {
              e.preventDefault();
              onButtonClick();
            }
          }}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 hover:border-[#C8EB5F] bg-white/5 hover:bg-[#C8EB5F]/5 px-6 py-3 text-[10px] sm:text-[11px] tracking-widest text-[#eeeeee] hover:text-[#C8EB5F] transition-all font-mono uppercase cursor-pointer"
        >
          Secure Custom Spot <ArrowUpRight className="inline h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  </div>
);

// Interactive Program Layout with clip-path reveal animations on scroll
interface ProgramRowProps {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  reverse: boolean;
  onActionClick: () => void;
}

const ProgramRow = ({ id, title, description, imageUrl, reverse, onActionClick }: ProgramRowProps) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "center start"]
  });

  const opacityContent = useTransform(scrollYProgress, [0, 0.7], [0, 1]);
  const clipProgress = useTransform(scrollYProgress, [0, 0.7], ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]);
  const translateContent = useTransform(scrollYProgress, [0, 1], [-50, 0]);

  return (
    <div 
      ref={targetRef} 
      className={cn(
        "min-h-[70vh] py-20 flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 max-w-6xl mx-auto px-6 border-b border-white/5",
        reverse ? "md:flex-row-reverse" : ""
      )}
    >
      {/* Text Details Content */}
      <motion.div 
        style={{ y: translateContent }}
        className="flex-1 space-y-6 text-left"
      >
        <div className="inline-flex items-center gap-1.5 font-mono text-[9px] tracking-[0.2em] text-[#C8EB5F] uppercase">
          <span className="h-1.5 w-1.5 rounded-full bg-[#C8EB5F]" />
          PROGRAM 0{id}
        </div>
        <h3 className="text-3xl sm:text-5xl font-light font-serif text-white uppercase tracking-tight leading-none">
          {title}
        </h3>
        <p className="text-neutral-400 font-sans text-xs sm:text-sm font-light leading-relaxed max-w-md">
          {description}
        </p>
        <div className="pt-2">
          <button
            onClick={onActionClick}
            className="group inline-flex items-center gap-1.5 font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-[#eeeeee] hover:text-[#C8EB5F] transition-colors cursor-pointer"
          >
            Inquire Program Details <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </motion.div>
      
      {/* Clip-Path Animated Image */}
      <div className="flex-1 w-full flex justify-center relative">
        <motion.div 
          style={{ 
            opacity: opacityContent,
            clipPath: clipProgress,
          }}
          className="relative group w-full max-w-md aspect-[4/3] rounded-[32px] overflow-hidden border border-white/10"
        >
          <Image 
            src={imageUrl} 
            className="w-full h-full object-cover filter grayscale contrast-125 brightness-[80%] hover:grayscale-0 hover:scale-105 transition-all duration-[1.2s] ease-out" 
            alt={title}
            fill
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </div>
    </div>
  );
};

interface FAQCategory {
  id: string | number;
  title: string;
  subtitle?: string;
  featured?: boolean;
}

const FAQSection = ({ onActionClick }: { onActionClick: () => void }) => {
  const [hoveredItem, setHoveredItem] = useState<string | number | null>(null);

  const categories: FAQCategory[] = [
    {
      id: "faq-1",
      title: "Are classes available for students across Europe?",
      subtitle: "Yes. Flexible schedules are available for students in multiple European countries.",
      featured: true,
    },
    {
      id: "faq-2",
      title: "Can beginners join these classes?",
      subtitle: "Yes. Beginner-friendly Quran learning programs are available.",
      featured: false,
    },
    {
      id: "faq-3",
      title: "Is there a free trial class?",
      subtitle: "Yes. Students can book a free trial before enrollment.",
      featured: false,
    }
  ];

  return (
    <section className="w-full bg-black text-white py-24 px-6 border-b border-white/5 relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[8px] sm:text-[9px] uppercase tracking-[0.25em] text-[#C8EB5F] font-mono">
            <span className="h-1.5 w-1.5 rounded-full bg-[#C8EB5F] animate-pulse" />
            KNOWLEDGE RETRIEVAL
          </div>
          <h2 className="text-3xl sm:text-5xl font-light font-serif tracking-tight text-white uppercase leading-tight select-none">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 font-light max-w-xl mx-auto font-sans leading-relaxed">
            Essential guidelines for prospective European students wishing to engage our virtual academy.
          </p>
        </div>

        {/* Categories List */}
        <div className="space-y-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className="relative group h-auto"
              onMouseEnter={() => setHoveredItem(category.id)}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={onActionClick}
            >
              <div
                className={cn(
                  "relative overflow-hidden border bg-zinc-950/20 transition-all duration-300 ease-in-out cursor-pointer rounded-2xl flex flex-col justify-center",
                  // Hover state styles
                  hoveredItem === category.id
                    ? 'min-h-[128px] border-[#C8EB5F]/50 shadow-xl shadow-[#C8EB5F]/5 bg-[#C8EB5F]/5 py-6'
                    : 'min-h-[96px] border-white/5 hover:border-white/20 py-4'
                )}
              >
                {/* Corner brackets that appear on hover */}
                {hoveredItem === category.id && (
                  <>
                    <div className="absolute top-4 left-4 w-6 h-6">
                      <div className="absolute top-0 left-0 w-4 h-[2px] bg-[#C8EB5F]" />
                      <div className="absolute top-0 left-0 w-[2px] h-4 bg-[#C8EB5F]" />
                    </div>
                    <div className="absolute bottom-4 right-4 w-6 h-6">
                      <div className="absolute bottom-0 right-0 w-4 h-[2px] bg-[#C8EB5F]" />
                      <div className="absolute bottom-0 right-0 w-[2px] h-4 bg-[#C8EB5F]" />
                    </div>
                  </>
                )}

                {/* Content */}
                <div className="flex items-center justify-between h-full px-6 md:px-10">
                  <div className="flex-1 text-left space-y-1.5">
                    <h3
                      className={cn(
                        "font-serif font-light transition-colors duration-300 tracking-tight leading-snug",
                        category.featured ? 'text-lg sm:text-xl md:text-2xl' : 'text-base sm:text-lg md:text-xl',
                        hoveredItem === category.id ? 'text-[#C8EB5F]' : 'text-white'
                      )}
                    >
                      {category.title}
                    </h3>
                    {category.subtitle && (
                      <p
                        className={cn(
                          "transition-colors duration-300 text-xs sm:text-sm leading-relaxed",
                           hoveredItem === category.id ? 'text-neutral-200' : 'text-neutral-400'
                        )}
                      >
                        {category.subtitle}
                      </p>
                    )}
                  </div>

                  {/* Icon appears on the right on hover */}
                  {hoveredItem === category.id && (
                    <div className="text-[#C8EB5F] opacity-0 group-hover:opacity-100 transition-all duration-300 pl-4">
                      <ArrowUpRight className="h-5 w-5" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
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

  React.useEffect(() => {
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
          "flex shrink-0 flex-col animate-marquee-vertical-custom",
          reverse && "[animation-direction:reverse]",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
      >
        {children}
      </div>
      <div
        className={cn(
          "flex shrink-0 flex-col animate-marquee-vertical-custom",
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
  "Germany",
  "France",
  "Spain",
  "Belgium",
  "Netherlands",
  "Norway",
  "Sweden",
  "Switzerland",
  "United Kingdom",
  "Italy",
];

const CTAWithVerticalMarquee = ({ onActionClick }: { onActionClick: () => void }) => {
  const marqueeRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
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
    <section className="min-h-[80vh] bg-black text-white flex items-center justify-center px-6 py-24 overflow-hidden border-b border-white/5 relative z-10 w-full">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee-vertical {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        .animate-marquee-vertical-custom {
          animation: marquee-vertical var(--duration, 25s) linear infinite;
        }
      `}} />
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Left Content */}
          <div className="space-y-8 max-w-xl text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#C8EB5F]/20 bg-[#C8EB5F]/5 px-4 py-1.5 text-[8px] sm:text-[9px] uppercase tracking-[0.25em] text-[#C8EB5F] font-mono">
              <span className="h-1.5 w-1.5 rounded-full bg-[#C8EB5F] animate-pulse" />
              JOIN THE ACADEMY
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-light font-serif tracking-tight text-white uppercase leading-none">
              Start Learning Quran Online in Europe
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed font-sans max-w-lg font-sans">
              Join structured online Quran learning designed for Muslim students and families across Europe.
            </p>
            <div className="pt-4">
              <button 
                onClick={onActionClick}
                className="group relative px-8 py-4 bg-[#C8EB5F] text-black font-mono text-[11px] font-bold uppercase tracking-widest rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:bg-white hover:shadow-lg hover:shadow-[#C8EB5F]/10 cursor-pointer"
              >
                <span className="relative z-10">Book Your Free Trial</span>
              </button>
            </div>
          </div>

          {/* Right Marquee */}
          <div ref={marqueeRef} className="relative h-[480px] lg:h-[550px] flex items-center justify-center">
            <div className="relative w-full h-full border border-white/5 bg-zinc-950/20 rounded-[32px] overflow-hidden px-8 flex items-center justify-center">
              <VerticalMarquee speed={22} className="h-full w-full">
                {marqueeItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-light font-serif tracking-tight py-6 text-center text-neutral-300 hover:text-[#C8EB5F] transition-colors duration-300 select-none marquee-item"
                  >
                    {item}
                  </div>
                ))}
              </VerticalMarquee>
              
              {/* Top vignette */}
              <div className="pointer-events-none absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black via-black/40 to-transparent z-10"></div>
              
              {/* Bottom vignette */}
              <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-black/40 to-transparent z-10"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default function QuranEuropePage() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingType, setBookingType] = useState<"trial" | "demo">("trial");
  const [formSubmitted, setFormSubmitted] = useState(false);

  // States for interactive time-zone conversions
  const [selectedZone, setSelectedZone] = useState<'CET' | 'CEST' | 'EET' | 'WET'>('CET');

  const zoneTimings = {
    CET: {
      name: "Central European Time (CET) - e.g. France, Germany, Spain",
      kidsSlot: "4:00 PM - 7:30 PM",
      adultSlot: "8:00 PM - 10:30 PM",
      morningSlot: "7:00 AM - 10:00 AM"
    },
    CEST: {
      name: "Central European Summer Time (CEST) - Summer schedules",
      kidsSlot: "4:00 PM - 8:00 PM",
      adultSlot: "8:00 PM - 11:30 PM",
      morningSlot: "7:00 AM - 10:00 AM"
    },
    EET: {
      name: "Eastern European Time (EET) - e.g. Greece, Romania, Finland",
      kidsSlot: "5:00 PM - 8:30 PM",
      adultSlot: "9:00 PM - 11:30 PM",
      morningSlot: "8:00 AM - 11:00 AM"
    },
    WET: {
      name: "Western European Time (WET) - e.g. Portugal",
      kidsSlot: "3:00 PM - 6:30 PM",
      adultSlot: "7:00 PM - 9:30 PM",
      morningSlot: "6:00 AM - 9:00 AM"
    }
  };

  return (
    <main className="min-h-screen bg-black text-white font-sans selection:bg-[#C8EB5F] selection:text-black">
      
      {/* Universal Luxury Navigation Header - Identical on all pages */}
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
                  <Link href="/quran-classes-in-uk" className="block px-4 py-3 text-[10px] tracking-wider font-mono text-neutral-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
                    Quran Classes in UK
                  </Link>
                  <div className="h-px bg-white/5 my-1" />
                  <Link href="/quran-in-the-world/quran-classes-in-europe" className="block px-4 py-3 text-[10px] tracking-wider font-mono text-[#C8EB5F] hover:text-white hover:bg-[#C8EB5F]/5 rounded-xl transition-colors font-semibold">
                    Quran Classes in Europe ✦
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
            <button 
              onClick={() => {
                setBookingType("trial");
                setBookingOpen(true);
              }}
              className="hidden sm:inline-block bg-[#C8EB5F] text-black hover:bg-white text-[11px] font-mono font-bold tracking-widest px-5 py-2.5 rounded-full uppercase transition-colors duration-300 font-semibold cursor-pointer"
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
              className="text-lg tracking-widest uppercase text-white hover:text-[#C8EB5F] transition-colors font-serif font-light"
              onClick={() => setMobileMenuOpen(false)}
            >
              Quran Classes in UK
            </Link>
            <Link 
              href="/quran-in-the-world/quran-classes-in-europe" 
              className="text-lg tracking-widest uppercase text-[#C8EB5F] hover:text-[#C8EB5F] transition-colors font-serif font-semibold"
              onClick={() => setMobileMenuOpen(false)}
            >
              Quran Classes in Europe ✦
            </Link>
            <Link 
              href="/quran-in-the-world" 
              className="text-lg tracking-widest uppercase text-white hover:text-[#C8EB5F] transition-colors font-serif font-light"
              onClick={() => setMobileMenuOpen(false)}
            >
              All Global Timings
            </Link>

            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                setBookingType("trial");
                setBookingOpen(true);
              }}
              className="bg-[#C8EB5F] text-black text-xs font-bold font-mono tracking-widest uppercase px-8 py-3.5 rounded-full mt-4"
            >
              FREE TRIAL CLASS
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section using user-requested prompt structure */}
      <div className="pt-[76px]">
        <HeroSection 
          logo={{
            url: "https://i.postimg.cc/pVgdcr5d/pexels-ali-jafar-851025332-36904562.jpg",
            alt: "TajweedPage Logo Icon",
            text: "TajweedPage Europe"
          }}
          slogan="SCHOLARLY METROPOLITAN ACADEMY"
          title={<>Online Quran Classes Europe <br /><span className="text-[#C8EB5F]">Interactive Quran Learning</span> for European Students</>}
          subtitle="Professional online Quran lessons designed for Muslim families and students living across Europe with flexible scheduling and personalized learning."
          callToAction={{
            text: "Book Your Free Trial ✦",
            href: "#booking-box"
          }}
          backgroundImage="https://i.postimg.cc/ZRdBMkB1/pexels-timur-weber-9127617.jpg"
          contactInfo={{
            website: "tajweedpage.com",
            phone: "+44 7946 0958",
            address: "EU Global Hub Coordination"
          }}
          onActionClick={() => {
            setBookingType("trial");
            setBookingOpen(true);
          }}
        />
      </div>

      <PremiumMarquee 
        items={[
          "Online Quran Classes Europe",
          "Professional European Quran Tutor Accompaniment",
          "100% Live One-On-One Adaptive Sessions",
          "Flexible Paris, Berlin, & Amsterdam CET/CEST Timings",
          "Certified Native Arab Scholar Tutors",
          "Comprehensive Islamic Studies curriculum Europe"
        ]}
        speed="80s"
        variant="brand"
      />
      <section className="py-24 px-6 bg-black border-b border-white/5 relative overflow-hidden text-center flex flex-col items-center justify-center">
        {/* Subtle bottom glowing line/layer as seen in the screenshot */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-[#C8EB5F]/20 to-transparent pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#C8EB5F]/20 bg-[#C8EB5F]/5 px-4 py-1.5 text-[8px] sm:text-[9px] uppercase tracking-[0.25em] text-[#C8EB5F] font-mono">
            <span className="h-1.5 w-1.5 rounded-full bg-[#C8EB5F] animate-pulse" />
            ACADEMIC EXECUTIVE SUMMARY
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-light font-serif tracking-[0.05em] text-white uppercase select-none">
            SUMMARY
          </h2>
          
          <p className="text-lg sm:text-xl text-neutral-300 font-serif font-light leading-relaxed italic max-w-3xl mx-auto">
            This page explains how TajweedPage.com helps students in Europe learn the Quran online through personalized classes, flexible schedules, and professional Quran teaching.
          </p>
          
          <div className="pt-6 max-w-2xl mx-auto">
            <p className="text-xs sm:text-sm text-neutral-500 font-serif tracking-wide leading-relaxed">
              Curated one-on-one session planners correspond directly with Paris, Berlin, Brussels, and Rome timezone adjustments for seamless family schedules.
            </p>
          </div>
        </div>
      </section>

      {/* Why European Students Choose TajweedPage.com - Custom Scroll Parallax Section */}
      <section className="bg-black text-white relative overflow-hidden">
        <div className="py-24 text-center max-w-4xl mx-auto px-6 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[8px] sm:text-[9px] uppercase tracking-[0.25em] text-[#C8EB5F] font-mono">
            <span className="h-1.5 w-1.5 rounded-full bg-[#C8EB5F]" />
            DISTINGUISHED ADVANTAGES
          </div>
          <h2 className="text-3xl sm:text-5xl font-light font-serif tracking-tight text-white uppercase leading-tight select-none">
            Why European Students Choose <span className="text-[#C8EB5F]">TajweedPage.com</span>
          </h2>
        </div>

        <TextParallaxContent
          imgUrl="https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&q=80&w=1600"
          subheading="Flexible European Scheduling"
          heading="Class timings suitable for students across Europe."
        >
          <ExampleContent 
            heading="Dynamic Custom Timetables"
            text1="We understand the diverse responsibilities of European households. Our academy provides bespoke one-on-one session schedules that slip effortlessly into your academic, work, or domestic daily routines."
            text2="Whether you reside in Berlin, Paris, Madrid, or Rome, we synchronize your lessons perfectly across standard European timezones with easy weekend or late-evening options."
            buttonHref="#booking"
            onButtonClick={() => {
              setBookingType("trial");
              setBookingOpen(true);
            }}
          />
        </TextParallaxContent>

        <TextParallaxContent
          imgUrl="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=1600"
          subheading="Personalized Quran Education"
          heading="One-on-one lessons focused on Quran reading improvement."
        >
          <ExampleContent 
            heading="Bespoke Individual Curriculums"
            text1="We move away from rigid, cookie-cutter class formats. Every student receives a custom study blueprint following a master diagnostic assessment session on day one."
            text2="Our customized roadmap focuses directly on correcting personal weaknesses, mastering Tajweed principles, and elevating phonetic flow at a pacing that fits your style perfectly."
            buttonHref="#booking"
            onButtonClick={() => {
              setBookingType("trial");
              setBookingOpen(true);
            }}
          />
        </TextParallaxContent>

        <TextParallaxContent
          imgUrl="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=1600"
          subheading="Experienced Quran Tutors"
          heading="Qualified teachers experienced in teaching international students."
        >
          <ExampleContent 
            heading="Handpicked Certified Scholars"
            text1="All our teachers are elite, highly educated linguists and certified Quran master-scholars. They possess deep experience navigating the cultural and linguistic accents of western students."
            text2="With thousands of hours of online teaching, they apply patience and precise pedagogical strategies to make learning engaging and highly rewarding for children and adults alike."
            buttonHref="#booking"
            onButtonClick={() => {
              setBookingType("trial");
              setBookingOpen(true);
            }}
          />
        </TextParallaxContent>

        <TextParallaxContent
          imgUrl="https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&q=80&w=1600"
          subheading="Interactive Online Learning"
          heading="Live Quran sessions with pronunciation correction and guided recitation."
        >
          <ExampleContent 
            heading="Immersive Real-Time Recital Feedback"
            text1="Experience cutting-edge digital learning. Our virtual classroom suites enable real-time high-fidelity screen-shares, digital whiteboard highlights, and crystal-clear pronunciation analysis."
            text2="Your recitation flow is corrected syllable-by-syllable, providing rapid visual and verbal learning loops that simulate having a master teacher right by your side."
            buttonHref="#booking"
            onButtonClick={() => {
              setBookingType("trial");
              setBookingOpen(true);
            }}
          />
        </TextParallaxContent>
      </section>

      {/* Programs Available for European Students - Custom Parallax Scroll Section */}
      <section className="bg-black text-white relative overflow-hidden border-b border-white/5">
        {/* Section Header */}
        <div className="py-24 text-center max-w-4xl mx-auto px-6 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#C8EB5F]/20 bg-[#C8EB5F]/5 px-4 py-1.5 text-[8px] sm:text-[9px] uppercase tracking-[0.25em] text-[#C8EB5F] font-mono">
            <span className="h-1.5 w-1.5 rounded-full bg-[#C8EB5F]" />
            ACADEMIC DEPLOYMENTS
          </div>
          <h2 className="text-3xl sm:text-5xl font-light font-serif tracking-tight text-white uppercase leading-tight select-none">
            Programs Available for European Students
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 font-light max-w-xl mx-auto font-sans leading-relaxed">
            Carefully curated paths designed to build sound phonetic precision, deep foundational understanding, and memorization support.
          </p>
        </div>

        {/* Program Rows with scroll interactive parallax reveal */}
        <ProgramRow 
          id={1}
          title="Quran Reading"
          description="Build absolute reading fluency and fluid vocalization. Learn appropriate letter linkages, syllable structures, and pause protocols directly under the mentorship of certified teachers."
          imageUrl="https://i.postimg.cc/ZRtK0Wnw/pexels-indraprojectsofficial-33070993.jpg"
          reverse={false}
          onActionClick={() => {
            setBookingType("trial");
            setBookingOpen(true);
          }}
        />

        <ProgramRow 
          id={2}
          title="Tajweed Lessons"
          description="Master pronunciation mechanics (Makhārij) and attributes of classic Arabic phonology (Sifāt). Recite the Holy Quran with precise phonetic depth and spiritual elegance."
          imageUrl="https://i.postimg.cc/dtxFLhSh/pexels-jahratreza-36188877.jpg"
          reverse={true}
          onActionClick={() => {
            setBookingType("trial");
            setBookingOpen(true);
          }}
        />

        <ProgramRow 
          id={3}
          title="Noorani Qaida"
          description="The essential foundation course ideal for children and absolute beginners. Learn alphabet phonetics, vowel markings (Harakat), and starting reading rules through a tested step-by-step model."
          imageUrl="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=1200"
          reverse={false}
          onActionClick={() => {
            setBookingType("trial");
            setBookingOpen(true);
          }}
        />

        <ProgramRow 
          id={4}
          title="Hifz Support"
          description="Bespoke memorization pathways with detailed revision logs. Learn proven cognitive memorization routines, pacing plans, and build absolute recall with your dedicated scholar guide."
          imageUrl="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=1200"
          reverse={true}
          onActionClick={() => {
            setBookingType("trial");
            setBookingOpen(true);
          }}
        />

        <ProgramRow 
          id={5}
          title="Islamic Studies"
          description="An immersive theoretical companion syllabus covering essential Aqeedah, the Fiqh of daily devotionals, foundational Prophetic Seerah accounts, and character-building standards."
          imageUrl="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=1200"
          reverse={false}
          onActionClick={() => {
            setBookingType("trial");
            setBookingOpen(true);
          }}
        />
      </section>

      {/* Frequently Asked Questions */}
      <FAQSection 
        onActionClick={() => {
          setBookingType("trial");
          setBookingOpen(true);
        }}
      />

      {/* Start Learning Quran Online in Europe - Marquee Section */}
      <CTAWithVerticalMarquee 
        onActionClick={() => {
          setBookingType("trial");
          setBookingOpen(true);
        }}
      />

      <PremiumMarquee 
        items={[
          "Premier European Online Quran Academy",
          "Quran Learning Online For Kids & Adults",
          "Experienced Female Quran Tutors Online Support",
          "Zero-Judgment Multi-Lingual Classrooms",
          "Reserve Your Complimentary Europe Trial Class"
        ]}
        speed="100s"
        variant="subtle"
      />

      {/* Elegant Footer block - Identical on all pages */}
      

      {/* INTERACTIVE COMPLIMENTARY MODAL POPUP */}
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
                    Success! A representative dynamic coordinator situated inside European/London zones will contact you over WhatsApp/Email within 2 hours to confirm details & lock in a custom scheduled slot.
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
                      <option>Morning Slots (6:00 AM - 11:00 AM CET)</option>
                      <option>Afternoon Slots (12:00 PM - 4:00 PM CET)</option>
                      <option>Evening Slots (5:00 PM - 10:00 PM CET)</option>
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
