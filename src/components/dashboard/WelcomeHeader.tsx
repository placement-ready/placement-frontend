'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CalendarCheck, Clock, TrendingUp, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/providers/AuthProvider';
import { DashboardCard, DashboardCardSection } from './DashboardCard';
import { fadeInUp } from './motion';
import { api } from '@/lib/api';

interface StatsData {
  totalInterviews: number;
  avgScore: number;
  totalMinutes: number;
  weeklyData: Array<{ week: string; score: number; interviews: number }>;
}

const WelcomeHeader = () => {
  const { user } = useAuth();
  const firstName = user?.name?.split(' ')[0] ?? 'there';
  const [stats, setStats] = useState<StatsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const response = await api.get<{ success: boolean; stats: StatsData }>('/interviews/stats');
        setStats(response.stats);
      } catch (error) {
        console.error('Failed to load stats:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadStats();
  }, []);

  // Calculate dynamic highlights
  const practiceHours = stats ? Math.round(stats.totalMinutes / 60) : 0;
  const hasData = stats && stats.totalInterviews > 0;

  const focusHighlights = [
    {
      label: 'Interviews completed',
      value: hasData ? `${stats!.totalInterviews} total` : 'No interviews yet',
      icon: CalendarCheck,
    },
    {
      label: 'Practice time',
      value: hasData ? `${practiceHours}h tracked` : '—',
      icon: Clock,
    },
    {
      label: 'Average score',
      value: hasData ? `${stats!.avgScore}%` : '—',
      icon: TrendingUp,
    },
  ];

  return (
    <DashboardCard
      heading={`Welcome back, ${firstName}`}
      subheading="Pick up where you left off and keep your momentum."
      variants={fadeInUp}
      action={
        <Button asChild size="lg">
          <Link href="/dashboard/interview/new">Start interview</Link>
        </Button>
      }
    >
      <DashboardCardSection>
        <p className="text-sm text-muted-foreground">
          Your personalised dashboard keeps track of interviews, resume updates, and milestones so
          you always know the next best step.
        </p>
        {isLoading ? (
          <div className="flex items-center justify-center py-6">
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-3">
            {focusHighlights.map((item) => (
              <motion.div
                key={item.label}
                whileHover={{ y: -2 }}
                className="flex items-start gap-3 rounded-lg bg-muted/30 px-4 py-3 text-sm"
              >
                <span className="mt-1 text-muted-foreground">
                  <item.icon className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground/80">
                    {item.label}
                  </p>
                  <p className="font-medium text-foreground">{item.value}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </DashboardCardSection>
    </DashboardCard>
  );
};

export default WelcomeHeader;
