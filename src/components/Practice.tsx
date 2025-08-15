"use client";
import React, { useState, useEffect } from "react";

const questionTypes = [
  {
    title: "Behavioral Questions",
    description:
      "Master the STAR method with questions about your experience, leadership, and problem-solving skills.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="w-7 h-7"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
    ),
    bgGradient: "from-blue-400 to-indigo-500",
    lightBg: "bg-blue-50",
    darkBg: "bg-blue-500",
    textColor: "text-blue-600",
    borderColor: "border-blue-200",
    tags: ["STAR Method", "Leadership", "Teamwork"],
    tagColors: [
      "bg-blue-100 text-blue-700",
      "bg-blue-100 text-blue-700",
      "bg-blue-100 text-blue-700",
    ],
  },
  {
    title: "Technical Questions",
    description:
      "Frontend, backend, system design, and coding challenges from top tech companies.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="w-7 h-7"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
        />
      </svg>
    ),
    bgGradient: "from-purple-400 to-pink-500",
    lightBg: "bg-purple-50",
    darkBg: "bg-purple-500",
    textColor: "text-purple-600",
    borderColor: "border-purple-200",
    tags: ["System Design", "Algorithms", "Architecture"],
    tagColors: [
      "bg-purple-100 text-purple-700",
      "bg-purple-100 text-purple-700",
      "bg-purple-100 text-purple-700",
    ],
  },
  {
    title: "Situational Questions",
    description:
      "Handle hypothetical scenarios, crisis management, and decision-making challenges.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="w-7 h-7"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.663 17h4.673M12 3v1m6.364-.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        />
      </svg>
    ),
    bgGradient: "from-emerald-400 to-green-500",
    lightBg: "bg-emerald-50",
    darkBg: "bg-emerald-500",
    textColor: "text-emerald-600",
    borderColor: "border-emerald-200",
    tags: [
      "Crisis Management",
      "Decision Making",
      "Problem Solving",
    ],
    tagColors: [
      "bg-emerald-100 text-emerald-700",
      "bg-emerald-100 text-emerald-700",
      "bg-emerald-100 text-emerald-700",
    ],
  },
];

const Practice: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="py-20 px-4 sm:px-8 bg-gradient-to-br from-gray-50 via-white to-emerald-50/30 relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-emerald-200/30 rounded-full animate-pulse`}
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 2) * 40}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i * 0.5}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center mb-12">
          <div
            className={`group mb-6 px-6 py-2 rounded-full bg-gradient-to-r from-emerald-50 via-green-50 to-emerald-50 border border-emerald-200/50 backdrop-blur-sm shadow transition-all duration-700 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            } hover:scale-105 hover:shadow-md`}
          >
            <div className="flex items-center">
              <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></div>
              <svg
                className="w-5 h-5 text-emerald-500 mr-2 group-hover:rotate-12 transition-transform duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2l4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-emerald-700 font-medium text-xs tracking-wide">
                Comprehensive Coverage
              </span>
            </div>
          </div>

          <h2
            className={`text-3xl sm:text-4xl font-black text-gray-900 text-center mb-5 leading-tight transition-all duration-700 delay-200 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            Practice All{" "}
            <span className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent">
              Question Types
            </span>
          </h2>

          {/* Removed animation here */}
          <p className="text-gray-600 text-base sm:text-lg text-center max-w-3xl leading-relaxed">
            Comprehensive coverage for{" "}
            <span className="font-semibold text-emerald-600 hover:text-emerald-700 transition-colors duration-300">
              every interview scenario
            </span>
          </p>
        </div>

        {/* Questions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {questionTypes.map((type, idx) => (
            <div
              key={idx}
              className={`group relative transform transition-all duration-700 delay-${
                (idx + 1) * 200
              } ease-out ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
              } hover:-translate-y-3 hover:scale-105`}
              onMouseEnter={() => setHoveredCard(idx)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Card */}
              <div className="relative bg-white/90 backdrop-blur rounded-2xl p-6 shadow border border-white/50 group-hover:shadow-2xl group-hover:shadow-emerald-500/10 transition-all duration-500 overflow-hidden min-h-[300px]">
                {/* Animated background gradient on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${type.bgGradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl`}
                />

                {/* Sparkle effect */}
                {hoveredCard === idx && (
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full animate-ping opacity-70"
                        style={{
                          left: `${20 + i * 30}%`,
                          top: `${15 + i * 20}%`,
                          animationDelay: `${i * 0.2}s`,
                        }}
                      />
                    ))}
                  </div>
                )}

                {/* Icon */}
                <div className="relative mb-5 flex items-center justify-center">
                  <div
                    className={`w-14 h-14 bg-gradient-to-r ${type.bgGradient} rounded-xl flex items-center justify-center transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 shadow-lg group-hover:shadow-xl`}
                  >
                    <span className="relative z-10 text-white transform group-hover:scale-110 transition-transform duration-300">
                      {type.icon}
                    </span>
                  </div>

                  {/* Pulse ring effect */}
                  <div
                    className={`absolute w-14 h-14 bg-gradient-to-r ${type.bgGradient} rounded-xl opacity-0 group-hover:opacity-30 group-hover:scale-150 transition-all duration-700 ease-out`}
                  />
                </div>

                {/* Content */}
                <div className="relative z-10 text-center">
                  <h3
                    className={`text-lg font-bold text-gray-900 mb-4 group-hover:${type.textColor} transition-all duration-300 group-hover:scale-105`}
                  >
                    {type.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700 transition-colors duration-300 mb-5 group-hover:scale-105">
                    {type.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 justify-center">
                    {type.tags.map((tag, tagIdx) => (
                      <div
                        key={tagIdx}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold ${type.tagColors[tagIdx]} border border-white/50 backdrop-blur-sm transition-all duration-300 hover:scale-110 transform group-hover:-translate-y-1`}
                        style={{ animationDelay: `${tagIdx * 0.1}s` }}
                      >
                        {tag}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Animated border */}
                <div
                  className={`absolute inset-0 rounded-2xl border-2 ${type.borderColor} opacity-0 group-hover:opacity-50 transition-opacity duration-500 animate-pulse`}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          className={`text-center mt-14 transition-all duration-700 delay-1000 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="inline-flex flex-col items-center max-w-2xl mx-auto">
            <button className="px-8 py-3 bg-white/90 backdrop-blur border border-emerald-200 text-emerald-700 font-semibold text-base rounded-full shadow transition-all duration-300 hover:bg-emerald-50 hover:scale-105 hover:shadow-lg hover:-translate-y-1 active:scale-95 group relative overflow-hidden">
              <span className="relative z-10 flex items-center">
                View All Questions
                <svg
                  className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Practice;
