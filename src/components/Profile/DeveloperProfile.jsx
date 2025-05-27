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
import LanguageBadge from "../Home/LanguageBadge";
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
      <div className="flex justify-center items-center w-full min-h-screen">
        Loading...
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
      0
    ) / 60
  ).toFixed(2);

  const thisWeekTotalTime = Number(
    profileData?.activities.reduce(
      (sum, activity) => sum + activity.last7DaysDuration,
      0
    ) / 60
  ).toFixed(2);

  const totalDurationMinutes = profileData?.activities.reduce(
    (sum, activity) => sum + activity.totalDuration,
    0
  );

  const sortedActivities = [...profileData.activities].sort(
    (a, b) => b.totalDuration - a.totalDuration
  );

  const topLanguageActivity = sortedActivities[0];
  const topLanguage = topLanguageActivity?.shortLanguageName || "N/A";

  return (
    <section className="flex justify-center items-start w-full min-h-screen py-10">
      <div className="flex flex-col justify-start items-start lg:container w-full px-5">
        <h2 className="text-3xl font-medium text-white/70 text-left self-start mb-5">
          <span className="text-teal-600/90">{profileData.name}</span>'s Profile
        </h2>

        <div className="flex flex-col justify-start items-start w-full p-5 rounded-lg bg-zinc-800/80 backdrop-blur-xl mb-5">
          <div className="flex flex-row justify-start items-start gap-5 mt-5">
            <Image
              src={profileData.profileImage}
              alt={profileData.gitUsername}
              width={100}
              height={100}
              className="w-24 h-24 rounded-xl object-cover"
            />
            <div className="flex flex-col justify-start items-start gap-2">
              <p className="text-white/80 text-2xl font-medium">
                {profileData.name}
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <Link
                  href={`https://github.com/${profileData.gitUsername}`}
                  target="_blank"
                  className="text-white/70 hover:underline text-lg flex gap-1 items-center"
                >
                  <FaGithub />
                  {profileData.gitUsername}
                </Link>
                <Link
                  href={`https://twitter.com/${profileData.twitterUsername}`}
                  target="_blank"
                  className="text-white/70 hover:underline text-lg flex gap-1 items-center"
                >
                  <FaSquareXTwitter />
                  {profileData.twitterUsername}
                </Link>
              </div>
              <p className="text-white/70 text-lg font-medium">
                Crushed{" "}
                <span className="text-teal-600/90">{thisWeekTotalTime}hr</span>{" "}
                this week
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-5 justify-center items-stretch mt-5 mb-5 w-full">
          <div className="flex justify-between items-center rounded-lg bg-zinc-800/80 backdrop-blur-xl py-5 px-10 gap-5 border-t-3 border-red-500/80">
            <div className="flex flex-col justify-center items-center gap-2">
              <h2 className="text-xl font-medium text-white/70 text-left">
                Streak
              </h2>
              <p className="text-white/80 text-3xl font-medium">
                {profileData.streak}
              </p>
            </div>
            <span className="text-4xl text-red-400 p-2.5 rounded-lg bg-red-400/10">
              <FaFireAlt />
            </span>
          </div>
          <div className="flex justify-between items-center rounded-lg bg-zinc-800/80 backdrop-blur-xl py-5 px-10 gap-5 border-t-3 border-blue-500/80">
            <div className="flex flex-col justify-center items-center gap-2">
              <h2 className="text-xl font-medium text-white/70 text-left">
                Total Time
              </h2>
              <p className="text-white/80 text-3xl font-medium">
                {totalTime}hr
              </p>
            </div>
            <span className="text-4xl text-blue-400 p-2.5 rounded-lg bg-blue-400/10">
              <GiStopwatch />
            </span>
          </div>
          <div className="flex justify-between items-center rounded-lg bg-zinc-800/80 backdrop-blur-xl py-5 px-10 gap-5 border-t-3 border-yellow-500/80">
            <div className="flex flex-col justify-center items-center gap-2">
              <h2 className="text-xl font-medium text-white/70 text-left">
                Total Languages
              </h2>
              <p className="text-white/80 text-3xl font-medium">
                {profileData.activities.length}
              </p>
            </div>
            <span className="text-4xl text-yellow-400 p-2.5 rounded-lg bg-yellow-400/10">
              <RiCodeSSlashLine />
            </span>
          </div>
          <div className="flex justify-between items-center w-full rounded-lg bg-zinc-800/80 backdrop-blur-xl py-5 px-10 gap-5 border-t-3 border-teal-600/80">
            <div className="flex flex-col justify-center items-center gap-2">
              <h2 className="text-xl font-medium text-white/70 text-left">
                Top Language
              </h2>
              <p className="text-white/80 text-3xl font-medium">
                {topLanguage}
              </p>
            </div>
            <span className="text-4xl text-teal-400 p-2.5 rounded-lg bg-teal-400/10">
              <GoCodeOfConduct />
            </span>
          </div>
        </div>

        <div className="flex flex-col justify-start items-start w-full mt-5 p-5 rounded-lg bg-zinc-800/80 backdrop-blur-xl">
          <h2 className="text-3xl font-medium text-white/80 mb-5">Languages</h2>
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
          <h3 className="text-xl font-medium text-white/80 mt-5">
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
                    <p className="text-white/70 text-lg font-normal capitalize">
                      {activity.languageName}
                    </p>
                  </div>
                  <p className="text-white/70 text-lg font-medium">
                    {Math.round(activity.totalDuration)}m{" "}
                    <span className="text-teal-600/80">
                      (
                      {Math.round(
                        (activity.totalDuration / totalDurationMinutes) * 100
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
                      ] || "bg-zinc-500"
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
