"use client";

import React, { useState } from "react";
import { CheckCircle2, Calendar, Clock, Globe2, Sparkles, Phone, Mail, User, BookOpen, ArrowRight, RotateCcw } from "lucide-react";
import { db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { handleEmailClick } from "@/lib/utils";


export function SecureBookingCard() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [route, setRoute] = useState("Tajweed Mastery (Full Series)");
  
  // Custom user scheduling states
  const [selectedDate, setSelectedDate] = useState("Today");
  const [selectedSlot, setSelectedSlot] = useState("06:00 PM - 08:00 PM");
  const [timezone, setTimezone] = useState("GMT+5 (Islamabad/Karachi)");

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [smtpWarning, setSmtpWarning] = useState(false);

  // Timezones suggestions for dynamic selections
  const timezones = [
    "GMT-5 (Eastern Time - US/Canada)",
    "GMT+0 (Greenwich Mean Time - London)",
    "GMT+1 (Central European Time - Paris)",
    "GMT+3 (East Africa Time - Riyadh/Medina)",
    "GMT+4 (Gulf Standard Time - Dubai)",
    "GMT+5 (Islamabad/Karachi)",
    "GMT+8 (Singapore/Perth)",
    "GMT+10 (Australian Eastern Time - Sydney)"
  ];

  const dates = [
    { label: "Today", value: "Today", desc: "Urgent slot" },
    { label: "Tomorrow", value: "Tomorrow", desc: "Highly available" },
    { label: "Friday", value: "Friday, May 22", desc: "Weekend path" },
    { label: "Saturday", value: "Saturday, May 23", desc: "Prime slot" }
  ];

  const slots = [
    "09:00 AM - 11:00 AM",
    "02:00 PM - 04:00 PM",
    "06:00 PM - 08:00 PM",
    "08:00 PM - 10:00 PM"
  ];

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSmtpWarning(false);

    const bookingId = "booking_" + Date.now();
    const submissionData = {
      id: bookingId,
      fullName: name,
      email: email,
      phone: phone || "",
      course: route,
      level: `Date: ${selectedDate}, Slot: ${selectedSlot}, Zone: ${timezone}`,
      comments: "Submitted from secure booking card",
      sourcePage: "Main Secure Booking Card",
      createdAt: new Date().toISOString()
    };

    try {
      // 1. Save data securely to Firebase Firestore
      await setDoc(doc(db, "bookings", bookingId), submissionData);

      // 2. Trigger Next.js API route to send the email
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(submissionData)
      });
      const data = await res.json();
      if (data && data.warning === "SMTP config missing") {
        setSmtpWarning(true);
      }
    } catch (err) {
      console.error("Booking registry error:", err);
    } finally {
      setIsSubmitting(false);
      setFormSubmitted(true);
    }
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setPhone("");
    setSmtpWarning(false);
    setFormSubmitted(false);
  };

  return (
    <div 
      id="booking-card" 
      className="bg-[#08090c] border border-white/5 rounded-[36px] p-8 md:p-10 relative overflow-hidden shadow-2xl transition-all duration-300 hover:border-white/10"
    >
      {/* Dynamic Glowing Accent Header Pattern */}
      <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-transparent via-[#C8EB5F]/60 to-transparent" />
      <div className="absolute -top-12 -left-12 w-32 h-32 bg-[#C8EB5F]/10 rounded-full blur-25 pointer-events-none" />

      {/* Dynamic Header Section */}
      <div className="space-y-3 mb-8 text-center">
        <div className="inline-flex items-center gap-1 bg-[#C8EB5F]/10 border border-[#C8EB5F]/20 px-3 py-1 rounded-full">
          <Sparkles size={10} className="text-[#C8EB5F] animate-spin" />
          <span className="text-[9px] tracking-[0.2em] font-mono text-[#C8EB5F] uppercase font-bold">LIMITED SCHOLAR RESERVATION</span>
        </div>
        <h3 className="text-2xl md:text-3xl font-serif text-white uppercase tracking-tight">Secure Your Live Trial</h3>
        <p className="text-neutral-400 text-xs font-light leading-relaxed max-w-sm mx-auto">
          Learn Tajweed step by step with experienced certified scholars. Real-time feedback, completely individual classes.
        </p>
      </div>

      {formSubmitted ? (
        <div className="relative z-10 space-y-6">
          {/* Animated Certificate/Receipt Confirmation Style */}
          <div className="bg-[#C8EB5F]/5 border border-[#C8EB5F]/20 p-8 rounded-3xl text-center space-y-6 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-[#C8EB5F]/5 rounded-full blur-xl pointer-events-none" />
            
            <div className="w-16 h-16 bg-[#C8EB5F] text-[#08090c] rounded-full flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(200,235,95,0.3)]">
              <CheckCircle2 size={32} />
            </div>

            <div className="space-y-2">
              <span className="text-[9px] font-mono tracking-widest text-[#C8EB5F] uppercase font-bold">INQUIRY SUCCESSFULLY SECURED</span>
              <h4 className="text-white font-serif text-2xl uppercase">Interactive Spot Reserved</h4>
              <p className="text-[#C8EB5F] text-xs font-mono">
                Assigned ID: #TJP-{Math.floor(100000 + Math.random() * 900000)}
              </p>
            </div>

            <div className="border-t border-b border-white/10 py-5 my-2 space-y-3.5 text-left text-xs text-neutral-300">
              <div className="flex justify-between">
                <span className="text-neutral-500 font-light">Student Name:</span>
                <span className="text-white font-serif font-medium">{name || "Salim Ahmed"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500 font-light">Preferred Choice:</span>
                <span className="text-[#C8EB5F] font-serif font-medium truncate max-w-[200px]">{route}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500 font-light">Scheduled Day:</span>
                <span className="text-white font-mono flex items-center gap-1">
                  <Calendar size={12} className="text-[#C8EB5F]" /> {selectedDate}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500 font-light">Selected Hour:</span>
                <span className="text-white font-mono flex items-center gap-1">
                  <Clock size={12} className="text-[#C8EB5F]" /> {selectedSlot}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500 font-light">Timezone System:</span>
                <span className="text-white font-mono text-[10px] truncate max-w-[170px] flex items-center gap-1">
                  <Globe2 size={12} className="text-neutral-500" /> {timezone.split(" ")[0]}
                </span>
              </div>
            </div>

            <p className="text-neutral-400 text-xs font-light leading-relaxed max-w-xs mx-auto">
              Success! A course assistant will contact you over WhatsApp or Email inside <strong>2 hours</strong> to confirm your custom timezone timings and provide your free Zoom link.
            </p>

            {smtpWarning && (
              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-2xl text-left text-[11px] text-amber-300 font-mono space-y-1.5 max-w-xs mx-auto">
                <p className="font-bold">⚠️ SYSTEM NOTICE (Secrets Setup Required):</p>
                <p>Your details are safely recorded in our <strong>Firebase Database "bookings"</strong> collection. However, actual email notification was not dispatched because your <strong>SMTP credentials</strong> are not set in the AI Studio environment variables panel.</p>
                <p className="text-[10px] opacity-80 font-sans">To receive emails, please add keys: <strong>SMTP_HOST</strong>, <strong>SMTP_PORT</strong>, <strong>SMTP_USER</strong>, and <strong>SMTP_PASSWORD</strong> under the Secrets tab in AI Studio.</p>
              </div>
            )}

            <div className="flex flex-col gap-2.5 pt-2 max-w-xs mx-auto">
              <a 
                href="https://wa.me/923233260859?text=Asalamu%20Alaikum,%20I%20have%20just%20submitted%2520a%2520booking%2520request%2520on%2520Tajweedpage."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#C8EB5F] text-black font-mono text-[10px] tracking-widest font-extrabold py-3 rounded-xl hover:bg-white text-center transition-colors block"
              >
                Instant WhatsApp Follow-up
              </a>
              <button 
                onClick={(e) => handleEmailClick(e, "Tajweedpage Booking Submission")}
                className="bg-zinc-950 border border-white/10 text-white font-mono text-[9px] tracking-widest py-2.5 rounded-xl hover:bg-zinc-900 w-full text-center transition-colors block leading-tight px-2 cursor-pointer"
              >
                <span className="block mb-0.5">Inquire via Email</span>
                <span className="text-[8px] opacity-60 lowercase font-sans normal-case block">abuqitmirshirazalmadani@gmail.com</span>
              </button>
            </div>
          </div>

          <button
            onClick={handleReset}
            className="w-full bg-white/5 border border-white/10 text-neutral-400 text-[10px] tracking-widest font-mono uppercase py-3.5 rounded-2xl hover:bg-white/10 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
          >
            <RotateCcw size={12} />
            <span>Schedule Another Inquiry</span>
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6 relative z-10 text-left">
          
          {/* STEP 1: Personal Coordinates */}
          <div className="space-y-4">
            <span className="text-[10px] tracking-[0.2em] font-mono text-neutral-500 uppercase block font-bold border-b border-white/5 pb-2">
              01. Personal Coordinates
            </span>
            
            <div className="grid grid-cols-1 gap-4">
              <div className="relative">
                <label className="text-[10px] tracking-widest font-mono text-neutral-400 uppercase block mb-1.5 flex items-center gap-1.5 font-bold">
                  <User size={11} className="text-[#C8EB5F]" /> Your Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Salim Ahmed"
                  className="w-full bg-[#050608] border border-white/10 rounded-2xl px-4 py-3.5 text-xs text-white focus:outline-none focus:border-[#C8EB5F] focus:ring-1 focus:ring-[#C8EB5F]/30 transition-all placeholder:text-neutral-600 font-light"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                  <label className="text-[10px] tracking-widest font-mono text-neutral-400 uppercase block mb-1.5 flex items-center gap-1.5 font-bold">
                    <Mail size={11} className="text-[#C8EB5F]" /> Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. salim@gmail.com"
                    className="w-full bg-[#050608] border border-white/10 rounded-2xl px-4 py-3.5 text-xs text-white focus:outline-none focus:border-[#C8EB5F] focus:ring-1 focus:ring-[#C8EB5F]/30 transition-all placeholder:text-neutral-600 font-light"
                  />
                </div>

                <div className="relative">
                  <label className="text-[10px] tracking-widest font-mono text-neutral-400 uppercase block mb-1.5 flex items-center gap-1.5 font-bold">
                    <Phone size={11} className="text-[#C8EB5F]" /> WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +1 (555) 123-4567"
                    className="w-full bg-[#050608] border border-white/10 rounded-2xl px-4 py-3.5 text-xs text-white focus:outline-none focus:border-[#C8EB5F] focus:ring-1 focus:ring-[#C8EB5F]/30 transition-all placeholder:text-neutral-600 font-light"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* STEP 2: Path Direction */}
          <div className="space-y-3">
            <span className="text-[10px] tracking-[0.2em] font-mono text-neutral-500 uppercase block font-bold border-b border-white/5 pb-2">
              02. Select Preferred Syllabus Route
            </span>
            <div className="relative">
              <label className="text-[10px] tracking-widest font-mono text-neutral-400 uppercase block mb-1.5 flex items-center gap-1.5">
                <BookOpen size={11} className="text-[#C8EB5F]" /> Study Direction
              </label>
              <select 
                value={route}
                onChange={(e) => setRoute(e.target.value)}
                className="w-full bg-[#050608] border border-white/10 rounded-2xl px-4 py-3.5 text-xs text-neutral-300 focus:outline-none focus:border-[#C8EB5F] select-none transition-all cursor-pointer"
              >
                <option value="Tajweed Mastery (Full Series)">Tajweed Mastery (Full Series)</option>
                <option value="Quran Pronunciation Improvement">Quran Pronunciation Improvement</option>
                <option value="Beginner Noorani Qaida Lessons">Beginner Noorani Qaida Lessons</option>
                <option value="Kids Individual Coaching">Kids Individual Coaching</option>
              </select>
            </div>
          </div>

          {/* STEP 3: User Time Custom Scheduling */}
          <div className="space-y-4">
            <span className="text-[10px] tracking-[0.2em] font-mono text-neutral-500 uppercase block font-bold border-b border-white/5 pb-2">
              03. Custom User Scheduling
            </span>

            {/* Timezone alignment select */}
            <div className="space-y-1.5">
              <label className="text-[10px] tracking-widest font-mono text-neutral-400 uppercase flex items-center gap-1">
                <Globe2 size={11} className="text-neutral-500" /> System Timezone
              </label>
              <select
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="w-full bg-[#050608] border border-white/10 rounded-2xl px-4 py-3 text-xs text-neutral-300 focus:outline-none focus:border-[#C8EB5F] select-none cursor-pointer"
              >
                {timezones.map((tz, index) => (
                  <option key={index} value={tz}>{tz}</option>
                ))}
              </select>
            </div>

            {/* Date capsules */}
            <div className="space-y-2">
              <label className="text-[10px] tracking-widest font-mono text-neutral-400 uppercase flex items-center gap-1">
                <Calendar size={11} className="text-neutral-500" /> Preferred study date
              </label>
              <div className="grid grid-cols-2 gap-2">
                {dates.map((dateObj, i) => {
                  const isSelected = selectedDate === dateObj.value;
                  return (
                    <button
                      type="button"
                      key={i}
                      onClick={() => setSelectedDate(dateObj.value)}
                      className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all duration-300 ${
                        isSelected 
                          ? "border-[#C8EB5F] bg-[#C8EB5F]/5 text-white" 
                          : "border-white/5 bg-[#050608]/50 hover:border-white/10 text-neutral-400"
                      }`}
                    >
                      <span className={`text-[11px] font-medium ${isSelected ? "text-[#C8EB5F]" : "text-neutral-200"}`}>
                        {dateObj.label}
                      </span>
                      <span className="text-[9px] font-mono text-neutral-500 leading-none mt-1">
                        {dateObj.desc}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Slots selector capsules */}
            <div className="space-y-2">
              <label className="text-[10px] tracking-widest font-mono text-neutral-400 uppercase flex items-center gap-1">
                <Clock size={11} className="text-neutral-500" /> Best hour slot
              </label>
              <div className="grid grid-cols-2 gap-2">
                {slots.map((slot, i) => {
                  const isSelected = selectedSlot === slot;
                  return (
                    <button
                      type="button"
                      key={i}
                      onClick={() => setSelectedSlot(slot)}
                      className={`p-2.5 rounded-lg border text-center transition-all duration-300 ${
                        isSelected 
                          ? "border-[#C8EB5F] bg-[#C8EB5F]/10 text-white font-semibold font-mono text-[10px]" 
                          : "border-white/5 bg-[#050608] hover:border-white/10 text-neutral-400 font-mono text-[10px]"
                      }`}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#C8EB5F] text-black font-bold text-xs tracking-[0.1em] uppercase py-4 rounded-2xl hover:bg-white hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 shadow-[0_5px_30px_rgba(200,235,95,0.15)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <span>{isSubmitting ? "PROCESSING..." : "SUBMIT INQUIRY RESERVATION"}</span>
            <ArrowRight size={14} />
          </button>
        </form>
      )}
    </div>
  );
}
