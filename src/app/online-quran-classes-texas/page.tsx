"use client";

import React, { useState, useRef, useEffect } from "react";
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
    
    // Animation variants
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
            {/* Top Section */}
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
                              className="mr-3 h-10 w-10 rounded-xl object-cover filter brightness-110" 
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
                        "CST Dynamic Slots (Texas Friendly)",
                        "Personalized Repetition Logs",
                        "Al-Azhar English-Speaking Mentors",
                        "Memorization Pacing Plans",
                        "Complimentary Trial Class Pass"
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
                        <button 
                          onClick={() => {
                            const form = document.getElementById("booking-modal-trigger");
                            if (form) form.click();
                          }}
                          className="inline-flex items-center justify-center text-xs tracking-[0.2em] uppercase font-mono bg-[#C8EB5F] hover:bg-white text-black font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-[0_4px_30px_rgba(200,235,95,0.22)] cursor-pointer"
                        >
                            {callToAction.text}
                        </button>
                    </motion.div>
                </motion.main>
            </div>

            {/* Bottom Section */}
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

        {/* Right Side: Image with Clip Path */}
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
  onCtaClick?: () => void;
}

const ExampleContent = ({ title, desc, ctaText, ctaHref, onCtaClick }: ExampleContentProps) => (
  <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 pb-32 pt-16 md:grid-cols-12 bg-black border-y border-white/5 my-4">
    <div className="col-span-1 md:col-span-5 flex flex-col justify-center">
      <h4 className="text-[10px] tracking-[0.3em] font-mono text-[#C8EB5F] uppercase mb-4">
        ACADEMIC QUALITY
      </h4>
      <h3 className="text-2xl sm:text-3xl font-serif font-light text-white leading-tight uppercase">
        {title}
      </h3>
      <div className="h-px w-16 bg-[#C8EB5F]/40 mt-6" />
    </div>
    <div className="col-span-1 md:col-span-7 flex flex-col justify-center">
      <p className="mb-8 text-sm text-neutral-400 font-light leading-relaxed font-sans max-w-2xl">
        {desc}
      </p>
      {onCtaClick ? (
        <button 
          onClick={onCtaClick}
          className="group inline-flex items-center gap-2 w-fit rounded-full border border-white/10 bg-white/5 px-8 py-3.5 text-xs font-mono tracking-widest text-white uppercase transition-all hover:bg-[#C8EB5F] hover:text-black hover:border-[#C8EB5F] cursor-pointer"
        >
          <span>{ctaText}</span>
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </button>
      ) : (
        <Link 
          href={ctaHref}
          className="group inline-flex items-center gap-2 w-fit rounded-full border border-white/10 bg-white/5 px-8 py-3.5 text-xs font-mono tracking-widest text-white uppercase transition-all hover:bg-[#C8EB5F] hover:text-black hover:border-[#C8EB5F]"
        >
          <span>{ctaText}</span>
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </Link>
      )}
    </div>
  </div>
);

const pgSections = [
  {
    id: 1,
    title: "Houston Quran Memorization Classes",
    description: "Highly systematic retention workflows for Hifz. We incorporate structural revision routines to ensure proper long-term memory hold and flawless retention.",
    imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=600&auto=format&fit=crop",
    reverse: false
  },
  {
    id: 2,
    title: "Dallas Online Tajweed Studies",
    description: "Master heavy and light articulation notes, makharij origins, and classical recitation styles under Al-Azhar approved scholars.",
    imageUrl: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?q=80&w=600&auto=format&fit=crop",
    reverse: true
  },
  {
    id: 3,
    title: "Interactive Noorani Qaida for Plano beginners",
    description: "Slow, step-by-step reading modules crafted specifically for Texan homeschooled children to master Arabic phonics effortlessly.",
    imageUrl: "https://i.postimg.cc/rz6XXmVC/pexels-bernahanim-1173268160-31293058.jpg",
    reverse: false
  }
];

