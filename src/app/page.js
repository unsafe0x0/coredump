import React from "react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import Hero from "@/components/Home/Hero";
import Features from "@/components/Home/Features";
import HowToUse from "@/components/Home/HowToUse";
import Banner from "@/components/Home/Banner";

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <main className="pb-14 gap-14 flex flex-col justify-start items-center w-full min-h-screen">
        <Hero />
        <Features />
        <HowToUse />
        <Banner />
      </main>
      <Footer />
    </>
  );
};

export default LandingPage;
