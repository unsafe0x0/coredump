import React from "react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import Login from "@/components/auth/Login";

const LoginPage = () => {
  return (
    <React.Fragment>
      <Navbar />
      <main className="flex flex-col items-center justify-center min-h-screen py-20">
        <Login />
      </main>
      <Footer />
    </React.Fragment>
  );
};

export default LoginPage;
