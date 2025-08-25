<<<<<<< HEAD
import Banner from "../../components/dashboard/Banner";

export default function Dashboard() {
	return (
		<>
			<Banner />
		</>
	);
}
=======
import PerformanceCharts from "./Chart";
import QuickActions from "./QuickActions";
import Sidebar from "./Sidebar";
import StatsCards from "./Stats";
import WelcomeBanner from "./Welcome";
import NotificationsCommunity from "./Community";

export default function Dashboard() {
    return (
        // <div className="flex min-h-screen">
        //     <Sidebar />
        //     <div className="flex-1">
        //         <WelcomeBanner />
        //     </div>
        // </div>
        <div>
            <WelcomeBanner />
            <StatsCards /> 
            <PerformanceCharts />
            <QuickActions />
            <NotificationsCommunity />
        </div>
    )
}
>>>>>>> 766a472 (Dashboard in-progress)
