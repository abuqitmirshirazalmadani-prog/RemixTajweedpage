import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Online Female Quran Teachers | Private 1-on-1 Classes for Women & Kids",
  description: "Learn from certified female Quran scholars. Safe, private, and highly interactive online recitation and Tajweed classes in a supportive environment.",
  alternates: {
    canonical: "/courses/female-quran-teacher-online",
  },
};

export default function FemaleTeacherLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
