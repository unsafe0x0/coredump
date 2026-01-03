import React from "react";
import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import HowToUse from "@/components/how-to-use/HowToUse";

const LandingPage = () => {
	return (
		<React.Fragment>
			<Navbar />
			<main className="flex flex-col items-center justify-start min-h-screen space-y-26 pb-20">
				<HowToUse />
			</main>
			<Footer />
		</React.Fragment>
	);
};

export default LandingPage;
