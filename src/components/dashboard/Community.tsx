"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaQuestionCircle, FaBuilding, FaUsers, FaArrowRight } from "react-icons/fa";
import "../../styles/community-animations.css";

// Type definitions
interface UpcomingInterview {
	id: number;
	company: string;
	position: string;
	dateTime: string;
}

interface SharedQuestion {
	id: number;
	user: string;
	company: string;
	question: string;
	dateShared: string;
}

// Sample data
const upcomingInterviews: UpcomingInterview[] = [
	{
		id: 1,
		company: "Google",
		position: "Software Engineer",
		dateTime: "Tomorrow, 2:00 PM",
	},
	{
		id: 2,
		company: "Microsoft",
		position: "Frontend Developer",
		dateTime: "Dec 25, 10:00 AM",
	},
	{
		id: 3,
		company: "Amazon",
		position: "Full Stack Developer",
		dateTime: "Dec 28, 3:30 PM",
	},
];

const latestSharedQuestions: SharedQuestion[] = [
	{
		id: 1,
		user: "Alex Johnson",
		company: "Google",
		question: "Explain the difference between call, apply, and bind in JavaScript.",
		dateShared: "2 hours ago",
	},
	{
		id: 2,
		user: "Sarah Chen",
		company: "Meta",
		question: "How would you implement a LRU cache?",
		dateShared: "5 hours ago",
	},
	{
		id: 3,
		user: "Michael Davis",
		company: "Netflix",
		question: "Design a system to handle millions of concurrent users.",
		dateShared: "1 day ago",
	},
	{
		id: 4,
		user: "Emma Wilson",
		company: "Spotify",
		question: "What are the key principles of React component optimization?",
		dateShared: "2 days ago",
	},
];

// Interview Card Component
const InterviewCard = ({ interview, index }: { interview: UpcomingInterview; index: number }) => (
	<motion.li
		initial={{ opacity: 0, y: 20 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ duration: 0.5, delay: index * 0.1 }}
		whileHover={{ y: -4, scale: 1.02 }}
		className="group bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200 rounded-xl p-6 shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all duration-300 cursor-pointer relative overflow-hidden"
	>
		{/* Background shimmer effect */}
		<div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-100/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-shimmer"></div>

		{/* Company logo placeholder */}
		<div className="absolute top-4 right-4">
			<FaBuilding className="text-emerald-500 text-lg group-hover:text-emerald-600 transition-colors duration-300" />
		</div>

		<div className="relative z-10">
			<h3 className="text-xl font-bold text-emerald-800 mb-2 group-hover:text-emerald-900 transition-colors duration-300">
				{interview.company}
			</h3>
			<p className="text-emerald-700 font-medium mb-4 group-hover:text-emerald-800 transition-colors duration-300">
				{interview.position}
			</p>

			<div className="flex items-center space-x-2 text-gray-600 group-hover:text-emerald-600 transition-colors duration-300">
				<FaCalendarAlt className="text-sm" />
				<span className="text-sm font-medium">{interview.dateTime}</span>
			</div>
		</div>

		{/* Hover arrow */}
		<div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
			<FaArrowRight className="text-emerald-600" />
		</div>
	</motion.li>
);

// Question Card Component
const QuestionCard = ({ question, index }: { question: SharedQuestion; index: number }) => (
	<motion.li
		initial={{ opacity: 0, y: 20 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ duration: 0.5, delay: index * 0.1 }}
		whileHover={{ y: -4, scale: 1.02 }}
		className="group bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-xl hover:border-gray-300 transition-all duration-300 cursor-pointer relative overflow-hidden"
	>
		{/* Background shimmer effect */}
		<div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-shimmer"></div>

		{/* Question icon */}
		<div className="absolute top-4 right-4">
			<FaQuestionCircle className="text-blue-500 text-lg group-hover:text-blue-600 transition-colors duration-300" />
		</div>

		<div className="relative z-10">
			<div className="flex items-start justify-between mb-4">
				<div className="flex items-center space-x-3">
					<div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center">
						<FaBuilding className="text-blue-600 text-sm" />
					</div>
					<div>
						<h3 className="font-bold text-gray-800 group-hover:text-blue-700 transition-colors duration-300">
							{question.company}
						</h3>
						<p className="text-xs text-gray-500 group-hover:text-blue-500 transition-colors duration-300">
							{question.dateShared}
						</p>
					</div>
				</div>
			</div>

			<div className="mb-4">
				<p className="text-gray-700 italic leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
					&quot;{question.question}&quot;
				</p>
			</div>

			<div className="flex items-center space-x-2">
				<FaUsers className="text-green-500 text-sm" />
				<span className="text-sm text-green-600 font-medium group-hover:text-green-700 transition-colors duration-300">
					Shared by {question.user}
				</span>
			</div>
		</div>
	</motion.li>
);

