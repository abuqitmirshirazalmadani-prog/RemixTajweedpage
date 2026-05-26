"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, Clock, ArrowRight, AlertCircle, Sparkles, Check } from 'lucide-react';
import { cn } from "@/lib/utils";
import { NavigationHeader } from "@/components/ui/navigation-header";

interface RegionTimeInfo {
  name: string;
  urduName: string;
  flagCode: string;
  timezoneName: string;
  offsetFromPkt: number; // PKT is UTC+5. This offset is for May 2026
  timezoneLabel: string;
  description: string;
  peakHours: string;
  colorAccent: string;
  activePages: {
    label: string;
    href: string;
  }[];
}

const REGIONS: RegionTimeInfo[] = [
  {
    name: "United Kingdom (UK)",
    urduName: "برطانیہ",
    flagCode: "🇬🇧",
    timezoneName: "Europe/London",
    offsetFromPkt: -4, // BST is UTC+1 (4 hours behind PKT)
    timezoneLabel: "BST",
    description: "Serving direct school holiday terms in London, Manchester, and Birmingham.",
    peakHours: "4:00 PM - 8:30 PM BST (Afternoon)",
    colorAccent: "border-[#C8EB5F]/30 text-emerald-400 bg-emerald-950/20",
    activePages: [
      { label: "London Portal", href: "/online-quran-classes-london" },
      { label: "Manchester Portal", href: "/online-quran-classes-manchester" },
      { label: "Birmingham Portal", href: "/online-quran-classes-birmingham" },
    ]
  },
  {
    name: "USA - New York",
    urduName: "نیویارک",
    flagCode: "🇺🇸",
    timezoneName: "America/New_York",
    offsetFromPkt: -9, // EDT is UTC-4 (9 hours behind PKT)
    timezoneLabel: "EDT",
    description: "High-caliber live Tajweed sessions for Eastern time zones.",
    peakHours: "5:00 PM - 9:00 PM EDT (Evening)",
    colorAccent: "border-[#C8EB5F]/30 text-[#C8EB5F] bg-[#C8EB5F]/5",
    activePages: [
      { label: "New York Hub", href: "/online-quran-classes-new-york" }
    ]
  },
  {
    name: "USA - Texas & Chicago",
    urduName: "ٹیکسلا اور شیکاگو",
    flagCode: "🇺🇸",
    timezoneName: "America/Chicago",
    offsetFromPkt: -10, // CDT is UTC-5 (10 hours behind PKT)
    timezoneLabel: "CDT",
    description: "Catering to homeschooling parent programs in Dallas, Plano, and Chicago.",
    peakHours: "4:30 PM - 8:30 PM CDT (Home-study)",
    colorAccent: "border-[#C8EB5F]/30 text-cyan-400 bg-cyan-950/20",
    activePages: [
      { label: "Texas Portal", href: "/online-quran-classes-texas" },
      { label: "Chicago Studio", href: "/online-quran-classes-chicago" }
    ]
  },
  {
    name: "USA - California",
    urduName: "کیلیفورنیا",
    flagCode: "🇺🇸",
    timezoneName: "America/Los_Angeles",
    offsetFromPkt: -12, // PDT is UTC-7 (12 hours behind PKT)
    timezoneLabel: "PDT",
    description: "Accommodating West Coast school-runs & custom slot timetables.",
    peakHours: "3:30 PM - 7:30 PM PDT (Dusk)",
    colorAccent: "border-[#C8EB5F]/30 text-violet-400 bg-violet-950/20",
    activePages: [
      { label: "California Portal", href: "/online-quran-classes-california" }
    ]
  },
  {
    name: "Germany",
    urduName: "جرمنی",
    flagCode: "🇩🇪",
    timezoneName: "Europe/Berlin",
    offsetFromPkt: -3, // CEST is UTC+2 (3 hours behind PKT)
    timezoneLabel: "CEST",
    description: "Handpicked native Arab scholars with interactive homework logbooks.",
    peakHours: "5:00 PM - 9:00 PM CEST (Evening)",
    colorAccent: "border-[#C8EB5F]/30 text-amber-400 bg-amber-950/20",
    activePages: [
      { label: "Deutschland", href: "/online-quran-classes-germany" }
    ]
  },
  {
    name: "France",
    urduName: "فرانس",
    flagCode: "🇫🇷",
    timezoneName: "Europe/Paris",
    offsetFromPkt: -3, // CEST is UTC+2
    timezoneLabel: "CEST",
    description: "Cours de Coran haut de gamme pour enfants et sœurs en France.",
    peakHours: "4:00 PM - 8:30 PM CEST (Soutien)",
    colorAccent: "border-[#C8EB5F]/30 text-rose-400 bg-rose-950/20",
    activePages: [
      { label: "France Portal", href: "/online-quran-classes-france" }
    ]
  },
  {
    name: "Netherlands",
    urduName: "نیدرلینڈز",
    flagCode: "🇳🇱",
    timezoneName: "Europe/Amsterdam",
    offsetFromPkt: -3, // CEST is UTC+2
    timezoneLabel: "CEST",
    description: "Individuele docenten speciaal ingericht voor Amsterdam & Rotterdam.",
    peakHours: "5:00 PM - 9:00 PM CEST (Avonden)",
    colorAccent: "border-[#C8EB5F]/30 text-sky-400 bg-sky-950/20",
    activePages: [
      { label: "Nederland Portal", href: "/online-quran-classes-netherlands" }
    ]
  }
];

