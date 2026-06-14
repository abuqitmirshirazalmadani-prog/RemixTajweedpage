import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Online Islamic Studies Classes for Kids | Faith, Duas & Tafsir",
  description: "Engaging and structured Islamic studies programs for children. Learn Islamic history, daily manners, Aqeedah, and basic Fiqh from friendly online mentors.",
  alternates: {
    canonical: "/courses/islamic-studies-classes-for-kids",
  },
};

export default function IslamicStudiesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
