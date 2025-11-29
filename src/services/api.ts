import { AuthResponse, User, Business, SavedDeal, ApiError } from '../types';

// API service for connecting to Rails backend
declare global {
  interface Window {
    REACT_APP_API_URL?: string;
  }
}

const API_BASE_URL = window.REACT_APP_API_URL || process.env.REACT_APP_API_URL || 'http://localhost:3001/api/v1';

// Get the base URL for static assets (remove /api/v1 suffix if present)
export const getStaticAssetUrl = (filename: string): string => {
  const baseUrl = window.REACT_APP_API_URL || process.env.REACT_APP_API_URL || 'http://localhost:3001';
  // Remove /api/v1 suffix if present
  const cleanBaseUrl = baseUrl.replace(/\/api\/v1$/, '');
  return `${cleanBaseUrl}/${filename}`;
};

// Static asset URLs
export const STATIC_ASSETS = {
  favicon: getStaticAssetUrl('Preferred.Deals_Favicon.png'),
  logoLight: getStaticAssetUrl('Preferred.Deals_Black_Logo_No_BG.png'),
  logoDark: getStaticAssetUrl('Preferred.Deals_White_Logo_No_BG.png'),
};

// Log the API URL being used (for debugging)
console.log('API_BASE_URL:', API_BASE_URL);

class ApiService {
  private token: string | null = null;

  constructor() {
    this.token = localStorage.getItem('auth_token');
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    // Check if body is FormData (for file uploads)
    const isFormData = options.body instanceof FormData;
    
    const config: RequestInit = {
      headers: {
        // Don't set Content-Type for FormData - browser will set it with boundary
        ...(!isFormData && { 'Content-Type': 'application/json' }),
        ...options.headers,
      },
      ...options,
    };

    if (this.token) {
      config.headers = {
        ...config.headers,
        'Authorization': `Bearer ${this.token}`,
      };
    }

    const response = await fetch(url, config);
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Network error' }));
      throw new Error(error.error || 'Request failed');
    }

