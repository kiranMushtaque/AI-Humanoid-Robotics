# AI & Humanoid Robotics – Interactive Textbook with Real RAG Chatbot

**Master Humanoid Robotics** – A complete AI-native online textbook with a real RAG-powered chatbot that answers from the actual book content.

**Live Demo** → https://ai-humanoid-robotics.vercel.app

![Book Preview](https://ai-humanoid-robotics.vercel.app/og.png)

## Features

- 14 in-depth chapters (from Embodied Intelligence to real Unitree humanoid deployment)  
- Real RAG Chatbot powered by **Qdrant + Gemini 1.5 Flash**  
- Highlight any text → “Ask AI” button appears → answers come directly from the book  
- One-click full Urdu translation toggle  
- Smart fallback answers when Gemini quota is exceeded  
- Clean, responsive Docusaurus design  
- Footer: **Created by Kiran Mushtaque**

## Tech Stack

| Layer       | Technology                          |
|------------|-------------------------------------|
| Frontend   | Docusaurus + React + MDX            |
| Backend    | FastAPI (Python)                    |
| Vector DB  | Qdrant Cloud                        |
| LLM        | Google Gemini 1.5 Flash             |
| Embedding  | Gemini text-embedding-004           |
| Deployment | Vercel                              |

## How to Run Locally

```bash
# Frontend
cd textbook
npm install
npm start

# Backend (new terminal)
cd textbook/src/rag-backend
pip install -r requirements.txt
python index_book.py        # Run once – indexes the book
uvicorn main:app --reload --port=8000
Project Structure
textbook/
├── docs/                  ← 14 MDX chapters
├── src/components/Chatbot.js     ← RAG chatbot UI
├── src/rag-backend/main.py       ← FastAPI + Qdrant + Gemini
└── README.md
Author
Kiran Mushtaque
Robotics & AI Enthusiast | Hackathon Participant
“Turn any page into a conversation – just highlight and ask.”

⭐ Star this repo if you like it!
Feel free to open issues or contribute.
Hackathon Submission – Fully Functional RAG-Powered Interactive Textbook
Live: https://ai-humanoid-robotics.vercel.app

