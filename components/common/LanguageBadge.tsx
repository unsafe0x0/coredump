"use client";
import React, { useState } from "react";
import Image from "next/image";

interface LanguageBadgeProps {
  lang: string | null;
  icon: string;
  duration: number;
  color: string;
}

const LanguageBadge: React.FC<LanguageBadgeProps> = ({
  icon,
  duration,
  color,
  lang,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative z-50">
      <div
        className={`flex items-center justify-center gap-1 px-3 py-2 border rounded-md text-sm font-semibold whitespace-nowrap min-w-[70px] h-[36px] text-white ${color}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image
          src={icon ? icon : "/icons/default.svg"}
          alt={lang || ""}
          width={18}
          height={18}
          className="object-contain flex-shrink-0"
        />
        <span className="text-white">{duration}m</span>
      </div>
      {isHovered && (
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 px-3 py-2 bg-white text-black text-sm rounded-md whitespace-nowrap z-[9999] shadow-xl border border-[#2a2a2a]">
          {lang}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-black"></div>
        </div>
      )}
    </div>
  );
};

export default LanguageBadge;
