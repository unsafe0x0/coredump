"use client";

import React, { useState } from "react";
import Link from "next/link";
import { GiShieldBash } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { RiMenuLine } from "react-icons/ri";
import Button from "./ui/Button";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const { data: session } = useSession();

  return (
    <nav className="fixed top-0 w-full bg-neutral-950/10 backdrop-blur-sm border-b border-neutral-700/50 z-20 flex items-center justify-center">
      <div className="flex flex-col items-center justify-center p-3 lg:container w-full">
        <div className="flex items-center justify-between w-full">
          <Link
            href={"/"}
            className="flex items-center gap-1 text-2xl font-semibold text-white font-heading"
          >
            <GiShieldBash />
            <span>BashForge</span>
          </Link>
          <ul className="hidden lg:flex items-center gap-5 text-white">
            <li>
              <Link
                href="/how-to-use"
                className="text-base font-normal text-neutral-100 hover:text-neutral-300"
              >
                How To Use
              </Link>
            </li>
            <li>
              <Link
                href="/leaderboard"
                className="text-base font-normal text-neutral-100 hover:text-neutral-300"
              >
                Leaderboard
              </Link>
            </li>
          </ul>
          {session ? (
            <Button
              label="Dashboard"
              forwardRoute="/dashboard"
              variant="primary"
              className="hidden lg:block"
            />
          ) : (
            <Button
              label="Login"
              forwardRoute="/login"
              variant="primary"
              className="hidden lg:block"
            />
          )}
          <button onClick={toggleMenu} className="lg:hidden text-neutral-100">
            {isMenuOpen ? (
              <IoMdClose className="text-3xl" />
            ) : (
              <RiMenuLine className="text-3xl" />
            )}
          </button>
        </div>
        {isMenuOpen && (
          <ul className="flex flex-col items-center gap-3 mt-4 lg:hidden">
            <li>
              <Link
                href="/how-to-use"
                className="text-base font-normal text-neutral-100 hover:text-neutral-300"
              >
                How To Use
              </Link>
            </li>
            <li>
              <Link
                href="/leaderboard"
                className="text-base font-normal text-neutral-100 hover:text-neutral-300"
              >
                Leaderboard
              </Link>
            </li>
            {session ? (
              <Button
                label="Dashboard"
                forwardRoute="/dashboard"
                variant="primary"
              />
            ) : (
              <Button
                label="Login"
                forwardRoute="/login"
                variant="primary"
              />
            )}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
