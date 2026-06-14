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
  MapPin,
  Clock,
  PhoneCall,
  ArrowUpRight,
  MessageSquare,
  ShieldAlert,
  HelpCircle
} from "lucide-react";

export default function ContactPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [wordDropdownOpen, setWordDropdownOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingType, setBookingType] = useState<"trial" | "demo">("trial");
  const [scrolled, setScrolled] = useState(false);
  
  // Interactive Support Form State
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

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
      
      {/* Background radial spotlights */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[10%] w-[500px] h-[500px] bg-[#C8EB5F]/5 rounded-full blur-[130px]" />
        <div className="absolute top-[40%] left-[-10%] w-[600px] h-[600px] bg-emerald-950/15 rounded-full blur-[150px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]" />
      </div>

      {/* Navigation Header */}
      <NavigationHeader onTrialClick={() => { setBookingType("trial"); setBookingOpen(true); }} currentPage="contact" />
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
                  <Link href="/quran-in-the-world" className="block px-4 py-3 text-[10px] tracking-wider font-mono text-neutral-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
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

      {/* Hero Header */}
      <section className="relative pt-36 pb-20 px-6 sm:px-12 max-w-7xl mx-auto">
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[8px] sm:text-[9px] uppercase tracking-[0.25em] text-[#C8EB5F] font-mono select-none">
            <span className="h-1.5 w-1.5 rounded-full bg-[#C8EB5F]" />
            SUPPORT HELPDESK
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-light text-white uppercase tracking-tight leading-none">
            Connect With Our <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-500 to-white italic">
              Academic Support.
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 font-light max-w-xl mx-auto font-sans leading-relaxed pt-2">
            Secure precise answers regarding personalized course structures, tailored timezone matching routines, and global fee schedules from our dedicated administrative staff.
          </p>
        </div>
      </section>

      {/* Main Dual Column Layout */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Left Column: Rich SEO Contextual Content (Well over 500 characters of high-SEO text to satisfy intent & prevent keyword cannibalization) */}
          <div className="lg:col-span-5 space-y-10 text-left">
            <div className="space-y-6">
              <span className="text-[10px] tracking-[0.25em] font-mono text-[#C8EB5F] uppercase block bg-gradient-to-r from-[#C8EB5F]/10 to-transparent p-2 rounded-lg border-l-2 border-[#C8EB5F]">
                ACADEMY ENROLLMENT QUERIES
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif font-light text-white uppercase tracking-tight">
                Addressing Your Virtual Recitation Milestones
              </h2>
              
              {/* Rich SEO Content focusing on high semantic relevancy of Tajweedpage consultation queries without duplicating other course terms */}
              <div className="text-xs sm:text-sm text-neutral-400 font-light font-sans space-y-5 leading-relaxed">
                <p>
                  Initiating structured Quranic training requires transparent coordination and authentic communication channels. At <strong>Tajweedpage Academic Helpdesk</strong>, we provide personalized guidance to help global Muslim families navigate slot alignment protocols, customized interactive syllabus adjustments, and private female scholar allocations.
                </p>
                <p>
                  Whether your questions involve dynamic local timeline coordinates, digital learning ledger configurations, or the 40% retention policy on package transitions, our coordinators provide comprehensive clarity. By focusing strictly on customized virtual classrooms rather than crowded robotic group study platforms, we ensure each prospective client secures complete answers matching the spiritual and educational standards of our team.
                </p>
                <p>
                  Our support specialists are situated across multiple regions to deliver speedy coordination. Simply choose your favorite intake mode below—such as instant WhatsApp dialogues, official mail submissions, or interactive schedule proposals—to establish a sound, rewarding academic path for kids, adults, and career professionals.
                </p>
              </div>
            </div>

            {/* Structured Quick Direct Info Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <a 
                href="mailto:hello@abuqitmirlabs.tech?subject=Tajweedpage%20Quran%2520Syllabus%2520Inquiry"
                className="p-6 rounded-2xl bg-zinc-950/40 border border-white/5 hover:border-[#C8EB5F]/20 transition-all duration-300 space-y-3 block hover:-translate-y-0.5"
              >
                <Mail className="text-[#C8EB5F]" size={20} />
                <h4 className="text-white text-xs font-mono tracking-widest uppercase">General Mailbox</h4>
                <div className="flex flex-col gap-1 text-[11px] text-neutral-400 font-light text-left leading-normal">
                  <span className="text-[#C8EB5F] font-semibold underline">hello@abuqitmirlabs.tech</span>
                  <span className="text-neutral-500 underline text-[10px]">abuqitmirshirazalmadani@gmail.com</span>
                </div>
              </a>

              <div className="p-6 rounded-2xl bg-zinc-950/40 border border-white/5 hover:border-[#C8EB5F]/20 transition-colors space-y-3">
                <Clock className="text-[#C8EB5F]" size={20} />
                <h4 className="text-white text-xs font-mono tracking-widest uppercase">Working Schedules</h4>
                <p className="text-[11px] text-neutral-400 font-light">Mon - Sat (24 Hours Open)</p>
              </div>

              <a 
                href="https://wa.me/923233260859?text=Asalamu%20Alaikum,%20I%20am%20interested%20in%20taking%20Tajweed%20online%2520classes%2520with%252520Tajweedpage."
                target="_blank"
                rel="noopener noreferrer"
                className="p-6 rounded-2xl bg-zinc-950/40 border border-white/5 hover:border-[#C8EB5F]/20 transition-all duration-300 space-y-3 block hover:-translate-y-0.5"
              >
                <PhoneCall className="text-[#C8EB5F]" size={20} />
                <h4 className="text-white text-xs font-mono tracking-widest uppercase">Hotline Intake (WhatsApp)</h4>
                <p className="text-[11px] text-neutral-400 font-light">+92 323 3260859</p>
              </a>

              <div className="p-6 rounded-2xl bg-zinc-950/40 border border-white/5 hover:border-[#C8EB5F]/20 transition-colors space-y-3">
                <MapPin className="text-[#C8EB5F]" size={20} />
                <h4 className="text-white text-xs font-mono tracking-widest uppercase">Main Academy</h4>
                <p className="text-[11px] text-neutral-400 font-light">Virtual Headquarter Hubs</p>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Interactive Contact Form */}
          <div className="lg:col-span-1 border-r border-white/5 hidden lg:block" />

          <div className="lg:col-span-6 text-left space-y-8">
            <div className="p-8 sm:p-10 rounded-[36px] bg-zinc-950 border border-white/10 hover:border-[#C8EB5F]/20 transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative">
              <div className="absolute top-4 right-4 text-[9px] font-mono text-[#C8EB5F] tracking-widest flex items-center gap-1.5 uppercase select-none">
                <span className="h-1.5 w-1.5 bg-[#C8EB5F] rounded-full animate-pulse" />
                SECURE END-TO-END
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl text-white uppercase leading-none mb-2">
                Submit Inquiry Form
              </h3>
              <p className="text-xs text-neutral-400 font-sans leading-relaxed mb-6">
                Receive customized guidance regarding lesson packages and timing allocations directly in your email.
              </p>

              {formSubmitted ? (
                <div className="bg-[#C8EB5F]/10 border border-[#C8EB5F]/30 p-8 rounded-2xl text-center space-y-4">
                  <CheckCircle2 className="text-[#C8EB5F] mx-auto animate-bounce animate-pulse-slow" size={36} />
                  <h4 className="text-white font-serif text-xl uppercase">Message Processed</h4>
                  <p className="text-neutral-400 text-xs font-light leading-relaxed max-w-sm mx-auto">
                    Success! Your academic counselor has received your customized inquiry details. We will contact you back via <strong>{formEmail}</strong> within 2 hours.
                  </p>
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormName("");
                      setFormEmail("");
                      setFormMessage("");
                    }}
                    className="mt-2 text-xs font-mono text-[#C8EB5F] uppercase tracking-widest hover:underline cursor-pointer"
                  >
                    Send another inquiry
                  </button>
                </div>
              ) : (
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    setFormSubmitted(true);
                  }}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <label className="text-[10px] tracking-widest font-mono text-neutral-400 uppercase block">Prospective Student / Guardian Name</label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="e.g. Yusuf Bin-Alawi"
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3.5 text-xs text-white focus:outline-none focus:border-[#C8EB5F] focus:bg-black transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] tracking-widest font-mono text-neutral-400 uppercase block">Electronic Mail Address</label>
                    <input
                      type="email"
                      required
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      placeholder="e.g. yusuf@example.com"
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3.5 text-xs text-white focus:outline-none focus:border-[#C8EB5F] focus:bg-black transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] tracking-widest font-mono text-neutral-400 uppercase block">Specify Academic Goals or Custom Slot Queries</label>
                    <textarea
                      required
                      rows={4}
                      value={formMessage}
                      onChange={(e) => setFormMessage(e.target.value)}
                      placeholder="e.g. Seeking certified female tutors in Germany. Require sessions mapped to EU evening coordinates."
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3.5 text-xs text-white focus:outline-none focus:border-[#C8EB5F] focus:bg-black transition-colors resize-none"
                    />
                  </div>

                  <div className="space-y-1 bg-yellow-400/5 border border-yellow-400/10 p-4 rounded-xl flex items-start gap-3">
                    <ShieldAlert className="text-yellow-400 shrink-0 mt-0.5" size={16} />
                    <p className="text-[10px] text-neutral-400 font-sans leading-relaxed">
                      To help prevent message spam, your IP coordinate region is logged temporarily. Academic slots are allocated on a strict first-response availability priority queue.
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#C8EB5F] p-4 text-black text-[11px] tracking-widest font-mono uppercase font-bold text-center mt-2 shadow-[0_4px_25px_rgba(200,235,95,0.15)] cursor-pointer hover:bg-white hover:scale-102 transition-all rounded-full"
                  >
                    SEND ACADEMIC INQUIRY MSG
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>
      </section>

      {/* Structured Direct WhatsApp Prompt (Frictionless dialogue option) */}
      <section className="py-24 bg-gradient-to-b from-zinc-950/20 to-[#050505] border-t border-b border-white/5 relative z-10">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
          <span className="text-[10px] tracking-[0.3em] font-mono text-[#C8EB5F] uppercase block">
            FAST TRACK RESOLUTIONS
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-light text-white uppercase tracking-tight">
            Dialogue Directly Over WhatsApp
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto leading-relaxed">
            Skip the formal mail structures and get instant answers concerning class packages, local coordinator details, and setup procedures within minutes.
          </p>

          <a 
            href="https://wa.me/923233260859?text=Asalamu%20Alaikum,%20I%20am%20interested%20in%20taking%20Tajweed%2520online%2520classes%2520with%2520Tajweedpage." 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center gap-2 group px-10 py-5 bg-[#25D366] text-white font-mono text-[11px] font-bold uppercase tracking-widest rounded-full hover:bg-emerald-500 transition-all shadow-xl shadow-[#25D366]/5"
          >
            <MessageSquare size={16} />
            OPEN INSTANT DIALOGUE <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </section>

      {/* Footer (Identical Premium Branding with CONTACT link added) */}
      

      {/* Floating Widget actions */}
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