const ProgramItem = ({ section, onInquire }: { section: typeof pgSections[0]; onInquire: () => void }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center start"]
  });

  const opacityContent = useTransform(scrollYProgress, [0, 0.7], [0, 1]);
  const clipProgress = useTransform(scrollYProgress, [0, 0.7], ["inset(0% 100% 0% 0%)", "inset(0% 0% 0% 0%)"]);
  
  const translateContent1 = useTransform(scrollYProgress, [0, 1], [-80, 0]);
  const translateContent2 = useTransform(scrollYProgress, [0, 1], [-40, 0]);
  
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
        <h3 className="text-3xl md:text-4xl font-serif font-light text-white tracking-tight leading-tight uppercase">
          {section.title}
        </h3>
        <motion.p 
          style={{ y: translateContent2 }} 
          className="text-neutral-400 font-sans font-light text-xs sm:text-sm mt-8 leading-relaxed"
        >
          {section.description}
        </motion.p>
        <div className="mt-8">
          <button
            onClick={onInquire}
            className="group inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#C8EB5F] uppercase hover:underline cursor-pointer bg-transparent border-none"
          >
            <span>LEARN MORE</span>
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 text-[#C8EB5F]" />
          </button>
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
        <div className="text-center mb-16">
          {headerIcon && (
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#C8EB5F]/10 border border-[#C8EB5F]/20 mb-6 text-[#C8EB5F]">
              {headerIcon}
            </div>
          )}
          <p className="text-[10px] tracking-[0.4em] font-mono text-[#C8EB5F] uppercase mb-4">RELIABLE ASSURANCES</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-white tracking-tight uppercase leading-tight max-w-2xl mx-auto">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-4 text-xs font-mono tracking-widest uppercase text-neutral-500">{subtitle}</p>
          )}
          <div className="h-px w-24 bg-[#C8EB5F]/40 mx-auto mt-8" />
        </div>

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
                  hoveredItem === category.id
                    ? 'min-h-[8rem] sm:h-32 border-[#C8EB5F] shadow-lg shadow-[#C8EB5F]/10 bg-zinc-900/80'
                    : 'min-h-[6rem] sm:h-24 border-white/5 hover:border-[#C8EB5F]/30 bg-zinc-950/40'
                )}
              >
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

                <div className="flex items-center justify-between h-full px-6 md:px-8 py-4 sm:py-0">
                  <div className="flex-1">
                    <h3
                      className={cn(
                        "font-serif font-light uppercase tracking-wide transition-colors duration-300",
                        category.featured ? 'text-lg sm:text-xl md:text-2xl' : 'text-base sm:text-lg md:text-xl',
                        hoveredItem === category.id ? 'text-[#C8EB5F]' : 'text-white'
                      )}
                    >
                      {category.title}
                    </h3>
                    {category.subtitle && (
                      <p
                        className={cn(
                          "mt-2 transition-colors duration-300 text-xs font-light font-sans",
                           hoveredItem === category.id ? 'text-neutral-300' : 'text-neutral-500'
                        )}
                      >
                        {category.subtitle}
                      </p>
                    )}
                  </div>

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
}

