'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FileText, MessageSquare, Sparkles, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ResumeBuilderProvider, useResumeBuilder } from '@/providers/ResumeBuilderProvider';

function ResumeBuilderLandingContent() {
  const router = useRouter();
  const { session, isConnected, isLoading, error, startSession } = useResumeBuilder();
  const [hasExistingSession, setHasExistingSession] = useState(false);

  // Check for existing session on mount
  useEffect(() => {
    if (session && session.status !== 'completed') {
      setHasExistingSession(true);
    }
  }, [session]);

  // Navigate to chat when session starts
  useEffect(() => {
    if (session && !isLoading) {
      router.push('/dashboard/resume-builder/chat');
    }
  }, [session, isLoading, router]);

  const handleStart = () => {
    startSession();
  };

  const handleContinue = () => {
    if (session) {
      router.push('/dashboard/resume-builder/chat');
    }
  };

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-4 py-12 text-center">
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
        Build your professional resume through a friendly conversation. Our AI assistant will guide
        you step-by-step to create a standout resume.
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
      >
        {hasExistingSession ? (
          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <Button
              onClick={handleContinue}
              size="lg"
              className="bg-emerald-600 text-white hover:bg-emerald-500"
            >
              Continue Resume
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              onClick={handleStart}
              variant="outline"
              size="lg"
              disabled={!isConnected || isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Starting...
                </>
              ) : (
                'Start New'
              )}
            </Button>
          </div>
        ) : (
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
                Build My Resume
                <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
        )}
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
