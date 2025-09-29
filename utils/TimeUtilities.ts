export type LeaderboardRange = "24Hours" | "7Days";

const padToTwoDigits = (value: number): string => value.toString().padStart(2, "0");

const getTomorrowMidnight = (reference: Date): Date => {
  const target = new Date(reference);
  target.setDate(target.getDate() + 1);
  target.setHours(0, 0, 0, 0);
  return target;
};

const getUpcomingWeekStart = (reference: Date, weekStartsOn: number): Date => {
  const target = new Date(reference);
  target.setHours(0, 0, 0, 0);

  const day = target.getDay();
  const normalizedWeekStart = ((weekStartsOn % 7) + 7) % 7;
  const offsetToWeekStart = (7 - ((day - normalizedWeekStart + 7) % 7)) % 7;

  const daysUntilNextWeekStart =
    offsetToWeekStart === 0 && reference >= target ? 7 : offsetToWeekStart;

  if (daysUntilNextWeekStart > 0) {
    target.setDate(target.getDate() + daysUntilNextWeekStart);
  }

  return target;
};

const getTargetResetDate = (mode: LeaderboardRange, reference: Date): Date => {
  if (mode === "24Hours") {
    return getTomorrowMidnight(reference);
  }
  return getUpcomingWeekStart(reference, 1);
};

export const getRemainingTimeLabel = (
  mode: LeaderboardRange,
  now = new Date(),
): string => {
  const target = getTargetResetDate(mode, now);
  const diffSeconds = Math.floor((target.getTime() - now.getTime()) / 1000);

  if (diffSeconds <= 0) {
    return "00:00:00";
  }

  const hours = Math.floor(diffSeconds / 3600);
  const minutes = Math.floor((diffSeconds % 3600) / 60);
  const seconds = diffSeconds % 60;

  return `${padToTwoDigits(hours)}:${padToTwoDigits(minutes)}:${padToTwoDigits(seconds)}`;
};
