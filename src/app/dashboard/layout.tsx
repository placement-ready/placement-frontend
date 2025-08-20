import Sidebar from "@/components/dashboard/Sidebar";

export default function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="flex min-h-screen bg-green-50 font-sans">
			<Sidebar />
			<div className="flex-1">{children}</div>
		</div>
	);
}
