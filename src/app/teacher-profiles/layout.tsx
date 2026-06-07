import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meet Our Sanad & Ijazah Certified Arab Teachers | TajweedPage Tutors",
  description: "Learn from native Sheikhs & Ustadhas verified from Al-Azhar, Madinah, and leading Islamic institutions possessing authentic paths of recitation chains.",
  alternates: {
    canonical: "/teacher-profiles",
  },
};

export default function TeacherProfilesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
