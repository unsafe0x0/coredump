import { Roboto } from "next/font/google";
import "./globals.css";
import "./style.css";

const font = Roboto({
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
  ogTitle: "BashForge - Track and Compete in Coding Time",
  ogDescription:
    "BashForge is a dynamic leaderboard platform that tracks coding time and languages, helping developers compete and improve their productivity.",
  ogImage: "/logo.jpg",
  ogType: "website",
  ogUrl: "https://BashForge.vercel.app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  );
}
