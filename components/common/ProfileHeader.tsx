import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

interface ProfileHeaderProps {
  name: string;
  gitUsername: string;
  twitterUsername?: string;
  profileImage: string;
  thisWeekTotalTime: string;
  joinedDate?: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  name,
  gitUsername,
  twitterUsername,
  profileImage,
  thisWeekTotalTime,
  joinedDate,
}) => (
  <div className="flex flex-col justify-start items-start w-full p-5 rounded-md bg-card backdrop-blur-sm mb-5">
    <div className="flex flex-row justify-start items-start gap-5 mt-2">
      <Image
        src={profileImage || "/default-avatar.png"}
        alt={gitUsername}
        width={100}
        height={100}
        className="w-24 h-24 rounded-md object-cover"
      />
      <div className="flex flex-col justify-start items-start gap-2">
        <p className="text-foreground text-2xl font-semibold font-heading">
          {name}
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href={`https://github.com/${gitUsername}`}
            target="_blank"
            className="text-foreground/80 hover:text-accent text-base flex gap-2 items-center"
          >
            <FaGithub />
            {gitUsername}
          </Link>
          {twitterUsername && (
            <Link
              href={`https://twitter.com/${twitterUsername}`}
              target="_blank"
              className="text-foreground/80 hover:text-accent text-base flex gap-2 items-center"
            >
              <FaSquareXTwitter />
              {twitterUsername}
            </Link>
          )}
        </div>
        <p className="text-foreground/80 text-base font-medium">
          Crushed <span className="text-foreground">{thisWeekTotalTime}</span>{" "}
          this week
        </p>
        {joinedDate && (
          <p className="text-foreground/80 text-sm">
            Joined on{" "}
            <span className="text-foreground/80">
              {new Date(joinedDate).toLocaleDateString()}
            </span>
          </p>
        )}
      </div>
    </div>
  </div>
);

export default ProfileHeader;
