"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { NavigationHeader } from "@/components/ui/navigation-header";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { PremiumMarquee } from "@/components/ui/premium-marquee";
import { 
  CheckCircle2, 
  ChevronDown, 
  Menu, 
  X,
  Mail,
  Heart,
  Calendar,
  Sparkles,
  BookOpen,
  UserCheck,
  ShieldCheck,
  Lock,
  MessageSquare
} from "lucide-react";

export default function FemaleQuranTeacherOnlinePage() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingType, setBookingType] = useState<"trial" | "demo">("trial");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [courseDropdownOpen, setCourseDropdownOpen] = useState(false);
  const [wordDropdownOpen, setWordDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#050505] text-neutral-300 font-sans antialiased selection:bg-[#C8EB5F] selection:text-black overflow-x-hidden relative">
      
      {/* Background spotlights & luxury glowing gradient rings */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[10%] w-[500px] h-[500px] bg-[#C8EB5F]/5 rounded-full blur-[130px]" />
        <div className="absolute top-[40%] right-[10%] w-[450px] h-[450px] bg-emerald-950/20 rounded-full blur-[140px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]" />
      </div>

      {/* Navigation Header */}
      <NavigationHeader onTrialClick={() => { setBookingType("trial"); setBookingOpen(true); }} />
      <header className="hidden">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          
          {/* Logo with horizontal visual lines */}
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

          {/* Nav Links with courses and world targets */}
          <nav className="hidden md:flex items-center gap-8 text-[11px] font-mono tracking-widest text-[#eeeeee]">
            {/* Courses Dropdown */}
            <div 
              className="relative group py-2"
              onMouseEnter={() => setCourseDropdownOpen(true)}
              onMouseLeave={() => setCourseDropdownOpen(false)}
            >
              <button className="flex items-center gap-1 hover:text-[#C8EB5F] transition-colors duration-305 outline-none cursor-pointer">
                <span className="text-[#C8EB5F] font-bold uppercase tracking-widest">COURSES</span>
                <ChevronDown size={11} className={cn("transition-transform duration-350 text-[#C8EB5F]", courseDropdownOpen ? "rotate-180" : "")} />
              </button>
              
              <div className={cn(
                "absolute top-full left-1/2 -translate-x-1/2 pt-2 w-72 transition-all duration-300 z-50",
                courseDropdownOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2 pointer-events-none"
              )}>
                <div className="bg-neutral-950 border border-white/10 rounded-2xl p-2.5 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
                                    <Link href="/courses/tajweed-course" className="block px-4 py-2.5 text-[10px] tracking-wider font-mono text-neutral-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
                    Tajweed Course Master Series
                  </Link>
                  <div className="h-px bg-white/5 my-1" />
<Link href="/courses/female-quran-teacher-online" className="block px-4 py-2.5 text-[10px] tracking-wider font-mono text-[#C8EB5F] hover:bg-white/5 rounded-xl transition-colors font-bold">
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
                  <Link href="/courses/beginner-quran-classes-online" className="block px-4 py-2.5 text-[10px] tracking-wider font-mono text-neutral-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
                    Beginner Quran Classes
                  </Link>
                </div>
              </div>
            </div>

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
                "absolute top-full left-1/2 -translate-x-1/2 pt-2 w-56 transition-all duration-300 z-50",
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
                  <Link href="/quran-in-the-world" className="block px-4 py-3 text-[10px] tracking-wider font-mono text-neutral-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-semibold">
                    All Global Timings
                  </Link>
                </div>
              </div>
            </div>
          </nav>

          {/* CTA Link */}
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
            className="fixed inset-0 bg-black/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-4 border-b border-[#C8EB5F]/20 pt-16 overflow-y-auto"
          >
            <Link 
              href="/courses/female-quran-teacher-online" 
              className="text-base tracking-widest uppercase text-[#C8EB5F] font-serif font-semibold"
              onClick={() => setMobileMenuOpen(false)}
            >
              Female Quran Teacher Online
            </Link>
            <Link 
              href="/courses/online-noorani-qaida-classes" 
              className="text-sm tracking-widest uppercase text-white hover:text-[#C8EB5F] transition-colors font-serif font-light"
              onClick={() => setMobileMenuOpen(false)}
            >
              Noorani Qaida Classes
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
              Reading Classes
            </Link>
            <Link 
              href="/courses/islamic-studies-classes-for-kids" 
              className="text-sm tracking-widest uppercase text-white hover:text-[#C8EB5F] transition-colors font-serif font-light"
              onClick={() => setMobileMenuOpen(false)}
            >
              Islamic Studies for Kids
            </Link>
            <Link 
              href="/courses/beginner-quran-classes-online" 
              className="text-sm tracking-widest uppercase text-white hover:text-[#C8EB5F] transition-colors font-serif font-light"
              onClick={() => setMobileMenuOpen(false)}
            >
              Beginners Course
            </Link>
            <div className="w-1/2 h-px bg-white/10 my-1" />
            <Link 
              href="/courses/tajweed-course" 
              className="text-sm tracking-widest uppercase text-neutral-400 hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              Tajweed Syllabus
            </Link>
            <Link 
              href="/quran-classes-for-kids" 
              className="text-sm tracking-widest uppercase text-neutral-400 hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              Kids Classes
            </Link>

            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                setBookingType("trial");
                setBookingOpen(true);
              }}
              className="bg-[#C8EB5F] text-black text-xs font-bold font-mono tracking-widest uppercase px-8 py-3.5 rounded-full mt-2 cursor-pointer"
            >
              FREE TRIAL CLASS
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cinematic Hero Section */}
      <section className="relative pt-36 pb-16 px-6 sm:px-12 max-w-7xl mx-auto z-10 text-center">
        <div className="space-y-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#C8EB5F]/20 bg-[#C8EB5F]/5 px-4 py-1.5 text-[8px] sm:text-[9px] uppercase tracking-[0.25em] text-[#C8EB5F] font-mono select-none">
            <Heart size={11} className="text-[#C8EB5F] animate-pulse" />
            SISTER-TO-SISTER COGNIZANCE & SHIELDED ENCLAVES
          </div>
          
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-light text-white uppercase tracking-tight leading-none">
            One-on-One Secure <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-500 to-white italic font-normal">
              Female Quran Tutors.
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-neutral-400 font-light max-w-xl mx-auto leading-relaxed pt-2 font-sans">
            A sanctuary of classical learning. Guided by native Arabic-speaking female scholars holding certified Ijazah credentials, customized exclusively for sisters, girls, and young boys globally.
          </p>

          <div className="pt-6 flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => {
                setBookingType("trial");
                setBookingOpen(true);
              }}
              className="bg-[#C8EB5F] text-black hover:bg-white text-xs font-mono font-bold tracking-widest px-8 py-4 rounded-full uppercase transition-colors shadow-lg cursor-pointer"
            >
              BOOK SECURE TRIAL
            </button>
            <Link 
              href="/teacher-profiles"
              className="border border-white/10 hover:border-[#C8EB5F]/50 text-white text-xs font-mono font-bold tracking-widest px-8 py-4 rounded-full uppercase transition-colors"
            >
              MEET OUR SCHOLARS
            </Link>
          </div>
        </div>
      </section>

      <PremiumMarquee 
        items={[
          "Madinah-Certified Female Quran Teachers",
          "Dedicated Online Quran Classes For Sisters",
          "Safe One-On-One Recitation Spaces",
          "Ideal For Girls, Sister Reverts, & Kids",
          "Highly Qualified Alimah & Ijazah Female Scholars",
          "Complete Privacy & Empathetic Islamic Atmosphere"
        ]}
        speed="80s"
        variant="brand"
      />

      {/* Luxury Cinematic Detail Reveal Panel & Dedicated Copy (SEO Focused > 500 characters) */}
      <section className="max-w-4xl mx-auto px-6 pb-32 z-10 relative text-left">
        <div className="p-8 sm:p-12 rounded-[36px] bg-zinc-950 border border-white/10 space-y-10 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
          
          {/* Architectural Statement */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <ShieldCheck className="text-[#C8EB5F]" size={18} />
              <h2 className="text-lg sm:text-xl font-serif font-light tracking-wide text-white uppercase">Safe Recitation Spaces for Sisters</h2>
            </div>
            <p className="text-xs sm:text-sm text-neutral-400 font-light font-sans leading-relaxed">
              Our <strong>"female Quran teacher online"</strong> service prioritizes spiritual comfort, correct phonetic articulation, and secure visual/audio environments. In providing customized classes, we address specialized search needs for a **native Arabic female tajweed teacher** who deeply understands the traditional rules of recitation. All sessions remain structured around a safe, student-focused schedule where women and kids can learn confidently under the strict guidance of certified teachers from Egypt and Jordan.
            </p>
          </div>

          <div className="h-px bg-white/5" />

          {/* Pedagogy Spec */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs sm:text-sm">
            <div className="space-y-3">
              <span className="font-mono text-[10px] text-[#C8EB5F] tracking-widest font-bold block uppercase">AUTHENTIC PEDAGOGY</span>
              <h3 className="font-serif text-lg text-white font-light uppercase">No Compromise on Phonetics</h3>
              <p className="text-neutral-400 font-light font-sans leading-relaxed">
                Native female instructors with registered Sanad degrees evaluate your articulation points (Makharij). This direct modeling builds standard phonetic muscle memory instantly for kids and sisters without systemic barriers.
              </p>
            </div>
            <div className="space-y-3">
              <span className="font-mono text-[10px] text-[#C8EB5F] tracking-widest font-bold block uppercase font-serif">DYNAMIC LOGGING</span>
              <h3 className="font-serif text-lg text-white font-light uppercase">Sisterhood & Confidence</h3>
              <p className="text-neutral-400 font-light font-sans leading-relaxed">
                We believe recitation flows from peaceful focus. Our customized learning management systems let sisters track weekly progress charts privately without exposing individual contact details or personal logbooks.
              </p>
            </div>
          </div>

          <div className="h-px bg-white/5" />

          {/* Callout benefits */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg text-white font-light uppercase text-center">Standard Enrollment Prerequisite Perks</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono tracking-wider">
              <div className="p-4 bg-black/60 border border-white/5 rounded-2xl flex items-center gap-2.5">
                <CheckCircle2 size={14} className="text-[#C8EB5F] flex-shrink-0" />
                <span>100% Female Scholars Only</span>
              </div>
              <div className="p-4 bg-black/60 border border-white/5 rounded-2xl flex items-center gap-2.5">
                <CheckCircle2 size={14} className="text-[#C8EB5F] flex-shrink-0" />
                <span>Private Live Zoom Feeds</span>
              </div>
              <div className="p-4 bg-black/60 border border-white/5 rounded-2xl flex items-center gap-2.5">
                <CheckCircle2 size={14} className="text-[#C8EB5F] flex-shrink-0" />
                <span>Custom Arabic Dialects</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      <PremiumMarquee 
        items={[
          "Easy Quran Lessons For Beginners",
          "Affordable Online Quran Tutor Support",
          "One-On-One Tajweed Classes Online",
          "Learn Quran Step By Step Comfortably",
          "Flexible Schedules Tailored For Busy Sisters & Families"
        ]}
        speed="100s"
        variant="subtle"
      />

      {/* Footer Block */}
      

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-4 items-end">
        
        {/* Email Floating Button */}
        <a 
          href="mailto:hello@abuqitmirlabs.tech" 
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
                  Learn live, one-on-one over Zoom or Teams with a qualified certified scholar.
                </p>
              </div>

              {formSubmitted ? (
                <div className="bg-[#C8EB5F]/10 border border-[#C8EB5F]/30 p-6 rounded-2xl text-center space-y-4">
                  <CheckCircle2 className="text-[#C8EB5F] mx-auto animate-bounce" size={32} />
                  <h4 className="text-white font-serif text-lg">Inquiry Confirmed</h4>
                  <p className="text-neutral-404 text-xs font-light leading-relaxed font-sans">
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
                    <label className="text-[10px] tracking-widest font-mono text-neutral-400 uppercase block mb-1.5">Email Address</label>
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

    </div>
  );
}
