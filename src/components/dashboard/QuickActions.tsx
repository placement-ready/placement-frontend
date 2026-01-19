'use client';

import type { ComponentType, SVGProps } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, FileText, LayoutDashboard, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { DashboardCard, DashboardCardSection } from './DashboardCard';

interface ActionItem {
  title: string;
  description: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  accent?: 'primary' | 'neutral';
}

const actionItems: ActionItem[] = [
  {
    title: 'Start Interview',
    description: 'Jump into an AI-powered mock interview session tailored to your goals.',
    href: '/dashboard/interview',
    icon: Sparkles,
    accent: 'primary',
  },
  {
    title: 'Build Resume',
    description: 'Update your resume with guided prompts and an instant preview.',
    href: '/dashboard/resume',
    icon: FileText,
  },
];

const secondaryActions: ActionItem[] = [
  {
    title: 'View Analytics',
    description: 'Track recent interview performance and spot areas to refine.',
    href: '/dashboard/analytics',
    icon: LayoutDashboard,
  },
];

const iconStyles: Record<NonNullable<ActionItem['accent']>, string> = {
  primary: 'text-emerald-600 dark:text-emerald-400',
  neutral: 'text-muted-foreground',
};

const QuickActions = () => (
  <DashboardCard heading="Quick actions" subheading="Focus on what moves you forward today.">
    <DashboardCardSection className="gap-5">
      <div className="grid gap-4 sm:grid-cols-2">
        {actionItems.map((action) => (
          <Link key={action.title} href={action.href} className="group focus:outline-none">
            <motion.div
              whileHover={{ y: -4, scale: 1.01 }}
              className={cn(
                'flex h-full flex-col justify-between rounded-xl border border-border/70 bg-muted/40 p-5 transition-colors duration-200 group-hover:border-emerald-200 dark:group-hover:border-emerald-700',
              )}
            >
              <div className="flex items-start gap-3">
                <span
                  className={cn(
                    'inline-flex h-10 w-10 items-center justify-center rounded-lg bg-background text-muted-foreground shadow-sm',
                    action.accent === 'primary' ? iconStyles.primary : iconStyles.neutral,
                  )}
                >
                  <action.icon className="h-5 w-5" />
                </span>
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-foreground sm:text-base">
                    {action.title}
                  </p>
                  <p className="text-sm text-muted-foreground leading-snug">{action.description}</p>
                </div>
              </div>
              <div className="mt-6 flex items-center gap-2 text-sm font-medium text-emerald-600 transition-colors duration-200 group-hover:text-emerald-500 dark:text-emerald-400">
                <span>Continue</span>
                <ArrowRight className="h-4 w-4" />
              </div>
            </motion.div>
          </Link>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-muted/30 px-4 py-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Sparkles className="h-4 w-4 text-emerald-500" />
          <span>Need a refresher first?</span>
        </div>
        <Button asChild variant="outline" size="sm">
          <Link href="/dashboard/resources">Explore guidance</Link>
        </Button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {secondaryActions.map((action) => (
          <Link key={action.title} href={action.href} className="group focus:outline-none">
            <motion.div
              whileHover={{ y: -3, scale: 1.005 }}
              className="flex items-center justify-between rounded-lg border border-dashed border-border/70 bg-background px-4 py-3 text-sm transition-all duration-200 group-hover:border-emerald-200 dark:group-hover:border-emerald-700"
            >
              <div className="flex items-center gap-3 text-muted-foreground">
                <action.icon className="h-4 w-4" />
                <span>{action.title}</span>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </motion.div>
          </Link>
        ))}
      </div>
    </DashboardCardSection>
  </DashboardCard>
);

export default QuickActions;
