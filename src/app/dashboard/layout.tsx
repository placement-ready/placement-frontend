import Sidebar from "@/components/dashboard/Sidebar";
import menuItems from "@/components/dashboard/MenuItems";

export default function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="flex min-h-screen bg-green-50 font-sans">
			<Sidebar config={menuItems} />
			<div className="flex-1">{children}</div>
		</div>
	);
}
