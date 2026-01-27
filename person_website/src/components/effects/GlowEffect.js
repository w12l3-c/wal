import React from 'react';
import './GlowEffect.css';

export function GlowEffect({ colors = ['#0894FF', '#C959DD', '#FF2E54', '#FF9004'], blur = 'medium', mode = 'static' }) {
  const blurAmount = {
    small: '50px',
    medium: '100px',
    large: '150px'
  }[blur] || '100px';

  return (
    <div className="glow-effect-container">
      {colors.map((color, index) => (
        <div
          key={index}
          className={`glow-orb ${mode === 'static' ? '' : 'glow-orb-animated'}`}
          style={{
            '--glow-color': color,
            '--blur-amount': blurAmount,
            '--animation-delay': `${index * 0.5}s`,
            '--rotation': `${(360 / colors.length) * index}deg`
          }}
        />
      ))}
    </div>
  );
}
