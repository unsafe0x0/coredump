import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import "./style.css";

const font = Space_Grotesk({
  weight: ["400", "500"],
  subsets: ["latin"],
});

export const metadata = {
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
  icons: {
    icon: "/logo.svg",
  },
  ogTitle: "BashForge - Track and Compete in Coding Time",
  ogDescription:
    "BashForge is a dynamic leaderboard platform that tracks coding time and languages, helping developers compete and improve their productivity.",
  ogImage: "/logo.svg",
  ogType: "website",
  ogUrl: "https://bashForge.vercel.app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  );
}
