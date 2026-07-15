from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.schemas import (
    BlogCreate, BlogResponse, BlogListResponse,
    TestimonialCreate, TestimonialResponse,
    FAQCreate, FAQResponse, SuccessResponse,
)
from app.repositories.repository import BlogRepository, TestimonialRepository, FAQRepository
from app.services.auth_service import get_current_admin

router = APIRouter(prefix="/api", tags=["Content"])


# ─── Public Endpoints ─────────────────────────────────────────────────────────

@router.get("/blogs", response_model=list[BlogListResponse])
def get_published_blogs(skip: int = 0, limit: int = 20, db: Session = Depends(get_db)):
    repo = BlogRepository(db)
    return repo.get_published(skip, limit)


@router.get("/blogs/{slug}", response_model=BlogResponse)
def get_blog_by_slug(slug: str, db: Session = Depends(get_db)):
    repo = BlogRepository(db)
    blog = repo.get_by_slug(slug)
    if not blog or not blog.is_published:
        raise HTTPException(status_code=404, detail="Blog not found")
    return blog


@router.get("/testimonials", response_model=list[TestimonialResponse])
def get_testimonials(db: Session = Depends(get_db)):
    repo = TestimonialRepository(db)
    return repo.get_published()


@router.get("/faqs", response_model=list[FAQResponse])
def get_faqs(db: Session = Depends(get_db)):
    repo = FAQRepository(db)
    return repo.get_active()


# ─── Admin Blog Endpoints ─────────────────────────────────────────────────────

@router.get("/admin/blogs", response_model=list[BlogResponse])
def admin_get_blogs(db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    repo = BlogRepository(db)
    return repo.get_all()


@router.post("/admin/blogs", response_model=BlogResponse, status_code=status.HTTP_201_CREATED)
def admin_create_blog(data: BlogCreate, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    repo = BlogRepository(db)
    return repo.create(data)


@router.put("/admin/blogs/{blog_id}", response_model=BlogResponse)
def admin_update_blog(blog_id: int, data: BlogCreate, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    repo = BlogRepository(db)
    blog = repo.update(blog_id, data)
    if not blog:
        raise HTTPException(status_code=404, detail="Blog not found")
    return blog


@router.delete("/admin/blogs/{blog_id}")
def admin_delete_blog(blog_id: int, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    repo = BlogRepository(db)
    if not repo.delete(blog_id):
        raise HTTPException(status_code=404, detail="Blog not found")
    return {"message": "Blog deleted"}


# ─── Admin Testimonial Endpoints ──────────────────────────────────────────────

@router.get("/admin/testimonials", response_model=list[TestimonialResponse])
def admin_get_testimonials(db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    repo = TestimonialRepository(db)
    return repo.get_all()


@router.post("/admin/testimonials", response_model=TestimonialResponse, status_code=status.HTTP_201_CREATED)
def admin_create_testimonial(data: TestimonialCreate, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    repo = TestimonialRepository(db)
    return repo.create(data)


@router.delete("/admin/testimonials/{testimonial_id}")
def admin_delete_testimonial(testimonial_id: int, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    repo = TestimonialRepository(db)
    if not repo.delete(testimonial_id):
        raise HTTPException(status_code=404, detail="Testimonial not found")
    return {"message": "Testimonial deleted"}


# ─── Admin FAQ Endpoints ──────────────────────────────────────────────────────

@router.get("/admin/faqs", response_model=list[FAQResponse])
def admin_get_faqs(db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    repo = FAQRepository(db)
    return repo.get_all()


@router.post("/admin/faqs", response_model=FAQResponse, status_code=status.HTTP_201_CREATED)
def admin_create_faq(data: FAQCreate, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    repo = FAQRepository(db)
    return repo.create(data)


@router.put("/admin/faqs/{faq_id}", response_model=FAQResponse)
def admin_update_faq(faq_id: int, data: FAQCreate, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    repo = FAQRepository(db)
    faq = repo.update(faq_id, data)
    if not faq:
        raise HTTPException(status_code=404, detail="FAQ not found")
    return faq


@router.delete("/admin/faqs/{faq_id}")
def admin_delete_faq(faq_id: int, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    repo = FAQRepository(db)
    if not repo.delete(faq_id):
        raise HTTPException(status_code=404, detail="FAQ not found")
    return {"message": "FAQ deleted"}
