import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inquire & Support | Contact TajweedPage Student Success Specialists",
  description: "Reach our expert coordinators for assistance with enrollment, dashboard setups, timing modifications, or dedicated custom AI & RAG system inquiries.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
