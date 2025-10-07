import React from "react";
import { FaFireAlt } from "react-icons/fa";
import { GiClockwork } from "react-icons/gi";
import { RiCodeSSlashLine } from "react-icons/ri";
import { LuCalendarRange } from "react-icons/lu";
import { TbTrendingUp } from "react-icons/tb";
import { MdOutlineEmojiEvents } from "react-icons/md";
import { SiCodeclimate } from "react-icons/si";
import { LuWaypoints } from "react-icons/lu";
import StatCard from "./StatCard";

export interface StatsGridProps {
  streak: number;
  totalTime: string | number;
  languageCount: number;
  topLanguage: string;
  weeklyAverageTime: string | number;
  totalAverageTime: string | number;
  achievementsCount: number;
  bashPoints: number;
  className?: string;
}

const StatsGrid: React.FC<StatsGridProps> = ({
  streak,
  totalTime,
  languageCount,
  topLanguage,
  weeklyAverageTime,
  totalAverageTime,
  achievementsCount,
  bashPoints,
  className,
}) => {
  const containerClassName = className
    ? `${baseContainerClassName} ${className}`
    : baseContainerClassName;

  const statCards = [
    {
      title: "Streak",
      value: streak,
      icon: <FaFireAlt />,
    },
    {
      title: "Total Time",
      value: totalTime,
      icon: <GiClockwork />,
    },
    {
      title: "Languages",
      value: languageCount,
      icon: <RiCodeSSlashLine />,
    },
    {
      title: "Top Language",
      value: topLanguage,
      icon: <SiCodeclimate />,
    },
    {
      title: "Weekly Avg Time",
      value: weeklyAverageTime,
      icon: <LuCalendarRange />,
    },
    {
      title: "Total Avg Time",
      value: totalAverageTime,
      icon: <TbTrendingUp />,
    },
    {
      title: "Achievements",
      value: achievementsCount,
      icon: <MdOutlineEmojiEvents />,
    },
    {
      title: "Bash Points",
      value: bashPoints || 0,
      icon: <LuWaypoints />,
    },
  ];

  return (
    <div className={containerClassName}>
      {statCards.map((card) => (
        <StatCard
          key={card.title}
          icon={card.icon}
          title={card.title}
          value={card.value}
        />
      ))}
    </div>
  );
};

const baseContainerClassName =
  "grid grid-cols-1 gap-5 mb-5 w-full md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4";

export default StatsGrid;
