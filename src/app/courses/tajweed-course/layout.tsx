import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Online Tajweed Course | Articulate & Perfect Quran Recitation",
  description: "Join our signature Tajweed mastery course. Master Makharij (origin of letters), Sifat, rules of Nun Sakinah, and receive high-level elite tutoring from certified native scholars.",
  alternates: {
    canonical: "/courses/tajweed-course",
  },
};

export default function TajweedCourseLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
