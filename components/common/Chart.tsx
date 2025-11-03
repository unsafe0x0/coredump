"use client";

import React, { useMemo } from "react";
import { useTheme } from "next-themes";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface ChartProps {
  days: string[];
  timeData: string[];
}

const dayLabels = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const BarTimeChart = ({ days, timeData }: ChartProps) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const chartData = useMemo(() => {
    return days.map((day, index) => {
      const raw = timeData[index] || "0h 0m";

      const hourMatch = raw.match(/(\d+)h/);
      const minMatch = raw.match(/(\d+)m/);
      const hours = hourMatch ? parseInt(hourMatch[1], 10) : 0;
      const minutes = minMatch ? parseInt(minMatch[1], 10) : 0;
      const totalMinutes = hours * 60 + minutes;

      return {
        name: dayLabels[parseInt(day)] || day,
        time: totalMinutes,
        display: raw,
      };
    });
  }, [days, timeData]);

  const maxTime = Math.max(...chartData.map((d) => d.time), 0);
  const paddedMax = maxTime > 0 ? Math.ceil(maxTime * 2) : 60;

  const bgColor = isDark ? "#181818" : "#ffffff";
  const gridColor = isDark ? "#3a3a3a" : "#e9e9e9";
  const textColor = isDark ? "#f5f5f5" : "#1b1b1b";
  const mutedColor = isDark ? "#a1a1a1" : "#6e6e6e";
  const accentColor = "#de7356";

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
            formatter={(_, __, { payload }) => payload?.display || "0h 0m"}
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
            cursor={{ fill: `${accentColor}20` }}
          />
          <Bar
            dataKey="time"
            radius={[4, 4, 0, 0]}
            name="Time Spent"
            animationDuration={400}
          >
            {chartData.map((_, i) => (
              <Cell key={`cell-${i}`} fill={accentColor} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarTimeChart;
