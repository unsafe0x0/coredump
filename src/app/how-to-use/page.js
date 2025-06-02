import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HowToUse from "@/components/HowToUse";

const HowToUsePage = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <HowToUse />
      </main>
      <Footer />
    </>
  );
};

export default HowToUsePage;
