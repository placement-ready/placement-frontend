"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
	MdSearch,
	MdNotifications,
	MdSettings,
	MdClose,
	MdKeyboardArrowDown,
	MdLogout,
	MdPerson,
} from "react-icons/md";
import {
	TbLayoutSidebarLeftExpandFilled as SidebarOpen,
	TbLayoutSidebarLeftCollapseFilled as SidebarClose,
} from "react-icons/tb";
import { useAuth } from "@/hooks/useAuth";
import Sidebar from "./Sidebar";
import menuItems from "./MenuItems";

interface LayoutProps {
	children: React.ReactNode;
}

interface NotificationItem {
	id: string;
	title: string;
	message: string;
	time: string;
	type: "info" | "success" | "warning" | "error";
	isRead: boolean;
}

// Mock notifications data
const getNotifications = (): NotificationItem[] => [
	{
		id: "1",
		title: "Interview Scheduled",
		message: "Mock interview scheduled for tomorrow at 2 PM",
		time: "5 min ago",
		type: "info",
		isRead: false,
	},
	{
		id: "2",
		title: "Achievement Unlocked",
		message: "You've solved 100 problems! 🎉",
		time: "1 hour ago",
		type: "success",
		isRead: false,
	},
	{
		id: "3",
		title: "New Company Added",
		message: "Google's interview questions are now available",
		time: "2 hours ago",
		type: "info",
		isRead: true,
	},
];

