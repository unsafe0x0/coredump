"use client";

import { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface ChartProps {
  days: string[];
  timeData: string[];
}

const fullDayNames = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const shortDayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const parseDurationToMinutes = (raw: string) => {
  const hourMatch = raw.match(/(\d+)h/);
  const minMatch = raw.match(/(\d+)m/);
  const hours = hourMatch ? parseInt(hourMatch[1], 10) : 0;
  const minutes = minMatch ? parseInt(minMatch[1], 10) : 0;
  return hours * 60 + minutes;
};

const getDisplayName = (day: string) => {
  if (/^\d+$/.test(day)) {
    const idx = (Number(day) + 6) % 7;
    return fullDayNames[idx] ?? day;
  }

  const shortIdx = shortDayNames.indexOf(day);
  if (shortIdx !== -1) return fullDayNames[shortIdx];

  const fullIdx = fullDayNames.indexOf(day);
  if (fullIdx !== -1) return fullDayNames[fullIdx];

  return day;
};

const BarTimeChart = ({ days, timeData }: ChartProps) => {
  const chartData = useMemo(() => {
    const maxMap = new Map<string, number>();

    days.forEach((day, i) => {
      const raw = timeData[i] ?? "0h 0m";
      const minutes = parseDurationToMinutes(raw);
      const name = getDisplayName(day);
      const prev = maxMap.get(name) ?? 0;
      maxMap.set(name, Math.max(prev, minutes));
    });

    return fullDayNames.map((name) => ({
      name,
      time: maxMap.get(name) ?? 0,
      display:
        timeData[days.findIndex((d) => getDisplayName(d) === name)] ?? "0h 0m",
    }));
  }, [days, timeData]);

  const maxTime = Math.max(...chartData.map((d) => d.time), 0);
  const paddedMax = Math.max(60, Math.ceil(maxTime * 1.25));

  const bgColor = "var(--background)";
  const gridColor = "var(--border)";
  const textColor = "var(--foreground)";
  const mutedColor = "var(--muted)";
  const accentColor = "var(--accent)";
  const accentColorWithOpacity =
    "color-mix(in oklch, var(--accent) 12%, transparent)";

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
          barCategoryGap="25%"
        >
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis
            dataKey="name"
            stroke={mutedColor}
            style={{ fontSize: "12px", fill: mutedColor }}
          />
          <YAxis
            domain={[0, paddedMax]}
            stroke={mutedColor}
            style={{ fontSize: "12px", fill: mutedColor }}
            tickFormatter={(value) => {
              const h = Math.floor(value / 60);
              const m = value % 60;
              return `${h}h ${m}m`;
            }}
          />
          <Tooltip
            formatter={(_, __, { payload }) => payload?.display ?? "0h 0m"}
            contentStyle={{
              backgroundColor: bgColor,
              border: `1px solid ${accentColor}`,
              borderRadius: "8px",
              color: textColor,
            }}
            labelStyle={{
              color: accentColor,
              fontWeight: 600,
            }}
            itemStyle={{
              color: textColor,
            }}
            cursor={{ fill: accentColorWithOpacity }}
          />
          <Bar
            dataKey="time"
            radius={[4, 4, 0, 0]}
            name="Time Spent"
            animationDuration={400}
          >
            {chartData.map((entry) => (
              <Cell key={entry.name} fill={accentColor} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarTimeChart;
