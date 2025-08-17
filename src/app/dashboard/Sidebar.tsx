'use client'
import React, { useState } from 'react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('Learning');

  const toggleSidebar = () => setIsOpen(!isOpen);

  const links = ['Dashboard', 'Company Questions', 'Interview Practice', 'Schedule Interview', 'Reviews', 'Profile'];

  return (
    <div style={{ display: 'flex' }}>
      <div
        style={{
          width: isOpen ? 300 : 0,
          overflow: 'hidden',
          background: 'linear-gradient(to bottom, #ecfdf5, #d1fae5, #a7f3d0)',
          color: '#374151',
          height: '100vh',
          transition: 'width 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)',
          boxShadow: isOpen ? '2px 0 5px rgba(0,0,0,0.5)' : 'none',
          padding: isOpen ? 20 : 0,
          boxSizing: 'border-box',
          position: 'relative',
        }}
      >
        {/* Close Button */}
        {isOpen && (
          <button
            onClick={toggleSidebar}
            style={{
              backgroundColor: '#10b981',
              color: 'white',
              border: 'none',
              padding: '8px',
              cursor: 'pointer',
              borderRadius: 6,
              marginBottom: 20,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)',
              transition: 'all 0.3s ease',
              position: 'absolute',
              top: '20px',
              right: '20px',
              zIndex: 10,
              transform: 'scale(1)'
            }}
            onMouseEnter={(e) => {
              const target = e.target as HTMLElement;
              target.style.transform = 'scale(1.1)';
              target.style.boxShadow = '0 6px 20px rgba(16, 185, 129, 0.4)';
            }}
            onMouseLeave={(e) => {
              const target = e.target as HTMLElement;
              target.style.transform = 'scale(1)';
              target.style.boxShadow = '0 2px 8px rgba(16, 185, 129, 0.3)';
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
              {/* Making cross for closing sidebar */}
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        )}

        {/* Header */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '12px', 
          marginTop: isOpen ? '50px' : '40px'
        }}>
          <div style={{ 
            background: 'linear-gradient(135deg, #34d399, #10b981)',
            borderRadius: '12px', 
            padding: '10px',
            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            transform: 'scale(1)'
          }}
          onMouseEnter={(e) => {
            const target = e.target as HTMLElement;
            target.style.transform = 'scale(1.1)';
            target.style.boxShadow = '0 8px 20px rgba(16, 185, 129, 0.4)';
          }}
          onMouseLeave={(e) => {
            const target = e.target as HTMLElement;
            target.style.transform = 'scale(1)';
            target.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.3)';
          }}>
            <img
                src="/brain.png"
                alt="Brain Logo"
                width={24}
                height={24}
                className="object-contain cursor-pointer"
              />
          </div>
          <span style={{
            fontSize: '24px',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #059669, #10b981)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            cursor: 'pointer'
          }}>
            HireMind
          </span>
        </div>

        {/* Navigation */}
        <nav>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {links.map((link) => (
              <li
                key={link}
                onClick={() => setActiveLink(link)}
                style={{
                  margin: '16px 0',
                  cursor: 'pointer',
                  padding: '8px 12px',
                  borderRadius: 4,
                  backgroundColor: activeLink === link ? '#10b981' : 'transparent',
                  boxShadow: activeLink === link ? '0 0 10px 2px rgba(16, 185, 129, 0.7)' : 'none',
                  transition: 'all 0.3s ease',
                  color: activeLink === link ? 'white' : '#374151',
                  transform: 'translateX(0)',
                  // layerTransition: 'transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  const target = e.target as HTMLElement;
                  if (activeLink !== link) {
                    target.style.transform = 'translateX(8px)';
                    target.style.backgroundColor = 'rgba(16, 185, 129, 0.1)';
                    target.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.2)';
                  }
                }}
                onMouseLeave={(e) => {
                  const target = e.target as HTMLElement;
                  if (activeLink !== link) {
                    target.style.transform = 'translateX(0)';
                    target.style.backgroundColor = 'transparent';
                    target.style.boxShadow = 'none';
                  }
                }}
              >
                <a
                  href="#"
                  style={{ color: 'inherit', textDecoration: 'none', display: 'block' }}
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div style={{ marginLeft: 10, padding: 20, flex: 1 }}>
        {/* Open Button with Bounce Effect */}
        {!isOpen && (
          <button
            onClick={toggleSidebar}
            style={{
              backgroundColor: '#10b981',
              color: 'white',
              border: 'none',
              padding: '12px',
              cursor: 'pointer',
              borderRadius: 8,
              marginBottom: 20,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)',
              transition: 'all 0.3s ease',
              transform: 'scale(1)',
              animation: 'bounce 2s ease-in-out infinite'
            }}
            onMouseEnter={(e) => {
              const target = e.target as HTMLElement;
              target.style.transform = 'scale(1.1)';
              target.style.boxShadow = '0 6px 16px rgba(16, 185, 129, 0.4)';
              target.style.animationPlayState = 'paused';
            }}
            onMouseLeave={(e) => {
              const target = e.target as HTMLElement;
              target.style.transform = 'scale(1)';
              target.style.boxShadow = '0 2px 8px rgba(16, 185, 129, 0.3)';
              target.style.animationPlayState = 'running';
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              {/* Sidebar icon  */}
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
            </svg>
          </button>
        )}
      </div>

      <style jsx>{`
        @keyframes bounce {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
};

export default Sidebar;