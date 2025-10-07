"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import ProfileHeader from "../common/ProfileHeader";
import LanguageSection from "../common/LanguageSection";
import WeekStats from "../common/WeekStats";
import StatsGrid from "../common/StatsGrid";
import Achievements from "../common/Achievements";

import {
  calculateAverageMinutes,
  calculateLast7DaysDurationMinutes,
  calculateTotalDurationMinutes,
  formatMinutesAsHrMin,
  getTopLanguageShortName,
  getTopWeeklyActivities,
  calculateWeeklyAverageMinutes,
  sortActivitiesByTotalDuration,
  sumWeeklyDurations,
} from "@/utils/ActivityMetrics";

interface LanguageActivity {
  languageName: string;
  shortLanguageName: string;
  totalDuration: number;
  last7DaysDuration: number;
  last24HoursDuration: number;
}

interface DeveloperProfileData {
  name: string;
  gitUsername: string;
  twitterUsername: string;
  profileImage: string;
  streak: number;
  totalPoints: number;
  activities: LanguageActivity[];
  achievements: string[];
}

const fetchDeveloperData = async (
  username: string
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
          <div className="relative animate-spin w-12 h-12 rounded-full border-t-2 border-border border-solid border-l-transparent" />
        </div>
      );
    }

    if (error || !profileData) {
      return (
        <div className="flex justify-center items-center w-full min-h-screen">
          <div className="text-center p-8 bg-card border border-border rounded-md">
            <p className="text-foreground/80 text-lg font-semibold">
              {error ? `Error: ${error.message}` : "No profile data found"}
            </p>
          </div>
        </div>
      );
    }

    const overallDurationMinutes = calculateTotalDurationMinutes(
      profileData.activities
    );

    const totalTime = formatMinutesAsHrMin(overallDurationMinutes);

    const thisWeekMinutes = calculateLast7DaysDurationMinutes(
      profileData.activities
    );
    const thisWeekTotalTime = formatMinutesAsHrMin(thisWeekMinutes);

    const sortedActivities = sortActivitiesByTotalDuration(
      profileData.activities
    );

    const topLanguage = getTopLanguageShortName(sortedActivities);

    const weeklyTopActivities = getTopWeeklyActivities(profileData.activities);

    const topWeeklyDurationMinutes = sumWeeklyDurations(weeklyTopActivities);

    const streakDays = Math.max(profileData.streak || 0, 1);
    const weeklyAverageMinutes = calculateWeeklyAverageMinutes(
      overallDurationMinutes,
      streakDays
    );
    const totalAverageMinutes = calculateAverageMinutes(
      overallDurationMinutes,
      streakDays
    );

    const bashPoints = profileData.totalPoints;

    return (
      <>
        <h2 className="text-3xl font-semibold text-foreground/80 text-left self-start mb-5 font-heading">
          <span className="text-foreground">{profileData.name}</span>'s Profile
        </h2>

        <ProfileHeader
          name={profileData.name}
          gitUsername={profileData.gitUsername}
          twitterUsername={profileData.twitterUsername}
          profileImage={profileData.profileImage}
          thisWeekTotalTime={thisWeekTotalTime}
        />

        <StatsGrid
          streak={profileData.streak}
          totalTime={totalTime}
          languageCount={profileData.activities.length}
          topLanguage={topLanguage}
          weeklyAverageTime={formatMinutesAsHrMin(weeklyAverageMinutes)}
          totalAverageTime={formatMinutesAsHrMin(totalAverageMinutes)}
          achievementsCount={profileData.achievements.length}
          bashPoints={bashPoints}
        />

        <Achievements
          achievements={profileData.achievements}
          className="mt-6 w-full"
        />

        <WeekStats
          activities={weeklyTopActivities}
          totalDurationMinutes={topWeeklyDurationMinutes}
        />

        <LanguageSection
          activities={sortedActivities}
          totalDurationMinutes={overallDurationMinutes}
        />
      </>
    );
  };

  return (
    <section className="flex justify-center items-start w-full min-h-screen py-10 bg-background relative">
      <div className="flex flex-col justify-start items-start max-w-7xl w-full px-3 relative z-10">
        {renderContent()}
      </div>
    </section>
  );
};

export default DeveloperProfile;
