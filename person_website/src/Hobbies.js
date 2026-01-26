import React, { useState, useEffect } from "react";

import StaggeredMenu from './pages/StaggeredMenu.js';
import Footer from './pages/Footer.js';

import './Hobbies.css';

// Import hobby images
import violin from './assets/home_slider/violin.jpeg';
import badminton from './assets/home_slider/badminton.jpeg';
import drawing from './assets/home_slider/drawing.webp';

function Hobbies() {
    const [selectedHobby, setSelectedHobby] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    
    // Art gallery images - you can add more art pieces here
    const artGallery = [
        drawing, // placeholder - replace with actual art pieces
        drawing,
        drawing,
        drawing,
        drawing,
        drawing,
    ];
    
    const hobbies = [
        {
            title: "Music & Violin",
            image: violin,
            description: "I've been playing violin for over 8 years and love exploring different musical genres. From classical pieces to modern arrangements, music has been a constant source of creativity and relaxation in my life.",
            skills: ["Classical Music", "Contemporary Arrangements", "Music Theory", "Performance"],
            type: "regular"
        },
        {
            title: "Badminton",
            image: badminton,
            description: "An avid badminton player who enjoys both casual games with friends and competitive matches. The sport has taught me strategy, quick reflexes, and the importance of teamwork.",
            skills: ["Singles & Doubles", "Strategic Play", "Tournament Experience", "Coaching Basics"],
            type: "regular"
        },
        {
            title: "Digital Art & Drawing",
            image: drawing,
            description: "I enjoy creating digital artwork and traditional drawings as a way to express creativity outside of engineering. From character design to technical illustrations, art helps me see the world from different perspectives.",
            skills: ["Digital Illustration", "Character Design", "Traditional Drawing", "Concept Art"],
            type: "gallery",
            gallery: artGallery
        }
    ];

    // Separate hobbies into categories
    const regularHobbies = hobbies.filter(h => h.type === "regular");
    const artHobby = hobbies.find(h => h.type === "gallery");

    // Auto-transition effect for regular hobbies only
    useEffect(() => {
        if (!isPaused) {
            const interval = setInterval(() => {
                setSelectedHobby((prev) => (prev + 1) % regularHobbies.length);
            }, 5000); // Change every 5 seconds
            
            return () => clearInterval(interval);
        }
    }, [isPaused, regularHobbies.length]);

    const menuItems = [
        { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
        { label: 'Experience', ariaLabel: 'View experience', link: '/Experience' },
        { label: 'Projects', ariaLabel: 'View projects', link: '/Projects' },
        { label: 'Hobbies', ariaLabel: 'View hobbies', link: '/Hobbies' }
    ];

    const socialItems = [
        { label: 'GitHub', link: 'https://github.com' },
        { label: 'LinkedIn', link: 'https://linkedin.com' }
    ];

    return(
        <div className="hobbies-main">
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
                <h1>My Hobbies</h1>
                <p>Beyond engineering and technology, I have a passion for creative pursuits that keep me balanced and inspired.</p>
            </div>

            
            {/* Art Gallery Section */}
            {artHobby && (
                <div className="art-section-container">
                    <div className="art-section-header">
                        <h2>{artHobby.title}</h2>
                        <p>{artHobby.description}</p>
                    </div>

                    <div className="art-gallery-wrapper">
                        {/* The marquee container that hides overflow */}
                        <div className="art-marquee">
                            {/* The moving track */}
                            <div className="art-track">
                                {/* First set of images */}
                                {artHobby.gallery.map((art, index) => (
                                    <div key={`set1-${index}`} className="art-item">
                                        <img src={art} alt={`Art ${index + 1}`} />
                                    </div>
                                ))}
                                {/* Duplicate set for seamless loop */}
                                {artHobby.gallery.map((art, index) => (
                                    <div key={`set2-${index}`} className="art-item">
                                        <img src={art} alt={`Art ${index + 1}`} />
                                    </div>
                                ))}
                                {/* Third set to ensure coverage on large screens if needed */}
                                {artHobby.gallery.map((art, index) => (
                                    <div key={`set3-${index}`} className="art-item">
                                        <img src={art} alt={`Art ${index + 1}`} />
                                    </div>
                                ))}
                                {artHobby.gallery.map((art, index) => (
                                    <div key={`set4-${index}`} className="art-item">
                                        <img src={art} alt={`Art ${index + 1}`} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Regular Hobbies Section */}
            <div className="hobbies-container" 
                 onMouseEnter={() => setIsPaused(true)}
                 onMouseLeave={() => setIsPaused(false)}>
                
                {/* Progress indicators */}
                <div className="hobbies-indicators">
                    {regularHobbies.map((_, index) => (
                        <div 
                            key={index}
                            className={`indicator ${selectedHobby === index ? 'active' : ''}`}
                            onClick={() => setSelectedHobby(index)}
                        >
                            <div className="indicator-fill"></div>
                        </div>
                    ))}
                </div>

                <div className="hobby-content">
                    <div className="hobby-image-container">
                        <img 
                            src={regularHobbies[selectedHobby].image} 
                            alt={regularHobbies[selectedHobby].title}
                            className="hobby-image"
                        />
                    </div>
                    
                    <div className="hobby-details">
                        <h2>{regularHobbies[selectedHobby].title}</h2>
                        <p>{regularHobbies[selectedHobby].description}</p>
                        
                        <div className="hobby-skills">
                            <h3>Skills & Interests:</h3>
                            <ul>
                                {regularHobbies[selectedHobby].skills.map((skill, index) => (
                                    <li key={index}>{skill}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            
            <Footer />
        </div>
    )
}

export default Hobbies;