"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
	UserIcon,
	AcademicCapIcon,
	BriefcaseIcon,
	CodeBracketIcon,
	TrophyIcon,
	MapPinIcon,
	EnvelopeIcon,
	PhoneIcon,
	CalendarIcon,
	StarIcon,
	PencilIcon,
	BookOpenIcon,
	ChartBarIcon,
	GlobeAltIcon,
	DocumentTextIcon,
	LinkIcon,
	HeartIcon,
	EyeIcon,
	ShareIcon,
} from "@heroicons/react/24/outline";
import { CheckCircleIcon as CheckCircleIconSolid } from "@heroicons/react/24/solid";
import { useAuth } from "@/hooks/useAuth";

// Types for profile data
interface Education {
	id: string;
	degree: string;
	institution: string;
	year: string;
	grade: string;
	specialization?: string;
}

interface Experience {
	id: string;
	title: string;
	company: string;
	duration: string;
	description: string;
	type: "internship" | "job" | "project";
}

interface Skill {
	id: string;
	name: string;
	level: number;
	category: "technical" | "soft" | "language";
}

interface Achievement {
	id: string;
	title: string;
	description: string;
	date: string;
	type: "academic" | "technical" | "extracurricular";
}

interface Project {
	id: string;
	name: string;
	description: string;
	technologies: string[];
	link?: string;
	github?: string;
}

