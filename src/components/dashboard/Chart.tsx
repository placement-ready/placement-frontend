"use client";
import React, { useEffect, useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import { motion } from "framer-motion";
import type { ChartData, ChartOptions } from "chart.js";
import {
	Chart as ChartJS,
	LineElement,
	BarElement,
	PointElement,
	LinearScale,
	CategoryScale,
	Tooltip,
	Legend,
	Filler,
} from "chart.js";

ChartJS.register(
	LineElement,
	BarElement,
	PointElement,
	LinearScale,
	CategoryScale,
	Tooltip,
	Legend,
	Filler
);

// theme colors to align with your green theme
const themeColors = {
	primary: {
		emerald: "#10B981",
		emeraldLight: "#34D399",
		emeraldDark: "#059669",
		blue: "#3B82F6",
		blueLight: "#60A5FA",
		purple: "#8B5CF6",
		purpleLight: "#A78BFA",
	},
	secondary: {
		orange: "#F59E0B",
		orangeLight: "#FBBF24",
		gray: "#6B7280",
		grayLight: "#9CA3AF",
		border: "#E5E7EB",
	},
};

// Line chart data with better theme alignment
const performanceLabels = ["Jan", "Feb", "Mar", "Apr", "May"];
const performanceData: ChartData<"line"> = {
	labels: performanceLabels,
	datasets: [
		{
			label: "Performance Score",
			data: [15, 25, 40, 55, 80],
			borderColor: themeColors.primary.emerald,
			backgroundColor: (context: {
				chart: { ctx: CanvasRenderingContext2D; chartArea?: { top: number; bottom: number } };
			}) => {
				const chart = context.chart;
				const { ctx, chartArea } = chart;
				if (!chartArea) {
					return "rgba(16, 185, 129, 0.1)";
				}
				const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
				gradient.addColorStop(0, "rgba(16, 185, 129, 0.8)");
				gradient.addColorStop(0.5, "rgba(16, 185, 129, 0.4)");
				gradient.addColorStop(1, "rgba(16, 185, 129, 0.05)");
				return gradient;
			},
			borderWidth: 3,
			tension: 0.4,
			fill: true,
			pointRadius: 6,
			pointBackgroundColor: "#fff",
			pointBorderColor: themeColors.primary.emerald,
			pointBorderWidth: 3,
			pointHoverRadius: 8,
			pointHoverBackgroundColor: "#fff",
			pointHoverBorderColor: themeColors.primary.emeraldLight,
			pointHoverBorderWidth: 4,
		},
	],
};

// Line chart options with theme colors
const performanceOptions: ChartOptions<"line"> = {
	responsive: true,
	maintainAspectRatio: false,
	animation: {
		duration: 1500,
		easing: "easeOutQuart",
		delay: (context) => context.dataIndex * 100,
	},
	plugins: {
		legend: { display: false },
		tooltip: {
			mode: "index",
			intersect: false,
			backgroundColor: "rgba(0,0,0,0.9)",
			titleColor: "#fff",
			bodyColor: "#fff",
			cornerRadius: 12,
			displayColors: false,
			padding: 12,
			titleFont: { size: 14, weight: "bold" },
			bodyFont: { size: 13 },
		},
	},
	scales: {
		y: {
			min: 0,
			max: 100,
			ticks: {
				stepSize: 25,
				color: themeColors.secondary.gray,
				font: { size: 12 },
				callback: (value) => `${value}%`,
			},
			grid: {
				color: themeColors.secondary.border,
				lineWidth: 1,
			},
			border: { display: false },
		},
		x: {
			ticks: {
				color: themeColors.secondary.gray,
				font: { size: 12 },
			},
			grid: { display: false },
			border: { display: false },
		},
	},
	elements: { point: { hoverBorderWidth: 4 } },
	onHover: (event, chartElement, chart) => {
		if (chart?.canvas) {
			chart.canvas.style.cursor = chartElement?.length ? "pointer" : "default";
		}
	},
};

// Bar chart data with theme colors
const skillCategories = ["DSA", "System Design", "Communication"];
const skillsData: ChartData<"bar"> = {
	labels: skillCategories,
	datasets: [
		{
			label: "Strengths",
			data: [85, 72, 68],
			backgroundColor: themeColors.primary.purple,
			hoverBackgroundColor: themeColors.primary.purpleLight,
			borderRadius: 8,
			borderSkipped: false,
			barThickness: 28,
		},
		{
			label: "Areas to Improve",
			data: [15, 28, 32],
			backgroundColor: themeColors.secondary.orange,
			hoverBackgroundColor: themeColors.secondary.orangeLight,
			borderRadius: 8,
			borderSkipped: false,
			barThickness: 28,
		},
	],
};

// Bar chart options
const skillsOptions: ChartOptions<"bar"> = {
	responsive: true,
	maintainAspectRatio: false,
	animation: {
		duration: 1200,
		easing: "easeOutBounce",
		delay: (context) => context.dataIndex * 100,
	},
	plugins: {
		legend: {
			position: "top",
			labels: {
				color: themeColors.secondary.gray,
				font: { weight: "bold", size: 12 },
				padding: 20,
				usePointStyle: true,
				pointStyle: "circle",
			},
		},
		tooltip: {
			enabled: true,
			backgroundColor: "rgba(0,0,0,0.9)",
			titleColor: "#fff",
			bodyColor: "#fff",
			cornerRadius: 12,
			padding: 12,
		},
	},
	scales: {
		y: {
			beginAtZero: true,
			max: 100,
			ticks: {
				color: themeColors.secondary.gray,
				stepSize: 25,
				font: { size: 12 },
				callback: (value) => `${value}%`,
			},
			grid: {
				color: themeColors.secondary.border,
				lineWidth: 1,
			},
			border: { display: false },
		},
		x: {
			ticks: {
				color: themeColors.secondary.gray,
				font: { size: 12 },
			},
			grid: { display: false },
			border: { display: false },
		},
	},
	onHover: (event, chartElement, chart) => {
		if (chart?.canvas) {
			chart.canvas.style.cursor = chartElement?.length ? "pointer" : "default";
		}
	},
};

// Status Pill component
const StatusPill = ({ text, icon }: { text: string; icon?: React.ReactNode }) => (
	<motion.div
		initial={{ opacity: 0, scale: 0.8 }}
		animate={{ opacity: 1, scale: 1 }}
		transition={{ duration: 0.5, ease: "easeOut" }}
		className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-emerald-100 via-green-100 to-emerald-100 border border-emerald-300/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
	>
		<div className="w-3 h-3 bg-emerald-500 rounded-full mr-3 animate-pulse"></div>
		{icon && <div className="mr-2 text-emerald-600">{icon}</div>}
		<span className="text-emerald-700 font-semibold text-sm tracking-wide whitespace-nowrap">
			{text}
		</span>
	</motion.div>
);

// Chart Card component for better organization
const ChartCard = ({
	title,
	children,
	titleColor,
	delay = 0,
}: {
	title: string;
	children: React.ReactNode;
	titleColor: string;
	delay?: number;
}) => (
	<motion.div
		initial={{ opacity: 0, y: 30 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ duration: 0.6, delay, ease: "easeOut" }}
		whileHover={{
			y: -4,
			boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
		}}
		className="w-full bg-white rounded-2xl shadow-lg border border-gray-200 p-6 lg:p-8 transition-all duration-300 hover:border-gray-300"
	>
		<h3 className="text-xl lg:text-2xl font-bold mb-6" style={{ color: titleColor }}>
			{title}
		</h3>
		<div className="h-64 lg:h-80">{children}</div>
	</motion.div>
);

const PerformanceCharts = () => {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => setIsVisible(true), 200);
		return () => clearTimeout(timer);
	}, []);

	return (
		<section className="relative py-12 px-4 sm:px-6 lg:px-8 w-full max-w-7xl mx-auto overflow-hidden">
			{/* Background decorative elements */}
			<div className="absolute inset-0 -z-10">
				<motion.div
					initial={{ scale: 0, opacity: 0 }}
					animate={{ scale: isVisible ? 1 : 0, opacity: isVisible ? 0.6 : 0 }}
					transition={{ duration: 1.2, delay: 0.2 }}
					className="absolute top-20 left-20 w-80 h-80 bg-gradient-to-br from-emerald-200 to-green-100 rounded-full mix-blend-multiply filter blur-xl"
				/>
				<motion.div
					initial={{ scale: 0, opacity: 0 }}
					animate={{ scale: isVisible ? 1 : 0, opacity: isVisible ? 0.4 : 0 }}
					transition={{ duration: 1.2, delay: 0.4 }}
					className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-blue-200 to-purple-100 rounded-full mix-blend-multiply filter blur-xl"
				/>
				<motion.div
					initial={{ scale: 0, opacity: 0 }}
					animate={{ scale: isVisible ? 1 : 0, opacity: isVisible ? 0.3 : 0 }}
					transition={{ duration: 1.2, delay: 0.6 }}
					className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-br from-orange-200 to-yellow-100 rounded-full mix-blend-multiply filter blur-xl"
				/>
			</div>

			<div className="relative z-10">
				{/* Header Section */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="text-center mb-12"
				>
					<div className="mb-8">
						<StatusPill
							text="Performance Analytics"
							icon={
								<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
									<path
										fillRule="evenodd"
										d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
										clipRule="evenodd"
									/>
								</svg>
							}
						/>
					</div>
					<h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
						Performance{" "}
						<span className="relative inline-block">
							<span className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent">
								Dashboard
							</span>
							<motion.div
								initial={{ scaleX: 0 }}
								animate={{ scaleX: isVisible ? 1 : 0 }}
								transition={{ duration: 0.8, delay: 0.8 }}
								className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-green-400 rounded-full origin-left"
							/>
						</span>
					</h2>
					<p className="text-lg text-gray-600 max-w-2xl mx-auto">
						Track your progress and identify areas for improvement with detailed analytics and
						insights.
					</p>
				</motion.div>

				{/* Charts Grid - Responsive Layout */}
				<div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-12 mb-12">
					<ChartCard
						title="Performance Over Time"
						titleColor={themeColors.primary.emerald}
						delay={0.3}
					>
						<Line data={performanceData} options={performanceOptions} />
					</ChartCard>

					<ChartCard title="Skills Analysis" titleColor={themeColors.primary.purple} delay={0.5}>
						<Bar data={skillsData} options={skillsOptions} />
					</ChartCard>
				</div>

				{/* Summary Stats Grid */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.7 }}
					className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
				>
					<motion.div
						whileHover={{ scale: 1.05 }}
						className="bg-white rounded-xl p-6 text-center shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
					>
						<div className="text-3xl font-bold text-emerald-600 mb-2">85%</div>
						<div className="text-gray-600 font-medium">Overall Score</div>
						<div className="w-full bg-gray-200 rounded-full h-2 mt-3">
							<motion.div
								initial={{ width: 0 }}
								animate={{ width: "85%" }}
								transition={{ duration: 1, delay: 1 }}
								className="bg-emerald-500 h-2 rounded-full"
							/>
						</div>
					</motion.div>

					<motion.div
						whileHover={{ scale: 1.05 }}
						className="bg-white rounded-xl p-6 text-center shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
					>
						<div className="text-3xl font-bold text-blue-600 mb-2">12</div>
						<div className="text-gray-600 font-medium">Interviews Completed</div>
						<div className="text-sm text-blue-500 mt-2">+3 this month</div>
					</motion.div>

					<motion.div
						whileHover={{ scale: 1.05 }}
						className="bg-white rounded-xl p-6 text-center shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
					>
						<div className="text-3xl font-bold text-purple-600 mb-2">3</div>
						<div className="text-gray-600 font-medium">Areas to Improve</div>
						<div className="text-sm text-purple-500 mt-2">Focus needed</div>
					</motion.div>

					<motion.div
						whileHover={{ scale: 1.05 }}
						className="bg-white rounded-xl p-6 text-center shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
					>
						<div className="text-3xl font-bold text-orange-600 mb-2">7</div>
						<div className="text-gray-600 font-medium">Days Streak</div>
						<div className="text-sm text-orange-500 mt-2">Keep it up!</div>
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
};

export default PerformanceCharts;
