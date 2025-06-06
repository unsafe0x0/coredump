"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaFireAlt } from "react-icons/fa";
import { GiStopwatch } from "react-icons/gi";
import { RiCodeSSlashLine } from "react-icons/ri";
import { GoCodeOfConduct } from "react-icons/go";
import { MdFileCopy } from "react-icons/md";
import { MdOutlineEmail } from "react-icons/md";
import { MdOutlineDateRange } from "react-icons/md";
import { IoMdEye } from "react-icons/io";
import { IoEyeOff } from "react-icons/io5";
import LanguageBadge from "../Leaderboard/LanguageBadge";
import {
  languageIconsImage,
  languageColors,
  languageProgressBgColor,
} from "@/lib/languageData";
import { useRouter } from "next/navigation";
import axios from "axios";

const DashboardComponent = ({ developerData }) => {
  const [showPrivateKey, setShowPrivateKey] = React.useState(false);

  const router = useRouter();

  const togglePrivateKeyVisibility = () => {
    setShowPrivateKey(!showPrivateKey);
  };

  const totalTime = Number(
    developerData?.activities.reduce(
      (sum, activity) => sum + activity.totalDuration,
      0
    ) / 60
  ).toFixed(2);

  const totalDurationMinutes = developerData?.activities.reduce(
    (sum, activity) => sum + activity.totalDuration,
    0
  );

  const sortedActivities = [...developerData.activities].sort(
    (a, b) => b.totalDuration - a.totalDuration
  );

  const topLanguageActivity = sortedActivities[0];
  const topLanguage = topLanguageActivity?.shortLanguageName || "N/A";

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("Private key copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
        alert("Failed to copy private key.");
      });
  };

  const handleLogout = () => {
    const res = axios.post("/api/auth/logout");
    if (res.status === 200) {
      setInterval(() => {
        router.push("/login");
      }, 1000);
    }
  };

  return (
    <section className="flex justify-center items-start w-full min-h-screen py-10">
      <div className="flex flex-col justify-start items-start lg:container w-full px-3">
        <h2 className="text-3xl font-medium text-neutral-300 text-left self-start mb-5">
          Welcome Back!{" "}
          <span className="text-green-600">{developerData.name}</span>
        </h2>

        <div className="flex justify-end items-center w-full mb-5">
          <Link
            href="/leaderboard"
            className="px-3 py-1.5 text-md font-normal cursor-pointer bg-green-600 rounded-md hover:bg-green-600/70 border border-green-600 transition-all duration-300 ease-in-out"
          >
            Leaderboard
          </Link>
          <button
            onClick={handleLogout}
            className="px-3 py-1.5 text-md font-normal cursor-pointer bg-red-600 rounded-md hover:bg-red-600/70 border border-red-600 transition-all duration-300 ease-in-out ml-5"
          >
            Logout
          </button>
        </div>

        <div className="flex flex-col justify-start items-start w-full p-5 rounded-md bg-neutral-800/60 backdrop-blur-2xl mb-5">
          <div className="flex flex-row justify-start items-start gap-5 mt-5">
            <Image
              src={developerData.profileImage}
              alt={developerData.gitUsername}
              width={150}
              height={150}
              className="w-36 h-36 rounded-md object-cover"
            />
            <div className="flex flex-col justify-start items-start gap-2">
              <p className=" text-neutral-300 text-2xl font-medium">
                {developerData.name}
              </p>
              <p className=" text-neutral-400 text-md font-medium flex items-center">
                <MdOutlineEmail className="inline mr-2 text-lg" />{" "}
                {developerData.email}
              </p>
              <p className="text-neutral-400 text-md font-normal flex items-center text-md">
                <MdOutlineDateRange className="inline mr-2 text-lg" />
                Joined on{" "}
                {new Date(developerData.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <Link
                  href={`https://github.com/${developerData.gitUsername}`}
                  target="_blank"
                  className="text-neutral-400 hover:underline text-md flex gap-1 items-center"
                >
                  <FaGithub />
                  {developerData.gitUsername}
                </Link>
                <Link
                  href={`https://twitter.com/${developerData.twitterUsername}`}
                  target="_blank"
                  className="text-neutral-400 hover:underline text-md flex gap-1 items-center"
                >
                  <FaSquareXTwitter />
                  {developerData.twitterUsername}
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-start items-start w-full  p-5 rounded-md bg-neutral-800/60 backdrop-blur-2xl mb-5">
          <h2 className="text-xl font-medium text-neutral-300 mb-2">
            {" "}
            Your Private Key
          </h2>
          <p className="text-neutral-400 text-md font-normal">
            Keep this key safe and do not share it with anyone
          </p>
          <div className="flex flex-row justify-start items-center w-full gap-2 mt-5">
            <p className="text-neutral-400 text-md font-normal px-5 py-3 bg-neutral-800/80 rounded-md break-words w-full">
              {showPrivateKey ? developerData.privateKey : "****************"}
            </p>
            {showPrivateKey ? (
              <IoEyeOff
                className="text-2xl text-yellow-600 hover:scale-110 transition-all duration-200 cursor-pointer"
                onClick={togglePrivateKeyVisibility}
              />
            ) : (
              <IoMdEye
                className="text-2xl text-yellow-600 hover:scale-110 transition-all duration-200 cursor-pointer"
                onClick={togglePrivateKeyVisibility}
              />
            )}
            <MdFileCopy
              className="text-2xl text-green-600 hover:scale-110 transition-all duration-200 cursor-pointer"
              onClick={copyToClipboard.bind(null, developerData.privateKey)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-5 justify-center items-stretch mt-5 mb-5 w-full">
          <div className="flex justify-between items-center rounded-md bg-neutral-800/60 backdrop-blur-2xl py-5 px-10 gap-5 border-t-3 border-red-600">
            <div className="flex flex-col justify-center items-center gap-2">
              <h2 className="text-xl font-medium text-neutral-400 text-left">
                Streak
              </h2>
              <p className=" text-neutral-300 text-3xl font-medium">
                {developerData.streak}
              </p>
            </div>
            <span className="text-4xl text-red-600 p-2.5 rounded-md bg-red-600/10">
              <FaFireAlt />
            </span>
          </div>
          <div className="flex justify-between items-center rounded-md bg-neutral-800/60 backdrop-blur-2xl py-5 px-10 gap-5 border-t-3 border-blue-600">
            <div className="flex flex-col justify-center items-center gap-2">
              <h2 className="text-xl font-medium text-neutral-400 text-left">
                Total Time
              </h2>
              <p className=" text-neutral-300 text-3xl font-medium">
                {totalTime}hr
              </p>
            </div>
            <span className="text-4xl text-blue-600 p-2.5 rounded-md bg-blue-600/10">
              <GiStopwatch />
            </span>
          </div>
          <div className="flex justify-between items-center rounded-md bg-neutral-800/60 backdrop-blur-2xl py-5 px-10 gap-5 border-t-3 border-yellow-600">
            <div className="flex flex-col justify-center items-center gap-2">
              <h2 className="text-xl font-medium text-neutral-400 text-left">
                Total Languages
              </h2>
              <p className=" text-neutral-300 text-3xl font-medium">
                {developerData.activities.length}
              </p>
            </div>
            <span className="text-4xl text-yellow-500 p-2.5 rounded-md bg-yellow-600/10">
              <RiCodeSSlashLine />
            </span>
          </div>
          <div className="flex justify-between items-center w-full rounded-md bg-neutral-800/60 backdrop-blur-2xl py-5 px-10 gap-5 border-t-3 border-green-600">
            <div className="flex flex-col justify-center items-center gap-2">
              <h2 className="text-xl font-medium text-neutral-400 text-left">
                Top Language
              </h2>
              <p className=" text-neutral-300 text-3xl font-medium">
                {topLanguage}
              </p>
            </div>
            <span className="text-4xl text-green-600 p-2.5 rounded-md bg-green-600/10">
              <GoCodeOfConduct />
            </span>
          </div>
        </div>

        <div className="flex flex-col justify-start items-start w-full mt-5 p-5 rounded-md bg-neutral-800/60 backdrop-blur-2xl">
          <h2 className="text-3xl font-medium  text-neutral-300 mb-5">
            Languages
          </h2>
          <div className="flex flex-wrap justify-start items-stretch w-full gap-2 md:gap-5">
            {sortedActivities.map((activity, index) => (
              <LanguageBadge
                key={index}
                lang={activity.languageName}
                icon={languageIconsImage[activity.languageName]}
                color={languageColors[activity.languageName]}
                duration={Math.round(activity.totalDuration)}
              />
            ))}
          </div>
          <h3 className="text-xl font-medium  text-neutral-300 mt-5">
            Time Distribution
          </h3>
          <div className="flex flex-col justify-start items-start w-full gap-5">
            {sortedActivities.map((activity, index) => (
              <div
                key={index}
                className="flex flex-col justify-start items-start gap-2 w-full mt-5"
              >
                <div className="flex flex-row justify-between items-center w-full">
                  <div className="flex items-center">
                    <Image
                      src={languageIconsImage[activity.languageName]}
                      alt={activity.languageName}
                      width={24}
                      height={24}
                      className="w-6 h-6"
                    />
                    <p className="text-neutral-400 text-lg font-normal capitalize">
                      {activity.languageName}
                    </p>
                  </div>
                  <p className="text-neutral-400 text-lg font-medium">
                    {Math.round(activity.totalDuration)}m{" "}
                    <span className="text-green-600">
                      (
                      {Math.round(
                        (activity.totalDuration / totalDurationMinutes) * 100
                      )}
                      %)
                    </span>
                  </p>
                </div>
                <div className="w-full h-2.5 rounded-full bg-neutral-800/80 backdrop-blur-2xl">
                  <div
                    className={`h-full rounded-full ${
                      languageProgressBgColor[
                        activity.languageName?.toLowerCase()
                      ] || "bg-neutral-600"
                    }`}
                    style={{
                      width: `${
                        totalDurationMinutes > 0
                          ? (activity.totalDuration / totalDurationMinutes) *
                            100
                          : 0
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardComponent;
