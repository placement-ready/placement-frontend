'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowLeft, Sparkles, Eye, Download, Loader2, FileCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ResumeBuilderProvider, useResumeBuilder } from '@/providers/ResumeBuilderProvider';
import { ResumeDisplay } from '@/components/resume-builder/ResumeDisplay';
import { api, ApiResponse } from '@/lib/api';

function ResumeCompleteContent() {
  const router = useRouter();
  const { session, completedResume, isLoading, startSession } = useResumeBuilder();

  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resumeId = session?.sessionId;

  // Redirect if no completed resume
  useEffect(() => {
    if (!completedResume && !isLoading) {
      startSession();
    }
  }, [completedResume, isLoading, startSession]);

  // Handle Generate
  const handleGenerate = async () => {
    if (!resumeId) return;

    try {
      setIsGenerating(true);
      setError(null);

      const response = await api.post<ApiResponse<string>>('/resume-export/generate', {
        resumeId,
      });

      if (!response.success) {
        throw new Error('Failed to generate resume');
      }

      setIsGenerated(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate');
    } finally {
      setIsGenerating(false);
    }
  };

  // Handle Preview
  const handlePreview = () => {
    if (!resumeId) return;
    window.open(`/resume-export/${resumeId}/preview`, '_blank');
  };

  // Handle Download
  const handleDownload = async () => {
    if (!resumeId) return;

    try {
      setIsDownloading(true);
      setError(null);

      const res = await api.get<Blob>(`/resume-export/${resumeId}/download`);

      if (!res) {
        throw new Error('Failed to download PDF');
      }

      const url = window.URL.createObjectURL(res);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Resume.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to download');
    } finally {
      setIsDownloading(false);
    }
  };

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
          Generate your resume to preview and download it as PDF.
        </p>
      </motion.div>

      {/* Error */}
      {error && (
        <div className="mb-4 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-2 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Actions Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6 flex flex-wrap items-center justify-center gap-3 rounded-lg border border-border bg-card p-4"
      >
        {/* Generate Button */}
        <Button
          onClick={handleGenerate}
          disabled={isGenerating || isGenerated}
          className={
            isGenerated
              ? 'bg-emerald-600 text-white hover:bg-emerald-500'
              : 'bg-emerald-600 text-white hover:bg-emerald-500'
          }
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : isGenerated ? (
            <>
              <FileCheck className="mr-2 h-4 w-4" />
              Generated
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Generate Resume
            </>
          )}
        </Button>

        {/* Preview Button */}
        <Button onClick={handlePreview} variant="outline" disabled={!isGenerated && !resumeId}>
          <Eye className="mr-2 h-4 w-4" />
          Preview
        </Button>

        {/* Download Button */}
        <Button
          onClick={handleDownload}
          variant="outline"
          disabled={isDownloading || (!isGenerated && !resumeId)}
        >
          {isDownloading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Downloading...
            </>
          ) : (
            <>
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </>
          )}
        </Button>
      </motion.div>

      {/* Resume Display */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <ResumeDisplay resume={completedResume} />
      </motion.div>

      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
      >
        <Button variant="outline" onClick={() => router.push('/dashboard/resume-builder')}>
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
        Your resume data has been saved. Preview opens in a new tab.
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