function VerticalMarquee({
  children,
  pauseOnHover = false,
  reverse = false,
  className,
  speed = 30,
}: VerticalMarqueeProps) {
  return (
    <div
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

const CTAWithVerticalMarquee = ({ onInquire }: { onInquire: () => void }) => {
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
      <div className="absolute top-1/2 left-[80%] -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#C8EB5F]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="w-full max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Content */}
          <div className="space-y-10 max-w-xl">
            <p className="text-[10px] tracking-[0.4em] font-mono text-[#C8EB5F] uppercase">EXECUTIVE ENROLLMENT</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light leading-tight tracking-tight text-white uppercase">
              Start Learning Quran <br />Online in <span className="italic text-[#C8EB5F]">Texas</span>
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 font-sans font-light leading-relaxed max-w-sm">
              Join personalized Quran lessons designed specifically for Muslim families and dedicated students living in Texas and surrounding regions. Experience 1-on-1 tutoring dynamic crafted for US lifestyles.
            </p>
            <div className="pt-4 flex flex-wrap gap-6">
              <button 
                onClick={onInquire}
                className="group inline-flex items-center justify-center text-xs tracking-widest font-mono bg-[#C8EB5F] hover:bg-white text-black font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-[0_4px_30px_rgba(200,235,95,0.15)] uppercase cursor-pointer"
              >
                <span>Book Your Free Trial</span>
                <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </button>
            </div>
          </div>

          {/* Right Marquee */}
          <div ref={marqueeRef} className="relative h-[550px] lg:h-[650px] flex items-center justify-center">
            <div className="relative w-full h-full border-l border-white/5 pl-8 md:pl-16">
              <VerticalMarquee speed={22} className="h-full">
                {marqueeItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="text-2xl sm:text-3xl lg:text-4xl font-serif font-light tracking-wide py-8 marquee-item text-neutral-500 uppercase transition-opacity duration-300"
                  >
                    ✦ {item}
                  </div>
                ))}
              </VerticalMarquee>
              
              <div className="pointer-events-none absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black via-black/40 to-transparent z-10"></div>
              <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black via-black/40 to-transparent z-10"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function OnlineQuranClassesTexasPage() {
  const [courseDropdownOpen, setCourseDropdownOpen] = useState(false);
  const [wordDropdownOpen, setWordDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [usaSubpagesOpen, setUsaSubpagesOpen] = useState(false);
  
  // Modal State
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingType, setBookingType] = useState<"trial" | "demo">("trial");
  const [formSubmitted, setFormSubmitted] = useState(false);

  return (
    <main className="min-h-screen bg-black text-white font-sans selection:bg-[#C8EB5F] selection:text-black font-light">
      
      <button 
        id="booking-modal-trigger" 
        className="hidden" 
        onClick={() => {
          setBookingType("trial");
          setBookingOpen(true);
        }}
      />

      {/* Luxury Navigation Header */}
      <NavigationHeader onTrialClick={() => { setBookingType("trial"); setBookingOpen(true); }} />
      <header className="hidden fixed top-0 left-0 w-full z-50 h-[76px] flex items-center justify-between px-6 md:px-12 bg-black/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl w-full mx-auto flex items-center justify-between">
          
          <Link href="/" className="group flex items-center gap-3">
            <div className="flex flex-col gap-[3px] text-[#C8EB5F] group-hover:scale-105 transition-transform duration-300">
              <div className="w-8 h-[2.5px] bg-current rounded-sm" />
              <div className="w-8 h-[2.5px] bg-current rounded-sm" />
              <div className="w-5 h-[2.5px] bg-current rounded-sm" />
              <div className="w-8 h-[2.5px] bg-current rounded-sm" />
            </div>
            <span className="font-serif tracking-[0.25em] font-bold text-white group-hover:text-[#C8EB5F] transition-colors text-xs uppercase sm:text-sm">
              TAJWEEDPAGE
            </span>
          </Link>

          {/* Nav menu */}
          <nav className="hidden md:flex items-center gap-8 text-[11px] font-mono tracking-widest text-[#eeeeee]">
            
            {/* Courses Dropdown */}
            <div 
              className="relative group py-2"
              onMouseEnter={() => setCourseDropdownOpen(true)}
              onMouseLeave={() => setCourseDropdownOpen(false)}
            >
              <button className="flex items-center gap-1 hover:text-[#C8EB5F] transition-colors duration-300 outline-none cursor-pointer">
                <span className="text-white hover:text-[#C8EB5F] font-bold uppercase tracking-widest">COURSES</span>
                <ChevronDown size={11} className={cn("transition-transform duration-300 text-[#C8EB5F]", courseDropdownOpen ? "rotate-180" : "")} />
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
                  <div className="h-px bg-white/5 my-1" />
                  <Link href="/courses/islamic-studies-classes-for-kids" className="block px-4 py-2.5 text-[10px] tracking-wider font-mono text-neutral-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
                    Islamic Studies for Kids
                  </Link>
                  <div className="h-px bg-white/5 my-1" />
                  <Link href="/courses/beginner-quran-classes-online" className="block px-4 py-2.5 text-[10px] tracking-wider font-mono text-neutral-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-bold">
                    Beginner Quran Classes
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
                      <Link href="/online-quran-classes-california" className="block px-3 py-1.5 text-[9px] tracking-wider font-mono text-neutral-400 hover:text-[#C8EB5F] hover:bg-white/5 rounded-lg transition-colors font-light">
                        • California
                      </Link>
                      <Link href="/online-quran-classes-chicago" className="block px-3 py-1.5 text-[9px] tracking-wider font-mono text-neutral-400 hover:text-[#C8EB5F] hover:bg-white/5 rounded-lg transition-colors font-light">
                        • Chicago
                      </Link>
                      <Link href="/online-quran-classes-new-york" className="block px-3 py-1.5 text-[9px] tracking-wider font-mono text-neutral-400 hover:text-[#C8EB5F] hover:bg-white/5 rounded-lg transition-colors font-light">
                        • New York
                      </Link>
                      <Link href="/online-quran-classes-texas" className="block px-3 py-1.5 text-[9px] tracking-wider font-mono text-[#C8EB5F] hover:text-[#C8EB5F] hover:bg-white/5 rounded-lg transition-colors font-semibold">
                        • Texas ✦
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
            <button 
              onClick={() => {
                setBookingType("trial");
                setBookingOpen(true);
              }}
              className="bg-[#C8EB5F] text-black hover:bg-white text-[11px] font-mono font-bold tracking-widest px-5 py-2.5 rounded-full uppercase transition-colors duration-300 cursor-pointer"
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

      {/* MOBILE DROP-DOWN MENU */}
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
              className="text-base tracking-widest uppercase text-[#aaaaaa] hover:text-white transition-colors font-serif font-light"
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
                  className="text-base tracking-widest uppercase text-[#C8EB5F] hover:text-white transition-colors font-serif font-medium"
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
                  <Link href="/online-quran-classes-chicago" className="text-xs uppercase tracking-wider text-neutral-400 hover:text-[#C8EB5F]" onClick={() => setMobileMenuOpen(false)}>• Chicago</Link>
                  <Link href="/online-quran-classes-new-york" className="text-xs uppercase tracking-wider text-neutral-400 hover:text-[#C8EB5F]" onClick={() => setMobileMenuOpen(false)}>• New York</Link>
                  <Link href="/online-quran-classes-texas" className="text-xs uppercase tracking-wider text-[#C8EB5F] font-bold" onClick={() => setMobileMenuOpen(false)}>• Texas ✦</Link>
                </div>
              )}
            </div>

            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                setBookingType("trial");
                setBookingOpen(true);
              }}
              className="bg-[#C8EB5F] text-black text-xs font-bold font-mono tracking-widest uppercase px-10 py-3.5 rounded-full mt-4 cursor-pointer flex-shrink-0"
            >
              FREE TRIAL CLASS
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="pt-[76px]">
        <HeroSection 
          logo={{
            url: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=150&auto=format&fit=crop",
            alt: "TajweedPage.com Texas",
            text: "TajweedPage TX"
          }}
          slogan="TEXAS SOUTHERN ACADEMICS"
          title={<>Online Quran Classes Texas <br /><span className="text-[#C8EB5F] italic">Structured Memorization</span> for Texan Homes</>}
          subtitle="Highly personalized live Quran & Tajweed study pathways catering dynamically to students in Houston, Dallas, Fort Worth, Austin, San Antonio, and Plano."
          callToAction={{
            text: "CLAIM FREE TEXAS PASS",
            href: "#"
          }}
          backgroundImage="https://i.postimg.cc/Vvf09fQX/pexels-anat-morad-275582206-34412865.jpg"
          contactInfo={{
            website: "tajweedpage.com/texas",
            phone: "+1 713 555 9811",
            address: "Houston, Texas, USA"
          }}
        />
      </div>

      {/* Dedicated Copy Block - Over 500 characters SEO Written */}
      <section className="py-24 relative overflow-hidden bg-zinc-950 border-y border-white/5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#C8EB5F]/5 rounded-full blur-[140px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center space-y-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[10px] uppercase tracking-[0.35em] text-[#C8EB5F] font-bold">
            <span className="h-1.5 w-1.5 rounded-full bg-[#C8EB5F] animate-pulse" />
            LONE STAR STATE TAJWEED ACADEMICS
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light font-serif tracking-tight text-white uppercase leading-tight max-w-2xl mx-auto">
            Centralized Reading Logs for Texan Communities
          </h2>

          <p className="text-base sm:text-lg text-neutral-300 font-serif font-light leading-relaxed max-w-3xl mx-auto italic">
            TajweedPage.com provides highly reputable **online quran classes in texas harris county** matching Central Standard Time (CST) offsets for perfect home alignment.
          </p>

          <p className="text-xs sm:text-sm text-neutral-400 font-sans font-light leading-relaxed max-w-2xl mx-auto">
            Our expert program focuses on niche keywords like *houston quran memorization*, *dallas online tajweed studies*, and *authentic quran learning in texas* to maximize visibility without standard folder cannibalization. We assist Texan pupils in forming fluent vocal rhythms using authentic models under native certification.
          </p>

          <div className="pt-6 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent max-w-md mx-auto" />
        </div>
      </section>

      {/* Why Students Choose Us */}
      <div className="bg-black pt-32 pb-16 text-center px-4">
        <p className="text-[10px] tracking-[0.4em] font-mono text-[#C8EB5F] uppercase mb-4">EXCLUSIVE ADVANTAGE</p>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-light text-white tracking-tight uppercase leading-none max-w-5xl mx-auto">
          Why Students in <span className="italic text-[#C8EB5F]">Texas</span> Choose Us
        </h2>
        <div className="h-px w-24 bg-[#C8EB5F]/40 mx-auto mt-8" />
      </div>

      <div className="bg-black">
        <TextParallaxContent
          imgUrl="https://images.unsplash.com/photo-1495364141860-b0d03eccd065?q=80&w=1600&auto=format&fit=crop"
          subheading="01 / CST SCHEDULING"
          heading="CST Centered Timetables (TX)"
        >
          <ExampleContent 
            title="Convenient Bookings Made for Texan Families"
            desc="Easily coordinate classes during weekend mornings or late evenings directly with certified tutors in our native interface. No manual timezone transformation required."
            ctaText="Request Dedicated TX Slot Coordinates"
            ctaHref="#"
            onCtaClick={() => setBookingOpen(true)}
          />
        </TextParallaxContent>

        <TextParallaxContent
          imgUrl="https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1600&auto=format&fit=crop"
          subheading="02 / RETENTION"
          heading="Certified Native Scholars"
        >
          <ExampleContent 
            title="Licensed Mentors with Perfect English Command"
            desc="Our handpicked male and female instructors are native Arabic reciters who understand the challenges of western schooling, giving kids motivational, easy feedback logs."
            ctaText="Meet Tutors and Claim Slot"
            ctaHref="#"
            onCtaClick={() => setBookingOpen(true)}
          />
        </TextParallaxContent>
      </div>

      {/* Programs Available for USA Students / Section reveal */}
      <div className="bg-black pt-32 pb-8 text-center px-4 border-t border-white/5">
        <p className="text-[10px] tracking-[0.4em] font-mono text-[#C8EB5F] uppercase mb-4">ACADEMIC PATHWAYS</p>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-light text-white tracking-tight uppercase leading-none max-w-5xl mx-auto">
          Programs Available for <span className="italic text-[#C8EB5F]">Texas</span> Families
        </h2>
        <p className="mt-8 flex items-center justify-center gap-2 text-zinc-500 text-xs font-mono tracking-widest uppercase">
          SCROLL TO EXPLORE <ArrowDown size={14} className="text-[#C8EB5F] animate-bounce" />
        </p>
        <div className="h-px w-24 bg-[#C8EB5F]/40 mx-auto mt-8" />
      </div>

      <div className="flex flex-col">
        {pgSections.map((section) => (
          <ProgramItem key={section.id} section={section} onInquire={() => setBookingOpen(true)} />
        ))}
      </div>

      {/* Vertical Marquee Component Block */}
      <CTAWithVerticalMarquee onInquire={() => setBookingOpen(true)} />

      {/* Frequently Asked Questions FAQ Section with bracket effect */}
      <CategoryList
        title="Frequently Asked Questions"
        subtitle="Texas Specific Policies"
        headerIcon={<HelpCircle className="h-8 w-8 text-[#C8EB5F]" />}
        categories={[
          {
            id: "tx-1",
            title: "Is there a custom Hifz pacing dashboard for tracking kids?",
            subtitle: "Yes, every Texan student receives dynamic monthly feedback logs indicating memorization depth, retention, and tajweed marks.",
            icon: <ArrowUpRight className="h-5 w-5" />,
          },
          {
            id: "tx-2",
            title: "Can siblings share a scheduled hour with one tutor?",
            subtitle: "We strongly demand individual 1-on-1 focus for pure phonetic correction. However, back-to-back 30-minute shifts are highly recommended.",
            icon: <ArrowUpRight className="h-5 w-5" />,
          },
          {
            id: "tx-3",
            title: "How are classes made interactive online?",
            subtitle: "We deploy cloud whiteboards, phonetic tracing charts, and highly optimized sound streams for perfect accent absorption.",
            icon: <ArrowUpRight className="h-5 w-5" />,
          }
        ]}
      />

      {/* Footer Block */}
      

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-4 items-end animate-none">
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
                  {bookingType === "trial" ? "COMPLIMENTARY PASS" : "DIAGNOSTIC DEMO CLASS"}
                </span>
                <h3 className="font-serif text-2xl uppercase text-white leading-none font-light">
                  {bookingType === "trial" ? "Claim Your Free Live Trial" : "Schedule Diagnostic Demo"}
                </h3>
                <p className="text-xs text-neutral-400 font-light font-sans">
                  Learn live, one-on-one over Zoom with an elite certified Texas tutor.
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
                    <label className="text-[10px] tracking-widest font-mono text-[#444] uppercase block mb-1.5">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. salim@gmail.com"
                      className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-xs text-[#fff] focus:outline-none focus:border-[#C8EB5F]"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] tracking-widest font-mono text-neutral-400 uppercase block mb-1.5">WhatsApp Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +1 (555) 420 9100"
                      className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-xs text-[#fff] focus:outline-none focus:border-[#C8EB5F]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#C8EB5F] p-4 text-black text-[11px] tracking-widest font-mono uppercase font-bold text-center mt-2 shadow-[0_4px_25px_rgba(200,235,95,0.15)] cursor-pointer"
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
