import { api } from "./client";

export const mentorApi = {
	// ask mentor a question
	askQuestion: (message: string) => api.post(`/mentor`, { message }),
};
