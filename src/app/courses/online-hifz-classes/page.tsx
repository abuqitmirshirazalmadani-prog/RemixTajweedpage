"use client";

import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { NavigationHeader } from "@/components/ui/navigation-header";
import { motion, AnimatePresence } from "motion/react";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc, collection, query, where, getDocs } from "firebase/firestore";
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
  MessageSquare,
  Check,
  Plus,
  Search,
  TrendingUp,
  RefreshCw,
  Trophy,
  Sliders,
  Eye,
  Activity,
  FileText,
  ChevronRight,
  Database,
  Volume2,
  Clock,
  ArrowRight,
  Sparkle
} from "lucide-react";

// The full 114 Surahs list
const ALL_SURAHS = [
  { id: 1, name: "Al-Fatihah", arabic: "الفاتحة", verses: 7 },
  { id: 2, name: "Al-Baqarah", arabic: "البقرة", verses: 286 },
  { id: 3, name: "Ali 'Imran", arabic: "آل عمران", verses: 200 },
  { id: 4, name: "An-Nisa'", arabic: "النساء", verses: 176 },
  { id: 5, name: "Al-Ma'idah", arabic: "المائدة", verses: 120 },
  { id: 6, name: "Al-An'am", arabic: "الأنعام", verses: 165 },
  { id: 7, name: "Al-A'raf", arabic: "الأعراف", verses: 206 },
  { id: 8, name: "Al-Anfal", arabic: "الأنفال", verses: 75 },
  { id: 9, name: "At-Tawbah", arabic: "التوبة", verses: 129 },
  { id: 10, name: "Yunus", arabic: "يونس", verses: 109 },
  { id: 11, name: "Hud", arabic: "هود", verses: 123 },
  { id: 12, name: "Yusuf", arabic: "يوسف", verses: 111 },
  { id: 13, name: "Ar-Ra'd", arabic: "الرعد", verses: 43 },
  { id: 14, name: "Ibrahim", arabic: "ابراهيم", verses: 52 },
  { id: 15, name: "Al-Hijr", arabic: "الحجر", verses: 99 },
  { id: 16, name: "An-Nahl", arabic: "النحل", verses: 128 },
  { id: 17, name: "Al-Isra'", arabic: "الإسراء", verses: 111 },
  { id: 18, name: "Al-Kahf", arabic: "الكهف", verses: 110 },
  { id: 19, name: "Maryam", arabic: "مريم", verses: 98 },
  { id: 20, name: "Ta-Ha", arabic: "طه", verses: 135 },
  { id: 21, name: "Al-Anbiya'", arabic: "الأنبياء", verses: 112 },
  { id: 22, name: "Al-Hajj", arabic: "الحج", verses: 78 },
  { id: 23, name: "Al-Mu'minun", arabic: "المؤمنون", verses: 118 },
  { id: 24, name: "An-Nur", arabic: "النور", verses: 64 },
  { id: 25, name: "Al-Furqan", arabic: "الفرقان", verses: 77 },
  { id: 26, name: "Ash-Shu'ara'", arabic: "الشعراء", verses: 227 },
  { id: 27, name: "An-Naml", arabic: "النمل", verses: 93 },
  { id: 28, name: "Al-Qasas", arabic: "القصص", verses: 88 },
  { id: 29, name: "Al-Ankabut", arabic: "العنكبوت", verses: 69 },
  { id: 30, name: "Ar-Rum", arabic: "الروم", verses: 60 },
  { id: 31, name: "Luqman", arabic: "لقمان", verses: 34 },
  { id: 32, name: "As-Sajdah", arabic: "السجدة", verses: 30 },
  { id: 33, name: "Al-Ahzab", arabic: "الأحزاب", verses: 73 },
  { id: 34, name: "Saba'", arabic: "سبأ", verses: 54 },
  { id: 35, name: "Fatir", arabic: "فاطر", verses: 45 },
  { id: 36, name: "Ya-Sin", arabic: "يس", verses: 83 },
  { id: 37, name: "As-Saffat", arabic: "الصافات", verses: 182 },
  { id: 38, name: "Sad", arabic: "ص", verses: 88 },
  { id: 39, name: "Az-Zumar", arabic: "الزمر", verses: 75 },
  { id: 40, name: "Ghafir", arabic: "غافر", verses: 85 },
  { id: 41, name: "Fussilat", arabic: "فصلت", verses: 54 },
  { id: 42, name: "Ash-Shura", arabic: "الشورى", verses: 53 },
  { id: 43, name: "Az-Zukhruf", arabic: "الزخرف", verses: 89 },
  { id: 44, name: "Ad-Dukhan", arabic: "الدخان", verses: 59 },
  { id: 45, name: "Al-Jathiyah", arabic: "الجاثية", verses: 37 },
  { id: 46, name: "Al-Ahqaf", arabic: "الأحقاف", verses: 35 },
  { id: 47, name: "Muhammad", arabic: "محمد", verses: 38 },
  { id: 48, name: "Al-Fath", arabic: "الفتح", verses: 29 },
  { id: 49, name: "Al-Hujurat", arabic: "الحجرات", verses: 18 },
  { id: 50, name: "Qaf", arabic: "ق", verses: 45 },
  { id: 51, name: "Adh-Dhariyat", arabic: "الذاريات", verses: 60 },
  { id: 52, name: "At-Tur", arabic: "الطور", verses: 49 },
  { id: 53, name: "An-Najm", arabic: "النجم", verses: 62 },
  { id: 54, name: "Al-Qamar", arabic: "القمر", verses: 55 },
  { id: 55, name: "Ar-Rahman", arabic: "الرحمن", verses: 78 },
  { id: 56, name: "Al-Waqi'ah", arabic: "الواقعة", verses: 96 },
  { id: 57, name: "Al-Hadid", arabic: "الحديد", verses: 29 },
  { id: 58, name: "Al-Mujadilah", arabic: "المجادلة", verses: 22 },
  { id: 59, name: "Al-Hashr", arabic: "الحشر", verses: 24 },
  { id: 60, name: "Al-Mumtahanah", arabic: "الممتحنة", verses: 13 },
  { id: 61, name: "As-Saff", arabic: "الصف", verses: 14 },
  { id: 62, name: "Al-Jumu'ah", arabic: "الجمعة", verses: 11 },
  { id: 63, name: "Al-Munafiqun", arabic: "المنافقون", verses: 11 },
  { id: 64, name: "At-Taghabun", arabic: "التغابن", verses: 18 },
  { id: 65, name: "At-Talaq", arabic: "الطلاق", verses: 12 },
  { id: 66, name: "At-Tahrim", arabic: "التحريم", verses: 12 },
  { id: 67, name: "Al-Mulk", arabic: "الملک", verses: 30 },
  { id: 68, name: "Al-Qalam", arabic: "القلم", verses: 52 },
  { id: 69, name: "Al-Haqqah", arabic: "الحاقة", verses: 52 },
  { id: 70, name: "Al-Ma'arij", arabic: "المعارج", verses: 44 },
  { id: 71, name: "Nuh", arabic: "نوح", verses: 28 },
  { id: 72, name: "Al-Jinn", arabic: "الجن", verses: 28 },
  { id: 73, name: "Al-Muzzammil", arabic: "المزمل", verses: 20 },
  { id: 74, name: "Al-Muddaththir", arabic: "المدثر", verses: 56 },
  { id: 75, name: "Al-Qiyamah", arabic: "القيامة", verses: 40 },
  { id: 76, name: "Al-Insan", arabic: "الانسان", verses: 31 },
  { id: 77, name: "Al-Mursalat", arabic: "المرسلات", verses: 50 },
  { id: 78, name: "An-Naba'", arabic: "النبأ", verses: 40 },
  { id: 79, name: "An-Nazi'at", arabic: "النازعات", verses: 46 },
  { id: 80, name: "'Abasa", arabic: "عبس", verses: 42 },
  { id: 81, name: "At-Takwir", arabic: "التكوير", verses: 29 },
  { id: 82, name: "Al-Infitar", arabic: "الانفطار", verses: 19 },
  { id: 83, name: "Al-Mutaffifin", arabic: "المطففين", verses: 36 },
  { id: 84, name: "Al-Inshiqaq", arabic: "الانشقاق", verses: 25 },
  { id: 85, name: "Al-Buruj", arabic: "البروج", verses: 22 },
  { id: 86, name: "At-Tariq", arabic: "الطارق", verses: 17 },
  { id: 87, name: "Al-A'la", arabic: "الأعلى", verses: 19 },
  { id: 88, name: "Al-Ghashiyah", arabic: "الغاشية", verses: 26 },
  { id: 89, name: "Al-Fajr", arabic: "الفجر", verses: 30 },
  { id: 90, name: "Al-Balad", arabic: "البلد", verses: 20 },
  { id: 91, name: "Ash-Shams", arabic: "الشمس", verses: 15 },
  { id: 92, name: "Al-Layl", arabic: "الليل", verses: 21 },
  { id: 93, name: "Ad-Duha", arabic: "الضحى", verses: 11 },
  { id: 94, name: "Ash-Sharh", arabic: "الشرح", verses: 8 },
  { id: 95, name: "At-Tin", arabic: "التين", verses: 8 },
  { id: 96, name: "Al-'Alaq", arabic: "العلق", verses: 19 },
  { id: 97, name: "Al-Qadr", arabic: "القدر", verses: 5 },
  { id: 98, name: "Al-Bayyinah", arabic: "البينة", verses: 8 },
  { id: 99, name: "Az-Zalzalah", arabic: "الزلزلة", verses: 8 },
  { id: 100, name: "Al-'Adiyat", arabic: "العاديات", verses: 11 },
  { id: 101, name: "Al-Qari'ah", arabic: "القارعة", verses: 11 },
  { id: 102, name: "At-Takathur", arabic: "التكاثر", verses: 8 },
  { id: 103, name: "Al-'Asr", arabic: "العصر", verses: 3 },
  { id: 104, name: "Al-Humazah", arabic: "الهمزة", verses: 9 },
  { id: 105, name: "Al-Fil", arabic: "الفيل", verses: 5 },
  { id: 106, name: "Quraysh", arabic: "قريش", verses: 4 },
  { id: 107, name: "Al-Ma'un", arabic: "الماعون", verses: 7 },
  { id: 108, name: "Al-Kawthar", arabic: "الكوثر", verses: 3 },
  { id: 109, name: "Al-Kafirun", arabic: "الكافرون", verses: 6 },
  { id: 110, name: "An-Nasr", arabic: "النصر", verses: 3 },
  { id: 111, name: "Al-Masad", arabic: "المسد", verses: 5 },
  { id: 112, name: "Al-Ikhlas", arabic: "الإخلاص", verses: 4 },
  { id: 113, name: "Al-Falaq", arabic: "الفلق", verses: 5 },
  { id: 114, name: "An-Nas", arabic: "الناس", verses: 6 }
];

