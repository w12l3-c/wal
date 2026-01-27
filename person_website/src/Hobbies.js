import React, { useEffect, useMemo, useRef } from "react";

import StaggeredMenu from './pages/StaggeredMenu.js';
import Footer from './pages/Footer.js';

import './Hobbies.css';
import SplashCursor from './SplashCursor';
import Masonry from './Masonry';
import Beams from './Beams';

// Import hobby images
import drawing from './assets/home_slider/drawing.webp';
import instagramLogo from './assets/Instagram_icon.png';
import xLogo from './assets/x.png';

function Hobbies() {
    const artSectionRef = useRef(null);
    // Art gallery images by folder
    const regularGallery = useMemo(() => {
        const importAll = require.context('./assets/art/Regular', false, /\.(webp|png|jpe?g)$/);
        return importAll.keys().sort().map((key) => importAll(key));
    }, []);

    const artfightGallery = useMemo(() => {
        const importAll = require.context('./assets/art/artfight', false, /\.(webp|png|jpe?g)$/);
        return importAll.keys().sort().map((key) => importAll(key));
    }, []);

    const inktober2023Gallery = useMemo(() => {
        const importAll = require.context('./assets/art/inktober2023', false, /\.(webp|png|jpe?g)$/);
        return importAll.keys().sort().map((key) => importAll(key));
    }, []);

    const inktober2024Gallery = useMemo(() => {
        const importAll = require.context('./assets/art/inktober2024', false, /\.(webp|png|jpe?g)$/);
        return importAll.keys().sort().map((key) => importAll(key));
    }, []);
    
    const artHobby = {
        title: "Artfights and Inktobers!",
        image: drawing,
        description: "Artfights and Inktobers!",
        gallery: regularGallery
    };
    const artRows = useMemo(() => {
        return {
            artfight: artfightGallery,
            inktober2023: inktober2023Gallery,
            inktober2024: inktober2024Gallery
        };
    }, [artfightGallery, inktober2023Gallery, inktober2024Gallery]);

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

    useEffect(() => {
        if (!artSectionRef.current) return;
        const section = artSectionRef.current;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    section.classList.add('is-visible');
                } else {
                    section.classList.remove('is-visible');
                }
            },
            { threshold: 0.2 }
        );
        observer.observe(section);
        return () => observer.disconnect();
    }, []);

    return(
        <div className="hobbies-main">
            <SplashCursor />
            <div className="hobbies-beams">
                <Beams
                    beamWidth={3}
                    beamHeight={30}
                    beamNumber={20}
                    lightColor="#ffffff"
                    speed={2}
                    noiseIntensity={1.75}
                    scale={0.2}
                    rotation={30}
                />
            </div>
            <div className="hobbies-content">
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
            
            <div className="hobbies-header">
                <h1>Art Gallery</h1>
                <p>I like to draw</p>
                <div className="hobbies-socials">
                    <a
                        href="https://www.instagram.com/firewal_art/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram"
                        className="hobbies-social-link"
                    >
                        <img src={instagramLogo} alt="" aria-hidden="true" />
                    </a>
                    <a
                        href="https://x.com/firewal_"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="X"
                        className="hobbies-social-link"
                    >
                        <img src={xLogo} alt="" aria-hidden="true" />
                    </a>
                </div>
            </div>

            <section className="art-masonry-section">
                <div className="art-section-header">
                    <h2>Art and Collabs!</h2>
                </div>
                <Masonry
                    items={regularGallery.reverse().map((img, index) => ({
                        id: `regular-${index}`,
                        img
                    }))}
                    ease="power3.out"
                    duration={0.6}
                    stagger={0.05}
                    animateFrom="bottom"
                    scaleOnHover
                    hoverScale={0.97}
                    blurToFocus
                    colorShiftOnHover={false}
                />
            </section>

            
            {/* Art Gallery Section */}
            {artHobby && (artRows.artfight.length > 0 || artRows.inktober2023.length > 0 || artRows.inktober2024.length > 0) && (
                <div ref={artSectionRef} className="art-section-container art-section--fade">
                    <div className="art-section-header">
                        <h2>{artHobby.title}</h2>
                    </div>
                    <div className="art-gallery-wrapper">
                        {/* Row 1: Artfight */}
                        {artRows.artfight.length > 0 && (
                            <div className="art-marquee">
                                <div className="art-track art-track--forward">
                                    {artRows.artfight.map((art, index) => (
                                        <div key={`artfight-1-${index}`} className="art-item">
                                            <img src={art} alt={`Artfight ${index + 1}`} />
                                        </div>
                                    ))}
                                    {artRows.artfight.map((art, index) => (
                                        <div key={`artfight-2-${index}`} className="art-item">
                                            <img src={art} alt={`Artfight ${index + 1}`} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {/* Row 3: Inktober 2024 */}
                        {artRows.inktober2024.length > 0 && (
                            <div className="art-marquee">
                                <div className="art-track art-track--reverse">
                                    {artRows.inktober2024.map((art, index) => (
                                        <div key={`inktober2024-1-${index}`} className="art-item">
                                            <img src={art} alt={`Inktober 2024 ${index + 1}`} />
                                        </div>
                                    ))}
                                    {artRows.inktober2024.map((art, index) => (
                                        <div key={`inktober2024-2-${index}`} className="art-item">
                                            <img src={art} alt={`Inktober 2024 ${index + 1}`} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {/* Row 2: Inktober 2023 */}
                        {artRows.inktober2023.length > 0 && (
                            <div className="art-marquee">
                                <div className="art-track art-track--forward">
                                    {artRows.inktober2023.map((art, index) => (
                                        <div key={`inktober2023-1-${index}`} className="art-item">
                                            <img src={art} alt={`Inktober 2023 ${index + 1}`} />
                                        </div>
                                    ))}
                                    {artRows.inktober2023.map((art, index) => (
                                        <div key={`inktober2023-2-${index}`} className="art-item">
                                            <img src={art} alt={`Inktober 2023 ${index + 1}`} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        
                    </div>
                </div>
            )}
            
            <Footer />
            </div>
        </div>
    )
}

export default Hobbies;
