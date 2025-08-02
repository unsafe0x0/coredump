import React from "react";
import Link from "next/link";
import { FaGithub, FaDiscord } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { VscVscode } from "react-icons/vsc";
import { GiShieldBash } from "react-icons/gi";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-neutral-950/50 border-t border-neutral-700/50">
      <div className="flex items-center justify-center w-full">
        <div className="flex flex-col lg:container w-full p-5 gap-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-2xl font-semibold text-white font-heading">
              <GiShieldBash />
              <span>BashForge</span>
            </div>
            <p className="text-neutral-400 text-sm font-normal">
              © {currentYear} BashForge. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="https://github.com/unsafe0x0"
                className="text-neutral-400 hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <FaGithub size={20} />
              </Link>
              <Link
                href="https://twitter.com/unsafezero"
                className="text-neutral-400 hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <FaSquareXTwitter size={20} />
              </Link>
              <Link
                href="https://discord.gg/unsafezero"
                className="text-neutral-400 hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Discord"
              >
                <FaDiscord size={20} />
              </Link>
              <Link
                href="https://marketplace.visualstudio.com/items?itemName=Unsafezero.bashforge"
                className="text-neutral-400 hover:text-white"
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
