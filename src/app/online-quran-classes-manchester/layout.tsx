import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Online Quran Classes in Manchester | Professional Tajweed Tutors",
  description: "Premium online Quran learning programs tailored for Manchester, UK. Flexible timings, dedicated female guides, and certified Al-Azhar instructors from Tajweedpage.",
  alternates: {
    canonical: "/online-quran-classes-manchester",
  },
};

export default function ManchesterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
