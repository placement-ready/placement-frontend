import React from "react";
import Image from "next/image";

const features = [
	{
		title: "Company-wise Interview Questions",
		description:
			"Practice with real, recent questions from top companies tailored to your dream job.",
	},
	{
		title: "DSA Practice Sheets",
		description: "Sharpen your algorithms and data structures with curated problem sets.",
	},
	{
		title: "Core Subjects Preparation",
		description: "Review core CS subjects with easy-to-navigate study materials.",
	},
	{
		title: "Video Call Mock Interviews",
		description: "Experience real interviews via live video sessions and instant feedback.",
	},
	{
		title: "AI-Generated Questions",
		description:
			"Unlock the 'Ask Interviewer' feature powered by advanced AI for dynamic, personalized questions.",
	},
	{
		title: "Interview Scheduling & Automated Reminders",
		description:
			"Schedule practice interviews and get timely reminders so you never miss a session.",
	},
	{
		title: "Latest Company Questions",
		description:
			"APIs keep you updated with the last 5 years’ of company-specific interview questions.",
	},
	{
		title: "AI-Powered Interview Bot",
		description:
			"Practice 1:1 with an AI interviewer, complete with video recording and instant analysis.",
	},
	{
		title: "User Reviews & Experience Sharing",
		description:
			"Share insights, new questions, feedback, and strategies with the HireMind community.",
	},
	{
		title: "Structured and Unlimited Practice",
		description: "Option to set time or question limits, or go unlimited for final interview prep.",
	},
	{
		title: "Performance Tracking & Readiness Indicators",
		description:
			"Get actionable feedback, readiness status, and improvement recommendations after each session.",
	},
	{
		title: "Smart Rescheduling",
		description:
			"Easily reschedule interviews—manually or automatically—with guidance from our AI bot.",
	},
];

const creators = ["Harshil Gupta", "Shivam Kumar", "Vyakhya Namdev - Founder"];

const About: React.FC = () => (
	<main className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12 px-4">
		<section className="max-w-3xl mx-auto text-center">
			<div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mb-4 overflow-hidden">
				<Image
					src="/brain.png"
					alt="HireMind Brain Logo"
					height={32}
					width={32}
					className="w-8 h-8 object-contain"
				/>
			</div>
			<h1 className="text-3xl md:text-5xl font-extrabold text-green-700 mb-4">About HireMind</h1>
			<p className="text-gray-600 md:text-lg mb-8">
				HireMind is a next-generation interview prep platform—
				<span className="text-green-600 font-medium">smart, interactive, and adaptive</span>. We
				combine expert company questions, AI-driven mock interviews,
				<br className="hidden md:inline" /> and community insights to help you transform from
				nervous to natural—<span className="font-semibold">and ace your interviews.</span>
			</p>
		</section>
		<section className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 mt-8">
			{features.map((feature) => (
				<div
					key={feature.title}
					className="bg-white rounded-xl shadow-sm p-6 text-left border border-green-100 hover:shadow-md transition"
				>
					<h3 className="text-green-700 font-semibold text-lg mb-2">{feature.title}</h3>
					<p className="text-gray-600">{feature.description}</p>
				</div>
			))}
		</section>
		<section className="max-w-2xl mx-auto mt-12 text-center">
			<h2 className="text-xl font-bold text-green-700 mb-2">Created with passion by:</h2>
			<ul className="flex flex-wrap justify-center gap-4 text-green-600 text-lg font-medium">
				{creators.map((creator) => (
					<li key={creator}>{creator}</li>
				))}
			</ul>
		</section>
		<section className="max-w-xl mx-auto mt-8 text-center">
			<span className="block text-green-800 bg-green-100 px-4 py-2 rounded-lg text-base md:text-lg font-semibold">
				Join HireMind—where your success is our mission!
			</span>
		</section>
	</main>
);

export default About;
