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
      <FaFire
        size={48}
        className="p-2.5 rounded-md bg-gradient-to-l from-orange-600 to-orange-700 text-white"
      />
    ),
  },
  {
    id: 2,
    title: "Leaderboards",
    description:
      "Compete with developers worldwide and climb the global rankings",
    icon: (
      <MdLeaderboard
        size={48}
        className="p-2.5 rounded-md bg-gradient-to-l from-yellow-600 to-yellow-600 text-white"
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
        size={48}
        className="p-2.5 rounded-md bg-gradient-to-l from-blue-600 to-blue-600 text-white"
      />
    ),
  },
  {
    id: 4,
    title: "Language Tracking",
    description: "Monitor your usage across different programming languages",
    icon: (
      <FaCode
        size={48}
        className="p-2.5 rounded-md bg-gradient-to-l from-violet-600 to-violet-600 text-white"
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
        size={48}
        className="p-2.5 rounded-md bg-gradient-to-l from-red-600 to-red-600 text-white"
      />
    ),
  },
  {
    id: 6,
    title: "Achievements",
    description: "Earn badges and rewards for your coding achievements",
    icon: (
      <FaMedal
        size={48}
        className="p-2.5 rounded-md bg-gradient-to-l from-orange-600 to-orange-600 text-white"
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
        <div className="columns-1 md:columns-2 lg:columns-3 gap-7 space-y-7 justify-start items-stretch w-full mt-10">
          {data.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-start items-start w-full gap-2 p-7 rounded-md bg-neutral-800/50 backdrop-blur-2xl break-inside-avoid hover:shadow-lg transition-all duration-300 ease-in-out"
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
