"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { MdDelete, MdLogout } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { IoHomeOutline } from "react-icons/io5";
import { MdContentCopy } from "react-icons/md";
import axios from "axios";
import { useRouter } from "next/navigation";

const Profile = () => {
  const [profileImage, setProfileImage] = useState("/default-profile.jpg");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gitUsername, setgitUsername] = useState("");
  const [twitterUsername, setTwitterUsername] = useState("");
  const [password, setPassword] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copyBtn, setCopyBtn] = useState("Copy");

  const router = useRouter();

  const handleShowPassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleDataFetch = async () => {
    try {
      const response = await axios.get("/api/user/profile");
      const details = response.data.data;
      setProfileImage(details.profileImage);
      setName(details.name);
      setEmail(details.email);
      setgitUsername(details.gitUsername);
      setTwitterUsername(details.twitterUsername);
      setPrivateKey(details.privateKey);
    } catch (error) {
      setError("Failed to fetch profile data. Please try again later.");
    }
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post("/api/auth/logout");
      if (response.status === 200) {
        router.push("/");
      } else {
        setError("Logout failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during logout:", error);
      setError("An error occurred while logging out. Please try again later.");
    }
  };

  useEffect(() => {
    handleDataFetch();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!email || !gitUsername) {
      setError("Email and GitHub Username cannot be empty.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post("/api/user/update", {
        email,
        gitUsername,
        twitterUsername,
        name,
        password,
      });
      if (response.status === 200) {
        setError(null);
        alert("Profile updated successfully");
      }
    } catch (error) {
      setError("Something went wrong while updating profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("Email cannot be empty.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post("/api/user/delete", { email });
      if (response.status === 200) {
        alert("Profile deleted successfully");
        handleLogout();
        router.push("/");
      }
    } catch (error) {
      setError("Something went wrong while deleting profile.");
    } finally {
      setLoading(false);
    }
  };

  const copyPrivateKey = () => {
    navigator.clipboard.writeText(privateKey);
    setCopyBtn("Copied");
    setTimeout(() => {
      setCopyBtn("Copy");
    }, 2000);
  };

  return (
    <section className="flex justify-center items-start w-full">
      <div className="flex flex-col justify-center items-center max-w-xl w-full px-5 gap-5 ">
        <div className="flex justify-between items-center w-full gap-5">
          <Link
            href={"/"}
            className="text-lg text-green-600 underline flex items-center gap-1"
          >
            <IoHomeOutline className="text-xl" />
            Home
          </Link>
          <button
            onClick={handleLogout}
            className="px-3 py-1.5 md:py-1.5 text-lg font-medium cursor-pointer bg-red-600 rounded-lg hover:bg-red-700 border border-red-500 transition-all duration-300 ease-in-out flex items-center gap-1"
          >
            Logout <MdLogout className="text-xl" />
          </button>
        </div>
        <h2 className="text-3xl self-center font-medium text-white/80 mt-2 mb-2">
          Your Profile
        </h2>
        <div className="flex flex-col justify-center items-center w-full gap-1">
          <img
            src={`${profileImage}`}
            alt={`${gitUsername}'s profile picture`}
            className="h-32 w-32 rounded-full object-cover"
          />
          <p className="text-lg text-white/70 font-medium self-center">
            @{gitUsername}
          </p>
        </div>
        <div className="flex flex-col justify-start items-start w-full gap-1">
          <p className="text-lg text-white/70 font-medium">Your private key</p>
          <p className="text-lg text-white/70 bg-neutral-900/50 border border-green-600 px-3 py-1.5 md:py-1.5 rounded-lg w-full break-words">
            {privateKey}
          </p>
          <button
            onClick={copyPrivateKey}
            className="text-lg text-green-600 cursor-pointer flex items-center gap-1 self-end"
          >
            {copyBtn} <MdContentCopy className="text-xl" />
          </button>
        </div>
        <form
          action=""
          className="flex flex-col justify-start items-start w-full space-y-5"
        >
          <div className="flex flex-col justify-start items-start w-full gap-1">
            <label htmlFor="name" className="text-lg text-white/70 font-medium">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-md font-medium text-white/70 outline-hidden bg-neutral-900/50 w-full border border-neutral-700/50 px-3 py-1.5 md:py-1.5 rounded-lg"
            />
          </div>
          <div className="flex flex-col justify-start items-start w-full gap-1">
            <label
              htmlFor="email"
              className="text-lg text-white/70 font-medium"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-md font-medium text-white/70 outline-hidden bg-neutral-900/50 w-full border border-neutral-700/50 px-3 py-1.5 md:py-1.5 rounded-lg"
            />
          </div>
          <div className="flex flex-col justify-start items-start w-full gap-1">
            <label
              htmlFor="gitUsername"
              className="text-lg text-white/70 font-medium"
            >
              GitHub Username
            </label>
            <input
              type="text"
              name="gitUsername"
              id="gitUsername"
              placeholder="GitHub Username"
              value={gitUsername}
              onChange={(e) => setgitUsername(e.target.value)}
              className="text-md font-medium text-white/70 outline-hidden bg-neutral-900/50 w-full border border-neutral-700/50 px-3 py-1.5 md:py-1.5 rounded-lg"
            />
          </div>
          <div className="flex flex-col justify-start items-start w-full gap-1">
            <label
              htmlFor="twitterUsername"
              className="text-lg text-white/70 font-medium"
            >
              Twitter Username
            </label>
            <input
              type="text"
              name="twitterUsername"
              id="twitterUsername"
              placeholder="Twitter Username"
              value={twitterUsername}
              onChange={(e) => setTwitterUsername(e.target.value)}
              className="text-md font-medium text-white/70 outline-hidden bg-neutral-900/50 w-full border border-neutral-700/50 px-3 py-1.5 md:py-1.5 rounded-lg"
            />
          </div>
          <div className="flex flex-col justify-start items-start w-full gap-1">
            <label
              htmlFor="password"
              className="text-lg text-white/70 font-medium"
            >
              Password
            </label>
            <div className="flex justify-between items-center w-full border border-neutral-700/50 px-3 py-1.5 md:py-1.5 rounded-lg">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-md font-medium text-white/70 outline-hidden bg-transparent w-full"
              />
              <button
                type="button"
                className="text-green-600 text-lg"
                onClick={handleShowPassword}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>
          {error && (
            <p className="text-green-600 font-medium text-sm">{error}</p>
          )}
          <div className="flex flex-wrap justify-start items-center w-full gap-2">
            <button
              disabled={loading}
              onClick={handleUpdate}
              className={`px-3 py-1.5 md:py-1.5 text-lg font-medium cursor-pointer bg-green-600 rounded-lg ${
                loading
                  ? "cursor-not-allowed opacity-50"
                  : "hover:bg-green-600/80"
              } border border-green-600 transition-all duration-300 ease-in-out flex items-center gap-1`}
            >
              {loading ? "Updating..." : "Update"}{" "}
              <FiEdit className="text-xl" />
            </button>
            <button
              disabled={loading}
              onClick={handleDelete}
              className={`px-3 py-1.5 md:py-1.5 text-lg font-medium cursor-pointer bg-red-600 rounded-lg ${
                loading ? "cursor-not-allowed opacity-50" : "hover:bg-red-700"
              } border border-red-500 transition-all duration-300 ease-in-out flex items-center gap-1`}
            >
              {loading ? "Deleting..." : "Delete"}{" "}
              <MdDelete className="text-xl" />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Profile;
