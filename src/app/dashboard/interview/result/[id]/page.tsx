'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Trophy,
  Target,
  Lightbulb,
  TrendingUp,
  ChevronRight,
  Loader2,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ArrowLeft,
  Sparkles,
  MessageSquare,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/api';

interface QuestionResult {
  questionIndex: number;
  score: number;
  strengths: string[];
  improvements: string[];
  feedback: string;
}

interface Evaluation {
  overallScore: number;
  summary: string;
  questionResults: QuestionResult[];
  strengths: string[];
  improvements: string[];
  recommendations: string[];
  readinessLevel: 'not-ready' | 'needs-work' | 'almost-ready' | 'ready' | 'exceptional';
  evaluatedAt: string;
}

interface Interview {
  _id: string;
  sessionId: string;
  title: string;
  type: 'behavioral' | 'technical' | 'case-study';
  status: string;
  questions: string[];
  score?: number;
  evaluation?: Evaluation;
  feedback?: {
    strengths: string[];
    improvements: string[];
    tips: string[];
  };
  jobDescription?: string;
  seniorityLevel?: string;
  completedAt?: string;
}

const readinessConfig = {
  'not-ready': {
    label: 'Needs More Practice',
    color: 'text-red-600 dark:text-red-400',
    bg: 'bg-red-100 dark:bg-red-500/20',
    icon: XCircle,
  },
  'needs-work': {
    label: 'Getting There',
    color: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-100 dark:bg-amber-500/20',
    icon: AlertCircle,
  },
  'almost-ready': {
    label: 'Almost Ready',
    color: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-100 dark:bg-blue-500/20',
    icon: TrendingUp,
  },
  ready: {
    label: 'Interview Ready',
    color: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-100 dark:bg-emerald-500/20',
    icon: CheckCircle2,
  },
  exceptional: {
    label: 'Exceptional',
    color: 'text-purple-600 dark:text-purple-400',
    bg: 'bg-purple-100 dark:bg-purple-500/20',
    icon: Trophy,
  },
};

function getScoreColor(score: number): string {
  if (score >= 80) return 'text-emerald-600 dark:text-emerald-400';
  if (score >= 60) return 'text-amber-600 dark:text-amber-400';
  return 'text-red-600 dark:text-red-400';
}

