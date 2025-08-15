"use client";

import React from "react";
import Image from "next/image";
import "../styles/hero.css";

const Hero: React.FC = () => {
	return (
		<section className="relative min-h-screen w-full flex flex-col justify-between bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 pt-22 md:pt-24">
			{/* Centered main content */}
			<div className="flex-1 flex flex-col justify-center items-center text-center px-2 sm:px-4">
				{/* Logo / Icon */}
				<div className="mx-auto rounded-2xl w-16 h-16 flex items-center justify-center mb-6 shadow-lg bg-gradient-to-tr from-emerald-500 to-green-400">
					<Image
						src="/brain.png"
						alt="Brain Logo"
						width={36}
						height={36}
						className="object-contain"
						priority
					/>
				</div>

				{/* Headline */}
				<h1 className="text-4xl sm:text-6xl lg:text-5xl font-bold leading-tight text-gray-900 mb-2 max-w-3xl">
					From nervous to natural{" "}
					<span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
						— transform your interview skills.
					</span>
				</h1>

				{/* Subhead */}
				<p className="text-lg sm:text-xl text-gray-600 mb-15 max-w-1xl">
					Instant SkilledAI feedback and personalized practice plans to help you ace your
					interviews!!
				</p>

				{/* CTAs */}
				<div className="flex flex-col sm:flex-row gap-4 justify-center mb-10 w-full sm:w-auto">
					<button className="bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:scale-105 transition w-full sm:w-auto">
						Start Practicing
					</button>
					<button className="border border-gray-300 font-semibold py-3 px-8 rounded-lg bg-white hover:bg-gray-50 w-full sm:w-auto">
						View Study Plans
					</button>
				</div>

				{/* Trust / tagline */}
				<div className="bg-green-100 border border-green-200 rounded-md py-2 px-4 sm:px-6 text-sm sm:text-base text-green-700 font-medium typewriter">
					&quot;Master Your Interviews with HireMind’s Expert Insights.&quot;
				</div>
			</div>

			{/* Stats section */}
			<div className="w-full bg-white/60 backdrop-blur-sm py-8">
				<div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 px-6">
					<StatCard value="500+" label="Practice Questions" />
					<StatCard value="3" label="AI Models" />
					<StatCard value="50+" label="Companies" />
					<StatCard value="8" label="Study Plans" />
				</div>
			</div>
		</section>
	);
};

// Small stat card component for reusability
const StatCard = ({ value, label }: { value: string; label: string }) => (
	<div className="bg-white rounded-xl shadow-sm p-5 flex flex-col items-center">
		<div className="text-green-600 font-bold text-2xl mb-1">{value}</div>
		<div className="text-gray-700 text-sm text-center">{label}</div>
	</div>
);

export default Hero;
