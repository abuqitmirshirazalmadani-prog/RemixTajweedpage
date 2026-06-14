import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Global Quran & Tajweed Academy | Worldwide Verified Studies",
  description: "Accessible and elite online Quranic recitation programs offered internationally. Connecting students globally with certified Al-Azhar and Medina teachers.",
  alternates: {
    canonical: "/quran-in-the-world",
  },
};

export default function QuranInTheWorldLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
