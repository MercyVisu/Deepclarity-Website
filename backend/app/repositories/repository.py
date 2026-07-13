from sqlalchemy.orm import Session
from sqlalchemy import desc
from app.models.models import (
    Admin, Appointment, ContactMessage, Lead,
    Blog, Testimonial, FAQ, ChatHistory
)
from app.schemas.schemas import (
    ContactCreate, AppointmentCreate, ConsultationCreate,
    BlogCreate, TestimonialCreate, FAQCreate, ChatMessage
)


class AdminRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_by_email(self, email: str) -> Admin | None:
        return self.db.query(Admin).filter(Admin.email == email).first()

    def create(self, email: str, hashed_password: str, name: str) -> Admin:
        admin = Admin(email=email, hashed_password=hashed_password, name=name)
        self.db.add(admin)
        self.db.commit()
        self.db.refresh(admin)
        return admin


class AppointmentRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(self, data: AppointmentCreate) -> Appointment:
        appointment = Appointment(**data.model_dump())
        self.db.add(appointment)
        self.db.commit()
        self.db.refresh(appointment)
        return appointment

    def get_all(self, skip: int = 0, limit: int = 100) -> list[Appointment]:
        return self.db.query(Appointment).order_by(desc(Appointment.created_at)).offset(skip).limit(limit).all()

    def get_by_id(self, appointment_id: int) -> Appointment | None:
        return self.db.query(Appointment).filter(Appointment.id == appointment_id).first()

    def update_status(self, appointment_id: int, status: str) -> Appointment | None:
        appointment = self.get_by_id(appointment_id)
        if appointment:
            appointment.status = status
            self.db.commit()
            self.db.refresh(appointment)
        return appointment

    def count(self) -> int:
        return self.db.query(Appointment).count()


class ContactRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(self, data: ContactCreate) -> ContactMessage:
        contact = ContactMessage(**data.model_dump())
        self.db.add(contact)
        self.db.commit()
        self.db.refresh(contact)
        return contact

    def get_all(self, skip: int = 0, limit: int = 100) -> list[ContactMessage]:
        return self.db.query(ContactMessage).order_by(desc(ContactMessage.created_at)).offset(skip).limit(limit).all()

    def mark_read(self, contact_id: int) -> ContactMessage | None:
        contact = self.db.query(ContactMessage).filter(ContactMessage.id == contact_id).first()
        if contact:
            contact.is_read = True
            self.db.commit()
            self.db.refresh(contact)
        return contact

    def count(self) -> int:
        return self.db.query(ContactMessage).count()

    def unread_count(self) -> int:
        return self.db.query(ContactMessage).filter(ContactMessage.is_read == False).count()


class LeadRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(self, data: ConsultationCreate) -> Lead:
        lead = Lead(
            name=data.name,
            phone=data.phone,
            email=data.email,
            user_type=data.user_type,
            current_class=data.current_class,
            query=data.query,
            source="free-consultation"
        )
        self.db.add(lead)
        self.db.commit()
        self.db.refresh(lead)
        return lead

    def create_from_chat(self, name: str, email: str, phone: str) -> Lead:
        lead = Lead(
            name=name,
            phone=phone,
            email=email,
            user_type="unknown",
            source="chatbot"
        )
        self.db.add(lead)
        self.db.commit()
        self.db.refresh(lead)
        return lead

    def get_all(self, skip: int = 0, limit: int = 100) -> list[Lead]:
        return self.db.query(Lead).order_by(desc(Lead.created_at)).offset(skip).limit(limit).all()

    def count(self) -> int:
        return self.db.query(Lead).count()


class BlogRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(self, data: BlogCreate) -> Blog:
        blog = Blog(**data.model_dump())
        self.db.add(blog)
        self.db.commit()
        self.db.refresh(blog)
        return blog

    def get_published(self, skip: int = 0, limit: int = 20) -> list[Blog]:
        return (
            self.db.query(Blog)
            .filter(Blog.is_published == True)
            .order_by(desc(Blog.created_at))
            .offset(skip)
            .limit(limit)
            .all()
        )

    def get_all(self, skip: int = 0, limit: int = 100) -> list[Blog]:
        return self.db.query(Blog).order_by(desc(Blog.created_at)).offset(skip).limit(limit).all()

    def get_by_slug(self, slug: str) -> Blog | None:
        return self.db.query(Blog).filter(Blog.slug == slug).first()

    def update(self, blog_id: int, data: BlogCreate) -> Blog | None:
        blog = self.db.query(Blog).filter(Blog.id == blog_id).first()
        if blog:
            for key, value in data.model_dump().items():
                setattr(blog, key, value)
            self.db.commit()
            self.db.refresh(blog)
        return blog

    def delete(self, blog_id: int) -> bool:
        blog = self.db.query(Blog).filter(Blog.id == blog_id).first()
        if blog:
            self.db.delete(blog)
            self.db.commit()
            return True
        return False


class TestimonialRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(self, data: TestimonialCreate) -> Testimonial:
        testimonial = Testimonial(**data.model_dump())
        self.db.add(testimonial)
        self.db.commit()
        self.db.refresh(testimonial)
        return testimonial

    def get_published(self) -> list[Testimonial]:
        return (
            self.db.query(Testimonial)
            .filter(Testimonial.is_published == True)
            .order_by(desc(Testimonial.created_at))
            .all()
        )

    def get_all(self) -> list[Testimonial]:
        return self.db.query(Testimonial).order_by(desc(Testimonial.created_at)).all()

    def delete(self, testimonial_id: int) -> bool:
        testimonial = self.db.query(Testimonial).filter(Testimonial.id == testimonial_id).first()
        if testimonial:
            self.db.delete(testimonial)
            self.db.commit()
            return True
        return False


class FAQRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(self, data: FAQCreate) -> FAQ:
        faq = FAQ(**data.model_dump())
        self.db.add(faq)
        self.db.commit()
        self.db.refresh(faq)
        return faq

    def get_active(self) -> list[FAQ]:
        return self.db.query(FAQ).filter(FAQ.is_active == True).order_by(FAQ.order).all()

    def get_all(self) -> list[FAQ]:
        return self.db.query(FAQ).order_by(FAQ.order).all()

    def update(self, faq_id: int, data: FAQCreate) -> FAQ | None:
        faq = self.db.query(FAQ).filter(FAQ.id == faq_id).first()
        if faq:
            for key, value in data.model_dump().items():
                setattr(faq, key, value)
            self.db.commit()
            self.db.refresh(faq)
        return faq

    def delete(self, faq_id: int) -> bool:
        faq = self.db.query(FAQ).filter(FAQ.id == faq_id).first()
        if faq:
            self.db.delete(faq)
            self.db.commit()
            return True
        return False


class ChatRepository:
    def __init__(self, db: Session):
        self.db = db

    def save_message(self, data: ChatMessage, bot_response: str) -> ChatHistory:
        chat = ChatHistory(
            session_id=data.session_id,
            user_message=data.message,
            bot_response=bot_response,
            visitor_name=data.visitor_name,
            visitor_email=data.visitor_email,
            visitor_phone=data.visitor_phone,
        )
        self.db.add(chat)
        self.db.commit()
        self.db.refresh(chat)
        return chat

    def get_by_session(self, session_id: str) -> list[ChatHistory]:
        return (
            self.db.query(ChatHistory)
            .filter(ChatHistory.session_id == session_id)
            .order_by(ChatHistory.created_at)
            .all()
        )

    def get_all_sessions(self, skip: int = 0, limit: int = 50) -> list[ChatHistory]:
        return (
            self.db.query(ChatHistory)
            .order_by(desc(ChatHistory.created_at))
            .offset(skip)
            .limit(limit)
            .all()
        )
