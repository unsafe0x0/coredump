"use client";
import React from "react";
import Button from "../ui/Button";

const Banner = () => {
  return (
    <section className="flex justify-center items-center w-full">
      <div className="flex flex-col items-center justify-center px-4 py-20 bg-neutral-900 rounded-lg max-w-5xl text-center mx-3 md:mx-0 gap-3 w-full">
        <h2 className="text-4xl md:text-5xl font-semibold text-white font-heading max-w-2xl">
          Ready to start your coding journey?
        </h2>
        <p className="text-neutral-300 text-base font-normal max-w-xl">
          Join BashForge to track your coding progress, compete on the
          leaderboard, and enhance your skills with our powerful tools.
        </p>
        <Button
          label="Get Started"
          forwardRoute="/register"
          variant="primary"
        />
      </div>
    </section>
  );
};

export default Banner;
