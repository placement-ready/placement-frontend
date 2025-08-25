"use client";
import React from "react";

interface InterviewReminder {
	id: number;
	company: string;
	position: string;
	dateTime: string; // ISO or human-readable
}

interface SharedQuestion {
	id: number;
	user: string;
	company: string;
	question: string;
	dateShared: string; // ISO or human-readable
}

// Sample data
const upcomingInterviews: InterviewReminder[] = [
	{
		id: 1,
		company: "Google",
		position: "Software Engineer",
		dateTime: "2025-08-25 10:00 AM",
	},
	{
		id: 2,
		company: "Amazon",
		position: "Frontend Developer",
		dateTime: "2025-08-28 02:00 PM",
	},
];

const latestSharedQuestions: SharedQuestion[] = [
	{
		id: 1,
		user: "Alice",
		company: "Facebook",
		question: "How do you optimize React app performance?",
		dateShared: "Aug 16, 2025",
	},
	{
		id: 2,
		user: "Bob",
		company: "Microsoft",
		question: "Explain event bubbling in JavaScript.",
		dateShared: "Aug 15, 2025",
	},
];

const NotificationsCommunity: React.FC = () => {
	return (
		<section className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-8 relative">
			{/* Background Connection Lines */}
			<div className="absolute inset-0 pointer-events-none">
				{/* Left Column Connecting Line */}
				<div className="absolute left-8 top-20 bottom-10 w-0.5 bg-gradient-to-b from-emerald-200 via-emerald-300 to-emerald-200 opacity-60 animate-line-glow"></div>

				{/* Right Column Connecting Line */}
				<div
					className="absolute right-8 top-20 bottom-10 w-0.5 bg-gradient-to-b from-green-200 via-green-300 to-green-200 opacity-60 animate-line-glow"
					style={{ animationDelay: "0.5s" }}
				></div>

				{/* Horizontal Connecting Line (visible on md+ screens) */}
				<div className="hidden md:block absolute top-1/2 left-1/2 transform -translate-y-1/2 w-16 h-0.5 bg-gradient-to-r from-emerald-300 to-green-300 opacity-40 animate-pulse-line"></div>

				{/* Decorative Dots */}
				<div className="absolute left-7 top-16 w-2 h-2 bg-emerald-400 rounded-full animate-pulse-dot"></div>
				<div
					className="absolute left-7 top-1/2 w-2 h-2 bg-emerald-500 rounded-full animate-pulse-dot"
					style={{ animationDelay: "1s" }}
				></div>
				<div
					className="absolute left-7 bottom-16 w-2 h-2 bg-emerald-400 rounded-full animate-pulse-dot"
					style={{ animationDelay: "2s" }}
				></div>

				<div
					className="absolute right-7 top-16 w-2 h-2 bg-green-400 rounded-full animate-pulse-dot"
					style={{ animationDelay: "0.5s" }}
				></div>
				<div
					className="absolute right-7 top-1/2 w-2 h-2 bg-green-500 rounded-full animate-pulse-dot"
					style={{ animationDelay: "1.5s" }}
				></div>
				<div
					className="absolute right-7 bottom-16 w-2 h-2 bg-green-400 rounded-full animate-pulse-dot"
					style={{ animationDelay: "2.5s" }}
				></div>

				{/* Center Connection Hub */}
				<div className="hidden md:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gradient-to-br from-emerald-400 to-green-400 rounded-full shadow-lg animate-pulse-center"></div>
			</div>
			{/* Left Column: Upcoming Interviews */}
			<div className="animate-fade-in-up relative z-10" style={{ animationDelay: "0.1s" }}>
				<h2 className="text-2xl font-bold text-emerald-700 mb-5 border-b border-emerald-300 pb-2 animate-slide-in-left">
					Upcoming Interviews & Reminders
				</h2>
				{upcomingInterviews.length === 0 ? (
					<p className="text-gray-500 animate-fade-in">No upcoming interviews scheduled.</p>
				) : (
					<ul className="space-y-4">
						{upcomingInterviews.map(({ id, company, position, dateTime }, index) => (
							<li
								key={id}
								className="group bg-emerald-50 border border-emerald-200 rounded-lg p-4 shadow-sm hover:shadow-lg hover:shadow-emerald-300/40 hover:-translate-y-1 hover:scale-102 hover:bg-gradient-to-br hover:from-emerald-50 hover:to-emerald-100 hover:border-emerald-300 transition-all duration-300 animate-fade-in-up cursor-pointer relative"
								style={{ animationDelay: `${0.2 + index * 0.1}s` }}
							>
								<div className="absolute top-2 right-2 w-2 h-2 bg-emerald-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300"></div>
								<h3 className="text-lg font-semibold text-emerald-800 animate-pulse-gentle group-hover:text-emerald-900 group-hover:scale-105 transition-all duration-300">
									{company}
								</h3>
								<p className="text-emerald-700 group-hover:text-emerald-800 group-hover:font-semibold transition-all duration-300">
									{position}
								</p>
								<p className="mt-1 text-sm text-gray-600 group-hover:text-emerald-600 transition-colors duration-300">
									{dateTime}
								</p>
							</li>
						))}
					</ul>
				)}
			</div>

			{/* Right Column: Latest Shared Questions */}
			<div className="animate-fade-in-up relative z-10" style={{ animationDelay: "0.2s" }}>
				<h2 className="text-2xl font-bold text-emerald-700 mb-5 border-b border-emerald-300 pb-2 animate-slide-in-right">
					Latest Shared Interview Questions
				</h2>
				{latestSharedQuestions.length === 0 ? (
					<p className="text-gray-500 animate-fade-in">No questions shared recently.</p>
				) : (
					<>
						<ul className="space-y-4">
							{latestSharedQuestions.map(({ id, user, company, question, dateShared }, index) => (
								<li
									key={id}
									className="group bg-white border border-green-100 rounded-xl p-4 shadow-sm hover:shadow-lg hover:shadow-green-300/30 hover:-translate-y-1 hover:scale-102 hover:bg-gradient-to-tr hover:from-white hover:to-green-50 hover:border-green-200 transition-all duration-300 flex flex-col animate-fade-in-up cursor-pointer relative"
									style={{ animationDelay: `${0.3 + index * 0.1}s` }}
								>
									<div className="absolute top-2 right-2 w-2 h-2 bg-green-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-all duration-300"></div>

									<div className="flex justify-between items-center mb-2 relative z-10">
										<h3 className="font-semibold text-emerald-800 animate-pulse-gentle group-hover:text-emerald-900 group-hover:scale-105 transition-all duration-300">
											{company}
										</h3>
										<span
											className="text-sm text-gray-400 animate-fade-in group-hover:text-green-600 group-hover:font-medium transition-all duration-300"
											style={{ animationDelay: `${0.4 + index * 0.1}s` }}
										>
											{dateShared}
										</span>
									</div>
									<p className="text-gray-700 italic animate-typewriter relative z-10 group-hover:text-gray-800 group-hover:font-medium transition-all duration-300">
										&quot;{question}&quot;
									</p>
									<p className="mt-2 text-sm text-emerald-600 font-medium animate-bounce-subtle relative z-10 group-hover:text-emerald-700 group-hover:scale-105 transition-all duration-300">
										Shared by {user}
									</p>
								</li>
							))}
						</ul>

						{/* Explore More Button aligned right below the last card */}
						<div className="flex justify-end mt-5">
							<button className="px-6 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 text-white font-semibold shadow hover:shadow-lg hover:scale-105 transition-all duration-300">
								Explore More
							</button>
						</div>
					</>
				)}
			</div>

			<style jsx>{`
				@keyframes fadeInUp {
					from {
						opacity: 0;
						transform: translateY(30px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}

				@keyframes slideInLeft {
					from {
						opacity: 0;
						transform: translateX(-30px);
					}
					to {
						opacity: 1;
						transform: translateX(0);
					}
				}

				@keyframes slideInRight {
					from {
						opacity: 0;
						transform: translateX(30px);
					}
					to {
						opacity: 1;
						transform: translateX(0);
					}
				}

				@keyframes fadeIn {
					from {
						opacity: 0;
					}
					to {
						opacity: 1;
					}
				}

				@keyframes pulseGentle {
					0%,
					100% {
						opacity: 1;
					}
					50% {
						opacity: 0.8;
					}
				}

				@keyframes bounceSubtle {
					0%,
					100% {
						transform: translateY(0);
					}
					50% {
						transform: translateY(-2px);
					}
				}

				@keyframes pulseButton {
					0%,
					100% {
						transform: scale(1);
					}
					50% {
						transform: scale(1.02);
					}
				}

				@keyframes lineGlow {
					0%,
					100% {
						opacity: 0.3;
						transform: scaleY(1);
					}
					50% {
						opacity: 0.8;
						transform: scaleY(1.02);
					}
				}

				@keyframes pulseLine {
					0%,
					100% {
						opacity: 0.3;
						transform: scaleX(1);
					}
					50% {
						opacity: 0.7;
						transform: scaleX(1.1);
					}
				}

				@keyframes pulseDot {
					0%,
					100% {
						opacity: 0.4;
						transform: scale(1);
					}
					50% {
						opacity: 1;
						transform: scale(1.2);
					}
				}

				@keyframes pulseCenter {
					0%,
					100% {
						opacity: 0.6;
						transform: translate(-50%, -50%) scale(1);
						box-shadow: 0 0 10px rgba(52, 211, 153, 0.3);
					}
					50% {
						opacity: 1;
						transform: translate(-50%, -50%) scale(1.2);
						box-shadow: 0 0 20px rgba(52, 211, 153, 0.6);
					}
				}

				.animate-fade-in-up {
					animation: fadeInUp 0.6s ease-out forwards;
					opacity: 0;
				}

				.animate-slide-in-left {
					animation: slideInLeft 0.6s ease-out forwards;
					opacity: 0;
				}

				.animate-slide-in-right {
					animation: slideInRight 0.6s ease-out forwards;
					opacity: 0;
				}

				.animate-fade-in {
					animation: fadeIn 0.6s ease-out forwards;
					opacity: 0;
				}

				.animate-pulse-gentle {
					animation: pulseGentle 3s ease-in-out infinite;
				}

				.animate-bounce-subtle {
					animation: bounceSubtle 2s ease-in-out infinite;
				}

				.animate-pulse-button {
					animation: pulseButton 2s ease-in-out infinite;
				}

				.animate-line-glow {
					animation: lineGlow 3s ease-in-out infinite;
				}

				.animate-pulse-line {
					animation: pulseLine 4s ease-in-out infinite;
				}

				.animate-pulse-dot {
					animation: pulseDot 2s ease-in-out infinite;
				}

				.animate-pulse-center {
					animation: pulseCenter 3s ease-in-out infinite;
				}
			`}</style>
		</section>
	);
};

export default NotificationsCommunity;
