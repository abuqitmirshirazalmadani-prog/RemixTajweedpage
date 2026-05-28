"use client";

import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { NavigationHeader } from "@/components/ui/navigation-header";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import Markdown from "react-markdown";
import { 
  ArrowUpRight, 
  Check, 
  ChevronDown, 
  ChevronRight,
  Menu, 
  X,
  Search,
  Bookmark,
  Clock,
  Share2,
  Globe,
  ArrowRight,
  BookOpen,
  Calendar,
  MessageSquare,
  Award,
  ChevronLeft,
  Plus,
  Trash2,
  Edit,
  Save,
  LogOut,
  LogIn,
  Settings,
  ShieldCheck
} from "lucide-react";

// --- Firebase Core Integrations ---
import { db, auth, handleFirestoreError, OperationType } from "@/lib/firebase";
import { 
  collection, 
  getDocs, 
  doc, 
  setDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  serverTimestamp 
} from "firebase/firestore";
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  onAuthStateChanged, 
  User 
} from "firebase/auth";

// --- Types ---
interface BlogPost {
  id: string;
  slug: string;
  category: "Tajweed" | "Kids" | "Beginners" | "Islamic Education";
  titleNL: string;
  titleEN: string;
  subtitleNL: string;
  subtitleEN: string;
  author: {
    name: string;
    title: string;
    avatar: string;
  };
  readTime: string;
  date: string;
  imageUrl: string;
  quoteNL: string;
  quoteEN: string;
  contentNL: string[];
  contentEN: string[];
  keyHighlightsNL: string[];
  keyHighlightsEN: string[];
  keywords?: string[];
  createdAt?: any;
}

// --- Sample Premium Blog Data ---
const BLOGS_DATA: BlogPost[] = [
  {
    id: "blog-1",
    slug: "perfecting-tajweed-recitation-guide",
    category: "Tajweed",
    titleNL: "De Wetenschap van Geluid: Ultieme Gids om Tajweed Elegant te Leren",
    titleEN: "The Science of Sound: Ultimate Guide to Learn Tajweed Elegantly",
    subtitleNL: "Beheers makharij-punten, tajweed regels uitgelegd, vermijd veelvoorkomende uitspraakfouten en vind rust in de recitatie.",
    subtitleEN: "Mastering makharij points, explaining core rules, avoiding common pronunciation errors, and finding peace in recitation.",
    author: {
      name: "Sheikh Abdelrahman",
      title: "Al-Azhar Universiteit Reciteerder",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop"
    },
    readTime: "8 Min",
    date: "23 Mei 2026",
    imageUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1500&auto=format&fit=crop",
    quoteNL: "\"Tajweed is niet alleen het versieren van klanken; het is de fysieke en spirituele hergeboorte van openbaring bij elke ademhaling.\"",
    quoteEN: "\"Tajweed is not merely the decoration of sounds; it is the physical and spiritual rebirth of revelation with every breath.\"",
    keyHighlightsNL: [
      "De verborgen anatomie van de 17 Makharij (articulatiepunten)",
      "Hoe de Sifat al-Huroof de emotionele toon van verzen ontsluit",
      "Diafragmatische controle en uithoudingsvermogen voor lange recitaties"
    ],
    keyHighlightsEN: [
      "The hidden anatomy of the 17 Makharij (articulation points)",
      "How Sifat al-Huroof unlocks the emotional gravity of the verses",
      "Diaphragmatic control and endurance mechanics for long recitations"
    ],
    keywords: [
      "how to learn tajweed",
      "tajweed rules explained",
      "common tajweed mistakes",
      "Makharij guide",
      "Quran pronunciation tips"
    ],
    contentNL: [
      "Het reciteren van de Nobele Koran is een kunstvorm die de grenzen van louter menselijke spraak overstijgt. Weten hoe we tajweed moeten leren is de eerste stap om de diepe spirituele schoonheid van de tekst te ontsluiten. Wanneer de tajweed regels systematisch worden uitgelegd, kan de reciteerder elke letter perfect laten klinken.",
      "In deze makharij-gids richten we ons op de zeventien articulatiepunten. De letter 'Qaf' (ق) moet bijvoorbeeld ontstaan vanuit het achterste deel van de tong tegen het zachte gehemelte. Een verschuiving hiervan is een van de veelvoorkomende tajweed-fouten die de betekenis drastisch kunnen veranderen. Onze online lessen bieden handige uitspraak-tips om deze fouten te voorkomen.",
      "Bij TajweedPage geloven we dat elke student, jong of oud, dit niveau van precisie verdient. Onze Al-Azhar docenten gebruiken live visualisatietechnieken om studenten te tonen hoe zij hun spraakorganen moeten positioneren. Het is te vergelijken met het bespelen van een fijn, traditioneel instrument - het vereist geduld, meesterschap en constante feedback van een gediplomeerde meester."
    ],
    contentEN: [
      "The recitation of the Noble Quran is an art form that transcends the boundaries of standard human speech. Knowing how to learn tajweed is the first key step to unlocking the deep spiritual beauty embedded within the text. Tajweed rules explained systematically allow the reciter to form and articulate every single glyph from its correct origin, preserving the pristine verbal legacy of the Prophet (pbuh).",
      "In this Makharij guide, we focus on the seventeen points of articulation. For instance, the letter 'Qaf' (ق) must originate from the deepest part of the tongue touching the soft palate. If shifted slightly, it dilutes into a common English 'K' sound. This is among the common tajweed mistakes that can alter the sacred meanings of the verse entirely. Proper Quran pronunciation tips recommend slow, paced breathing and live teacher feedback.",
      "At TajweedPage, we align traditional Al-Azhar teaching with modern phonetic feedback. We provide personalized mentoring focused on target muscle memory, helping you recognize active articulation errors and avoid dry classroom fatigue. Embrace the journey of perfecting your tajweed with patience, devotion, and daily elite guidance."
    ]
  },
  {
    id: "blog-2",
    slug: "nurturing-kids-quranic-journey",
    category: "Kids",
    titleNL: "Jonge Harten Voeden: Hoe Je Kinderen met Plezier de Koran Leert",
    titleEN: "Nurturing Young Hearts: How to Teach Kids Quran with Joy",
    subtitleNL: "De beste leeftijd bepalen om te beginnen, online islamitisch leren verkennen en praktische tips voor thuisbehoud.",
    subtitleEN: "Determining the best age to begin, exploring online Islamic learning, and practical tips for home retention.",
    author: {
      name: "Ustadha Fatima",
      title: "Grootmeesteres in Koran-Pedagogiek",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop"
    },
    readTime: "6 Min",
    date: "18 Mei 2026",
    imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1500&auto=format&fit=crop",
    quoteNL: "\"De geest van een kind is een puur canvas; wat in de jeugd is ingegraveerd, blijft als een in marmer gebeiteld schrift.\"",
    quoteEN: "\"A child's mind is a pure canvas; what is engraved upon it in youth remains like writing carved into absolute marble.\"",
    keyHighlightsNL: [
      "De beste leeftijd om de Koran te leren begrijpen op basis van de ontwikkeling van het kind",
      "Vernieuwende methoden om kinderen Koran te leren zonder stress",
      "De rol van online islamitisch leren voor kinderen met visuele media"
    ],
    keyHighlightsEN: [
      "Dissecting the best age to learn Quran based on child development",
      "Innovative methods on how to teach kids Quran without stress",
      "Top Quran learning tips for children using gamified online Islamic learning for kids"
    ],
    keywords: [
      "best age to learn Quran",
      "how to teach kids Quran",
      "Quran learning tips for children",
      "online Islamic learning for kids"
    ],
    contentNL: [
      "Het voeden van liefde voor de Koran in de harten van onze kinderen is een heilige taak. Veel ouders vragen zich af wat de beste leeftijd is om de Koran te leren. Hoewel het formele onderwijs vaak rond de leeftijd van vijf jaar begint, kunnen de klanken van de letters al vanaf de babytijd worden geïntroduceerd.",
      "Effectieve manieren om kinderen de Koran te leren vereisen dat we overstappen van saaie, passieve herhaling naar interactieve oefeningen. Het aanbieden van online islamitisch leren voor kinderen via leuke visuele hulpmiddelen en boeiende 1-op-1 begeleiding zorgt ervoor dat zij gemotiveerd en geconcentreerd blijven.",
      "Bij TajweedPage stemmen we onze lessen perfect af op de belevingswereld van het kind. Onze korte, dynamische sessies van 30 minuten voorkomen cognitieve overbelasting en maken de wekelijkse lessen tot een geliefd spiritueel rustpunt binnen het drukke gezinsleven."
    ],
    contentEN: [
      "Nurturing Quranic love in children is a sacred responsibility. Many parents wonder about the best age to learn Quran. While formal education often begins around five, the sonic beauty of the verses can be introduced from infancy. Knowing how to teach kids Quran requires transitioning from simple auditory exposure to interactive phonetics without creating high-pressure classroom pressure.",
      "Effective Quran learning tips for children involve creating a natural, supportive atmosphere at home. Rather than forcing passive repetition, integrate interactive online Islamic learning for kids that utilizes sensory visuals, engaging maps, and live, friendly mentors. A warm 1-on-1 online tutor can correct pronunciation instantly while building real, lasting trust.",
      "Our curriculum at TajweedPage is explicitly engineered for young learners in Western high-demanding school schedules. We offer short, highly engaging 30-minute interactive sessions. This prevents cognitive overload and encourages deep structural retention, transforming the daily Quran lesson into an eagerly anticipated spiritual sanctuary."
    ]
  },
  {
    id: "blog-3",
    slug: "absolute-beginners-quran-reading-guide",
    category: "Beginners",
    titleNL: "Van Schrift naar Genade: Koran Gids voor Beginners",
    titleEN: "From Glyphs to Grace: Beginner Quran Learning Guide",
    subtitleNL: "Een elegante routekaart over hoe je de Koran leest voor beginners met behulp van eenvoudige fonetische methoden.",
    subtitleEN: "An elegant roadmap on how to read Quran for beginners using easy, tested phonetic methods.",
    author: {
      name: "Ustad Mohammad",
      title: "Al-Azhar Gecertificeerde Instructeur",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=120&auto=format&fit=crop"
    },
    readTime: "7 Min",
    date: "12 Mei 2026",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1500&auto=format&fit=crop",
    quoteNL: "\"De gelovige die de Koran reciteert terwijl hij het moeilijk vindt, krijgt een dubbele beloning. Omarm de milde strijd van het begin.\"",
    quoteEN: "\"The believer who recites the Quran while finding it difficult gets a double reward. Embrace the sweet struggle of beginning.\"",
    keyHighlightsNL: [
      "Stappenplan over hoe je de Koran leest voor beginners",
      "Klassieke letters introduceren met eenvoudige lesmethodes",
      "Opbouwen van zelfvertrouwen en spiergeheugen bij het uitspreken"
    ],
    keyHighlightsEN: [
      "Step-by-step roadmap on how to read Quran for beginners",
      "Introducing classical letters with easy Quran learning methods",
      "Unlocking confidence and muscle memory in pronunciation"
    ],
    keywords: [
      "how to read Quran for beginners",
      "beginner Quran learning guide",
      "easy Quran learning methods"
    ],
    contentNL: [
      "Het beginnen met de Koran kan ontmoedigend lijken, maar met een gestructureerde koran-gids voor beginners kan iedereen de heilige letters leren lezen. Leren hoe je de Koran leest voor beginners draait niet om droge theorie, maar om het stap voor stap opbouwen van spiergeheugen.",
      "Bij TajweedPage bevelen wij eenvoudige leermethoden aan die starten met de beproefde Noorani Qaida basis. We focussen op mondhouding, adembeheersing en lettercombinaties. In plaats van te haasten, leren studenten om letters eerst afzonderlijk te laten klinken.",
      "Onze exclusieve, gepersonaliseerde 1-op-1 online klaslokalen zijn ontworpen om een rustige en gefocuste omgeving te bieden. Begeleid door empathische, in Al-Azhar getrainde docenten leert elke beginner op zijn of haar eigen tempo met maximaal comfort."
    ],
    contentEN: [
      "Embarking on the quest of Quranic reading can feel daunting, but with a structured beginner Quran learning guide, anyone can unlock the sacred letters. Understanding how to read Quran for beginners is not about memorizing complex linguistic jargon, but about building muscle memory step-by-step using highly specialized phonetic sequences.",
      "At TajweedPage, we recommend easy Quran learning methods that begin with the universal foundation of Noorani Qaida. We focus on mouth posture, breath control, and basic letter combinations. Rather than rushing to complete chapters, students learn to sound out letters in isolation first. This initial discipline prevents errors from solidifying into lifetime habits.",
      "Our exclusive, personalized 1-on-1 virtual classrooms are styled designed to provide a supportive, distraction-free environment. Guided by empathetic, Azhar-trained scholars, beginners learn at their own pace with absolute comfort. Join us today and transform the unfamiliar calligraphy into flowing, graceful streams of divine speech."
    ]
  },
  {
    id: "blog-4",
    slug: "importance-and-benefits-of-daily-quran",
    category: "Islamic Education",
    titleNL: "De Spirituele Pijler: Het Belang en de Dagelijkse Voordelen van Koran Leren",
    titleEN: "Celestial Echoes: The Importance & Benefits of Reading Quran Daily",
    subtitleNL: "De diepe rol van islamitisch onderwijs voor kinderen, en hoe dagelijkse reflectie de moderne geest vormgeeft.",
    subtitleEN: "The deep role of Islamic education for children, and how daily reflection reshapes the modern mind.",
    author: {
      name: "Dr. Sheikh Al-Fateh",
      title: "Bestuurslid Islamitische Studies",
      avatar: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?q=80&w=1500&auto=format&fit=crop"
    },
    readTime: "5 Min",
    date: "05 Mei 2026",
    imageUrl: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?q=80&w=1500&auto=format&fit=crop",
    quoteNL: "\"De Koran is een eeuwige bron. Degene die er dagelijks uit drinkt, droogt nooit op.\"",
    quoteEN: "\"The Quran is an eternal spring. The daily drinker of its water never runs dry.\"",
    keyHighlightsNL: [
      "Het theologische en spirituele belang van de Koran begrijpen",
      "Psychologische voordelen van het dagelijks reciteren en beluisteren",
      "Islamitisch onderwijs voor kinderen integreren in een moderne westerse samenleving"
    ],
    keyHighlightsEN: [
      "Understanding the theological importance of Quran learning",
      "Uncovering the psychological benefits of reading Quran daily",
      "Nurturing a healthy, modern Islamic education for children in the West"
    ],
    keywords: [
      "importance of Quran learning",
      "benefits of reading Quran daily",
      "Islamic education for children"
    ],
    contentNL: [
      "In een drukke, digitale wereld vol afleiding is het verankeren van jezelf in de goddelijke openbaring van cruciaal belang. Het universele belang van Koran-leren kan niet genoeg worden benadrukt; het brengt direct goddelijk licht in ons verstand en onze harten. Een van de grootste voordelen van dagelijks koranlezen is het verminderen van psychologische stress.",
      "Bovendien fungeert gedegen islamitisch onderwijs voor kinderen als een onmisbaar schild voor hun identiteit in westerse samenlevingen. Door dagelijks met de tekst bezig te zijn, ontwikkelen kinderen sterke morele kompassen en diepe historische wortels die hen beschermen in de moderne wereld.",
      "TajweedPage streeft ernaar om dit hoogwaardige, spirituele en academische onderwijs flexibel online aan te bieden. Wij combineren diepgang met modern gemak, zodat onze studenten de Koran niet alleen reciteren, maar werkelijk belichamen en leven."
    ],
    contentEN: [
      "In a fast-paced, digital epoch saturated with sensory noise, anchoring oneself to divine revelation is essential. The global importance of Quran learning cannot be overstated—it is the direct transmission of celestial light to our intellect. Among the greatest benefits of reading Quran daily is its ability to reduce psychological anxiety and soothe emotional strain.",
      "Furthermore, robust Islamic education for children serves as an unshakeable identity armor in Western societies. By studying the text daily, children develop rigorous critical-thinking faculties, strong ethical compasses, and deep historical anchors that protect them against ideological currents. It feeds both their intellect and soul.",
      "TajweedPage commits to delivering premium, high-fidelity online Islamic mentoring designed to integrate naturally into professional family life. We pair spiritual depth with modern academic excellence, ensuring that our students don't just memorize, but comprehend and embody the beautiful principles of correct manners, faith, and speech."
    ]
  }
];

