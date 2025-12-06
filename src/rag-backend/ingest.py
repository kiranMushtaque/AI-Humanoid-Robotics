
import os
from unstructured.partition.md import partition_md
from qdrant_utils import qdrant_manager

def ingest_markdown_files(directory: str):
    """
    Ingests all markdown files from a directory into Qdrant.
    """
    all_documents = []
    all_metadatas = []

    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith(".mdx") or file.endswith(".md"):
                file_path = os.path.join(root, file)
                print(f"Processing {file_path}...")
                
                # Use unstructured to partition the markdown file
                elements = partition_md(filename=file_path)
                
                # Convert elements to simple text chunks
                chunks = [str(el) for el in elements]
                
                for chunk in chunks:
                    all_documents.append(chunk)
                    all_metadatas.append({
                        "source": file,
                        "page_content": chunk
                    })

    print(f"Found {len(all_documents)} chunks to ingest.")

    if all_documents:
        # First, create the collection (this will reset it if it exists)
        print("Creating Qdrant collection...")
        qdrant_manager.create_collection()
        
        # Then, upsert the documents
        print("Upserting documents to Qdrant...")
        qdrant_manager.upsert_documents(documents=all_documents, metadatas=all_metadatas)
        print("Ingestion complete!")
    else:
        print("No documents found to ingest.")

if __name__ == '__main__':
    # This script will ingest the content from the `docs` directory
    # The path is relative to where the script is run from.
    # Assuming we run it from the `rag-backend` directory's parent (`src`).
    ingest_markdown_files("../../docs")
