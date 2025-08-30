export interface ExtendedUser {
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

export interface PersonalInfo {
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

export interface Education {
	id?: string;
	degree: string;
	institution: string;
	year: string;
	grade?: string;
	specialization?: string;
}

export interface Experience {
	id?: string;
	title: string;
	company: string;
	duration: string;
	description: string;
	type: "internship" | "job" | "project";
}

export interface Skill {
	id?: string;
	name: string;
	level: number;
	category: "technical" | "soft" | "language";
}

export interface Achievement {
	id?: string;
	title: string;
	description: string;
	date: string;
	type: "academic" | "technical" | "extracurricular";
}

export interface Project {
	id?: string;
	name: string;
	description: string;
	technologies?: string[];
	link?: string;
	github?: string;
}
