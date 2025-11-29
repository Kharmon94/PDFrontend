// Type definitions matching the Rails backend API

export type UserType = 'user' | 'partner' | 'distribution' | 'admin';

export interface User {
  id: number;
  name: string;
  email: string;
  user_type: UserType;
}

export interface Business {
  id: number;
  name: string;
  category: string;
  description: string;
  address: string;
  phone: string | null;
  email: string | null;
  website: string | null;
  rating: number;
  review_count: number;
  image: string | null;
  featured: boolean;
  has_deals: boolean;
  deal: string | null;
  hours: Record<string, string> | null;
  amenities: string[] | null;
  gallery: string[] | null;
  user: {
    id: number;
    name: string;
  };
  approval_status?: 'pending' | 'approved' | 'rejected';
  created_at?: string;
  updated_at?: string;
}

export interface SavedDeal {
  id: number;
  user_id: number;
  business_id: number;
  created_at: string;
  updated_at: string;
}

export interface Analytics {
  total_views: number;
  total_clicks: number;
  weekly_views: number;
  weekly_clicks: number;
  views_by_day: Array<{
    date: string;
    views: number;
  }>;
  clicks_by_day: Array<{
    date: string;
    clicks: number;
  }>;
}

export interface AuthResponse {
  user: User;
  token: string;
  message: string;
}

export interface ApiError {
  error?: string;
  errors?: string[];
}

export interface BusinessFormData {
  name: string;
  category: string;
  description: string;
  address: string;
  phone?: string;
  email?: string;
  website?: string;
  image_url?: string;
  featured?: boolean;
  has_deals?: boolean;
  deal_description?: string;
  rating?: number;
  review_count?: number;
  hours?: Record<string, string>;
  amenities?: string[];
  gallery?: string[];
}

export interface UserFormData {
  name: string;
  email: string;
  password: string;
  user_type?: UserType;
}

