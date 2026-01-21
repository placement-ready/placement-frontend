'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, BadgeCheck, Mic2, Loader2 } from 'lucide-react';
import { NoInterviewsState } from '@/components/empty-states/NoInterviewsState';
import { DashboardCard } from './DashboardCard';
import { staggerContainer, subtleListItem } from './motion';
import { api } from '@/lib/api';

interface InterviewItem {
  _id: string;
  sessionId: string;
  title: string;
  type: 'behavioral' | 'technical' | 'case-study';
  status: 'pending' | 'in-progress' | 'completed' | 'evaluated' | 'pending-evaluation';
  score?: number;
  completedAt?: string;
  createdAt: string;
}

const statusStyles: Record<string, string> = {
  completed: 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  evaluated: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
  'pending-evaluation': 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
  'in-progress': 'bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  pending: 'bg-slate-50 text-slate-700 dark:bg-slate-900/30 dark:text-slate-300',
};

const statusLabels: Record<string, string> = {
  completed: 'Completed',
  evaluated: 'Evaluated',
  'pending-evaluation': 'Awaiting AI',
  'in-progress': 'In Progress',
  pending: 'Scheduled',
};

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

const RecentInterviews = () => {
  const [interviews, setInterviews] = useState<InterviewItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadInterviews() {
      try {
        const response = await api.get<{ success: boolean; interviews: InterviewItem[] }>(
          '/interviews?limit=5',
        );
        setInterviews(response.interviews || []);
      } catch (error) {
        console.error('Failed to load interviews:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadInterviews();
  }, []);

  if (isLoading) {
    return (
      <DashboardCard
        heading="Recent interviews"
        subheading="Review outcomes and prepare for what is coming next."
      >
        <div className="flex min-h-32 items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-emerald-500" />
        </div>
      </DashboardCard>
    );
  }

  const hasInterviews = interviews.length > 0;

  return (
    <DashboardCard
      heading="Recent interviews"
      subheading="Review outcomes and prepare for what is coming next."
    >
      {hasInterviews ? (
        <>
          <motion.div
            className="space-y-3"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {interviews.map((interview) => (
              <motion.div
                key={interview._id}
                variants={subtleListItem}
                className="flex items-center justify-between gap-4 rounded-lg border border-transparent bg-background px-4 py-3 transition-colors duration-200 hover:border-border/60"
              >
                <Link
                  href={
                    interview.status === 'evaluated'
                      ? `/dashboard/interview/result/${interview.sessionId}`
                      : interview.status === 'in-progress'
                        ? `/dashboard/interview/room?session=${interview.sessionId}`
                        : `/dashboard/interview/result/${interview.sessionId}`
                  }
                  className="flex flex-1 items-center gap-3"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted/40 text-muted-foreground">
                    {interview.status === 'evaluated' || interview.status === 'completed' ? (
                      <BadgeCheck className="h-5 w-5" />
                    ) : (
                      <Mic2 className="h-5 w-5" />
                    )}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-foreground sm:text-base">
                      {interview.title}
                    </p>
                    <p className="text-xs capitalize text-muted-foreground sm:text-sm">
                      {interview.type.replace('-', ' ')}
                    </p>
                    <p className="text-xs text-muted-foreground/80">
                      {interview.completedAt
                        ? formatDate(interview.completedAt)
                        : formatDate(interview.createdAt)}
                    </p>
                  </div>
                </Link>
                <div className="flex items-center gap-3">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyles[interview.status] || statusStyles.pending}`}
                  >
                    {statusLabels[interview.status] || interview.status}
                  </span>
                  {interview.score !== undefined && interview.score > 0 && (
                    <span className="hidden text-sm font-semibold text-emerald-600 sm:inline dark:text-emerald-400">
                      {interview.score}%
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
          <div className="mt-4 flex items-center justify-between">
            <p className="text-xs text-muted-foreground sm:text-sm">
              Interviews are automatically summarised so you can revisit takeaways anytime.
            </p>
            <Link
              href="/dashboard/interview/result"
              className="inline-flex items-center gap-2 text-sm font-medium text-emerald-600 transition-colors duration-200 hover:text-emerald-500 dark:text-emerald-400"
            >
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </>
      ) : (
        <NoInterviewsState />
      )}
    </DashboardCard>
  );
};

export default RecentInterviews;
