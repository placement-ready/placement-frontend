'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
  type ReactNode,
} from 'react';
import { useSocket } from '@/hooks/useSocket';
import { useAuth } from './AuthProvider';

// ============================================================
// TYPES
// ============================================================

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

export type ResumeSection =
  | 'personalInfo'
  | 'summary'
  | 'experience'
  | 'education'
  | 'skills'
  | 'projects'
  | 'certifications'
  | 'languages'
  | 'achievements';

export type SessionStatus = 'gathering' | 'reviewing' | 'completed';

export interface ResumeSession {
  sessionId: string;
  status: SessionStatus;
  currentSection: ResumeSection;
  completedSections: ResumeSection[];
  isComplete: boolean;
  refineMode: boolean;
  jobDescription?: string;
  title: string;
}

export interface ResumeListItem {
  sessionId: string;
  title: string;
  status: SessionStatus;
  jobDescription?: string;
  targetRole?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateResumeOptions {
  title?: string;
  jobDescription?: string;
}

export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string | null;
  location: string | null;
  website: string | null;
  linkedin: string | null;
  github: string | null;
}

export interface Experience {
  company: string;
  role: string;
  location: string | null;
  startDate: string;
  endDate: string | null;
  current: boolean;
  description: string;
  highlights: string[];
}

export interface Education {
  institution: string;
  degree: string;
  field: string | null;
  startDate: string | null;
  endDate: string | null;
  gpa: string | null;
  highlights: string[];
}

export interface Project {
  name: string;
  description: string;
  technologies: string[];
  url: string | null;
  highlights: string[];
}

export interface FinalResume {
  personalInfo: PersonalInfo;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: string[];
  projects: Project[];
  certifications: string[];
  languages: string[];
  achievements: string[];
}

interface ResumeBuilderContextValue {
  // State
  session: ResumeSession | null;
  messages: ChatMessage[];
  streamingContent: string;
  isStreaming: boolean;
  isConnected: boolean;
  isLoading: boolean;
  error: string | null;
  completedResume: FinalResume | null;
  refineMode: boolean;
  jobDescription: string;
  resumeList: ResumeListItem[];

  // Actions
  startSession: (options?: CreateResumeOptions) => void;
  joinSession: (sessionId: string) => void;
  sendMessage: (content: string) => void;
  generateResume: () => void;
  leaveSession: () => void;
  setRefineMode: (enabled: boolean) => void;
  setJobDescription: (jd: string) => void;
  fetchResumeList: () => void;
  updateTitle: (title: string) => void;
}

const ResumeBuilderContext = createContext<ResumeBuilderContextValue | null>(null);

// ============================================================
// SECTION METADATA
// ============================================================

export const SECTION_LABELS: Record<ResumeSection, string> = {
  personalInfo: 'Personal Information',
  summary: 'Professional Summary',
  experience: 'Work Experience',
  education: 'Education',
  skills: 'Skills',
  projects: 'Projects',
  certifications: 'Certifications',
  languages: 'Languages',
  achievements: 'Achievements',
};

export const REQUIRED_SECTIONS: ResumeSection[] = [
  'personalInfo',
  'summary',
  'experience',
  'education',
  'skills',
];

export const SECTION_ORDER: ResumeSection[] = [
  'personalInfo',
  'summary',
  'experience',
  'education',
  'skills',
  'projects',
  'certifications',
  'languages',
  'achievements',
];

// ============================================================
// PROVIDER COMPONENT
// ============================================================

interface ResumeBuilderProviderProps {
  children: ReactNode;
}

