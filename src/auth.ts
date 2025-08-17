import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

export const { handlers, auth, signIn, signOut } = NextAuth({
	providers: [
		Google({
			clientId: process.env.AUTH_GOOGLE_ID || "",
			clientSecret: process.env.AUTH_GOOGLE_SECRET || "",
			authorization: {
				params: {
					access_type: "offline",
					response_type: "code",
				},
			},
		}),
		Credentials({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "email", placeholder: "you@example.com" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				try {
					const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							email: credentials?.email,
							password: credentials?.password,
						}),
					});

					if (!response.ok) {
						throw new Error("Invalid email or password");
					}

					const user = await response.json();
					return user;
				} catch (error) {
					console.error("Error during credentials authorization:", error);
					throw new Error("Failed to authorize with credentials");
				}
			},
		}),
	],
	session: {
		strategy: "jwt",
	},
	pages: {
		signIn: "/auth/signin",
		signOut: "/",
		error: "/auth/error",
	},
	callbacks: {
		async jwt({ token, account, profile, user }) {
			if (account && profile) {
				console.log("JWT Callback - Token:", token);
				console.log("JWT Callback - Account:", account);
				console.log("JWT Callback - Profile:", profile);
				console.log("JWT Callback - User:", user);
				token.accessToken = account.access_token;
				token.refreshToken = account.refresh_token;
				token.id = profile.sub;
			}
			return token;
		},
		async session({ session, token }) {
			session.user.id = token.id as string;
			return session;
		},
	},
	events: {
		async signIn({ user, account, profile }) {
			if (account?.provider !== "google") return;
			try {
				await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						email: user.email,
						name: user.name,
						image: user.image,
						accessToken: account.access_token,
						refreshToken: account.refresh_token,
						provider: account.provider,
						providerId: account.providerAccountId,
						emailVerified: profile?.emailVerified,
					}),
				});
			} catch (error) {
				console.error("Error storing user:", error);
			}
		},
		// async session({ session }) {
		// 	try {
		// 		// Update last login every time session is created
		// 		if (session.user?.email) {
		// 			await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/update-last-login`, {
		// 				method: "POST",
		// 				headers: { "Content-Type": "application/json" },
		// 				body: JSON.stringify({
		// 					email: session.user.email,
		// 					lastLoginAt: new Date().toISOString(),
		// 				}),
		// 			});
		// 		}
		// 	} catch (err) {
		// 		console.error("Error updating last login:", err);
		// 	}
		// },
	},
	secret: process.env.AUTH_SECRET,
});
