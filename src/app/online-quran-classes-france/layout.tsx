import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cours de Coran en Ligne en France | Professeurs de Tajweed Certifiés",
  description: "Apprenez le Coran en ligne en France avec des tuteurs arabes qualifiés. Cours individuels de Tajweed de l'Académie Tajweedpage, adaptés aux enfants et adultes de tous les niveaux.",
  alternates: {
    canonical: "/online-quran-classes-france",
  },
};

export default function FranceLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
