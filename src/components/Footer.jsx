"use client";

import React from "react";
import { GiMineralHeart } from "react-icons/gi";

export default function Footer() {
  return (
    <footer className="flex justify-center items-center w-full border-t border-white/10 bg-zinc-900/80">
      <div className="flex flex-col justify-center items-center w-full px-5 py-2 lg:container">
        <p className="text-md font-normal flex flex-wrap items-center gap-1 text-white/70">
          Made with <GiMineralHeart className="text-teal-600/80 text-lg" /> by
          Priyanshu
        </p>
      </div>
    </footer>
  );
}
