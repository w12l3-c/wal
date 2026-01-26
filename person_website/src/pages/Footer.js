import React from 'react';
import './Footer.css';

import gmail from '../assets/footer/gmail.png';
import github from '../assets/footer/github.webp';
import linkedin from '../assets/footer/linkedin.png';

function Footer(){
    return (
        <footer className='footer'>
            <div className='icon-container'>
                <a href='https://www.linkedin.com/in/wallace-lee-yh/' target='_blank'><img src={linkedin} alt="linkedin" /></a>
                <a href='https://github.com/w12l3-c' target='_blank'><img src={github} alt="github" /></a>
                <a href="mailto:wwlee@uwaterloo.ca"><img src={gmail} alt="gmail" /></a>
            </div>
            <p>Made by Wallace Lee • © 2026</p>
        </footer>
    );
};

export default Footer;
