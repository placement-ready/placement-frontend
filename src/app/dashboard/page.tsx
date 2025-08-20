import Sidebar from "./Sidebar";
import WelcomeBanner from "./Welcome";

export default function Dashboard() {
    return (
        <div className="flex min-h-screen bg-green-50 font-sans">
            <Sidebar />
            <div className="flex-1">
                <WelcomeBanner />
            </div>
        </div>
    );
}
