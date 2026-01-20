import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Experience.css';

import StaggeredMenu from './pages/StaggeredMenu.js';
import Footer from './pages/Footer.js';

import placeholder from './assets/placeholder.jpeg';
import sunnybrook from './assets/experience/sunnybrook.JPG';
import vip from './assets/experience/vip.png';
import watai from './assets/experience/wat_ai_logo.jpeg'
import watolink from './assets/experience/watolink.jpeg';
import igem from './assets/experience/igem.png';
import biotron from './assets/experience/biotron.jpeg';
import warg from './assets/experience/WARG.png';
import nrc from './assets/experience/nrc.webp';
import safari from './assets/experience/safari.webp';
import cognixion from './assets/experience/cognixion.webp';
import sickkids from './assets/experience/sickkids.webp';

function Experience() {
    useEffect(() => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe all sections
        const sections = document.querySelectorAll('.fade-in-section');
        sections.forEach(section => observer.observe(section));

        return () => observer.disconnect();
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
                <div className='Work fade-in-section'>
                    <h1>Work Experience</h1>
                    <div className='work-flex'>
                        <div className='container fade-in-section'>
                            <div className='vertical-line'></div>
                            <div className='box'>
                                <div className='box-content'>
                                    <h3>Biomedical Engineering Intern</h3>
                                    <h4>Cognixion Inc.</h4>
                                    <h5>Jan 2026 - Apr 2026</h5>
                                    <ul>
                                        <li>Designing and Researching Adaptive Filter Algorithm to filter intrinsic and extrinsic EEG noise to improve signal quality aquired from company's EEG headset</li>
                                    </ul>
                                </div>
                                <div className='box-image'>
                                    <img src={cognixion} alt='Safari AI' className='rounded-rectangle' loading="lazy" decoding="async"></img>
                                </div>
                            </div>
                        </div>
                        <div className='container fade-in-section'>
                            <div className='vertical-line'></div>
                            <div className='box'>
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
                                <div className='box-image'>
                                    <img src={safari} alt='Safari AI' className='rounded-rectangle' loading="lazy" decoding="async"></img>
                                </div>
                            </div>
                        </div>
                        <div className='container fade-in-section'>
                            <div className='vertical-line'></div>
                            <div className='box'>
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
                                <div className='box-image'>
                                    <img src={nrc} alt='NRC' className='rounded-rectangle' loading="lazy" decoding="async"></img>
                                </div>
                            </div>
                        </div>
                        <div className='container'>
                            <div className='vertical-line'></div>
                            <div className='box'>
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
                                <div className='box-image'>
                                    <img src={vip} alt='VIP Lab' className='rounded-rectangle' loading="lazy" decoding="async"></img>
                                </div>
                            </div>
                        </div>
                        <div className='container'>
                            <div className='vertical-line'></div>
                            <div className='box'>
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
                                <div className='box-image'>
                                    <img src={sickkids} alt='SickKids' className='rounded-rectangle' loading="lazy" decoding="async"></img>
                                </div>
                            </div>
                        </div>
                        <div className='container'>
                            <div className='vertical-line'></div>
                            <div className='box'>
                                <div className='box-content'>
                                    <h3>Machine Learning Research Assistant</h3>
                                    <h4>Focused Ultrasound Lab - Sunnybrook Research Institute</h4>
                                <h5>May 2023 - August 2023</h5>
                                <ul>
                                    <li>Achieve 99.97% time reduction in MRI regional segmentation by implementing 3D and 2D Machine Learning pipeline with 89.5 dice score </li>
                                    <li>Create a segmentation dataset with 8K masks on MRI dicom files for MRI Guided Focused Ultrasound Surgery of Uterine Fibroids</li>
                                    <li>Develop a GUI with streamlit to allow custom model inference and a Huggingface Demo with gradio</li>
                                    <li>Win 1st place in Sunnybrook’s academic poster competition</li>
                                </ul>
                                </div>
                                <div className='box-image'>
                                    <img src={sunnybrook} alt='Sunnybrook' className='rounded-rectangle' loading="lazy" decoding="async"></img>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="to-be-continued">
                        <span>.</span><span>.</span><span>.</span>
                        <span>T</span><span>o</span><span> </span>
                        <span>b</span><span>e</span><span> </span>
                        <span>C</span><span>o</span><span>n</span><span>t</span><span>i</span><span>n</span><span>u</span><span>e</span><span>d</span>
                        <span>.</span><span>.</span><span>.</span>
                    </div>
                </div>
                <div className='Education fade-in-section'>
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
                <div className='Skills'>
                    <h1 style={{textAlign: 'center'}}>Technical Skills</h1>
                    <div className='skills-grid'>
                        <div className='skill-category'>
                            <h3>Programming Languages</h3>
                            <div className='skill-tags'>
                                <span className='skill-tag'>Python</span>
                                <span className='skill-tag'>JavaScript</span>
                                <span className='skill-tag'>C++</span>
                                <span className='skill-tag'>R</span>
                                <span className='skill-tag'>MATLAB</span>
                                <span className='skill-tag'>SQL</span>
                            </div>
                        </div>
                        <div className='skill-category'>
                            <h3>Machine Learning & AI</h3>
                            <div className='skill-tags'>
                                <span className='skill-tag'>PyTorch</span>
                                <span className='skill-tag'>TensorFlow</span>
                                <span className='skill-tag'>OpenCV</span>
                                <span className='skill-tag'>Scikit-learn</span>
                                <span className='skill-tag'>OpenMME</span>
                                <span className='skill-tag'>Hugging Face</span>
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
                                <span className='skill-tag'>Docker</span>
                                <span className='skill-tag'>Kubernetes</span>
                                <span className='skill-tag'>Git</span>
                                <span className='skill-tag'>Linux</span>
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
                    </div>
                </div>
                <div className='Awards'>
                    <h1>Awards & Recognition</h1>
                    <div className='awards-list'>
                        <div className='award-item'>
                            <h3>President's Research Award</h3>
                            <h4>University of Waterloo</h4>
                            <h5>2022, 2023, 2024, 2025</h5>
                            <p>Consecutive recognition for outstanding undergraduate research contributions</p>
                        </div>
                        <div className='award-item'>
                            <h3>Dean's Honours List</h3>
                            <h4>University of Waterloo</h4>
                            <h5>Multiple Terms</h5>
                            <p>Recognition for academic excellence with term average ≥80%</p>
                        </div>
                        <div className='award-item'>
                            <h3>1st Place Academic Poster Competition</h3>
                            <h4>Sunnybrook Research Institute</h4>
                            <h5>2023</h5>
                            <p>Won first place for research on MRI segmentation for focused ultrasound surgery</p>
                        </div>
                        <div className='award-item'>
                            <h3>Silver Medal</h3>
                            <h4>Waterloo iGEM Team</h4>
                            <h5>2025</h5>
                            <p>International competition recognition for microbiome therapeutic solutions project</p>
                        </div>
                        <div className='award-item'>
                            <h3>Bronze Medal</h3>
                            <h4>Waterloo iGEM Team</h4>
                            <h5>2023</h5>
                            <p>International competition recognition for microbiome therapeutic solutions project</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <Footer />
        </div>
    )
};

export default Experience;