import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function HomeLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="min-h-screen bg-green-50 font-sans">
			<Navbar />
			<div>{children}</div>
			<Footer />
		</div>
	);
}