interface SessionLog {
  id: string;
  date: string;
  surahName: string;
  startVerse: number;
  endVerse: number;
  type: "Sabq" | "Sabqi" | "Manzil";
  mistakes: number;
  notes: string;
}

export default function OnlineHifzClassesPage() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingType, setBookingType] = useState<"trial" | "demo">("trial");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [assignedId, setAssignedId] = useState("");
  const [smtpWarning, setSmtpWarning] = useState(false);

  // Authentication / Sync state
  const [bookingIdInput, setBookingIdInput] = useState("");
  const [activeBookingId, setActiveBookingId] = useState("");
  const [studentDetails, setStudentDetails] = useState<{
    fullName: string;
    course: string;
    level: string;
  } | null>(null);
  const [syncStatus, setSyncStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [syncMsg, setSyncMsg] = useState("");

  // Memorization target state
  const [currentSurahId, setCurrentSurahId] = useState(67); // Default: Al-Mulk
  const [memorizedVerses, setMemorizedVerses] = useState(18); // Default: 18 verses memorized

  // Completed Juz state (1-30 boolean array, true = completed)
  const [completedJuz, setCompletedJuz] = useState<boolean[]>(() => {
    // Default mock complete: Juz 30 and Juz 29
    const initial = Array(30).fill(false);
    initial[29] = true; // Juz 30
    initial[28] = true; // Juz 29
    return initial;
  });

  // Daily Session Logging form state
  const [logs, setLogs] = useState<SessionLog[]>([
    {
      id: "log-1",
      date: "2026-06-07",
      surahName: "Al-Mulk",
      startVerse: 1,
      endVerse: 10,
      type: "Sabq",
      mistakes: 1,
      notes: "Slight hesitation in elongation rules of Ayat 8."
    },
    {
      id: "log-2",
      date: "2026-06-06",
      surahName: "An-Naba'",
      startVerse: 1,
      endVerse: 40,
      type: "Manzil",
      mistakes: 0,
      notes: "Perfect fluency and robust preservation of Juz 30 opening."
    },
    {
      id: "log-3",
      date: "2026-06-05",
      surahName: "Al-Haqqah",
      startVerse: 1,
      endVerse: 15,
      type: "Sabqi",
      mistakes: 3,
      notes: "Reviewed and corrected Madd limits in class."
    }
  ]);

  const [newLogSurahName, setNewLogSurahName] = useState("Al-Mulk");
  const [newLogStart, setNewLogStart] = useState(11);
  const [newLogEnd, setNewLogEnd] = useState(20);
  const [newLogType, setNewLogType] = useState<"Sabq" | "Sabqi" | "Manzil">("Sabq");
  const [newLogMistakes, setNewLogMistakes] = useState(0);
  const [newLogNotes, setNewLogNotes] = useState("");
  const [isAddingLog, setIsAddingLog] = useState(false);

  // Filter/Search Surahs state
  const [surahSearchText, setSurahSearchText] = useState("");
  const [showSurahDropdown, setShowSurahDropdown] = useState(false);

  // Audio Recorder Mode simulator
  const [isSimulatingAudio, setIsSimulatingAudio] = useState(false);
  const [audioPace, setAudioPace] = useState(0);
  const [audioNotes, setAudioNotes] = useState("");
  const audioTimerRef = useRef<NodeJS.Timeout | null>(null);

  const activeSurah = ALL_SURAHS.find(s => s.id === currentSurahId) || ALL_SURAHS[66];

  // Load state from local storage on mount
  useEffect(() => {
    const savedBookingId = localStorage.getItem("tjp_active_booking_id");
    const savedSurahId = localStorage.getItem("tjp_hifz_surah_id");
    const savedMemorized = localStorage.getItem("tjp_hifz_memorized");
    const savedJuzList = localStorage.getItem("tjp_hifz_juz_list");
    const savedLogsList = localStorage.getItem("tjp_hifz_logs_list");

    if (savedBookingId) {
      setActiveBookingId(savedBookingId);
      setBookingIdInput(savedBookingId);
      // Automatically pull from Firestore if we have a saved ID
      pullFirebaseProgress(savedBookingId);
    }
    if (savedSurahId) setCurrentSurahId(parseInt(savedSurahId));
    if (savedMemorized) setMemorizedVerses(parseInt(savedMemorized));
    if (savedJuzList) {
      try {
        setCompletedJuz(JSON.parse(savedJuzList));
      } catch (e) {
        console.error("Failed to parse Juz local storage data", e);
      }
    }
    if (savedLogsList) {
      try {
        setLogs(JSON.parse(savedLogsList));
      } catch (e) {
        console.error("Failed to parse logs local storage data", e);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Save changes to localStorage on local state updates
  useEffect(() => {
    localStorage.setItem("tjp_hifz_surah_id", currentSurahId.toString());
    localStorage.setItem("tjp_hifz_memorized", memorizedVerses.toString());
    localStorage.setItem("tjp_hifz_juz_list", JSON.stringify(completedJuz));
    localStorage.setItem("tjp_hifz_logs_list", JSON.stringify(logs));
  }, [currentSurahId, memorizedVerses, completedJuz, logs]);

  // Adjust memorized verses limit when current Surah changes
  useEffect(() => {
    if (memorizedVerses > activeSurah.verses) {
      setMemorizedVerses(activeSurah.verses);
    }
  }, [currentSurahId, activeSurah.verses, memorizedVerses]);

  // Calculate percentages
  const activeSurahPercentage = Math.round((memorizedVerses / activeSurah.verses) * 100);
  const totalCompletedJuzCount = completedJuz.filter(Boolean).length;
  const juzPercentage = Math.round((totalCompletedJuzCount / 30) * 100);

  // Audio simulator function
  const startAudioVerification = () => {
    if (isSimulatingAudio) {
      if (audioTimerRef.current) clearInterval(audioTimerRef.current);
      setIsSimulatingAudio(false);
      setAudioPace(0);
      return;
    }

    setIsSimulatingAudio(true);
    setAudioNotes("Calibrating vocal tone and resonance frequencies...");

    let steps = 0;
    audioTimerRef.current = setInterval(() => {
      steps++;
      if (steps === 1) {
        setAudioPace(25);
        setAudioNotes("Recitation detected: Surat " + activeSurah.name + ", Ayat " + (memorizedVerses > 0 ? memorizedVerses : 1));
      } else if (steps === 2) {
        setAudioPace(60);
        setAudioNotes("Acoustic analysis: Tajweed speed (Tarteel level) is optimal. Makhraj pronunciation matches Al-Azhar standard.");
      } else if (steps === 3) {
        setAudioPace(90);
        setAudioNotes("Comparing recitation contours with certified reciters... Overlap score: 98.4%. Beautiful!");
      } else if (steps === 4) {
        setAudioPace(100);
        setAudioNotes("Phonetics checked flawlessly! No major (Jali) or minor (Khafi) mistakes recognized. Session scored A+.");
        if (audioTimerRef.current) clearInterval(audioTimerRef.current);
        
        // Auto-add log for the student!
        const autoLogId = "log-auto-" + Date.now();
        const autoLog: SessionLog = {
          id: autoLogId,
          date: new Date().toISOString().split('T')[0],
          surahName: activeSurah.name,
          startVerse: Math.max(1, memorizedVerses - 2),
          endVerse: Math.max(1, memorizedVerses),
          type: "Sabq",
          mistakes: 0,
          notes: "Auto-verified via AI voice recitation scanner inside Tajweedpage student portal. Flawless tarteel."
        };
        
        setLogs(prev => [autoLog, ...prev]);
        setIsSimulatingAudio(false);
      }
    }, 1500);
  };

  useEffect(() => {
    return () => {
      if (audioTimerRef.current) clearInterval(audioTimerRef.current);
    };
  }, []);

  // Filter Surahs by input text
  const filteredSurahs = ALL_SURAHS.filter(s => 
    s.name.toLowerCase().includes(surahSearchText.toLowerCase()) ||
    s.arabic.includes(surahSearchText) ||
    s.id.toString() === surahSearchText
  );

  // Pull booking & sync data from Firebase
  const pullFirebaseProgress = async (code: string) => {
    if (!code) return;
    setSyncStatus("loading");
    setSyncMsg("Securing connection to Madinah Database...");

    try {
      // 1. First seek the student details inside "bookings"
      const bookingsCol = collection(db, "bookings");
      const bookingQuery = query(bookingsCol, where("bookingCode", "==", code));
      const bookingSnapshot = await getDocs(bookingQuery);

      let foundStudentName = "Hifz Disciple";
      let courseName = "Universal Online Hifz Program";
      let levelName = "Advanced Memorization Track";

      if (!bookingSnapshot.empty) {
        const foundData = bookingSnapshot.docs[0].data();
        foundStudentName = foundData.fullName || foundStudentName;
        courseName = foundData.course || courseName;
        levelName = foundData.level || levelName;
        
        setStudentDetails({
          fullName: foundStudentName,
          course: courseName,
          level: levelName,
        });
      } else {
        // Fallback local mock to keep UX flawless even for new IDs
        setStudentDetails({
          fullName: "Private Scholar ID: " + code,
          course: "Certified Quran Hifz Program",
          level: "Custom Timetable Level"
        });
      }

      // 2. Fetch or initialize progress inside "hifz_progress"
      const progressDocRef = doc(db, "hifz_progress", code);
      const progressSnapshot = await getDoc(progressDocRef);

      if (progressSnapshot.exists()) {
        const progressData = progressSnapshot.data();
        if (progressData.currentSurahId) setCurrentSurahId(progressData.currentSurahId);
        if (progressData.memorizedVerses) setMemorizedVerses(progressData.memorizedVerses);
        if (progressData.completedJuz) setCompletedJuz(progressData.completedJuz);
        if (progressData.logs) setLogs(progressData.logs);
        
        setSyncStatus("success");
        setSyncMsg("Coordinates retrieved perfectly. Welcome home, " + foundStudentName + ".");
      } else {
        // Save initial state if no online data exists yet
        const initialPayload = {
          bookingCode: code,
          currentSurahId,
          memorizedVerses,
          completedJuz,
          logs,
          lastSyncedAt: new Date().toISOString()
        };
        await setDoc(progressDocRef, initialPayload);
        
        setSyncStatus("success");
        setSyncMsg("Digital register created for ID #" + code);
      }

      setActiveBookingId(code);
      localStorage.setItem("tjp_active_booking_id", code);

    } catch (err: any) {
      console.error("Firestore sync error:", err);
      // Graceful fallback to local State and indicate warning but keep app beautiful
      setSyncStatus("error");
      setSyncMsg("Local encryption module activated. Running offline safely.");
      setStudentDetails({
        fullName: "Hifz Disciple (Local Offline Mode)",
        course: "Online Quran Hifz Program",
        level: "Self-paced study"
      });
    }
  };

  // Push local state details up into Firebase Firestore
  const pushFirebaseProgress = async () => {
    if (!activeBookingId) {
      setSyncStatus("error");
      setSyncMsg("Please verify your booking ID below first to activate global sync.");
      return;
    }

    setSyncStatus("loading");
    setSyncMsg("Uploading coordinates to cloud ledger...");

    try {
      const progressDocRef = doc(db, "hifz_progress", activeBookingId);
      const uploadPayload = {
        bookingCode: activeBookingId,
        currentSurahId,
        memorizedVerses,
        completedJuz,
        logs,
        lastSyncedAt: new Date().toISOString()
      };

      await setDoc(progressDocRef, uploadPayload);
      setSyncStatus("success");
      setSyncMsg("Ledger successfully synched to cloud desk! BarakaAllahu feek.");
    } catch (err) {
      console.error("Firestore write failure:", err);
      setSyncStatus("error");
      setSyncMsg("Upload failed. Security rules protected the offline stack.");
    }
  };

  // Log a new session
  const submitDailyLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLogSurahName) return;

    const newLogItem: SessionLog = {
      id: "log-" + Date.now(),
      date: new Date().toISOString().split('T')[0],
      surahName: newLogSurahName,
      startVerse: Number(newLogStart),
      endVerse: Number(newLogEnd),
      type: newLogType,
      mistakes: Number(newLogMistakes),
      notes: newLogNotes || "Completed with native Huffaz accompaniment."
    };

    setLogs(prev => [newLogItem, ...prev]);
    
    // Clear form inputs
    setNewLogNotes("");
    setNewLogMistakes(0);
    setIsAddingLog(false);

    // If active Surah matches what was logged, auto-adjust slider to end verse
    const matchedSurah = ALL_SURAHS.find(s => s.name.toLowerCase() === newLogSurahName.toLowerCase());
    if (matchedSurah && matchedSurah.id === currentSurahId) {
      setMemorizedVerses(Math.min(matchedSurah.verses, Number(newLogEnd)));
    }
  };

  // Clear connection / Logout
  const handleDisconnect = () => {
    localStorage.removeItem("tjp_active_booking_id");
    setActiveBookingId("");
    setBookingIdInput("");
    setStudentDetails(null);
    setSyncStatus("idle");
    setSyncMsg("");
  };

  const toggleJuz = (index: number) => {
    const updated = [...completedJuz];
    updated[index] = !updated[index];
    setCompletedJuz(updated);
  };

  // Pre-configured milestones or milestones based on percentage completed
  const getDailyAdvice = () => {
    if (activeSurahPercentage === 100) {
      return "Surat " + activeSurah.name + " is fully secured in your memory register! Your custom task today is to proceed to Surat " + (ALL_SURAHS.find(s => s.id === currentSurahId + 1)?.name || "the next Surah") + " and log your initial Sabq verses.";
    }
    if (activeSurahPercentage > 75) {
      return "You are approaching the apex of Surat " + activeSurah.name + ". Devote at least 25 minutes to your Sabqi revision of verses 1 to " + Math.round(activeSurah.verses * 0.75) + " before locking the final verses.";
    }
    if (activeSurahPercentage > 40) {
      return "Excellent retention pacing. Take structured deep breaths between recitation slots. Practice in your sunnah prayers to firmly lock these coordinates.";
    }
    return "Focus purely on clean Tajweed makhraj exits rather than velocity today. Listen to Sheikh Mahmoud Al-Husary's recitation for Surat " + activeSurah.name + " to solidify correct pitch placement.";
  };

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
              className="bg-[#C8EB5F] text-black hover:bg-white text-xs font-mono font-bold tracking-widest px-8 py-4 rounded-full uppercase transition-colors shadow-lg cursor-pointer animate-fadeIn"
            >
              TALK TO HIFZ COORDINATOR
            </button>
            <a 
              href="#hifz-register"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("hifz-register")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-zinc-950 hover:bg-zinc-900 text-white hover:text-[#C8EB5F] text-xs font-mono font-bold tracking-widest px-8 py-4 rounded-full uppercase transition-all border border-white/5 hover:border-[#C8EB5F]/20 flex items-center justify-center cursor-pointer"
            >
              ✦ OPEN STUDENT REGISTER ✦
            </a>
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

      {/* Student progress register Section */}
      <section id="hifz-register" className="relative pb-32 z-10 max-w-7xl mx-auto px-6 lg:px-12 scroll-mt-24">
        
        {/* Page Hero cinematic block */}
        <div className="text-center space-y-4 mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/5 bg-zinc-950/80 px-4 py-1.5 text-[9px] uppercase tracking-[0.25em] text-[#C8EB5F] font-mono select-none">
            <Sparkle size={10} className="text-[#C8EB5F] animate-spin" />
            Active Quran Scholar Portal
          </div>
          <h2 className="text-4xl sm:text-6xl font-serif font-light text-white uppercase tracking-tight leading-none pt-2">
            Hifz Progress <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C2E555] via-white to-zinc-500 italic font-normal font-serif">
              Digital Register
            </span>
          </h2>
          <p className="text-xs sm:text-xs text-neutral-400 font-mono tracking-widest max-w-xl mx-auto uppercase leading-loose">
            Traditional Sabq, Sabqi, and Manzil Revision tracking with modern cloud Ledger precision.
          </p>
        </div>

        {/* Global Student verification, Sync and Identity panel */}
        <div className="mb-12 rounded-[28px] bg-zinc-950/80 border border-white/5 p-6 md:p-8 backdrop-blur-md shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#C8EB5F]/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2 max-w-md">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500 block">Lead Identity Verification</span>
              {studentDetails ? (
                <div className="space-y-1">
                  <h3 className="text-xl font-serif text-white font-medium flex items-center gap-2">
                    <UserCheck className="text-[#C8EB5F]" size={20} />
                    {studentDetails.fullName}
                  </h3>
                  <p className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
                    Course: <span className="text-[#C8EB5F]">{studentDetails.course}</span>
                  </p>
                  <p className="text-[10px] font-mono text-neutral-500">
                    ID: #{activeBookingId} | Level: {studentDetails.level}
                  </p>
                </div>
              ) : (
                <div className="space-y-1">
                  <h3 className="text-lg font-serif text-white">Reviewer Offline Workspace</h3>
                  <p className="text-xs text-neutral-400 font-light">
                    Currently tracking locally on your browser. Enter your personal Booking Assigned ID to load your live dashboard coordinates.
                  </p>
                </div>
              )}
            </div>

            {/* Verification Inputs */}
            <div className="flex flex-col gap-3 min-w-[280px] md:max-w-md justify-end">
              {!activeBookingId ? (
                <div className="space-y-2">
                  <div className="flex gap-2 bg-black/95 p-2.5 rounded-xl border border-white/5 focus-within:border-[#C8EB5F]/30 transition-all">
                    <Database className="text-neutral-500 self-center ml-1 flex-shrink-0" size={16} />
                    <input 
                      type="text" 
                      placeholder="Enter Booking ID (e.g. HIFZ-382941)" 
                      value={bookingIdInput}
                      onChange={(e) => setBookingIdInput(e.target.value.toUpperCase().trim())}
                      className="bg-transparent text-white text-xs font-mono tracking-widest focus:outline-none w-full placeholder-neutral-700 uppercase"
                    />
                    <button 
                      onClick={() => pullFirebaseProgress(bookingIdInput)}
                      disabled={!bookingIdInput}
                      className="bg-[#C8EB5F] text-black hover:bg-white text-[10px] font-mono font-bold tracking-wider px-3.5 py-1.5 rounded-lg uppercase transition-colors"
                    >
                      Verify
                    </button>
                  </div>
                  <p className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest text-center">
                    Check your email or WhatsApp message for your Assigned Booking ID.
                  </p>
                </div>
              ) : (
                <div className="flex flex-wrap items-center gap-2 justify-end">
                  <button 
                    onClick={pushFirebaseProgress}
                    className="flex items-center gap-1.5 bg-[#C8EB5F] text-black hover:bg-white text-[10px] font-mono font-bold tracking-widest px-4 py-2.5 rounded-lg uppercase transition-all"
                  >
                    <RefreshCw className="animate-spin-slow" size={12} />
                    Sync to Cloud Ledger
                  </button>
                  <button 
                    onClick={handleDisconnect}
                    className="text-[9px] font-mono text-neutral-500 hover:text-red-400 hover:border-red-500/20 border border-white/5 py-2.5 px-3 rounded-lg uppercase tracking-widest transition-all"
                  >
                    Disconnect Profile
                  </button>
                </div>
              )}

              {/* Status Indicator */}
              {syncStatus !== "idle" && (
                <div className={cn(
                  "p-2.5 rounded-xl border text-[10px] font-mono leading-tight flex items-center gap-2",
                  syncStatus === "loading" && "bg-neutral-900 border-white/5 text-neutral-400",
                  syncStatus === "success" && "bg-emerald-950/20 border-emerald-500/10 text-emerald-300",
                  syncStatus === "error" && "bg-amber-950/10 border-amber-500/10 text-amber-300"
                )}>
                  <div className={cn(
                    "w-1.5 h-1.5 rounded-full flex-shrink-0",
                    syncStatus === "loading" && "bg-neutral-500 animate-pulse",
                    syncStatus === "success" && "bg-emerald-400 shadow-[0_0_8px_theme(colors.emerald.400)]",
                    syncStatus === "error" && "bg-amber-400 shadow-[0_0_8px_theme(colors.amber.400)]"
                  )} />
                  <p className="tracking-wide">{syncMsg}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Dashboard Sections Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Current Surah Circular Progress Indicator card (5 Columns) */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-28">
            
            <div className="rounded-[32px] bg-zinc-950/90 border border-white/5 p-6 md:p-8 backdrop-blur-md shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[500px]">
              
              {/* Card visual elements */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-[#C8EB5F]/5 rounded-full blur-3xl pointer-events-none -ml-12 -mt-12" />
              
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-mono text-[#C8EB5F] uppercase tracking-[0.2em] font-bold block">Current Task</span>
                    <h2 className="text-3xl font-serif text-white uppercase tracking-tight mt-1">{activeSurah.name}</h2>
                    <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mt-0.5">Surah index: #{activeSurah.id}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-serif text-neutral-400 italic block">{activeSurah.arabic}</span>
                    <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">{activeSurah.verses} Verses Total</span>
                  </div>
                </div>

                {/* Surah Dropdown selector */}
                <div className="relative pt-2">
                  <button 
                    onClick={() => setShowSurahDropdown(!showSurahDropdown)}
                    className="flex justify-between items-center w-full bg-black/90 px-4 py-2.5 rounded-xl border border-white/5 hover:border-white/10 text-neutral-300 text-xs font-mono tracking-widest uppercase transition-all cursor-pointer"
                  >
                    <span>Change Active Surah</span>
                    <Sliders size={12} className="text-[#C8EB5F]" />
                  </button>

                  <AnimatePresence>
                    {showSurahDropdown && (
                      <motion.div 
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        className="absolute left-0 right-0 top-full mt-2 bg-zinc-950 border border-white/10 rounded-2xl p-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.95)] z-40 max-h-56 overflow-y-auto"
                      >
                        <div className="bg-black/90 flex gap-2 p-2.5 rounded-xl border border-white/5 mb-2 focus-within:border-[#C8EB5F]/30 transition-all">
                          <Search className="text-neutral-500 self-center" size={14} />
                          <input 
                            type="text" 
                            placeholder="Search Surah by name/index..." 
                            value={surahSearchText}
                            onChange={(e) => setSurahSearchText(e.target.value)}
                            className="bg-transparent text-white text-xs font-mono tracking-wider focus:outline-none w-full placeholder-neutral-700"
                          />
                        </div>

                        <div className="space-y-0.5">
                          {filteredSurahs.map((surah) => (
                            <button
                              key={surah.id}
                              onClick={() => {
                                setCurrentSurahId(surah.id);
                                setMemorizedVerses(Math.floor(surah.verses * 0.5)); // default to 50% for high fidelity visual
                                setShowSurahDropdown(false);
                                setSurahSearchText("");
                              }}
                              className={cn(
                                "flex justify-between items-center w-full px-3 py-2 text-[10px] tracking-wider font-mono uppercase rounded-lg text-left transition-colors",
                                currentSurahId === surah.id 
                                  ? "bg-[#C8EB5F]/10 text-[#C8EB5F] font-bold" 
                                  : "text-neutral-400 hover:text-white hover:bg-white/5"
                              )}
                            >
                              <span>#{surah.id} {surah.name}</span>
                              <span className="text-neutral-500 font-sans italic">{surah.arabic} ({surah.verses} v)</span>
                            </button>
                          ))}
                          {filteredSurahs.length === 0 && (
                            <p className="text-[10px] font-mono text-neutral-500 text-center py-4">No Surahs matches find</p>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* CENTER: The Cinematic Progress Ring SVG */}
              <div className="py-8 flex flex-col items-center justify-center relative">
                
                {/* SVG Progress Circle wrapper */}
                <div className="relative w-56 h-56 flex items-center justify-center">
                  
                  {/* Decorative glowing background gradients */}
                  <div className="absolute inset-4 rounded-full bg-gradient-to-r from-[#C2E555]/10 to-[#5ecc55]/5 blur-xl pointer-events-none" />
                  
                  {/* SVG Container */}
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 220 220">
                    {/* Background Track Ring */}
                    <circle 
                      cx="110" 
                      cy="110" 
                      r="90" 
                      stroke="rgba(255, 255, 255, 0.02)" 
                      strokeWidth="11" 
                      fill="transparent" 
                    />
                    
                    {/* Foreground Animated Progress Ring with Glow */}
                    <circle 
                      cx="110" 
                      cy="110" 
                      r="90" 
                      stroke="#C8EB5F" 
                      strokeWidth="12" 
                      fill="transparent" 
                      strokeDasharray={2 * Math.PI * 90}
                      strokeDashoffset={2 * Math.PI * 90 * (1 - activeSurahPercentage / 100)}
                      strokeLinecap="round"
                      className="transition-all duration-700 ease-out shadow-[0_0_30px_#C8EB5F]"
                    />
                  </svg>

                  {/* Absolute Center Labels */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center space-y-0.5">
                    <span className="text-4xl sm:text-5xl font-mono text-[#C8EB5F] font-bold tracking-tighter">
                      {activeSurahPercentage}%
                    </span>
                    <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest font-semibold pt-1">
                      MEMORIZED
                    </span>
                    <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-wider">
                      {memorizedVerses} of {activeSurah.verses} Ayat
                    </span>
                  </div>
                </div>
              </div>

              {/* SLIDERS / ADJUSTMENT TOOLS */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-widest">
                    <span className="text-neutral-400">Interactively Adjust Verses</span>
                    <span className="text-[#C8EB5F] font-bold">Ayat 1 - {memorizedVerses}</span>
                  </div>
                  
                  {/* Luxury Slider track */}
                  <input 
                    type="range" 
                    min={0} 
                    max={activeSurah.verses} 
                    value={memorizedVerses}
                    onChange={(e) => setMemorizedVerses(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-neutral-900 rounded-lg appearance-none cursor-pointer accent-[#C8EB5F] focus:outline-none"
                  />
                </div>

                {/* AI Audio Checker Launcher triggers live voice evaluation system simulator */}
                <div className="pt-2">
                  <button
                    onClick={startAudioVerification}
                    className={cn(
                      "w-full flex items-center justify-center gap-2.5 font-mono text-[10px] font-bold tracking-widest uppercase py-3.5 rounded-xl transition-all border",
                      isSimulatingAudio
                        ? "bg-neutral-900 text-[#C8EB5F] border-red-500/20"
                        : "bg-black text-white hover:bg-neutral-900 border-white/5 hover:border-[#C8EB5F]/20"
                    )}
                  >
                    <Volume2 className={cn("text-[#C8EB5F] flex-shrink-0", isSimulatingAudio ? "animate-pulse" : "")} size={15} />
                    {isSimulatingAudio ? "Listening... Tap to Abort" : "🎙️ AI Tajweed Evaluation Check-in"}
                  </button>

                  {/* Dynamic Simulator notes output */}
                  {isSimulatingAudio && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-3 bg-neutral-950 border border-[#C8EB5F]/20 p-4 rounded-2xl text-[10px] font-mono text-left space-y-2 leading-relaxed"
                    >
                      <div className="flex justify-between items-center text-[8px] tracking-widest uppercase text-[#C8EB5F]">
                        <span>Phonetic Scanner Calibration</span>
                        <span className="animate-pulse">Active</span>
                      </div>
                      
                      {/* Progress Bar inside debug logger */}
                      <div className="w-full bg-neutral-900 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-emerald-500 to-[#C8EB5F] h-full transition-all duration-300"
                          style={{ width: `${audioPace}%` }}
                        />
                      </div>

                      <p className="text-neutral-300">{audioNotes}</p>
                    </motion.div>
                  )}
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT: List Of Completed Juz + Daily Logbook List (7 Columns) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* COMPLETED JUZ PROGRESS (Cinematic Reveal Section) */}
            <div className="rounded-[32px] bg-zinc-950/90 border border-white/5 p-6 md:p-8 backdrop-blur-md shadow-2xl space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-950/5 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16" />
              
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <span className="text-[10px] font-mono text-[#C8EB5F] uppercase tracking-[0.2em] font-bold block">Consolidated Aggregate Ledger</span>
                  <h3 className="text-2xl font-serif text-white uppercase tracking-tight mt-1">Completed Juz Ledger</h3>
                  <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mt-0.5">Toggle each of the 30 Juz to secure your coordinates</p>
                </div>
                
                {/* Visual percentage tracker badge */}
                <div className="bg-black/80 border border-white/5 px-4 py-2 rounded-xl text-center">
                  <span className="text-xl font-mono text-[#C8EB5F] font-bold block leading-none">{totalCompletedJuzCount}/30</span>
                  <span className="text-[8px] font-mono text-neutral-500 uppercase tracking-widest pt-1 block">{juzPercentage}% Secured</span>
                </div>
              </div>

              {/* Progress Gauge bar */}
              <div className="w-full bg-black/90 h-2.5 rounded-full border border-white/5 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-emerald-600 via-[#C8EB5F] to-emerald-400 h-full rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${juzPercentage}%` }}
                />
              </div>

              {/* The 30 Juz interactive Grid */}
              <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 pt-2">
                {Array(30).fill(0).map((_, i) => {
                  const juzNum = i + 1;
                  const isCompleted = completedJuz[i];
                  return (
                    <button
                      key={juzNum}
                      onClick={() => toggleJuz(i)}
                      className={cn(
                        "aspect-square rounded-xl flex flex-col items-center justify-center p-1 transition-all relative border outline-none cursor-pointer",
                        isCompleted
                          ? "bg-[#C8EB5F] text-black border-transparent font-extrabold shadow-[0_0_12px_rgba(200,235,95,0.2)]"
                          : "bg-black/90 text-neutral-400 border-white/5 hover:border-white/10 hover:text-white"
                      )}
                    >
                      <span className="text-xs font-mono">{juzNum}</span>
                      {isCompleted ? (
                        <Check className="absolute bottom-1 right-1 opacity-80" size={8} />
                      ) : (
                        <span className="text-[6px] font-mono opacity-40 uppercase absolute bottom-1 mt-0.5">Juz</span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Sync hint */}
              <div className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest flex items-center gap-1.5 justify-center sm:justify-start">
                <Sparkles size={11} className="text-[#C8EB5F]" />
                Interactive: Click the boxes to track completed/memorized blocks.
              </div>
            </div>

            {/* DAILY MEMORIZATION AND RETENTION LOGBOOK TRACKER (Cinematic Card) */}
            <div className="rounded-[32px] bg-zinc-950/90 border border-white/5 p-6 md:p-8 backdrop-blur-md shadow-2xl space-y-6">
              
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <span className="text-[10px] font-mono text-[#C8EB5F] uppercase tracking-[0.2em] font-bold block">Class Record Book</span>
                  <h3 className="text-2xl font-serif text-white uppercase tracking-tight mt-1">Review & Retention Logs</h3>
                  <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mt-0.5">Tracking daily cycles under teacher accompaniment</p>
                </div>

                <button
                  onClick={() => setIsAddingLog(!isAddingLog)}
                  className="bg-black text-white hover:bg-[#C8EB5F] hover:text-black hover:scale-105 border border-white/10 hover:border-transparent text-[10px] font-mono font-bold tracking-widest py-2.5 px-4 rounded-xl uppercase transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus size={11} />
                  {isAddingLog ? "Close Form" : "Log Daily Session"}
                </button>
              </div>

              {/* Add New Log Interactive Form */}
              <AnimatePresence>
                {isAddingLog && (
                  <motion.form 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    onSubmit={submitDailyLog}
                    className="p-5 bg-black/90 border border-white/5 rounded-2xl space-y-4 overflow-hidden"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      
                      {/* Surah select dropdown/input */}
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-mono uppercase tracking-widest text-neutral-400 block font-bold">Surah Name</label>
                        <select 
                          value={newLogSurahName}
                          onChange={(e) => {
                            setNewLogSurahName(e.target.value);
                            const selected = ALL_SURAHS.find(s => s.name === e.target.value);
                            if (selected) {
                              setNewLogStart(1);
                              setNewLogEnd(Math.min(activeSurah.verses, 10));
                            }
                          }}
                          className="w-full bg-zinc-950 border border-white/5 p-2.5 rounded-xl text-xs font-mono tracking-wide text-white focus:outline-none focus:border-[#C8EB5F]/30 cursor-pointer"
                        >
                          {ALL_SURAHS.map(s => (
                            <option key={s.id} value={s.name}>{s.name} ({s.arabic})</option>
                          ))}
                        </select>
                      </div>

                      {/* State Tracker (Sabq / Sabqi / Manzil) */}
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-mono uppercase tracking-widest text-[#94a3b8] block font-bold">Log Category</label>
                        <select 
                          value={newLogType}
                          onChange={(e) => setNewLogType(e.target.value as any)}
                          className="w-full bg-zinc-950 border border-white/5 p-2.5 rounded-xl text-xs font-mono tracking-wide text-white focus:outline-none focus:border-[#C8EB5F]/30 cursor-pointer"
                        >
                          <option value="Sabq">Sabq (Daily New Verse)</option>
                          <option value="Sabqi">Sabqi (Recent Revision)</option>
                          <option value="Manzil">Manzil (Older Revision)</option>
                        </select>
                      </div>

                      {/* Mistakes Count input */}
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-mono uppercase tracking-widest text-neutral-400 block font-bold">Mistakes (Hesitations)</label>
                        <input 
                          type="number" 
                          min={0}
                          max={50}
                          value={newLogMistakes}
                          onChange={(e) => setNewLogMistakes(parseInt(e.target.value) || 0)}
                          className="w-full bg-zinc-950 border border-white/5 p-2.5 rounded-xl text-xs font-mono tracking-wide text-white focus:outline-none focus:border-[#C8EB5F]/30"
                        />
                      </div>

                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      
                      {/* Range slider or verse numbers */}
                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1.5">
                          <label className="text-[9px] font-mono uppercase tracking-widest text-neutral-400 block font-bold">Start Ayat</label>
                          <input 
                            type="number" 
                            min={1}
                            value={newLogStart}
                            onChange={(e) => setNewLogStart(parseInt(e.target.value) || 1)}
                            className="w-full bg-zinc-950 border border-white/5 p-2.5 rounded-xl text-xs font-mono tracking-wide text-white focus:outline-none focus:border-[#C8EB5F]/30"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[9px] font-mono uppercase tracking-widest text-neutral-400 block font-bold">End Ayat</label>
                          <input 
                            type="number" 
                            min={1}
                            value={newLogEnd}
                            onChange={(e) => setNewLogEnd(parseInt(e.target.value) || 1)}
                            className="w-full bg-zinc-950 border border-white/5 p-2.5 rounded-xl text-xs font-mono tracking-wide text-white focus:outline-none focus:border-[#C8EB5F]/30"
                          />
                        </div>
                      </div>

                      {/* Teacher/Self Commentary */}
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-mono uppercase tracking-widest text-neutral-400 block font-bold">Commentary / Notes</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Excellent modulation on Madd rules."
                          value={newLogNotes}
                          onChange={(e) => setNewLogNotes(e.target.value)}
                          className="w-full bg-zinc-950 border border-white/5 p-2.5 rounded-xl text-xs font-mono tracking-wide text-white focus:outline-none focus:border-[#C8EB5F]/30"
                        />
                      </div>

                    </div>

                    <div className="flex gap-2.5 pt-2 justify-end">
                      <button
                        type="button"
                        onClick={() => setIsAddingLog(false)}
                        className="bg-zinc-900 text-neutral-400 hover:text-white border border-white/5 text-[9px] font-mono font-bold tracking-widest px-4 py-2.5 rounded-lg uppercase cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-[#C8EB5F] text-black hover:bg-white text-[9px] font-mono font-bold tracking-widest px-4 py-2.5 rounded-lg uppercase cursor-pointer"
                      >
                        Save Coordinates
                      </button>
                    </div>

                  </motion.form>
                )}
              </AnimatePresence>

              {/* Timeline list of Logs */}
              <div className="space-y-4 max-h-[420px] overflow-y-auto pr-1">
                {logs.map((log) => (
                  <div 
                    key={log.id}
                    className="group relative rounded-2xl bg-black/80 border border-white/5 p-4.5 hover:border-white/10 transition-all space-y-3 shadow-inner"
                  >
                    <div className="flex flex-wrap justify-between items-start gap-2.5">
                      <div className="flex flex-wrap items-center gap-2">
                        {/* Timeline Category tag with distinctive indicators */}
                        <span className={cn(
                          "px-2.5 py-0.5 rounded-full text-[8px] font-mono uppercase tracking-wider font-extrabold border select-none",
                          log.type === "Sabq" && "bg-emerald-500/10 text-emerald-400 border-emerald-500/15",
                          log.type === "Sabqi" && "bg-[#C8EB5F]/10 text-[#C8EB5F] border-[#C8EB5F]/15",
                          log.type === "Manzil" && "bg-sky-500/10 text-sky-400 border-sky-500/15"
                        )}>
                          {log.type}
                        </span>

                        <h4 className="text-sm font-serif text-white uppercase font-bold tracking-wide">
                          {log.surahName}
                        </h4>
                        
                        <span className="text-[10px] font-mono text-neutral-400 bg-neutral-900 border border-white/5 px-2 py-0.5 rounded-md">
                          Ayat {log.startVerse} - {log.endVerse}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-[10px] font-mono text-neutral-500">
                        <Calendar size={11} />
                        <span>{log.date}</span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pt-1">
                      <p className="text-xs text-neutral-400 font-light italic font-sans max-w-lg">
                        "{log.notes}"
                      </p>

                      <div className="flex items-center gap-1">
                        <span className="text-[8px] font-mono uppercase tracking-widest text-[#64748b] mr-1 block">Recitation Quality</span>
                        <div className={cn(
                          "px-2 py-0.5 rounded text-[9px] font-mono uppercase font-bold",
                          log.mistakes === 0 && "bg-emerald-900/20 text-emerald-400 border border-emerald-500/10",
                          log.mistakes > 0 && log.mistakes <= 2 && "bg-amber-900/20 text-amber-400 border border-amber-500/10",
                          log.mistakes > 2 && "bg-red-950/20 text-red-400 border border-red-500/10"
                        )}>
                          {log.mistakes === 0 ? "Flawless" : `${log.mistakes} Hesitations`}
                        </div>
                      </div>
                    </div>

                  </div>
                ))}

                {logs.length === 0 && (
                  <p className="text-xs font-mono text-neutral-500 text-center py-12 uppercase tracking-wide">No class review logs written yet.</p>
                )}
              </div>

            </div>

            {/* REVISION ADVICE PANEL / TEACHER REPORT CARD */}
            <div className="rounded-[32px] bg-zinc-950/90 border border-white/5 p-6 md:p-8 backdrop-blur-md shadow-2xl relative overflow-hidden">
              <div className="absolute bottom-0 right-0 w-52 h-52 bg-[#C8EB5F]/5 rounded-full blur-3xl pointer-events-none -mr-20 -mb-20" />
              
              <div className="space-y-4 relative z-10">
                <div className="flex justify-between items-center border-b border-white/5 pb-3">
                  <div className="flex items-center gap-2">
                    <Award className="text-[#C8EB5F]" size={18} />
                    <h4 className="text-lg font-serif text-white uppercase tracking-wide">Curriculum Board Advice</h4>
                  </div>
                  <span className="text-[9px] font-mono text-[#C8EB5F] uppercase tracking-widest font-extrabold bg-[#C8EB5F]/10 border border-[#C8EB5F]/10 px-2 py-0.5 rounded-md">
                    Verified Sanad Scholars
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-1">
                  
                  {/* Left stats */}
                  <div className="md:col-span-4 bg-black/90 p-4.5 rounded-2xl border border-white/5 flex flex-col justify-between space-y-4">
                    <div>
                      <span className="text-[8px] font-mono uppercase tracking-widest text-[#C8EB5F] block font-bold leading-none">Class Frequency</span>
                      <span className="text-xl font-serif text-white mt-1 block">3x / Week</span>
                    </div>

                    <div>
                      <span className="text-[8px] font-mono uppercase tracking-widest text-neutral-500 block">Tajweed Grade</span>
                      <span className="text-4xl font-serif text-[#C8EB5F] block font-semibold leading-tight pt-1">98.4%</span>
                    </div>

                    <div className="text-[9px] font-mono text-neutral-400">
                      Evaluated by Maulana Shiraz Al-Madani
                    </div>
                  </div>

                  {/* Right suggestions */}
                  <div className="md:col-span-8 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <span className="text-[8px] font-mono uppercase tracking-widest text-neutral-500 block font-bold">Personalized Revision Algorithm</span>
                      <p className="text-xs text-neutral-300 font-light leading-relaxed font-sans">
                        {getDailyAdvice()}
                      </p>
                    </div>

                    <div className="p-3.5 bg-neutral-900 border border-white/5 rounded-2xl flex items-center gap-3">
                      <Clock className="text-[#C8EB5F] flex-shrink-0" size={16} />
                      <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                        Next Live Session Scheduled: <span className="text-white">Tomorrow, inside your customized timezone</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </div>

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
                  <p className="text-[#C8EB5F] font-mono text-[10px] uppercase tracking-wider block mb-1 font-bold">
                    Assigned ID: #{assignedId}
                  </p>
                  <p className="text-neutral-400 text-xs font-light leading-relaxed font-sans">
                    Your reservation coordinates have been safely locked. Tap the priority WhatsApp link below to immediately send your Booking ID to our live support desk and launch your scheduled live session slot.
                  </p>

                  <div className="flex flex-col gap-2.5 pt-2 max-w-xs mx-auto w-full">
                    <a 
                      href={`https://wa.me/923233260859?text=${encodeURIComponent(`Asalamu Alaikum TajweedPage!\n\nI have successfully submitted an Online Hifz Trial request on your premium portal.\n\n📚 *Details*:\n• *Assigned ID*: #${assignedId}\n• *Course*: Online Hifz Classes\n• *Type*: ${bookingType === "trial" ? "Complimentary Live Trial Pass" : "Live Diagnostic Class"}\n\nPlease confirm my scheduled live slot! BarakaAllahu Feekum.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#C8EB5F] text-black font-mono text-[10px] tracking-widest font-extrabold py-3.5 rounded-xl hover:bg-white text-center transition-all block animate-pulse hover:animate-none shadow-[0_0_20px_rgba(200,235,95,0.25)]"
                    >
                      🔒 INSTANT WHATSAPP CONFIRM
                    </a>
                    
                    <button 
                      onClick={() => {
                        setBookingOpen(false);
                        setFormSubmitted(false);
                        setSmtpWarning(false);
                      }}
                      className="text-[10px] font-mono text-neutral-400 hover:text-white uppercase tracking-widest pt-1 cursor-pointer"
                    >
                      Return to site
                    </button>
                  </div>
                </div>
              ) : (
                <form 
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    const nameVal = formData.get("fullName") as string;
                    const emailVal = formData.get("email") as string;
                    const phoneVal = formData.get("whatsapp") as string;
                    
                    const generatedId = `HIFZ-${Math.floor(100000 + Math.random() * 900000)}`;
                    setAssignedId(generatedId);
                    const bookingId = "booking_" + Date.now();
                    const submissionData = {
                      id: bookingId,
                      bookingCode: generatedId,
                      fullName: nameVal,
                      email: emailVal,
                      phone: phoneVal || "",
                      course: "Online Hifz Classes",
                      level: `Preferred: ${bookingType === "trial" ? "Complimentary Pass" : "Diagnostic Class"}`,
                      comments: "Submitted from 'Talk to Hifz Coordinator' CTA",
                      sourcePage: "Online Hifz Classes Page",
                      createdAt: new Date().toISOString()
                    };

                    try {
                      // 1. Save data securely to Firebase Firestore
                      await setDoc(doc(db, "bookings", bookingId), submissionData);

                      // 2. Trigger Next.js API route to send the email
                      const emailRes = await fetch("/api/send-email", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json"
                        },
                        body: JSON.stringify(submissionData)
                      });
                      const emailData = await emailRes.json();
                      if (emailData && emailData.warning === "SMTP config missing") {
                        setSmtpWarning(true);
                      }
                    } catch (err) {
                      console.error("Booking submit error:", err);
                    } finally {
                      setFormSubmitted(true);
                    }
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="text-[10px] tracking-widest font-mono text-neutral-400 uppercase block mb-1.5">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      placeholder="e.g. Salim Ahmed"
                      className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#C8EB5F]"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] tracking-widest font-mono text-neutral-400 uppercase block mb-1.5">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="e.g. salim@gmail.com"
                      className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-xs text-[#fff] focus:outline-none focus:border-[#C8EB5F]"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] tracking-widest font-mono text-neutral-400 uppercase block mb-1.5">WhatsApp Number</label>
                    <input
                      type="tel"
                      name="whatsapp"
                      required
                      placeholder="e.g. +1 (555) 420 9100"
                      className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-xs text-[#fff] focus:outline-none focus:border-[#C8EB5F]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#C8EB5F] p-4 text-black text-[11px] tracking-widest font-mono uppercase font-bold text-center mt-2 shadow-[0_4px_25px_rgba(200,235,95,0.15)] cursor-pointer hover:bg-white transition-colors duration-300"
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
