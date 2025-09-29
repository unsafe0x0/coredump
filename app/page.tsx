import React from "react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import FAQ from "@/components/landing/FAQ";
import Banner from "@/components/landing/Banner";

const LandingPage = () => {
  return (
    <React.Fragment>
      <Navbar />
      <main className="flex flex-col items-center justify-start min-h-screen space-y-26 pb-20">
        <Hero />
        <Features />
        <FAQ />
        <Banner />
      </main>
      <Footer />
    </React.Fragment>
  );
};

export default LandingPage;