// Main Community Component
const NotificationsCommunity: React.FC = () => {
	return (
		<section className="relative min-h-screen py-12 px-4 sm:px-6 lg:px-8">
			{/* Background decorative elements */}
			<div className="absolute inset-0 -z-10 overflow-hidden">
				<motion.div
					initial={{ scale: 0, opacity: 0 }}
					animate={{ scale: 1, opacity: 0.6 }}
					transition={{ duration: 1.2, delay: 0.2 }}
					className="absolute top-20 left-20 w-80 h-80 bg-gradient-to-br from-emerald-200 to-green-100 rounded-full mix-blend-multiply filter blur-xl"
				/>
				<motion.div
					initial={{ scale: 0, opacity: 0 }}
					animate={{ scale: 1, opacity: 0.4 }}
					transition={{ duration: 1.2, delay: 0.4 }}
					className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-blue-200 to-purple-100 rounded-full mix-blend-multiply filter blur-xl"
				/>
			</div>

			<div className="max-w-7xl mx-auto">
				{/* Header Section */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="text-center mb-12"
				>
					<h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
						Community{" "}
						<span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
							Hub
						</span>
					</h1>
					<p className="text-lg text-gray-600 max-w-2xl mx-auto">
						Stay connected with your interview journey and learn from the community.
					</p>
				</motion.div>

				{/* Main Grid */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 relative">
					{/* Connecting line for larger screens */}
					<div className="hidden lg:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-0.5 bg-gradient-to-r from-emerald-300 to-green-300 opacity-60 animate-pulse-line"></div>

					{/* Left Column: Upcoming Interviews */}
					<motion.div
						initial={{ opacity: 0, x: -30 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						className="space-y-6"
					>
						<div className="flex items-center space-x-3 mb-6">
							<div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
								<FaCalendarAlt className="text-emerald-600 text-lg" />
							</div>
							<h2 className="text-2xl lg:text-3xl font-bold text-emerald-700">
								Upcoming Interviews
							</h2>
						</div>

						{upcomingInterviews.length === 0 ? (
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								className="text-center py-12 bg-gray-50 rounded-xl border border-gray-200"
							>
								<FaCalendarAlt className="text-gray-400 text-4xl mb-4 mx-auto" />
								<p className="text-gray-500 text-lg">No upcoming interviews scheduled.</p>
								<p className="text-gray-400 text-sm mt-2">
									Book your next interview to get started!
								</p>
							</motion.div>
						) : (
							<ul className="space-y-4">
								{upcomingInterviews.map((interview, index) => (
									<InterviewCard key={interview.id} interview={interview} index={index} />
								))}
							</ul>
						)}
					</motion.div>

					{/* Right Column: Latest Shared Questions */}
					<motion.div
						initial={{ opacity: 0, x: 30 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6, delay: 0.4 }}
						className="space-y-6"
					>
						<div className="flex items-center space-x-3 mb-6">
							<div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
								<FaQuestionCircle className="text-blue-600 text-lg" />
							</div>
							<h2 className="text-2xl lg:text-3xl font-bold text-blue-700">Latest Questions</h2>
						</div>

						{latestSharedQuestions.length === 0 ? (
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								className="text-center py-12 bg-gray-50 rounded-xl border border-gray-200"
							>
								<FaQuestionCircle className="text-gray-400 text-4xl mb-4 mx-auto" />
								<p className="text-gray-500 text-lg">No questions shared recently.</p>
								<p className="text-gray-400 text-sm mt-2">
									Be the first to share your interview experience!
								</p>
							</motion.div>
						) : (
							<>
								<ul className="space-y-4">
									{latestSharedQuestions.map((question, index) => (
										<QuestionCard key={question.id} question={question} index={index} />
									))}
								</ul>

								{/* Explore More Button */}
								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.5, delay: 0.8 }}
									className="flex justify-end mt-6"
								>
									<motion.button
										whileHover={{ scale: 1.05, y: -2 }}
										whileTap={{ scale: 0.95 }}
										className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
									>
										<span>Explore More</span>
										<FaArrowRight className="text-sm" />
									</motion.button>
								</motion.div>
							</>
						)}
					</motion.div>
				</div>
			</div>
		</section>
	);
};

export default NotificationsCommunity;
