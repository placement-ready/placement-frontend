"use client";
import React, { useEffect, useState, JSX } from "react";

interface FeatureCard {
	icon: JSX.Element;
	iconBg: string;
	title: string;
	description: string;
	pillText?: string;
}

const features: FeatureCard[] = [
	{
		icon: (
			<svg
				viewBox="0 0 24 24"
				className="w-7 h-7"
				fill="none"
				stroke="currentColor"
				strokeWidth={2.5}
			>
				<path
					d="M20.7 12a8.7 8.7 0 0 1-2.3 6"
					stroke="#999"
					strokeWidth={2.5}
					fill="none"
					strokeLinecap="round"
				/>
				<path
					d="M12 7.5c-1.378 0-2.5 1.121-2.5 2.5a1 1 0 1 1-2 0c0-2.481 2.019-4.5 4.5-4.5s4.5 2.019 4.5 4.5c0 1.492-0.882 2.735-2.188 3.322A2.5 2.5 0 0 0 11.5 16v1"
					stroke="#19b9b8"
					strokeWidth={2.5}
					fill="none"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<circle cx="12" cy="18" r={1.25} fill="#19b9b8" stroke="none" />
			</svg>
		),
		iconBg: "#d6faeb",
		title: "Company-wise Questions",
		description:
			"Explore top company interview questions from the past 5 years, filtered by company and role for targeted prep.",
		pillText: "Trending",
	},
	{
		icon: (
			<svg
				viewBox="0 0 64 64"
				fill="none"
				stroke="black"
				strokeWidth={3}
				strokeLinecap="round"
				strokeLinejoin="round"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M16,62 C16,56 10,54 10,40 10,12 30,2 44,6 58,10 62,27 58,48 56,62 16,62 16,62 Z"
					fill="none"
					stroke="black"
					strokeWidth={3}
				/>
				<line x1="22" y1="18" x2="50" y2="18" />
				<line x1="22" y1="30" x2="50" y2="30" />
				<line x1="32" y1="10" x2="32" y2="38" />
				<line x1="42" y1="10" x2="42" y2="38" />
				<circle cx="27" cy="14" r={3} stroke="black" strokeWidth={3} fill="none" />
				<line x1="37" y1="11" x2="41" y2="15" />
				<line x1="37" y1="15" x2="41" y2="11" />
				<line x1="47" y1="11" x2="51" y2="15" />
				<line x1="47" y1="15" x2="51" y2="11" />
				<circle cx="37" cy="24" r={3} stroke="black" strokeWidth={3} fill="none" />
				<line x1="47" y1="21" x2="51" y2="25" />
				<line x1="47" y1="25" x2="51" y2="21" />
				<line x1="27" y1="31" x2="31" y2="35" />
				<line x1="27" y1="35" x2="31" y2="31" />
				<circle cx="37" cy="34" r={3} stroke="black" strokeWidth={3} fill="none" />
			</svg>
		),
		iconBg: "#d6faeb",
		title: "Start DSA Practice",
		description:
			"Sharpen your Data Structures & Algorithms skills with curated practice sheets and timed challenges",
		pillText: "Practice",
	},
	{
		icon: (
			<svg
				viewBox="0 0 64 64"
				fill="none"
				stroke="black"
				strokeWidth={4}
				strokeLinecap="round"
				strokeLinejoin="round"
				xmlns="http://www.w3.org/2000/svg"
			>
				<ellipse cx={28} cy={28} rx={22} ry={16} />
				<ellipse cx={44} cy={38} rx={18} ry={13} />
				<circle cx={20} cy={28} r={2.5} fill="black" />
				<circle cx={28} cy={28} r={2.5} fill="black" />
				<circle cx={36} cy={28} r={2.5} fill="black" />
				<path d="M16 44 Q8 48 16 52 Q22 56 28 52" />
				<path d="M36 50 Q44 52 52 50 Q56 46 50 44" />
			</svg>
		),
		iconBg: "#d6faeb",
		title: "Start Mock Interview",
		description:
			"Simulate a real interview with AI-powered mock sessions. Get instant feedback on your answers and confidence.",
		pillText: "In Progress",
	},
	{
		icon: (
			<svg
				viewBox="0 0 64 64"
				fill="none"
				stroke="url(#grad1)"
				strokeWidth={3}
				strokeLinecap="round"
				strokeLinejoin="round"
				xmlns="http://www.w3.org/2000/svg"
			>
				<defs>
					<linearGradient id="grad1" x1="0" y1="0" x2="0" y2="64" gradientUnits="userSpaceOnUse">
						<stop stopColor="#19c9ef" />
						<stop offset={1} stopColor="#8952ea" />
					</linearGradient>
				</defs>
				<rect x={10} y={18} width={44} height={32} rx={4} />
				<rect x={18} y={26} width={28} height={16} rx={1} />
				<circle cx={20} cy={30} r={2} />
				<rect x={12} y={38} width={8} height={8} rx={1} />
				<rect x={44} y={38} width={8} height={8} rx={1} />
				<circle cx={20} cy={22} r={2} />
				<circle cx={26} cy={34} r={2} />
				<circle cx={38} cy={34} r={2} />
				<circle cx={38} cy={46} r={2} />
				<circle cx={32} cy={46} r={2} />
				<circle cx={32} cy={34} r={2} />
				<rect x={54} y={26} width={4} height={24} rx={1} />
				<rect x={6} y={26} width={4} height={24} rx={1} />
				<circle cx={20} cy={50} r={2} />
				<circle cx={38} cy={22} r={2} />
				<rect x={18} y={50} width={28} height={2} rx={1} />
				<circle cx={20} cy={50} r={2} />
				<g>
					<circle cx={24} cy={16} r={11} stroke="url(#grad1)" strokeWidth={3} fill="none" />
					<line x1={24} y1={9} x2={24} y2={16} />
					<line x1={24} y1={16} x2={29} y2={16} />
				</g>
			</svg>
		),
		iconBg: "#d6faeb",
		title: "Schedule Interview",
		description:
			"Plan and book your mock interview sessions. Set reminders and sync with your calendar.",
		pillText: "Scheduled",
	},
	{
		icon: (
			<svg viewBox="0 0 64 64" fill="black" xmlns="http://www.w3.org/2000/svg">
				<rect x={8} y={40} width={12} height={16} />
				<rect x={24} y={32} width={12} height={24} />
				<rect x={40} y={24} width={12} height={32} />
				<polyline points="8,48 24,40 40,32 52,16" fill="none" stroke="black" strokeWidth={6} />
				<polygon points="52,16 58,22 52,22 52,16" fill="black" />
			</svg>
		),
		iconBg: "#fff6db",
		title: "View Performance Report",
		description:
			"Track your progress with detailed performance analytics. Identify strengths, weaknesses, and readiness level.",
		pillText: "Updated",
	},
	{
		icon: (
			<svg
				viewBox="0 0 64 64"
				fill="none"
				stroke="black"
				strokeWidth={2.5}
				strokeLinecap="round"
				strokeLinejoin="round"
				xmlns="http://www.w3.org/2000/svg"
			>
				<rect x={12} y={44} width={20} height={12} />
				<rect x={32} y={8} width={20} height={12} />
				<rect x={42} y={44} width={12} height={8} />
				<rect x={44} y={52} width={8} height={4} />
				<circle cx={20} cy={50} r={3} />
				<circle cx={42} cy={14} r={2} />
				<path d="M41 12 l5 2 l-5 2" />
				<rect x={38} y={10} width={8} height={8} />
				<path d="M12 44 l-8 -8" />
				<path d="M32 20 l-8 24" />
				<path d="M52 20 l-8 24" />
				<path d="M32 8 l-8 24" />
				<circle cx={32} cy={32} r={28} stroke="black" strokeWidth={2.5} fill="none" />
				<path d="M32 10 a22 22 0 0 1 0 44" />
				<path d="M32 54 a22 22 0 0 1 0 -44" />
				<polyline points="28,50 20,50 20,54" />
				<circle cx={20} cy={54} r={1.5} />
				<rect x={46} y={46} width={7} height={4} />
				<polyline points="50,12 45,17 51,17" />
			</svg>
		),
		iconBg: "#e3f7ff",
		title: "Share Your Experience",
		description:
			"Contribute by adding your interview experiences, unique questions, and feedback to help the community.",
		pillText: "New",
	},
];

