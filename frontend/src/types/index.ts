export interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  is_featured: boolean;
  created_at: string;
}

export interface Blog {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  category: string;
  author: string;
  read_time: string;
  created_at: string;
}

export interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
  order: number;
}

export interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  user_type: string;
  message: string;
}

export interface BookSessionFormData {
  name: string;
  phone: string;
  email: string;
  user_type: string;
  preferred_date: string;
  preferred_time: string;
  message?: string;
}

export interface ConsultationFormData {
  name: string;
  phone: string;
  email: string;
  user_type: string;
  current_class?: string;
  query?: string;
}
