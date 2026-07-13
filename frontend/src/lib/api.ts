const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const url = `${API_BASE}${endpoint}`;
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      return { error: errorData?.detail || `Request failed with status ${response.status}` };
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    return { error: "Network error. Please try again." };
  }
}

// ─── Public API ──────────────────────────────────────────────────────────────

export async function submitContact(data: {
  name: string;
  phone: string;
  email: string;
  user_type: string;
  message: string;
}) {
  return apiRequest<{ message: string; id: number }>("/contact", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function bookSession(data: {
  name: string;
  phone: string;
  email: string;
  user_type: string;
  preferred_date: string;
  preferred_time: string;
  message?: string;
}) {
  return apiRequest<{ message: string; id: number }>("/book-session", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function submitConsultation(data: {
  name: string;
  phone: string;
  email: string;
  user_type: string;
  current_class?: string;
  query?: string;
}) {
  return apiRequest<{ message: string; id: number }>("/free-consultation", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function sendChatMessage(data: {
  session_id: string;
  message: string;
  visitor_name?: string;
  visitor_email?: string;
  visitor_phone?: string;
}) {
  return apiRequest<{ response: string; session_id: string }>("/chat", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getBlogs() {
  return apiRequest<Array<{
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    category: string;
    author: string;
    read_time: string;
    created_at: string;
  }>>("/blogs");
}

export async function getBlogBySlug(slug: string) {
  return apiRequest<{
    id: number;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    category: string;
    author: string;
    read_time: string;
    created_at: string;
  }>(`/blogs/${slug}`);
}

export async function getTestimonials() {
  return apiRequest<Array<{
    id: number;
    name: string;
    role: string;
    content: string;
    rating: number;
    is_featured: boolean;
    created_at: string;
  }>>("/testimonials");
}

export async function getFaqs() {
  return apiRequest<Array<{
    id: number;
    question: string;
    answer: string;
    category: string;
    order: number;
  }>>("/faqs");
}

// ─── Admin API ───────────────────────────────────────────────────────────────

export async function adminLogin(email: string, password: string) {
  return apiRequest<{ access_token: string; token_type: string }>("/admin/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export function getAdminHeaders(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const token = localStorage.getItem("admin_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function getAdminStats() {
  return apiRequest<{
    total_appointments: number;
    total_contacts: number;
    unread_contacts: number;
    total_leads: number;
  }>("/admin/dashboard/stats", {
    headers: getAdminHeaders(),
  });
}

export async function getAdminAppointments() {
  return apiRequest<Array<unknown>>("/admin/appointments", {
    headers: getAdminHeaders(),
  });
}

export async function getAdminContacts() {
  return apiRequest<Array<unknown>>("/admin/contacts", {
    headers: getAdminHeaders(),
  });
}

export async function getAdminLeads() {
  return apiRequest<Array<unknown>>("/admin/leads", {
    headers: getAdminHeaders(),
  });
}
