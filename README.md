# TalentLens AI

An AI-powered Resume Analysis and Resume Generation platform  with interview preparation features ,built using the MERN stack and Google's Gemini API. TalentLens AI helps job seekers evaluate their resumes against specific job descriptions, identify skill gaps, receive AI-generated improvement suggestions, generate interview questions, and create ATS-optimized resumes in downloadable PDF format.

## Live Demo

**Frontend:** https://talentlens-ai-sigma.vercel.app

**Backend API:** https://talentlens-ai-backend.onrender.com

## Overview

TalentLens AI streamlines the resume improvement process by leveraging Generative AI to provide actionable insights tailored to a target job description. The platform analyzes uploaded resumes, calculates ATS compatibility, identifies missing skills, generates personalized interview questions, and creates an optimized resume suitable for Applicant Tracking Systems (ATS).

The application follows a modern full-stack architecture with a React frontend, Express backend, MongoDB database, secure JWT authentication, and AI-powered content generation using Google's Gemini API.

## Features

- AI-powered Resume Analysis
- ATS Match Score Generation
- Skill Gap Identification
- AI Resume Improvement Suggestions
- Personalized Interview Question Generation
- AI Resume Generator
- Downloadable ATS-Friendly PDF Resume
- Secure JWT Authentication
- Protected Routes
- Profile Management
- Resume Analysis History
- Responsive User Interface
- Modern Dashboard with Interactive Analytics

## Technology Stack

### Frontend

- React.js
- Vite
- Redux Toolkit
- React Router
- Tailwind CSS
- DaisyUI
- Framer Motion
- GSAP
- Axios

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Cookie Parser
- Multer
- Cloudinary

### Artificial Intelligence

- Google Gemini API

### PDF Generation

- Puppeteer

### Deployment

- Vercel
- Render

## Project Architecture

TalentLens-AI
│
├── frontend
│   ├── React
│   ├── Redux Toolkit
│   ├── Tailwind CSS
│   ├── GSAP
│   └── Framer Motion
│
├── backend
│   ├── Express
│   ├── MongoDB
│   ├── JWT Authentication
│   ├── Gemini API
│   └── Puppeteer
│
└── Database
    └── MongoDB Atlas

## Core Functionalities

### Resume Analysis

- Upload PDF resume
- Compare with target job description
- Generate ATS compatibility score
- Detect missing technical skills
- Receive AI-generated resume improvements

### Interview Preparation

- AI-generated interview questions
- Technical and behavioral questions
- Personalized suggestions based on uploaded resume

### Resume Generation

- AI rewrites resume
- ATS-optimized formatting
- Professional HTML generation
- PDF export using Puppeteer

### Authentication

- User Registration
- Secure Login
- JWT Authentication
- HTTP-only Cookies
- Token Blacklisting
- Protected Dashboard

---

## Installation

### Clone Repository

bash
git clone https://github.com/Priyanshu082004/talentlens-ai.git


### Backend

bash
cd backend
npm install
npm run dev


### Frontend

bash
cd frontend
npm install
npm run dev


## Environment Variables

### Backend

Create a `.env` file inside the backend directory.

env
PORT=

MONGODB_URI=

ACCESS_TOKEN_SECRET=

REFRESH_TOKEN_SECRET=

GOOGLE_GENAI_API_KEY=

CLIENT_URL=

### Frontend

Create a `.env` file inside the frontend directory.

env
VITE_API_URL=

## Deployment

### Frontend

Hosted on Vercel

### Backend

Hosted on Render

### Database

MongoDB Atlas


## Security Features

- HTTP-only Cookies
- JWT Authentication
- Password Hashing using bcrypt
- Route Protection
- Token Blacklisting
- Secure Cross-Origin Authentication
- Environment Variable Management
- CORS Configuration

## Future Enhancements

- Multiple Resume Templates
- Resume Version Management
- AI Cover Letter Generator
- Resume Keyword Optimization
- Company-Specific Interview Preparation
- User Analytics Dashboard
- Email Notifications
- Admin Dashboard

## Author

**Priyanshu Sharma**

GitHub: https://github.com/Priyanshu082004

LinkedIn:linkedin.com/in/priyanshu-sharma-578bb9259

## License

This project is developed for educational and portfolio purposes.
