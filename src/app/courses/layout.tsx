import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Online Quran & Tajweed Courses | Elite Quran Learning Curriculum",
  description: "Explore our rich curriculum of Tajweed and Quran courses. From beginner levels to advanced memorization (Hifz) and Ijazah preparation under certified Arab mentors.",
  alternates: {
    canonical: "/courses",
  },
};

export default function CoursesRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
