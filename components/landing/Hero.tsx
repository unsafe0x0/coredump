"use client";
import React from "react";
import Button from "../common/Button";
import MockDashboard from "./MockDashboard";
import { MdLeaderboard } from "react-icons/md";
import { VscVscode } from "react-icons/vsc";
import { GiSparkles } from "react-icons/gi";

const Hero = () => {
  return (
    <section className="relative flex items-center justify-center min-h-screen w-full">
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-3 py-32 gap-4 max-w-7xl">
        <p className="text-yellow-400 text-sm font-normal px-4 py-1 rounded-full border border-[#2a2a2a] bg-neutral-50/5 backdrop-blur-sm">
          <GiSparkles className="inline-block text-base mr-2" />
          Beta Version!
        </p>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold font-heading max-w-4xl">
          Push Limits, Break Barriers and Dominate
        </h1>
        <p className="text-neutral-300 text-base font-normal max-w-lg">
          From daily streaks to leaderboard glory, CoreDump empowers you to
          push limits, break barriers, and dominate in the world of coding.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button forwardRoute="/leaderboard" variant="primary">
            Leaderboard
            <MdLeaderboard className="inline-block text-lg ml-2" />
          </Button>
          <Button
            forwardRoute="https://marketplace.visualstudio.com/items?itemName=Unsafezero.coredump"
            variant="secondary"
          >
            Extension
            <VscVscode className="inline-block text-lg ml-2" />
          </Button>
        </div>
        <div className="w-full mt-8">
          <MockDashboard />
        </div>
      </div>
    </section>
  );
};

export default Hero;
