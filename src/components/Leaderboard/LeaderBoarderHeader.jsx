"use client";
import React from "react";
import { SiHoneybadger } from "react-icons/si";
import { FiUsers } from "react-icons/fi";
import { GiStopwatch } from "react-icons/gi";
import DeveloperCard from "./DeveloperCard";

const LeaderBoarderHeader = ({
  leaderboardTopData,
  leaderboardLength,
  remainingTime,
}) => {
  return (
    <div className="mb-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 justify-center items-stretch w-full">
      <div className="flex justify-center items-center w-full rounded-md bg-neutral-800/50 backdrop-blur-2xl p-3 gap-5">
        <span className="text-4xl text-yellow-500/90 p-1.5 rounded-md bg-yellow-600/10">
          <SiHoneybadger />
        </span>
        <div className="flex flex-col justify-start items-start w-full gap-2">
          <h2 className="text-xl font-medium  text-neutral-300">
            Top Performer
          </h2>
          <div className="flex items-center gap-2">
            {leaderboardTopData ? (
              <DeveloperCard developerData={leaderboardTopData} />
            ) : (
              <span className="text-neutral-400 text-lg font-normal">
                Loading...
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center w-full rounded-md bg-neutral-800/50 backdrop-blur-2xl p-3 gap-5">
        <span className="text-4xl text-rose-500/90 p-1.5 rounded-md bg-rose-600/10">
          <FiUsers />
        </span>
        <div className="flex flex-col justify-start items-start w-full gap-2">
          <h2 className="text-xl font-medium  text-neutral-300">
            Total Competitors
          </h2>
          <div className="flex items-center gap-2">
            <span className="text-neutral-400 text-xl font-medium">
              {leaderboardLength}
            </span>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center w-full rounded-md bg-neutral-800/50 backdrop-blur-2xl p-3 gap-5">
        <span className="text-4xl text-green-600/90 p-1.5 rounded-md bg-green-600/10">
          <GiStopwatch />
        </span>
        <div className="flex flex-col justify-start items-start w-full gap-2">
          <h2 className="text-xl font-medium  text-neutral-300">
            Remaining Time
          </h2>
          <div className="flex items-center gap-2">
            <span className="text-neutral-400 text-xl font-medium">
              {remainingTime}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderBoarderHeader;
