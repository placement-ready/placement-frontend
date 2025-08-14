import Image from "next/image";
import Navbar from "./Navbar";
import Hero from "./Hero";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      {/* You can add more sections or components here as needed */}
    </div>
  );
}
