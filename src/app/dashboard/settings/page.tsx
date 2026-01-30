'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/providers/AuthProvider';
import { Bell, Shield, User } from 'lucide-react';

const notificationPresets = [
  { id: 'updates', label: 'Product updates', helper: 'New features and improvements' },
  { id: 'reminders', label: 'Interview reminders', helper: 'Session notifications' },
] as const;

export default function SettingsPage() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState({
    updates: true,
    reminders: true,
  });
  const [isSaving, setIsSaving] = useState(false);

  const toggleNotification = (field: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    // TODO: Wire up API call to save preferences
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-8">
      <header className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Settings</h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Manage your account preferences and notifications
            </p>
          </div>
          <Button onClick={handleSave} disabled={isSaving} className="self-start">
            {isSaving ? 'Saving...' : 'Save changes'}
          </Button>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Profile Section */}
        <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
              <User className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Profile</h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">Your account information</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <Label
                htmlFor="fullName"
                className="text-xs font-medium uppercase tracking-wider text-slate-600 dark:text-slate-400"
              >
                Full name
              </Label>
              <Input
                id="fullName"
                value={user?.name || ''}
                disabled
                className="mt-2 border-slate-200 bg-slate-50 text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
            <div>
              <Label
                htmlFor="email"
                className="text-xs font-medium uppercase tracking-wider text-slate-600 dark:text-slate-400"
              >
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={user?.email || ''}
                disabled
                className="mt-2 border-slate-200 bg-slate-50 text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-500">
              Profile information is managed through your account settings
            </p>
          </div>
        </section>

        {/* Notifications Section */}
        <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
              <Bell className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Notifications
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Choose what you want to receive
              </p>
            </div>
          </div>
          <div className="space-y-3">
            {notificationPresets.map((pref) => (
              <label
                key={pref.id}
                className="flex cursor-pointer items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm transition-colors hover:bg-white dark:border-slate-700 dark:bg-slate-800/40 dark:hover:bg-slate-800/60"
              >
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">{pref.label}</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">{pref.helper}</p>
                </div>
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={notifications[pref.id]}
                    onChange={() => toggleNotification(pref.id)}
                    className="peer h-5 w-10 cursor-pointer appearance-none rounded-full border-2 border-slate-300 bg-slate-200 transition-colors checked:border-emerald-500 checked:bg-emerald-500 dark:border-slate-600 dark:bg-slate-700"
                  />
                  <span className="pointer-events-none absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white transition-transform peer-checked:translate-x-5 dark:bg-slate-200" />
                </div>
              </label>
            ))}
          </div>
        </section>

        {/* Privacy Section */}
        <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/50 lg:col-span-2">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Data & Privacy
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Manage your data and account
              </p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/40">
              <p className="font-medium text-slate-900 dark:text-white">Export your data</p>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                Download your interview history and transcripts
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-3 border-slate-300 text-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700"
              >
                Export data
              </Button>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/40">
              <p className="font-medium text-slate-900 dark:text-white">Account actions</p>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                Deactivate or delete your account
              </p>
              <Button
                variant="ghost"
                size="sm"
                className="mt-3 text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-950/30"
              >
                Manage account
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
