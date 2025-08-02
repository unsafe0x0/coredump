import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HowToUse from "@/components/how-to-use/HowToUse";

const LandingPage = () => {
  return (
    <React.Fragment>
      <Navbar />
      <main className="flex flex-col items-center justify-start min-h-screen bg-neutral-950 text-white space-y-26 pb-20">
        <HowToUse />
      </main>
      <Footer />
    </React.Fragment>
  );
};

export default LandingPage;
