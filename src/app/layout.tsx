import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, Cinzel_Decorative, Marcellus, Lora } from "next/font/google";
import { GlobalFooter } from "@/components/ui/global-footer";
import { SeoIntegrationBox } from "@/components/ui/seo-integration-box";
import Script from "next/script";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
});

const cinzel = Cinzel_Decorative({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-cinzel",
});

const marcellus = Marcellus({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-marcellus",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-lora",
});

export const metadata: Metadata = {
  title: "Tajweedpage - Master Quran Recitation with Real-Time Feedback",
  description: "Join our 30-Day Tajweed Mastery System designed for beginners and adults who want to recite the Quran correctly and confidently.",
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "G-755QBQW73T",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
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
        {children}
        <SeoIntegrationBox />
        <GlobalFooter />
      </body>
    </html>
  );
}
