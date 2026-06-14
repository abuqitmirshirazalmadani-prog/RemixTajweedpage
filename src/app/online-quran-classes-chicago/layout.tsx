import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Online Quran Classes in Chicago | Certified Tajweed Teachers",
  description: "Premium online Quran academy serving the Chicago metropolitan area. Flexible scheduling, 1-on-1 mentorship, and certified scholars passed down from Al-Azhar.",
  alternates: {
    canonical: "/online-quran-classes-chicago",
  },
};

export default function ChicagoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
