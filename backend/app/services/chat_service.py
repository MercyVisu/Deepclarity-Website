import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sqlalchemy.orm import Session
from app.repositories.repository import ChatRepository
from app.schemas.schemas import ChatMessage

# ─── Free LLM Chatbot using TF-IDF + Cosine Similarity ────────────────────────
# This is a completely FREE, locally-running NLP model.
# It uses TF-IDF vectorization (a machine learning technique) to understand
# the semantic meaning of user messages and match them to trained knowledge.
# No API keys, no cloud services, no cost — 100% free.

# ─── Knowledge Base (trained data for the chatbot) ─────────────────────────────

TRAINING_DATA = [
    {
        "intent": "greeting",
        "questions": [
            "hi", "hello", "hey", "good morning", "good evening",
            "good afternoon", "hi there", "hey there", "greetings",
            "what's up", "howdy", "namaste"
        ],
        "answer": (
            "Hello! Welcome to DeepClariti. I'm your career guidance assistant. "
            "I can help you learn about our services, book a session, or answer "
            "questions about career coaching. How can I assist you today?"
        ),
    },
    {
        "intent": "services",
        "questions": [
            "what services do you offer", "what do you do", "tell me about your services",
            "what help can you provide", "services available", "how can you help me",
            "what kind of coaching", "career services", "list of services",
            "what does deepclariti offer", "your offerings"
        ],
        "answer": (
            "DeepClariti offers personalized career coaching services:\n\n"
            "1️⃣ **One-on-One Career Counseling** — Deep personal sessions with Swami\n"
            "2️⃣ **Psychometric Assessments** — Internationally validated tools\n"
            "3️⃣ **Career Path Discovery** — Find careers that truly fit you\n"
            "4️⃣ **Parent Guidance Sessions** — Support without pressure\n"
            "5️⃣ **Stream Selection Guidance** — For Class 8-12 students\n"
            "6️⃣ **Career Transition Coaching** — For professionals\n\n"
            "All sessions are conducted by V. Swaminathan (Swami), an International "
            "Certified Career Coach (CDA, USA). Would you like to book a free consultation?"
        ),
    },
    {
        "intent": "about",
        "questions": [
            "who is the founder", "tell me about swami", "who runs deepclariti",
            "about the coach", "who is v swaminathan", "background of founder",
            "about deepclariti", "what is deepclariti", "company background",
            "who started this", "tell me about your organization"
        ],
        "answer": (
            "DeepClariti was founded by **V. Swaminathan (Swami)**, an International "
            "Certified Career Coach with CDA (Career Development Administrator) "
            "certification from USA.\n\n"
            "With 15+ years of experience, Swami combines psychometric science with "
            "deep personal coaching to help students and professionals make genuinely "
            "confident career decisions. His approach starts with self-awareness — "
            "understanding who you are — before exploring career options.\n\n"
            "He has guided 500+ students and 200+ parents through this journey."
        ),
    },
    {
        "intent": "booking",
        "questions": [
            "how to book a session", "book appointment", "schedule a session",
            "how to book", "i want to book", "booking process", "schedule meeting",
            "how can i meet swami", "arrange a session", "make an appointment",
            "book a call", "set up meeting"
        ],
        "answer": (
            "You can book a session with Swami in two ways:\n\n"
            "1️⃣ **Book a Career Coaching Session** — A full paid session for in-depth guidance\n"
            "2️⃣ **Book a FREE 30-Minute Consultation** — No-obligation introductory call\n\n"
            "The free consultation helps us understand your needs with zero pressure. "
            "Visit our 'Book Session' or 'Free Consultation' page to get started!\n\n"
            "Would you like me to redirect you to the booking page?"
        ),
    },
    {
        "intent": "free_consultation",
        "questions": [
            "free consultation", "free session", "free call", "no cost session",
            "is there anything free", "trial session", "introductory call",
            "can i try before paying", "free demo", "complimentary session"
        ],
        "answer": (
            "Yes! We offer a **completely FREE 30-minute consultation** with Swami.\n\n"
            "During this call:\n"
            "• We understand your current situation\n"
            "• Answer all your questions\n"
            "• Explain how DeepClariti can help\n"
            "• No obligation, no pressure to sign up\n\n"
            "Visit our Free Consultation page to submit your details and we'll "
            "schedule a call within 24 hours!"
        ),
    },
    {
        "intent": "psychometric",
        "questions": [
            "what is psychometric assessment", "psychometric test", "aptitude test",
            "personality assessment", "career test", "what tests do you use",
            "assessment tools", "how does the test work", "online quiz",
            "interest inventory", "strengths assessment"
        ],
        "answer": (
            "DeepClariti uses **globally reputed, internationally validated** "
            "psychometric assessment tools administered by a certified professional.\n\n"
            "These are NOT casual online quizzes. Our assessments reveal:\n"
            "• Natural aptitudes you've taken for granted\n"
            "• Personality dimensions that explain environment preferences\n"
            "• Interest patterns aligned with career paths\n"
            "• Values and motivators for work satisfaction\n\n"
            "The results are combined with personal coaching for deep career clarity."
        ),
    },
    {
        "intent": "students",
        "questions": [
            "help for students", "student career guidance", "which stream to choose",
            "science or commerce", "career after 10th", "career after 12th",
            "college guidance", "confused about career", "what should i study",
            "stream selection", "which course is best", "engineering or medical",
            "class 10 student", "class 12 student", "competitive exams"
        ],
        "answer": (
            "For students, DeepClariti provides:\n\n"
            "📚 **Stream Selection** — Science / Commerce / Arts guidance\n"
            "🧠 **Self-Discovery** — Understanding your strengths & aptitudes\n"
            "🗺️ **Career Mapping** — Finding paths that match who you are\n"
            "🤖 **AI-Era Guidance** — Careers that will thrive in the future\n"
            "📋 **Action Planning** — Clear next steps for courses & colleges\n\n"
            "We work with students from Class 8 onwards. The earlier you start "
            "building self-awareness, the better your decisions will be.\n\n"
            "Would you like to book a free consultation to discuss your situation?"
        ),
    },
    {
        "intent": "parents",
        "questions": [
            "guidance for parents", "my child is confused", "how to help my child",
            "parent session", "parental guidance", "my son career", "my daughter career",
            "worried about child", "career pressure", "support my child",
            "parent involvement", "family career discussion",
            "my child doesn't know what to do", "my child has no idea about career",
            "my son doesn't know what to do", "my daughter doesn't know what to do",
            "child confused about career", "help my child choose career",
            "my kid is lost", "child has no direction", "worried about my child future"
        ],
        "answer": (
            "For parents, DeepClariti helps with:\n\n"
            "❤️ **Understanding Your Child** — See their natural strengths beyond marks\n"
            "🤝 **Support Without Pressure** — Guide without creating anxiety\n"
            "🌉 **Bridge the Gap** — Connect modern careers with family values\n"
            "👨‍👩‍👧 **Family Sessions** — Constructive career conversations together\n\n"
            "Many parents tell us: 'Every time we discuss careers, it ends in an argument.'\n"
            "We help change that dynamic completely.\n\n"
            "Would you like to book a parent consultation?"
        ),
    },
    {
        "intent": "pricing",
        "questions": [
            "how much does it cost", "pricing", "fees", "session cost",
            "what is the charge", "payment", "affordable", "expensive",
            "package price", "investment required", "how much to pay"
        ],
        "answer": (
            "For pricing details, we recommend booking a **free 30-minute consultation** "
            "first. During this call, Swami will:\n\n"
            "• Understand your specific needs\n"
            "• Recommend the right package\n"
            "• Explain what's included\n\n"
            "This way you get a personalized recommendation rather than a generic price list. "
            "The consultation itself is completely free with no obligation!\n\n"
            "Would you like to book your free consultation?"
        ),
    },
    {
        "intent": "contact",
        "questions": [
            "how to contact", "contact details", "email address", "phone number",
            "where are you located", "location", "reach you", "get in touch",
            "contact information", "call you", "address"
        ],
        "answer": (
            "You can reach DeepClariti through:\n\n"
            "📧 **Email:** info@deepclariti.com\n"
            "📞 **Phone:** +91 98765 43210\n"
            "📍 **Location:** Chennai, India\n"
            "🌐 **Website:** Contact form on our Contact page\n\n"
            "We typically respond within 24 hours. "
            "You can also book a free consultation directly from our website!"
        ),
    },
    {
        "intent": "career_change",
        "questions": [
            "career change", "switch career", "change profession", "new career",
            "not happy with job", "career transition", "mid-career change",
            "should i change my career", "wrong career choice",
            "i need help with career change", "help me change career",
            "want to change my career", "looking for career change",
            "thinking of changing career", "career switch guidance"
        ],
        "answer": (
            "Thinking about a career change? That's completely normal and takes courage.\n\n"
            "DeepClariti's Career Transition Coaching helps professionals:\n"
            "• Audit your existing skills and strengths\n"
            "• Analyze market opportunities\n"
            "• Plan a realistic transition path\n"
            "• Build confidence in your new direction\n\n"
            "Swami has helped many professionals navigate this journey successfully. "
            "A free consultation is the best place to start discussing your situation."
        ),
    },
    {
        "intent": "self_awareness",
        "questions": [
            "what is self awareness", "why self awareness matters", "know myself",
            "understand my strengths", "discover myself", "who am i",
            "how to find my passion", "what am i good at", "my strengths"
        ],
        "answer": (
            "Self-awareness is the **foundation** of every good career decision at DeepClariti.\n\n"
            "It means understanding:\n"
            "💪 **Strengths** — What you do well with less effort\n"
            "✨ **Interests** — What genuinely engages you\n"
            "🧠 **Aptitude** — How your mind naturally works\n"
            "🎭 **Personality** — How you operate best\n"
            "❤️ **Values** — What matters to you in work\n"
            "⚡ **Energy** — What energizes vs. depletes you\n\n"
            "Students who understand themselves make decisions they never regret. "
            "Our psychometric assessments and coaching sessions build this awareness systematically."
        ),
    },
    {
        "intent": "ai_careers",
        "questions": [
            "ai and career", "artificial intelligence jobs", "will ai take my job",
            "future proof career", "careers in ai era", "technology and career",
            "which jobs are safe from ai", "future careers", "automation"
        ],
        "answer": (
            "Great question! AI is transforming careers, but it's not replacing humans — "
            "it's changing what skills matter.\n\n"
            "At DeepClariti, we help students understand:\n"
            "• Which careers will thrive alongside AI\n"
            "• Skills that AI cannot replicate (creativity, empathy, complex reasoning)\n"
            "• How to position yourself for the future\n"
            "• Emerging career paths you haven't considered\n\n"
            "The key is choosing careers aligned with your unique human strengths. "
            "That's exactly what our coaching helps you discover."
        ),
    },
    {
        "intent": "testimonials",
        "questions": [
            "reviews", "testimonials", "success stories", "results",
            "does it work", "proof", "client feedback", "outcomes",
            "has it helped others", "student feedback"
        ],
        "answer": (
            "Our clients consistently share positive experiences:\n\n"
            "⭐ *\"Swami helped me see strengths I never recognized\"* — Arun K., Student\n"
            "⭐ *\"No pressure, just clarity\"* — Priya M., Parent\n"
            "⭐ *\"The psychometric assessment was eye-opening\"* — Vikram S., Student\n\n"
            "With a 98% satisfaction rate across 500+ students guided, "
            "DeepClariti delivers genuine career clarity.\n\n"
            "Visit our Testimonials page for more stories, or experience it yourself "
            "with a free consultation!"
        ),
    },
    {
        "intent": "lead_capture",
        "questions": [
            "i need help", "can you help me", "i'm interested",
            "tell me more", "i want guidance", "need career help",
            "where do i start", "how to begin"
        ],
        "answer": (
            "I'd love to help you get started! The best first step is our "
            "**FREE 30-minute consultation** with Swami.\n\n"
            "To book, I just need a few details:\n"
            "• Your name\n"
            "• Phone number\n"
            "• Whether you're a student or parent\n\n"
            "You can fill these in on our Free Consultation page, or share them "
            "here and we'll reach out to you within 24 hours!\n\n"
            "Would you like to proceed?"
        ),
    },
    {
        "intent": "yes_confirm",
        "questions": [
            "yes", "yes please", "sure", "okay", "ok", "yeah", "yep",
            "yes i want to book", "yes redirect me", "yes i am interested",
            "go ahead", "please do", "absolutely", "of course", "definitely",
            "yes i would like that", "sounds good", "let's do it"
        ],
        "answer": (
            "Great! Here's how to proceed:\n\n"
            "👉 To book a Career Coaching Session, visit: /book-session\n"
            "👉 To book a FREE 30-minute Consultation, visit: /free-consultation\n"
            "👉 To contact us directly, visit: /contact\n\n"
            "Simply fill in your details on any of these pages and we'll get back "
            "to you within 24 hours. Is there anything else I can help you with?"
        ),
    },
    {
        "intent": "no_decline",
        "questions": [
            "no", "no thanks", "not now", "maybe later", "not interested",
            "nope", "not right now", "i will think about it", "not yet"
        ],
        "answer": (
            "No problem at all! Take your time. Whenever you're ready, you can:\n\n"
            "• Visit our website to learn more about our services\n"
            "• Read our Insights/Blog articles for career guidance tips\n"
            "• Come back and chat with me anytime\n\n"
            "Remember, the free consultation has no obligation — it's just a friendly "
            "conversation whenever you feel ready. Have a great day!"
        ),
    },
    {
        "intent": "thanks",
        "questions": [
            "thank you", "thanks", "thank you so much", "thanks a lot",
            "that's helpful", "very helpful", "great thanks", "appreciate it",
            "thankyou", "thanks for the help", "thank you for the information",
            "thanks for helping", "helpful information", "that was helpful"
        ],
        "answer": (
            "You're welcome! I'm glad I could help. If you have any more questions "
            "about career coaching, psychometric assessments, or booking a session, "
            "feel free to ask anytime.\n\n"
            "Wishing you all the best on your career journey! 🌟"
        ),
    },
]

