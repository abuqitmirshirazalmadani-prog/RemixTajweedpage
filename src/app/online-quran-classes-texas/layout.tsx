import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Online Quran Classes in Texas | Flexible Live Tutors",
  description: "Discover professional online Quran and Tajweed classes in Texas (Houston, Dallas, Austin). Private 1-on-1 lessons designed for adults and children by Tajweedpage.",
  alternates: {
    canonical: "/online-quran-classes-texas",
  },
};

export default function TexasLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
