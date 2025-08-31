"use client";

import React, { useState, useCallback, useRef } from "react";
import ReactFlow, { Controls, MiniMap, Node, Edge, Background } from "reactflow";
import "reactflow/dist/style.css";
import { Search, FileImage, FileText, Globe, Smartphone, Brain } from "lucide-react";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";

// Mock roadmap data for different fields
const roadmapData: Record<
	string,
	{ title: string; description: string; icon: React.ReactNode; nodes: Node[]; edges: Edge[] }
> = {
	"web-development": {
		title: "Web Development",
		description: "Frontend & Backend Development Path",
		icon: <Globe className="w-5 h-5" />,
		nodes: [
			{
				id: "start",
				data: { label: "Web Development Journey" },
				position: { x: 400, y: 50 },
				style: {
					background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
					color: "white",
					border: "2px solid #059669",
					borderRadius: 12,
					fontWeight: 700,
					minWidth: 200,
					padding: 12,
					fontSize: 16,
				},
				type: "input",
			},
			{
				id: "basics",
				data: { label: "Web Basics" },
				position: { x: 400, y: 180 },
				style: {
					background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
					color: "white",
					borderRadius: 10,
					padding: 8,
					fontWeight: 600,
				},
			},
			{
				id: "html",
				data: { label: "HTML5" },
				position: { x: 200, y: 300 },
				style: {
					background: "#e34c26",
					color: "white",
					borderRadius: 8,
					padding: 6,
				},
			},
			{
				id: "css",
				data: { label: "CSS3" },
				position: { x: 350, y: 300 },
				style: {
					background: "#1572b6",
					color: "white",
					borderRadius: 8,
					padding: 6,
				},
			},
			{
				id: "javascript",
				data: { label: "JavaScript" },
				position: { x: 500, y: 300 },
				style: {
					background: "#f7df1e",
					color: "#323330",
					borderRadius: 8,
					padding: 6,
					fontWeight: 600,
				},
			},
			{
				id: "git",
				data: { label: "Git & GitHub" },
				position: { x: 650, y: 300 },
				style: {
					background: "#f05032",
					color: "white",
					borderRadius: 8,
					padding: 6,
				},
			},
			{
				id: "frontend",
				data: { label: "Frontend Frameworks" },
				position: { x: 250, y: 450 },
				style: {
					background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
					color: "white",
					borderRadius: 10,
					padding: 8,
					fontWeight: 600,
				},
			},
			{
				id: "backend",
				data: { label: "Backend Development" },
				position: { x: 550, y: 450 },
				style: {
					background: "linear-gradient(135deg, #059669 0%, #047857 100%)",
					color: "white",
					borderRadius: 10,
					padding: 8,
					fontWeight: 600,
				},
			},
			{
				id: "react",
				data: { label: "React.js" },
				position: { x: 150, y: 580 },
				style: {
					background: "#61dafb",
					color: "#20232a",
					borderRadius: 8,
					padding: 6,
				},
			},
			{
				id: "vue",
				data: { label: "Vue.js" },
				position: { x: 300, y: 580 },
				style: {
					background: "#4fc08d",
					color: "white",
					borderRadius: 8,
					padding: 6,
				},
			},
			{
				id: "node",
				data: { label: "Node.js" },
				position: { x: 450, y: 580 },
				style: {
					background: "#339933",
					color: "white",
					borderRadius: 8,
					padding: 6,
				},
			},
			{
				id: "python",
				data: { label: "Python" },
				position: { x: 600, y: 580 },
				style: {
					background: "#3776ab",
					color: "white",
					borderRadius: 8,
					padding: 6,
				},
			},
			{
				id: "database",
				data: { label: "Databases" },
				position: { x: 400, y: 720 },
				style: {
					background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
					color: "white",
					borderRadius: 10,
					padding: 8,
					fontWeight: 600,
				},
			},
			{
				id: "deployment",
				data: { label: "Deployment & DevOps" },
				position: { x: 400, y: 850 },
				style: {
					background: "linear-gradient(135deg, #059669 0%, #047857 100%)",
					color: "white",
					borderRadius: 10,
					padding: 8,
					fontWeight: 600,
				},
			},
		],
		edges: [
			{
				id: "e1",
				source: "start",
				target: "basics",
				animated: true,
				style: { stroke: "#10b981", strokeWidth: 3 },
			},
			{
				id: "e2",
				source: "basics",
				target: "html",
				type: "smoothstep",
				style: { stroke: "#10b981", strokeWidth: 2 },
			},
			{
				id: "e3",
				source: "basics",
				target: "css",
				type: "smoothstep",
				style: { stroke: "#10b981", strokeWidth: 2 },
			},
			{
				id: "e4",
				source: "basics",
				target: "javascript",
				type: "smoothstep",
				style: { stroke: "#10b981", strokeWidth: 2 },
			},
			{
				id: "e5",
				source: "basics",
				target: "git",
				type: "smoothstep",
				style: { stroke: "#10b981", strokeWidth: 2 },
			},
			{
				id: "e6",
				source: "javascript",
				target: "frontend",
				animated: true,
				style: { stroke: "#10b981", strokeWidth: 2 },
			},
			{
				id: "e7",
				source: "javascript",
				target: "backend",
				animated: true,
				style: { stroke: "#059669", strokeWidth: 2 },
			},
			{ id: "e8", source: "frontend", target: "react", type: "smoothstep" },
			{ id: "e9", source: "frontend", target: "vue", type: "smoothstep" },
			{ id: "e10", source: "backend", target: "node", type: "smoothstep" },
			{ id: "e11", source: "backend", target: "python", type: "smoothstep" },
			{
				id: "e12",
				source: "backend",
				target: "database",
				animated: true,
				style: { stroke: "#059669", strokeWidth: 2 },
			},
			{
				id: "e13",
				source: "database",
				target: "deployment",
				animated: true,
				style: { stroke: "#10b981", strokeWidth: 2 },
			},
		],
	},
	"mobile-development": {
		title: "Mobile Development",
		description: "iOS & Android Development Path",
		icon: <Smartphone className="w-5 h-5" />,
		nodes: [
			{
				id: "mobile-start",
				data: { label: "Mobile Development" },
				position: { x: 400, y: 50 },
				style: {
					background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
					color: "white",
					border: "2px solid #059669",
					borderRadius: 12,
					fontWeight: 700,
					minWidth: 200,
					padding: 12,
				},
				type: "input",
			},
			{
				id: "native",
				data: { label: "Native Development" },
				position: { x: 250, y: 200 },
				style: {
					background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
					color: "white",
					borderRadius: 10,
					padding: 8,
					fontWeight: 600,
				},
			},
			{
				id: "cross-platform",
				data: { label: "Cross Platform" },
				position: { x: 550, y: 200 },
				style: {
					background: "linear-gradient(135deg, #059669 0%, #047857 100%)",
					color: "white",
					borderRadius: 10,
					padding: 8,
					fontWeight: 600,
				},
			},
			{
				id: "android",
				data: { label: "Android (Kotlin)" },
				position: { x: 150, y: 350 },
				style: { background: "#3ddc84", color: "white", borderRadius: 8, padding: 6 },
			},
			{
				id: "ios",
				data: { label: "iOS (Swift)" },
				position: { x: 350, y: 350 },
				style: { background: "#007aff", color: "white", borderRadius: 8, padding: 6 },
			},
			{
				id: "react-native",
				data: { label: "React Native" },
				position: { x: 450, y: 350 },
				style: { background: "#61dafb", color: "#20232a", borderRadius: 8, padding: 6 },
			},
			{
				id: "flutter",
				data: { label: "Flutter" },
				position: { x: 600, y: 350 },
				style: { background: "#02569b", color: "white", borderRadius: 8, padding: 6 },
			},
		],
		edges: [
			{
				id: "me1",
				source: "mobile-start",
				target: "native",
				animated: true,
				style: { stroke: "#10b981", strokeWidth: 3 },
			},
			{
				id: "me2",
				source: "mobile-start",
				target: "cross-platform",
				animated: true,
				style: { stroke: "#10b981", strokeWidth: 3 },
			},
			{ id: "me3", source: "native", target: "android", type: "smoothstep" },
			{ id: "me4", source: "native", target: "ios", type: "smoothstep" },
			{ id: "me5", source: "cross-platform", target: "react-native", type: "smoothstep" },
			{ id: "me6", source: "cross-platform", target: "flutter", type: "smoothstep" },
		],
	},
	"data-science": {
		title: "Data Science",
		description: "AI/ML & Data Analysis Path",
		icon: <Brain className="w-5 h-5" />,
		nodes: [
			{
				id: "ds-start",
				data: { label: "Data Science Journey" },
				position: { x: 400, y: 50 },
				style: {
					background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
					color: "white",
					border: "2px solid #059669",
					borderRadius: 12,
					fontWeight: 700,
					minWidth: 200,
					padding: 12,
				},
				type: "input",
			},
			{
				id: "python-ds",
				data: { label: "Python Programming" },
				position: { x: 200, y: 200 },
				style: { background: "#3776ab", color: "white", borderRadius: 8, padding: 6 },
			},
			{
				id: "statistics",
				data: { label: "Statistics & Math" },
				position: { x: 400, y: 200 },
				style: { background: "#ff6b6b", color: "white", borderRadius: 8, padding: 6 },
			},
			{
				id: "sql",
				data: { label: "SQL & Databases" },
				position: { x: 600, y: 200 },
				style: { background: "#4ecdc4", color: "white", borderRadius: 8, padding: 6 },
			},
			{
				id: "ml",
				data: { label: "Machine Learning" },
				position: { x: 300, y: 350 },
				style: {
					background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
					color: "white",
					borderRadius: 10,
					padding: 8,
					fontWeight: 600,
				},
			},
			{
				id: "dl",
				data: { label: "Deep Learning" },
				position: { x: 500, y: 350 },
				style: {
					background: "linear-gradient(135deg, #059669 0%, #047857 100%)",
					color: "white",
					borderRadius: 10,
					padding: 8,
					fontWeight: 600,
				},
			},
		],
		edges: [
			{
				id: "dse1",
				source: "ds-start",
				target: "python-ds",
				animated: true,
				style: { stroke: "#10b981", strokeWidth: 3 },
			},
			{
				id: "dse2",
				source: "ds-start",
				target: "statistics",
				animated: true,
				style: { stroke: "#10b981", strokeWidth: 3 },
			},
			{
				id: "dse3",
				source: "ds-start",
				target: "sql",
				animated: true,
				style: { stroke: "#10b981", strokeWidth: 3 },
			},
			{ id: "dse4", source: "python-ds", target: "ml", type: "smoothstep" },
			{ id: "dse5", source: "statistics", target: "ml", type: "smoothstep" },
			{
				id: "dse6",
				source: "ml",
				target: "dl",
				animated: true,
				style: { stroke: "#10b981", strokeWidth: 2 },
			},
		],
	},
};

