'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Send,
  Loader2,
  Wifi,
  WifiOff,
  CheckCircle,
  Sparkles,
  FileText,
  ChevronDown,
  ChevronUp,
  Pencil,
  RefreshCw,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  ResumeBuilderProvider,
  useResumeBuilder,
  REQUIRED_SECTIONS,
} from '@/providers/ResumeBuilderProvider';
import { MessageBubble, StreamingBubble } from '@/components/resume-builder/MessageBubble';
import { TypingIndicator } from '@/components/resume-builder/TypingIndicator';
import { ProgressSidebar } from '@/components/resume-builder/ProgressSidebar';

function ResumeChatContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const resumeIdParam = searchParams.get('resumeId');

  const {
    session,
    messages,
    streamingContent,
    isStreaming,
    isConnected,
    isLoading,
    error,
    joinSession,
    sendMessage,
    generateResume,
    refineMode,
    setRefineMode,
    jobDescription,
    setJobDescription,
    updateTitle,
  } = useResumeBuilder();

  const [inputValue, setInputValue] = useState('');
  const [showJDPanel, setShowJDPanel] = useState(false);
  const [localJD, setLocalJD] = useState('');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [wasGenerated, setWasGenerated] = useState(false);
  const [hasEditsSinceGeneration, setHasEditsSinceGeneration] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const sessionStartedRef = useRef(false);

  // Sync local JD with context
  useEffect(() => {
    setLocalJD(jobDescription);
  }, [jobDescription]);

  useEffect(() => {
    if (!session && isConnected && !isLoading && !sessionStartedRef.current) {
      if (!resumeIdParam) {
        router.replace('/dashboard/resume-builder');
        return;
      }
      sessionStartedRef.current = true;
      joinSession(resumeIdParam);
    }
  }, [session, isConnected, isLoading, joinSession, resumeIdParam, router]);

  useEffect(() => {
    if (session?.sessionId && !resumeIdParam) {
      const newUrl = `/dashboard/resume-builder/chat?resumeId=${session.sessionId}`;
      window.history.replaceState({}, '', newUrl);
    }
  }, [session?.sessionId, resumeIdParam]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages]);

  useEffect(() => {
    if (!isStreaming && inputRef.current && document.activeElement !== inputRef.current) {
      const activeTag = document.activeElement?.tagName;
      if (activeTag !== 'INPUT' && activeTag !== 'TEXTAREA' && activeTag !== 'BUTTON') {
        inputRef.current.focus();
      }
    }
  }, [isStreaming]);

  // Track if resume was previously generated (to show regenerate prompt)
  useEffect(() => {
    if (session?.status === 'completed' || session?.status === 'reviewing') {
      setWasGenerated(true);
    }
  }, [session?.status]);

  // Focus title input when editing starts
  useEffect(() => {
    if (isEditingTitle && titleInputRef.current) {
      titleInputRef.current.focus();
      titleInputRef.current.select();
    }
  }, [isEditingTitle]);

  // Handle send message
  const handleSend = () => {
    if (!inputValue.trim() || isStreaming) return;
    sendMessage(inputValue);
    setInputValue('');
    inputRef.current?.focus();
    // Track if edits are made after resume was generated
    if (wasGenerated) {
      setHasEditsSinceGeneration(true);
    }
  };

  // Handle generate and navigate to complete page
  const handleGenerateAndNavigate = () => {
    generateResume();
    setHasEditsSinceGeneration(false);
    // Navigate after a short delay to let generation start
    setTimeout(() => {
      router.push(`/dashboard/resume-builder/complete?resumeId=${session?.sessionId}`);
    }, 500);
  };

  // Handle key press
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Handle JD save
  const handleSaveJD = () => {
    setJobDescription(localJD);
    setShowJDPanel(false);
  };

  // Check if ready to generate
  const isReadyToGenerate =
    session && REQUIRED_SECTIONS.every((s) => session.completedSections.includes(s));

  // Loading state
  if (isLoading && !session) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-emerald-500" />
        <p className="text-muted-foreground">Starting your resume session...</p>
      </div>
    );
  }

  // Error state
  if (error && !session) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <div className="rounded-full bg-destructive/10 p-4">
          <WifiOff className="h-8 w-8 text-destructive" />
        </div>
        <h2 className="text-xl font-semibold text-foreground">Connection Error</h2>
        <p className="text-muted-foreground">{error}</p>
        <Button onClick={() => router.push('/dashboard/resume-builder')}>Go Back</Button>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-6">
      {/* Main Chat Area */}
      <div className="flex flex-1 flex-col overflow-hidden rounded-xl border border-border bg-card">
        {/* Header */}
        <div className="border-b border-border">
          <div className="flex items-center justify-between px-4 py-3">
            <div>
              {/* Editable Title */}
              {isEditingTitle ? (
                <input
                  ref={titleInputRef}
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  onBlur={() => {
                    if (editedTitle.trim() && editedTitle !== session?.title) {
                      updateTitle(editedTitle);
                    }
                    setIsEditingTitle(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      if (editedTitle.trim() && editedTitle !== session?.title) {
                        updateTitle(editedTitle);
                      }
                      setIsEditingTitle(false);
                    } else if (e.key === 'Escape') {
                      setEditedTitle(session?.title || 'Untitled Resume');
                      setIsEditingTitle(false);
                    }
                  }}
                  className="w-full rounded border border-emerald-500 bg-transparent px-1 py-0.5 font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                />
              ) : (
                <button
                  onClick={() => {
                    setEditedTitle(session?.title || 'Untitled Resume');
                    setIsEditingTitle(true);
                  }}
                  className="group flex items-center gap-1.5 font-semibold text-foreground hover:text-emerald-600"
                  title="Click to rename"
                >
                  <span>{session?.title || 'Untitled Resume'}</span>
                  <Pencil className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                </button>
              )}
              <p className="text-sm text-muted-foreground">
                {session ? `Building: ${session.currentSection}` : 'Loading...'}
              </p>
            </div>
            <div className="flex items-center gap-4">
              {/* Refinement Toggle */}
              <button
                onClick={() => setRefineMode(!refineMode)}
                className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${refineMode
                  ? 'bg-emerald-500/10 text-emerald-600 ring-1 ring-emerald-500/30'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                title={refineMode ? 'AI will rewrite for ATS' : 'AI will store as-is'}
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>Refine</span>
              </button>

              {/* JD Toggle */}
              <button
                onClick={() => setShowJDPanel(!showJDPanel)}
                className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${jobDescription
                  ? 'bg-blue-500/10 text-blue-600 ring-1 ring-blue-500/30'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
              >
                <FileText className="h-3.5 w-3.5" />
                <span>JD</span>
                {showJDPanel ? (
                  <ChevronUp className="h-3 w-3" />
                ) : (
                  <ChevronDown className="h-3 w-3" />
                )}
              </button>

              {/* Connection Status */}
              <div className="flex items-center gap-1">
                {isConnected ? (
                  <Wifi className="h-4 w-4 text-emerald-500" />
                ) : (
                  <WifiOff className="h-4 w-4 text-destructive" />
                )}
              </div>
            </div>
          </div>

          {/* Collapsible JD Panel */}
          <AnimatePresence>
            {showJDPanel && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden border-t border-border bg-muted/30"
              >
                <div className="p-4">
                  <label className="mb-2 block text-xs font-medium text-muted-foreground">
                    Target Job Description (optional)
                  </label>
                  <textarea
                    value={localJD}
                    onChange={(e) => setLocalJD(e.target.value)}
                    placeholder="Paste the job description here to tailor your resume..."
                    rows={4}
                    className="w-full resize-none rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                  <div className="mt-2 flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setLocalJD('');
                        setShowJDPanel(false);
                      }}
                    >
                      Clear
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleSaveJD}
                      className="bg-blue-600 text-white hover:bg-blue-500"
                    >
                      Save JD
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="mx-auto max-w-3xl space-y-4">
            <AnimatePresence>
              {messages.map((message, index) => (
                <MessageBubble key={`${message.timestamp.getTime()}-${index}`} message={message} />
              ))}
            </AnimatePresence>

            {/* Streaming bubble */}
            {streamingContent && <StreamingBubble content={streamingContent} />}

            {/* Typing indicator when waiting */}
            {isStreaming && !streamingContent && <TypingIndicator />}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Regenerate Banner - shown when resume was previously generated and user is editing */}
        {wasGenerated && (
          <div className="border-b border-amber-500/30 bg-amber-500/10 px-4 py-2">
            <div className="mx-auto flex max-w-3xl items-center justify-between">
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
                <RefreshCw className="h-4 w-4" />
                <span className="text-sm">
                  {hasEditsSinceGeneration
                    ? "You've made changes. Regenerate to update your resume."
                    : 'This resume was previously generated. Make edits or regenerate.'}
                </span>
              </div>
              <Button
                size="sm"
                onClick={handleGenerateAndNavigate}
                disabled={isLoading}
                className="bg-amber-600 text-white hover:bg-amber-500"
              >
                {hasEditsSinceGeneration ? 'Regenerate' : 'View Resume'}
              </Button>
            </div>
          </div>
        )}

        {/* Generate button when ready */}
        {isReadyToGenerate && !wasGenerated && (
          <div className="border-t border-border bg-emerald-500/5 px-4 py-3">
            <div className="mx-auto flex max-w-3xl items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                <CheckCircle className="h-5 w-5" />
                <span className="text-sm font-medium">All required sections complete!</span>
              </div>
              <Button
                onClick={handleGenerateAndNavigate}
                disabled={isLoading}
                className="bg-emerald-600 text-white hover:bg-emerald-500"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  'Generate My Resume'
                )}
              </Button>
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="border-t border-border p-4">
          <div className="mx-auto max-w-3xl">
            <div className="relative">
              <textarea
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your response..."
                rows={2}
                disabled={isStreaming}
                className="w-full resize-none rounded-xl border border-input bg-background px-4 py-3 pr-12 text-sm placeholder:text-muted-foreground focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 disabled:opacity-50"
              />
              <button
                onClick={handleSend}
                disabled={!inputValue.trim() || isStreaming}
                className="absolute bottom-3 right-3 rounded-lg bg-emerald-500 p-2 text-white transition-colors hover:bg-emerald-400 disabled:opacity-50"
                aria-label="Send message"
              >
                {isStreaming ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </button>
            </div>
            <p className="mt-2 text-center text-xs text-muted-foreground">
              Press Enter to send • Shift+Enter for new line
            </p>
          </div>
        </div>
      </div>

      {/* Progress Sidebar - Desktop only */}
      {session && (
        <ProgressSidebar
          currentSection={session.currentSection}
          completedSections={session.completedSections}
          className="hidden lg:block"
          onSectionClick={(section) => {
            // Prevent sending while AI is still responding
            if (isStreaming) return;

            // Send a message to AI to focus on this section
            const sectionLabels: Record<string, string> = {
              personalInfo: 'personal information',
              summary: 'professional summary',
              experience: 'work experience',
              education: 'education',
              skills: 'skills',
              projects: 'projects',
              certifications: 'certifications',
              languages: 'languages',
              achievements: 'achievements',
            };
            const label = sectionLabels[section] || section;
            sendMessage(`I want to work on my ${label} section.`);
          }}
        />
      )}
    </div>
  );
}

export default function ResumeChatPage() {
  return (
    <ResumeBuilderProvider>
      <ResumeChatContent />
    </ResumeBuilderProvider>
  );
}
