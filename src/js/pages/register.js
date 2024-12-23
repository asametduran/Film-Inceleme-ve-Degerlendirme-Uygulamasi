import { api } from '../api/index.js';
import { router } from '../router.js';

export default function register() {
  const app = document.getElementById('app');
  
  app.innerHTML = `
    <div class="min-h-[80vh] flex items-center justify-center">
      <div class="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 class="text-2xl font-bold mb-6 text-center">Kayıt Ol</h1>
        
        <div id="errorMessage" class="hidden bg-red-500 text-white p-3 rounded-lg mb-4"></div>
        
        <form id="registerForm" class="space-y-6">
          <div>
            <label class="block text-sm font-medium mb-2" for="username">
              Kullanıcı Adı
            </label>
            <input
              type="text"
              id="username"
              name="username"
              class="w-full p-3 bg-gray-700 rounded-md focus:ring-2 focus:ring-orange-500"
              required
              minlength="3"
              maxlength="20"
            >
            <p class="text-sm text-gray-400 mt-1">3-20 karakter arası olmalıdır</p>
          </div>

          <div>
            <label class="block text-sm font-medium mb-2" for="email">
              E-posta
            </label>
            <input
              type="email"
              id="email"
              name="email"
              class="w-full p-3 bg-gray-700 rounded-md focus:ring-2 focus:ring-orange-500"
              required
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium mb-2" for="password">
              Şifre
            </label>
            <input
              type="password"
              id="password"
              name="password"
              class="w-full p-3 bg-gray-700 rounded-md focus:ring-2 focus:ring-orange-500"
              required
            >
          </div>
          
          <button 
            type="submit" 
            class="w-full btn btn-primary py-3"
            id="submitButton"
          >
            Kayıt Ol
          </button>
        </form>
        
        <p class="mt-4 text-center text-gray-400">
          Zaten hesabınız var mı? 
          <a href="/login" class="text-orange-500 hover:text-orange-400">Giriş Yap</a>
        </p>
      </div>
    </div>
  `;

  const form = document.getElementById('registerForm');
  const errorMessage = document.getElementById('errorMessage');
  const submitButton = document.getElementById('submitButton');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    try {
      // Form verilerini al
      const formData = new FormData(form);
      const userData = {
        username: formData.get('username'),
        email: formData.get('email'),
        password: formData.get('password')
      };

      // Submit butonunu devre dışı bırak
      submitButton.disabled = true;
      submitButton.textContent = 'Kaydediliyor...';
      
      // Hata mesajını gizle
      errorMessage.classList.add('hidden');

      // API'ye kayıt isteği gönder
      const response = await api.register(userData);
      
      if (response.success) {
        // Başarılı kayıt mesajı göster
        alert('Kayıt başarılı! Giriş yapabilirsiniz.');
        router.navigate('/login');
      }
    } catch (error) {
      // Hata mesajını göster
      errorMessage.textContent = error.message;
      errorMessage.classList.remove('hidden');
    } finally {
      // Submit butonunu tekrar aktif et
      submitButton.disabled = false;
      submitButton.textContent = 'Kayıt Ol';
    }
  });

  // Form validasyonu için input event listener'ları
  const inputs = form.querySelectorAll('input');
  inputs.forEach(input => {
    input.addEventListener('input', () => {
      if (input.validity.valid) {
        input.classList.remove('border-red-500');
        input.classList.add('border-gray-700');
      } else {
        input.classList.remove('border-gray-700');
        input.classList.add('border-red-500');
      }
    });
  });
}