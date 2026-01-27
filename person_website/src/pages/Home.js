import './Home.css'
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/branding/class_logo.png';
import resumePdf from '../assets/docs/Wallace_Resume.pdf';
import cvPdf from '../assets/docs/CV-3.pdf';

import violin from '../assets/pages/home/violin.jpeg';
import badminton from '../assets/pages/home/badminton.jpeg';
import drawing from '../assets/pages/home/drawing.webp';

import Footer from './Footer.js';
import StaggeredMenu from './StaggeredMenu.js';

import FloatingLines from '../components/effects/FloatingLines.js';
import FlowingMenu from '../components/ui/FlowingMenu.js';
import SplitText from '../components/ui/Shuffle.js';
import { GlowEffect } from '../components/effects/GlowEffect';
import DotGrid from '../components/effects/DotGrid';

function Home() {
    const [text, setText] = useState('');
    const fullText = 'Biomedical Engineering Student at University of Waterloo';
    const [showShuffle, setShowShuffle] = useState(false);
    
    const bannerRef = useRef();
    const experienceRef = useRef();
    const hobbiesRef = useRef();
    const titleRef = useRef();

    const images = [violin, badminton, drawing];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [opacity, setOpacity] = useState(1);
    const [scrollProgress, setScrollProgress] = useState(0);

    // Banner typing effect
    useEffect(() => {
        let timer = setInterval(() => {
        setText((prevText) => {
            return 'Hi I am Wallace'.substr(0, prevText.length + 1);
        });
        }, 112);

        return () => clearInterval(timer);
    }, []);

    // Trigger shuffle effect when experience section becomes visible
    useEffect(() => {
        if (scrollProgress > 0.3 && !showShuffle) {
            setShowShuffle(true);
        }
    }, [scrollProgress, showShuffle]);

    useEffect(() => {
        const timer = setInterval(() => {
          setOpacity(0);
          setTimeout(() => {
            setCurrentImageIndex((currentImageIndex + 1) % images.length);
            setOpacity(1);
          }, 1000);
        }, 10000);
    
        return () => clearInterval(timer);
    }, [currentImageIndex]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const windowHeight = window.innerHeight;
            const progress = Math.min(scrollPosition / windowHeight, 2);
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const menuItems = [
        { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
        { label: 'Experience', ariaLabel: 'View experience', link: '/Experience' },
        { label: 'Projects', ariaLabel: 'View projects', link: '/Projects' },
        { label: 'Hobbies', ariaLabel: 'View hobbies', link: '/Hobbies' }
    ];

    const socialItems = [
        { label: 'GitHub', link: 'https://github.com/w12l3-c' },
        { label: 'LinkedIn', link: 'https://www.linkedin.com/in/wallace-lee-yh/' },
        { label: 'Gmail', link: 'mailto:wwlee@uwaterloo.ca' }
    ];

    const hobbyItems = [
        { link: '/Hobbies', text: 'Music', image: violin },
        { link: '/Hobbies', text: 'Sports', image: badminton },
        { link: '/Hobbies', text: 'Art', image: drawing }
    ];

    // Banner fades out and experience fades in at the same position
    const bannerOpacity = scrollProgress < 0.3 ? 1 : Math.max(0, 1 - (scrollProgress - 0.3) / 0.2);
    const experienceOpacity = scrollProgress < 0.3 ? 0 : scrollProgress < 1.2 ? Math.min((scrollProgress - 0.3) / 0.2, 1) : Math.max(0, 1 - (scrollProgress - 1.2) / 0.3);
    const hobbiesOpacity = scrollProgress > 1.2 ? Math.min((scrollProgress - 1.2) / 0.3, 1) : 0;
    
    // Text scale grows dramatically as you scroll (0-50% scroll range)
    const textScale = scrollProgress < 0.5 ? 0.5 + scrollProgress * 3 : 2;
    
    // Button stagger animations - slide up with delay
    const buttonTranslateY = scrollProgress < 0.3 ? 50 : Math.max(0, 50 - (scrollProgress - 0.3) * 250);
    const button1Delay = scrollProgress < 0.35 ? 1 : Math.max(0, 1 - (scrollProgress - 0.35) * 5);
    const button2Delay = scrollProgress < 0.38 ? 1 : Math.max(0, 1 - (scrollProgress - 0.38) * 5);
    const button3Delay = scrollProgress < 0.41 ? 1 : Math.max(0, 1 - (scrollProgress - 0.41) * 5);

    return (
        <div className='home'>
            <StaggeredMenu
                position="right"
                items={menuItems}
                socialItems={socialItems}
                displaySocials={true}
                displayItemNumbering={true}
                menuButtonColor="#ffffff"
                openMenuButtonColor="#000"
                changeMenuColorOnOpen={true}
                colors={['#B19EEF', '#5227FF']}
                logoUrl={logo}
                accentColor="#5227FF"
                isFixed={true}
            />
            <div className='home-banner' ref={bannerRef} style={{ opacity: bannerOpacity }}>
                <FloatingLines 
                    enabledWaves={["top","middle","bottom"]}
                    lineCount={5}
                    lineDistance={5}
                    bendRadius={5}
                    bendStrength={-0.5}
                    interactive={true}
                    parallax={true}
                />
                <h1 ref={titleRef} style={{ transform: `scale(${textScale})`, transformOrigin: 'center', transition: 'transform 0.1s ease-out' }}>{text}<span className="blink">_</span></h1>
            </div>
            <div className='home-experience' ref={experienceRef} style={{ opacity: experienceOpacity }}>
                <DotGrid
                    className="home-dotgrid"
                    dotSize={5}
                    gap={45}
                    baseColor="#c1a0fa"
                    activeColor="#5227FF"
                    proximity={250}
                    shockRadius={750}
                    shockStrength={15}
                    resistance={750}
                    returnDuration={1.5}
                />
                <div className='experience-content'>
                    <h1 className="gradient-text">{fullText}</h1>
                    <div className="button-container">
                        <a href={ cvPdf } target="_blank" rel="noopener noreferrer" className='home-experience-button' style={{ transform: `translateY(${buttonTranslateY * button1Delay}px)`, opacity: 1 - button1Delay }}>CV</a>
                        <a href={ resumePdf } target="_blank" rel="noopener noreferrer" className='home-experience-button margin-l' style={{ transform: `translateY(${buttonTranslateY * button2Delay}px)`, opacity: 1 - button2Delay }}>Resume</a>
                        <Link to="/Experience" className="home-experience-button margin-l" style={{ transform: `translateY(${buttonTranslateY * button3Delay}px)`, opacity: 1 - button3Delay }}>Experience</Link>
                    </div>
                </div>
                <div className="home-experience-image">
                    <GlowEffect
                        colors={['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#9400D3']}
                        mode='static'
                        blur='large'
                    />
                    <Link to="/Experience">
                        <img src={ logo } alt="Description" className="circular-image" />
                    </Link>
                </div>
            </div>
            <div className='home-hobbies' ref={hobbiesRef} style={{ opacity: hobbiesOpacity }}>
                <FlowingMenu
                    items={hobbyItems}
                    speed={15}
                    textColor="#ffffffff"
                    bgColor="#060010"
                    marqueeBgColor="#ffffff"
                    marqueeTextColor="#060010"
                    borderColor="#ffffff"
                />
            </div>
        <Footer />
        </div>
    );
}

export default Home;
