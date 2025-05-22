import React from "react";

import Navbar from "@/components/Navbar";
import Leaderboard from "@/components/Home/Leaderboard";
import Footer from "@/components/Footer";

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <main className="pb-14 gap-14 flex flex-col justify-start items-center w-full min-h-screen">
        <Leaderboard />
      </main>
      <Footer />
    </>
  );
};

export default LandingPage;
