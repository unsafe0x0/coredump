import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import FAQ from "@/components/landing/FAQ";
import Banner from "@/components/landing/Banner";

const LandingPage = () => {
  return (
    <React.Fragment>
      <Navbar />
      <main className="flex flex-col items-center justify-start min-h-screen bg-neutral-950 text-white space-y-26 pb-20">
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
