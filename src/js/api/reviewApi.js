// Yapılandırma dosyasını içe aktarıyoruz
import { config } from '../config.js';

export const reviewApi = {
  // Yeni yorum ekleme fonksiyonu
  async addReview(reviewData) {
    const response = await fetch(`${config.BASE_URL}/movies/review`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(reviewData),
    });
    
    if (!response.ok) {
      throw new Error('Yorum eklenemedi');
    }
    
    return response.json();
  },

  // Film yorumlarını getirme fonksiyonu
  async getMovieReviews(movieId) {
    const response = await fetch(`${config.BASE_URL}/movies/${movieId}/reviews`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('Yorumlar yüklenemedi');
    }
    
    return response.json();
  },

  // Yorum güncelleme fonksiyonu
  async updateReview(reviewId, reviewData) {
    const response = await fetch(`${config.BASE_URL}/movies/review/${reviewId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(reviewData),
    });
    
    if (!response.ok) {
      throw new Error('Yorum güncellenemedi');
    }
    
    return response.json();
  },

  // Yorum silme fonksiyonu
  async deleteReview(reviewId) {
    const response = await fetch(`${config.BASE_URL}/movies/review/${reviewId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('Yorum silinemedi');
    }
    
    return response.json();
  }
};