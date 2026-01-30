'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Loader2, Sparkles, Calendar, Clock, Target } from 'lucide-react';
import { env } from '@/config';

const steps = [
  { label: 'Choose Type', detail: 'Select your interview focus.' },
  { label: 'Set Duration', detail: 'Pick how long you want to practice.' },
  { label: 'Start Session', detail: 'Jump into your AI-powered interview.' },
];

const interviewTypes = [
  {
    id: 'behavioral',
    title: 'Behavioral',
    description: 'Practice STAR method responses and soft skills questions.',
    icon: Target,
  },
  {
    id: 'technical',
    title: 'Technical',
    description: 'System design, debugging, and technical communication.',
    icon: Sparkles,
  },
  {
    id: 'case-study',
    title: 'Case Study',
    description: 'Business analysis and problem-solving scenarios.',
    icon: Calendar,
  },
];

const durations = [
  { value: 15, label: '15 min', description: 'Quick practice' },
  { value: 30, label: '30 min', description: 'Standard session' },
  { value: 45, label: '45 min', description: 'Deep dive' },
];

const focusTips = [
  'Use a quiet space with reliable internet.',
  'Have your resume and role description nearby.',
  'Keep answers concise and structured.',
];

export default function ScheduleInterview() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState('behavioral');
  const [selectedDuration, setSelectedDuration] = useState(30);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleStartInterview = async () => {
    setIsCreating(true);
    setError(null);

    try {
      const response = await fetch(`${env.apiUrl}/interviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          type: selectedType,
          duration: selectedDuration,
          title: `${selectedType.charAt(0).toUpperCase() + selectedType.slice(1)} Interview Practice`,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create interview');
      }

      // Start the interview session
      const startResponse = await fetch(
        `${env.apiUrl}/interviews/${data.interview.sessionId}/start`,
        {
          method: 'POST',
          credentials: 'include',
        },
      );

      if (!startResponse.ok) {
        const startData = await startResponse.json();
        throw new Error(startData.message || 'Failed to start interview');
      }

      // Redirect to interview room
      router.push(`/dashboard/interview/room?session=${data.interview.sessionId}`);
    } catch (err: unknown) {
      console.error('Error creating interview:', err);
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to create interview. Please try again.';
      setError(errorMessage);
      setIsCreating(false);
    }
  };

  return (
    <div className="min-h-screen pb-16">
      <div className="bg-linear-to-b from-emerald-50/50 via-transparent to-transparent dark:from-emerald-900/10">
        <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 pb-10 pt-8 sm:px-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
              Interview Setup
            </div>
            <div className="space-y-3">
              <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
                Start a practice session
              </h1>
              <p className="max-w-2xl text-base text-muted-foreground">
                Choose your interview type and duration. Our AI interviewer will guide you through
                realistic questions and provide instant feedback.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-5xl gap-6 px-4 sm:px-6 lg:grid-cols-[1.7fr_1fr]">
        {/* Main Form Column */}

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-border bg-card p-6 shadow-sm"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Step 1 of 2
                </p>
                <h2 className="mt-1 text-xl font-semibold text-foreground">
                  Choose interview type
                </h2>
                <h2 className="mt-1 text-xl font-semibold text-foreground">
                  Choose interview type
                </h2>
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {interviewTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`rounded-xl border p-4 text-left transition-all ${
                    selectedType === type.id
                      ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10'
                      : 'border-border hover:border-emerald-200 dark:hover:border-emerald-500/30'
                  }`}
                >
                  <type.icon
                    className={`h-5 w-5 ${
                      selectedType === type.id
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : 'text-muted-foreground'
                    }`}
                  />
                  <p className="mt-2 font-semibold text-foreground">{type.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{type.description}</p>
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl border border-border bg-card p-6 shadow-sm"
          >
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Step 2 of 2
              </p>
              <h2 className="mt-1 text-xl font-semibold text-foreground">Select duration</h2>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {durations.map((duration) => (
                <button
                  key={duration.value}
                  onClick={() => setSelectedDuration(duration.value)}
                  className={`rounded-xl border p-4 text-left transition-all ${
                    selectedDuration === duration.value
                      ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10'
                      : 'border-border hover:border-emerald-200 dark:hover:border-emerald-500/30'
                  }`}
                >
                  <Clock
                    className={`h-5 w-5 ${
                      selectedDuration === duration.value
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : 'text-muted-foreground'
                    }`}
                  />
                  <p className="mt-2 font-semibold text-foreground">{duration.label}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{duration.description}</p>
                </button>
              ))}
            </div>
          </motion.div>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive"
            >
              {error}
            </motion.div>
          )}

          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={handleStartInterview}
            disabled={isCreating || !selectedType || !selectedDuration}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-emerald-600 to-emerald-500 px-6 py-4 text-center text-sm font-semibold uppercase tracking-wide text-white transition hover:shadow-lg focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isCreating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Creating Session...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Start Interview Now
              </>
            )}
          </motion.button>
        </div>

        {/* Secondary Column */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-emerald-200 bg-linear-to-b from-emerald-50 to-transparent p-5 dark:border-emerald-500/20 dark:from-emerald-500/10">
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              How it works
            </p>
            <ul className="mt-4 space-y-4">
              {steps.map((step, index) => (
                <li key={step.label} className="flex gap-4">
                  <div className="relative flex flex-col items-center">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full border border-emerald-400/60 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300">
                      {index + 1}
                    </span>
                    {index !== steps.length - 1 && (
                      <span className="my-1 h-6 w-px bg-emerald-200 dark:bg-emerald-500/30" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{step.label}</p>
                    <p className="text-xs text-muted-foreground">{step.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Focus tips
            </p>
            <ul className="mt-4 space-y-3 text-sm text-foreground/80">
              {focusTips.map((tip) => (
                <li key={tip} className="flex items-start gap-3">
                  <span className="mt-1.5 inline-flex h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-border bg-muted/30 p-5 text-sm">
            <p className="font-semibold text-foreground">Need a specific focus?</p>
            <p className="mt-2 text-muted-foreground">
              After completing a few sessions, we&apos;ll personalize your practice based on areas
              that need improvement.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
