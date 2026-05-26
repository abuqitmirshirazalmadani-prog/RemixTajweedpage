"use client";

import React from "react";
import { Check, Sparkles, Calendar, Award, Compass, BookOpen, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";

export function StartLearningBanner() {
  const scrollToForm = () => {
    const el = document.getElementById("booking-card");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const strengths = [
    {
      title: "Free Trial Class",
      desc: "Experience our teaching methodology first-hand before committing.",
      icon: Compass,
    },
    {
      title: "Flexible Schedule",
      desc: "Reserve timings that perfectly match your busy life and timezone.",
      icon: Calendar,
    },
    {
      title: "Interactive Learning",
      desc: "Anatomical voice maps and immediate professional audio checkups.",
      icon: BookOpen,
    },
    {
      title: "Expert Quran Teachers",
      desc: "Learn from teachers holding direct traditional Ijazah keys of transmission.",
      icon: Award,
    },
  ];

  return (
    <section 
      id="start-learning-today"
      className="relative py-32 px-6 md:px-12 bg-black overflow-hidden border-t border-b border-white/5"
    >
      {/* Background radial glow matching the luxury noir setup */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C8EB5F]/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute right-0 bottom-0 w-[300px] h-[300px] bg-neutral-900/40 rounded-full blur-[100px] pointer-events-none" />

      {/* Decorative luxury line background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute left-1/4 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/25 to-transparent" />
        <div className="absolute right-1/4 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/25 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Block: Narrative & CTA (7 Columns) */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="inline-flex items-center gap-2 bg-[#C8EB5F]/10 border border-[#C8EB5F]/20 px-3.5 py-1.5 rounded-full">
              <Sparkles size={11} className="text-[#C8EB5F]" />
              <span className="text-[10px] tracking-[0.3em] font-mono text-[#C8EB5F] uppercase font-bold">
                IMMEDIATE VERBAL MASTERCLASS
              </span>
            </div>

            <div className="space-y-4">
              <h2 className="text-4xl md:text-6xl lg:text-7.5xl font-light font-serif text-white tracking-tight uppercase leading-none">
                Start Learning <br />
                <span className="text-[#C8EB5F]">Tajweed Online</span> Today
              </h2>
              
              <p className="text-neutral-400 text-sm md:text-base font-light leading-relaxed max-w-xl">
                Improve your Quran recitation with professional step-by-step Tajweed lessons designed for absolute beginners, reverts, and busy adults who desire phonetic perfection.
              </p>
            </div>

            {/* Custom Interactive Trigger with Parallax Depth and Custom Hover */}
            <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <button
                onClick={scrollToForm}
                className="group relative inline-flex items-center justify-between gap-12 bg-[#C8EB5F] text-black font-semibold text-xs tracking-[0.15em] uppercase px-10 py-5 rounded-full hover:bg-white transition-all duration-300 shadow-[0_10px_40px_rgba(200,235,95,0.2)] cursor-pointer overflow-hidden"
              >
                <span className="relative z-10">Book Your Free Trial Today</span>
                <span className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center group-hover:bg-black/20 transition-all z-10">
                  <ArrowUpRight size={14} className="group-hover:rotate-45 transition-transform duration-300" />
                </span>
                {/* Visual expansion effect */}
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out -z-0" />
              </button>
              
              <div className="flex flex-col">
                <span className="text-xs text-stone-200 font-mono tracking-wider">No Credit Card Required</span>
                <span className="text-[10px] text-neutral-500 font-light mt-0.5">Cancel or reschedule anytime</span>
              </div>
            </div>
          </div>

          {/* Right Block: Core Benefits grid with luxury Bento style (5 Columns) */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {strengths.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div 
                  key={idx}
                  className="group bg-[#08090b]/80 border border-white/5 p-6 rounded-[24px] hover:border-[#C8EB5F]/30 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.6)] text-left"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#C8EB5F] mb-4 group-hover:bg-[#C8EB5F] group-hover:text-black transition-all duration-500">
                    <Icon size={18} strokeWidth={1.5} />
                  </div>
                  <h4 className="text-sm font-serif text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                    <span className="text-[#C8EB5F]">✓</span>
                    {item.title}
                  </h4>
                  <p className="text-neutral-450 text-[11px] font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
