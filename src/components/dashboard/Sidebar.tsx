'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/providers/AuthProvider';

interface SidebarMenuItem {
  id: string;
  name: string;
  icon: React.ReactElement;
  href?: string;
  type: 'link' | 'heading';
  children?: SidebarMenuItem[];
  badge?: string | number;
  onClick?: () => void;
}

interface SidebarConfig {
  logo: { src: string; alt: string; title: string };
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

export default function Sidebar({ config, isOpen, setIsOpen, className = '' }: SidebarProps) {
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) setIsOpen(false);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setIsOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isMobile && isOpen) {
        const sidebar = document.getElementById('sidebar');
        if (sidebar && !sidebar.contains(e.target as Node)) setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile, isOpen, setIsOpen]);

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  const isActive = (href: string) =>
    href === '/dashboard' ? pathname === '/dashboard' : pathname.startsWith(href);

  const getInitials = (name?: string | null) => {
    if (!name) return 'U';
    const parts = name.split(' ');
    return parts.length > 1 ? parts[0][0] + parts[1][0] : parts[0][0].toUpperCase();
  };

  const renderItem = (item: SidebarMenuItem) => {
    const active = item.href ? isActive(item.href) : false;

    return (
      <li key={item.id} className="w-full px-2">
        {item.href ? (
          <Link
            href={item.href}
            onClick={() => isMobile && setIsOpen(false)}
            className={`group relative flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-all duration-200 ${
              !isOpen ? 'justify-center px-2' : ''
            } ${
              active
                ? 'text-emerald-700 dark:text-emerald-300'
                : 'text-slate-600 hover:text-slate-900 hover:bg-emerald-50 dark:text-slate-400 dark:hover:text-white dark:hover:bg-emerald-500/10'
            }`}
          >
            {active && (
              <motion.span
                layoutId="sidebar-active-indicator"
                className="absolute inset-0 rounded-xl border border-emerald-200/50 bg-emerald-50/80 dark:border-emerald-500/30 dark:bg-emerald-500/10"
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              />
            )}
            <span
              className={`relative z-10 flex h-9 w-9 items-center justify-center rounded-lg transition-colors duration-200 ${
                active
                  ? 'text-emerald-700 dark:text-emerald-300'
                  : 'text-slate-500 group-hover:text-emerald-600 dark:text-slate-400 dark:group-hover:text-emerald-400'
              }`}
            >
              {item.icon}
            </span>
            {isOpen && <span className="relative z-10 truncate">{item.name}</span>}
            {isOpen && item.badge && (
              <span className="relative z-10 ml-auto rounded-full border border-slate-200 bg-white px-2 py-0.5 text-xs text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                {item.badge}
              </span>
            )}
          </Link>
        ) : (
          <button
            onClick={() => {
              item.onClick?.();
              if (isMobile) setIsOpen(false);
            }}
            className={`group relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white ${
              !isOpen ? 'justify-center px-2' : ''
            }`}
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-500 transition-colors group-hover:bg-emerald-50 group-hover:text-emerald-600 dark:bg-slate-800/50 dark:text-slate-400 dark:group-hover:bg-emerald-500/10 dark:group-hover:text-emerald-400">
              {item.icon}
            </span>
            {isOpen && <span className="truncate">{item.name}</span>}
          </button>
        )}
      </li>
    );
  };

  return (
    <>
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        id="sidebar"
        className={`
          ${isOpen ? 'w-60' : isMobile ? 'w-0 overflow-hidden' : 'w-18'}
          ${isMobile ? 'fixed' : 'sticky'}
          top-0 left-0 z-40 flex h-screen flex-col border-r border-slate-200/60 bg-white/95 backdrop-blur-md shadow-sm transition-all duration-200 dark:border-slate-800/60 dark:bg-slate-950/95
          ${className}
        `}
      >
        {/* Logo */}
        <div
          className={`flex h-16 items-center gap-3 border-b border-slate-200/60 px-4 dark:border-slate-800/60 ${
            !isOpen && 'justify-center'
          }`}
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl shadow-sm">
            <Image src={config.logo.src} alt={config.logo.alt} width={22} height={22} />
          </div>
          {isOpen && (
            <span className="text-lg font-semibold text-slate-900 dark:text-white">
              {config.logo.title}
            </span>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1">{config.menuItems.map(renderItem)}</ul>
        </nav>

        {/* Footer */}
        {(config.showProfile || config.showLogout) && (
          <div
            className={`border-t border-slate-200/60 p-3 dark:border-slate-800/60 ${
              !isOpen && 'flex flex-col items-center gap-2'
            }`}
          >
            {config.showProfile && isOpen && (
              <Link
                href="/dashboard/profile"
                onClick={() => isMobile && setIsOpen(false)}
                className="mb-2 flex items-center gap-3 rounded-xl px-2 py-2 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-sm font-semibold text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300 overflow-hidden">
                  {user?.image ? (
                    <Image
                      src={user.image}
                      alt={user.name || 'User'}
                      width={36}
                      height={36}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    getInitials(user?.name)
                  )}
                </div>
                <div className="flex-1 truncate">
                  <p className="truncate font-semibold text-slate-900 dark:text-white">
                    {user?.name ?? 'User'}
                  </p>
                </div>
              </Link>
            )}

            {config.showProfile && !isOpen && (
              <Link href="/dashboard/profile" onClick={() => isMobile && setIsOpen(false)}>
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-sm font-semibold text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300 overflow-hidden">
                  {user?.image ? (
                    <Image
                      src={user.image}
                      alt={user.name || 'User'}
                      width={36}
                      height={36}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    getInitials(user?.name)
                  )}
                </div>
              </Link>
            )}

            {config.showLogout && (
              <button
                onClick={handleSignOut}
                className={`w-full gap-3 px-3 py-3 flex items-center rounded-xl text-sm font-medium text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30 ${
                  isOpen ? '' : 'justify-center'
                }`}
              >
                <LogOut className="h-4 w-4" />
                {isOpen && <span>Sign out</span>}
              </button>
            )}
          </div>
        )}
      </aside>
    </>
  );
}

export type { SidebarMenuItem, SidebarConfig, SidebarProps };
