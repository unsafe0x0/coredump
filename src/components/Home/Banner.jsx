import React from "react";
import Link from "next/link";
import { MdLeaderboard } from "react-icons/md";
import { VscVscode } from "react-icons/vsc";

const Banner = () => {
  return (
    <section className="flex justify-center items-center w-full">
      <div className="flex flex-col justify-center items-center w-full gap-5 px-3 py-20 bg-neutral-800/50 backdrop-blur-2xl rounded-md lg:container mx-3">
        <h2 className="text-4xl font-medium text-neutral-300 text-center">
          Ready to start Your Journey?
        </h2>
        <p className="text-neutral-400 text-lg font-normal text-center max-w-xl">
          BashForge is a platform that empowers you to push limits, break
          barriers, and dominate in the world of coding.
        </p>
        <div className="flex flex-wrap justify-center items-center w-full gap-2">
          <Link
            href="/leaderboard"
            className="px-6 py-2.5 text-md font-medium cursor-pointer bg-green-600 rounded-md hover:bg-green-600/70 border border-green-600 transition-all duration-300 ease-in-out flex items-center gap-2"
          >
            Leaderboard <MdLeaderboard />
          </Link>
          <Link
            href="https://github.com/muxdust/BashForge-extension"
            target="_blank"
            className="px-6 py-2.5 text-md font-medium cursor-pointer bg-transparent rounded-md hover:bg-green-600/70 border border-green-600 transition-all duration-300 ease-in-out text-green-600 hover:text-neutral-300 flex items-center gap-2"
          >
            Extension <VscVscode />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Banner;