const RoadmapPlatform: React.FC = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedRoadmap, setSelectedRoadmap] =
		useState<keyof typeof roadmapData>("web-development");
	const flowRef = useRef<HTMLDivElement>(null);

	// Filter roadmaps based on search
	const filteredRoadmaps = Object.entries(roadmapData).filter(
		([key, roadmap]) =>
			roadmap.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			key.toLowerCase().includes(searchQuery.toLowerCase())
	);

	// Download as PNG
	const downloadPng = useCallback(() => {
		if (!flowRef.current) return;
		toPng(flowRef.current, { cacheBust: true }).then((dataUrl) => {
			const a = document.createElement("a");
			a.setAttribute("download", `${selectedRoadmap}-roadmap.png`);
			a.setAttribute("href", dataUrl);
			a.click();
		});
	}, [selectedRoadmap]);

	// Download as PDF
	const downloadPdf = useCallback(() => {
		if (!flowRef.current) return;
		toPng(flowRef.current, { cacheBust: true }).then((dataUrl) => {
			const width = flowRef.current!.offsetWidth;
			const height = flowRef.current!.offsetHeight;
			const pdf = new jsPDF({
				orientation: "landscape",
				unit: "px",
				format: [width, height],
			});
			pdf.addImage(dataUrl, "PNG", 0, 0, width, height);
			pdf.save(`${selectedRoadmap}-roadmap.pdf`);
		});
	}, [selectedRoadmap]);

	const currentRoadmap = roadmapData[selectedRoadmap];

	return (
		<div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
				{/* Header */}
				<div className="text-center mb-8">
					<h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-green-800 bg-clip-text text-transparent mb-4">
						Learning Roadmaps
					</h1>
					<p className="text-lg text-gray-600 max-w-2xl mx-auto">
						Interactive roadmaps to guide your learning journey in various tech fields
					</p>
				</div>

				{/* Search and Controls */}
				<div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 mb-8">
					<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
						{/* Search */}
						<div className="relative flex-1 max-w-md">
							<Search
								className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
								size={20}
							/>
							<input
								type="text"
								placeholder="Search roadmaps..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
							/>
						</div>

						{/* Download Buttons */}
						<div className="flex items-center gap-3">
							<button
								onClick={downloadPng}
								className="flex items-center px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
							>
								<FileImage size={16} className="mr-2" />
								<span className="hidden sm:inline">Download </span>PNG
							</button>
							<button
								onClick={downloadPdf}
								className="flex items-center px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
							>
								<FileText size={16} className="mr-2" />
								<span className="hidden sm:inline">Download </span>PDF
							</button>
						</div>
					</div>
				</div>

				{/* Roadmap Selection Cards */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
					{filteredRoadmaps.map(([key, roadmap]) => (
						<button
							key={key}
							onClick={() => setSelectedRoadmap(key as keyof typeof roadmapData)}
							className={`p-6 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
								selectedRoadmap === key
									? "bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-2xl scale-105"
									: "bg-white text-gray-700 hover:bg-gray-50 shadow-lg hover:shadow-xl border border-gray-200"
							}`}
						>
							<div className="flex items-center justify-center mb-4">
								<div
									className={`p-3 rounded-xl ${
										selectedRoadmap === key ? "bg-white/20" : "bg-gray-100"
									}`}
								>
									{roadmap.icon}
								</div>
							</div>
							<h3 className="text-lg font-bold mb-2">{roadmap.title}</h3>
							<p
								className={`text-sm ${selectedRoadmap === key ? "text-white/80" : "text-gray-500"}`}
							>
								{roadmap.description}
							</p>
						</button>
					))}
				</div>

				{/* Current Roadmap Display */}
				<div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
					<div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6">
						<div className="flex items-center gap-3">
							<div className="p-2 bg-white/20 rounded-lg">{currentRoadmap.icon}</div>
							<div>
								<h2 className="text-2xl font-bold text-white">{currentRoadmap.title} Roadmap</h2>
								<p className="text-white/80">{currentRoadmap.description}</p>
							</div>
						</div>
					</div>

					{/* Flow Chart */}
					<div className="h-[600px] lg:h-[700px]" ref={flowRef}>
						<ReactFlow
							nodes={currentRoadmap.nodes}
							edges={currentRoadmap.edges}
							fitView
							nodesDraggable={false}
							nodesConnectable={false}
							zoomOnScroll={true}
							panOnDrag={true}
							className="bg-gradient-to-br from-gray-50 to-green-50"
						>
							<Background gap={20} size={1} color="#e2e8f0" style={{ opacity: 0.5 }} />
							<Controls className="bg-white border border-gray-300 rounded-lg shadow-lg" />
							<MiniMap
								nodeColor="#10b981"
								maskColor="rgba(16, 185, 129, 0.1)"
								className="bg-white border border-gray-300 rounded-lg shadow-lg"
								style={{ width: 150, height: 100 }}
							/>
						</ReactFlow>
					</div>
				</div>

				{/* Tips Section */}
				<div className="mt-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
					<h3 className="text-xl font-bold text-gray-800 mb-4">💡 Learning Tips</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						<div className="bg-white/60 backdrop-blur-sm rounded-xl p-4">
							<h4 className="font-semibold text-gray-800 mb-2">🎯 Follow the Path</h4>
							<p className="text-sm text-gray-600">
								Follow the roadmap sequentially for best results
							</p>
						</div>
						<div className="bg-white/60 backdrop-blur-sm rounded-xl p-4">
							<h4 className="font-semibold text-gray-800 mb-2">🛠️ Practice Projects</h4>
							<p className="text-sm text-gray-600">
								Build projects at each milestone to reinforce learning
							</p>
						</div>
						<div className="bg-white/60 backdrop-blur-sm rounded-xl p-4">
							<h4 className="font-semibold text-gray-800 mb-2">📚 Additional Resources</h4>
							<p className="text-sm text-gray-600">
								Use documentation, tutorials, and courses as supplements
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RoadmapPlatform;
