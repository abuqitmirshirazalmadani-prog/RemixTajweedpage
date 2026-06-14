import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Beginner Quran Classes Online | Step-by-Step Quran Reading",
  description: "Start your Quran learning journey from scratch. Master Arabic letters, phonetics, and basic recitation with patient, qualified 1-on-1 online tutors.",
  alternates: {
    canonical: "/courses/beginner-quran-classes-online",
  },
};

export default function BeginnerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
