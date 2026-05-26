"use client";

import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { NavigationHeader } from "@/components/ui/navigation-header";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowRight,
  ArrowUpRight,
  CheckCircle2, 
  ChevronDown, 
  Menu, 
  X,
  Mail,
  Award,
  BookOpen,
  Calendar,
  MessageSquare,
  ShieldCheck,
  Star,
  Users,
  Clock,
  Volume2
} from "lucide-react";

export default function AboutUsPage() {
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
      
      {/* Background grids and glowing elements */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-[#C8EB5F]/5 rounded-full blur-[120px]" />
        <div className="absolute top-[35%] right-[5%] w-[450px] h-[450px] bg-emerald-950/20 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-10%] left-[15%] w-[500px] h-[500px] bg-[#C8EB5F]/5 rounded-full blur-[130px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]" />
      </div>

      {/* Navigation Header */}
      <NavigationHeader onTrialClick={() => { setBookingType("trial"); setBookingOpen(true); }} currentPage="about" />
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
                  <Link href="/quran-in-the-world/quran-classes-in-europe" className="block px-4 py-3 text-[10px] tracking-wider font-mono text-neutral-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
                    Quran Classes in Europe
                  </Link>
                  <div className="h-px bg-white/5 my-1" />
                  <Link href="/quran-in-the-world" className="block px-4 py-3 text-[10px] tracking-wider font-mono text-neutral-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-semibold">
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

      {/* Cinematic Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-16 overflow-hidden">
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-8">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C8EB5F]/20 bg-[#C8EB5F]/5 text-[#C8EB5F] text-xs font-mono uppercase tracking-widest select-none">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C8EB5F] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C8EB5F]"></span>
            </span>
            Ijazah Certified Academy
          </div>
          
          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light text-white tracking-tight leading-[0.95] uppercase select-none">
            Precision. Faith. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-500 via-neutral-100 to-white italic font-normal">
              Digital Articulation.
            </span>
          </h1>
          
          <p className="text-xs sm:text-sm md:text-base text-neutral-400 font-light max-w-3xl mx-auto leading-relaxed font-sans mt-6">
            Tajweedpage represents a legacy of elite, virtual Islamic studies. We customize high-fidelity, one-on-one virtual Tajweed mentoring for kids, adults, and career professionals situated in global zones. Combining traditional sound pedagogy with modern interaction tools.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <button 
              onClick={() => {
                setBookingType("trial");
                setBookingOpen(true);
              }}
              className="group relative px-8 py-4 bg-[#C8EB5F] text-black text-xs font-mono font-bold uppercase tracking-widest rounded-full overflow-hidden transition-all duration-300 w-full sm:w-auto hover:bg-white hover:scale-105 cursor-pointer shadow-lg shadow-[#C8EB5F]/5"
            >
              Book Free Session
            </button>
            <Link 
              href="/courses/tajweed-course" 
              className="px-8 py-4 bg-transparent border border-white/10 text-white text-xs font-mono font-bold uppercase tracking-widest rounded-full hover:bg-white/5 transition-all duration-300 w-full sm:w-auto backdrop-blur-sm shadow-sm"
            >
              Explore Course Syllabus
            </Link>
          </div>

        </div>
      </section>

      {/* Luxury Stats Board Section */}
      <section className="border-y border-white/5 bg-zinc-950/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-x divide-white/5">
            <div className="space-y-2">
              <h3 className="text-3xl sm:text-4xl font-serif font-light text-white">35+</h3>
              <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-mono">Ijazah Certified Scholars</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl sm:text-4xl font-serif font-light text-white">4.9/5</h3>
              <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-mono">Parent satisfaction index</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl sm:text-4xl font-serif font-light text-white">25k+</h3>
              <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-mono">Interactive Classes completed</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl sm:text-4xl font-serif font-light text-white">100%</h3>
              <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-mono">Timezone Adaptability rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* SEO rich Section mapping user requests for elite educational standards */}
      <section className="py-24 relative overflow-hidden border-b border-white/5">
        <div className="max-w-5xl mx-auto px-6 space-y-16">
          
          <div className="flex flex-col md:flex-row gap-8 items-start justify-between">
            <div className="max-w-lg space-y-4">
              <span className="text-[10px] tracking-[0.25em] font-mono text-[#C8EB5F] uppercase block">
                AUTHENTIC RECITATION SCIENCE
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif font-light text-white uppercase tracking-tight leading-none">
                Bridging Generations with Sound Pedagogy
              </h2>
            </div>
            <div className="max-w-md h-px bg-white/10 flex-1 self-center hidden md:block" />
            <span className="text-xs font-mono text-neutral-500 uppercase self-end">
              Est. 2021 Academy Standards
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
            <div className="space-y-4">
              <h3 className="text-lg font-mono text-[#C8EB5F] uppercase flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#C8EB5F]" />
                Personalized Premium Online Quran Academy
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 font-light font-sans leading-relaxed">
                Tajweedpage was launched to solve a pressing challenge for modern Muslim homes: accessing ijazah-bearing teachers who understand pedagogy, modern interactive software, and standard English/European workflows. Rather than static video lectures, our personalized virtual rooms make student-teacher interactions tactile, immediate, and deep. Our curriculum goes beyond memorization to build phonetic precision in classics phonology.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-mono text-[#C8EB5F] uppercase flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#C8EB5F]" />
                Certified Ijazah Tajweed Teachers for Adults
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 font-light font-sans leading-relaxed">
                Learning as an adult demands specific structured tracks, flexible lesson triggers, and severe patience. Our expert tutors carry premium licenses (Ijazah) passed down directly. We map a step-by-step progress framework focusing on makhārij, pausing protocols, and sound Arabic breath parameters so you read with elegant confidence without feeling overwhelmed.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
            <div className="space-y-4">
              <h3 className="text-lg font-mono text-[#C8EB5F] uppercase flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#C8EB5F]" />
                Flexible Online Quran Recitation Mentors
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 font-light font-sans leading-relaxed">
                We accommodate erratic professional shift logs, academic duties, and parenting schedules easily. Simply select premium timing slots mapped directly to your local clock intervals. With customized logbooks and session logs, you won't miss steps even if your schedules shift. This remains a highly targeted low-competition service built for modern global lifestyles.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-mono text-[#C8EB5F] uppercase flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#C8EB5F]" />
                Customized Quranic Articulation for Multi-Zonal Families
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 font-light font-sans leading-relaxed">
                To guarantee sound alignment, we verify our course materials with classical Quranic articulation standards. Every tutor undergoes continuous pedagogical monitoring to maintain professional speech quality. We reject bulk matching shortcuts and ensure each client family secures a dedicated, caring scholar who feels like an authentic extensions of home.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Transparent Policies / Unique Value Matrix */}
      <section className="py-24 relative bg-zinc-950/20 md:py-32 border-b border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-12">
          
          <div className="space-y-4">
            <span className="text-[10px] tracking-[0.3em] font-mono text-[#C8EB5F] uppercase block">
              OUR GUIDING FRAMEWORK
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-light text-white uppercase tracking-tight">
              A commitment to honesty, clarity, and excellence
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto leading-relaxed">
              We stand apart from generic automated platforms. Our policies protect families, support scholars justly, and establish true transparent operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left pt-6">
            <div className="p-8 rounded-2xl bg-zinc-900/50 border border-white/5 hover:border-[#C8EB5F]/20 transition-colors space-y-4">
              <ShieldCheck className="text-[#C8EB5F]" size={28} />
              <h4 className="text-white font-serif text-lg font-light uppercase">Transparent Billing</h4>
              <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                Clear monthly subscription rates with zero hidden server maintenance fees or interactive software charges. Clear invoicing with immediate helpdesk support.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-zinc-900/50 border border-white/5 hover:border-[#C8EB5F]/20 transition-colors space-y-4">
              <Award className="text-[#C8EB5F]" size={28} />
              <h4 className="text-white font-serif text-lg font-light uppercase">40% Retention Rule</h4>
              <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                If schedules do not align and you request a structured package cancellation, we process 40% retention of pending slots ensuring safety for instructors.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-zinc-900/50 border border-white/5 hover:border-[#C8EB5F]/20 transition-colors space-y-4">
              <Users className="text-[#C8EB5F]" size={28} />
              <h4 className="text-white font-serif text-lg font-light uppercase">Strict Female Scholar Slots</h4>
              <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                Daughters, mothers, and young sisters learn with optimal privacy under certified, dedicated female instructors matching complete comfort goals.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* CTA / Contact Section with WhatsApp & Mail actions */}
      <section className="py-24 border-b border-white/5 bg-gradient-to-b from-[#050505] via-zinc-950/50 to-[#050505] relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8 relative z-10">
          <h2 className="text-4xl sm:text-6xl font-serif font-light text-white uppercase tracking-tight">
            Schedule a Dedicated Intake Dialogue
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto leading-relaxed font-sans">
            Ready to secure structured live mentorship? Our academy specialists are situated online to customize the ideal timing parameters for you and your family. Reach out instantly.
          </p>

          <div className="space-y-4 max-w-xl mx-auto pt-6">
            <div className="p-6 sm:p-8 bg-zinc-950/80 border border-white/10 rounded-3xl hover:border-[#C8EB5F]/30 transition-all duration-500 group relative">
              <span className="block text-[9px] tracking-[0.2em] text-[#C8EB5F] uppercase font-mono mb-2">DIALOGUE VIA EMAIL</span>
              <a href="mailto:abuqitmirshirazalmadani@gmail.com" className="text-lg sm:text-2xl font-light font-serif text-white group-hover:text-[#C8EB5F] transition-colors break-all">
                abuqitmirshirazalmadani@gmail.com
              </a>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:abuqitmirshirazalmadani@gmail.com" 
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black font-mono text-[11px] font-bold uppercase tracking-widest rounded-full hover:bg-neutral-200 transition-all w-full sm:w-auto"
              >
                <Mail size={16} />
                Send Email
              </a>
              <a 
                href="https://wa.me/923708201211?text=Asalamu%20Alaikum,%20I%20am%20interested%20in%20taking%20Tajweed%2520online%2520classes%2520with%2520Tajweedpage." 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#25D366] text-white font-mono text-[11px] font-bold uppercase tracking-widest rounded-full hover:bg-emerald-500 transition-all w-full sm:w-auto shadow-lg shadow-[#25D366]/5"
              >
                <MessageSquare size={16} />
                WhatsApp Intake
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      

      {/* Floating Widget actions (WhatsApp with pulse ripple effect and Email widget) */}
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
          <span className="absolute right-16 bg-white text-black text-[10px] font-bold px-3 py-2 rounded-lg opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-305 whitespace-nowrap shadow-xl flex items-center gap-2">
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
                <p className="text-xs text-neutral-400 font-light">
                  Learn live, one-on-one over Zoom or Teams with a qualified certified scholar.
                </p>
              </div>

              {formSubmitted ? (
                <div className="bg-[#C8EB5F]/10 border border-[#C8EB5F]/30 p-6 rounded-2xl text-center space-y-4">
                  <CheckCircle2 className="text-[#C8EB5F] mx-auto animate-bounce" size={32} />
                  <h4 className="text-white font-serif text-lg">Inquiry Confirmed</h4>
                  <p className="text-neutral-400 text-xs font-light leading-relaxed">
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
