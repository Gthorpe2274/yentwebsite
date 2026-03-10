import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Y Enterprises - AI Digital Marketing Solutions",
  description: "Transform your business with AI-powered digital marketing. Y Enterprises delivers cutting-edge solutions in AI Chatbot, Web Analytics, Marketing Automation, and Mobile Commerce.",
  keywords: ["AI Digital Marketing", "AI Chatbot", "Web Analytics", "Marketing Automation", "Mobile Commerce", "Digital Marketing", "Y Enterprises"],
  authors: [{ name: "Y Enterprises" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Y Enterprises - AI Digital Marketing Solutions",
    description: "Transform your business with AI-powered digital marketing solutions",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Y Enterprises - AI Digital Marketing",
    description: "Transform your business with AI-powered digital marketing solutions",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
