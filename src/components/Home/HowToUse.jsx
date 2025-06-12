import React from "react";
import Link from "next/link";

const steps = [
  {
    id: 1,
    title: "Step 1",
    description: "Download the extension from the official GitHub repository.",
    link: {
      href: "https://github.com/muxdust/BashForge-extension",
      label: "Install",
    },
  },
  {
    id: 2,
    title: "Step 2",
    description: "Open the extension within a VSCode-based code editor.",
  },
  {
    id: 3,
    title: "Step 3",
    description: 'Right-click the extension file and select "Install."',
  },
  {
    id: 4,
    title: "Step 4",
    description:
      'Open the Command Palette and search for "BashForge Private Key."',
  },
  {
    id: 5,
    title: "Step 5",
    description: "Retrieve your private key from the profile page.",
  },
  {
    id: 6,
    title: "Step 6",
    description: "Paste the private key into the extension input field.",
  },
  {
    id: 7,
    title: "Step 7",
    description: "Restart your code editor to apply the changes.",
  },
  {
    id: 8,
    title: "Step 8",
    description: "Start using the extension.",
  },
];

const HowToUse = () => {
  return (
    <section className="flex justify-center items-center w-full">
      <div className="flex flex-col justify-center items-center w-full gap-5 px-3 py-12 lg:container">
        <h2 className="text-4xl font-medium text-neutral-300 text-center">
          How to Use
        </h2>
        <div className="columns-1 md:columns-2 lg:columns-3 gap-5 space-y-5 justify-start items-stretch w-full mt-10">
          {steps.map((step) => (
            <div
              key={step.id}
              className="flex flex-col justify-start items-start w-full gap-2 p-5 rounded-md bg-neutral-800/50 backdrop-blur-2xl break-inside-avoid"
            >
              <h3 className="text-xl font-medium text-neutral-300">
                {step.title}
              </h3>
              <p className="text-neutral-400 text-md font-normal">
                {step.description}
              </p>
              {step.link && (
                <Link
                  href={step.link.href}
                  target="_blank"
                  className="px-3 py-1.5 text-md font-medium cursor-pointer bg-red-600 rounded-md hover:bg-red-700 border border-red-600 transition-all duration-300 ease-in-out flex items-center gap-1"
                >
                  {step.link.label}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowToUse;