const Layout: React.FC<LayoutProps> = ({ children }) => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [isSearchFocused, setIsSearchFocused] = useState(false);
	const [showNotifications, setShowNotifications] = useState(false);
	const [showProfileMenu, setShowProfileMenu] = useState(false);
	const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
	const [notifications, setNotifications] = useState<NotificationItem[]>([]);

	const { user, logout } = useAuth();
	const pathname = usePathname();

	useEffect(() => {
		setNotifications(getNotifications());
	}, []);

	// Close dropdowns when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as Element;
			if (!target.closest(".notifications-dropdown")) {
				setShowNotifications(false);
			}
			if (!target.closest(".profile-dropdown")) {
				setShowProfileMenu(false);
			}
			if (!target.closest(".search-container")) {
				setShowSearchSuggestions(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const onSidebarToggle = () => {
		setIsSidebarOpen((prev) => !prev);
	};

	const unreadNotifications = notifications.filter((n) => !n.isRead);

	const searchSuggestions = [
		"Data Structures and Algorithms",
		"System Design Interview",
		"Google Interview Questions",
		"Leetcode Problems",
		"Mock Interview",
		"Resume Templates",
	];

	const handleSearch = (query: string) => {
		console.log("Searching for:", query);
		// Implement search functionality
		setShowSearchSuggestions(false);
	};

	const handleNotificationClick = (notificationId: string) => {
		setNotifications((prev) =>
			prev.map((n) => (n.id === notificationId ? { ...n, isRead: true } : n))
		);
	};

	const markAllAsRead = () => {
		setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
	};

	const handleLogout = async () => {
		try {
			await logout.mutate();
		} catch (error) {
			console.error("Error signing out:", error);
		}
	};

	const getInitials = (name: string) => {
		const names = name.split(" ");
		if (names.length > 1) {
			return names[0].charAt(0) + names[1].charAt(0);
		}
		return names[0].charAt(0).toUpperCase();
	};

	const getCurrentPageTitle = () => {
		const pathSegments = pathname.split("/").filter(Boolean);
		const currentPage = pathSegments[pathSegments.length - 1] || "dashboard";
		return currentPage.charAt(0).toUpperCase() + currentPage.slice(1).replace("-", " ");
	};

	return (
		<>
			<Sidebar config={menuItems} isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
			<div className="flex-col w-full">
				<header className={`sticky top-0 z-30 w-full bg-white/95 backdrop-blur-sm shadow-lg`}>
					<div className="flex items-center justify-between h-20 px-4 lg:px-6">
						{/* Left Section - Sidebar Toggle & Breadcrumb */}
						<div className="flex items-center gap-4">
							{/* Mobile Sidebar Toggle */}
							<button
								onClick={onSidebarToggle}
								className="lg:hidden p-2 rounded-lg text-green-600 hover:bg-green-50 transition-colors duration-200"
								aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
							>
								{isSidebarOpen ? <SidebarClose size={24} /> : <SidebarOpen size={24} />}
							</button>

							{/* Desktop Sidebar Toggle */}
							<button
								onClick={onSidebarToggle}
								className="hidden lg:flex p-2 rounded-lg text-green-600 hover:bg-green-50 transition-colors duration-200"
								aria-label={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
							>
								{isSidebarOpen ? <SidebarClose size={32} /> : <SidebarOpen size={32} />}
							</button>

							{/* Current Page Title */}
							<div className="hidden sm:block">
								<h1 className="text-lg font-semibold text-gray-800">{getCurrentPageTitle()}</h1>
								<p className="text-xs text-gray-500 mt-0.5">
									Welcome back, {user?.name?.split(" ")[0] || "User"}!
								</p>
							</div>
						</div>

						{/* Center Section - Search */}
						<div className="flex-1 max-w-2xl mx-4 relative search-container">
							<div
								className={`
						relative flex items-center
						${isSearchFocused ? "ring-2 ring-green-400 ring-opacity-50" : ""}
						bg-gray-50 rounded-xl transition-all duration-200
					`}
							>
								<MdSearch className="absolute left-3 text-gray-400" size={20} />
								<input
									type="text"
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									onFocus={() => {
										setIsSearchFocused(true);
										setShowSearchSuggestions(true);
									}}
									onBlur={() => setIsSearchFocused(false)}
									onKeyDown={(e) => e.key === "Enter" && handleSearch(searchQuery)}
									placeholder="Search problems, companies, topics..."
									className="w-full pl-10 pr-4 py-2.5 bg-transparent border-0 outline-none text-gray-700 placeholder-gray-400 text-sm"
								/>
								{searchQuery && (
									<button
										onClick={() => setSearchQuery("")}
										className="absolute right-3 text-gray-400 hover:text-gray-600"
									>
										<MdClose size={16} />
									</button>
								)}
							</div>

							{/* Search Suggestions Dropdown */}
							{showSearchSuggestions && (
								<div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
									{searchSuggestions
										.filter((suggestion) =>
											suggestion.toLowerCase().includes(searchQuery.toLowerCase())
										)
										.slice(0, 5)
										.map((suggestion, index) => (
											<button
												key={index}
												onClick={() => {
													setSearchQuery(suggestion);
													handleSearch(suggestion);
												}}
												className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
											>
												<MdSearch className="inline mr-2 text-gray-400" size={16} />
												{suggestion}
											</button>
										))}
									{searchQuery &&
										!searchSuggestions.some((s) =>
											s.toLowerCase().includes(searchQuery.toLowerCase())
										) && (
											<div className="px-4 py-2 text-sm text-gray-500">No suggestions found</div>
										)}
								</div>
							)}
						</div>

						{/* Right Section - Actions & Profile */}
						<div className="flex items-center gap-2">
							{/* Notifications */}
							<div className="relative notifications-dropdown">
								<button
									onClick={() => setShowNotifications(!showNotifications)}
									className="relative p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors duration-200"
									aria-label="Notifications"
								>
									<MdNotifications size={20} />
									{unreadNotifications.length > 0 && (
										<span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
											{unreadNotifications.length > 9 ? "9+" : unreadNotifications.length}
										</span>
									)}
								</button>

								{/* Notifications Dropdown */}
								{showNotifications && (
									<div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
										<div className="flex items-center justify-between px-4 py-2 border-b border-gray-100">
											<h3 className="font-semibold text-gray-800">Notifications</h3>
											{unreadNotifications.length > 0 && (
												<button
													onClick={markAllAsRead}
													className="text-xs text-green-600 hover:text-green-700"
												>
													Mark all as read
												</button>
											)}
										</div>
										<div className="max-h-96 overflow-y-auto">
											{notifications.length > 0 ? (
												notifications.slice(0, 5).map((notification) => (
													<button
														key={notification.id}
														onClick={() => handleNotificationClick(notification.id)}
														className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-150 ${
															!notification.isRead ? "bg-green-50" : ""
														}`}
													>
														<div className="flex items-start gap-3">
															<div
																className={`w-2 h-2 rounded-full mt-2 ${
																	!notification.isRead ? "bg-green-500" : "bg-gray-300"
																}`}
															/>
															<div className="flex-1">
																<h4 className="font-medium text-sm text-gray-800">
																	{notification.title}
																</h4>
																<p className="text-xs text-gray-600 mt-1">{notification.message}</p>
																<p className="text-xs text-gray-400 mt-1">{notification.time}</p>
															</div>
														</div>
													</button>
												))
											) : (
												<div className="px-4 py-8 text-center text-gray-500">
													<MdNotifications size={24} className="mx-auto mb-2 opacity-50" />
													<p className="text-sm">No notifications yet</p>
												</div>
											)}
										</div>
										<div className="border-t border-gray-100 px-4 py-2">
											<Link
												href="/dashboard/notifications"
												className="text-xs text-green-600 hover:text-green-700"
											>
												View all notifications
											</Link>
										</div>
									</div>
								)}
							</div>

							{/* Settings */}
							<Link
								href="/dashboard/settings"
								className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors duration-200"
								aria-label="Settings"
							>
								<MdSettings size={20} />
							</Link>

							{/* Profile Dropdown */}
							<div className="relative profile-dropdown">
								<button
									onClick={() => setShowProfileMenu(!showProfileMenu)}
									className="flex items-center gap-2 p-1 rounded-lg hover:bg-gray-100 transition-colors duration-200"
								>
									{user?.avatar ? (
										<Image
											src={user.avatar}
											alt="Profile"
											width={32}
											height={32}
											className="rounded-full"
										/>
									) : (
										<div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
											<span className="text-white font-medium text-sm">
												{getInitials(user?.name || "User")}
											</span>
										</div>
									)}
									<MdKeyboardArrowDown className="text-gray-400 hidden sm:block" size={16} />
								</button>

								{/* Profile Dropdown Menu */}
								{showProfileMenu && (
									<div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
										<div className="px-4 py-2 border-b border-gray-100">
											<p className="font-medium text-gray-800 text-sm">{user?.name || "User"}</p>
											<p className="text-xs text-gray-500">{user?.email || "user@example.com"}</p>
										</div>
										<Link
											href="/dashboard/profile"
											className="flex items-center gap-2 w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
											onClick={() => setShowProfileMenu(false)}
										>
											<MdPerson size={16} />
											View Profile
										</Link>
										<Link
											href="/dashboard/settings"
											className="flex items-center gap-2 w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
											onClick={() => setShowProfileMenu(false)}
										>
											<MdSettings size={16} />
											Settings
										</Link>
										<hr className="my-2 border-gray-100" />
										<button
											onClick={() => {
												setShowProfileMenu(false);
												handleLogout();
											}}
											className="flex items-center gap-2 w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors duration-150"
										>
											<MdLogout size={16} />
											Sign Out
										</button>
									</div>
								)}
							</div>
						</div>
					</div>
				</header>
				<main className="flex-1 p-4 md:p-6 lg:p-8 bg-green-50">{children}</main>
			</div>
		</>
	);
};

export default Layout;
