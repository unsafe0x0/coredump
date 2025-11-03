export type LeaderboardRange = "24Hours" | "7Days";

const padToTwoDigits = (value: number): string =>
  value.toString().padStart(2, "0");

const getTomorrowMidnightUTC = (reference: Date): Date => {
  const target = new Date(reference);
  target.setUTCDate(target.getUTCDate() + 1);
  target.setUTCHours(0, 0, 0, 0);
  return target;
};

const getUpcomingWeekStartUTC = (
  reference: Date,
  weekStartsOn: number
): Date => {
  const target = new Date(reference);
  target.setUTCHours(0, 0, 0, 0);

  const day = target.getUTCDay();
  const normalizedWeekStart = ((weekStartsOn % 7) + 7) % 7;
  const offsetToWeekStart = (7 - ((day - normalizedWeekStart + 7) % 7)) % 7;

  const daysUntilNextWeekStart =
    offsetToWeekStart === 0 && reference >= target ? 7 : offsetToWeekStart;

  if (daysUntilNextWeekStart > 0) {
    target.setUTCDate(target.getUTCDate() + daysUntilNextWeekStart);
  }

  return target;
};

const getTargetResetDateUTC = (
  mode: LeaderboardRange,
  reference: Date
): Date => {
  if (mode === "24Hours") {
    return getTomorrowMidnightUTC(reference);
  }
  return getUpcomingWeekStartUTC(reference, 1);
};

export const getRemainingTimeLabel = (
  mode: LeaderboardRange,
  now = new Date()
): string => {
  const target = getTargetResetDateUTC(mode, now);
  const diffSeconds = Math.floor((target.getTime() - now.getTime()) / 1000);

  if (diffSeconds <= 0) {
    return "00:00:00";
  }

  const hours = Math.floor(diffSeconds / 3600);
  const minutes = Math.floor((diffSeconds % 3600) / 60);
  const seconds = diffSeconds % 60;

  return `${padToTwoDigits(hours)}:${padToTwoDigits(minutes)}:${padToTwoDigits(
    seconds
  )}`;
};
