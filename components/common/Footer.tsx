import React from "react";
import Link from "next/link";
import { FaGithub, FaDiscord } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { VscVscode } from "react-icons/vsc";
import { SiCodeblocks } from "react-icons/si";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-background border-t border-border">
      <div className="flex items-center justify-center w-full">
        <div className="flex flex-col max-w-7xl w-full p-5 gap-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center text-2xl font-semibold text-foreground font-heading">
              <img src="/logo.svg" alt="CoreDump Logo" className="h-10 w-10" />
              <span>CoreDump</span>
            </div>
            <p className="text-foreground/80 text-sm font-normal">
              © {currentYear} CoreDump. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="https://github.com/unsafe0x0"
                className="text-foreground/80 hover:text-accent"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <FaGithub size={20} />
              </Link>
              <Link
                href="https://twitter.com/unsafezero"
                className="text-foreground/80 hover:text-accent"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <FaSquareXTwitter size={20} />
              </Link>
              <Link
                href="https://discord.gg/unsafezero"
                className="text-foreground/80 hover:text-accent"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Discord"
              >
                <FaDiscord size={20} />
              </Link>
              <Link
                href="https://marketplace.visualstudio.com/items?itemName=Unsafezero.coredump"
                className="text-foreground/80 hover:text-accent"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="VS Code Extension"
              >
                <VscVscode size={20} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
