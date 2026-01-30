'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Compass, Home } from 'lucide-react';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background px-4 py-16 text-foreground">
      <div className="mx-auto flex max-w-5xl flex-col gap-10 rounded-3xl border border-border bg-card p-8 shadow-lg md:flex-row dark:shadow-[0_40px_120px_rgba(2,6,23,0.65)]">
        <section className="flex-1 space-y-6">
          <p className="text-xs uppercase tracking-[0.4em] text-emerald-600 dark:text-emerald-300/80">
            Not found
          </p>
          <div>
            <span className="text-7xl font-semibold text-foreground md:text-8xl">404</span>
            <p className="mt-4 text-2xl font-semibold text-foreground">
              We could not find that page.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              The link might be outdated or the page may have moved. Double-check the URL or pick
              one of the next actions to continue working.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500"
            >
              <Home className="h-4 w-4" />
              Back to homepage
            </Link>
            <button
              type="button"
              onClick={() => router.back()}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-border px-5 py-3 text-sm font-semibold text-foreground transition hover:bg-muted"
            >
              <ArrowLeft className="h-4 w-4" />
              Go back
            </button>
          </div>
        </section>

        <section className="flex-1 rounded-2xl border border-border bg-muted/50 p-6">
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            <Compass className="h-4 w-4 text-emerald-600 dark:text-emerald-300" />
            Try this
          </div>
          <div className="mt-4 space-y-4 text-sm text-foreground/80">
            <div className="rounded-2xl border border-border bg-background p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                Search
              </p>
              <p className="mt-2">
                Use the main nav to jump into dashboard, interviews, or resume builder.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-background p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                Shortcut
              </p>
              <p className="mt-2">
                If you saved a link earlier, refresh it from the dashboard quick actions panel.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
