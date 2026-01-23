'use client';

import FeaturePageLayout from '@/components/landing/FeaturePageLayout';
import { BarChart3, TrendingUp, History, Target, LineChart, Clock } from 'lucide-react';

const features = [
  {
    icon: BarChart3,
    title: 'Performance Analytics',
    description:
      'Detailed analytics showing your performance across different question types their, topics, and difficulty levels.',
  },
  {
    icon: TrendingUp,
    title: 'Skill Improvement Charts',
    description:
      'Visual charts displaying your improvement trajectory over time for each skill category.',
  },
  {
    icon: History,
    title: 'Session History',
    description:
      'Access complete history of all your practice sessions with detailed feedback and scores.',
  },
  {
    icon: Target,
    title: 'Goal Setting',
    description:
      'Set personal goals and track your progress towards achieving them with clear milestones.',
  },
  {
    icon: LineChart,
    title: 'Comparative Insights',
    description: 'See how your performance compares to successful candidates in similar roles.',
  },
  {
    icon: Clock,
    title: 'Time Analytics',
    description: 'Track response times and learn to pace yourself effectively during interviews.',
  },
];

const benefits = [
  'Understand exactly where you stand in your preparation',
  'Identify patterns in your strengths and weaknesses',
  'Make data-driven decisions about what to practice next',
  'Stay motivated by seeing measurable improvement',
  'Optimize your preparation time with focused practice',
  'Prepare confidently knowing your readiness level',
];

export default function ProgressTrackingPage() {
  return (
    <FeaturePageLayout
      badge="Data-Driven"
      title="Track Every Step of Your Growth"
      subtitle="Progress Tracking"
      description="Get comprehensive insights into your interview preparation journey with detailed analytics, performance trends, and actionable recommendations."
      features={features}
      benefits={benefits}
      ctaTitle="See Your Progress in Action"
      ctaDescription="Start tracking your improvement and make every practice session count."
    />
  );
}