    return response.json();
  }

  // Authentication methods
  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    if (response.token) {
      this.token = response.token;
      localStorage.setItem('auth_token', response.token);
    }
    
    return response;
  }

  async signup(userData: { name: string; email: string; password: string; user_type?: string }): Promise<AuthResponse> {
    const response = await this.request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ user: userData }),
    });
    
    if (response.token) {
      this.token = response.token;
      localStorage.setItem('auth_token', response.token);
    }
    
    return response;
  }

  async getCurrentUser(): Promise<{ user: User }> {
    return this.request('/auth/me');
  }

  logout() {
    this.token = null;
    localStorage.removeItem('auth_token');
  }

  isAuthenticated(): boolean {
    return this.token !== null;
  }

  // Business methods
  async getBusinesses(params: {
    search?: string;
    category?: string;
    featured?: boolean;
    deals?: boolean;
  } = {}): Promise<Business[]> {
    const queryParams = new URLSearchParams();
    
    if (params.search) queryParams.append('search', params.search);
    if (params.category) queryParams.append('category', params.category);
    if (params.featured !== undefined) queryParams.append('featured', params.featured.toString());
    if (params.deals !== undefined) queryParams.append('deals', params.deals.toString());

    const queryString = queryParams.toString();
    const endpoint = queryString ? `/businesses?${queryString}` : '/businesses';
    
    return this.request(endpoint);
  }

  async getBusiness(id: string): Promise<Business> {
    return this.request(`/businesses/${id}`);
  }

  async getBusinessAutocomplete(query: string): Promise<Array<{
    name: string;
    category: string;
    location: string;
  }>> {
    if (!query || query.length < 2) return [];
    return this.request(`/businesses/autocomplete?query=${encodeURIComponent(query)}`);
  }

  async createBusiness(businessData: any, files?: { image?: File; gallery_images?: File[] }): Promise<Business> {
    // If files are provided, use FormData; otherwise use JSON
    if (files?.image || files?.gallery_images) {
      const formData = new FormData();
      
      // Add all business data fields
      Object.keys(businessData).forEach(key => {
        const value = businessData[key];
        if (value !== null && value !== undefined) {
          if (Array.isArray(value)) {
            // Handle array fields (like amenities, gallery URLs)
            value.forEach((item, index) => {
              if (typeof item === 'object') {
                formData.append(`business[${key}][${index}]`, JSON.stringify(item));
              } else {
                formData.append(`business[${key}][${index}]`, String(item));
              }
            });
          } else if (typeof value === 'object') {
            // Handle object fields (like hours)
            formData.append(`business[${key}]`, JSON.stringify(value));
          } else {
            formData.append(`business[${key}]`, String(value));
          }
        }
      });
      
      // Add image file
      if (files.image) {
        formData.append('business[image]', files.image);
      }
      
      // Add gallery images
      if (files.gallery_images) {
        files.gallery_images.forEach((file, index) => {
          formData.append(`business[gallery_images][]`, file);
        });
      }
      
      return this.request('/businesses', {
        method: 'POST',
        body: formData,
      });
    } else {
      return this.request('/businesses', {
        method: 'POST',
        body: JSON.stringify({ business: businessData }),
      });
    }
  }

  async updateBusiness(id: string, businessData: any, files?: { image?: File; gallery_images?: File[] }): Promise<Business> {
    // If files are provided, use FormData; otherwise use JSON
    if (files?.image || files?.gallery_images) {
      const formData = new FormData();
      
      // Add all business data fields
      Object.keys(businessData).forEach(key => {
        const value = businessData[key];
        if (value !== null && value !== undefined) {
          if (Array.isArray(value)) {
            // Handle array fields
            value.forEach((item, index) => {
              if (typeof item === 'object') {
                formData.append(`business[${key}][${index}]`, JSON.stringify(item));
              } else {
                formData.append(`business[${key}][${index}]`, String(item));
              }
            });
          } else if (typeof value === 'object') {
            // Handle object fields
            formData.append(`business[${key}]`, JSON.stringify(value));
          } else {
            formData.append(`business[${key}]`, String(value));
          }
        }
      });
      
      // Add image file
      if (files.image) {
        formData.append('business[image]', files.image);
      }
      
      // Add gallery images
      if (files.gallery_images) {
        files.gallery_images.forEach((file) => {
          formData.append(`business[gallery_images][]`, file);
        });
      }
      
      return this.request(`/businesses/${id}`, {
        method: 'PUT',
        body: formData,
      });
    } else {
      return this.request(`/businesses/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ business: businessData }),
      });
    }
  }

  async deleteBusiness(id: string): Promise<void> {
    return this.request(`/businesses/${id}`, {
      method: 'DELETE',
    });
  }

  async getMyBusinesses(): Promise<Business[]> {
    return this.request('/businesses/my');
  }

  async getBusinessAnalytics(id: string): Promise<any> {
    return this.request(`/businesses/${id}/analytics`);
  }

  async trackBusinessClick(id: string, clickType: string): Promise<void> {
    return this.request(`/businesses/${id}/track_click`, {
      method: 'POST',
      body: JSON.stringify({ click_type: clickType }),
    });
  }

  // Saved deals methods
  async getSavedDeals(): Promise<Business[]> {
    return this.request('/saved_deals');
  }

  async saveDeal(businessId: string): Promise<SavedDeal> {
    return this.request('/saved_deals', {
      method: 'POST',
      body: JSON.stringify({ business_id: businessId }),
    });
  }

  async removeSavedDeal(businessId: string): Promise<void> {
    return this.request(`/saved_deals/${businessId}`, {
      method: 'DELETE',
    });
  }

  async toggleSavedDeal(businessId: string): Promise<{ saved: boolean; message: string }> {
    return this.request('/saved_deals/toggle', {
      method: 'POST',
      body: JSON.stringify({ business_id: businessId }),
    });
  }

  // Admin methods
  async getAdminStats(): Promise<any> {
    return this.request('/admin/stats');
  }

  async getAdminUsers(params: {
    page?: number;
    per_page?: number;
    search?: string;
    user_type?: string;
  } = {}): Promise<{ users: any[]; pagination: any }> {
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.per_page) queryParams.append('per_page', params.per_page.toString());
    if (params.search) queryParams.append('search', params.search);
    if (params.user_type) queryParams.append('user_type', params.user_type);

    const queryString = queryParams.toString();
    const endpoint = queryString ? `/admin/users?${queryString}` : '/admin/users';
    return this.request(endpoint);
  }

  async getAdminBusinesses(params: {
    page?: number;
    per_page?: number;
    search?: string;
    category?: string;
    featured?: boolean;
  } = {}): Promise<{ businesses: Business[]; pagination: any }> {
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.per_page) queryParams.append('per_page', params.per_page.toString());
    if (params.search) queryParams.append('search', params.search);
    if (params.category) queryParams.append('category', params.category);
    if (params.featured !== undefined) queryParams.append('featured', params.featured.toString());

    const queryString = queryParams.toString();
    const endpoint = queryString ? `/admin/businesses?${queryString}` : '/admin/businesses';
    return this.request(endpoint);
  }

  async toggleBusinessFeatured(businessId: string): Promise<{ message: string; business: Business }> {
    return this.request(`/admin/businesses/${businessId}/feature`, {
      method: 'PATCH',
    });
  }

  async deleteUser(userId: string): Promise<{ message: string }> {
    return this.request(`/admin/users/${userId}`, {
      method: 'DELETE',
    });
  }

  async deleteBusinessAsAdmin(businessId: string): Promise<{ message: string }> {
    return this.request(`/admin/businesses/${businessId}`, {
      method: 'DELETE',
    });
  }

  async getAdminDistributors(): Promise<{ distributors: any[] }> {
    return this.request('/admin/distributors');
  }

  async getPendingApprovals(): Promise<{ businesses: Business[]; count: number }> {
    return this.request('/admin/pending_approvals');
  }

  async approveBusiness(businessId: string): Promise<{ message: string; business: Business }> {
    return this.request(`/admin/businesses/${businessId}/approve`, {
      method: 'PATCH',
    });
  }

  async rejectBusiness(businessId: string): Promise<{ message: string }> {
    return this.request(`/admin/businesses/${businessId}/reject`, {
      method: 'PATCH',
    });
  }

  async suspendUser(userId: string): Promise<{ message: string; user: any }> {
    return this.request(`/admin/users/${userId}/suspend`, {
      method: 'PATCH',
    });
  }

  async activateUser(userId: string): Promise<{ message: string; user: any }> {
    return this.request(`/admin/users/${userId}/activate`, {
      method: 'PATCH',
    });
  }

  // User profile methods
  async getUserProfile(): Promise<any> {
    return this.request('/users/profile');
  }

  async updateUserProfile(data: { name?: string; email?: string; avatar?: File }): Promise<{ user: any; message: string }> {
    // If avatar file is provided, use FormData; otherwise use JSON
    if (data.avatar) {
      const formData = new FormData();
      
      if (data.name) formData.append('user[name]', data.name);
      if (data.email) formData.append('user[email]', data.email);
      formData.append('user[avatar]', data.avatar);
      
      return this.request('/users/profile', {
        method: 'PATCH',
        body: formData,
      });
    } else {
      return this.request('/users/profile', {
        method: 'PATCH',
        body: JSON.stringify({ user: data }),
      });
    }
  }

  async updatePassword(currentPassword: string, newPassword: string): Promise<{ message: string }> {
    return this.request('/users/password', {
      method: 'PATCH',
      body: JSON.stringify({ current_password: currentPassword, new_password: newPassword }),
    });
  }

  async deleteAccount(password: string): Promise<{ message: string }> {
    return this.request('/users/account', {
      method: 'DELETE',
      body: JSON.stringify({ password }),
    });
  }

  // Distribution partner methods
  async getDistributionDashboard(): Promise<any> {
    return this.request('/distribution/dashboard');
  }

  async getDistributionBusinesses(): Promise<Business[]> {
    return this.request('/distribution/businesses');
  }

  async getWhiteLabel(): Promise<any> {
    return this.request('/distribution/white_label');
  }

  async updateWhiteLabel(data: any): Promise<{ white_label: any; message: string }> {
    return this.request('/distribution/white_label', {
      method: 'PATCH',
      body: JSON.stringify({ white_label: data }),
    });
  }

  async getDistributionStats(): Promise<any> {
    return this.request('/distribution/stats');
  }
}

export const apiService = new ApiService();
