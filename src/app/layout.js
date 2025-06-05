import { Inter } from "next/font/google";
import "./globals.css";
import "./style.css";

const font = Inter({
  weight: ["400", "500", "600"],
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
      <body className={font.className}>
        {/* <div className="w-full h-full bg-gradient-to-br from-green-400 to-green-600 blur-[1000px] fixed top-0 left-0 z-[-1] p-0 opacity-15"></div> */}
        {children}
      </body>
    </html>
  );
}
