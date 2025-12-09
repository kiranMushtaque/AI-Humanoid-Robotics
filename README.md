# ✨ AI & Humanoid Robotics Textbook: An Interactive RAG Experience ✨

Welcome to the **AI & Humanoid Robotics Textbook**, an cutting-edge interactive learning platform designed for the modern era. This project showcases a powerful integration of Docusaurus for content delivery, a sophisticated RAG (Retrieval-Augmented Generation) chatbot for dynamic Q&A, and a personalized learning experience, all wrapped in a sleek, professional interface.

## 🚀 Live Demo

[Explore the Live Demo on Vercel](https://ai-humanoid-robotics.vercel.app) (Placeholder Link)

## 🌟 Features

*   **Interactive Docusaurus Textbook**: Navigate through 14 comprehensive chapters covering everything from Embodied Intelligence to advanced ROS 2 concepts.
*   **Real-time RAG Chatbot**: Get instant answers to your questions directly from the textbook content, powered by **Qdrant** and **Google Gemini**.
*   **Contextual AI Interaction**: Highlight any text in the book, and an "Ask AI" button will appear, feeding your selection directly to the chatbot for highly contextualized responses.
*   **Personalized Learning Experience**: Tailor your content! Based on your declared background (Student, Professional, Hobbyist), specific sections within chapters adapt to provide "Refresher" or "Deep Dive" content.
*   **Chatbot Language Toggle**: Switch the chatbot's interface language between English and Urdu with a single click.
*   **Intelligent Fallback Answers**: Even if the AI model faces temporary issues or quota limits, the system provides helpful, context-aware fallback answers.
*   **Professional & Responsive Design**: A clean, modern UI built with Docusaurus, ensuring an optimal viewing experience on any device.
*   **Enhanced "Better-Auth" System**: A user-friendly signup/signin experience with a clean, professional modal, allowing you to personalize your journey. All user data for personalization is stored securely in your browser's `localStorage` for a seamless frontend experience.

## 🛠️ Tech Stack

| Layer                         | Technology                                  | Description                                                                                                                                              |
|:------------------------------|:--------------------------------------------|:---------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Frontend**                  | Docusaurus, React, MDX                      | The modern framework for content delivery and interactive UI.                                                                                              |
| **Backend (RAG Chatbot)**     | FastAPI (Python)                            | Powers the RAG chatbot, handling search queries and AI responses.                                                                                          |
| **Vector Database**           | Qdrant                                      | Stores high-dimensional vector embeddings of the textbook content for efficient retrieval.                                                                 |
| **Large Language Model (LLM)**| Google Gemini 1.5 Flash                     | Generates intelligent, context-aware answers for the RAG chatbot.                                                                                          |
| **Embedding Model**           | Google `text-embedding-004`                 | Transforms text into vector representations for semantic search in Qdrant.                                                                                 |
| **Frontend Auth/Pers.**       | `localStorage`                              | Client-side storage for user profiles and personalization settings, enabling a backend-less authentication for a hackathon context.                      |
| **Deployment**                | Vercel                                      | Hosts the live application for easy access and scalability.                                                                                                |
 
## 📦 Detailed Dependencies

This project leverages a variety of libraries and tools across its frontend and backend to deliver a rich and interactive experience.

### Frontend Dependencies (package.json)

-   `@docusaurus/core`: The core Docusaurus framework for building content-focused websites.
-   `@docusaurus/preset-classic`: The default Docusaurus preset, providing a classic theme, documentation features, and more.
-   `@easyops-cn/docusaurus-search-local`: A local search plugin for Docusaurus, enabling client-side search functionality.
-   `@mdx-js/react`: Allows the use of MDX (Markdown with JSX) in React components.
-   `clsx`: A tiny utility for constructing className strings conditionally.
-   `prism-react-renderer`: Provides theming for syntax highlighting in code blocks.
-   `react`: The JavaScript library for building user interfaces.
-   `react-dom`: Provides DOM-specific methods that can be used at the top level of a web app to manage React components.

### Backend Dependencies (requirements.txt)

-   `fastapi`: A modern, fast (high-performance) web framework for building APIs with Python 3.7+ based on standard Python type hints.
-   `uvicorn[standard]`: An ASGI server, used to run the FastAPI application.
-   `qdrant-client`: The official client library for interacting with the Qdrant vector database.
-   `google-generativeai`: Client library for Google's Generative AI models (e.g., Gemini) for text generation and embeddings.
-   `python-dotenv`: Reads key-value pairs from a .env file and sets them as environment variables.
-   `langchain-text-splitters`: Provides various strategies for splitting text into manageable chunks for processing (e.g., for RAG).
-   `unstructured[md]`: A library for parsing and extracting structured information from unstructured documents, including Markdown.
-   `SQLAlchemy`: The Python SQL toolkit and Object Relational Mapper that gives developers the full power of SQL.
-   `passlib[bcrypt]`: A comprehensive password hashing framework, used here for secure bcrypt password hashing.

---

## 🏗️ Architecture Overview

The project is structured into a Docusaurus frontend and a FastAPI Python backend for the RAG chatbot.

1.  **Frontend (Docusaurus + React)**:
    *   Serves the interactive textbook content (`.mdx` files).
    *   Manages user authentication and personalization settings via `localStorage`.
    *   Hosts the Chatbot UI, which communicates with the FastAPI backend.
    *   Dynamically displays personalized content using the `ConditionalContent` component based on user background.

2.  **Backend (FastAPI)**:
    *   Exposes a `/search` API endpoint for the RAG chatbot.
    *   Receives user queries and highlighted text from the frontend.
    *   Generates embeddings using the Google `text-embedding-004` model.
    *   Queries **Qdrant** to retrieve relevant document chunks from the indexed textbook content.
    *   Feeds the retrieved context and user query to the **Google Gemini 1.5 Flash** LLM to generate a concise answer.

3.  **Content Ingestion**:
    *   A Python script (`ingest.py`) processes the entire textbook content, chunks it, generates embeddings, and uploads them to the Qdrant vector database. This is a one-time setup step.

## 🚀 Getting Started (Local Development)

### Prerequisites

Ensure you have the following installed:

*   **Node.js** (v18 or higher)
*   **Python** (v3.9 or higher)
*   **Qdrant Instance**: Access to a Qdrant instance (cloud or local).
*   **Google Gemini API Key**: Obtain one from [Google AI Studio](https://aistudio.google.com/).

### 1. Clone the Repository

```bash
git clone https://github.com/KiranMushtaque/ai-humanoid-robotics.git
cd ai-humanoid-robotics/textbook
```

### 2. Frontend Setup

Navigate to the `textbook` directory and install JavaScript dependencies:

```bash
npm install
```

### 3. Backend Setup

Navigate to the `src/rag-backend` directory to set up the Python backend:

```bash
cd src/rag-backend
```

#### a. Create & Activate Python Virtual Environment

```bash
python -m venv venv
# On macOS/Linux:
source venv/bin/activate
# On Windows:
.\venv\Scripts\activate
```

#### b. Install Python Dependencies

```bash
pip install -r requirements.txt
```

#### c. Configure Environment Variables

Create a file named `.env` in the `src/rag-backend` directory and add your API keys and Qdrant details:

```env
# .env in src/rag-backend
QDRANT_URL="YOUR_QDRANT_CLOUD_URL_OR_LOCAL_HOST"
QDRANT_API_KEY="YOUR_QDRANT_API_KEY"
GEMINI_API_KEY="YOUR_GOOGLE_GEMINI_API_KEY"
```

### 4. Ingest Textbook Content into Qdrant

This step builds the knowledge base for your RAG chatbot. Run it **once** or whenever you update the textbook content.

From the `src/rag-backend` directory:

```bash
python ingest.py
```

### 5. Run the Application

#### a. Start the Backend Server

From the `src/rag-backend` directory, start the FastAPI server:

```bash
uvicorn main:app --reload --port 8000
```

#### b. Start the Frontend Development Server

In a **new terminal**, navigate back to the root `textbook` directory and start the Docusaurus server:

```bash
npm start
```

Your interactive textbook will be available at `http://localhost:3000`.

---

## 🔍 Troubleshooting: Search Bar

The search bar functionality depends on an index file that is **only created during the production build process**.

*   **If you are using `npm start` (development mode), the search bar will not return any results.** This is expected behavior for the local search plugin.
*   **To fully test the search functionality**, you must first build the site and then serve it locally:
    ```bash
    # 1. Build the site (creates the search index)
    npm run build

    # 2. Serve the built site
    npm run serve
    ```
    After running these commands, open your browser to `http://localhost:3000`. The search bar will then be fully functional.

---

## 🙏 Credits

Created with passion by **Kiran Mushtaque**.

⭐ Star this repository if you found it impressive! Feel free to open issues or contribute.