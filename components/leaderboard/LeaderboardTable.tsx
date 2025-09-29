import React from "react";
import DeveloperCard from "../common/DevloperCard";
import LanguageBadge from "../common/LanguageBadge";
import { languageIconsImage, languageColors } from "@/utils/LanguageData";
import languageShortNames from "@/utils/LanguageShortNames";
import { IoFlame } from "react-icons/io5";

interface Activity {
  languageName: string;
  shortLanguageName: string;
  totalDuration: number;
  last24HoursDuration: number;
  last7DaysDuration: number;
}

interface User {
  name: string;
  profileImage: string;
  gitUsername: string;
  twitterUsername: string;
  streak: number;
  activities: Activity[];
}

interface LeaderboardTableProps {
  leaderboardData: User[];
  activeButton: string;
}

const LeaderboardTable: React.FC<LeaderboardTableProps> = ({
  leaderboardData,
  activeButton,
}) => {
  const getLanguageColor = (
    languageName: string,
    shortLanguageName: string,
  ) => {
    const fullNameKey = languageName.toLowerCase().replace(/\s+/g, "");
    if (languageColors[fullNameKey as keyof typeof languageColors]) {
      return languageColors[fullNameKey as keyof typeof languageColors];
    }

    const shortNameKey = Object.keys(languageShortNames).find(
      (key) =>
        languageShortNames[
          key as keyof typeof languageShortNames
        ].toLowerCase() === shortLanguageName.toLowerCase(),
    );
    if (
      shortNameKey &&
      languageColors[shortNameKey as keyof typeof languageColors]
    ) {
      return languageColors[shortNameKey as keyof typeof languageColors];
    }

    return languageColors.plaintext;
  };

  const getLanguageIcon = (languageName: string, shortLanguageName: string) => {
    const fullNameKey = languageName.toLowerCase().replace(/\s+/g, "");
    if (languageIconsImage[fullNameKey as keyof typeof languageIconsImage]) {
      return languageIconsImage[fullNameKey as keyof typeof languageIconsImage];
    }

    const shortNameKey = Object.keys(languageShortNames).find(
      (key) =>
        languageShortNames[
          key as keyof typeof languageShortNames
        ].toLowerCase() === shortLanguageName.toLowerCase(),
    );
    if (
      shortNameKey &&
      languageIconsImage[shortNameKey as keyof typeof languageIconsImage]
    ) {
      return languageIconsImage[
        shortNameKey as keyof typeof languageIconsImage
      ];
    }

    return "/icons/txt.svg";
  };
  const formatTime = (minutes: number) => {
    const roundedMinutes = Math.round(minutes);
    const hours = Math.floor(roundedMinutes / 60);
    const mins = roundedMinutes % 60;

    if (hours > 0) {
      if (mins === 0) {
        return `${hours}h`;
      }
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const formatTimeDetailed = (minutes: number) => {
    const roundedMinutes = Math.round(minutes);
    const hours = Math.floor(roundedMinutes / 60);
    const mins = roundedMinutes % 60;

    if (hours === 0 && mins === 0) {
      return "0m";
    }

    if (hours > 24) {
      const days = Math.floor(hours / 24);
      const remainingHours = hours % 24;
      if (remainingHours === 0) {
        return `${days}d`;
      }
      return `${days}d ${remainingHours}h`;
    }

    if (hours > 0) {
      if (mins === 0) {
        return `${hours}h`;
      }
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const getTotalTime = (activities: Activity[]) => {
    return (
      activities?.reduce((sum, activity) => {
        return (
          sum +
          (activeButton === "7Days"
            ? activity.last7DaysDuration
            : activity.last24HoursDuration)
        );
      }, 0) || 0
    );
  };

  const getTopLanguages = (activities: Activity[]) => {
    if (!activities) return [];

    const languagesWithTime = activities
      .map((activity) => ({
        ...activity,
        duration:
          activeButton === "7Days"
            ? activity.last7DaysDuration
            : activity.last24HoursDuration,
      }))
      .filter((activity) => activity.duration > 0)
      .sort((a, b) => b.duration - a.duration);

    return languagesWithTime;
  };

  if (!leaderboardData || leaderboardData.length === 0) {
    return (
      <div className="flex justify-center items-center w-full bg-[#202020] backdrop-blur-sm p-8 rounded-md">
        <p className="text-neutral-400 text-base font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto w-full rounded-md custom-scrollbar">
      <table className="w-full border-collapse text-left backdrop-blur-3xl min-w-[1000px]">
        <thead className="bg-[#202020] backdrop-blur-2xl">
          <tr className="border-b border-[#2a2a2a]">
            <th className="text-center text-base font-semibold font-heading text-neutral-300 tracking-wider px-8 py-4 w-20 whitespace-nowrap">
              Rank
            </th>
            <th className="text-left text-base font-semibold font-heading text-neutral-300 tracking-wider px-8 py-4 w-64 whitespace-nowrap">
              Developer
            </th>
            <th className="text-center text-base font-semibold font-heading text-neutral-300 tracking-wider px-8 py-4 w-24 whitespace-nowrap">
              Streak
            </th>
            <th className="text-center text-base font-semibold font-heading text-neutral-300 tracking-wider px-8 py-4 w-32 whitespace-nowrap">
              {activeButton === "24Hours" ? "Time (24h)" : "Time (7d)"}
            </th>
            <th className="text-left text-base font-semibold font-heading text-neutral-300 tracking-wider px-8 py-4 whitespace-nowrap">
              All Languages
            </th>
          </tr>
        </thead>
        <tbody className="bg-[#202020] backdrop-blur-2xl">
          {leaderboardData.map((user, index) => {
            const totalTime = getTotalTime(user.activities);
            const topLanguages = getTopLanguages(user.activities);

            return (
              <tr
                key={user.gitUsername}
                className="border-b border-[#2a2a2a] hover:bg-[#222222] transition-colors"
              >
                {/* Rank */}
                <td className="px-8 py-5 text-center w-20 whitespace-nowrap">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold mx-auto ${
                      index === 0
                        ? "bg-yellow-500/20 border-2 border-yellow-500 text-yellow-400 shadow-lg shadow-yellow-500/20"
                        : index === 1
                          ? "bg-neutral-400/20 border-2 border-neutral-400 text-neutral-300 shadow-lg shadow-neutral-400/20"
                          : index === 2
                            ? "bg-orange-500/20 border-2 border-orange-500 text-orange-400 shadow-lg shadow-orange-500/20"
                            : "bg-[#282828]/30 border-2 border-neutral-500 text-neutral-300"
                    }`}
                  >
                    {index < 3 ? (
                      <span className="text-lg">
                        {index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"}
                      </span>
                    ) : (
                      index + 1
                    )}
                  </div>
                </td>

                {/* Developer */}
                <td className="px-8 py-5 w-64 whitespace-nowrap">
                  <DeveloperCard
                    name={user.name}
                    profileImage={user.profileImage}
                    gitUsername={user.gitUsername}
                  />
                </td>

                {/* Streak */}
                <td className="px-8 py-5 text-center w-24 whitespace-nowrap">
                  <div className="flex flex-col items-center gap-1">
                    <div className="flex items-center gap-1">
                      <span className="text-lg font-semibold text-orange-400">
                        {user.streak}
                      </span>
                      <IoFlame className="text-orange-500 text-lg" />
                    </div>
                    <span className="text-xs font-semibold text-neutral-400">
                      days
                    </span>
                  </div>
                </td>

                {/* Total Time */}
                <td className="px-8 py-5 text-center w-32 whitespace-nowrap">
                  <div className="flex flex-col items-center justify-center">
                    <span className="text-xl font-semibold text-white">
                      {formatTimeDetailed(totalTime)}
                    </span>
                    {totalTime > 0 && (
                      <span className="text-xs font-semibold text-neutral-400 mt-1">
                        ({Math.round(totalTime)} min)
                      </span>
                    )}
                  </div>
                </td>

                {/* All Languages */}
                <td className="px-8 py-5 whitespace-nowrap">
                  <div className="flex flex-row gap-2">
                    {topLanguages.length > 0 ? (
                      topLanguages.map((activity, langIndex) => (
                        <LanguageBadge
                          key={`${user.gitUsername}-${activity.languageName}-${langIndex}`}
                          lang={activity.languageName}
                          icon={getLanguageIcon(
                            activity.languageName,
                            activity.shortLanguageName,
                          )}
                          duration={Math.round(activity.duration)}
                          color={getLanguageColor(
                            activity.languageName,
                            activity.shortLanguageName,
                          )}
                        />
                      ))
                    ) : (
                      <span className="text-neutral-500 text-sm font-semibold italic">
                        No activity
                      </span>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderboardTable;
