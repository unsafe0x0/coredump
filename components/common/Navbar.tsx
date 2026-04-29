"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { List, X } from "@phosphor-icons/react";
import Button from "./Button";
import ToggleTheme from "./ToggleTheme";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const { data: session } = useSession();

  return (
    <nav className="sticky top-0 w-full bg-background border-b border-border z-30 flex items-center justify-center">
      <div className="flex flex-col items-center justify-center px-4 py-3 max-w-7xl w-full">
        <div className="flex items-center justify-between w-full">
          <Link
            href={"/"}
            className="flex items-center text-2xl font-semibold text-foreground font-heading tracking-tight"
          >
            <Image
              src="/logo.svg"
              alt="CoreDump Logo"
              className="h-10 w-10"
              width={40}
              height={40}
            />
            <span>CoreDump</span>
          </Link>
          <ul className="hidden lg:flex items-center gap-6 text-foreground">
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
                href="/docs"
                className="text-base font-normal text-foreground hover:text-accent"
              >
                Docs
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
          <div className="hidden lg:flex items-center gap-4">
            <ToggleTheme />
            {session ? (
              <Link href="/dashboard" className="hidden lg:block">
                <Image
                  src={session.user?.image ?? "/file.svg"}
                  alt={
                    session.user?.name
                      ? `${session.user.name} profile`
                      : "profile"
                  }
                  className="w-10 h-10 rounded-full object-cover"
                  width={40}
                  height={40}
                  unoptimized
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
            <button type="button" onClick={toggleMenu} className="">
              {isMenuOpen ? (
                <X className="text-3xl" />
              ) : (
                <List className="text-3xl" />
              )}
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <ul className="flex flex-col items-center gap-3 mt-4 lg:hidden w-full rounded-xl border border-border bg-card py-4">
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
                href="/docs"
                className="text-base font-normal text-foreground hover:text-accent"
              >
                Docs
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
                <Image
                  src={session.user?.image ?? "/file.svg"}
                  alt={
                    session.user?.name
                      ? `${session.user.name} profile`
                      : "profile"
                  }
                  className="w-10 h-10 rounded-full object-cover"
                  width={40}
                  height={40}
                  unoptimized
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
