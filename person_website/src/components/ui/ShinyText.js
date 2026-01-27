import React from 'react';
import './ShinyText.css';

const ShinyText = ({
  text,
  disabled = false,
  speed = 2,
  className = '',
  color = '#b5b5b5',
  shineColor = '#ffffff',
  spread = 120,
  yoyo = false,
  pauseOnHover = false,
  direction = 'left',
  delay = 0,
  as: Tag = 'span',
  children
}) => {
  const animationDirection = yoyo
    ? direction === 'left'
      ? 'alternate'
      : 'alternate-reverse'
    : direction === 'left'
      ? 'normal'
      : 'reverse';

  const classes = [
    'shiny-text',
    className,
    pauseOnHover ? 'shiny-text--pause' : '',
    disabled ? 'shiny-text--disabled' : '',
    children ? '' : 'shiny-text--no-split'
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Tag
      className={classes}
      style={{
        '--shiny-color': color,
        '--shiny-shine': shineColor,
        '--shiny-spread': `${spread}deg`,
        '--shiny-duration': `${speed}s`,
        '--shiny-delay': `${delay}s`,
        '--shiny-direction': animationDirection
      }}
    >
      {children || text}
    </Tag>
  );
};

export default ShinyText;
