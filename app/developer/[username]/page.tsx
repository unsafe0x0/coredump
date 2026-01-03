import React from "react";
import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import DeveloperProfile from "@/components/profile/DeveloperProfile";

const DeveloperProfilePage = () => {
	return (
		<React.Fragment>
			<Navbar />
			<main className="flex flex-col items-center justify-start min-h-screen py-12">
				<DeveloperProfile />
			</main>
			<Footer />
		</React.Fragment>
	);
};

export default DeveloperProfilePage;
