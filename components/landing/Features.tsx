"use client";
import {
  ChartLine,
  Code,
  Flame,
  Medal,
  RoadHorizon,
  Trophy,
} from "@phosphor-icons/react";

const data = [
  {
    id: 1,
    title: "Daily Streak",
    description:
      "Build consistent coding habits with daily streak tracking and motivation",
    icon: <Flame size={24} />,
  },
  {
    id: 2,
    title: "Leaderboards",
    description:
      "Compete with developers worldwide and climb the global rankings",
    icon: <Trophy size={24} />,
  },
  {
    id: 3,
    title: "Progress Analytics",
    description:
      "Detailed insights into your coding patterns and productivity trends",
    icon: <ChartLine size={24} />,
  },
  {
    id: 4,
    title: "Language Tracking",
    description: "Monitor your usage across different programming languages",
    icon: <Code size={24} />,
  },
  {
    id: 5,
    title: "Public Stats",
    description:
      "Share your coding time in your portfolio or README via API routes",
    icon: <RoadHorizon size={24} />,
  },
  {
    id: 6,
    title: "Achievements",
    description: "Earn badges and rewards for your coding achievements",
    icon: <Medal size={24} />,
  },
];

const Features = () => {
  return (
    <section className="flex items-center justify-center w-full">
      <div className="flex flex-col items-center justify-center px-4 py-10 max-w-7xl w-full gap-12">
        <h2 className="text-4xl md:text-5xl font-semibold text-foreground font-heading mb-4 text-center tracking-tight">
          Everything you need to level up
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 w-full">
          {data.map((feature) => (
            <div
              key={feature.id}
              className="flex flex-col items-start justify-start p-6 bg-card border border-border hover:border-accent/60 rounded-xl gap-3 transition-colors"
            >
              <div className="p-2 rounded-lg bg-accent-subtle text-accent">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-foreground font-heading mb-2">
                {feature.title}
              </h3>
              <p className="text-foreground/80 text-base font-normal">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
