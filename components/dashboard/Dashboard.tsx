"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { MdOutlineSettings } from "react-icons/md";
import { MdHomeFilled } from "react-icons/md";
import Link from "next/link";
import ProfileHeader from "../common/ProfileHeader";
import LanguageSection from "../common/LanguageSection";
import PrivateKeySection from "../common/PrivateKeySection";
import Chart from "../common/Chart";
import WeekStats from "../common/WeekStats";
import StatsGrid from "../common/StatsGrid";
import Achievements from "../common/Achievements";
import Settings from "./Settings";
import ToggleTheme from "../common/ToggleTheme";
import {
  calculateAverageMinutes,
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
  last24HoursDuration?: number;
}

interface DailyActivity {
  weekDay: number;
  date: string;
  duration: number;
}

interface WeeklyActivity {
  weekStartDay: string;
  totalDuration: number;
}

interface DashboardData {
  id: string;
  name: string;
  email: string;
  gitUsername: string;
  twitterUsername: string;
  website?: string;
  profileImage: string;
  privateKey: string;
  streak: number;
  totalPoints: number;
  achievements: string[];
  activities: LanguageActivity[];
  dailyActivity: DailyActivity[];
  weeklyActivity: WeeklyActivity[];
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
            {error
              ? `Error: ${(error as Error).message}`
              : "No dashboard data found"}
          </p>
        </div>
      </div>
    );
  }

  if (showSettings) {
    return (
      <Settings
        onBack={() => setShowSettings(false)}
        userData={dashboardData}
      />
    );
  }

  const totalDurationMinutes = calculateTotalDurationMinutes(
    dashboardData.activities,
  );
  const totalTime = formatMinutesAsHrMin(totalDurationMinutes);
  const sortedActivities = sortActivitiesByTotalDuration(
    dashboardData.activities,
  );
  const topLanguage = getTopLanguageShortName(sortedActivities);
  const weeklyTopActivities = getTopWeeklyActivities(dashboardData.activities);
  const weeklyDurationMinutes = sumWeeklyDurations(weeklyTopActivities);
  const streakDays = Math.max(dashboardData.streak, 1);
  const weeklyAverageMinutes = calculateWeeklyAverageMinutes(
    totalDurationMinutes,
    streakDays,
  );
  const totalAverageMinutes = calculateAverageMinutes(
    totalDurationMinutes,
    streakDays,
  );
  const dumpPoints = dashboardData.totalPoints;

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dailyMap = Object.fromEntries(
    dashboardData.dailyActivity.map((d) => [d.weekDay, d.duration]),
  );
  const timeData = daysOfWeek.map((_, i) =>
    formatMinutesAsHrMin(dailyMap[i] ?? 0),
  );

  return (
    <section className="flex justify-center items-start w-full min-h-screen py-10 bg-background">
      <div className="flex flex-col justify-start items-start max-w-7xl w-full px-3">
        <div className="flex justify-between items-center w-full mb-5">
          <h2 className="text-3xl font-semibold text-foreground/80 text-left font-heading">
            Welcome back,{" "}
            <span className="text-foreground">{dashboardData.name}</span>
          </h2>
          <div className="flex items-center gap-3 justify-end">
            <Link
              href={"/"}
              className="text-foreground/80 hover:text-foreground"
            >
              <MdHomeFilled size={22} />
            </Link>
            <ToggleTheme />
            <button
              onClick={() => setShowSettings(true)}
              className="text-foreground/80 hover:text-foreground"
            >
              <MdOutlineSettings size={22} />
            </button>
          </div>
        </div>

        <ProfileHeader
          name={dashboardData.name}
          gitUsername={dashboardData.gitUsername}
          twitterUsername={dashboardData.twitterUsername}
          profileImage={dashboardData.profileImage}
          website={dashboardData.website}
        />

        <PrivateKeySection privateKey={dashboardData.privateKey} />

        <div className="flex flex-col justify-start items-start w-full py-5 rounded-md bg-card border border-border backdrop-blur-sm mb-5">
          <Chart days={daysOfWeek} timeData={timeData} />
        </div>

        <StatsGrid
          streak={dashboardData.streak}
          totalTime={totalTime}
          languageCount={dashboardData.activities.length}
          topLanguage={topLanguage}
          weeklyAverageTime={formatMinutesAsHrMin(weeklyAverageMinutes)}
          totalAverageTime={formatMinutesAsHrMin(totalAverageMinutes)}
          achievementsCount={dashboardData.achievements.length}
          dumpPoints={dumpPoints}
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
      </div>
    </section>
  );
};

export default Dashboard;
