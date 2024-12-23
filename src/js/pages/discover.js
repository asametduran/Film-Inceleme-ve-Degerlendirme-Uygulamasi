import { api } from '../api/index.js';
import { config } from '../config.js';

export default async function discover() {
  const app = document.getElementById('app');
  app.innerHTML = '<div class="text-center py-8">Yükleniyor...</div>';

  try {
    const { results: movies } = await api.getPopularMovies();

    app.innerHTML = `
      <div class="container mx-auto px-4 py-8">
        <div class="flex flex-col md:flex-row gap-8">
          <aside class="md:w-1/4">
            <div class="bg-gray-800 p-6 rounded-lg">
              <h2 class="text-xl font-bold mb-4">Filtreler</h2>
              
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium mb-2">
                    Tür
                  </label>
                  <select class="w-full p-2 bg-gray-700 rounded-md">
                    <option value="">Tümü</option>
                    <option value="action">Aksiyon</option>
                    <option value="comedy">Komedi</option>
                    <option value="drama">Drama</option>
                    <option value="horror">Korku</option>
                  </select>
                </div>
                
                <div>
                  <label class="block text-sm font-medium mb-2">
                    Yıl
                  </label>
                  <select class="w-full p-2 bg-gray-700 rounded-md">
                    <option value="">Tümü</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                  </select>
                </div>
                
                <div>
                  <label class="block text-sm font-medium mb-2">
                    Sıralama
                  </label>
                  <select class="w-full p-2 bg-gray-700 rounded-md">
                    <option value="popularity">Popülerlik</option>
                    <option value="rating">Puan</option>
                    <option value="date">Tarih</option>
                  </select>
                </div>
              </div>
            </div>
          </aside>

          <main class="md:w-3/4">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
          </main>
        </div>
      </div>
    `;
  } catch (error) {
    app.innerHTML = '<div class="text-center py-8 text-red-500">Filmler yüklenirken bir hata oluştu.</div>';
  }
}