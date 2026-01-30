'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Video,
  FileText,
  Target,
  Clock,
  CheckCircle2,
  ExternalLink,
  Plus,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/api';
import { fadeIn, staggerContainer } from '@/components/dashboard/motion';

interface LearningResource {
  _id: string;
  title: string;
  description: string;
  type: 'article' | 'video' | 'course' | 'practice';
  url?: string;
  completed: boolean;
  progress: number;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedMinutes: number;
}

interface LearningStats {
  totalResources: number;
  completedResources: number;
  inProgressResources: number;
  totalMinutesLearned: number;
  completionRate: number;
}

const typeIcons = {
  article: FileText,
  video: Video,
  course: BookOpen,
  practice: Target,
};

const difficultyColors = {
  beginner: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300',
  intermediate: 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300',
  advanced: 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300',
};

export default function LearningPage() {
  const [resources, setResources] = useState<LearningResource[]>([]);
  const [stats, setStats] = useState<LearningStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'completed' | 'in-progress'>('all');

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const [resourcesRes, statsRes] = await Promise.all([
        api.get<{ success: boolean; resources: LearningResource[] }>('/learning'),
        api.get<{ success: boolean; stats: LearningStats }>('/learning/stats'),
      ]);
      setResources(resourcesRes.resources || []);
      setStats(statsRes.stats || null);
    } catch (error) {
      console.error('Failed to load learning data:', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleComplete(id: string) {
    try {
      await api.post(`/learning/${id}/complete`);
      loadData();
    } catch (error) {
      console.error('Failed to complete resource:', error);
    }
  }

  const filteredResources = resources.filter((r) => {
    if (filter === 'completed') return r.completed;
    if (filter === 'in-progress') return r.progress > 0 && !r.completed;
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
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-500/20">
            <BookOpen className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Learning Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              Track your learning journey and skill development
            </p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      {stats && (
        <motion.div variants={fadeIn} className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <BookOpen className="h-4 w-4" />
              <span className="text-xs font-medium">Total Resources</span>
            </div>
            <p className="mt-2 text-2xl font-bold text-foreground">{stats.totalResources}</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <CheckCircle2 className="h-4 w-4" />
              <span className="text-xs font-medium">Completed</span>
            </div>
            <p className="mt-2 text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              {stats.completedResources}
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span className="text-xs font-medium">Time Learned</span>
            </div>
            <p className="mt-2 text-2xl font-bold text-foreground">
              {Math.round(stats.totalMinutesLearned / 60)}h
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Target className="h-4 w-4" />
              <span className="text-xs font-medium">Completion Rate</span>
            </div>
            <p className="mt-2 text-2xl font-bold text-foreground">{stats.completionRate}%</p>
          </div>
        </motion.div>
      )}

      {/* Filter Tabs */}
      <div className="flex gap-2">
        {(['all', 'in-progress', 'completed'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              filter === f
                ? 'bg-emerald-600 text-white'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {f === 'all' ? 'All' : f === 'in-progress' ? 'In Progress' : 'Completed'}
          </button>
        ))}
      </div>

      {/* Resources Grid */}
      {filteredResources.length === 0 ? (
        <motion.div
          variants={fadeIn}
          className="rounded-xl border border-dashed border-border bg-muted/30 p-12 text-center"
        >
          <BookOpen className="mx-auto h-12 w-12 text-muted-foreground/50" />
          <h3 className="mt-4 text-lg font-semibold text-foreground">No resources yet</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Add learning resources to track your progress
          </p>
          <Button className="mt-4 bg-emerald-600 text-white hover:bg-emerald-500">
            <Plus className="mr-2 h-4 w-4" />
            Add Resource
          </Button>
        </motion.div>
      ) : (
        <motion.div variants={fadeIn} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredResources.map((resource) => {
            const Icon = typeIcons[resource.type];
            return (
              <motion.div
                key={resource._id}
                variants={fadeIn}
                className="group rounded-xl border border-border bg-card p-5 transition-shadow hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                    <Icon className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                      difficultyColors[resource.difficulty]
                    }`}
                  >
                    {resource.difficulty}
                  </span>
                </div>

                <h3 className="mt-3 font-semibold text-foreground line-clamp-2">
                  {resource.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                  {resource.description || 'No description'}
                </p>

                <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {resource.estimatedMinutes} min
                  </span>
                  <span className="capitalize">{resource.category}</span>
                </div>

                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium text-foreground">{resource.progress}%</span>
                  </div>
                  <div className="mt-1 h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full bg-emerald-500 transition-all"
                      style={{ width: `${resource.progress}%` }}
                    />
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  {resource.url && (
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 rounded-lg bg-muted px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-muted/80"
                    >
                      Open
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                  {!resource.completed && (
                    <button
                      onClick={() => handleComplete(resource._id)}
                      className="flex items-center gap-1 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-emerald-500"
                    >
                      <CheckCircle2 className="h-3 w-3" />
                      Complete
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </motion.div>
  );
}
