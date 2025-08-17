'use client'
import React from "react";
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
  Legend
} from "chart.js";

// Register chart types
ChartJS.register(LineElement, BarElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

// Colors
const BLUE = "#4185f4";
const ORANGE = "#ff9800";
const PURPLE = "#8e44ad";
const RED = "#e53935";
const YELLOW = "#ffd600";
const AXIS = "#b0b0b0";
const FILL = "rgba(65,133,244,0.11)";
const CARD_BG = "#fff";

// Line chart data
const perfLabels = ["May", "Jun", "Jul", "Aug", "Sep", "Oct"];
const perfData: ChartData<"line"> = {
  labels: perfLabels,
  datasets: [
    {
      label: "Performance (%)",
      data: [56, 62, 67, 72, 78, 81],
      borderColor: BLUE,
      backgroundColor: FILL,
      tension: 0.3,
      fill: true,
      pointRadius: 4,
      pointBackgroundColor: ORANGE,
    },
  ]
};

const perfOptions: ChartOptions<"line"> = {
  responsive: true,
  plugins: {
    legend: { display: false },
    tooltip: { mode: "index", intersect: false }
  },
  scales: {
    y: {
      min: 0,
      max: 100,
      ticks: { stepSize: 10, color: AXIS },
      grid: { color: "#eee" }
    },
    x: {
      ticks: { color: AXIS },
      grid: { color: "#fafafa" }
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
      borderRadius: 8,
      barThickness: 24,
    },
    {
      label: "Weaknesses",
      data: [24, 32, 42],
      backgroundColor: ORANGE,
      borderRadius: 8,
      barThickness: 24,
    }
  ]
};

const barOptions: ChartOptions<"bar"> = {
  responsive: true,
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
  }
};

const PerformanceCharts = () => (
  <div className="mx-auto my-12">
    <h2 className="font-extrabold text-center mb-8 text-4xl tracking-wide text-slate-700">
      Performance <span className="text-[#148441]">Dashboard</span>
    </h2>
    <div className="flex gap-7 justify-center items-stretch flex-nowrap">
      <div className="w-[500px] h-[400px] bg-white rounded-xl shadow-lg border-2 border-[#ecf2fa] flex flex-col justify-between p-4">
        <h3 className="text-[1.5em] font-bold mb-2 text-[#4185f4]">
          Performance Over Time
        </h3>
        <Line data={perfData} options={perfOptions} height={200} />
      </div>
      <div className="w-[500px] h-[400px] bg-white rounded-xl shadow-lg border-2 border-[#f5eef8] flex flex-col justify-between p-4">
        <h3 className="text-[1.5em] font-bold mb-2 text-[#8e44ad]">
          Strength & Weakness
        </h3>
        <Bar data={barData} options={barOptions} height={200} />
      </div>
    </div>
  </div>
);

export default PerformanceCharts;
