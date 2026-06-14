import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Online Hifz Classes | Master Quran Memorization from Home",
  description: "A structured, personalized approach to memorizing the Holy Quran. Guided by elite certified tutors (Hafiz/Hafiza) with authentic Ijazah lineages.",
  alternates: {
    canonical: "/courses/online-hifz-classes",
  },
};

export default function HifzLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
