"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaFireAlt, FaCog } from "react-icons/fa";
import { GiClockwork } from "react-icons/gi";
import { RiCodeSSlashLine } from "react-icons/ri";
import { MdHomeFilled } from "react-icons/md";
import { GoCodeOfConduct } from "react-icons/go";
import ProfileHeader from "../ProfileHeader";
import StatCard from "../StatCard";
import LanguageSection from "../LanguageSection";
import PrivateKeySection from "../PrivateKeySection";
import Settings from "./Settings";
import Link from "next/link";

interface LanguageActivity {
  languageName: string;
  shortLanguageName: string;
  totalDuration: number;
  last7DaysDuration: number;
}

interface DashboardData {
  name: string;
  gitUsername: string;
  twitterUsername: string;
  profileImage: string;
  streak: number;
  privateKey: string;
  activities: LanguageActivity[];
  joinedDate: string;
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

  console.log("Dashboard Data:", dashboardData);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center w-full min-h-screen py-20">
          <div className="relative animate-spin w-12 h-12 rounded-full border-t-2 border-white/80 border-solid border-l-transparent" />
        </div>
      );
    }

    if (error || !dashboardData) {
      return (
        <div className="flex justify-center items-center w-full min-h-screen">
          <div className="text-center p-8 bg-neutral-900 rounded-lg">
            <p className="text-neutral-400 text-lg font-semibold">
              {error ? `Error: ${error.message}` : "No dashboard data found"}
            </p>
          </div>
        </div>
      );
    }
    const totalDurationMinutes = dashboardData.activities.reduce(
      (sum, activity) => sum + activity.totalDuration,
      0,
    );

    const totalTime = (totalDurationMinutes / 60).toFixed(2);

    const thisWeekTotalTime = (
      dashboardData.activities.reduce(
        (sum, activity) => sum + activity.last7DaysDuration,
        0,
      ) / 60
    ).toFixed(2);

    const sortedActivities = [...dashboardData.activities].sort(
      (a, b) => b.totalDuration - a.totalDuration,
    );

    const topLanguageActivity = sortedActivities[0];
    const topLanguage = topLanguageActivity?.shortLanguageName || "N/A";

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
          <h2 className="text-3xl font-semibold text-neutral-300 text-left font-heading">
            Welcome back,{" "}
            <span className="text-white">{dashboardData.name}</span>
          </h2>
          <div className="flex items-center gap-3 justify-end">
            <Link
              href={"/"}
              className="p-3 bg-neutral-900 rounded-lg text-neutral-300 hover:text-white hover:bg-neutral-800"
            >
              <MdHomeFilled className="text-xl" />
            </Link>
            <button
              onClick={() => setShowSettings(true)}
              className="p-3 bg-neutral-900 rounded-lg text-neutral-300 hover:text-white hover:bg-neutral-800"
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
          joinedDate={dashboardData.joinedDate}
        />

        <PrivateKeySection privateKey={dashboardData.privateKey} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-5 w-full">
          <StatCard
            icon={<FaFireAlt />}
            title="Streak"
            value={dashboardData.streak}
          />
          <StatCard
            icon={<GiClockwork />}
            title="Total Time"
            value={`${totalTime}hr`}
          />
          <StatCard
            icon={<RiCodeSSlashLine />}
            title="Languages"
            value={dashboardData.activities.length}
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

export default Dashboard;
