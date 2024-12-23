import { config } from '../config.js';

export const movieApi = {
  async getPopularMovies() {
    const response = await fetch(`${config.TMDB_BASE_URL}/movie/popular?api_key=${config.TMDB_API_KEY}`);
    return response.json();
  },

  async getMovieDetails(id) {
    const response = await fetch(`${config.TMDB_BASE_URL}/movie/${id}?api_key=${config.TMDB_API_KEY}`);
    return response.json();
  },

  async searchMovies(query) {
    const response = await fetch(`${config.TMDB_BASE_URL}/search/movie?api_key=${config.TMDB_API_KEY}&query=${query}`);
    return response.json();
  },

  async getMovieCredits(id) {
    const response = await fetch(`${config.TMDB_BASE_URL}/movie/${id}/credits?api_key=${config.TMDB_API_KEY}`);
    return response.json();
  }
};