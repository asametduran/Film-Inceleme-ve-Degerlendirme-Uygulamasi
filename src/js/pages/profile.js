import { api } from '../api/index.js';

export default async function profile() {
  const app = document.getElementById('app');
  app.innerHTML = '<div class="text-center py-8">Yükleniyor...</div>';

  try {
    const userData = await api.getUserProfile();

    app.innerHTML = `
      <div class="container mx-auto px-4 py-8">
        <div class="bg-gray-800 rounded-lg p-8">
          <div class="flex items-center mb-8">
            <div class="w-24 h-24 bg-orange-500 rounded-full flex items-center justify-center text-2xl font-bold">
              ${userData.username.charAt(0).toUpperCase()}
            </div>
            <div class="ml-6">
              <h1 class="text-2xl font-bold">${userData.username}</h1>
              <p class="text-gray-400">${userData.email}</p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 class="text-xl font-bold mb-4">Favori Filmlerim</h2>
              <div class="grid grid-cols-2 gap-4">
                ${userData.favoriteMovies.map(movie => `
                  <div class="card">
                    <img src="${movie.poster_path}" alt="${movie.title}" class="w-full">
                    <div class="p-2">
                      <h3 class="font-bold">${movie.title}</h3>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>

            <div>
              <h2 class="text-xl font-bold mb-4">İzleme Listem</h2>
              <div class="grid grid-cols-2 gap-4">
                ${userData.watchlist.map(movie => `
                  <div class="card">
                    <img src="${movie.poster_path}" alt="${movie.title}" class="w-full">
                    <div class="p-2">
                      <h3 class="font-bold">${movie.title}</h3>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  } catch (error) {
    app.innerHTML = '<div class="text-center py-8 text-red-500">Profil yüklenirken bir hata oluştu.</div>';
  }
}