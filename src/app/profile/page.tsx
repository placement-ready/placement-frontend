"use client";

import React, { useState } from "react";
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
	PencilIcon,
	BookOpenIcon,
	DocumentTextIcon,
	LinkIcon,
	ShareIcon,
	GlobeAltIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "@/hooks/useAuth";
import { useGetProfile } from "@/lib/queries/users";

// Types for profile data - extending the base User type for type assertions
interface ExtendedUser {
	id: string;
	email: string;
	name: string;
	avatar?: string;
	role: "student" | "admin" | "recruiter";
	phone?: string;
	location?: string;
	title?: string;
	bio?: string;
	graduation?: string;
	resumeLink?: string;
	education?: Education[];
	experience?: Experience[];
	skills?: Skill[];
	achievements?: Achievement[];
	projects?: Project[];
}

interface PersonalInfo {
	name: string;
	email: string;
	phone: string;
	location: string;
	avatar: string;
	title: string;
	bio: string;
	graduation: string;
	resumeLink: string;
}

interface Education {
	id?: string;
	degree: string;
	institution: string;
	year: string;
	grade?: string;
	specialization?: string;
}

interface Experience {
	id?: string;
	title: string;
	company: string;
	duration: string;
	description: string;
	type: "internship" | "job" | "project";
}

interface Skill {
	id?: string;
	name: string;
	level: number;
	category: "technical" | "soft" | "language";
}

interface Achievement {
	id?: string;
	title: string;
	description: string;
	date: string;
	type: "academic" | "technical" | "extracurricular";
}

interface Project {
	id?: string;
	name: string;
	description: string;
	technologies?: string[];
	link?: string;
	github?: string;
}

