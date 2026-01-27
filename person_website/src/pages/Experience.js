import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Experience.css';

import StaggeredMenu from './StaggeredMenu.js';
import Waves from '../components/effects/Waves';
import Footer from './Footer.js';
import SplitText from '../components/ui/SplitText';
import ShinyText from '../components/ui/ShinyText';
import MagicBento from '../components/ui/MagicBento';
import ColorBends from '../components/effects/ColorBends';
import Aurora from '../components/effects/Aurora';

import placeholder from '../assets/misc/placeholder.jpeg';
import sunnybrook from '../assets/pages/experience/sunnybrook.JPG';
import vip from '../assets/pages/experience/vip.png';
import watai from '../assets/pages/experience/wat_ai_logo.jpeg'
import watolink from '../assets/pages/experience/watolink.jpeg';
import igem from '../assets/pages/experience/igem.png';
import biotron from '../assets/pages/experience/biotron.jpeg';
import warg from '../assets/pages/experience/WARG.png';
import nrc from '../assets/pages/experience/nrc.webp';
import safari from '../assets/pages/experience/safari.webp';
import cognixion from '../assets/pages/experience/cognixion.webp';
import sickkids from '../assets/pages/experience/sickkids.webp';

function Experience() {
    useEffect(() => {
        const containers = Array.from(document.querySelectorAll('.experience-item'));
        const images = Array.from(document.querySelectorAll('.experience-image'));
        const scrollTrack = document.querySelector('.work-scroll-track');
        const imageContainer = document.querySelector('.experience-image-container');
        const transitionRatio = 0.1;

        if (!scrollTrack || containers.length === 0) {
            return undefined;
        }

        let ticking = false;

        const updateTrackHeight = () => {
            const segmentHeight = window.innerHeight * 0.8;
            const extraScroll = segmentHeight * transitionRatio * 2;
            const tailSpace = window.innerHeight * 0.6;
            scrollTrack.style.height = `${containers.length * segmentHeight + extraScroll + tailSpace}px`;
        };

        const handleScroll = () => {
            if (ticking) return;
            ticking = true;

            window.requestAnimationFrame(() => {
                const windowHeight = window.innerHeight;
                const scrollPerContainer = windowHeight * 0.8;
                const transitionWindow = scrollPerContainer * transitionRatio;
                const trackTop = scrollTrack.getBoundingClientRect().top + window.scrollY;
                const scrollInTrack = Math.max(window.scrollY - trackTop, 0);
                const totalScrollHeight = containers.length * scrollPerContainer;
                const imageVisible = scrollInTrack <= totalScrollHeight + transitionWindow - 10;

                if (imageContainer) {
                    imageContainer.style.opacity = imageVisible ? '1' : '0';
                    imageContainer.style.pointerEvents = imageVisible ? 'auto' : 'none';
                }

                containers.forEach((container, index) => {
                    const containerStart = index * scrollPerContainer;
                    const containerEnd = (index + 1) * scrollPerContainer;
                    const fadeOutStart = containerEnd - transitionWindow;
                    const fadeOutEnd = containerEnd + transitionWindow;
                    const fadeInStart = containerStart - transitionWindow;
                    const fadeInEnd = containerStart + transitionWindow;

                    let opacity = 0;
                    let translateY = 60;

                    if (index === 0 && scrollInTrack < transitionWindow) {
                        opacity = 1;
                        translateY = 0;
                    } else if (scrollInTrack >= fadeInEnd && scrollInTrack < fadeOutStart) {
                        opacity = 1;
                        translateY = 0;
                    } else if (index === containers.length - 1 && scrollInTrack >= fadeInEnd && scrollInTrack < totalScrollHeight + transitionWindow) {
                        opacity = 1;
                        translateY = 0;
                    } else if (scrollInTrack >= fadeOutStart && scrollInTrack < fadeOutEnd) {
                        const progress = (scrollInTrack - fadeOutStart) / (transitionWindow * 2);
                        opacity = Math.max(0, 1 - progress);
                        translateY = -progress * 120;
                    } else if (scrollInTrack >= fadeInStart && scrollInTrack < fadeInEnd) {
                        const progress = (scrollInTrack - fadeInStart) / (transitionWindow * 2);
                        opacity = Math.max(0, progress);
                        translateY = (1 - progress) * 80;
                    } else if (scrollInTrack >= fadeOutEnd) {
                        opacity = 0;
                        translateY = -120;
                    }

                    container.style.opacity = opacity;
                    container.style.transform = `translateY(${translateY}px)`;
                    container.style.pointerEvents = opacity > 0.6 ? 'auto' : 'none';

                    const image = images[index];
                    if (image) {
                        let imageOpacity = opacity;
                        if (index === containers.length - 1 && scrollInTrack >= fadeOutStart - 10) {
                            imageOpacity = 0;
                        }
                        image.style.opacity = String(imageOpacity);
                    }

                    const line = container.querySelector('.vertical-line');
                    if (line) {
                        const lineProgress = Math.min(
                            Math.max((scrollInTrack - containerStart) / scrollPerContainer, 0),
                            1
                        );
                        line.style.setProperty('--fill-height', `${lineProgress * 100}%`);
                    }
                });

                if (scrollInTrack >= totalScrollHeight + transitionWindow) {
                    images.forEach((img) => {
                        img.style.opacity = '0';
                    });
                }

                ticking = false;
            });
        };

        const handleResize = () => {
            updateTrackHeight();
            handleScroll();
        };

        updateTrackHeight();
        handleScroll();
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const sections = document.querySelectorAll('.fade-in-section');
        if (sections.length === 0) return undefined;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                    } else {
                        entry.target.classList.remove('animate-in');
                    }
                });
            },
            { threshold: 0.2 }
        );

        sections.forEach((section) => observer.observe(section));

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const container = document.querySelector('.experience-image-container');
        const wrapper = document.querySelector('.experience-image-wrapper');
        if (!container || !wrapper) return undefined;

        const maxTilt = 8;
        let rafId = null;

        const handleMove = (event) => {
            if (window.matchMedia('(hover: none)').matches) return;
            const rect = container.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            const px = (x / rect.width) * 2 - 1;
            const py = (y / rect.height) * 2 - 1;
            const rotateX = (-py * maxTilt).toFixed(2);
            const rotateY = (px * maxTilt).toFixed(2);

            if (rafId) cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(() => {
                wrapper.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
            });
        };

        const resetTilt = () => {
            if (rafId) cancelAnimationFrame(rafId);
            wrapper.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
        };

        container.addEventListener('mousemove', handleMove);
        container.addEventListener('mouseleave', resetTilt);
        container.addEventListener('touchstart', resetTilt, { passive: true });

        return () => {
            container.removeEventListener('mousemove', handleMove);
            container.removeEventListener('mouseleave', resetTilt);
            container.removeEventListener('touchstart', resetTilt);
            if (rafId) cancelAnimationFrame(rafId);
        };
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

    const awards = [
        {
            title: "Published Paper in CVPR 2025 MetaFood Workshop",
            subtitle: 'University of Waterloo',
            label: '2025',
            description: 'Dietary Intake Estimation via Continuous 3D Reconstruction of Food',
            tier: 'gold'
        },
        {
            title: "2 Academic Poster in CVIS 2024",
            subtitle: 'University of Waterloo',
            label: '2025',
            description: 'Challenges and Approaches to 3D Reconstruction of Food for Dietary Behaviours Monitoring & Enhancing AI-powered Tuberculosis Screening: Preliminary Insights into Adversarial Robustness',
            tier: 'gold'
        },
        {
            title: "President's Research Award",
            subtitle: 'University of Waterloo',
            label: '2022 - 2025',
            description: 'Consecutive recognition for outstanding undergraduate research contributions',
            tier: 'gold'
        },
        {
            title: "Dean's Honours List",
            subtitle: 'University of Waterloo',
            label: 'Multiple Terms',
            description: 'Recognition for academic excellence with term average ≥80%',
            tier: 'gold'
        },
        {
            title: '1st Place Academic Poster Competition',
            subtitle: 'Sunnybrook Research Institute',
            label: '2023',
            description: 'Won first place for research on MRI segmentation for focused ultrasound surgery',
            tier: 'gold'
        },
        {
            title: 'Silver Medal',
            subtitle: 'Waterloo iGEM Team',
            label: '2025',
            description: 'International competition recognition for microbiome therapeutic solutions project',
            tier: 'silver'
        },
        {
            title: 'Bronze Medal',
            subtitle: 'Waterloo iGEM Team',
            label: '2023',
            description: 'International competition recognition for microbiome therapeutic solutions project',
            tier: 'bronze'
        }
    ];

    const awardGlow = {
        gold: '255, 204, 64',
        silver: '200, 200, 210',
        bronze: '205, 127, 50'
    };
    
    return(
        <div className='main1'>
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
            <div className='experience'>
                <div className='Work'>
                    <Waves
                        lineColor="#7c7c7cff"
                        backgroundColor="rgba(255, 255, 255, 0.0)"
                        waveSpeedX={0.0125}
                        waveSpeedY={0.01}
                        waveAmpX={40}
                        waveAmpY={20}
                        friction={0.9}
                        tension={0.01}
                        maxCursorMove={120}
                        xGap={12}
                        yGap={36}
                        className="work-waves"
                    />
                    <h1>Work Experience</h1>
                    <div className='work-flex'>
                        <div className='experience-image-container'>
                            <div className='experience-image-wrapper'>
                                <img src={cognixion} alt='Cognixion' className='experience-image' data-index="0" />
                                <img src={safari} alt='Safari AI' className='experience-image' data-index="1" />
                                <img src={nrc} alt='NRC' className='experience-image' data-index="2" />
                                <img src={vip} alt='VIP Lab' className='experience-image' data-index="3" />
                                <img src={sickkids} alt='SickKids' className='experience-image' data-index="4" />
                                <img src={sunnybrook} alt='Sunnybrook' className='experience-image' data-index="5" />
                            </div>
                        </div>
                        <div className='work-scroll-track'>
                            <div className='experience-item' data-index="0">
                                <div className='container'>
                                    <div className='vertical-line'></div>
                                    <div className='box'>
                                        <div className='box-wrapper'>
                                            <div className='box-content'>
                                                <h3>Biomedical Engineering Intern</h3>
                                                <h4>Cognixion Inc.</h4>
                                                <h5>Jan 2026 - Apr 2026</h5>
                                                <ul>
                                                    <li>Designing and Researching Adaptive Filter Algorithm to filter intrinsic and extrinsic EEG noise to improve signal quality aquired from company's EEG headset</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className='experience-item' data-index="1">
                                <div className='container'>
                                    <div className='vertical-line'></div>
                                    <div className='box'>
                                        <div className='box-wrapper'>
                                            <div className='box-content'>
                                                <h3>Machine Learning Engineering Intern</h3>
                                                <h4>Safari AI</h4>
                                                <h5>May 2024 - August 2024</h5>
                                                <ul>
                                                    <li>Building computer vision products using detectors and various algorithms such as optical flow and geometry relation to generate business statistics and dashboards</li>
                                                    <li>Using AWS Sagemaker, S3, Lambda, ECS, Postgresql, and FastAPI to create a Queue API for fast video inference customization and resource management for AI Sagemaker jobs</li>
                                                    <li>Training and deploying detection models such as RTMDet and Fast RCNN on custom data with OpenMME</li>
                                                    <li>Creating dashboards that draw data from InfluxDB and turn it into an aesthetic display of business statistics such as throughput, ingress/egress, real-time occupation etc.</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className='experience-item' data-index="2">
                                <div className='container'>
                                    <div className='vertical-line'></div>
                                    <div className='box'>
                                        <div className='box-wrapper'>
                                            <div className='box-content'>
                                                <h3>Machine Learning Research Intern</h3>
                                                <h4>National Research Council Canada (NRC)</h4>
                                                <h5>September 2024 - Present</h5>
                                                <ul>
                                                    <li>Research adversarial attack/defense strategies for medical imaging; improved robust accuracy on chest X-ray classification from 28% to 98% under defined attack settings (PGDInf)</li>
                                                    <li>Implemented a MultiLayer detector over penultimate-layer embeddings to separate adversarial vs. clean inputs</li>
                                                    <li>Fine-tuned CNN and ViT backbones (ResNet50, DenseNet121, ViT, DeiT) from Chexpert models to classify chest X-rays (healthy, tuberculosis, COVID-19) and integrated Grad-CAM for clinician-oriented explanations</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className='experience-item' data-index="3">
                                <div className='container'>
                                    <div className='vertical-line'></div>
                                    <div className='box'>
                                        <div className='box-wrapper'>
                                            <div className='box-content'>
                                                <h3>Computer Vision Research Assistant</h3>
                                                <h4>Vision and Image Processing Lab</h4>
                                                <h5>September 2023 - Present</h5>
                                            <ul>
                                                <li>Utilizing pose and mesh estimation techniques to perform 3D reconstruction of food and hand interactions from monocular videos (research published in CVPR 2025 MetaFood Workshop)</li>
                                                <li>Employing Generative AI techniques (LoRA, DreamBooth, Diffusion Models) to create synthetic data and expand COVID x-ray datasets</li>
                                                <li>Investigating foreign object detection in x-ray images using Fast R-CNN and Visual Language Models to create x-ray description labels for precise generation</li>
                                                <li>Generative AI research for controllable animation to apply realistic and dynamic movements on characters with video input</li>
                                                <li>Explore using 3D Gaussian Splatting to map out open large space such as an office or campus</li>
                                                <li>Researched Live2D Generative Models and Motion Tracking applications</li>
                                            </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className='experience-item' data-index="4">
                                <div className='container'>
                                    <div className='vertical-line'></div>
                                    <div className='box'>
                                        <div className='box-wrapper'>
                                            <div className='box-content'>
                                                <h3>Robotics and Machine Learning Research Assistant</h3>
                                                <h4>The Hospital for Sick Children (SickKids) - CIGITI Lab</h4>
                                                <h5>January 2024 - April 2024</h5>
                                            <ul>
                                                <li>Developed Fetal and Maternal segmentation pipeline to aid Magnetic Resonance guided Focused Ultrasound (FUS) treatment simulation</li>
                                                <li>Built FUS simulator for treatment cell planning and safety validation of FUS treatment using acoustic and thermal simulations with kWave</li>
                                                <li>Research in diffusion-based models such as instruct pix2pix and biophysics embedded ML for time-series Laser Interstitial thermal therapy heatmap prediction to improve surgery planning workflow</li>
                                                <li>Designed and simulated controllers for 6 DOF MR-safe robot-controlled transducers using Robot Operating System (ROS), RViz, and Gazebo</li>
                                            </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className='experience-item' data-index="5">
                                <div className='container'>
                                    <div className='vertical-line'></div>
                                    <div className='box'>
                                        <div className='box-wrapper'>
                                            <div className='box-content'>
                                                <h3>Machine Learning Research Assistant</h3>
                                                <h4>Focused Ultrasound Lab - Sunnybrook Research Institute</h4>
                                                <h5>May 2023 - August 2023</h5>
                                            <ul>
                                                <li>Achieve 99.97% time reduction in MRI regional segmentation by implementing 3D and 2D Machine Learning pipeline with 89.5 dice score </li>
                                                <li>Create a segmentation dataset with 8K masks on MRI dicom files for MRI Guided Focused Ultrasound Surgery of Uterine Fibroids</li>
                                                <li>Develop a GUI with streamlit to allow custom model inference and a Huggingface Demo with gradio</li>
                                                <li>Win 1st place in Sunnybrook's academic poster competition</li>
                                            </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="to-be-continued">
                        <ShinyText
                            speed={2}
                            delay={0}
                            color="#7c4dff"
                            shineColor="#ffffff"
                            spread={120}
                            direction="left"
                            yoyo={false}
                            pauseOnHover={false}
                            disabled={false}
                            className="to-be-continued-text"
                            as="div"
                        >
                            <SplitText
                                text="... To be Continued ..."
                                className="to-be-continued-text-inner"
                                delay={50}
                                duration={1.25}
                                ease="power3.out"
                                splitType="chars"
                                from={{ opacity: 0, y: 40 }}
                                to={{ opacity: 1, y: 0 }}
                                threshold={0.1}
                                rootMargin="-100px"
                                textAlign="center"
                                tag="h2"
                            />
                        </ShinyText>
                    </div>
                </div>
                <div className='Education fade-in-section'>
                    {/* <Aurora
                        colorStops={['#7cff67', '#B19EEF', '#5227FF']}
                        blend={0.5}
                        amplitude={1.0}
                        speed={1}
                    /> */}
                    <h1>Design Teams</h1>
                    <div className='work-flex'>
                        <div className='edu-container fade-in-section'>
                            <div className='circular left'><img src={watai} loading="lazy" decoding="async"></img></div>
                            <div className='content'>
                                <h3>ML CFD Member</h3>
                                <h4>WatAI - Radiel Health</h4>
                                <h5>September 2024 - Current</h5>
                                <ul>
                                    <li>Literature review about CFD in human body and perform Ansys analysis</li>
                                    <li>Using UltraSAM to segment ultrasound images for artery structure</li>
                                </ul>
                            </div>
                        </div>
                        <div className='edu-container fade-in-section'>
                            <div className='circular right'><img src={watolink} loading="lazy" decoding="async"></img></div>
                            <div className='content-right'>
                                <h3>Software Member</h3>
                                <h4>WATOLINK - BCI WheelChair</h4>
                                <h5>September 2023 - April 2025</h5>
                                <ul>
                                    <li>Developed real-time signal processing algorithms for Jetson NANO</li>
                                    <li>Implemented multi-threading for simultaneous LED control and EEG signal acquisition</li>
                                    <li>Achieved 95% accuracy in BCI command recognition</li>
                                </ul>
                            </div>
                        </div>
                        <div className='edu-container fade-in-section'>
                            <div className='circular left'><img src={igem} loading="lazy" decoding="async"></img></div>
                            <div className='content'>
                                <h3>Math & Modelling CoLead</h3>
                                <h4>Waterloo iGEM</h4>
                                <h5>January 2023 - August 2024</h5>
                                <ul>
                                    <li>2025: Hydroguard - Bacteriophage infused hydrogel to prevent UTI - Silver Medal</li>
                                    <li>2024: Microbiome therapeutic solutions</li>
                                    <li>2023: TSWV RNAi Vaccine 🦠 - Bronze Medal</li>
                                </ul>
                            </div>
                        </div>
                        <div className='edu-container'>
                            <div className='circular right'><img src={warg} loading="lazy" decoding="async"></img></div>
                            <div className='content-right'>
                                <h3>Hardware Member</h3>
                                <h4>Waterloo Aerial Robotics Group</h4>
                                <h5>September 2023 - August 2024</h5>
                                <ul>
                                    <li>Designed drone components using SolidWorks and PDM for 2024 AEAC competition</li>
                                    <li>Engineered landing gear, electronics casings, and gimbal systems</li>
                                    <li>Team placed 3rd in autonomous navigation challenge</li>
                                </ul>
                            </div>
                        </div>
                        <div className='edu-container'>
                            <div className='circular left'><img src={biotron} loading="lazy" decoding="async"></img></div>
                            <div className='content'>
                                <h3>Hardware Member & Software Lead</h3>
                                <h4>BioMechatronics - EMG Fabric</h4>
                                <h5>September 2022 - April 2024</h5>
                                <ul>
                                    <li>Designed and fabricated EMG signal collection sleeve using 3D CAD</li>
                                    <li>Developed signal processing algorithms for real-time EMG analysis</li>
                                    <li>Implemented wireless communication using ESP32 and Arduino</li>
                                    <li>Created gesture recognition system using PyTorch and ensemble methods</li>
                                    <li>Achieved 92% accuracy in gesture classification</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='Skills fade-in-section'>
                    <h1 style={{textAlign: 'center'}}>Technical Skills</h1>
                    <div className='skills-grid'>
                        <div className='skill-category'>
                            <h3>Programming Languages</h3>
                            <div className='skill-tags'>
                                <span className='skill-tag'>Python</span>
                                <span className='skill-tag'>JavaScript</span>
                                <span className='skill-tag'>C++</span>
                                <span className='skill-tag'>CUDA</span>
                                <span className='skill-tag'>MATLAB</span>
                                <span className='skill-tag'>SQL</span>
                            </div>
                        </div>
                        <div className='skill-category'>
                            <h3>Machine Learning & AI</h3>
                            <div className='skill-tags'>
                                <span className='skill-tag'>PyTorch</span>
                                <span className='skill-tag'>TensorFlow</span>
                                <span className='skill-tag'>JAX</span>
                                <span className='skill-tag'>OpenCV</span>
                                <span className='skill-tag'>Numpy</span>
                                <span className='skill-tag'>Pandas</span>
                                <span className='skill-tag'>Scipy</span>
                                <span className='skill-tag'>Scikit-learn</span>
                                <span className='skill-tag'>OpenMME</span>
                                <span className='skill-tag'>Hugging Face</span>
                                <span className='skill-tag'>Langchain</span>
                                <span className='skill-tag'>AlphaFold3</span>
                            </div>
                        </div>
                        <div className='skill-category'>
                            <h3>Web Development</h3>
                            <div className='skill-tags'>
                                <span className='skill-tag'>React</span>
                                <span className='skill-tag'>Node.js</span>
                                <span className='skill-tag'>FastAPI</span>
                                <span className='skill-tag'>HTML/CSS</span>
                                <span className='skill-tag'>PostgreSQL</span>
                            </div>
                        </div>
                        <div className='skill-category'>
                            <h3>Cloud & DevOps</h3>
                            <div className='skill-tags'>
                                <span className='skill-tag'>AWS</span>
                                <span className='skill-tag'>SageMaker</span>
                                <span className='skill-tag'>EC2</span>
                                <span className='skill-tag'>E3</span>
                                <span className='skill-tag'>Lambda</span>
                                <span className='skill-tag'>Azure</span>
                                <span className='skill-tag'>Docker</span>
                                <span className='skill-tag'>Kubernetes</span>
                                <span className='skill-tag'>Git</span>
                                <span className='skill-tag'>Linux</span>
                                <span className='skill-tag'>HPC</span>
                            </div>
                        </div>
                        <div className='skill-category'>
                            <h3>Research & Simulation</h3>
                            <div className='skill-tags'>
                                <span className='skill-tag'>ROS</span>
                                <span className='skill-tag'>Gazebo</span>
                                <span className='skill-tag'>ANSYS</span>
                                <span className='skill-tag'>SolidWorks</span>
                                <span className='skill-tag'>kWave</span>
                            </div>
                        </div>
                        <div className='skill-category'>
                            <h3>Biosignals</h3>
                            <div className='skill-tags'>
                                <span className='skill-tag'>Electromyography EMG</span>
                                <span className='skill-tag'>Electroencephalogram EEG</span>
                                <span className='skill-tag'>Electrocardiogram ECG</span>
                                <span className='skill-tag'>Bacterial Viral Dynamics</span>
                                <span className='skill-tag'>Protein Structure</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='Awards'>
                    <ColorBends
                        colors={['#fb432bff', '#24f8aaff', '#2200ffff']}
                        rotation={0}
                        speed={0.2}
                        scale={1}
                        frequency={1}
                        warpStrength={1}
                        mouseInfluence={1}
                        parallax={0.5}
                        noise={0.1}
                        transparent
                        autoRotate={0}
                    />
                    <h1>Awards & Recognition</h1>
                    <MagicBento
                        textAutoHide={true}
                        enableStars={false}
                        enableSpotlight
                        enableBorderGlow={true}
                        enableTilt
                        enableMagnetism
                        clickEffect
                        spotlightRadius={500}
                        particleCount={12}
                        glowColor="132, 0, 255"
                        disableAnimations={false}
                        cards={awards.map((award) => ({
                            ...award,
                            glowColor: awardGlow[award.tier] || awardGlow.gold
                        }))}
                    />
                </div>
            </div>
            
            <Footer />
        </div>
    )
};

export default Experience;
