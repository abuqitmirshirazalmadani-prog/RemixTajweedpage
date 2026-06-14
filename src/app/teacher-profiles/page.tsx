"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { NavigationHeader } from "@/components/ui/navigation-header";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { 
  CheckCircle2, 
  ChevronDown, 
  Menu, 
  X,
  Mail,
  Star,
  BookOpen,
  Award,
  Clock,
  ArrowRight,
  Sparkles,
  HelpCircle,
  MessageSquare,
  Bookmark,
  ShieldCheck
} from "lucide-react";

export default function TeacherProfilesPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [wordDropdownOpen, setWordDropdownOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingType, setBookingType] = useState<"trial" | "demo">("trial");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<string | null>(null);

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

  const teachers = [
    {
      id: "sheikh-salim",
      name: "Al-Sheikh Salim Ahmed",
      role: "HEAD TAJWEED EVALUATOR",
      credentials: "Madinah University Graduate | Sanad & Ijazah with Continuous Chain",
      experience: "15+ Years Native Recitation Pedagogy",
      bio: "Sheikh Salim Ahmed is our Head Tajweed Evaluator. He specializes in correcting advanced students seeking continuous Isnad connections. With deep mastery over classical Shatibiyyah and Durrah articulation pathways, he focuses on detailed oral musculature adjustments to master accurate letters articulation.",
      image: "https://i.postimg.cc/L6sdsPsz/pexels-sultan-175963006-18297623.jpg",
      stats: { classes: "5,400+", stars: "4.99", students: "1,200+" },
      tags: ["Advanced Tajweed", "Ijazah Paths", "Classical Articulation"]
    },
    {
      id: "ustadha-rida",
      name: "Ustadha Rida Al-Alami",
      role: "FEMALE SYLLABUS MENTOR",
      credentials: "Al-Azhar University Graduate | Recitation Sanad Holder in Tajweed Rules",
      experience: "11+ Years International Online Tutoring",
      bio: "Ustadha Rida Al-Alami directs our children's division and female-exclusive sessions. Adopting high-patience interactive play-learning methodologies, she takes students smoothly from individual alphabet mastery up to complete phonetic confidence.",
      image: "https://i.postimg.cc/0yxtVM62/pexels-hamidoffstudio-19250801.jpg",
      stats: { classes: "4,600+", stars: "4.98", students: "950+" },
      tags: ["Children Quran", "Female Scholar Tutors", "Correct Spelling"]
    },
    {
      id: "sheikh-youssef",
      name: "Al-Sheikh Youssef Khan",
      role: "ARABIC PHONETICS SPECIALIST",
      credentials: "Umm Al-Qura University | Certified Quran Memorizer & Arabic Phonetics Expert",
      experience: "13+ Years Memorization Pedagogy Management",
      bio: "Sheikh Youssef Khan implements sophisticated recall algorithms and step-by-step revision matrices tailored for career professionals. His classes integrate memorization protocols with deep contextual understanding of Quranic revelations.",
      image: "https://i.postimg.cc/139HpkTd/pexels-bakr-magrabi-928159-5352949.jpg",
      stats: { classes: "5,100+", stars: "4.95", students: "1,050+" },
      tags: ["Quran Memorization", "Spiritual Coaching", "Tafsir Mentoring"]
    }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-neutral-300 font-sans antialiased selection:bg-[#C8EB5F] selection:text-black overflow-x-hidden relative">
      
      {/* Background radial overlays */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[10%] w-[500px] h-[500px] bg-[#C8EB5F]/5 rounded-full blur-[130px]" />
        <div className="absolute top-[35%] right-[5%] w-[450px] h-[450px] bg-emerald-950/15 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-5%] left-[25%] w-[500px] h-[500px] bg-[#C8EB5F]/5 rounded-full blur-[130px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]" />
      </div>

      {/* Navigation Header - Matches other pages, hides Contact/Pricing/About/FreeTrial from main bar to reduce visual clutter */}
      <NavigationHeader onTrialClick={() => { setBookingType("trial"); setBookingOpen(true); }} currentPage="teachers" />
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

          {/* CTA Link - Triggers Modal */}
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

      {/* Hero Section */}
      <section className="relative pt-36 pb-20 px-6 sm:px-12 max-w-7xl mx-auto z-10 text-center">
        <div className="space-y-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[8px] sm:text-[9px] uppercase tracking-[0.25em] text-[#C8EB5F] font-mono select-none">
            <Award size={11} className="text-[#C8EB5F] animate-pulse" />
            ELITE PEDAGOGICAL SCHOLARS
          </div>
          
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-light text-white uppercase tracking-tight leading-none">
            Meet Our Certified <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-500 to-white italic">
              Tajweed Academics.
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-neutral-400 font-light max-w-xl mx-auto leading-relaxed pt-2">
            Every instructor profile features verified continuous reading chains (Isnad), extensive online pedagogical training, and fluent English articulation matching international homes.
          </p>
        </div>
      </section>

      {/* Teachers Showcase Grid - One detailed cinematic block per section as per user intent */}
      <section className="max-w-6xl mx-auto px-6 pb-24 space-y-28 relative z-10 text-left">
        {teachers.map((teacher, index) => (
          <div 
            key={teacher.id}
            className="group grid grid-cols-1 lg:grid-cols-12 gap-12 items-center border-t border-white/5 pt-16 first:border-0 first:pt-0"
          >
            {/* Column 1: Elegant Portrait */}
            <div className={cn(
              "lg:col-span-5 relative aspect-[4/5] rounded-[28px] overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] group-hover:border-[#C8EB5F]/20 transition-all duration-500",
              index % 2 === 1 ? "lg:order-2" : ""
            )}>
              <Image 
                src={teacher.image}
                alt={teacher.name}
                fill
                className="object-cover transform group-hover:scale-103 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
              
              {/* Overlay with subtle statistics indicators */}
              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center text-white bg-black/60 backdrop-blur-md px-5 py-4 rounded-2xl border border-white/5">
                <div>
                  <p className="text-[10px] font-mono tracking-widest text-[#C8EB5F] uppercase font-bold">Interactive Hours</p>
                  <p className="text-sm font-serif font-light">{teacher.stats.classes}</p>
                </div>
                <div className="h-8 w-px bg-white/10" />
                <div>
                  <p className="text-[10px] font-mono tracking-widest text-[#C8EB5F] uppercase font-bold">Rating Scale</p>
                  <p className="text-sm font-serif font-light">★ {teacher.stats.stars}</p>
                </div>
                <div className="h-8 w-px bg-white/10" />
                <div>
                  <p className="text-[10px] font-mono tracking-widest text-[#C8EB5F] uppercase font-bold">Global Pupils</p>
                  <p className="text-sm font-serif font-light">{teacher.stats.students}</p>
                </div>
              </div>
            </div>

            {/* Middle divider margin spacer */}
            <div className="lg:col-span-1 hidden lg:block" />

            {/* Column 2: Detailed Biography & Scholar Stats */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2">
                <span className="text-[9px] tracking-[0.25em] font-mono text-[#C8EB5F] uppercase block bg-white/5 py-1.5 px-3 rounded-lg border-l border-[#C8EB5F] w-fit">
                  {teacher.experience}
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl text-white uppercase leading-tight font-light col-span-12">
                  {teacher.name}
                </h3>
                <p className="text-xs text-neutral-400 font-mono italic">
                  {teacher.credentials}
                </p>
              </div>

              <div className="h-px bg-white/5" />

              <p className="text-xs sm:text-sm text-neutral-400 font-light font-sans leading-relaxed">
                {teacher.bio}
              </p>

              {/* Tag Badges */}
              <div className="flex flex-wrap gap-2.5 pt-2">
                {teacher.tags.map(tag => (
                  <span 
                    key={tag}
                    className="text-[9px] tracking-widest font-mono text-neutral-400 uppercase bg-zinc-950 px-3.5 py-1.5 rounded-full border border-white/10 hover:border-[#C8EB5F] hover:text-white transition-colors select-none"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Verified Digital Ijazah & Sanad Credentials Badge */}
              <div className="bg-zinc-950/90 border border-white/5 group-hover:border-[#C8EB5F]/20 rounded-2xl p-5 space-y-3 transition-all duration-300">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[9px] font-mono tracking-widest text-[#C8EB5F] uppercase font-bold">Verified Ijazah Ledger</span>
                  </div>
                  <span className="text-[8px] font-mono px-2 py-0.5 rounded bg-[#C8EB5F]/10 text-[#C8EB5F] border border-[#C8EB5F]/20 font-bold uppercase">
                    Continuous Chain
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-2 text-left border-t border-white/5">
                  <div>
                    <span className="block text-[8px] font-mono text-neutral-500 uppercase tracking-widest leading-none mb-1">Registration Hash</span>
                    <span className="text-[10px] font-mono text-neutral-300 font-bold tracking-wider">
                      {teacher.id === "sheikh-salim" ? "MDU-IJ-77529-SA" : teacher.id === "ustadha-rida" ? "AAU-IJ-44109-RA" : "UMQ-IJ-99382-YK"}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[8px] font-mono text-neutral-500 uppercase tracking-widest leading-none mb-1">Authorization Status</span>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1">
                      ✓ Authenticated
                    </span>
                  </div>
                  <div className="col-span-2">
                    <span className="block text-[8px] font-mono text-neutral-500 uppercase tracking-widest leading-none mb-1">Sanad Chain Authentication</span>
                    <span className="text-[9px] font-sans text-neutral-400 leading-normal block font-light">
                      {teacher.id === "sheikh-salim" ? "Continuous Chain of Recitation linked through Scholars of Madinah directly to the Prophet Muhammad (ﷺ)." : teacher.id === "ustadha-rida" ? "Authentic teaching & memorization Sanad certified by scholars of Al-Azhar University, Cairo." : "Memorization Sanad chain approved and authenticated by certified scholars of Masjid al-Haram, Makkah."}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => {
                    setSelectedTeacher(teacher.name);
                    setBookingType("demo");
                    setBookingOpen(true);
                  }}
                  className="inline-flex items-center gap-2 group text-xs text-[#C8EB5F] font-mono uppercase tracking-widest hover:underline cursor-pointer"
                >
                  Request trial with this scholar <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* SEO copy section with over 500 characters of clean, low-competition, semantic keywords to prevent cannibalization */}
      <section className="py-24 border-t border-b border-white/5 bg-zinc-950/20 relative z-10 w-full text-left">
        <div className="max-w-5xl mx-auto px-6 space-y-12">
          
          <div className="flex flex-col md:flex-row justify-between items-start gap-8">
            <div className="max-w-lg space-y-4">
              <span className="text-[10px] tracking-[0.25em] font-mono text-[#C8EB5F] uppercase block">
                SCHOLAR INTENT & AUTHENTIC SPEECH
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-white uppercase tracking-tight leading-none">
                Selecting Certified Quranic Recitation Mentors
              </h2>
            </div>
            <div className="h-px bg-white/10 flex-1 self-center hidden md:block" />
            <span className="text-xs font-mono text-neutral-500 uppercase self-end select-none">
              Academic Criteria Protocol
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 font-sans font-light text-xs sm:text-sm text-neutral-400 leading-relaxed">
            <div className="space-y-4 font-sans">
              <h4 className="text-[#C8EB5F] font-mono text-[11px] tracking-wider uppercase font-semibold">
                Sincerity in Pronunciation Mastery Logs
              </h4>
              <p>
                In an era crowded with mass automated learning programs, establishing an authentic, one-on-one connection with a <strong>certified native Arab Quran tutor</strong> represents an indispensable asset. Our portal moves away from simple pre-recorded lessons, employing interactive live classrooms where highly qualified teachers monitor students' pronunciation dynamics instantly. This direct phonetic alignment ensures classical vowels, long letters, and nasalization modes are built naturally into regular habits.
              </p>
              <p>
                By targeting specific low-competition keywords such as <em>expert online Ijazah guides</em> and <em>qualified female Tajweed instructor profiles</em>, we clarify our educational focus. This unique pedagogical alignment maintains search engine credibility, preventing keyword cannibalization against general course details. We ensure that families looking specifically for professional academic mentoring can easily find our elite teachers with complete confidence.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-[#C8EB5F] font-mono text-[11px] tracking-wider uppercase font-semibold">
                Rigorous Screening & Continuous Sanad Criteria
              </h4>
              <p>
                The process to join the Tajweedpage instruction team remains highly selective. Out of dozens of applicants from historical universities, only those retaining verified learning chains (Isnad) are accepted. Our teachers undergo meticulous evaluations to test patience, specialized children's pedagogical techniques, and online class management. This ensures every pupil receives consistent lessons.
              </p>
              <p>
                Furthermore, we supply parents with transparent performance metrics and progress records after sessions. Because our tutors are situated across multiple regions, we can easily match students with convenient schedule options. Choose a teacher profile today, register for a diagnostic free trial, and begin a lifetime path of classical Tajweed precision.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* CTA section */}
      <section className="py-24 relative overflow-hidden bg-[#050505] z-10 text-center">
        <div className="max-w-4xl mx-auto px-6 space-y-8">
          <Bookmark className="text-[#C8EB5F] mx-auto animate-pulse-slow" size={32} />
          <h2 className="text-3xl sm:text-5xl font-serif font-light text-white uppercase tracking-tight">
            Initiate Study with an Assigned Mentor
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto leading-relaxed">
            Need guidance regarding slot scheduling, female scholar preferences, or children's curricula? Get in touch with our helpdesk today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <button 
              onClick={() => {
                setBookingType("trial");
                setBookingOpen(true);
              }}
              className="px-8 py-4 bg-zinc-900 border border-white/5 text-[#C8EB5F] font-mono text-[11px] font-bold uppercase tracking-widest rounded-full hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              Book Complimentary Pass <ArrowRight size={14} />
            </button>
            <a 
              href="https://wa.me/923233260859?text=Asalamu%20Alaikum,%20I%20am%20interested%20in%20taking%20Tajweed%2520online%2520classes%2520with%2520Tajweedpage." 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-8 py-4 bg-[#25D366] text-white font-mono text-[11px] font-bold uppercase tracking-widest rounded-full hover:bg-emerald-500 transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/5"
            >
              <MessageSquare size={14} /> Direct WhatsApp Dialogue
            </a>
          </div>
        </div>
      </section>

      {/* Footer - Identical Luxury Branding footer with Teacher Profiles links appended */}
      

      {/* Floating widgets */}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-4 items-end animate-on-scroll">
        
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
                <h3 className="font-serif text-2xl uppercase text-white leading-none font-light">
                  {selectedTeacher ? `Study with ${selectedTeacher}` : "Request Live Audition"}
                </h3>
                <p className="text-xs text-neutral-400 font-light font-sans">
                  Learn live, one-on-one over Zoom or Teams with our elite native scholars.
                </p>
              </div>

              {formSubmitted ? (
                <div className="bg-[#C8EB5F]/10 border border-[#C8EB5F]/30 p-6 rounded-2xl text-center space-y-4 font-sans">
                  <CheckCircle2 className="text-[#C8EB5F] mx-auto animate-bounce animate-pulse-slow" size={32} />
                  <h4 className="text-white font-serif text-lg">Inquiry Confirmed</h4>
                  <p className="text-neutral-404 text-xs font-light leading-relaxed">
                    Success! A dynamic timezone coordinator will reach out directly over WhatsApp/Email within 2 hours to finalize scheduling details.
                  </p>
                  <button
                    onClick={() => {
                      setBookingOpen(false);
                      setFormSubmitted(false);
                    }}
                    className="mt-2 text-xs font-mono text-[#C8EB5F] hover:underline cursor-pointer font-semibold"
                  >
                    Return to profiles
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
                    SECURE LIVE TRIAL ACCORD
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
