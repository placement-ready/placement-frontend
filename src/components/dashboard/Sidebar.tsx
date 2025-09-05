"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdLogout } from "react-icons/md";
import { useAuth } from "@/hooks/useAuth";

interface SidebarMenuItem {
	id: string;
	name: string;
	icon: React.ReactElement;
	href?: string;
	type: "link" | "heading";
	children?: SidebarMenuItem[];
	badge?: string | number;
	onClick?: () => void;
}

interface SidebarConfig {
	logo: {
		src: string;
		alt: string;
		title: string;
	};
	menuItems: SidebarMenuItem[];
	showProfile?: boolean;
	showLogout?: boolean;
}

interface SidebarProps {
	config: SidebarConfig;
	isOpen: boolean;
	setIsOpen: (open: boolean) => void;
	className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ config, isOpen, setIsOpen, className = "" }) => {
	const [isMobile, setIsMobile] = useState(false);
	const pathname = usePathname();
	const { user, logout } = useAuth();

	// Handle responsive behavior
	useEffect(() => {
		const handleResize = () => {
			const mobile = window.innerWidth < 1024;
			setIsMobile(mobile);
			if (mobile) setIsOpen(false);
		};

		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, [setIsOpen]);

	// Close sidebar on mobile when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (isMobile && isOpen) {
				const sidebar = document.getElementById("sidebar");
				if (sidebar && !sidebar.contains(event.target as Node)) {
					setIsOpen(false);
				}
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [isMobile, isOpen, setIsOpen]);

	const handleSignOut = async () => {
		try {
			await logout.mutate();
		} catch (error) {
			console.error("Error signing out:", error);
		}
	};

	const isActiveLink = (href: string) => {
		if (href === "/dashboard") {
			return pathname === "/dashboard";
		}
		return pathname.startsWith(href);
	};

	const getInitials = (name: string) => {
		const names = name.split(" ");
		if (names.length > 1) {
			return names[0].charAt(0) + names[1].charAt(0);
		}
		return names[0].charAt(0).toLocaleUpperCase();
	};

	const renderMenuItem = (item: SidebarMenuItem, depth: number = 0) => {
		const isActive = item.href ? isActiveLink(item.href) : false;
		const hasChildren = item.children && item.children.length > 0;
		const indentClass = depth > 0 ? `ml-${depth * 4}` : "";

		if (item.type === "heading" && hasChildren && isOpen) {
			return (
				<li key={item.id} className="w-full">
					<div className={`mb-2 mt-4 ${indentClass}`}>
						<div className="flex items-center gap-3 px-4 py-2">
							<span className="text-lg text-green-600 flex-shrink-0">{item.icon}</span>
							<span className="text-sm font-bold text-green-700 uppercase tracking-wide">
								{item.name}
							</span>
						</div>
						<div className="h-px bg-green-200/50 mx-4"></div>
					</div>
					<ul className="space-y-1 mb-4">
						{item.children?.map((child) => renderMenuItem(child, depth + 1))}
					</ul>
				</li>
			);
		}

		// Don't render heading when sidebar is collapsed
		// if (item.type === "heading" && !isOpen) {
		// 	return null;
		// }

		// Regular link item
		const content = (
			<>
				<span
					className={`
						text-xl flex-shrink-0
						${isActive ? "drop-shadow-sm" : ""}
						group-hover:scale-110 transition-transform duration-200
					`}
				>
					{item.icon}
				</span>
				<span
					className={`
						text-sm font-medium truncate
						${isOpen ? "opacity-100 max-w-xs" : "opacity-0 max-w-0"}
						transition-all duration-300
						overflow-hidden
						${!isActive && isOpen ? "group-hover:translate-x-1" : ""}
					`}
				>
					{item.name}
				</span>
				{item.badge && isOpen && (
					<span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full ml-auto">
						{item.badge}
					</span>
				)}
			</>
		);

		return (
			<li key={item.id} className="w-full">
				{item.href ? (
					<Link
						href={item.href}
						onClick={() => {
							if (isMobile) setIsOpen(false);
							item.onClick?.();
						}}
						className={`
							flex items-center ${isOpen ? "gap-4 px-4" : "gap-0 px-0"} 
							py-3 w-full rounded-xl
							${isOpen ? "justify-start" : "justify-center"}
							group transition-all duration-200 focus:outline-none
              ${
								isActive
									? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg transform scale-[1.02]"
									: "bg-white/50 backdrop-blur-sm text-green-700 hover:bg-white/80 hover:text-green-600 hover:shadow-md border border-green-200/30"
							}
							${indentClass}
						`}
					>
						{content}
					</Link>
				) : (
					<button
						onClick={() => {
							item.onClick?.();
							if (isMobile) setIsOpen(false);
						}}
						className={`
							flex items-center ${isOpen ? "gap-4 px-4" : "gap-0 px-0"} 
							py-3 w-full rounded-xl
							${isOpen ? "justify-start" : "justify-center"}
							group transition-all duration-200
							focus:outline-none bg-white/50 backdrop-blur-sm text-green-700 hover:bg-white/80 hover:text-green-600 hover:shadow-md border border-green-200/30
							${indentClass}
						`}
					>
						{content}
					</button>
				)}
			</li>
		);
	};

	return (
		<>
			{/* Mobile Overlay */}
			{isMobile && isOpen && (
				<div
					className="fixed inset-0 bg-black/50 z-30 lg:hidden"
					onClick={() => setIsOpen(false)}
				/>
			)}

			<aside
				id="sidebar"
				className={`
					${isOpen ? "w-64" : isMobile ? "w-0" : "w-16"}
					${isMobile && !isOpen ? "overflow-hidden" : ""}
					${isMobile ? "fixed" : "sticky"}
					transition-all duration-300 ease-out
					bg-gradient-to-br from-green-50 via-green-100 to-green-200
					backdrop-blur-sm border-r border-green-200/50
					shadow-xl shadow-green-500/10
					flex flex-col top-0 left-0 h-screen py-4 px-0
					${isOpen ? "items-start px-4" : "items-center md:px-2"}
					z-40
					${className}
				`}
			>
				{/* Logo & App Name */}
				<div
					className={`
						flex items-center gap-3 mb-8 w-full
						${isOpen ? "justify-start" : "justify-center"}
						transition-all duration-300
					`}
				>
					<div
						className={`
							bg-gradient-to-br from-green-500 to-green-600
							rounded-xl ${isOpen ? "p-3" : "p-2"}
							flex items-center shadow-lg
							hover:shadow-xl transition-shadow duration-200
						`}
					>
						<Image
							src={config.logo.src}
							alt={config.logo.alt}
							width={isOpen ? 28 : 24}
							height={isOpen ? 28 : 24}
							className="block"
						/>
					</div>
					<span
						className={`
							font-extrabold text-green-700 text-xl tracking-tight
							${isOpen ? "inline" : "hidden"}
							transition-all duration-300
						`}
					>
						{config.logo.title}
					</span>
				</div>

				{/* Menu Links */}
				<nav className="w-full flex-1 overflow-y-auto overflow-x-hidden scrollbar-hidden">
					<ul className="list-none m-0 p-0.5 space-y-2">
						{config.menuItems.map((item) => renderMenuItem(item))}
					</ul>
				</nav>

				{/* Profile & Logout */}
				{(config.showProfile || config.showLogout) && (
					<div className="w-full mt-auto pt-6">
						{isOpen ? (
							<div
								className={`
									w-full flex items-center justify-between
									bg-white/90 backdrop-blur-sm rounded-xl shadow-lg
									px-4 py-4 border border-green-200/50
									transition-all duration-200
									hover:shadow-xl hover:bg-white
								`}
							>
								{config.showProfile && (
									<Link
										href="/dashboard/profile"
										className="flex items-center gap-3 flex-1 hover:opacity-80 transition-opacity duration-200"
										onClick={() => {
											if (isMobile) setIsOpen(false);
										}}
									>
										{user?.avatar ? (
											<Image
												src={user?.avatar}
												alt="User Avatar"
												width={40}
												height={40}
												className="rounded-full"
											/>
										) : (
											<div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-md">
												<span className="text-white font-bold text-lg">
													{getInitials(user?.name || "User")}
												</span>
											</div>
										)}
										<div className="flex flex-col">
											<span className="text-sm font-semibold text-green-700">
												{user?.name || "User"}
											</span>
											<span className="text-xs text-green-600">{user?.role || "Student"}</span>
										</div>
									</Link>
								)}
								{config.showLogout && (
									<button
										onClick={handleSignOut}
										className={`
											bg-red-50 text-red-500 rounded-xl p-2.5 ${config.showProfile ? "ml-3" : ""}
											shadow-sm border border-red-200/50
											flex items-center justify-center 
											hover:bg-red-100 hover:shadow-md
											transition-all duration-200
											focus:outline-none focus:ring-2 focus:ring-red-400
										`}
										aria-label="Logout"
										title="Logout"
									>
										<MdLogout size={18} />
									</button>
								)}
							</div>
						) : (
							<div className="flex flex-col items-center space-y-4 w-full">
								{config.showProfile && (
									<Link
										href="/dashboard/profile"
										className="hover:opacity-80 transition-opacity duration-200"
										onClick={() => {
											if (isMobile) setIsOpen(false);
										}}
									>
										<div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow duration-200">
											<span className="text-white font-bold text-lg">
												{getInitials(user?.name || "User")}
											</span>
										</div>
									</Link>
								)}
								{config.showLogout && (
									<button
										onClick={handleSignOut}
										className={`
											bg-red-50 text-red-500 rounded-xl p-2.5
											shadow-sm border border-red-200/50
											flex items-center justify-center 
											hover:bg-red-100 hover:shadow-md
											transition-all duration-200
											focus:outline-none focus:ring-2 focus:ring-red-400
										`}
										aria-label="Logout"
										title="Logout"
									>
										<MdLogout size={18} />
									</button>
								)}
							</div>
						)}
					</div>
				)}
			</aside>
		</>
	);
};

export default Sidebar;
export type { SidebarMenuItem, SidebarConfig, SidebarProps };
