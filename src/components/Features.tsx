"use client";
import React from "react";

// --- 6 DISTINCTIVE CUSTOM ICONS ---
const icons = {
  evaluation: (
    <div className="relative inline-flex items-center justify-center bg-gradient-to-br from-emerald-50 to-green-100 text-emerald-600 rounded-2xl w-14 h-14 shadow-lg mb-4 group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
      {/* Glow effect */}
      <div className="absolute inset-0 bg-emerald-400 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
      {/* Shield with star for trusted AI Feedback */}
      <svg viewBox="0 0 24 24" className="w-7 h-7 relative z-10" fill="none" stroke="currentColor" strokeWidth={2.2}>
        <path d="M12 3l7.5 4v5c0 5-4.5 9-7.5 9S4.5 17 4.5 12V7L12 3z" />
        <path d="M12 11.5l1.06.59-.2-1.18.86-.83-1.19-.17L12 9.2l-.53 1.06-1.19.17.86.83-.2 1.18z" />
      </svg>
    </div>
  ),
  monitoring: (
    <div className="relative inline-flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 text-green-600 rounded-2xl w-14 h-14 shadow-lg mb-4 group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
      <div className="absolute inset-0 bg-green-400 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
      {/* Eye icon for monitoring */}
      <svg viewBox="0 0 24 24" className="w-7 h-7 relative z-10" fill="none" stroke="currentColor" strokeWidth={2.2}>
        <ellipse cx="12" cy="12" rx="7" ry="4.5" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    </div>
  ),
  question: (
    <div className="relative inline-flex items-center justify-center bg-gradient-to-br from-lime-50 to-green-100 text-lime-600 rounded-2xl w-14 h-14 shadow-lg mb-4 group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
      <div className="absolute inset-0 bg-lime-400 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
      {/* Chat bubble Q */}
      <svg viewBox="0 0 24 24" className="w-7 h-7 relative z-10" fill="none" stroke="currentColor" strokeWidth={2.2}>
        <path d="M4 15V6.5A2.5 2.5 0 016.5 4h11A2.5 2.5 0 0120 6.5v7A2.5 2.5 0 0117.5 16H7l-3 4v-5z" />
        <text x="9" y="12.5" fontSize="6" fill="currentColor" fontWeight="bold">?</text>
      </svg>
    </div>
  ),
  study: (
    <div className="relative inline-flex items-center justify-center bg-gradient-to-br from-teal-50 to-emerald-100 text-teal-600 rounded-2xl w-14 h-14 shadow-lg mb-4 group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
      <div className="absolute inset-0 bg-teal-400 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
      {/* Bookmark/ribbon */}
      <svg viewBox="0 0 24 24" className="w-7 h-7 relative z-10" fill="none" stroke="currentColor" strokeWidth={2.2}>
        <path d="M6 4h12v16l-6-3.5L6 20V4z" />
      </svg>
    </div>
  ),
  company: (
    <div className="relative inline-flex items-center justify-center bg-gradient-to-br from-orange-50 to-yellow-100 text-orange-600 rounded-2xl w-14 h-14 shadow-lg mb-4 group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
      <div className="absolute inset-0 bg-orange-400 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
      {/* Briefcase icon for companies */}
      <svg viewBox="0 0 24 24" className="w-7 h-7 relative z-10" fill="none" stroke="currentColor" strokeWidth={2.2}>
        <rect x="3" y="7" width="18" height="11" rx="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      </svg>
    </div>
  ),
  analytics: (
    <div className="relative inline-flex items-center justify-center bg-gradient-to-br from-cyan-50 to-blue-100 text-cyan-600 rounded-2xl w-14 h-14 shadow-lg mb-4 group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
      <div className="absolute inset-0 bg-cyan-400 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
      {/* Radar icon */}
      <svg viewBox="0 0 24 24" className="w-7 h-7 relative z-10" fill="none" stroke="currentColor" strokeWidth={2.2}>
        <circle cx="12" cy="12" r="8" />
        <path d="M12 12l4-4M12 2v10l6 6" />
      </svg>
    </div>
  ),
};

