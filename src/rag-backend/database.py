
import psycopg2
import os
from dotenv import load_dotenv

load_dotenv()

NEON_DATABASE_URL = os.getenv("NEON_DATABASE_URL")

def get_db_connection():
    conn = psycopg2.connect(NEON_DATABASE_URL)
    return conn

def store_conversation(user_id: str, query: str, answer: str):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO conversations (user_id, query, answer) VALUES (%s, %s, %s)",
        (user_id, query, answer)
    )
    conn.commit()
    cur.close()
    conn.close()

def create_conversations_table():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("""
        CREATE TABLE IF NOT EXISTS conversations (
            id SERIAL PRIMARY KEY,
            user_id VARCHAR(255) NOT NULL,
            query TEXT NOT NULL,
            answer TEXT NOT NULL,
            timestamp TIMESTAMPTZ DEFAULT NOW()
        );
    """)
    conn.commit()
    cur.close()
    conn.close()

if __name__ == '__main__':
    # This can be run once to initialize the table
    create_conversations_table()
    print("'conversations' table created or already exists.")
