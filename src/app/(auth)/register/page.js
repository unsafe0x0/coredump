import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RegisterFrom from "@/components/Auth/Register";

const RegisterPage = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <RegisterFrom />
      </main>
      <Footer />
    </>
  );
};

export default RegisterPage;
