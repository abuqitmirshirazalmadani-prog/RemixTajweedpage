import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Online Quran Classes in Birmingham | Private Tajweed Tutors",
  description: "Top-rated online Quran and Tajweed classes in Birmingham, UK. Private 1-on-1 sessions for kids and adults under certified native Arab mentors.",
  alternates: {
    canonical: "/online-quran-classes-birmingham",
  },
};

export default function BirminghamLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
