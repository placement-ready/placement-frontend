'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  HelpCircle,
  FileText,
  CalendarClock,
  MessageCircle,
  BarChart3,
  Bookmark,
  Users,
  Library,
  TrendingUp,
  Briefcase,
  Trophy,
  Upload,
  Video,
  ArrowRight,
} from 'lucide-react';

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  category: 'learning' | 'assessment' | 'career' | 'collaboration';
  badge?: string;
}

const quickActions: QuickAction[] = [
  {
    id: 'take-assessment',
    title: 'Take Skills Assessment',
    description: 'Evaluate your current skills and get personalized recommendations',
    icon: <HelpCircle className="h-6 w-6" />,
    href: '/dashboard/skills-assessment',
    category: 'assessment',
    badge: 'Popular',
  },
  {
    id: 'resume-builder',
    title: 'Build Resume',
    description: 'Create a professional resume with our AI-powered builder',
    icon: <FileText className="h-6 w-6" />,
    href: '/dashboard/resume-builder',
    category: 'career',
  },
  {
    id: 'study-planner',
    title: 'Create Study Plan',
    description: 'Generate a personalized study schedule for your goals',
    icon: <CalendarClock className="h-6 w-6" />,
    href: '/dashboard/study-planner',
    category: 'learning',
  },
  {
    id: 'ai-mentor',
    title: 'Chat with AI Mentor',
    description: 'Get instant help and guidance from our AI mentor',
    icon: <MessageCircle className="h-6 w-6" />,
    href: '/dashboard/ai-chat',
    category: 'learning',
    badge: 'New',
  },
  {
    id: 'progress-analytics',
    title: 'View Progress',
    description: 'Track your learning progress and achievements',
    icon: <BarChart3 className="h-6 w-6" />,
    href: '/dashboard/skill-progress',
    category: 'assessment',
  },
  {
    id: 'save-resources',
    title: 'Browse Resources',
    description: 'Explore curated learning materials and save favorites',
    icon: <Bookmark className="h-6 w-6" />,
    href: '/dashboard/browse-resources',
    category: 'learning',
  },
  {
    id: 'mock-interview',
    title: 'Mock Interview',
    description: 'Practice interviews with AI or connect with mentors',
    icon: <Video className="h-6 w-6" />,
    href: '/dashboard/interview/new',
    category: 'career',
  },
  {
    id: 'career-goals',
    title: 'Set Career Goals',
    description: 'Define and track your professional objectives',
    icon: <Briefcase className="h-6 w-6" />,
    href: '/dashboard/career-goals',
    category: 'career',
  },
  {
    id: 'achievements',
    title: 'View Achievements',
    description: 'See your accomplishments and earned badges',
    icon: <Trophy className="h-6 w-6" />,
    href: '/dashboard/achievements',
    category: 'assessment',
  },
  {
    id: 'upload-content',
    title: 'Upload Resources',
    description: 'Share your own learning materials with the community',
    icon: <Upload className="h-6 w-6" />,
    href: '/dashboard/upload',
    category: 'collaboration',
  },
];

const categoryConfig = {
  learning: { label: 'Learning & Development', icon: <Library className="h-5 w-5" /> },
  assessment: { label: 'Assessment & Progress', icon: <TrendingUp className="h-5 w-5" /> },
  career: { label: 'Career Preparation', icon: <Briefcase className="h-5 w-5" /> },
  collaboration: { label: 'Community & Sharing', icon: <Users className="h-5 w-5" /> },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

const QuickActionsPage: React.FC = () => {
  const categories = Object.keys(categoryConfig) as Array<keyof typeof categoryConfig>;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-transparent">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-slate-900 dark:text-white">Quick Actions</h1>
          <p className="max-w-2xl text-slate-600 dark:text-slate-400">
            Fast-track your learning journey with these essential actions. Get started with the most
            important tasks to advance your career and skills.
          </p>
        </div>

        {/* Actions by Category */}
        {categories.map((category) => {
          const categoryActions = quickActions.filter((action) => action.category === category);
          const config = categoryConfig[category];

          return (
            <div key={category} className="mb-12">
              <div className="mb-6 flex items-center">
                <div className="flex items-center text-emerald-600 dark:text-emerald-400">
                  {config.icon}
                  <h2 className="ml-2 text-xl font-semibold text-slate-900 dark:text-white">
                    {config.label}
                  </h2>
                </div>
                <div className="ml-4 rounded-full border border-slate-200 bg-white px-3 py-1 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                  {categoryActions.length} actions
                </div>
              </div>

              <motion.div
                className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {categoryActions.map((action) => (
                  <motion.div key={action.id} variants={itemVariants}>
                    <Link
                      href={action.href}
                      className="group block h-full rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:border-emerald-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/50 dark:hover:border-emerald-500/50"
                    >
                      <div className="mb-4 flex items-start justify-between">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition-colors group-hover:bg-emerald-600 group-hover:text-white dark:bg-emerald-500/10 dark:text-emerald-400 dark:group-hover:bg-emerald-500 dark:group-hover:text-white">
                          {action.icon}
                        </div>
                        {action.badge && (
                          <span className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                            {action.badge}
                          </span>
                        )}
                      </div>
                      <h3 className="mb-2 text-lg font-semibold text-slate-900 dark:text-white">
                        {action.title}
                      </h3>
                      <p className="mb-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                        {action.description}
                      </p>
                      <div className="flex items-center gap-1 text-sm font-medium text-emerald-600 opacity-0 transition-opacity group-hover:opacity-100 dark:text-emerald-400">
                        <span>Get started</span>
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          );
        })}

        {/* CTA Section */}
        <div className="mt-12 rounded-2xl border border-emerald-200/50 bg-emerald-50/50 p-8 text-center dark:border-emerald-500/20 dark:bg-emerald-500/5">
          <h2 className="mb-4 text-2xl font-bold text-slate-900 dark:text-white">
            Ready to Accelerate Your Learning?
          </h2>
          <p className="mx-auto mb-6 max-w-2xl text-slate-600 dark:text-slate-400">
            These quick actions are designed to help you make the most of your learning journey.
            Start with any action that aligns with your current goals.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/dashboard/skills-assessment"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600"
            >
              Take Skills Assessment
            </Link>
            <Link
              href="/dashboard/interview/new"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-900 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
            >
              Start Mock Interview
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActionsPage;
