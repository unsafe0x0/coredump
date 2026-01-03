import Image from "next/image";
import Link from "next/link";
import type React from "react";
import { BsGlobe } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

interface ProfileHeaderProps {
	name: string;
	gitUsername: string;
	twitterUsername?: string;
	profileImage: string;
	website?: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
	name,
	gitUsername,
	twitterUsername,
	profileImage,
	website,
}) => (
	<div className="flex flex-col justify-start items-start w-full p-5 rounded-lg bg-card border border-border backdrop-blur-sm mb-5">
		<div className="flex flex-row justify-start items-start gap-5 mt-2">
			<Image
				src={profileImage || "/default-avatar.png"}
				alt={gitUsername}
				width={100}
				height={100}
				className="w-24 h-24 rounded-lg object-cover"
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
				{website && (
					<Link
						href={website.startsWith("http") ? website : `https://${website}`}
						target="_blank"
						className="hover:underline flex items-center gap-2 text-foreground/80 hover:text-accent text-base font-medium"
					>
						<BsGlobe />
						{website}
					</Link>
				)}
			</div>
		</div>
	</div>
);

export default ProfileHeader;
