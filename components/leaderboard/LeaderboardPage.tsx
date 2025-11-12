"use client";
import React, { useState, useEffect, useMemo } from "react";
import LeaderboardHeader from "./LeaderboardHeader";
import LeaderboardTable from "./LeaderboardTable";
import { useQuery } from "@tanstack/react-query";
import {
  getRemainingTimeLabel,
  type LeaderboardRange,
} from "@/utils/TimeUtilities";

const LeaderboardPage = () => {
  const [remainingTime, setRemainingTime] = useState("00:00:00");
  const [activeButton, setActiveButton] = useState<LeaderboardRange>("24Hours");

  const {
    data: allData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["leaderboard"],
    queryFn: async () => {
      const response = await fetch("/api/leaderboard");
      if (!response.ok) throw new Error("Network response was not ok");
      const res = await response.json();
      return res.data;
    },
  });

  useEffect(() => {
    const updateRemainingTime = () => {
      setRemainingTime(getRemainingTimeLabel(activeButton));
    };

    updateRemainingTime();

    const timer = setInterval(updateRemainingTime, 1000);
    return () => clearInterval(timer);
  }, [activeButton]);

  const sortedData = useMemo(() => {
    if (!Array.isArray(allData)) return [];
    return [...allData].sort((a, b) => {
      const getTimeSum = (user: any) =>
        user.activities?.reduce(
          (sum: number, act: any) =>
            sum +
            (activeButton === "7Days"
              ? act.last7DaysDuration || 0
              : act.last24HoursDuration || 0),
          0,
        ) || 0;
      return getTimeSum(b) - getTimeSum(a);
    });
  }, [activeButton, allData]);

  return (
    <section className="flex justify-center items-start w-full min-h-screen py-20 relative">
      <div className="flex flex-col justify-start items-center w-full max-w-7xl px-3 gap-5 relative z-10">
        <div className="flex justify-end items-center self-end p-0.5 bg-background backdrop-blur-sm rounded-md">
          <button
            className={`px-3 py-1 rounded-md text-base font-normal border border-border cursor-pointer ${
              activeButton === "24Hours"
                ? "bg-accent text-accent-text"
                : "bg-card text-foreground hover:bg-accent hover:text-accent-text"
            }`}
            onClick={() => setActiveButton("24Hours")}
          >
            Today
          </button>
          <button
            className={`px-3 py-1 rounded-md text-base font-normal border border-border cursor-pointer ${
              activeButton === "7Days"
                ? "bg-accent text-accent-text"
                : "bg-card text-foreground hover:bg-accent hover:text-accent-text"
            }`}
            onClick={() => setActiveButton("7Days")}
          >
            This Week
          </button>
        </div>
        <LeaderboardHeader
          remainingTime={remainingTime}
          leaderboardLength={sortedData.length}
          leaderboardTopper={sortedData[0] || null}
        />
        <div className="flex justify-start items-start w-full bg-background backdrop-blur-sm px-5 py-2 rounded-md">
          <h2 className="text-2xl font-semibold text-foreground font-heading">
            {activeButton === "24Hours"
              ? "Today's Leaderboard"
              : "This Week's Leaderboard"}
          </h2>
        </div>
        <LeaderboardTable
          leaderboardData={sortedData}
          activeButton={activeButton}
        />
      </div>
    </section>
  );
};

export default LeaderboardPage;
