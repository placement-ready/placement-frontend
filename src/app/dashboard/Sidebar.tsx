'use client';

import React, { useState } from 'react';
import {
  MdDashboard,
  MdBusiness,
  MdTrackChanges,
  MdEventNote,
  MdStarBorder,
  MdPerson,
  MdLogout,
  MdSearch,
  MdClose,
  MdMenu
} from 'react-icons/md';

const links = [
  { name: 'Dashboard', icon: MdDashboard },
  { name: 'Company Questions', icon: MdBusiness },
  { name: 'Interview Practice', icon: MdTrackChanges },
  { name: 'Schedule Interview', icon: MdEventNote },
  { name: 'Reviews', icon: MdStarBorder },
  { name: 'Profile', icon: MdPerson }
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeLink, setActiveLink] = useState('Dashboard');

  const handleLogout = () => {
    window.location.href = '/';
  };

  return (
    <div className="flex min-h-screen bg-green-50 font-sans">
      {/* Sidebar */}
      <aside
        className={`
          ${isOpen ? 'w-64' : 'w-16'}
          transition-all duration-500 ease-out
          bg-gradient-to-br from-green-100 to-green-200
          rounded-2xl shadow-lg shadow-green-500/10
          flex flex-col ${isOpen ? 'items-start' : 'items-center'}
          ${isOpen ? 'px-5 py-10' : 'px-2 py-10'}
          overflow-hidden relative
        `}
      >
        {/* Collapse/Expand Button */}
        <button
          className={`
            absolute top-6 ${isOpen ? 'right-5' : 'right-2'}
            bg-white/80 text-green-600
            rounded-lg w-10 h-10 shadow-sm cursor-pointer
            flex items-center justify-center z-20
            hover:bg-white hover:shadow-lg hover:shadow-green-200/30
            transition-all duration-200
          `}
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          {isOpen
            ? <MdClose size={22} />
            : <MdMenu size={22} />
          }
        </button>

        {/* Logo & App Name */}
        <div className={`
          flex items-center gap-3
          ${isOpen ? 'mb-8' : 'mb-3'} mt-1 w-full
          ${isOpen ? 'justify-start' : 'justify-center'}
          ${isOpen ? 'opacity-100' : 'opacity-90'}
          transition-all duration-400
        `}>
          <div className={`
            bg-gradient-to-br from-green-500 to-green-600
            rounded-xl ${isOpen ? 'p-3' : 'p-2'}
            flex items-center shadow-md
          `}>
            <img
              src="/brain.png"
              alt="HireMind Logo"
              width={isOpen ? 27 : 22}
              height={isOpen ? 27 : 22}
              className="block"
            />
          </div>
          <span className={`
            font-extrabold text-green-600 text-xl tracking-tight pl-1
            ${isOpen ? 'opacity-100' : 'opacity-0'}
            transition-opacity duration-300
          `}>
            HireMind
          </span>
        </div>

        {/* Search bar */}
        <div className={`
          ${isOpen ? 'w-11/12 mb-7 px-4 py-2' : 'w-11 mb-4 px-2 py-2'}
          flex items-center bg-white/70 rounded-xl
          shadow-sm transition-all duration-300
        `}>
          <MdSearch className="text-2xl text-green-600" />
          {isOpen && (
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent border-0 outline-0 w-full text-base ml-2 text-green-800 placeholder-green-500"
            />
          )}
        </div>

        {/* Menu Links */}
        <nav className="w-full flex-1">
          <ul className="list-none m-0 p-0">
            {links.map(link => {
              const Icon = link.icon;
              const isActive = activeLink === link.name;
              return (
                <li
                  key={link.name}
                  onClick={() => setActiveLink(link.name)}
                  className={`
                    ${isOpen ? 'my-3' : 'my-2'} w-full rounded-lg
                    cursor-pointer flex items-center ${isOpen ? 'gap-4' : 'gap-0'} h-12
                    ${isOpen ? 'justify-start' : 'justify-center'}
                    group transition-all duration-200
                    ${isActive
                      ? 'bg-gradient-to-r from-green-200 to-green-300 text-green-700 shadow-md font-bold'
                      : 'bg-transparent text-green-700 font-medium hover:bg-green-100 hover:text-green-600'
                    }
                  `}
                >
                  <span className={`
                    text-2xl ${isOpen ? 'ml-1' : 'ml-0.5'}
                    ${isActive ? 'drop-shadow-md' : ''}
                  `}>
                    <Icon size={25} />
                  </span>
                  <span className={`
                    text-base truncate
                    ${isOpen ? 'opacity-100 max-w-xs' : 'opacity-0 max-w-0'}
                    transition-all duration-300
                    overflow-hidden
                    ${!isActive ? 'group-hover:translate-x-2 group-hover:opacity-70' : ''}
                    ${!isActive ? 'transform' : ''}
                  `}>
                    {link.name}
                  </span>
                  {/* REMOVED the green vertical bar here */}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* --- Profile & Logout --- */}
        {isOpen ? (
          <div className={`
            w-full flex items-center justify-between
            mt-8
            bg-white/80 rounded-xl shadow-lg
            px-4 py-3 transition-all duration-200
          `}>
            {/* Avatar only */}
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-2xl drop-shadow-lg">V</span>
            </div>
            {/* Logout button */}
            <button
              onClick={handleLogout}
              className={`
                bg-red-100 text-red-500 rounded-full p-3 ml-2 shadow flex items-center justify-center hover:bg-red-200
                transition-all duration-200
              `}
              aria-label="Logout"
              title="Logout"
            >
              <MdLogout size={22} />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center mt-4 mb-2 space-y-4 w-full">
            {/* Avatar */}
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-2xl drop-shadow-lg">V</span>
            </div>
            {/* Logout icon button below */}
            <button
              onClick={handleLogout}
              className={`
                bg-red-100 text-red-500 rounded-full p-3 shadow flex items-center justify-center hover:bg-red-200
                transition-all duration-200
              `}
              aria-label="Logout"
              title="Logout"
            >
              <MdLogout size={22} />
            </button>
          </div>
        )}
      </aside>

      {/* Main content area (placeholder) */}
      <div className="flex-1 p-10 bg-green-50">
        {/* Content goes here */}
      </div>
    </div>
  );
};

export default Sidebar;
