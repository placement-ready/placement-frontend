"use client";
import Link from "next/link";
import { Home, ArrowLeft, Compass } from "lucide-react";

export default function NotFound() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
			<div className="max-w-xl w-full text-center">
				<div className="relative">
					<div className="text-8xl sm:text-9xl lg:text-[12rem] font-bold bg-gradient-to-r from-green-500 via-emerald-600 to-green-700 bg-clip-text text-transparent select-none">
						404
					</div>
				</div>

				{/* Error Message */}
				<div className="mb-8">
					<h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
						Page Not Found
					</h1>
					<p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
						Oops! The page you&apos;re looking for seems to have taken a detour.
						<br className="hidden sm:block" />
						Let&apos;s get you back on track.
					</p>
				</div>

				{/* Suggestions */}
				<div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-xl border border-gray-200 mb-8">
					<h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center justify-center gap-2">
						<Compass className="w-5 h-5 text-green-600" />
						What you can do:
					</h3>
					<div className="space-y-3 text-sm sm:text-base text-gray-600">
						<div className="flex items-center gap-3 justify-center">
							<div className="w-2 h-2 bg-green-500 rounded-full"></div>
							<span>Check if the URL is spelled correctly</span>
						</div>
						<div className="flex items-center gap-3 justify-center">
							<div className="w-2 h-2 bg-green-500 rounded-full"></div>
							<span>Go back to the homepage</span>
						</div>
					</div>
				</div>

				{/* Action Buttons */}
				<div className="flex flex-col sm:flex-row gap-4 justify-center">
					<Link
						href="/"
						className="group flex items-center justify-center gap-3 px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base font-semibold rounded-xl text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
					>
						<Home className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
						Go to Homepage
					</Link>

					<button
						onClick={() => window.history.back()}
						className="group flex items-center justify-center gap-3 px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base font-semibold rounded-xl text-green-600 bg-white border-2 border-green-600 hover:bg-green-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
					>
						<ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
						Go Back
					</button>
				</div>

				{/* Decorative Elements */}
				<div className="absolute -z-10 top-1/4 left-1/4 w-32 h-32 bg-green-200 rounded-full opacity-20 animate-pulse"></div>
				<div className="absolute -z-10 bottom-1/4 right-1/4 w-24 h-24 bg-emerald-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
				<div className="absolute -z-10 top-3/4 left-1/3 w-16 h-16 bg-green-300 rounded-full opacity-20 animate-pulse delay-500"></div>
			</div>
		</div>
	);
}
