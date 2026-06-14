import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Online Quran Classes in USA | Elite Private Tajweed Academy",
  description: "Top-ranking online Quran school across North America. Native Arab scholars, flexible multi-timezone schedules, and comprehensive child/adult syllabi.",
  alternates: {
    canonical: "/quran-classes-in-usa",
  },
};

export default function UsaClassesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
