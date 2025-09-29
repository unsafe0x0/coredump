"use client";

import React, { useState } from "react";
import Link from "next/link";
import { IoMdClose } from "react-icons/io";
import { SiCodeblocks } from "react-icons/si";
import { RiMenuLine } from "react-icons/ri";
import Button from "./Button";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const { data: session } = useSession();

  return (
    <nav className="fixed top-0 w-full bg-[#191919]/10 backdrop-blur-sm z-20 flex items-center justify-center">
      <div className="flex flex-col items-center justify-center p-3 max-w-7xl w-full">
        <div className="flex items-center justify-between w-full">
          <Link
            href={"/"}
            className="flex items-center gap-1 text-2xl font-semibold text-white font-heading"
          >
            <SiCodeblocks />
            <span>CoreDump</span>
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
            <Link href="/dashboard" className="hidden lg:block">
              <img
                src={session.user?.image ?? "/file.svg"}
                alt={
                  session.user?.name
                    ? `${session.user.name} profile`
                    : "profile"
                }
                className="w-10 h-10 rounded-full object-cover border border-[#2a2a2a]"
              />
            </Link>
          ) : (
            <Button
              forwardRoute="/login"
              variant="primary"
              className="hidden lg:block"
            >
              Login
            </Button>
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
              <Link href="/dashboard">
                <img
                  src={session.user?.image ?? "/file.svg"}
                  alt={
                    session.user?.name
                      ? `${session.user.name} profile`
                      : "profile"
                  }
                  className="w-10 h-10 rounded-full object-cover border border-[#2a2a2a]"
                />
              </Link>
            ) : (
              <Button forwardRoute="/login" variant="primary">
                Login
              </Button>
            )}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
