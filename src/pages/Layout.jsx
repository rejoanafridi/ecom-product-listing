import React from "react";
import Navbar from "../components/navbar/Navbar";
import LandingPage from "../components/LandingPage";

const Layout = () => {
	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<Navbar />
			<LandingPage />
		</div>
	);
};

export default Layout;
