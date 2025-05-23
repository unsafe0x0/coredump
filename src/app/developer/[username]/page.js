import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DeveloperProfile from "@/components/Profile/DeveloperProfile";

const DeveloperProfilePage = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <DeveloperProfile />
      </main>
      <Footer />
    </>
  );
};

export default DeveloperProfilePage;
