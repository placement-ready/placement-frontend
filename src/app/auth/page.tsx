"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Page = () => {
	const router = useRouter();

	useEffect(() => {
		// Redirect to login page every time
		router.push("/auth/login");
	}, [router]);

	return null;
};

export default Page;