// Icon components
const ContactInfoIcon = ({ type }: { type: 'website' | 'phone' | 'address' }) => {
  const icons = {
    website: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-[#C8EB5F]">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="2" x2="22" y1="12" y2="12"></line>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
      </svg>
    ),
    phone: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-[#C8EB5F]">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
      </svg>
    ),
    address: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-[#C8EB5F]">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
        <circle cx="12" cy="10" r="3"></circle>
      </svg>
    ),
  };
  return <div className="mr-2 flex-shrink-0">{icons[type]}</div>;
};

// --- CMS Helpers & Resilient Images ---
const generateSlug = (text: string) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // remove anything that is not alphanumeric, whitespace, hyphen (no underscores to pass database match rules)
    .replace(/\s+/g, "-")          // replace space with single hyphen
    .replace(/-+/g, "-")           // collapse repeat hyphens
    .replace(/^-+|-+$/g, "")       // trim leading/trailing hyphens
    .substring(0, 100);            // fit well under 128 characters
};

const cleanUrl = (input: string): string => {
  let cleaned = input.trim();
  if (!cleaned) return "";

  // Extract the last full http/https occurrence in case of bad paste/overwrite
  const secondHttps = cleaned.indexOf("https://", 1);
  const secondHttp = cleaned.indexOf("http://", 1);

  if (secondHttps !== -1) {
    cleaned = cleaned.substring(secondHttps);
  } else if (secondHttp !== -1) {
    cleaned = cleaned.substring(secondHttp);
  } else {
    // If there is preceding text before http/https, crop to the main url
    const firstHttps = cleaned.indexOf("https://");
    const firstHttp = cleaned.indexOf("http://");
    if (firstHttps > 0) {
      cleaned = cleaned.substring(firstHttps);
    } else if (firstHttp > 0) {
      cleaned = cleaned.substring(firstHttp);
    }
  }

  return cleaned;
};

const getFullContent = (content: string[] | string | undefined | null): string => {
  if (!content) return "";
  if (Array.isArray(content)) {
    return content.join("\n\n");
  }
  return content;
};

const FALLBACK_IMAGE = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><defs><linearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'><stop offset='0%25' stop-color='%2309090b'/><stop offset='100%25' stop-color='%231f1f23'/></linearGradient></defs><rect width='100%25' height='100%25' fill='url(%23g)'/><text x='50%25' y='50%25' fill='%23C8EB5F' font-family='sans-serif' font-size='14' letter-spacing='6' text-anchor='middle' dominant-baseline='middle' opacity='0.7'>TAJWEED JOURNAL</text></svg>";

function ResilientImage({ src, alt, className, fill, sizes, priority, style }: {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
  style?: React.CSSProperties;
}) {
  const [imgSrc, setImgSrc] = useState<string>(src || FALLBACK_IMAGE);
  const [hasFailedOnce, setHasFailedOnce] = useState<boolean>(false);

  useEffect(() => {
    setImgSrc(src || FALLBACK_IMAGE);
    setHasFailedOnce(false);
  }, [src]);

  const handleError = () => {
    if (!hasFailedOnce) {
      setHasFailedOnce(true);
      // First, try a high-quality standard Unsplash fallback
      setImgSrc("https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1500&auto=format&fit=crop");
    } else {
      // If that also fails or is blocked, slide in our gorgeous local vector gradient SVG reference
      setImgSrc(FALLBACK_IMAGE);
    }
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={cn(className, fill ? "absolute inset-0 w-full h-full object-cover animate-fade-in" : "")}
      sizes={sizes}
      style={style}
      loading={priority ? "eager" : "lazy"}
      onError={handleError}
      referrerPolicy="no-referrer"
    />
  );
}

