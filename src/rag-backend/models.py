from pydantic import BaseModel, EmailStr
from typing import List

class ChatRequest(BaseModel):
    query: str
    user_id: str

class ChatResponse(BaseModel):
    answer: str
    sources: List[str]

class IngestRequest(BaseModel):
    directory: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    background: str