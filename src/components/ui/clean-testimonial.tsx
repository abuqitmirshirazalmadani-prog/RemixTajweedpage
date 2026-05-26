"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "motion/react";
import { Star } from "lucide-react";

interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
  stars: number;
}

const testimonials: TestimonialItem[] = [
  {
    quote: "“TajweedPage.com has completely changed the way my son learns Quran online. The teachers are patient, professional, and make every class interactive. His Tajweed and confidence improved within weeks.”",
    author: "Ayesha Khan",
    role: "Parent",
    company: "USA",
    avatar: "https://i.postimg.cc/Vk14Mj1k/pexels-zeynep-sude-emek-193601188-20785119.jpg",
    stars: 5,
  },
  {
    quote: "“We were searching for affordable online Quran classes with female tutors, and TajweedPage.com exceeded our expectations. The learning environment is respectful, organized, and perfect for kids.”",
    author: "Fatima Ali",
    role: "Parent",
    company: "UK",
    avatar: "https://i.postimg.cc/ZnpFvqMz/pexels-a-darmel-8164813.jpg",
    stars: 5,
  },
  {
    quote: "“My daughter struggled with Quran pronunciation before joining TajweedPage.com. The one-on-one attention and progress tracking helped her improve very quickly.”",
    author: "Usman Ahmed",
    role: "Parent",
    company: "Canada",
    avatar: "https://i.postimg.cc/QxqYf6fx/pexels-bhandari-law-and-partners-1470175070-26834972.jpg",
    stars: 5,
  },
  {
    quote: "“The teachers are highly qualified and explain Tajweed rules in a very simple and engaging way. I highly recommend TajweedPage.com for beginners and children.”",
    author: "Maryam Noor",
    role: "Student",
    company: "Australia",
    avatar: "https://i.postimg.cc/xjhLn9hY/pexels-dwi2793-34481751.jpg",
    stars: 5,
  },
  {
    quote: "“TajweedPage.com provides flexible timings that fit perfectly with our family schedule. The classes are professional, interactive, and very well managed.”",
    author: "Hassan Raza",
    role: "Parent",
    company: "UAE",
    avatar: "https://i.postimg.cc/jqPzXLMt/pexels-ai25studio-8044085.jpg",
    stars: 5,
  },
  {
    quote: "“I joined the Tajweed course as an adult beginner and was amazed by the supportive teaching style. The lessons are structured beautifully and easy to follow.”",
    author: "Sara Mahmood",
    role: "Student",
    company: "USA",
    avatar: "https://i.postimg.cc/bvw70X8h/pexels-rdne-7249250.jpg",
    stars: 5,
  }
];

function usePreloadImages(images: string[]) {
  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [images]);
}

