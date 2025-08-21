"use client";

import React from "react";
import Image from "next/image";
import "../styles/hero.css";
import { useRouter } from "next/navigation";

const Hero: React.FC = () => {
	const router = useRouter();
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
					<button
						onClick={() => router.push("/dashboard")}
						className="bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:scale-105 transition w-full sm:w-auto"
					>
						Start Practicing
					</button>
					<button
						onClick={() => router.push("/about")}
						className="border border-gray-300 font-semibold py-3 px-8 rounded-lg bg-white hover:bg-gray-50 w-full sm:w-auto"
					>
						About Us
					</button>
				</div>

				{/* Trust / tagline */}
				<div className="bg-green-100 border border-green-200 rounded-md py-2 px-4 sm:px-6 text-sm sm:text-base text-green-700 font-medium typewriter">
					&quot;Master Your Interviews with HireMind&apos;s Expert Insights.&quot;
				</div>
			</div>

			{/* Stats section with icons */}
			<div className="w-full bg-white/60 backdrop-blur-sm py-8">
				<div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 px-6">
					<StatCard
						value="500+"
						label="Practice Questions"
						icon={
							// Clipboard check SVG
							<svg
								className="w-5 h-5 text-emerald-600"
								fill="none"
								stroke="currentColor"
								strokeWidth={2}
								viewBox="0 0 24 24"
							>
								<path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2l4-4" />
								<rect width="16" height="20" x="4" y="2" rx="2" />
							</svg>
						}
					/>
					<StatCard
						value="3"
						label="AI Models"
						icon={
							// Lightning bolt SVG
							<svg
								className="w-5 h-5 text-emerald-600"
								fill="none"
								stroke="currentColor"
								strokeWidth={2}
								viewBox="0 0 24 24"
							>
								<path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
							</svg>
						}
					/>
					<StatCard
						value="50+"
						label="Companies"
						icon={
							// Building SVG
							<svg
								className="w-5 h-5 text-emerald-600"
								fill="none"
								stroke="currentColor"
								strokeWidth={2}
								viewBox="0 0 24 24"
							>
								<rect x="3" y="7" width="18" height="13" rx="2" />
								<path strokeLinecap="round" strokeLinejoin="round" d="M16 3v4M8 3v4" />
							</svg>
						}
					/>
					<StatCard
						value="8"
						label="Study Plans"
						icon={
							// Book open SVG
							<svg
								className="w-5 h-5 text-emerald-600"
								fill="none"
								stroke="currentColor"
								strokeWidth={2}
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M2 7v11a2 2 0 002 2h6a2 2 0 002-2V7H2zm18 0v11a2 2 0 01-2 2h-6a2 2 0 01-2-2V7h10zM12 3v4"
								/>
							</svg>
						}
					/>
				</div>
			</div>
		</section>
	);
};

// Enhanced Stat card with icon
const StatCard = ({
	value,
	label,
	icon,
}: {
	value: string;
	label: string;
	icon: React.ReactNode;
}) => (
	<div className="group relative bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 overflow-hidden">
		{/* Background gradient overlay on hover */}
		<div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-green-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

		{/* Decorative element */}
		<div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-br from-emerald-100 to-green-100 rounded-bl-2xl opacity-60"></div>

		{/* Content */}
		<div className="relative z-10 flex flex-col items-center">
			{/* Icon and Value Row */}
			<div className="flex items-center justify-center mb-2">
				<div className="flex items-center justify-center w-8 h-8 bg-emerald-100 rounded-lg mr-2 group-hover:bg-emerald-200 transition-colors duration-300">
					{icon}
				</div>
				<div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
					{value}
				</div>
			</div>

			{/* Label */}
			<div className="text-gray-600 text-sm font-medium text-center group-hover:text-gray-700 transition-colors duration-300">
				{label}
			</div>
		</div>

		{/* Bottom accent line */}
		<div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-emerald-500 to-green-500 group-hover:w-3/4 transition-all duration-300 rounded-t-full"></div>
	</div>
);

export default Hero;
