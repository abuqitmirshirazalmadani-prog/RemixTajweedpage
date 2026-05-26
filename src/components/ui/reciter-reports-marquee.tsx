"use client";

import React from "react";
import { motion } from "motion/react";
import { Star, MessageSquare, Quote, Shield } from "lucide-react";

interface Testimonial {
  text: string;
  initials: string;
  name: string;
  role: string;
  color: string;
}

const testimonials: Testimonial[] = [
  {
    text: "TajweedPage.com helped me improve my Quran pronunciation step by step. The teachers explain Makharij rules clearly and patiently.",
    initials: "UK",
    name: "Usama Khan",
    role: "Verified Student, UK",
    color: "from-[#C8EB5F] to-emerald-500",
  },
  {
    text: "I joined as a complete beginner and now I feel completely confident reciting the Quran with proper Tajweed. Best online Ijazah support.",
    initials: "AY",
    name: "Ayesha Youssef",
    role: "Verified Student, New York",
    color: "from-emerald-400 to-teal-500",
  },
  {
    text: "The personalized lessons and recitation correction sessions improved my Tajweed significantly. The weekly updates are absolute gold!",
    initials: "FM",
    name: "Fatima Mansoor",
    role: "Verified Parent, Texas",
    color: "from-amber-400 to-[#C8EB5F]",
  },
  {
    text: "Before starting, I was mixing similar sounds. Now my Makharij rules are sound and proper. The live 1-on-1 scheduling matches my job slots!",
    initials: "SD",
    name: "Salim Daoud",
    role: "Revert Student, Canada",
    color: "from-blue-500 to-indigo-600",
  },
  {
    text: "Finding female scholars who can teach my daughters with patient, step-by-step guidance was difficult until we discovered TajweedPage.com.",
    initials: "HN",
    name: "Hanaa Naji",
    role: "Verified Parent, London",
    color: "from-pink-500 to-purple-600",
  },
  {
    text: "The 1-on-1 live feedback from certified teachers has made all the difference. Correcting my heavy letters or elongation rules is so simple.",
    initials: "AM",
    name: "Abdul Malik",
    role: "Adult Learner, Sydney",
    color: "from-teal-400 to-[#C8EB5F]",
  },
  {
    text: "Highly recommend for anyone wanting to build a beautiful, melodic voice and correct subtle pronunciation slips before they become habit.",
    initials: "ZA",
    name: "Zainab Alvi",
    role: "Verified Student, Chicago",
    color: "from-[#C8EB5F] to-[#C8EB5F]/60",
  },
  {
    text: "Excellent online interface. My teacher explains anatomical voice charts and jaw moves so I can get the guttural sounds 100% correct.",
    initials: "TK",
    name: "Tariq Kassem",
    role: "Beginner Student, Dubai",
    color: "from-amber-400 to-yellow-600",
  },
  {
    text: "An absolute blessing to have access to authentic Madinah-certified, Ijazah-grade scholars from the comfort of our own home schedules.",
    initials: "MR",
    name: "Mariam Rahman",
    role: "Verified Parent, California",
    color: "from-emerald-400 to-emerald-600",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

interface TestimonialsColumnProps {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}

const TestimonialsColumn = ({
  className,
  testimonials,
  duration = 10,
}: TestimonialsColumnProps) => {
  return (
    <div className={className}>
      <motion.ul
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6 bg-transparent list-none m-0 p-0"
      >
        {[
          ...Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {testimonials.map(({ text, initials, name, role, color }, i) => (
                <motion.li
                  key={`${index}-${i}`}
                  aria-hidden={index === 1 ? "true" : "false"}
                  tabIndex={index === 1 ? -1 : 0}
                  whileHover={{
                    scale: 1.02,
                    y: -4,
                    boxShadow: "0 25px 50px -12px rgba(200, 235, 95, 0.05)",
                    borderColor: "rgba(200, 235, 95, 0.2)",
                    transition: { type: "spring", stiffness: 400, damping: 20 },
                  }}
                  className="p-8 rounded-[28px] border border-white/5 bg-[#090b0e]/95 backdrop-blur-md shadow-2xl max-w-xs w-full transition-all duration-300 cursor-default select-none group focus:outline-none focus:ring-1 focus:ring-[#C8EB5F]/30"
                >
                  <blockquote className="m-0 p-0 flex flex-col justify-between h-full space-y-6">
                    {/* Upper decorative elements */}
                    <div className="flex justify-between items-center">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, idx) => (
                          <Star
                            key={idx}
                            size={10}
                            className="fill-[#C8EB5F] text-[#C8EB5F]"
                          />
                        ))}
                      </div>
                      <Quote size={14} className="text-[#C8EB5F]/20 group-hover:text-[#C8EB5F]/40 transition-colors" />
                    </div>

                    <p className="text-neutral-400 text-xs font-light leading-relaxed m-0 group-hover:text-neutral-300 transition-colors">
                      "{text}"
                    </p>

                    <footer className="flex items-center gap-3 border-t border-white/5 pt-4">
                      {/* Signature dynamic initials badge */}
                      <div className={`h-9 w-9 rounded-full bg-gradient-to-br ${color} flex items-center justify-center font-mono text-xs font-bold text-black shrink-0 shadow-inner`}>
                        {initials}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <cite className="font-serif text-xs font-medium not-italic tracking-tight text-white truncate">
                          {name}
                        </cite>
                        <span className="text-[10px] leading-5 tracking-wider font-mono text-[#C8EB5F]/70 mt-0.5 truncate uppercase">
                          {role}
                        </span>
                      </div>
                    </footer>
                  </blockquote>
                </motion.li>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.ul>
    </div>
  );
};

export function ReciterReportsMarquee() {
  return (
    <section
      aria-labelledby="reports-heading"
      className="bg-black py-32 relative overflow-hidden border-t border-b border-white/5"
    >
      {/* Visual atmospheric dither depth layers */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-gradient-to-tr from-transparent via-[#C8EB5F]/5 to-transparent rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: "radial-gradient(ellipse at center, #ffffff 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Text Block */}
          <div className="lg:col-span-4 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 bg-[#C8EB5F]/10 border border-[#C8EB5F]/20 px-3.5 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C8EB5F] animate-ping" />
              <span className="text-[10px] tracking-[0.25em] font-mono text-[#C8EB5F] uppercase font-bold">
                DIRECT PARENT & STUDENT STORIES
              </span>
            </div>

            <h2
              id="reports-heading"
              className="text-4xl md:text-5.5xl font-light font-serif tracking-tight text-white uppercase leading-none"
            >
              Real Reciter <br />
              <span className="text-[#C8EB5F]">Recourse Reports</span>
            </h2>

            <p className="text-neutral-450 text-xs md:text-sm font-light leading-relaxed">
              Discover how hundreds of students globally corrected their articulation points (Makharij), mastered Quranic phonetics, and advanced under Madinah-qualified scholars.
            </p>

            <div className="pt-4 border-t border-white/5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center text-[#C8EB5F]">
                  <Shield size={14} />
                </div>
                <div>
                  <h4 className="text-xs font-serif text-white uppercase tracking-wider">100% Verified Accounts</h4>
                  <p className="text-[10px] text-neutral-500 font-light mt-0.5">Authentic academic student database</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Marquee columns container */}
          <div className="lg:col-span-8 relative">
            {/* Top and bottom shade masking for seamless illusion */}
            <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black to-transparent z-20 pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent z-20 pointer-events-none" />

            <div
              className="flex justify-center gap-6 max-h-[640px] overflow-hidden"
              role="region"
              aria-label="Scrolling Reciter Testimonials"
            >
              <TestimonialsColumn testimonials={firstColumn} duration={16} className="w-full sm:w-1/3" />
              <TestimonialsColumn testimonials={secondColumn} className="hidden sm:block w-1/3" duration={22} />
              <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block w-1/3" duration={19} />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