export function ResumeBuilderProvider({ children }: ResumeBuilderProviderProps) {
  const { isConnected, emit, on, error: socketError } = useSocket();
  const { user } = useAuth();

  // State
  const [session, setSession] = useState<ResumeSession | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [streamingContent, setStreamingContent] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [completedResume, setCompletedResume] = useState<FinalResume | null>(null);
  const [refineMode, setRefineModeState] = useState(false);
  const [jobDescription, setJobDescriptionState] = useState('');
  const [resumeList, setResumeList] = useState<ResumeListItem[]>([]);

  // Ref to track current streaming content for token accumulation
  const streamingRef = useRef('');

  // Set up socket event listeners
  useEffect(() => {
    const cleanups: (() => void)[] = [];

    // Session started or joined
    cleanups.push(
      on<{
        sessionId: string;
        status: SessionStatus;
        currentSection: ResumeSection;
        completedSections: ResumeSection[];
        isComplete: boolean;
        refineMode?: boolean;
        jobDescription?: string;
        title?: string;
        messages: Array<{ role: string; content: string; timestamp: string }>;
      }>('resume:started', (data) => {
        setSession({
          sessionId: data.sessionId,
          status: data.status,
          currentSection: data.currentSection,
          completedSections: data.completedSections,
          isComplete: data.isComplete,
          refineMode: data.refineMode ?? false,
          jobDescription: data.jobDescription,
          title: data.title || 'Untitled Resume',
        });
        setRefineModeState(data.refineMode ?? false);
        setJobDescriptionState(data.jobDescription || '');
        setMessages(
          data.messages.map((m) => ({
            role: m.role as ChatMessage['role'],
            content: m.content,
            timestamp: new Date(m.timestamp),
          })),
        );
        setIsLoading(false);
        setError(null);
      }),
    );

    cleanups.push(
      on<{
        sessionId: string;
        status: SessionStatus;
        currentSection: ResumeSection;
        completedSections: ResumeSection[];
        isComplete: boolean;
        refineMode?: boolean;
        jobDescription?: string;
        title?: string;
        messages: Array<{ role: string; content: string; timestamp: string }>;
      }>('resume:joined', (data) => {
        setSession({
          sessionId: data.sessionId,
          status: data.status,
          currentSection: data.currentSection,
          completedSections: data.completedSections,
          isComplete: data.isComplete,
          refineMode: data.refineMode ?? false,
          jobDescription: data.jobDescription,
          title: data.title || 'Untitled Resume',
        });
        setRefineModeState(data.refineMode ?? false);
        setJobDescriptionState(data.jobDescription || '');
        setMessages(
          data.messages.map((m) => ({
            role: m.role as ChatMessage['role'],
            content: m.content,
            timestamp: new Date(m.timestamp),
          })),
        );
        setIsLoading(false);
        setError(null);
      }),
    );

    // User message broadcast
    cleanups.push(
      on<{ role: string; content: string; timestamp: string }>('resume:userMessage', (data) => {
        setMessages((prev) => [
          ...prev,
          {
            role: data.role as ChatMessage['role'],
            content: data.content,
            timestamp: new Date(data.timestamp),
          },
        ]);
      }),
    );

    // Streaming token
    cleanups.push(
      on<{ token: string }>('resume:token', (data) => {
        setIsStreaming(true);
        streamingRef.current += data.token;
        setStreamingContent(streamingRef.current);
      }),
    );

    // Message complete
    cleanups.push(
      on<{ role: string; content: string; timestamp: string }>('resume:messageComplete', (data) => {
        setIsStreaming(false);
        streamingRef.current = '';
        setStreamingContent('');
        setMessages((prev) => [
          ...prev,
          {
            role: data.role as ChatMessage['role'],
            content: data.content,
            timestamp: new Date(data.timestamp),
          },
        ]);
      }),
    );

    // Session update
    cleanups.push(
      on<{
        status: SessionStatus;
        currentSection: ResumeSection;
        completedSections: ResumeSection[];
        isComplete: boolean;
      }>('resume:sessionUpdate', (data) => {
        setSession((prev) =>
          prev
            ? {
                ...prev,
                status: data.status,
                currentSection: data.currentSection,
                completedSections: data.completedSections,
                isComplete: data.isComplete,
              }
            : null,
        );
      }),
    );

    // Section completed
    cleanups.push(
      on<{
        section: ResumeSection;
        completedSections: ResumeSection[];
        currentSection: ResumeSection;
        isReady: boolean;
      }>('resume:sectionCompleted', (data) => {
        setSession((prev) =>
          prev
            ? {
                ...prev,
                completedSections: data.completedSections,
                currentSection: data.currentSection,
              }
            : null,
        );
      }),
    );

    // Generating status
    cleanups.push(
      on<{ message: string }>('resume:generating', () => {
        setIsLoading(true);
      }),
    );

    // Resume complete
    cleanups.push(
      on<{ sessionId: string; resume: FinalResume; message: string }>('resume:complete', (data) => {
        setCompletedResume(data.resume);
        setSession((prev) => (prev ? { ...prev, status: 'completed', isComplete: true } : null));
        setIsLoading(false);
      }),
    );

    // Error handling
    cleanups.push(
      on<{ message: string }>('resume:error', (data) => {
        setError(data.message);
        setIsLoading(false);
        setIsStreaming(false);
      }),
    );

    // Resume list response
    cleanups.push(
      on<{ resumes: ResumeListItem[] }>('resume:resumeList', (data) => {
        setResumeList(data.resumes);
      }),
    );

    // JD updated response
    cleanups.push(
      on<{ sessionId: string; jobDescription: string }>('resume:jdUpdated', (data) => {
        setJobDescriptionState(data.jobDescription || '');
        setSession((prev) => (prev ? { ...prev, jobDescription: data.jobDescription } : null));
      }),
    );

    // Title updated response
    cleanups.push(
      on<{ sessionId: string; title: string }>('resume:titleUpdated', (data) => {
        setSession((prev) => (prev ? { ...prev, title: data.title } : null));
      }),
    );

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [on]);

  // Actions
  const startSession = useCallback(
    (options?: CreateResumeOptions) => {
      if (!user?.id) {
        setError('Please sign in to build your resume');
        return;
      }
      setIsLoading(true);
      setError(null);
      setMessages([]);
      setCompletedResume(null);
      emit('resume:start', {
        userId: user.id,
        title: options?.title,
        jobDescription: options?.jobDescription,
      });
    },
    [user?.id, emit],
  );

  const joinSession = useCallback(
    (sessionId: string) => {
      setIsLoading(true);
      setError(null);
      emit('resume:start', { userId: user?.id, resumeId: sessionId });
    },
    [emit, user?.id],
  );

  const sendMessage = useCallback(
    (content: string) => {
      if (!session?.sessionId || !content.trim() || isStreaming) return;

      emit('resume:message', {
        sessionId: session.sessionId,
        content: content.trim(),
        refineMode,
      });
    },
    [session, emit, isStreaming, refineMode],
  );

  const generateResume = useCallback(() => {
    if (!session?.sessionId) return;
    setIsLoading(true);
    emit('resume:generate', { sessionId: session.sessionId });
  }, [session, emit]);

  const leaveSession = useCallback(() => {
    if (!session?.sessionId) return;
    emit('resume:leave', { sessionId: session.sessionId });
    setSession(null);
    setMessages([]);
    setCompletedResume(null);
    setStreamingContent('');
    streamingRef.current = '';
  }, [session, emit]);

  const setRefineMode = useCallback((enabled: boolean) => {
    setRefineModeState(enabled);
  }, []);

  const setJobDescription = useCallback(
    (jd: string) => {
      setJobDescriptionState(jd);
      // Also update on backend if session exists
      if (session?.sessionId) {
        emit('resume:updateJD', { sessionId: session.sessionId, jobDescription: jd });
      }
    },
    [session?.sessionId, emit],
  );

  const fetchResumeList = useCallback(() => {
    if (!user?.id) return;
    emit('resume:list', { userId: user.id });
  }, [user?.id, emit]);

  const updateTitle = useCallback(
    (title: string) => {
      if (!session?.sessionId || !title.trim()) return;
      emit('resume:updateTitle', { sessionId: session.sessionId, title: title.trim() });
    },
    [session?.sessionId, emit],
  );

  const value = useMemo<ResumeBuilderContextValue>(
    () => ({
      session,
      messages,
      streamingContent,
      isStreaming,
      isConnected,
      isLoading,
      error: error || socketError,
      completedResume,
      refineMode,
      jobDescription,
      resumeList,
      startSession,
      joinSession,
      sendMessage,
      generateResume,
      leaveSession,
      setRefineMode,
      setJobDescription,
      fetchResumeList,
      updateTitle,
    }),
    [
      session,
      messages,
      streamingContent,
      isStreaming,
      isConnected,
      isLoading,
      error,
      socketError,
      completedResume,
      refineMode,
      jobDescription,
      resumeList,
      startSession,
      joinSession,
      sendMessage,
      generateResume,
      leaveSession,
      setRefineMode,
      setJobDescription,
      fetchResumeList,
      updateTitle,
    ],
  );

  return <ResumeBuilderContext.Provider value={value}>{children}</ResumeBuilderContext.Provider>;
}

export function useResumeBuilder() {
  const context = useContext(ResumeBuilderContext);
  if (!context) {
    throw new Error('useResumeBuilder must be used within a ResumeBuilderProvider');
  }
  return context;
}
