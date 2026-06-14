"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { NavigationHeader } from "@/components/ui/navigation-header";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { 
  ArrowRight,
  BookOpen,
  Award,
  Users,
  Clock,
  Sparkles,
  Search,
  CheckCircle2,
  Phone,
  Mail,
  ShieldCheck,
  MessageSquare
} from "lucide-react";

interface CourseCategory {
  title: string;
  slug: string;
  duration: string;
  lessons: string;
  level: string;
  description: string;
  features: string[];
  image: string;
  certification: string;
}

export default function CoursesDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingType, setBookingType] = useState<"trial" | "demo">("trial");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const courses: CourseCategory[] = [
    {
      title: "Online Tajweed Mastery Course",
      slug: "tajweed-course",
      duration: "30 Days - 6 Months",
      lessons: "Personalized Schedules",
      level: "Beginner to Advanced",
      description: "Master Quran recitation with proper pronunciation, Makharij points, and Tajweed rules through high-fidelity, live one-on-one virtual mentoring.",
      features: [
        "Makhārij & Sifāt properties",
        "Fluency and rhythm modulation",
        "Noon & Meem Sakinah rules",
        "Direct correction by certified teachers"
      ],
      image: "https://i.postimg.cc/7LsH3Zyx/pexels-belalobeid-13549654.jpg",
      certification: "Ijazah Certified"
    },
    {
      title: "Online Quran Memorization (Hifz) Classes",
      slug: "online-hifz-classes",
      duration: "1 to 3 Years",
      lessons: "3 - 5 Sessions / Week",
      level: "Intermediate to Advanced",
      description: "Memorize the Holy Quran systematically under the accompaniment of Sanad Scholars with our interactive progress trackers and revision logs.",
      features: [
        "Digital tracking registry",
        "Rigorous Sabq, Sabqi, and Manzil revisions",
        "Personalized daily algorithms",
        "Memorization certification"
      ],
      image: "https://i.postimg.cc/J4G6XfF5/pexels-thirdman-7956916.jpg",
      certification: "Hifz Certificate"
    },
    {
      title: "Noorani Qaida Online Classes",
      slug: "online-noorani-qaida-classes",
      duration: "1 to 3 Months",
      lessons: "Flexible slots",
      level: "Absolute Beginner",
      description: "Build a rock-solid foundation for Arabic alphabets, phonics, and compound pronunciations designed for young kids and adult reverts.",
      features: [
        "Visual letter tracing",
        "Phonetic sound matches",
        "Quranic script recognition",
        "Step-by-step reading initiation"
      ],
      image: "https://i.postimg.cc/NMkVNR82/pexels-a-darmel-8164567.jpg",
      certification: "Foundational Certificate"
    },
    {
      title: "Online Quran Classes with Female Teachers",
      slug: "female-quran-teacher-online",
      duration: "Custom duration",
      lessons: "Flexible schedules",
      level: "All Levels Welcome",
      description: "Safe, respectful, and fully private Quran mentoring sessions led by elite, certified female reciters for daughters, mothers, and sisters.",
      features: [
        "100% privacy assurance",
        "Certified Sheikhah instructors",
        "Flexible hourly booking",
        "Supportive learning climate"
      ],
      image: "https://i.postimg.cc/T2sR66MH/pexels-beyza-yalcin-153182170-34548784.jpg",
      certification: "Ijazah / Standard Course"
    },
    {
      title: "Online Quran Reading & Fluency Classes",
      slug: "quran-reading-classes-online",
      duration: "3 to 6 Months",
      lessons: "Adaptable paces",
      level: "Beginner to Intermediate",
      description: "Eradicate hesitation and stuttering. Develop beautiful flows, correct pausing control, and natural breathing habits while reading.",
      features: [
        "Continuous reciting practice",
        "Stop and pause sign rules (Waqf)",
        "Doubt resolution support",
        "Vocal pacing improvement"
      ],
      image: "https://img.youtube.com/vi/aga0S7Lt6tY/maxresdefault.jpg",
      certification: "Fluency Certificate"
    },
    {
      title: "Islamic Studies Classes for Kids",
      slug: "islamic-studies-classes-for-kids",
      duration: "Continuous learning",
      lessons: "2 Sessions / Week",
      level: "Ages 5 to 15",
      description: "Structured lessons exploring fundamental Aqeedah, Fiqh of daily prayer, prophetic Duas, moral character building, and Islamic history.",
      features: [
        "Engaging multimedia curriculums",
        "Salah (Prayer) drills",
        "Prophetic story circles",
        "Essential daily Duas"
      ],
      image: "https://picsum.photos/seed/kidsquran/1000/600",
      certification: "Islamic Studies Certificate"
    },
    {
      title: "Beginner Quran Classes Online",
      slug: "beginner-quran-classes-online",
      duration: "2 to 4 Months",
      lessons: "Easy interactive slides",
      level: "Beginners (Adults & Kids)",
      description: "Overcome the initial anxiety of reading classical Arabic scriptures. Friendly tutors guide you gradually through visual slides.",
      features: [
        "Zero previous knowledge needed",
        "Slow-paced interactive lessons",
        "Friendly home accommodations",
        "Tailored syllabus homework"
      ],
      image: "https://picsum.photos/seed/beginners/1000/600",
      certification: "Beginner Level Certificate"
    }
  ];

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#050505] text-neutral-300 font-sans antialiased selection:bg-[#C8EB5F] selection:text-black overflow-x-hidden relative">
      
      {/* Background radial overlays and glowing elements */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-[#C8EB5F]/5 rounded-full blur-[120px]" />
        <div className="absolute top-[35%] right-[5%] w-[450px] h-[450px] bg-emerald-950/20 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-10%] left-[15%] w-[500px] h-[500px] bg-[#C8EB5F]/5 rounded-full blur-[130px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]" />
      </div>

      {/* Navigation Header */}
      <NavigationHeader onTrialClick={() => { setBookingType("trial"); setBookingOpen(true); }} currentPage="courses" />

      {/* Hero Header */}
      <section className="relative pt-40 pb-16 min-h-[40vh] flex flex-col justify-center items-center">
        <div className="max-w-5xl mx-auto px-6 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C8EB5F]/20 bg-[#C8EB5F]/5 text-[#C8EB5F] text-[10px] font-mono uppercase tracking-widest">
            <Sparkles size={11} className="text-[#C8EB5F] animate-spin-slow" />
            Select Your Sacred Path
          </div>
          <h1 className="font-serif text-5xl sm:text-7xl font-light text-white tracking-tight leading-none uppercase">
            OUR QURAN & TAJWEED <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-500 via-[#C8EB5F] to-white italic font-normal">
              EDUCATIONAL CURRICULA
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 font-light max-w-2xl mx-auto leading-relaxed">
            Choose from our seven specialized, high-fidelity one-on-one virtual programs designed to guide you step-by-step into beautiful, fluent Arabic recitation.
          </p>

          {/* Search box */}
          <div className="relative max-w-md mx-auto pt-6">
            <div className="flex gap-2 bg-neutral-950/80 p-3 rounded-2xl border border-white/5 focus-within:border-[#C8EB5F]/30 transition-all shadow-xl">
              <Search className="text-neutral-500 self-center ml-1 flex-shrink-0" size={16} />
              <input
                type="text"
                placeholder="Search courses (e.g. Hifz, Female Teacher, Kids...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-white text-xs font-mono tracking-wider focus:outline-none w-full placeholder-neutral-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Course List Grid */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-32 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <div 
              key={course.slug} 
              className="bg-zinc-950/90 rounded-[28px] border border-white/5 hover:border-[#C8EB5F]/20 overflow-hidden group flex flex-col justify-between transition-all duration-300 shadow-2xl h-[550px]"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.8] object-center"
                />
                <div className="absolute top-4 left-4 bg-[#C8EB5F] text-black font-mono text-[9px] font-bold px-3 py-1 rounded-md uppercase tracking-wider">
                  {course.certification}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex gap-4 text-[10px] font-mono tracking-widest text-[#C8EB5F] uppercase">
                    <span className="flex items-center gap-1">
                      <Clock size={11} /> {course.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen size={11} /> {course.lessons}
                    </span>
                  </div>

                  <h3 className="text-xl font-serif text-white uppercase tracking-wide leading-tight group-hover:text-[#C8EB5F] transition-colors duration-300">
                    {course.title}
                  </h3>

                  <p className="text-xs text-neutral-400 font-light leading-relaxed line-clamp-3">
                    {course.description}
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-white/5">
                  <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest block font-bold">Key Focus Areas:</span>
                  <div className="grid grid-cols-2 gap-2 text-[10px] text-neutral-300 font-light">
                    {course.features.map((feature, i) => (
                      <div key={i} className="flex gap-1.5 items-center">
                        <span className="text-[#C8EB5F] shrink-0">✓</span>
                        <span className="truncate">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href={`/courses/${course.slug}`}
                  className="flex justify-center items-center gap-2 bg-neutral-900 hover:bg-[#C8EB5F] hover:text-black text-white text-[10px] font-mono font-bold tracking-widest py-3.5 rounded-xl uppercase transition-all w-full cursor-pointer border border-white/5 hover:border-transparent"
                >
                  Explore Schedule Details
                  <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          ))}

          {filteredCourses.length === 0 && (
            <div className="col-span-full py-24 text-center space-y-2">
              <p className="text-neutral-500 text-sm font-mono uppercase tracking-widest">No matching courses found</p>
              <button 
                onClick={() => setSearchQuery("")}
                className="text-xs text-[#C8EB5F] underline"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Transparent Value Proposition Grid */}
      <section className="py-24 border-t border-white/5 bg-zinc-950/40 relative">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-12">
          
          <div className="space-y-4">
            <span className="text-[10px] tracking-[0.3em] font-mono text-[#C8EB5F] uppercase block">
              OUR ACADEMY MATRIX
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-light text-white uppercase tracking-tight">
              A bespoke learning workspace
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto leading-relaxed">
              We focus on premium, interactive experiences powered by verified Ijazah-bearing tutors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left pt-6">
            <div className="p-8 rounded-2xl bg-zinc-904/50 border border-white/5 hover:border-[#C8EB5F]/20 transition-colors space-y-4">
              <ShieldCheck className="text-[#C8EB5F]" size={28} />
              <h4 className="text-white font-serif text-lg font-light uppercase">Structured Syllabi</h4>
              <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                Step-by-step reading modules designed to avoid overwhelm, taking you from phonetic alphabets to complex pause rules safely.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-zinc-904/50 border border-white/5 hover:border-[#C8EB5F]/20 transition-colors space-y-4">
              <Award className="text-[#C8EB5F]" size={28} />
              <h4 className="text-white font-serif text-lg font-light uppercase">Verified Sanad</h4>
              <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                Every teacher undergoes rigourous vetting. All courses are certified and supervised by qualified ijazah holders.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-zinc-904/50 border border-white/5 hover:border-[#C8EB5F]/20 transition-colors space-y-4">
              <Users className="text-[#C8EB5F]" size={28} />
              <h4 className="text-white font-serif text-lg font-light uppercase">Global Flexibility</h4>
              <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                Adaptable timelines designed to match your busy work shifts, school constraints, and children's classes across any timezone.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Floating Intake Dialogue Option */}
      <section className="py-24 border-t border-white/5 bg-gradient-to-b from-[#050505] via-zinc-950/50 to-[#050505] relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8 relative z-10">
          <h2 className="text-4xl sm:text-6xl font-serif font-light text-white uppercase tracking-tight">
            Schedule a Dedicated Intake Dialogue
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto leading-relaxed font-sans">
            Ready to secure structured live mentorship? Our academy specialists are situated online to customize the ideal timing parameters for you and your family. Reach out instantly.
          </p>

          <div className="space-y-4 max-w-xl mx-auto pt-6">
            <div className="p-6 sm:p-8 bg-zinc-950/80 border border-white/10 rounded-3xl hover:border-[#C8EB5F]/30 transition-all duration-500 group relative">
              <span className="block text-[9px] tracking-[0.2em] text-[#C8EB5F] uppercase font-mono mb-2.5">DIALOGUE VIA EMAIL</span>
              <div className="flex flex-col gap-2 text-left">
                <a href="mailto:hello@abuqitmirlabs.tech" className="text-xl sm:text-2xl font-light font-serif text-white hover:text-[#C8EB5F] transition-colors break-all flex flex-col sm:flex-row sm:items-center gap-2">
                  <span className="text-neutral-500 font-mono text-[10px] tracking-wider uppercase">Primary:</span>
                  <span className="underline">hello@abuqitmirlabs.tech</span>
                </a>
                <a href="mailto:abuqitmirshirazalmadani@gmail.com" className="text-md sm:text-lg font-light font-serif text-neutral-400 hover:text-white transition-colors break-all flex flex-col sm:flex-row sm:items-center gap-2">
                  <span className="text-neutral-600 font-mono text-[10px] tracking-wider uppercase">Backup:</span>
                  <span className="underline">abuqitmirshirazalmadani@gmail.com</span>
                </a>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:hello@abuqitmirlabs.tech" 
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black font-mono text-[11px] font-bold uppercase tracking-widest rounded-full hover:bg-neutral-200 transition-all w-full sm:w-auto"
              >
                <Mail size={16} />
                Send Email (hello@abuqitmirlabs.tech)
              </a>
              <a 
                href="https://wa.me/923233260859?text=Asalamu%20Alaikum,%20I%20am%20interested%20in%20taking%20Tajweed%2520online%2520classes%2520with%2520Tajweedpage." 
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

      {/* Booking Dialogue Modal */}
      <AnimatePresence>
        {bookingOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setBookingOpen(false);
                setFormSubmitted(false);
              }}
              className="absolute inset-0 bg-black/85 backdrop-blur-sm"
            />

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
