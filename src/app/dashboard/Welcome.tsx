'use client'
import React, { useContext, useEffect, useRef, useState } from 'react';
// import { UserContext } from '../contexts/UserContext'; 

const motivators = [
  "Dream big. Your next offer is waiting!",
  "Stay curious, stay confident.",
  "Every challenge is a stepping stone.",
  "Your skills shine brightest under pressure.",
  "Interviews are conversations, not interrogations.",
  "You’re closer than you think—one question away."
];

// Format HH:MM:SS
const pad = (n: number) => n.toString().padStart(2, '0');
const formatTime = (secs: number) => {
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
};

type CountdownProps = { target: Date };

const AnimatedEmoji: React.FC<{ emoji: string }> = ({ emoji }) => (
  <span style={{
    display: 'inline-block',
    animation: 'float 2s ease-in-out infinite',
    fontSize: '2em'
  }}>
    {emoji}
    <style>{`
      @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px);}
      }
    `}</style>
  </span>
);

const CountdownTimer: React.FC<CountdownProps> = ({ target }) => {
  const [remaining, setRemaining] = useState(
    Math.max(Math.floor((target.getTime() - Date.now()) / 1000), 0)
  );
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      setRemaining(prev => Math.max(prev - 1, 0));
    }, 1000);
    return () => {
      if (intervalRef.current !== null)
        window.clearInterval(intervalRef.current);
    };
  }, []);

  if (remaining === 0)
    return <span className="timer-display">Ready. It's Interview Time!</span>;

  return (
    <span className="timer-display" style={{ letterSpacing: "0.08em" }}>
      {formatTime(remaining)}
    </span>
  );
};

