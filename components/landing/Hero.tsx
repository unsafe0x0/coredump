"use client";
import { MdLeaderboard } from "react-icons/md";
import { TbVersionsFilled } from "react-icons/tb";
import { VscVscode } from "react-icons/vsc";
import Button from "../common/Button";
import MockDashboard from "./MockDashboard";

const Hero = () => {
	return (
		<section className="relative flex items-center justify-center min-h-screen w-full">
			<div className="relative z-10 flex flex-col items-center justify-center text-center px-3 py-32 gap-4 max-w-7xl">
				<p className="text-accent text-sm font-normal px-4 py-1 rounded-full border border-border bg-background/5 backdrop-blur-sm flex items-center justify-center">
					<TbVersionsFilled className="inline-block text-base mr-1" />
					Public Stats API is live!
				</p>
				<h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold font-heading max-w-4xl">
					Push Limits, Break Barriers and Dominate
				</h1>
				<p className="text-foreground/90 text-base font-normal max-w-lg">
					From daily streaks to leaderboard glory, CoreDump empowers you to push
					limits, break barriers, and dominate in the world of coding.
				</p>
				<div className="flex flex-wrap items-center justify-center gap-4">
					<Button forwardRoute="/leaderboard" variant="primary">
						Leaderboard
						<MdLeaderboard className="inline-block text-lg" />
					</Button>
					<Button
						forwardRoute="https://marketplace.visualstudio.com/items?itemName=Unsafezero.coredump"
						variant="secondary"
					>
						Extension
						<VscVscode className="inline-block text-lg" />
					</Button>
				</div>
				<div className="w-full mt-8">
					<MockDashboard />
				</div>
			</div>
		</section>
	);
};

export default Hero;
