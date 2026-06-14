import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Online Quran Classes in California | Flexible Recitation Tutoring",
  description: "Expert online Quran lessons for residents across California (Los Angeles, SF, San Diego). Structured Tajweed courses with flexible timezones for busy professionals.",
  alternates: {
    canonical: "/online-quran-classes-california",
  },
};

export default function CaliforniaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
