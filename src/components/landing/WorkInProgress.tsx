'use client';

import Link from 'next/link';
import { EasingDefinition, motion } from 'framer-motion';
import { ArrowLeft, Clock3, Hammer, Sparkles } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface WorkInProgressProps {
  title?: string;
  headline?: string;
  description?: string;
  statusLabel?: string;
  eta?: string;
  highlights?: { title: string; description: string }[];
  primaryAction?: { label: string; href: string };
  secondaryAction?: { label: string; href: string };
}

const defaultHighlights = [
  {
    title: 'Experience revamp',
    description: 'New flows for interviews, resume critiques, and mentor feedback.',
  },
  {
    title: 'AI copilots',
    description: 'Context-aware guidance that tracks your prep momentum.',
  },
  {
    title: 'Smarter analytics',
    description: 'Richer dashboards so every practice run has measurable outcomes.',
  },
];

const containerVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as EasingDefinition } },
};

export const WorkInProgress = ({
  title = 'Something new is cooking 🍲',
  headline = 'We are crafting this feature with extra care.',
  description = "We're polishing the next release so it feels fast, thoughtful, and unmistakably HireMind. Thanks for your patience while we finish the last 10% that matters most.",
  statusLabel = 'Under development',
  eta = 'Launching soon',
  highlights = defaultHighlights,
  primaryAction = { label: 'Back to safety', href: '/' },
  secondaryAction = { label: 'Explore dashboard', href: '/dashboard' },
}: WorkInProgressProps) => {
  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center bg-linear-to-b from-slate-50 via-white to-slate-100 px-4 py-24 text-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:text-white">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-300/40 blur-[160px] dark:bg-emerald-500/30" />
        <div className="absolute bottom-0 left-10 h-48 w-48 rounded-full bg-emerald-200/50 blur-[120px] dark:bg-emerald-400/30" />
        <div className="absolute right-6 top-6 h-32 w-32 rounded-full bg-indigo-300/40 blur-[100px] dark:bg-indigo-500/30" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto w-full max-w-3xl space-y-8 rounded-3xl border border-slate-200/60 bg-white/80 p-8 text-center text-slate-900 shadow-[0_20px_80px_rgba(15,23,42,0.2)] backdrop-blur-xl dark:border-white/10 dark:bg-white/10 dark:text-white"
      >
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs uppercase tracking-[0.3em] text-emerald-200">
          <Sparkles className="h-4 w-4" />
          <span>{statusLabel}</span>
          <span className="text-white/40">•</span>
          <Clock3 className="h-4 w-4" />
          <span>{eta}</span>
        </div>

        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-emerald-200">
            {headline}
          </p>
          <h1 className="text-4xl font-semibold leading-tight text-slate-900 dark:text-white sm:text-5xl">
            {title}
          </h1>
          <p className="text-base text-slate-600 dark:text-white/80 sm:text-lg">{description}</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white/70 p-4 text-sm text-slate-700 shadow-inner dark:border-white/20 dark:bg-white/10 dark:text-white/80">
          <div className="flex items-center justify-center gap-3">
            <Hammer className="h-5 w-5 text-emerald-500 dark:text-emerald-300" />
            <span>
              Designing the details, tightening the performance, and taste-testing every interaction
              before serving it live.
            </span>
          </div>
          <div className="mt-4 h-2 w-full rounded-full bg-slate-200/60 dark:bg-white/10">
            <div className="h-2 w-3/4 rounded-full bg-linear-to-r from-emerald-400 via-emerald-300 to-emerald-200 shadow-[0_0_20px_rgba(16,185,129,0.6)]" />
          </div>
          <p className="mt-2 text-xs uppercase tracking-[0.4em] text-slate-500 dark:text-white/60">
            ~75% baked
          </p>
        </div>

        <div className="grid gap-4 text-left sm:grid-cols-3">
          {highlights.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-slate-200/80 bg-white/80 p-4 text-slate-800 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-white"
            >
              <p className="text-xs uppercase tracking-wide text-emerald-600/80 dark:text-emerald-200/90">
                {item.title}
              </p>
              <p className="mt-1 text-sm text-slate-600 dark:text-white/80">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button asChild size="lg" className="gap-2 text-base">
            <Link href={primaryAction.href}>
              <ArrowLeft className="h-4 w-4" />
              {primaryAction.label}
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="gap-2 border border-slate-300 bg-white/80 text-base text-slate-900 hover:border-slate-400 hover:text-slate-900 dark:border-white/30 dark:bg-white/10 dark:text-white dark:hover:border-white/60"
          >
            <Link href={secondaryAction.href}>
              <Sparkles className="h-4 w-4" />
              {secondaryAction.label}
            </Link>
          </Button>
        </div>
      </motion.div>
    </section>
  );
};

export default WorkInProgress;
