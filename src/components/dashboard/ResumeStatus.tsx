'use client';

import type { ComponentType, SVGProps } from 'react';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, FileText, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NoResumeState } from '@/components/empty-states/NoResumeState';
import { cn } from '@/lib/utils';
import { DashboardCard, DashboardCardFooter, DashboardCardSection } from './DashboardCard';
import { fadeInUp } from './motion';
import { api } from '@/lib/api';
import { useAuth } from '@/providers/AuthProvider';

// Section definitions matching the backend/provider
const REQUIRED_SECTIONS = ['personalInfo', 'summary', 'experience', 'education', 'skills'] as const;

const SECTION_LABELS: Record<string, string> = {
  personalInfo: 'Personal Information',
  summary: 'Professional Summary',
  experience: 'Work Experience',
  education: 'Education',
  skills: 'Skills',
};

interface Resume {
  id: string;
  sessionId: string;
  title: string;
  status: string;
  progress: number;
  completedSections?: string[];
  currentSection?: string;
  createdAt: string;
  updatedAt: string;
}

interface ResumeResponse {
  success: boolean;
  resumes: Resume[];
}

interface ResumeStep {
  id: string;
  label: string;
  status: 'complete' | 'in-progress' | 'pending';
}

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
    tone: 'text-slate-500 dark:text-slate-400',
  },
};

const ResumeStatus = () => {
  const { user } = useAuth();
  const [resume, setResume] = useState<Resume | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [resumeSteps, setResumeSteps] = useState<ResumeStep[]>([]);
  const [progressPercentage, setProgressPercentage] = useState(0);

  const fetchRecentResume = useCallback(async () => {
    if (!user?.id) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await api.get<ResumeResponse>('/resume/recent?limit=1');
      if (response.success && response.resumes?.length > 0) {
        const latestResume = response.resumes[0];
        setResume(latestResume);

        // Calculate steps and progress from completed sections
        const completedSections = latestResume.completedSections || [];
        const currentSection = latestResume.currentSection || 'personalInfo';

        const steps: ResumeStep[] = REQUIRED_SECTIONS.map((section) => {
          let status: 'complete' | 'in-progress' | 'pending' = 'pending';
          if (completedSections.includes(section)) {
            status = 'complete';
          } else if (section === currentSection) {
            status = 'in-progress';
          }
          return {
            id: section,
            label: SECTION_LABELS[section],
            status,
          };
        });

        setResumeSteps(steps);

        // Use the progress from API or calculate from completed sections
        const progress =
          latestResume.progress ||
          Math.round((completedSections.length / REQUIRED_SECTIONS.length) * 100);
        setProgressPercentage(progress);
      }
    } catch {
      // Silently fail - just show empty state
    } finally {
      setIsLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    fetchRecentResume();
  }, [fetchRecentResume]);

  // Loading state
  if (isLoading) {
    return (
      <DashboardCard
        heading="Resume status"
        subheading="Keep your profile ready with the latest achievements."
        variants={fadeInUp}
      >
        <DashboardCardSection className="gap-6">
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-emerald-500" />
          </div>
        </DashboardCardSection>
      </DashboardCard>
    );
  }

  const hasResume = resume !== null && resumeSteps.length > 0;

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
                <span className="text-slate-600 dark:text-slate-400">Completion</span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  {progressPercentage}%
                </span>
              </div>
              <div className="mt-2 h-2 rounded-full bg-slate-200 dark:bg-slate-700">
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
                    className="flex items-center justify-between rounded-lg border border-transparent bg-slate-50 px-4 py-3 transition-all duration-200 hover:border-slate-200 hover:bg-white hover:shadow-sm dark:bg-slate-800/30 dark:hover:border-slate-700 dark:hover:bg-slate-800/50"
                  >
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">{step.label}</p>
                      <p className="text-xs text-slate-600 dark:text-slate-400">{copy.label}</p>
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
          <DashboardCardFooter className="px-0 pb-0">
            <Button asChild size="sm">
              <Link
                href={`/dashboard/resume-builder/chat?resumeId=${resume.sessionId}`}
                className="flex items-center"
              >
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
