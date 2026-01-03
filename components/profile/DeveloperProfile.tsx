"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import {
	calculateThisMonthDuration,
	calculateTotalDurationMinutes,
	formatMinutesAsHrMin,
	getTopLanguageShortName,
	sortActivitiesByTotalDuration,
} from "@/utils/ActivityMetrics";
import Achievements from "../common/Achievements";
import Chart from "../common/Chart";
import LanguageSection from "../common/LanguageSection";
import Loader from "../common/Loader";
import ProfileHeader from "../common/ProfileHeader";
import StatsGrid from "../common/StatsGrid";

interface LanguageActivity {
	languageName: string;
	shortLanguageName: string;
	totalDuration: number;
	last7DaysDuration: number;
	last24HoursDuration: number;
}

interface DailyActivity {
	weekDay: number;
	date: string;
	duration: number;
}

interface MonthlyActivity {
	month: number;
	year: number;
	totalDuration: number;
}

interface DeveloperProfileData {
	name: string;
	gitUsername: string;
	twitterUsername: string;
	profileImage: string;
	streak: number;
	maxStreak: number;
	website: string;
	totalPoints: number;
	activities: LanguageActivity[];
	achievements: string[];
	dailyActivity: DailyActivity[];
	monthlyActivity: MonthlyActivity[];
}

const fetchDeveloperData = async (
	username: string,
): Promise<DeveloperProfileData> => {
	const response = await fetch(`/api/profile?username=${username}`);
	if (!response.ok) throw new Error("Failed to fetch developer data");
	const json = await response.json();
	return json.data;
};

const DeveloperProfile = () => {
	const { username } = useParams() as { username: string };

	const {
		data: profileData,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["developer", username],
		queryFn: () => fetchDeveloperData(username),
		enabled: !!username,
	});

	if (isLoading) {
		return (
			<div className="flex justify-center items-center w-full min-h-screen py-20">
				<Loader />
			</div>
		);
	}

	if (error || !profileData) {
		return (
			<div className="flex justify-center items-center w-full min-h-screen">
				<div className="text-center p-8 bg-card border border-border rounded-lg">
					<p className="text-foreground/80 text-lg font-semibold">
						{error
							? `Error: ${(error as Error).message}`
							: "No profile data found"}
					</p>
				</div>
			</div>
		);
	}

	const overallDurationMinutes = calculateTotalDurationMinutes(
		profileData.activities,
	);
	const totalTime = formatMinutesAsHrMin(overallDurationMinutes);
	const sortedActivities = sortActivitiesByTotalDuration(
		profileData.activities,
	);
	const topLanguage = getTopLanguageShortName(sortedActivities);
	const thisMonthMinutes = calculateThisMonthDuration(
		profileData.monthlyActivity,
	);
	const dumpPoints = profileData.totalPoints;

	const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	const dailyMap = Object.fromEntries(
		profileData.dailyActivity.map((d) => [d.weekDay, d.duration]),
	);
	const timeData = daysOfWeek.map((_, i) =>
		formatMinutesAsHrMin(dailyMap[i] ?? 0),
	);

	return (
		<section className="flex justify-center items-start w-full min-h-screen py-10 bg-background relative">
			<div className="flex flex-col justify-start items-start max-w-7xl w-full px-3 relative z-10">
				<h2 className="text-3xl font-semibold text-foreground/80 text-left self-start mb-5 font-heading">
					<span className="text-foreground">{profileData.name}</span>'s Profile
				</h2>

				<ProfileHeader
					name={profileData.name}
					gitUsername={profileData.gitUsername}
					twitterUsername={profileData.twitterUsername}
					profileImage={profileData.profileImage}
					website={profileData.website}
				/>

				<div className="flex flex-col justify-start items-start w-full py-5 rounded-lg bg-card border border-border backdrop-blur-sm mb-5">
					<Chart days={daysOfWeek} timeData={timeData} />
				</div>

				<StatsGrid
					streak={profileData.streak}
					maxStreak={profileData.maxStreak}
					totalTime={totalTime}
					languageCount={profileData.activities.length}
					topLanguage={topLanguage}
					weeklyAverageTime={formatMinutesAsHrMin(thisMonthMinutes)}
					achievementsCount={profileData.achievements.length}
					dumpPoints={dumpPoints}
				/>

				<Achievements
					achievements={profileData.achievements}
					className="mt-6 w-full"
				/>
				<LanguageSection
					activities={sortedActivities}
					totalDurationMinutes={overallDurationMinutes}
				/>
			</div>
		</section>
	);
};

export default DeveloperProfile;
