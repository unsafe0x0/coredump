"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

const DeveloperCard = ({ developerData }) => {
  return (
    <div className="flex flex-row justify-start items-center gap-3">
      <Image
        src={developerData.profileImage}
        alt={developerData.gitUsername}
        width={46}
        height={46}
        className="w-12 h-12 rounded-full object-cover"
      />
      <div className="flex flex-col justify-start items-start">
        <p className="text-neutral-400 text-lg font-medium">
          {developerData.name}
        </p>
        <div className="flex flex-wrap items-center">
          <Link
            href={`/developer/${developerData.gitUsername}`}
            className="text-neutral-400 hover:underline text-sm font-normal flex gap-1 items-center"
          >
            <FaGithub className="" />
            {developerData.gitUsername}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DeveloperCard;
