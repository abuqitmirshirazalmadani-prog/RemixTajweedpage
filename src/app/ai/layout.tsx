import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Tajweed Teacher & Online Voice Recitation Analyzer | TajweedPage",
  description: "Get real-time feedback on your Quran recitation. Experience automatic Tajweed error detection (Makharij, Madd, Ghunnah), customized learning roadmap paths, and instant human scholar evaluations.",
  alternates: {
    canonical: "/ai",
  },
  keywords: [
    "AI Tajweed Teacher",
    "Quran Recitation Analyzer",
    "Makharij pronunciation detector",
    "Online Tajweed checker",
    "Smart Tajweed tutor",
    "Tajweed speech algorithm",
    "AI Quran voice coach",
    "Free Quran recitation correction"
  ],
  openGraph: {
    title: "AI Tajweed Teacher & Online Voice Recitation Analyzer | TajweedPage",
    description: "Experience immediate AI pronunciation assessment & classic Tajweed rule checker. Start with a free diagnostic lesson today.",
    url: "https://tajweedpage.com/ai",
    siteName: "TajweedPage",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Tajweed Teacher & Online Voice Recitation Analyzer",
    description: "Perfect your Makharij and breathing pauses instantly using AI speech diagnostics at TajweedPage.",
  },
};

export default function AiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "TajweedPage AI Recitation & Voice Analyzer",
    "operatingSystem": "All modern web browsers",
    "applicationCategory": "EducationalApplication",
    "description": "An interactive, real-time AI-powered speech analysis tool that evaluates Quranic recitation makharij, fluency cadence, and tajweed rules (Ghunnah, Madd) with professional diagnostic reports.",
    "offers": {
      "@type": "Offer",
      "price": "0.00",
      "priceCurrency": "USD"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How does TajweedPage AI Recitation Analyzer work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The TajweedPage AI speech analysis tool uses state-of-the-art neural audio representation models to analyze recorded audio input from verses of Surah Al-Fatihah, Al-Ikhlas, or An-Nas, comparing phonetic benchmarks for Makharij, pronunciation accuracy, flow cadence, and rules like Madd or Ghunnah."
        }
      },
      {
        "@type": "Question",
        "name": "Can an AI tool completely replace a live human scholar for Tajweed?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our AI teacher provides immediate diagnostic help, but cannot replace a qualified, certified human tutor. We supply parents and adult students with custom reports, but highly urge everyone to book a complimentary 1-on-1 live evaluation with our certified teachers from Egypt and Jordan on our free trial page."
        }
      },
      {
        "@type": "Question",
        "name": "Is the AI Voice Recitation software free to use?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! The interactive features of TajweedPage AI, including the Tajweed Teacher chat, custom study roadmap planner, homework checker, and the live vocal analyzer, are fully accessible online with zero obligational fees."
        }
      }
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://tajweedpage.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "AI Learning Center & Recitation Analyzer",
        "item": "https://tajweedpage.com/ai"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  );
}
