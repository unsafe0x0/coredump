"use client";

import React from "react";
import { GiMineralHeart } from "react-icons/gi";

export default function Footer() {
  return (
    <footer className="flex justify-center items-center w-full border-t border-neutral-700/40 bg-neutral-800/60">
      <div className="flex flex-col justify-center items-center w-full px-5 py-2 lg:container">
        <p className="text-md font-normal flex flex-wrap items-center gap-1 text-neutral-400">
          Made with <GiMineralHeart className="text-red-500 text-lg" /> by
          Priyanshu
        </p>
      </div>
    </footer>
  );
}
