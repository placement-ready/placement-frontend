'use client'
import React, { useEffect, useRef, useState } from 'react';

// Motivational ticker messages
const motivators = [
  "Dream big. Your next offer is waiting!",
  "Stay curious, stay confident.",
  "Every challenge is a stepping stone.",
  "Your skills shine brightest under pressure.",
  "Interviews are conversations, not interrogations.",
  "You’re closer than you think—one question away."
];

// Inspirational Thought (from your image)
const typewriterText =
  "You have all the talent, charisma, experience, and expertise to do this job. No one can hold a candle to what you bring to the table!!";

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

const TypewriterThought: React.FC<{ text: string }> = ({ text }) => {
  const [displayed, setDisplayed] = useState('');
  const [idx, setIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (!isDeleting && idx < text.length) {
      timeout = setTimeout(() => {
        setDisplayed(text.slice(0, idx + 1));
        setIdx(idx + 1);
      }, 40);
    } else if (!isDeleting && idx === text.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && idx > 0) {
      timeout = setTimeout(() => {
        setDisplayed(text.slice(0, idx - 1));
        setIdx(idx - 1);
      }, 15);
    } else if (isDeleting && idx === 0) {
      setIsDeleting(false);
      timeout = setTimeout(() => setIdx(1), 600);
    }
    return () => clearTimeout(timeout);
  }, [idx, isDeleting, text]);

  return (
    <div style={{
      color: '#148441',
      borderRadius: 14,
      fontWeight: 700,
      padding: '34px 22px',
      fontSize: '1.95em',
      minHeight: 142,
      marginBottom: '40px',
      position: "relative",
      zIndex: 2,
      letterSpacing: "0.01em",
      lineHeight: 1.47,
      textAlign: "left",
      display: "flex",
      alignItems: "center"
    }}>
      {displayed}
      <span style={{
        width: "1em",
        marginLeft: "2px",
        animation: "blink 1.03s step-end infinite"
      }}></span>
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1;}
          50% { opacity: 0;}
        }
      `}</style>
    </div>
  );
};

const Welcomebanner = () => {
  // Replace with context/prop/session as needed!
  const username = "User";

  const nextInterviewDate = new Date(Date.now() + 15 * 3600 * 1000);

  const [motivatorIdx, setMotivatorIdx] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const motiInterval = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setMotivatorIdx(idx => (idx + 1) % motivators.length);
        setAnimating(false);
      }, 420);
    }, 3500);
    return () => clearInterval(motiInterval);
  }, []);

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
            transition: 'all 0.22s ease-in-out'
          }}
          disabled={practicing}
          onClick={onPracticeClick}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.07)';
            (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 6px 18px rgba(0,200,81,0.3)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
            (e.currentTarget as HTMLButtonElement).style.boxShadow = practicing
              ? '0 2px 6px rgba(0,200,81,.08)'
              : '0 3px 12px rgba(0,200,81,.22)';
          }}
        >
          🚀 {practicing ? 'Launching Practice...' : 'Start Mock Interview'}
        </button>
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
      {/* Right side: Thought with typewriter effect */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 260,
        position: 'relative'
      }}>
        <TypewriterThought text={typewriterText} />
      </div>
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
