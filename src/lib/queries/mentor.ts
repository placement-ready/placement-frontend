import { useMutation } from "@tanstack/react-query";
import { mentorApi } from "../api/mentor";

export const useAskMentor = () => {
	return useMutation({
		mutationFn: (message: string) => mentorApi.askQuestion(message),
	});
};
