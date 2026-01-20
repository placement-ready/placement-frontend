'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, ChevronRight, Check, Loader2, Wifi, WifiOff, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { InterviewProvider, useInterview, type Message } from '@/providers/InterviewProvider';
import { api } from '@/lib/api';

// Message bubble component
function MessageBubble({ message }: { message: Message }) {
  const isAI = message.role === 'ai';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.2 }}
      className={`flex ${isAI ? 'justify-start' : 'justify-end'}`}
    >
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 ${
          isAI ? 'bg-muted/60 text-foreground' : 'bg-emerald-600 text-white dark:bg-emerald-500'
        }`}
      >
        <p className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</p>
        <p className={`mt-1 text-xs ${isAI ? 'text-muted-foreground' : 'text-emerald-100'}`}>
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>
    </motion.div>
  );
}

// Typing indicator
function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="flex justify-start"
    >
      <div className="rounded-2xl bg-muted/60 px-4 py-3">
        <div className="flex items-center gap-1">
          <motion.span
            className="h-2 w-2 rounded-full bg-muted-foreground"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
          />
          <motion.span
            className="h-2 w-2 rounded-full bg-muted-foreground"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
          />
          <motion.span
            className="h-2 w-2 rounded-full bg-muted-foreground"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
          />
        </div>
      </div>
    </motion.div>
  );
}

// Main interview room content
function InterviewRoomContent() {
  const {
    session,
    messages,
    isConnected,
    isLoading,
    isSending,
    error,
    result,
    currentQuestion,
    isLastQuestion,
    progress,
    joinInterview,
    sendMessage,
    nextQuestion,
    completeInterview,
  } = useInterview();

  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session');

  const [inputValue, setInputValue] = useState('');
  const [hasAnsweredCurrent, setHasAnsweredCurrent] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Join interview on mount
  useEffect(() => {
    if (sessionId && isConnected) {
      joinInterview(sessionId);
    }
  }, [sessionId, isConnected, joinInterview]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Reset hasAnsweredCurrent when question changes
  useEffect(() => {
    if (session) {
      setHasAnsweredCurrent(answeredQuestions.has(session.currentQuestionIndex));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.currentQuestionIndex, answeredQuestions]);

  // Handle send message
  const handleSend = () => {
    if (!inputValue.trim() || isSending) return;
    sendMessage(inputValue);
    setInputValue('');
    setHasAnsweredCurrent(true);
    if (session) {
      setAnsweredQuestions((prev) => new Set(prev).add(session.currentQuestionIndex));
    }
    inputRef.current?.focus();
  };

  // Handle key press
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Handle next question
  const handleNextQuestion = () => {
    if (!hasAnsweredCurrent) return;
    nextQuestion();
  };

  // Handle complete and evaluate
  const handleComplete = async () => {
    if (!sessionId) return;

    setIsEvaluating(true);

    try {
      // First complete the interview via socket
      completeInterview();

      // Then call evaluate API
      await api.post(`/interviews/${sessionId}/evaluate`);

      // Redirect to result page
      router.push(`/dashboard/interview/result/${sessionId}`);
    } catch (err) {
      console.error('Error evaluating interview:', err);
      // Still redirect even if evaluation fails
      router.push(`/dashboard/interview/result/${sessionId}`);
    }
  };

  // Show error state
  if (error && !session) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <div className="rounded-full bg-destructive/10 p-4">
          <WifiOff className="h-8 w-8 text-destructive" />
        </div>
        <h2 className="text-xl font-semibold text-foreground">Connection Error</h2>
        <p className="text-muted-foreground">{error}</p>
        <Button onClick={() => router.push('/dashboard/interview/new')}>Start New Interview</Button>
      </div>
    );
  }

  // Show loading state
  if (isLoading || !session) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-emerald-500" />
        <p className="text-muted-foreground">Connecting to interview...</p>
      </div>
    );
  }

  // Show evaluating state
  if (isEvaluating || result) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
        >
          <Loader2 className="h-12 w-12 text-emerald-500" />
        </motion.div>
        <h2 className="text-xl font-semibold text-foreground">Evaluating Your Performance...</h2>
        <p className="text-muted-foreground">
          Our AI is analyzing your responses and generating detailed feedback
        </p>
      </div>
    );
  }

  const totalQuestions = session.questions.length;
  const currentQuestionNumber = session.currentQuestionIndex + 1;

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col">
      {/* Header */}
      <div className="border-b border-border bg-card/50 px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-foreground">{session.title}</h1>
            <p className="text-sm text-muted-foreground">
              Question {currentQuestionNumber} of {totalQuestions}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              {isConnected ? (
                <Wifi className="h-4 w-4 text-emerald-500" />
              ) : (
                <WifiOff className="h-4 w-4 text-destructive" />
              )}
              <span className="text-xs text-muted-foreground">
                {isConnected ? 'Connected' : 'Disconnected'}
              </span>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-3">
          <div className="h-2 overflow-hidden rounded-full bg-muted">
            <motion.div
              className="h-full bg-emerald-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <div className="mt-1 flex justify-between text-xs text-muted-foreground">
            <span>{answeredQuestions.size} answered</span>
            <span>{totalQuestions - answeredQuestions.size} remaining</span>
          </div>
        </div>
      </div>

      {/* Current Question Card */}
      <div className="border-b border-border bg-linear-to-r from-emerald-50 to-teal-50 px-4 py-4 dark:from-emerald-500/10 dark:to-teal-500/10">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-sm font-bold text-white">
              {currentQuestionNumber}
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
                Current Question
              </p>
              <p className="mt-1 text-base font-medium text-foreground">{currentQuestion}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="mx-auto max-w-3xl space-y-4">
          <AnimatePresence>
            {messages.map((message, index) => (
              <MessageBubble key={`${message.timestamp}-${index}`} message={message} />
            ))}
          </AnimatePresence>

          {isSending && <TypingIndicator />}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-border bg-card/50 p-4">
        <div className="mx-auto max-w-3xl">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <textarea
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={
                  hasAnsweredCurrent
                    ? 'Add more to your answer or proceed to next question...'
                    : 'Type your answer to the question above...'
                }
                rows={3}
                className="w-full resize-none rounded-xl border border-input bg-background px-4 py-3 pr-12 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                disabled={isSending}
              />
              <button
                onClick={handleSend}
                disabled={!inputValue.trim() || isSending}
                className="absolute bottom-3 right-3 rounded-lg bg-emerald-500 p-2 text-white transition-colors hover:bg-emerald-400 disabled:opacity-50"
              >
                {isSending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* Action buttons */}
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <MessageSquare className="h-4 w-4" />
              <span>{messages.filter((m) => m.role === 'user').length} responses</span>
            </div>

            <div className="flex gap-2">
              {!isLastQuestion ? (
                <Button
                  onClick={handleNextQuestion}
                  disabled={!hasAnsweredCurrent}
                  className="bg-emerald-600 text-white hover:bg-emerald-500 disabled:opacity-50"
                >
                  Next Question
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleComplete}
                  disabled={!hasAnsweredCurrent || isEvaluating}
                  className="bg-linear-to-r from-emerald-600 to-teal-500 text-white hover:shadow-lg"
                >
                  {isEvaluating ? (
                    <>
                      <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                      Evaluating...
                    </>
                  ) : (
                    <>
                      Complete Interview
                      <Check className="ml-1 h-4 w-4" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>

          {!hasAnsweredCurrent && (
            <p className="mt-2 text-center text-xs text-amber-600 dark:text-amber-400">
              Please answer the current question before proceeding
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// Wrapper with provider
export default function InterviewRoomPage() {
  return (
    <InterviewProvider>
      <InterviewRoomContent />
    </InterviewProvider>
  );
}
