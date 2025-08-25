'use client'
import React, { useEffect, useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import type { ChartData, ChartOptions } from "chart.js";
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Filler
} from "chart.js";

ChartJS.register(LineElement, BarElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend, Filler);

// Colors
const BLUE = "#4185f4";
const ORANGE = "#ff9800";
const PURPLE = "#8e44ad";
const AXIS = "#b0b0b0";

// Line/Area chart data
const areaLabels = ["2019", "2020", "2021", "2022", "2023"];
const areaData: ChartData<"line"> = {
  labels: areaLabels,
  datasets: [
    {
      label: "Performance",
      data: [15, 25, 40, 55, 80],
      borderColor: BLUE,
      backgroundColor: (context: any) => {
        const chart = context.chart;
        const { ctx, chartArea } = chart;
        if (!chartArea) {
          return 'rgba(65, 133, 244, 0.3)';
        }
        const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
        gradient.addColorStop(0, 'rgba(65, 133, 244, 0.8)');
        gradient.addColorStop(1, 'rgba(65, 133, 244, 0.05)');
        return gradient;
      },
      borderWidth: 3,
      tension: 0.4,
      fill: true,
      pointRadius: 6,
      pointBackgroundColor: '#fff',
      pointBorderColor: BLUE,
      pointBorderWidth: 2,
      pointHoverRadius: 10,
      pointHoverBackgroundColor: "#72bbe2ff",
      pointHoverBorderColor: "#1159e0ff",
      pointHoverBorderWidth: 4
    },
  ]
};

const areaOptions: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  animation: { duration: 1500, easing: "easeOutQuart" },
  plugins: {
    legend: { display: false },
    tooltip: {
      mode: "index",
      intersect: false,
      backgroundColor: 'rgba(0,0,0,0.8)',
      titleColor: '#fff',
      bodyColor: '#fff',
      cornerRadius: 8,
      displayColors: false
    }
  },
  scales: {
    y: {
      min: 0, max: 100,
      ticks: { stepSize: 20, color: '#999', font: { size: 12 } },
      grid: { color: "rgba(0,0,0,0.05)" },
      border: { display: false }
    },
    x: {
      ticks: { color: '#999', font: { size: 12 } },
      grid: { display: false },
      border: { display: false }
    }
  },
  elements: { point: { hoverBorderWidth: 4 } },
  onHover: (event, chartElement, chart) => {
    if (chart && chart.canvas) {
      chart.canvas.style.cursor = chartElement && chartElement.length ? "pointer" : "default";
    }
  }
};

// Bar chart data
const categories = ["DSA", "Core", "Communication"];
const barData: ChartData<"bar"> = {
  labels: categories,
  datasets: [
    {
      label: "Strengths",
      data: [76, 68, 58],
      backgroundColor: PURPLE,
      hoverBackgroundColor: "#a685cd",
      borderRadius: 8,
      barThickness: 24,
    },
    {
      label: "Weaknesses",
      data: [24, 32, 42],
      backgroundColor: ORANGE,
      hoverBackgroundColor: "#ffbb70",
      borderRadius: 8,
      barThickness: 24,
    }
  ]
};

const barOptions: ChartOptions<"bar"> = {
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    duration: 1200,
    easing: "easeOutBounce",
  },
  plugins: {
    legend: {
      position: "top",
      labels: { color: AXIS, font: { weight: "bold" } }
    },
    tooltip: { enabled: true }
  },
  scales: {
    y: {
      beginAtZero: true,
      max: 100,
      ticks: { color: AXIS, stepSize: 20 },
      grid: { color: "#e0e0e0" }
    },
    x: {
      ticks: { color: AXIS },
      grid: { color: "#fafafa" }
    }
  },
  onHover: (event, chartElement, chart) => {
    if (chart && chart.canvas) {
      chart.canvas.style.cursor = chartElement && chartElement.length ? "pointer" : "default";
    }
  }
};

// The pill status header
const Pill = ({ text }: { text: string }) => (
  <div
    className="inline-flex items-center px-5 py-2 rounded-full bg-gradient-to-r from-emerald-50 via-green-50 to-emerald-50 border border-emerald-200/50 backdrop-blur-sm shadow transition-all duration-700 hover:scale-105 hover:shadow-md mt-20"
    style={{ minWidth: 0, maxWidth: "100%", justifyContent: "center" }}
  >
    <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></span>
    <svg
      className="w-5 h-5 text-emerald-500 mr-2"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <circle cx="12" cy="12" r="12" fill="#10b981" opacity="0.13"/>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2l4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
    </svg>
    <span className="text-emerald-700 font-medium text-sm tracking-wide whitespace-nowrap">{text}</span>
  </div>
);

const PerformanceCharts = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    // Animate pill in
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  return (
    <div
      className="mx-auto my-12 w-full max-w-7xl relative py-16"
      style={{
        background:
          "radial-gradient(ellipse at top left, #c7f5e4 0%, #e5e9fa 100%), url('https://www.transparenttextures.com/patterns/symphony.png') repeat",
        minHeight: "100vh",
        overflow: "hidden"
      }}
    >
      <div className="flex flex-col items-center relative z-10">
        <div
          className={`mb-6 transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <Pill text="Goal Exceeded" />
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 text-center mb-5 leading-tight">
            Performance{" "}
            <span className="relative">
              <span className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent">
                Dashboard
              </span>
              <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-400 to-green-400 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            </span>
        </h2>
        <div className="flex gap-7 justify-center items-stretch flex-nowrap">
          <div
            className="w-[500px] h-[400px] bg-white rounded-xl shadow-lg border border-gray-100 flex flex-col justify-between p-6 transition-transform duration-300 hover:scale-[1.03] hover:shadow-2xl hover:brightness-105"
          >
            <h3 className="text-[1.5em] font-bold mb-4 text-[#4185f4]">
              Performance Over Time
            </h3>
            <div className="flex-1">
              <Line data={areaData} options={areaOptions} />
            </div>
          </div>
          <div
            className="w-[500px] h-[400px] bg-white rounded-xl shadow-lg border border-gray-100 flex flex-col justify-between p-6 transition-transform duration-300 hover:scale-[1.03] hover:shadow-2xl hover:brightness-105"
          >
            <h3 className="text-[1.5em] font-bold mb-4 text-[#8e44ad]">
              Strength & Weakness
            </h3>
            <div className="flex-1">
              <Bar data={barData} options={barOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceCharts;
