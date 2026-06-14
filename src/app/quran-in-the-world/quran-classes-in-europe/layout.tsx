import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Online Quran Classes in Europe | Accredited Tajweed Tutors",
  description: "Premium online Quran classes serving families across Europe (Belgium, Switzerland, Italy, Spain, etc.). English, Dutch, French, and German speaking mentors.",
  alternates: {
    canonical: "/quran-in-the-world/quran-classes-in-europe",
  },
};

export default function EuropeClassesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
