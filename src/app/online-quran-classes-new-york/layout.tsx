import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Online Quran Classes in New York | Private 1-on-1 Tajweed Coaching",
  description: "Elite online Quran learning for NY, NYC & Upstate residents. Flexible schedules, Al-Azhar certified mentors, and personalized learning pace from Tajweedpage.",
  alternates: {
    canonical: "/online-quran-classes-new-york",
  },
};

export default function NewYorkLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
