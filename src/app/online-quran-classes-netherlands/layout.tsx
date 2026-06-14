import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Online Koranlessen in Nederland | Live 1-of-1 Tajweed Docenten",
  description: "Kwalitatieve online koranlessen in Nederland voor kinderen en volwassenen. Leer vlot de koran reciteren met gecertificeerde Arabische leraren vanaf je computer.",
  alternates: {
    canonical: "/online-quran-classes-netherlands",
  },
};

export default function NetherlandsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
