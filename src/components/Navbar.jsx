"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { GiShieldBash } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { RiMenuLine } from "react-icons/ri";
import axios from "axios";
import Image from "next/image";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const response = await axios.get("/api/auth/check");
        setIsLogged(response.data.isLogged);
      } catch (error) {
        console.error("Error checking login status:", error);
      }
    };
    checkLogin();
  }, []);

  return (
    <nav className="flex justify-center items-center w-full border-b border-neutral-700/40 bg-neutral-800/30 backdrop-blur-3xl sticky top-0 z-50">
      <div className="flex flex-col justify-center items-center w-full px-5 py-2 lg:container">
        <div className="flex justify-between items-center w-full">
          {/* Logo */}
          <Link href="/">
            <h1 className="text-2xl font-medium  text-neutral-300 flex items-center gap-2">
              {/* <GiShieldBash className="text-green-600 text-2xl" /> */}
              <Image
                src="/logo.svg"
                alt="BashForge Logo"
                width={30}
                height={30}
                className="object-contain"
              />
              BashForge
            </h1>
          </Link>

          <ul className="hidden lg:flex justify-center items-center gap-5 text-md font-normal  text-neutral-300">
            <li>
              <Link
                href="/how-to-use"
                className="hover: text-neutral-300 transition-colors duration-200"
              >
                How to Use
              </Link>
            </li>
            <li>
              <Link
                href="/leaderboard"
                className="hover: text-neutral-300 transition-colors duration-200"
              >
                Leaderboard
              </Link>
            </li>
            <li>
              <Link
                href="https://github.com/muxdust/BashForge-extension"
                target="_blank"
                className="hover: text-neutral-300 transition-colors duration-200"
              >
                Extension
              </Link>
            </li>
          </ul>
          {isLogged ? (
            <Link
              href="/profile"
              className="hidden lg:flex px-4 py-2 rounded text-md font-medium bg-green-600 hover:bg-green-600/70 transition-colors duration-200"
            >
              Profile
            </Link>
          ) : (
            <Link
              href="/login"
              className="hidden lg:flex px-4 py-2 rounded text-md font-medium bg-green-600 hover:bg-green-600/70 transition-colors duration-200"
            >
              Login
            </Link>
          )}
          <button className="lg:hidden block" onClick={toggleMenu}>
            {isMenuOpen ? (
              <IoMdClose size={28} className="text-neutral-400" />
            ) : (
              <RiMenuLine size={28} className="text-neutral-400" />
            )}
          </button>
        </div>
        {isMenuOpen && (
          <div className="flex flex-col justify-center items-center gap-4 w-full mt-5 pb-3">
            <ul className="flex flex-col justify-center items-center gap-5 text-md font-normal  text-neutral-300">
              <li>
                <Link
                  href="/how-to-use"
                  className="hover: text-neutral-300 transition-colors duration-200"
                >
                  How to Use
                </Link>
              </li>
              <li>
                <Link
                  href="/leaderboard"
                  className="hover: text-neutral-300 transition-colors duration-200"
                >
                  Leaderboard
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/muxdust/BashForge-extension"
                  target="_blank"
                  className="hover: text-neutral-300 transition-colors duration-200"
                >
                  Extension
                </Link>
              </li>
            </ul>
            {isLogged ? (
              <Link
                href="/profile"
                className="w-full md:w-auto text-center px-4 py-2 rounded bg-green-600 hover:bg-green-600/70 text-md font-medium transition"
              >
                Profile
              </Link>
            ) : (
              <Link
                href="/login"
                className="w-full md:w-auto text-center px-4 py-2 rounded bg-green-600 hover:bg-green-600/70 text-md font-medium transition"
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
