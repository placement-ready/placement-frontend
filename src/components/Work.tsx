"use client";
import React from "react";

const steps = [
  {
    number: 1,
    title: "Choose Your Path",
    description: "Select from curated questions, study plans, or generate custom questions using AI.",
    bgGradient: "from-blue-400 to-indigo-500",
    glowColor: "shadow-blue-200",
    accentColor: "bg-blue-500",
    textColor: "text-blue-600",
    lightBg: "bg-blue-50",
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2l4-4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    number: 2,
    title: "Practice with AI",
    description: "Answer questions while Face-API.js monitors your behavior and AI evaluates your responses.",
    bgGradient: "from-purple-400 to-pink-500",
    glowColor: "shadow-purple-200",
    accentColor: "bg-purple-500",
    textColor: "text-purple-600",
    lightBg: "bg-purple-50",
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
  {
    number: 3,
    title: "Get Detailed Feedback",
    description: "Receive comprehensive feedback, behavioral analysis, and actionable improvement suggestions.",
    bgGradient: "from-emerald-400 to-green-500",
    glowColor: "shadow-emerald-200",
    accentColor: "bg-emerald-500",
    textColor: "text-emerald-600",
    lightBg: "bg-emerald-50",
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2l4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  }
];

const Work: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-8 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Enhanced background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float-delay-1"></div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-to-r from-emerald-100 to-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float-delay-2"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Enhanced header */}
        <div className="flex flex-col items-center mb-14">
          {/* Premium badge */}
          <div className="group mb-6 px-6 py-2 rounded-full bg-gradient-to-r from-emerald-50 via-green-50 to-emerald-50 border border-emerald-200/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse mr-2"></div>
              <svg className="w-5 h-5 text-emerald-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2l4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-emerald-700 font-medium text-xs tracking-wide">Simple Process</span>
            </div>
          </div>
          
          {/* Dynamic heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 text-center mb-5 leading-tight">
            How It{" "}
            <span className="relative">
              <span className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent">
                Works
              </span>
              <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-400 to-green-400 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            </span>
          </h2>
          
          {/* Enhanced subheading */}
          <p className="text-gray-600 text-base sm:text-lg text-center max-w-2xl leading-relaxed">
            Three simple steps to{" "}
            <span className="font-semibold text-emerald-600">interview mastery</span>
          </p>
        </div>

        {/* Steps with floating cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-6 mb-14">
          {steps.map((step, idx) => (
            <div key={idx} className="relative group">
              {/* Animated connecting line */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute top-20 left-1/2 w-full z-0">
                  <div className="relative h-0.5 bg-gradient-to-r from-gray-200 via-gray-300 to-transparent transform translate-x-12">
                    <div className="absolute top-1/2 right-8 transform -translate-y-1/2 animate-pulse">
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Card */}
              <div className="relative transform group-hover:-translate-y-2 transition-all duration-500 ease-out">
                {/* Card background */}
                <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/50 group-hover:shadow-2xl transition-all duration-500">
                  
                  {/* Number circle */}
                  <div className="relative mx-auto mb-6 w-16 h-16 flex items-center justify-center">
                    {/* Outer glow ring */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${step.bgGradient} rounded-full opacity-20 scale-110 group-hover:scale-125 transition-transform duration-500 ${step.glowColor} shadow-xl`}></div>
                    
                    {/* Main circle */}
                    <div className={`relative w-full h-full bg-gradient-to-r ${step.bgGradient} rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                      {/* Number */}
                      <span className="text-white text-lg font-black transition-all duration-300 group-hover:scale-0">
                        {step.number}
                      </span>
                      {/* Icon overlay */}
                      <div className="absolute inset-0 flex items-center justify-center text-white scale-0 group-hover:scale-100 transition-all duration-300 delay-100">
                        {step.icon}
                      </div>
                    </div>
                    {/* Particles */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className={`absolute -top-2 -right-2 w-2 h-2 ${step.accentColor} rounded-full animate-ping`}></div>
                      <div className={`absolute -bottom-2 -left-2 w-1.5 h-1.5 ${step.accentColor} rounded-full animate-ping delay-300`}></div>
                    </div>
                  </div>
                  {/* Content */}
                  <div className="text-center">
                    <h3 className={`text-lg sm:text-xl font-bold text-gray-900 mb-4 group-hover:${step.textColor} transition-colors duration-300`}>
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700 transition-colors duration-300 mb-3">
                      {step.description}
                    </p>
                    {/* Progress indicator */}
                    <div className="flex justify-center">
                      <div className={`w-10 h-1 ${step.lightBg} rounded-full overflow-hidden`}>
                        <div className={`h-full bg-gradient-to-r ${step.bgGradient} rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 delay-200`}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="inline-flex flex-col items-center max-w-xl mx-auto">
            <div className="mb-6 p-6 bg-gradient-to-br from-white/60 to-emerald-50/60 backdrop-blur-xl rounded-2xl border border-white/50 shadow-xl">
              <p className="text-gray-600 text-sm leading-relaxed mb-1">
                Ready to transform your interview skills?
              </p>
              <p className="text-gray-500 text-sm">
                Join thousands who've mastered their interviews with HireMind.
              </p>
            </div>
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300 animate-pulse"></div>
              <button className="relative px-7 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-bold text-base rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95">
                <span className="flex items-center">
                  Start Your Practice Journey
                  <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        .animate-float {
          animation: float 20s ease-in-out infinite;
        }
        .animate-float-delay-1 {
          animation: float 20s ease-in-out infinite 5s;
        }
        .animate-float-delay-2 {
          animation: float 20s ease-in-out infinite 10s;
        }
      `}</style>
    </section>
  );
};

export default Work;
