import React from "react";
import Dashboard from "@/components/dashboard/Dashboard";
const DeveloperProfilePage = () => {
  return (
    <React.Fragment>
      <main className="flex flex-col items-center justify-start min-h-screen bg-neutral-950 text-white">
        <Dashboard />
      </main>
    </React.Fragment>
  );
};

export default DeveloperProfilePage;
