import React from "react";
import Image from "next/image";
import { languageIconsImage } from "@/utils/LanguageData";
import { formatMinutesAsHrMin } from "@/utils/ActivityMetrics";

interface WeeklyActivity {
  languageName: string;
  duration: number;
}

interface WeekStatsProps {
  activities: WeeklyActivity[];
  totalDurationMinutes: number;
}

const WeekStats: React.FC<WeekStatsProps> = ({
  activities,
  totalDurationMinutes,
}) => {
  const sorted = [...activities].sort((a, b) => b.duration - a.duration);

  return (
    <div className="flex flex-col justify-start items-start w-full mt-5 mb-5">
      <h2 className="text-3xl font-semibold text-foreground mb-5 mt-5 font-heading">
        This Week's Stats
      </h2>
      {sorted.length === 0 ? (
        <div className="w-full text-center py-10 rounded-lg bg-card/60">
          <p className="text-foreground/80 text-base font-medium">
            No coding activity recorded this week yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 justify-start items-start w-full gap-5">
          {sorted.map((activity, index) => {
            const key = activity.languageName.toLowerCase().replace(/\s+/g, "");
            const percent =
              totalDurationMinutes > 0
                ? (activity.duration / totalDurationMinutes) * 100
                : 0;

            return (
              <div
                key={index}
                className="flex flex-col justify-start items-start gap-3 w-full bg-card border border-border p-3 rounded-lg"
              >
                <div className="flex flex-row justify-between items-center w-full">
                  <div className="flex items-center gap-3">
                    <Image
                      src={
                        languageIconsImage[
                          key as keyof typeof languageIconsImage
                        ] || "/icons/txt.svg"
                      }
                      alt={activity.languageName}
                      width={24}
                      height={24}
                      className="w-8 h-8"
                    />
                    <p className="text-foreground/80 text-base font-medium capitalize">
                      {activity.languageName}
                    </p>
                  </div>
                  <p className="text-foreground/80 text-base font-medium">
                    {formatMinutesAsHrMin(activity.duration)}{" "}
                    <span className="text-foreground font-semibold">
                      ({Math.round(percent)}%)
                    </span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default WeekStats;