# Pre-compute TF-IDF model trained on knowledge base
_vectorizer = None
_tfidf_matrix = None
_answers_list = None


def _build_model():
    """Train the TF-IDF model on all knowledge base questions (one-time)."""
    global _vectorizer, _tfidf_matrix, _answers_list

    if _vectorizer is not None:
        return

    questions_flat = []
    _answers_list = []

    for item in TRAINING_DATA:
        for question in item["questions"]:
            questions_flat.append(question)
            _answers_list.append(item["answer"])

    # Train the TF-IDF vectorizer on all knowledge base questions
    _vectorizer = TfidfVectorizer(
        ngram_range=(1, 2),  # Use unigrams and bigrams
        stop_words="english",
        max_features=5000,
        sublinear_tf=True,
    )
    _tfidf_matrix = _vectorizer.fit_transform(questions_flat)


def get_bot_response(message: str) -> str:
    """Use trained TF-IDF model to find the best matching answer."""
    msg_lower = message.lower().strip()

    # Handle empty messages
    if not msg_lower:
        return "I didn't catch that. Could you please rephrase your question?"

    # Build/train the model if not done yet
    _build_model()

    # Transform user message using trained model
    user_vector = _vectorizer.transform([msg_lower])

    # Compute cosine similarity against all trained questions
    similarities = cosine_similarity(user_vector, _tfidf_matrix)[0]

    # Get the best match
    best_idx = int(np.argmax(similarities))
    best_score = float(similarities[best_idx])

    # If confidence is high enough, return the matched answer
    if best_score > 0.15:
        return _answers_list[best_idx]

    # Low confidence fallback
    return (
        "Thank you for your question! While I may not have a specific answer for that, "
        "I can help you with:\n\n"
        "• Our career coaching services\n"
        "• Booking a session or free consultation\n"
        "• Information about psychometric assessments\n"
        "• Guidance for students or parents\n"
        "• Contact information\n\n"
        "Would you like to know about any of these? Or you can book a "
        "**FREE 30-minute consultation** to discuss your specific needs with Swami directly!"
    )


class ChatService:
    def __init__(self, db: Session):
        self.repo = ChatRepository(db)

    def process_message(self, data: ChatMessage) -> str:
        bot_response = get_bot_response(data.message)
        self.repo.save_message(data, bot_response)
        return bot_response
