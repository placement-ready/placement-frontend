'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

import { buttonHover, fadeUp, fadeUpStagger } from './motion';
import { Button } from '@/components/ui/button';

const stats = [
  { label: 'AI interview sets', value: '45+' },
  { label: 'Resume-ready templates', value: '12' },
  { label: 'Average practice minutes', value: '18' },
];

const MotionButton = motion.create(Button);

const Hero = () => {
  const router = useRouter();

  return (
    <motion.section
      className="relative flex min-h-[90vh] w-full flex-col justify-center overflow-hidden bg-linear-to-b from-background via-background/60 to-background px-4 pb-16 pt-28 sm:px-6 lg:px-8"
      initial="hidden"
      animate="visible"
      variants={fadeUpStagger}
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center text-center">
        <motion.div
          className="mb-6 flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary"
          variants={fadeUp}
        >
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
            AI
          </span>
          Simulate the real interview room
        </motion.div>

        <motion.h1
          className="max-w-4xl text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          variants={fadeUp}
        >
          Practice interviews with fast feedback and resume-ready outcomes.
        </motion.h1>

        <motion.p
          className="mt-4 max-w-2xl text-balance text-base text-muted-foreground sm:text-lg"
          variants={fadeUp}
        >
          Run mock interviews, capture behavioural notes, and export polished resumes in one place.
        </motion.p>

        <motion.div className="mt-8 flex flex-col gap-3 sm:flex-row" variants={fadeUp}>
          <MotionButton
            variants={buttonHover}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            onClick={() => router.push('/dashboard')}
            className="h-12 px-6"
          >
            Start a mock session
          </MotionButton>
          <MotionButton
            variants={buttonHover}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            variant="outline"
            onClick={() => router.push('/dashboard/resume-builder')}
            className="h-12 px-6"
          >
            See resume builder
          </MotionButton>
        </motion.div>

        <motion.div
          className="mt-12 grid w-full max-w-3xl grid-cols-1 gap-4 rounded-2xl border border-border bg-card/60 p-6 backdrop-blur sm:grid-cols-3"
          variants={fadeUp}
        >
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1">
              <span className="text-2xl font-semibold text-foreground sm:text-3xl">
                {stat.value}
              </span>
              <span className="text-sm text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 flex justify-center">
        <div className="h-64 w-md rounded-full bg-primary/10 blur-3xl" />
      </div>
    </motion.section>
  );
};

export default Hero;
