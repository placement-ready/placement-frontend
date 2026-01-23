import Layout from '@/components/dashboard/DashboardLayout';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen bg-slate-50 font-sans dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <Layout>{children}</Layout>
    </div>
  );
}
