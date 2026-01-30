'use client';

import FeaturePageLayout from '@/components/landing/FeaturePageLayout';
import { Route, BookOpen, Layers, CheckCircle, Compass, GraduationCap } from 'lucide-react';

const features = [
  {
    icon: Route,
    title: 'Customizable Roadmaps',
    description:
      'Create personalized learning paths based on your target role, experience level, and timeline.',
  },
  {
    icon: BookOpen,
    title: 'Structured Curriculum',
    description:
      'Follow a well-organized curriculum covering technical skills, behavioral questions, and industry knowledge.',
  },
  {
    icon: Layers,
    title: 'Role-Specific Tracks',
    description:
      'Choose from tracks designed for software engineers, data scientists, product managers, and more.',
  },
  {
    icon: CheckCircle,
    title: 'Milestone Achievements',
    description:
      'Celebrate your progress with milestone badges and track completion percentages for each module.',
  },
  {
    icon: Compass,
    title: 'Adaptive Learning',
    description:
      'Our system adapts to your performance, focusing more on areas where you need improvement.',
  },
  {
    icon: GraduationCap,
    title: 'Expert-Curated Content',
    description:
      'Learn from content curated by industry professionals with real hiring experience.',
  },
];

const benefits = [
  'Clear step-by-step guidance from beginner to interview-ready',
  'Save time with focused, relevant preparation materials',
  'Build skills progressively without feeling overwhelmed',
  'Stay motivated with visible progress and achievements',
  'Prepare efficiently with a timeline-based approach',
  'Access role-specific content for your target position',
];

export default function LearningPathsPage() {
  return (
    <FeaturePageLayout
      badge="Structured Learning"
      title="Master Your Path to Success"
      subtitle="Learning Paths"
      description="Follow structured, role-specific learning paths designed by industry experts to take you from where you are to where you want to be in your career."
      features={features}
      benefits={benefits}
      ctaTitle="Start Your Learning Journey"
      ctaDescription="Choose your track and begin your structured preparation today."
    />
  );
}
