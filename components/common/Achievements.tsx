"use client";

import React from "react";
import Image from "next/image";
import { ACHIEVEMENTS } from "@/utils/Achievements";

type AchievementsProps = {
  title?: string;
  achievements: string[];
  className?: string;
};

const iconFallbackById: Record<string, string> = {
  "total-100h": "/achievements/total-100h.svg",
  "day-8h": "/achievements/day-8h.svg",
};

const Achievements: React.FC<AchievementsProps> = ({
  title = "Achievements",
  achievements,
  className = "",
}) => {
  const ACHIEVEMENT_MAP = React.useMemo(
    () => new Map(ACHIEVEMENTS.map((a) => [a.id, a])),
    []
  );

  return (
    <div
      className={`flex flex-col w-full${className}`}
    >
      <h2 className="text-3xl font-semibold text-foreground mb-5 mt-5 font-heading">
        {title}
      </h2>

      {achievements?.length === 0 ? (
        <p className="text-foreground/70">No achievements to display yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {achievements.map((id, index) => {
            const def = ACHIEVEMENT_MAP.get(id);
            const titleText = def?.title ?? id;
            const points = def?.points ?? 0;
            const iconSrc = def?.icon ?? iconFallbackById[id] ?? "/file.svg";
            const altText = `${titleText} achievement icon`;

            return (
              <div
                key={`${id}-${index}`}
                className="relative flex flex-col gap-3 p-4 rounded-md bg-card border border-border"
              >
                <div className="flex items-center gap-3">
                  <Image
                    src={iconSrc}
                    alt={altText}
                    width={48}
                    height={48}
                    className="w-12 h-12"
                  />
                  <div className="flex flex-col">
                    <p className="text-foreground font-semibold">{titleText}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs px-2 py-1 rounded bg-accent/10 text-accent font-medium">
                    {points} pts
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Achievements;
