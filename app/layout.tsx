import type { Metadata } from "next";
import { Bricolage_Grotesque, Public_Sans } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/context/QueryProvider";
import AuthProvider from "@/context/AuthProvider";
import ToastProvider from "@/context/ToastProvider";

const headingFont = Bricolage_Grotesque({
  variable: "--font-heading",
  subsets: ["latin"],
});

const bodyFont = Public_Sans({
  weight: ["400", "500", "600"],
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BashForge - Track and Compete in Coding Time",
  description:
    "BashForge is a dynamic leaderboard platform that tracks coding time and languages, helping developers compete and improve their productivity.",
  keywords: [
    "BashForge",
    "coding",
    "time tracking",
    "leaderboard",
    "developer",
    "productivity",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${headingFont.variable} ${bodyFont.variable} antialiased`}
      >
        <AuthProvider>
          <QueryProvider>
            {children}
            <ToastProvider />
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
