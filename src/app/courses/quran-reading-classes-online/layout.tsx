import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quran Reading Classes Online | Achieve Fluent Recitation & Accuracy",
  description: "Transition from spelling to smooth, flowing recitation. Improve your rhythm, speed, and standard pronunciation under certified native Arab tutors.",
  alternates: {
    canonical: "/courses/quran-reading-classes-online",
  },
};

export default function QuranReadingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
