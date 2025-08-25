import Banner from "../../components/dashboard/Banner";
import PerformanceCharts from "./Chart";
import QuickActions from "./QuickActions";
import StatsCards from "./Stats";
import NotificationsCommunity from "./Community";

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
