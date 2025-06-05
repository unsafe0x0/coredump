"use client";
import React, { useState } from "react";
import DashboardComponent from "./DashboardComponent";
import Settings from "./Settings";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <section className="flex flex-col justify-start items-center w-full min-h-screen">
      <div className="flex flex-col justify-start items-center lg:container px-3 w-full h-full">
        <div className="flex justify-end items-center mt-10 mb-5 gap-5 self-end p-2 bg-neutral-800/30 backdrop-blur-2xl rounded">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`px-3 py-1 text-md font-normal cursor-pointer rounded hover:bg-green-600/70 border transition-all duration-300 ease-in-out flex items-center gap-1 ${
              activeTab === "dashboard"
                ? "bg-green-600 border-green-600"
                : "bg-neutral-800/30 border-neutral-700/40"
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`px-3 py-1 text-md font-normal cursor-pointer rounded hover:bg-green-600/70 border transition-all duration-300 ease-in-out flex items-center gap-1 ${
              activeTab === "settings"
                ? "bg-green-600 border-green-600"
                : "bg-neutral-800/30 border-neutral-700/40"
            }`}
          >
            Settings
          </button>
        </div>
      </div>
      {activeTab === "dashboard" && <DashboardComponent />}
      {activeTab === "settings" && <Settings />}
    </section>
  );
};

export default Dashboard;
