"use client";

import React, { useState } from "react";
import Link from "next/link";
import { IoMdClose } from "react-icons/io";
import { SiCodeblocks } from "react-icons/si";
import { RiMenuLine } from "react-icons/ri";
import Button from "./Button";
import { useSession } from "next-auth/react";
import ToggleTheme from "./ToggleTheme";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const { data: session } = useSession();

  return (
    <nav className="fixed top-0 w-full bg-background/10 backdrop-blur-sm z-20 flex items-center justify-center">
      <div className="flex flex-col items-center justify-center p-3 max-w-7xl w-full">
        <div className="flex items-center justify-between w-full">
          <Link
            href={"/"}
            className="flex items-center text-2xl font-semibold text-foreground font-heading"
          >
            <img
              src="/logo.svg"
              alt="CoreDump Logo"
              className="h-10 w-10"
            />
            <span>CoreDump</span>
          </Link>
          <ul className="hidden lg:flex items-center gap-5 text-foreground">
            <li>
              <Link
                href="/how-to-use"
                className="text-base font-normal text-foreground hover:text-accent"
              >
                How To Use
              </Link>
            </li>
            <li>
              <Link
                href="/leaderboard"
                className="text-base font-normal text-foreground hover:text-accent"
              >
                Leaderboard
              </Link>
            </li>
          </ul>
          <div className="hidden lg:flex items-center gap-5">
            <ToggleTheme />
            {session ? (
              <Link href="/dashboard" className="hidden lg:block">
                <img
                  src={session.user?.image ?? "/file.svg"}
                  alt={
                    session.user?.name
                      ? `${session.user.name} profile`
                      : "profile"
                  }
                  className="w-10 h-10 rounded-full object-cover"
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
          </div>
          <div className="lg:hidden text-foreground flex items-center gap-2">
            <ToggleTheme />
            <button onClick={toggleMenu} className="">
              {isMenuOpen ? (
                <IoMdClose className="text-3xl" />
              ) : (
                <RiMenuLine className="text-3xl" />
              )}
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <ul className="flex flex-col items-center gap-3 mt-4 lg:hidden">
            <li>
              <Link
                href="/how-to-use"
                className="text-base font-normal text-foreground hover:text-accent"
              >
                How To Use
              </Link>
            </li>
            <li>
              <Link
                href="/leaderboard"
                className="text-base font-normal text-foreground hover:text-accent"
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
                  className="w-10 h-10 rounded-full object-cover"
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
