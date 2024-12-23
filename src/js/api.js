const TMDB_API_KEY = '1fb6d214145161d741319f340d7e8960';
const BASE_URL = 'http://localhost:3000/api';

export const api = {
  // Film API çağrıları
  async getPopularMovies() {
    const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}`);
    return response.json();
  },

  async getMovieDetails(id) {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}`);
    return response.json();
  },

  // Kullanıcı işlemleri
  async login(credentials) {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    return response.json();
  },

  async register(userData) {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return response.json();
  },

  // Yorum işlemleri
  async addReview(reviewData) {
    const response = await fetch(`${BASE_URL}/movies/review`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(reviewData),
    });
    return response.json();
  }
};