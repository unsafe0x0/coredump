"use client";
import React from "react";
import { GiDiamondTrophy } from "react-icons/gi";
import { languageIconsImage, languageColors } from "@/lib/languageData";
import LanguageBadge from "./LanguageBadge";
import DeveloperCard from "./DeveloperCard";
import { MdOutlineWatchLater } from "react-icons/md";

const LeaderboardData = ({ LeaderboardData, activeBtn }) => {
  return (
    <div className="overflow-x-auto w-full rounded-b-lg">
      <table className="w-full border-collapse text-left backdrop-blur-3xl">
        <thead className="bg-zinc-800/80 backdrop-blur-xl min-w-full">
          <tr className="border-b border-white/10 w-full">
            <th className="text-left text-lg font-medium text-white/80 px-10 py-3">
              Rank
            </th>
            <th className="text-left text-lg font-medium text-white/80 px-10 py-3">
              Developer
            </th>
            <th className="text-center text-lg font-medium text-white/80 px-10 py-3">
              Time
            </th>
            <th className="text-left text-lg font-medium text-white/80 px-10 py-3 whitespace-nowrap">
              Top Languages
            </th>
          </tr>
        </thead>
        <tbody className="text-md md:text-lg text-white/70 bg-zinc-800/60 min-w-full">
          {LeaderboardData.length > 0 ? (
            LeaderboardData.map((dev, index) => {
              const totalTime = dev.activities?.reduce(
                (sum, act) =>
                  sum +
                  (activeBtn === "7Days"
                    ? act.last7DaysDuration || 0
                    : act.last24HoursDuration || 0),
                0
              );

              return (
                <tr
                  key={index}
                  className="border-b border-white/10 align-top w-full"
                >
                  <td className="px-10 py-3 align-middle">
                    {index === 0 ? (
                      <GiDiamondTrophy className="text-yellow-400 text-3xl" />
                    ) : index === 1 ? (
                      <GiDiamondTrophy className="text-zinc-400 text-3xl" />
                    ) : index === 2 ? (
                      <GiDiamondTrophy className="text-amber-700 text-3xl" />
                    ) : (
                      <span className="text-xl font-medium">{index + 1}</span>
                    )}
                  </td>
                  <td className="px-10 py-3 align-middle">
                    <DeveloperCard developerData={dev} />
                  </td>
                  <td className="px-10 py-3 align-middle text-center">
                    <span className="px-3 py-1 bg-teal-600/10 rounded-lg inline-flex items-center gap-1 whitespace-nowrap">
                      <MdOutlineWatchLater className="text-teal-600 text-lg font-medium" />
                      {Math.round(totalTime)} m
                    </span>
                  </td>
                  <td className="px-10 py-3 align-middle">
                    <div className="flex flex-row gap-2">
                      {[...(dev.activities || [])]
                        .filter((act) =>
                          activeBtn === "7Days"
                            ? act.last7DaysDuration > 0
                            : act.last24HoursDuration > 0
                        )
                        .sort(
                          (a, b) =>
                            (b[
                              activeBtn === "7Days"
                                ? "last7DaysDuration"
                                : "last24HoursDuration"
                            ] || 0) -
                            (a[
                              activeBtn === "7Days"
                                ? "last7DaysDuration"
                                : "last24HoursDuration"
                            ] || 0)
                        )
                        .map((act, actIndex) => {
                          const lang = act.languageName?.toLowerCase() || "";
                          const IconImage =
                            languageIconsImage[lang] || "/icons/txt.svg";
                          const color =
                            languageColors[lang] ||
                            "bg-zinc-500/80 border-zinc-500";
                          const duration = Math.round(
                            act[
                              activeBtn === "7Days"
                                ? "last7DaysDuration"
                                : "last24HoursDuration"
                            ] || 0
                          );

                          return (
                            <LanguageBadge
                              key={actIndex}
                              lang={lang}
                              icon={IconImage}
                              color={color}
                              duration={duration}
                            />
                          );
                        })}
                    </div>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={4} className="text-center py-5 text-zinc-400">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderboardData;
