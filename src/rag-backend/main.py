import os
import logging
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from qdrant_client import QdrantClient
import google.generativeai as genai
from google.generativeai.types import HarmCategory, HarmBlockThreshold
from dotenv import load_dotenv

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# Load .env
load_dotenv()

# --- Configuration ---
QDRANT_URL = os.getenv("QDRANT_URL")
QDRANT_API_KEY = os.getenv("QDRANT_API_KEY")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
QDRANT_COLLECTION_NAME = "ai_book"
EMBEDDING_MODEL = "models/text-embedding-004"
GENERATIVE_MODEL = "gemini-1.5-flash-latest"

# Validate environment variables
if not all([QDRANT_URL, QDRANT_API_KEY, GEMINI_API_KEY]):
    logger.error("Missing one or more required environment variables (QDRANT_URL, QDRANT_API_KEY, GEMINI_API_KEY).")
    raise ConnectionError("Missing required environment variables. Please check your .env file.")

# --- Initialize Clients ---
try:
    qdrant_client = QdrantClient(url=QDRANT_URL, api_key=QDRANT_API_KEY)
    genai.configure(api_key=GEMINI_API_KEY)
    logger.info("Successfully connected to Qdrant and configured Gemini.")
except Exception as e:
    logger.error(f"Failed to initialize clients: {e}")
    raise

# --- FastAPI App ---
app = FastAPI(
    title="AI & Humanoid Robotics Textbook RAG Backend",
    description="A RAG backend using Qdrant and Gemini for the AI textbook.",
    version="1.0.0"
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Pydantic Models ---
class SearchQuery(BaseModel):
    query: str
    selected_text: str | None = None

# --- Fallback Answer Generation ---
def generate_fallback_answer(context: str, query: str) -> str:
    """Generates a simple, context-based answer if Gemini fails."""
    logger.warning("Falling back to context-based answer generation.")
    if "No relevant context" in context:
        return f"I couldn't find specific information for your query '{query}' in the book. The book covers topics like Embodied Intelligence, ROS 2, Navigation, and Humanoid Robot Design. Please try a more specific question."
    else:
        return f"Based on the retrieved context, here is some information related to your query '{query}':\n\n{context[:1000]}...\n\nI am currently having trouble connecting to the advanced AI model. This information is based on keyword search."

# --- Core RAG Functions ---
def get_embedding(text: str) -> list[float]:
    """Generates embedding for a given text using Gemini, with a fallback to a dummy vector."""
    try:
        result = genai.embed_content(model=EMBEDDING_MODEL, content=text, task_type="RETRIEVAL_QUERY")
        logger.info("Successfully generated embedding using Gemini.")
        return result["embedding"]
    except Exception as e:
        logger.error(f"Failed to generate embedding: {e}. Falling back to dummy embedding.")
        # Return a dummy vector of the correct dimension (768 for text-embedding-004)
        return [0.0] * 768

def generate_gemini_answer(context: str, query: str, selected_text: str | None) -> str:
    """Generates an answer using Gemini based on context and a query."""
    prompt = f"""
You are an expert assistant for the \"AI & Humanoid Robotics\" textbook. Your tone should be helpful, technical, and clear.
Based *only* on the provided context, answer the user's query. If the context is not sufficient, state that you cannot answer from the given information.

---\nCONTEXT FROM THE BOOK:
{context}
---
USER'S HIGHLIGHTED TEXT (if any):
{selected_text or "None"}
---
USER'S QUERY:
\"{query}\"\n---

Provide a concise, beginner-friendly answer in the same language as the query.
"""
    logger.info("Attempting to generate answer with Gemini.")
    try:
        model = genai.GenerativeModel(GENERATIVE_MODEL)
        response = model.generate_content(
            prompt,
            safety_settings={
                HarmCategory.HARM_CATEGORY_HATE_SPEECH: HarmBlockThreshold.BLOCK_NONE,
                HarmCategory.HARM_CATEGORY_HARASSMENT: HarmBlockThreshold.BLOCK_NONE,
                HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT: HarmBlockThreshold.BLOCK_NONE,
                HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT: HarmBlockThreshold.BLOCK_NONE,
            }
        )
        if response.prompt_feedback.block_reason:
            logger.error(f"Prompt was blocked by Gemini: {response.prompt_feedback.block_reason}")
            return generate_fallback_answer(context, query)
        
        logger.info("Successfully generated answer with Gemini.")
        return response.text
    except Exception as e:
        logger.error(f"Gemini generation failed: {e}", exc_info=True)
        return generate_fallback_answer(context, query)

# --- API Endpoints ---
@app.post("/search")
async def search(search_query: SearchQuery):
    """
    Performs a RAG search: embeds query, searches Qdrant, and generates a final answer with Gemini.
    """
    logger.info(f"Received search query: '{search_query.query}'")
    if not search_query.query or not search_query.query.strip():
        raise HTTPException(status_code=400, detail="Query cannot be empty.")

    # 1. Generate embedding for the query
    search_text = f"{search_query.query} {search_query.selected_text or ''}".strip()
    logger.info(f"Generating embedding for text: '{search_text}'")
    query_embedding = get_embedding(search_text)

    # 2. Search Qdrant using query_points to bypass the fastembed mixin
    try:
        # Using the recommended query_points method with a vector
        query_result = qdrant_client.query_points(
            collection_name=QDRANT_COLLECTION_NAME,
            query=query_embedding, # Changed from query_vector to query
            limit=5,
            with_payload=True,
        )
        # Access the .points attribute from the result
        search_result = query_result.points
        logger.info(f"Found {len(search_result)} results from Qdrant.")
    except Exception as e:
        logger.error(f"Qdrant query_points failed: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail="Failed to search for context in database.")

    # 3. Construct context from the search results
    context_parts = []
    if search_query.selected_text:
        context_parts.append(f"User highlighted text: {search_query.selected_text}")

    retrieved_chunks = [hit.payload.get("page_content", "") for hit in search_result if hit.payload]
    retrieved_chunks = [chunk for chunk in retrieved_chunks if chunk]

    if retrieved_chunks:
        context_parts.append("Relevant content from the book:\n" + "\n\n".join(retrieved_chunks))
    
    final_context = "\n---\n".join(context_parts) if context_parts else "No relevant context was found in the textbook."
    logger.info(f"Final context for generation:\n{final_context[:500]}...")

    # 4. Generate final answer with Gemini
    answer = generate_gemini_answer(final_context, search_query.query, search_query.selected_text)
    
    logger.info("Answer generation complete.")
    return {"answer": answer}

@app.get("/")
def read_root():
    return {"message": "RAG Backend is running."}