const features = [
  {
    title: "Trustworthy AI Feedback",
    icon: icons.evaluation,
    description: "Experience world-class, explainable feedback for every answer. Built for trust, not surprises.",
    highlight: "AI-Powered"
  },
  {
    title: "Real-Time Confidence Monitor",
    icon: icons.monitoring,
    description: "See how focused and confident you appear during practice—nail your first impression, live.",
    highlight: "Live Tracking"
  },
  {
    title: "Smart Q&A Generator",
    icon: icons.question,
    description: "Get spot-on, targeted questions in seconds. Simply pick a company, topic, or upload your resume.",
    highlight: "Instant"
  },
  {
    title: "Custom Learning Tracks",
    icon: icons.study,
    description: "Create, save, and follow tracks tailored to your goals. Bookmark tough questions for review.",
    highlight: "Personalized"
  },
  {
    title: "Company-Ready Simulators",
    icon: icons.company,
    description: "Practice questions and rounds that match real recruiter styles at 50+ top tech companies.",
    highlight: "50+ Companies"
  },
  {
    title: "Progress Radar",
    icon: icons.analytics,
    description: "Visualize your strengths, see trends, and celebrate every milestone. Analytics made beautiful.",
    highlight: "Visual Analytics"
  },
];

const Features: React.FC = () => (
  <section className="py-20 px-4 sm:px-8 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
    {/* Background decorative elements */}
    <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
    <div className="absolute top-40 right-10 w-72 h-72 bg-green-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
    <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-lime-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-2000"></div>
    
    <div className="max-w-7xl mx-auto relative z-10">
      <div className="flex flex-col items-center mb-16">
        {/* Badge */}
        <div className="mb-6 px-6 py-2 rounded-full bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 text-emerald-700 text-sm font-semibold tracking-wide shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center">
            <svg className="w-4 h-4 text-emerald-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Handcrafted Interview Features
          </div>
        </div>
        
        {/* Main heading */}
        <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-gray-900 text-center mb-6 leading-tight">
          Tools That Make Every{" "}
          <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
            Practice Session
          </span>{" "}
          Count
        </h2>
        
        {/* Subheading */}
        <div className="text-center max-w-3xl">
          <p className="text-gray-600 text-lg sm:text-xl leading-relaxed mb-2">
            Interactive feedback. Live preparation. Inspired analytics.
          </p>
          <p className="text-gray-500 text-base sm:text-lg">
            All designed just for you—you won't find these features anywhere else.
          </p>
        </div>
      </div>
      
      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map(({ title, icon, description, highlight }, idx) => (
          <div
            key={idx}
            className="group bg-white rounded-3xl shadow-sm border border-gray-100 p-8 flex flex-col items-start
            hover:shadow-2xl hover:border-emerald-200 hover:-translate-y-2 transition-all duration-500 ease-out
            min-h-[280px] relative overflow-hidden"
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            {/* Background gradient on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-transparent to-green-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Highlight badge */}
            <div className="absolute top-6 right-6 px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
              {highlight}
            </div>
            
            {/* Icon */}
            <div className="relative z-10">
              {icon}
            </div>
            
            {/* Content */}
            <div className="relative z-10 flex-1">
              <h3 className="font-bold text-gray-900 text-xl mb-3 group-hover:text-emerald-800 transition-colors duration-300">
                {title}
              </h3>
              <p className="text-gray-600 text-base leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                {description}
              </p>
            </div>
            
            {/* Decorative arrow */}
            <div className="absolute bottom-6 right-6 w-6 h-6 text-emerald-500 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        ))}
      </div>
      
      {/* Bottom CTA */}
      <div className="text-center mt-16">
        <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
          <span>Explore All Features</span>
          <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </div>
  </section>
);

export default Features;