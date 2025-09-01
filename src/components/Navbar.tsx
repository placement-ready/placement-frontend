"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
	DropdownRoot,
	DropdownTrigger,
	DropdownContent,
	DropdownMenu,
	DropdownItem,
} from "./ui/Dropdown";
import {
	SunIcon,
	BellIcon,
	ChartBarIcon,
	BookOpenIcon,
	HomeIcon,
	BoltIcon,
	BriefcaseIcon,
	MagnifyingGlassIcon,
	Bars3Icon,
	XMarkIcon,
	SparklesIcon,
	DocumentTextIcon,
	AcademicCapIcon,
	BuildingOfficeIcon,
	CalendarIcon,
	ArrowRightIcon,
	UserIcon,
	ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

const Navbar = () => {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const { user, isAuthenticated, logout } = useAuth();
	const router = useRouter();
	const pathname = usePathname();

	const userImage = user?.avatar || "/brain.png";

	const handleSignOut = async () => {
		try {
			await logout.mutate();
		} catch (error) {
			console.error("Error signing out:", error);
		}
	};

	// Close mobile menu on route change
	useEffect(() => {
		setMobileMenuOpen(false);
	}, [pathname]);

	// Lock body scroll when mobile menu is open
	useEffect(() => {
		if (mobileMenuOpen) {
			document.body.classList.add("overflow-hidden");
		} else {
			document.body.classList.remove("overflow-hidden");
		}
		return () => document.body.classList.remove("overflow-hidden");
	}, [mobileMenuOpen]);

	return (
		<>
			<nav className="bg-white/90 backdrop-blur-lg shadow-sm border-b border-green-100/50 fixed top-0 w-full z-50 transition-all duration-300">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex items-center justify-between h-16">
						{/* Logo + Brand */}
						<div className="flex items-center gap-3">
							<div className="bg-gradient-to-br from-emerald-400 via-green-400 to-green-500 rounded-xl p-2.5 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:rotate-3">
								<Image
									src="/brain.png"
									alt="Brain Logo"
									width={24}
									height={24}
									className="object-contain cursor-pointer"
								/>
							</div>
							<span className="text-2xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 bg-clip-text text-transparent hover:from-green-700 hover:via-emerald-700 hover:to-green-800 transition-all duration-300 cursor-pointer">
								Hire<span className="text-emerald-600">Mind</span>
							</span>
						</div>

						{/* Desktop Menu */}
						<div className="hidden lg:flex items-center space-x-1">
							<Link
								href="/"
								className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-gray-700 hover:text-green-600 hover:bg-green-50/80 transition-all duration-200 group"
							>
								<HomeIcon className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
								<span className="font-medium">Home</span>
							</Link>
							<Link
								href="/dashboard/dsa"
								className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-gray-700 hover:text-green-600 hover:bg-green-50/80 transition-all duration-200 group"
							>
								<ChartBarIcon className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
								<span className="font-medium">Practice</span>
							</Link>
							<Link
								href="/dashboard/studyPlan"
								className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-gray-700 hover:text-green-600 hover:bg-green-50/80 transition-all duration-200 group"
							>
								<BookOpenIcon className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
								<span className="font-medium">Study Plan</span>
							</Link>

							{/* AI Tools Dropdown */}
							<DropdownRoot>
								<DropdownTrigger
									icon={<BoltIcon className="h-5 w-5" />}
									label="AI Tools"
									className="hover:bg-green-50/80"
								/>
								<DropdownContent width="w-64">
									<DropdownMenu>
										<DropdownItem
											icon={<SparklesIcon className="h-5 w-5" />}
											label="Resume Builder"
											description="AI-powered resume creation"
											href="/dashboard/resume"
										/>
										<DropdownItem
											icon={<DocumentTextIcon className="h-5 w-5" />}
											label="Cover Letter"
											description="Generate personalized letters"
											href="#"
										/>
										<DropdownItem
											icon={<AcademicCapIcon className="h-5 w-5" />}
											label="Interview Prep"
											description="AI interview simulation"
											href="#"
										/>
									</DropdownMenu>
								</DropdownContent>
							</DropdownRoot>

							{/* Job Tools Dropdown */}
							<DropdownRoot>
								<DropdownTrigger
									icon={<BriefcaseIcon className="h-5 w-5" />}
									label="Job Tools"
									className="hover:bg-green-50/80"
								/>
								<DropdownContent width="w-64">
									<DropdownMenu>
										<DropdownItem
											icon={<MagnifyingGlassIcon className="h-5 w-5" />}
											label="Job Search"
											description="Find relevant opportunities"
											href="#"
										/>
										<DropdownItem
											icon={<BuildingOfficeIcon className="h-5 w-5" />}
											label="Company Research"
											description="Deep dive into companies"
											href="#"
										/>
										<DropdownItem
											icon={<CalendarIcon className="h-5 w-5" />}
											label="Application Tracker"
											description="Track your applications"
											href="#"
										/>
									</DropdownMenu>
								</DropdownContent>
							</DropdownRoot>
						</div>

						{/* Right Side Actions */}
						<div className="hidden md:flex items-center space-x-3">
							{/* Action Icons */}
							<div className="flex items-center space-x-2">
								<button className="p-2.5 hover:bg-green-50/80 rounded-xl transition-all duration-200 group hover:shadow-md cursor-pointer">
									<MagnifyingGlassIcon className="h-5 w-5 text-gray-500 group-hover:text-green-600 group-hover:scale-110 transition-all duration-200" />
								</button>
								<button className="p-2.5 hover:bg-green-50/80 rounded-xl transition-all duration-200 group hover:shadow-md relative cursor-pointer">
									<BellIcon className="h-5 w-5 text-gray-500 group-hover:text-green-600 group-hover:scale-110 transition-all duration-200" />
									<div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-gradient-to-r from-red-400 to-red-500 rounded-full animate-pulse shadow-sm"></div>
								</button>
								<button className="p-2.5 hover:bg-green-50/80 rounded-xl transition-all duration-200 group hover:shadow-md cursor-pointer">
									<SunIcon className="h-5 w-5 text-emerald-500 group-hover:text-emerald-600 group-hover:scale-110 group-hover:rotate-12 transition-all duration-200" />
								</button>
							</div>

							{/* Get Started Button */}
							{isAuthenticated ? (
								<DropdownRoot>
									<DropdownTrigger
										icon={
											<span className="relative flex items-center">
												<Image
													src={userImage}
													alt={user?.name || "User"}
													width={32}
													height={32}
													className="rounded-full object-cover shadow"
												/>
											</span>
										}
										label={user?.name || "User"}
										className="flex items-center gap-2 px-4 py-2 hover:text-white bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105"
									/>
									<DropdownContent width="w-64" position="right">
										<DropdownMenu>
											<DropdownItem
												icon={<UserIcon className="h-5 w-5" />}
												label="Profile"
												href="/dashboard/profile"
											/>
											<DropdownItem
												icon={<ArrowRightStartOnRectangleIcon className="h-5 w-5" />}
												label="Logout"
												onClick={handleSignOut}
											/>
										</DropdownMenu>
									</DropdownContent>
								</DropdownRoot>
							) : (
								<button
									onClick={() => router.push("/dashboard")}
									className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 group ml-2 cursor-pointer"
								>
									<span>Get Started</span>
									<ArrowRightIcon className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
								</button>
							)}
						</div>

						{/* Mobile Hamburger Button */}
						<div className="md:hidden flex items-center">
							<button
								onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
								className="p-2.5 rounded-xl hover:bg-green-50/80 transition-all duration-200"
								aria-expanded={mobileMenuOpen}
								aria-controls="mobile-menu"
								aria-label="Toggle navigation menu"
							>
								{mobileMenuOpen ? (
									<XMarkIcon className="h-6 w-6 text-gray-700 transform rotate-180 transition-transform duration-300" />
								) : (
									<Bars3Icon className="h-6 w-6 text-gray-700 hover:text-green-600 transition-colors duration-200" />
								)}
							</button>
						</div>
					</div>
				</div>

				{/* Mobile Menu */}
				<div
					className={`md:hidden fixed inset-x-0 h-screen top-16 bottom-0 bg-white backdrop-blur-lg border-t border-green-100/50 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
						mobileMenuOpen ? "translate-x-0" : "translate-x-full"
					}`}
					id="mobile-menu"
					role="dialog"
					aria-modal="true"
				>
					{/* Scrollable Content */}
					<div className="h-full overflow-y-auto overscroll-contain">
						<div className="px-4 py-6 space-y-2 min-h-full">
							{/* Mobile User Image */}
							{isAuthenticated && (
								<div className="flex flex-col items-center mb-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
									<Image
										src={userImage}
										alt={user?.name || "User"}
										width={64}
										height={64}
										className="rounded-full object-cover border-3 border-green-500 shadow-lg"
									/>
									{user?.name && (
										<span className="mt-3 text-xl font-bold text-gray-800">{user.name}</span>
									)}
									{user?.email && <span className="text-sm text-gray-500 mt-1">{user.email}</span>}
								</div>
							)}

							{/* Mobile Profile Menu */}
							{isAuthenticated && (
								<div className="py-3 border-b border-green-100/50 mb-4">
									<div className="px-4 py-2 text-sm font-semibold text-gray-500 uppercase tracking-wider">
										Account
									</div>
									<div className="space-y-1">
										<Link
											href="/dashboard/profile"
											className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-gray-600 hover:text-green-600 hover:bg-green-50/80 transition-all duration-200"
											onClick={() => setMobileMenuOpen(false)}
										>
											<UserIcon className="h-4 w-4" />
											<span>Profile</span>
										</Link>
										<button
											onClick={() => {
												setMobileMenuOpen(false);
												handleSignOut();
											}}
											className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-gray-600 hover:text-red-600 hover:bg-red-50/80 transition-all duration-200"
										>
											<ArrowRightStartOnRectangleIcon className="h-4 w-4" />
											<span>Logout</span>
										</button>
									</div>
								</div>
							)}

							{/* Mobile Navigation Links */}
							<Link
								href="#"
								className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:text-green-600 hover:bg-green-50/80 transition-all duration-200 group"
							>
								<HomeIcon className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
								<span className="font-medium">Learning App</span>
							</Link>
							<Link
								href="#"
								className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:text-green-600 hover:bg-green-50/80 transition-all duration-200 group"
							>
								<ChartBarIcon className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
								<span className="font-medium">Practice</span>
							</Link>
							<Link
								href="#"
								className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:text-green-600 hover:bg-green-50/80 transition-all duration-200 group"
							>
								<BookOpenIcon className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
								<span className="font-medium">Study Plan</span>
							</Link>

							{/* Mobile AI Tools Section */}
							<div className="py-3">
								<div className="px-4 py-2 text-sm font-semibold text-gray-500 uppercase tracking-wider">
									AI Tools
								</div>
								<div className="space-y-1">
									<Link
										href="#"
										className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-gray-600 hover:text-green-600 hover:bg-green-50/80 transition-all duration-200"
									>
										<SparklesIcon className="h-4 w-4" />
										<span>Resume Builder</span>
									</Link>
									<Link
										href="#"
										className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-gray-600 hover:text-green-600 hover:bg-green-50/80 transition-all duration-200"
									>
										<DocumentTextIcon className="h-4 w-4" />
										<span>Cover Letter</span>
									</Link>
									<Link
										href="#"
										className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-gray-600 hover:text-green-600 hover:bg-green-50/80 transition-all duration-200"
									>
										<AcademicCapIcon className="h-4 w-4" />
										<span>Interview Prep</span>
									</Link>
								</div>
							</div>

							{/* Mobile Job Tools Section */}
							<div className="py-3">
								<div className="px-4 py-2 text-sm font-semibold text-gray-500 uppercase tracking-wider">
									Job Tools
								</div>
								<div className="space-y-1">
									<Link
										href="#"
										className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-gray-600 hover:text-green-600 hover:bg-green-50/80 transition-all duration-200"
									>
										<MagnifyingGlassIcon className="h-4 w-4" />
										<span>Job Search</span>
									</Link>
									<Link
										href="#"
										className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-gray-600 hover:text-green-600 hover:bg-green-50/80 transition-all duration-200"
									>
										<BuildingOfficeIcon className="h-4 w-4" />
										<span>Company Research</span>
									</Link>
									<Link
										href="#"
										className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-gray-600 hover:text-green-600 hover:bg-green-50/80 transition-all duration-200"
									>
										<CalendarIcon className="h-4 w-4" />
										<span>Application Tracker</span>
									</Link>
								</div>
							</div>

							{/* Mobile Action Buttons */}
							<div className="py-3 mb-6">
								<div className="flex items-center justify-between mb-4">
									<span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
										Quick Actions
									</span>
									<div className="flex gap-2">
										<button className="p-2.5 hover:bg-green-50/80 rounded-xl transition-all duration-200">
											<MagnifyingGlassIcon className="h-5 w-5 text-gray-500 hover:text-green-600" />
										</button>
										<button className="p-2.5 hover:bg-green-50/80 rounded-xl transition-all duration-200 relative">
											<BellIcon className="h-5 w-5 text-gray-500 hover:text-green-600" />
											<div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-500 rounded-full"></div>
										</button>
										<button className="p-2.5 hover:bg-green-50/80 rounded-xl transition-all duration-200">
											<SunIcon className="h-5 w-5 text-emerald-500 hover:text-emerald-600" />
										</button>
									</div>
								</div>

								{/* Mobile CTA Button - Only show for non-authenticated users */}
								{!isAuthenticated && (
									<button
										onClick={() => {
											setMobileMenuOpen(false);
											router.push("/dashboard");
										}}
										className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 group"
									>
										<span>Get Started</span>
										<ArrowRightIcon className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
									</button>
								)}
							</div>
						</div>
					</div>
				</div>
			</nav>

			{/* Spacer to offset fixed navbar height */}
			<div className="h-16" aria-hidden="true" />
		</>
	);
};

export default Navbar;
