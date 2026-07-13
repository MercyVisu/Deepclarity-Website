from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime


# ─── Contact ───────────────────────────────────────────────────────────────────

class ContactCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=255)
    phone: str = Field(..., min_length=7, max_length=20)
    email: EmailStr
    user_type: str = Field(..., pattern="^(student|parent)$")
    message: str = Field(..., min_length=10)


class ContactResponse(BaseModel):
    id: int
    name: str
    phone: str
    email: str
    user_type: str
    message: str
    is_read: bool
    created_at: datetime

    class Config:
        from_attributes = True


# ─── Appointment (Book Session) ────────────────────────────────────────────────

class AppointmentCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=255)
    phone: str = Field(..., min_length=7, max_length=20)
    email: EmailStr
    user_type: str = Field(..., pattern="^(student|parent)$")
    preferred_date: str = Field(..., min_length=1)
    preferred_time: str = Field(..., min_length=1)
    message: Optional[str] = None


class AppointmentResponse(BaseModel):
    id: int
    name: str
    phone: str
    email: str
    user_type: str
    preferred_date: str
    preferred_time: str
    message: Optional[str]
    status: str
    created_at: datetime

    class Config:
        from_attributes = True


# ─── Free Consultation (Lead) ──────────────────────────────────────────────────

class ConsultationCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=255)
    phone: str = Field(..., min_length=7, max_length=20)
    email: EmailStr
    user_type: str = Field(..., pattern="^(student|parent)$")
    current_class: Optional[str] = None
    query: Optional[str] = None


class LeadResponse(BaseModel):
    id: int
    name: str
    phone: str
    email: str
    user_type: str
    current_class: Optional[str]
    query: Optional[str]
    source: str
    status: str
    created_at: datetime

    class Config:
        from_attributes = True


# ─── Chat ──────────────────────────────────────────────────────────────────────

class ChatMessage(BaseModel):
    session_id: str = Field(..., min_length=1)
    message: str = Field(..., min_length=1)
    visitor_name: Optional[str] = None
    visitor_email: Optional[EmailStr] = None
    visitor_phone: Optional[str] = None


class ChatResponse(BaseModel):
    response: str
    session_id: str


# ─── Blog ──────────────────────────────────────────────────────────────────────

class BlogCreate(BaseModel):
    title: str = Field(..., min_length=5)
    slug: str = Field(..., min_length=5)
    excerpt: Optional[str] = None
    content: str = Field(..., min_length=20)
    category: Optional[str] = None
    author: str = "V. Swaminathan"
    is_published: bool = False
    read_time: Optional[str] = None


class BlogResponse(BaseModel):
    id: int
    title: str
    slug: str
    excerpt: Optional[str]
    content: str
    category: Optional[str]
    author: str
    is_published: bool
    read_time: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True


class BlogListResponse(BaseModel):
    id: int
    title: str
    slug: str
    excerpt: Optional[str]
    category: Optional[str]
    author: str
    read_time: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True


# ─── Testimonial ──────────────────────────────────────────────────────────────

class TestimonialCreate(BaseModel):
    name: str = Field(..., min_length=2)
    role: Optional[str] = None
    content: str = Field(..., min_length=10)
    rating: int = Field(default=5, ge=1, le=5)
    is_featured: bool = False
    is_published: bool = True


class TestimonialResponse(BaseModel):
    id: int
    name: str
    role: Optional[str]
    content: str
    rating: int
    is_featured: bool
    is_published: bool
    created_at: datetime

    class Config:
        from_attributes = True


# ─── FAQ ───────────────────────────────────────────────────────────────────────

class FAQCreate(BaseModel):
    question: str = Field(..., min_length=5)
    answer: str = Field(..., min_length=10)
    category: Optional[str] = None
    order: int = 0
    is_active: bool = True


class FAQResponse(BaseModel):
    id: int
    question: str
    answer: str
    category: Optional[str]
    order: int
    is_active: bool

    class Config:
        from_attributes = True


# ─── Admin Auth ────────────────────────────────────────────────────────────────

class AdminLogin(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=6)


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class AdminResponse(BaseModel):
    id: int
    email: str
    name: str
    is_active: bool

    class Config:
        from_attributes = True


# ─── Generic ──────────────────────────────────────────────────────────────────

class SuccessResponse(BaseModel):
    message: str
    id: Optional[int] = None
