from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import get_settings
from app.database import engine, Base
from app.models.models import Admin
from app.repositories.repository import AdminRepository
from app.services.auth_service import hash_password
from app.routers import contact, appointment, consultation, chat, content, admin

settings = get_settings()

app = FastAPI(
    title="DeepClariti API",
    description="Backend API for DeepClariti - Career Coaching Platform",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins.split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(contact.router)
app.include_router(appointment.router)
app.include_router(consultation.router)
app.include_router(chat.router)
app.include_router(content.router)
app.include_router(admin.router)


@app.on_event("startup")
def on_startup():
    Base.metadata.create_all(bind=engine)
    # Add interest_level column to existing tables if missing
    from sqlalchemy import inspect, text
    inspector = inspect(engine)
    with engine.begin() as conn:
        if "appointments" in inspector.get_table_names():
            columns = [c["name"] for c in inspector.get_columns("appointments")]
            if "interest_level" not in columns:
                conn.execute(text("ALTER TABLE appointments ADD COLUMN interest_level VARCHAR(100)"))
        if "leads" in inspector.get_table_names():
            columns = [c["name"] for c in inspector.get_columns("leads")]
            if "interest_level" not in columns:
                conn.execute(text("ALTER TABLE leads ADD COLUMN interest_level VARCHAR(100)"))
    # Create default admin if not exists
    from app.database import SessionLocal
    db = SessionLocal()
    try:
        repo = AdminRepository(db)
        try:
            existing = repo.get_by_email(settings.admin_email)
            if not existing:
                repo.create(
                    email=settings.admin_email,
                    hashed_password=hash_password(settings.admin_password),
                    name="Admin",
                )
        except Exception as e:
            print(f"Warning: Could not check/create admin user: {e}")
    finally:
        db.close()


@app.get("/")
def root():
    return {"message": "DeepClariti API", "version": "1.0.0", "docs": "/docs"}


@app.get("/health")
def health_check():
    return {"status": "healthy"}
