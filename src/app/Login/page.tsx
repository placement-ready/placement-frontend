'use client';

import React from "react";

const Login: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0fdf4]">
      <div className="max-w-[450px] w-full bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center">
        <h1 className="text-2xl font-bold text-center mb-2 text-[#111827]">
          Login to your<br />account.
        </h1>
        <p className="text-[#6b7280] text-center mb-4">
          Hello, welcome back to your account
        </p>
        <img
          src="/brain.png"
          alt="Brain"
          className="w-[70px] h-[70px] object-contain my-4"
        />
        <form className="w-full mt-3 flex flex-col">
          <label className="font-medium text-[1rem] text-[#16a34a] mb-1">E-mail</label>
          <input
            className="w-full p-3 rounded-lg border border-gray-200 bg-gray-50 mb-4 text-base"
            type="email"
            placeholder="example@email.com"
          />
          <label className="font-medium text-[1rem] text-[#16a34a] mb-1">Password</label>
          <input
            className="w-full p-3 rounded-lg border border-gray-200 bg-gray-50 mb-4 text-base"
            type="password"
            placeholder="Your Password"
          />
          <div className="flex justify-between items-center text-gray-400 mb-4 text-[0.97rem]">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-[#22c55e]" /> Remember me
            </label>
            <span className="text-[#22c55e] cursor-pointer">Forgot Password?</span>
          </div>
          <button
            className="w-full bg-[#22c55e] hover:bg-[#16a34a] transition text-white py-3 rounded-xl font-semibold text-[1.06rem] mb-4"
            type="submit"
          >
            Login
          </button>
        </form>
        <div className="text-center text-[#6b7280] my-2">
          <span>or sign up with</span>
        </div>
        <div className="flex justify-between w-full gap-3">
          <button className="w-full flex justify-center items-center gap-2 bg-[#f0fdf4] border border-[#d1fae5] rounded-lg p-2 hover:bg-[#bbf7d0] transition">
            <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="mr-2">
              <title>Google</title>
              <path d="M17.64 9.2045c0-.638-.057-1.252-.164-1.841H9v3.481h4.844c-.209 1.125-.842 2.078-1.795 2.717v2.258h2.908c1.703-1.57 2.683-3.885 2.683-6.615z" fill="#4285F4"/>
              <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.258c-.806.54-1.838.86-3.048.86-2.345 0-4.33-1.584-5.037-3.711H.957v2.332C2.438 15.983 5.481 18 9 18z" fill="#34A853"/>
              <path d="M3.963 10.711a5.408 5.408 0 0 1 0-3.422V4.957H.957a8.998 8.998 0 0 0 0 8.086l3.006-2.332z" fill="#FBBC05"/>
              <path d="M9 3.542c1.319 0 2.506.454 3.44 1.343l2.58-2.58C13.463.906 11.426 0 9 0 5.481 0 2.438 2.017.957 4.957l3.006 2.332C4.67 5.126 6.655 3.542 9 3.542z" fill="#EA4335"/>
            </svg>
            <span className="text-gray-700 font-medium">Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
