import type React from "react";
import { FaFireAlt } from "react-icons/fa";
import { GiClockwork } from "react-icons/gi";
import { LuCalendarRange, LuWaypoints } from "react-icons/lu";
import { MdOutlineEmojiEvents } from "react-icons/md";
import { RiCodeSSlashLine } from "react-icons/ri";
import { SiCodeclimate } from "react-icons/si";
import { TbTrendingUp } from "react-icons/tb";
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
			icon: <FaFireAlt />,
		},
		{
			title: "Max Streak",
			value: maxStreak,
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
			title: "This Month",
			value: weeklyAverageTime,
			icon: <LuCalendarRange />,
		},
		{
			title: "Total Time",
			value: totalTime,
			icon: <TbTrendingUp />,
		},
		{
			title: "Achievements",
			value: achievementsCount,
			icon: <MdOutlineEmojiEvents />,
		},
		{
			title: "Dump Points",
			value: dumpPoints || 0,
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
