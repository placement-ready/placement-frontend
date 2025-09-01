'use client';

import React, { useState } from 'react';

// Example questions (replace or expand as needed)
const practiceQuestions = [
  "Tell me about yourself.",
  "Describe a challenging project and how you handled it.",
  "How do you stay updated with industry trends?",
  "Give an example of a conflict at work and how you resolved it.",
  "Why do you want to work with us?",
];

const InterviewPractice: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answered, setAnswered] = useState<string[]>([]);
  const [userAnswer, setUserAnswer] = useState('');

  const handleNext = () => {
    if(userAnswer.trim()) {
      const updated = [...answered];
      updated[currentIndex] = userAnswer;
      setAnswered(updated);
      setUserAnswer('');
      if(currentIndex < practiceQuestions.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setUserAnswer(answered[currentIndex - 1] || '');
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setAnswered([]);
    setUserAnswer('');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #f6fff8 0%, #e6f9ee 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      fontFamily: 'Inter, sans-serif',
    }}>
      <div style={{
        marginTop: 56,
        background: '#fff',
        padding: '2.2rem 2rem',
        borderRadius: 20,
        boxShadow: '0 4px 24px rgba(44, 178, 125, 0.09)',
        minWidth: 400,
        maxWidth: '92vw',
        textAlign: 'center'
      }}>
        <div style={{
          width: 56,
          height: 56,
          background: '#e0f7ea',
          borderRadius: '50%',
          margin: '0 auto 1.4rem auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <span role="img" aria-label="practice" style={{ fontSize: 30 }}>🎤</span>
        </div>
        <h2 style={{ fontWeight: 700, marginBottom: 8, color: '#153520' }}>
          Interview Practice
        </h2>
        <p style={{ color: '#2db47d', marginBottom: 18, fontWeight: 500 }}>
          Practice answering key interview questions aloud or in writing.
        </p>
        <div style={{
          background: '#f6fff8',
          borderRadius: 13,
          padding: '18px 20px',
          textAlign: 'left',
          border: '1px solid #e0f7ea',
          fontSize: 17,
          fontWeight: 500,
          color: '#142623',
          minHeight: 54,
          marginBottom: 18,
        }}>
          {practiceQuestions[currentIndex]}
        </div>
        <textarea
          placeholder="Type your answer here or practice aloud..."
          value={userAnswer}
          onChange={e => setUserAnswer(e.target.value)}
          rows={5}
          style={{
            width: '96%',
            borderRadius: 10,
            border: '1px solid #c2e3d5',
            padding: '14px',
            fontSize: 16,
            marginBottom: 12,
            resize: 'vertical'
          }}
        />
        <div style={{
          display: 'flex',
          gap: 12,
          justifyContent: 'center',
          marginBottom: 6,
        }}>
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            style={{
              padding: '12px 24px',
              borderRadius: 10,
              border: 'none',
              background: currentIndex === 0 ? '#def7ec' : '#fff',
              color: '#2db47d',
              fontWeight: 700,
              cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s'
            }}
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            style={{
              padding: '12px 24px',
              borderRadius: 10,
              border: 'none',
              background: '#18c964',
              color: '#fff',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(44, 178, 125, 0.07)',
              transition: 'all 0.2s'
            }}
          >
            {currentIndex === practiceQuestions.length - 1 ? 'Finish' : 'Next'}
          </button>
          <button
            onClick={handleReset}
            style={{
              padding: '12px 18px',
              borderRadius: 10,
              border: 'none',
              background: '#fff',
              color: '#fb3927',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            Reset
          </button>
        </div>
        <p style={{ fontSize: 13, color: '#c1dac3', marginTop: 8 }}>
          Question {currentIndex + 1} of {practiceQuestions.length}
        </p>
      </div>
    </div>
  );
};

export default InterviewPractice;
