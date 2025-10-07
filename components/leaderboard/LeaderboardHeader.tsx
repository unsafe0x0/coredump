import React from "react";
import DeveloperCard from "../common/DevloperCard";
import { SiHoneybadger } from "react-icons/si";
import { FiUsers } from "react-icons/fi";
import { GiClockwork } from "react-icons/gi";

interface LeaderboardHeaderProps {
  leaderboardTopper: {
    name: string;
    profileImage: string;
    gitUsername: string;
  };
  leaderboardLength: number;
  remainingTime: string;
}

const LeaderboardHeader: React.FC<LeaderboardHeaderProps> = ({
  leaderboardTopper,
  leaderboardLength,
  remainingTime,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 justify-center items-stretch w-full">
      <div className="flex justify-start items-center bg-card border border-border rounded-md p-5 backdrop-blur-sm gap-5">
        <span className="p-4 bg-gradient-to-br from-accent to-accent/80 rounded-md text-accent-text text-3xl flex-shrink-0">
          <SiHoneybadger />
        </span>
        <div className="flex flex-col justify-center items-start gap-2 min-w-0 flex-1">
          <h2 className="text-lg font-semibold text-foreground font-heading">
            Top Developer
          </h2>
          <div className="w-full">
            {leaderboardTopper ? (
              <DeveloperCard
                name={leaderboardTopper.name}
                profileImage={leaderboardTopper.profileImage}
                gitUsername={leaderboardTopper.gitUsername}
              />
            ) : (
              <p className="text-foreground/80">Loading...</p>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-start items-center bg-card border border-border rounded-md p-5 backdrop-blur-sm gap-5">
        <span className="p-4 bg-gradient-to-br from-accent to-accent/80 rounded-md text-accent-text text-3xl flex-shrink-0">
          <FiUsers />
        </span>
        <div className="flex flex-col justify-center items-start gap-2">
          <h2 className="text-lg font-semibold text-foreground font-heading">
            Total Developers
          </h2>
          <p className="text-2xl font-bold text-foreground">
            {leaderboardLength}
          </p>
        </div>
      </div>
      <div className="flex justify-start items-center bg-card border border-border rounded-md p-5 backdrop-blur-sm gap-5">
        <span className="p-4 bg-gradient-to-br from-accent to-accent/80 rounded-md text-accent-text text-3xl flex-shrink-0">
          <GiClockwork />
        </span>
        <div className="flex flex-col justify-center items-start gap-2">
          <h2 className="text-lg font-semibold text-foreground font-heading">
            Remaining Time
          </h2>
          <p className="text-2xl font-bold text-foreground font-mono">
            {remainingTime}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardHeader;
