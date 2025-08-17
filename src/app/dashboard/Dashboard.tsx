import Sidebar from "./Sidebar";
import WelcomeBanner from "./Welcome";

const Dashboard: React.FC = () => {
    return(
        <div>
            <Sidebar />
            <WelcomeBanner />
        </div>
    )
}

export default Dashboard;