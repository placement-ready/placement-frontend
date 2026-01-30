'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/providers/AuthProvider';
import { Camera, Mail, User as UserIcon, Calendar, Shield } from 'lucide-react';
import Image from 'next/image';

export default function ProfilePage() {
  const { user, isLoading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });

  const handleSave = async () => {
    // TODO: Wire up API call to update profile
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-emerald-500 dark:border-slate-800 dark:border-t-emerald-400" />
      </div>
    );
  }

  const joinedDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
    : 'Recently';

  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-8">
      <header className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="flex items-start gap-4">
            <div className="relative">
              {user?.image ? (
                <Image
                  src={user.image}
                  alt={user.name || 'User'}
                  width={80}
                  height={80}
                  className="rounded-full border-2 border-slate-200 dark:border-slate-700"
                />
              ) : (
                <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-slate-200 bg-linear-to-br from-emerald-400 to-emerald-600 text-white dark:border-slate-700">
                  <span className="text-2xl font-semibold">
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </span>
                </div>
              )}
              <button className="absolute -bottom-1 -right-1 rounded-full bg-white p-2 shadow-lg ring-2 ring-slate-200 transition-colors hover:bg-slate-50 dark:bg-slate-800 dark:ring-slate-700 dark:hover:bg-slate-700">
                <Camera className="h-3.5 w-3.5 text-slate-600 dark:text-slate-400" />
              </button>
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">
                {user?.name || 'User'}
              </h1>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                {user?.email || 'No email'}
              </p>
              <div className="mt-2 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-500">
                <Calendar className="h-3.5 w-3.5" />
                <span>Joined {joinedDate}</span>
              </div>
            </div>
          </div>
          <Button
            onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
            className="self-start"
          >
            {isEditing ? 'Save changes' : 'Edit profile'}
          </Button>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Personal Information */}
        <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
              <UserIcon className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Personal Information
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">Your account details</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <Label
                htmlFor="name"
                className="text-xs font-medium uppercase tracking-wider text-slate-600 dark:text-slate-400"
              >
                Full name
              </Label>
              <Input
                id="name"
                value={isEditing ? formData.name : user?.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                disabled={!isEditing}
                className="mt-2 border-slate-200 bg-slate-50 text-slate-900 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
            <div>
              <Label
                htmlFor="profileEmail"
                className="text-xs font-medium uppercase tracking-wider text-slate-600 dark:text-slate-400"
              >
                Email address
              </Label>
              <Input
                id="profileEmail"
                type="email"
                value={isEditing ? formData.email : user?.email || ''}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={!isEditing}
                className="mt-2 border-slate-200 bg-slate-50 text-slate-900 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
          </div>
        </section>

        {/* Account Status */}
        <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Account Status
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">Membership and security</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-800/40">
              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-white">Email verified</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  {user?.emailVerified ? 'Verified on signup' : 'Pending verification'}
                </p>
              </div>
              <div
                className={`h-2.5 w-2.5 rounded-full ${
                  user?.emailVerified
                    ? 'bg-emerald-500 dark:bg-emerald-400'
                    : 'bg-amber-500 dark:bg-amber-400'
                }`}
              />
            </div>
            <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-800/40">
              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-white">Account type</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">Free plan</p>
              </div>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400">
                Active
              </span>
            </div>
          </div>
        </section>

        {/* Email Preferences */}
        <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/50 lg:col-span-2">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Communication
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Manage email preferences in Settings
              </p>
            </div>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/40">
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Configure how you receive updates, reminders, and notifications from Hiremind.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => (window.location.href = '/dashboard/settings')}
              className="mt-3 border-slate-300 text-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700"
            >
              Go to Settings
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
