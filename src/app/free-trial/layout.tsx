import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Your Complimentary 1-on-1 Personalized Quran Class | TajweedPage",
  description: "Schedule your free diagnostic private session with Egypt & Jordan Ijazah certified sheikhs. Receive custom articulation diagnostics & a custom study plan.",
  alternates: {
    canonical: "/free-trial",
  },
};

export default function FreeTrialLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
