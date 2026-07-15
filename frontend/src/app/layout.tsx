import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ChatWidget } from "@/components/chatbot/chat-widget";

export const metadata: Metadata = {
  title: "Swaminathan — Shaping Confident Careers | Career Coaching by V. Swaminathan",
  description:
    "Personalized career coaching for students and parents. Psychometric assessments, career path discovery, and expert guidance by V. Swaminathan — International Certified Career Coach (CDA, USA).",
  icons: {
    icon: "/logo.jpg",
  },
  keywords: [
    "career coaching",
    "career counseling",
    "psychometric assessment",
    "career guidance",
    "student career",
    "DeepClariti",
    "V. Swaminathan",
  ],
  openGraph: {
    title: "DeepClariti — Shaping Confident Careers",
    description: "Personalized career coaching for students and parents by V. Swaminathan.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="pt-16 lg:pt-20">{children}</main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
