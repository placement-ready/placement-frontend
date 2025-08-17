import React, { useEffect, useRef, useState } from 'react';

// Util: Format time as HH:MM:SS
const pad = (num: number) => num.toString().padStart(2, '0');
const formatTime = (secs: number) => {
  const hours = Math.floor(secs / 3600);
  const minutes = Math.floor((secs % 3600) / 60);
  const seconds = secs % 60;
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
};

type CountdownProps = {
  target: Date;
};

const CountdownTimer: React.FC<CountdownProps> = ({ target }) => {
  const [remaining, setRemaining] = useState(() =>
    Math.max(Math.floor((target.getTime() - Date.now()) / 1000), 0)
  );
  const intervalRef = useRef<number>();

  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      setRemaining((prev) => Math.max(prev - 1, 0));
    }, 1000);
    return () => window.clearInterval(intervalRef.current);
  }, []);

  if (remaining === 0) return <span className="timer-display">Interview Time!</span>;
  return <span className="timer-display">{formatTime(remaining)}</span>;
};

export const WelcomeBanner: React.FC = () => {
  // For demo, next interview in 20 hours
  const nextInterviewDate = new Date(Date.now() + 20 * 3600 * 1000);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'stretch',
        minHeight: '400px',
        background: 'linear-gradient(135deg, #eafeea 0%, #f8fffe 100%)',
        borderRadius: '32px',
        boxShadow: '0 8px 32px rgba(0,200,81,0.15)',
        padding: '48px',
      }}
    >
      {/* Left Section */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingRight: '44px',
      }}>
        <h2 style={{
          fontSize: '2em',
          fontWeight: 700,
          color: '#148441',
          marginBottom: '12px',
        }}>
          Hello Vyakhya 👋, Ready for your next challenge?
        </h2>
        <div style={{
          fontSize: '1em',
          color: '#304d30',
          marginBottom: '26px',
          fontWeight: 500,
        }}>
          Next Interview Countdown:
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
        <button
          style={{
            background: 'linear-gradient(135deg, #00c851 0%, #148441 100%)',
            color: '#fff',
            fontWeight: 600,
            fontSize: '1.15em',
            border: 'none',
            borderRadius: '32px',
            padding: '16px 40px',
            boxShadow: '0 4px 18px rgba(0, 200, 81, .22)',
            cursor: 'pointer',
            marginTop: '8px',
            transition: 'box-shadow 0.2s, transform 0.2s'
          }}
          onClick={() => alert('Mock interview started!')}
        >
          🚀 Start Mock Interview
        </button>
      </div>
      {/* Right Section */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '260px'
      }}>
        {/* Motivational SVG — easy to swap for your own */}
        <svg width={220} height={220} viewBox="0 0 220 220" fill="none">
          <rect width="220" height="220" rx="48" fill="#d0f5e3"/>
          <ellipse cx="116" cy="90" rx="52" ry="38" fill="#fff"/>
          <rect x="65" y="128" width="98" height="32" rx="16" fill="#00c851"/>
          <text x="75" y="150" fontFamily="Segoe UI,Arial" fontSize="20" fill="#fff">
            Interview!
          </text>
          {/* Person icon */}
          <circle cx="116" cy="90" r="16" fill="#00c851"/>
          <rect x="108" y="108" width="16" height="22" rx="6" fill="#148441"/>
          <ellipse cx="116" cy="108" rx="24" ry="12" fill="#148441" opacity="0.12"/>
        </svg>
      </div>
    </div>
  );
};
