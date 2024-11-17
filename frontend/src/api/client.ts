import { ApiError } from '../types';

const API_URL = 'http://localhost:8000';

interface RequestConfig extends RequestInit {
  token?: string;
}

class ApiClient {
  private static instance: ApiClient;
  private token: string | null = null;

  private constructor() {
    this.token = localStorage.getItem('token');
  }

  static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }
    return ApiClient.instance;
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('token');
  }

  private async request<T>(endpoint: string, config: RequestConfig = {}): Promise<T> {
    const headers: Record<string, string> = {
      ...(!(config.body instanceof FormData) && { 'Content-Type': 'application/json' }),
      ...(config.headers as Record<string, string>),
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    console.log(`[API] ${config.method || 'GET'} request to: ${API_URL}${endpoint}`);
    console.log('[API] Request headers:', headers);
    if (config.body) {
      console.log('[API] Request body:', 
        config.body instanceof FormData 
          ? Object.fromEntries(config.body.entries())
          : typeof config.body === 'string'
            ? JSON.parse(config.body)
            : config.body
      );
    }

    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        ...config,
        headers,
      });

      const contentType = response.headers.get('content-type');
      const isJson = contentType && contentType.includes('application/json');
      
      // Try to parse response data
      let responseData;
      try {
        responseData = isJson ? await response.json() : await response.text();
        console.log(`[API] Response (${response.status}):`, responseData);
      } catch (parseError) {
        console.error('[API] Failed to parse response:', parseError);
        responseData = null;
      }

      if (!response.ok) {
        // Handle different types of error responses
        let errorMessage = 'An unexpected error occurred';
        
        if (responseData) {
          if (typeof responseData === 'string') {
            errorMessage = responseData;
          } else if (typeof responseData === 'object') {
            errorMessage = responseData.detail || responseData.message || JSON.stringify(responseData);
          }
        } else {
          errorMessage = response.statusText || `Request failed with status ${response.status}`;
        }

        const error = new Error(errorMessage);
        (error as any).status = response.status;
        (error as any).response = response;
        throw error;
      }

      return responseData;
    } catch (error) {
      console.error('[API] Request failed:', error);
      // Enhance error with more context if it's a network error
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        throw new Error('Unable to connect to the server. Please check your internet connection.');
      }
      throw error;
    }
  }

  async get<T>(endpoint: string, config: RequestConfig = {}): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: 'GET' });
  }

  async post<T>(endpoint: string, data: any, config: RequestConfig = {}): Promise<T> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'POST',
      body: data instanceof FormData ? data : JSON.stringify(data),
    });
  }

  async put<T>(endpoint: string, data: any, config: RequestConfig = {}): Promise<T> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string, config: RequestConfig = {}): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: 'DELETE' });
  }
}

export const api = ApiClient.getInstance();
