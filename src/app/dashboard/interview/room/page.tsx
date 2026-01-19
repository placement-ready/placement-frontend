'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  ChevronRight,
  Check,
  Loader2,
  Wifi,
  WifiOff,
  Trophy,
  Target,
  Lightbulb,
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  ChevronRight,
  Check,
  Loader2,
  Wifi,
  WifiOff,
  Trophy,
  Target,
  Lightbulb,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { InterviewProvider, useInterview, type Message } from '@/providers/InterviewProvider';

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

// Results panel
function ResultsPanel() {
  const { result } = useInterview();
  const router = useRouter();

  if (!result) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="mx-auto max-w-2xl space-y-6 rounded-2xl border border-border bg-card p-8"
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.2 }}
          className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-500/20"
        >
          <Trophy className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />
        </motion.div>
        <h2 className="text-2xl font-bold text-foreground">Interview Complete!</h2>
        <div className="mt-2 flex items-center justify-center gap-2">
          <span className="text-muted-foreground">Your Score:</span>
          <span className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
            {result.score}%
          </span>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl bg-emerald-50 p-4 dark:bg-emerald-500/10">
          <div className="mb-2 flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
            <Trophy className="h-4 w-4" />
            <span className="text-sm font-semibold">Strengths</span>
          </div>
          <ul className="space-y-1">
            {result.feedback.strengths.map((s, i) => (
              <li key={i} className="text-xs text-foreground/80">
                • {s}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl bg-amber-50 p-4 dark:bg-amber-500/10">
          <div className="mb-2 flex items-center gap-2 text-amber-600 dark:text-amber-400">
            <Target className="h-4 w-4" />
            <span className="text-sm font-semibold">Improvements</span>
          </div>
          <ul className="space-y-1">
            {result.feedback.improvements.map((s, i) => (
              <li key={i} className="text-xs text-foreground/80">
                • {s}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl bg-blue-50 p-4 dark:bg-blue-500/10">
          <div className="mb-2 flex items-center gap-2 text-blue-600 dark:text-blue-400">
            <Lightbulb className="h-4 w-4" />
            <span className="text-sm font-semibold">Tips</span>
          </div>
          <ul className="space-y-1">
            {result.feedback.tips.map((s, i) => (
              <li key={i} className="text-xs text-foreground/80">
                • {s}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-3 pt-4">
        <Button variant="outline" onClick={() => router.push('/dashboard')}>
          Back to Dashboard
        </Button>
        <Button
          className="bg-emerald-600 text-white hover:bg-emerald-500"
          onClick={() => router.push('/dashboard/interview/schedule')}
        >
          Practice Again
        </Button>
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

  // Handle send message
  const handleSend = () => {
    if (!inputValue.trim() || isSending) return;
    sendMessage(inputValue);
    setInputValue('');
    inputRef.current?.focus();
  };

  // Handle key press
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
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
        <Button onClick={() => router.push('/dashboard/interview/schedule')}>
          Back to Schedule
        </Button>
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

  // Show results if completed
  if (result) {
    return <ResultsPanel />;
  }

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col">
      {/* Header */}
      <div className="border-b border-border bg-card/50 px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-foreground">{session.title}</h1>
            <p className="text-sm text-muted-foreground">
              Question {session.currentQuestionIndex + 1} of {session.questions.length}
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
          <div className="h-1.5 overflow-hidden rounded-full bg-muted">
            <motion.div
              className="h-full bg-emerald-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
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
          {/* Current question reminder */}
          <div className="mb-3 rounded-lg bg-muted/50 px-3 py-2">
            <p className="text-xs font-medium text-muted-foreground">Current Question:</p>
            <p className="text-sm text-foreground">{currentQuestion}</p>
          </div>

          <div className="flex gap-2">
            <div className="relative flex-1">
              <textarea
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your response..."
                rows={2}
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
          <div className="mt-3 flex flex-wrap gap-2">
            {!isLastQuestion ? (
              <Button
                variant="outline"
                size="sm"
                onClick={nextQuestion}
                disabled={messages.length < 2}
              >
                Next Question
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            ) : (
              <Button
                size="sm"
                onClick={completeInterview}
                className="bg-emerald-600 text-white hover:bg-emerald-500"
              >
                Complete Interview
                <Check className="ml-1 h-4 w-4" />
              </Button>
            )}
          </div>
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
