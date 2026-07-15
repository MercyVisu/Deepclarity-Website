from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.schemas import AppointmentCreate, SuccessResponse, AppointmentResponse
from app.repositories.repository import AppointmentRepository
from app.services.auth_service import get_current_admin
from app.services.email_service import send_booking_notification

router = APIRouter(prefix="/api", tags=["Appointments"])


@router.post("/book-session", response_model=SuccessResponse, status_code=status.HTTP_201_CREATED)
def book_session(data: AppointmentCreate, db: Session = Depends(get_db)):
    repo = AppointmentRepository(db)
    appointment = repo.create(data)

    # Send email notification to the business owner
    send_booking_notification(
        name=data.name,
        phone=data.phone,
        email=data.email,
        user_type=data.user_type,
        interest_level=data.interest_level,
        preferred_date=data.preferred_date,
        preferred_time=data.preferred_time,
        message=data.message,
    )

    return SuccessResponse(
        message="Session booked successfully! We will confirm your appointment shortly.",
        id=appointment.id,
    )


@router.get("/admin/appointments", response_model=list[AppointmentResponse])
def get_appointments(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    admin=Depends(get_current_admin),
):
    repo = AppointmentRepository(db)
    return repo.get_all(skip, limit)


@router.patch("/admin/appointments/{appointment_id}/status")
def update_appointment_status(
    appointment_id: int,
    status_value: str,
    db: Session = Depends(get_db),
    admin=Depends(get_current_admin),
):
    repo = AppointmentRepository(db)
    appointment = repo.update_status(appointment_id, status_value)
    if not appointment:
        raise HTTPException(status_code=404, detail="Appointment not found")
    return {"message": "Status updated", "status": appointment.status}
