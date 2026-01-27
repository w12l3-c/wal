import React, { useState, useEffect } from 'react';

import StaggeredMenu from './StaggeredMenu.js';
import Footer from './Footer.js';
import LiquidChrome from '../components/effects/LiquidChrome';

import './Projects.css';
import { projectsData } from '../data/projectsData.js';

function Projects() {
    const [showCarousel, setShowCarousel] = useState(true);

    const images = projectsData.map(p => p.image); 
    const links = projectsData.map(p => p.link);
    const [currentSlide, setCurrentSlide] = useState(0);
    useEffect(() => {
        const tiltTargets = Array.from(document.querySelectorAll('.projects.carousel, .project-card'));
        if (tiltTargets.length === 0) return undefined;

        const baseTilt = 8;
        const gridTilt = 4;
        const baseScale = 1.03;
        const gridScale = 1.06;
        const rafIds = new Map();

        const handleMove = (event, el) => {
            if (window.matchMedia('(hover: none)').matches) return;
            const rect = el.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            const px = (x / rect.width) * 2 - 1;
            const py = (y / rect.height) * 2 - 1;
            const isGridCard = el.classList.contains('project-card');
            const maxTilt = isGridCard ? gridTilt : baseTilt;
            const scale = isGridCard ? gridScale : baseScale;
            const rotateX = (-py * maxTilt).toFixed(2);
            const rotateY = (px * maxTilt).toFixed(2);

            const rafId = rafIds.get(el);
            if (rafId) cancelAnimationFrame(rafId);
            rafIds.set(el, requestAnimationFrame(() => {
                el.style.setProperty('--tilt-x', `${rotateX}deg`);
                el.style.setProperty('--tilt-y', `${rotateY}deg`);
                el.style.setProperty('--tilt-scale', scale.toString());
            }));
        };

        const handleLeave = (el) => {
            const rafId = rafIds.get(el);
            if (rafId) cancelAnimationFrame(rafId);
            el.style.setProperty('--tilt-x', '0deg');
            el.style.setProperty('--tilt-y', '0deg');
            el.style.setProperty('--tilt-scale', '1');
        };

        tiltTargets.forEach((el) => {
            const moveHandler = (event) => handleMove(event, el);
            const leaveHandler = () => handleLeave(el);
            el.addEventListener('mousemove', moveHandler);
            el.addEventListener('mouseleave', leaveHandler);
            el.addEventListener('touchstart', leaveHandler, { passive: true });
            el._tiltMoveHandler = moveHandler;
            el._tiltLeaveHandler = leaveHandler;
        });

        return () => {
            tiltTargets.forEach((el) => {
                if (el._tiltMoveHandler) el.removeEventListener('mousemove', el._tiltMoveHandler);
                if (el._tiltLeaveHandler) el.removeEventListener('mouseleave', el._tiltLeaveHandler);
                if (el._tiltLeaveHandler) el.removeEventListener('touchstart', el._tiltLeaveHandler);
                el.style.setProperty('--tilt-x', '0deg');
                el.style.setProperty('--tilt-y', '0deg');
                el.style.setProperty('--tilt-scale', '1');
            });
            rafIds.forEach((id) => cancelAnimationFrame(id));
        };
    }, [showCarousel, currentSlide]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
    };

    const prevImageIndex = (currentSlide - 1 + images.length) % images.length;
    const nextImageIndex = (currentSlide + 1) % images.length;

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

    return(

        <div className="main">
            <LiquidChrome />
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
                accentColor="#5227FF"
                isFixed={true}
            />

            <h1>Projects</h1>
            <div className={`body ${showCarousel ? 'view-carousel' : 'view-grid'}`}>
                {showCarousel ? (
                    // Carousel View
                    <>
                        <div className="image-track">
                            <div><svg xmlns="http://www.w3.org/2000/svg" height="36" viewBox="0 -960 960 960" width="45" fill='white' onClick={prevSlide}><path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"/></svg></div>
                            
                            <a
                                href={links[prevImageIndex]} 
                                target='_blank' 
                                className='projects carousel carousel-small'
                            >
                                <img src={images[prevImageIndex]} alt="Previous" draggable={false} loading="lazy" decoding="async"/>
                            </a>
                            
                            <a
                                href={links[nextImageIndex]} 
                                target='_blank' 
                                className='projects carousel carousel-small'
                            >
                                <img src={images[nextImageIndex]} alt="Next" draggable={false} loading="lazy" decoding="async"/>
                            </a>
                            
                            <a
                                href={links[currentSlide]} 
                                target='_blank' 
                                className='projects carousel carousel-large'
                            >
                                <img src={images[currentSlide]} alt="Current" draggable={false} loading="lazy" decoding="async"/>
                            </a>
                            
                            <div><svg xmlns="http://www.w3.org/2000/svg" height="36" viewBox="0 -960 960 960" width="45" fill='white' onClick={nextSlide}><path d="M400-240 640-480l-240-240-56 56 184 184-184 184 56 56Z"/></svg></div>
                        </div>
                        <div className="carousel-dots">
                            {images.map((image, index) => (
                                <div key={index}
                                    className={`carousel-dot ${currentSlide === index ? 'active' : ''}`}
                                />
                            ))}
                        </div>
                    </>
                ) : (
                    // Grid View
                    <div className="projects-grid">
                        {[...projectsData].reverse().map((project, index) => (
                            <a key={index} href={project.link} target="_blank" rel="noopener noreferrer" className="project-card">
                                <div className="project-image">
                                    <img src={project.image} alt={project.title} loading="lazy" decoding="async"/>
                                </div>
                                <div className="project-info">
                                    <h3>{project.title}</h3>
                                    <p>{project.description}</p>
                                    <div className="project-technologies">
                                        {project.technologies.map((tech, techIndex) => (
                                            <span key={techIndex} className="tech-badge">{tech}</span>
                                        ))}
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                )}

                <div onClick={() => setShowCarousel(!showCarousel)} className='toggle-view'>
                {showCarousel ? 
                    <svg xmlns="http://www.w3.org/2000/svg" height="26" viewBox="0 -960 960 960" width="26" fill='white' className='toggle-icon'><path d="M120-520v-320h320v320H120Zm0 400v-320h320v320H120Zm400-400v-320h320v320H520Zm0 400v-320h320v320H520ZM200-600h160v-160H200v160Zm400 0h160v-160H600v160Zm0 400h160v-160H600v160Zm-400 0h160v-160H200v160Zm400-400Zm0 240Zm-240 0Zm0-240Z"/></svg>
                    : <svg xmlns="http://www.w3.org/2000/svg" height="26" viewBox="0 -960 960 960" width="26" fill='white' className='toggle-icon'><path d="M80-360v-240q0-33 23.5-56.5T160-680q33 0 56.5 23.5T240-600v240q0 33-23.5 56.5T160-280q-33 0-56.5-23.5T80-360Zm280 160q-33 0-56.5-23.5T280-280v-400q0-33 23.5-56.5T360-760h240q33 0 56.5 23.5T680-680v400q0 33-23.5 56.5T600-200H360Zm360-160v-240q0-33 23.5-56.5T800-680q33 0 56.5 23.5T880-600v240q0 33-23.5 56.5T800-280q-33 0-56.5-23.5T720-360Zm-360 80h240v-400H360v400Zm120-200Z"/></svg>
                    }
                </div>
            </div>
            {showCarousel && (
                <div className='description'>
                    <div key={currentSlide}>
                         <h3>{projectsData[currentSlide].title}</h3>
                         <div className='description-container'>
                             <div className='description-content'>
                                 {projectsData[currentSlide].longDescription}
                                 <br/><br/>
                                 <ul>
                                     {projectsData[currentSlide].technologies.map((tech, i) => <li key={i}>{tech}</li>)}
                                 </ul>
                             </div>
                             <div className='image-container'>
                                 <a href={links[currentSlide]}><img src={images[currentSlide]} alt={projectsData[currentSlide].title + " image"} loading="lazy" decoding="async"/></a>
                             </div>
                         </div>
                     </div>
                </div>
            )}
            <div className='decoration'></div>
            <Footer />
        </div>
    )
}

export default Projects;
