"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MdDashboard,
  MdBusiness,
  MdTrackChanges,
  MdEventNote,
  MdPerson,
  MdLogout,
  MdSearch,
  MdClose,
  MdMenu,
  MdBarChart,
  MdAutoAwesome,
  MdExpandMore,
  MdExpandLess,
} from "react-icons/md";
import { useAuth } from "@/hooks/useAuth";

const links = [
  { name: "Dashboard", icon: MdDashboard, href: "/dashboard" },
  { name: "Practice", icon: MdBarChart, href: "/dashboard/dsa" },
  { name: "Company Questions", icon: MdBusiness, href: "/dashboard/companies" },
  {
    name: "Interview Practice",
    icon: MdTrackChanges,
    href: "/dashboard/practice",
  },
  {
    name: "Schedule Interview",
    icon: MdEventNote,
    href: "/dashboard/interviews",
  },
  {
    name: "AI Features",
    icon: MdAutoAwesome,
    href: "#",
    hasSubmenu: true,
    submenu: [
      { name: "Mentor", icon: MdPerson, href: "/dashboard/Mentor" },
      { name: "Roadmap", icon: MdEventNote, href: "/dashboard/roadmap" },
        { name: "Resume Builder", icon: MdPerson, href: "/dashboard/resume" },
    ],
  },
];

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>(
    {}
  );
  const pathname = usePathname();
  const { user, logout } = useAuth();

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
  }, [isMobile, isOpen]);

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

  const isSubmenuActive = (submenu: any[]) => {
    return submenu.some((item) => isActiveLink(item.href));
  };

  const toggleSubmenu = (menuName: string) => {
    if (!isOpen) return; // Don't toggle if sidebar is collapsed
    setExpandedMenus((prev) => ({
      ...prev,
      [menuName]: !prev[menuName],
    }));
  };

  const getInitials = (name: string) => {
    if (!name || typeof name !== "string") return "U";
    const names = name.trim().split(" ");
    if (names.length > 1) {
      return (
        names[0].charAt(0).toUpperCase() + names[1].charAt(0).toUpperCase()
      );
    }
    return names[0].charAt(0).toUpperCase();
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

      {/* Mobile Toggle Button */}
      {isMobile && (
        <button
          className="fixed top-4 left-4 z-50 lg:hidden bg-white/90 backdrop-blur-sm text-green-600 rounded-lg w-12 h-12 shadow-lg flex items-center justify-center hover:bg-white transition-all duration-200"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
        >
          {isOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
        </button>
      )}

      <aside
        id="sidebar"
        className={`
                    ${isMobile ? "fixed" : "sticky"} 
                    ${isMobile ? "top-0 left-0 h-screen" : "top-0 h-screen"}
                    ${isOpen ? "w-64" : isMobile ? "w-0" : "w-16"}
                    ${isMobile && !isOpen ? "overflow-hidden" : ""}
                    transition-all duration-300 ease-out
                    bg-gradient-to-br from-green-50 via-green-100 to-green-200
                    backdrop-blur-sm border-r border-green-200/50
                    shadow-xl shadow-green-500/10
                    flex flex-col
                    ${isOpen ? "items-start" : "items-center"}
                    ${isOpen ? "px-5 py-6" : "px-2 py-6"}
                    z-40
                    ${className}
                `}
      >
        {/* Desktop Collapse/Expand Button */}
        {!isMobile && (
          <button
            className={`
                            absolute top-6 ${isOpen ? "right-5" : "right-2"}
                            bg-white/90 backdrop-blur-sm text-green-600
                            rounded-lg w-10 h-10 shadow-sm
                            flex items-center justify-center z-20
                            hover:bg-white hover:shadow-lg hover:shadow-green-200/30
                            transition-all duration-200
                            focus:outline-none focus:ring-2 focus:ring-green-400
                        `}
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            {isOpen ? <MdClose size={22} /> : <MdMenu size={22} />}
          </button>
        )}

        {/* Logo & App Name */}
        <div
          className={`
                        flex items-center gap-3
                        ${isOpen ? "mb-8" : "mb-6"} ${
            isMobile ? "mt-16" : "mt-2"
          } w-full
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
              src="/brain.png"
              alt="HireMind Logo"
              width={isOpen ? 28 : 24}
              height={isOpen ? 28 : 24}
              className="block"
            />
          </div>
          <span
            className={`
                            font-extrabold text-green-700 text-xl tracking-tight
                            ${
                              isOpen
                                ? "opacity-100 translate-x-0"
                                : "opacity-0 -translate-x-4"
                            }
                            transition-all duration-300
                        `}
          >
            HireMind
          </span>
        </div>

        {/* Search bar */}
        <div
          className={`
                        ${
                          isOpen
                            ? "w-full mb-8 px-4 py-3"
                            : "w-12 mb-6 px-3 py-3"
                        }
                        flex items-center bg-white/80 backdrop-blur-sm rounded-xl
                        shadow-sm border border-green-200/50
                        transition-all duration-300
                        hover:shadow-md hover:bg-white/90
                    `}
        >
          <MdSearch className="text-xl text-green-600 flex-shrink-0" />
          {isOpen && (
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent border-0 outline-0 w-full text-sm ml-3 text-green-800 placeholder-green-500 focus:placeholder-green-400"
            />
          )}
        </div>

        {/* Menu Links */}
        <nav className="w-full flex-1 overflow-y-auto">
          <ul className="list-none m-0 p-0 space-y-2">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = link.hasSubmenu
                ? isSubmenuActive(link.submenu || [])
                : isActiveLink(link.href);
              const isExpanded = expandedMenus[link.name];

              return (
                <li key={link.name} className="w-full">
                  {link.hasSubmenu ? (
                    <div>
                      <button
                        onClick={() => toggleSubmenu(link.name)}
                        className={`
                                                    flex items-center ${
                                                      isOpen
                                                        ? "gap-4 px-4"
                                                        : "gap-0 px-0"
                                                    } 
                                                    py-3 w-full rounded-xl
                                                    ${
                                                      isOpen
                                                        ? "justify-between"
                                                        : "justify-center"
                                                    }
                                                    group transition-all duration-200
                                                    focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-green-50
                                                    ${
                                                      isActive
                                                        ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg transform scale-[1.02]"
                                                        : "bg-white/50 backdrop-blur-sm text-green-700 hover:bg-white/80 hover:text-green-600 hover:shadow-md border border-green-200/30"
                                                    }
                                                `}
                      >
                        <div className="flex items-center gap-4">
                          <span
                            className={`
                                                            text-xl flex-shrink-0
                                                            ${
                                                              isActive
                                                                ? "drop-shadow-sm"
                                                                : ""
                                                            }
                                                            group-hover:scale-110 transition-transform duration-200
                                                        `}
                          >
                            <Icon size={22} />
                          </span>
                          <span
                            className={`
                                                            text-sm font-medium truncate
                                                            ${
                                                              isOpen
                                                                ? "opacity-100 max-w-xs"
                                                                : "opacity-0 max-w-0"
                                                            }
                                                            transition-all duration-300
                                                            overflow-hidden
                                                            ${
                                                              !isActive &&
                                                              isOpen
                                                                ? "group-hover:translate-x-1"
                                                                : ""
                                                            }
                                                        `}
                          >
                            {link.name}
                          </span>
                        </div>
                        {isOpen && (
                          <span
                            className={`
                                                            transition-transform duration-200
                                                            ${
                                                              isExpanded
                                                                ? "rotate-180"
                                                                : "rotate-0"
                                                            }
                                                        `}
                          >
                            <MdExpandMore size={20} />
                          </span>
                        )}
                      </button>

                      {/* Submenu */}
                      {isOpen && isExpanded && (
                        <ul className="mt-2 ml-4 space-y-1">
                          {link.submenu?.map((subItem) => {
                            const SubIcon = subItem.icon;
                            const isSubActive = isActiveLink(subItem.href);
                            return (
                              <li key={subItem.name}>
                                <Link
                                  href={subItem.href}
                                  onClick={() => isMobile && setIsOpen(false)}
                                  className={`
                                                                        flex items-center gap-3 px-4 py-2.5 w-full rounded-lg
                                                                        group transition-all duration-200
                                                                        focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-green-50
                                                                        ${
                                                                          isSubActive
                                                                            ? "bg-gradient-to-r from-green-400 to-green-500 text-white shadow-md"
                                                                            : "bg-white/30 backdrop-blur-sm text-green-700 hover:bg-white/60 hover:text-green-600 hover:shadow-sm border border-green-200/20"
                                                                        }
                                                                    `}
                                >
                                  <span
                                    className={`
                                                                            text-lg flex-shrink-0
                                                                            ${
                                                                              isSubActive
                                                                                ? "drop-shadow-sm"
                                                                                : ""
                                                                            }
                                                                            group-hover:scale-105 transition-transform duration-200
                                                                        `}
                                  >
                                    <SubIcon size={18} />
                                  </span>
                                  <span className="text-sm font-medium truncate group-hover:translate-x-0.5 transition-transform duration-200">
                                    {subItem.name}
                                  </span>
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={() => isMobile && setIsOpen(false)}
                      className={`
                                                flex items-center ${
                                                  isOpen
                                                    ? "gap-4 px-4"
                                                    : "gap-0 px-0"
                                                } 
                                                py-3 w-full rounded-xl
                                                ${
                                                  isOpen
                                                    ? "justify-start"
                                                    : "justify-center"
                                                }
                                                group transition-all duration-200
                                                focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-green-50
                                                ${
                                                  isActive
                                                    ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg transform scale-[1.02]"
                                                    : "bg-white/50 backdrop-blur-sm text-green-700 hover:bg-white/80 hover:text-green-600 hover:shadow-md border border-green-200/30"
                                                }
                                            `}
                    >
                      <span
                        className={`
                                                    text-xl flex-shrink-0
                                                    ${
                                                      isActive
                                                        ? "drop-shadow-sm"
                                                        : ""
                                                    }
                                                    group-hover:scale-110 transition-transform duration-200
                                                `}
                      >
                        <Icon size={22} />
                      </span>
                      <span
                        className={`
                                                    text-sm font-medium truncate
                                                    ${
                                                      isOpen
                                                        ? "opacity-100 max-w-xs"
                                                        : "opacity-0 max-w-0"
                                                    }
                                                    transition-all duration-300
                                                    overflow-hidden
                                                    ${
                                                      !isActive && isOpen
                                                        ? "group-hover:translate-x-1"
                                                        : ""
                                                    }
                                                `}
                      >
                        {link.name}
                      </span>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Profile & Logout */}
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
              <Link
                href="/dashboard/profile"
                className="flex items-center gap-3 flex-1 hover:opacity-80 transition-opacity duration-200"
                onClick={() => isMobile && setIsOpen(false)}
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
                  <span className="text-xs text-green-600">
                    {user?.role || "Student"}
                  </span>
                </div>
              </Link>
              <button
                onClick={handleSignOut}
                className={`
                                    bg-red-50 text-red-500 rounded-xl p-2.5 ml-3
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
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-4 w-full">
              <Link
                href="/dashboard/profile"
                className="hover:opacity-80 transition-opacity duration-200"
                onClick={() => isMobile && setIsOpen(false)}
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow duration-200">
                  <span className="text-white font-bold text-lg">
                    {getInitials(user?.name || "User")}
                  </span>
                </div>
              </Link>
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
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
