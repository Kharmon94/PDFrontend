// API service for connecting to Rails backend
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api/v1';

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
  async login(email: string, password: string) {
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

  async signup(userData: { name: string; email: string; password: string; user_type?: string }) {
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

  async getCurrentUser() {
    return this.request('/auth/me');
  }

  logout() {
    this.token = null;
    localStorage.removeItem('auth_token');
  }

  // Business methods
  async getBusinesses(params: {
    search?: string;
    category?: string;
    featured?: boolean;
    deals?: boolean;
  } = {}) {
    const queryParams = new URLSearchParams();
    
    if (params.search) queryParams.append('search', params.search);
    if (params.category) queryParams.append('category', params.category);
    if (params.featured !== undefined) queryParams.append('featured', params.featured.toString());
    if (params.deals !== undefined) queryParams.append('deals', params.deals.toString());

    const queryString = queryParams.toString();
    const endpoint = queryString ? `/businesses?${queryString}` : '/businesses';
    
    return this.request(endpoint);
  }

  async getBusiness(id: string) {
    return this.request(`/businesses/${id}`);
  }

  async createBusiness(businessData: any) {
    return this.request('/businesses', {
      method: 'POST',
      body: JSON.stringify({ business: businessData }),
    });
  }

  async updateBusiness(id: string, businessData: any) {
    return this.request(`/businesses/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ business: businessData }),
    });
  }

  async deleteBusiness(id: string) {
    return this.request(`/businesses/${id}`, {
      method: 'DELETE',
    });
  }

  async getMyBusinesses() {
    return this.request('/businesses/my');
  }

  async getBusinessAnalytics(id: string) {
    return this.request(`/businesses/${id}/analytics`);
  }

  async trackBusinessClick(id: string, clickType: string) {
    return this.request(`/businesses/${id}/track_click`, {
      method: 'POST',
      body: JSON.stringify({ click_type: clickType }),
    });
  }

  // Saved deals methods
  async getSavedDeals() {
    return this.request('/saved_deals');
  }

  async saveDeal(businessId: string) {
    return this.request('/saved_deals', {
      method: 'POST',
      body: JSON.stringify({ business_id: businessId }),
    });
  }

  async removeSavedDeal(businessId: string) {
    return this.request(`/saved_deals/${businessId}`, {
      method: 'DELETE',
    });
  }

  async toggleSavedDeal(businessId: string) {
    return this.request('/saved_deals/toggle', {
      method: 'POST',
      body: JSON.stringify({ business_id: businessId }),
    });
  }
}

export const apiService = new ApiService();
