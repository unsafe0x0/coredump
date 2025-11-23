import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/context/QueryProvider";
import AuthProvider from "@/context/AuthProvider";
import ToastProvider from "@/context/ToastProvider";
import { ThemeProvider } from "@/context/ThemeProvider";

const bodyFont = Inter({
  weight: ["500", "600", "700"],
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://coredump.vercel.app/"),
  title: {
    default: "CoreDump — Track & Compete in Coding Time",
    template: "%s | CoreDump",
  },
  applicationName: "CoreDump",
  description:
    "CoreDump tracks your coding time, daily streaks and language usage — compete on global leaderboards and level up your skills with gamified achievements.",
  keywords: [
    "CoreDump",
    "coding time tracking",
    "developer leaderboard",
    "coding streaks",
    "programming analytics",
    "productivity",
    "achievements",
    "developer profile",
  ],
  authors: [{ name: "UnsafeZero", url: "https://github.com/unsafe0x0" }],
  creator: "UnsafeZero",
  publisher: "UnsafeZero",
  openGraph: {
    title: "CoreDump — Track & Compete in Coding Time",
    description:
      "Track coding time, maintain streaks and compete globally on leaderboards. CoreDump helps developers build consistent habits and showcase progress.",
    url: "https://coredump.vercel.app/",
    siteName: "CoreDump",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/logo.svg",
        width: 1200,
        height: 630,
        alt: "CoreDump logo",
        type: "image/svg+xml",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CoreDump — Track & Compete in Coding Time",
    description:
      "Track coding time, maintain streaks and compete globally on leaderboards.",
    creator: "@unsafezero",
    images: ["/logo.svg"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      <body className={bodyFont.className}>
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
