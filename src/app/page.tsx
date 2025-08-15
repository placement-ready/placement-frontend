import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "@/components/Features";
import Work from "@/components/Work";
import Practice from "@/components/Practice";

export default function Home() {
	return (
		<div>
			<Navbar />
			<Hero />
			<Features />
			<Work />
			<Practice />
			
		</div>
	);
}
