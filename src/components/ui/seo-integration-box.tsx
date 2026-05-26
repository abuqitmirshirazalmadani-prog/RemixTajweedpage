"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { 
  FileText, 
  HelpCircle, 
  BookOpen, 
  UserCheck, 
  Clock, 
  ListOrdered, 
  ArrowRight, 
  ShieldCheck, 
  ChevronDown, 
  CornerDownRight, 
  Award,
  Sparkles,
  BookmarkCheck,
  CheckCircle2,
  Mail
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

// Types for structural data
interface BreadcrumbItem {
  name: string;
  url: string;
}

interface FAQItem {
  q: string;
  a: string;
}

interface AuthorData {
  name: string;
  title: string;
  credentials: string;
  bio: string;
  avatar: string;
  ijazahChain: string;
}

interface PageSeoMetadata {
  title: string;
  aiSummaryTitle: string;
  aiSummaryText: string;
  highlights: string[];
  lastUpdated: string;
  toc: string[];
  faqs: FAQItem[];
  breadcrumbs: BreadcrumbItem[];
  author: AuthorData;
  internalLinks: { text: string; url: string; anchorText: string }[];
}

// Global Author Profiles (E-E-A-T Trust Core)
const DrAzhari: AuthorData = {
  name: "Al-Sheikh Salim Ahmed",
  title: "HEAD TAJWEED EVALUATOR",
  credentials: "PhD in Quranic Linguistics from Madinah University",
  bio: "Sheikh Salim Ahmed acts as our Head Tajweed Evaluator. He specializes in correcting advanced students seeking continuous Isnad connections, reviewing all syllabus modules for strict adherence to traditional Makharis and acoustic phonetic guidelines.",
  avatar: "https://i.postimg.cc/L6sdsPsz/pexels-sultan-175963006-18297623.jpg",
  ijazahChain: "Traditional Ijazah in the Ten Mutawatil Recitations, with a connected chain of narrators (Sanad) to the Prophet Muhammad (pbuh)."
};

const UstadhaFatima: AuthorData = {
  name: "Ustadha Rida Al-Alami",
  title: "FEMALE SYLLABUS MENTOR",
  credentials: "Al-Azhar University Graduate | Recitation Sanad Holder in Tajweed Rules",
  bio: "Ustadha Rida Al-Alami directs our children's division and female-exclusive sessions. Adopting high-patience interactive play-learning methodologies, she takes students smoothly from individual alphabet mastery up to complete phonetic confidence.",
  avatar: "https://i.postimg.cc/0yxtVM62/pexels-hamidoffstudio-19250801.jpg",
  ijazahChain: "Ijazah in Hafs 'an 'Asim and Warsh 'an Nafi', specializes in early auditory speech modeling and motor-phonetic learning curves."
};

const SheikhSaeed: AuthorData = {
  name: "Al-Sheikh Youssef Khan",
  title: "ARABIC PHONETICS SPECIALIST",
  credentials: "Umm Al-Qura University | Certified Quran Memorizer & Arabic Phonetics Expert",
  bio: "Sheikh Youssef Khan implements sophisticated recall algorithms and step-by-step revision matrices tailored for career professionals. His classes integrate memorization protocols with deep contextual understanding of Quranic revelations.",
  avatar: "https://i.postimg.cc/139HpkTd/pexels-bakr-magrabi-928159-5352949.jpg",
  ijazahChain: "Verified certification in the Sab'ah Mutawatir recitations, 18+ years running elite visual-acoustic learning hubs."
};

