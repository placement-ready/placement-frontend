"use client";

import { useState } from "react";
import { FaPencilAlt, FaTrash, FaSearch, FaDownload } from "react-icons/fa";
import { FaWandMagicSparkles } from "react-icons/fa6";

type Resume = {
	id: number;
	name: string;
	lastModified: string;
	status: "Draft" | "Completed";
};

const initialResumes: Resume[] = [
	// { id: 1, name: "Frontend Developer Resume", lastModified: "2025-08-25", status: "Completed" },
	// { id: 2, name: "Data Analyst Resume", lastModified: "2025-08-20", status: "Draft" },
	// { id: 3, name: "Product Manager Resume", lastModified: "2025-08-15", status: "Draft" },
];

export default function ResumeDashboardPage() {
	const [resumes] = useState<Resume[]>(initialResumes);
	const [search, setSearch] = useState("");
	const [filter, setFilter] = useState<"All" | "Draft" | "Completed" | "Shared">("All");
	const [sort, setSort] = useState<"recent" | "az">("recent");

	const filteredResumes = resumes
		.filter((resume) => resume.name.toLowerCase().includes(search.toLowerCase()))
		.filter((resume) => (filter === "All" ? true : resume.status === filter))
		.sort((a, b) => {
			if (sort === "recent") {
				return new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime();
			}
			return a.name.localeCompare(b.name);
		});

	return (
		<div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 p-4 sm:p-6 lg:p-8">
			<div className="max-w-7xl mx-auto space-y-8">
				{/* Top Section: Title + Actions */}
				<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
					<div>
						<h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-green-800 bg-clip-text text-transparent">
							Manage Your Resumes
						</h1>
						<p className="text-gray-600 mt-2">Create, edit, and manage your professional resumes</p>
					</div>
					<div className="flex flex-col sm:flex-row gap-3">
						<button className="group px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold">
							<span className="flex items-center gap-2">
								<svg
									className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M12 4v16m8-8H4"
									/>
								</svg>
								Create New Resume
							</span>
						</button>
						<button className="px-6 py-3 border-2 border-green-200 text-green-700 rounded-xl hover:bg-green-50 hover:border-green-300 transition-all duration-300 font-semibold backdrop-blur-sm bg-white/70">
							Search Templates
						</button>
					</div>
				</div>

				{/* Search + Filters + Sort */}
				<div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-green-200">
					<div className="flex flex-col lg:flex-row gap-4">
						{/* Search */}
						<div className="relative flex-1">
							<FaSearch className="h-5 w-5 text-green-500 absolute top-3.5 left-4 z-10" />
							<input
								type="text"
								placeholder="Search resumes..."
								value={search}
								onChange={(e) => setSearch(e.target.value)}
								className="w-full pl-12 pr-4 py-3 border-2 border-green-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-white/80 backdrop-blur-sm"
							/>
						</div>

						{/* Filters */}
						<select
							value={filter}
							onChange={(e) =>
								setFilter(e.target.value as "All" | "Draft" | "Completed" | "Shared")
							}
							className="border-2 border-green-200 rounded-xl px-4 py-3 bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 min-w-[140px]"
						>
							<option value="All">All Status</option>
							<option value="Draft">Draft</option>
							<option value="Completed">Completed</option>
							<option value="Shared">Shared</option>
						</select>

						{/* Sort */}
						<select
							value={sort}
							onChange={(e) => setSort(e.target.value as "recent" | "az")}
							className="border-2 border-green-200 rounded-xl px-4 py-3 bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 min-w-[160px]"
						>
							<option value="recent">Sort by Recent</option>
							<option value="az">Sort A–Z</option>
						</select>
					</div>
				</div>

				{/* Resume List */}
				{filteredResumes.length > 0 ? (
					<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
						{filteredResumes.map((resume) => (
							<div
								key={resume.id}
								className="group bg-white/80 backdrop-blur-sm border-2 border-green-200 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:border-green-300"
							>
								<div className="flex justify-between items-start mb-4">
									<div className="flex-1">
										<h2 className="font-bold text-lg text-gray-800 group-hover:text-green-700 transition-colors duration-200 line-clamp-2">
											{resume.name}
										</h2>
										<p className="text-sm text-gray-500 mt-1">
											Last modified: <span className="font-medium">{resume.lastModified}</span>
										</p>
									</div>
								</div>

								{/* Status Badge */}
								<div className="mb-4">
									<span
										className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full transition-all duration-200 ${
											resume.status === "Draft"
												? "bg-yellow-100 text-yellow-700 border border-yellow-200"
												: resume.status === "Completed"
												? "bg-green-100 text-green-700 border border-green-200"
												: "bg-blue-100 text-blue-700 border border-blue-200"
										}`}
									>
										<div
											className={`w-2 h-2 rounded-full mr-2 ${
												resume.status === "Draft"
													? "bg-yellow-500"
													: resume.status === "Completed"
													? "bg-green-500"
													: "bg-blue-500"
											}`}
										></div>
										{resume.status}
									</span>
								</div>

								{/* Actions */}
								<div className="grid grid-cols-2 gap-2">
									<button className="flex items-center justify-center gap-1 text-sm px-3 py-2 border-2 border-green-200 rounded-lg hover:bg-green-50 hover:border-green-300 transition-all duration-200 text-green-700 font-medium">
										<FaPencilAlt className="h-4 w-4" /> Edit
									</button>
									<button className="flex items-center justify-center gap-1 text-sm px-3 py-2 border-2 border-emerald-200 rounded-lg hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-200 text-emerald-700 font-medium">
										<FaDownload className="h-4 w-4" /> Download
									</button>
									<button className="flex items-center justify-center gap-1 text-sm px-3 py-2 border-2 border-purple-200 rounded-lg hover:bg-purple-50 hover:border-purple-300 transition-all duration-200 text-purple-700 font-medium">
										<FaWandMagicSparkles className="h-4 w-4" /> AI Enhance
									</button>
									<button className="flex items-center justify-center gap-1 text-sm px-3 py-2 border-2 border-red-200 rounded-lg hover:bg-red-50 hover:border-red-300 transition-all duration-200 text-red-600 font-medium">
										<FaTrash className="h-4 w-4" /> Delete
									</button>
								</div>
							</div>
						))}
					</div>
				) : (
					// Empty State
					<div className="flex flex-col items-center justify-center py-14 text-center bg-white/60 backdrop-blur-sm border-2 border-dashed border-green-300 rounded-2xl">
						<div className="w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mb-6">
							<svg
								className="w-10 h-10 text-green-600"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
								/>
							</svg>
						</div>
						<h3 className="text-xl font-bold text-gray-800 mb-2">No resumes found</h3>
						<p className="text-gray-600 mb-6 max-w-md">
							{search || filter !== "All"
								? "Try adjusting your search criteria or filters to find resumes."
								: "Start by creating your first professional resume with our easy-to-use builder."}
						</p>
						<button className="group px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold">
							<span className="flex items-center gap-2">
								<svg
									className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M12 4v16m8-8H4"
									/>
								</svg>
								Create Your First Resume
							</span>
						</button>
					</div>
				)}
			</div>
		</div>
	);
}
