'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle, Pencil, Download, Loader2, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ResumeBuilderProvider, useResumeBuilder } from '@/providers/ResumeBuilderProvider';
import { env } from '@/config';
import { api } from '@/lib/api';

function ResumeCompleteContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const resumeIdParam = searchParams.get('resumeId');

  const { session, isLoading, isConnected, joinSession } = useResumeBuilder();
  const joinAttemptedRef = useRef(false);

  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewLoading, setPreviewLoading] = useState(true);

  const resumeId = session?.sessionId || resumeIdParam;
  const previewUrl = resumeId ? `${env.apiUrl}/resume-export/${resumeId}/preview` : null;

  // Join session from URL param if no session loaded yet
  useEffect(() => {
    if (!session && isConnected && !isLoading && !joinAttemptedRef.current) {
      if (!resumeIdParam) {
        router.replace('/dashboard/resume-builder');
        return;
      }
      joinAttemptedRef.current = true;
      joinSession(resumeIdParam);
    }
  }, [session, isConnected, isLoading, resumeIdParam, joinSession, router]);

  // Handle Edit - go back to chat
  const handleEdit = () => {
    if (!resumeId) return;
    router.push(`/dashboard/resume-builder/chat?resumeId=${resumeId}`);
  };

  // Handle Download
  const handleDownload = async () => {
    if (!resumeId) return;

    try {
      setIsDownloading(true);
      setError(null);

      const blob = await api.getBlob(`/resume-export/${resumeId}/download`);

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${session?.title || 'Resume'}.pdf`;
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

  // Still loading or connecting
  if (isLoading || !isConnected || (!session && resumeIdParam)) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
        <p className="text-muted-foreground">Loading your resume...</p>
      </div>
    );
  }

  // No resumeId available
  if (!resumeId) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
        <div className="rounded-full bg-muted p-4">
          <FileText className="h-8 w-8 text-muted-foreground" />
        </div>
        <h2 className="text-xl font-semibold text-foreground">Resume Not Found</h2>
        <p className="max-w-sm text-muted-foreground">
          We couldn&apos;t find your resume. Please go back and try again.
        </p>
        <Button
          onClick={() => router.push('/dashboard/resume-builder')}
          className="bg-emerald-600 text-white hover:bg-emerald-500"
        >
          Go to Resume Builder
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-6">
      {/* Success Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 text-center"
      >
        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10">
          <CheckCircle className="h-7 w-7 text-emerald-500" />
        </div>
        <h1 className="mb-1 text-2xl font-bold text-foreground">
          {session?.title || 'Your Resume is Ready!'}
        </h1>
        <p className="text-sm text-muted-foreground">
          Preview your resume below, then download or edit as needed.
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
        className="mb-4 flex flex-wrap items-center justify-center gap-3"
      >
        {/* Edit Button */}
        <Button onClick={handleEdit} variant="outline">
          <Pencil className="mr-2 h-4 w-4" />
          Edit Resume
        </Button>

        {/* Download Button */}
        <Button
          onClick={handleDownload}
          disabled={isDownloading}
          className="bg-emerald-600 text-white hover:bg-emerald-500"
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

      {/* Embedded PDF Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative overflow-hidden rounded-xl border border-border bg-card shadow-lg"
      >
        {previewLoading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-card">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
              <p className="text-sm text-muted-foreground">Loading preview...</p>
            </div>
          </div>
        )}
        {previewUrl && (
          <iframe
            src={previewUrl}
            className="h-[75vh] w-full"
            title="Resume Preview"
            onLoad={() => setPreviewLoading(false)}
            onError={() => {
              setPreviewLoading(false);
              setError('Failed to load preview. Try downloading instead.');
            }}
          />
        )}
      </motion.div>

      {/* Footer Note */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-4 text-center text-xs text-muted-foreground"
      >
        Your resume data is saved. You can return to edit anytime.
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
