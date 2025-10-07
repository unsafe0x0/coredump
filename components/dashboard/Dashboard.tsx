"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaCog } from "react-icons/fa";
import { MdHomeFilled } from "react-icons/md";
import ProfileHeader from "../common/ProfileHeader";
import LanguageSection from "../common/LanguageSection";
import PrivateKeySection from "../common/PrivateKeySection";
import WeekStats from "../common/WeekStats";
import StatsGrid from "../common/StatsGrid";
import Achievements from "../common/Achievements";
import Settings from "./Settings";
import Link from "next/link";
import {
  calculateAverageMinutes,
  calculateLast7DaysDurationMinutes,
  calculateTotalDurationMinutes,
  formatMinutesAsHoursLabel,
  getTopLanguageShortName,
  getTopWeeklyActivities,
  calculateWeeklyAverageMinutes,
  sortActivitiesByTotalDuration,
  sumWeeklyDurations,
} from "@/utils/ActivityMetrics";
import ToggleTheme from "../common/ToggleTheme";

interface LanguageActivity {
  languageName: string;
  shortLanguageName: string;
  totalDuration: number;
  last7DaysDuration: number;
  last24HoursDuration?: number;
}

interface DashboardData {
  name: string;
  gitUsername: string;
  twitterUsername: string;
  profileImage: string;
  streak: number;
  privateKey: string;
  activities: LanguageActivity[];
  achievements: string[];
  totalPoints: number;
}

const fetchDashboardData = async (): Promise<DashboardData> => {
  const response = await fetch("/api/dashboard");
  if (!response.ok) throw new Error("Failed to fetch dashboard data");
  const json = await response.json();
  return json.data;
};

const Dashboard = () => {
  const [showSettings, setShowSettings] = useState(false);

  const {
    data: dashboardData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["dashboard"],
    queryFn: fetchDashboardData,
  });

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center w-full min-h-screen py-20">
          <div className="relative animate-spin w-12 h-12 rounded-full border-t-2 border-border border-solid border-l-transparent" />
        </div>
      );
    }

    if (error || !dashboardData) {
      return (
        <div className="flex justify-center items-center w-full min-h-screen">
          <div className="text-center p-8 bg-card border border-border rounded-md">
            <p className="text-foreground/80 text-lg font-semibold">
              {error ? `Error: ${error.message}` : "No dashboard data found"}
            </p>
          </div>
        </div>
      );
    }
    const totalDurationMinutes = calculateTotalDurationMinutes(
      dashboardData.activities
    );

    const totalTime = formatMinutesAsHoursLabel(totalDurationMinutes, 2);

    const thisWeekMinutes = calculateLast7DaysDurationMinutes(
      dashboardData.activities
    );
    const thisWeekTotalTime = formatMinutesAsHoursLabel(thisWeekMinutes, 2);

    const sortedActivities = sortActivitiesByTotalDuration(
      dashboardData.activities
    );

    const topLanguage = getTopLanguageShortName(sortedActivities);

    const weeklyTopActivities = getTopWeeklyActivities(
      dashboardData.activities
    );
    const weeklyDurationMinutes = sumWeeklyDurations(weeklyTopActivities);

    const streakDays = Math.max(dashboardData.streak || 0, 1);
    const weeklyAverageMinutes = calculateWeeklyAverageMinutes(
      totalDurationMinutes,
      streakDays
    );
    const totalAverageMinutes = calculateAverageMinutes(
      totalDurationMinutes,
      streakDays
    );

    const bashPoints = dashboardData.totalPoints;

    if (showSettings) {
      return (
        <Settings
          onBack={() => setShowSettings(false)}
          userData={dashboardData}
        />
      );
    }

    return (
      <>
        <div className="flex justify-between items-center w-full mb-5">
          <h2 className="text-3xl font-semibold text-foreground/80 text-left font-heading">
            Welcome back,{" "}
            <span className="text-foreground">{dashboardData.name}</span>
          </h2>
          <div className="flex items-center gap-3 justify-end">
            <Link
              href={"/"}
              className="p-3 bg-card border border-border rounded-md text-foreground/80 hover:text-foreground hover:bg-card/80"
            >
              <MdHomeFilled className="text-xl" />
            </Link>
            <ToggleTheme />
            <button
              onClick={() => setShowSettings(true)}
              className="p-3 bg-card border border-border rounded-md text-foreground/80 hover:text-foreground hover:bg-card/80"
            >
              <FaCog className="text-xl" />
            </button>
          </div>
        </div>

        <ProfileHeader
          name={dashboardData.name}
          gitUsername={dashboardData.gitUsername}
          twitterUsername={dashboardData.twitterUsername}
          profileImage={dashboardData.profileImage}
          thisWeekTotalTime={thisWeekTotalTime}
        />

        <PrivateKeySection privateKey={dashboardData.privateKey} />

        <StatsGrid
          streak={dashboardData.streak}
          totalTime={totalTime}
          languageCount={dashboardData.activities.length}
          topLanguage={topLanguage}
          weeklyAverageTime={formatMinutesAsHoursLabel(weeklyAverageMinutes, 1)}
          totalAverageTime={formatMinutesAsHoursLabel(totalAverageMinutes, 1)}
          achievementsCount={dashboardData.achievements.length}
          bashPoints={bashPoints}
        />

        <Achievements achievements={dashboardData.achievements} />

        <WeekStats
          activities={weeklyTopActivities}
          totalDurationMinutes={weeklyDurationMinutes}
        />
        <LanguageSection
          activities={sortedActivities}
          totalDurationMinutes={totalDurationMinutes}
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

export default Dashboard;
