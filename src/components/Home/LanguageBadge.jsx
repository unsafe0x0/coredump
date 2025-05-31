"use client";
import React, { useState } from "react";
import Image from "next/image";

const LanguageBadge = ({ lang, icon, color, duration }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`flex items-center justify-center gap-1 px-4 md:px-3 py-1 border rounded-md text-sm font-normal whitespace-nowrap relative min-w-[70px] ${color} text-neutral-100`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && (
        <div className="absolute -top-7 px-2 py-1 bg-neutral-900/80 z-50 rounded-md border border-white/10">
          <p className="text-white text-center text-sm font-normal">{lang}</p>
        </div>
      )}
      <Image
        src={icon}
        alt={lang}
        width={22}
        height={22}
        className="object-contain"
      />
      <span>{duration}m</span>
    </div>
  );
};

export default LanguageBadge;
