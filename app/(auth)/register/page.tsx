import React from "react";
import Register from "@/components/auth/Register";
import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";

const RegisterPage = () => {
	return (
		<React.Fragment>
			<Navbar />
			<main className="flex flex-col items-center justify-center min-h-screen py-20">
				<Register />
			</main>
			<Footer />
		</React.Fragment>
	);
};

export default RegisterPage;
