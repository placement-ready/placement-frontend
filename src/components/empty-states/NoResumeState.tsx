import Link from 'next/link';
import { FileText, PenLine } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { EmptyState } from './EmptyState';

interface NoResumeStateProps {
  actionHref?: string;
}

export function NoResumeState({ actionHref = '/dashboard/resume-builder' }: NoResumeStateProps) {
  return (
    <EmptyState
      title="Resume not created yet"
      description="Generate a tailored resume once and reuse it across roles. We will track completion and highlight missing sections here."
      icon={<FileText className="h-5 w-5" />}
      action={
        <Button
          asChild
          variant="outline"
          className="border-slate-300 text-slate-900 dark:border-slate-700 dark:text-slate-100"
        >
          <Link href={actionHref}>
            <PenLine className="mr-2 h-4 w-4" /> Start builder
          </Link>
        </Button>
      }
    />
  );
}
