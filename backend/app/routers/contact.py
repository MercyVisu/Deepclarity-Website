from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.schemas import ContactCreate, SuccessResponse, ContactResponse
from app.repositories.repository import ContactRepository
from app.services.auth_service import get_current_admin
from app.services.email_service import send_contact_notification

router = APIRouter(prefix="/api", tags=["Contact"])


@router.post("/contact", response_model=SuccessResponse, status_code=status.HTTP_201_CREATED)
def submit_contact(data: ContactCreate, db: Session = Depends(get_db)):
    repo = ContactRepository(db)
    contact = repo.create(data)

    # Send email notification to the business owner
    send_contact_notification(
        name=data.name,
        phone=data.phone,
        email=data.email,
        user_type=data.user_type,
        message=data.message,
    )

    return SuccessResponse(message="Message received successfully. We will get back to you soon.", id=contact.id)


@router.get("/admin/contacts", response_model=list[ContactResponse])
def get_contacts(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    admin=Depends(get_current_admin),
):
    repo = ContactRepository(db)
    return repo.get_all(skip, limit)


@router.patch("/admin/contacts/{contact_id}/read", response_model=ContactResponse)
def mark_contact_read(
    contact_id: int,
    db: Session = Depends(get_db),
    admin=Depends(get_current_admin),
):
    repo = ContactRepository(db)
    contact = repo.mark_read(contact_id)
    if not contact:
        raise HTTPException(status_code=404, detail="Contact message not found")
    return contact
