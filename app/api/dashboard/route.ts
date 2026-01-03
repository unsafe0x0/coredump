import { addDays, endOfWeek, startOfWeek } from "date-fns";
import { type NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import dbClient from "@/prisma/DbClient";
import { authOptions } from "../auth/[...nextauth]/options";

export async function GET(_req: NextRequest) {
	try {
		const session = await getServerSession(authOptions);

		if (!session?.user?.id) {
			return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
		}

		const today = new Date();
		const start = startOfWeek(today, { weekStartsOn: 1 });
		const end = endOfWeek(today, { weekStartsOn: 1 });

		const user = await dbClient.user.findUnique({
			where: { id: session.user.id },
			select: {
				id: true,
				name: true,
				email: true,
				gitUsername: true,
				twitterUsername: true,
				website: true,
				profileImage: true,
				privateKey: true,
				role: true,
				streak: true,
				maxStreak: true,
				totalPoints: true,
				achievements: true,
				createdAt: true,
				updatedAt: true,
				activities: {
					select: {
						languageName: true,
						shortLanguageName: true,
						totalDuration: true,
						last24HoursDuration: true,
						last7DaysDuration: true,
						last30DaysDuration: true,
					},
				},
				dailyActivity: {
					where: {
						date: {
							gte: start,
							lte: end,
						},
					},
					select: {
						weekDay: true,
						date: true,
						duration: true,
					},
				},
				monthlyActivity: {
					select: {
						month: true,
						year: true,
						totalDuration: true,
					},
				},
			},
		});

		if (!user) {
			return NextResponse.json({ message: "User not found" }, { status: 404 });
		}

		const monthMap: Record<string, number> = {
			JANUARY: 0,
			FEBRUARY: 1,
			MARCH: 2,
			APRIL: 3,
			MAY: 4,
			JUNE: 5,
			JULY: 6,
			AUGUST: 7,
			SEPTEMBER: 8,
			OCTOBER: 9,
			NOVEMBER: 10,
			DECEMBER: 11,
		};

		const fullWeek = Array.from({ length: 7 }).map((_, i) => {
			const date = addDays(start, i);
			const existing = user.dailyActivity.find(
				(d) => new Date(d.date).toDateString() === date.toDateString(),
			);
			return {
				weekDay: date.getDay(),
				date: date.toISOString(),
				duration: existing?.duration ?? 0,
			};
		});

		const normalizedUser = {
			...user,
			streak: user.streak ?? 0,
			maxStreak: user.maxStreak ?? 0,
			totalPoints: user.totalPoints ?? 0,
			achievements: user.achievements ?? [],
			activities: user.activities.map((a) => ({
				languageName: a.languageName ?? "Unknown",
				shortLanguageName: a.shortLanguageName ?? "NULL",
				totalDuration: a.totalDuration ?? 0,
				last24HoursDuration: a.last24HoursDuration ?? 0,
				last7DaysDuration: a.last7DaysDuration ?? 0,
				last30DaysDuration: a.last30DaysDuration ?? 0,
			})),
			dailyActivity: fullWeek,
			monthlyActivity: user.monthlyActivity.map((m) => ({
				month: monthMap[m.month],
				year: m.year,
				totalDuration: m.totalDuration ?? 0,
			})),
		};

		return NextResponse.json(
			{ message: "Dashboard data fetched successfully", data: normalizedUser },
			{ status: 200 },
		);
	} catch (error) {
		console.error("Error fetching dashboard data:", error);
		return NextResponse.json(
			{ message: "Something went wrong" },
			{ status: 500 },
		);
	}
}
