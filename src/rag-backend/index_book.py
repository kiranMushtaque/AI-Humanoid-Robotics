import os
import glob
import uuid
from dotenv import find_dotenv, load_dotenv
from qdrant_client import QdrantClient, models
import google.generativeai as genai
from langchain_text_splitters import RecursiveCharacterTextSplitter

# --- Configuration ---
# Load .env file from the project root
dotenv_path = find_dotenv(filename='.env', raise_error_if_not_found=False)
if dotenv_path:
    load_dotenv(dotenv_path=dotenv_path)
else:
    print("Warning: .env file not found. Falling back to environment variables.")

QDRANT_URL = os.getenv("QDRANT_URL")
QDRANT_API_KEY = os.getenv("QDRANT_API_KEY")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

QDRANT_COLLECTION_NAME = "ai_book"
EMBEDDING_MODEL = "models/text-embedding-004"
VECTOR_SIZE = 768  # Gemini text-embedding-004 vector size
DOCS_PATH = os.path.join(os.path.dirname(__file__), "..", "..", "docs")


def get_all_docs():
    """Reads all .mdx files from the specified docs directory."""
    mdx_files = glob.glob(os.path.join(DOCS_PATH, "*.mdx"))
    docs = []
    for file_path in mdx_files:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
            docs.append({"path": os.path.basename(file_path), "content": content})
    print(f"Found {len(docs)} documents to index from '{os.path.abspath(DOCS_PATH)}'.")
    return docs

def get_text_chunks(docs):
    """Splits documents into smaller chunks."""
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000, chunk_overlap=100, length_function=len
    )
    chunks = []
    for doc in docs:
        split_texts = text_splitter.split_text(doc["content"])
        for i, text in enumerate(split_texts):
            chunks.append({
                "page_content": text,
                "metadata": {"source": doc["path"], "chunk_index": i}
            })
    print(f"Split documents into {len(chunks)} chunks.")
    return chunks

def get_embeddings_batch(texts, batch_size=100):
    """Generates embeddings for a batch of texts."""
    all_embeddings = []
    for i in range(0, len(texts), batch_size):
        batch_texts = texts[i:i+batch_size]
        try:
            result = genai.embed_content(
                model=EMBEDDING_MODEL, content=batch_texts, task_type="RETRIEVAL_DOCUMENT"
            )
            all_embeddings.extend(result["embedding"])
            print(f"Embedded batch {i//batch_size + 1}/{(len(texts) - 1)//batch_size + 1}")
        except Exception as e:
            print(f"Error embedding batch: {e}")
            all_embeddings.extend([None] * len(batch_texts))
    return all_embeddings

def main():
    """Main function to run the indexing process."""
    if not all([QDRANT_URL, QDRANT_API_KEY, GEMINI_API_KEY]):
        print("Error: Missing required environment variables (QDRANT_URL, QDRANT_API_KEY, GEMINI_API_KEY). Check your .env file.")
        return

    try:
        genai.configure(api_key=GEMINI_API_KEY)
        qdrant_client = QdrantClient(url=QDRANT_URL, api_key=QDRANT_API_KEY)
        print("Successfully initialized Gemini and Qdrant clients.")
    except Exception as e:
        print(f"Error initializing clients: {e}")
        return

    print(f"Recreating Qdrant collection: '{QDRANT_COLLECTION_NAME}'")
    qdrant_client.recreate_collection(
        collection_name=QDRANT_COLLECTION_NAME,
        vectors_config=models.VectorParams(size=VECTOR_SIZE, distance=models.Distance.COSINE),
    )
    print("Collection created successfully.")

    docs = get_all_docs()
    chunks = get_text_chunks(docs)
    chunk_contents = [chunk["page_content"] for chunk in chunks]
    embeddings = get_embeddings_batch(chunk_contents)
    
    valid_chunks_with_embeddings = [
        (chunks[i], emb) for i, emb in enumerate(embeddings) if emb is not None
    ]

    if not valid_chunks_with_embeddings:
        print("No embeddings were generated. Exiting.")
        return

    print(f"Upserting {len(valid_chunks_with_embeddings)} vectors into Qdrant...")
    qdrant_client.upsert(
        collection_name=QDRANT_COLLECTION_NAME,
        points=[
            models.PointStruct(
                id=str(uuid.uuid4()),
                vector=emb,
                payload={
                    "page_content": chunk["page_content"], 
                    "source": chunk["metadata"]["source"]
                },
            )
            for chunk, emb in valid_chunks_with_embeddings
        ],
        wait=True,
    )
    print("Successfully upserted documents into Qdrant.")

if __name__ == "__main__":
    main()