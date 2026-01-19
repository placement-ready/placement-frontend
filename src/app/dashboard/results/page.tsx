'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  Trophy,
  TrendingUp,
  Calendar,
  Clock,
  Target,
  Loader2,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/api';
import { fadeIn, staggerContainer } from '@/components/dashboard/motion';

interface Interview {
  _id: string;
  sessionId: string;
  title: string;
  type: 'behavioral' | 'technical' | 'case-study';
  status: 'pending' | 'in-progress' | 'completed';
  score?: number;
  completedAt?: string;
  createdAt: string;
}

interface InterviewStats {
  totalInterviews: number;
  avgScore: number;
  totalMinutes: number;
  weeklyData: Array<{ week: string; score: number; interviews: number }>;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

const typeColors = {
  behavioral: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300',
  technical: 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300',
  'case-study': 'bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300',
};

export default function ResultsPage() {
  const router = useRouter();
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [stats, setStats] = useState<InterviewStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const [interviewsRes, statsRes] = await Promise.all([
        api.get<{ success: boolean; interviews: Interview[] }>(
          '/interviews?status=completed&limit=20',
        ),
        api.get<{ success: boolean; stats: InterviewStats }>('/interviews/stats'),
      ]);
      setInterviews(interviewsRes.interviews || []);
      setStats(statsRes.stats || null);
    } catch (error) {
      console.error('Failed to load results:', error);
    } finally {
      setIsLoading(false);
    }
  }

  // Calculate trend
  const recentScores = interviews.slice(0, 5).map((i) => i.score || 0);
  const olderScores = interviews.slice(5, 10).map((i) => i.score || 0);
  const recentAvg =
    recentScores.length > 0 ? recentScores.reduce((a, b) => a + b, 0) / recentScores.length : 0;
  const olderAvg =
    olderScores.length > 0 ? olderScores.reduce((a, b) => a + b, 0) / olderScores.length : 0;
  const trend = recentAvg - olderAvg;
  const isPositiveTrend = trend >= 0;

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
      </div>
    );
  }

  return (
    <motion.div
      className="mx-auto max-w-6xl space-y-8 px-4 py-6 lg:px-8"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-500/20">
              <Trophy className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Interview Results</h1>
              <p className="text-sm text-muted-foreground">Track your performance over time</p>
            </div>
          </div>
        </div>
        <Button
          onClick={() => router.push('/dashboard/interview/schedule')}
          className="bg-emerald-600 text-white hover:bg-emerald-500"
        >
          Start New Interview
        </Button>
      </div>

      {/* Stats Grid */}
      {stats && (
        <motion.div variants={fadeIn} className="grid gap-4 sm:grid-cols-4">
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Target className="h-4 w-4" />
              <span className="text-sm">Total Interviews</span>
            </div>
            <p className="mt-2 text-3xl font-bold text-foreground">{stats.totalInterviews}</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Trophy className="h-4 w-4" />
              <span className="text-sm">Average Score</span>
            </div>
            <p className="mt-2 text-3xl font-bold text-emerald-600 dark:text-emerald-400">
              {stats.avgScore}%
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span className="text-sm">Practice Time</span>
            </div>
            <p className="mt-2 text-3xl font-bold text-foreground">
              {Math.round(stats.totalMinutes / 60)}h
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-2 text-muted-foreground">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm">Trend</span>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <p
                className={`text-3xl font-bold ${
                  isPositiveTrend ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500'
                }`}
              >
                {trend > 0 ? '+' : ''}
                {Math.round(trend)}%
              </p>
              {isPositiveTrend ? (
                <ArrowUpRight className="h-5 w-5 text-emerald-500" />
              ) : (
                <ArrowDownRight className="h-5 w-5 text-red-500" />
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* Performance Chart */}
      {stats && stats.weeklyData && stats.weeklyData.length > 0 && (
        <motion.div variants={fadeIn} className="rounded-xl border border-border bg-card p-5">
          <h3 className="mb-4 font-semibold text-foreground">Performance Over Time</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.weeklyData}>
                <defs>
                  <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="week"
                  stroke="currentColor"
                  className="text-muted-foreground"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="currentColor"
                  className="text-muted-foreground"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  domain={[0, 100]}
                  width={35}
                />
                <Tooltip
                  contentStyle={{
                    background: 'var(--card)',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="score"
                  stroke="#10b981"
                  fill="url(#scoreGradient)"
                  strokeWidth={2}
                  dot={{ fill: '#10b981', strokeWidth: 0, r: 4 }}
                  activeDot={{ r: 6, fill: '#10b981' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      )}

      {/* Recent Results */}
      <motion.div variants={fadeIn}>
        <h3 className="mb-4 font-semibold text-foreground">Recent Interviews</h3>
        {interviews.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border bg-muted/30 p-12 text-center">
            <Trophy className="mx-auto h-12 w-12 text-muted-foreground/50" />
            <h4 className="mt-4 text-lg font-semibold text-foreground">No completed interviews</h4>
            <p className="mt-2 text-sm text-muted-foreground">
              Complete an interview to see your results here
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {interviews.map((interview) => (
              <motion.div
                key={interview._id}
                variants={fadeIn}
                className="flex items-center justify-between rounded-xl border border-border bg-card p-4 transition-shadow hover:shadow-md"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
                    <Trophy
                      className={`h-6 w-6 ${
                        (interview.score || 0) >= 80
                          ? 'text-emerald-500'
                          : (interview.score || 0) >= 60
                            ? 'text-amber-500'
                            : 'text-red-500'
                      }`}
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{interview.title}</h4>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                          typeColors[interview.type]
                        }`}
                      >
                        {interview.type}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {interview.completedAt && formatDate(interview.completedAt)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-2xl font-bold text-foreground">{interview.score || 0}%</p>
                    <p className="text-xs text-muted-foreground">Score</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
