import { config } from '../config.js';

export const authApi = {
  async register(userData) {
    try {
      const response = await fetch(`${config.BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Kayıt işlemi başarısız');
      }

      return data;
    } catch (error) {
      throw new Error(error.message || 'Kayıt işlemi sırasında bir hata oluştu');
    }
  },

  async login(credentials) {
    try {
      const response = await fetch(`${config.BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Giriş işlemi başarısız');
      }

      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
      }

      return data;
    } catch (error) {
      throw new Error(error.message || 'Giriş işlemi sırasında bir hata oluştu');
    }
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  isAuthenticated() {
    return localStorage.getItem('token') !== null;
  },

  getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
};