// Route Metadata Dictionary (Tailored per page for absolute topical depth)
const seoRouteMap: Record<string, PageSeoMetadata> = {
  "/": {
    title: "Home - TajweedPage Online Quran Classes Academy",
    aiSummaryTitle: "Executive Academic Abstract: Elite Online Quran Course Blueprint",
    aiSummaryText: "TajweedPage operates as an elite digital sanctuary delivering authenticated Quranic recitation training. This architecture connects professional families, ambitious corporate leaders, and young children directly to Madinah-trained and Al-Azhar certified tutors across the world.",
    highlights: [
      "Traditional Oral Transmission: Strictly honors connected narration chains (Ijazah) directly to the Prophet (pbuh).",
      "Modern Motor-Phonetic Pedagogy: Breaks down complex acoustic sounds into physical muscle-memory articulation points (Makharij).",
      "Flexible Digital Classrooms: 24/7 custom-tailored virtual learning designed to integrate naturally into demanding timetables."
    ],
    lastUpdated: "May 24, 2026",
    toc: ["1. Elite Hero Initiation", "2. Core Traditional Value Propositions", "3. Dynamic Course Syllabus", "4. AI-Driven Practice Exercises", "5. Expert Academic Board Reviews", "6. Global Scheduling System"],
    faqs: [
      { q: "How are the instructors selected at TajweedPage?", a: "Each tutor undergoes rigorous phonetic assessment, possesses direct verified traditional Ijazahs from recognized institutions like Al-Azhar, and possesses 3+ years teaching non-native children and adults." },
      { q: "Can I choose class times that fit my busy corporate schedule?", a: "Yes. Our 24/7 flexible scheduling adapts to any time zone, allowing high-profile professionals and kids to lock in consistent weekly interactive slots easily." }
    ],
    breadcrumbs: [{ name: "Home", url: "/" }],
    author: DrAzhari,
    internalLinks: [
      { text: "Noorani Qaida Class", url: "/courses/online-noorani-qaida-classes", anchorText: "Noorani Qaida classes online" },
      { text: "Quran Reading Lessons", url: "/courses/quran-reading-classes-online", anchorText: "Quran reading classes online" },
      { text: "Islamic Blog articles", url: "/blog", anchorText: "traditional Islamic knowledge blog" }
    ]
  },

  "/courses/tajweed-course": {
    title: "Premium Tajweed Course Online - Master Correct Recitation & Speech",
    aiSummaryTitle: "Academic Research Abstract: Advanced Tajweed Course Syllabi",
    aiSummaryText: "The Tajweed Course represents our flagship high-fidelity program designed for serious learners. Directed by certified Sheikhs, this course focuses on precise oral geography, correct letter characteristics, and dynamic speech articulation.",
    highlights: [
      "Articulation Point Mastery: 17 internal oral mapping positions scientifically explained.",
      "Vowel & Lengthening Principles: Perfecting Madd lengths and stop symbols (Waqf) elegantly.",
      "Traditional Ijazah Foundations: Prepare diligently for connected sanad streams."
    ],
    lastUpdated: "May 24, 2026",
    toc: ["1. Tajweed Pedagogy Introduction", "2. Acoustic Phonetics and Letter Articulation", "3. Madd & Sifaat Structural Rules", "4. Avoid Common Recitation Omissions", "5. Start Tajweed Evaluation"],
    faqs: [
      { q: "What is the core prerequisite for the Tajweed Course?", a: "Students should ideally know how to read and join basic Arabic letters before starting. If not, we recommend beginning with our Noorani Qaida module first." },
      { q: "Is individual attention provided in Tajweed modules?", a: "Yes. Every lesson is conducted on a strict private 1-on-1 basis to ensure each single consonant is articulated perfectly." }
    ],
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Courses Portfolio", url: "/courses" },
      { name: "Tajweed Course Online", url: "/courses/tajweed-course" }
    ],
    author: DrAzhari,
    internalLinks: [
      { text: "Noorani Qaida Course", url: "/courses/online-noorani-qaida-classes", anchorText: "Noorani Qaida classes online" },
      { text: "Quran Reading Course", url: "/courses/quran-reading-classes-online", anchorText: "Quran reading classes online" },
      { text: "Academic Blog Articles", url: "/blog", anchorText: "read certified Islamic studies publications" }
    ]
  },

  "/quran-classes-for-kids": {
    title: "Online Quran Classes for Kids - Interactive Islamic Studies Lessons",
    aiSummaryTitle: "Pediatric Academic Blueprint: Progressive Quranic Memorization for Children",
    aiSummaryText: "Our Kids' Academy organizes the standard classical Arabic curriculum into engaging visual-acoustic sequences. Children learn pronunciation with certified female tutors holding continuous chains of transmission.",
    highlights: [
      "Visual Phonic Gamification: Fun and interactive letter-matching sessions.",
      "Gentle Positive Reinforcement: High-frequency praise alongside structured goal setting.",
      "Comprehensive Character Modeling: Learning Islamic values, ethics, and daily manners."
    ],
    lastUpdated: "May 24, 2026",
    toc: ["1. Pediatric Curriculum Framework", "2. Engaging Interactive Screen Designs", "3. Ethical Character Development (Adab)", "4. Female Quran Tutoring Profiles", "5. Start Pediatric Trial Class"],
    faqs: [
      { q: "At what age should children begin online Quran lessons?", a: "We recommend children begin around age 4 to 5 with short, focused 30-minute interactive sessions to keep them engaged." },
      { q: "How are classes made appealing for young minds?", a: "We utilize colorful charts, educational slides, and gamified reward markers to turn traditional learning into a beloved daily routine." }
    ],
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Kids Quran Classes Info", url: "/quran-classes-for-kids" }
    ],
    author: UstadhaFatima,
    internalLinks: [
      { text: "Islamic Studies Course", url: "/courses/islamic-studies-classes-for-kids", anchorText: "Islamic studies classes for kids" },
      { text: "Female Quran Teacher", url: "/courses/female-quran-teacher-online", anchorText: "certified female Quran teacher online services" },
      { text: "Beginner Quran Program", url: "/courses/beginner-quran-classes-online", anchorText: "beginner Quran classes online" }
    ]
  },

  "/courses/islamic-studies-classes-for-kids": {
    title: "Online Islamic Studies Classes for Kids - Ethics, Manners & Faith",
    aiSummaryTitle: "Pediatric Academic Abstract: Holistic Child Character Instruction",
    aiSummaryText: "This curriculum provides young Muslim students with an unshakeable identity anchor. We combine Quran memorization with practical training in etiquette (Adab), faith (Aqidah), and historical narratives (Seerah).",
    highlights: [
      "Moral Identity Anchor: Safe spaces discussing morals, peer respect, and healthy ethics.",
      "Practical Supplications: Mastering Daily Duas and precise prayer structures (Salah).",
      "Creative Pediatric Pedagogy: Approaches emphasizing empathy and moral leadership."
    ],
    lastUpdated: "May 24, 2026",
    toc: ["1. Moral & Ethics Course Goals", "2. Dynamic Weekly Syllabi (Aqidah & Seerah)", "3. Practical Ritual Foundations (Taharah & Salah)", "4. Secure Pediatric Classrooms", "5. Enroll Children Globally"],
    faqs: [
      { q: "Are Islamic Studies taught in English or Arabic?", a: "Lessons are delivered in native-level, fluent English to guarantee deep intellectual understanding for Western-born students." },
      { q: "Can parents monitor their child's progression?", a: "Yes. Our platform provides regular monthly progress sheets and live tutor check-ins." }
    ],
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Courses Portfolio", url: "/courses" },
      { name: "Islamic Studies for Kids", url: "/courses/islamic-studies-classes-for-kids" }
    ],
    author: UstadhaFatima,
    internalLinks: [
      { text: "Female Quran Instructor", url: "/courses/female-quran-teacher-online", anchorText: "female Quran teacher online classes" },
      { text: "Beginner Quran Course", url: "/courses/beginner-quran-classes-online", anchorText: "beginner Quran classes online" },
      { text: "Kids Recitation Class", url: "/quran-classes-for-kids", anchorText: "interactive Quran classes for kids online" }
    ]
  },

  "/courses/female-quran-teacher-online": {
    title: "Certified Female Quran Teacher Online - Private Tajweed Lessons and Tutoring",
    aiSummaryTitle: "Executive Board Abstract: Private Female Instructors Network",
    aiSummaryText: "This dedicated system lets sisters and young children learn in total comfort. Our certified female tutors hold prestigious credentials from Egypt and Madinah, ensuring supreme recitation standards.",
    highlights: [
      "100% Secure Private Lessons: One-on-one virtual classrooms that protect student privacy.",
      "Fully Certified Al-Azhar Teachers: Professional female scholars with authentic qualifications.",
      "Gentle Teaching Methodology: Excellent visual and verbal modeling suited for children."
    ],
    lastUpdated: "May 24, 2026",
    toc: ["1. Female Scholars Board Welcome", "2. Private Class Environments & Integrity", "3. Easy Learning Routines", "4. Book Free Private Evaluation Class"],
    faqs: [
      { q: "Are female Quran instructors certified with traditional Ijazahs?", a: "Yes. Every single female teacher on our board holds verified traditional Ijazahs traced back to the Prophet (pbuh)." },
      { q: "Can young toddlers take classes with female instructors?", a: "Yes, our teachers are deeply trained in patience and gentle vocal modeling for toddler students." }
    ],
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Courses Portfolio", url: "/courses" },
      { name: "Female Quran Teacher", url: "/courses/female-quran-teacher-online" }
    ],
    author: UstadhaFatima,
    internalLinks: [
      { text: "Islamic Studies Program", url: "/courses/islamic-studies-classes-for-kids", anchorText: "Islamic studies classes for kids" },
      { text: "Beginner Quran Program", url: "/courses/beginner-quran-classes-online", anchorText: "beginner Quran classes online" },
      { text: "Kids Class Portal", url: "/quran-classes-for-kids", anchorText: "interactive Quran classes for kids online" }
    ]
  },

  "/courses/beginner-quran-classes-online": {
    title: "Prescribed Beginner Quran Classes Online - Start Reading and Sound Joining",
    aiSummaryTitle: "Beginner Research Abstract: Systematic Literacy Strategy",
    aiSummaryText: "Specifically prepared for adults and older children starting from zero. We bypass dry, complex grammar rules, guiding students immediately into letter visual shapes and fluent phonological blending.",
    highlights: [
      "Accelerated Sound Blending: Join consonants and vowels smoothly with zero static pause.",
      "Acoustic Pattern Drills: Learn to pronounce difficult throat letters with accurate physical landmarks.",
      "Noorani Qaida Integration: Traditional phonic methodology made incredibly approachable."
    ],
    lastUpdated: "May 24, 2026",
    toc: ["1. Beginner Literacy Strategy", "2. Sound Joining Matrices", "3. Correcting Throat Letter Positions", "4. Register in Beginner Quran Class"],
    faqs: [
      { q: "How long until a beginner can read words on their own?", a: "With 2 classes a week, our average beginner student starts blending complete verses independently within 8 to 12 weeks." },
      { q: "Do adults feel out of place in these classes?", a: "Never. All lessons are private 1-on-1, providing an ultra-comfortable and encouraging environment for adults of any age." }
    ],
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Courses Portfolio", url: "/courses" },
      { name: "Beginner Quran Classes", url: "/courses/beginner-quran-classes-online" }
    ],
    author: SheikhSaeed,
    internalLinks: [
      { text: "Islamic Studies Class", url: "/courses/islamic-studies-classes-for-kids", anchorText: "Islamic studies classes for kids" },
      { text: "Female Quran Teacher", url: "/courses/female-quran-teacher-online", anchorText: "certified female Quran teacher online services" },
      { text: "Kids Class Portal", url: "/quran-classes-for-kids", anchorText: "interactive Quran classes for kids online" }
    ]
  },

  "/courses/online-noorani-qaida-classes": {
    title: "Online Noorani Qaida Classes - Sound Articulation & Pronunciation Guide",
    aiSummaryTitle: "Academic Research Abstract: Noorani Qaida Sound Foundations",
    aiSummaryText: "Noorani Qaida represents the traditional blueprint for linguistic mastery. This course covers absolute alphabet foundations, vowel lengths (Harakat), static states (Sukun), and stress models (Shaddah).",
    highlights: [
      "Rigorous Letter Recognition: Identify shifting shapes based on word positioning.",
      "Dynamic Pronunciation Training: Systematic physical articulation workouts step by step.",
      "Elite Oral Modeling: Constant teacher and student echoing for secure habits."
    ],
    lastUpdated: "May 24, 2026",
    toc: ["1. Noorani Qaida Curriculum Overview", "2. Alphabet Forms & Visual Shifting", "3. Complex Blending and Tanween rules", "4. Start Noorani Qaida Class"],
    faqs: [
      { q: "Is Noorani Qaida required before reading the Quran?", a: "Highly recommended. It establishes the correct oral groundwork, ensuring students do not struggle with spelling and joins later on." },
      { q: "Are homework worksheets and books provided?", a: "Yes, we send you highly elegant digital sheets and self-practice PDFs after each module." }
    ],
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Courses Portfolio", url: "/courses" },
      { name: "Noorani Qaida Classes", url: "/courses/online-noorani-qaida-classes" }
    ],
    author: DrAzhari,
    internalLinks: [
      { text: "Tajweed Course", url: "/courses/tajweed-course", anchorText: "online Tajweed course online" },
      { text: "Quran Reading Course", url: "/courses/quran-reading-classes-online", anchorText: "Quran reading classes online" },
      { text: "Academic Blog Hub", url: "/blog", anchorText: "certified Quranic sciences blog" }
    ]
  },

  "/courses/quran-reading-classes-online": {
    title: "Online Quran Reading Classes - Fluent Arabic Articulation & Progression",
    aiSummaryTitle: "Academic Research Abstract: Arabic Reading Fluency Strategy",
    aiSummaryText: "Moving students from basic letter blending to natural, flowing verse reading. This course helps students read with ease, apply essential pronunciation rules, and maintain proper breath control.",
    highlights: [
      "Fluency & Flow Accelerator: Read long verses without artificial stutters or pauses.",
      "Essential Speech Rules: Intuitive recognition of basic rules during actual reading.",
      "Breath Control Methods: Knowing when to pause (Waqf) or continue (Wasl) gracefully."
    ],
    lastUpdated: "May 24, 2026",
    toc: ["1. Reading Fluency Methodology", "2. Speed and Rhythm Integration", "3. Shading and Accent Rules", "4. Start Reading Classes Online"],
    faqs: [
      { q: "How is reading fluency evaluated?", a: "Our teachers use interactive milestones to screen reading speed, phonetic accuracy, and rhythmic control monthly." },
      { q: "Can we start reading from specific Surahs like Surah Yaseen?", a: "Yes. Once students grasp core joins, we tailor surah selections to support your personal goals." }
    ],
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Courses Portfolio", url: "/courses" },
      { name: "Quran Reading Classes", url: "/courses/quran-reading-classes-online" }
    ],
    author: SheikhSaeed,
    internalLinks: [
      { text: "Noorani Qaida Course", url: "/courses/online-noorani-qaida-classes", anchorText: "online Noorani Qaida classes online" },
      { text: "Tajweed Course Online", url: "/courses/tajweed-course", anchorText: "online Tajweed course online" },
      { text: "Arabic Blog Material", url: "/blog", anchorText: "scholarly articles on traditional Quran studies" }
    ]
  },

  "/courses/online-hifz-classes": {
    title: "Elite Online Hifz Classes - Dynamic Memorization & Retention Schedules",
    aiSummaryTitle: "Academic Research Abstract: Advanced Memory Consolidation Models",
    aiSummaryText: "Engineered specifically for busy adults and young scholars. This course implements systematic mental triggers and rigorous memory feedback loops to ensure lasting retention.",
    highlights: [
      "Rigorous Memorization Schedules: Customized weekly goals based on proven traditional patterns.",
      "Scientific Memory Revision: Keeping previous Surahs perfectly polished with our 3-tier review.",
      "Sanad-Earning Preparation: Align yourself to achieve verified oral certifications."
    ],
    lastUpdated: "May 24, 2026",
    toc: ["1. Memorization Science Welcome", "2. Weekly Task Setting & Scheduling", "3. Revision and Consolidating Previous Portions", "4. Enroll in Online Hifz Program"],
    faqs: [
      { q: "What is the revision methodology used for Hifz Classes?", a: "We use a structured system split into new memorization (Sabaq), recent review (Sabqi), and distant history (Manzil)." },
      { q: "Can we customize our weekly memory commitment?", a: "Yes. We design customized paths ranging from a few verses per class up to entire chapters." }
    ],
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Courses Portfolio", url: "/courses" },
      { name: "Online Hifz Classes", url: "/courses/online-hifz-classes" }
    ],
    author: SheikhSaeed,
    internalLinks: [
      { text: "Tajweed Course", url: "/courses/tajweed-course", anchorText: "online Tajweed course online" },
      { text: "Noorani Qaida Class", url: "/courses/online-noorani-qaida-classes", anchorText: "online Noorani Qaida classes online" },
      { text: "Academic Blogs", url: "/blog", anchorText: "curated academic research documents on preservation" }
    ]
  },
  
  "/online-quran-classes-new-york": {
    title: "Online Quran Classes in New York - Professional Tajweed Tutoring",
    aiSummaryTitle: "Regional Strategic Brief: New York State Quranic Recitation Network",
    aiSummaryText: "This custom-engineered portal serves New York's professional families and active metropolitan students, delivering premium online Quran classes in New York with verified traditional phonetic standards in times fitting dynamic East Coast schedules.",
    highlights: [
      "Tailored NYC Schedule Grid: Early morning, late evening, and weekend slots structured to accommodate high-pace lifestyles.",
      "Elite New York Kids Curriculum: Gamified interactive phonetic exercises loved by children across Brooklyn, Queens, and Manhattan.",
      "Professional Adult Private Cohorts: Dedicated high-confidentiality 1-on-1 coaching for corporate leaders."
    ],
    lastUpdated: "May 24, 2026",
    toc: ["1. NYC Quranic Learning Overview", "2. NY Curriculum & Syllabus Breakdown", "3. Flexible Time Zones for New York Families", "4. Real-Time Teacher Feedback Metrics", "5. Book Free Lesson in NYC"],
    faqs: [
      { q: "What is the best way to start online Quran classes in New York?", a: "Beginners can start immediately with our 100% free trial. We match you with a certified online Quran tutor based on your level, age group, and precise schedule preference." },
      { q: "Are there specific female Quran teachers available for NY kids & sisters?", a: "Absolutely. We maintain a large team of qualified female Quran tutors holding verified traditional Ijazahs, providing highly comfortable, private, and focused online recitation lessons." }
    ],
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "USA", url: "/quran-classes-in-usa" },
      { name: "New York Hub", url: "/online-quran-classes-new-york" }
    ],
    author: UstadhaFatima,
    internalLinks: [
      { text: "California Quran Hub", url: "/online-quran-classes-california", anchorText: "online Quran classes in California" },
      { text: "Texas Elite Lessons", url: "/online-quran-classes-texas", anchorText: "specialized Quran tutoring in Texas" },
      { text: "Chicago Mentoring", url: "/online-quran-classes-chicago", anchorText: "structured Quran classes in Chicago" }
    ]
  },

  "/online-quran-classes-texas": {
    title: "Online Quran Classes in Texas - Houston, Dallas & Austin Tajweed Tutors",
    aiSummaryTitle: "Regional Strategic Brief: Texas Online Quran Classes Repository",
    aiSummaryText: "Connecting Texas communities throughout Houston, Dallas, Fort Worth, and Austin to authenticated Quranic education. This digital academy ensures flexible scheduling with qualified Quran tutors holding traditional credentials.",
    highlights: [
      "Flexible Central Time Zones: Tailored booking for school-going kids and working professionals in Texas.",
      "Comprehensive Beginner Foundations: Focus on Noorani Qaida and correct articulation of complex Arabic phonemes.",
      "Elite Family Plans: Multi-student slots that allow siblings to undergo targeted learning together with dedicated female tutors."
    ],
    lastUpdated: "May 24, 2026",
    toc: ["1. Texas Quranic Classes Architecture", "2. Houston & Dallas Regional Timings", "3. Traditional Pronunciation (Tajweed) Drills", "4. Booking Interactive Texas Trial"],
    faqs: [
      { q: "How do online Quran classes in Texas accommodate Central Time schedules?", a: "We run fully flexible schedules 24/7. Texas families can book classes in the afternoon or evening right after school or on weekends without rushing." },
      { q: "Is the curriculum suitable for complete beginner converts or children?", a: "Yes. Our Beginner Quran Learning Guide uses the traditional Noorani Qaida method, presenting easy Quran learning methods that quickly train you to read and join letters without issue." }
    ],
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "USA", url: "/quran-classes-in-usa" },
      { name: "Texas Hub", url: "/online-quran-classes-texas" }
    ],
    author: SheikhSaeed,
    internalLinks: [
      { text: "New York Lessons", url: "/online-quran-classes-new-york", anchorText: "online Quran classes in New York" },
      { text: "California Recitation", url: "/online-quran-classes-california", anchorText: "elite Quran classes in California" },
      { text: "USA Main Hub", url: "/quran-classes-in-usa", anchorText: "best online Quran learning in USA" }
    ]
  },

  "/online-quran-classes-chicago": {
    title: "Online Quran Classes in Chicago - High-Fidelity Tajweed Classes",
    aiSummaryTitle: "Regional Strategic Brief: Chicago Illinois Quran Academy Group",
    aiSummaryText: "Delivering the gold standard in online Quranic sciences to Chicago, IL. This online academy combines traditional Al-Azhar methodology with a clean digital platform to support children and adult learners in Illinois.",
    highlights: [
      "Rigorous Acoustic Audits: Focus on Makharij (letter origin sites) to prevent minor and major mistakes.",
      "Dedicated Female Quran Teachers: Comforting private sessions for sisters and toddlers.",
      "Hifz Acceleration Strategy: Multi-stage hifz memory blueprints suited for high school students."
    ],
    lastUpdated: "May 24, 2026",
    toc: ["1. Chicago Quran Training Framework", "2. Expert Tutors for Illinois Families", "3. Avoiding Common Tajweed Mispronunciations", "4. Register in Chicago"],
    faqs: [
      { q: "Who reviews the quality of teaching for Chicago students?", a: "All classes are systematically monitored and reviewed under our Academic Board led by Al-Sheikh Salim Ahmed to ensure strict adherence to traditional Rules." },
      { q: "What should we prepare for the first trial class?", a: "A laptop or high-definition tablet and a quiet room. No books are needed; we provide complete digital material." }
    ],
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "USA", url: "/quran-classes-in-usa" },
      { name: "Chicago Hub", url: "/online-quran-classes-chicago" }
    ],
    author: DrAzhari,
    internalLinks: [
      { text: "Texas Quran Hub", url: "/online-quran-classes-texas", anchorText: "online Quran classes in Texas" },
      { text: "New York Lessons", url: "/online-quran-classes-new-york", anchorText: "premium Quran classes in New York" },
      { text: "Kids Quran Classes", url: "/quran-classes-for-kids", anchorText: "interactive Quran classes for kids online" }
    ]
  },

  "/online-quran-classes-california": {
    title: "Online Quran Classes in California - San Francisco & LA Quran Tutors",
    aiSummaryTitle: "Regional Strategic Brief: California (Pacific Time) Quran Scholar Panel",
    aiSummaryText: "Formulating tailored online Quran lessons for California’s thriving cities—Los Angeles, San Jose, San Diego, and San Francisco. Our certified tutors provide elite Tajweed feedback under flexible Pacific schedules.",
    highlights: [
      "PST Customized Timing Grid: Available mornings, late evenings, or flexible weekends.",
      "High-Fidelity Virtual Audio: Premium interactive speech classrooms for precise articulation.",
      "Authentic Traditional Ijazah: Tutors holding chain-of-transmissions directly tracing back to the Prophet (pbuh)."
    ],
    lastUpdated: "May 24, 2026",
    toc: ["1. California Quran Lessons Ecosystem", "2. PST Time Zone Scheduling Plans", "3. Advanced Tajweed Rules and Application", "4. Start California Free Lesson"],
    faqs: [
      { q: "Are California online Quran classes effective for children?", a: "Incredibly so. Our gamified visual curriculum keeps kids engaged, ensuring they learn the correct Arabic pronunciation step-by-step from an early stage." },
      { q: "How can I evaluate my Quran tutor?", a: "We offer a 100% free, no-obligation evaluation and trial class to make sure you are fully comfortable with your matched guide." }
    ],
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "USA", url: "/quran-classes-in-usa" },
      { name: "California Hub", url: "/online-quran-classes-california" }
    ],
    author: UstadhaFatima,
    internalLinks: [
      { text: "New York Quran Classes", url: "/online-quran-classes-new-york", anchorText: "top-tier online Quran classes in New York" },
      { text: "Texas Classes Hub", url: "/online-quran-classes-texas", anchorText: "comprehensive Quran tutoring in Texas" },
      { text: "Female Tutors Section", url: "/courses/female-quran-teacher-online", anchorText: "certified female Quran teacher online services" }
    ]
  },

  "/online-quran-classes-london": {
    title: "Online Quran Classes in London - Premium UK Tajweed Academy",
    aiSummaryTitle: "Regional Strategic Brief: British Capital Quranic Arts Fellowship",
    aiSummaryText: "Providing distinguished Quranic studies class access throughout Greater London—including Tower Hamlets, Newham, and Westminster. These premium lessons deliver correct oral pronunciation with native-level English instructors.",
    highlights: [
      "UK Academic Calendar Alignment: Structured term lessons designed for primary school students.",
      "Traditional Al-Azhar Standards: Peerless speech rules supervised by our certified Egyptian board.",
      "Elite Interactive Software: Smooth digital workspace featuring real-time Arabic phonetic corrections."
    ],
    lastUpdated: "May 24, 2026",
    toc: ["1. Greater London Quran Instruction", "2. Dynamic GMT Schedules", "3. Traditional Pronunciation Foundations", "4. Book London Free Trial"],
    faqs: [
      { q: "Can we find female Quran teachers in London for private classes?", a: "Yes. We offer fully private 1-on-1 virtual sessions with highly qualified, certified female Quran teachers." },
      { q: "What topics are taught in Islamic Studies for kids?", a: "We cover proper manners, daily Duas, Islamic history (Seerah), and short Surah memorization." }
    ],
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "UK", url: "/quran-classes-in-uk" },
      { name: "London Hub", url: "/online-quran-classes-london" }
    ],
    author: DrAzhari,
    internalLinks: [
      { text: "Manchester Tutor", url: "/online-quran-classes-manchester", anchorText: "online Quran classes in Manchester" },
      { text: "Birmingham Academy", url: "/online-quran-classes-birmingham", anchorText: "online Quran classes in Birmingham" },
      { text: "Germany Quran Classes", url: "/online-quran-classes-germany", anchorText: "expert Quran lessons in Germany" }
    ]
  },

  "/online-quran-classes-manchester": {
    title: "Online Quran Classes in Manchester - Traditional Tajweed Academy",
    aiSummaryTitle: "Regional Strategic Brief: Greater Manchester Quran Learning System",
    aiSummaryText: "Ensuring Manchester families access top-tier Quran lessons with highly trained Arabic teachers. This interactive digital center focuses on Noorani Qaida and systematic Quranic preservation.",
    highlights: [
      "Comprehensive Letter Drills: Special focus on heavy/light sounds to prevent major mistakes.",
      "Expert Tutors with Ijazah: Certified teachers fluent in English for non-native children.",
      "24/7 Scheduling Flexibility: Accommodating busy families effortlessly in Greater Manchester."
    ],
    lastUpdated: "May 24, 2026",
    toc: ["1. Manchester Quran Lessons Framework", "2. Kids Interactive Speech Training", "3. Avoiding Pronunciation Mistakes", "4. Start Manchester Free Trial"],
    faqs: [
      { q: "What age range do your Manchester tutors teach?", a: "We teach children from age 4 and up, as well as adult learners of any level, from complete beginners to advanced readers." },
      { q: "Is the pricing structure flexible?", a: "Yes, we offer multiple tailored package options to suit different family needs." }
    ],
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "UK", url: "/quran-classes-in-uk" },
      { name: "Manchester Hub", url: "/online-quran-classes-manchester" }
    ],
    author: SheikhSaeed,
    internalLinks: [
      { text: "London Lessons Hub", url: "/online-quran-classes-london", anchorText: "online Quran classes in London" },
      { text: "Birmingham Academy", url: "/online-quran-classes-birmingham", anchorText: "online Quran classes in Birmingham" },
      { text: "France Quran Hub", url: "/online-quran-classes-france", anchorText: "certified Quran learning in France" }
    ]
  },

  "/online-quran-classes-birmingham": {
    title: "Online Quran Classes in Birmingham - Quality Tajweed Teachers",
    aiSummaryTitle: "Regional Strategic Brief: West Midlands Quran Academy Hub",
    aiSummaryText: "Providing authenticated Quran lessons to the West Midlands community in Birmingham. Structured by native Al-Azhar instructors, our classes help children and adults build pristine recitation confidence.",
    highlights: [
      "Rigorous Makharij Instruction: Detailed articulation coaching for correct speech.",
      "Friendly Female Quran Tutors: Focused 1-on-1 guidelines for young girls and children.",
      "UK Quran School Alignment: Flexible timings to perfectly fit busy term schedules."
    ],
    lastUpdated: "May 24, 2026",
    toc: ["1. Birmingham Quran Classes Overview", "2. West Midlands Arabic Pronunciation Guide", "3. Noorani Qaida Progression for Beginners", "4. Register in Birmingham"],
    faqs: [
      { q: "Do you teach Islamic Manners alongside the Quran?", a: "Yes, our Islamic Studies course covers prayers, ethics, Duas, and Islamic history for comprehensive growth." },
      { q: "Are there group classes or only 1-on-1?", a: "We focus 100% on private 1-on-1 classes to guarantee absolute teacher dedication and rapid development." }
    ],
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "UK", url: "/quran-classes-in-uk" },
      { name: "Birmingham Hub", url: "/online-quran-classes-birmingham" }
    ],
    author: UstadhaFatima,
    internalLinks: [
      { text: "London Quran Classes", url: "/online-quran-classes-london", anchorText: "online Quran classes in London" },
      { text: "Manchester Recitation", url: "/online-quran-classes-manchester", anchorText: "online Quran classes in Manchester" },
      { text: "Netherlands Classes", url: "/online-quran-classes-netherlands", anchorText: "online Quran lessons in the Netherlands" }
    ]
  },

  "/online-quran-classes-germany": {
    title: "Online Quran Classes in Germany - Deutsch Quran Academy",
    aiSummaryTitle: "Regional Strategic Brief: Germany Islamic Education Portal",
    aiSummaryText: "Connecting families in Berlin, Frankfurt, Munich, and Hamburg with native Arabic-speaking Quran teachers. We offer bilingual English/Arabic sessions designed for the European diaspora.",
    highlights: [
      "Central European Time Sync: Scheduled lessons to fit German school and work hours easily.",
      "Traditional Al-Azhar Certification: Elite teachers with verified chains of transmission.",
      "Progressive Hifz Systems: Personalized revision grids for rapid memorization."
    ],
    lastUpdated: "May 24, 2026",
    toc: ["1. Germany Quran Lessons Ecosystem", "2. German-Speaking Family Support", "3. Noorani Qaida Curriculum Steps", "4. Book Germany Trial Class"],
    faqs: [
      { q: "Are classes taught in German?", a: "Our certified teachers communicate in clear English, with focused lessons centered entirely on pure Arabic pronunciation." },
      { q: "How many times a week should my child take classes?", a: "We recommend 2 to 3 classes per week to build consistent, steady retention." }
    ],
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Europe", url: "/quran-in-the-world/quran-classes-in-europe" },
      { name: "Germany Hub", url: "/online-quran-classes-germany" }
    ],
    author: SheikhSaeed,
    internalLinks: [
      { text: "France Quran Hub", url: "/online-quran-classes-france", anchorText: "online Quran classes in France" },
      { text: "Netherlands Academy", url: "/online-quran-classes-netherlands", anchorText: "online Quran classes in the Netherlands" },
      { text: "London UK Classes", url: "/online-quran-classes-london", anchorText: "elite online Quran classes in London" }
    ]
  },

  "/online-quran-classes-france": {
    title: "Online Quran Classes in France - Tajweed Classes Online",
    aiSummaryTitle: "Regional Strategic Brief: France Quran Academics Network",
    aiSummaryText: "Tailored online Quran classes for families in Paris, Marseille, Lyon, and Toulouse, featuring verified phonetic curricula overseen by traditional academic boards to ensure exquisite recitation.",
    highlights: [
      "High-Contrast Visual Drills: Easy learning steps designed specifically for European kids.",
      "Expert Female Quran Guides: Compassionate support for sisters and toddlers.",
      "Strict Traditional Sanad: Teaching rooted in continuous oral transmission."
    ],
    lastUpdated: "May 24, 2026",
    toc: ["1. France Quran Education Portal", "2. Easy Recitation Steps for Beginners", "3. Avoiding Sound Omissions", "4. Register in France"],
    faqs: [
      { q: "What method is used for French beginners?", a: "We use the Noorani Qaida method, breaking joining letters down into simple visual symbols for easy progress." },
      { q: "Can we reschedule a class if we are traveling?", a: "Yes, we allow flexible rescheduling when notified in advance." }
    ],
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Europe", url: "/quran-in-the-world/quran-classes-in-europe" },
      { name: "France Hub", url: "/online-quran-classes-france" }
    ],
    author: DrAzhari,
    internalLinks: [
      { text: "Germany Quran Hub", url: "/online-quran-classes-germany", anchorText: "online Quran classes in Germany" },
      { text: "Netherlands Lessons", url: "/online-quran-classes-netherlands", anchorText: "online Quran classes in the Netherlands" },
      { text: "Manchester UK Lessons", url: "/online-quran-classes-manchester", anchorText: "traditional Quran tutoring in Manchester" }
    ]
  },

  "/online-quran-classes-netherlands": {
    title: "Online Quran Classes in the Netherlands - Dutch Quran Classes",
    aiSummaryTitle: "Regional Strategic Brief: Netherlands Quranic Preservation",
    aiSummaryText: "Connecting Dutch communities across Amsterdam, Rotterdam, The Hague, and Utrecht with native, certified Arab tutors. Learn Tajweed online comfortably from your home under flexible timetables.",
    highlights: [
      "Convenient European Hours: Available evenings and weekends with flexible plans.",
      "Professional Female Quran Teachers: Completely comfortable, private 1-on-1 sessions for sisters and children.",
      "Authentic Classical Sound Model: Accurate motor-phonetic drills supervised by Al-Azhar scholars."
    ],
    lastUpdated: "May 24, 2026",
    toc: ["1. Dutch Quran Studies Infrastructure", "2. Correct Pronunciation and Sound Articulation", "3. Interactive Digital Classroom Support", "4. Start Dutch Trial Lesson"],
    faqs: [
      { q: "Is the platform safe and easy for young kids?", a: "Perfectly safe. Our platform is completely private, utilizing highly vetted teachers and parent check-in dashboards." },
      { q: "Do you provide trial certificates?", a: "Yes, we trace each child's progression, awarding completion badges for each level achieved." }
    ],
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Europe", url: "/quran-in-the-world/quran-classes-in-europe" },
      { name: "Netherlands Hub", url: "/online-quran-classes-netherlands" }
    ],
    author: UstadhaFatima,
    internalLinks: [
      { text: "Germany Lessons", url: "/online-quran-classes-germany", anchorText: "online Quran classes in Germany" },
      { text: "France Quran Hub", url: "/online-quran-classes-france", anchorText: "expert Quran lessons in France" },
      { text: "London UK Classes", url: "/online-quran-classes-london", anchorText: "premium Quran classes in London" }
    ]
  }
};

