'use client';

import FeaturePageLayout from '@/components/landing/FeaturePageLayout';
import { Brain, MessageSquare, Target, TrendingUp, Lightbulb, Award } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'Intelligent Feedback',
    description:
      'Get real-time AI feedback on your responses, helping you understand what works and what needs improvement.',
  },
  {
    icon: MessageSquare,
    title: 'Natural Conversations',
    description:
      'Practice with an AI that responds naturally, simulating real interview scenarios with follow-up questions.',
  },
  {
    icon: Target,
    title: 'Skill Gap Analysis',
    description:
      'Identify your weak areas and receive personalized recommendations to strengthen your interview skills.',
  },
  {
    icon: TrendingUp,
    title: 'Progress Tracking',
    description:
      'Monitor your improvement over time with detailed analytics and performance metrics.',
  },
  {
    icon: Lightbulb,
    title: 'Smart Suggestions',
    description:
      'Receive contextual tips and suggestions during practice to enhance your response quality.',
  },
  {
    icon: Award,
    title: 'Confidence Building',
    description:
      'Build interview confidence through repeated practice with constructive, encouraging feedback.',
  },
];

const benefits = [
  'Personalized feedback tailored to your experience level',
  'Practice anytime, anywhere without scheduling constraints',
  'Learn from detailed analysis of your communication patterns',
  'Improve vocabulary and articulation for technical concepts',
  'Reduce interview anxiety with realistic simulations',
  'Track progress with measurable skill improvements',
];

export default function AIMentorPage() {
  return (
    <FeaturePageLayout
      badge="AI-Powered"
      title="Your Personal Interview Coach"
      subtitle="AI Mentor"
      description="Experience the future of interview preparation with our intelligent AI mentor that provides personalized feedback, identifies your strengths, and helps you overcome weaknesses."
      features={features}
      benefits={benefits}
      ctaTitle="Ready to Master Your Interviews?"
      ctaDescription="Join thousands of job seekers who have improved their interview skills with HireMind's AI Mentor."
    />
  );
}
