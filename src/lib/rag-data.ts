export interface RagDocument {
  id: string;
  title: string;
  category: "course" | "lesson" | "qaida" | "faq" | "blog";
  url: string;
  difficulty: "beginner" | "intermediate" | "advanced" | "all";
  content: string;
}

export const RAG_KNOWLEDGE_BASE: RagDocument[] = [
  {
    id: "course-tajweed-mastery",
    title: "Tajweed Course Master Series",
    category: "course",
    url: "/courses/tajweed-course",
    difficulty: "all",
    content: `
The Tajweed Course Master Series is our flagship premium program designed for adults (brothers & sisters) and adolescents who want to achieve professional-level Quranic recitation.
- Pricing: Tuition membership plans start from $45/month (standard package) up to premium plans. Custom learning packages are also available. Includes lifetime access to course video modules and community groups.
- Who it is for: Absolute beginners to advanced reciters.
- Key outcomes: Perfecting pronunciation of letters, executing rules of Nun Sakinah / Mim Sakinah, applying Madd & pausing rules, and reciting with appropriate rhythm.
- Tutors: One-on-one live video classes with native Arabic Ijazah-certified tutors.
- Learning Model: Step-by-step guidance starting from letter articulation (Makharij) and ending with fluent Juz Amma recitation.
    `.trim()
  },
  {
    id: "course-female-teacher",
    title: "Female Quran Teacher Online",
    category: "course",
    url: "/courses/female-quran-teacher-online",
    difficulty: "all",
    content: `
We offer specialized female Quran teachers online for sisters, ladies, and young kids.
- Environment: 100% private, comfortable and secure video-based one-on-one classes.
- Teachers: Native Arab female tutors from Egypt, Jordan, and Al-Azhar University who are fluent in English and certified with Ijazah.
- Subjects: Noorani Qaida, Tajweed rules, Quran memorization (Hifz), and daily Islamic supplications (Duas).
- Timings: Highly flexible 24/7 scheduler that caters to time zones in the UK, USA, France, Germany, and Netherlands.
    `.trim()
  },
  {
    id: "course-noorani-qaida",
    title: "Online Noorani Qaida Classes",
    category: "course",
    url: "/courses/online-noorani-qaida-classes",
    difficulty: "beginner",
    content: `
The foundational system for reading Arabic and Quran script accurately, specially curated for kids and adult beginners.
- Curriculum: Pronunciation of individual Arabic alphabet characters, unrecognized sounds, joining letters, recognizing vowel markers (Fathah, Kasrah, Dammah), Tanween, Sukoon, Shaddah, and Madd rules.
- Duration: Typically completed in 3 to 6 months depending on student frequency and pace.
- Method: Direct imitation and interactive practice board where the teacher marks and corrects mistakes live.
    `.trim()
  },
  {
    id: "course-hifz-classes",
    title: "Online Hifz Classes (Quran Memorization)",
    category: "course",
    url: "/courses/online-hifz-classes",
    difficulty: "intermediate",
    content: `
A structured program for memorizing the Holy Quran under professional tutelage.
- System: Includes New Memorization (Sabaq), Recent Revision (Sabqi), and General Revision (Manzil/Daur).
- Plans: Customized pace based on age and free time. Students can choose to memorize selected Surahs (e.g., Juz Amma, Surah Al-Kahf, Surah Mulk) or become a full Hafiz.
- Standards: Students must have passed basic Tajweed prerequisites. Tutors evaluate Makharij and rhythm strictly before approving memorized portions.
    `.trim()
  },
  {
    id: "course-reading-classes",
    title: "Quran Reading Classes Online",
    category: "course",
    url: "/courses/quran-reading-classes-online",
    difficulty: "beginner",
    content: `
This course bridge the gap between learning Qaida rules and reciting fluently from the Mushaf.
- Target: Students who know spelling and letter recognition but find themselves slow, halting, or struggling to maintain continuous breath and speed.
- Strategy: Intensive reading of Quranic passages, correct breathing pauses (Waqf) and starts (Ibtida), and applying Tajweed rules organically during direct flow.
    `.trim()
  },
  {
    id: "rule-noon-sakinah",
    title: "Nun Sakinah and Tanween Rules",
    category: "lesson",
    url: "/courses/tajweed-course#noon-sakinah",
    difficulty: "intermediate",
    content: `
Nun Sakinah is a Nun with a Sukoon sign. Tanween is a double vowel sign (Fathatain, Kasratain, Dammatain) that acts phonetically like a Nun Sakinah.
There are FOUR major rules of Nun Sakinah and Tanween:
1. IZHAR (Clear, Pronounced): If a Nun Sakinah or Tanween is followed by any of the 6 Throat letters (Hamzah, Haa, 'Ayn, Haa, Ghayn, Khaa), the sound of Nun must be pronounced completely clearly without extra nasalization (Ghunnah). Examples: "min khawf", "an'amta".
2. IDGHAM (Assimilation, Merging): Merging the Nun Sakinah or Tanween into the next letter. The letters are grouped in the word "Yarmaloon" (Yaa, Raa, Meem, Laam, Waw, Nun).
   - Idgham with Ghunnah (Yaa, Nun, Meem, Waw - "Yanmoo"): Merging with logical nasalization of 2 beats.
   - Idgham without Ghunnah (Laam, Raa): Complete assimilation without nasalization. Examples: "mir-Rabbihim", "mil-ladunhu".
3. IQLAB (Conversion): Changing the Nun Sakinah or Tanween into a Mim sound when followed by the letter Baa (ب), accompanied by Ghunnah of 2 beats. Example: "mim-ba'di" (pronounced min ba'di as mim ba'di).
4. IKHFA (Hiding, Concealment): Concealing the Nun Sakinah or Tanween sound when followed by any of the remaining 15 letters. The mouth is prepared for the shape of the coming letter, and the sound is nasalized for 2 beats.
    `.trim()
  },
  {
    id: "rule-meem-sakinah",
    title: "Mim Sakinah Rules",
    category: "lesson",
    url: "/courses/tajweed-course#meem-sakinah",
    difficulty: "intermediate",
    content: `
Mim Sakinah is a Mim letter that has no vowel (is marked with a Sukoon). It has THREE key rules of pronunciation:
1. IKHFA SHAFAWI (Oral Hiding): Hiding the Mim Sakinah with Ghunnah when followed immediately by the letter Baa (ب). The lips form a light connection. Example: "tarmeehim bi-hijarah".
2. IDGHAM SHAFAWI / IDGHAM MITHLAYN (Oral Integration): Merging the Mim Sakinah of one word into a voweled Mim that starts the next word, resulting in a Shaddah and a Ghunnah of 2 beats. Example: "lahum-ma".
3. IZHAR SHAFAWI (Oral Clearness): Pronouncing the Mim Sakinah clearly with no extra nasalization when followed by any of the remaining 26 letters. Special attention is paid when followed by Waw (و) or Faa (ف) to avoid accidental merging. Example: "Alayhim ghayril maghdoobi".
    `.trim()
  },
  {
    id: "rule-qalqalah",
    title: "Qalqalah (Echo / Vibrating Sound) Rules",
    category: "lesson",
    url: "/courses/tajweed-course#qalqalah",
    difficulty: "beginner",
    content: `
Qalqalah is defined as creating an echoing, bouncing, or vibrating sound at the point of articulation of a letter when it is pronounced with a Sukoon (either natural or due to a pause at the end of a verse).
- Qalqalah Letters: Grouped in the phrase "Qutb Jaddin" (ق, ط, ب, ج, د) - Qaaf, Taa, Baa, Jeem, Daal.
- Degrees of Qalqalah:
  1. Qalqalah Kubra (Strongest): Occurs at the end of a verse/word on a letter that has a Shaddah (e.g., Al-Haqq, Watabb).
  2. Qalqalah Wusta (Medium): Occurs at the end of a verse/word on a letter with a normal Sukoon (e.g., Khalaq, Fee Kabad).
  3. Qalqalah Sughra (Smallest): Occurs in the middle of a word on a letter with a Sukoon (e.g., Yagta'oon, Habl).
    `.trim()
  },
  {
    id: "rule-makharij",
    title: "Makharij - Point of Articulations of letters",
    category: "lesson",
    url: "/courses/online-noorani-qaida-classes#makharij",
    difficulty: "advanced",
    content: `
Makharij al-Huroof describes the exact physical place in the mouth, throat, or head where a letter’s sound is produced. There are 17 specific articulation points distributed over 5 main areas:
1. AL-JAUF (The Oral Cavity / Empty space): The origin source for long vowels (Alif, Waw, Yaa maddiyyah).
2. AL-HALQ (The Throat): Divided into three levels:
   - Lowest throat (Aqsa al-Halq - deepest): Hamzah (ء), Haa (ه)
   - Mid throat (Wast al-Halq): 'Ayn (ع), Haa (ح)
   - Top throat (Adna al-Halq - closest to mouth): Ghayn (غ), Khaa (خ)
3. AL-LISAN (The Tongue): Points of articulation for 18 letters, including heavy letters like Qaaf (ق) at the deepest tongue, and Kaaf (ك) slightly closer. Front, side edges, and tip of tongue form specific letters like Laam, Nun, Raa, and tooth-touching letters.
4. ASH-SHAFATAIN (The Lips): letters produced here are Waw (و), Baa (ب), Meem (m), and Faa (ف) which touches the top front teeth's edge.
5. AL-KHAISHOUM (The Nasal Cavity): The source of Ghunnah (nasal vibrations) for Nun and Mim.
    `.trim()
  },
  {
    id: "rules-of-madd",
    title: "Rules of Madd (Elongation)",
    category: "lesson",
    url: "/courses/tajweed-course#madd",
    difficulty: "all",
    content: `
Madd means the lengthening or elongation of the voice when reciting a Madd letter (Alif with Fathah before it, Waw with Dammah before it, Yaa with Kasrah before it).
The basic types are divided into:
1. MADD ASLI / TABEE'EE (Natural Elongation): Occurs naturally without any external reason (no Hamzah or Sukoon after the Madd letter). Must be elongated exactly for 2 counts/beats. Example: "Qaala".
2. MADD FAR'EE (Derived Elongation): Lengthening caused by a Hamzah or a Sukoon following the Madd letter.
   - Madd Wajib Muttasil (Compulsory connected): Madd letter and Hamzah are in the SAME word. Elongated for 4 to 5 counts. Example: "Ja'aa".
   - Madd Ja'iz Munfasil (Permissible disconnected): Madd letter is at the end of one word, and the Hamzah is at the start of the next word. Elongated for 2, 4, or 5 counts. Example: "Innaa a'taynaa".
   - Madd Kaalimah Lazim (Compulsory permanent): Madd letter followed by a Shaddah or a permanent Sukoon in the same word. Elongated for 6 counts. Example: "Al-Dhaalleen".
   - Madd Arid Lis-Sukoon (Temporary prolongation due to stop): Madd letter followed by a letter that becomes silent due to ending the verse. Elongated for 2, 4, or 6 counts. Example: "Al-Alameen".
    `.trim()
  },
  {
    id: "faq-female-staff",
    title: "Are there qualified female Quran teachers available?",
    category: "faq",
    url: "/pricing",
    difficulty: "all",
    content: `
Yes, absolutely! TajweedPage has a dedicated panel of certified native Arab female tutors from prestigious institutions like Al-Azhar University. Sisters can request female tutors for themselves or their kids to have comfortable, private, one-on-one video lessons online.
    `.trim()
  },
  {
    id: "faq-free-trial",
    title: "How does the Free Trial Class work?",
    category: "faq",
    url: "/free-trial",
    difficulty: "all",
    content: `
TajweedPage offers a completely free, no-obligation trial lesson (30 minutes) with a live Quran teacher.
- No Credit Card: You do not need to enter credit cards or banking details to start.
- Process: Simply book online, fill out your name, preferred timezone, and experience level, and our coordinators will sync up with you on WhatsApp or Email with classroom links.
    `.trim()
  },
  {
    id: "faq-timings",
    title: "What are the timings for online Quran classes?",
    category: "faq",
    url: "/pricing",
    difficulty: "all",
    content: `
Timings are highly flexible and available 24 hours a day, 7 days a week. We serve students around the globe, meaning we align our schedules completely to your timezone, whether you are in London, Manchester, California, Texas, Chicago, New York, France, Germany, or the Netherlands. If you need to skip or reschedule a class, simply notify your tutor 4 to 6 hours in advance.
    `.trim()
  }
];

export function searchKnowledge(query: string, limit = 4): RagDocument[] {
  const normalizedQuery = query.toLowerCase().trim();
  if (!normalizedQuery) return RAG_KNOWLEDGE_BASE.slice(0, limit);

  // Quick word matching scoring system for RAG ranking
  const keywords = normalizedQuery.split(/\s+/).filter(word => word.length > 2);
  
  const scored = RAG_KNOWLEDGE_BASE.map(doc => {
    let score = 0;
    
    // Exact match in title
    if (doc.title.toLowerCase().includes(normalizedQuery)) score += 50;
    
    // Exact match in content
    if (doc.content.toLowerCase().includes(normalizedQuery)) score += 20;

    // Word counts
    keywords.forEach(kw => {
      if (doc.title.toLowerCase().includes(kw)) score += 10;
      if (doc.content.toLowerCase().includes(kw)) score += 3;
    });

    return { doc, score };
  });

  // Filter and sort by score
  return scored
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(item => item.doc)
    .slice(0, limit);
}
