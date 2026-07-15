from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.schemas import ChatMessage, ChatResponse
from app.services.chat_service import ChatService

router = APIRouter(prefix="/api", tags=["Chat"])


@router.post("/chat", response_model=ChatResponse)
def chat(data: ChatMessage, db: Session = Depends(get_db)):
    service = ChatService(db)
    response = service.process_message(data)
    return ChatResponse(response=response, session_id=data.session_id)
