'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Loader2,
  Sparkles,
  Briefcase,
  GraduationCap,
  Target,
  Code,
  FileText,
  ArrowRight,
  AlertCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/api';

const seniorityLevels = [
  { id: 'junior', label: 'Junior', description: '0-2 years experience' },
  { id: 'mid', label: 'Mid-Level', description: '2-5 years experience' },
  { id: 'senior', label: 'Senior', description: '5-8 years experience' },
  { id: 'lead', label: 'Lead', description: '8+ years, leadership role' },
  { id: 'principal', label: 'Principal', description: 'Staff/Principal level' },
];

const interviewTypes = [
  {
    id: 'behavioral',
    title: 'Behavioral',
    description: 'STAR method, soft skills, and situational questions',
    icon: Target,
    color: 'emerald',
  },
  {
    id: 'technical',
    title: 'Technical',
    description: 'System design, coding practices, and technical depth',
    icon: Code,
    color: 'blue',
  },
  {
    id: 'case-study',
    title: 'Case Study',
    description: 'Problem-solving, analysis, and business scenarios',
    icon: FileText,
    color: 'purple',
  },
];

interface CreateInterviewResponse {
  success: boolean;
  interview: {
    sessionId: string;
    title: string;
    questions: string[];
    aiGenerated: boolean;
  };
  message?: string;
}

export default function NewInterviewPage() {
  const router = useRouter();
  const [jobDescription, setJobDescription] = useState('');
  const [seniorityLevel, setSeniorityLevel] = useState('mid');
  const [interviewType, setInterviewType] = useState('behavioral');
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleStartInterview = async () => {
    if (!jobDescription.trim()) {
      setError('Please enter a job description or role');
      return;
    }

    setIsCreating(true);
    setError(null);

    try {
      // Create interview with AI-generated questions
      const response = await api.post<CreateInterviewResponse>('/interviews', {
        type: interviewType,
        jobDescription: jobDescription.trim(),
        seniorityLevel,
        useAI: true,
        title: `${interviewType.charAt(0).toUpperCase() + interviewType.slice(1)} Interview`,
      });

      if (!response.success || !response.interview?.sessionId) {
        throw new Error(response.message || 'Failed to create interview');
      }

      // Start the interview session
      await api.post(`/interviews/${response.interview.sessionId}/start`);

      // Redirect to interview room
      router.push(`/dashboard/interview/room?session=${response.interview.sessionId}`);
    } catch (err: unknown) {
      console.error('Error creating interview:', err);
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to create interview. Please try again.';
      setError(errorMessage);
      setIsCreating(false);
    }
  };

  const isValid = jobDescription.trim().length >= 20;

  return (
    <div className="min-h-screen pb-16">
      {/* Header */}
      <div className="bg-linear-to-b from-emerald-50/50 via-transparent to-transparent dark:from-emerald-900/10">
        <div className="mx-auto flex max-w-4xl flex-col gap-6 px-4 pb-8 pt-8 sm:px-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300">
              <Sparkles className="h-3 w-3" />
              AI-Powered Interview
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
                Start a New Interview
              </h1>
              <p className="max-w-2xl text-base text-muted-foreground">
                Tell us about the role you&apos;re preparing for, and our AI will generate tailored
                interview questions just for you.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl space-y-6 px-4 sm:px-6">
        {/* Job Description */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-border bg-card p-6 shadow-sm"
        >
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-500/20">
              <Briefcase className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-foreground">Job Description</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Paste the job description or describe the role you&apos;re interviewing for
              </p>
            </div>
          </div>

          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="e.g., Senior Frontend Engineer with 5+ years of React experience. Must have strong TypeScript skills, experience with state management (Redux/Zustand), and familiarity with modern build tools..."
            rows={5}
            className="mt-4 w-full resize-none rounded-xl border border-input bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          />
          <p className="mt-2 text-xs text-muted-foreground">
            {jobDescription.length} characters • Minimum 20 recommended for better questions
          </p>
        </motion.div>

        {/* Seniority Level */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl border border-border bg-card p-6 shadow-sm"
        >
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-500/20">
              <GraduationCap className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Seniority Level</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Questions will be calibrated to your experience level
              </p>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {seniorityLevels.map((level) => (
              <button
                key={level.id}
                onClick={() => setSeniorityLevel(level.id)}
                className={`rounded-xl border px-4 py-2 text-left transition-all ${
                  seniorityLevel === level.id
                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10'
                    : 'border-border hover:border-emerald-200 dark:hover:border-emerald-500/30'
                }`}
              >
                <p className="text-sm font-semibold text-foreground">{level.label}</p>
                <p className="text-xs text-muted-foreground">{level.description}</p>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Interview Type */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl border border-border bg-card p-6 shadow-sm"
        >
          <h2 className="text-lg font-semibold text-foreground">Interview Type</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Choose the type of interview you want to practice
          </p>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {interviewTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setInterviewType(type.id)}
                className={`rounded-xl border p-4 text-left transition-all ${
                  interviewType === type.id
                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10'
                    : 'border-border hover:border-emerald-200 dark:hover:border-emerald-500/30'
                }`}
              >
                <type.icon
                  className={`h-5 w-5 ${
                    interviewType === type.id
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

        {/* Error Display */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/10 p-4"
          >
            <AlertCircle className="h-5 w-5 shrink-0 text-destructive" />
            <p className="text-sm text-destructive">{error}</p>
          </motion.div>
        )}

        {/* Start Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Button
            onClick={handleStartInterview}
            disabled={isCreating || !isValid}
            className="w-full gap-2 rounded-2xl bg-linear-to-r from-emerald-600 to-emerald-500 py-6 text-base font-semibold text-white shadow-lg hover:shadow-xl disabled:opacity-50"
          >
            {isCreating ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Generating Questions...
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5" />
                Start AI Interview
                <ArrowRight className="h-5 w-5" />
              </>
            )}
          </Button>
          {!isValid && (
            <p className="mt-2 text-center text-xs text-muted-foreground">
              Please enter a job description (at least 20 characters)
            </p>
          )}
        </motion.div>

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="rounded-2xl border border-dashed border-border bg-muted/30 p-5 text-center"
        >
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">How it works:</span> Our AI analyzes your
            job description and generates personalized interview questions. Answer each question,
            and receive detailed feedback on your performance.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
