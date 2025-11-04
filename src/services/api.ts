import { AuthResponse, User, Business, SavedDeal, ApiError } from '../types';

// API service for connecting to Rails backend
declare global {
  interface Window {
    REACT_APP_API_URL?: string;
  }
}

const API_BASE_URL = window.REACT_APP_API_URL || process.env.REACT_APP_API_URL || 'http://localhost:3001/api/v1';

// Log the API URL being used (for debugging)
console.log('API_BASE_URL:', API_BASE_URL);

class ApiService {
  private token: string | null = null;

  constructor() {
    this.token = localStorage.getItem('auth_token');
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
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

  async createBusiness(businessData: any): Promise<Business> {
    return this.request('/businesses', {
      method: 'POST',
      body: JSON.stringify({ business: businessData }),
    });
  }

  async updateBusiness(id: string, businessData: any): Promise<Business> {
    return this.request(`/businesses/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ business: businessData }),
    });
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

  async updateUserProfile(data: { name?: string; email?: string }): Promise<{ user: any; message: string }> {
    return this.request('/users/profile', {
      method: 'PATCH',
      body: JSON.stringify({ user: data }),
    });
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
