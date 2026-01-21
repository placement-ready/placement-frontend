'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function InterviewHubPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to new interview page
    router.replace('/dashboard/interview/new');
  }, [router]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
      <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
      <p className="text-muted-foreground">Redirecting to interview setup...</p>
    </div>
  );
}
