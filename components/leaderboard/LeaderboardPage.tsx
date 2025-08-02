"use client";
import React, { useState, useEffect, useMemo } from "react";
import LeaderboardHeader from "./LeaderboardHeader";
import LeaderboardTable from "./LeaderboardTable";
import { useQuery } from "@tanstack/react-query";

const LeaderboardPage = () => {
  const [remainingTime, setRemainingTime] = useState("00:00:00");
  const [activeButton, setActiveButton] = useState("24Hours");

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
    const calculateRemainingTime = () => {
      const now = new Date();
      const target = new Date();
      if (activeButton === "24Hours") {
        target.setDate(now.getDate() + 1);
        target.setHours(0, 0, 0, 0);
      } else {
        const daysUntilSunday = 7 - now.getDay();
        target.setDate(now.getDate() + daysUntilSunday);
        target.setHours(0, 0, 0, 0);
      }
      const diff = Math.floor((target.getTime() - now.getTime()) / 1000);
      if (diff <= 0) return "00:00:00";
      const h = String(Math.floor(diff / 3600)).padStart(2, "0");
      const m = String(Math.floor((diff % 3600) / 60)).padStart(2, "0");
      const s = String(diff % 60).padStart(2, "0");
      return `${h}:${m}:${s}`;
    };

    setRemainingTime(calculateRemainingTime());
    const timer = setInterval(() => {
      setRemainingTime(calculateRemainingTime());
    }, 1000);
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
          0
        ) || 0;
      return getTimeSum(b) - getTimeSum(a);
    });
  }, [activeButton, allData]);

  return (
    <section className="flex justify-center items-start w-full min-h-screen py-20 relative">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      <div className="flex flex-col justify-start items-center w-full lg:container px-3 gap-5 relative z-10">
        <div className="flex justify-end items-center self-end p-0.5 bg-neutral-900 backdrop-blur-sm rounded-md">
          <button
            className={`px-3 py-1 rounded-md text-base font-normal border border-neutral-700/50 cursor-pointer ${
              activeButton === "24Hours"
                ? "bg-neutral-100 text-neutral-800"
                : "bg-neutral-white text-neutral-100 hover:bg-neutral-100 hover:text-neutral-800"
            }`}
            onClick={() => setActiveButton("24Hours")}
          >
            24 Hours
          </button>
          <button
            className={`px-3 py-1 rounded-md text-base font-normal border border-neutral-700/50 cursor-pointer ${
              activeButton === "7Days"
                ? "bg-neutral-100 text-neutral-800"
                : "bg-neutral-white text-neutral-100 hover:bg-neutral-100 hover:text-neutral-800"
            }`}
            onClick={() => setActiveButton("7Days")}
          >
            7 Days
          </button>
        </div>
        <LeaderboardHeader
          remainingTime={remainingTime}
          leaderboardLength={sortedData.length}
          leaderboardTopper={sortedData[0] || null}
        />
        <div className="flex justify-start items-start w-full bg-neutral-900 backdrop-blur-sm px-5 py-2 rounded-lg">
          <h2 className="text-2xl font-semibold text-white font-heading">
            {activeButton === "24Hours"
              ? "Leaderboard for Last 24 Hours"
              : "Leaderboard for Last 7 Days"}
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
