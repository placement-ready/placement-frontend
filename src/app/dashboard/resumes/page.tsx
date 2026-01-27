'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Plus,
  Pencil,
  Trash2,
  Eye,
  Download,
  Loader2,
  Check,
  X,
  Clock,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/providers/AuthProvider';
import { api } from '@/lib/api';

interface ResumeResponse {
  success: boolean;
  resumes: Resume[];
}

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

export default function ResumesPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchResumes = useCallback(async () => {
    if (!user?.id) return;

    try {
      setIsLoading(true);
      const response = await api.get<ResumeResponse>('/resume');

      if (!response.success) {
        throw new Error('Failed to fetch resumes');
      }
      setResumes(response.resumes || []);
    } catch {
      setError('Failed to load resumes');
    } finally {
      setIsLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    fetchResumes();
  }, [fetchResumes]);

  const handleRename = async (sessionId: string) => {
    if (!editedTitle.trim()) {
      setEditingId(null);
      return;
    }

    try {
      const response = await api.patch<{ success: boolean; title?: string }>(
        `/resume/${sessionId}/rename`,
        {
          title: editedTitle.trim(),
        },
      );

      if (!response.success) {
        throw new Error('Failed to rename resume');
      }

      setResumes((prev) =>
        prev.map((r) => (r.sessionId === sessionId ? { ...r, title: editedTitle } : r)),
      );
    } catch {
      setError('Failed to rename resume');
    } finally {
      setEditingId(null);
    }
  };

  const handleDelete = async (sessionId: string) => {
    try {
      const response = await api.delete<{ success: boolean }>(`/resume/${sessionId}`);

      if (!response.success) {
        throw new Error('Failed to delete resume');
      }

      setResumes((prev) => prev.filter((r) => r.sessionId !== sessionId));
    } catch {
      setError('Failed to delete resume');
    } finally {
      setDeletingId(null);
    }
  };

  const handleEdit = (sessionId: string) => {
    router.push(`/dashboard/resume-builder/chat?resumeId=${sessionId}`);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-emerald-500/10 text-emerald-600';
      case 'reviewing':
        return 'bg-blue-500/10 text-blue-600';
      default:
        return 'bg-amber-500/10 text-amber-600';
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Resumes</h1>
          <p className="text-muted-foreground">Manage and edit your resumes</p>
        </div>
        <Button
          onClick={() => router.push('/dashboard/resume-builder')}
          className="bg-emerald-600 text-white hover:bg-emerald-500"
        >
          <Plus className="mr-2 h-4 w-4" />
          New Resume
        </Button>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-2 text-sm text-destructive">
          {error}
          <button onClick={() => setError(null)} className="ml-2 underline">
            Dismiss
          </button>
        </div>
      )}

      {/* Empty state */}
      {resumes.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-16"
        >
          <FileText className="mb-4 h-12 w-12 text-muted-foreground" />
          <h2 className="mb-2 text-lg font-medium text-foreground">No resumes yet</h2>
          <p className="mb-4 text-muted-foreground">Create your first resume to get started</p>
          <Button
            onClick={() => router.push('/dashboard/resume-builder')}
            className="bg-emerald-600 text-white hover:bg-emerald-500"
          >
            Create Resume
          </Button>
        </motion.div>
      ) : (
        /* Resume grid */
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {resumes.map((resume, index) => (
              <motion.div
                key={resume.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.05 }}
                className="group relative rounded-xl border border-border bg-card p-4 transition-shadow hover:shadow-lg"
              >
                {/* Delete confirmation overlay */}
                {deletingId === resume.id && (
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-xl bg-background/95 p-4">
                    <p className="mb-4 text-center text-sm text-foreground">Delete this resume?</p>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        onClick={() => handleDelete(resume.sessionId)}
                      >
                        Delete
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setDeletingId(null)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}

                {/* Title */}
                <div className="mb-3">
                  {editingId === resume.id ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleRename(resume.sessionId);
                          if (e.key === 'Escape') setEditingId(null);
                        }}
                        autoFocus
                        className="flex-1 rounded border border-emerald-500 bg-transparent px-2 py-1 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                      />
                      <button
                        onClick={() => handleRename(resume.sessionId)}
                        className="rounded p-1 hover:bg-muted"
                      >
                        <Check className="h-4 w-4 text-emerald-500" />
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="rounded p-1 hover:bg-muted"
                      >
                        <X className="h-4 w-4 text-muted-foreground" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-foreground">{resume.title}</h3>{' '}
                      <button
                        onClick={() => {
                          setEditedTitle(resume.title);
                          setEditingId(resume.id);
                        }}
                        className="rounded p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
                        title="Rename"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Status & Progress */}
                <div className="mb-3 flex items-center gap-2">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize ${getStatusColor(resume.status)}`}
                  >
                    {resume.status === 'gathering' ? 'In Progress' : resume.status}
                  </span>
                  <span className="text-xs text-muted-foreground">{resume.progress}%</span>
                </div>

                {/* Progress bar */}
                <div className="mb-3 h-1.5 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full bg-emerald-500 transition-all"
                    style={{ width: `${resume.progress}%` }}
                  />
                </div>

                {/* Date */}
                <div className="mb-4 flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>Updated {formatDate(resume.updatedAt)}</span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleEdit(resume.sessionId)}
                    className="flex-1"
                  >
                    <Pencil className="mr-1 h-3 w-3" />
                    Edit
                  </Button>
                  <button
                    onClick={() => setDeletingId(resume.id)}
                    className="rounded p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                  <button
                    className="cursor-not-allowed rounded p-2 text-muted-foreground opacity-50"
                    title="Preview (coming soon)"
                    disabled
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button
                    className="cursor-not-allowed rounded p-2 text-muted-foreground opacity-50"
                    title="Download (coming soon)"
                    disabled
                  >
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
