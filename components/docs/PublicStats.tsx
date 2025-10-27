"use client";

import React from "react";
import { RiRouteFill } from "react-icons/ri";
import { MdOutlineDescription } from "react-icons/md";

const PublicStats: React.FC = () => {
  const username = "yourusername";
  const statsEndpoint = `https://coredump.vercel.app/api/stats?username=${username}`;
  const publicStatsEndpoint = `https://coredump.vercel.app/api/public-stats?username=${username}`;

  const endpoints = [
    {
      title: "README Stats API",
      description: "SVG badges for your GitHub README",
      url: `${statsEndpoint}&type=stats-card`,
      params: "username, type (stats-card/total-time)",
      icon: <RiRouteFill />,
    },
    {
      title: "Public Stats API",
      description: "JSON data for programmatic access",
      url: publicStatsEndpoint,
      params: "username",
      icon: <MdOutlineDescription />,
    },
  ];

  return (
    <div className="flex flex-col justify-start items-center w-full py-20 gap-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-semibold text-foreground font-heading">
          Public APIs
        </h1>
        <p className="text-foreground/80 text-base font-normal max-w-2xl mx-auto">
          Access your coding statistics programmatically or display them in your
          README
        </p>
      </div>

      <div className="w-full max-w-4xl space-y-8">
        {endpoints.map((endpoint, index) => (
          <div key={index} className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground font-heading">
              {endpoint.title}
            </h2>

            <p className="text-foreground/80 text-lg leading-relaxed">
              {endpoint.description}
            </p>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">
                  Endpoint
                </h3>
                <div className="bg-card p-4 rounded-lg border border-border font-mono text-sm break-all">
                  <code>{endpoint.url}</code>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">
                  Parameters
                </h3>
                <p className="text-foreground/70">{endpoint.params}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PublicStats;
