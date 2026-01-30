'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  FileText,
  MessageSquare,
  Sparkles,
  ArrowRight,
  Loader2,
  Clock,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ResumeBuilderProvider, useResumeBuilder } from '@/providers/ResumeBuilderProvider';
import { useAuth } from '@/providers/AuthProvider';
import { api } from '@/lib/api';

interface Resume {
  id: string;
  sessionId: string;
  title: string;
  status: string;
  progress: number;
  targetRole?: string;
  createdAt: string;
  updatedAt: string;
}

function ResumeBuilderLandingContent() {
  const router = useRouter();
  const { user } = useAuth();
  const { session, isConnected, isLoading, error, startSession } = useResumeBuilder();
  const [recentResumes, setRecentResumes] = useState<Resume[]>([]);
  const [loadingRecent, setLoadingRecent] = useState(true);

  // Fetch recent resumes
  const fetchRecent = useCallback(async () => {
    if (!user?.id) return;
    try {
      const response = await api.get<{ success: boolean; resumes: Resume[] }>(
        '/resume/recent?limit=3',
      );

      if (!response.success) {
        throw new Error('Failed to fetch recent resumes');
      }

      setRecentResumes(response.resumes || []);
    } catch {
      // Silently fail
    } finally {
      setLoadingRecent(false);
    }
  }, [user?.id]);

  useEffect(() => {
    fetchRecent();
  }, [fetchRecent]);

  // Navigate to chat when session starts
  useEffect(() => {
    if (session?.sessionId && !isLoading) {
      // Navigate to chat with the sessionId so it joins the existing session
      router.push(`/dashboard/resume-builder/chat?resumeId=${session.sessionId}`);
    }
  }, [session?.sessionId, isLoading, router]);

  const handleStart = () => {
    startSession();
  };

  const handleResume = () => {
    if (recentResumes.length > 0) {
      router.push(`/dashboard/resume-builder/chat?resumeId=${recentResumes[0].sessionId}`);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      {/* Hero Section */}
      <div className="mb-12 flex flex-col items-center text-center">
        {/* Hero Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="mb-6 rounded-2xl bg-linear-to-br from-emerald-500 to-teal-500 p-5 shadow-lg shadow-emerald-500/20"
        >
          <FileText className="h-12 w-12 text-white" />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-4 text-3xl font-bold text-foreground sm:text-4xl"
        >
          AI Resume Builder
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mb-8 max-w-xl text-lg text-muted-foreground"
        >
          Build your professional resume through a friendly conversation. Our AI assistant will
          guide you step-by-step to create a standout resume.
        </motion.p>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mb-10 grid gap-4 sm:grid-cols-3"
        >
          <FeatureCard
            icon={MessageSquare}
            title="Conversational"
            description="Just chat naturally — no forms to fill"
          />
          <FeatureCard
            icon={Sparkles}
            title="AI-Powered"
            description="Smart guidance at every step"
          />
          <FeatureCard
            icon={FileText}
            title="Structured Output"
            description="Get a professional resume format"
          />
        </motion.div>

        {/* Error */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-4 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-2 text-sm text-destructive"
          >
            {error}
          </motion.div>
        )}

        {/* Connection status */}
        {!isConnected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-4 text-sm text-amber-600 dark:text-amber-400"
          >
            Connecting to server...
          </motion.div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="flex flex-col items-center gap-3 sm:flex-row"
        >
          <>
            <Button
              onClick={handleStart}
              size="lg"
              disabled={!isConnected || isLoading}
              className="bg-linear-to-r from-emerald-600 to-teal-500 text-white shadow-lg hover:shadow-xl"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Starting...
                </>
              ) : (
                <>
                  Build New Resume
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
            {recentResumes.length > 0 && (
              <Button onClick={handleResume} variant="outline" size="lg">
                Resume Last Session
              </Button>
            )}
          </>
        </motion.div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="mt-8 text-sm text-muted-foreground"
        >
          Takes about 5-10 minutes • Your data is saved automatically
        </motion.p>
      </div>

      {/* Recent Resumes Section */}
      {!loadingRecent && recentResumes.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="border-t border-border pt-8"
        >
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Recent Resumes</h2>
            <Link
              href="/dashboard/resumes"
              className="flex items-center gap-1 text-sm text-emerald-600 hover:text-emerald-500"
            >
              View all
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {recentResumes.map((resume) => (
              <Link
                key={resume.id}
                href={`/dashboard/resume-builder/chat?resumeId=${resume.id}`}
                className="group rounded-lg border border-border bg-card p-4 transition-all hover:border-emerald-500/50 hover:shadow-md"
              >
                <h3 className="mb-1 font-medium text-foreground group-hover:text-emerald-600">
                  {resume.title}
                </h3>
                <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{formatDate(resume.updatedAt)}</span>
                  <span className="text-emerald-500">{resume.progress}%</span>
                </div>
                <div className="h-1 overflow-hidden rounded-full bg-muted">
                  <div className="h-full bg-emerald-500" style={{ width: `${resume.progress}%` }} />
                </div>
              </Link>
            ))}
          </div>
        </motion.section>
      )}
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 text-left">
      <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
        <Icon className="h-5 w-5 text-emerald-500" />
      </div>
      <h3 className="mb-1 font-medium text-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

export default function ResumeBuilderPage() {
  return (
    <ResumeBuilderProvider>
      <ResumeBuilderLandingContent />
    </ResumeBuilderProvider>
  );
}
