"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, Plus } from "lucide-react";
import { useAskMentor } from "@/lib/queries/mentor";

type MentorCategory = "guidance" | "feedback" | "knowledge";

interface Message {
	id: string;
	text: string;
	isBot: boolean;
	timestamp: Date;
	category?: MentorCategory;
}

const quickActions = [
	{ text: "Help me set career goals", category: "guidance" as const },
	{ text: "Feedback to improve skills", category: "feedback" as const },
	{ text: "Industry insights and trends", category: "knowledge" as const },
];

const MentorChatbot: React.FC = () => {
	const [messages, setMessages] = useState<Message[]>([]);
	const [inputValue, setInputValue] = useState("");
	const [isTyping, setIsTyping] = useState(false);
	const messageEndRef = useRef<HTMLDivElement>(null);
	const askMentor = useAskMentor();

	useEffect(() => {
		if (messageEndRef.current) messageEndRef.current.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	// Send a text message
	const handleSendMessage = async (text?: string, category?: Message["category"]) => {
		const messageText = text || inputValue.trim();
		if (!messageText) return;

		// Display user message
		setMessages((prev) => [
			...prev,
			{
				id: Date.now().toString(),
				text: messageText,
				isBot: false,
				timestamp: new Date(),
				category,
			},
		]);
		setInputValue("");
		setIsTyping(true);

		try {
			const response = await askMentor.mutateAsync(messageText);
			console.log("Response from mentor:", response);

			setMessages((prev) => [
				...prev,
				{
					id: (Date.now() + 1).toString(),
					text: response as string,
					isBot: true,
					timestamp: new Date(),
					category: category || "guidance",
				},
			]);
		} catch {
			setMessages((prev) => [
				...prev,
				{
					id: (Date.now() + 1).toString(),
					text: "I apologize, but I encountered an issue. Please try again later.",
					isBot: true,
					timestamp: new Date(),
					category: category || "guidance",
				},
			]);
		} finally {
			setIsTyping(false);
		}
	};

	return (
		<div className="min-h-screen bg-green-50 flex flex-col max-w-4xl mx-auto relative px-4 sm:px-6">
			{/* Mentor Card */}
			<div className="bg-white shadow rounded-xl flex items-center px-4 sm:px-6 py-4 my-4">
				<Bot className="w-8 h-8 sm:w-10 sm:h-10 text-green-600 bg-green-100 rounded-full p-2 mr-3 sm:mr-4 flex-shrink-0" />
				<div className="min-w-0 flex-1">
					<h2 className="font-semibold text-lg sm:text-xl text-green-800 truncate">
						HireMind AI Mentor
					</h2>
					<p className="text-xs sm:text-sm text-gray-600">
						Active now – Upload files or ask anything!
					</p>
				</div>
			</div>

			{/* Messages Container */}
			<div className="flex-1 flex flex-col min-h-0 mb-32">
				<div className="flex-1 overflow-y-auto px-2 py-4 space-y-4 max-h-[calc(100vh-300px)]">
					{messages.map(({ id, text, isBot, timestamp, category }) => (
						<div key={id} className={`flex ${isBot ? "justify-start" : "justify-end"}`}>
							<div
								className={`rounded-xl shadow px-4 sm:px-5 py-3 max-w-[85%] sm:max-w-[75%] lg:max-w-[65%] ${
									isBot ? "bg-white" : "bg-green-500 text-white"
								}`}
							>
								<p className="whitespace-pre-wrap text-sm sm:text-base">{text}</p>
								<div className="mt-2 flex items-center text-xs justify-between gap-2">
									<span className="opacity-50 flex-shrink-0">
										{timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
									</span>
									{category && (
										<span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs flex-shrink-0">
											{category}
										</span>
									)}
								</div>
							</div>
						</div>
					))}
					{isTyping && (
						<div className="flex justify-start">
							<div className="rounded-xl shadow px-4 sm:px-5 py-3 bg-white max-w-[85%] sm:max-w-[75%] lg:max-w-[65%]">
								<span className="text-gray-400 text-sm sm:text-base">Mentor is typing...</span>
							</div>
						</div>
					)}
					<div ref={messageEndRef} />
				</div>
			</div>

			{/* Quick Actions */}
			<div className="absolute left-4 right-4 sm:left-6 sm:right-6 bottom-24 flex flex-wrap justify-center gap-2">
				{quickActions.map(({ text, category }) => (
					<button
						key={text}
						className="px-3 py-2 text-xs sm:text-sm bg-green-500 text-white rounded-full shadow hover:bg-green-600 transition font-semibold flex-shrink-0"
						onClick={() => handleSendMessage(text, category)}
					>
						{text}
					</button>
				))}
			</div>

			{/* Input */}
			<div className="absolute left-0 right-0 bottom-0 px-4 sm:px-6 py-3 bg-white border-t border-green-100 flex items-center gap-2 sm:gap-3">
				<label className="flex items-center cursor-pointer flex-shrink-0">
					<Plus className="w-6 h-6 sm:w-7 sm:h-7 text-green-600" />
					<input type="file" accept="image/*" className="hidden" />
				</label>
				<textarea
					value={inputValue}
					className="flex-1 p-2 sm:p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-400 resize-none text-sm sm:text-base min-h-[40px] sm:min-h-[48px]"
					placeholder="Type your question or concern here..."
					rows={1}
					onChange={(e) => setInputValue(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === "Enter" && !e.shiftKey) {
							e.preventDefault();
							handleSendMessage();
						}
					}}
				/>
				<button
					className="rounded-lg bg-green-500 text-white p-2 sm:p-3 font-bold shadow hover:bg-green-600 transition flex items-center disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
					onClick={() => handleSendMessage()}
					disabled={!inputValue.trim() || isTyping}
				>
					<Send className="w-5 h-5 sm:w-6 sm:h-6" />
				</button>
			</div>
		</div>
	);
};

export default MentorChatbot;
