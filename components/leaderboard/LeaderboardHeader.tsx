import type React from "react";
import { ClockCountdown, CrownSimple, Users } from "@phosphor-icons/react";
import DeveloperCard from "../common/DevloperCard";

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
      <div className="flex justify-start items-center bg-card border border-border rounded-lg p-5 gap-5">
        <span className="p-4 bg-accent-subtle rounded-lg text-accent text-3xl flex">
          <CrownSimple />
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
      <div className="flex justify-start items-center bg-card border border-border rounded-lg p-5 gap-5">
        <span className="p-4 bg-accent-subtle rounded-lg text-accent text-3xl flex">
          <Users />
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
      <div className="flex justify-start items-center bg-card border border-border rounded-lg p-5 gap-5">
        <span className="p-4 bg-accent-subtle rounded-lg text-accent text-3xl flex">
          <ClockCountdown />
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
