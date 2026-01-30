'use client';

import { motion } from 'framer-motion';

import QuickActions from '@/components/dashboard/QuickActions';
import RecentInterviews from '@/components/dashboard/RecentInterviews';
import ResumeStatus from '@/components/dashboard/ResumeStatus';
import WelcomeHeader from '@/components/dashboard/WelcomeHeader';
import InterviewStats from '@/components/dashboard/InterviewStats';
import { staggerContainer } from '@/components/dashboard/motion';

export default function Dashboard() {
  return (
    <motion.div
      className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 pb-12 pt-6 lg:px-8"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      <WelcomeHeader />

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <QuickActions />
        <ResumeStatus />
      </div>

      <InterviewStats />

      <RecentInterviews />
    </motion.div>
  );
}
