import Layout from "@/components/dashboard/DashboardLayout";

export default function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="flex min-h-screen bg-green-50 font-sans">
			<Layout>{children}</Layout>
		</div>
	);
}
