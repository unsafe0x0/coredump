import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Register from "@/components/auth/Register";

const RegisterPage = () => {
  return (
    <React.Fragment>
      <Navbar />
      <main className="flex flex-col items-center justify-center min-h-screen bg-neutral-950 text-white py-20">
        <Register />
      </main>
      <Footer />
    </React.Fragment>
  );
};

export default RegisterPage;
