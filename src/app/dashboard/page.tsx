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
import Sidebar from "./Sidebar";
import StatsCards from "./Stats";
import WelcomeBanner from "./Welcome";

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
        </div>
    )
}
>>>>>>> 766a472 (Dashboard in-progress)
