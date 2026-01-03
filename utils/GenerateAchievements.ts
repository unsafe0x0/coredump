import { ACHIEVEMENTS, type Achievement } from "./Achievements";

export function generateAchievements(
	user: { achievements?: string[]; streak?: number | null } & Record<
		string,
		unknown
	>,
	activities: {
		totalDuration?: number | null;
		languageName: string;
		last24HoursDuration?: number | null;
		createdAt: string | Date;
	}[],
): Achievement[] {
	const earned: Achievement[] = [];
	const earnedIds = new Set(user.achievements || []);

	if (!activities || activities.length === 0) return earned;

	const totalHours = activities.reduce(
		(sum, a) => sum + (a.totalDuration || 0),
		0,
	);
	const uniqueLangs = new Set(activities.map((a) => a.languageName));
	const maxSingleSession = Math.max(
		...activities.map((a) => a.totalDuration || 0),
	);
	const maxDailyHours = Math.max(
		...activities.map((a) => a.last24HoursDuration || 0),
	);

	for (const ach of ACHIEVEMENTS) {
		if (earnedIds.has(ach.id)) continue;

		switch (ach.id) {
			case "first-activity":
				if (activities.length > 0) earned.push(ach);
				break;

			case "streak-7":
				if ((user.streak || 0) >= 7) earned.push(ach);
				break;

			case "streak-30":
				if ((user.streak || 0) >= 30) earned.push(ach);
				break;

			case "lang-5":
				if (uniqueLangs.size >= 5) earned.push(ach);
				break;

			case "lang-10":
				if (uniqueLangs.size >= 10) earned.push(ach);
				break;

			case "session-4h":
				if (maxSingleSession >= 4) earned.push(ach);
				break;

			case "early-bird":
				if (
					activities.some((a) => {
						const hour = new Date(a.createdAt).getHours();
						return hour >= 5 && hour < 6;
					})
				)
					earned.push(ach);
				break;

			case "night-owl":
				if (
					activities.some((a) => {
						const hour = new Date(a.createdAt).getHours();
						return hour >= 2 && hour < 4;
					})
				)
					earned.push(ach);
				break;

			case "total-100h":
				if (totalHours >= 100) earned.push(ach);
				break;

			case "day-8h":
				if (maxDailyHours >= 8) earned.push(ach);
				break;

			default:
				break;
		}
	}

	return earned;
}
