import WorkInProgress from '@/components/landing/WorkInProgress';

const highlights = [
  {
    title: 'Pixel polish',
    description: 'We are refining the micro-interactions so every tap feels intentional.',
  },
  {
    title: 'Guided prep',
    description: 'New interview flows that adapt to your actual progress, not a template.',
  },
  {
    title: 'Team insights',
    description: 'Fresh analytics to translate practice sessions into measurable wins.',
  },
];

export default function WorkInProgressPage() {
  return (
    <WorkInProgress
      title="This feature is almost ready"
      headline="Thanks for stopping by"
      description="We are stitching the final UI, QA-ing the flows, and making sure performance lives up to the hype. Hang tight a little longer."
      statusLabel="In beta"
      eta="ETA: Q1 2026"
      highlights={highlights}
      primaryAction={{ label: 'Return home', href: '/' }}
      secondaryAction={{ label: 'Peek at the dashboard', href: '/dashboard' }}
    />
  );
}
