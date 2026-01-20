import './Home.css'
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import logo from './assets/class_logo.png';
import resumePdf from './assets/Wallace_Resume.pdf';
import cvPdf from './assets/CV-3.pdf';

import violin from './assets/home_slider/violin.jpeg';
import badminton from './assets/home_slider/badminton.jpeg';
import drawing from './assets/home_slider/drawing.jpeg';

import Footer from './pages/Footer.js';
import StaggeredMenu from './pages/StaggeredMenu.js';

import FloatingLines from './FloatingLines.js';
import FlowingMenu from './FlowingMenu.js';

function Home() {
    const [text, setText] = useState('');
    const fullText = 'Hi I am Wallace';
    
    const bannerRef = useRef();
    const experienceRef = useRef();
    const hobbiesRef = useRef();
    const titleRef = useRef();

    const images = [violin, badminton, drawing];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [opacity, setOpacity] = useState(1);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        let timer = setInterval(() => {
        setText((prevText) => {
            return fullText.substr(0, prevText.length + 1);
        });
        }, 112); // adjust typing speed by changing this value

        return () => clearInterval(timer); // cleanup on unmount
    }, []);

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
        { label: 'Home', ariaLabel: 'Go to home page', link: '/wal' },
        { label: 'Experience', ariaLabel: 'View experience', link: '/Experience' },
        { label: 'Projects', ariaLabel: 'View projects', link: '/Projects' },
        { label: 'Hobbies', ariaLabel: 'View hobbies', link: '/Hobbies' }
    ];

    const socialItems = [
        { label: 'GitHub', link: 'https://github.com' },
        { label: 'LinkedIn', link: 'https://linkedin.com' }
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
                <h1 ref={titleRef}>{text}<span className="blink">_</span></h1>
            </div>
            <div className='home-experience flex-container' ref={experienceRef} style={{ opacity: experienceOpacity }}>
                <div>
                    <h1>Biomedical Engineering Student at University of Waterloo</h1>
                    <a href={ cvPdf } target="_blank" rel="noopener noreferrer" className='home-experience-button'>CV</a>
                    <a href={ resumePdf } target="_blank" rel="noopener noreferrer" className='home-experience-button margin-l'>Resume</a>
                    <Link to="/Experience" className="home-experience-button margin-l">Experience</Link>
                </div>
                <div className='adjust-center'>
                    <Link to="/Experience"><img src={ logo } alt="Description" className="circular-image" /></Link>
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