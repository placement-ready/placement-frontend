'use client';

import { Check, Circle, ArrowRight, MousePointer2 } from 'lucide-react';
import {
  SECTION_ORDER,
  SECTION_LABELS,
  REQUIRED_SECTIONS,
  type ResumeSection,
} from '@/providers/ResumeBuilderProvider';

interface ProgressSidebarProps {
  currentSection: ResumeSection;
  completedSections: ResumeSection[];
  className?: string;
  onSectionClick?: (section: ResumeSection) => void;
}

export function ProgressSidebar({
  currentSection,
  completedSections,
  className = '',
  onSectionClick,
}: ProgressSidebarProps) {
  const handleSectionClick = (section: ResumeSection) => {
    if (onSectionClick) {
      onSectionClick(section);
    }
  };

  return (
    <aside className={`w-64 shrink-0 ${className}`}>
      <div className="rounded-xl border border-border bg-card p-4">
        <h3 className="mb-4 text-sm font-semibold text-foreground">Progress</h3>
        <nav className="space-y-1">
          {SECTION_ORDER.map((section) => {
            const isCompleted = completedSections.includes(section);
            const isCurrent = section === currentSection;
            const isRequired = REQUIRED_SECTIONS.includes(section);
            const isClickable = !!onSectionClick;

            return (
              <button
                key={section}
                onClick={() => handleSectionClick(section)}
                disabled={!isClickable}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all ${
                  isCurrent
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                    : isCompleted
                      ? 'text-muted-foreground hover:bg-muted/50'
                      : 'text-muted-foreground/60 hover:bg-muted/30'
                } ${isClickable ? 'cursor-pointer' : 'cursor-default'}`}
              >
                {/* Status icon */}
                <div className="flex h-5 w-5 shrink-0 items-center justify-center">
                  {isCompleted ? (
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white">
                      <Check className="h-3 w-3" />
                    </div>
                  ) : isCurrent ? (
                    <ArrowRight className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <Circle className="h-4 w-4" />
                  )}
                </div>

                {/* Label */}
                <span className={`flex-1 text-left ${isCurrent ? 'font-medium' : ''}`}>
                  {SECTION_LABELS[section]}
                </span>

                {/* Required badge or click hint */}
                {!isRequired ? (
                  <span className="text-xs text-muted-foreground/50">Optional</span>
                ) : isClickable && !isCurrent ? (
                  <MousePointer2 className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-50" />
                ) : null}
              </button>
            );
          })}
        </nav>

        {/* Completion status */}
        <div className="mt-4 border-t border-border pt-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Completed</span>
            <span className="font-medium text-foreground">
              {completedSections.filter((s) => REQUIRED_SECTIONS.includes(s)).length} /{' '}
              {REQUIRED_SECTIONS.length}
            </span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full bg-emerald-500 transition-all duration-300"
              style={{
                width: `${(completedSections.filter((s) => REQUIRED_SECTIONS.includes(s)).length / REQUIRED_SECTIONS.length) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>
    </aside>
  );
}
