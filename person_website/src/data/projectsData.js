import React from 'react';
import placeholder from '../assets/placeholder.jpeg';
import blood from '../assets/projects/blood.webp';
import emg from '../assets/projects/emg.webp';
import breast from '../assets/projects/breast.jpeg';
import brain from '../assets/projects/brain.avif';
import stable from '../assets/projects/stable.webp';
import doorlock from '../assets/projects/face.jpeg';
import pneumonia from '../assets/projects/lung.avif';
import protein from '../assets/projects/protein.webp';
import heart from '../assets/projects/heart.webp';
import row from '../assets/projects/row.webp';
import narwhale from '../assets/projects/narwhale.webp';
import ultrasound from '../assets/projects/ultrasound.webp';
import pose from '../assets/projects/facial.webp';
import loan from '../assets/projects/loan.png';
import nutri from '../assets/projects/nutricartdemo.webp';
import scribble from '../assets/projects/Scribble.webp';
import symphonic from '../assets/projects/symphonic.webp';
import inject from '../assets/projects/inject.webp';
import medi from '../assets/projects/medi.webp';
import arm from '../assets/projects/arm.webp';
import mindcraft from '../assets/projects/mindcraft.webp';
import discord from '../assets/projects/discord.png'

export const projectsData = [
    {
        title: "Custom EMG Detection Sleeve",
        image: emg,
        link: 'https://github.com/w12l3-c/EMG-Fabric',
        technologies: ["Python", "Pytorch", "Tensorflow", "Scipy", "OpenCV", "LightGBM", "RaspberryPi", "Arduino", "ESP32"],
        description: "Custom sleeve with EMG sensors for gesture detection using machine learning.",
        longDescription: (
            <>
                <p>
                    Custom design sleeve using conductive fabric and velcro to strap on reusable EMG sensors.
                    Also designed the real-time collection of EMG data, signal processing, and
                    gesture detection by machine learning models such as LightGBM and CNN.
                    It also wireless transmits the data between client and server ESP32s using BLE.
                </p>
            </>
        )
    },
    {
        title: "Breast Tumour Segmentation",
        image: breast,
        link: 'https://github.com/w12l3-c/Breast-Tumour-Segmentation',
        technologies: ["Python", "Pytorch", "Tensorflow", "Segment Anything", "Numpy", "Matplotlib", "Pandas"],
        description: "Segmenting breast cancer from ultrasound images with 92-98% dice score.",
        longDescription: (
            <>
                <p>
                    Segmentating Breast Cancer from Ulatrosound images using various model such as
                    U-Net, Segformer, Yolov8 + Segment Anything, and Mask R-CNN. Reaching 92-98% dice score.
                </p>
            </>
        )
    },
    {
        title: "Brain Tumour Classification & Segmentation",
        image: brain,
        link: 'https://github.com/w12l3-c/Brain-Tumour-Detection',
        technologies: ["Python", "Pytorch", "Tensorflow", "Numpy", "Matplotlib", "Pandas"],
        description: "Classifying and segmenting brain tumours from MRI images with 98% accuracy.",
        longDescription: (
            <>
                <p>
                    Classifying and segmentating brain tumours from MRI images using transfer learning with EfficientNet and U-Net respectively.
                    These two models achieve 98% accuracy and 96% dice score respectively.
                </p>
            </>
        )
    },
    {
        title: "Stable Diffusion GUI",
        image: stable,
        link: 'https://github.com/w12l3-c/Stable-Diffusion-Interface',
        technologies: ["Python", "Pytorch", "Tensorflow", "Huggingface", "CUDA"],
        description: "Custom interface for stable diffusion with LoRA and ControlNet support.",
        longDescription: (
            <>
                <p>
                    Implementing Stable Diffusion Inferface in Google Colab. 
                    The GUI allows interferncing of custom model and generate images using text2img and img2img.
                    It also supports LoRA, Dreambooth and ControlNet.
                    <br/><br/>
                    This is intially made for myself to generate pose or landscape reference images for my drawing hobby.
                </p>
            </>
        )
    },
    {
        title: "Face Recognition Doorlock",
        image: doorlock,
        link: 'https://github.com/w12l3-c/RaspberryPi-Face-and-Object-Detection-DoorLock',
        technologies: ["Python", "Pytorch", "Tensorflow", "RaspberryPi", "OpenCV", "SolidWorks"],
        description: "Smart doorlock using facial recognition with 3D printed case.",
        longDescription: (
            <>
                <p>
                    A smart doorlock that uses facial recognition to detect my family members and unlock the door.
                    It also uses object detection to detect if there is a package in front of the door or dangerous objects and send a notification to my phone.
                    I also 3D print the case to hold the servo, RaspberryPi, and camera.
                    <br/><br/>
                    This is achieve using Siamese Model and OpenCV for face recognition and Yolov7 for object detection.
                </p>
            </>
        )
    },
    {
        title: "Pneumonia Detection",
        image: pneumonia,
        link: 'https://github.com/w12l3-c/Pneumonia_Classification',
        technologies: ["Python", "Pytorch", "Scikit-learn", "Huggingface"],
        description: "Detects pneumonia from chest X-rays using ViT with 99% accuracy.",
        longDescription: (
            <>
                <p>
                    It detects pneumonia from chest xray using transfer learning with ViT, it also determine the probability between bacterial and viral pneumonia.
                    It achieves 99% accuracy.
                </p>
            </>
        )
    },
    {
        title: "Protein Binding Prediction",
        image: protein,
        link: 'https://github.com/w12l3-c/Drug-Binding-Protein-Prediction',
        technologies: ["Python", "Tensorflow", "Scikit-learn", "LightGBM", "XGBoost"],
        description: "Drug binding protein prediction with 93% weighted F1 score.",
        longDescription: (
            <>
                <p>
                    Investigate in drug binding protein prediction using DNN and gradient boosted trees with data supplied from alphaFold2.
                    The best model achieves a weighted f1 score of 93% and ROC(reciever operating characteristic score) AUC of 88%
                </p>
            </>
        )
    },
    {
        title: "Heart Disease Prediction Website",
        image: heart,
        link: 'https://github.com/w12l3-c/Heart-Disease-Machine-Learning',
        technologies: ["Python", "Tensorflow", "Streamlit"],
        description: "Website predicting heart disease probability with health recommendations.",
        longDescription: (
            <>
                <p>
                    This website allows users to input their daily habits and health factors and it will predict the probability of them having heart disease, 
                    it will also gives them suggestions on how to improve their health (aka lower the score).
                </p>
            </>
        )
    },
    {
        title: "Paraplegic Rowing Stabilizer",
        image: row,
        link: '',
        technologies: ["Engineering Analysis", "SolidWorks", "Machining and Woodwork"],
        description: "Device helping paraplegic rowers transfer safely in and out of sculls.",
        longDescription: (
            <>
                <p>
                    This device is designed to help paraplegic rowers to stablize their body and prevent them from falling off the scull when transferring themselves in and out.
                    It is designed as a clamp mechanism to prevent damage to the scull while allowing the paraplegic rower to easily perform this task safe and independent.
                    Meanwhile, it is also designed to be adjustable to fit different body types and different scull sizes.
                </p>
            </>
        )
    },
    {
        title: "Narwhale 3D puzzle",
        image: narwhale,
        link: '',
        technologies: ["SolidWorks", "3D slicing", "Creative Design"],
        description: "3D puzzle with moving mechanism activated by rotating the horn.",
        longDescription: (
            <>
                <p>
                    This is a 3D puzzle of a narwhale that can be assembled as a puzzle and it can move its tail by rotating the horn in front.
                    It is designed as a toy that has a moving mechanism and resembles one of Canada's motifs.
                </p>
            </>
        )
    },
    {
        title: "A mode & B mode Ultrasound",
        image: ultrasound,
        link: 'https://github.com/w12l3-c/Waterloo_BME121',
        technologies: ["C++", "OpenGL"],
        description: "Ultrasound image processing to locate and measure arteries.",
        longDescription: (
            <>
                <p>
                    A mode and B mode Ultrasound image processing using opengl and c++.
                    Processed real and imaginary signals from the ultrasound beamformer and find the arteries' location and size.
                </p>
            </>
        )
    },
    {
        title: "Body Posture Recognition",
        image: pose,
        link: 'https://github.com/w12l3-c/Computer-Vision-Projects',
        technologies: ["Python", "OpenCV", "Mediapipe", "Pytorch"],
        description: "Computer vision projects including virtual paint and gym pose corrector.",
        longDescription: (
            <>
                <p>
                    This projects includes Face, Face-Mesh, Pose, Motion, and Hand Gesture Recognition using OpenCV and Mediapipe.
                    Using these detectors, I made some miniprograms such as virtual paint, virtual mouse, virtual piano and gym pose corrector.
                </p>
            </>
        )
    },
    {
        title: "Loan Credit Score Prediction Website",
        image: loan,
        link: 'https://github.com/w12l3-c/ML-Django-Loan-Probabilistic-Website',
        technologies: ["Python", "Django-REST", "Scikit-learn", "Heroku", "Postgresql", "HTML/CSS/JS"],
        description: "Unbiased loan approval prediction with credit improvement suggestions.",
        longDescription: (
            <>
                <p>
                    This website is intend to help people who are appyling or planned to apply for mortgages or loans from bank.
                    It will predict the probability of them getting approved and give them suggestions on how to improve their credit score base on their financial history.
                    This is an unbiased prediction so it will not be affected by the users gender, gender preference, race, or age.
                </p>
            </>
        )
    },
    {
        title: "Malaria Classification",
        image: blood,
        link: 'https://github.com/w12l3-c/Malaria',
        technologies: ["Python", "Pytorch", "Numpy", "Matplotlib", "Pandas"],
        description: "Classifying malaria-infected RBCs using transfer learning with 93% accuracy.",
        longDescription: (
            <>
                <p>
                    Classifying between healthy RBCs and malaria infected RBCs using transfer learning with VGG-NET and ResNet.
                    It achieves 93% accuracy.
                </p>
            </>
        )
    },
    {
        title: "Nutricart",
        image: nutri,
        link: 'https://github.com/m-chenie/NutriCart2.0',
        technologies: ["React", "Typescript", "Selenium", "HTML/CSS/JS"],
        description: "Chrome extension for tracking calories and nutrition of groceries with goal setting.",
        longDescription: (
            <>
                <p>
                    NutriCart is a chrome extension that allows users to balance health and concenience by tracking 
                    calories and nutrition of their groceries. 
                    <br/><br/>
                    It also supports the user to set up goals for themselves and it will give them instant feedback on
                    the nutritional status of the shopping cart and suggest healthier alternatives.
                </p>
            </>
        )
    },
    {
        title: "ScribbleSync",
        image: scribble,
        link: 'https://github.com/w12l3-c/ScribbleSync',
        technologies: ["Flask", "GCP", "Cohere API", "CV", "OCR"],
        description: "Real-time collaborative whiteboard application with Google Calendar integration.",
        longDescription: (
            <>
                <p>
                    Developed a smart sticky note web application by using Flask and Google Cloud APIs to digitize handwriting notes and automatically create Google Calendar events.
                    Integrated Cohere APIs to fine-tune a text classification model and embedded a communication chatbot, enhancing the user experience
                </p>
            </>
        )
    },
    {
        title: "Symphonic",
        image: symphonic,
        link: 'https://github.com/w12l3-c/deltaHacks10',
        technologies: ["Flask", "MusicLM", "Pytorch", "Chatbot", "Cloudfare"],
        description: "React-based music discovery platform integrating multiple APIs.",
        longDescription: (
            <>
                <p>
                    Designed to assist teachers and small-budget businesses by enabling cost-free and minimal-effort editing of lecture and advertisement videos
                    Implemented MusicLM to generate custom, royalty-free music tailored to the video's surroundings and transcript, and deployed the solution using Flask
                </p>
            </>
        )
    },
    {
        title: "InjectPro",
        image: inject,
        link: '#',
        technologies: ["CAD", "Solidworks", "LTSpice", "Arduino", "EMG"],
        description: "EMG Controlled Injector that can apply vaccination in 4 different angles",
        longDescription: (
            <>
                <p>
                    Prototype with Solidworks and 3D printed, Machined Aluminum Parts to make the motion smoother.
                    Created EMG processing circuit with notch filter, second order bandpass filter, envelop detector, amplifier, full wave rectifier.
                    Coded in Arduino to make it control 3 different servos from 3 different DOF.
                </p>
            </>
        )
    },
    {
        title: "MediMentor",
        image: medi,
        link: 'https://github.com/w12l3-c/BME-Study-LLM',
        technologies: ["Python", "NLP", "Machine Learning", "RAG", "Langchain", "MCP"],
        description: "AI-powered assistant chatbot for BME study",
        longDescription: (
            <>
                <p>
                    Built a study assistant using open-source LLMs (Qwen, Mixtral, LLaMA) for biomedical coursework and literature review.
                    Implemented retrieval-augmented generation (RAG) using LangChain with vector databases (ChromaDB) to ground responses in course materials.
                    Developed agentic question-answering with reranking and prompt engineering to improve factual accuracy and reliability.
                    Designed an MCP-inspired tool interface enabling LLM access to external services (Google Drive, Google Calendar).
                    Provides reliable medical information for my academic study.
                </p>
            </>
        )
    },
    {
        title: "Discord Art Bot",
        image: discord,
        link: 'https://github.com/w12l3-c/daily-art-bot',
        technologies: ["Python", "Discord.py", "SQLite", "API Integration", "Async Programming"],
        description: "Multi-functional Discord bot that promotes art progression! User base ~100 people",
        longDescription: (
            <>
                <p>
                    Multi-functional Discord Gamification bot that promotes daily art progress, include duels and chaining to make custom gifs.
                    Track People's writing submission for lore and challenges. 
                    Includes automated server management, custom commands, and integration with various APIs 
                    for enhanced server functionality and user engagement.
                </p>
            </>
        )
    },
    {
        title: "5 DOF Robotic Arm",
        image: arm,
        link: '#',
        technologies: ["Arduino", "Servo Control", "Inverse Kinematics", "C++", "3D Modeling", "Trajectory Planning"],
        description: "Custom-built 5 degrees of freedom robotic arm with precise servo control.",
        longDescription: (
            <>
                <p>
                    Custom-built 5 degrees of freedom robotic arm with precise servo control and trajectory planning. 
                    Features inverse kinematics calculations, path optimization, and real-time control interface 
                    for pick-and-place operations and educational demonstrations.
                </p>
            </>
        )
    },
    {
        title: "MindCraft",
        image: mindcraft,
        link: 'https://github.com/yaxinw04/htn25',
        technologies: ["EEG", "EMG", "Pytorch", "PyQT5", "Controller"],
        description: "Mind Control and Muscle Control Minecraft",
        longDescription: (
            <>
                <p>
                    Using motor imagery modality with gTec Unicorn to control motion in Minecraft with a Convolution Attention-based ML model, achieving 82% accuracy 
                    Using an 8-channel EMG armband to control actions in Minecraft with a Convolution ML model, achieving 95% accuracy
                    Developed UI for collecting EEG and EMG data from user, requires 3-5 minutes of calibration for the EEG system due to environmental changes
                </p>
            </>
        )
    }
];
