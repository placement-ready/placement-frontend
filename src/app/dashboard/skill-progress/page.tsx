'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, MessageSquare, Code, TrendingUp, Plus, Loader2, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/api';
import { fadeIn, staggerContainer } from '@/components/dashboard/motion';

interface Skill {
  _id: string;
  name: string;
  category: 'technical' | 'behavioral' | 'communication';
  level: number;
  practiceCount: number;
  lastPracticed?: string;
}

interface SkillStats {
  totalSkills: number;
  avgLevel: number;
  totalPractice: number;
  byCategory: Array<{ category: string; count: number; avgLevel: number }>;
}

const categoryIcons = {
  technical: Code,
  behavioral: MessageSquare,
  communication: Zap,
};

const categoryColors = {
  technical: 'border-blue-500 bg-blue-50 dark:bg-blue-500/10',
  behavioral: 'border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10',
  communication: 'border-purple-500 bg-purple-50 dark:bg-purple-500/10',
};

const levelColors = {
  technical: 'bg-blue-500',
  behavioral: 'bg-emerald-500',
  communication: 'bg-purple-500',
};

function getLevelLabel(level: number): string {
  if (level < 25) return 'Beginner';
  if (level < 50) return 'Developing';
  if (level < 75) return 'Proficient';
  return 'Expert';
}

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [stats, setStats] = useState<SkillStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const [skillsRes, statsRes] = await Promise.all([
        api.get<{ success: boolean; skills: Skill[] }>('/skills'),
        api.get<{ success: boolean; stats: SkillStats }>('/skills/stats'),
      ]);
      setSkills(skillsRes.skills || []);
      setStats(statsRes.stats || null);
    } catch (error) {
      console.error('Failed to load skills:', error);
    } finally {
      setIsLoading(false);
    }
  }

  const filteredSkills = selectedCategory
    ? skills.filter((s) => s.category === selectedCategory)
    : skills;

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
              <BarChart3 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Skill Progress</h1>
              <p className="text-sm text-muted-foreground">
                Track and develop your interview skills
              </p>
            </div>
          </div>
        </div>
        <Button className="bg-emerald-600 text-white hover:bg-emerald-500">
          <Plus className="mr-2 h-4 w-4" />
          Add Skill
        </Button>
      </div>

      {/* Stats Overview */}
      {stats && (
        <motion.div variants={fadeIn} className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-border bg-card p-5">
            <p className="text-sm text-muted-foreground">Total Skills</p>
            <p className="mt-1 text-3xl font-bold text-foreground">{stats.totalSkills}</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <p className="text-sm text-muted-foreground">Average Level</p>
            <p className="mt-1 text-3xl font-bold text-emerald-600 dark:text-emerald-400">
              {stats.avgLevel}%
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <p className="text-sm text-muted-foreground">Practice Sessions</p>
            <p className="mt-1 text-3xl font-bold text-foreground">{stats.totalPractice}</p>
          </div>
        </motion.div>
      )}

      {/* Category Breakdown */}
      {stats && stats.byCategory.length > 0 && (
        <motion.div variants={fadeIn} className="rounded-xl border border-border bg-card p-5">
          <h3 className="mb-4 font-semibold text-foreground">Category Breakdown</h3>
          <div className="grid gap-4 sm:grid-cols-3">
            {stats.byCategory.map((cat) => {
              const Icon = categoryIcons[cat.category as keyof typeof categoryIcons] || Zap;
              return (
                <button
                  key={cat.category}
                  onClick={() =>
                    setSelectedCategory(selectedCategory === cat.category ? null : cat.category)
                  }
                  className={`rounded-xl border-2 p-4 text-left transition-all ${
                    categoryColors[cat.category as keyof typeof categoryColors] ||
                    'border-border bg-muted'
                  } ${selectedCategory === cat.category ? 'ring-2 ring-emerald-500' : ''}`}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="h-5 w-5" />
                    <span className="font-medium capitalize text-foreground">{cat.category}</span>
                  </div>
                  <div className="mt-3 flex items-end justify-between">
                    <div>
                      <p className="text-2xl font-bold text-foreground">{cat.count}</p>
                      <p className="text-xs text-muted-foreground">skills</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-foreground">{cat.avgLevel}%</p>
                      <p className="text-xs text-muted-foreground">avg level</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Skills List */}
      {filteredSkills.length === 0 ? (
        <motion.div
          variants={fadeIn}
          className="rounded-xl border border-dashed border-border bg-muted/30 p-12 text-center"
        >
          <TrendingUp className="mx-auto h-12 w-12 text-muted-foreground/50" />
          <h3 className="mt-4 text-lg font-semibold text-foreground">No skills tracked yet</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Add skills to track your development progress
          </p>
        </motion.div>
      ) : (
        <motion.div variants={fadeIn} className="space-y-3">
          {filteredSkills.map((skill) => {
            const Icon = categoryIcons[skill.category] || Zap;
            const barColor = levelColors[skill.category] || 'bg-emerald-500';
            return (
              <motion.div
                key={skill._id}
                variants={fadeIn}
                className="rounded-xl border border-border bg-card p-5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                        categoryColors[skill.category]
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{skill.name}</h4>
                      <p className="text-xs text-muted-foreground capitalize">
                        {skill.category} • {skill.practiceCount} practices
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-foreground">{skill.level}%</p>
                    <p className="text-xs text-muted-foreground">{getLevelLabel(skill.level)}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="h-3 overflow-hidden rounded-full bg-muted">
                    <motion.div
                      className={`h-full ${barColor}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </motion.div>
  );
}
