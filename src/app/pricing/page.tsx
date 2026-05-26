"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { NavigationHeader } from "@/components/ui/navigation-header";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { 
  CheckCircle2, 
  ChevronDown, 
  Menu, 
  X,
  Mail,
  ShieldCheck,
  Star,
  Users,
  Clock,
  ArrowRight,
  HelpCircle,
  MessageSquare
} from "lucide-react";

export default function PricingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [wordDropdownOpen, setWordDropdownOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingType, setBookingType] = useState<"trial" | "demo">("trial");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-neutral-300 font-sans antialiased selection:bg-[#C8EB5F] selection:text-black overflow-x-hidden relative">
      
      {/* Background spotlights & ambient glow */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[10%] w-[500px] h-[500px] bg-[#C8EB5F]/5 rounded-full blur-[120px]" />
        <div className="absolute top-[30%] right-[5%] w-[450px] h-[450px] bg-emerald-950/20 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-10%] left-[25%] w-[550px] h-[550px] bg-[#C8EB5F]/5 rounded-full blur-[130px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]" />
      </div>

      {/* Navigation Header */}
      <NavigationHeader onTrialClick={() => { setBookingType("trial"); setBookingOpen(true); }} currentPage="pricing" />
      <header className={cn(
        "hidden fixed top-0 left-0 w-full z-40 transition-all duration-300 py-4 px-6 md:px-12",
        scrolled ? "bg-black/90 backdrop-blur-md border-b border-white/5" : "bg-transparent"
      )}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex flex-col gap-[3px] text-[#C8EB5F] group-hover:scale-105 transition-transform duration-300">
              <div className="w-8 h-[2.5px] bg-current rounded-sm" />
              <div className="w-8 h-[2.5px] bg-current rounded-sm" />
              <div className="w-5 h-[2.5px] bg-current rounded-sm" />
              <div className="w-8 h-[2.5px] bg-current rounded-sm" />
            </div>
            <span className="font-serif tracking-[0.2em] font-bold text-white group-hover:text-[#C8EB5F] transition-colors text-sm sm:text-base uppercase">
              TAJWEEDPAGE
            </span>
          </Link>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-[11px] font-mono tracking-widest text-[#eeeeee]">
            
            <Link href="/quran-classes-for-kids" className="hover:text-[#C8EB5F] transition-colors duration-305">Kids Quran</Link>
            
            <div 
              className="relative group py-2"
              onMouseEnter={() => setWordDropdownOpen(true)}
              onMouseLeave={() => setWordDropdownOpen(false)}
            >
              <button className="flex items-center gap-1 hover:text-[#C8EB5F] transition-colors duration-305 outline-none cursor-pointer">
                <span className="text-white hover:text-[#C8EB5F] font-semibold uppercase tracking-widest">Quran in the world</span>
                <ChevronDown size={11} className={cn("transition-transform duration-350 text-[#C8EB5F]", wordDropdownOpen ? "rotate-180" : "")} />
              </button>
              
              <div className={cn(
                "absolute top-full left-1/2 -translate-x-1/2 pt-2 waves-style w-56 transition-all duration-300 z-50",
                wordDropdownOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2 pointer-events-none"
              )}>
                <div className="bg-neutral-950 border border-white/10 rounded-2xl p-2.5 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
                  <Link href="/quran-classes-in-usa" className="block px-4 py-3 text-[10px] tracking-wider font-mono text-neutral-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
                    Quran Classes in USA
                  </Link>
                  <div className="h-px bg-white/5 my-1" />
                  <Link href="/quran-classes-in-uk" className="block px-4 py-3 text-[10px] tracking-wider font-mono text-neutral-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
                    Quran Classes in UK
                  </Link>
                  <div className="h-px bg-white/5 my-1" />
                  <Link href="/quran-in-the-world/quran-classes-in-europe" className="block px-4 py-3 text-[10px] tracking-wider font-mono text-neutral-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-semibold">
                    Quran Classes in Europe
                  </Link>
                  <div className="h-px bg-white/5 my-1" />
                  <Link href="/quran-in-the-world" className="block px-4 py-3 text-[10px] tracking-wider font-mono text-neutral-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-semibold font-sans">
                    All Global Timings
                  </Link>
                </div>
              </div>
            </div>
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => {
                setBookingType("trial");
                setBookingOpen(true);
              }}
              className="bg-[#C8EB5F] text-black hover:bg-white text-[11px] font-mono font-bold tracking-widest px-5 py-2.5 rounded-full uppercase transition-colors duration-300 shadow-[0_4px_20px_rgba(200,235,95,0.15)] cursor-pointer"
            >
              FREE TRIAL
            </button>
            <button 
              className="md:hidden flex flex-col gap-1.5 p-2 z-50 text-white" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={22} className="text-[#C8EB5F]" /> : <Menu size={22} />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Menu Dropdown */}
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
            <Link 
              href="/quran-classes-in-usa" 
              className="text-lg tracking-widest uppercase text-white hover:text-[#C8EB5F] transition-colors font-serif font-light"
              onClick={() => setMobileMenuOpen(false)}
            >
              Quran Classes in USA
            </Link>
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

            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                setBookingType("trial");
                setBookingOpen(true);
              }}
              className="bg-[#C8EB5F] text-black text-xs font-bold font-mono tracking-widest uppercase px-8 py-3.5 rounded-full mt-4 cursor-pointer"
            >
              FREE TRIAL CLASS
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Pricing Sections / Cards */}
      <section className="mt-32 mb-32 relative w-full z-10">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Header */}
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.25em] text-[#C8EB5F] uppercase mb-1">
              <span className="h-1.5 w-1.5 rounded-full bg-[#C8EB5F] animate-pulse" />
              INVESTING IN KNOWLEDGE
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl tracking-tight text-white font-serif font-light uppercase">
              Choose your tuition plan
            </h2>
            <p className="mt-5 text-xs sm:text-sm leading-relaxed text-neutral-400 max-w-2xl mx-auto font-sans font-light">
              We offer structured, flexible tuition scales designed around one-on-one virtual mentoring. Book a free diagnostic trial session to assess placement.
            </p>
          </div>

          {/* Pricing Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
            
            {/* Plan 1: Starter / Basic Recitation */}
            <div className="relative group bg-zinc-950/50 ring-1 ring-white/10 rounded-3xl p-8 flex flex-col justify-between hover:ring-[#C8EB5F]/30 transition-all duration-300">
              <div className="space-y-6">
                <div>
                  <span className="text-[9px] tracking-[0.25em] font-mono text-[#C8EB5F] uppercase block mb-1 font-semibold">BASIC SLOT</span>
                  <h3 className="text-xl tracking-tight text-white font-serif font-light uppercase">Starter Recitation</h3>
                  <p className="mt-2 text-xs text-neutral-400 font-sans font-light">Best for introductory Qaida practice</p>
                </div>
                <div className="h-px bg-white/5" />
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl sm:text-5xl font-serif font-light text-white">$45</span>
                    <span className="text-neutral-500 text-xs font-mono font-light uppercase tracking-wider">/ Every Month</span>
                  </div>
                  <p className="text-[10px] text-neutral-500 font-mono mt-1 uppercase">2 live sessions per week</p>
                </div>
                
                <ul className="space-y-4 pt-4 border-t border-white/5">
                  <li className="flex items-start gap-3 text-xs text-neutral-300 font-sans font-light">
                    <CheckCircle2 className="text-[#C8EB5F] flex-shrink-0 mt-0.5" size={14} />
                    <span>8 interactive hours per month</span>
                  </li>
                  <li className="flex items-start gap-4 text-xs text-neutral-300 font-sans font-light">
                    <CheckCircle2 className="text-[#C8EB5F] flex-shrink-0 mt-0.5" size={14} />
                    <span>Basic classical Arabic alphabets (Qaida)</span>
                  </li>
                  <li className="flex items-start gap-3 text-xs text-neutral-300 font-sans font-light">
                    <CheckCircle2 className="text-[#C8EB5F] flex-shrink-0 mt-0.5" size={14} />
                    <span>Personal virtual lecture notebook</span>
                  </li>
                  <li className="flex items-start gap-3 text-xs text-neutral-300 font-sans font-light pb-4">
                    <CheckCircle2 className="text-[#C8EB5F] flex-shrink-0 mt-0.5" size={14} />
                    <span>Dedicated student portal access</span>
                  </li>
                </ul>
              </div>

              <button 
                onClick={() => {
                  setBookingType("trial");
                  setBookingOpen(true);
                }}
                className="w-full text-center text-xs font-mono font-bold uppercase tracking-widest text-[#C8EB5F] bg-zinc-900 border border-white/10 hover:bg-white hover:text-black hover:border-black rounded-full py-3.5 px-4 transition duration-300 cursor-pointer mt-6"
              >
                PROCEED WITH TRIAL
              </button>
            </div>

            {/* Plan 2: Pro Plan (Featured) / Intensive Tajweed Precision */}
            <div className="relative group bg-gradient-to-b from-zinc-900/60 via-zinc-950/60 to-zinc-950 border-2 border-[#C8EB5F]/50 shadow-[0_0_50px_rgba(200,235,95,0.06)] rounded-3xl p-8 flex flex-col justify-between hover:border-[#C8EB5F] transition-all duration-300 transform md:-translate-y-2">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <span className="inline-flex items-center gap-1.5 text-[8px] font-mono tracking-widest font-bold text-black bg-[#C8EB5F] rounded-full px-4 py-1 uppercase select-none">
                  <Star size={10} fill="black" />
                  Most Recommended
                </span>
              </div>

              <div className="space-y-6">
                <div>
                  <span className="text-[9px] tracking-[0.25em] font-mono text-[#C8EB5F] uppercase block mb-1 font-semibold">PREMIUM MENTORING</span>
                  <h3 className="text-xl tracking-tight text-white font-serif font-light uppercase">Intensive Tajweed</h3>
                  <p className="mt-2 text-xs text-neutral-405 font-sans font-light">For comprehensive phonology guidance</p>
                </div>
                <div className="h-px bg-[#C8EB5F]/10" />
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl sm:text-5xl font-serif font-light text-white">$75</span>
                    <span className="text-neutral-500 text-xs font-mono font-light uppercase tracking-wider">/ Every Month</span>
                  </div>
                  <p className="text-[10px] text-[#C8EB5F] font-mono mt-1 uppercase">3 live sessions per week</p>
                </div>
                
                <ul className="space-y-4 pt-4 border-t border-white/5">
                  <li className="flex items-start gap-3 text-xs text-neutral-250 font-sans font-light">
                    <CheckCircle2 className="text-[#C8EB5F] flex-shrink-0 mt-0.5" size={14} />
                    <span>12 premium zoom-based interactive hours</span>
                  </li>
                  <li className="flex items-start gap-3 text-xs text-neutral-250 font-sans font-light">
                    <CheckCircle2 className="text-[#C8EB5F] flex-shrink-0 mt-0.5" size={14} />
                    <span>Intricate phonetic articulation rules (Makhraj)</span>
                  </li>
                  <li className="flex items-start gap-3 text-xs text-neutral-250 font-sans font-light">
                    <CheckCircle2 className="text-[#C8EB5F] flex-shrink-0 mt-0.5" size={14} />
                    <span>Option to select certified female scholars</span>
                  </li>
                  <li className="flex items-start gap-3 text-xs text-neutral-250 font-sans font-light pb-4">
                    <CheckCircle2 className="text-[#C8EB5F] flex-shrink-0 mt-0.5" size={14} />
                    <span>Interactive PDF syllabuses & vocal logs</span>
                  </li>
                </ul>
              </div>

              <button 
                onClick={() => {
                  setBookingType("trial");
                  setBookingOpen(true);
                }}
                className="w-full text-center text-xs font-mono font-bold uppercase tracking-widest text-black bg-[#C8EB5F] hover:bg-white rounded-full py-4 px-4 transition duration-300 cursor-pointer shadow-lg shadow-[#C8EB5F]/15 mt-6"
              >
                SECURE CLASS ACCORDS
              </button>
            </div>

            {/* Plan 3: Enterprise Plan / Scholar Custom Masterclass */}
            <div className="relative group bg-zinc-950/50 ring-1 ring-white/10 rounded-3xl p-8 flex flex-col justify-between hover:ring-[#C8EB5F]/30 transition-all duration-300">
              <div className="space-y-6">
                <div>
                  <span className="text-[9px] tracking-[0.25em] font-mono text-[#C8EB5F] uppercase block mb-1 font-semibold">ELITE MEMORIZATION</span>
                  <h3 className="text-xl tracking-tight text-white font-serif font-light uppercase">Quranic Masterclass</h3>
                  <p className="mt-2 text-xs text-neutral-400 font-sans font-light">Engineered for thorough memorization (Hifz)</p>
                </div>
                <div className="h-px bg-white/5" />
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl sm:text-5xl font-serif font-light text-white">$120</span>
                    <span className="text-neutral-500 text-xs font-mono font-light uppercase tracking-wider">/ Every Month</span>
                  </div>
                  <p className="text-[10px] text-neutral-500 font-mono mt-1 uppercase">5 live sessions per week</p>
                </div>
                
                <ul className="space-y-4 pt-4 border-t border-white/5">
                  <li className="flex items-start gap-3 text-xs text-neutral-300 font-sans font-light">
                    <CheckCircle2 className="text-[#C8EB5F] flex-shrink-0 mt-0.5" size={14} />
                    <span>20 comprehensive live sessions per month</span>
                  </li>
                  <li className="flex items-start gap-4 text-xs text-neutral-300 font-sans font-light">
                    <CheckCircle2 className="text-[#C8EB5F] flex-shrink-0 mt-0.5" size={14} />
                    <span>Rigorous memorization tracking & daily mock revision</span>
                  </li>
                  <li className="flex items-start gap-3 text-xs text-neutral-300 font-sans font-light">
                    <CheckCircle2 className="text-[#C8EB5F] flex-shrink-0 mt-0.5" size={14} />
                    <span>Direct WhatsApp monitoring with native Arab scholars</span>
                  </li>
                  <li className="flex items-start gap-3 text-xs text-neutral-300 font-sans font-light pb-4">
                    <CheckCircle2 className="text-[#C8EB5F] flex-shrink-0 mt-0.5" size={14} />
                    <span>Official Ijazah certification preparation tracks</span>
                  </li>
                </ul>
              </div>

              <button 
                onClick={() => {
                  setBookingType("demo");
                  setBookingOpen(true);
                }}
                className="w-full text-center text-xs font-mono font-bold uppercase tracking-widest text-[#C8EB5F] bg-zinc-900 border border-white/10 hover:bg-white hover:text-black hover:border-black rounded-full py-3.5 px-4 transition duration-300 cursor-pointer mt-6"
              >
                REQUEST DESIGNATED SCHOLAR
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* SEO rich content block with over 500 characters of clean, semantic copy to prevent cannibalization */}
      <section className="py-24 border-t border-b border-white/5 bg-zinc-950/20 relative z-10 w-full text-left">
        <div className="max-w-5xl mx-auto px-6 space-y-12">
          
          <div className="flex flex-col md:flex-row justify-between items-start gap-8">
            <div className="max-w-lg space-y-4">
              <span className="text-[10px] tracking-[0.25em] font-mono text-[#C8EB5F] uppercase block">
                TUITION TRANSPARENCY & INTEGRITY
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-white uppercase tracking-tight leading-none">
                Reasonable Tuition Scales with Premium Academic Standards
              </h2>
            </div>
            <div className="h-px bg-white/10 flex-1 self-center hidden md:block" />
            <span className="text-xs font-mono text-neutral-500 uppercase self-end select-none">
              Verified Value Protocol
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 font-sans font-light text-xs sm:text-sm text-neutral-400 leading-relaxed">
            <div className="space-y-4">
              <h4 className="text-[#C8EB5F] font-mono text-[11px] tracking-wider uppercase font-semibold">
                Transparent Fee Protocols for Global Homes
              </h4>
              <p>
                Investing in professional online Tajweed and Islamic recitation education represents a key milestone for every modern Muslim home. To maintain extreme operational transparency, our virtual helpdesk establishes clear-cut monthly billing parameters. Unlike competitive aggregators that apply automated surcharges or variable server-use fees, you receive a flat subscription invoice mapped directly to the actual lessons completed by your dedicated certified scholar.
              </p>
              <p>
                Our tuition scales prioritize the financial safety of both our families and our hard-working teachers. Instructors are rewarded fairly matching advanced Ijazah certification standards. Consequently, our premium slot models guarantee authentic patience, complete focus, and high-fidelity personalized lessons during every session. This ensures that you gain genuine confidence in classical recitation with zero hidden surcharges or administrative overhead.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-[#C8EB5F] font-mono text-[11px] tracking-wider uppercase font-semibold">
                Flexible Slot Adjustments & Protection Matrices
              </h4>
              <p>
                We realize that parenting duties, academic requirements, and professional schedules frequently change. To protect families, our interactive client logbooks offer simple, stress-free options to postpone, freeze, or rearrange scheduled slots with direct approval. Simply propose alternative timing intervals to your teacher over WhatsApp to secure a balanced lifestyle index without falling behind.
              </p>
              <p>
                Should a complete schedule misalignment require you to pursue a package cancellation, we execute a solid 40% retention rule for the remaining slots. This metric guarantees that selected scholars are protected against sudden income disruptions while ensuring complete fairness for parents. This rigorous policy balance establishes Tajweedpage as a trustworthy, premium academy for discerning families across global timezones.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Trust & FAQ teaser section */}
      <section className="py-24 relative overflow-hidden bg-[#050505] z-10 text-center">
        <div className="max-w-4xl mx-auto px-6 space-y-8">
          <HelpCircle className="text-[#C8EB5F] mx-auto animate-pulse-slow" size={32} />
          <h2 className="text-3xl sm:text-5xl font-serif font-light text-white uppercase tracking-tight">
            Comprehensive Tuition Questions Answered
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto font-sans leading-relaxed">
            Have queries regarding international currency transactions, private female instructor slots, or multi-child structural discounts? Access our comprehensive coordinators instantly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link 
              href="/contact" 
              className="px-8 py-4 bg-zinc-900 border border-white/5 text-[#C8EB5F] font-mono text-[11px] font-bold uppercase tracking-widest rounded-full hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2"
            >
              Consult General Helpdesk <ArrowRight size={14} />
            </Link>
            <a 
              href="https://wa.me/923708201211?text=Asalamu%20Alaikum,%20I%20am%20interested%20in%20taking%20Tajweed%2520online%2520classes%2520with%2520Tajweedpage." 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-8 py-4 bg-[#25D366] text-white font-mono text-[11px] font-bold uppercase tracking-widest rounded-full hover:bg-emerald-500 transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/5 font-sans"
            >
              <MessageSquare size={14} /> Chat On WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Footer (Classic Branding layout with PRICING link appended) */}
      

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-4 items-end">
        
        {/* Email Floating Button */}
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

        {/* WhatsApp Floating Button */}
        <a 
          href="https://wa.me/923708201211?text=Asalamu%20Alaikum,%20I%20am%20interested%20in%20taking%20Tajweed%2520online%2520classes%2520with%2520Tajweedpage." 
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
            
            {/* Dark overlay backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setBookingOpen(false);
                setFormSubmitted(false);
              }}
              className="absolute inset-0 bg-black/85 backdrop-blur-sm shadow-inner"
            />

            {/* Modal Body */}
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
                className="absolute top-6 right-6 text-neutral-400 hover:text-white font-mono text-xs uppercase tracking-widest cursor-pointer"
              >
                [ CLOSE ]
              </button>

              <div className="space-y-4 mb-6">
                <span className="text-[9px] tracking-[0.3em] font-semibold text-[#C8EB5F] uppercase font-mono block">
                  {bookingType === "trial" ? "COMPLIMENTARY PASS" : "DIAGNOSTIC DEMO CLASS"}
                </span>
                <h3 className="font-serif text-2xl uppercase text-white leading-none">
                  {bookingType === "trial" ? "Claim Your Free Live Trial" : "Schedule Diagnostic Demo"}
                </h3>
                <p className="text-xs text-neutral-404 font-light">
                  Learn live, one-on-one over Zoom or Teams with a qualified certified scholar.
                </p>
              </div>

              {formSubmitted ? (
                <div className="bg-[#C8EB5F]/10 border border-[#C8EB5F]/30 p-6 rounded-2xl text-center space-y-4">
                  <CheckCircle2 className="text-[#C8EB5F] mx-auto animate-bounce animate-pulse-slow" size={32} />
                  <h4 className="text-white font-serif text-lg">Inquiry Confirmed</h4>
                  <p className="text-neutral-404 text-xs font-light leading-relaxed font-sans">
                    Success! A coordinator situated inside your specific timezone will contact you over WhatsApp/Email within 2 hours to confirm your scheduled slot.
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
                      placeholder="e.g. +1 (555) 420 9100"
                      className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#C8EB5F]"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] tracking-widest font-mono text-neutral-400 uppercase block mb-1.5">Class Timings Preferred</label>
                    <select className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-xs text-neutral-300 focus:outline-none">
                      <option>Morning Slots (6:00 AM - 11:00 AM)</option>
                      <option>Afternoon Slots (12:00 PM - 4:00 PM)</option>
                      <option>Evening Slots (5:00 PM - 10:00 PM)</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#C8EB5F] p-4 text-black text-[11px] tracking-widest font-mono uppercase font-bold text-center mt-2 shadow-[0_4px_25px_rgba(200,235,95,0.15)] cursor-pointer"
                  >
                    SECURE LIVE ONE-ON-ONE SEAT
                  </button>
                </form>
              )}

            </motion.div>

          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
