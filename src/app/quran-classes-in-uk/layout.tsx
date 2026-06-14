import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Online Quran Classes in UK | Trusted Tajweed Learning Network",
  description: "Join the UK's leading online Quran and Tajweed platform. Interactive classes with qualified, native Arab teachers tailored for British families.",
  alternates: {
    canonical: "/quran-classes-in-uk",
  },
};

export default function UkClassesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
