'use client';

import type { ComponentType, SVGProps } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, FileText, Sparkles, Users, ClipboardList } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { DashboardCard, DashboardCardSection } from './DashboardCard';

interface ActionItem {
  title: string;
  description: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

const actionItems: ActionItem[] = [
  {
    title: 'Start Interview',
    description: 'Jump into an AI-powered mock interview session tailored to your goals.',
    href: '/dashboard/interview',
    icon: Sparkles,
  },
  {
    title: 'Build Resume',
    description: 'Update your resume with guided prompts and an instant preview.',
    href: '/dashboard/resume-builder',
    icon: FileText,
  },
];

const secondaryActions: ActionItem[] = [
  {
    title: 'Manage Profile',
    description: 'Update your personal info, preferences, and account settings.',
    href: '/dashboard/profile',
    icon: Users,
  },
  {
    title: 'More Actions',
    description: 'Explore additional tools and features to boost your preparation.',
    href: '/dashboard/quick-actions',
    icon: ClipboardList,
  },
];

const QuickActions = () => (
  <DashboardCard heading="Quick actions" subheading="Focus on what moves you forward today.">
    <DashboardCardSection className="gap-5">
      <div className="grid gap-4 sm:grid-cols-2">
        {actionItems.map((action) => (
          <Link key={action.title} href={action.href} className="group focus:outline-none">
            <motion.div
              whileHover={{ y: -4, scale: 1.01 }}
              className={cn(
                'flex h-full flex-col justify-between rounded-xl border border-slate-200/70 bg-white/80 p-5 shadow-sm transition-all duration-200 group-hover:border-emerald-300 group-hover:shadow-md dark:border-slate-800/70 dark:bg-slate-900/40 dark:group-hover:border-emerald-500/50',
              )}
            >
              <div className="space-y-3">
                <p className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white sm:text-base">
                  <action.icon className="h-5 w-5 text-slate-500 dark:text-slate-400" />
                  {action.title}
                </p>
                <p className="text-sm leading-snug text-slate-600 dark:text-slate-400">
                  {action.description}
                </p>
              </div>
              <div className="mt-6 flex items-center gap-2 text-sm font-medium text-emerald-600 transition-colors duration-200 group-hover:text-emerald-500 dark:text-emerald-400">
                <span>Continue</span>
                <ArrowRight className="h-4 w-4" />
              </div>
            </motion.div>
          </Link>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-slate-100/60 px-4 py-3 dark:bg-slate-800/40">
        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
          <Sparkles className="h-4 w-4 text-emerald-500" />
          <span>Need a refresher first?</span>
        </div>
        <Button asChild variant="outline" size="sm">
          <Link href="/dashboard/resources">Explore resources</Link>
        </Button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {secondaryActions.map((action) => (
          <Link key={action.title} href={action.href} className="group focus:outline-none">
            <motion.div
              whileHover={{ y: -3, scale: 1.005 }}
              className="flex items-center justify-between rounded-lg border border-dashed border-slate-200/70 bg-white px-4 py-3 text-sm transition-all duration-200 group-hover:border-emerald-300 dark:border-slate-800/70 dark:bg-slate-900/30 dark:group-hover:border-emerald-500/50"
            >
              <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                <action.icon className="h-4 w-4" />
                <span>{action.title}</span>
              </div>
              <ArrowRight className="h-4 w-4 text-slate-400 dark:text-slate-500" />
            </motion.div>
          </Link>
        ))}
      </div>
    </DashboardCardSection>
  </DashboardCard>
);

export default QuickActions;
