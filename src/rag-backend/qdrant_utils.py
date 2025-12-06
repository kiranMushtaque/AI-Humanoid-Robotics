
import qdrant_client
import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

QDRANT_URL = os.getenv("QDRANT_URL")
QDRANT_API_KEY = os.getenv("QDRANT_API_KEY")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY") # Add this line to access GEMINI_API_KEY
COLLECTION_NAME = "ai_book" # Changed collection name to 'ai_book'

genai.configure(api_key=GEMINI_API_KEY) # Configure genai here

class QdrantManager:
    def __init__(self):
        self.client = qdrant_client.QdrantClient(
            url=QDRANT_URL, 
            api_key=QDRANT_API_KEY,
        )
        self.embedding_model = "models/text-embedding-004"
        self.collection_name = COLLECTION_NAME

    def _get_embedding_vector(self, text: str):
        response = genai.embed_content(
            model=self.embedding_model,
            content=text,
            task_type="RETRIEVAL_DOCUMENT" # or RETRIEVAL_QUERY depending on usage
        )
        return response['embedding']

    def create_collection(self):
        # The embedding size for models/text-embedding-004 is 768
        self.client.recreate_collection(
            collection_name=self.collection_name,
            vectors_config=qdrant_client.http.models.VectorParams(
                size=768, # Correct size for models/text-embedding-004
                distance=qdrant_client.http.models.Distance.COSINE
            )
        )

    def upsert_documents(self, documents, metadatas):
        self.client.upsert(
            collection_name=self.collection_name,
            points=qdrant_client.http.models.Batch(
                ids=None, # Auto-generate IDs
                vectors=[self._get_embedding_vector(doc) for doc in documents],
                payloads=metadatas
            )
        )

    def search(self, query: str, limit: int = 5):
        vector = self._get_embedding_vector(query)
        hits = self.client.search(
            collection_name=self.collection_name,
            query_vector=vector,
            limit=limit,
            with_payload=True
        )
        return hits

qdrant_manager = QdrantManager()
