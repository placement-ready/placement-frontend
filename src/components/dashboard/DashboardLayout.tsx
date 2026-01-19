'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Bell, Settings, LogOut, User, Menu, X, ChevronDown } from 'lucide-react';
import Sidebar from './Sidebar';
import menuItems from './MenuItems';
import { useAuth } from '@/providers/AuthProvider';
import ThemeToggle from '../ui/themeToggle';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { user, isAuthenticated, isLoading, signOut } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Only redirect after auth loading is complete
    if (!isLoading && !isAuthenticated) {
      router.replace('/');
    }
  }, [isAuthenticated, isLoading, router]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!(e.target as Element).closest('.profile-dropdown')) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleLogout = async () => {
    await signOut();
    router.push('/');
  };

  const getInitials = (name?: string | null) => {
    if (!name) return 'U';
    const parts = name.split(' ');
    return parts.length > 1 ? parts[0][0] + parts[1][0] : parts[0][0].toUpperCase();
  };

  const getPageTitle = () => {
    const segments = pathname.split('/').filter(Boolean);
    const current = segments[segments.length - 1] || 'dashboard';
    return current.charAt(0).toUpperCase() + current.slice(1).replace(/-/g, ' ');
  };

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-1 items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render dashboard if not authenticated (will redirect)
  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <Sidebar config={menuItems} isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <div className="flex min-h-screen flex-1 flex-col">
        {/* Header */}
        <header className="sticky top-0 z-30 border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
          <div className="flex h-16 items-center justify-between gap-4 px-4 lg:px-6">
            {/* Left: Toggle & Title */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsSidebarOpen((prev) => !prev)}
                className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="Toggle sidebar"
              >
                {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>

              <div className="hidden sm:block">
                <h1 className="text-base font-semibold text-foreground">{getPageTitle()}</h1>
                {user?.name && (
                  <p className="text-xs text-muted-foreground">
                    Welcome back, {user.name.split(' ')[0]}
                  </p>
                )}
              </div>
            </div>

            {/* Right: Profile */}
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Link
                href="/dashboard/notifications"
                className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <Bell className="h-5 w-5" />
              </Link>

              {/* Profile Dropdown */}
              <div className="profile-dropdown relative">
                <button
                  onClick={() => setShowProfileMenu((prev) => !prev)}
                  className="flex items-center gap-2 rounded-lg p-1.5 transition-colors hover:bg-muted"
                >
                  {user?.image ? (
                    <Image
                      src={user.image}
                      alt="Avatar"
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-sm font-medium text-white">
                      {getInitials(user?.name)}
                    </div>
                  )}
                  <ChevronDown className="hidden h-4 w-4 text-muted-foreground sm:block" />
                </button>

                {showProfileMenu && (
                  <div className="absolute right-0 top-full z-50 mt-2 w-48 rounded-lg border border-border bg-popover py-1 shadow-lg">
                    <div className="border-b border-border px-3 py-2">
                      <p className="text-sm font-medium text-foreground">{user?.name ?? 'User'}</p>
                      <p className="truncate text-xs text-muted-foreground">{user?.email}</p>
                    </div>

                    <Link
                      href="/dashboard/profile"
                      onClick={() => setShowProfileMenu(false)}
                      className="flex items-center gap-2 px-3 py-2 text-sm text-foreground transition-colors hover:bg-muted"
                    >
                      <User className="h-4 w-4" /> Profile
                    </Link>
                    <Link
                      href="/dashboard/settings"
                      onClick={() => setShowProfileMenu(false)}
                      className="flex items-center gap-2 px-3 py-2 text-sm text-foreground transition-colors hover:bg-muted"
                    >
                      <Settings className="h-4 w-4" /> Settings
                    </Link>

                    <hr className="my-1 border-border" />

                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 px-3 py-2 text-sm text-destructive transition-colors hover:bg-destructive/10"
                    >
                      <LogOut className="h-4 w-4" /> Sign out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 bg-slate-50/80 px-2 py-6 dark:bg-slate-950/40 lg:px-4">
          {children}
        </main>
      </div>
    </>
  );
}
