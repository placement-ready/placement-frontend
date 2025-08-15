"use client";

import { useState } from "react";
import Image from "next/image";
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
	UserCircleIcon,
	ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Navbar = () => {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const { data: session } = useSession();
	const isAuthenticated = !!session?.user;
	const router = useRouter();

	const handleSignOut = async () => {
		try {
			await signOut({ callbackUrl: "/" });
		} catch (error) {
			console.error("Error signing out:", error);
		}
	};

	return (
		<nav className="bg-white/90 backdrop-blur-lg shadow-sm border-b border-green-100/50 fixed w-full z-50 transition-all duration-300">
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
						<a
							href="#"
							className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-gray-700 hover:text-green-600 hover:bg-green-50/80 transition-all duration-200 group"
						>
							<HomeIcon className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
							<span className="font-medium">Learning</span>
						</a>
						<a
							href="#"
							className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-gray-700 hover:text-green-600 hover:bg-green-50/80 transition-all duration-200 group"
						>
							<ChartBarIcon className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
							<span className="font-medium">Practice</span>
						</a>
						<a
							href="#"
							className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-gray-700 hover:text-green-600 hover:bg-green-50/80 transition-all duration-200 group"
						>
							<BookOpenIcon className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
							<span className="font-medium">Study Plan</span>
						</a>

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
										href="#"
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
									icon={<UserCircleIcon className="h-5 w-5" />}
									label={session?.user?.name || "User"}
									className="flex items-center gap-2 px-6 py-2.5 hover:text-white bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105"
								/>
								<DropdownContent width="w-64" position="right">
									<DropdownMenu>
										<DropdownItem
											icon={<UserIcon className="h-5 w-5" />}
											label="Profile"
											href="#"
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
			{mobileMenuOpen && (
				<div className="md:hidden bg-white/95 backdrop-blur-lg border-t border-green-100/50 shadow-lg animate-in slide-in-from-top-3 duration-300">
					<div className="px-4 py-6 space-y-2">
						{/* Mobile Navigation Links */}
						<a
							href="#"
							className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:text-green-600 hover:bg-green-50/80 transition-all duration-200 group"
						>
							<HomeIcon className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
							<span className="font-medium">Learning App</span>
						</a>
						<a
							href="#"
							className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:text-green-600 hover:bg-green-50/80 transition-all duration-200 group"
						>
							<ChartBarIcon className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
							<span className="font-medium">Practice</span>
						</a>
						<a
							href="#"
							className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:text-green-600 hover:bg-green-50/80 transition-all duration-200 group"
						>
							<BookOpenIcon className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
							<span className="font-medium">Study Plan</span>
						</a>

						{/* Mobile AI Tools Section */}
						<div className="py-3">
							<div className="px-4 py-2 text-sm font-semibold text-gray-500 uppercase tracking-wider">
								AI Tools
							</div>
							<div className="space-y-1">
								<a
									href="#"
									className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-gray-600 hover:text-green-600 hover:bg-green-50/80 transition-all duration-200"
								>
									<SparklesIcon className="h-4 w-4" />
									<span>Resume Builder</span>
								</a>
								<a
									href="#"
									className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-gray-600 hover:text-green-600 hover:bg-green-50/80 transition-all duration-200"
								>
									<DocumentTextIcon className="h-4 w-4" />
									<span>Cover Letter</span>
								</a>
								<a
									href="#"
									className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-gray-600 hover:text-green-600 hover:bg-green-50/80 transition-all duration-200"
								>
									<AcademicCapIcon className="h-4 w-4" />
									<span>Interview Prep</span>
								</a>
							</div>
						</div>

						{/* Mobile Job Tools Section */}
						<div className="py-3">
							<div className="px-4 py-2 text-sm font-semibold text-gray-500 uppercase tracking-wider">
								Job Tools
							</div>
							<div className="space-y-1">
								<a
									href="#"
									className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-gray-600 hover:text-green-600 hover:bg-green-50/80 transition-all duration-200"
								>
									<MagnifyingGlassIcon className="h-4 w-4" />
									<span>Job Search</span>
								</a>
								<a
									href="#"
									className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-gray-600 hover:text-green-600 hover:bg-green-50/80 transition-all duration-200"
								>
									<BuildingOfficeIcon className="h-4 w-4" />
									<span>Company Research</span>
								</a>
								<a
									href="#"
									className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-gray-600 hover:text-green-600 hover:bg-green-50/80 transition-all duration-200"
								>
									<CalendarIcon className="h-4 w-4" />
									<span>Application Tracker</span>
								</a>
							</div>
						</div>

						{/* Mobile Action Buttons */}
						<div className="pt-6 border-t border-green-100/50 mt-6">
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

							{/* Mobile CTA Button */}
							<button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 group">
								<span>Get Started</span>
								<ArrowRightIcon className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
							</button>
						</div>
					</div>
				</div>
			)}
		</nav>
	);
};

export default Navbar;