const Profile: React.FC = () => {
	const [activeTab, setActiveTab] = useState<string>("overview");
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [isVisible, setIsVisible] = useState<boolean>(false);

	// Get authenticated user data
	const { user } = useAuth();

	// Animation trigger
	useEffect(() => {
		setIsVisible(true);
	}, []);

	// Mock data - in real app, this would come from API/database
	// For now, we'll merge real user data with mock profile data
	const profileData = {
		personalInfo: {
			name: user?.name || "User Name",
			email: user?.email || "user@example.com",
			phone: "+1 (555) 123-4567",
			location: "San Francisco, CA",
			avatar: user?.image || "/brain.png",
			title: "Computer Science Student",
			bio: "Passionate software developer with expertise in full-stack development. Seeking opportunities in tech companies to contribute to innovative projects and grow professionally.",
			graduation: "May 2024",
			resumeLink: "/resume.pdf",
		},
		education: [
			{
				id: "1",
				degree: "Bachelor of Technology",
				institution: "University of California, Berkeley",
				year: "2020-2024",
				grade: "3.8 GPA",
				specialization: "Computer Science",
			},
			{
				id: "2",
				degree: "High School Diploma",
				institution: "Lincoln High School",
				year: "2016-2020",
				grade: "95%",
				specialization: "Science Stream",
			},
		] as Education[],
		experience: [
			{
				id: "1",
				title: "Software Engineering Intern",
				company: "Google",
				duration: "Jun 2023 - Aug 2023",
				description:
					"Developed microservices using Go and deployed on GCP. Improved API response time by 40%.",
				type: "internship" as const,
			},
			{
				id: "2",
				title: "Full Stack Developer",
				company: "TechStart Inc.",
				duration: "Jan 2023 - May 2023",
				description:
					"Built responsive web applications using React and Node.js. Collaborated with cross-functional teams.",
				type: "job" as const,
			},
		] as Experience[],
		skills: [
			{ id: "1", name: "JavaScript", level: 9, category: "technical" as const },
			{ id: "2", name: "React", level: 8, category: "technical" as const },
			{ id: "3", name: "Node.js", level: 8, category: "technical" as const },
			{ id: "4", name: "Python", level: 7, category: "technical" as const },
			{ id: "5", name: "Leadership", level: 8, category: "soft" as const },
			{ id: "6", name: "Communication", level: 9, category: "soft" as const },
			{ id: "7", name: "English", level: 10, category: "language" as const },
			{ id: "8", name: "Spanish", level: 6, category: "language" as const },
		] as Skill[],
		achievements: [
			{
				id: "1",
				title: "Dean's List",
				description: "Achieved Dean's List for 3 consecutive semesters",
				date: "2022-2023",
				type: "academic" as const,
			},
			{
				id: "2",
				title: "Hackathon Winner",
				description: "1st place in Bay Area Tech Hackathon 2023",
				date: "March 2023",
				type: "technical" as const,
			},
		] as Achievement[],
		projects: [
			{
				id: "1",
				name: "E-commerce Platform",
				description: "Full-stack e-commerce solution with payment integration",
				technologies: ["React", "Node.js", "MongoDB", "Stripe"],
				link: "https://demo.example.com",
				github: "https://github.com/user/project",
			},
			{
				id: "2",
				name: "AI Chat Bot",
				description: "Natural language processing chatbot using OpenAI API",
				technologies: ["Python", "FastAPI", "OpenAI", "React"],
				github: "https://github.com/user/chatbot",
			},
		] as Project[],
		preferences: {
			jobTypes: ["Full-time", "Internship"],
			locations: ["San Francisco", "New York", "Remote"],
			industries: ["Technology", "Fintech", "Healthcare"],
			expectedSalary: "$80,000 - $120,000",
		},
	};

	const tabs = [
		{ id: "overview", label: "Overview", icon: UserIcon },
		{ id: "education", label: "Education", icon: AcademicCapIcon },
		{ id: "experience", label: "Experience", icon: BriefcaseIcon },
		{ id: "skills", label: "Skills", icon: CodeBracketIcon },
		{ id: "projects", label: "Projects", icon: BookOpenIcon },
		{ id: "achievements", label: "Achievements", icon: TrophyIcon },
	];

	const renderSkillBar = (skill: Skill, index: number) => (
		<div
			key={skill.id}
			className={`mb-4 transform transition-all duration-700 ${
				isVisible ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
			}`}
			style={{ transitionDelay: `${index * 100}ms` }}
		>
			<div className="flex justify-between items-center mb-2">
				<span className="text-sm font-medium text-gray-700">{skill.name}</span>
				<span className="text-xs text-gray-500 font-semibold">{skill.level}/10</span>
			</div>
			<div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
				<div
					className="bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 h-3 rounded-full transition-all duration-1000 ease-out relative overflow-hidden animate-pulse"
					style={{
						width: `${skill.level * 10}%`,
						animationDelay: `${index * 200}ms`,
					}}
				>
					<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 animate-shimmer"></div>
				</div>
			</div>
		</div>
	);

	const renderTabContent = () => {
		switch (activeTab) {
			case "overview":
				return (
					<div className="space-y-8">
						{/* Bio Section */}
						<div
							className={`bg-white rounded-2xl p-8 shadow-lg border border-green-100 hover:shadow-xl transition-all duration-500 hover:border-green-200 transform hover:-translate-y-1 ${
								isVisible ? "animate-slideInUp" : ""
							}`}
						>
							<h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
								<div className="p-2 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl">
									<DocumentTextIcon className="w-6 h-6 text-green-600" />
								</div>
								About Me
							</h3>
							<p className="text-gray-700 leading-relaxed text-lg">
								{profileData.personalInfo.bio}
							</p>
						</div>

						{/* Career Preferences */}
						<div
							className={`bg-white rounded-2xl p-8 shadow-lg border border-green-100 hover:shadow-xl transition-all duration-500 hover:border-green-200 transform hover:-translate-y-1 ${
								isVisible ? "animate-slideInUp" : ""
							}`}
							style={{ animationDelay: "600ms" }}
						>
							<h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
								<div className="p-2 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl">
									<ChartBarIcon className="w-6 h-6 text-green-600" />
								</div>
								Career Preferences
							</h3>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								{[
									{ title: "Job Types", items: profileData.preferences.jobTypes, color: "green" },
									{
										title: "Preferred Locations",
										items: profileData.preferences.locations,
										color: "blue",
									},
									{
										title: "Industries",
										items: profileData.preferences.industries,
										color: "purple",
									},
								].map((pref, index) => (
									<div key={pref.title}>
										<p className="text-sm font-semibold text-gray-700 mb-3">{pref.title}</p>
										<div className="flex flex-wrap gap-2">
											{pref.items.map((item, itemIndex) => (
												<span
													key={itemIndex}
													className={`px-4 py-2 bg-${pref.color}-100 text-${pref.color}-700 rounded-full text-sm font-medium hover:bg-${pref.color}-200 transition-all duration-300 transform hover:scale-105 cursor-pointer hover:shadow-md`}
													style={{ animationDelay: `${(index + itemIndex) * 100}ms` }}
												>
													{item}
												</span>
											))}
										</div>
									</div>
								))}
								<div>
									<p className="text-sm font-semibold text-gray-700 mb-3">Expected Salary</p>
									<span className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium hover:bg-emerald-200 transition-all duration-300 transform hover:scale-105 cursor-pointer hover:shadow-md">
										{profileData.preferences.expectedSalary}
									</span>
								</div>
							</div>
						</div>
					</div>
				);

			case "education":
				return (
					<div className="space-y-6">
						{profileData.education.map((edu, index) => (
							<div
								key={edu.id}
								className={`bg-white rounded-2xl p-8 shadow-lg border border-green-100 hover:shadow-xl transition-all duration-500 hover:border-green-200 transform hover:-translate-y-2 group ${
									isVisible ? "animate-slideInRight" : "opacity-0 translate-x-8"
								}`}
								style={{ animationDelay: `${index * 200}ms` }}
							>
								<div className="flex items-start justify-between">
									<div className="flex items-start gap-6">
										<div className="p-4 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl group-hover:bg-gradient-to-br group-hover:from-green-200 group-hover:to-emerald-200 transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-3">
											<AcademicCapIcon className="w-8 h-8 text-green-600 group-hover:text-green-700" />
										</div>
										<div>
											<h3 className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors duration-300">
												{edu.degree}
											</h3>
											<p className="text-green-600 font-semibold text-lg">{edu.institution}</p>
											{edu.specialization && (
												<p className="text-sm text-gray-600 mt-2 font-medium">
													Specialization: {edu.specialization}
												</p>
											)}
											<div className="flex items-center gap-6 mt-3">
												<span className="flex items-center gap-2 text-sm text-gray-600 font-medium">
													<CalendarIcon className="w-5 h-5" />
													{edu.year}
												</span>
												<span className="flex items-center gap-2 text-sm text-gray-600 font-medium">
													<StarIcon className="w-5 h-5" />
													{edu.grade}
												</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				);

			case "experience":
				return (
					<div className="space-y-6">
						{profileData.experience.map((exp, index) => (
							<div
								key={exp.id}
								className={`bg-white rounded-2xl p-8 shadow-lg border border-green-100 hover:shadow-xl transition-all duration-500 hover:border-green-200 transform hover:-translate-y-2 group ${
									isVisible ? "animate-slideInLeft" : "opacity-0 -translate-x-8"
								}`}
								style={{ animationDelay: `${index * 200}ms` }}
							>
								<div className="flex items-start gap-6">
									<div className="p-4 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl group-hover:bg-gradient-to-br group-hover:from-blue-200 group-hover:to-indigo-200 transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-3">
										<BriefcaseIcon className="w-8 h-8 text-blue-600 group-hover:text-blue-700" />
									</div>
									<div className="flex-1">
										<div className="flex items-start justify-between">
											<div>
												<h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
													{exp.title}
												</h3>
												<p className="text-blue-600 font-semibold text-lg">{exp.company}</p>
												<span className="inline-flex items-center gap-2 text-sm text-gray-600 mt-2 font-medium">
													<CalendarIcon className="w-5 h-5" />
													{exp.duration}
												</span>
											</div>
											<span
												className={`px-4 py-2 rounded-full text-xs font-bold transform transition-all duration-300 hover:scale-110 ${
													exp.type === "internship"
														? "bg-green-100 text-green-700 hover:bg-green-200"
														: exp.type === "job"
														? "bg-blue-100 text-blue-700 hover:bg-blue-200"
														: "bg-purple-100 text-purple-700 hover:bg-purple-200"
												}`}
											>
												{exp.type.charAt(0).toUpperCase() + exp.type.slice(1)}
											</span>
										</div>
										<p className="text-gray-700 mt-4 leading-relaxed text-lg">{exp.description}</p>
									</div>
								</div>
							</div>
						))}
					</div>
				);

			case "skills":
				const skillCategories = {
					technical: profileData.skills.filter((s) => s.category === "technical"),
					soft: profileData.skills.filter((s) => s.category === "soft"),
					language: profileData.skills.filter((s) => s.category === "language"),
				};

				return (
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
						{[
							{
								title: "Technical Skills",
								skills: skillCategories.technical,
								icon: CodeBracketIcon,
								color: "green",
							},
							{ title: "Soft Skills", skills: skillCategories.soft, icon: UserIcon, color: "blue" },
							{
								title: "Languages",
								skills: skillCategories.language,
								icon: GlobeAltIcon,
								color: "purple",
							},
						].map((category, categoryIndex) => {
							const Icon = category.icon;
							return (
								<div
									key={category.title}
									className={`bg-white rounded-2xl p-8 shadow-lg border border-green-100 hover:shadow-xl transition-all duration-500 hover:border-green-200 transform hover:-translate-y-2 ${
										isVisible ? "animate-fadeInUp" : "opacity-0 translate-y-8"
									}`}
									style={{ animationDelay: `${categoryIndex * 200}ms` }}
								>
									<h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
										<div className={`p-2 bg-${category.color}-100 rounded-xl`}>
											<Icon className={`w-6 h-6 text-${category.color}-600`} />
										</div>
										{category.title}
									</h3>
									{category.skills.map((skill, index) => renderSkillBar(skill, index))}
								</div>
							);
						})}
					</div>
				);

			case "projects":
				return (
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
						{profileData.projects.map((project, index) => (
							<div
								key={project.id}
								className={`bg-white rounded-2xl p-8 shadow-lg border border-green-100 hover:shadow-xl transition-all duration-500 hover:border-green-200 transform hover:-translate-y-2 group ${
									isVisible ? "animate-zoomIn" : "opacity-0 scale-75"
								}`}
								style={{ animationDelay: `${index * 200}ms` }}
							>
								<div className="flex items-start gap-6">
									<div className="p-4 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl group-hover:bg-gradient-to-br group-hover:from-purple-200 group-hover:to-pink-200 transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-3">
										<BookOpenIcon className="w-8 h-8 text-purple-600 group-hover:text-purple-700" />
									</div>
									<div className="flex-1">
										<h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors duration-300">
											{project.name}
										</h3>
										<p className="text-gray-700 mb-6 leading-relaxed text-lg">
											{project.description}
										</p>
										<div className="flex flex-wrap gap-3 mb-6">
											{project.technologies.map((tech, techIndex) => (
												<span
													key={techIndex}
													className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 cursor-pointer"
													style={{ animationDelay: `${techIndex * 50}ms` }}
												>
													{tech}
												</span>
											))}
										</div>
										<div className="flex gap-4">
											{project.link && (
												<a
													href={project.link}
													target="_blank"
													rel="noopener noreferrer"
													className="flex items-center gap-2 text-sm text-green-600 hover:text-green-700 font-semibold hover:underline transition-all duration-300 transform hover:scale-105"
												>
													<LinkIcon className="w-5 h-5" />
													Live Demo
												</a>
											)}
											{project.github && (
												<a
													href={project.github}
													target="_blank"
													rel="noopener noreferrer"
													className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-700 font-semibold hover:underline transition-all duration-300 transform hover:scale-105"
												>
													<CodeBracketIcon className="w-5 h-5" />
													Source Code
												</a>
											)}
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				);

			case "achievements":
				return (
					<div className="space-y-6">
						{profileData.achievements.map((achievement, index) => (
							<div
								key={achievement.id}
								className={`bg-white rounded-2xl p-8 shadow-lg border border-green-100 hover:shadow-xl transition-all duration-500 hover:border-green-200 transform hover:-translate-y-2 group ${
									isVisible ? "animate-slideInUp" : "opacity-0 translate-y-8"
								}`}
								style={{ animationDelay: `${index * 200}ms` }}
							>
								<div className="flex items-start gap-6">
									<div className="p-4 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl group-hover:bg-gradient-to-br group-hover:from-yellow-200 group-hover:to-orange-200 transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-3">
										<TrophyIcon className="w-8 h-8 text-yellow-600 group-hover:text-yellow-700" />
									</div>
									<div className="flex-1">
										<div className="flex items-start justify-between">
											<div>
												<h3 className="text-xl font-bold text-gray-900 group-hover:text-yellow-600 transition-colors duration-300">
													{achievement.title}
												</h3>
												<p className="text-gray-700 mt-2 leading-relaxed text-lg">
													{achievement.description}
												</p>
												<span className="inline-flex items-center gap-2 text-sm text-gray-600 mt-3 font-medium">
													<CalendarIcon className="w-5 h-5" />
													{achievement.date}
												</span>
											</div>
											<span
												className={`px-4 py-2 rounded-full text-xs font-bold transform transition-all duration-300 hover:scale-110 ${
													achievement.type === "academic"
														? "bg-green-100 text-green-700 hover:bg-green-200"
														: achievement.type === "technical"
														? "bg-blue-100 text-blue-700 hover:bg-blue-200"
														: "bg-purple-100 text-purple-700 hover:bg-purple-200"
												}`}
											>
												{achievement.type.charAt(0).toUpperCase() + achievement.type.slice(1)}
											</span>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				);

			default:
				return null;
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-green-50/80 via-emerald-50/90 to-green-100/80 relative overflow-hidden">
			{/* Animated background elements */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<div className="absolute -top-40 -right-40 w-80 h-80 bg-green-200/20 rounded-full blur-3xl animate-float"></div>
				<div
					className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-200/20 rounded-full blur-3xl animate-float"
					style={{ animationDelay: "2s" }}
				></div>
				<div
					className="absolute top-1/2 left-1/2 w-60 h-60 bg-green-300/10 rounded-full blur-3xl animate-float"
					style={{ animationDelay: "4s" }}
				></div>
			</div>

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
				{/* Profile Header */}
				<div
					className={`bg-white rounded-3xl shadow-2xl border border-green-100 overflow-hidden mb-8 transform transition-all duration-1000 ${
						isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
					}`}
				>
					{/* Cover Image */}
					<div className="h-32 sm:h-48 bg-gradient-to-r from-green-400 via-emerald-400 to-green-500 relative overflow-hidden">
						<div className="absolute inset-0 bg-black/10"></div>

						<div className="absolute top-6 right-6 flex gap-3">
							<button className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-xl hover:bg-white/30 transition-all duration-300 transform hover:scale-110 hover:rotate-6">
								<ShareIcon className="w-5 h-5" />
							</button>
							<button className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-xl hover:bg-white/30 transition-all duration-300 transform hover:scale-110 hover:rotate-6">
								<HeartIcon className="w-5 h-5" />
							</button>
							<button
								onClick={() => setIsEditing(!isEditing)}
								className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-xl hover:bg-white/30 transition-all duration-300 transform hover:scale-110 hover:rotate-6"
							>
								<PencilIcon className="w-5 h-5" />
							</button>
						</div>
					</div>

					{/* Profile Info */}
					<div className="px-8 pb-8 z-20 relative">
						<div className="flex flex-col sm:flex-row sm:items-end sm:gap-8 -mt-16 sm:-mt-20">
							{/* Avatar */}
							<div className="relative group">
								<div className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl bg-white p-3 shadow-2xl group-hover:shadow-3xl transition-all duration-500 transform group-hover:scale-105">
									<Image
										src={profileData.personalInfo.avatar}
										alt={profileData.personalInfo.name}
										width={144}
										height={144}
										className="w-full h-full rounded-2xl object-cover"
									/>
								</div>
								<div className="absolute -bottom-2 -right-2 bg-green-500 text-white p-2 rounded-xl shadow-lg">
									<CheckCircleIconSolid className="w-5 h-5" />
								</div>
							</div>

							{/* Basic Info */}
							<div className="flex-1 mt-6 sm:mt-0">
								<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
									<div>
										<h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
											{profileData.personalInfo.name}
										</h1>
										<p className="text-xl text-white font-semibold mb-4">
											{profileData.personalInfo.title}
										</p>
										<div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
											<span className="flex items-center gap-2 hover:text-green-600 transition-colors duration-300">
												<MapPinIcon className="w-5 h-5" />
												{profileData.personalInfo.location}
											</span>
											<span className="flex items-center gap-2 hover:text-green-600 transition-colors duration-300">
												<EnvelopeIcon className="w-5 h-5" />
												{profileData.personalInfo.email}
											</span>
											<span className="flex items-center gap-2 hover:text-green-600 transition-colors duration-300">
												<PhoneIcon className="w-5 h-5" />
												{profileData.personalInfo.phone}
											</span>
										</div>
									</div>
									<div className="flex gap-4 mt-6 sm:mt-0">
										<button className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-3 rounded-2xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all duration-300 flex items-center gap-3 transform hover:scale-105 hover:shadow-xl">
											<DocumentTextIcon className="w-5 h-5" />
											Download Resume
										</button>
										<button className="bg-white text-green-600 px-8 py-3 rounded-2xl font-semibold border-2 border-green-200 hover:bg-green-50 hover:border-green-300 transition-all duration-300 flex items-center gap-3 transform hover:scale-105">
											<EyeIcon className="w-5 h-5" />
											View Portfolio
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Navigation Tabs */}
				<div
					className={`bg-white rounded-2xl shadow-xl border border-green-100 mb-8 overflow-hidden transform transition-all duration-1000 ${
						isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
					}`}
					style={{ transitionDelay: "200ms" }}
				>
					<div className="flex overflow-x-auto">
						{tabs.map((tab, index) => {
							const Icon = tab.icon;
							return (
								<button
									key={tab.id}
									onClick={() => setActiveTab(tab.id)}
									className={`flex items-center gap-3 px-8 py-6 text-sm font-semibold whitespace-nowrap transition-all duration-500 border-b-3 relative overflow-hidden group ${
										activeTab === tab.id
											? "text-green-600 border-green-500 bg-green-50"
											: "text-gray-600 border-transparent hover:text-green-600 hover:bg-green-50"
									}`}
									style={{ animationDelay: `${index * 100}ms` }}
								>
									{/* Hover effect background */}
									<div className="absolute inset-0 bg-gradient-to-r from-green-50 to-emerald-50 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 opacity-0 group-hover:opacity-100"></div>

									<Icon
										className={`w-5 h-5 transition-all duration-300 relative z-10 ${
											activeTab === tab.id ? "transform scale-110" : "group-hover:scale-110"
										}`}
									/>
									<span className="relative z-10">{tab.label}</span>

									{/* Active indicator */}
									{activeTab === tab.id && (
										<div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-emerald-500"></div>
									)}
								</button>
							);
						})}
					</div>
				</div>

				{/* Tab Content */}
				<div
					className={`transition-all duration-700 transform ${
						isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
					}`}
					style={{ transitionDelay: "400ms" }}
				>
					{renderTabContent()}
				</div>
			</div>
		</div>
	);
};

export default Profile;
