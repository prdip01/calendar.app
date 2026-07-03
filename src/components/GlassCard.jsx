import React from 'react';

/**
 * Reusable layout card container with backdrop-blur styling.
 */
export default function GlassCard({ children, className = '', ...props }) {
  return (
    <div 
      className={`glass-card ${className}`} 
      style={{
        padding: '1.2rem',
        ...props.style
      }}
      {...props}
    >
      {children}
    </div>
  );
}
