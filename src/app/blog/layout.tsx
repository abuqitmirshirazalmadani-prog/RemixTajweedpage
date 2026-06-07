import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quran & Tajweed Learning Articles | TajweedPage Blog",
  description: "Read expert articles, tajweed guidelines, pronunciation breakdowns, and learning tips from our expert Arab Sheikhs and Arabic scholars.",
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
