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
  Sparkles,
  HelpCircle,
  MessageSquare,
  Volume2
} from "lucide-react";

export default function FreeTrialPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [wordDropdownOpen, setWordDropdownOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingType, setBookingType] = useState<"trial" | "demo">("trial");
  const [loading, setLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Interactive Form State variables
  const [fullName, setFullName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [whatsappNum, setWhatsappNum] = useState("");
  const [timingPref, setTimingPref] = useState("Morning Slots (6:00 AM - 11:00 AM)");
  const [studentCategory, setStudentCategory] = useState("Child Learning");

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

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setFormSubmitted(true);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-neutral-300 font-sans antialiased selection:bg-[#C8EB5F] selection:text-black overflow-x-hidden relative">
      
      {/* Background spotlights & luxury glowing gradient rings */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[15%] w-[500px] h-[500px] bg-[#C8EB5F]/5 rounded-full blur-[130px]" />
        <div className="absolute top-[40%] right-[5%] w-[450px] h-[450px] bg-emerald-950/20 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[550px] h-[550px] bg-[#C8EB5F]/5 rounded-full blur-[130px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]" />
      </div>

      {/* Navigation Header - Matches other pages, hides Contact/Pricing/About/FreeTrial from main bar to reduce visual clutter */}
      <NavigationHeader onTrialClick={() => { setBookingType("trial"); setBookingOpen(true); }} currentPage="free-trial" />
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
                  <Link href="/quran-in-the-world" className="block px-4 py-3 text-[10px] tracking-wider font-mono text-neutral-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-semibold">
                    All Global Timings
                  </Link>
                </div>
              </div>
            </div>
          </nav>

          {/* CTA Link - Triggers Modal or redirects directly to the form on this page */}
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
      <section className="relative pt-36 pb-16 px-6 sm:px-12 max-w-7xl mx-auto z-10 text-center">
        <div className="space-y-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[8px] sm:text-[9px] uppercase tracking-[0.25em] text-[#C8EB5F] font-mono select-none">
            <Sparkles size={11} className="text-[#C8EB5F] animate-spin" />
            ZERO-COST INITIATORY AUDITION
          </div>
          
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-light text-white uppercase tracking-tight leading-none">
            Request a Free One-on-One <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-500 to-white italic font-normal">
              Recitation Diagnostic.
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-neutral-400 font-light max-w-2xl mx-auto leading-relaxed pt-2">
            Claim a complimentary interactive live session with a native Ijazah certified scholar. Test our virtual classrooms, assess phonetic alignment, and structure custom schedules with zero initial liabilities.
          </p>
        </div>
      </section>

      {/* Main Interactive Form Column Layout */}
      <section className="max-w-7xl mx-auto px-6 pb-32 z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Left Column: Rich SEO Contextual Content to preserve semantic authority and prevent Keyword Cannibalization */}
          <div className="lg:col-span-5 space-y-10 text-left">
            <div className="space-y-6">
              <span className="text-[10px] tracking-[0.25em] font-mono text-[#C8EB5F] uppercase block bg-gradient-to-r from-[#C8EB5F]/10 to-transparent p-2 rounded-lg border-l-2 border-[#C8EB5F] select-none">
                RISK-FREE RECITATION AUDITING
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif font-light text-white uppercase tracking-tight">
                No-Obligation Virtual Assessment Milestones
              </h2>
              
              {/* Rich SEO Content focusing on high semantic relevancy of Tajweedpage consultation queries without duplicating other course terms */}
              <div className="text-xs sm:text-sm text-neutral-400 font-light font-sans space-y-5 leading-relaxed">
                <p>
                  Taking steps to perfect your classical recitation shouldn't involve financial barriers. Our specialized <strong>no-obligation virtual Quran class trial</strong> acts as a tactile diagnostic session rather than a simple automated evaluation. During your live introductory pass, you will meet directly with an elite scholar to evaluate vocal makhārij, pacing protocols, and proper stopping boundaries.
                </p>
                <p>
                  To protect content boundaries and avoid duplicate ranking search triggers across our platform, our <strong>complimentary live auditing passes</strong> are engineered strictly as interactive introductory classes. This distinct structure separates our trial registrations from general course syllabus lists, general fee plans, or timezone guides, keeping your ranking intent pure and pristine.
                </p>
                <p>
                  No payment details are required to secure your complimentary seat. Simply indicate student categories, desired daily timing preferences, and WhatsApp coordinates using our high-fidelity forms. An administrator situated in your local timezone will coordinate with you dynamically over mobile messaging or email within 2 hours.
                </p>
              </div>
            </div>

            {/* Structured Value Checklist Grid */}
            <div className="space-y-4 pt-4 border-t border-white/5">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#C8EB5F] shrink-0">
                  <CheckCircle2 size={16} />
                </div>
                <div>
                  <h4 className="text-white text-xs font-mono tracking-widest uppercase">Certified Native Arab Tutors</h4>
                  <p className="text-[11px] text-neutral-400 font-light font-sans mt-0.5">Learn direct speech precision passed down sequentially from verified chains.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#C8EB5F] shrink-0">
                  <CheckCircle2 size={16} />
                </div>
                <div>
                  <h4 className="text-white text-xs font-mono tracking-widest uppercase">Female Instructor Availability</h4>
                  <p className="text-[11px] text-neutral-400 font-light font-sans mt-0.5">Optimal privacy settings for girls, children, and sisters requesting female scholars.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#C8EB5F] shrink-0">
                  <CheckCircle2 size={16} />
                </div>
                <div>
                  <h4 className="text-white text-xs font-mono tracking-widest uppercase">No Payment Card Requested</h4>
                  <p className="text-[11px] text-neutral-400 font-light font-sans mt-0.5">Experience authentic, uncompromised virtual classrooms prior to investing in plans.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 border-r border-white/5 hidden lg:block" />

          {/* Right Column: Premium Form Container */}
          <div className="lg:col-span-6 text-left">
            <div className="p-8 sm:p-10 rounded-[36px] bg-zinc-950 border border-white/10 hover:border-[#C8EB5F]/20 transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative">
              <div className="absolute top-4 right-4 text-[8px] sm:text-[9px] font-mono text-[#C8EB5F] tracking-widest flex items-center gap-1.5 uppercase select-none">
                <span className="h-1.5 w-1.5 bg-[#C8EB5F] rounded-full animate-ping" />
                ACTIVE INTAKE APERITUR
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl text-white uppercase leading-none mb-1">
                Trial Seating Form
              </h3>
              <p className="text-xs text-neutral-400 font-sans leading-relaxed mb-6">
                Fill the fields below to instantly trigger a personalized placement session.
              </p>

              {formSubmitted ? (
                <div className="bg-[#C8EB5F]/10 border border-[#C8EB5F]/30 p-8 rounded-2xl text-center space-y-4">
                  <CheckCircle2 className="text-[#C8EB5F] mx-auto animate-bounce" size={40} />
                  <h4 className="text-white font-serif text-xl uppercase tracking-wide">Complimentary Seat Reserved</h4>
                  <p className="text-neutral-400 text-xs font-light leading-relaxed max-w-sm mx-auto font-sans">
                    Success! We have secured a specialized trial pass for <strong>{fullName}</strong>. A diagnostic coordinator has logged your category (<em>{studentCategory}</em>) and will confirm your meeting slot over WhatsApp number <strong>{whatsappNum}</strong> within 2 hours.
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="mt-2 text-xs font-mono text-[#C8EB5F] uppercase tracking-widest hover:underline cursor-pointer"
                  >
                    Adjust form information
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-5">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] tracking-widest font-mono text-neutral-400 uppercase block">Student Name</label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Salim Al-Azhari"
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3.5 text-xs text-white focus:outline-none focus:border-[#C8EB5F] transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] tracking-widest font-mono text-neutral-400 uppercase block">Academy Category</label>
                      <select 
                        value={studentCategory}
                        onChange={(e) => setStudentCategory(e.target.value)}
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3.5 text-xs text-neutral-300 focus:outline-none focus:border-[#C8EB5F]"
                      >
                        <option>Child Learning (Age 5 - 14)</option>
                        <option>Adult Tajweed Course (Men)</option>
                        <option>Adult Female Scholars Track</option>
                        <option>Classical Hifz Program</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] tracking-widest font-mono text-neutral-400 uppercase block">Contact Mail Address</label>
                    <input
                      type="email"
                      required
                      value={emailAddress}
                      onChange={(e) => setEmailAddress(e.target.value)}
                      placeholder="e.g. salim@example.com"
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3.5 text-xs text-white focus:outline-none focus:border-[#C8EB5F] transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] tracking-widest font-mono text-neutral-400 uppercase block">WhatsApp Messenger Number</label>
                    <input
                      type="tel"
                      required
                      value={whatsappNum}
                      onChange={(e) => setWhatsappNum(e.target.value)}
                      placeholder="e.g. +49 (176) 1234 5678"
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3.5 text-xs text-white focus:outline-none focus:border-[#C8EB5F] transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] tracking-widest font-mono text-neutral-400 uppercase block">Preferred Timeframe Range</label>
                    <select 
                      value={timingPref}
                      onChange={(e) => setTimingPref(e.target.value)}
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3.5 text-xs text-neutral-300 focus:outline-none focus:border-[#C8EB5F]"
                    >
                      <option>Morning Slots (6:00 AM - 11:00 AM)</option>
                      <option>Afternoon Slots (12:00 PM - 4:00 PM)</option>
                      <option>Evening Slots (5:00 PM - 10:00 PM)</option>
                    </select>
                  </div>

                  <div className="bg-emerald-400/5 border border-emerald-400/15 p-4 rounded-xl">
                    <p className="text-[10px] text-neutral-450 leading-relaxed font-sans">
                      Our live sessions take place dynamically over Zoom/Teams. No software licenses or payment accounts are required from prospective scholars.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#C8EB5F] p-4 text-black text-[11px] tracking-widest font-mono uppercase font-bold text-center mt-2 shadow-[0_4px_25px_rgba(200,235,95,0.15)] cursor-pointer hover:bg-white hover:scale-102 transition-all rounded-full"
                  >
                    {loading ? "PROCESSING RESERVATION..." : "SECURE COMMODIOUS TRIAL ACCORD"}
                  </button>

                </form>
              )}

            </div>
          </div>

        </div>
      </section>

      {/* Footer Block with new Free Trial Link inserted gracefully at the end */}
      

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-4 items-end">
        
        {/* Email Floating Button */}
        <a 
          href="mailto:abuqitmirshirazalmadani@gmail.com?subject=Tajweedpage%20Quran%2520Lessons%2520Inquiry" 
          className="group relative flex items-center justify-center w-14 h-14 bg-neutral-900 text-white rounded-full border border-white/10 shadow-lg hover:bg-[#C8EB5F] hover:text-black hover:scale-110 transition-all duration-300"
        >
          <span className="absolute right-16 bg-white text-black text-[10px] font-bold px-3 py-2 rounded-lg opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-305 whitespace-nowrap shadow-xl flex items-center gap-2">
            Send Email
            <div className="absolute top-1/2 -right-1 -mt-1 w-2 h-2 bg-white rotate-45" />
          </span>
          <Mail size={22} className="text-[#C8EB5F] group-hover:text-black" />
        </a>

        {/* WhatsApp Floating Button */}
        <a 
          href="https://wa.me/923708201211?text=Asalamu%20Alaikum,%20I%20am%20interested%20in%20taking%20Tajweed%20online%20classes%20with%20Tajweedpage." 
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

              {/* Direct Instant Booking Channels */}
              <div className="grid grid-cols-2 gap-3 mb-6 p-4 bg-zinc-900/60 rounded-2xl border border-white/5">
                <a 
                  href="https://wa.me/923708201211?text=Asalamu%20Alaikum,%20I%252520am%252520interested%25252520in%25252520taking%25252520Tajweed%25252520online%25252520classes%25252520with%25252520Tajweedpage."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center p-3.5 bg-[#C8EB5F] hover:bg-white text-black text-center transition-all duration-300 rounded-xl"
                >
                  <span className="text-[10px] font-mono tracking-wider font-extrabold uppercase">WhatsApp Admin</span>
                  <span className="text-[9px] font-mono opacity-80 mt-0.5">+923708201211</span>
                </a>
                <a 
                  href="mailto:abuqitmirshirazalmadani@gmail.com?subject=Tajweedpage%20Quran%2520Classes%2520Inquiry"
                  className="flex flex-col items-center justify-center p-3.5 bg-zinc-950 hover:bg-zinc-900 text-white border border-white/10 text-center transition-all duration-300 rounded-xl"
                >
                  <span className="text-[10px] font-mono tracking-wider font-bold uppercase text-[#C8EB5F]">Direct Email</span>
                  <span className="text-[8px] font-mono opacity-85 mt-0.5 truncate w-full">abuqitmirshirazalmadani@gmail.com</span>
                </a>
              </div>

              <div className="relative flex py-2 items-center mb-4">
                <div className="flex-grow border-t border-white/5"></div>
                <span className="flex-shrink mx-4 text-[9px] font-mono text-neutral-500 uppercase tracking-widest">or fill reservation form</span>
                <div className="flex-grow border-t border-white/5"></div>
              </div>

              {formSubmitted ? (
                <div className="bg-[#C8EB5F]/10 border border-[#C8EB5F]/30 p-6 rounded-2xl text-center space-y-4">
                  <CheckCircle2 className="text-[#C8EB5F] mx-auto animate-bounce animate-pulse-slow" size={32} />
                  <h4 className="text-white font-serif text-lg">Inquiry Confirmed</h4>
                  <p className="text-neutral-404 text-xs font-light leading-relaxed font-sans">
                    Success! A coordinator situated inside your specific timezone will contact you over WhatsApp/Email within 2 hours to confirm your scheduled slot.
                  </p>
                  
                  <div className="flex flex-col gap-2 pt-2">
                    <a 
                      href="https://wa.me/923708201211?text=Asalamu%20Alaikum,%20I%20have%20just%20submitted%20a%20booking%20request%20on%20Tajweedpage."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#C8EB5F] text-black font-mono text-[10px] tracking-widest font-bold py-2.5 rounded-lg hover:bg-white text-center transition-colors"
                    >
                      Instant WhatsApp Follow-up
                    </a>
                    <a 
                      href="mailto:abuqitmirshirazalmadani@gmail.com?subject=Tajweedpage%20Form%2520Submission"
                      className="bg-zinc-900 text-white border border-white/10 font-mono text-[10px] tracking-widest py-2.5 rounded-lg hover:bg-zinc-805 text-center transition-colors"
                    >
                      Email: abuqitmirshirazalmadani@gmail.com
                    </a>
                  </div>

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
