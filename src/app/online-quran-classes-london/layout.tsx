import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Online Quran Classes in London | Live 1-on-1 Tajweed Academy",
  description: "Elite online Quran classes in London, UK. Private 1-on-1 Tajweed and Quran memorization (Hifz) courses for children and adults under native Arab mentors from Tajweedpage.",
  alternates: {
    canonical: "/online-quran-classes-london",
  },
};

export default function LondonLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
