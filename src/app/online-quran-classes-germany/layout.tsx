import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Online Koran Unterricht in Deutschland | Zertifizierte Tajweed Lehrer",
  description: "Professioneller Online-Koranunterricht für Kinder & Erwachsene in Deutschland. Lernen Sie Tajwid und Koranlesen mit qualifizierten muttersprachlichen Lehrern von Tajweedpage.",
  alternates: {
    canonical: "/online-quran-classes-germany",
  },
};

export default function GermanyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
