'use client'
import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

// Animated Number Hook
const useAnimatedNumber = (target: number, duration = 1) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const step = Math.ceil(target / (duration * 60)); // 60fps
    const interval = setInterval(() => {
      start += step;
      if (start >= target) {
        setValue(target);
        clearInterval(interval);
      } else {
        setValue(start);
      }
    }, 1000 / 60);
    return () => clearInterval(interval);
  }, [target, duration]);

  return value;
};

// Progress Bar with animation
const ProgressBar = ({ percent, color = "#00c851" }: { percent: number; color?: string }) => (
  <div className="w-full h-2 bg-green-100 rounded-full overflow-hidden">
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: `${percent}%` }}
      transition={{ duration: 1 }}
      className="h-2 rounded-full"
      style={{ background: color }}
    />
  </div>
);

// Card component
const Card = ({
  children,
  icon,
  highlight,
  glowColor = '#bdecbd'
}: {
  children: React.ReactNode,
  icon?: React.ReactNode,
  highlight?: React.ReactNode,
  glowColor?: string
}) => (
  <motion.div
    whileHover={{ scale: 1.05, boxShadow: `0 0 24px ${glowColor}` }}
    transition={{ type: "spring", stiffness: 200 }}
    className="bg-white w-64 flex-1 rounded-2xl p-6 m-4 text-center relative border border-gray-300 shadow-sm"
  >
    {/* Icon */}
    <div
      className="w-14 h-14 mx-auto mb-3 rounded-xl flex items-center justify-center text-2xl shadow-md"
      style={{
        background: `radial-gradient(circle at 60% 40%, ${glowColor}b0 0%, #fff 65%)`
      }}
    >
      {icon}
    </div>
    <div className="font-semibold text-green-800 text-lg mb-2">{children}</div>
    {highlight && <div>{highlight}</div>}
  </motion.div>
);

const CompanyLogo = ({ name }: { name: string }) => (
  <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-50 shadow text-green-700 font-bold text-xl">
    {name[0]}
  </span>
);

// Countdown Timer
function CountdownTimer({ target }: { target: Date }) {
  const [remaining, setRemaining] = useState(
    Math.max(Math.floor((target.getTime() - Date.now()) / 1000), 0)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining(Math.max(Math.floor((target.getTime() - Date.now()) / 1000), 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [target]);

  if (remaining <= 0) return <span className="text-red-500 font-bold">Now</span>;

  const h = Math.floor(remaining/3600);
  const m = Math.floor((remaining%3600)/60);
  const s = remaining%60;
  return <span>{h}h {m}m {s}s</span>;
}

export const StatsCards = () => {
  const readiness = useAnimatedNumber(78);
  const lastScore = useAnimatedNumber(64);
  const streak = useAnimatedNumber(12);
  const dsaDone = useAnimatedNumber(48);
  const dsaTotal = 80;
  const offers = useAnimatedNumber(1);
  const solvedHard = useAnimatedNumber(14);
  const interviewsGiven = useAnimatedNumber(5);

  const interviewTime = new Date(Date.now() + 25 * 3600 * 1000);
  const company = "Google";

  const formatDate = (date: Date) =>
    `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

  const cards = [
    {
      icon: '🧑‍⚖️',
      title: 'Last Mock Score',
      highlight: <>
        <div className="text-green-600 font-bold text-xl">{lastScore}%</div>
        <ProgressBar percent={lastScore} />
      </>
    },
    {
      icon: <CompanyLogo name={company} />,
      title: 'Company Focus',
      highlight: <div className="text-green-700 font-semibold text-base">{company}</div>
    },
    {
      icon: '🔥',
      title: 'Practice Streak',
      highlight: <div className="text-green-700 font-bold text-lg">{streak} days</div>
    },
    {
      icon: '📈',
      title: 'Overall Readiness',
      highlight: <>
        <div className="text-green-600 font-bold text-2xl">{readiness}%</div>
        <ProgressBar percent={readiness} />
      </>
    },
    {
      icon: '🗓️',
      title: 'Next Interview',
      highlight: <>
        <div className="text-green-700 font-medium text-sm mb-1">{formatDate(interviewTime)}</div>
        <div className="text-green-600 font-semibold text-base">
          <CountdownTimer target={interviewTime} />
        </div>
      </>
    },
    {
      icon: '📚',
      title: 'DSA Practice Progress',
      highlight: <div className="text-green-600 font-bold text-base">
        {dsaDone}/{dsaTotal} Solved
        <ProgressBar percent={Math.round((dsaDone/dsaTotal)*100)} />
      </div>
    },
    {
      icon: '🏆',
      title: 'Job Offers',
      highlight: <div className="text-green-600 font-bold text-xl">{offers}</div>
    },
    {
      icon: '🎤',
      title: 'Interviews Given',
      highlight: <div className="text-green-700 font-semibold text-lg">{interviewsGiven}</div>
    },
  ];

  return (
    <div className="relative z-10 mt-12 px-6 py-8 min-h-[340px]">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {cards.map((card, i) => (
          <Card key={i} icon={card.icon}>{card.title}{card.highlight}</Card>
        ))}
      </div>
    </div>
  );
};

export default StatsCards;
