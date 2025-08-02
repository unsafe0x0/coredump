import React from "react";
import { FaGithub, FaTwitter, FaDiscord, FaCode } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-neutral-950/50 border-t border-neutral-700/50">
      <div className="flex items-center justify-center w-full">
        <div className="flex flex-col lg:container w-full p-5 gap-8">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <FaCode className="text-white text-2xl" />
                <h3 className="text-xl font-semibold text-white font-heading">
                  BashForge
                </h3>
              </div>
              <p className="text-neutral-300 text-sm font-normal">
                Push limits, break barriers, and dominate in the world of
                coding.
              </p>
            </div>

            {/* Product Links */}
            <div className="flex flex-col gap-4">
              <h4 className="text-lg font-semibold text-white font-heading">
                Product
              </h4>
              <div className="flex flex-col gap-2">
                <a
                  href="/leaderboard"
                  className="text-neutral-300 text-sm hover:text-white "
                >
                  Leaderboard
                </a>
                <a
                  href="/analytics"
                  className="text-neutral-300 text-sm hover:text-white "
                >
                  Analytics
                </a>
                <a
                  href="/achievements"
                  className="text-neutral-300 text-sm hover:text-white "
                >
                  Achievements
                </a>
              </div>
            </div>

            {/* Resources Links */}
            <div className="flex flex-col gap-4">
              <h4 className="text-lg font-semibold text-white font-heading">
                Resources
              </h4>
              <div className="flex flex-col gap-2">
                <a
                  href="https://marketplace.visualstudio.com/items?itemName=Unsafezero.bashforge"
                  className="text-neutral-300 text-sm hover:text-white "
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  VS Code Extension
                </a>
                <a
                  href="/docs"
                  className="text-neutral-300 text-sm hover:text-white "
                >
                  Documentation
                </a>
                <a
                  href="/api"
                  className="text-neutral-300 text-sm hover:text-white "
                >
                  API Reference
                </a>
              </div>
            </div>

            {/* Support Links */}
            <div className="flex flex-col gap-4">
              <h4 className="text-lg font-semibold text-white font-heading">
                Support
              </h4>
              <div className="flex flex-col gap-2">
                <a
                  href="mailto:support@bashforge.dev"
                  className="text-neutral-300 text-sm hover:text-white "
                >
                  Contact Us
                </a>
                <a
                  href="/help"
                  className="text-neutral-300 text-sm hover:text-white "
                >
                  Help Center
                </a>
                <a
                  href="/privacy"
                  className="text-neutral-300 text-sm hover:text-white "
                >
                  Privacy Policy
                </a>
                <a
                  href="/terms"
                  className="text-neutral-300 text-sm hover:text-white "
                >
                  Terms of Service
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row items-center justify-between pt-6 border-t border-neutral-700/50 gap-4">
            <p className="text-neutral-400 text-sm font-normal">
              © {currentYear} BashForge. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/unsafe0x0"
                className="text-neutral-400 hover:text-white "
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <FaGithub size={20} />
              </a>
              <a
                href="https://twitter.com/bashforge"
                className="text-neutral-400 hover:text-white "
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="https://discord.gg/bashforge"
                className="text-neutral-400 hover:text-white "
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Discord"
              >
                <FaDiscord size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
