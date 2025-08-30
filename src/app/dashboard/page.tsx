import Banner from "@/components/dashboard/Banner";
import PerformanceCharts from "@/components/dashboard/Chart";
import QuickActions from "@/components/dashboard/QuickActions";
import StatsCards from "@/components/dashboard/Stats";
import NotificationsCommunity from "@/components/dashboard/Community";

export default function Dashboard() {
	return (
		<>
			<Banner />
			<StatsCards />
			<PerformanceCharts />
			<QuickActions />
			<NotificationsCommunity />
		</>
	);
}
