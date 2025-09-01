"use client";

import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Image from "next/image";

type Template = {
	id: number;
	name: string;
	category: string;
	image: string;
};

const initialTemplates: Template[] = [
	{
		id: 1,
		name: "Modern Professional",
		category: "Professional",
		image: "/brain.png",
	},
	{ id: 2, name: "Creative Designer", category: "Creative", image: "/brain.png" },
	{ id: 3, name: "Minimalist", category: "Simple", image: "/brain.png" },
	{
		id: 4,
		name: "Corporate Executive",
		category: "Professional",
		image: "/brain.png",
	},
	{ id: 5, name: "Elegant", category: "Creative", image: "/brain.png" },
];

export default function TemplatesPage() {
	const [templates] = useState<Template[]>(initialTemplates);
	const [search, setSearch] = useState("");
	const [filter, setFilter] = useState<"All" | "Professional" | "Creative" | "Simple">("All");
	const [sort, setSort] = useState<"az" | "za">("az");

	const filteredTemplates = templates
		.filter((template) => template.name.toLowerCase().includes(search.toLowerCase()))
		.filter((template) => (filter === "All" ? true : template.category === filter))
		.sort((a, b) => {
			if (sort === "az") return a.name.localeCompare(b.name);
			if (sort === "za") return b.name.localeCompare(a.name);
			return 0;
		});

	return (
		<div className="flex flex-col bg-gradient-to-br from-green-50 via-emerald-50 to-green-100">
			{/* Fixed Header Section */}
			<div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
					{/* Title */}
					<div className="mb-6">
						<h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-green-800 bg-clip-text text-transparent">
							Choose a Resume Template
						</h1>
						<p className="text-gray-600 mt-2">
							Select from our collection of professionally designed templates
						</p>
					</div>

					{/* Search + Filters + Sort */}
					<div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-green-200">
						<div className="flex flex-col lg:flex-row gap-4">
							{/* Search */}
							<div className="relative flex-1">
								<FaSearch className="h-5 w-5 text-green-500 absolute top-3.5 left-4 z-10" />
								<input
									type="text"
									placeholder="Search templates..."
									value={search}
									onChange={(e) => setSearch(e.target.value)}
									className="w-full pl-12 pr-4 py-3 border-2 border-green-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-white/80 backdrop-blur-sm"
								/>
							</div>

							{/* Filters */}
							<select
								value={filter}
								onChange={(e) =>
									setFilter(e.target.value as "All" | "Professional" | "Creative" | "Simple")
								}
								className="border-2 border-green-200 rounded-xl px-4 py-3 bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 min-w-[160px]"
							>
								<option value="All">All Categories</option>
								<option value="Professional">Professional</option>
								<option value="Creative">Creative</option>
								<option value="Simple">Simple</option>
							</select>

							{/* Sort */}
							<select
								value={sort}
								onChange={(e) => setSort(e.target.value as "az" | "za")}
								className="border-2 border-green-200 rounded-xl px-4 py-3 bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 min-w-[140px]"
							>
								<option value="az">Sort A–Z</option>
								<option value="za">Sort Z–A</option>
							</select>
						</div>
					</div>
				</div>
			</div>

			{/* Scrollable Templates Section */}
			<div className="flex-1 overflow-y-auto bg-white/50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
					{/* Template Grid */}
					{filteredTemplates.length > 0 ? (
						<div className="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8">
							{filteredTemplates.map((template) => (
								<div
									key={template.id}
									className="group bg-white/80 backdrop-blur-sm border-2 border-green-200 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:border-green-300 overflow-hidden"
								>
									{/* Image Container */}
									<div className="relative aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
										<div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
										<Image
											src={template.image}
											alt={template.name}
											fill
											className="object-cover transition-transform duration-500 group-hover:scale-110"
											onError={(e) => {
												const target = e.target as HTMLImageElement;
												target.src =
													"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='600' viewBox='0 0 400 600'%3E%3Crect width='400' height='600' fill='%23f3f4f6'/%3E%3Ctext x='200' y='300' text-anchor='middle' fill='%236b7280' font-size='16' font-family='Arial'%3ETemplate Preview%3C/text%3E%3C/svg%3E";
											}}
										/>

										{/* Overlay with Preview Button */}
										<div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
											<button className="px-4 py-2 bg-white/90 backdrop-blur-sm text-green-700 rounded-lg font-medium shadow-lg transform scale-90 group-hover:scale-100 transition-all duration-300 hover:bg-white">
												<svg
													className="w-4 h-4 inline-block mr-2"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
													/>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
													/>
												</svg>
												Preview
											</button>
										</div>

										{/* Category Badge */}
										<div className="absolute top-3 left-3">
											<span
												className={`px-2 py-1 text-xs font-medium rounded-full backdrop-blur-sm border transition-all duration-300 ${
													template.category === "Professional"
														? "bg-blue-100/80 text-blue-700 border-blue-200"
														: template.category === "Creative"
														? "bg-purple-100/80 text-purple-700 border-purple-200"
														: "bg-gray-100/80 text-gray-700 border-gray-200"
												}`}
											>
												{template.category}
											</span>
										</div>
									</div>

									{/* Content */}
									<div className="p-5">
										<h2 className="font-bold text-lg text-gray-800 group-hover:text-green-700 transition-colors duration-200 mb-2 line-clamp-1">
											{template.name}
										</h2>
										<p className="text-sm text-gray-600 mb-4 group-hover:text-gray-700 transition-colors duration-200">
											{template.category} Template
										</p>

										<button className="w-full px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold group-hover:shadow-green-500/25">
											<span className="flex items-center justify-center gap-2">
												<svg
													className="w-4 h-4"
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
												Use Template
											</span>
										</button>
									</div>
								</div>
							))}
						</div>
					) : (
						// Enhanced Empty State
						<div className="flex flex-col items-center justify-center py-20 text-center bg-white/60 backdrop-blur-sm border-2 border-dashed border-green-300 rounded-2xl">
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
							<h3 className="text-xl font-bold text-gray-800 mb-2">No templates found</h3>
							<p className="text-gray-600 mb-6 max-w-md">
								{search || filter !== "All"
									? "Try adjusting your search criteria or filters to find templates."
									: "We're working on adding more templates. Check back soon!"}
							</p>
							{(search || filter !== "All") && (
								<button
									onClick={() => {
										setSearch("");
										setFilter("All");
									}}
									className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold"
								>
									Clear All Filters
								</button>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
