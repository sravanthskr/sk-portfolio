

# Sravanth Kumar's Portfolio

This portfolio was built as part of DevOne Hack 2025

> A modern, professional developer portfolio designed for the DevOne Hack 2025.

## Live Demo

* **Portfolio:** [https://sravanth-kumar.vercel.app](https://sravanth-kumar.vercel.app)
* **Admin Panel:** [https://sravanth-kumar.vercel.app/admin.html](https://sravanth-kumar.vercel.app/admin.html)

---

## Table of Contents

* [Overview](#overview)
* [Key Features](#key-features)
* [Technology Stack](#technology-stack)
* [Project Structure](#project-structure)
* [Design Approach](#design-approach)
* [Development Phases](#development-phases)
* [Setup & Installation](#setup--installation)
* [Deployment](#deployment)
* [Screenshots](#screenshots)
* [Hackathon Info](#hackathon-info)

---

## Overview

This is a **premium developer portfolio** built to showcase modern web development skills. It’s a single-page application with smooth transitions, glassmorphic design elements, and a full-featured admin interface for easy content management.

The project demonstrates practical skills in React, TypeScript, CSS animations, Firebase integration, and production-ready deployment. It’s designed to be both visually appealing and technically impressive.

---

## Key Features

### **Portfolio Highlights**

* Single-page layout with smooth section transitions
* Fully responsive on all devices
* Light/dark theme toggle with smooth animations
* Keyboard navigation shortcuts for quick access (1–7)
* Professional sections: Hero, About, Skills, Projects, Experience, Certifications, Contact

### **Advanced Functionality**

* Real-time content management through admin panel
* Firebase integration for secure data storage and instant updates
* Contact form submissions via Web3Forms
* Glassmorphic UI elements for a modern look
* Subtle animations with Framer Motion
* Custom 404 page with professional messaging

### **Technical Excellence**

* Full TypeScript support for type safety
* Component-based architecture for clean, reusable code
* Optimized for performance and fast loading
* SEO-friendly with proper meta tags and semantic HTML
* Accessibility-compliant following WCAG guidelines

---

## Technology Stack

### **Frontend**

* **React 18** – Modern functional components with hooks
* **TypeScript** – Type-safe development
* **Vite** – Fast development and build tool

### **Styling & UI**

* **Tailwind CSS** – Custom design system with utility-first styling

### **Backend & Database**

* **Firebase Firestore** – Real-time NoSQL database
* **Firebase Authentication** – Secure admin access
* **Express.js** – Lightweight backend server

### **Forms & Validation**

* **React Hook Form** – Efficient form handling
* **Zod** – Type-safe schema validation
* **Web3Forms** – Email submissions for contact form


### **Deployment**

* **Vercel** – CI/CD and hosting
* **GitHub** – Version control

---

## Project Structure

### **Frontend**

```
sk-portfolio/
    ├── client
    │   ├── admin.html
    │   ├── index.html
    │   ├── public
    │   └── src
    ├── components.json
    ├── dist
    │   └── public
    ├── package-lock.json
    ├── package.json
    ├── postcss.config.js
    ├── server
    │   ├── index.ts
    │   ├── routes.ts
    │   ├── storage.ts
    │   └── vite.ts
    ├── shared
    │   └── contentSchema.ts
    ├── tailwind.config.ts
    ├── tsconfig.json
    ├── vercel.json
    └── vite.config.ts
```

### **State Management**

* React Context for global state (theme, etc.)
* Local component state for UI interactions
* Firebase real-time listeners for live updates

---

## Design Approach

The design focuses on premium minimalism, readability, and subtle sophistication:

### **Color Palette**

* **Light Theme:** Off-white background with charcoal text
* **Dark Theme:** Deep navy background with muted cyan accents
* **Accent Colors:** Soft purple (light) and neon cyan (dark)

---

## Development Phases

### **Phase 1: Setup**

* Vite + React + TypeScript project initialized
* Tailwind CSS configured

### **Phase 2: UI Development**

* Responsive navigation and glassmorphic layout
* Hero, About, Skills, Projects, Experience, Certifications, Contact sections
* Dark/light theme toggle implemented
* Custom 404 page

### **Phase 3: Animations**

* Page transitions using Framer Motion
* Micro-interactions for hover states and section elements
* Mobile-responsive touch interactions

### **Phase 4: Backend Integration**

* Firebase Firestore for real-time data
* Authentication for admin access
* Web3Forms contact integration

### **Phase 5: Admin Panel**

* `/admin.html` for live editing and previews
* Form validation, error handling, and Firebase storage
* Consistent design with main site

### **Phase 6: Deployment**

* Vercel deployment with multi-page build setup
* Environment variables configured for Firebase and Web3Forms
* Performance optimization and caching

---

## Setup & Installation

### **Prerequisites**

* Node.js 18+
* Git
* Firebase account (for backend)
* Web3Forms account (for contact form)

### **Local Development**

```bash
# Clone repo
git clone https://github.com/sravanthskr/sk-portfolio
cd sk-porfolio

# Install dependencies
npm install

# Set environment variables
cp .env.example .env.local
# Add Firebase & Web3Forms keys

# Start development server
npm run dev

# Open http://localhost:5000
```

### **Environment Variables**

Create `.env.local`:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_WEB3FORMS_ACCESS_KEY=your_web3forms_key
```

### **Build for Production**

```bash
npm run build
```

---

## Deployment

### **Vercel**

1. Connect GitHub repo
2. Set build command: `npm run build`
3. Set output directory: `dist/public`
4. Add environment variables
5. Deploy and verify routes (`/` and `/admin.html`)

### **Other Options**

* Netlify
* GitHub Pages
* Firebase Hosting

---

## Screenshots

# Light Theme
<img width="1912" height="904" alt="image" src="https://github.com/user-attachments/assets/3cf1111e-3efc-46f6-aa8f-1a154229a3bb" />

# Dark Theme

<img width="1910" height="872" alt="image" src="https://github.com/user-attachments/assets/545a0d98-5143-4eda-939a-f09da08c98be" />

<img width="1906" height="903" alt="image" src="https://github.com/user-attachments/assets/99619101-8cdc-40ba-b5cc-2a14fadb3a07" />

# Mobile View

<img width="462" height="933" alt="image" src="https://github.com/user-attachments/assets/c533f25e-c9ff-4f06-ad43-240719b38c48" />

# Admin Dashboard

<img width="1894" height="943" alt="image" src="https://github.com/user-attachments/assets/919bcc11-e586-45fb-abca-0100a36796ea" />


---

## Hackathon Info

### **DevOne Hack 2025**

* Event: "Build Your Developer Portfolio"

### **Why This Portfolio Stands Out**

* Modern, production-ready with React + TypeScript
* Elegant, sophisticated design
* Fully functional with admin interface
* Real-time updates and smooth animations
* Professional presentation with live URL and GitHub repo

---

**Built for DevOne Hack 2025 | By Sravanth Kumar**
