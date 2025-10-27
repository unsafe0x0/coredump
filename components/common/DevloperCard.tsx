import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

interface DeveloperCardProps {
  name: string;
  profileImage: string;
  gitUsername: string;
}

const DeveloperCard: React.FC<DeveloperCardProps> = ({
  name,
  profileImage,
  gitUsername,
}) => {
  return (
    <Link
      href={`developer/${gitUsername}`}
      className="flex flex-row justify-start items-center gap-3"
    >
      <Image
        src={profileImage}
        alt="Profile Image"
        width={46}
        height={46}
        className="rounded-full object-cover"
        unoptimized
      />
      <div className="flex flex-col justify-start items-start gap-0.5">
        <h2 className="text-base font-medium font-heading text-foreground">
          {name}
        </h2>
        <span className="text-sm text-foreground/80 hover:text-accent flex items-center">
          <FaGithub className="inline mr-1" />
          {gitUsername}
        </span>
      </div>
    </Link>
  );
};

export default DeveloperCard;
