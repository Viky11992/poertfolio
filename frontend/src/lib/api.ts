/**
 * API client for communicating with the backend.
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image_url?: string;
  video_url?: string;
  media_urls?: string[];
  github_url?: string;
  live_url?: string;
  featured: boolean;
}

export interface Skill {
  name: string;
  category: string;
  proficiency: number;
  icon?: string;
}

export interface Experience {
  id: number;
  company: string;
  position: string;
  start_date: string;
  end_date?: string;
  current: boolean;
  description: string[];
  technologies: string[];
}

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface AIQuery {
  message: string;
  conversation_history?: Array<{ role: string; content: string }>;
}

export interface AIResponse {
  response: string;
  conversation_history: Array<{ role: string; content: string }>;
}

async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout (increased from 10s)

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API Error (${response.status}):`, errorText);
      
      let errorMessage = 'An error occurred';
      try {
        const error = JSON.parse(errorText);
        errorMessage = error.detail || error.message || errorMessage;
      } catch {
        errorMessage = errorText || errorMessage;
      }
      
      throw new Error(errorMessage);
    }

    return response.json();
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Request timeout. Please check if backend is running. Try again or email directly at Shoaibarshad470@gmail.com');
    }
    
    if (error instanceof Error && error.message.includes('Failed to fetch')) {
      throw new Error('Cannot connect to backend. Please check if backend server is running on port 8000.');
    }
    
    throw error;
  }
}

export const api = {
  // Projects
  getProjects: async (featuredOnly = false) => {
    const query = featuredOnly ? '?featured_only=true' : '';
    return fetchAPI<Project[]>(`/projects${query}`);
  },
  getProject: async (id: number) => {
    return fetchAPI<Project>(`/projects/${id}`);
  },

  // Skills
  getSkills: async (category?: string) => {
    const query = category ? `?category=${encodeURIComponent(category)}` : '';
    return fetchAPI<Skill[]>(`/skills${query}`);
  },

  // Experience
  getExperience: async () => {
    return fetchAPI<Experience[]>('/experience');
  },

  // About
  getAbout: async () => {
    return fetchAPI<{ name: string; title: string; location: string; bio: string; summary: string }>('/about');
  },

  // Contact
  submitContact: async (data: ContactMessage) => {
    return fetchAPI<{ success: boolean; message: string }>('/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // AI Chat
  chat: async (query: AIQuery) => {
    return fetchAPI<AIResponse>('/ai/chat', {
      method: 'POST',
      body: JSON.stringify(query),
    });
  },
};
