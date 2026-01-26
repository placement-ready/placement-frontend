'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowLeft, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ResumeBuilderProvider, useResumeBuilder } from '@/providers/ResumeBuilderProvider';
import { ResumeDisplay } from '@/components/resume-builder/ResumeDisplay';

function ResumeCompleteContent() {
    const router = useRouter();
    const { session, completedResume, isLoading, startSession } = useResumeBuilder();

    // Redirect if no completed resume
    useEffect(() => {
        if (!completedResume && !isLoading) {
            // Try to load session, might have existing completed resume
            startSession();
        }
    }, [completedResume, isLoading, startSession]);

    // Still loading
    if (isLoading || (!completedResume && session?.status !== 'completed')) {
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
                <p className="text-muted-foreground">Loading your resume...</p>
            </div>
        );
    }

    // No resume yet
    if (!completedResume) {
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
                <div className="rounded-full bg-muted p-4">
                    <Sparkles className="h-8 w-8 text-muted-foreground" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">No Resume Yet</h2>
                <p className="max-w-sm text-muted-foreground">
                    Start building your resume through our AI-powered chat experience.
                </p>
                <Button
                    onClick={() => router.push('/dashboard/resume-builder')}
                    className="bg-emerald-600 text-white hover:bg-emerald-500"
                >
                    Build My Resume
                </Button>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-4xl px-4 py-8">
            {/* Success Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 text-center"
            >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10">
                    <CheckCircle className="h-8 w-8 text-emerald-500" />
                </div>
                <h1 className="mb-2 text-2xl font-bold text-foreground sm:text-3xl">
                    Your Resume is Ready!
                </h1>
                <p className="text-muted-foreground">
                    Here&apos;s your professionally structured resume data.
                </p>
            </motion.div>

            {/* Resume Display */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <ResumeDisplay resume={completedResume} />
            </motion.div>

            {/* Actions */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
            >
                <Button
                    variant="outline"
                    onClick={() => router.push('/dashboard/resume-builder')}
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Resume Builder
                </Button>
            </motion.div>

            {/* Note */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-8 text-center text-sm text-muted-foreground"
            >
                Your resume data has been saved. You can start a new resume anytime.
            </motion.p>
        </div>
    );
}

export default function ResumeCompletePage() {
    return (
        <ResumeBuilderProvider>
            <ResumeCompleteContent />
        </ResumeBuilderProvider>
    );
}
