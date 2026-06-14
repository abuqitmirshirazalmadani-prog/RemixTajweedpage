import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, Cinzel_Decorative, Marcellus, Lora } from "next/font/google";
import { GlobalFooter } from "@/components/ui/global-footer";
import { FloatingAssistant } from "@/components/ui/floating-assistant";
import Script from "next/script";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const cinzel = Cinzel_Decorative({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-cinzel",
  display: "swap",
});

const marcellus = Marcellus({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-marcellus",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-lora",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.tajweedpage.com"),
  title: "Tajweedpage - Master Quran Recitation with Real-Time Feedback",
  description: "Join our 30-Day Tajweed Mastery System designed for beginners and adults who want to recite the Quran correctly and confidently.",
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "G-755QBQW73T",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Tajweedpage - Master Quran Recitation with Real-Time Feedback",
    description: "Join our 30-Day Tajweed Mastery System designed for beginners and adults who want to recite the Quran correctly and confidently.",
    url: "https://www.tajweedpage.com",
    siteName: "Tajweedpage",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/logo.jpg",
        width: 800,
        height: 600,
        alt: "Tajweedpage Premium Quran Learning",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tajweedpage - Master Quran Recitation with Real-Time Feedback",
    description: "Join our 30-Day Tajweed Mastery System designed for beginners and adults who want to recite the Quran correctly and confidently.",
    images: ["/logo.jpg"],
  }
};

const jsonLdSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "EducationalOrganization",
      "@id": "https://www.tajweedpage.com/#organization",
      "name": "Tajweedpage",
      "url": "https://www.tajweedpage.com",
      "logo": "https://www.tajweedpage.com/logo.svg",
      "description": "Master Quran Recitation with Real-Time AI Feedback & Live Certified Tutors passed down through authentic Ijazah lineages.",
      "sameAs": [
        "https://www.facebook.com/tajweedpage",
        "https://www.instagram.com/tajweedpage",
        "https://www.youtube.com/@tajweedpage"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+92 323 3260859",
        "contactType": "customer service",
        "email": "hello@abuqitmirlabs.tech",
        "availableLanguage": ["English", "Arabic", "Urdu"]
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://www.tajweedpage.com/#website",
      "url": "https://www.tajweedpage.com",
      "name": "Tajweedpage",
      "description": "Master Quran Recitation with Real-Time AI Feedback & Live Certified Tutors",
      "publisher": {
        "@id": "https://www.tajweedpage.com/#organization"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://www.tajweedpage.com/courses?search={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5PLLV655');`}
        </Script>
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-755QBQW73T"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-755QBQW73T');
          `}
        </Script>
      </head>
      <body className={`${inter.variable} ${cormorant.variable} ${cinzel.variable} ${marcellus.variable} ${lora.variable} bg-black text-white antialiased flex flex-col min-h-screen`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5PLLV655"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        {children}
        <GlobalFooter />
        <FloatingAssistant />
      </body>
    </html>
  );
}
