import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoginFrom from "@/components/Auth/Login";

const LoginPage = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <LoginFrom />
      </main>
      <Footer />
    </>
  );
};

export default LoginPage;
