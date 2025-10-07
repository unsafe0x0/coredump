export interface ActivityMetricsBase {
  languageName: string;
  shortLanguageName?: string;
  totalDuration: number;
  last7DaysDuration?: number;
  last24HoursDuration?: number;
}

export interface WeeklyActivitySummary {
  languageName: string;
  duration: number;
}

const getDurationValue = <
  T extends ActivityMetricsBase,
  K extends keyof ActivityMetricsBase
>(
  activity: T,
  key: K
): number => {
  const value = activity[key];
  return typeof value === "number" ? value : 0;
};

export const calculateTotalDurationMinutes = <T extends ActivityMetricsBase>(
  activities: T[] = []
): number =>
  activities.reduce(
    (sum, activity) => sum + getDurationValue(activity, "totalDuration"),
    0
  );

export const calculateLast7DaysDurationMinutes = <
  T extends ActivityMetricsBase
>(
  activities: T[] = []
): number =>
  activities.reduce(
    (sum, activity) => sum + getDurationValue(activity, "last7DaysDuration"),
    0
  );

export const calculateAverageMinutes = (
  minutes: number,
  divisor: number
): number => (divisor > 0 ? minutes / divisor : 0);

export const formatMinutesAsHrMin = (minutes: number): string => {
  const total = Math.max(0, Math.round(minutes || 0));
  const h = Math.floor(total / 60);
  const m = total % 60;
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
};

export const calculateWeeklyAverageMinutes = (
  totalMinutes: number,
  streakDays: number
): number => {
  const weeksTracked = Math.max(Math.ceil(Math.max(streakDays, 0) / 7), 1);
  return calculateAverageMinutes(totalMinutes, weeksTracked);
};

export const sortActivitiesByTotalDuration = <T extends ActivityMetricsBase>(
  activities: T[] = []
): T[] => [...activities].sort((a, b) => b.totalDuration - a.totalDuration);

export const getTopLanguageShortName = <T extends ActivityMetricsBase>(
  activities: T[] = [],
  fallback = "N/A"
): string => activities[0]?.shortLanguageName ?? fallback;

export const getTopWeeklyActivities = <T extends ActivityMetricsBase>(
  activities: T[] = [],
  limit = 6
): WeeklyActivitySummary[] =>
  activities
    .map((activity) => ({
      languageName: activity.languageName,
      duration: getDurationValue(activity, "last7DaysDuration"),
    }))
    .filter((activity) => activity.duration > 0)
    .sort((a, b) => b.duration - a.duration)
    .slice(0, limit);

export const sumWeeklyDurations = (
  activities: WeeklyActivitySummary[] = []
): number => activities.reduce((sum, activity) => sum + activity.duration, 0);
