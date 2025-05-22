"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

const DeveloperCard = ({
  name,
  profileImage,
  gitUsername,
  twitterUsername,
}) => {
  return (
    <div className="flex flex-row justify-start items-center gap-3">
      <Image
        src={profileImage}
        alt={gitUsername}
        width={46}
        height={46}
        className="w-12 h-12 rounded-full object-cover"
      />
      <div className="flex flex-col justify-start items-start">
        <p className="text-white/80 text-lg font-medium">{name}</p>
        <div className="flex flex-wrap items-center">
          <Link
            href={`https://github.com/${gitUsername}`}
            target="_blank"
            className="text-white/80 hover:underline text-sm font-normal flex gap-1 items-center"
          >
            <FaGithub className="" />
            {gitUsername}
          </Link>
          {/* <Link
            href={`https://twitter.com/${twitterUsername}`}
            target="_blank"
            className="text-white/80 hover:underline text-sm flex gap-1 items-center"
          >
            <FaSquareXTwitter className="" /> {twitterUsername}
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default DeveloperCard;
