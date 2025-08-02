"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { FaFireAlt } from "react-icons/fa";
import { GiClockwork } from "react-icons/gi";
import { RiCodeSSlashLine } from "react-icons/ri";
import { GoCodeOfConduct } from "react-icons/go";
import ProfileHeader from "../ProfileHeader";
import StatCard from "../StatCard";
import LanguageSection from "../LanguageSection";

interface LanguageActivity {
  languageName: string;
  shortLanguageName: string;
  totalDuration: number;
  last7DaysDuration: number;
}

interface DeveloperProfileData {
  name: string;
  gitUsername: string;
  twitterUsername: string;
  profileImage: string;
  streak: number;
  activities: LanguageActivity[];
}

const fetchDeveloperData = async (
  username: string,
): Promise<DeveloperProfileData> => {
  const response = await fetch(`/api/profile`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username }),
  });
  if (!response.ok) throw new Error("Failed to fetch developer data");
  const json = await response.json();
  return json.data;
};

const DeveloperProfile = () => {
  const params = useParams();
  const username = params?.username as string;

  const {
    data: profileData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["developer", username],
    queryFn: () => fetchDeveloperData(username),
    enabled: !!username,
  });

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center w-full min-h-screen py-20">
          <div className="relative animate-spin w-12 h-12 rounded-full border-t-2 border-white/80 border-solid border-l-transparent" />
        </div>
      );
    }

    if (error || !profileData) {
      return (
        <div className="flex justify-center items-center w-full min-h-screen">
          <div className="text-center p-8 bg-neutral-900 rounded-lg">
            <p className="text-neutral-400 text-lg font-semibold">
              {error ? `Error: ${error.message}` : "No profile data found"}
            </p>
          </div>
        </div>
      );
    }

    const totalDurationMinutes = profileData.activities.reduce(
      (sum, activity) => sum + activity.totalDuration,
      0,
    );

    const totalTime = (totalDurationMinutes / 60).toFixed(2);

    const thisWeekTotalTime = (
      profileData.activities.reduce(
        (sum, activity) => sum + activity.last7DaysDuration,
        0,
      ) / 60
    ).toFixed(2);

    const sortedActivities = [...profileData.activities].sort(
      (a, b) => b.totalDuration - a.totalDuration,
    );

    const topLanguageActivity = sortedActivities[0];
    const topLanguage = topLanguageActivity?.shortLanguageName || "N/A";

    return (
      <>
        <h2 className="text-3xl font-semibold text-neutral-300 text-left self-start mb-5 font-heading">
          <span className="text-white">{profileData.name}</span>'s Profile
        </h2>

        <ProfileHeader
          name={profileData.name}
          gitUsername={profileData.gitUsername}
          twitterUsername={profileData.twitterUsername}
          profileImage={profileData.profileImage}
          thisWeekTotalTime={thisWeekTotalTime}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-5 w-full">
          <StatCard
            icon={<FaFireAlt />}
            title="Streak"
            value={profileData.streak}
          />
          <StatCard
            icon={<GiClockwork />}
            title="Total Time"
            value={`${totalTime}hr`}
          />
          <StatCard
            icon={<RiCodeSSlashLine />}
            title="Languages"
            value={profileData.activities.length}
          />
          <StatCard
            icon={<GoCodeOfConduct />}
            title="Top Language"
            value={topLanguage}
          />
        </div>

        <LanguageSection
          activities={sortedActivities}
          totalDurationMinutes={totalDurationMinutes}
        />
      </>
    );
  };

  return (
    <section className="flex justify-center items-start w-full min-h-screen py-10 bg-neutral-950 relative">
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      <div className="flex flex-col justify-start items-start lg:container w-full px-3 relative z-10">
        {renderContent()}
      </div>
    </section>
  );
};

export default DeveloperProfile;
