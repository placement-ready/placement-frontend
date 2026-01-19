'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Target,
  Calendar,
  CheckCircle2,
  Circle,
  Plus,
  Clock,
  Loader2,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/api';
import { fadeIn, staggerContainer } from '@/components/dashboard/motion';

interface Milestone {
  _id: string;
  title: string;
  completed: boolean;
  completedAt?: string;
}

interface Goal {
  _id: string;
  title: string;
  description: string;
  targetDate: string;
  status: 'active' | 'completed' | 'paused';
  progress: number;
  milestones: Milestone[];
  category: string;
}

interface GoalStats {
  totalGoals: number;
  activeGoals: number;
  completedGoals: number;
  avgProgress: number;
  upcomingDeadlines: number;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function getDaysRemaining(dateStr: string): number {
  const target = new Date(dateStr);
  const now = new Date();
  return Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

export default function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [stats, setStats] = useState<GoalStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const [goalsRes, statsRes] = await Promise.all([
        api.get<{ success: boolean; goals: Goal[] }>('/goals'),
        api.get<{ success: boolean; stats: GoalStats }>('/goals/stats'),
      ]);
      setGoals(goalsRes.goals || []);
      setStats(statsRes.stats || null);
    } catch (error) {
      console.error('Failed to load goals:', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function toggleMilestone(goalId: string, milestoneId: string) {
    try {
      await api.patch(`/goals/${goalId}/milestones/${milestoneId}`, {});
      loadData();
    } catch (error) {
      console.error('Failed to toggle milestone:', error);
    }
  }

  const filteredGoals = goals.filter((g) => {
    if (filter === 'active') return g.status === 'active';
    if (filter === 'completed') return g.status === 'completed';
    return true;
  });

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
              <Target className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Goal Tracking</h1>
              <p className="text-sm text-muted-foreground">
                Set and achieve your career milestones
              </p>
            </div>
          </div>
        </div>
        <Button className="bg-emerald-600 text-white hover:bg-emerald-500">
          <Plus className="mr-2 h-4 w-4" />
          New Goal
        </Button>
      </div>

      {/* Stats */}
      {stats && (
        <motion.div variants={fadeIn} className="grid gap-4 sm:grid-cols-4">
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-xs text-muted-foreground">Active Goals</p>
            <p className="mt-1 text-2xl font-bold text-foreground">{stats.activeGoals}</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-xs text-muted-foreground">Completed</p>
            <p className="mt-1 text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              {stats.completedGoals}
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-xs text-muted-foreground">Avg Progress</p>
            <p className="mt-1 text-2xl font-bold text-foreground">{stats.avgProgress}%</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-xs text-muted-foreground">Due This Week</p>
            <p className="mt-1 text-2xl font-bold text-amber-600 dark:text-amber-400">
              {stats.upcomingDeadlines}
            </p>
          </div>
        </motion.div>
      )}

      {/* Filter Tabs */}
      <div className="flex gap-2">
        {(['all', 'active', 'completed'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-lg px-4 py-2 text-sm font-medium capitalize transition-colors ${
              filter === f
                ? 'bg-emerald-600 text-white'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Goals List */}
      {filteredGoals.length === 0 ? (
        <motion.div
          variants={fadeIn}
          className="rounded-xl border border-dashed border-border bg-muted/30 p-12 text-center"
        >
          <Target className="mx-auto h-12 w-12 text-muted-foreground/50" />
          <h3 className="mt-4 text-lg font-semibold text-foreground">No goals yet</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Create your first goal to start tracking progress
          </p>
        </motion.div>
      ) : (
        <motion.div variants={fadeIn} className="space-y-4">
          {filteredGoals.map((goal) => {
            const daysRemaining = getDaysRemaining(goal.targetDate);
            const isOverdue = daysRemaining < 0 && goal.status !== 'completed';

            return (
              <motion.div
                key={goal._id}
                variants={fadeIn}
                className="rounded-xl border border-border bg-card overflow-hidden"
              >
                <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground">{goal.title}</h3>
                        {goal.status === 'completed' && (
                          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300">
                            Completed
                          </span>
                        )}
                      </div>
                      {goal.description && (
                        <p className="mt-1 text-sm text-muted-foreground">{goal.description}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-foreground">{goal.progress}%</p>
                      <p className="text-xs text-muted-foreground">complete</p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-4">
                    <div className="h-2 overflow-hidden rounded-full bg-muted">
                      <motion.div
                        className={`h-full ${goal.status === 'completed' ? 'bg-emerald-500' : 'bg-emerald-500'}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${goal.progress}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>

                  {/* Meta Info */}
                  <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {formatDate(goal.targetDate)}
                    </span>
                    {goal.status !== 'completed' && (
                      <span
                        className={`flex items-center gap-1 ${isOverdue ? 'text-red-500' : ''}`}
                      >
                        <Clock className="h-4 w-4" />
                        {isOverdue
                          ? `${Math.abs(daysRemaining)} days overdue`
                          : `${daysRemaining} days left`}
                      </span>
                    )}
                    <span className="capitalize">{goal.category}</span>
                  </div>
                </div>

                {/* Milestones */}
                {goal.milestones.length > 0 && (
                  <div className="border-t border-border bg-muted/30 p-4">
                    <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Milestones ({goal.milestones.filter((m) => m.completed).length}/
                      {goal.milestones.length})
                    </p>
                    <div className="space-y-2">
                      {goal.milestones.map((milestone) => (
                        <button
                          key={milestone._id}
                          onClick={() => toggleMilestone(goal._id, milestone._id)}
                          className="flex w-full items-center gap-3 rounded-lg px-2 py-1.5 text-left transition-colors hover:bg-muted"
                        >
                          {milestone.completed ? (
                            <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />
                          ) : (
                            <Circle className="h-5 w-5 shrink-0 text-muted-foreground" />
                          )}
                          <span
                            className={`text-sm ${
                              milestone.completed
                                ? 'text-muted-foreground line-through'
                                : 'text-foreground'
                            }`}
                          >
                            {milestone.title}
                          </span>
                          <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </motion.div>
  );
}
