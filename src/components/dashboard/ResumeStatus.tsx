'use client';

import type { ComponentType, SVGProps } from 'react';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, FileText, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NoResumeState } from '@/components/empty-states/NoResumeState';
import { cn } from '@/lib/utils';
import { DashboardCard, DashboardCardFooter, DashboardCardSection } from './DashboardCard';
import { fadeInUp } from './motion';

const resumeSteps = [
  {
    id: 'summary',
    label: 'Professional summary',
    status: 'complete',
  },
  {
    id: 'experience',
    label: 'Experience details',
    status: 'in-progress',
  },
  {
    id: 'skills',
    label: 'Skills & tooling',
    status: 'pending',
  },
];

const progressPercentage = 68;

const statusCopy: Record<
  string,
  { label: string; icon: ComponentType<SVGProps<SVGSVGElement>>; tone: string }
> = {
  complete: {
    label: 'Complete',
    icon: CheckCircle2,
    tone: 'text-emerald-600 dark:text-emerald-400',
  },
  'in-progress': {
    label: 'In progress',
    icon: Loader2,
    tone: 'text-amber-600 dark:text-amber-400',
  },
  pending: {
    label: 'Pending',
    icon: FileText,
    tone: 'text-muted-foreground',
  },
};

const ResumeStatus = () => {
  const hasResume = resumeSteps.length > 0;

  return (
    <DashboardCard
      heading="Resume status"
      subheading="Keep your profile ready with the latest achievements."
      variants={fadeInUp}
    >
      {hasResume ? (
        <>
          <DashboardCardSection className="gap-6">
            <div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Completion</span>
                <span className="font-semibold text-foreground">{progressPercentage}%</span>
              </div>
              <div className="mt-2 h-2 rounded-full bg-muted">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="h-full rounded-full bg-emerald-500"
                />
              </div>
            </div>

            <div className="space-y-3 text-sm">
              {resumeSteps.map((step) => {
                const copy = statusCopy[step.status];
                const Icon = copy.icon;
                return (
                  <motion.div
                    key={step.id}
                    whileHover={{ y: -2 }}
                    className="flex items-center justify-between rounded-lg border border-transparent bg-background px-4 py-3 transition-colors duration-200 hover:border-border/60"
                  >
                    <div>
                      <p className="font-medium text-foreground">{step.label}</p>
                      <p className="text-xs text-muted-foreground">{copy.label}</p>
                    </div>
                    <span className={cn('flex items-center gap-2 text-sm font-medium', copy.tone)}>
                      <Icon className="h-4 w-4" />
                      {copy.label}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </DashboardCardSection>
          <DashboardCardFooter>
            <div>
              <p className="text-sm font-medium text-foreground">Next suggested update</p>
              <p className="text-xs text-muted-foreground">
                Add impact metrics to your recent role.
              </p>
            </div>
            <Button asChild size="sm">
              <Link href="/dashboard/resume-builder" className="flex items-center">
                Continue editing
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </DashboardCardFooter>
        </>
      ) : (
        <NoResumeState actionHref="/dashboard/resume-builder" />
      )}
    </DashboardCard>
  );
};

export default ResumeStatus;
