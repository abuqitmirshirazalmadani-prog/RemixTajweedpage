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
  Award,
  Calendar,
  Sparkles,
  BookOpen,
  UserCheck,
  ShieldCheck,
  Zap,
  Bookmark,
  MessageSquare
} from "lucide-react";

export default function OnlineHifzClassesPage() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingType, setBookingType] = useState<"trial" | "demo">("trial");
  const [formSubmitted, setFormSubmitted] = useState(false);

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

      {/* Cinematic Hero Section */}
      <section className="relative pt-36 pb-16 px-6 sm:px-12 max-w-7xl mx-auto z-10 text-center">
        <div className="space-y-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[8px] sm:text-[9px] uppercase tracking-[0.25em] text-[#C8EB5F] font-mono select-none">
            <Bookmark size={11} className="text-[#C8EB5F]" />
            GUIDED MEMORIZATION AND STRUCTURED DAILY RETENTION LOGS
          </div>
          
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-light text-white uppercase tracking-tight leading-none">
            Classical Quranic <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-500 to-white italic font-normal">
              Online Hifz Classes.
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-neutral-400 font-light max-w-xl mx-auto leading-relaxed pt-2 font-sans">
            Store the Divine Revelation in your heart forever. Partner with native Huffaz holding generations-old sanad licenses to track progress without cognitive pressure or fatigue.
          </p>

          <div className="pt-6 flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => {
                setBookingType("trial");
                setBookingOpen(true);
              }}
              className="bg-[#C8EB5F] text-black hover:bg-white text-xs font-mono font-bold tracking-widest px-8 py-4 rounded-full uppercase transition-colors shadow-lg cursor-pointer"
            >
              TALK TO HIFZ COORDINATOR
            </button>
          </div>
        </div>
      </section>

      <PremiumMarquee 
        items={[
          "Online Hifz Program",
          "Quran Memorization Support",
          "Live One-on-One Quran memorization Classes",
          "Track Retention Logs with Certified Native Huffaz",
          "Classical Day-by-Day Hifz Milestones",
          "Madinah-grade Certified Scholar Tutors",
          "Triple Revision Flow: Sabq, Sabqi, and Manzil"
        ]}
        speed="80s"
        variant="brand"
      />

      {/* Dedicated Copy Block - Well SEO written (> 500 characters) to avoid keyword cannibalization */}
      <section className="max-w-4xl mx-auto px-6 pb-32 z-10 relative text-left">
        <div className="p-8 sm:p-12 rounded-[36px] bg-zinc-950 border border-white/10 space-y-10 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
          
          {/* Section 1 */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Zap className="text-[#C8EB5F]" size={18} />
              <h2 className="text-lg sm:text-xl font-serif font-light tracking-wide text-white uppercase">1. Guided Custom Quran Memorization Schedules</h2>
            </div>
            <p className="text-xs sm:text-sm text-neutral-400 font-light font-sans leading-relaxed">
              Our <strong>"online hifz classes"</strong> are built entirely to deliver personal memorization loops tailored directly to an individual's mental and physical pace. Avoiding crowded structures, we center our curricula around semantic search intent like **online Hifz program review & retention logs** and **structured memorization schedules with native Huffaz**. This custom method protects the memory from early deterioration and preserves correct Tajweed rhythm.
            </p>
          </div>

          <div className="h-px bg-white/5" />

          {/* Section 2 */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <UserCheck className="text-[#C8EB5F]" size={18} />
              <h2 className="text-lg sm:text-xl font-serif font-light tracking-wide text-white uppercase">2. Triple Correction Revision System (Sabq/Sabqi/Manzil)</h2>
            </div>
            <p className="text-xs sm:text-sm text-neutral-400 font-light font-sans leading-relaxed">
              We separate our memorization tracks from standard reading classes by enforcing the traditional subcontinental or middle eastern system: Sabq (the new daily verse assignment), Sabqi (recent memorized chapters revised under strict supervision), and Manzil (older parts of the Quran regularly recalled). By reviewing with local native scholars, you stay focused and sharp.
            </p>
          </div>

          <div className="h-px bg-white/5" />

          {/* Section 3 */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <ShieldCheck className="text-[#C8EB5F]" size={18} />
              <h2 className="text-lg sm:text-xl font-serif font-light tracking-wide text-white uppercase">3. Digitally Integrated Review Dashboards</h2>
            </div>
            <p className="text-xs sm:text-sm text-neutral-400 font-light font-sans leading-relaxed">
              Every student enrolled obtains access to a secure live logbook. Through real-time correction reporting, you can easily trace mistake patterns, phonetic errors, and pacing concerns during your review cycles. This provides a clear path to receiving a formal verified Hifz certificate once the final assessment is complete.
            </p>
          </div>

        </div>
      </section>

      <PremiumMarquee 
        items={[
          "Personalized Memorization Schedules",
          "Affordable Online Quran Tutor Accompaniment",
          "Flexible Timings For Students Worldwide",
          "Virtual Quran Classes For Beginners & Advanced Huffaz",
          "Empathetic One-On-One Online Lesson Rhythm"
        ]}
        speed="95s"
        variant="subtle"
      />

      {/* Footer Block */}
      

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
