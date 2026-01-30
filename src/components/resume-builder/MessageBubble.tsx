'use client';

import { motion } from 'framer-motion';
import type { ChatMessage } from '@/providers/ResumeBuilderProvider';

interface MessageBubbleProps {
  message: ChatMessage;
  isStreaming?: boolean;
}

export function MessageBubble({ message, isStreaming = false }: MessageBubbleProps) {
  const isUser = message.role === 'user';
  const isSystem = message.role === 'system';

  if (isSystem) {
    return (
      <div className="flex justify-center">
        <div className="rounded-lg bg-muted/40 px-4 py-2 text-xs text-muted-foreground">
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.2 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 ${
          isUser ? 'bg-emerald-600 text-white dark:bg-emerald-500' : 'bg-muted/60 text-foreground'
        } ${isStreaming ? 'animate-pulse' : ''}`}
      >
        <p className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</p>
        {!isStreaming && (
          <p className={`mt-1 text-xs ${isUser ? 'text-emerald-100' : 'text-muted-foreground'}`}>
            {message.timestamp.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        )}
      </div>
    </motion.div>
  );
}

interface StreamingBubbleProps {
  content: string;
}

export function StreamingBubble({ content }: StreamingBubbleProps) {
  if (!content) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-start"
    >
      <div className="max-w-[85%] rounded-2xl bg-muted/60 px-4 py-3 text-foreground">
        <p className="whitespace-pre-wrap text-sm leading-relaxed">{content}</p>
        <span className="ml-1 inline-block h-3 w-1 animate-pulse bg-foreground/50" />
      </div>
    </motion.div>
  );
}
