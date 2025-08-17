import Sidebar from "./Sidebar";
import StatsCards from "./Stats";
import WelcomeBanner from "./Welcome";

const Dashboard: React.FC = () => {
    return(
        <div>
            <Sidebar />
            <WelcomeBanner />
            <StatsCards />
        </div>
    )
}

export default Dashboard;