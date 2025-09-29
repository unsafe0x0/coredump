"use client";
import React, { useState } from "react";
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
    <div className="flex flex-col justify-start items-start w-full p-5 rounded-md bg-[#202020] backdrop-blur-sm mb-5">
      <h2 className="text-3xl font-semibold text-white mb-4 font-heading">
        Private Key
      </h2>
      <p className="text-neutral-400 text-base mb-4">
        Keep this key secure. Do not share it.
      </p>
      <div className="flex flex-row items-center w-full gap-3">
        <p className="text-neutral-300 text-sm px-4 py-3 bg-[#282828] rounded-md w-full break-all">
          {showKey ? privateKey : "****************"}
        </p>
        <button
          onClick={toggleVisibility}
          className="text-neutral-400 hover:text-white text-2xl hover:scale-110"
        >
          {showKey ? <IoEyeOff /> : <IoMdEye />}
        </button>
        <button
          onClick={copyToClipboard}
          className="text-neutral-400 hover:text-white text-2xl hover:scale-110"
        >
          <MdFileCopy />
        </button>
      </div>
    </div>
  );
};

export default PrivateKeySection;
