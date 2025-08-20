// Query keys for consistent key management
export const queryKeys = {
	// Auth
	auth: () => ["auth"] as const,
	authUser: () => ["auth", "user"] as const,

	// Users
	users: () => ["users"] as const,
	user: (id: string) => ["users", id] as const,
	profile: () => ["users", "profile"] as const,
	userProfile: (id: string) => ["users", id, "profile"] as const,

	// Companies
	companies: () => ["companies"] as const,
	company: (id: string) => ["companies", id] as const,

	// Jobs
	jobs: () => ["jobs"] as const,
	job: (id: string) => ["jobs", id] as const,
	jobsRecommended: (userId: string) => ["jobs", "recommended", userId] as const,

	// Applications
	applications: () => ["applications"] as const,
	application: (id: string) => ["applications", id] as const,
	applicationsByUser: (userId: string) => ["applications", "user", userId] as const,
	applicationsByJob: (jobId: string) => ["applications", "job", jobId] as const,

	// Placements
	placements: () => ["placements"] as const,
	placement: (id: string) => ["placements", id] as const,

	// Practice
	practice: () => ["practice"] as const,
	practiceQuestions: () => ["practice", "questions"] as const,
	practiceQuestion: (id: string) => ["practice", "questions", id] as const,
	practiceTests: () => ["practice", "tests"] as const,
	practiceTest: (id: string) => ["practice", "tests", id] as const,

	// Analytics
	analytics: () => ["analytics"] as const,
	analyticsDashboard: (userId?: string) => ["analytics", "dashboard", userId] as const,

	// Notifications
	notifications: (userId: string) => ["notifications", userId] as const,
	notificationsUnread: (userId: string) => ["notifications", userId, "unread"] as const,

	// Settings
	settings: (userId: string) => ["settings", userId] as const,
};
