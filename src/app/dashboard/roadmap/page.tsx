"use client";

import React, { useState, useCallback, useRef } from "react";
import ReactFlow, {
  Controls,
  MiniMap,
  Node,
  Edge,
  Background,
} from "reactflow";
import "reactflow/dist/style.css";
import { Search, FileImage, FileText, Menu, X } from "lucide-react";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";

// Sidebar items for navigation
const sidebarItems = [
  { id: "dashboard", label: "Dashboard", icon: "📊" },
  { id: "practice", label: "Practice", icon: "🎯" },
  { id: "company-questions", label: "Company Questions", icon: "🏢" },
  { id: "interview-practice", label: "Interview Practice", icon: "🎤" },
  { id: "schedule-interview", label: "Schedule Interview", icon: "📅" },
  { id: "mentor", label: "Mentor", icon: "👨‍🏫" },
  { id: "roadmap", label: "Roadmap", icon: "🗺️", active: true },
];

// Sample roadmap data for different fields, expand as needed!
const roadmapData: Record<
  string,
  { title: string; nodes: Node[]; edges: Edge[] }
> = {
  "mobile-development": {
    title: "📱 Mobile Development Roadmap",
    nodes: [
      {
        id: "Mobile",
        data: { label: "Mobile Development" },
        position: { x: 400, y: 30 },
        style: {
          background: "#10b981",
          color: "white",
          border: "2px solid #047857",
          borderRadius: 8,
          fontWeight: 700,
          minWidth: 160,
          padding: 8,
        },
        type: "input",
      },
      {
        id: "Native",
        data: { label: "Native Development" },
        position: { x: 250, y: 180 },
        style: { background: "#34d399", color: "white", borderRadius: 8, padding: 6 },
      },
      {
        id: "CrossPlatform",
        data: { label: "Cross Platform" },
        position: { x: 550, y: 180 },
        style: { background: "#34d399", color: "white", borderRadius: 8, padding: 6 },
      },
      {
        id: "Android",
        data: { label: "Android (Kotlin)" },
        position: { x: 150, y: 300 },
        style: { background: "#6ee7b7", color: "#065f46", borderRadius: 8, padding: 4 },
      },
      {
        id: "iOS",
        data: { label: "iOS (Swift)" },
        position: { x: 350, y: 300 },
        style: { background: "#6ee7b7", color: "#065f46", borderRadius: 8, padding: 4 },
      },
      {
        id: "ReactNative",
        data: { label: "React Native" },
        position: { x: 450, y: 300 },
        style: { background: "#6ee7b7", color: "#065f46", borderRadius: 8, padding: 4 },
      },
      {
        id: "Flutter",
        data: { label: "Flutter" },
        position: { x: 580, y: 300 },
        style: { background: "#6ee7b7", color: "#065f46", borderRadius: 8, padding: 4 },
      },
      {
        id: "Xamarin",
        data: { label: "Xamarin" },
        position: { x: 710, y: 300 },
        style: { background: "#6ee7b7", color: "#065f46", borderRadius: 8, padding: 4 },
      },
    ],
    edges: [
      { id: "e1", source: "Mobile", target: "Native", animated: true, style: { stroke: "#10b981", strokeWidth: 2 } },
      { id: "e2", source: "Mobile", target: "CrossPlatform", animated: true, style: { stroke: "#10b981", strokeWidth: 2 } },
      { id: "e3", source: "Native", target: "Android", type: "smoothstep" },
      { id: "e4", source: "Native", target: "iOS", type: "smoothstep" },
      { id: "e5", source: "CrossPlatform", target: "ReactNative", type: "smoothstep" },
      { id: "e6", source: "CrossPlatform", target: "Flutter", type: "smoothstep" },
      { id: "e7", source: "CrossPlatform", target: "Xamarin", type: "smoothstep" },
    ],
  },
  // Add more roadmapData fields as needed...
};

const RoadmapPlatform: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRoadmap, setSelectedRoadmap] = useState<keyof typeof roadmapData>("mobile-development");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const flowRef = useRef<HTMLDivElement>(null);

  // Filter roadmaps based on search
  const filteredRoadmaps = Object.entries(roadmapData).filter(([key, roadmap]) =>
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
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 w-64 bg-emerald-50 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between p-4 border-b border-emerald-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white font-bold">
              H
            </div>
            <span className="text-emerald-800 font-bold text-lg">HireMind</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-emerald-600"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-400" size={16} />
            <input
              type="text"
              placeholder="Search roadmaps..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
            />
          </div>
        </div>
        <nav className="mt-4">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              className={`w-full flex items-center px-6 py-3 text-left hover:bg-emerald-100 transition-colors ${
                item.active ? 'bg-emerald-500 text-white' : 'text-emerald-700'
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-white rounded-lg p-3 border border-emerald-200">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
                U
              </div>
              <div>
                <div className="font-medium text-emerald-800">User</div>
                <div className="text-sm text-emerald-600">Student</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-600"
              >
                <Menu size={24} />
              </button>
              <h1 className="text-2xl font-bold text-emerald-800">
                {currentRoadmap.title}
              </h1>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={downloadPng}
                className="flex items-center px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors"
              >
                <FileImage size={16} className="mr-2" />
                PNG
              </button>
              <button
                onClick={downloadPdf}
                className="flex items-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
              >
                <FileText size={16} className="mr-2" />
                PDF
              </button>
            </div>
          </div>
        </header>

        {/* Roadmap Selection */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex flex-wrap gap-2">
            {filteredRoadmaps.map(([key, roadmap]) => (
              <button
                key={key}
                onClick={() => setSelectedRoadmap(key as keyof typeof roadmapData)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedRoadmap === key
                    ? 'bg-emerald-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-emerald-100'
                }`}
              >
                {roadmap.title}
              </button>
            ))}
          </div>
        </div>

        {/* Flow Chart */}
        <div className="flex-1 p-6">
          <div
            ref={flowRef}
            className="bg-white rounded-xl shadow-lg h-full border border-emerald-200 overflow-hidden"
          >
            <ReactFlow
              nodes={currentRoadmap.nodes}
              edges={currentRoadmap.edges}
              fitView
              nodesDraggable={false}
              nodesConnectable={false}
              zoomOnScroll={true}
              panOnDrag={true}
              className="bg-emerald-50"
            >
              <Background type="dots" gap={20} size={1} color="#10b981" />
              <Controls className="bg-white border border-emerald-200" />
              <MiniMap
                nodeColor="#10b981"
                maskColor="rgba(16, 185, 129, 0.1)"
                className="bg-white border border-emerald-200"
              />
            </ReactFlow>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 px-6 py-3">
          <p className="text-sm text-gray-500 text-center">
            Inspired by roadmap.sh • Interactive Learning Platform • HireMind
          </p>
        </footer>
      </div>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default RoadmapPlatform;
