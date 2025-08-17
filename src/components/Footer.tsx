"use client";
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, rgba(34, 197, 94, 0.2) 2px, transparent 2px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>
      
      {/* Green accent line */}
      <div className="h-1 bg-gradient-to-r from-emerald-400 via-green-500 to-emerald-600"></div>
      
      {/* Main Footer */}
      <div className="relative px-4 sm:px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Company Info */}
            <div className="lg:col-span-1 space-y-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-green-500 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364-.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">HireMind</span>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                Transform your interview skills from nervous to natural with AI-powered feedback and personalized practice plans.
              </p>
              <div className="flex space-x-3">
                {/* Social icons with enhanced styling */}
                <a href="#" className="group w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-gradient-to-r hover:from-emerald-500 hover:to-green-500 transition-all duration-300 hover:scale-110 hover:shadow-lg">
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="group w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-gradient-to-r hover:from-emerald-500 hover:to-green-500 transition-all duration-300 hover:scale-110 hover:shadow-lg">
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="#" className="group w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-gradient-to-r hover:from-emerald-500 hover:to-green-500 transition-all duration-300 hover:scale-110 hover:shadow-lg">
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.042-3.441.219-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.690 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.357-.631-2.750-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.990-5.367 11.990-11.986C24.007 5.367 18.641.001 12.017.001z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            {/* Product */}
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-emerald-400 mb-6">Product</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 text-sm flex items-center group">
                  <span className="w-1 h-1 bg-emerald-500 rounded-full mr-2 group-hover:w-2 transition-all duration-200"></span>
                  Features
                </a></li>
                <li><a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 text-sm flex items-center group">
                  <span className="w-1 h-1 bg-emerald-500 rounded-full mr-2 group-hover:w-2 transition-all duration-200"></span>
                  Practice Questions
                </a></li>
                <li><a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 text-sm flex items-center group">
                  <span className="w-1 h-1 bg-emerald-500 rounded-full mr-2 group-hover:w-2 transition-all duration-200"></span>
                  AI Feedback
                </a></li>
                <li><a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 text-sm flex items-center group">
                  <span className="w-1 h-1 bg-emerald-500 rounded-full mr-2 group-hover:w-2 transition-all duration-200"></span>
                  Study Plans
                </a></li>
                <li><a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 text-sm flex items-center group">
                  <span className="w-1 h-1 bg-emerald-500 rounded-full mr-2 group-hover:w-2 transition-all duration-200"></span>
                  Interview Prep
                </a></li>
                <li><a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 text-sm flex items-center group">
                  <span className="w-1 h-1 bg-emerald-500 rounded-full mr-2 group-hover:w-2 transition-all duration-200"></span>
                  Mock Interviews
                </a></li>
              </ul>
            </div>
            
            {/* Company */}
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-emerald-400 mb-6">Company</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 text-sm flex items-center group">
                  <span className="w-1 h-1 bg-emerald-500 rounded-full mr-2 group-hover:w-2 transition-all duration-200"></span>
                  About Us
                </a></li>
                <li><a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 text-sm flex items-center group">
                  <span className="w-1 h-1 bg-emerald-500 rounded-full mr-2 group-hover:w-2 transition-all duration-200"></span>
                  Careers
                </a></li>
                <li><a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 text-sm flex items-center group">
                  <span className="w-1 h-1 bg-emerald-500 rounded-full mr-2 group-hover:w-2 transition-all duration-200"></span>
                  Blog
                </a></li>
                <li><a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 text-sm flex items-center group">
                  <span className="w-1 h-1 bg-emerald-500 rounded-full mr-2 group-hover:w-2 transition-all duration-200"></span>
                  Press
                </a></li>
                <li><a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 text-sm flex items-center group">
                  <span className="w-1 h-1 bg-emerald-500 rounded-full mr-2 group-hover:w-2 transition-all duration-200"></span>
                  Partners
                </a></li>
                <li><a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 text-sm flex items-center group">
                  <span className="w-1 h-1 bg-emerald-500 rounded-full mr-2 group-hover:w-2 transition-all duration-200"></span>
                  Contact
                </a></li>
              </ul>
            </div>
            
            {/* Support */}
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-emerald-400 mb-6">Support</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 text-sm flex items-center group">
                  <span className="w-1 h-1 bg-emerald-500 rounded-full mr-2 group-hover:w-2 transition-all duration-200"></span>
                  Help Center
                </a></li>
                <li><a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 text-sm flex items-center group">
                  <span className="w-1 h-1 bg-emerald-500 rounded-full mr-2 group-hover:w-2 transition-all duration-200"></span>
                  Documentation
                </a></li>
                <li><a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 text-sm flex items-center group">
                  <span className="w-1 h-1 bg-emerald-500 rounded-full mr-2 group-hover:w-2 transition-all duration-200"></span>
                  API Reference
                </a></li>
                <li><a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 text-sm flex items-center group">
                  <span className="w-1 h-1 bg-emerald-500 rounded-full mr-2 group-hover:w-2 transition-all duration-200"></span>
                  Community
                </a></li>
                <li><a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 text-sm flex items-center group">
                  <span className="w-1 h-1 bg-emerald-500 rounded-full mr-2 group-hover:w-2 transition-all duration-200"></span>
                  Privacy Policy
                </a></li>
                <li><a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 text-sm flex items-center group">
                  <span className="w-1 h-1 bg-emerald-500 rounded-full mr-2 group-hover:w-2 transition-all duration-200"></span>
                  Terms of Service
                </a></li>
              </ul>
            </div>
          </div>
          
          {/* Newsletter Section */}
          <div className="mt-12 p-8 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex-1">
                <h4 className="text-xl font-bold text-emerald-400 mb-2 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Stay Updated
                </h4>
                <p className="text-gray-300 text-sm">Get interview tips and product updates delivered to your inbox.</p>
              </div>
              <div className="flex gap-3 items-center w-full md:w-auto">
                <div className="relative flex-1 md:w-64">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 bg-gray-800/80 border border-gray-600 rounded-xl text-sm text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                  />
                </div>
                <button className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-500 text-sm text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-green-600 transition-all duration-200 hover:scale-105 hover:shadow-lg whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="relative border-t border-gray-700/50 bg-gray-900/50 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-gray-400 text-sm">© 2025 HireMind. All rights reserved.</p>
              <div className="flex items-center space-x-6">
                <span className="text-gray-400 text-sm flex items-center">
                  Made with
                  <svg className="w-4 h-4 text-red-500 mx-1 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                  for job seekers
                </span>
                <a href="#" className="text-gray-400 hover:text-emerald-400 text-sm transition-colors duration-200">Status</a>
                <a href="#" className="text-gray-400 hover:text-emerald-400 text-sm transition-colors duration-200">Security</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;