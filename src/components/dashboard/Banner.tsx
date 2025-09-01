"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/hooks";
import {
	MdTrendingUp,
	MdPlayArrow,
	MdAssignment,
	MdBusiness,
	MdStars,
	MdCheckCircle,
	MdSchool,
	MdTimeline,
} from "react-icons/md";

// Types
interface StatCardProps {
	icon: React.ReactNode;
	title: string;
	value: string | number;
	subtitle?: string;
	trend?: "up" | "down" | "neutral";
	color?: "green" | "blue" | "purple" | "orange";
}

interface QuickActionProps {
	icon: React.ReactNode;
	title: string;
	description: string;
	onClick: () => void;
	variant?: "primary" | "secondary";
}

// Quick Stats Data
const getUserStats = (userId?: string) => ({
	problemsSolved: 87,
	practiceStreak: 12,
	interviewsCompleted: 5,
	skillLevel: "Expert",
	weeklyProgress: 23,
	upcomingDeadlines: 3,
});

// Achievement data
const getRecentAchievements = () => [
	{
		id: 1,
		title: "Problem Solver",
		description: "Solved 50+ coding problems",
		icon: "🏆",
		isNew: true,
	},
	{
		id: 2,
		title: "Consistent Learner",
		description: "10-day practice streak",
		icon: "🔥",
		isNew: false,
	},
	{
		id: 3,
		title: "Mock Master",
		description: "Completed 5 mock interviews",
		icon: "⭐",
		isNew: true,
	},
];

// Stat Card Component
const StatCard: React.FC<StatCardProps> = ({
	icon,
	title,
	value,
	subtitle,
	trend,
	color = "green",
}) => {
	const colorClasses = {
		green: "bg-green-50 border-green-200 text-green-700",
		blue: "bg-blue-50 border-blue-200 text-blue-700",
		purple: "bg-purple-50 border-purple-200 text-purple-700",
		orange: "bg-orange-50 border-orange-200 text-orange-700",
	};

	return (
		<div
			className={`p-4 rounded-xl border ${colorClasses[color]} transition-all duration-200 hover:shadow-md`}
		>
			<div className="flex items-center gap-3">
				<div className="text-2xl">{icon}</div>
				<div className="flex-1">
					<div className="flex items-center gap-2">
						<span className="text-2xl font-bold">{value}</span>
						{trend && (
							<MdTrendingUp
								className={`text-sm ${trend === "up" ? "text-green-500" : "text-gray-400"}`}
							/>
						)}
					</div>
					<p className="text-sm font-medium opacity-80">{title}</p>
					{subtitle && <p className="text-xs opacity-60">{subtitle}</p>}
				</div>
			</div>
		</div>
	);
};

// Quick Action Component
const QuickAction: React.FC<QuickActionProps> = ({
	icon,
	title,
	description,
	onClick,
	variant = "secondary",
}) => {
	const variantClasses =
		variant === "primary"
			? "bg-gradient-to-r from-green-600 to-green-400 text-white shadow-lg hover:shadow-xl transform hover:scale-105"
			: "bg-white border border-green-200 text-green-700 hover:bg-green-50 hover:border-green-300";

	return (
		<button
			onClick={onClick}
			className={`p-4 rounded-xl transition-all duration-200 text-left w-full ${variantClasses}`}
		>
			<div className="flex items-start gap-3">
				<div className="text-2xl mt-1">{icon}</div>
				<div>
					<h3 className="font-semibold text-sm mb-1">{title}</h3>
					<p className="text-xs opacity-75">{description}</p>
				</div>
			</div>
		</button>
	);
};

