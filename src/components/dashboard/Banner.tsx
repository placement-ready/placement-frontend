"use client";

import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "@/hooks";

// Utility functions for time formatting
const pad = (num: number): string => num.toString().padStart(2, "0");

const formatTime = (secs: number): string => {
	const hours = Math.floor(secs / 3600);
	const minutes = Math.floor((secs % 3600) / 60);
	const seconds = secs % 60;
	return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
};

// Types
interface CountdownProps {
	target: Date;
}

// Countdown Timer Component
const CountdownTimer: React.FC<CountdownProps> = ({ target }) => {
	const [remaining, setRemaining] = useState<number | null>(null);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		const calculateRemaining = (): number =>
			Math.max(Math.floor((target.getTime() - Date.now()) / 1000), 0);

		setRemaining(calculateRemaining());

		intervalRef.current = setInterval(() => {
			setRemaining((prev) => {
				if (prev === null) return calculateRemaining();
				return Math.max(prev - 1, 0);
			});
		}, 1000);

		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
		};
	}, [target]);

	if (remaining === null) return null;
	if (remaining === 0)
		return <span className="font-mono text-2xl text-green-600 font-bold">Interview Time!</span>;
	return (
		<span className="font-mono text-2xl text-green-600 font-bold">{formatTime(remaining)}</span>
	);
};

// Constants
const MOTIVATIONAL_MESSAGES = [
	"Keep pushing forward! 🚀",
	"Every interview is a new opportunity! ✨",
	"You're getting better every day! 📈",
	"Stay confident and positive! 💪",
	"Success is just around the corner! 🎯",
] as const;

const ANIMATION_DURATION = 420;
const MESSAGE_SWITCH_INTERVAL = 3500;
const PRACTICE_FEEDBACK_DURATION = 1600;

const Banner: React.FC = () => {
	// State for next interview date (calculated on client side)
	const [nextInterviewDate, setNextInterviewDate] = useState<Date | null>(null);
	const { user } = useAuth();

	// Motivational message ticker state
	const [motivatorIndex, setMotivatorIndex] = useState(0);
	const [isAnimating, setIsAnimating] = useState(false);

	// Practice button state
	const [isPracticing, setIsPracticing] = useState(false);

	// Initialize next interview date
	useEffect(() => {
		setNextInterviewDate(new Date(Date.now() + 15 * 3600 * 1000));
	}, []);

	// Handle motivational message cycling
	useEffect(() => {
		const messageInterval = setInterval(() => {
			setIsAnimating(true);
			setTimeout(() => {
				setMotivatorIndex((prevIndex) => (prevIndex + 1) % MOTIVATIONAL_MESSAGES.length);
				setIsAnimating(false);
			}, ANIMATION_DURATION);
		}, MESSAGE_SWITCH_INTERVAL);

		return () => clearInterval(messageInterval);
	}, []);

	// Handle practice button click
	const handlePracticeClick = (): void => {
		setIsPracticing(true);
		setTimeout(() => setIsPracticing(false), PRACTICE_FEEDBACK_DURATION);
	};

	return (
		<div className="flex flex-col lg:flex-row gap-6 lg:gap-12 justify-center items-stretch min-h-[420px] bg-gradient-to-br from-green-50 to-cyan-50 rounded-3xl shadow-lg border border-green-100 p-6 lg:p-12 relative overflow-hidden">
			{/* Floating decorative emoji */}
			<div className="absolute right-4 lg:right-8 top-4 text-2xl lg:text-3xl opacity-70 animate-bounce">
				💡
			</div>

			{/* Left Section - Main Content */}
			<div className="flex-1 flex flex-col justify-center space-y-6">
				{/* Welcome Header */}
				<div>
					<h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-green-700 mb-3">
						Hello {user?.name || "User"} 👋
					</h2>
					<p className="text-lg lg:text-xl text-green-600 font-medium">
						Ready for your next challenge?
					</p>
				</div>

				{/* Countdown Section */}
				<div className="space-y-3">
					<p className="text-base lg:text-lg text-green-700 font-medium">
						Next Interview Countdown:
					</p>
					<div className="text-center lg:text-left">
						{nextInterviewDate && <CountdownTimer target={nextInterviewDate} />}
					</div>
				</div>

				{/* Action Button */}
				<button
					onClick={handlePracticeClick}
					disabled={isPracticing}
					className={`
            w-full sm:w-auto inline-flex items-center justify-center gap-2
            px-6 lg:px-8 py-3 lg:py-4 
            text-white font-bold text-base lg:text-lg
            rounded-2xl border-none cursor-pointer
            transition-all duration-300 ease-in-out
            shadow-lg hover:shadow-xl
            transform hover:scale-105 active:scale-95
            ${
							isPracticing
								? "bg-gradient-to-r from-green-700 to-green-500 opacity-80"
								: "bg-gradient-to-r from-green-600 to-green-400 hover:from-green-700 hover:to-green-500"
						}
          `}
				>
					<span>🚀</span>
					<span>{isPracticing ? "Launching Practice..." : "Start Mock Interview"}</span>
				</button>

				{/* Motivational Message Ticker */}
				<div className="bg-green-100 text-green-700 font-semibold rounded-lg p-4 relative overflow-hidden min-h-[56px] flex items-center shadow-sm">
					<span
						className={`
              block absolute left-4 right-4 
              transition-all duration-500 ease-in-out
              ${isAnimating ? "translate-y-full opacity-0" : "translate-y-0 opacity-100"}
            `}
					>
						{MOTIVATIONAL_MESSAGES[motivatorIndex]}
					</span>
				</div>
			</div>

			{/* Right Section - Illustration */}
			<div className="flex-1 flex items-center justify-center min-w-0 lg:min-w-[260px] mt-6 lg:mt-0">
				<div className="w-full max-w-[280px] aspect-square">
					<InterviewIllustration />
				</div>
			</div>
		</div>
	);
};

// Interview Illustration Component
const InterviewIllustration: React.FC = () => (
	<svg width="100%" height="100%" viewBox="0 0 220 220" fill="none" className="drop-shadow-md">
		{/* Background */}
		<rect width="220" height="220" rx="48" fill="#d1fae5" />

		{/* Person/Avatar */}
		<ellipse cx="110" cy="85" rx="45" ry="35" fill="#ffffff" />
		<circle cx="110" cy="85" r="18" fill="#059669" />

		{/* Body */}
		<rect x="92" y="105" width="36" height="20" rx="8" fill="#065f46" />

		{/* Interview Badge */}
		<rect x="61" y="135" width="98" height="32" rx="16" fill="#059669" />
		<text
			x="110"
			y="155"
			textAnchor="middle"
			dominantBaseline="middle"
			fontFamily="system-ui, sans-serif"
			fontSize="16"
			fontWeight="600"
			fill="#ffffff"
		>
			Interview Ready!
		</text>

		{/* Decorative elements */}
		<circle cx="80" cy="50" r="4" fill="#059669" opacity="0.3" />
		<circle cx="140" cy="45" r="3" fill="#059669" opacity="0.4" />
		<circle cx="160" cy="70" r="2" fill="#059669" opacity="0.5" />
	</svg>
);

export default Banner;
