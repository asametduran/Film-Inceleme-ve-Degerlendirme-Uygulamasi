import { config } from '../config.js';

export const userApi = {
  async getUserProfile() {
    const response = await fetch(`${config.BASE_URL}/users/profile`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.json();
  },

  async updateUserProfile(userData) {
    const response = await fetch(`${config.BASE_URL}/users/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(userData),
    });
    return response.json();
  },

  async toggleFavoriteMovie(movieId) {
    const response = await fetch(`${config.BASE_URL}/users/favorites/${movieId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.json();
  },

  async toggleWatchlist(movieId) {
    const response = await fetch(`${config.BASE_URL}/users/watchlist/${movieId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.json();
  }
};