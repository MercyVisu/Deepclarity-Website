from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.schemas import ConsultationCreate, SuccessResponse, LeadResponse
from app.repositories.repository import LeadRepository
from app.services.auth_service import get_current_admin
from app.services.email_service import send_consultation_notification

router = APIRouter(prefix="/api", tags=["Consultation"])


@router.post("/free-consultation", response_model=SuccessResponse, status_code=status.HTTP_201_CREATED)
def submit_consultation(data: ConsultationCreate, db: Session = Depends(get_db)):
    repo = LeadRepository(db)
    lead = repo.create(data)

    # Send email notification to the business owner
    send_consultation_notification(
        name=data.name,
        phone=data.phone,
        email=data.email,
        user_type=data.user_type,
        interest_level=data.interest_level,
        current_class=data.current_class,
        query=data.query,
    )

    return SuccessResponse(
        message="Your free consultation request has been received! We will contact you within 24 hours.",
        id=lead.id,
    )


@router.get("/admin/leads", response_model=list[LeadResponse])
def get_leads(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    admin=Depends(get_current_admin),
):
    repo = LeadRepository(db)
    return repo.get_all(skip, limit)
