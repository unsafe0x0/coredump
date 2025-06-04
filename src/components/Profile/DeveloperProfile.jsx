"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaFireAlt } from "react-icons/fa";
import { GiStopwatch } from "react-icons/gi";
import { RiCodeSSlashLine } from "react-icons/ri";
import { GoCodeOfConduct } from "react-icons/go";
import LanguageBadge from "../Leaderboard/LanguageBadge";
import {
  languageIconsImage,
  languageColors,
  languageProgressBgColor,
} from "@/lib/languageData";

const DeveloperProfile = () => {
  const { username } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`/api/developer/${username}`);
        setProfileData(response.data.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [username]);

  if (loading) {
    return (
      <div
        role="status"
        className="flex justify-center items-center w-full min-h-screen"
      >
        <svg
          aria-hidden="true"
          className="inline w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-cyan-500"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center w-full min-h-screen">
        Error: {error.message}
      </div>
    );
  }

  const totalTime = Number(
    profileData?.activities.reduce(
      (sum, activity) => sum + activity.totalDuration,
      0,
    ) / 60,
  ).toFixed(2);

  const thisWeekTotalTime = Number(
    profileData?.activities.reduce(
      (sum, activity) => sum + activity.last7DaysDuration,
      0,
    ) / 60,
  ).toFixed(2);

  const totalDurationMinutes = profileData?.activities.reduce(
    (sum, activity) => sum + activity.totalDuration,
    0,
  );

  const sortedActivities = [...profileData.activities].sort(
    (a, b) => b.totalDuration - a.totalDuration,
  );

  const topLanguageActivity = sortedActivities[0];
  const topLanguage = topLanguageActivity?.shortLanguageName || "N/A";

  return (
    <section className="flex justify-center items-start w-full min-h-screen py-10">
      <div className="flex flex-col justify-start items-start lg:container w-full px-3">
        <h2 className="text-3xl font-medium text-neutral-400 text-left self-start mb-5">
          <span className="text-cyan-500/80">{profileData.name}</span>'s Profile
        </h2>

        <div className="flex flex-col justify-start items-start w-full p-5 rounded bg-neutral-800/30 backdrop-blur-2xl mb-5">
          <div className="flex flex-row justify-start items-start gap-5 mt-5">
            <Image
              src={profileData.profileImage}
              alt={profileData.gitUsername}
              width={100}
              height={100}
              className="w-24 h-24 rounded object-cover"
            />
            <div className="flex flex-col justify-start items-start gap-2">
              <p className=" text-neutral-300 text-2xl font-medium">
                {profileData.name}
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <Link
                  href={`https://github.com/${profileData.gitUsername}`}
                  target="_blank"
                  className="text-neutral-400 hover:underline text-md flex gap-1 items-center"
                >
                  <FaGithub />
                  {profileData.gitUsername}
                </Link>
                <Link
                  href={`https://twitter.com/${profileData.twitterUsername}`}
                  target="_blank"
                  className="text-neutral-400 hover:underline text-md flex gap-1 items-center"
                >
                  <FaSquareXTwitter />
                  {profileData.twitterUsername}
                </Link>
              </div>
              <p className="text-neutral-400 text-lg font-medium">
                Crushed{" "}
                <span className="text-cyan-500/80">{thisWeekTotalTime}hr</span>{" "}
                this week
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-5 justify-center items-stretch mt-5 mb-5 w-full">
          <div className="flex justify-between items-center rounded bg-neutral-800/30 backdrop-blur-2xl py-5 px-10 gap-5 border-t-3 border-red-500/80">
            <div className="flex flex-col justify-center items-center gap-2">
              <h2 className="text-xl font-medium text-neutral-400 text-left">
                Streak
              </h2>
              <p className=" text-neutral-300 text-3xl font-medium">
                {profileData.streak}
              </p>
            </div>
            <span className="text-4xl text-red-500/80 p-2.5 rounded bg-red-500/10">
              <FaFireAlt />
            </span>
          </div>
          <div className="flex justify-between items-center rounded bg-neutral-800/30 backdrop-blur-2xl py-5 px-10 gap-5 border-t-3 border-blue-500/80">
            <div className="flex flex-col justify-center items-center gap-2">
              <h2 className="text-xl font-medium text-neutral-400 text-left">
                Total Time
              </h2>
              <p className=" text-neutral-300 text-3xl font-medium">
                {totalTime}hr
              </p>
            </div>
            <span className="text-4xl text-blue-500/80 p-2.5 rounded bg-blue-500/10">
              <GiStopwatch />
            </span>
          </div>
          <div className="flex justify-between items-center rounded bg-neutral-800/30 backdrop-blur-2xl py-5 px-10 gap-5 border-t-3 border-yellow-500/80">
            <div className="flex flex-col justify-center items-center gap-2">
              <h2 className="text-xl font-medium text-neutral-400 text-left">
                Total Languages
              </h2>
              <p className=" text-neutral-300 text-3xl font-medium">
                {profileData.activities.length}
              </p>
            </div>
            <span className="text-4xl text-yellow-500/80 p-2.5 rounded bg-yellow-500/10">
              <RiCodeSSlashLine />
            </span>
          </div>
          <div className="flex justify-between items-center w-full rounded bg-neutral-800/30 backdrop-blur-2xl py-5 px-10 gap-5 border-t-3 border-cyan-500/80">
            <div className="flex flex-col justify-center items-center gap-2">
              <h2 className="text-xl font-medium text-neutral-400 text-left">
                Top Language
              </h2>
              <p className=" text-neutral-300 text-3xl font-medium">
                {topLanguage}
              </p>
            </div>
            <span className="text-4xl text-cyan-500/80 p-2.5 rounded bg-cyan-500/10">
              <GoCodeOfConduct />
            </span>
          </div>
        </div>

        <div className="flex flex-col justify-start items-start w-full mt-5 p-5 rounded bg-neutral-800/30 backdrop-blur-2xl backdrop-blur-xl">
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
                    <span className="text-cyan-500/80">
                      (
                      {Math.round(
                        (activity.totalDuration / totalDurationMinutes) * 100,
                      )}
                      %)
                    </span>
                  </p>
                </div>
                <div className="w-full h-2.5 rounded-full bg-white/10">
                  <div
                    className={`h-full rounded-full ${
                      languageProgressBgColor[
                        activity.languageName?.toLowerCase()
                      ] || "bg-neutral-500"
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

export default DeveloperProfile;
