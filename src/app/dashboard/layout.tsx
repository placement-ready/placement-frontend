import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import Layout from '@/components/dashboard/DashboardLayout';

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = (await cookies()).get('hiremind_session_token')?.value;

  if (!token) {
    redirect('/auth/login');
  }

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans dark:bg-linear-to-br dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <Layout>{children}</Layout>
    </div>
  );
}
