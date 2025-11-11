// User types
export interface User {
  id: number;
  email: string;
  full_name: string;
  company?: string;
  phone?: string;
  bio?: string;
  role: 'client' | 'admin' | 'super_admin';
  is_active: boolean;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

// Project types
export interface Project {
  id: number;
  title: string;
  description?: string;
  status: 'planning' | 'in_progress' | 'on_hold' | 'completed' | 'cancelled';
  project_type: 'ai_agents' | 'automation' | 'it_consulting' | 'custom';
  budget?: number;
  deadline?: string;
  client_id: number;
  created_at: string;
  updated_at: string;
  updates: ProjectUpdate[];
}

export interface ProjectUpdate {
  id: number;
  title: string;
  content: string;
  is_public: boolean;
  project_id: number;
  created_at: string;
  updated_at: string;
}

// Inquiry types
export interface Inquiry {
  id: number;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  status: 'new' | 'in_progress' | 'responded' | 'closed';
  service_interest?: string;
  user_id?: number;
  created_at: string;
  updated_at: string;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

// Form types
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  email: string;
  password: string;
  full_name: string;
  company?: string;
  phone?: string;
}

export interface ContactForm {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  service_interest?: string;
}

export interface ProjectForm {
  title: string;
  description?: string;
  project_type: string;
  budget?: number;
  deadline?: string;
  client_id: number;
}

// Component props
export interface ServiceCardProps {
  title: string;
  description: string;
  features: string[];
  pricing?: {
    starter: string;
    professional: string;
    enterprise: string;
  };
  ctaText: string;
  onCtaClick: () => void;
}

export interface TestimonialProps {
  name: string;
  company: string;
  role: string;
  content: string;
  avatar?: string;
}