function SplitText({ text }: { text: string }) {
  const words = text.split(" ");

  return (
    <span className="inline">
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.35,
            delay: i * 0.02,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

export function Testimonial() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  usePreloadImages(testimonials.map((t) => t.avatar));

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 180 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    },
    [mouseX, mouseY]
  );

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const currentTestimonial = testimonials[activeIndex];

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-3xl mx-auto py-24 px-8 sm:px-12 rounded-[40px] border border-white/5 bg-zinc-950/80 backdrop-blur-md overflow-hidden"
      style={{ cursor: isHovered ? "none" : "default" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleNext}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C8EB5F]/20 to-transparent" />
      <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-[#C8EB5F]/5 to-transparent pointer-events-none" />

      {/* Custom magnetic cursor */}
      <motion.div
        className="pointer-events-none absolute z-50 mix-blend-difference hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className="rounded-full bg-[#C8EB5F] flex items-center justify-center shadow-lg"
          animate={{
            width: isHovered ? 90 : 0,
            height: isHovered ? 90 : 0,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ type: "spring", damping: 20, stiffness: 220 }}
        >
          <motion.span
            className="text-black text-[10px] font-mono font-bold tracking-widest uppercase"
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ delay: 0.1 }}
          >
            NEXT
          </motion.span>
        </motion.div>
      </motion.div>

      {/* Floating index indicator */}
      <motion.div
        className="absolute top-10 right-8 sm:right-12 flex items-baseline gap-1 font-mono text-xs"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.span
          className="text-3xl font-serif text-[#C8EB5F] italic"
          key={activeIndex}
          initial={{ y: 8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.25 }}
        >
          {String(activeIndex + 1).padStart(2, "0")}
        </motion.span>
        <span className="text-neutral-600">/</span>
        <span className="text-neutral-500">{String(testimonials.length).padStart(2, "0")}</span>
      </motion.div>

      {/* Stacked avatar previews for other testimonials */}
      <motion.div
        className="absolute top-10 left-8 sm:left-12 flex -space-x-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ delay: 0.6 }}
      >
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            className={`w-7 h-7 rounded-full border-2 border-zinc-950 overflow-hidden cursor-pointer transition-all duration-300 ${
              i === activeIndex ? "ring-2 ring-[#C8EB5F]" : "grayscale opacity-40 hover:opacity-100 hover:grayscale-0"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              setActiveIndex(i);
            }}
            whileHover={{ scale: 1.15 }}
          >
            <img src={t.avatar} alt={t.author} className="w-full h-full object-cover object-top" />
          </motion.div>
        ))}
      </motion.div>

      {/* Main content */}
      <div className="relative mt-12">
        {/* Star Rating Panel */}
        <div className="flex gap-1.5 text-amber-300 mb-6">
          {[...Array(currentTestimonial.stars)].map((_, i) => (
            <Star key={i} size={15} className="fill-current text-[#C8EB5F]" />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.blockquote
            key={activeIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            className="text-2xl sm:text-3xl font-serif font-light leading-relaxed tracking-tight text-white mb-10 h-auto sm:min-h-[140px]"
          >
            <SplitText text={currentTestimonial.quote} />
          </motion.blockquote>
        </AnimatePresence>

        {/* Author details */}
        <motion.div className="mt-8 relative" layout>
          <div className="flex items-center gap-4">
            {/* Avatar container with target ring */}
            <div className="relative w-14 h-14">
              <motion.div
                className="absolute -inset-1.5 rounded-full border border-[#C8EB5F]/30"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
              {testimonials.map((t, i) => (
                <motion.img
                  key={t.avatar}
                  src={t.avatar}
                  alt={t.author}
                  className="absolute inset-0 w-14 h-14 rounded-full object-cover object-top grayscale transition-all duration-500 border border-white/10"
                  animate={{
                    opacity: i === activeIndex ? 1 : 0,
                    zIndex: i === activeIndex ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
              ))}
            </div>

            {/* Author info with accent line */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                className="relative pl-5"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.25 }}
              >
                <motion.div
                  className="absolute left-0 top-1 bottom-1 w-[2px] bg-[#C8EB5F]"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.3, delay: 0.05 }}
                  style={{ originY: 0 }}
                />
                <span className="block text-base font-serif font-semibold text-white">
                  {currentTestimonial.author}
                </span>
                <span className="block text-[10px] text-neutral-400 mt-0.5 font-mono uppercase tracking-[0.2em]">
                  {currentTestimonial.role} — <span className="text-[#C8EB5F] font-bold">{currentTestimonial.company}</span>
                </span>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Progress slide bar */}
        <div className="mt-12 h-[2px] bg-white/5 relative overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 bg-[#C8EB5F]"
            initial={{ width: "0%" }}
            animate={{ width: `${((activeIndex + 1) / testimonials.length) * 100}%` }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>

      {/* Keyboard/click guide hint */}
      <motion.div
        className="absolute bottom-6 right-8 sm:right-12 flex items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 0.5 : 0.2 }}
        transition={{ duration: 0.3 }}
      >
        <span className="text-[9px] text-neutral-400 uppercase tracking-widest font-mono">CLICK TO NEXT REVEAL</span>
      </motion.div>
    </div>
  );
}
