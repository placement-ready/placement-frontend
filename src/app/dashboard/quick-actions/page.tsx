'use client';

import React from 'react';
import Link from 'next/link';
import {
  HelpCircle,
  FileText,
  CalendarClock,
  MessageCircle,
  BarChart3,
  Bookmark,
  Code2,
  Users,
  Library,
  ClipboardList,
  TrendingUp,
  GraduationCap,
  Briefcase,
  Trophy,
  Upload,
  Video,
} from 'lucide-react';

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  category: 'learning' | 'assessment' | 'career' | 'collaboration';
  badge?: string;
  color: string;
}

const quickActions: QuickAction[] = [
  // Learning Actions
  {
    id: 'take-assessment',
    title: 'Take Skills Assessment',
    description: 'Evaluate your current skills and get personalized recommendations',
    icon: <HelpCircle className="w-6 h-6" />,
    href: '/dashboard/skills-assessment',
    category: 'assessment',
    badge: 'Popular',
    color: 'bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100',
  },
  {
    id: 'resume-builder',
    title: 'Build Resume',
    description: 'Create a professional resume with our AI-powered builder',
    icon: <FileText className="w-6 h-6" />,
    href: '/dashboard/resume-builder',
    category: 'career',
    color: 'bg-green-50 text-green-600 border-green-200 hover:bg-green-100',
  },
  {
    id: 'study-planner',
    title: 'Create Study Plan',
    description: 'Generate a personalized study schedule for your goals',
    icon: <CalendarClock className="w-6 h-6" />,
    href: '/dashboard/study-planner',
    category: 'learning',
    color: 'bg-purple-50 text-purple-600 border-purple-200 hover:bg-purple-100',
  },
  {
    id: 'ai-mentor',
    title: 'Chat with AI Mentor',
    description: 'Get instant help and guidance from our AI mentor',
    icon: <MessageCircle className="w-6 h-6" />,
    href: '/dashboard/ai-chat',
    category: 'learning',
    badge: 'New',
    color: 'bg-orange-50 text-orange-600 border-orange-200 hover:bg-orange-100',
  },
  {
    id: 'progress-analytics',
    title: 'View Progress',
    description: 'Track your learning progress and achievements',
    icon: <BarChart3 className="w-6 h-6" />,
    href: '/dashboard/skill-progress',
    category: 'assessment',
    color: 'bg-indigo-50 text-indigo-600 border-indigo-200 hover:bg-indigo-100',
  },
  {
    id: 'save-resources',
    title: 'Browse Resources',
    description: 'Explore curated learning materials and save favorites',
    icon: <Bookmark className="w-6 h-6" />,
    href: '/dashboard/browse-resources',
    category: 'learning',
    color: 'bg-pink-50 text-pink-600 border-pink-200 hover:bg-pink-100',
  },
  {
    id: 'coding-practice',
    title: 'Practice Coding',
    description: 'Solve coding problems and improve your programming skills',
    icon: <Code2 className="w-6 h-6" />,
    href: '/dashboard/dsa',
    category: 'learning',
    color: 'bg-cyan-50 text-cyan-600 border-cyan-200 hover:bg-cyan-100',
  },
  {
    id: 'mock-interview',
    title: 'Mock Interview',
    description: 'Practice interviews with AI or connect with mentors',
    icon: <Video className="w-6 h-6" />,
    href: '/dashboard/mentor',
    category: 'career',
    color: 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100',
  },
  {
    id: 'learning-paths',
    title: 'Explore Learning Paths',
    description: 'Discover structured learning journeys for your career goals',
    icon: <GraduationCap className="w-6 h-6" />,
    href: '/dashboard/browse-paths',
    category: 'learning',
    color: 'bg-teal-50 text-teal-600 border-teal-200 hover:bg-teal-100',
  },
  {
    id: 'career-goals',
    title: 'Set Career Goals',
    description: 'Define and track your professional objectives',
    icon: <Briefcase className="w-6 h-6" />,
    href: '/dashboard/career-goals',
    category: 'career',
    color: 'bg-yellow-50 text-yellow-600 border-yellow-200 hover:bg-yellow-100',
  },
  {
    id: 'achievements',
    title: 'View Achievements',
    description: 'See your accomplishments and earned badges',
    icon: <Trophy className="w-6 h-6" />,
    href: '/dashboard/achievements',
    category: 'assessment',
    color: 'bg-amber-50 text-amber-600 border-amber-200 hover:bg-amber-100',
  },
  {
    id: 'upload-content',
    title: 'Upload Resources',
    description: 'Share your own learning materials with the community',
    icon: <Upload className="w-6 h-6" />,
    href: '/dashboard/upload',
    category: 'collaboration',
    color: 'bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-100',
  },
];

const categoryConfig = {
  learning: { label: 'Learning & Development', icon: <Library className="w-5 h-5" /> },
  assessment: { label: 'Assessment & Progress', icon: <TrendingUp className="w-5 h-5" /> },
  career: { label: 'Career Preparation', icon: <Briefcase className="w-5 h-5" /> },
  collaboration: { label: 'Community & Sharing', icon: <Users className="w-5 h-5" /> },
};

const QuickActionsPage: React.FC = () => {
  const categories = Object.keys(categoryConfig) as Array<keyof typeof categoryConfig>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Quick Actions</h1>
          <p className="text-gray-600 max-w-2xl">
            Fast-track your learning journey with these essential actions. Get started with the most
            important tasks to advance your career and skills.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <ClipboardList className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Available Actions</p>
                <p className="text-2xl font-bold text-gray-900">{quickActions.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Categories</p>
                <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Trophy className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">New Features</p>
                <p className="text-2xl font-bold text-gray-900">
                  {quickActions.filter((action) => action.badge === 'New').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Bookmark className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Popular</p>
                <p className="text-2xl font-bold text-gray-900">
                  {quickActions.filter((action) => action.badge === 'Popular').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions by Category */}
        {categories.map((category) => {
          const categoryActions = quickActions.filter((action) => action.category === category);
          const config = categoryConfig[category];

          return (
            <div key={category} className="mb-12">
              <div className="flex items-center mb-6">
                <div className="flex items-center">
                  {config.icon}
                  <h2 className="text-xl font-semibold text-gray-900 ml-2">{config.label}</h2>
                </div>
                <div className="ml-4 px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                  {categoryActions.length} actions
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {categoryActions.map((action) => (
                  <Link
                    key={action.id}
                    href={action.href}
                    className={`block bg-white rounded-xl p-6 border-2 transition-all duration-200 hover:shadow-lg hover:scale-105 ${action.color}`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 rounded-lg bg-white shadow-sm">{action.icon}</div>
                      {action.badge && (
                        <span className="px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded-full">
                          {action.badge}
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{action.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{action.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}

        {/* Call to Action */}
        <div className="mt-12 bg-linear-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Ready to Accelerate Your Learning?</h2>
          <p className="text-green-100 mb-6 max-w-2xl mx-auto">
            These quick actions are designed to help you make the most of your learning journey.
            Start with any action that aligns with your current goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/dashboard/skills-assessment"
              className="px-6 py-3 bg-white text-green-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Take Skills Assessment
            </Link>
            <Link
              href="/dashboard/ai-chat"
              className="px-6 py-3 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-800 transition-colors border border-green-500"
            >
              Chat with AI Mentor
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActionsPage;
