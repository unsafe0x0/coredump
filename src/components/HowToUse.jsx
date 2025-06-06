import React from "react";
import Link from "next/link";

const HowToUse = () => {
  return (
    <section className="flex justify-center items-center w-full">
      <div className="flex flex-col justify-start items-center w-full gap-5 px-3 py-12 lg:container">
        <h2 className="text-3xl font-medium  text-neutral-300">How to Use</h2>
        <div className="flex flex-col justify-start items-start w-full gap-5">
          <div className="flex flex-col justify-start items-start w-full gap-2">
            <h3 className="text-xl font-medium  text-neutral-300">Step 1</h3>
            <p className="text-neutral-400 text-md font-normal">
              Download the extension from the official GitHub repository.
            </p>
            <Link
              href="https://github.com/muxdust/BashForge-extension"
              target="_blank"
              className="px-3 py-1.5 md:py-1.5 text-md font-medium cursor-pointer bg-green-600 rounded-md hover:bg-green-700 border border-green-600 transition-all duration-300 ease-in-out flex items-center gap-1"
            >
              Install
            </Link>
          </div>
          <div className="flex flex-col justify-start items-start w-full gap-2">
            <h3 className="text-xl font-medium  text-neutral-300">Step 2</h3>
            <p className="text-neutral-400 text-md font-normal">
              Open the extension within a VSCode-based code editor.
            </p>
          </div>
          <div className="flex flex-col justify-start items-start w-full gap-2">
            <h3 className="text-xl font-medium  text-neutral-300">Step 3</h3>
            <p className="text-neutral-400 text-md font-normal">
              Right-click the extension file and select "Install."
            </p>
          </div>
          <div className="flex flex-col justify-start items-start w-full gap-2">
            <h3 className="text-xl font-medium  text-neutral-300">Step 4</h3>
            <p className="text-neutral-400 text-md font-normal">
              Open the Command Palette and search for "BashForge Private Key."
            </p>
          </div>
          <div className="flex flex-col justify-start items-start w-full gap-2">
            <h3 className="text-xl font-medium  text-neutral-300">Step 5</h3>
            <p className="text-neutral-400 text-md font-normal">
              Retrieve your private key from the profile page.
            </p>
          </div>
          <div className="flex flex-col justify-start items-start w-full gap-2">
            <h3 className="text-xl font-medium  text-neutral-300">Step 6</h3>
            <p className="text-neutral-400 text-md font-normal">
              Paste the private key into the extension input field.
            </p>
          </div>
          <div className="flex flex-col justify-start items-start w-full gap-2">
            <h3 className="text-xl font-medium  text-neutral-300">Step 7</h3>
            <p className="text-neutral-400 text-md font-normal">
              Restart your code editor to apply the changes.
            </p>
          </div>
          <div className="flex flex-col justify-start items-start w-full gap-2">
            <h3 className="text-xl font-medium  text-neutral-300">Step 8</h3>
            <p className="text-neutral-400 text-md font-normal">
              Start using the extension.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowToUse;