const FeatureCards: React.FC = () => {
	const [animate, setAnimate] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => setAnimate(true), 100);
		return () => clearTimeout(timer);
	}, []);

	return (
		<section className="relative py-10 px-4 w-full max-w-6xl mx-auto overflow-visible mb-20 bg-gradient-to-br from-gray-50 via-white to-emerald-50/30">
			<span
				className={`hidden lg:block absolute transition-all duration-1000 ease-out ${
					animate ? "translate-x-0 opacity-100" : "-translate-x-24 opacity-0"
				}`}
				aria-hidden="true"
				style={{
					top: "55px",
					left: "-100px",
					width: "320px",
					height: "320px",
					borderRadius: "50%",
					background: "radial-gradient(circle, #e0f6edff 75%, #fff0 100%)",
					boxShadow: "0 0 60px 0 rgba(59, 201, 125, 0.2)",
					zIndex: 0,
				}}
			/>
			<span
				className={`hidden lg:block absolute transition-all duration-1000 ease-out ${
					animate ? "translate-x-0 opacity-100" : "translate-x-24 opacity-0"
				}`}
				aria-hidden="true"
				style={{
					bottom: "10px",
					right: "-40px",
					width: "380px",
					height: "380px",
					borderRadius: "50%",
					background: "radial-gradient(circle, #e0f6edff 75%, #fff0 100%)",
					boxShadow: "0 0 60px 0 rgba(59, 201, 125, 0.14)",
					zIndex: 0,
				}}
			/>

			<h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 text-center mb-5 mt-25 leading-tight relative z-10">
				Take Quick{" "}
				<span className="relative">
					<span className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent">
						Actions Now...
					</span>
					<div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-400 to-green-400 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
				</span>
			</h2>
			<div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				{features.map(({ icon, iconBg, title, description, pillText }) => (
					<div
						key={title}
						className={`
              relative group bg-white rounded-3xl shadow-lg p-7 flex flex-col
              transition-all duration-300
              border border-[#e8f8ef]
              hover:border-[1.5px]
              hover:border-transparent
              hover:shadow-green-100 hover:shadow-xl
              hover:scale-[1.035]
              hover:ring-2 hover:ring-green-200
            `}
						style={{
							minHeight: "230px",
							justifyContent: "flex-start",
						}}
					>
						{pillText && (
							<span className="absolute right-5 top-4 text-xs px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full font-semibold shadow opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
								{pillText}
							</span>
						)}
						<span
							className="flex items-center justify-center mb-5"
							style={{
								background: iconBg,
								borderRadius: "18px",
								width: "48px",
								height: "48px",
								boxShadow: "0 4px 18px 0 rgba(166, 223, 190, 1)",
							}}
						>
							<span style={{ fontSize: "2rem" }}>{icon}</span>
						</span>
						<h4 className="font-bold text-lg mb-3 text-slate-900 group-hover:text-emerald-700 transition-colors">
							{title}
						</h4>
						<p className="text-slate-600 text-[15px] leading-relaxed">{description}</p>
						<span className="absolute right-7 bottom-7 text-emerald-500 text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
							→
						</span>
					</div>
				))}
			</div>
		</section>
	);
};

export default FeatureCards;
