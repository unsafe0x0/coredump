import type React from "react";
import {
  Calendar,
  Clock,
  Code,
  CodeSimple,
  Flame,
  Target,
  TrendUp,
  Trophy,
} from "@phosphor-icons/react";
import StatCard from "./StatCard";

export interface StatsGridProps {
  streak: number;
  maxStreak: number;
  languageCount: number;
  topLanguage: string;
  weeklyAverageTime: string | number;
  totalTime: string | number;
  achievementsCount: number;
  dumpPoints: number;
  className?: string;
}

const StatsGrid: React.FC<StatsGridProps> = ({
  streak,
  maxStreak,
  languageCount,
  topLanguage,
  weeklyAverageTime,
  totalTime,
  achievementsCount,
  dumpPoints,
  className,
}) => {
  const containerClassName = className
    ? `${baseContainerClassName} ${className}`
    : baseContainerClassName;

  const statCards = [
    {
      title: "Streak",
      value: streak,
      icon: <Flame />,
    },
    {
      title: "Max Streak",
      value: maxStreak,
      icon: <Clock />,
    },
    {
      title: "Languages",
      value: languageCount,
      icon: <Code />,
    },
    {
      title: "Top Language",
      value: topLanguage,
      icon: <CodeSimple />,
    },
    {
      title: "This Month",
      value: weeklyAverageTime,
      icon: <Calendar />,
    },
    {
      title: "Total Time",
      value: totalTime,
      icon: <TrendUp />,
    },
    {
      title: "Achievements",
      value: achievementsCount,
      icon: <Trophy />,
    },
    {
      title: "Dump Points",
      value: dumpPoints || 0,
      icon: <Target />,
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
