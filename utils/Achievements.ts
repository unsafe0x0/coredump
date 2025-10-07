export type Achievement = {
  id: string;
  title: string;
  description: string;
  points: number;
  icon?: string;
  criteria: string;
  criteriaType:
    | "streak"
    | "language"
    | "time"
    | "language_count"
    | "session_day_total";
  field?: string;
};

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "first-activity",
    title: "First Activity",
    description: "Record your very first coding activity",
    points: 10,
    icon: "/achievements/first-activity.svg",
    criteria: "record_first_activity",
    criteriaType: "time",
    field: "activities",
  },
  {
    id: "streak-7",
    title: "7-Day Streak",
    description: "Log coding activity for 7 days in a row",
    points: 50,
    icon: "/achievements/streak-7.svg",
    criteria: "streak_7_days",
    criteriaType: "streak",
    field: "streak",
  },
  {
    id: "streak-30",
    title: "30-Day Streak",
    description: "Keep your streak alive for 30 consecutive days",
    points: 250,
    icon: "/achievements/streak-30.svg",
    criteria: "streak_30_days",
    criteriaType: "streak",
    field: "streak",
  },
  {
    id: "lang-5",
    title: "Language Explorer",
    description: "Record activity in 5 different programming languages",
    points: 75,
    icon: "/achievements/lang-5.svg",
    criteria: "languages_5",
    criteriaType: "language_count",
    field: "languageName",
  },
  {
    id: "lang-10",
    title: "Polyglot",
    description: "Record activity in 10 different programming languages",
    points: 200,
    icon: "/achievements/lang-10.svg",
    criteria: "languages_10",
    criteriaType: "language_count",
    field: "languageName",
  },
  {
    id: "session-4h",
    title: "Marathon Session",
    description: "Single coding session of 4 hours or more",
    points: 100,
    icon: "/achievements/session-4h.svg",
    criteria: "session_4_hours",
    criteriaType: "time",
    field: "totalDuration",
  },
  {
    id: "early-bird",
    title: "Early Bird",
    description: "Log activity between 5:00 - 6:00 AM local time",
    points: 20,
    icon: "/achievements/early-bird.svg",
    criteria: "time_between_5_6",
    criteriaType: "time",
    field: "createdAt",
  },
  {
    id: "night-owl",
    title: "Night Owl",
    description: "Log activity between 2:00 - 4:00 AM local time",
    points: 20,
    icon: "/achievements/night-owl.svg",
    criteria: "time_between_2_4",
    criteriaType: "time",
    field: "createdAt",
  },
  {
    id: "total-100h",
    title: "Century Coder",
    description: "Accumulate 100 hours of recorded coding time",
    points: 300,
    icon: "/achievements/century-coder.svg",
    criteria: "total_time_100_hours",
    criteriaType: "time",
    field: "last7DaysDuration",
  },
  {
    id: "day-8h",
    title: "Daily Marathon",
    description: "Have a single day with 8 or more hours of coding",
    points: 120,
    icon: "/achievements/daily-marathon.svg",
    criteria: "day_total_8_hours",
    criteriaType: "session_day_total",
    field: "last24HoursDuration",
  },
];

export default ACHIEVEMENTS;
