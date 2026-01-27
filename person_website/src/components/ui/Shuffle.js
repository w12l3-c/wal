import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import './Shuffle.css';

const SplitText = ({
  text,
  className = '',
  delay = 50,
  duration = 1.25,
  ease = 'power3.out',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  tag = 'h1',
  triggerOnMount = false
}) => {
  const ref = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!ref.current || !triggerOnMount || hasAnimated) return;

    const el = ref.current;
    const chars = text.split('');
    
    // Create spans for each character
    el.innerHTML = chars.map((char) => 
      `<span class="split-char">${char === ' ' ? '&nbsp;' : char}</span>`
    ).join('');

    const charElements = el.querySelectorAll('.split-char');

    // Small delay to ensure DOM is ready
    setTimeout(() => {
      // Animate each character
      gsap.fromTo(charElements, 
        from,
        {
          ...to,
          duration,
          ease,
          stagger: delay / 1000,
          force3D: true
        }
      );
    }, 50);

    setHasAnimated(true);
  }, [text, delay, duration, ease, JSON.stringify(from), JSON.stringify(to), triggerOnMount, hasAnimated]);

  const Tag = tag;
  return <Tag ref={ref} className={`split-parent ${className}`}>{text}</Tag>;
};

export default SplitText;
