import NextAuth from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import client from "@/lib/db";
import Resend from "next-auth/providers/resend";

export const { handlers, auth, signIn, signOut } = NextAuth({
	adapter: MongoDBAdapter(client),
	providers: [
		Resend({
			apiKey: process.env.RESEND_API_KEY,
			from: process.env.EMAIL_FROM || "",
		}),
	],
});
