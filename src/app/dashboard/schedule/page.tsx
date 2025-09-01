'use client';

import React, { useState } from 'react';

const ScheduleInterview: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true); // Replace with actual submit logic
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #f6fff8 0%, #e6f9ee 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Inter, sans-serif',
    }}>
      <div style={{
        background: '#fff',
        borderRadius: 20,
        boxShadow: '0 4px 24px rgba(0,0,0,.07)',
        padding: '2.5rem 2rem',
        minWidth: 380,
        maxWidth: '100%',
        textAlign: 'center'
      }}>
        <div style={{
          width: 56,
          height: 56,
          background: '#e0f7ea',
          borderRadius: '50%',
          margin: '0 auto 1.5rem auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <span role="img" aria-label="schedule" style={{ fontSize: 30 }}>🗓️</span>
        </div>
        <h2 style={{ fontWeight: 700, color: '#1a3330', marginBottom: 10 }}>
          Schedule Your Interview
        </h2>
        <p style={{ color: '#2db47d', fontWeight: 600, marginBottom: 24 }}>
          Seamless. Personalized. Effective.
        </p>
        {submitted ? (
          <div style={{ color: '#2db47d', fontWeight: 700 }}>
            Interview Scheduled!<br />
            Check your email for details.
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <input
              placeholder="Full Name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              style={{
                padding: '12px 16px',
                borderRadius: 10,
                border: '1px solid #c2e3d5',
                fontSize: 16,
              }}
            />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{
                padding: '12px 16px',
                borderRadius: 10,
                border: '1px solid #c2e3d5',
                fontSize: 16,
              }}
            />
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              required
              style={{
                padding: '12px 16px',
                borderRadius: 10,
                border: '1px solid #c2e3d5',
                fontSize: 16,
              }}
            />
            <input
              type="time"
              value={time}
              onChange={e => setTime(e.target.value)}
              required
              style={{
                padding: '12px 16px',
                borderRadius: 10,
                border: '1px solid #c2e3d5',
                fontSize: 16,
              }}
            />
            <button
              type="submit"
              style={{
                background: '#18c964',
                color: '#fff',
                fontWeight: 700,
                border: 'none',
                borderRadius: 10,
                padding: '14px 0',
                marginTop: 8,
                fontSize: 17,
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(44, 178, 125, 0.07)'
              }}
            >
              Schedule Interview
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ScheduleInterview;