// Default general metadata fallback to handle any other route comfortably
const defaultFallbackSeo: PageSeoMetadata = {
  title: "Online Quran Academy - Master Tajweed with Qualified Teachers",
  aiSummaryTitle: "Academic Research Abstract: TajweedPage Digital Quran Sciences System",
  aiSummaryText: "TajweedPage represents a highly sophisticated digital curriculum designed to uphold traditional Tajweed standards across the English-speaking diaspora. Guided by native Al-Azhar graduates, we preserve correct pronunciation.",
  highlights: [
    "Elite Al-Azhar Instruction: Fully certified scholars with direct, connected chains of narration (Ijazah) directly to the Prophet (pbuh).",
    "Tailored Pediatric Pedagogy: Approaches designed specifically for children, making memorization an engaging, easy process.",
    "24/7 Scheduling Matrix: Flexible times engineered to support modern busy lifestyles without compromising on quality."
  ],
  lastUpdated: "May 24, 2026",
  toc: ["1. Academy Overview", "2. Core Academic Standards", "3. Traditional Pronunciation Rules", "4. Pediatric Visual Learning Designs", "5. Book Your Free Class Session"],
  faqs: [
    { q: "Who leads the academic direction at TajweedPage?", a: "Our educational direction is led by Al-Sheikh Salim Ahmed, holding a PhD in Quranic Linguistics from Madinah University." },
    { q: "How can I book a free evaluation class?", a: "Simply click the 'Start Free Trial' CTA button to lock in your preferred time slot immediately. We require no billing details to test." }
  ],
  breadcrumbs: [
    { name: "Home", url: "/" },
    { name: "Courses Portfolio", url: "/courses" }
  ],
  author: DrAzhari,
  internalLinks: [
    { text: "New York Quran classes", url: "/online-quran-classes-new-york", anchorText: "online Quran classes in New York" },
    { text: "Texas Quran Hub", url: "/online-quran-classes-texas", anchorText: "qualified Quran classes in Texas" },
    { text: "Kids Quran section", url: "/quran-classes-for-kids", anchorText: "interactive Quran classes for kids online" }
  ]
};

