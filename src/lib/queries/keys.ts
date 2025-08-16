// Query keys factory for consistent and type-safe query key management
// This follows the best practices from TanStack Query documentation

import type { PaginationParams } from "@/types/api/common";

// Base query keys
export const queryKeys = {
	// All queries
	all: ["queries"] as const,

	// Auth queries
	auth: () => [...queryKeys.all, "auth"] as const,
	authUser: () => [...queryKeys.auth(), "user"] as const,
	authSession: () => [...queryKeys.auth(), "session"] as const,

	// User queries
	users: () => [...queryKeys.all, "users"] as const,
	usersList: (params?: PaginationParams) => [...queryKeys.users(), "list", params] as const,
	usersDetail: (id: string) => [...queryKeys.users(), "detail", id] as const,
	usersProfile: (id: string) => [...queryKeys.users(), "profile", id] as const,

	// Company queries
	companies: () => [...queryKeys.all, "companies"] as const,
	companiesList: (params?: PaginationParams) => [...queryKeys.companies(), "list", params] as const,
	companiesDetail: (id: string) => [...queryKeys.companies(), "detail", id] as const,

	// Job queries
	jobs: () => [...queryKeys.all, "jobs"] as const,
	jobsList: (params?: PaginationParams) => [...queryKeys.jobs(), "list", params] as const,
	jobsDetail: (id: string) => [...queryKeys.jobs(), "detail", id] as const,
	jobsRecommended: (userId: string) => [...queryKeys.jobs(), "recommended", userId] as const,

	// Application queries
	applications: () => [...queryKeys.all, "applications"] as const,
	applicationsList: (params?: PaginationParams) =>
		[...queryKeys.applications(), "list", params] as const,
	applicationsDetail: (id: string) => [...queryKeys.applications(), "detail", id] as const,
	applicationsByUser: (userId: string, params?: PaginationParams) =>
		[...queryKeys.applications(), "by-user", userId, params] as const,
	applicationsByJob: (jobId: string, params?: PaginationParams) =>
		[...queryKeys.applications(), "by-job", jobId, params] as const,

	// Interview queries
	interviews: () => [...queryKeys.all, "interviews"] as const,
	interviewsList: (params?: PaginationParams) =>
		[...queryKeys.interviews(), "list", params] as const,
	interviewsDetail: (id: string) => [...queryKeys.interviews(), "detail", id] as const,
	interviewsByUser: (userId: string) => [...queryKeys.interviews(), "by-user", userId] as const,

	// Placement queries
	placements: () => [...queryKeys.all, "placements"] as const,
	placementsList: (params?: PaginationParams) =>
		[...queryKeys.placements(), "list", params] as const,
	placementsDetail: (id: string) => [...queryKeys.placements(), "detail", id] as const,
	placementsStats: () => [...queryKeys.placements(), "stats"] as const,

	// Practice queries
	practice: () => [...queryKeys.all, "practice"] as const,
	practiceQuestions: (params?: PaginationParams) =>
		[...queryKeys.practice(), "questions", params] as const,
	practiceQuestion: (id: string) => [...queryKeys.practice(), "question", id] as const,
	practiceTests: (params?: PaginationParams) => [...queryKeys.practice(), "tests", params] as const,
	practiceTest: (id: string) => [...queryKeys.practice(), "test", id] as const,
	practiceResults: (userId: string) => [...queryKeys.practice(), "results", userId] as const,

	// Analytics queries
	analytics: () => [...queryKeys.all, "analytics"] as const,
	analyticsDashboard: (userId?: string) => [...queryKeys.analytics(), "dashboard", userId] as const,
	analyticsReports: (type: string, params?: Record<string, unknown>) =>
		[...queryKeys.analytics(), "reports", type, params] as const,

	// Notification queries
	notifications: () => [...queryKeys.all, "notifications"] as const,
	notificationsList: (userId: string, params?: PaginationParams) =>
		[...queryKeys.notifications(), "list", userId, params] as const,
	notificationsUnread: (userId: string) =>
		[...queryKeys.notifications(), "unread", userId] as const,

	// Settings queries
	settings: () => [...queryKeys.all, "settings"] as const,
	settingsProfile: (userId: string) => [...queryKeys.settings(), "profile", userId] as const,
	settingsPreferences: (userId: string) =>
		[...queryKeys.settings(), "preferences", userId] as const,
} as const;

// Type for query keys
export type QueryKeys = typeof queryKeys;

// Utility function to invalidate related queries
export const getInvalidationKeys = {
	// When user data changes, invalidate user-related queries
	user: (userId: string) => [
		queryKeys.usersDetail(userId),
		queryKeys.usersProfile(userId),
		queryKeys.settingsProfile(userId),
		queryKeys.settingsPreferences(userId),
	],

	// When auth state changes, invalidate auth-related queries
	auth: () => [queryKeys.authUser(), queryKeys.authSession()],

	// When application status changes, invalidate related queries
	application: (applicationId: string, userId: string, jobId: string) => [
		queryKeys.applicationsDetail(applicationId),
		queryKeys.applicationsByUser(userId),
		queryKeys.applicationsByJob(jobId),
		queryKeys.analyticsDashboard(userId),
	],

	// When job data changes, invalidate job-related queries
	job: (jobId: string) => [
		queryKeys.jobsDetail(jobId),
		queryKeys.jobsList(),
		queryKeys.applicationsByJob(jobId),
	],
};
