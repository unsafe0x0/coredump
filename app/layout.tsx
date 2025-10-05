import type { Metadata } from "next";
import { Inter, Public_Sans } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/context/QueryProvider";
import AuthProvider from "@/context/AuthProvider";
import ToastProvider from "@/context/ToastProvider";
import { ThemeProvider } from "@/context/ThemeProvider";

const headingFont = Inter({
  variable: "--font-heading",
  subsets: ["latin"],
});

const bodyFont = Public_Sans({
  weight: ["400", "500", "600"],
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CoreDump - Track and Compete in Coding Time",
  description:
    "CoreDump is a dynamic leaderboard platform that tracks coding time and languages, helping developers compete and improve their productivity.",
  keywords: [
    "CoreDump",
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
    <html lang="en" className="light" suppressHydrationWarning>
      <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      <body
        className={`${headingFont.variable} ${bodyFont.variable} antialiased`}
      >
        <AuthProvider>
          <QueryProvider>
            <ThemeProvider>
              {children}
              <ToastProvider />
            </ThemeProvider>
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
