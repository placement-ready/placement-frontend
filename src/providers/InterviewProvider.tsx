'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from 'react';
import { useSocket } from '@/hooks/useSocket';

export interface Message {
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

export interface InterviewSession {
  sessionId: string;
  title: string;
  type: 'behavioral' | 'technical' | 'case-study';
  status: 'pending' | 'in-progress' | 'completed';
  questions: string[];
  currentQuestionIndex: number;
}

export interface InterviewFeedback {
  strengths: string[];
  improvements: string[];
  tips: string[];
}

export interface InterviewResult {
  score: number;
  feedback: InterviewFeedback;
  completedAt: Date;
}

interface InterviewContextValue {
  // State
  session: InterviewSession | null;
  messages: Message[];
  isConnected: boolean;
  isLoading: boolean;
  isSending: boolean;
  error: string | null;
  result: InterviewResult | null;

  // Computed
  currentQuestion: string;
  isLastQuestion: boolean;
  progress: number;

  // Actions
  joinInterview: (sessionId: string) => void;
  sendMessage: (content: string) => void;
  nextQuestion: () => void;
  completeInterview: () => void;
  leaveInterview: () => void;
}

const InterviewContext = createContext<InterviewContextValue | null>(null);

interface InterviewProviderProps {
  children: ReactNode;
}

export function InterviewProvider({ children }: InterviewProviderProps) {
  const { isConnected, emit, on, error: socketError } = useSocket();

  const [session, setSession] = useState<InterviewSession | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<InterviewResult | null>(null);

  // Set up socket listeners
  useEffect(() => {
    const cleanups: (() => void)[] = [];

    // Joined interview successfully
    cleanups.push(
      on<{
        sessionId: string;
        status: string;
        messages: Message[];
        questions: string[];
        currentQuestionIndex: number;
        title: string;
        type: string;
      }>('interview:joined', (data) => {
        setSession({
          sessionId: data.sessionId,
          title: data.title,
          type: data.type as InterviewSession['type'],
          status: data.status as InterviewSession['status'],
          questions: data.questions,
          currentQuestionIndex: data.currentQuestionIndex,
        });
        setMessages(
          data.messages.map((m) => ({
            ...m,
            timestamp: new Date(m.timestamp),
          })),
        );
        setIsLoading(false);
        setError(null);
      }),
    );

    // New message received
    cleanups.push(
      on<Message>('interview:message', (message) => {
        setMessages((prev) => [...prev, { ...message, timestamp: new Date(message.timestamp) }]);
        setIsSending(false);
      }),
    );

    // Question changed
    cleanups.push(
      on<{
        currentQuestionIndex: number;
        question: string;
        isLastQuestion: boolean;
      }>('interview:questionChanged', (data) => {
        setSession((prev) =>
          prev ? { ...prev, currentQuestionIndex: data.currentQuestionIndex } : null,
        );
      }),
    );

    // Interview completed
    cleanups.push(
      on<InterviewResult>('interview:completed', (data) => {
        setResult({
          score: data.score,
          feedback: data.feedback,
          completedAt: new Date(data.completedAt),
        });
        setSession((prev) => (prev ? { ...prev, status: 'completed' } : null));
      }),
    );

    // Last question notification
    cleanups.push(
      on<{ message: string }>('interview:lastQuestion', (data) => {
        // Add a system message about last question
        setMessages((prev) => [
          ...prev,
          {
            role: 'ai',
            content: data.message,
            timestamp: new Date(),
          },
        ]);
      }),
    );

    // Error handling
    cleanups.push(
      on<{ message: string }>('interview:error', (data) => {
        setError(data.message);
        setIsLoading(false);
        setIsSending(false);
      }),
    );

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [on]);

  // Actions
  const joinInterview = useCallback(
    (sessionId: string) => {
      setIsLoading(true);
      setError(null);
      setMessages([]);
      setResult(null);
      emit('interview:join', sessionId);
    },
    [emit],
  );

  const sendMessage = useCallback(
    (content: string) => {
      if (!session?.sessionId || !content.trim()) return;

      setIsSending(true);

      // Optimistically add message
      const userMessage: Message = {
        role: 'user',
        content: content.trim(),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMessage]);

      emit('interview:message', {
        sessionId: session.sessionId,
        content: content.trim(),
      });
    },
    [session, emit],
  );

  const nextQuestion = useCallback(() => {
    if (!session?.sessionId) return;
    emit('interview:next', session.sessionId);
  }, [session, emit]);

  const completeInterview = useCallback(() => {
    if (!session?.sessionId) return;
    emit('interview:complete', session.sessionId);
  }, [session, emit]);

  const leaveInterview = useCallback(() => {
    if (!session?.sessionId) return;
    emit('interview:leave', session.sessionId);
    setSession(null);
    setMessages([]);
    setResult(null);
  }, [session, emit]);

  // Computed values
  const currentQuestion = useMemo(() => {
    if (!session) return '';
    return session.questions[session.currentQuestionIndex] || '';
  }, [session]);

  const isLastQuestion = useMemo(() => {
    if (!session) return false;
    return session.currentQuestionIndex >= session.questions.length - 1;
  }, [session]);

  const progress = useMemo(() => {
    if (!session) return 0;
    return ((session.currentQuestionIndex + 1) / session.questions.length) * 100;
  }, [session]);

  const value = useMemo<InterviewContextValue>(
    () => ({
      session,
      messages,
      isConnected,
      isLoading,
      isSending,
      error: error || socketError,
      result,
      currentQuestion,
      isLastQuestion,
      progress,
      joinInterview,
      sendMessage,
      nextQuestion,
      completeInterview,
      leaveInterview,
    }),
    [
      session,
      messages,
      isConnected,
      isLoading,
      isSending,
      error,
      socketError,
      result,
      currentQuestion,
      isLastQuestion,
      progress,
      joinInterview,
      sendMessage,
      nextQuestion,
      completeInterview,
      leaveInterview,
    ],
  );

  return <InterviewContext.Provider value={value}>{children}</InterviewContext.Provider>;
}

export function useInterview() {
  const context = useContext(InterviewContext);
  if (!context) {
    throw new Error('useInterview must be used within an InterviewProvider');
  }
  return context;
}
