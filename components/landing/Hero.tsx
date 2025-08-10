"use client";
import React from "react";
import Button from "../ui/Button";
import { MdLeaderboard } from "react-icons/md";
import { VscVscode } from "react-icons/vsc";
import { GiSparkles } from "react-icons/gi";

const Hero = () => {
  return (
    <section className="relative flex items-center justify-center min-h-screen w-full">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      <div className="relative z-10 flex flex-col items-center justify-center text-center p-3 gap-4 lg:container">
        <p className="text-yellow-400 text-sm font-normal px-4 py-1 rounded-full border border-neutral-700/50 bg-neutral-50/5 backdrop-blur-sm">
          <GiSparkles className="inline-block text-base mr-2" />
          Welcome to BashForge
        </p>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold font-heading max-w-4xl">
          Push Limits, Break Barriers and Dominate
        </h1>
        <p className="text-neutral-300 text-base font-normal max-w-lg">
          From daily streaks to leaderboard glory, BashForge empowers you to
          push limits, break barriers, and dominate in the world of coding.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button
            label="Leaderboard"
            forwardRoute="/leaderboard"
            variant="primary"
            icon={<MdLeaderboard className="text-xl" />}
          />
          <Button
            label="Extension"
            forwardRoute="https://marketplace.visualstudio.com/items?itemName=Unsafezero.bashforge"
            variant="secondary"
            icon={<VscVscode className="text-xl" />}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
