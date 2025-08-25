import QuickActions from "./QuickActions";
import Sidebar from "./Sidebar";
import StatsCards from "./Stats";
import WelcomeBanner from "./Welcome";
import NotificationsCommunity from "./Community";

const Dashboard: React.FC = () => {
    return(
        <div>
            <Sidebar />
            <WelcomeBanner />
            <StatsCards />
            <QuickActions />
            <NotificationsCommunity />
        </div>
    )
}

export default Dashboard;
