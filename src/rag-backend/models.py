
from pydantic import BaseModel
from typing import List

class ChatRequest(BaseModel):
    query: str
    user_id: str

class ChatResponse(BaseModel):
    answer: str
    sources: List[str]

class IngestRequest(BaseModel):
    directory: str
