import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './SplitText.css';

gsap.registerPlugin(ScrollTrigger);

const SplitText = ({
  text,
  className = '',
  delay = 50,
  duration = 1.25,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  textAlign = 'center',
  tag = 'p',
  onLetterAnimationComplete
}) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !text) return undefined;

    el.textContent = '';

    const parts = splitType.includes('words') ? text.split(' ') : text.split('');
    const fragment = document.createDocumentFragment();

    parts.forEach((part, index) => {
      if (splitType.includes('words')) {
        const span = document.createElement('span');
        span.className = 'split-word';
        span.textContent = part;
        fragment.appendChild(span);
        if (index < parts.length - 1) fragment.appendChild(document.createTextNode(' '));
      } else {
        const span = document.createElement('span');
        span.className = 'split-char';
        span.innerHTML = part === ' ' ? '&nbsp;' : part;
        fragment.appendChild(span);
      }
    });

    el.appendChild(fragment);

    const targets = splitType.includes('words')
      ? el.querySelectorAll('.split-word')
      : el.querySelectorAll('.split-char');

    const startPct = (1 - threshold) * 100;
    const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin);
    const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0;
    const marginUnit = marginMatch ? marginMatch[2] || 'px' : 'px';
    const sign =
      marginValue === 0
        ? ''
        : marginValue < 0
          ? `-=${Math.abs(marginValue)}${marginUnit}`
          : `+=${marginValue}${marginUnit}`;
    const start = `top ${startPct}%${sign}`;

    const tween = gsap.fromTo(
      targets,
      { ...from },
      {
        ...to,
        duration,
        ease,
        stagger: delay / 1000,
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: 'play none none reset',
          fastScrollEnd: true,
          anticipatePin: 0.4
        },
        onComplete: () => {
          if (onLetterAnimationComplete) onLetterAnimationComplete();
        },
        willChange: 'transform, opacity',
        force3D: true
      }
    );

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
      el.textContent = text;
    };
  }, [
    text,
    className,
    delay,
    duration,
    ease,
    splitType,
    JSON.stringify(from),
    JSON.stringify(to),
    threshold,
    rootMargin,
    onLetterAnimationComplete
  ]);

  const Tag = tag;
  return (
    <Tag ref={ref} className={`split-parent ${className}`} style={{ textAlign }}>
      {text}
    </Tag>
  );
};

export default SplitText;
