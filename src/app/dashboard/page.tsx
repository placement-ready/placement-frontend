import Sidebar from "./Sidebar";
import WelcomeBanner from "./Welcome";

export default function Dashboard() {
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1">
                <WelcomeBanner />
            </div>
        </div>
    )
}