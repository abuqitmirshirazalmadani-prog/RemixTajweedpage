"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

interface NavigationHeaderProps {
  onTrialClick?: () => void;
  currentPage?: string;
}

export function NavigationHeader({ onTrialClick, currentPage }: NavigationHeaderProps) {
  const [courseDropdownOpen, setCourseDropdownOpen] = useState(false);
  const [wordDropdownOpen, setWordDropdownOpen] = useState(false);
  const [usaSubpagesOpen, setUsaSubpagesOpen] = useState(false);
  const [ukSubpagesOpen, setUkSubpagesOpen] = useState(false);
  const [europeSubpagesOpen, setEuropeSubpagesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleTrialClick = () => {
    if (onTrialClick) {
      onTrialClick();
    } else {
      // Just redirect or scroll
      const element = document.getElementById("trial-booking") || document.getElementById("free-trial");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      } else {
        window.location.href = "/free-trial";
      }
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-40 bg-black/60 backdrop-blur-md border-b border-white/5 py-4 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          
          {/* Logo with horizontal visual lines */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex flex-col gap-[3px] text-[#C8EB5F] group-hover:scale-105 transition-transform duration-300">
              <div className="w-8 h-[2.5px] bg-current rounded-sm" />
              <div className="w-8 h-[2.5px] bg-current rounded-sm" />
              <div className="w-5 h-[2.5px] bg-current rounded-sm" />
              <div className="w-8 h-[2.5px] bg-current rounded-sm" />
            </div>
            <span className="font-serif tracking-[0.2em] font-bold text-white group-hover:text-[#C8EB5F] transition-colors text-sm sm:text-base">
              TAJWEEDPAGE
            </span>
          </Link>

          {/* Quick links */}
          <nav className="hidden md:flex items-center gap-8 text-[11px] font-mono tracking-widest text-[#eeeeee]">
            {/* Courses Dropdown */}
            <div 
              className="relative group py-2"
              onMouseEnter={() => setCourseDropdownOpen(true)}
              onMouseLeave={() => setCourseDropdownOpen(false)}
            >
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setCourseDropdownOpen(!courseDropdownOpen);
                }}
                className="flex items-center gap-1 hover:text-[#C8EB5F] transition-colors duration-300 outline-none cursor-pointer"
              >
                <span className="text-[#C8EB5F] font-bold uppercase tracking-widest">courses</span>
                <ChevronDown size={11} className={cn("transition-transform duration-300 text-[#C8EB5F]", courseDropdownOpen ? "rotate-180" : "")} />
              </button>
              
              <div className={cn(
                "absolute top-full left-1/2 -translate-x-1/2 pt-2 w-72 transition-all duration-300 z-50",
                courseDropdownOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2 pointer-events-none"
              )}>
                <div className="bg-zinc-950 border border-white/10 rounded-2xl p-2.5 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
                  <Link href="/courses/tajweed-course" prefetch={true} className="block px-4 py-2.5 text-[10px] tracking-wider font-mono text-neutral-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
                    Tajweed Course Master Series
                  </Link>
                  <div className="h-px bg-white/5 my-1" />
                  <Link href="/courses/female-quran-teacher-online" prefetch={true} className="block px-4 py-2.5 text-[10px] tracking-wider font-mono text-neutral-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
                    Female Quran Teacher Online
                  </Link>
                  <div className="h-px bg-white/5 my-1" />
                  <Link href="/courses/online-noorani-qaida-classes" prefetch={true} className="block px-4 py-2.5 text-[10px] tracking-wider font-mono text-neutral-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
                    Online Noorani Qaida Classes
                  </Link>
                  <div className="h-px bg-white/5 my-1" />
                  <Link href="/courses/online-hifz-classes" prefetch={true} className="block px-4 py-2.5 text-[10px] tracking-wider font-mono text-neutral-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
                    Online Hifz Classes
                  </Link>
                  <div className="h-px bg-white/5 my-1" />
                  <Link href="/courses/quran-reading-classes-online" prefetch={true} className="block px-4 py-2.5 text-[10px] tracking-wider font-mono text-neutral-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
                    Quran Reading Classes Online
                  </Link>
                  <div className="h-px bg-white/5 my-1" />
                  <Link href="/courses/islamic-studies-classes-for-kids" prefetch={true} className="block px-4 py-2.5 text-[10px] tracking-wider font-mono text-neutral-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
                    Islamic Studies for Kids
                  </Link>
                  <div className="h-px bg-white/5 my-1" />
                  <Link href="/courses/beginner-quran-classes-online" prefetch={true} className="block px-4 py-2.5 text-[10px] tracking-wider font-mono text-neutral-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
                    Beginner Quran Classes Online
                  </Link>
                </div>
              </div>
            </div>

            <Link href="/quran-classes-for-kids" className={cn("hover:text-[#C8EB5F] transition-colors duration-300", currentPage === "kids-quran" ? "text-[#C8EB5F]" : "")}>Kids Quran</Link>
            <Link href="/blog" className={cn("hover:text-[#C8EB5F] transition-colors duration-300", currentPage === "blog" ? "text-[#C8EB5F]" : "")}>Journal</Link>
            
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
                      <Link href="/online-quran-classes-california" className="block px-3 py-1.5 text-[9px] tracking-wider font-mono text-neutral-400 hover:text-[#C8EB5F] hover:bg-white/5 rounded-lg transition-colors animate-fadeIn">
                        • California
                      </Link>
                      <Link href="/online-quran-classes-chicago" className="block px-3 py-1.5 text-[9px] tracking-wider font-mono text-neutral-400 hover:text-[#C8EB5F] hover:bg-white/5 rounded-lg transition-colors animate-fadeIn">
                        • Chicago
                      </Link>
                      <Link href="/online-quran-classes-new-york" className="block px-3 py-1.5 text-[9px] tracking-wider font-mono text-neutral-400 hover:text-[#C8EB5F] hover:bg-white/5 rounded-lg transition-colors animate-fadeIn">
                        • New York
                      </Link>
                      <Link href="/online-quran-classes-texas" className="block px-3 py-1.5 text-[9px] tracking-wider font-mono text-neutral-400 hover:text-[#C8EB5F] hover:bg-white/5 rounded-lg transition-colors animate-fadeIn">
                        • Texas
                      </Link>
                    </div>
                  )}
                  <div className="h-px bg-white/5 my-1" />
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
                      <Link href="/online-quran-classes-london" className="block px-3 py-1.5 text-[9px] tracking-wider font-mono text-neutral-400 hover:text-[#C8EB5F] hover:bg-white/5 rounded-lg transition-colors animate-fadeIn">
                        • London
                      </Link>
                      <Link href="/online-quran-classes-manchester" className="block px-3 py-1.5 text-[9px] tracking-wider font-mono text-neutral-400 hover:text-[#C8EB5F] hover:bg-white/5 rounded-lg transition-colors animate-fadeIn font-bold">
                        • Manchester
                      </Link>
                      <Link href="/online-quran-classes-birmingham" className="block px-3 py-1.5 text-[9px] tracking-wider font-mono text-neutral-400 hover:text-[#C8EB5F] hover:bg-white/5 rounded-lg transition-colors animate-fadeIn">
                        • Birmingham
                      </Link>
                    </div>
                  )}
                  <div className="h-px bg-white/5 my-1" />
                  <div className="flex items-center justify-between px-4 py-2 hover:bg-white/5 rounded-xl cursor-pointer" onClick={() => setEuropeSubpagesOpen(!europeSubpagesOpen)}>
                    <Link href="/quran-in-the-world/quran-classes-in-europe" onClick={(e) => e.stopPropagation()} className="block text-[10px] tracking-wider font-mono text-neutral-400 hover:text-white transition-colors font-bold">
                      Quran Classes in Europe
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
                      <Link href="/online-quran-classes-germany" className="block px-3 py-1.5 text-[9px] tracking-wider font-mono text-neutral-400 hover:text-[#C8EB5F] hover:bg-white/5 rounded-lg transition-colors animate-fadeIn">
                        • Germany
                      </Link>
                      <Link href="/online-quran-classes-france" className="block px-3 py-1.5 text-[9px] tracking-wider font-mono text-neutral-400 hover:text-[#C8EB5F] hover:bg-white/5 rounded-lg transition-colors animate-fadeIn">
                        • France
                      </Link>
                      <Link href="/online-quran-classes-netherlands" className="block px-3 py-1.5 text-[9px] tracking-wider font-mono text-neutral-400 hover:text-[#C8EB5F] hover:bg-white/5 rounded-lg transition-colors animate-fadeIn">
                        • Netherlands
                      </Link>
                    </div>
                  )}
                  <div className="h-px bg-white/5 my-1" />
                  <Link href="/quran-in-the-world" className="block px-4 py-3 text-[10px] tracking-wider font-mono text-neutral-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-semibold">
                    All Global Timings
                  </Link>
                </div>
              </div>
            </div>
          </nav>

          {/* Core Action */}
          <div className="flex items-center gap-4">
            <button 
              onClick={handleTrialClick}
              className="hidden sm:inline-block bg-[#C8EB5F] text-black hover:bg-white text-[11px] font-mono font-bold tracking-widest px-5 py-2.5 rounded-full uppercase transition-colors duration-300 shadow-[0_4px_20px_rgba(200,235,95,0.15)] cursor-pointer"
            >
              FREE TRIAL
            </button>

            {/* Hamburger Mobile Menu Toggle Button */}
            <button 
              className="md:hidden flex flex-col gap-1.5 p-2 z-50 text-white cursor-pointer" 
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
            className="fixed inset-0 bg-black/95 backdrop-blur-xl z-40 flex flex-col items-center justify-start gap-4 border-b border-[#C8EB5F]/20 pt-20 pb-12 overflow-y-auto px-6"
          >
            <span className="text-[10px] tracking-[0.2em] font-mono text-[#C8EB5F] uppercase font-bold mb-1">Our Featured Courses</span>
            
            <Link 
              href="/courses/female-quran-teacher-online" 
              prefetch={true}
              className="text-sm tracking-widest uppercase text-white hover:text-[#C8EB5F] transition-colors font-serif font-light"
              onClick={() => setMobileMenuOpen(false)}
            >
              Female Quran Teacher Online
            </Link>
            <Link 
              href="/courses/online-noorani-qaida-classes" 
              prefetch={true}
              className="text-sm tracking-widest uppercase text-white hover:text-[#C8EB5F] transition-colors font-serif font-light"
              onClick={() => setMobileMenuOpen(false)}
            >
              Online Noorani Qaida Classes
            </Link>
            <Link 
              href="/courses/online-hifz-classes" 
              prefetch={true}
              className="text-sm tracking-widest uppercase text-white hover:text-[#C8EB5F] transition-colors font-serif font-light"
              onClick={() => setMobileMenuOpen(false)}
            >
              Online Hifz Classes
            </Link>
            <Link 
              href="/courses/quran-reading-classes-online" 
              prefetch={true}
              className="text-sm tracking-widest uppercase text-white hover:text-[#C8EB5F] transition-colors font-serif font-light"
              onClick={() => setMobileMenuOpen(false)}
            >
              Quran Reading Classes Online
            </Link>
            <Link 
              href="/courses/islamic-studies-classes-for-kids" 
              prefetch={true}
              className="text-sm tracking-widest uppercase text-white hover:text-[#C8EB5F] transition-colors font-serif font-light"
              onClick={() => setMobileMenuOpen(false)}
            >
              Islamic Studies For Kids
            </Link>
            <Link 
              href="/courses/beginner-quran-classes-online" 
              prefetch={true}
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
              className={cn("text-base tracking-widest uppercase transition-colors font-serif font-light", currentPage === "kids-quran" ? "text-[#C8EB5F]" : "text-[#aaaaaa] hover:text-white")}
              onClick={() => setMobileMenuOpen(false)}
            >
              Kids Quran
            </Link>
            
            <div className="flex flex-col items-center gap-1.5">
              <div className="flex items-center gap-2">
                <Link 
                  href="/quran-classes-in-usa" 
                  className="text-base tracking-widest uppercase text-[#aaaaaa] hover:text-white transition-colors font-serif font-light"
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
                <div className="flex flex-col items-center gap-1 pl-3 border-l border-white/10 my-1">
                  <Link href="/online-quran-classes-california" className="text-xs uppercase tracking-wider text-neutral-400 hover:text-[#C8EB5F]" onClick={() => setMobileMenuOpen(false)}>• California</Link>
                  <Link href="/online-quran-classes-chicago" className="text-xs uppercase tracking-wider text-neutral-400 hover:text-[#C8EB5F]" onClick={() => setMobileMenuOpen(false)}>• Chicago</Link>
                  <Link href="/online-quran-classes-new-york" className="text-xs uppercase tracking-wider text-neutral-400 hover:text-[#C8EB5F]" onClick={() => setMobileMenuOpen(false)}>• New York</Link>
                  <Link href="/online-quran-classes-texas" className="text-xs uppercase tracking-wider text-neutral-400 hover:text-[#C8EB5F]" onClick={() => setMobileMenuOpen(false)}>• Texas</Link>
                </div>
              )}
            </div>

            <div className="flex flex-col items-center gap-1.5">
              <div className="flex items-center gap-2">
                <Link 
                  href="/quran-classes-in-uk" 
                  className="text-base tracking-widest uppercase text-[#aaaaaa] hover:text-white transition-colors font-serif font-light"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Quran Classes in UK
                </Link>
                <button
                  onClick={() => setUkSubpagesOpen(!ukSubpagesOpen)}
                  className="p-1 hover:text-[#C8EB5F] text-neutral-400 transition-colors focus:outline-none"
                >
                  <ChevronRight size={14} className={cn("transition-transform duration-200", ukSubpagesOpen ? "rotate-90 text-[#C8EB5F]" : "")} />
                </button>
              </div>
              {ukSubpagesOpen && (
                <div className="flex flex-col items-center gap-1 pl-3 border-l border-white/10 my-1">
                  <Link href="/online-quran-classes-london" className="text-xs uppercase tracking-wider text-neutral-400 hover:text-[#C8EB5F]" onClick={() => setMobileMenuOpen(false)}>• London</Link>
                  <Link href="/online-quran-classes-manchester" className="text-xs uppercase tracking-wider text-neutral-400 hover:text-[#C8EB5F]" onClick={() => setMobileMenuOpen(false)}>• Manchester</Link>
                  <Link href="/online-quran-classes-birmingham" className="text-xs uppercase tracking-wider text-neutral-400 hover:text-[#C8EB5F]" onClick={() => setMobileMenuOpen(false)}>• Birmingham</Link>
                </div>
              )}
            </div>

            <div className="flex flex-col items-center gap-1.5">
              <div className="flex items-center gap-2">
                <Link 
                  href="/quran-in-the-world/quran-classes-in-europe" 
                  className="text-base tracking-widest uppercase text-[#aaaaaa] hover:text-white transition-colors font-serif font-light"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Quran Classes in Europe
                </Link>
                <button
                  onClick={() => setEuropeSubpagesOpen(!europeSubpagesOpen)}
                  className="p-1 hover:text-[#C8EB5F] text-neutral-400 transition-colors focus:outline-none"
                >
                  <ChevronRight size={14} className={cn("transition-transform duration-200", europeSubpagesOpen ? "rotate-90 text-[#C8EB5F]" : "")} />
                </button>
              </div>
              {europeSubpagesOpen && (
                <div className="flex flex-col items-center gap-1 pl-3 border-l border-white/10 my-1">
                  <Link href="/online-quran-classes-germany" className="text-xs uppercase tracking-wider text-neutral-400 hover:text-[#C8EB5F]" onClick={() => setMobileMenuOpen(false)}>• Germany</Link>
                  <Link href="/online-quran-classes-france" className="text-xs uppercase tracking-wider text-neutral-400 hover:text-[#C8EB5F]" onClick={() => setMobileMenuOpen(false)}>• France</Link>
                  <Link href="/online-quran-classes-netherlands" className="text-xs uppercase tracking-wider text-neutral-400 hover:text-[#C8EB5F]" onClick={() => setMobileMenuOpen(false)}>• Netherlands</Link>
                </div>
              )}
            </div>

            <Link 
              href="/quran-in-the-world" 
              className="text-base tracking-widest uppercase text-[#aaaaaa] hover:text-white transition-colors font-serif font-light"
              onClick={() => setMobileMenuOpen(false)}
            >
              All Global Timings
            </Link>
            
            <Link 
              href="/blog" 
              className={cn("text-base tracking-widest uppercase transition-colors font-serif font-semibold", currentPage === "blog" ? "text-[#C8EB5F]" : "text-neutral-400 hover:text-[#C8EB5F]")}
              onClick={() => setMobileMenuOpen(false)}
            >
              Journal ✦
            </Link>

            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                handleTrialClick();
              }}
              className="bg-[#C8EB5F] text-black text-xs font-bold font-mono tracking-widest uppercase px-10 py-3.5 rounded-full mt-4 cursor-pointer flex-shrink-0"
            >
              FREE TRIAL CLASS
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