export default function QuranInTheWorldPage() {
  // Pakistan Time Hour Selected State (0-23) - default to 8 PM (20)
  const [pktHour, setPktHour] = useState<number>(20);
  const [liveDate, setLiveDate] = useState<Date | null>(null);

  useEffect(() => {
    setLiveDate(new Date());
    const interval = setInterval(() => {
      setLiveDate(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Format single hour to clean readable 12h representation
  const formatHour12h = (hourValue: number) => {
    const adjusted = (hourValue + 24) % 24;
    const ampm = adjusted >= 12 ? 'PM' : 'AM';
    const displayHour = adjusted % 12 === 0 ? 12 : adjusted % 12;
    return `${displayHour}:00 ${ampm}`;
  };

  // Human friendly status rating
  const getSimpleStatus = (derivedHour: number) => {
    const hour = (derivedHour + 24) % 24;
    if (hour >= 16 && hour <= 21) {
      return { 
        label: "Best Study Time ✦ بہترین وقت", 
        color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" 
      };
    }
    if (hour >= 8 && hour <= 12) {
      return { 
        label: "Morning Classes 🌅 صبح کا وقت", 
        color: "text-[#C8EB5F] bg-[#C8EB5F]/10 border-[#C8EB5F]/20" 
      };
    }
    if (hour >= 12 && hour < 16) {
      return { 
        label: "Afternoon Block 🎒 اسکول کے بعد", 
        color: "text-sky-400 bg-sky-500/10 border-sky-400/20" 
      };
    }
    return { 
      label: "Late Night / Rest 🌙 آرام یا نائٹ شفٹ", 
      color: "text-neutral-400 bg-neutral-900 border-neutral-800" 
    };
  };

  return (
    <main className="min-h-screen bg-[#050505] text-[#e5e5e5] font-sans antialiased selection:bg-[#C8EB5F] selection:text-black">
      
      {/* Luxury Navigation Header */}
      <NavigationHeader onTrialClick={() => {}} />

      {/* Cinematic Hero */}
      <section className="relative pt-28 pb-12 px-6 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#C8EB5F]/5 rounded-full blur-[140px] pointer-events-none -z-10" />

        <div className="max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/5 bg-white/[0.03] px-4 py-1.5 text-[10px] uppercase tracking-[0.3em] text-[#C8EB5F] font-semibold">
            <Globe size={12} className="text-[#C8EB5F] animate-pulse" />
            TajweedPage Timing Interface
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-light text-white tracking-tight uppercase leading-tight">
            Quran Classes <br />
            <span className="italic font-normal text-[#C8EB5F]">Global Custom Timings</span>
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-neutral-400 font-light leading-relaxed">
            ہمارے آن لائن اساتذہ آپ کے مقامی وقت کے مطابق دستیاب ہیں۔ اس آسان ٹول کی مدد سے موازنہ کریں کہ جب پاکستان میں کوئی مخصوص وقت ہو تو آپ کے ملک میں کیا وقت ہو گا۔
          </p>
        </div>
      </section>

      {/* Simplified Dual-Grid Dynamic Tool */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pb-24">
        
        {/* Main Interface Wrapper */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT PANEL: SIMPLE HOURLY CHOICE BUTTONS (The easiest UX) */}
          <div className="lg:col-span-4 bg-zinc-950 border border-white/5 rounded-3xl p-6 md:p-8 space-y-6">
            <div className="space-y-1">
              <span className="text-[10px] font-mono tracking-widest text-[#C8EB5F] uppercase font-bold">
                1. SELECT TIME IN PAKISTAN (وقت منتخب کریں)
              </span>
              <p className="text-xs text-neutral-400 font-light">
                کلک کریں اور معلوم کریں کہ دوسرے ممالک میں اس وقت کیا بج رہے ہوں گے۔
              </p>
            </div>

            {/* Simulated Live Pakistan Clock */}
            {liveDate && (
              <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest">Live Pakistan (PKT):</span>
                </div>
                <div className="text-sm font-mono font-bold text-[#C8EB5F]">
                  {liveDate.toLocaleTimeString('en-US', { timeZone: 'Asia/Karachi', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}
                </div>
              </div>
            )}

            {/* Easy Circular Hourly Select Grid */}
            <div className="grid grid-cols-2 gap-2.5">
              {[
                { hour: 8, label: "08:00 AM", urdu: "صبح کے ۸ بجے" },
                { hour: 11, label: "11:00 AM", urdu: "دوپہر ۱۱ بجے" },
                { hour: 13, label: "01:00 PM", urdu: "دوپہر ۱ بجے" },
                { hour: 15, label: "03:00 PM", urdu: "تین بجے" },
                { hour: 16, label: "04:00 PM", urdu: "شام ۴ بجے" },
                { hour: 18, label: "06:00 PM", urdu: "شام ۶ بجے" },
                { hour: 20, label: "08:00 PM", urdu: "رات کے ۸ بجے" },
                { hour: 22, label: "10:00 PM", urdu: "رات ۱۰ بجے" },
              ].map((item) => (
                <button
                  key={item.hour}
                  onClick={() => setPktHour(item.hour)}
                  className={cn(
                    "relative overflow-hidden group p-3.5 rounded-2xl border text-left transition-all duration-300 hover:scale-[1.02] cursor-pointer",
                    pktHour === item.hour 
                      ? "bg-[#C8EB5F] text-black border-[#C8EB5F] font-bold shadow-[0_10px_30px_rgba(200,235,95,0.15)]"
                      : "bg-[#0b0b0b] text-white border-white/5 hover:border-white/20"
                  )}
                >
                  <span className="block text-xs font-mono">{item.label}</span>
                  <span className={cn(
                    "block text-[10px] mt-1 font-light",
                    pktHour === item.hour ? "text-neutral-900" : "text-neutral-500"
                  )}>
                    {item.urdu}
                  </span>
                </button>
              ))}
            </div>

            {/* Manual Slide adjustment for expert users */}
            <div className="space-y-3 pt-4 border-t border-white/5">
              <div className="flex justify-between items-center text-[10px] font-mono text-neutral-400">
                <span>MIDNIGHT</span>
                <span className="text-neutral-500 uppercase">Or drag manually • گھمائیں</span>
                <span>11:00 PM</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="23" 
                value={pktHour} 
                onChange={(e) => setPktHour(parseInt(e.target.value))}
                className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#C8EB5F]"
              />
              <div className="bg-white/[0.02] p-3 rounded-xl border border-white/5 text-[11px] text-neutral-400 font-light flex gap-2">
                <AlertCircle size={14} className="text-[#C8EB5F] mt-0.5 shrink-0" />
                <span>
                  جب پاکستان میں <strong className="text-white">{formatHour12h(pktHour)}</strong> ہوں گے، تو دیگر ممالک کے مقامی ٹائم نیچے تبدیل ہو رہے ہیں۔
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: DYNAMIC RESULTS WITH HIGHLIGHTED LOCAL TARGET PAGES */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase font-bold">
                  2. CALCULATED OVERSEAS TIMES (دوسرے مقمالک کا وقت)
                </span>
                <p className="text-xs text-neutral-400 mt-1">
                  پوری مطابقت کے ساتھ آن لائن کلاس بکنگ لنکس پر کلک کریں۔
                </p>
              </div>
              <span className="text-xs bg-white/5 px-2.5 py-1 rounded-full border border-white/10 text-neutral-300 font-mono">
                Pakistan Selector: <span className="text-[#C8EB5F] font-bold">{formatHour12h(pktHour)}</span>
              </span>
            </div>

            {/* Regions list rendering in a high-contrast elegant way */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {REGIONS.map((reg) => {
                const calculatedLocal = (pktHour + reg.offsetFromPkt + 24) % 24;
                const progressState = getSimpleStatus(calculatedLocal);

                return (
                  <div 
                    key={reg.name}
                    className="group bg-[#0d0d0d] hover:bg-zinc-950 border border-white/5 hover:border-[#C8EB5F]/30 rounded-2xl p-5 md:p-6 flex flex-col justify-between space-y-5 transition-all duration-300"
                  >
                    <div className="space-y-3">
                      
                      {/* Top Meta info */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2.5">
                          <span className="text-2xl" role="img" aria-label="Country Flag">{reg.flagCode}</span>
                          <div>
                            <h3 className="text-sm font-mono tracking-tight text-white uppercase font-bold">
                              {reg.name}
                            </h3>
                            <span className="text-[10px] text-neutral-500 font-mono tracking-wider block">
                              {reg.urduName} • {reg.timezoneLabel} ({reg.offsetFromPkt}h vs PKT)
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Giant Converted Hour display */}
                      <div className="py-3 px-4 bg-white/[0.02] rounded-xl border border-white/5 flex items-center justify-between">
                        <div>
                          <span className="text-[9px] font-mono text-neutral-500 uppercase block">Local Converted Time</span>
                          <span className="text-2xl font-serif font-black text-white tracking-wider">
                            {formatHour12h(calculatedLocal).split(' ')[0]} 
                            <span className="text-[#C8EB5F] text-xs font-mono ml-1 uppercase">{formatHour12h(calculatedLocal).split(' ')[1]}</span>
                          </span>
                        </div>
                        
                        <div className={cn("text-[9px] font-mono uppercase px-2.5 py-1 rounded-full border font-bold", progressState.color)}>
                          {progressState.label}
                        </div>
                      </div>

                      <p className="text-neutral-400 text-xs font-light leading-relaxed">
                        {reg.description}
                      </p>

                    </div>

                    {/* Quick Redirect Subpages with luxury link borders */}
                    <div className="pt-3 border-t border-white/5 space-y-2">
                      <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest font-bold block">
                        Direct Landing Portals:
                      </span>
                      <div className="grid grid-cols-1 gap-1.5">
                        {reg.activePages.map((subPage) => (
                          <Link
                            key={subPage.href}
                            href={subPage.href}
                            className="bg-zinc-900/60 hover:bg-[#C8EB5F] text-[#eeeeee] hover:text-black hover:font-bold border border-white/5 hover:border-transparent text-[10px] font-mono py-2 px-3 rounded-lg flex items-center justify-between transition-all duration-300"
                          >
                            <span>{subPage.label}</span>
                            <ArrowRight size={10} className="shrink-0 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        ))}
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>

        </div>

      </section>

      {/* Booking Form CTA Redirect Section */}
      <section className="py-20 border-t border-white/5 bg-zinc-950/40 text-center">
        <div className="max-w-xl mx-auto px-6 space-y-6">
          <h2 className="text-3xl font-serif font-light text-white uppercase">Start Free 1-on-1 Auditing Session</h2>
          <p className="text-neutral-400 text-sm font-light">
            No matter your exact location in the United Kingdom, USA, or Mainland Europe, we coordinate our class slots precisely around your children or female adult routines.
          </p>
          <div className="pt-4">
            <Link 
              href="/#booking-form"
              className="inline-flex bg-[#C8EB5F] text-black hover:bg-white text-xs font-mono font-bold tracking-widest px-8 py-4 rounded-full uppercase transition-colors duration-300"
            >
              🚀 GET 3-DAYS FREE PASS NOW
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