// Loading skeleton component
const ProfileSkeleton = () => (
	<div className="min-h-screen bg-gray-50 animate-pulse">
		<div className="bg-gradient-to-br from-gray-300 to-gray-400 h-32 sm:h-48"></div>
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			{/* Header skeleton */}
			<div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-8 -mt-16">
				<div className="relative">
					<div className="absolute -top-12 left-4 sm:left-8">
						<div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-300 rounded-full border-4 border-white"></div>
					</div>
				</div>
				<div className="pt-16 sm:pt-20 pb-8 px-4 sm:px-8">
					<div className="h-8 bg-gray-300 rounded w-64 mb-2"></div>
					<div className="h-4 bg-gray-200 rounded w-48 mb-4"></div>
					<div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
					<div className="h-4 bg-gray-200 rounded w-3/4"></div>
				</div>
			</div>

			{/* Content skeleton */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
				<div className="lg:col-span-2 space-y-6">
					{[1, 2, 3].map((i) => (
						<div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
							<div className="h-6 bg-gray-300 rounded w-32 mb-4"></div>
							<div className="space-y-3">
								<div className="h-4 bg-gray-200 rounded"></div>
								<div className="h-4 bg-gray-200 rounded w-5/6"></div>
								<div className="h-4 bg-gray-200 rounded w-4/6"></div>
							</div>
						</div>
					))}
				</div>
				<div className="space-y-6">
					<div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
						<div className="h-6 bg-gray-300 rounded w-24 mb-4"></div>
						<div className="space-y-3">
							{[1, 2, 3, 4].map((i) => (
								<div key={i} className="h-4 bg-gray-200 rounded"></div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
);

// Error component
const ProfileError = ({ error }: { error: string }) => (
	<div className="min-h-screen bg-gray-50 flex items-center justify-center">
		<div className="text-center">
			<div className="bg-red-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
				<UserIcon className="w-8 h-8 text-red-600" />
			</div>
			<h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Profile</h2>
			<p className="text-gray-600 mb-4">{error}</p>
			<button
				onClick={() => window.location.reload()}
				className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
			>
				Try Again
			</button>
		</div>
	</div>
);

// Empty state components
const EmptySection = ({
	title,
	description,
	icon: Icon,
}: {
	title: string;
	description: string;
	icon: React.ComponentType<{ className?: string }>;
}) => (
	<div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
		<div className="bg-gray-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
			<Icon className="w-8 h-8 text-gray-400" />
		</div>
		<h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
		<p className="text-gray-600 mb-4">{description}</p>
		<button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
			Add {title}
		</button>
	</div>
);

// Section components
const OverviewSection = ({
	data,
}: {
	data: {
		personalInfo: PersonalInfo;
		education: Education[];
		experience: Experience[];
		skills: Skill[];
		projects: Project[];
	};
}) => (
	<div className="space-y-6">
		<div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
			<h3 className="text-xl font-semibold text-gray-900 mb-4">About</h3>
			<p className="text-gray-700 leading-relaxed">{data.personalInfo.bio}</p>
		</div>

		<div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
			<h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Overview</h3>
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
				<div className="bg-emerald-50 rounded-xl p-4">
					<div className="text-2xl font-bold text-emerald-600">{data.education?.length || 0}</div>
					<div className="text-sm text-gray-600">Education Records</div>
				</div>
				<div className="bg-blue-50 rounded-xl p-4">
					<div className="text-2xl font-bold text-blue-600">{data.experience?.length || 0}</div>
					<div className="text-sm text-gray-600">Work Experience</div>
				</div>
				<div className="bg-purple-50 rounded-xl p-4">
					<div className="text-2xl font-bold text-purple-600">{data.skills?.length || 0}</div>
					<div className="text-sm text-gray-600">Skills</div>
				</div>
				<div className="bg-orange-50 rounded-xl p-4">
					<div className="text-2xl font-bold text-orange-600">{data.projects?.length || 0}</div>
					<div className="text-sm text-gray-600">Projects</div>
				</div>
			</div>
		</div>
	</div>
);

const EducationSection = ({ data }: { data: Education[] }) => {
	if (!data || data.length === 0) {
		return (
			<EmptySection
				title="Education"
				description="Add your educational background"
				icon={AcademicCapIcon}
			/>
		);
	}

	return (
		<div className="space-y-4">
			{data.map((item, index) => (
				<div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
					<div className="flex items-start justify-between mb-4">
						<div className="flex-1">
							<h3 className="text-lg font-semibold text-gray-900">{item.degree}</h3>
							<p className="text-emerald-600 font-medium">{item.institution}</p>
						</div>
						<span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
							{item.year}
						</span>
					</div>
					{item.grade && <p className="text-gray-600 mb-2">Grade: {item.grade}</p>}
					{item.specialization && (
						<p className="text-gray-600">Specialization: {item.specialization}</p>
					)}
				</div>
			))}
		</div>
	);
};

const ExperienceSection = ({ data }: { data: Experience[] }) => {
	if (!data || data.length === 0) {
		return (
			<EmptySection
				title="Experience"
				description="Add your work experience"
				icon={BriefcaseIcon}
			/>
		);
	}

	return (
		<div className="space-y-4">
			{data.map((item, index) => (
				<div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
					<div className="flex items-start justify-between mb-4">
						<div className="flex-1">
							<h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
							<p className="text-emerald-600 font-medium">{item.company}</p>
						</div>
						<div className="text-right">
							<span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
								{item.duration}
							</span>
							<div className="mt-2">
								<span
									className={`text-xs px-2 py-1 rounded-full ${
										item.type === "internship"
											? "bg-blue-100 text-blue-800"
											: item.type === "job"
											? "bg-green-100 text-green-800"
											: "bg-purple-100 text-purple-800"
									}`}
								>
									{item.type}
								</span>
							</div>
						</div>
					</div>
					<p className="text-gray-700">{item.description}</p>
				</div>
			))}
		</div>
	);
};

const SkillsSection = ({ data }: { data: Skill[] }) => {
	if (!data || data.length === 0) {
		return (
			<EmptySection
				title="Skills"
				description="Add your professional skills"
				icon={CodeBracketIcon}
			/>
		);
	}

	const skillCategories = {
		technical: data.filter((skill) => skill.category === "technical"),
		soft: data.filter((skill) => skill.category === "soft"),
		language: data.filter((skill) => skill.category === "language"),
	};

	const renderSkills = (skills: Skill[], title: string, color: string) => {
		if (skills.length === 0) return null;

		return (
			<div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
				<h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
				<div className="space-y-3">
					{skills.map((skill, index) => (
						<div key={index}>
							<div className="flex justify-between items-center mb-1">
								<span className="text-sm font-medium text-gray-700">{skill.name}</span>
								<span className="text-xs text-gray-500">{skill.level}/10</span>
							</div>
							<div className="w-full bg-gray-200 rounded-full h-2">
								<div
									className={`h-2 rounded-full ${color}`}
									style={{ width: `${skill.level * 10}%` }}
								></div>
							</div>
						</div>
					))}
				</div>
			</div>
		);
	};

	return (
		<div className="space-y-6">
			{renderSkills(skillCategories.technical, "Technical Skills", "bg-emerald-500")}
			{renderSkills(skillCategories.soft, "Soft Skills", "bg-blue-500")}
			{renderSkills(skillCategories.language, "Languages", "bg-purple-500")}
		</div>
	);
};

const ProjectsSection = ({ data }: { data: Project[] }) => {
	if (!data || data.length === 0) {
		return (
			<EmptySection title="Projects" description="Showcase your projects" icon={BookOpenIcon} />
		);
	}

	return (
		<div className="space-y-4">
			{data.map((project, index) => (
				<div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
					<div className="flex items-start justify-between mb-4">
						<h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
						<div className="flex gap-2">
							{project.link && (
								<a
									href={project.link}
									target="_blank"
									rel="noopener noreferrer"
									className="text-emerald-600 hover:text-emerald-700"
								>
									<LinkIcon className="w-5 h-5" />
								</a>
							)}
							{project.github && (
								<a
									href={project.github}
									target="_blank"
									rel="noopener noreferrer"
									className="text-gray-600 hover:text-gray-700"
								>
									<GlobeAltIcon className="w-5 h-5" />
								</a>
							)}
						</div>
					</div>
					<p className="text-gray-700 mb-4">{project.description}</p>
					{project.technologies && (
						<div className="flex flex-wrap gap-2">
							{project.technologies.map((tech: string, idx: number) => (
								<span
									key={idx}
									className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-full"
								>
									{tech}
								</span>
							))}
						</div>
					)}
				</div>
			))}
		</div>
	);
};

const AchievementsSection = ({ data }: { data: Achievement[] }) => {
	if (!data || data.length === 0) {
		return (
			<EmptySection title="Achievements" description="Add your accomplishments" icon={TrophyIcon} />
		);
	}

	return (
		<div className="space-y-4">
			{data.map((achievement, index) => (
				<div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
					<div className="flex items-start justify-between mb-4">
						<div className="flex-1">
							<h3 className="text-lg font-semibold text-gray-900">{achievement.title}</h3>
							<p className="text-gray-700 mt-2">{achievement.description}</p>
						</div>
						<div className="text-right">
							<span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
								{achievement.date}
							</span>
							<div className="mt-2">
								<span
									className={`text-xs px-2 py-1 rounded-full ${
										achievement.type === "academic"
											? "bg-blue-100 text-blue-800"
											: achievement.type === "technical"
											? "bg-green-100 text-green-800"
											: "bg-purple-100 text-purple-800"
									}`}
								>
									{achievement.type}
								</span>
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

const ContactInfoCard = ({ data }: { data: PersonalInfo }) => (
	<div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
		<h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
		<div className="space-y-3">
			<div className="flex items-center gap-3">
				<EnvelopeIcon className="w-4 h-4 text-gray-400" />
				<span className="text-sm text-gray-700">{data.email}</span>
			</div>
			<div className="flex items-center gap-3">
				<PhoneIcon className="w-4 h-4 text-gray-400" />
				<span className="text-sm text-gray-700">{data.phone}</span>
			</div>
			<div className="flex items-center gap-3">
				<MapPinIcon className="w-4 h-4 text-gray-400" />
				<span className="text-sm text-gray-700">{data.location}</span>
			</div>
		</div>
	</div>
);

const QuickStatsCard = ({
	data,
}: {
	data: { education: Education[]; experience: Experience[]; projects: Project[]; skills: Skill[] };
}) => (
	<div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
		<h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Stats</h3>
		<div className="space-y-4">
			<div className="flex justify-between items-center">
				<span className="text-sm text-gray-600">Profile Completeness</span>
				<span className="text-sm font-semibold text-emerald-600">85%</span>
			</div>
			<div className="w-full bg-gray-200 rounded-full h-2">
				<div className="bg-emerald-500 h-2 rounded-full" style={{ width: "85%" }}></div>
			</div>
			<div className="grid grid-cols-2 gap-4 pt-4">
				<div className="text-center">
					<div className="text-lg font-bold text-gray-900">{data.experience?.length || 0}</div>
					<div className="text-xs text-gray-500">Experience</div>
				</div>
				<div className="text-center">
					<div className="text-lg font-bold text-gray-900">{data.projects?.length || 0}</div>
					<div className="text-xs text-gray-500">Projects</div>
				</div>
			</div>
		</div>
	</div>
);

const Profile: React.FC = () => {
	const [activeTab, setActiveTab] = useState<string>("overview");
	const [isEditing, setIsEditing] = useState<boolean>(false);

	// Get authenticated user data
	const { user, isAuthenticated } = useAuth();

	// Fetch user profile data if we have a user ID
	const { data: userProfile, isLoading: isLoadingProfile, error: profileError } = useGetProfile();

	// Determine loading and error states
	const isLoading = isLoadingProfile;
	const error = profileError;

	// Redirect to login if not authenticated
	if (!isAuthenticated) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
				<div className="text-center">
					<div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
						<UserIcon className="w-8 h-8 text-blue-600" />
					</div>
					<h2 className="text-xl font-semibold text-gray-900 mb-2">Please Log In</h2>
					<p className="text-gray-600 mb-4">You need to be logged in to view your profile.</p>
					<a
						href="/auth/login"
						className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
					>
						Go to Login
					</a>
				</div>
			</div>
		);
	}

	// Show loading state
	if (isLoading) {
		return <ProfileSkeleton />;
	}

	// Show error state
	if (error) {
		return <ProfileError error={error.message || "Failed to load profile data"} />;
	}

	// Transform API data with type assertion for extended properties
	const extendedUserProfile = userProfile as ExtendedUser;

	// Merge data from different sources
	const profileData = {
		personalInfo: {
			name: extendedUserProfile?.name || user?.name || "User Name",
			email: extendedUserProfile?.email || user?.email || "user@example.com",
			phone: extendedUserProfile?.phone || "+1 (555) 123-4567",
			location: extendedUserProfile?.location || "San Francisco, CA",
			avatar: extendedUserProfile?.avatar || "/brain.png",
			title: extendedUserProfile?.title || "Software Developer",
			bio:
				extendedUserProfile?.bio ||
				"Passionate software developer seeking new opportunities. Click edit to add your bio.",
			graduation: extendedUserProfile?.graduation || "May 2024",
			resumeLink: extendedUserProfile?.resumeLink || "/resume.pdf",
		},
		// For now, we'll use fallback data for sections not in the API
		// In a real app, these would come from the API response
		education: extendedUserProfile?.education || [],
		experience: extendedUserProfile?.experience || [],
		skills: extendedUserProfile?.skills || [],
		achievements: extendedUserProfile?.achievements || [],
		projects: extendedUserProfile?.projects || [],
	};

	const tabs = [
		{ id: "overview", label: "Overview", icon: UserIcon },
		{ id: "education", label: "Education", icon: AcademicCapIcon },
		{ id: "experience", label: "Experience", icon: BriefcaseIcon },
		{ id: "skills", label: "Skills", icon: CodeBracketIcon },
		{ id: "projects", label: "Projects", icon: BookOpenIcon },
		{ id: "achievements", label: "Achievements", icon: TrophyIcon },
	];

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Header with gradient background */}
			<div className="bg-gradient-to-br from-emerald-500 via-green-500 to-emerald-600 text-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
					<div className="text-center">
						<h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">My Profile</h1>
						<p className="text-lg sm:text-xl text-emerald-100 max-w-2xl mx-auto">
							Manage your professional profile and showcase your skills
						</p>
					</div>
				</div>
			</div>

			{/* Main content */}
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{/* Profile Header Card */}
				<div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-8 overflow-hidden -mt-16 relative z-10">
					<div className="relative">
						{/* Cover Image */}
						<div className="h-24 sm:h-32 bg-gradient-to-r from-emerald-400 via-green-400 to-emerald-500"></div>

						{/* Profile Image */}
						<div className="absolute -bottom-8 sm:-bottom-12 left-4 sm:left-8">
							<div className="relative">
								<Image
									src={profileData.personalInfo.avatar}
									alt={profileData.personalInfo.name}
									width={96}
									height={96}
									className="w-16 h-16 sm:w-24 sm:h-24 rounded-full border-4 border-white object-cover shadow-lg"
								/>
								{isEditing && (
									<button className="absolute bottom-0 right-0 bg-emerald-600 text-white p-1.5 rounded-full shadow-lg hover:bg-emerald-700 transition-colors">
										<PencilIcon className="w-3 h-3" />
									</button>
								)}
							</div>
						</div>

						{/* Edit Button */}
						<div className="absolute top-4 right-4">
							<button
								onClick={() => setIsEditing(!isEditing)}
								className="bg-white/90 hover:bg-white text-gray-700 px-3 py-2 sm:px-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-2"
							>
								<PencilIcon className="w-4 h-4" />
								<span className="hidden sm:inline">{isEditing ? "Save" : "Edit Profile"}</span>
							</button>
						</div>
					</div>

					{/* Profile Info */}
					<div className="pt-12 sm:pt-16 pb-6 sm:pb-8 px-4 sm:px-8">
						<div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
							<div className="flex-1">
								<h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
									{profileData.personalInfo.name}
								</h1>
								<p className="text-base sm:text-lg text-emerald-600 font-medium mb-3">
									{profileData.personalInfo.title}
								</p>
								<div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600 mb-4">
									<div className="flex items-center gap-1">
										<MapPinIcon className="w-4 h-4" />
										<span>{profileData.personalInfo.location}</span>
									</div>
									<div className="flex items-center gap-1">
										<EnvelopeIcon className="w-4 h-4" />
										<span className="truncate">{profileData.personalInfo.email}</span>
									</div>
									<div className="flex items-center gap-1">
										<CalendarIcon className="w-4 h-4" />
										<span>Graduating {profileData.personalInfo.graduation}</span>
									</div>
								</div>
								<p className="text-gray-700 leading-relaxed text-sm sm:text-base">
									{profileData.personalInfo.bio}
								</p>
							</div>

							{/* Action Buttons */}
							<div className="flex flex-row sm:flex-col gap-2 sm:gap-3">
								<button className="flex-1 sm:flex-none bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-2 sm:px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 text-sm">
									<DocumentTextIcon className="w-4 h-4" />
									<span className="hidden sm:inline">Download CV</span>
									<span className="sm:hidden">CV</span>
								</button>
								<button className="flex-1 sm:flex-none bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 sm:px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 text-sm">
									<ShareIcon className="w-4 h-4" />
									<span className="hidden sm:inline">Share</span>
									<span className="sm:hidden">Share</span>
								</button>
							</div>
						</div>
					</div>
				</div>

				{/* Tabs */}
				<div className="mb-6 sm:mb-8">
					<div className="border-b border-gray-200 overflow-x-auto">
						<nav className="-mb-px flex space-x-4 sm:space-x-8 min-w-max px-1">
							{tabs.map((tab) => {
								const Icon = tab.icon;
								return (
									<button
										key={tab.id}
										onClick={() => setActiveTab(tab.id)}
										className={`whitespace-nowrap py-3 sm:py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors ${
											activeTab === tab.id
												? "border-emerald-500 text-emerald-600"
												: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
										}`}
									>
										<Icon className="w-4 h-4" />
										<span className="hidden sm:inline">{tab.label}</span>
									</button>
								);
							})}
						</nav>
					</div>
				</div>

				{/* Tab Content */}
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
					{/* Main Content */}
					<div className="lg:col-span-2">
						{activeTab === "overview" && <OverviewSection data={profileData} />}
						{activeTab === "education" && <EducationSection data={profileData.education} />}
						{activeTab === "experience" && <ExperienceSection data={profileData.experience} />}
						{activeTab === "skills" && <SkillsSection data={profileData.skills} />}
						{activeTab === "projects" && <ProjectsSection data={profileData.projects} />}
						{activeTab === "achievements" && (
							<AchievementsSection data={profileData.achievements} />
						)}
					</div>

					{/* Sidebar */}
					<div className="space-y-6">
						<ContactInfoCard data={profileData.personalInfo} />
						<QuickStatsCard data={profileData} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