export default function BlogPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [courseDropdownOpen, setCourseDropdownOpen] = useState(false);
  const [wordDropdownOpen, setWordDropdownOpen] = useState(false);
  const [usaSubpagesOpen, setUsaSubpagesOpen] = useState(false);
  const [ukSubpagesOpen, setUkSubpagesOpen] = useState(false);
  const [europeSubpagesOpen, setEuropeSubpagesOpen] = useState(true);

  // Filter States
  const [activeCategory, setActiveCategory] = useState<string>("ALLE");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Bookmark State
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  // Selected Blog for Drawer
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [readingLanguage, setReadingLanguage] = useState<"NL" | "EN">("EN");

  // Booking Modal
  const [bookingOpen, setBookingOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Form entries
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    course: "Tajweed Master Series",
    level: "Beginner",
    comments: ""
  });

  // State for interactive SEO FAQ section
  const [activeSelfFaqIndex, setActiveSelfFaqIndex] = useState<number | null>(null);

  // --- Dynamic CMS States ---
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);
  const [adminUser, setAdminUser] = useState<User | null>(null);
  const [adminPanelOpen, setAdminPanelOpen] = useState<boolean>(false);
  const [adminTab, setAdminTab] = useState<"posts" | "editor">("posts");
  const [authError, setAuthError] = useState<string | null>(null);
  const [dbSaving, setDbSaving] = useState<boolean>(false);

  // Editor states
  const [editorOpen, setEditorOpen] = useState<boolean>(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [editorData, setEditorData] = useState({
    id: "",
    category: "Tajweed" as "Tajweed" | "Kids" | "Beginners" | "Islamic Education",
    titleNL: "",
    titleEN: "",
    subtitleNL: "",
    subtitleEN: "",
    authorName: "Dr. Sheikh Al-Fateh",
    authorTitle: "Al-Azhar Board of Phonetics",
    authorAvatar: "https://picsum.photos/seed/scholar1/150/150",
    readTime: "7 Min",
    date: "",
    imageUrl: "https://picsum.photos/seed/journal/800/600",
    quoteNL: "",
    quoteEN: "",
    contentNL: "",
    contentEN: "",
    keyHighlightsNL: "",
    keyHighlightsEN: "",
  });

  // Prevent parent body scroll when overlay sheets/modals are active to eliminate double scrollbars
  useEffect(() => {
    if (typeof document !== "undefined") {
      const htmlEl = document.documentElement;
      const bodyEl = document.body;
      if (selectedBlog || bookingOpen || adminPanelOpen) {
        bodyEl.classList.add("no-scroll", "overflow-hidden");
        htmlEl.classList.add("no-scroll", "overflow-hidden");
        bodyEl.style.setProperty("overflow", "hidden", "important");
        htmlEl.style.setProperty("overflow", "hidden", "important");
        bodyEl.style.setProperty("height", "100%", "important");
        htmlEl.style.setProperty("height", "100%", "important");
      } else {
        bodyEl.classList.remove("no-scroll", "overflow-hidden");
        htmlEl.classList.remove("no-scroll", "overflow-hidden");
        bodyEl.style.removeProperty("overflow");
        htmlEl.style.removeProperty("overflow");
        bodyEl.style.removeProperty("height");
        htmlEl.style.removeProperty("height");
      }
    }
    return () => {
      if (typeof document !== "undefined") {
        const htmlEl = document.documentElement;
        const bodyEl = document.body;
        bodyEl.classList.remove("no-scroll", "overflow-hidden");
        htmlEl.classList.remove("no-scroll", "overflow-hidden");
        bodyEl.style.removeProperty("overflow");
        htmlEl.style.removeProperty("overflow");
        bodyEl.style.removeProperty("height");
        htmlEl.style.removeProperty("height");
      }
    };
  }, [selectedBlog, bookingOpen, adminPanelOpen]);

  // Load Bookmarks from LocalStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("tp_blog_bookmarks");
      if (saved) {
        setBookmarks(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Update Bookmarks
  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    let updated: string[];
    if (bookmarks.includes(id)) {
      updated = bookmarks.filter(b => b !== id);
    } else {
      updated = [...bookmarks, id];
    }
    setBookmarks(updated);
    try {
      localStorage.setItem("tp_blog_bookmarks", JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }
  };

  // --- URL Admin mode auto trigger ---
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("admin") === "true") {
        setAdminPanelOpen(true);
      }
    }
  }, []);

  // --- Auth State Change Listener ---
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const isVerAdmin = user.email === "abuqitmirshirazalmadani@gmail.com";
        setIsAdminLoggedIn(isVerAdmin);
        setAdminUser(user);
        if (isVerAdmin) {
          setAuthError(null);
        } else {
          setAuthError("Access denied: Only the authorized administrator may log in and edit the journal.");
        }
      } else {
        setIsAdminLoggedIn(false);
        setAdminUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // --- Firestore Data Fetching ---
  const loadBlogsFromDb = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "blogs")); // load blogs query
      const snapshot = await getDocs(q);
      const loaded: BlogPost[] = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        loaded.push({
          id: data.id,
          slug: data.slug,
          category: data.category,
          titleNL: data.titleNL,
          titleEN: data.titleEN,
          subtitleNL: data.subtitleNL,
          subtitleEN: data.subtitleEN,
          author: data.author,
          readTime: data.readTime,
          date: data.date,
          imageUrl: data.imageUrl,
          quoteNL: data.quoteNL,
          quoteEN: data.quoteEN,
          contentNL: data.contentNL || [],
          contentEN: data.contentEN || [],
          keyHighlightsNL: data.keyHighlightsNL || [],
          keyHighlightsEN: data.keyHighlightsEN || [],
          keywords: data.keywords || [],
          createdAt: data.createdAt
        });
      });

      if (loaded.length === 0) {
        // Fallback to initial seed array to show content instantly on empty database
        setBlogs(BLOGS_DATA);
      } else {
        // Sort descending by createdAt
        loaded.sort((a, b) => {
          const aTime = a.createdAt?.seconds || new Date(a.date).getTime() || 0;
          const bTime = b.createdAt?.seconds || new Date(b.date).getTime() || 0;
          return bTime - aTime;
        });
        setBlogs(loaded);
      }
    } catch (err) {
      console.error("Firestore read error, serving offline seed fallback: ", err);
      setBlogs(BLOGS_DATA);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlogsFromDb();
  }, []);

  // --- Login & Logout Actions ---
  const handleAdminLogin = async () => {
    setAuthError(null);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const isVerAdmin = result.user.email === "abuqitmirshirazalmadani@gmail.com";
      if (!isVerAdmin) {
        // Non-admin signed in, force sign out to protect credentials
        await signOut(auth);
        setAuthError("Access denied: Only abuqitmirshirazalmadani@gmail.com can log in.");
      }
    } catch (err) {
      console.error("Popup Auth Error:", err);
      setAuthError("Login failed via Google Popup.");
    }
  };

  const handleAdminLogout = async () => {
    try {
      await signOut(auth);
      setIsAdminLoggedIn(false);
      setAdminPanelOpen(false);
      setAuthError(null);
    } catch (err) {
      console.error("Signout Error:", err);
    }
  };

  // --- Dynamic Database Bootstrapping ---
  const handleBootstrapDb = async () => {
    if (!isAdminLoggedIn) return;
    setDbSaving(true);
    try {
      for (const blog of BLOGS_DATA) {
        const docRef = doc(db, "blogs", blog.id);
        const payload = {
          ...blog,
          createdAt: serverTimestamp()
        };
        await setDoc(docRef, payload);
      }
      alert("Database initialized with default articles!");
      await loadBlogsFromDb();
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, "blogs/bootstrap");
    } finally {
      setDbSaving(false);
    }
  };

  // --- Editor Open, Draft & Save actions ---
  const openEditor = (post: BlogPost | null) => {
    if (post) {
      setEditingPost(post);
      setEditorData({
        id: post.id,
        category: post.category,
        titleNL: post.titleNL,
        titleEN: post.titleEN,
        subtitleNL: post.subtitleNL,
        subtitleEN: post.subtitleEN,
        authorName: post.author.name,
        authorTitle: post.author.title,
        authorAvatar: post.author.avatar,
        readTime: post.readTime,
        date: post.date,
        imageUrl: post.imageUrl,
        quoteNL: post.quoteNL,
        quoteEN: post.quoteEN,
        contentNL: post.contentNL.join("\n\n"),
        contentEN: post.contentEN.join("\n\n"),
        keyHighlightsNL: post.keyHighlightsNL.join("\n"),
        keyHighlightsEN: post.keyHighlightsEN.join("\n"),
      });
    } else {
      setEditingPost(null);
      setEditorData({
        id: "",
        category: "Tajweed",
        titleNL: "",
        titleEN: "",
        subtitleNL: "",
        subtitleEN: "",
        authorName: "Dr. Sheikh Al-Fateh",
        authorTitle: "Al-Azhar Board of Phonetics",
        authorAvatar: "https://picsum.photos/seed/scholar1/150/150",
        readTime: "7 Min",
        date: new Date().toLocaleDateString("en-US", { day: 'numeric', month: 'long', year: 'numeric' }),
        imageUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1500&auto=format&fit=crop",
        quoteNL: "",
        quoteEN: "",
        contentNL: "",
        contentEN: "",
        keyHighlightsNL: "",
        keyHighlightsEN: "",
      });
    }
    setAdminTab("editor");
    setAdminPanelOpen(true);
  };

  const handleEditorSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdminLoggedIn) return;
    setDbSaving(true);

    const docId = generateSlug(editorData.id || editorData.titleEN || editorData.titleNL);
    if (!docId) {
      alert("Please enter a valid unique identifier slug or supply a title.");
      setDbSaving(false);
      return;
    }

    try {
      const contentNLArr = editorData.contentNL.split("\n\n").map(p => p.trim()).filter(p => p !== "");
      const contentENArr = editorData.contentEN.split("\n\n").map(p => p.trim()).filter(p => p !== "");
      const highlightsNLArr = editorData.keyHighlightsNL.split("\n").map(l => l.trim()).filter(l => l !== "");
      const highlightsENArr = editorData.keyHighlightsEN.split("\n").map(l => l.trim()).filter(l => l !== "");

      const docRef = doc(db, "blogs", docId);
      const payload: any = {
        id: docId,
        slug: docId,
        category: editorData.category,
        titleNL: editorData.titleNL,
        titleEN: editorData.titleEN,
        subtitleNL: editorData.subtitleNL,
        subtitleEN: editorData.subtitleEN,
        author: {
          name: editorData.authorName,
          title: editorData.authorTitle,
          avatar: editorData.authorAvatar,
        },
        readTime: editorData.readTime,
        date: editorData.date,
        imageUrl: editorData.imageUrl,
        quoteNL: editorData.quoteNL,
        quoteEN: editorData.quoteEN,
        contentNL: contentNLArr,
        contentEN: contentENArr,
        keyHighlightsNL: highlightsNLArr,
        keyHighlightsEN: highlightsENArr,
        keywords: editingPost?.keywords || []
      };

      if (editingPost) {
        payload.createdAt = editingPost.createdAt || serverTimestamp();
        await setDoc(docRef, payload, { merge: true });
      } else {
        payload.createdAt = serverTimestamp();
        await setDoc(docRef, payload);
      }

      setAdminTab("posts");
      setEditingPost(null);
      await loadBlogsFromDb();
    } catch (err) {
      handleFirestoreError(err, editingPost ? OperationType.UPDATE : OperationType.CREATE, `blogs/${docId}`);
    } finally {
      setDbSaving(false);
    }
  };

  const handleDeletePost = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAdminLoggedIn) return;
    if (!confirm("Are you sure you want to delete this article from the live database?")) return;

    try {
      const docRef = doc(db, "blogs", id);
      await deleteDoc(docRef);
      await loadBlogsFromDb();
      if (selectedBlog?.id === id) {
        setSelectedBlog(null);
      }
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `blogs/${id}`);
    }
  };

  const categories = ["ALLE", "Tajweed", "Kids", "Beginners", "Islamic Education"];

  // Filtering Logic
  const filteredBlogs = blogs.filter(blog => {
    const matchesCategory = activeCategory === "ALLE" || blog.category === activeCategory;
    const matchesSearch = 
      blog.titleNL.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.titleEN.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.subtitleNL.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.subtitleEN.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const bookingId = "booking_" + Date.now();
    const submissionData = {
      id: bookingId,
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone || "",
      course: formData.course,
      level: formData.level,
      comments: formData.comments || "",
      sourcePage: "Blog Page Portal CTA",
      createdAt: new Date().toISOString()
    };

    try {
      // 1. Save data securely to Firebase Firestore
      await setDoc(doc(db, "bookings", bookingId), submissionData);

      // 2. Trigger Next.js API route to send the email
      await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(submissionData)
      });
    } catch (err) {
      console.error("Booking registry error:", err);
    } finally {
      setIsSubmitting(false);
      setFormSubmitted(true);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white font-sans selection:bg-[#C8EB5F] selection:text-black leading-normal overflow-x-hidden id-main-container">
      
      {/* Premium Header/Navigation */}
      <NavigationHeader onTrialClick={() => {}} />
      <nav className="hidden sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/5 py-4 px-6 md:px-12 id-nav-bar">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          
          <Link href="/" className="flex items-center gap-2" id="nav-brand-logo">
            <div className="w-8 h-8 rounded-lg bg-[#C8EB5F] text-black font-mono font-bold flex items-center justify-center text-sm shadow-[0_0_15px_rgba(200,235,95,0.4)]">
              TP
            </div>
            <div>
              <span className="font-serif text-base tracking-widest text-white block uppercase">TajweedPage</span>
              <span className="font-mono text-[8px] tracking-[0.3em] text-[#C8EB5F] block uppercase font-bold">DIGITAAL JOURNAL</span>
            </div>
          </Link>

          {/* Desktop Navigation links */}
          <div className="hidden lg:flex items-center gap-8 text-xs font-mono tracking-widest uppercase" id="nav-desktop-links">
            
            {/* Courses Dropdown */}
            <div 
              className="relative group py-2"
              onMouseEnter={() => setCourseDropdownOpen(true)}
              onMouseLeave={() => setCourseDropdownOpen(false)}
              id="courses-dropdown-trigger"
            >
              <button className="flex items-center gap-1 hover:text-[#C8EB5F] transition-colors duration-300 outline-none cursor-pointer">
                <span>Courses</span>
                <ChevronDown size={11} className={cn("transition-transform duration-300", courseDropdownOpen ? "rotate-180" : "")} />
              </button>
              
              <div className={cn(
                "absolute top-full left-1/2 -translate-x-1/2 pt-2 w-72 transition-all duration-300 z-50",
                courseDropdownOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2 pointer-events-none"
              )}>
                <div className="bg-zinc-950 border border-white/10 rounded-2xl p-2.5 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
                                    <Link href="/courses/tajweed-course" className="block px-4 py-2.5 text-[10px] tracking-wider font-mono text-neutral-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
                    Tajweed Course Master Series
                  </Link>
                  <div className="h-px bg-white/5 my-1" />
<Link href="/courses/female-quran-teacher-online" className="block px-4 py-2.5 text-[10px] tracking-wider font-mono text-neutral-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
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
                </div>
              </div>
            </div>

            <Link href="/quran-classes-for-kids" className="hover:text-[#C8EB5F] transition-colors duration-300">Kids Quran</Link>
            
            {/* World Timings dropdown */}
            <div 
              className="relative group py-2"
              onMouseEnter={() => setWordDropdownOpen(true)}
              onMouseLeave={() => setWordDropdownOpen(false)}
              id="world-timings-dropdown-trigger"
            >
              <button className="flex items-center gap-1 hover:text-[#C8EB5F] transition-colors duration-300 outline-none cursor-pointer">
                <span className="text-[#C8EB5F] font-bold uppercase tracking-widest">Quran in the world</span>
                <ChevronDown size={11} className={cn("transition-transform duration-300 text-[#C8EB5F]", wordDropdownOpen ? "rotate-180" : "")} />
              </button>
              
              <div className={cn(
                "absolute top-full left-1/2 -translate-x-1/2 pt-2 w-56 transition-all duration-300 z-50",
                wordDropdownOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2 pointer-events-none"
              )}>
                <div className="bg-zinc-950 border border-white/10 rounded-2xl p-2.5 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
                  
                  {/* USA Classes Dropdown */}
                  <div className="flex items-center justify-between px-4 py-2 hover:bg-white/5 rounded-xl cursor-pointer" onClick={() => setUsaSubpagesOpen(!usaSubpagesOpen)}>
                    <Link href="/quran-classes-in-usa" onClick={(e) => e.stopPropagation()} className="block text-[10px] tracking-wider font-mono text-neutral-400 hover:text-white transition-colors font-bold">
                      Quran Classes in USA
                    </Link>
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setUsaSubpagesOpen(!usaSubpagesOpen);
                      }}
                      className="p-0.5 hover:text-[#C8EB5F] text-neutral-400 focus:outline-none transition-colors"
                    >
                      <ChevronRight size={12} className={cn("transition-transform duration-200", usaSubpagesOpen ? "rotate-90 text-[#C8EB5F]" : "")} />
                    </button>
                  </div>
                  {usaSubpagesOpen && (
                    <div className="pl-4 pr-1 py-1 space-y-0.5 border-l border-white/10 ml-4 mb-2">
                      <Link href="/online-quran-classes-california" className="block px-3 py-1.5 text-[9px] tracking-wider font-mono text-neutral-400 hover:text-[#C8EB5F] hover:bg-white/5 rounded-lg transition-colors">
                        • California
                      </Link>
                      <Link href="/online-quran-classes-chicago" className="block px-3 py-1.5 text-[9px] tracking-wider font-mono text-neutral-400 hover:text-[#C8EB5F] hover:bg-white/5 rounded-lg transition-colors">
                        • Chicago
                      </Link>
                      <Link href="/online-quran-classes-new-york" className="block px-3 py-1.5 text-[9px] tracking-wider font-mono text-neutral-400 hover:text-[#C8EB5F] hover:bg-white/5 rounded-lg transition-colors">
                        • New York
                      </Link>
                      <Link href="/online-quran-classes-texas" className="block px-3 py-1.5 text-[9px] tracking-wider font-mono text-neutral-400 hover:text-[#C8EB5F] hover:bg-white/5 rounded-lg transition-colors">
                        • Texas
                      </Link>
                    </div>
                  )}

                  <div className="h-px bg-white/5 my-1" />

                  {/* UK Classes Dropdown */}
                  <div className="flex items-center justify-between px-4 py-2 hover:bg-white/5 rounded-xl cursor-pointer" onClick={() => setUkSubpagesOpen(!ukSubpagesOpen)}>
                    <Link href="/quran-classes-in-uk" onClick={(e) => e.stopPropagation()} className="block text-[10px] tracking-wider font-mono text-neutral-400 hover:text-white transition-colors font-bold">
                      Quran Classes in UK
                    </Link>
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setUkSubpagesOpen(!ukSubpagesOpen);
                      }}
                      className="p-0.5 hover:text-[#C8EB5F] text-neutral-400 focus:outline-none transition-colors"
                    >
                      <ChevronRight size={12} className={cn("transition-transform duration-200", ukSubpagesOpen ? "rotate-90 text-[#C8EB5F]" : "")} />
                    </button>
                  </div>
                  {ukSubpagesOpen && (
                    <div className="pl-4 pr-1 py-1 space-y-0.5 border-l border-white/10 ml-4 mb-2">
                      <Link href="/online-quran-classes-london" className="block px-3 py-1.5 text-[9px] tracking-wider font-mono text-neutral-400 hover:text-[#C8EB5F] hover:bg-white/5 rounded-lg transition-colors">
                        • London
                      </Link>
                      <Link href="/online-quran-classes-manchester" className="block px-3 py-1.5 text-[9px] tracking-wider font-mono text-neutral-400 hover:text-[#C8EB5F] hover:bg-white/5 rounded-lg transition-colors">
                        • Manchester
                      </Link>
                      <Link href="/online-quran-classes-birmingham" className="block px-3 py-1.5 text-[9px] tracking-wider font-mono text-neutral-400 hover:text-[#C8EB5F] hover:bg-white/5 rounded-lg transition-colors">
                        • Birmingham
                      </Link>
                    </div>
                  )}

                  <div className="h-px bg-white/5 my-1" />

                  {/* Europe Dropdown */}
                  <div className="flex items-center justify-between px-4 py-2 hover:bg-white/5 rounded-xl cursor-pointer" onClick={() => setEuropeSubpagesOpen(!europeSubpagesOpen)}>
                    <Link href="/quran-in-the-world/quran-classes-in-europe" onClick={(e) => e.stopPropagation()} className="block text-[10px] tracking-wider font-mono text-[#C8EB5F] hover:text-[#C8EB5F] transition-colors font-bold">
                      Quran Classes in Europe ✦
                    </Link>
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setEuropeSubpagesOpen(!europeSubpagesOpen);
                      }}
                      className="p-0.5 hover:text-[#C8EB5F] text-neutral-400 focus:outline-none transition-colors"
                    >
                      <ChevronRight size={12} className={cn("transition-transform duration-200", europeSubpagesOpen ? "rotate-90 text-[#C8EB5F]" : "")} />
                    </button>
                  </div>
                  {europeSubpagesOpen && (
                    <div className="pl-4 pr-1 py-1 space-y-0.5 border-l border-white/10 ml-4 mb-2">
                      <Link href="/online-quran-classes-germany" className="block px-3 py-1.5 text-[9px] tracking-wider font-mono text-neutral-400 hover:text-[#C8EB5F] hover:bg-white/5 rounded-lg transition-colors">
                        • Germany
                      </Link>
                      <Link href="/online-quran-classes-france" className="block px-3 py-1.5 text-[9px] tracking-wider font-mono text-neutral-400 hover:text-[#C8EB5F] hover:bg-white/5 rounded-lg transition-colors">
                        • France
                      </Link>
                      <Link href="/online-quran-classes-netherlands" className="block px-3 py-1.5 text-[9px] tracking-wider font-mono text-neutral-400 hover:text-[#C8EB5F] hover:bg-white/5 rounded-lg transition-colors">
                        • Netherlands
                      </Link>
                    </div>
                  )}

                  <div className="h-px bg-white/5 my-1" />
                  <Link href="/quran-in-the-world" className="block px-4 py-3 text-[10px] tracking-wider font-mono text-neutral-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-semibold">
                    All Global Timings
                  </Link>
                </div>
              </div>
            </div>

            <Link href="/blog" className="text-[#C8EB5F] border-b border-[#C8EB5F]/40 transition-all font-bold">Journal</Link>
          </div>

          <button 
            onClick={() => {
              setBookingOpen(true);
            }}
            className="hidden sm:block px-6 py-2.5 bg-white text-black font-mono text-[10px] font-bold uppercase tracking-widest rounded-lg hover:bg-[#C8EB5F] transition-all duration-300 cursor-pointer"
            id="book-trial-class-btn"
          >
            FREE TRIAL CLASS
          </button>

          {/* Handheld Hamburger button */}
          <button 
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2 text-white hover:text-[#C8EB5F] transition-colors"
            id="mobile-drawer-hamburger"
          >
            <Menu size={24} />
          </button>

        </div>
      </nav>

      {/* Handheld drawer menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed inset-0 z-50 bg-black/98 flex flex-col p-6 overflow-y-auto"
            id="mobile-menu-drawer-panel"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="font-serif text-lg tracking-widest text-[#C8EB5F] uppercase">TAJWEEDPAGE</span>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-neutral-400 hover:text-white">
                <X size={24} />
              </button>
            </div>

            <div className="flex flex-col gap-6 items-center text-center my-auto py-8">
              <Link href="/courses/tajweed-course" className="text-lg tracking-widest uppercase text-white hover:text-[#C8EB5F]" onClick={() => setMobileMenuOpen(false)}>Tajweed Course</Link>
              <Link href="/quran-classes-for-kids" className="text-lg tracking-widest uppercase text-white hover:text-[#C8EB5F]" onClick={() => setMobileMenuOpen(false)}>Kids Quran</Link>
              
              {/* USA Mobile Collapsible Subitems */}
              <div className="flex flex-col items-center gap-1.5">
                <div className="flex items-center gap-2">
                  <Link 
                    href="/quran-classes-in-usa" 
                    className="text-lg tracking-widest uppercase text-white hover:text-[#C8EB5F] transition-colors font-serif font-light"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Quran Classes in USA
                  </Link>
                  <button 
                    onClick={() => setUsaSubpagesOpen(!usaSubpagesOpen)}
                    className="p-1 hover:text-[#C8EB5F] text-neutral-400 focus:outline-none"
                  >
                    <ChevronRight size={14} className={cn("transition-transform duration-200", usaSubpagesOpen ? "rotate-90 text-[#C8EB5F]" : "")} />
                  </button>
                </div>
                {usaSubpagesOpen && (
                  <div className="flex flex-col items-center gap-1 pl-3 border-l border-white/10 my-1">
                    <Link href="/online-quran-classes-california" className="text-xs uppercase tracking-wider text-neutral-400 hover:text-[#C8EB5F]" onClick={() => setMobileMenuOpen(false)}>• California</Link>
                    <Link href="/online-quran-classes-chicago" className="text-xs uppercase tracking-wider text-neutral-400 hover:text-[#C8EB5F]" onClick={() => setMobileMenuOpen(false)}>• Chicago</Link>
                    <Link href="/online-quran-classes-new-york" className="text-xs uppercase tracking-wider text-neutral-400 hover:text-[#C8EB5F]" onClick={() => setMobileMenuOpen(false)}>• New York</Link>
                    <Link href="/online-quran-classes-texas" className="text-xs uppercase tracking-wider text-neutral-400 hover:text-[#C8EB5F]" onClick={() => setMobileMenuOpen(false)}>• Texas</Link>
                  </div>
                )}
              </div>

              {/* Europe Mobile Collapsible */}
              <div className="flex flex-col items-center gap-1.5">
                <div className="flex items-center gap-2">
                  <Link 
                    href="/quran-in-the-world/quran-classes-in-europe" 
                    className="text-lg tracking-widest uppercase text-[#C8EB5F] hover:text-[#C8EB5F] transition-colors font-serif font-light font-bold"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Quran Classes in Europe ✦
                  </Link>
                  <button 
                    onClick={() => setEuropeSubpagesOpen(!europeSubpagesOpen)}
                    className="p-1 hover:text-[#C8EB5F] text-neutral-400 focus:outline-none"
                  >
                    <ChevronRight size={14} className={cn("transition-transform duration-200", europeSubpagesOpen ? "rotate-90 text-[#C8EB5F]" : "")} />
                  </button>
                </div>
                {europeSubpagesOpen && (
                  <div className="flex flex-col items-center gap-1 pl-3 border-l border-white/10 my-1">
                    <Link href="/online-quran-classes-germany" className="text-xs uppercase tracking-wider text-neutral-400 hover:text-[#C8EB5F]" onClick={() => setMobileMenuOpen(false)}>• Germany</Link>
                    <Link href="/online-quran-classes-france" className="text-xs uppercase tracking-wider text-neutral-400 hover:text-[#C8EB5F]" onClick={() => setMobileMenuOpen(false)}>• France</Link>
                    <Link href="/online-quran-classes-netherlands" className="text-xs uppercase tracking-wider text-neutral-400 hover:text-[#C8EB5F]" onClick={() => setMobileMenuOpen(false)}>• Netherlands</Link>
                  </div>
                )}
              </div>

              <Link href="/blog" className="text-lg tracking-widest uppercase text-[#C8EB5F] underline underline-offset-8 decoration-[#C8EB5F]/50" onClick={() => setMobileMenuOpen(false)}>Journal</Link>
            </div>

            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                setBookingOpen(true);
              }}
              className="w-full bg-[#C8EB5F] p-4 text-black text-xs font-mono font-bold uppercase tracking-widest text-center shadow-lg cursor-pointer mt-auto rounded-xl"
            >
              FREE TRIAL CLASS
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      <section className="relative pt-24 pb-12 px-6 bg-black flex flex-col items-center justify-center text-center z-10 id-hero-section">
        <div className="max-w-4xl mx-auto space-y-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-[#C8EB5F]/10 text-[#C8EB5F] text-[10px] font-mono font-bold tracking-[0.3em] uppercase px-4 py-1.5 rounded-full border border-[#C8EB5F]/20 shadow-[0_0_15px_rgba(200,235,95,0.1)]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8EB5F] animate-pulse" /> SCIENTIFIC JOURNAL
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-8xl font-sans font-black tracking-tighter leading-none uppercase text-white"
          >
            DISCOVER OUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-400 to-[#C8EB5F]">JOURNAL</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xs sm:text-sm text-neutral-400 font-mono tracking-wide uppercase"
          >
            Stay up-to-date with our latest blog posts & scholastic research circles.
          </motion.p>
        </div>
      </section>

      {/* Cinematic Spotlight: Huge Featured Story Block (Screenshot 5 & 6) */}
      {blogs.length > 0 && (() => {
        const featured = blogs[0];
        return (
          <section className="max-w-7xl mx-auto px-6 md:px-12 pb-16 relative z-10 id-featured-spotlight">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="group relative rounded-[32px] overflow-hidden border border-white/10 bg-zinc-950 shadow-[0_30px_80px_rgba(0,0,0,0.8)]"
            >
              {/* Image background aspect */}
              <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[500px]">
                
                {/* Widescreen visual on left */}
                <div className="lg:col-span-7 relative min-h-[300px] lg:min-h-[500px]">
                  <ResilientImage 
                    src={featured.imageUrl || "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1500&auto=format&fit=crop"} 
                    alt={readingLanguage === "NL" ? featured.titleNL : featured.titleEN}
                    fill
                    className="group-hover:scale-102 transition-transform duration-[1200ms] ease-out saturate-[0.85] group-hover:saturate-100"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black via-black/40 to-transparent" />
                  
                  {/* Featured Story Indicator Ribbon inside Photo */}
                  <div className="absolute top-6 left-6 z-10 bg-black/80 backdrop-blur-md px-4 py-2 border border-white/15 rounded-full text-[9px] font-mono tracking-[0.25em] text-[#C8EB5F] uppercase font-bold">
                    FEATURED STORY
                  </div>
                </div>

                {/* Editorial text context on right */}
                <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-between bg-[#080808] border-t lg:border-t-0 lg:border-l border-white/5 space-y-8">
                  <div className="space-y-4">
                    <span className="inline-block px-3 py-1 rounded bg-[#C8EB5F]/10 border border-[#C8EB5F]/20 text-[9px] font-mono tracking-widest text-[#C8EB5F] font-bold uppercase">
                      {featured.category.toUpperCase()}
                    </span>
                    
                    <h2 className="text-3xl md:text-4xl lg:text-[44px] font-sans font-black tracking-tighter leading-none uppercase text-white transition-colors duration-300">
                      {readingLanguage === "NL" ? featured.titleNL : featured.titleEN}
                    </h2>

                    <p className="text-neutral-400 font-sans text-xs sm:text-sm font-light leading-relaxed">
                      {readingLanguage === "NL" ? featured.subtitleNL : featured.subtitleEN}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-white/5 flex flex-wrap items-center justify-between gap-6">
                    {/* Scholar bio */}
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-10 rounded-full border border-white/10 overflow-hidden shrink-0">
                        <Image 
                          src={featured.author.avatar} 
                          alt={featured.author.name} 
                          fill 
                          className="object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div>
                        <p className="text-[10px] font-mono font-bold text-white tracking-wider uppercase leading-none">
                          {featured.author.name.toUpperCase()}
                        </p>
                        <p className="text-[9px] font-sans text-neutral-500 mt-1 uppercase">
                          {featured.date} • {featured.readTime.toUpperCase()} READ
                        </p>
                      </div>
                    </div>

                    {/* Elite CTA rounded white capsule (Screenshot 6) */}
                    <button
                      onClick={() => {
                        setSelectedBlog(featured);
                        setReadingLanguage("EN");
                      }}
                      className="px-6 py-3 bg-white hover:bg-[#C8EB5F] text-black font-mono text-[10px] font-bold uppercase tracking-widest rounded-full transition-all duration-300 flex items-center gap-1 shadow-lg cursor-pointer shrink-0"
                    >
                      READ STORY <ArrowRight size={12} className="ml-1" />
                    </button>
                  </div>
                </div>

              </div>
            </motion.div>
          </section>
        );
      })()}

      {/* Category Grid Section: Left Sidebar Filter & Two-column Card Grid (Screenshot 7) */}
      <section className="bg-black py-12 border-t border-white/5 relative z-10 id-the-journal-body">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Header of Grid Section (THE JOURNAL • COUNT) */}
          <div className="flex justify-between items-baseline pb-5 border-b border-white/10 mb-10">
            <h2 className="font-sans font-black text-3xl md:text-4xl tracking-tight text-white uppercase">
              THE JOURNAL
            </h2>
            <span className="font-mono text-[10px] tracking-[0.2em] text-[#888] uppercase">
              {filteredBlogs.length} ARTICLES FOUND
            </span>
          </div>

          {/* Admin Banner */}
          {isAdminLoggedIn && (
            <div className="mb-12 border border-[#C8EB5F]/20 bg-zinc-950/85 backdrop-blur-md rounded-[24px] p-6 flex flex-col sm:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-[#C8EB5F]/10 rounded-xl text-[#C8EB5F]">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h4 className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#C8EB5F] font-bold">Administrator Panel Active</h4>
                  <p className="text-xs text-neutral-400 font-light mt-0.5">Logged in as abuqitmirshirazalmadani@gmail.com</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => openEditor(null)}
                  className="px-5 py-2.5 bg-[#C8EB5F] hover:bg-white text-black text-[10px] font-mono font-bold uppercase tracking-widest rounded-lg transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Plus size={12} />
                  Add New Article
                </button>
                <button
                  onClick={handleBootstrapDb}
                  disabled={dbSaving}
                  className="px-5 py-2.5 bg-zinc-900 border border-white/10 hover:border-[#C8EB5F] text-neutral-200 hover:text-[#C8EB5F] text-[10px] font-mono font-bold uppercase tracking-widest rounded-lg transition-all cursor-pointer disabled:opacity-50"
                >
                  {dbSaving ? "Synchronizing..." : "Restore Default Data"}
                </button>
                <button
                  onClick={() => setAdminPanelOpen(true)}
                  className="px-5 py-2.5 bg-zinc-900 border border-white/10 hover:border-[#C8EB5F] text-neutral-200 hover:text-white text-[10px] font-mono font-bold uppercase tracking-widest rounded-lg transition-all cursor-pointer"
                >
                  Open Admin Hub
                </button>
              </div>
            </div>
          )}

          {/* Dual Columns layout for the Blog Directory */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Column Sidebar - Category filter list (Screenshot 7) */}
            <div className="lg:col-span-3 space-y-10">
              
              <div className="space-y-6">
                <span className="text-[10px] font-mono tracking-widest text-[#888] uppercase block">
                  FILTER BY CATEGORY
                </span>
                
                <div className="flex flex-col gap-2.5">
                  {categories.map((cat) => {
                    const isActive = activeCategory === cat || (cat === "ALLE" && activeCategory === "ALLE");
                    return (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={cn(
                          "w-full text-left px-5 py-3 rounded-2xl text-[11px] font-mono uppercase tracking-widest transition-all duration-300 cursor-pointer",
                          isActive
                            ? "bg-[#C8EB5F] text-black font-extrabold shadow-[0_4px_20px_rgba(200,235,95,0.25)]"
                            : "bg-transparent text-neutral-400 hover:text-white hover:bg-white/5"
                        )}
                      >
                        {cat === "ALLE" ? "ALL INSIGHTS" : cat}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Newsletter card: "STAY INFORMED" (Screenshot 7) */}
              <div className="p-6 bg-[#0c0c0e] border border-white/5 rounded-3xl space-y-4">
                <span className="text-[9px] font-mono tracking-[0.2em] text-[#C8EB5F] uppercase block font-bold">
                  STAY INFORMED
                </span>
                <p className="text-[11px] text-neutral-400 leading-relaxed">
                  Join our community of engineers, readers, and innovators. No spam, just pure technical and scholastic insights delivered weekly.
                </p>
                <div className="space-y-2">
                  <input 
                    type="email" 
                    placeholder="sheraz@gmail.com" 
                    className="w-full bg-black border border-white/10 text-white placeholder-neutral-700 text-[10px] px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-[#C8EB5F] transition-all font-mono"
                  />
                  <button className="w-full bg-[#C8EB5F] hover:bg-white text-black font-mono text-[9px] uppercase font-bold tracking-widest py-2.5 rounded-xl transition-all cursor-pointer shadow-[0_4px_15px_rgba(200,235,95,0.15)]">
                    SUBSCRIBE NOW
                  </button>
                </div>
              </div>

            </div>

            {/* Right Column Grid - 2 Column Cards Grid of stories (Screenshot 7) */}
            <div className="lg:col-span-9">
              {filteredBlogs.length === 0 ? (
                <div className="text-center py-20 border border-white/5 rounded-[32px] bg-zinc-950/40">
                  <BookOpen className="h-10 w-10 text-neutral-600 mx-auto mb-4" />
                  <p className="text-lg font-serif font-light text-neutral-400">No articles found in this category of our journal.</p>
                  <button 
                    onClick={() => { setActiveCategory("ALLE"); setSearchQuery(""); }} 
                    className="mt-4 px-6 py-2 border border-[#C8EB5F] text-[#C8EB5F] text-xs font-mono uppercase tracking-widest rounded-lg hover:bg-[#C8EB5F] hover:text-black transition-all"
                  >
                    Reset all filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                  {filteredBlogs.map((blog) => {
                    const isBookmarked = bookmarks.includes(blog.id);
                    return (
                      <motion.div
                        key={blog.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.6 }}
                        className="group flex flex-col justify-between h-full bg-[#050505] border border-white/5 rounded-[28px] overflow-hidden hover:border-[#C8EB5F]/20 hover:shadow-[0_15px_40px_rgba(200,235,95,0.02)] transition-all duration-500"
                      >
                        <div>
                          {/* Card Photo visual */}
                          <div 
                            onClick={() => {
                              setSelectedBlog(blog);
                              setReadingLanguage("EN");
                            }}
                            className="relative h-60 w-full overflow-hidden cursor-pointer bg-zinc-900"
                          >
                            <ResilientImage 
                              src={blog.imageUrl} 
                              alt={readingLanguage === "NL" ? blog.titleNL : blog.titleEN}
                              fill
                              className="group-hover:scale-103 transition-transform duration-700 brightness-90 saturate-[0.8] group-hover:saturate-100"
                              sizes="(max-width: 768px) 100vw, 35vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-65" />
                            
                            {/* Short Reading time float */}
                            <div className="absolute bottom-4 left-4 z-10 flex items-center gap-1 font-mono text-[8px] tracking-widest text-[#eee] uppercase bg-black/85 px-2 py-1 rounded">
                              <Clock size={10} className="text-[#C8EB5F]" />
                              <span>{blog.readTime.toUpperCase()}</span>
                            </div>
                          </div>

                          {/* Card content and categories display */}
                          <div className="p-6 md:p-8 space-y-4">
                            <div className="flex justify-between items-center text-[9px] font-mono text-[#C8EB5F] tracking-widest uppercase font-bold">
                              <span>
                                {blog.category} • {blog.date}
                              </span>
                              
                              <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                {/* Small Quick action buttons */}
                                <button 
                                  onClick={(e) => toggleBookmark(blog.id, e)} 
                                  className="p-1.5 text-neutral-400 hover:text-[#C8EB5F] transition-colors"
                                  title="Bookmark"
                                >
                                  <Bookmark size={11} className={cn(isBookmarked ? "fill-[#C8EB5F] text-[#C8EB5F]" : "")} />
                                </button>
                                {isAdminLoggedIn && (
                                  <>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        openEditor(blog);
                                      }}
                                      className="p-1.5 text-neutral-400 hover:text-white transition-colors"
                                      title="Edit"
                                    >
                                      <Edit size={11} />
                                    </button>
                                    <button
                                      onClick={(e) => handleDeletePost(blog.id, e)}
                                      className="p-1.5 text-red-500 hover:text-red-300 transition-colors"
                                      title="Delete"
                                    >
                                      <Trash2 size={11} />
                                    </button>
                                  </>
                                )}
                              </div>
                            </div>

                            <h3 
                              onClick={() => {
                                setSelectedBlog(blog);
                                setReadingLanguage("EN");
                              }}
                              className="text-lg md:text-xl font-sans font-black tracking-tight uppercase leading-snug text-white hover:text-[#C8EB5F] cursor-pointer transition-colors duration-300"
                            >
                              {readingLanguage === "NL" ? blog.titleNL : blog.titleEN}
                            </h3>

                            <p className="text-xs text-neutral-400 font-sans leading-relaxed line-clamp-2">
                              {readingLanguage === "NL" ? blog.subtitleNL : blog.subtitleEN}
                            </p>
                          </div>
                        </div>

                        {/* Card bottom section: read trigger */}
                        <div className="p-6 md:p-8 pt-0 border-t border-white/5 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full border border-white/10 overflow-hidden relative shrink-0">
                              <Image src={blog.author.avatar} alt={blog.author.name} fill className="object-cover" referrerPolicy="no-referrer" />
                            </div>
                            <span className="text-[9px] font-mono text-neutral-500 tracking-wider font-bold">
                              {blog.author.name.toUpperCase()}
                            </span>
                          </div>
                          
                          <button
                            onClick={() => {
                              setSelectedBlog(blog);
                              setReadingLanguage("EN");
                            }}
                            className="text-[9px] font-mono text-white group-hover:text-[#C8EB5F] tracking-widest font-bold uppercase flex items-center gap-1.5 transition-colors"
                          >
                            READ STORY <ArrowRight size={10} className="group-hover:translate-x-1 transition-transform" />
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>

          </div>

        </div>
      </section>

      {/* AI SEO STRATEGY - ACADEMIC KNOWLEDGE BASE & FAQS (With high-contrast E-E-A-T signals) */}
      <section className="py-24 bg-black border-t border-white/5 relative z-10" id="academic-knowledge-base">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Section Header */}
          <div className="text-center space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 bg-[#C8EB5F]/5 border border-[#C8EB5F]/30 px-3 py-1.5 rounded-full">
              <ShieldCheck className="h-3.5 w-3.5 text-[#C8EB5F]" />
              <span className="text-[10px] font-mono tracking-[0.2em] text-[#C8EB5F] uppercase font-bold">E-E-A-T VERIFIED ACADEMIC HUB</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-light uppercase tracking-tight max-w-3xl mx-auto leading-tight">
              Verified <span className="text-[#C8EB5F] italic">Quranic Sciences</span> & SEO Strategy Journal
            </h2>
            <p className="text-sm text-neutral-400 font-light max-w-2xl mx-auto font-sans leading-relaxed">
              Explore professional, peer-reviewed structured answers, detailed beginner explanations, and comprehensive answers to the most common queries regarding classical Quran learning, preservation, and elite articulation.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: E-E-A-T Trust Markers & Beginner Primer (4 cols) */}
            <div className="lg:col-span-4 space-y-8">
              
              {/* E-E-A-T Trust Panel */}
              <div className="bg-[#050505] border border-white/5 rounded-3xl p-6 md:p-8 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-[#C8EB5F]/5 rounded-xl border border-[#C8EB5F]/20">
                    <Award className="h-5 w-5 text-[#C8EB5F]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-mono uppercase tracking-widest font-black text-white">Academic Trust</h3>
                    <p className="text-[9px] font-mono text-[#C8EB5F] uppercase tracking-wider font-bold">100% Peer-Reviewed Studies</p>
                  </div>
                </div>

                <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                  Every guide and article hosted on TajweedPage is drafted by native Al-Azhar University graduates and reviewed by certified Quran reciters currently holding traditional, connected chains of narration (Ijazah) directly traced back to the Prophet Muhammad (pbuh).
                </p>

                <div className="border-t border-white/5 pt-4 space-y-3">
                  <div className="flex items-center gap-2.5 text-xs text-neutral-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#C8EB5F]" />
                    <span>Traditional Ijazah Validation</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-neutral-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#C8EB5F]" />
                    <span>Acoustic Phonic Precision Audits</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-neutral-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#C8EB5F]" />
                    <span>Scientific Motor-Phonetic Training</span>
                  </div>
                </div>
              </div>

              {/* Beginner Primer / Structured Explanation */}
              <div className="bg-[#050505] border border-white/5 rounded-3xl p-6 md:p-8 space-y-4">
                <h3 className="text-xs font-mono uppercase tracking-widest font-black text-[#C8EB5F]">Beginner's Core Primer</h3>
                <h4 className="text-lg font-serif font-light text-white uppercase tracking-tight">How to Correctly Read Quran for Beginners</h4>
                
                <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                  For those starting without any Arabic background, mastering pronunciation is not about memorizing complex linguistic terms, but about building precise physical muscle memory.
                </p>

                <div className="space-y-3 pt-2">
                  <div className="p-3 bg-zinc-950 rounded-xl border border-white/5">
                    <span className="text-[10px] font-mono font-bold text-[#C8EB5F] block uppercase mb-1">Step 1: Oral Geography</span>
                    <p className="text-[11px] text-neutral-400 font-sans leading-normal">
                      Focus entirely on isolated sounds using our <strong>Beginner Quran Learning Guide</strong>. Identify which letters arise from the deepest throat versus the tongue.
                    </p>
                  </div>

                  <div className="p-3 bg-zinc-950 rounded-xl border border-white/5">
                    <span className="text-[10px] font-mono font-bold text-[#C8EB5F] block uppercase mb-1">Step 2: Simple Vowel Rhythms</span>
                    <p className="text-[11px] text-neutral-400 font-sans leading-normal">
                      Practice <strong>easy Quran learning methods</strong> step by step by combining basic vowels (Harakaat) and learning letter connections smoothly.
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Semantic FAQ Accordions covering requested keywords (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              <h3 className="text-xs font-mono uppercase tracking-widest font-black text-[#C8EB5F] mb-4">Semantic Knowledge Repository & Core FAQs</h3>
              
              <div className="space-y-4">
                {[
                  {
                    category: "TAJWEED",
                    question: "How to Learn Tajweed Elegantly & Avoid Common Mistakes?",
                    keywords_used: ["how to learn tajweed", "tajweed rules explained", "common tajweed mistakes", "Makharij guide", "Quran pronunciation tips"],
                    answer: (
                      <div className="space-y-3 text-sm text-neutral-300 font-sans leading-relaxed font-light">
                        <p>
                          Wanting to know <strong>how to learn tajweed</strong> is a beautiful quest of devotion. To learn effectively, one must have the core <strong>tajweed rules explained</strong> by a qualified teacher rather than studying dry theory alone. A structured <strong>Makharij guide</strong> will explain the 17 unique mouth, throat, and nose articulation points, which are critical for pristine articulation.
                        </p>
                        <p>
                          Reciters frequently make typical omissions, and studying these <strong>common tajweed mistakes</strong> is highly recommended. For instance, mistakenly swapping throat letters like 'Ha' (ح) with normal 'H' changes meanings entirely. Applying practical <strong>Quran pronunciation tips</strong>, such as slow visual breathing patterns and listening to highly accurate recordings, provides beginner students with immediate physical landmarks for correct chanting.
                        </p>
                      </div>
                    )
                  },
                  {
                    category: "KIDS EDUCATION",
                    question: "What is the Best Age & Method to Teach Kids Quran Successfully?",
                    keywords_used: ["best age to learn Quran", "how to teach kids Quran", "Quran learning tips for children", "online Islamic learning for kids"],
                    answer: (
                      <div className="space-y-3 text-sm text-neutral-300 font-sans leading-relaxed font-light">
                        <p>
                          Determining the <strong>best age to learn Quran</strong> varies for every child, but cognitive science and traditional wisdom show that starting gentle auditory exposure around age 4 to 5 is ideal. When parents seek guidance on <strong>how to teach kids Quran</strong>, consistency and gentle engagement are vastly more powerful than high-pressure memorization routes.
                        </p>
                        <p>
                          Our specialized <strong>Quran learning tips for children</strong> suggest short, interactive 30-minute sessions that prevent mental fatigue. Accessing high-quality, gamified <strong>online Islamic learning for kids</strong> ensures that digital screen time translates into real letter recognition and moral growth, turning daily lessons into a beloved routine rather than a chore.
                        </p>
                      </div>
                    )
                  },
                  {
                    category: "BEGINNER LEVEL",
                    question: "How to Read Quran for Beginners Using Easy Methods?",
                    keywords_used: ["how to read Quran for beginners", "beginner Quran learning guide", "easy Quran learning methods"],
                    answer: (
                      <div className="space-y-3 text-sm text-neutral-300 font-sans leading-relaxed font-light">
                        <p>
                          Figuring out <strong>how to read Quran for beginners</strong> starts with removing the intimidation associated with classical Arabic characters. Overwhelming yourself with advanced grammatical tables from day one is not helpful.
                        </p>
                        <p>
                          Instead, an elegant, multi-sensory <strong>beginner Quran learning guide</strong> recommends utilizing <strong>easy Quran learning methods</strong> based on the traditional Noorani Qaida methodology. This involves breaking characters into distinct visual shapes, highlighting them with colors, and reciting with precise 1-on-1 teacher feedback to build correct muscle memory before any errors become permanent.
                        </p>
                      </div>
                    )
                  },
                  {
                    category: "ISLAMIC EDUCATION",
                    question: "What is the Deeper Importance & Benefits of Reading Quran Daily?",
                    keywords_used: ["importance of Quran learning", "benefits of reading Quran daily", "Islamic education for children"],
                    answer: (
                      <div className="space-y-3 text-sm text-neutral-300 font-sans leading-relaxed font-light">
                        <p>
                          The profound spiritual and humanistic <strong>importance of Quran learning</strong> lies in its capacity to construct a living moral blueprint for the soul. Engaging with the sacred text feeds both our heart and intellect, nourishing spiritual clarity. 
                        </p>
                        <p>
                          Among the many researched <strong>benefits of reading Quran daily</strong> is its highly therapeutic calming effect on the nervous system. The rhythmic nature of breathing and correct articulation lowers cortisol levels and anxiety. Providing a solid, nurturing <strong>Islamic education for children</strong> acts as an unshakeable identity anchor in the modern world, helping them stand strong with empathy and self-confidence.
                        </p>
                      </div>
                    )
                  }
                ].map((faq, idx) => {
                  const isOpen = activeSelfFaqIndex === idx;
                  return (
                    <div 
                      key={idx}
                      className="border border-white/5 rounded-2xl bg-[#050505] overflow-hidden hover:border-[#C8EB5F]/20 transition-all duration-300"
                    >
                      <button
                        onClick={() => setActiveSelfFaqIndex(isOpen ? null : idx)}
                        className="w-full text-left p-6 md:p-8 flex items-center justify-between gap-4 cursor-pointer hover:bg-zinc-950/40 transition-colors"
                      >
                        <div className="space-y-1">
                          <span className="text-[9px] font-mono tracking-widest text-[#C8EB5F] font-bold block uppercase">
                            {faq.category}
                          </span>
                          <h4 className="text-md md:text-lg font-serif font-light text-white uppercase tracking-tight">
                            {faq.question}
                          </h4>
                        </div>
                        <div className="h-8 w-8 rounded-full border border-white/5 flex items-center justify-center bg-zinc-900 shrink-0 text-[#C8EB5F]">
                          <ChevronDown 
                            size={14} 
                            className={cn("transition-transform duration-300", isOpen ? "rotate-180" : "")} 
                          />
                        </div>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="px-6 md:px-8 pb-8 pt-2 border-t border-white/5">
                              {faq.answer}
                              
                              <div className="mt-4 pt-4 border-t border-white/5 flex flex-wrap gap-2">
                                <span className="text-[8px] font-mono text-neutral-500 uppercase tracking-widest">Target Keywords Included:</span>
                                {faq.keywords_used.map((kw, kwIdx) => (
                                  <span key={kwIdx} className="text-[9px] font-mono bg-zinc-950 px-2 py-0.5 border border-white/5 rounded text-neutral-400 font-bold">
                                    {kw}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Luxury Value Proposition banner */}
      <section className="py-24 bg-zinc-950 border-t border-b border-white/5 relative overflow-hidden id-valprop-section">
        <div className="absolute inset-x-0 bottom-0 h-[100px] bg-gradient-to-t from-[#C8EB5F]/3 to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto px-6 text-center space-y-6 relative z-10">
          <span className="text-[10px] font-mono tracking-[0.3em] text-[#C8EB5F] uppercase">TAJWEEDPAGE TRADITIONALIST APPARATUS</span>
          <h2 className="text-3xl sm:text-5xl font-serif font-light uppercase tracking-tight max-w-3xl mx-auto leading-tight">
            With <span className="text-[#C8EB5F] italic">Elite Knowledge</span> Comes a Greater Desire to Excel
          </h2>
          <p className="text-sm text-neutral-400 font-light max-w-2xl mx-auto font-sans leading-relaxed">
            Our classes and articles represent the most meticulous platform for the Muslim community in Europe. No shortcuts, just authentic mastery.
          </p>
          <div className="pt-6">
            <button 
              onClick={() => setBookingOpen(true)}
              className="inline-flex items-center justify-center px-8 py-4 bg-[#C8EB5F] hover:bg-white text-black font-mono text-[11px] font-bold uppercase tracking-widest transition-all duration-300 rounded-lg"
            >
              REGISTER FOR A FREE TRIAL SENSING CLASS
            </button>
          </div>
        </div>
      </section>

      {/* Interactive Reader Drawer (Slide-Over panel) */}
      <AnimatePresence>
        {selectedBlog && (
          <div className="fixed inset-0 z-50 flex justify-center bg-[#080808]/98 backdrop-blur-xl overflow-hidden" id="blog-reader-backdrop">
            {/* Click backdrop to exit */}
            <div className="absolute inset-0" onClick={() => setSelectedBlog(null)} />
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full h-full bg-[#080808] flex flex-col z-10 text-white overflow-hidden"
              id="blog-reader-drawer-container"
            >
              
              {/* Header inside drawer */}
              <div className="p-6 border-b border-white/5 flex items-center justify-between bg-black/95 backdrop-blur-md sticky top-0 z-20">
                <button 
                  onClick={() => setSelectedBlog(null)}
                  className="flex items-center gap-2 text-xs font-mono tracking-widest text-neutral-400 hover:text-[#C8EB5F] transition-colors cursor-pointer"
                >
                  <ChevronLeft size={16} />
                  <span>BACK TO JOURNAL</span>
                </button>
                
                {/* Language toggle selector inside dynamic story viewer */}
                <div className="flex items-center gap-1.5 bg-black border border-white/10 px-3 py-1.5 rounded-full text-[10px] uppercase font-mono tracking-wider">
                  <Globe size={11} className="text-neutral-500" />
                  <span className="text-neutral-400 mr-2">Language:</span>
                  <div className="flex gap-1">
                    <button 
                      onClick={() => setReadingLanguage("NL")}
                      className={cn(
                        "px-2.5 py-0.5 text-[9px] font-mono rounded font-black transition-all cursor-pointer",
                        readingLanguage === "NL" ? "bg-[#C8EB5F] text-black font-extrabold" : "text-neutral-400 hover:text-white"
                      )}
                    >
                      NL
                    </button>
                    <button 
                      onClick={() => setReadingLanguage("EN")}
                      className={cn(
                        "px-2.5 py-0.5 text-[9px] font-mono rounded font-black transition-all cursor-pointer",
                        readingLanguage === "EN" ? "bg-[#C8EB5F] text-black font-extrabold" : "text-neutral-400 hover:text-white"
                      )}
                    >
                      EN
                    </button>
                  </div>
                </div>
              </div>

              {/* Scrollable Article Area - beautifully max-width centered for luxury desktop reading experience */}
              <div className="flex-1 overflow-y-auto px-6 py-10 md:py-16 select-text bg-[#080808]" id="blog-reader-scrollable">
                <div className="max-w-4xl mx-auto w-full space-y-12">
                
                  {/* Visual Cover Banner with full black overlays */}
                  <div className="relative h-[250px] md:h-[400px] w-full rounded-[24px] overflow-hidden shadow-inner font-mono text-zinc-400">
                    <ResilientImage 
                      src={selectedBlog.imageUrl} 
                      alt={readingLanguage === "NL" ? selectedBlog.titleNL : selectedBlog.titleEN} 
                      fill 
                      className="brightness-85"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-80" />
                    
                    {/* Floating category + read time badge on bottom-left, exact matches */}
                    <div className="absolute bottom-6 left-6 z-10 font-mono text-[9px] tracking-widest uppercase bg-black/85 backdrop-blur-md px-3.5 py-2 border border-white/10 rounded-full flex items-center gap-1.5 shadow-xl">
                      <span className="text-[#C8EB5F] font-bold">{selectedBlog.category.toUpperCase()}</span>
                      <span className="text-neutral-600">•</span>
                      <span className="text-neutral-300 font-medium">{selectedBlog.readTime.toUpperCase()}</span>
                    </div>
                  </div>

                  {/* Article Info Column */}
                  <div className="space-y-4">
                    <div className="text-[10px] font-mono tracking-[0.25em] text-neutral-500 uppercase flex flex-wrap items-center gap-2 mt-3">
                      <span>{selectedBlog.date.toUpperCase()}</span>
                      <span className="text-neutral-700 font-bold">•</span>
                      <span>Written by {selectedBlog.author.name}</span>
                    </div>
                    
                    <h1 
                      style={{ fontFamily: "var(--font-cormorant)" }}
                      className="text-3xl md:text-5xl font-normal leading-tight text-white uppercase tracking-tight"
                    >
                      {readingLanguage === "NL" ? selectedBlog.titleNL : selectedBlog.titleEN}
                    </h1>

                    <p 
                      style={{ fontFamily: "var(--font-cormorant)" }}
                      className="font-serif text-sm md:text-xl text-neutral-400 italic max-w-2xl font-light leading-relaxed"
                    >
                      {readingLanguage === "NL" ? selectedBlog.subtitleNL : selectedBlog.subtitleEN}
                    </p>
                  </div>

                  {/* Main Excerpt Block Quote */}
                  <div className="bg-[#C8EB5F]/3 border-l-2 border-[#C8EB5F] p-5 my-6 rounded-r-xl">
                    <p 
                      style={{ fontFamily: "var(--font-cormorant)" }}
                      className="font-serif text-md md:text-lg text-neutral-200 italic font-light leading-relaxed"
                    >
                      "{readingLanguage === "NL" ? selectedBlog.quoteNL : selectedBlog.quoteEN}"
                    </p>
                  </div>

                  {/* Main Content Body Paragraphs */}
                  <div className="space-y-6 text-sm md:text-base text-neutral-300 font-sans font-light leading-relaxed markdown-container">
                    <Markdown
                      components={{
                        h1: ({node, ...props}) => <h1 style={{ fontFamily: "var(--font-cormorant)" }} className="text-2xl md:text-3xl font-medium text-white mt-8 mb-4 uppercase tracking-wide border-b border-white/10 pb-2 font-normal" {...props} />,
                        h2: ({node, ...props}) => <h2 style={{ fontFamily: "var(--font-cormorant)" }} className="text-xl md:text-2xl font-normal text-white mt-6 mb-3 uppercase tracking-wide" {...props} />,
                        h3: ({node, ...props}) => <h3 style={{ fontFamily: "var(--font-cormorant)" }} className="text-lg md:text-xl font-medium text-[#C8EB5F] mt-5 mb-2 font-mono uppercase tracking-widest" {...props} />,
                        p: ({node, ...props}) => <p className="mb-4 leading-relaxed text-neutral-300 font-sans font-light text-sm md:text-base" {...props} />,
                        ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-4 space-y-2 text-neutral-300" {...props} />,
                        ol: ({node, ...props}) => <ol className="list-decimal pl-6 mb-4 space-y-2 text-neutral-300" {...props} />,
                        li: ({node, ...props}) => <li className="pl-1 text-neutral-300" {...props} />,
                        strong: ({node, ...props}) => <strong className="text-[#C8EB5F] font-bold" {...props} />,
                        em: ({node, ...props}) => <em className="italic text-neutral-200" {...props} />,
                        blockquote: ({node, ...props}) => <blockquote className="border-l-2 border-[#C8EB5F] bg-[#C8EB5F]/5 p-4 my-4 rounded-r-lg italic text-neutral-200" {...props} />,
                        a: ({node, ...props}) => <a className="text-[#C8EB5F] underline hover:text-white transition-colors" target="_blank" rel="noopener noreferrer" {...props} />
                      }}
                    >
                      {getFullContent(readingLanguage === "NL" ? selectedBlog.contentNL : selectedBlog.contentEN)}
                    </Markdown>
                  </div>

                  {/* Deep Highlights Checklist Box */}
                  <div className="bg-zinc-950 p-6 md:p-8 rounded-3xl border border-white/5 space-y-4 my-8">
                    <span className="text-[10px] font-mono tracking-widest text-[#C8EB5F] uppercase block font-bold">CRITICAL KEY TAKEAWAYS</span>
                    <div className="space-y-3">
                      {(readingLanguage === "NL" ? selectedBlog.keyHighlightsNL : selectedBlog.keyHighlightsEN).map((h, i) => (
                        <div key={i} className="flex items-start gap-3 text-xs md:text-sm text-neutral-300 font-sans">
                          <span className="h-5 w-5 rounded-full border border-[#C8EB5F]/25 bg-[#C8EB5F]/5 flex items-center justify-center shrink-0 mt-0.5">
                            <Check size={10} className="text-[#C8EB5F]" />
                          </span>
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Integrated Booking CTA Area within Journal */}
                  <div className="border-t border-white/5 pt-8 text-center space-y-4 bg-zinc-950/40 p-6 rounded-3xl mt-12">
                    <span 
                      style={{ fontFamily: "var(--font-cormorant)" }}
                      className="text-xl md:text-2xl tracking-wide uppercase text-[#C8EB5F] block"
                    >
                      Ready to Elevate Your Recitation to elite status?
                    </span>
                    <p className="text-xs text-neutral-400 font-light max-w-lg mx-auto leading-relaxed">
                      Schedule a complimentary 1-on-1 sensing class today with our certified scholars and receive direct expert guidance on your pronunciation.
                    </p>
                    <div className="pt-2">
                      <button 
                        onClick={() => {
                          setSelectedBlog(null);
                          setBookingOpen(true);
                        }}
                        className="px-6 py-3 bg-[#C8EB5F] hover:bg-white text-black text-[10px] font-mono font-bold uppercase tracking-widest transition-all rounded-lg cursor-pointer"
                      >
                        Secure Free Trial Lesson
                      </button>
                    </div>
                  </div>

                  {/* Closing signature element */}
                  <div className="py-8 flex items-center justify-between border-t border-white/5 text-neutral-600 font-mono text-[9px] uppercase tracking-widest">
                    <span>TAJWEEDPAGE RECITATION DEPT</span>
                    <span>VERIFIED TRUSTED GATEWAY</span>
                  </div>

                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Booking Modal with advanced local fields */}
      <AnimatePresence>
        {bookingOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm" id="booking-modal-backdrop">
            {/* Backdrop click to exit */}
            <div className="absolute inset-0" onClick={() => setBookingOpen(false)} />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-zinc-950 border border-white/10 p-6 md:p-8 rounded-[32px] z-10 shadow-4xl text-white"
              id="booking-modal-panel"
            >
              
              <button 
                onClick={() => setBookingOpen(false)}
                className="absolute top-4 right-4 p-2 text-neutral-500 hover:text-white transition-colors"
                title="Sluit venster"
              >
                <X size={20} />
              </button>

              <div className="text-center space-y-3 mb-6">
                <span className="text-[10px] font-mono tracking-[0.2em] text-[#C8EB5F] uppercase block bg-[#C8EB5F]/10 px-3 py-1.5 rounded-full border border-[#C8EB5F]/20 max-w-max mx-auto">
                  PORTAL REGISTRATION
                </span>
                <h3 className="font-serif text-2xl uppercase tracking-tight text-white">Book Your Free Trial</h3>
                <p className="text-[11px] text-neutral-400 font-light leading-relaxed">
                  Fill in the premium form below. Our support coordinators will reach out to you via WhatsApp or email within 24 hours.
                </p>
              </div>

              {formSubmitted ? (
                <div className="text-center py-8 space-y-4 animate-fadeIn">
                  <div className="w-12 h-12 rounded-full border border-[#C8EB5F]/40 bg-[#C8EB5F]/10 flex items-center justify-center mx-auto text-[#C8EB5F]">
                    <Check size={24} />
                  </div>
                  <h4 className="font-serif text-xl uppercase tracking-wide text-white">Registration Received!</h4>
                  <p className="text-xs text-neutral-400 leading-relaxed max-w-xs mx-auto">
                    Thank you. A coordinator will contact you shortly via WhatsApp or email to complete your registration.
                  </p>
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setBookingOpen(false);
                    }}
                    className="mt-2 w-full px-6 py-2.5 bg-white hover:bg-[#C8EB5F] text-black font-mono text-[10px] font-bold uppercase tracking-widest transition-all rounded-lg"
                  >
                    Close Window
                  </button>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  
                  <div>
                    <label className="block text-[10px] font-mono tracking-widest text-neutral-400 uppercase mb-1.5 font-bold">Student Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Fatima Al-Madani"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-black border border-white/10 text-xs text-white placeholder-neutral-600 px-4 py-2.5 rounded-lg focus:outline-none focus:border-[#C8EB5F] transition-colors font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono tracking-widest text-neutral-400 uppercase mb-1.5 font-bold">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. fatima@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-black border border-white/10 text-xs text-white placeholder-neutral-600 px-4 py-2.5 rounded-lg focus:outline-none focus:border-[#C8EB5F] transition-colors font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono tracking-widest text-neutral-400 uppercase mb-1.5 font-bold">Phone Number (WhatsApp)</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +31 6 12345678"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-black border border-white/10 text-xs text-white placeholder-neutral-600 px-4 py-2.5 rounded-lg focus:outline-none focus:border-[#C8EB5F] transition-colors font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-mono tracking-widest text-neutral-400 uppercase mb-1.5 font-bold">Desired Track</label>
                      <select
                        value={formData.course}
                        onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                        className="w-full bg-black border border-white/10 text-[10px] text-white px-3 py-2.5 rounded-lg focus:outline-none focus:border-[#C8EB5F] transition-colors font-mono select-none"
                      >
                        <option value="Tajweed Master Series">Tajweed Series</option>
                        <option value="Noorani Qaida Core">Noorani Qaida</option>
                        <option value="Hifz Memorisation">Hifz Program</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono tracking-widest text-neutral-400 uppercase mb-1.5 font-bold">Current Level</label>
                      <select
                        value={formData.level}
                        onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                        className="w-full bg-black border border-white/10 text-[10px] text-white px-3 py-2.5 rounded-lg focus:outline-none focus:border-[#C8EB5F] transition-colors font-mono"
                      >
                        <option value="Absolute Beginner">No Experience</option>
                        <option value="Intermediate Reader">Can Read Quran</option>
                        <option value="Advanced Tajweed">Advanced</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono tracking-widest text-neutral-400 uppercase mb-1.5 font-bold">Comments or Preferred Times (Optional)</label>
                    <textarea
                      rows={2}
                      placeholder="Are there specific wishes or times you prefer?"
                      value={formData.comments}
                      onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                      className="w-full bg-black border border-white/10 text-xs text-white placeholder-neutral-600 p-3 rounded-lg focus:outline-none focus:border-[#C8EB5F] transition-colors font-mono"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-4 bg-[#C8EB5F] hover:bg-white text-black font-mono text-[10px] font-bold uppercase tracking-widest transition-all rounded-lg flex items-center justify-center gap-2 mt-4 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? "Processing..." : "Complete Registration"}
                    <ArrowUpRight size={12} />
                  </button>

                  <p className="text-[9px] text-neutral-500 font-mono tracking-wide text-center mt-2 uppercase">
                    🔒 SSL Encrypted Database • No Spam Guarantee
                  </p>
                </form>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Premium Footer Section */}
      

      {/* --- BUSINESS CMS BENTO CENTERED HUB (Screenshots 2, 3, 4, 5, 6) --- */}
      <AnimatePresence>
        {adminPanelOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/95 backdrop-blur-md" id="admin-portal-overlay">
            
            {/* Dark background click-away */}
            <div className="absolute inset-0 z-0 bg-black/80 cursor-pointer" onClick={() => setAdminPanelOpen(false)} />

            {/* Centered glass bento panel */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 15 }}
              transition={{ type: "spring", damping: 28, stiffness: 220 }}
              className="relative w-full max-w-6xl h-[85vh] bg-[#070708] border border-white/10 rounded-[32px] flex flex-col md:flex-row shadow-[0_45px_100px_rgba(0,0,0,0.98)] overflow-hidden z-10 text-white text-left selection:bg-[#C8EB5F] selection:text-black"
            >
              
              {/* SIDEBAR (Screenshot 2 Design) */}
              <div className="w-full md:w-64 bg-[#0a0a0c] border-b md:border-b-0 md:border-r border-white/5 p-6 flex flex-col justify-between h-full shrink-0">
                <div className="space-y-8">
                  
                  {/* Brand logo */}
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-[#C8EB5F] flex items-center justify-center text-black text-xs font-black font-mono shadow-[0_0_12px_rgba(200,235,95,0.3)]">
                      TP
                    </div>
                    <div>
                      <span className="text-[10px] font-mono tracking-[0.25em] text-white block uppercase font-black">TAJWEEDPAGE</span>
                      <span className="text-[8px] font-mono tracking-widest text-neutral-500 block uppercase font-light">CORP SYSTEM DEV</span>
                    </div>
                  </div>

                  {/* Profile Preview */}
                  {isAdminLoggedIn && (
                    <div className="p-3.5 bg-zinc-950/80 border border-white/5 rounded-2xl flex items-center gap-3">
                      {adminUser?.photoURL ? (
                        <div className="relative h-8 w-8 overflow-hidden rounded-full border border-white/10 shrink-0">
                          <Image src={adminUser.photoURL} alt="Scholar Avatar" fill className="object-cover" referrerPolicy="no-referrer" />
                        </div>
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-[#C8EB5F]/10 border border-[#C8EB5F]/20 text-[#C8EB5F] font-mono font-bold flex items-center justify-center text-[10px] shrink-0">
                          AD
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="text-[10px] font-mono font-bold text-white truncate max-w-[130px] uppercase leading-none">
                          {adminUser?.displayName || "SCHOLAR ADMIN"}
                        </p>
                        <p className="text-[8px] text-neutral-500 font-mono mt-1 break-all truncate max-w-[130px]">
                          {adminUser?.email}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Sidebar CMS Actions */}
                  {isAdminLoggedIn && (
                    <div className="space-y-2 pt-2">
                      <button
                        type="button"
                        onClick={() => openEditor(null)}
                        className="w-full flex items-center justify-center gap-2 bg-[#C8EB5F] hover:bg-white text-black font-mono text-[10px] font-bold uppercase tracking-widest px-4 py-3 rounded-xl transition-all shadow-[0_4px_15px_rgba(200,235,95,0.15)] active:scale-98 cursor-pointer border border-[#C8EB5F]/20"
                      >
                        <Plus size={12} className="stroke-[3px]" /> CREATE NEW POST
                      </button>

                      <div className="h-px bg-white/5 my-4" />

                      <button
                        type="button"
                        onClick={() => setAdminTab("posts")}
                        className={cn(
                          "w-full flex items-center gap-2.5 px-4 py-3 rounded-xl text-[10px] font-mono font-bold tracking-widest uppercase transition-all text-left cursor-pointer",
                          adminTab === "posts"
                            ? "bg-white/5 border border-white/10 text-white"
                            : "bg-transparent text-neutral-400 hover:text-white hover:bg-white/3"
                        )}
                      >
                        <BookOpen size={12} className="text-[#C8EB5F]" />
                        <span>ALL STORIES ({blogs.length})</span>
                      </button>
                    </div>
                  )}

                </div>

                {/* Logout account button */}
                <div className="pt-6 border-t border-white/5">
                  {isAdminLoggedIn ? (
                    <button
                      type="button"
                      onClick={() => {
                        handleAdminLogout();
                        setAdminPanelOpen(false);
                      }}
                      className="w-full flex items-center justify-center gap-3 p-2.5 bg-red-950/20 hover:bg-red-500/15 border border-red-500/20 hover:border-red-500/55 rounded-xl text-red-400 hover:text-white text-[9.5px] font-mono uppercase font-bold tracking-widest transition-all cursor-pointer"
                    >
                      <LogOut size={10} />
                      LOG OUT ACCOUNT
                    </button>
                  ) : (
                    <p className="text-[8px] font-mono text-neutral-600 text-center uppercase tracking-wider">
                      🔒 INTERNAL SHIELD ACTIVE
                    </p>
                  )}
                </div>

              </div>

              {/* WORKSPACE AREA */}
              <div className="flex-1 h-full flex flex-col bg-black overflow-hidden relative">
                
                {/* Header title bar */}
                <div className="px-6 py-4 border-b border-white/5 bg-[#040405] flex items-center justify-between">
                  <div>
                    {!isAdminLoggedIn ? (
                      <h3 className="font-serif text-md tracking-wider text-white uppercase font-light">SECURE ADMINISTRATOR ACCESS</h3>
                    ) : (
                      <div className="flex items-center gap-2">
                        {adminTab === "editor" ? <Plus size={14} className="text-blue-500" /> : <ShieldCheck size={14} className="text-[#C8EB5F]" />}
                        <h3 className="font-sans text-xs font-mono font-bold tracking-wider text-neutral-300 uppercase">
                          {adminTab === "editor" ? (editingPost ? "EDIT ACTIVE JOURNAL REPORT" : "CREATE NEW POST RECORD") : "ALL SYSTEM ACTIVE JOURNAL ENTRIES"}
                        </h3>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[8.5px] font-mono tracking-widest text-[#555] bg-[#555]/10 px-2.5 py-1 rounded border border-[#555]/10 uppercase">
                      BUILD V2.4
                    </span>
                    <button 
                      type="button"
                      onClick={() => setAdminPanelOpen(false)} 
                      className="p-1.5 hover:bg-white/5 text-neutral-400 hover:text-white rounded-lg border border-white/5 cursor-pointer flex items-center justify-center"
                      title="Exit Dashboard"
                    >
                      <X size={14} />
                    </button>
                  </div>
                </div>

                {/* Content Panel Workspace scrollable */}
                <div className="flex-1 overflow-y-auto p-6 md:p-8 scrollbar-thin select-text">
                  
                  {/* Tab state: Not Signed In Auth Screen */}
                  {!isAdminLoggedIn ? (
                    <div className="max-w-md mx-auto py-12 text-center space-y-8">
                      <div className="w-16 h-16 rounded-2xl bg-[#C8EB5F]/5 border border-[#C8EB5F]/20 flex items-center justify-center text-[#C8EB5F] mx-auto shadow-[0_0_35px_rgba(200,235,95,0.06)] animate-pulse">
                        <ShieldCheck size={32} />
                      </div>
                      
                      <div className="space-y-3">
                        <h4 className="font-mono text-xs tracking-[0.2em] uppercase text-white font-bold">SCHOLASTIC CREDENTIAL SIGN IN</h4>
                        <p className="text-xs text-neutral-400 font-light leading-relaxed">
                          Authorized owners of the <span className="text-emerald-400">tajweedpage.com</span> domain may access this panel to write, edit, and destroy digital journal logs. Verification is processed via Google secure tokens.
                        </p>
                      </div>

                      {authError && (
                        <div className="p-4 bg-red-950/20 border border-red-900/30 text-red-400 text-[10px] font-mono tracking-wide rounded-xl uppercase leading-relaxed text-center font-bold">
                          ⚠️ {authError}
                        </div>
                      )}

                      <button
                        onClick={handleAdminLogin}
                        className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-zinc-900 hover:bg-[#C8EB5F] border border-white/10 hover:border-[#C8EB5F] text-white hover:text-black font-mono text-[10px] uppercase font-bold tracking-widest transition-all duration-300 rounded-xl cursor-pointer shadow-lg"
                      >
                        <svg className="h-4 w-4 fill-current shrink-0" viewBox="0 0 24 24">
                          <path d="M12.24 10.285V13.4h6.887C18.2 15.614 15.645 18 12.24 18c-3.86 0-7-3.14-7-7s3.14-7 7-7c1.7 0 3.3 0.64 4.56 1.76l2.44-2.44C17.3 1.54 14.92 0 12.24 0c-6.075 0-11 4.925-11 11s4.925 11 11 11c6.38 0 10.6-4.485 10.6-10.8 0-.72-.065-1.19-.1 instant-h3" />
                        </svg>
                        Secure Google Sign-In
                      </button>
                    </div>
                  ) : (
                    // Signed In Layout
                    <>
                      {/* Sub-tab: Stories Directory */}
                      {adminTab === "posts" && (
                        <div className="space-y-6">
                          
                          {/* Sync actions */}
                          <div className="border border-white/5 bg-zinc-900/10 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div>
                              <p className="text-[11px] font-mono font-bold text-white uppercase tracking-wider">Active Directory Services</p>
                              <p className="text-[9px] text-neutral-500 font-mono mt-0.5">Edit existing publications instantly over Firestore Cloud Database.</p>
                            </div>
                            
                            <button
                              type="button"
                              onClick={handleBootstrapDb}
                              disabled={dbSaving}
                              className="px-4 py-2 bg-zinc-950 hover:bg-blue-600 border border-white/10 hover:border-blue-500 text-neutral-300 hover:text-white text-[9px] font-mono tracking-widest uppercase font-bold rounded-lg transition-all cursor-pointer disabled:opacity-50"
                            >
                              {dbSaving ? "SYNCING..." : "RESTORE DEFAULT SYSTEM SEEDS"}
                            </button>
                          </div>

                          {/* List of articles */}
                          <div className="border border-white/5 rounded-2xl divide-y divide-white/5 bg-zinc-950/40 overflow-hidden">
                            {blogs.length === 0 ? (
                              <div className="text-center py-12 text-neutral-500">
                                <p className="text-xs font-mono uppercase tracking-wider">No posts recorded in current sandbox.</p>
                              </div>
                            ) : (
                              blogs.map((b) => (
                                <div key={b.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white/1 transition-all">
                                  <div className="flex items-center gap-4 min-w-0">
                                    <div className="h-12 w-16 relative bg-zinc-900 rounded-lg overflow-hidden shrink-0 border border-white/10">
                                      <ResilientImage src={b.imageUrl} alt={b.titleNL} fill />
                                    </div>
                                    <div className="min-w-0">
                                      <span className="inline-block text-[8px] px-2 py-0.5 font-mono font-bold tracking-widest text-[#C8EB5F] bg-[#C8EB5F]/10 rounded-full uppercase">
                                        {b.category}
                                      </span>
                                      <h4 className="text-xs font-mono font-bold text-white tracking-tight truncate max-w-[320px] uppercase mt-1">
                                        {b.titleEN || b.titleNL}
                                      </h4>
                                      <p className="text-[9px] text-neutral-500 font-mono mt-0.5">{b.date} • {b.readTime}</p>
                                    </div>
                                  </div>

                                  <div className="flex gap-2 shrink-0">
                                    <button
                                      type="button"
                                      onClick={() => openEditor(b)}
                                      className="px-3.5 py-1.5 bg-[#C8EB5F]/10 hover:bg-[#C8EB5F] text-[#C8EB5F] hover:text-black border border-[#C8EB5F]/20 rounded-xl text-[9px] font-mono tracking-widest uppercase font-bold transition-all cursor-pointer flex items-center gap-1.5 font-black"
                                    >
                                      <Edit size={10} /> EDIT
                                    </button>
                                    <button
                                      type="button"
                                      onClick={(e) => handleDeletePost(b.id, e)}
                                      className="px-3.5 py-1.5 bg-red-500/5 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/20 rounded-xl text-[9px] font-mono tracking-widest uppercase font-bold transition-all cursor-pointer flex items-center gap-1.5"
                                    >
                                      <Trash2 size={10} /> DELETE
                                    </button>
                                  </div>
                                </div>
                              ))
                            )}
                          </div>

                        </div>
                      )}

                      {/* Sub-tab: Widescreen Editor Form (Screenshot 3 & 4 styling) */}
                      {adminTab === "editor" && (
                        <form onSubmit={handleEditorSave} className="space-y-6">
                          
                          {/* Alert info */}
                          <div className="bg-zinc-950 p-4 border border-white/5 rounded-2xl flex items-center gap-2.5">
                            <Clock size={14} className="text-[#C8EB5F]" />
                            <p className="text-[10px] font-mono text-neutral-400 uppercase tracking-wide leading-none">
                              Draft Session Protected • Direct Firestore Stream Synced
                            </p>
                          </div>

                          {/* Base configs */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-zinc-950/40 border border-white/5 p-5 rounded-2xl">
                            <div className="space-y-2">
                              <label className="text-[10px] font-mono tracking-widest text-[#888] uppercase block font-bold">POST CATEGORY <span className="text-[#C8EB5F] font-black">*</span></label>
                              <select
                                value={editorData.category}
                                onChange={(e) => setEditorData({...editorData, category: e.target.value as any})}
                                className="w-full bg-zinc-900 border border-white/5 text-white font-mono text-xs px-4 py-3 rounded-xl focus:outline-none focus:border-[#C8EB5F] transition-all font-bold cursor-pointer"
                              >
                                <option value="Tajweed">Tajweed</option>
                                <option value="Kids">Kids</option>
                                <option value="Beginners">Beginners</option>
                                <option value="Islamic Education">Islamic Education</option>
                              </select>
                            </div>

                            <div className="space-y-2">
                              <label className="text-[10px] font-mono tracking-widest text-[#888] uppercase block font-bold">SLUG (URL FRIENDLY) <span className="text-[#C8EB5F] font-black">*</span></label>
                              <input 
                                type="text"
                                disabled={!!editingPost}
                                required
                                placeholder="e.g. digital-noorani-phonetics"
                                value={editorData.id}
                                onChange={(e) => setEditorData({...editorData, id: e.target.value})}
                                className="w-full bg-zinc-900 border border-white/5 disabled:opacity-40 text-white font-mono text-xs px-4 py-3 rounded-xl focus:outline-none focus:border-[#C8EB5F] transition-all"
                              />
                            </div>
                          </div>

                          {/* Translations */}
                          <div className="space-y-8">
                            
                            {/* Dutch */}
                            <div className="border border-white/5 bg-zinc-950/40 p-5 rounded-2xl space-y-4">
                              <span className="text-[10px] font-mono tracking-widest text-[#C8EB5F] uppercase block font-bold">
                                1. DUTCH TRANSLATION JOURNAL SPECS
                              </span>
                              
                              <div className="space-y-2">
                                <label className="text-[9.5px] font-mono tracking-widest text-[#888] uppercase block font-bold">POST TITLE (DUTCH)</label>
                                <input 
                                  type="text"
                                  required
                                  placeholder="Title in Dutch Language..."
                                  value={editorData.titleNL}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    setEditorData(prev => {
                                      const updated = { ...prev, titleNL: val };
                                      if (!editingPost && !prev.titleEN) {
                                        updated.id = generateSlug(val);
                                      }
                                      return updated;
                                    });
                                  }}
                                  className="w-full bg-zinc-900 border border-white/5 text-white text-xs px-4 py-3 rounded-xl focus:outline-none focus:border-[#C8EB5F] transition-all font-mono"
                                />
                              </div>

                              <div className="space-y-2">
                                <label className="text-[9.5px] font-mono tracking-widest text-[#888] uppercase block font-bold">SUBTITLE / EXCERPT (DUTCH)</label>
                                <textarea 
                                  rows={2}
                                  required
                                  placeholder="Brief introduction or excerpt summary in Dutch..."
                                  value={editorData.subtitleNL}
                                  onChange={(e) => setEditorData({...editorData, subtitleNL: e.target.value})}
                                  className="w-full bg-zinc-900 border border-white/5 text-white text-xs px-4 py-3 rounded-xl focus:outline-none focus:border-[#C8EB5F] transition-all font-mono resize-none"
                                />
                              </div>

                              <div className="space-y-2">
                                <label className="text-[9.5px] font-mono tracking-widest text-[#888] uppercase block font-bold">DUTCH CONTENT (Double enter separates paragraphs)</label>
                                <textarea 
                                  rows={5}
                                  required
                                  placeholder="Type full article paragraphs. Double Enter (empty line) registers a new cinematic paragraph block."
                                  value={editorData.contentNL}
                                  onChange={(e) => setEditorData({...editorData, contentNL: e.target.value})}
                                  className="w-full bg-zinc-900 border border-white/5 text-white text-xs px-4 py-3 rounded-xl focus:outline-none focus:border-[#C8EB5F] transition-all font-sans leading-relaxed"
                                />
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <label className="text-[9.5px] font-mono tracking-widest text-[#888] uppercase block font-bold">DUTCH PULL QUOTE</label>
                                  <input 
                                    type="text"
                                    required
                                    placeholder="e.g. Met elite kennis komt grotere ambitie..."
                                    value={editorData.quoteNL}
                                    onChange={(e) => setEditorData({...editorData, quoteNL: e.target.value})}
                                    className="w-full bg-zinc-900 border border-white/5 text-white text-xs px-4 py-3 rounded-xl focus:outline-none focus:border-[#C8EB5F] transition-all font-mono"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <label className="text-[9.5px] font-mono tracking-widest text-[#888] uppercase block font-bold">DUTCH BULLET REVENUE (One bullet per line)</label>
                                  <textarea 
                                    rows={3}
                                    placeholder="Bullet point 1&#10;Bullet point 2&#10;Bullet point 3"
                                    value={editorData.keyHighlightsNL}
                                    onChange={(e) => setEditorData({...editorData, keyHighlightsNL: e.target.value})}
                                    className="w-full bg-zinc-900 border border-white/5 text-white text-xs px-4 py-3 rounded-xl focus:outline-none focus:border-[#C8EB5F] transition-all font-mono text-xs"
                                  />
                                </div>
                              </div>
                            </div>

                            {/* English */}
                            <div className="border border-white/5 bg-zinc-950/40 p-5 rounded-2xl space-y-4">
                              <span className="text-[10px] font-mono tracking-widest text-[#C8EB5F] uppercase block font-bold">
                                2. ENGLISH TRANSLATION JOURNAL SPECS
                              </span>
                              
                              <div className="space-y-2">
                                <label className="text-[9.5px] font-mono tracking-widest text-[#888] uppercase block font-bold">POST TITLE (ENGLISH)</label>
                                <input 
                                  type="text"
                                  required
                                  placeholder="Title in English Language..."
                                  value={editorData.titleEN}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    setEditorData(prev => {
                                      const updated = { ...prev, titleEN: val };
                                      if (!editingPost) {
                                        updated.id = generateSlug(val || prev.titleNL || "");
                                      }
                                      return updated;
                                    });
                                  }}
                                  className="w-full bg-zinc-900 border border-white/5 text-white text-xs px-4 py-3 rounded-xl focus:outline-none focus:border-[#C8EB5F] transition-all font-mono"
                                />
                              </div>

                              <div className="space-y-2">
                                <label className="text-[9.5px] font-mono tracking-widest text-[#888] uppercase block font-bold">SUBTITLE / EXCERPT (ENGLISH)</label>
                                <textarea 
                                  rows={2}
                                  required
                                  placeholder="Brief introduction excerpt summary in English..."
                                  value={editorData.subtitleEN}
                                  onChange={(e) => setEditorData({...editorData, subtitleEN: e.target.value})}
                                  className="w-full bg-zinc-900 border border-white/5 text-white text-xs px-4 py-3 rounded-xl focus:outline-none focus:border-[#C8EB5F] transition-all font-mono resize-none"
                                />
                              </div>

                              <div className="space-y-2">
                                <label className="text-[9.5px] font-mono tracking-widest text-[#888] uppercase block font-bold">ENGLISH CONTENT (Double enter separates paragraphs)</label>
                                <textarea 
                                  rows={5}
                                  required
                                  placeholder="Type full article paragraphs in English..."
                                  value={editorData.contentEN}
                                  onChange={(e) => setEditorData({...editorData, contentEN: e.target.value})}
                                  className="w-full bg-zinc-900 border border-white/5 text-white text-xs px-4 py-3 rounded-xl focus:outline-none focus:border-[#C8EB5F] transition-all font-sans leading-relaxed"
                                />
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <label className="text-[9.5px] font-mono tracking-widest text-[#888] uppercase block font-bold">ENGLISH PULL QUOTE</label>
                                  <input 
                                    type="text"
                                    required
                                    placeholder="e.g. With elite knowledge comes greater ambition..."
                                    value={editorData.quoteEN}
                                    onChange={(e) => setEditorData({...editorData, quoteEN: e.target.value})}
                                    className="w-full bg-zinc-900 border border-white/5 text-white text-xs px-4 py-3 rounded-xl focus:outline-none focus:border-[#C8EB5F] transition-all font-mono"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <label className="text-[9.5px] font-mono tracking-widest text-[#888] uppercase block font-bold">ENGLISH KEY HIGHLIGHTS (One bullet per line)</label>
                                  <textarea 
                                    rows={3}
                                    placeholder="Takeaway 1&#10;Takeaway 2&#10;Takeaway 3"
                                    value={editorData.keyHighlightsEN}
                                    onChange={(e) => setEditorData({...editorData, keyHighlightsEN: e.target.value})}
                                    className="w-full bg-zinc-900 border border-white/5 text-white text-xs px-4 py-3 rounded-xl focus:outline-none focus:border-[#C8EB5F] transition-all font-mono text-xs"
                                  />
                                </div>
                              </div>
                            </div>

                          </div>

                          {/* Metadata Cover parameters */}
                          <div className="border border-white/5 bg-zinc-950/40 p-5 rounded-2xl space-y-4">
                            <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase block font-bold">
                              3. METRIC SPECIFICATION DETAILS
                            </span>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="space-y-2 md:col-span-2">
                                <label className="text-[9px] font-mono tracking-widest text-[#888] uppercase block font-bold">COVER PHOTO IMAGE URL</label>
                                <div className="relative flex items-center">
                                  <input 
                                    type="text"
                                    required
                                    value={editorData.imageUrl}
                                    onChange={(e) => setEditorData({...editorData, imageUrl: cleanUrl(e.target.value)})}
                                    className="w-full bg-zinc-900 border border-white/5 text-white text-xs pl-3.5 pr-10 py-2.5 rounded-xl focus:outline-none focus:border-[#C8EB5F] transition-all font-mono"
                                  />
                                  {editorData.imageUrl && (
                                    <button
                                      type="button"
                                      onClick={() => setEditorData({...editorData, imageUrl: ""})}
                                      className="absolute right-3.5 text-neutral-400 hover:text-[#C8EB5F] transition-all text-xs focus:outline-none cursor-pointer"
                                      title="Clear image URL"
                                    >
                                      ✕
                                    </button>
                                  )}
                                </div>
                              </div>
                              <div className="space-y-2">
                                <label className="text-[9px] font-mono tracking-widest text-[#888] uppercase block font-bold">READ TIMING (e.g. 5 MIN)</label>
                                <input 
                                  type="text"
                                  required
                                  value={editorData.readTime}
                                  onChange={(e) => setEditorData({...editorData, readTime: e.target.value})}
                                  className="w-full bg-zinc-900 border border-white/5 text-white text-xs px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-[#C8EB5F] transition-all font-mono"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="space-y-2">
                                <label className="text-[9px] font-mono tracking-widest text-[#888] uppercase block font-bold">AUTHOR INTENSIVE NAME</label>
                                <input 
                                  type="text"
                                  required
                                  value={editorData.authorName}
                                  onChange={(e) => setEditorData({...editorData, authorName: e.target.value})}
                                  className="w-full bg-zinc-900 border border-white/5 text-white text-xs px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-[#C8EB5F] transition-all font-mono"
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-[9px] font-mono tracking-widest text-[#888] uppercase block font-bold">AUTHOR PROFESSIONAL TITLE</label>
                                <input 
                                  type="text"
                                  required
                                  value={editorData.authorTitle}
                                  onChange={(e) => setEditorData({...editorData, authorTitle: e.target.value})}
                                  className="w-full bg-zinc-900 border border-white/5 text-white text-xs px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-[#C8EB5F] transition-all font-mono"
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-[9px] font-mono tracking-widest text-[#888] uppercase block font-bold">AUTHOR AVATAR URL</label>
                                <div className="relative flex items-center">
                                  <input 
                                    type="text"
                                    required
                                    value={editorData.authorAvatar}
                                    onChange={(e) => setEditorData({...editorData, authorAvatar: cleanUrl(e.target.value)})}
                                    className="w-full bg-zinc-900 border border-white/5 text-white text-xs pl-3.5 pr-10 py-2.5 rounded-xl focus:outline-none focus:border-[#C8EB5F] transition-all font-mono"
                                  />
                                  {editorData.authorAvatar && (
                                    <button
                                      type="button"
                                      onClick={() => setEditorData({...editorData, authorAvatar: ""})}
                                      className="absolute right-3.5 text-neutral-400 hover:text-[#C8EB5F] transition-all text-xs focus:outline-none cursor-pointer"
                                      title="Clear avatar URL"
                                    >
                                      ✕
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <label className="text-[9px] font-mono tracking-widest text-[#888] uppercase block font-bold">PUBLISHED DATE STRING (e.g. MAY 23, 2026)</label>
                              <input 
                                type="text"
                                required
                                value={editorData.date}
                                onChange={(e) => setEditorData({...editorData, date: e.target.value})}
                                className="w-full bg-zinc-900 border border-white/5 text-white text-xs px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-[#C8EB5F] transition-all font-mono"
                              />
                            </div>
                          </div>

                          {/* Action button row */}
                          <div className="pt-6 border-t border-white/5 flex flex-wrap justify-end gap-3 font-mono">
                            <button
                              type="button"
                              onClick={() => { setAdminTab("posts"); setEditingPost(null); }}
                              className="px-5 py-3 border border-white/10 text-neutral-400 hover:text-white hover:bg-white/5 text-[9.5px] uppercase font-bold tracking-widest rounded-xl transition-all cursor-pointer bg-transparent"
                            >
                              CANCEL EDIT
                            </button>
                            <button
                              type="submit"
                              disabled={dbSaving}
                              className="px-6 py-3 bg-[#C8EB5F] text-black hover:bg-white font-mono text-[9.5px] uppercase font-bold tracking-widest rounded-xl transition-all cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
                            >
                              <Save size={11} />
                              {dbSaving ? "SYNCING LIVE RECORD..." : "PUBLISH POST NOW"}
                            </button>
                          </div>

                        </form>
                      )}
                    </>
                  )}

                </div>

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating WhatsApp Action Trigger with Glowing Badge (Screenshot 7) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-auto">
        <a 
          href="https://wa.me/923233260859?text=Asalamu%20Alaikum,%20I%20am%20interested%20in%20taking%20Tajweed%2520online%2520classes%2520with%2520Tajweedpage." 
          target="_blank" 
          rel="noopener noreferrer"
          className="relative h-14 w-14 rounded-full bg-emerald-500 hover:bg-emerald-400 flex items-center justify-center shadow-[0_10px_30px_rgba(16,185,129,0.35)] hover:scale-105 active:scale-95 transition-all text-white outline-none cursor-pointer"
          title="Chat on WhatsApp"
        >
          {/* Notification red badge "1" floating top-right */}
          <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 flex items-center justify-center text-[10px] font-sans font-bold text-white border-2 border-black shadow">
            1
          </span>
          <svg className="h-7 w-7 fill-current" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 11.968.01c3.182.001 6.176 1.24 8.428 3.496 2.25 2.255 3.487 5.251 3.487 8.434-.003 6.62-5.339 11.956-11.914 11.956-2.007-.001-3.974-.509-5.717-1.478L0 24zm6.59-4.846c1.6.95 3.16 1.449 4.887 1.45 5.426 0 9.84-4.385 9.843-9.772.001-2.61-1.012-5.066-2.855-6.913C16.63 2.073 14.18 1.056 11.6 1.056c-5.428 0-9.843 4.387-9.846 9.773-.001 1.772.467 3.51 1.35 5.03L2.1 21.944l6.09-1.584c-1.554-1.037.447-1.206-1.543-1.206zM17.11 14.3c-.3-.15-1.78-.88-2.05-.98-.28-.1-.48-.15-.69.15-.2.29-.79.98-.97 1.2-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.51-1.8-1.69-2.1-.18-.3-.02-.45.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.68-1.64-.93-2.24-.25-.6-.5-.52-.69-.53-.18-.01-.39-.01-.6-.01-.2 0-.53.07-.81.38-.28.3-1.07 1.05-1.07 2.56s1.1 2.97 1.25 3.17c.15.2 2.16 3.3 5.23 4.62.73.31 1.3.5 1.75.64.73.23 1.4.2 1.93.12.59-.09 1.78-.73 2.03-1.43.25-.7.25-1.3.17-1.43-.08-.13-.3-.21-.6-.36z" />
          </svg>
        </a>
      </div>

    </main>
  );
}
