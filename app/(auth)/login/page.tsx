import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Login from "@/components/auth/Login";

const LoginPage = () => {
  return (
    <React.Fragment>
      <Navbar />
      <main className="flex flex-col items-center justify-center min-h-screen bg-neutral-950 text-white py-20">
        <Login />
      </main>
      <Footer />
    </React.Fragment>
  );
};

export default LoginPage;
