// Film detayları sayfası için gerekli modülleri içe aktarıyoruz
import { api } from '../api/index.js';
import { config } from '../config.js';

export default async function movieDetail(movieId) {
  // Ana içerik alanını seçiyoruz
  const app = document.getElementById('app');
  // Yükleme durumunu gösteriyoruz
  app.innerHTML = '<div class="text-center py-8">Yükleniyor...</div>';

  try {
    // Film detayları ve oyuncu kadrosunu eş zamanlı olarak çekiyoruz
    const [movie, credits] = await Promise.all([
      api.getMovieDetails(movieId),
      api.getMovieCredits(movieId)
    ]);

    // Kullanıcının oturum durumunu kontrol ediyoruz
    const isLoggedIn = localStorage.getItem('token') !== null;

    app.innerHTML = `
      <div class="container mx-auto px-4 py-8">
        <div class="flex flex-col md:flex-row gap-8">
          <div class="md:w-1/3">
            <img 
              src="${config.IMAGE_BASE_URL}${movie.poster_path}" 
              alt="${movie.title}"
              class="w-full rounded-lg shadow-lg"
            >
          </div>
          <div class="md:w-2/3">
            <h1 class="text-4xl font-bold mb-4">${movie.title}</h1>
            <div class="flex items-center mb-4">
              <span class="text-orange-500 text-xl">★</span>
              <span class="ml-2 text-xl">${movie.vote_average.toFixed(1)}</span>
              <span class="ml-4 text-gray-400">${movie.release_date}</span>
            </div>
            <p class="text-gray-300 mb-6">${movie.overview}</p>
            
            <div class="mb-6">
              <h2 class="text-xl font-bold mb-3">Oyuncular</h2>
              <div class="flex flex-wrap gap-4">
                ${credits.cast.slice(0, 5).map(actor => `
                  <div class="text-center">
                    <img 
                      src="${config.IMAGE_BASE_URL}${actor.profile_path}"
                      alt="${actor.name}"
                      class="w-24 h-24 rounded-full object-cover mb-2"
                    >
                    <p class="text-sm">${actor.name}</p>
                  </div>
                `).join('')}
              </div>
            </div>

            ${isLoggedIn ? `
              <div class="space-x-4">
                <button onclick="handleFavorite('${movieId}')" class="btn btn-primary" id="favoriteBtn">
                  <span class="mr-2">♥</span> Favorilere Ekle
                </button>
                <button onclick="handleWatchlist('${movieId}')" class="btn btn-primary" id="watchlistBtn">
                  <span class="mr-2">+</span> İzleme Listesine Ekle
                </button>
              </div>
            ` : `
              <p class="text-gray-400">Favorilere eklemek ve izleme listesi oluşturmak için 
                <a href="/login" class="text-orange-500">giriş yapın</a>
              </p>
            `}
          </div>
        </div>

        <div class="mt-12">
          <h2 class="text-2xl font-bold mb-6">Yorumlar</h2>
          ${isLoggedIn ? `
            <div class="mb-8">
              <form id="reviewForm" class="space-y-4">
                <textarea 
                  id="reviewComment"
                  class="w-full p-4 bg-gray-800 rounded-lg focus:ring-2 focus:ring-orange-500 resize-none"
                  rows="4"
                  placeholder="Yorumunuzu yazın..."
                  required
                ></textarea>
                <div class="flex justify-between items-center mt-4">
                  <div class="flex items-center">
                    <span class="mr-2">Puan:</span>
                    <select id="reviewRating" class="bg-gray-800 rounded p-2" required>
                      <option value="">Seçiniz</option>
                      <option value="10">10 - Mükemmel</option>
                      <option value="9">9 - Harika</option>
                      <option value="8">8 - Çok İyi</option>
                      <option value="7">7 - İyi</option>
                      <option value="6">6 - Fena Değil</option>
                      <option value="5">5 - Ortalama</option>
                      <option value="4">4 - Kötü</option>
                      <option value="3">3 - Çok Kötü</option>
                      <option value="2">2 - Berbat</option>
                      <option value="1">1 - İzlenmez</option>
                    </select>
                  </div>
                  <button type="submit" class="btn btn-primary">Yorum Yap</button>
                </div>
              </form>
            </div>
          ` : `
            <p class="text-gray-400 mb-4">Yorum yapmak için 
              <a href="/login" class="text-orange-500">giriş yapın</a>
            </p>
          `}
          <div id="reviewsList" class="space-y-4">
            <!-- Yorumlar buraya dinamik olarak eklenecek -->
          </div>
        </div>
      </div>
    `;

    // Form gönderimini dinliyoruz
    if (isLoggedIn) {
      const reviewForm = document.getElementById('reviewForm');
      reviewForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const comment = document.getElementById('reviewComment').value;
        const rating = document.getElementById('reviewRating').value;

        try {
          await api.addReview({
            movie: movieId,
            comment,
            rating: parseInt(rating)
          });

          // Formu sıfırlıyoruz
          reviewForm.reset();
          // Yorumları yeniden yüklüyoruz
          loadReviews(movieId);
          alert('Yorumunuz başarıyla eklendi!');
        } catch (error) {
          alert('Yorum eklenirken bir hata oluştu.');
        }
      });

      // Sayfa yüklendiğinde yorumları yüklüyoruz
      loadReviews(movieId);
    }

    // Favori ve izleme listesi butonlarının işlevlerini tanımlıyoruz
    window.handleFavorite = async (movieId) => {
      try {
        await api.toggleFavoriteMovie(movieId);
        const btn = document.getElementById('favoriteBtn');
        btn.classList.toggle('bg-orange-600');
        alert('Film favorilere eklendi!');
      } catch (error) {
        alert('Bir hata oluştu.');
      }
    };

    window.handleWatchlist = async (movieId) => {
      try {
        await api.toggleWatchlist(movieId);
        const btn = document.getElementById('watchlistBtn');
        btn.classList.toggle('bg-orange-600');
        alert('Film izleme listesine eklendi!');
      } catch (error) {
        alert('Bir hata oluştu.');
      }
    };

  } catch (error) {
    app.innerHTML = '<div class="text-center py-8 text-red-500">Film detayları yüklenirken bir hata oluştu.</div>';
  }
}

// Yorumları yükleyen yardımcı fonksiyon
async function loadReviews(movieId) {
  try {
    const reviews = await api.getMovieReviews(movieId);
    const reviewsList = document.getElementById('reviewsList');
    
    reviewsList.innerHTML = reviews.map(review => `
      <div class="bg-gray-800 p-4 rounded-lg">
        <div class="flex justify-between items-start mb-2">
          <div>
            <span class="font-bold">${review.user.username}</span>
            <span class="text-orange-500 ml-2">★ ${review.rating}</span>
          </div>
          <span class="text-gray-400 text-sm">
            ${new Date(review.createdAt).toLocaleDateString()}
          </span>
        </div>
        <p class="text-gray-300">${review.comment}</p>
      </div>
    `).join('');
  } catch (error) {
    console.error('Yorumlar yüklenirken hata:', error);
  }
}