const Banner: React.FC = () => {
	const { user } = useAuth();
	const [currentTime, setCurrentTime] = useState(new Date());
	const userStats = getUserStats(user?.id);
	const achievements = getRecentAchievements();

	// Update current time
	useEffect(() => {
		const timer = setInterval(() => setCurrentTime(new Date()), 60000);
		return () => clearInterval(timer);
	}, []);

	const getGreeting = () => {
		const hour = currentTime.getHours();
		if (hour < 12) return "Good morning";
		if (hour < 17) return "Good afternoon";
		return "Good evening";
	};

	const handleQuickAction = (action: string) => {
		console.log(`Quick action: ${action}`);
		// Handle navigation or actions here
	};

	return (
		<div className="bg-white rounded-2xl border border-green-100 shadow-sm overflow-hidden">
			{/* Header Section */}
			<div className="p-6 lg:p-8">
				<div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
					{/* Welcome Section */}
					<div className="flex-1">
						<div className="flex items-center gap-4 mb-4">
							<div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg">
								<span className="text-white font-bold text-xl">
									{user?.name?.charAt(0)?.toUpperCase() || "U"}
								</span>
							</div>
							<div>
								<h1 className="text-2xl lg:text-3xl font-bold text-gray-800">
									{getGreeting()}, {user?.name || "User"}! 👋
								</h1>
								<p className="text-green-600 font-medium">Ready to level up your placement game?</p>
							</div>
						</div>

						{/* Progress Insight */}
						<div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-lg p-4 mb-6">
							<div className="flex items-center gap-3">
								<MdTimeline className="text-green-600 text-xl" />
								<div>
									<p className="font-semibold text-gray-800">
										You&apos;re on a {userStats.practiceStreak}-day streak! 🔥
									</p>
									<p className="text-sm text-gray-600">Keep going to maintain your momentum</p>
								</div>
							</div>
						</div>
					</div>

					{/* Quick Stats Grid */}
					<div className="grid grid-cols-2 gap-3 lg:w-80">
						<StatCard
							icon={<MdSchool />}
							title="Problems Solved"
							value={userStats.problemsSolved}
							trend="up"
							color="green"
						/>
						<StatCard
							icon={<MdStars />}
							title="Skill Level"
							value={userStats.skillLevel}
							color="blue"
						/>
						<StatCard
							icon={<MdCheckCircle />}
							title="Interviews"
							value={userStats.interviewsCompleted}
							subtitle="Completed"
							color="purple"
						/>
						<StatCard
							icon={<MdTrendingUp />}
							title="Weekly Progress"
							value={`${userStats.weeklyProgress}%`}
							trend="up"
							color="orange"
						/>
					</div>
				</div>
			</div>

			{/* Action Section */}
			<div className="bg-white/60 backdrop-blur-sm border-t border-green-100/50 p-6 lg:p-8">
				<div className="flex flex-col lg:flex-row gap-6">
					{/* Quick Actions */}
					<div className="flex-1">
						<h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
							<MdPlayArrow className="text-green-600" />
							Quick Actions
						</h2>
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
							<QuickAction
								icon={<MdPlayArrow />}
								title="Start Practice"
								description="Solve coding problems"
								onClick={() => handleQuickAction("practice")}
								variant="primary"
							/>
							<QuickAction
								icon={<MdAssignment />}
								title="Mock Interview"
								description="Practice with AI interviewer"
								onClick={() => handleQuickAction("mock-interview")}
							/>
							<QuickAction
								icon={<MdBusiness />}
								title="Company Prep"
								description="Research target companies"
								onClick={() => handleQuickAction("company-prep")}
							/>
						</div>
					</div>

					{/* Recent Achievements */}
					<div className="lg:w-80">
						<h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
							<MdStars className="text-yellow-500" />
							Recent Achievements
						</h2>
						<div className="space-y-3">
							{achievements.slice(0, 3).map((achievement) => (
								<div
									key={achievement.id}
									className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:shadow-sm transition-shadow"
								>
									<span className="text-2xl">{achievement.icon}</span>
									<div className="flex-1">
										<div className="flex items-center gap-2">
											<h3 className="font-medium text-sm text-gray-800">{achievement.title}</h3>
											{achievement.isNew && (
												<span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">
													New
												</span>
											)}
										</div>
										<p className="text-xs text-gray-600">{achievement.description}</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Banner;
