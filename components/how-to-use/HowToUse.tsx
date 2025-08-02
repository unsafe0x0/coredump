"use client";
import React from "react";
import Button from "../ui/Button";
import {
  FaDownload,
  FaCode,
  FaCog,
  FaKey,
  FaSync,
  FaPlay,
} from "react-icons/fa";
import { VscVscode } from "react-icons/vsc";

const HowToUse = () => {
  const steps = [
    {
      number: 1,
      title: "Open Visual Studio Code.",
      icon: <VscVscode className="text-2xl" />,
    },
    {
      number: 2,
      title:
        "Go to the Extensions view by clicking the Extensions icon in the Activity Bar.",
      icon: <FaCode className="text-2xl" />,
    },
    {
      number: 3,
      title: 'Search for "BashForge" in the Marketplace.',
      icon: <FaDownload className="text-2xl" />,
    },
    {
      number: 4,
      title: 'Click "Install" on the BashForge extension page.',
      action: "Install",
      icon: <FaDownload className="text-2xl" />,
    },
    {
      number: 5,
      title:
        'Open the Command Palette and search for "BashForge: Enter Private Key".',
      icon: <FaKey className="text-2xl" />,
    },
    {
      number: 6,
      title: "Retrieve your private key from the BashForge dashboard.",
      icon: <FaKey className="text-2xl" />,
    },
    {
      number: 7,
      title: "Paste the private key into the extension input field.",
      icon: <FaKey className="text-2xl" />,
    },
    {
      number: 8,
      title: "Restart VS Code to apply the changes.",
      icon: <FaSync className="text-2xl" />,
    },
    {
      number: 9,
      title: "Start using the BashForge extension.",
      icon: <FaPlay className="text-2xl" />,
    },
  ];

  return (
    <section className="flex justify-center items-start w-full min-h-screen py-20 relative">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      <div className="flex flex-col justify-start items-center w-full lg:container px-3 gap-8 relative z-10">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-semibold text-white font-heading">
            How to Use BashForge
          </h1>
          <p className="text-neutral-300 text-base font-normal max-w-2xl mx-auto">
            Follow these simple steps to get started with the BashForge
            extension and begin tracking your coding journey
          </p>
        </div>

        <div className="grid gap-6 w-full max-w-4xl">
          {steps.map((step) => (
            <div
              key={step.number}
              className="flex justify-start items-center bg-neutral-900 rounded-lg p-5 backdrop-blur-sm gap-5"
            >
              <span className="p-4 bg-neutral-100 rounded-lg text-neutral-800 text-2xl flex-shrink-0">
                {step.icon}
              </span>
              <div className="flex flex-col justify-center items-start gap-2 flex-1">
                <h3 className="text-lg font-semibold text-white font-heading">
                  Step {step.number}
                </h3>
                <p className="text-neutral-300 text-base font-normal">
                  {step.title}
                </p>
              </div>
              {step.action && (
                <div className="flex-shrink-0">
                  <Button
                    label={step.action}
                    onClick={() =>
                      window.open(
                        "https://marketplace.visualstudio.com/items?itemName=Unsafezero.bashforge",
                        "_blank",
                      )
                    }
                    variant="primary"
                    icon={<FaDownload />}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowToUse;
