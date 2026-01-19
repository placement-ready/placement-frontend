'use client';

import { useEffect, useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import { motion } from 'framer-motion';
import { TrendingUp, Target, Clock, Award, Loader2 } from 'lucide-react';
import { DashboardCard, DashboardCardSection } from './DashboardCard';
import { fadeIn } from './motion';
import { api } from '@/lib/api';

interface StatsData {
  totalInterviews: number;
  avgScore: number;
  totalMinutes: number;
  weeklyData: Array<{ week: string; score: number; interviews: number }>;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number; dataKey: string }>;
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-border bg-card px-3 py-2 shadow-lg">
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
        <p className="text-sm font-semibold text-foreground">Score: {payload[0].value}%</p>
      </div>
    );
  }
  return null;
};

export default function InterviewStats() {
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

  // Default data for activity chart (will be calculated from weekly data)
  const activityData =
    stats?.weeklyData?.map((w, i) => ({
      day: `W${i + 1}`,
      sessions: w.interviews,
    })) || [];

  const statItems = [
    {
      label: 'Total Interviews',
      value: stats?.totalInterviews?.toString() || '0',
      change: 'all time',
      positive: true,
      icon: Target,
    },
    {
      label: 'Avg. Score',
      value: `${stats?.avgScore || 0}%`,
      change: 'average',
      positive: true,
      icon: Award,
    },
    {
      label: 'Practice Time',
      value: `${Math.round((stats?.totalMinutes || 0) / 60)}h`,
      change: 'total',
      positive: true,
      icon: Clock,
    },
    {
      label: 'This Week',
      value: stats?.weeklyData?.[stats.weeklyData.length - 1]?.interviews?.toString() || '0',
      change: 'interviews',
      positive: true,
      icon: TrendingUp,
    },
  ];

  if (isLoading) {
    return (
      <DashboardCard
        heading="Performance Analytics"
        subheading="Track your progress and identify areas for improvement."
      >
        <DashboardCardSection className="flex min-h-50 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
        </DashboardCardSection>
      </DashboardCard>
    );
  }

  return (
    <DashboardCard
      heading="Performance Analytics"
      subheading="Track your progress and identify areas for improvement."
    >
      <DashboardCardSection className="gap-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {statItems.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.1 }}
              className="rounded-xl border border-border/60 bg-muted/30 p-4"
            >
              <div className="flex items-center gap-2 text-muted-foreground">
                <stat.icon className="h-4 w-4" />
                <span className="text-xs font-medium">{stat.label}</span>
              </div>
              <p className="mt-2 text-2xl font-bold text-foreground">{stat.value}</p>
              <p
                className={`mt-1 text-xs font-medium ${
                  stat.positive ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500'
                }`}
              >
                {stat.change}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Performance Chart */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="rounded-xl border border-border/60 bg-muted/20 p-4"
          >
            <h4 className="mb-4 text-sm font-semibold text-foreground">Score Trend</h4>
            <div className="h-48">
              {stats?.weeklyData && stats.weeklyData.length > 0 ? (
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
                      fontSize={11}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="currentColor"
                      className="text-muted-foreground"
                      fontSize={11}
                      tickLine={false}
                      axisLine={false}
                      domain={[0, 100]}
                      width={30}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="score"
                      stroke="#10b981"
                      fill="url(#scoreGradient)"
                      strokeWidth={2}
                      dot={{ fill: '#10b981', strokeWidth: 0, r: 3 }}
                      activeDot={{ r: 5, fill: '#10b981' }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                  Complete interviews to see your score trend
                </div>
              )}
            </div>
          </motion.div>

          {/* Activity Chart */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="rounded-xl border border-border/60 bg-muted/20 p-4"
          >
            <h4 className="mb-4 text-sm font-semibold text-foreground">Weekly Activity</h4>
            <div className="h-48">
              {activityData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={activityData}>
                    <XAxis
                      dataKey="day"
                      stroke="currentColor"
                      className="text-muted-foreground"
                      fontSize={11}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="currentColor"
                      className="text-muted-foreground"
                      fontSize={11}
                      tickLine={false}
                      axisLine={false}
                      width={20}
                    />
                    <Tooltip
                      cursor={{ fill: 'transparent' }}
                      contentStyle={{
                        background: 'var(--card)',
                        border: '1px solid var(--border)',
                        borderRadius: '8px',
                        fontSize: '12px',
                      }}
                    />
                    <Bar dataKey="sessions" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                  Complete interviews to see your activity
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </DashboardCardSection>
    </DashboardCard>
  );
}
