import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Online Quran Classes for Kids | Fun, Structured & Gamified Learning",
  description: "The premier online Quran academy for children. Fun interactive lessons, Al-Azhar certified teachers, weekly progress tracking, and Noorani Qaida course paths.",
  alternates: {
    canonical: "/quran-classes-for-kids",
  },
};

export default function KidsClassesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
