# DeepClariti — Shaping Confident Careers

A production-ready public business website for career coaching services.

## Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS, Shadcn UI, Framer Motion
- **Backend**: Python FastAPI
- **Database**: PostgreSQL
- **ORM**: SQLAlchemy
- **Auth**: JWT (Admin only)

## Project Structure

```
├── frontend/          # Next.js 15 application
│   ├── src/
│   │   ├── app/       # App Router pages
│   │   ├── components/ # Reusable components
│   │   ├── lib/       # API client & utilities
│   │   └── types/     # TypeScript types
│   └── ...
├── backend/           # FastAPI application
│   ├── app/
│   │   ├── models/    # SQLAlchemy models
│   │   ├── schemas/   # Pydantic schemas
│   │   ├── routers/   # API endpoints
│   │   ├── services/  # Business logic
│   │   └── repositories/ # Data access
│   └── ...
└── docker-compose.yml
```

## Quick Start

### Prerequisites

- Node.js 20+
- Python 3.12+
- PostgreSQL 16+

### Backend Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
cp .env.example .env   # Edit with your settings
uvicorn app.main:app --reload
```

API docs available at: http://localhost:8000/docs

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

App available at: http://localhost:3000

### Docker (Full Stack)

```bash
docker-compose up --build
```

- Frontend: http://localhost:3000
- Backend: http://localhost:8000
- API Docs: http://localhost:8000/docs

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/contact | Submit contact form |
| POST | /api/book-session | Book career coaching session |
| POST | /api/free-consultation | Request free consultation |
| POST | /api/chat | Chat with bot |
| GET | /api/blogs | Get published blogs |
| GET | /api/testimonials | Get published testimonials |
| GET | /api/faqs | Get active FAQs |
| POST | /api/admin/login | Admin login |
| GET | /api/admin/dashboard/stats | Dashboard stats |

## Admin Panel

Access at: `/admin/login`

Default credentials (change in production):
- Email: admin@deepclariti.com
- Password: changeme123

## Environment Variables

### Backend (.env)
```
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/deepclariti
SECRET_KEY=your-secret-key
ADMIN_EMAIL=admin@deepclariti.com
ADMIN_PASSWORD=changeme123
CORS_ORIGINS=http://localhost:3000
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```
