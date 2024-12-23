import { api } from '../api/index.js';
import { config } from '../config.js';

export default async function renderHome() {
  const app = document.getElementById('app');
  
  app.innerHTML = '<div class="text-center py-8">Yükleniyor...</div>';

  try {
    const { results: movies } = await api.getPopularMovies();

    app.innerHTML = `
      <div class="container mx-auto px-4 py-8">
        <section class="mb-8">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold">Popüler Filmler</h2>
            <div class="relative">
              <input 
                type="search" 
                placeholder="Film ara..." 
                class="input"
                id="searchInput"
              >
            </div>
          </div>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            ${movies.map(movie => `
              <div class="card cursor-pointer" onclick="window.location.href='/movie/${movie.id}'">
                <img 
                  src="${config.IMAGE_BASE_URL}${movie.poster_path}" 
                  alt="${movie.title}"
                  class="w-full h-auto"
                >
                <div class="p-4">
                  <h3 class="font-bold text-lg mb-2">${movie.title}</h3>
                  <div class="flex items-center">
                    <span class="text-orange-500">★</span>
                    <span class="ml-1">${movie.vote_average.toFixed(1)}</span>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </section>
      </div>
    `;

    // Arama işlevselliği
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', async (e) => {
      if (e.target.value.length > 2) {
        const { results } = await api.searchMovies(e.target.value);
        updateMovieGrid(results);
      }
    });
  } catch (error) {
    app.innerHTML = '<div class="text-center py-8 text-red-500">Bir hata oluştu.</div>';
  }
}

function updateMovieGrid(movies) {
  const movieGrid = document.querySelector('.grid');
  movieGrid.innerHTML = movies.map(movie => `
    <div class="card cursor-pointer" onclick="window.location.href='/movie/${movie.id}'">
      <img 
        src="${config.IMAGE_BASE_URL}${movie.poster_path}" 
        alt="${movie.title}"
        class="w-full h-auto"
      >
      <div class="p-4">
        <h3 class="font-bold text-lg mb-2">${movie.title}</h3>
        <div class="flex items-center">
          <span class="text-orange-500">★</span>
          <span class="ml-1">${movie.vote_average.toFixed(1)}</span>
        </div>
      </div>
    </div>
  `).join('');
}