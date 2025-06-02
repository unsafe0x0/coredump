"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import LeaderBoardData from "./LeaderBoardData";
import LeaderBoarderHeader from "./LeaderBoarderHeader";

const Leaderboard = () => {
  const [allData, setAllData] = useState([]);
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [remainingTime, setRemainingTime] = useState(0);
  const [activeBtn, setActiveBtn] = useState("24Hours");

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/leaderboard");
      setAllData(response.data.data);
    } catch (error) {
      console.log("Something went wrong while fetching data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const sortedData = [...allData].sort((a, b) => {
      const aTime =
        a.activities?.reduce(
          (acc, act) =>
            acc +
            (activeBtn === "7Days"
              ? act.last7DaysDuration || 0
              : act.last24HoursDuration || 0),
          0,
        ) || 0;
      const bTime =
        b.activities?.reduce(
          (acc, act) =>
            acc +
            (activeBtn === "7Days"
              ? act.last7DaysDuration || 0
              : act.last24HoursDuration || 0),
          0,
        ) || 0;
      return bTime - aTime;
    });
    setLeaderboardData(sortedData);
  }, [activeBtn, allData]);

  useEffect(() => {
    const calculateRemainingTime = () => {
      const now = new Date();
      const targetDate = new Date();

      if (activeBtn === "24Hours") {
        targetDate.setDate(now.getDate() + 1);
        targetDate.setHours(0, 0, 0, 0);
      } else if (activeBtn === "7Days") {
        const daysUntilSunday = 7 - now.getDay();
        targetDate.setDate(now.getDate() + daysUntilSunday);
        targetDate.setHours(0, 0, 0, 0);
      }

      const diffInSeconds = Math.floor(
        (targetDate.getTime() - now.getTime()) / 1000,
      );
      if (diffInSeconds <= 0) return "00:00:00";

      const hours = Math.floor(diffInSeconds / 3600);
      const minutes = Math.floor((diffInSeconds % 3600) / 60);
      const seconds = diffInSeconds % 60;

      return `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    };

    setRemainingTime(calculateRemainingTime());
    const timer = setInterval(() => {
      setRemainingTime(calculateRemainingTime());
    }, 1000);

    return () => clearInterval(timer);
  }, [activeBtn]);

  return (
    <section className="flex flex-col justify-start items-center w-full min-h-screen">
      <div className="flex flex-col justify-start items-center lg:container px-3 w-full h-full">
        <div className="flex justify-end items-center mt-5 mb-5 self-end p-0.5 bg-neutral-900/80 rounded-lg">
          <button
            onClick={() => setActiveBtn("24Hours")}
            className={`px-3 py-1 text-md font-normal cursor-pointer rounded-lg hover:bg-green-600/80 border transition-all duration-300 ease-in-out flex items-center gap-1 ${
              activeBtn === "24Hours"
                ? "bg-green-600/90 border-green-600/90"
                : "bg-neutral-900/80 border-neutral-700/50"
            }`}
          >
            Today
          </button>
          <button
            onClick={() => setActiveBtn("7Days")}
            className={`px-3 py-1 text-md font-normal cursor-pointer rounded-lg hover:bg-green-600/80 border transition-all duration-300 ease-in-out flex items-center gap-1 ${
              activeBtn === "7Days"
                ? "bg-green-600/90 border-green-600/90"
                : "bg-neutral-900/80 border-neutral-700/50"
            }`}
          >
            This Week
          </button>
        </div>
        <LeaderBoarderHeader
          leaderboardTopData={leaderboardData[0]}
          leaderboardLength={leaderboardData.length}
          remainingTime={remainingTime}
        />
        <div className="flex justify-start items-center w-full bg-neutral-800/90 px-5 py-3 border-b border-neutral-700/50 mt-2 rounded-t-lg">
          <p className="text-xl font-medium text-white/80">
            {activeBtn === "24Hours"
              ? "Today's Leaderboard"
              : "This Week's Leaderboard"}
          </p>
        </div>
        <LeaderBoardData
          LeaderboardData={leaderboardData}
          activeBtn={activeBtn}
        />
      </div>
    </section>
  );
};

export default Leaderboard;
