"use client";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import {
  getRemainingTimeLabel,
  type LeaderboardRange,
} from "@/utils/TimeUtilities";
import LeaderboardHeader from "./LeaderboardHeader";
import LeaderboardTable from "./LeaderboardTable";

const LeaderboardPage = () => {
  const [remainingTime, setRemainingTime] = useState("00:00:00");
  const [activeButton, setActiveButton] = useState<LeaderboardRange>("24Hours");

  const { data: allData } = useQuery({
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
      const getTimeSum = (user: {
        activities?: {
          last7DaysDuration?: number;
          last24HoursDuration?: number;
        }[];
      }) =>
        user.activities?.reduce(
          (
            sum: number,
            act: { last7DaysDuration?: number; last24HoursDuration?: number },
          ) =>
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
    <section className="flex justify-center items-start w-full min-h-screen py-20">
      <div className="flex flex-col justify-start items-center w-full max-w-7xl px-4 gap-6">
        <div className="flex justify-end items-center self-end p-1 bg-card border border-border rounded-xl">
          <button
            type="button"
            className={`px-4 py-1.5 rounded-lg text-sm font-semibold border border-border cursor-pointer transition-colors ${
              activeButton === "24Hours"
                ? "bg-foreground text-background border-foreground"
                : "bg-card text-foreground hover:bg-foreground hover:text-background"
            }`}
            onClick={() => setActiveButton("24Hours")}
          >
            Today
          </button>
          <button
            type="button"
            className={`px-4 py-1.5 rounded-lg text-sm font-semibold border border-border cursor-pointer transition-colors ${
              activeButton === "7Days"
                ? "bg-foreground text-background border-foreground"
                : "bg-card text-foreground hover:bg-foreground hover:text-background"
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
        <div className="flex justify-start items-start w-full bg-card border border-border px-5 py-3 rounded-xl">
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
