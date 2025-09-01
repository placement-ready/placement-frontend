'use client';

import React from 'react';

const studyPlan = [
  {
    subject: 'DBMS',
    topics: ['ER Models', 'Normalization', 'Transactions', 'SQL', 'Indexes'],
    resources: [
      'DBMS by Raghu Ramakrishnan',
      'GFG DBMS section',
      'LeetCode DB'
    ]
  },
  {
    subject: 'OOPS',
    topics: ['Principles', 'Inheritance', 'Polymorphism', 'Encapsulation', 'Design Patterns'],
    resources: [
      'GFG OOPs',
      'JavaTpoint OOPs',
      'Refactoring.Guru'
    ]
  },
  {
    subject: 'DCN',
    topics: ['Network Models', 'TCP/IP', 'Routing Algorithms', 'Protocols'],
    resources: [
      'NPTEL DCN lectures',
      'Forouzan DCN book',
      'GFG Networking'
    ]
  },
  {
    subject: 'System Design',
    topics: ['Scalability', 'Databases', 'APIs', 'Caching', 'Load Balancing'],
    resources: [
      'Grokking System Design',
      'System Design Primer',
      'Exponent'
    ]
  },
  {
    subject: 'Operating System',
    topics: ['Processes', 'Threads', 'Memory/CPU Management', 'Deadlocks'],
    resources: [
      'Galvin OS book',
      'GFG Operating System',
      'Neso Academy OS'
    ]
  },
];

const codingResources = [
  'LeetCode (Top Interview 150)',
  'HackerRank',
  'Codeforces',
  'InterviewBit'
];

const motivationalLines = [
  "Consistency and focused effort are the keys to acing your dream interview. Every day counts!",
  "You don’t have to be perfect to get started, but you have to get started to be perfect."
];

const timetable = [
  { day: 'Monday', morning: 'DBMS Theory', midday: 'Coding Platform Practice', evening: 'Behavioral Q&A' },
  { day: 'Tuesday', morning: 'OOPS Principles', midday: 'Coding Platform Practice', evening: 'Mock Coding/Review' },
  { day: 'Wednesday', morning: 'DCN Concepts', midday: 'Coding Platform Practice', evening: 'Resume Review/Projects' },
  { day: 'Thursday', morning: 'OS Concepts', midday: 'Coding Platform Practice', evening: 'Behavioral/HR Questions' },
  { day: 'Friday', morning: 'System Design Overview', midday: 'Coding Platform Practice', evening: 'Whiteboard Practice' },
  { day: 'Saturday', morning: 'Mixed Problem Solving', midday: 'System Design Deep Dive', evening: 'Mock Interview' },
  { day: 'Sunday', morning: 'Review & Adjustments', midday: 'Coding Test (Timed)', evening: 'Rest/Motivation' },
];

const StudyPlan: React.FC = () => (
  <div style={{
    minHeight: '100vh',
    background: 'linear-gradient(160deg, #f6fff8 0%, #e6f9ee 100%)',
    fontFamily: 'Inter, sans-serif',
    padding: '40px 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }}>
    <div style={{
      background: '#fff',
      borderRadius: 18,
      padding: '2.5rem 2rem',
      boxShadow: '0 4px 24px rgba(44, 178, 125, 0.11)',
      maxWidth: 700,
      width: '90vw'
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
        <span role="img" aria-label="study" style={{ fontSize: 30 }}>📚</span>
      </div>
      <h2 style={{
        color: '#1a3330',
        fontWeight: 700,
        textAlign: 'center',
        marginBottom: 15
      }}>Interview Study Plan</h2>
      {motivationalLines.map((line, idx) => (
        <div key={idx} style={{
          color: '#2db47d',
          fontWeight: 600,
          textAlign: 'center',
          marginBottom: 12
        }}>{line}</div>
      ))}
      <h3 style={{color: "#18c964", marginBottom: 10}}>Core Subjects</h3>
      {studyPlan.map((item, idx) => (
        <div key={item.subject} style={{
          background: '#f6fff8',
          borderRadius: 13,
          padding: '18px 20px',
          marginBottom: 16,
          boxShadow: '0 2px 8px rgba(44, 178, 125, 0.07)'
        }}>
          <strong style={{color:"#102c1c", fontSize:18}}>{item.subject}</strong>
          <div style={{marginTop:6, marginBottom:4, fontWeight:500}}>Topics: {item.topics.join(', ')}</div>
          <div style={{fontSize:15}}>Resources:
            <ul style={{margin:'8px 0 0 18px'}}>
              {item.resources.map(r => <li key={r}>{r}</li>)}
            </ul>
          </div>
        </div>
      ))}

      <h3 style={{color:"#18c964", marginTop:25}}>Coding Platforms</h3>
      <ul style={{marginLeft:22, marginBottom:20}}>
        {codingResources.map(r => <li key={r}>{r}</li>)}
      </ul>

      <h3 style={{color:"#18c964", marginTop:25}}>Sample Weekly Timetable</h3>
      <table style={{width:'100%', background:'#f6fff8', borderRadius:10, marginTop:10, fontSize:15}}>
        <thead>
          <tr>
            <th style={{padding:'7px', color:'#10a86e'}}>Day</th>
            <th style={{padding:'7px', color:'#10a86e'}}>Morning</th>
            <th style={{padding:'7px', color:'#10a86e'}}>Midday</th>
            <th style={{padding:'7px', color:'#10a86e'}}>Evening</th>
          </tr>
        </thead>
        <tbody>
          {timetable.map(row => (
            <tr key={row.day}>
              <td style={{padding:'8px', fontWeight:600}}>{row.day}</td>
              <td style={{padding:'8px'}}>{row.morning}</td>
              <td style={{padding:'8px'}}>{row.midday}</td>
              <td style={{padding:'8px'}}>{row.evening}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{marginTop:25, textAlign:'center', color:'#6ac88a', fontWeight:600, fontSize:15}}>
        Track progress weekly, review weak spots, and adjust your plan as needed.<br />
        Every effort invested today builds the skills for tomorrow’s success!
      </div>
    </div>
  </div>
);

export default StudyPlan;
