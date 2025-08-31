import {
	MdDashboard,
	MdBusiness,
	MdEventNote,
	MdBarChart,
	MdOutlineMap,
	Md3P,
	MdSchool,
	MdWork,
	MdSettings,
	MdNotifications,
	MdHelp,
	MdAutoFixHigh,
	MdFileOpen,
} from "react-icons/md";
import { SidebarConfig } from "./Sidebar";

const menuItems: SidebarConfig = {
	logo: {
		src: "/brain.png",
		alt: "HireMind Logo",
		title: "HireMind",
	},
	showProfile: true,
	showLogout: true,
	menuItems: [
		{
			id: "dashboard",
			name: "Dashboard",
			icon: <MdDashboard />,
			href: "/dashboard",
			type: "link",
		},
		{
			id: "practice",
			name: "Practice",
			icon: <MdBarChart />,
			type: "dropdown",
			children: [
				{
					id: "dsa",
					name: "DSA Problems",
					icon: <MdBarChart />,
					href: "/dashboard/dsa",
					type: "link",
					badge: "150+",
				},
				{
					id: "coding-challenges",
					name: "Coding Challenges",
					icon: <MdSchool />,
					href: "/dashboard/challenges",
					type: "link",
				},
				{
					id: "mock-tests",
					name: "Mock Tests",
					icon: <MdEventNote />,
					href: "/dashboard/mock-tests",
					type: "link",
					badge: "New",
				},
			],
		},
		{
			id: "companies",
			name: "Companies",
			icon: <MdBusiness />,
			type: "dropdown",
			children: [
				{
					id: "company-questions",
					name: "Company Questions",
					icon: <MdBusiness />,
					href: "/dashboard/companies",
					type: "link",
				},
				{
					id: "interview-experiences",
					name: "Interview Experiences",
					icon: <MdWork />,
					href: "/dashboard/experiences",
					type: "link",
				},
			],
		},
		{
			id: "interviews",
			name: "Schedule Interview",
			icon: <MdEventNote />,
			href: "/dashboard/interviews",
			type: "link",
		},
		{
			id: "aiFeatures",
			name: "AI Features",
			icon: <MdAutoFixHigh />,
			type: "dropdown",
			children: [
				{
					id: "mentor",
					name: "Mentor",
					icon: <Md3P />,
					href: "/dashboard/mentor",
					type: "link",
				},
				{
					id: "roadmap",
					name: "Roadmap",
					icon: <MdOutlineMap />,
					href: "/dashboard/roadmap",
					type: "link",
				},
				{
					id: "resume",
					name: "Resume",
					icon: <MdFileOpen />,
					href: "/dashboard/resume",
					type: "link",
				},
			],
		},
		{
			id: "resources",
			name: "Resources",
			icon: <MdSchool />,
			type: "dropdown",
			children: [
				{
					id: "templates",
					name: "Resume Templates",
					icon: <MdSchool />,
					href: "/dashboard/templates",
					type: "link",
				},
				{
					id: "study-materials",
					name: "Study Materials",
					icon: <MdSchool />,
					href: "/dashboard/materials",
					type: "link",
				},
			],
		},
		{
			id: "settings",
			name: "Settings",
			icon: <MdSettings />,
			type: "dropdown",
			children: [
				{
					id: "profile-settings",
					name: "Profile Settings",
					icon: <MdSettings />,
					href: "/dashboard/settings/profile",
					type: "link",
				},
				{
					id: "notifications",
					name: "Notifications",
					icon: <MdNotifications />,
					href: "/dashboard/settings/notifications",
					type: "link",
				},
				{
					id: "help",
					name: "Help & Support",
					icon: <MdHelp />,
					href: "/dashboard/help",
					type: "link",
				},
			],
		},
	],
};

export default menuItems;
