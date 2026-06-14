import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Online Noorani Qaida Classes | Master Arabic Pronunciation & Phonetics",
  description: "Learn Noorani Qaida online. Build a bedrock-solid foundation in Arabic phonetics, pronunciation, and spelling with live 1-on-1 certified mentors.",
  alternates: {
    canonical: "/courses/online-noorani-qaida-classes",
  },
};

export default function NooraniQaidaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
