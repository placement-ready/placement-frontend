import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mentorApi } from "../api/mentor";
import { queryKeys } from "./keys";

export const useAskMentor = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (message: string) => mentorApi.askQuestion(message),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.mentors() });
		},
	});
};
