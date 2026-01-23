'use client';

import FeaturePageLayout from '@/components/landing/FeaturePageLayout';
import { Library, FileText, Building2, Star, Search, Download } from 'lucide-react';

const features = [
  {
    icon: Library,
    title: 'Curated Question Bank',
    description:
      'Access thousands of interview questions organized by topic, difficulty, and company.',
  },
  {
    icon: Building2,
    title: 'Company-Specific Prep',
    description:
      'Prepare for specific companies with insider tips, common questions, and culture insights.',
  },
  {
    icon: FileText,
    title: 'Best Practice Guides',
    description:
      'Learn proven strategies and frameworks for answering different types of interview questions.',
  },
  {
    icon: Star,
    title: 'Community Favorites',
    description: 'Discover the most helpful resources rated by other job seekers in the community.',
  },
  {
    icon: Search,
    title: 'Smart Search',
    description:
      'Find exactly what you need with powerful filters for role, experience level, and topic.',
  },
  {
    icon: Download,
    title: 'Offline Access',
    description: 'Download resources to prepare on-the-go, even without an internet connection.',
  },
];

const benefits = [
  'Access comprehensive resources in one centralized location',
  'Save hours of research with curated, high-quality content',
  'Prepare for specific companies with targeted resources',
  'Learn from real interview experiences and success stories',
  'Stay up-to-date with the latest interview trends',
  'Practice with questions used in actual interviews',
];

export default function ResourceLibraryPage() {
  return (
    <FeaturePageLayout
      badge="Comprehensive"
      title="Everything You Need in One Place"
      subtitle="Resource Library"
      description="Access our extensive library of interview resources, including curated question banks, company-specific guides, and expert tips from industry professionals."
      features={features}
      benefits={benefits}
      ctaTitle="Explore Our Resources"
      ctaDescription="Dive into our extensive library and prepare with the best materials available."
    />
  );
}
