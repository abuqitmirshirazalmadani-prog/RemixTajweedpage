import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About TajweedPage | Authorized Arabic Teachers & Tajweed Mastery Academy",
  description: "Our academy brings the highest-quality authentic recitation training to students globally. Discover our core mission, credentials, and certified pedagogical methodology.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