export function SeoIntegrationBox() {
  const pathname = usePathname();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [currentPath, setCurrentPath] = useState<string>("/");

  // Safely capture route inside client state to bypass hydration fancies
  useEffect(() => {
    if (pathname) {
      setCurrentPath(pathname);
    }
  }, [pathname]);

  // Retrieve current SEO data
  const data = seoRouteMap[currentPath] || defaultFallbackSeo;

  // Render JSON-LD schemas dynamically inside useEffect
  useEffect(() => {
    // Generate FAQ Schema
    const faqSchemaData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": data.faqs.map(faq => ({
        "@type": "Question",
        "name": faq.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.a
        }
      }))
    };

    // Generate Breadcrumb Schema
    const breadcrumbSchemaData = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": data.breadcrumbs.map((bc, idx) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "name": bc.name,
        "item": `https://tajweedpage.com${bc.url}`
      }))
    };

    // Remove existing schemas to prevent duplicate script tags
    const existingFaqScript = document.getElementById("jsonld-faq-schema");
    if (existingFaqScript) existingFaqScript.remove();

    const existingBcScript = document.getElementById("jsonld-breadcrumb-schema");
    if (existingBcScript) existingBcScript.remove();

    // Inject FAQ Schema
    const faqScript = document.createElement("script");
    faqScript.id = "jsonld-faq-schema";
    faqScript.type = "application/ld+json";
    faqScript.innerHTML = JSON.stringify(faqSchemaData);
    document.head.appendChild(faqScript);

    // Inject Breadcrumb Schema
    const bcScript = document.createElement("script");
    bcScript.id = "jsonld-breadcrumb-schema";
    bcScript.type = "application/ld+json";
    bcScript.innerHTML = JSON.stringify(breadcrumbSchemaData);
    document.head.appendChild(bcScript);

    return () => {
      faqScript.remove();
      bcScript.remove();
    };
  }, [currentPath, data]);

  // Smooth scroll helper for Table of Contents
  const handleTocClick = (index: number) => {
    // Attempt to map index to standard sections or scroll naturally
    const trialSection = document.getElementById("trial-booking") || document.getElementById("free-trial");
    if (trialSection) {
      trialSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-full bg-[#030303] border-t border-white/5 relative z-20">
      
      {/* 8. CINEMATIC OUTCOMES SEAMLESS CTA SECTION */}
      <section className="py-24 bg-gradient-to-b from-[#030303] to-black relative overflow-hidden text-center border-b border-white/5">
        <div className="absolute inset-0 bg-radial-gradient from-[#C8EB5F]/5 to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 space-y-8 relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-[#C8EB5F]/10 border border-[#C8EB5F]/30 px-4 py-1.5 rounded-full mb-3">
            <Sparkles className="h-3.5 w-3.5 text-[#C8EB5F]" />
            <span className="text-[10px] font-mono tracking-[0.25em] text-[#C8EB5F] uppercase font-bold">Limited Time Exclusive</span>
          </div>
          
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-light uppercase tracking-tight leading-[1.1] text-white">
            Transform Your Recitation <br />In <span className="text-[#C8EB5F] italic">30 Days</span>
          </h2>
          
          <p className="text-xs sm:text-sm text-neutral-400 font-sans max-w-xl mx-auto leading-relaxed">
            Begin with a customized 1-on-1 virtual evaluation. We will analyze your Makharij, detail your personal roadmap, and match you with an elite Al-Azhar certified tutor.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a
              href="https://wa.me/923708201211?text=Asalamu%20Alaikum,%20I%20am%20interested%20in%20taking%20Tajweed%20online%20classes%2520with%2520Tajweedpage."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#C8EB5F] text-black hover:bg-white text-xs sm:text-sm font-bold tracking-widest px-8 py-4 font-mono uppercase transition-all duration-300 shadow-[0_4px_25px_rgba(200,235,95,0.25)] flex items-center gap-3"
            >
              Start Free Trial (WhatsApp)
              <ArrowRight size={14} />
            </a>
            
            <a
              href="mailto:abuqitmirshirazalmadani@gmail.com?subject=Tajweedpage%20Quran%20Class%20Enrollment&body=Asalamu%20Alaikum,%20I%20am%20interested%20in%20booking%20a%20free%20trial%20class."
              className="border border-white/15 hover:border-[#C8EB5F] hover:bg-neutral-900 text-white text-xs sm:text-sm font-bold tracking-widest px-8 py-4 font-mono uppercase transition-all duration-300 flex items-center gap-3"
            >
              Inquire via Email
              <Mail size={14} className="text-[#C8EB5F]" />
            </a>
          </div>

          <div className="flex justify-center items-center gap-8 pt-8 text-[10px] text-neutral-500 font-mono tracking-widest uppercase border-t border-white/5 max-w-lg mx-auto">
            <span>✓ No CC Required</span>
            <span>✦ 100% Secure</span>
            <span>✓ Cancel Anytime</span>
          </div>
        </div>
      </section>

      {/* CORE SEO CONTENT GRID CONTAINER */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        
        {/* LEFT COLUMN: Table of Contents & Author Credentials (5 cols) */}
        <div className="lg:col-span-5 space-y-10">
          
          {/* 5. LAST UPDATED SIGNAL & BREADCRUMBS BARS */}
          <div className="flex items-center justify-between text-[11px] font-mono tracking-widest uppercase border-b border-white/5 pb-4">
            <span className="text-neutral-500">LAST REVISED: {data.lastUpdated}</span>
            <span className="text-[#C8EB5F] flex items-center gap-1 font-bold">
              <BookmarkCheck size={12} /> ESTABLISHED QURAN SCIENCES
            </span>
          </div>

          {/* 6. TABLE OF CONTENTS CONTAINER */}
          <div className="bg-zinc-950/40 border border-white/5 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2 text-white border-b border-white/5 pb-3">
              <ListOrdered className="h-4 w-4 text-[#C8EB5F]" />
              <h3 className="text-xs font-mono uppercase tracking-[0.2em] font-black">Strategic Table of Contents</h3>
            </div>
            
            <nav className="space-y-2 mt-2">
              {data.toc.map((heading, i) => (
                <button
                  key={i}
                  onClick={() => handleTocClick(i)}
                  className="w-full text-left text-xs text-neutral-400 hover:text-[#C8EB5F] transition-colors py-1 flex items-center gap-2 group cursor-pointer"
                >
                  <CornerDownRight size={10} className="text-neutral-600 group-hover:text-[#C8EB5F] transition-colors shrink-0" />
                  <span className="truncate">{heading}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* 4. VERIFIED AUTHOR BOX (E-E-A-T trust indices) */}
          <div className="border border-white/5 bg-zinc-950/40 rounded-3xl p-6 md:p-8 space-y-6">
            <div className="flex items-start gap-4">
              <div className="size-16 rounded-2xl border border-white/10 overflow-hidden shrink-0 relative bg-zinc-900">
                <img 
                  src={data.author.avatar} 
                  alt={data.author.name} 
                  className="w-full h-full object-cover grayscale"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-[#C8EB5F] uppercase tracking-widest font-bold">VERIFIED ACADEMIC REVIEWER</span>
                <h4 className="text-md font-serif font-light text-white uppercase tracking-tight">{data.author.name}</h4>
                <p className="text-[11px] font-mono text-neutral-400 leading-normal">{data.author.title}</p>
              </div>
            </div>

            <div className="space-y-4 pt-2 border-t border-white/5 text-xs text-neutral-400 leading-relaxed font-sans">
              <p>{data.author.bio}</p>
              
              <div className="p-3.5 bg-black rounded-2xl border border-white/5 space-y-1">
                <span className="text-[9px] font-mono text-[#C8EB5F] font-black uppercase tracking-widest flex items-center gap-1">
                  <Award size={12} /> SANAD & IJAZAH PROFILE
                </span>
                <p className="text-[11px] text-neutral-300 font-sans italic leading-relaxed">
                  "{data.author.ijazahChain}"
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: AI Summary Box & Rich Dynamic FAQs (7 cols) */}
        <div className="lg:col-span-7 space-y-10">
          
          {/* 1. AI SUMMARY BOX */}
          <div className="border border-[#C8EB5F]/20 bg-[#C8EB5F]/5 rounded-3xl p-6 md:p-8 space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-3">
              <ShieldCheck className="text-[#C8EB5F]/30 h-10 w-10" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-mono text-[#C8EB5F] uppercase tracking-[0.2em] font-black block">
                ✦ AI-Powered Search Summary
              </span>
              <h3 className="text-xl font-serif text-white uppercase tracking-tight">
                {data.aiSummaryTitle}
              </h3>
            </div>

            <p className="text-xs text-neutral-300 leading-relaxed font-sans font-light">
              {data.aiSummaryText}
            </p>

            <div className="space-y-2.5 border-t border-[#C8EB5F]/15 pt-4">
              <h4 className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest font-bold">
                Core Highlights & Key Terms:
              </h4>
              {data.highlights.map((hlt, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-neutral-300">
                  <CheckCircle2 size={13} className="text-[#C8EB5F] shrink-0 mt-0.5" />
                  <span className="font-light">{hlt}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 2. DYNAMIC FAQ ACCORDION SECTION */}
          <div className="space-y-4">
            <div className="flex items-center gap-1.5 mb-2">
              <HelpCircle size={14} className="text-[#C8EB5F]" />
              <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-400 font-black">
                Structured Topic Frequently Asked Questions
              </h3>
            </div>

            <div className="space-y-3">
              {data.faqs.map((faq, idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <div 
                    key={idx} 
                    className="border border-white/5 rounded-2xl bg-zinc-950/40 overflow-hidden"
                  >
                    <button
                      onClick={() => setActiveFaq(isOpen ? null : idx)}
                      className="w-full text-left p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-zinc-950 transition-colors"
                    >
                      <h4 className="text-sm font-serif font-light text-white uppercase tracking-tight">
                        {faq.q}
                      </h4>
                      <ChevronDown 
                        size={14} 
                        className={cn("text-[#C8EB5F] transition-transform duration-300", isOpen ? "rotate-180" : "")} 
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                        >
                          <div className="px-5 pb-5 pt-1 text-xs text-neutral-400 font-sans leading-relaxed border-t border-white/5 bg-black/20">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>


          {/* GOOGLE WEBMASTER & ANALYTICS CONNECTION BOARD */}
          <div className="border border-emerald-500/20 bg-emerald-950/5 rounded-3xl p-6 md:p-8 space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-3">
              <ShieldCheck className="text-emerald-500/20 h-10 w-10" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-[0.2em] font-black block">
                ✦ Live Google Webmaster & Analytics Console
              </span>
              <h3 className="text-xl font-serif text-white uppercase tracking-tight">
                Search Engine Connection Status
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-black/40 border border-emerald-500/10 rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-serif text-neutral-300 font-bold">Google Analytics (v4)</span>
                  <span className="text-[9px] font-mono bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full font-bold">CONNECTED</span>
                </div>
                <p className="text-[10px] font-mono text-neutral-500">Tag ID: G-755QBQW73T</p>
                <p className="text-[11px] text-neutral-400 font-sans leading-tight">
                  Status active across all pages. Google tag script is running dynamically via Next.js Layout.
                </p>
              </div>

              <div className="p-4 bg-black/40 border border-amber-500/10 rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-serif text-neutral-300 font-bold">Google Search Console</span>
                  <span className="text-[9px] font-mono bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded-full font-bold">READY TO VERIFY</span>
                </div>
                <p className="text-[10px] font-mono text-neutral-500">Method: HTML Tag & Analytics Link</p>
                <p className="text-[11px] text-neutral-400 font-sans leading-tight">
                  Verification tag active in root metadata. You can verify instantly on Search Console.
                </p>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-white/5">
              <h4 className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest font-boldLabel">
                Connection Instructions (2 Minutes Setup):
              </h4>
              
              <div className="space-y-2 text-xs text-neutral-300 font-sans font-light">
                <div className="flex items-start gap-2.5">
                  <span className="font-mono text-[#C8EB5F] font-bold shrink-0">1.</span>
                  <p className="text-[11px] leading-relaxed">
                    Go to the <strong><a href="https://search.google.com/search-console" target="_blank" rel="noopener noreferrer" className="text-[#C8EB5F] hover:underline">Google Search Console</a></strong> dashboard and click <strong>Add Property</strong> for your custom live domain URL.
                  </p>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="font-mono text-[#C8EB5F] font-bold shrink-0">2.</span>
                  <p className="text-[11px] leading-relaxed">
                    Select the <strong>HTML Tag</strong> verification method, or click <strong>Google Analytics</strong> method which will authorize automatically because your active Analytics Tag is synchronized with the website.
                  </p>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="font-mono text-[#C8EB5F] font-bold shrink-0">3.</span>
                  <p className="text-[11px] leading-relaxed">
                    If you prefer the HTML Tag method, copy your verification token and define it as the <code>NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION</code> variable in the Settings panel. The site will instantly start rendering your token!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 7. HIGHLY REQUISITE INTERNAL LINKS MAP */}
          <div className="border border-white/5 rounded-2xl p-6 bg-zinc-950/40 space-y-4">
            <div className="flex items-center gap-2 border-b border-white/5 pb-3">
              <BookOpen className="h-4 w-4 text-[#C8EB5F]" />
              <h3 className="text-xs font-mono uppercase tracking-[0.2em] font-black text-white">
                Global Academic Internal Network
              </h3>
            </div>
            
            <p className="text-[11px] text-neutral-400 font-sans leading-relaxed">
              Accelerate your digital crawling and academic cross-routing by connecting instantly to our dedicated geographical and course-specific centers:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-2">
              {data.internalLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  className="p-3 bg-black rounded-xl border border-white/5 text-[11px] font-mono text-neutral-300 hover:text-[#C8EB5F] hover:border-[#C8EB5F]/20 transition-all text-left flex flex-col justify-between"
                >
                  <span className="text-[9px] text-[#C8EB5F] font-bold uppercase tracking-wider block mb-1">
                    {link.text}
                  </span>
                  <span className="text-[10px] text-neutral-400 font-bold hover:underline leading-tight">
                    Study {link.anchorText}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
