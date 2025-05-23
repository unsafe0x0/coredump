"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { GiShieldBash } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { RiMenuLine } from "react-icons/ri";
import axios from "axios";

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
    <nav className="flex justify-center items-center w-full border-b border-white/10 bg-zinc-900/60 backdrop-blur-3xl sticky top-0 z-50">
      <div className="flex flex-col justify-center items-center w-full px-5 py-2 lg:container">
        <div className="flex justify-between items-center w-full">
          {/* Logo */}
          <Link href="/">
            <h1 className="text-xl font-medium text-white/80 flex items-center gap-2">
              <GiShieldBash className="text-teal-600 text-2xl" />
              BashForge
            </h1>
          </Link>

          <ul className="hidden lg:flex justify-center items-center gap-5 text-md font-normal text-white/80">
            <li>
              <Link
                href="/"
                className="hover:text-white/80 transition-colors duration-200"
              >
                How to Use
              </Link>
            </li>
            <li>
              <Link
                href="/leaderboard"
                className="hover:text-white/80 transition-colors duration-200"
              >
                Leaderboard
              </Link>
            </li>
            <li>
              <Link
                href="https://github.com/muxdust/BashForge-extension"
                target="_blank"
                className="hover:text-white/80 transition-colors duration-200"
              >
                Extension
              </Link>
            </li>
          </ul>
          {isLogged ? (
            <Link
              href="/profile"
              className="hidden lg:flex px-4 py-2 rounded-lg text-md font-medium bg-teal-600 hover:bg-teal-600/80 transition-colors duration-200"
            >
              Profile
            </Link>
          ) : (
            <Link
              href="/login"
              className="hidden lg:flex px-4 py-2 rounded-lg text-md font-medium bg-teal-600 hover:bg-teal-600/80 transition-colors duration-200"
            >
              Login
            </Link>
          )}
          <button className="lg:hidden block" onClick={toggleMenu}>
            {isMenuOpen ? (
              <IoMdClose size={28} className="text-white/70" />
            ) : (
              <RiMenuLine size={28} className="text-white/70" />
            )}
          </button>
        </div>
        {isMenuOpen && (
          <div className="flex flex-col justify-center items-center gap-4 w-full mt-5 pb-3">
            <ul className="flex flex-col justify-center items-center gap-5 text-md font-normal text-white/80">
              <li>
                <Link
                  href="/"
                  className="hover:text-white/80 transition-colors duration-200"
                >
                  How to Use
                </Link>
              </li>
              <li>
                <Link
                  href="/leaderboard"
                  className="hover:text-white/80 transition-colors duration-200"
                >
                  Leaderboard
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/muxdust/BashForge-extension"
                  target="_blank"
                  className="hover:text-white/80 transition-colors duration-200"
                >
                  Extension
                </Link>
              </li>
            </ul>
            {isLogged ? (
              <Link
                href="/profile"
                className="w-full md:w-auto text-center px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-600/80 text-md font-medium transition"
              >
                Profile
              </Link>
            ) : (
              <Link
                href="/login"
                className="w-full md:w-auto text-center px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-600/80 text-md font-medium transition"
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
