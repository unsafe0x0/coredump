import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DeveloperProfile from "@/components/profile/DeveloperProfile";

const DeveloperProfilePage = () => {
  return (
    <React.Fragment>
      <Navbar />
      <main className="flex flex-col items-center justify-start min-h-screen bg-neutral-950 text-white py-12">
        <DeveloperProfile />
      </main>
      <Footer />
    </React.Fragment>
  );
};

export default DeveloperProfilePage;