const Welcomebanner = () => {
  // Uncomment and adapt if you use context/provider
  // const { username } = useContext(UserContext);

  // For demo, static username:
  const username = "User"; // Swap with context/prop/session/api

  const nextInterviewDate = new Date(Date.now() + 15 * 3600 * 1000);

  // Motivator ticker (animated news-style)
  const [motivatorIdx, setMotivatorIdx] = useState(0);
  const [animating, setAnimating] = useState(false);
  const lastSwitch = useRef(Date.now());

  useEffect(() => {
    const motiInterval = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setMotivatorIdx(idx => (idx + 1) % motivators.length);
        setAnimating(false);
        lastSwitch.current = Date.now();
      }, 420); // Animation duration matches transition!
    }, 3500);
    return () => clearInterval(motiInterval);
  }, []);

  // Button state and feedback
  const [practicing, setPracticing] = useState(false);
  const onPracticeClick = () => {
    setPracticing(true);
    setTimeout(() => setPracticing(false), 1600);
  };

  return (
    <div
      style={{
        display: 'flex',
        gap: '48px',
        justifyContent: 'center',
        alignItems: 'stretch',
        minHeight: '420px',
        background: 'linear-gradient(120deg,#eafeea 0%, #f8fffe 100%)',
        borderRadius: '32px',
        boxShadow: '0 8px 32px rgba(0,200,81,0.14)',
        padding: '48px 32px',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Floating Emoji decorations */}
      <AnimatedEmoji emoji="🧑‍💻" />
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center'
      }}>
        <h2 style={{
          fontSize: '2.1em',
          fontWeight: 700,
          color: '#148441',
          marginBottom: '12px',
          letterSpacing: '.01em',
        }}>
          {/* Hello {username} */}
          Hello {username} 👋
        </h2>
        <div style={{
          fontSize: '1.2em',
          color: '#17884a',
          fontWeight: 600,
          marginBottom: '8px'
        }}>
          Ready for your next great challenge?
        </div>
        <div style={{
          fontSize: '1em',
          color: '#304d30',
          marginBottom: '18px',
          fontWeight: 500,
        }}>
          <AnimatedEmoji emoji="⏳" /> Next Interview In:
          <div style={{
            marginTop: '7px',
            fontSize: '2em',
            color: '#00c851',
            fontFamily: 'monospace',
            fontWeight: 'bold'
          }}>
            <CountdownTimer target={nextInterviewDate} />
          </div>
        </div>
        {/* Button with reduced width */}
        <button
          style={{
            background:
              practicing
                ? 'linear-gradient(135deg,#148441 0%,#67cc8b 80%)'
                : 'linear-gradient(135deg,#00c851 0%, #148441 80%)',
            color: '#fff',
            fontWeight: 700,
            fontSize: '1.08em',
            border: 'none',
            borderRadius: '32px',
            padding: '12px 32px',
            minWidth: '145px',
            boxShadow: practicing
              ? '0 2px 8px rgba(0, 200, 81, .08)'
              : '0 4px 18px rgba(0, 200, 81, .22)',
            cursor: 'pointer',
            marginTop: '10px',
            marginBottom: '16px',
            transition: 'all 0.22s'
          }}
          disabled={practicing}
          onClick={onPracticeClick}
        >
          🚀 {practicing ? 'Launching Practice...' : 'Start Mock Interview'}
        </button>
        {/* Animated motivation ticker */}
        <div style={{
          background: '#d0f5e3',
          color: '#148441',
          fontWeight: 600,
          borderRadius: 8,
          boxShadow: '0 1px 12px rgba(0,200,81,0.09)',
          padding: '10px 20px',
          margin: '0 0 10px 0',
          fontSize: '1.13em',
          height: 40,
          position: 'relative',
          overflow: 'hidden',
        }}>
          <span style={{
            display: 'block',
            position: 'absolute',
            width: '100%',
            left: 0,
            top: animating ? '100%' : '0',
            opacity: animating ? 0 : 1,
            transition: 'top 0.4s cubic-bezier(0.68,-0.6,0.32,1.6), opacity 0.35s',
            willChange: 'top, opacity',
            paddingLeft: "24px",
            paddingTop: "7px"
          }}>
            {motivators[motivatorIdx]}
          </span>
        </div>
      </div>
      {/* Right side: SVG illustration with shimmer */}
      <div style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: 260,
        position: 'relative'
      }}>
        <svg width={230} height={230} viewBox="0 0 220 220" fill="none">
          {/* Interview cloud */}
          <rect width="220" height="220" rx="48" fill="#d0f5e3" />
          <ellipse cx="116" cy="90" rx="52" ry="38" fill="#fff" />
          <rect x="65" y="128" width="98" height="32" rx="16" fill="#00c851" />
          <text x="90" y="150" fontFamily="Segoe UI,Arial" fontSize="19" fill="#fff">
            Interview!
          </text>
          {/* Animated shimmer */}
          <rect x="65" y="128" width="98" height="32" rx="16" fill="url(#shimmer)" opacity="0.5" />
          <defs>
            <linearGradient id="shimmer">
              <stop offset="0%" stopColor="#fff" stopOpacity="0"/>
              <stop offset="50%" stopColor="#fff" stopOpacity="0.2"/>
              <stop offset="100%" stopColor="#fff" stopOpacity="0"/>
            </linearGradient>
          </defs>
          {/* Person */}
          <circle cx="116" cy="90" r="16" fill="#00c851" />
          <rect x="108" y="108" width="16" height="22" rx="6" fill="#148441" />
          <ellipse cx="116" cy="108" rx="24" ry="12" fill="#148441" opacity="0.07" />
        </svg>
      </div>
      {/* Floating emoji, right top */}
      <div style={{
        position: "absolute", right: 30, top: 14, fontSize: "2em", opacity: 0.7,
        animation: "float 3.5s ease-in-out infinite"
      }}>💡</div>
      <style>{`
        @keyframes float {
          0%,100% { transform: translateY(0);}
          50% { transform: translateY(-12px);}
        }
      `}</style>
    </div>
  );
};

export default Welcomebanner;
