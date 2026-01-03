"use client";
import type React from "react";
import { useState } from "react";
import { IoMdEye } from "react-icons/io";
import { IoEyeOff } from "react-icons/io5";
import { MdFileCopy } from "react-icons/md";

interface PrivateKeySectionProps {
	privateKey: string;
}

const PrivateKeySection: React.FC<PrivateKeySectionProps> = ({
	privateKey,
}) => {
	const [showKey, setShowKey] = useState(false);

	const toggleVisibility = () => {
		setShowKey((prev) => !prev);
	};

	const copyToClipboard = () => {
		navigator.clipboard.writeText(privateKey).catch(() => {});
	};

	return (
		<div className="flex flex-col justify-start items-start w-full p-5 rounded-lg bg-card border border-border mb-5">
			<h2 className="text-3xl font-semibold text-foreground mb-4 font-heading">
				Private Key
			</h2>
			<p className="text-foreground/80 text-base mb-4">
				Keep this key secure. Do not share it.
			</p>
			<div className="flex flex-row items-center w-full gap-3">
				<p className="text-foreground/80 text-sm px-4 py-3 bg-border rounded-lg w-full break-all">
					{showKey ? privateKey : "****************"}
				</p>
				<button
					type="button"
					onClick={toggleVisibility}
					className="text-foreground/80 hover:text-foreground text-2xl hover:scale-110"
				>
					{showKey ? <IoEyeOff /> : <IoMdEye />}
				</button>
				<button
					type="button"
					onClick={copyToClipboard}
					className="text-foreground/80 hover:text-foreground text-2xl hover:scale-110"
				>
					<MdFileCopy />
				</button>
			</div>
		</div>
	);
};

export default PrivateKeySection;
