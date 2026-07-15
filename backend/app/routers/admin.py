from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.schemas import AdminLogin, Token, AdminResponse
from app.repositories.repository import AdminRepository, AppointmentRepository, ContactRepository, LeadRepository
from app.services.auth_service import verify_password, create_access_token, get_current_admin

router = APIRouter(prefix="/api/admin", tags=["Admin"])


@router.post("/login", response_model=Token)
def admin_login(data: AdminLogin, db: Session = Depends(get_db)):
    repo = AdminRepository(db)
    admin = repo.get_by_email(data.email)
    if not admin or not verify_password(data.password, admin.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(data={"sub": admin.email})
    return Token(access_token=access_token)


@router.get("/me", response_model=AdminResponse)
def get_admin_profile(admin=Depends(get_current_admin)):
    return admin


@router.get("/dashboard/stats")
def get_dashboard_stats(db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    appointments_repo = AppointmentRepository(db)
    contacts_repo = ContactRepository(db)
    leads_repo = LeadRepository(db)

    return {
        "total_appointments": appointments_repo.count(),
        "total_contacts": contacts_repo.count(),
        "unread_contacts": contacts_repo.unread_count(),
        "total_leads": leads_repo.count(),
    }
