import React from "react";
import {
  FaFire,
  FaChartLine,
  FaCode,
  FaBullseye,
  FaMedal,
} from "react-icons/fa";
import { MdLeaderboard } from "react-icons/md";

const data = [
  {
    id: 1,
    title: "Daily Streak",
    description:
      "Build consistent coding habits with daily streak tracking and motivation",
    icon: (
      <FaFire size={44} className="p-1.5 rounded bg-red-500/10 text-red-500" />
    ),
  },
  {
    id: 2,
    title: "Leaderboards",
    description:
      "Compete with developers worldwide and climb the global rankings",
    icon: (
      <MdLeaderboard
        size={44}
        className="p-1.5 rounded bg-yellow-500/10 text-yellow-500"
      />
    ),
  },
  {
    id: 3,
    title: "Progress Analytics",
    description:
      "Detailed insights into your coding patterns and productivity trends",
    icon: (
      <FaChartLine
        size={44}
        className="p-1.5 rounded bg-blue-500/10 text-blue-500"
      />
    ),
  },
  {
    id: 4,
    title: "Language Tracking",
    description: "Monitor your usage across different programming languages",
    icon: (
      <FaCode
        size={44}
        className="p-1.5 rounded bg-green-500/10 text-green-500"
      />
    ),
  },
  {
    id: 5,
    title: "Goal Setting",
    description:
      "Set personalized coding goals and track your journey towards achieving them",
    icon: (
      <FaBullseye
        size={44}
        className="p-1.5 rounded bg-purple-500/10 text-purple-500"
      />
    ),
  },
  {
    id: 6,
    title: "Achievements",
    description: "Earn badges and rewards for your coding achievements",
    icon: (
      <FaMedal
        size={44}
        className="p-1.5 rounded bg-orange-500/10 text-orange-500"
      />
    ),
  },
];

const Features = () => {
  return (
    <section className="flex justify-center items-center w-full">
      <div className="flex flex-col justify-center items-center w-full gap-5 px-3 lg:container">
        <h2 className="text-4xl font-medium  text-neutral-300 text-center">
          Everything you need
        </h2>
        <div className="columns-1 md:columns-2 lg:columns-3 gap-5 space-y-5 justify-start items-stretch w-full mt-10">
          {data.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-start items-start w-full gap-2 p-5 rounded bg-neutral-800/20 backdrop-blur-2xl break-inside-avoid"
            >
              {item.icon}
              <h3 className="text-2xl font-medium">{item.title}</h3>
              <p className="text-neutral-400 text-lg font-normal">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
