'use client';

import React, { useState } from 'react';

// Demo: Replace with real company/question data or API integration
const companyQuestions: Record<string, string[]> = {
  Google: [
    "Describe a time you solved a complex problem.",
    "How do you approach learning a new technology?",
    "What is your experience with scalable systems?",
  ],
  Amazon: [
    "Tell me about a time you disagreed with a teammate.",
    "How do you prioritize when working under deadlines?",
    "How would you improve our service?",
  ],
  Microsoft: [
    "Give an example of working on a diverse team.",
    "What motivates you to join Microsoft?",
    "Describe a time you handled feedback.",
  ],
};

const companies = Object.keys(companyQuestions);

const CompanyQuestions: React.FC = () => {
  // Fix: Initialize to the first company's name, type as string
  const [selectedCompany, setSelectedCompany] = useState<string>(companies[0]);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #f6fff8 0%, #e6f9ee 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      fontFamily: 'Inter, sans-serif',
      paddingBottom: 40,
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
          background: '#ccf4e7',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.1rem auto',
        }}>
          <span role="img" aria-label="company-question" style={{ fontSize: 30 }}>💼</span>
        </div>
        <h2 style={{ fontWeight: 700, marginBottom: 8, color: '#0e2b20' }}>
          Company Interview Questions
        </h2>
        <p style={{ color: '#2db47d', marginBottom: 22, fontWeight: 500 }}>
          Prepare with real question sets for top companies.
        </p>
        <select
          value={selectedCompany}
          onChange={e => setSelectedCompany(e.target.value)}
          style={{
            padding: '12px 16px',
            borderRadius: 12,
            border: '1px solid #c2e3d5',
            marginBottom: 18,
            fontSize: 16,
            outline: 'none',
            width: '65%',
          }}
        >
          {companies.map(company => (
            <option key={company} value={company}>{company}</option>
          ))}
        </select>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
          marginTop: 10,
        }}>
          {companyQuestions[selectedCompany].map((q, idx) => (
            <div key={idx} style={{
              background: '#f6fff8',
              borderRadius: 13,
              padding: '16px 18px',
              color: '#102c1c',
              fontSize: 16,
              textAlign: 'left',
              border: '1px solid #e0f7ea',
              boxShadow: '0 2px 8px rgba(44, 178, 125, 0.04)'
            }}>
              {q}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompanyQuestions;
