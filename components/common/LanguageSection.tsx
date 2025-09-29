import React from "react";
import Image from "next/image";
import LanguageBadge from "@/components/common/LanguageBadge";
import {
  languageColors,
  languageIconsImage,
  languageProgressBgColor,
} from "@/utils/LanguageData";

interface Activity {
  languageName: string;
  totalDuration: number;
}

interface LanguageSectionProps {
  activities: Activity[];
  totalDurationMinutes: number;
}

const LanguageSection: React.FC<LanguageSectionProps> = ({
  activities,
  totalDurationMinutes,
}) => {
  const sorted = [...activities].sort(
    (a, b) => b.totalDuration - a.totalDuration,
  );

  return (
    <div className="flex flex-col justify-start items-start w-full p-5 rounded-md bg-[#202020] backdrop-blur-sm">
      <h2 className="text-3xl font-semibold text-white mb-5 font-heading">
        Languages
      </h2>

      <div className="flex flex-wrap justify-start items-stretch w-full gap-3 mb-8">
        {sorted.map((activity, index) => {
          const key = activity.languageName.toLowerCase().replace(/\s+/g, "");
          return (
            <LanguageBadge
              key={index}
              lang={activity.languageName}
              icon={
                (languageIconsImage as Record<string, string>)[key] ||
                "/icons/txt.svg"
              }
              color={
                languageColors[key as keyof typeof languageColors] ||
                "bg-neutral-500/20 border-neutral-500"
              }
              duration={Math.round(activity.totalDuration)}
            />
          );
        })}
      </div>

      <h3 className="text-xl font-semibold text-white mb-5 font-heading">
        Time Distribution
      </h3>
      <div className="flex flex-col justify-start items-start w-full gap-5">
        {sorted.map((activity, index) => {
          const key = activity.languageName.toLowerCase().replace(/\s+/g, "");
          const percent =
            totalDurationMinutes > 0
              ? (activity.totalDuration / totalDurationMinutes) * 100
              : 0;

          return (
            <div
              key={index}
              className="flex flex-col justify-start items-start gap-3 w-full bg-[#222222] p-3 rounded-md border border-[#2a2a2a]"
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
                    className="w-6 h-6"
                  />
                  <p className="text-neutral-300 text-base font-medium capitalize">
                    {activity.languageName}
                  </p>
                </div>
                <p className="text-neutral-300 text-base font-medium">
                  {Math.round(activity.totalDuration)}m{" "}
                  <span className="text-white font-semibold">
                    ({Math.round(percent)}%)
                  </span>
                </p>
              </div>
              <div className="w-full h-3 rounded-full bg-[#282828]">
                <div
                  className={`h-full rounded-full ${languageProgressBgColor[key as keyof typeof languageProgressBgColor] || "bg-neutral-500"}`}
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LanguageSection;