export default function InterviewResultPage() {
  const params = useParams();
  const router = useRouter();
  const sessionId = params.id as string;

  const [interview, setInterview] = useState<Interview | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null);

  const loadInterview = useCallback(async () => {
    try {
      const response = await api.get<{ success: boolean; interview: Interview }>(
        `/interviews/${sessionId}`,
      );
      const interviewData = response.interview;

      if (
        interviewData.status === 'pending-evaluation' ||
        (interviewData.status === 'completed' && !interviewData.evaluation)
      ) {
        const evalResponse = await api.post<{ success: boolean; evaluation: Evaluation }>(
          `/interviews/${interviewData.sessionId}/evaluate`,
        );
        interviewData.evaluation = evalResponse.evaluation;
        interviewData.status = 'evaluated';
      }

      setInterview(interviewData);
    } catch (err) {
      console.error('Failed to load interview:', err);
      setError('Failed to load interview results');
    } finally {
      setIsLoading(false);
    }
  }, [sessionId]);

  useEffect(() => {
    if (sessionId) {
      loadInterview();
    }
  }, [sessionId, loadInterview]);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
      </div>
    );
  }

  if (error || !interview) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <AlertCircle className="h-12 w-12 text-destructive" />
        <h2 className="text-xl font-semibold text-foreground">{error || 'Interview not found'}</h2>
        <Button onClick={() => router.push('/dashboard/interview/new')}>Start New Interview</Button>
      </div>
    );
  }

  // Handle pending evaluation or completed but not yet evaluated
  if (
    interview.status === 'pending-evaluation' ||
    (interview.status === 'completed' && !interview.evaluation)
  ) {
    return (
      <div className="mx-auto max-w-2xl space-y-6 px-4 py-12 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring' }}
          className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-500/20"
        >
          <Loader2 className="h-12 w-12 animate-spin text-amber-600 dark:text-amber-400" />
        </motion.div>
        <h1 className="text-2xl font-bold text-foreground">AI Evaluation in Progress</h1>
        <p className="text-muted-foreground">
          Our AI is analyzing your interview responses. This may take a few moments. Your detailed
          feedback and score will appear here once the evaluation is complete.
        </p>
        <p className="text-sm text-muted-foreground">
          You can leave this page and come back later. We&apos;ll save your results.
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-4">
          <Button variant="outline" onClick={() => router.push('/dashboard')}>
            Back to Dashboard
          </Button>
          <Button
            onClick={() => loadInterview()}
            className="bg-emerald-600 text-white hover:bg-emerald-500"
          >
            Refresh Status
          </Button>
        </div>
      </div>
    );
  }

  const evaluation = interview.evaluation;
  const score = interview.score || evaluation?.overallScore || 0;
  const readiness = evaluation?.readinessLevel || 'needs-work';
  const readinessInfo = readinessConfig[readiness];
  const ReadinessIcon = readinessInfo.icon;

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-6 lg:px-8">
      {/* Back button */}
      <button
        onClick={() => router.push('/dashboard')}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Dashboard
      </button>

      {/* Header Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="overflow-hidden rounded-2xl border border-border bg-linear-to-br from-emerald-50 via-white to-teal-50 dark:from-emerald-900/20 dark:via-card dark:to-teal-900/20"
      >
        <div className="p-6 sm:p-8">
          <div className="flex flex-col items-center text-center">
            {/* Score */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
              className="relative"
            >
              <div className="flex h-28 w-28 items-center justify-center rounded-full bg-white shadow-lg dark:bg-card">
                <div className="text-center">
                  <span className={`text-4xl font-bold ${getScoreColor(score)}`}>{score}</span>
                  <span className="block text-sm text-muted-foreground">/ 100</span>
                </div>
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${readinessInfo.bg} ${readinessInfo.color}`}
                >
                  <ReadinessIcon className="h-3 w-3" />
                  {readinessInfo.label}
                </span>
              </div>
            </motion.div>

            {/* Title */}
            <div className="mt-8">
              <h1 className="text-2xl font-bold text-foreground">{interview.title}</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                {interview.type.charAt(0).toUpperCase() + interview.type.slice(1)} Interview •{' '}
                {interview.questions.length} Questions
              </p>
            </div>

            {/* Summary */}
            {evaluation?.summary && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-4 max-w-2xl text-sm text-muted-foreground"
              >
                {evaluation.summary}
              </motion.p>
            )}
          </div>
        </div>
      </motion.div>

      {/* Feedback Cards */}
      <div className="flex flex-col gap-4">
        {/* Strengths */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-xl border border-emerald-200 bg-emerald-50 p-5 dark:border-emerald-500/30 dark:bg-emerald-500/10"
        >
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
            <Trophy className="h-5 w-5" />
            <h3 className="font-semibold">Strengths</h3>
          </div>
          <ul className="mt-3 space-y-2">
            {(evaluation?.strengths || interview.feedback?.strengths || []).map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Improvements */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-xl border border-amber-200 bg-amber-50 p-5 dark:border-amber-500/30 dark:bg-amber-500/10"
        >
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
            <Target className="h-5 w-5" />
            <h3 className="font-semibold">Areas to Improve</h3>
          </div>
          <ul className="mt-3 space-y-2">
            {(evaluation?.improvements || interview.feedback?.improvements || []).map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-xl border border-blue-200 bg-blue-50 p-5 dark:border-blue-500/30 dark:bg-blue-500/10"
        >
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
            <Lightbulb className="h-5 w-5" />
            <h3 className="font-semibold">Recommendations</h3>
          </div>
          <ul className="mt-3 space-y-2">
            {(evaluation?.recommendations || interview.feedback?.tips || []).map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Per-Question Results */}
      {evaluation?.questionResults && evaluation.questionResults.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="rounded-2xl border border-border bg-card p-6"
        >
          <div className="flex items-center gap-2 text-foreground">
            <MessageSquare className="h-5 w-5" />
            <h3 className="font-semibold">Question-by-Question Breakdown</h3>
          </div>

          <div className="mt-4 space-y-3">
            {evaluation.questionResults.map((result, index) => (
              <div key={index} className="rounded-xl border border-border bg-muted/30">
                <button
                  onClick={() => setExpandedQuestion(expandedQuestion === index ? null : index)}
                  className="flex w-full items-center justify-between p-4 text-left"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex px-2 py-1 items-center justify-center rounded-full text-sm font-bold ${
                        result.score >= 70
                          ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400'
                          : result.score >= 50
                            ? 'bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400'
                            : 'bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400'
                      }`}
                    >
                      {result.score}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        Question {result.questionIndex + 1}
                      </p>
                      <p className="line-clamp-1 text-xs text-muted-foreground">
                        {interview.questions[result.questionIndex]}
                      </p>
                    </div>
                  </div>
                  <ChevronRight
                    className={`h-5 w-5 text-muted-foreground transition-transform ${
                      expandedQuestion === index ? 'rotate-90' : ''
                    }`}
                  />
                </button>

                {expandedQuestion === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border-t border-border px-4 pb-4"
                  >
                    <div className="mt-3 space-y-3">
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                          Full Question
                        </p>
                        <p className="mt-1 text-sm text-foreground">
                          {interview.questions[result.questionIndex]}
                        </p>
                      </div>

                      {result.feedback && (
                        <div>
                          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                            Feedback
                          </p>
                          <p className="mt-1 text-sm text-foreground">{result.feedback}</p>
                        </div>
                      )}

                      <div className="grid gap-3 sm:grid-cols-2">
                        {result.strengths && result.strengths.length > 0 && (
                          <div className="rounded-lg bg-emerald-50 p-3 dark:bg-emerald-500/10">
                            <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                              What you did well
                            </p>
                            <ul className="mt-1 space-y-1">
                              {result.strengths.map((s, i) => (
                                <li key={i} className="text-xs text-foreground/80">
                                  • {s}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {result.improvements && result.improvements.length > 0 && (
                          <div className="rounded-lg bg-amber-50 p-3 dark:bg-amber-500/10">
                            <p className="text-xs font-medium text-amber-600 dark:text-amber-400">
                              Could improve
                            </p>
                            <ul className="mt-1 space-y-1">
                              {result.improvements.map((s, i) => (
                                <li key={i} className="text-xs text-foreground/80">
                                  • {s}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="flex flex-wrap justify-center gap-3 pt-4"
      >
        <Button variant="outline" onClick={() => router.push('/dashboard')}>
          Back to Dashboard
        </Button>
        <Button
          onClick={() => router.push('/dashboard/interview/new')}
          className="bg-emerald-600 text-white hover:bg-emerald-500"
        >
          <Sparkles className="mr-2 h-4 w-4" />
          Start New Interview
        </Button>
      </motion.div>
    </div>
  );
}
