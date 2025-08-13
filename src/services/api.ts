import axios, { AxiosInstance, AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import { User, LoginResponse, Course, PDF } from '@/types/auth';

// Base API configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

class APIService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor to add auth token
    this.api.interceptors.request.use(
      (config) => {
        const token = Cookies.get('access_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor for token refresh
    this.api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          
          const refreshToken = Cookies.get('refresh_token');
          if (refreshToken) {
            try {
              const response = await axios.post(`${API_BASE_URL}/auth/refresh/`, {
                refresh: refreshToken,
              });
              
              const newAccessToken = response.data.access;
              Cookies.set('access_token', newAccessToken, {
                expires: 1,
                secure: true,
                sameSite: 'strict'
              });
              
              originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
              return this.api(originalRequest);
            } catch (refreshError) {
              // Refresh failed, redirect to login
              Cookies.remove('access_token');
              Cookies.remove('refresh_token');
              window.location.href = '/login';
            }
          }
        }
        
        return Promise.reject(error);
      }
    );
  }

  // Generic HTTP methods
  private async get<T>(url: string): Promise<T> {
    const response: AxiosResponse<T> = await this.api.get(url);
    return response.data;
  }

  private async post<T>(url: string, data?: any): Promise<T> {
    const response: AxiosResponse<T> = await this.api.post(url, data);
    return response.data;
  }

  private async put<T>(url: string, data?: any): Promise<T> {
    const response: AxiosResponse<T> = await this.api.put(url, data);
    return response.data;
  }

  private async delete<T>(url: string): Promise<T> {
    const response: AxiosResponse<T> = await this.api.delete(url);
    return response.data;
  }

  // Upload with progress
  private async upload<T>(url: string, formData: FormData, onProgress?: (progress: number) => void): Promise<T> {
    const response: AxiosResponse<T> = await this.api.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(progress);
        }
      },
    });
    return response.data;
  }

  // Auth endpoints
  async login(email: string, password: string): Promise<LoginResponse> {
    return this.post<LoginResponse>('/auth/login/', { email, password });
  }

  async register(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: 'admin' | 'student';
  }): Promise<{ message: string }> {
    return this.post<{ message: string }>('/auth/register/', userData);
  }

  async getCurrentUser(): Promise<User> {
    return this.get<User>('/auth/me/');
  }

  async forgotPassword(email: string): Promise<{ message: string }> {
    return this.post<{ message: string }>('/auth/forgot-password/', { email });
  }

  // Course endpoints
  async getCourses(): Promise<Course[]> {
    return this.get<Course[]>('/courses/');
  }

  async createCourse(courseData: { title: string; description: string }): Promise<Course> {
    return this.post<Course>('/courses/', courseData);
  }

  async getCoursePDFs(courseId: number): Promise<PDF[]> {
    return this.get<PDF[]>(`/courses/${courseId}/pdfs/`);
  }

  async uploadCoursePDFs(
    courseId: number, 
    files: File[], 
    onProgress?: (filename: string, progress: number) => void
  ): Promise<PDF[]> {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('pdfs', file);
    });

    return this.upload<PDF[]>(`/courses/${courseId}/upload-pdfs/`, formData, (progress) => {
      if (onProgress) {
        onProgress('batch', progress);
      }
    });
  }

  async getPDFSignedUrl(pdfId: number): Promise<{ url: string; expiresAt: string }> {
    return this.get<{ url: string; expiresAt: string }>(`/pdfs/${pdfId}/signed-url/`);
  }

  async deletePDF(pdfId: number): Promise<{ message: string }> {
    return this.delete<{ message: string }>(`/pdfs/${pdfId}/`);
  }
}

export const authAPI = new APIService();
export default APIService;