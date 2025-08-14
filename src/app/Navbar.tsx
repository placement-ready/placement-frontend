"use client";

import { useState } from "react";
import Image from "next/image";
import {
  SunIcon,
  BellIcon,
  ClockIcon,
  ChartBarIcon,
  BookOpenIcon,
  HomeIcon,
  BoltIcon,
  BriefcaseIcon,
  UserCircleIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const Navbar = () => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo + Brand */}
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-tr from-emerald-400 to-green-400 rounded-xl p-2">
              <Image
                src="/brain.png"
                alt="Brain Logo"
                width={28}
                height={28}
                className="object-contain"
              />
            </div>
            <span className="text-2xl font-semibold text-green-600">
              Hire<span className="text-emerald-600">Mind</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-7">
            <a
              href="#"
              className="flex items-center gap-1 text-gray-700 hover:text-green-600"
            >
              <HomeIcon className="h-5 w-5" /> Learning App
            </a>
            <a
              href="#"
              className="flex items-center gap-1 text-gray-700 hover:text-green-600"
            >
              <ChartBarIcon className="h-5 w-5" /> Practice
            </a>
            <a
              href="#"
              className="flex items-center gap-1 text-gray-700 hover:text-green-600"
            >
              <BookOpenIcon className="h-5 w-5" /> Study Plan
            </a>
            <div className="relative group">
              <button className="flex items-center gap-1 text-gray-700 hover:text-green-600">
                <BoltIcon className="h-5 w-5" /> AI Tools
                <ChevronDownIcon className="h-4 w-4" />
              </button>
            </div>
            <div className="relative group">
              <button className="flex items-center gap-1 text-gray-700 hover:text-green-600">
                <BriefcaseIcon className="h-5 w-5" /> Job Tools
                <ChevronDownIcon className="h-4 w-4" />
              </button>
            </div>
            <a
              href="#"
              className="flex items-center gap-1 text-gray-700 hover:text-green-600"
            >
              <ClockIcon className="h-5 w-5" /> History
            </a>
          </div>

          {/* Right Side icons */}
          <div className="hidden md:flex items-center space-x-3">
            <button className="p-2 hover:bg-gray-100 rounded-md">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-md">
              <BellIcon className="h-5 w-5 text-gray-500" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-md">
              <SunIcon className="h-5 w-5 text-green-500" />
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                className="flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-tr from-emerald-400 to-green-400 text-white"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
              >
                <UserCircleIcon className="h-6 w-6" />
                User
                <ChevronDownIcon className="h-4 w-4" />
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 shadow-lg bg-white rounded">
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6 text-gray-700" />
              ) : (
                <Bars3Icon className="h-6 w-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-sm">
          <div className="px-4 py-3 space-y-3">
            <a
              href="#"
              className="flex items-center gap-2 text-gray-700 hover:text-green-600"
            >
              <HomeIcon className="h-5 w-5" /> Learning App
            </a>
            <a
              href="#"
              className="flex items-center gap-2 text-gray-700 hover:text-green-600"
            >
              <ChartBarIcon className="h-5 w-5" /> Practice
            </a>
            <a
              href="#"
              className="flex items-center gap-2 text-gray-700 hover:text-green-600"
            >
              <BookOpenIcon className="h-5 w-5" /> Study Plan
            </a>
            <a
              href="#"
              className="flex items-center gap-2 text-gray-700 hover:text-green-600"
            >
              <BoltIcon className="h-5 w-5" /> AI Tools
            </a>
            <a
              href="#"
              className="flex items-center gap-2 text-gray-700 hover:text-green-600"
            >
              <BriefcaseIcon className="h-5 w-5" /> Job Tools
            </a>
            <a
              href="#"
              className="flex items-center gap-2 text-gray-700 hover:text-green-600"
            >
              <ClockIcon className="h-5 w-5" /> History
            </a>

            {/* Mobile User Actions */}
            <div className="flex gap-3 mt-4">
              <button className="p-2 hover:bg-gray-100 rounded-md">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-md">
                <BellIcon className="h-5 w-5 text-gray-500" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-md">
                <SunIcon className="h-5 w-5 text-green-500" />
              </button>
            </div>
            <div className="mt-3">
              <a
                href="#"
                className="block px-4 py-2 rounded-full bg-gradient-to-tr from-emerald-400 to-green-400 text-white text-center"
              >
                User Profile
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
