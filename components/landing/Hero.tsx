"use client";
import { Code, Stack, Trophy } from "@phosphor-icons/react";
import Button from "../common/Button";
import MockDashboard from "./MockDashboard";

const Hero = () => {
  return (
    <section className="relative flex items-center justify-center min-h-screen w-full">
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 py-32 gap-5 max-w-7xl animate-fade-in">
        <p className="text-accent text-sm font-medium px-4 py-1 rounded-full border border-border bg-card flex items-center justify-center">
          <Stack className="inline-block text-base mr-1" />
          Code, Code & Code
        </p>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold font-heading max-w-4xl tracking-tight">
          Push Limits, Break Barriers and Dominate
        </h1>
        <p className="text-foreground/80 text-lg md:text-xl font-normal max-w-2xl">
          From daily streaks to leaderboard glory, CoreDump empowers you to push
          limits, break barriers, and dominate in the world of coding.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button forwardRoute="/leaderboard" variant="primary">
            Leaderboard
            <Trophy className="inline-block text-lg" />
          </Button>
          <Button
            forwardRoute="https://marketplace.visualstudio.com/items?itemName=Unsafezero.coredump"
            variant="secondary"
          >
            Extension
            <Code className="inline-block text-lg" />
          </Button>
        </div>
        <div className="w-full mt-10">
          <MockDashboard />
        </div>
      </div>
    </section>
  );
};

export default Hero;
