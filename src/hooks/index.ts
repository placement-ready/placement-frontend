// Export all auth-related hooks for easy importing
export { useAuth } from "./useAuth";
export { useAuthState } from "./useAuthState";
export {
	useRequireAuth,
	useRedirectIfAuthenticated,
	useRequireRole,
	useRequireAdmin,
	useRequireStudent,
	useRequireRecruiter,
} from "./useAuthGuards";
