
# Project Specification: AI-Native Book on Physical AI & Humanoid Robotics

## 1. Overview

### 1.1. Project Title
Create a Book for Teaching Physical AI & Humanoid Robotics Course

### 1.2. Project Goal
To create a comprehensive, AI-native online Book for a course on Physical AI and Humanoid Robotics. The project includes a Docusaurus-based website with 14 chapters, an integrated RAG (Retrieval-Augmented Generation) chatbot for interactive learning, and several bonus features for an enhanced user experience.

### 1.3. Target Audience
- University students in robotics, AI, or computer science programs.
- Professional engineers and developers looking to upskill in robotics.
- Hobbyists and enthusiasts in the robotics community.

### 1.4. Key Technologies
- **Frontend (Book):** Docusaurus, React, MDX
- **Backend (RAG Chatbot):** FastAPI, Python
- **Vector Database:** Qdrant (free-tier cloud)
- **Relational Database:** Neon Postgres (serverless)
- **Authentication:** Better-Auth (custom implementation)
- **Deployment:** Vercel/Netlify for the frontend, and a cloud service like Heroku or Fly.io for the backend.

## 2. Core Features

### 2.1. Docusaurus Book
A 14-chapter interactive Book built with Docusaurus.

- **Chapter 1:** Introduction to Embodied Intelligence
- **Chapter 2:** Setting Up Your Development Environment
- **Chapter 3:** ROS 2 Fundamentals - Nodes and Topics
- **Chapter 4:** ROS 2 Intermediate - Services and Actions
- **Chapter 5:** Simulating Robots - URDF, Gazebo, and Unity
- **Chapter 6:** Advanced Simulation with NVIDIA Isaac Sim
- **Chapter 7:** Robot Navigation with Nav2
- **Chapter 8:** Perception and Vision - RealSense and VLA Models
- **Chapter 9:** Implementing a VLA Model for Object Recognition
- **Chapter 10:** Voice-to-Action with Whisper
- **Chapter 11:** Hardware Integration - Jetson Orin
- **Chapter 12:** Working with Real Robots - Unitree Humanoids
- **Chapter 13:** Capstone Project Part 1 - System Integration
- **Chapter 14:** Capstone Project Part 2 - Deployment and Demonstration

Each chapter will include:
- **Learning Objectives:** Clear goals for the reader.
- **Core Content:** Detailed explanations and theory.
- **Code Examples:** Snippets in Python/C++ with explanations.
- **Interactive Exercises:** Questions and small projects to reinforce learning.
- **Visual Aids:** Diagrams, images, and embedded videos.

### 2.2. RAG Chatbot
An AI-powered chatbot integrated into the Docusaurus site to answer student questions based on the Book's content.

- **Backend:** A FastAPI application will serve the chatbot API.
- **Vectorization:** Book content will be chunked, vectorized (using a sentence-transformer model), and stored in a Qdrant collection.
- **Retrieval:** When a user asks a question, the backend will query Qdrant to find the most relevant text chunks.
- **Generation:** The retrieved context and the user's question will be fed to a large language model (via an API) to generate a coherent answer.
- **Database:** A Neon Postgres database will store user conversations and feedback.

## 3. Bonus Features

### 3.1. Better-Auth Signup
A custom user authentication system.
- **Signup Form:** Will include standard fields (email, password) plus a field asking for the user's background (e.g., "Student," "Professional," "Hobbyist").
- **Personalization:** This background information will be used to tailor the learning experience.

### 3.2. Urdu Translation
A one-click button on each page to translate the content into Urdu. This will likely be implemented using a client-side JavaScript library to avoid API costs.

### 3.3. Chapter Personalization
A button within each chapter that allows users to adjust the content's difficulty based on their declared background.
- **Functionality:** Toggling this button will show/hide supplementary content blocks (e.g., "Deep Dive" sections for professionals or "Refresher" sections for beginners).

## 4. Project Structure
```
/
├── Book/
│   ├── docusaurus.config.js
│   ├── sidebars.js
│   ├── package.json
│   ├── docs/
│   │   ├── intro.mdx
│   │   ├── chapter1.mdx
│   │   └── ... (up to chapter14.mdx)
│   └── src/
│       ├── components/
│       │   ├── Chatbot.js           # The React component for the chatbot UI
│       │   ├── PersonalizationButton.js
│       │   └── UrduTranslateButton.js
│       ├── rag-backend/
│       │   ├── main.py              # FastAPI app
│       │   ├── database.py          # Neon Postgres connection
│       │   ├── qdrant_utils.py      # Qdrant client and functions
│       │   ├── models.py            # Pydantic models
│       │   └── ingest.py            # Script to process and upload docs
│       └── bonus-features/
│           └── auth/
│               └── better-auth.js   # Logic for the auth system
└── spec.md
```

## 5. Implementation Plan

1. **Scaffold Docusaurus Site:** Initialize a new Docusaurus project in the `Book/` directory.
2. **Generate Chapters:** Create the 14 MDX chapter files with placeholder content.
3. **Develop RAG Backend:**
    - Set up the FastAPI application.
    - Implement Qdrant and Postgres connections.
    - Create the `/chat` endpoint.
    - Write the `ingest.py` script.
4. **Integrate Chatbot:** Build the React `Chatbot.js` component and add it to the Docusaurus layout.
5. **Implement Bonus Features:**
    - Build the authentication components.
    - Add the Urdu translation and personalization buttons.
6. **Content Population:** Write the full content for all 14 chapters.
7. **Testing & Deployment:** Thoroughly test all features and deploy the application.
