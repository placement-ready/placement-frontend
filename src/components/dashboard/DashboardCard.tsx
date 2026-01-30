'use client';

import { motion } from 'framer-motion';
import React from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { cardHover, cardVariants, defaultTransition } from './motion';

const MotionCard = motion.create(Card);

interface DashboardCardProps extends Omit<React.ComponentProps<typeof MotionCard>, 'children'> {
  children: React.ReactNode;
  heading?: string;
  subheading?: string;
  action?: React.ReactNode;
}

const baseCardClasses =
  'border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/50';

export function DashboardCard({
  heading,
  subheading,
  action,
  className,
  children,
  variants,
  whileHover,
  transition,
  ...motionProps
}: DashboardCardProps) {
  return (
    <MotionCard
      variants={variants ?? cardVariants}
      whileHover={whileHover ?? cardHover}
      transition={transition ?? defaultTransition}
      className={cn(baseCardClasses, className)}
      {...motionProps}
    >
      {(heading || subheading || action) && (
        <div className="flex items-start justify-between gap-4 border-b border-slate-200/60 px-6 py-5 dark:border-slate-800/60">
          <div className="space-y-1">
            {heading ? (
              <h2 className="text-base font-semibold text-slate-900 dark:text-white sm:text-lg">
                {heading}
              </h2>
            ) : null}
            {subheading ? (
              <p className="text-sm text-slate-600 dark:text-slate-400">{subheading}</p>
            ) : null}
          </div>
          {action ? <div className="shrink-0">{action}</div> : null}
        </div>
      )}
      <div className="px-6 py-5">{children}</div>
    </MotionCard>
  );
}

type DashboardCardSectionProps = React.HTMLAttributes<HTMLDivElement>;

export function DashboardCardSection({ className, ...props }: DashboardCardSectionProps) {
  return <div className={cn('flex flex-col gap-4', className)} {...props} />;
}

export function DashboardCardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex items-center justify-between gap-4 border-t border-slate-200/60 px-6 py-4 dark:border-slate-800/60',
        className,
      )}
      {...props}
    />
  );
}
