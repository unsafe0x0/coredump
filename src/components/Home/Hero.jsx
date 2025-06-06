import React from "react";
import Link from "next/link";
import { MdLeaderboard } from "react-icons/md";
import { VscVscode } from "react-icons/vsc";
import { FaWifi } from "react-icons/fa";
import { GiDiamondTrophy } from "react-icons/gi";
import { FaFire } from "react-icons/fa6";
import { MdToday } from "react-icons/md";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="flex justify-center items-center w-full min-h-[calc(100vh-4rem)]">
      <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-stretch w-full gap-5 px-3 py-12 lg:container">
        <div className="flex flex-col justify-center items-center md:items-start w-full gap-3 text-center md:text-left">
          <h2 className="text-5xl md:text-6xl font-medium  text-neutral-300">
            Push Limits, Break Barriers and Dominate
          </h2>
          <p className="text-neutral-400 text-lg font-normal">
            From daily streaks to leaderboard glory, BashForge empowers you to
            push limits, break barriers, and dominate in the world of coding.
          </p>
          <div className="flex flex-wrap justify-center md:justify-start items-center md:items-start w-full gap-2">
            <Link
              href="/leaderboard"
              className="px-6 py-2.5 text-md font-medium cursor-pointer bg-green-600 rounded hover:bg-green-600/70 border border-green-600 transition-all duration-300 ease-in-out flex items-center gap-2"
            >
              Leaderboard <MdLeaderboard />
            </Link>
            <Link
              href="https://github.com/muxdust/BashForge-extension"
              target="_blank"
              className="px-6 py-2.5 text-md font-medium cursor-pointer bg-transparent rounded hover:bg-green-600/70 border border-green-600 transition-all duration-300 ease-in-out text-green-600 hover:text-neutral-300 flex items-center gap-2"
            >
              Extension <VscVscode />
            </Link>
          </div>
          <div className="flex items-center space-x-0.5 mt-4">
            <div className="flex -space-x-3">
              <Image
                src="/default-profile.jpg"
                alt="Avatar"
                width={30}
                height={30}
                className="w-8 h-8 rounded-full"
              />
              <Image
                src="/default-profile1.jpg"
                alt="Avatar"
                width={30}
                height={30}
                className="w-8 h-8 rounded-full"
              />
              <Image
                src="/default-profile.jpg"
                alt="Avatar"
                width={30}
                height={30}
                className="w-8 h-8 rounded-full"
              />
              <Image
                src="/default-profile1.jpg"
                alt="Avatar"
                width={30}
                height={30}
                className="w-8 h-8 rounded-full"
              />
              <Image
                src="/default-profile.jpg"
                alt="Avatar"
                width={30}
                height={30}
                className="w-8 h-8 rounded-full"
              />
            </div>
            <p className="ml-4 text-sm text-neutral-400 font-medium">
              Join us Today!
            </p>
          </div>
        </div>

        {/* Mock UI Card */}
        <div className="w-full flex justify-center md:justify-end items-center">
          <div className="bg-neutral-800/40 backdrop-blur-2xl rounded p-6 w-full max-w-md border border-neutral-700/40">
            <div className="flex justify-between items-center mb-4 text-sm text-neutral-400">
              <span>May 11, 2025</span>
              <span className="bg-red-600/80 text-white px-2 py-0.5 rounded text-xs flex items-center gap-1">
                <FaWifi className="animate-pulse" />
                Live
              </span>
            </div>
            <h3 className="text-white/90 text-lg font-medium mb-2">
              Your Coding Stats
            </h3>
            <div className="flex justify-between  text-neutral-300 mb-4">
              <div className="flex items-center gap-2">
                <MdToday className="text-4xl text-green-600 p-2.5 rounded bg-green-600/10" />
                <div>
                  <p className="text-sm">Today</p>
                  <p className="text-xl font-medium">4h 32m</p>
                  <p className="text-green-600 text-xs">
                    +18% from yesterday
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <FaFire className="text-4xl text-red-600 p-2.5 rounded bg-red-600/10" />
                <div>
                  <p className="text-sm">Streak</p>
                  <p className="text-xl font-medium">21 days</p>
                  <p className="text-green-600 text-xs">Personal best!</p>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <p className="text-neutral-400 text-xl font-medium">
                Language used
              </p>
              <div className="bg-neutral-800/70 backdrop-blur-2xl rounded-full h-2.5 overflow-hidden mt-2">
                <div
                  className="bg-yellow-600 h-2.5"
                  style={{ width: "55%" }}
                ></div>
              </div>
              <p className="text-neutral-400 text-sm mt-1 text-right">
                JavaScript
              </p>
              <div className="bg-neutral-800/70 backdrop-blur-2xl rounded-full h-2.5 overflow-hidden mt-2">
                <div
                  className="bg-blue-600 h-2.5"
                  style={{ width: "45%" }}
                ></div>
              </div>
              <p className="text-neutral-400 text-sm mt-1 text-right">
                TypeScript
              </p>
            </div>
            <div className="flex justify-between items-center mt-5 text-neutral-400 text-sm">
              <div className="bg-neutral-800/50 backdrop-blur-2xl px-3 py-3 rounded">
                <p className="text-xl font-medium text-left flex items-center gap-2">
                  <GiDiamondTrophy className="inline-block text-yellow-500" />
                  Rank <span className="text-green-600 font-medium">#7</span>{" "}
                  <span className="text-green-600">↑ +4</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
