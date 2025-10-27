import React from "react";
import Image from "next/image";
import { FaGithub, FaFireAlt } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { GiClockwork } from "react-icons/gi";
import { RiCodeSSlashLine } from "react-icons/ri";
import { TbTrendingUp } from "react-icons/tb";
import {
  languageColors,
  languageIconsImage,
  languageProgressBgColor,
} from "@/utils/LanguageData";

const MockDashboard = () => {
  const mockLanguages = [
    { name: "typescript", displayName: "TypeScript", duration: 180 },
    { name: "javascript", displayName: "JavaScript", duration: 120 },
    { name: "python", displayName: "Python", duration: 75 },
    { name: "typescriptreact", displayName: "React", duration: 45 },
    { name: "css", displayName: "CSS", duration: 25 },
  ];

  const totalDurationMinutes = mockLanguages.reduce(
    (sum, l) => sum + (typeof l.duration === "number" ? l.duration : 0),
    0,
  );

  return (
    <div className="w-full max-w-7xl bg-background rounded-md border-4 border-border p-6">
      <div className="flex justify-between items-center mb-6">
        <div></div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-card border border-border rounded-md"></div>
          <div className="w-8 h-8 bg-card border border-border rounded-md"></div>
        </div>
      </div>
      <div className="flex flex-col justify-start items-start w-full p-4 rounded-md bg-card border border-border mb-4">
        <div className="flex flex-row justify-start items-start gap-4 mt-2">
          <div className="w-16 h-16 rounded-md flex items-center justify-center">
            <img
              src="https://avatars.githubusercontent.com/u/165533860?v=4"
              alt="Unsafezero"
              className="rounded-md object-cover w-full h-full"
            />
          </div>
          <div className="flex flex-col justify-start items-start gap-2">
            <p className="text-foreground text-xl font-semibold font-heading">
              Unsafezero
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <div className="text-foreground/80 text-sm flex gap-2 items-center">
                <FaGithub />
                Unsafe0x0
              </div>
              <div className="text-foreground/80 text-sm flex gap-2 items-center">
                <FaSquareXTwitter />
                Unsafezero
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-foreground/80">
              <span>Crushed 12.5h this week</span>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <div className="flex justify-start items-center bg-card border border-border rounded-md p-3 gap-3">
          <span className="p-2 bg-accent rounded text-accent-text text-lg flex">
            <FaFireAlt />
          </span>
          <div className="flex flex-col justify-center items-start">
            <h3 className="text-sm font-semibold text-foreground font-heading">
              Streak
            </h3>
            <p className="text-lg font-bold text-foreground">42</p>
          </div>
        </div>

        <div className="flex justify-start items-center bg-card border border-border rounded-md p-3 gap-3">
          <span className="p-2 bg-accent rounded text-accent-text text-lg flex">
            <GiClockwork />
          </span>
          <div className="flex flex-col justify-center items-start">
            <h3 className="text-sm font-semibold text-foreground font-heading">
              Total Time
            </h3>
            <p className="text-lg font-bold text-foreground">247h</p>
          </div>
        </div>

        <div className="flex justify-start items-center bg-card border border-border rounded-md p-3 gap-3">
          <span className="p-2 bg-accent rounded text-accent-text text-lg flex">
            <RiCodeSSlashLine />
          </span>
          <div className="flex flex-col justify-center items-start">
            <h3 className="text-sm font-semibold text-foreground font-heading">
              Languages
            </h3>
            <p className="text-lg font-bold text-foreground">12</p>
          </div>
        </div>

        <div className="flex justify-start items-center bg-card border border-border rounded-md p-3 gap-3">
          <span className="p-2 bg-accent rounded text-accent-text text-lg flex">
            <TbTrendingUp />
          </span>
          <div className="flex flex-col justify-center items-start">
            <h3 className="text-sm font-semibold text-foreground font-heading">
              Points
            </h3>
            <p className="text-lg font-bold text-foreground">2,847</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-start items-start w-full p-4 rounded-md bg-card border border-border">
        <h3 className="text-xl font-semibold text-foreground mb-3 font-heading">
          Languages
        </h3>

        <div className="flex flex-wrap justify-start items-center w-full gap-2 mb-4">
          {mockLanguages.map((lang, index) => {
            const languageKey = lang.name as keyof typeof languageIconsImage;
            const icon = languageIconsImage[languageKey] || "/icons/txt.svg";
            const colorClass =
              languageColors[languageKey as keyof typeof languageColors] ||
              "bg-neutral-500/20 border-neutral-500";

            return (
              <div key={index} className="relative z-50">
                <div
                  className={`flex items-center justify-center gap-1 px-2 py-1 border rounded-md text-sm font-normal whitespace-nowrap min-w-[70px] text-foreground ${colorClass}`}
                >
                  <img
                    src={icon}
                    alt={lang.displayName}
                    width={18}
                    height={18}
                    className="w-4 h-4"
                  />
                  <span className="text-foreground">
                    {Math.round(lang.duration)}m
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="w-full space-y-2">
          {mockLanguages.slice(0, 3).map((lang, index) => {
            const languageKey =
              lang.name.toLowerCase() as keyof typeof languageIconsImage;
            const percent =
              totalDurationMinutes > 0
                ? (lang.duration / totalDurationMinutes) * 100
                : 0;
            const progressClass =
              languageProgressBgColor[
                languageKey as keyof typeof languageProgressBgColor
              ] || "bg-neutral-500";

            return (
              <div
                key={index}
                className="flex items-center justify-between w-full"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <img
                    src={
                      languageIconsImage[
                        languageKey as keyof typeof languageIconsImage
                      ] || "/icons/txt.svg"
                    }
                    alt={lang.displayName}
                    className="w-5 h-5 flex"
                  />
                  <span className="text-foreground text-sm font-medium truncate">
                    {lang.displayName}
                  </span>
                </div>
                <div className="flex items-center gap-3 ml-4">
                  <div className="w-20 h-2 bg-border rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${progressClass}`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <span className="text-foreground/80 text-xs font-medium w-10 text-right">
                    {Math.round(percent)}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MockDashboard;
