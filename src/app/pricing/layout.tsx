import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tajweedpage Pricing | Affordable Online Tajweed & Quran Class Plans",
  description: "Check our flexible and affordable monthly session plans. 1-on-1 private Tajweed classes under authorized Arab sheikhs. Select standard, premium or customized plans.",
  alternates: {
    canonical: "/pricing",
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
