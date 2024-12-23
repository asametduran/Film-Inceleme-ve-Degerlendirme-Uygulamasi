import { api } from '../api/index.js';
import { router } from '../router.js';

export default function login() {
  const app = document.getElementById('app');
  
  app.innerHTML = `
    <div class="min-h-[80vh] flex items-center justify-center">
      <div class="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 class="text-2xl font-bold mb-6 text-center">Giriş Yap</h1>
        
        <div id="errorMessage" class="hidden bg-red-500 text-white p-3 rounded-lg mb-4"></div>
        
        <form id="loginForm" class="space-y-6">
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
            Giriş Yap
          </button>
        </form>
        
        <p class="mt-4 text-center text-gray-400">
          Hesabınız yok mu? 
          <a href="/register" class="text-orange-500 hover:text-orange-400">Kayıt Ol</a>
        </p>
      </div>
    </div>
  `;

  const form = document.getElementById('loginForm');
  const errorMessage = document.getElementById('errorMessage');
  const submitButton = document.getElementById('submitButton');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    try {
      submitButton.disabled = true;
      submitButton.textContent = 'Giriş Yapılıyor...';
      errorMessage.classList.add('hidden');

      const response = await api.login({
        email: form.email.value,
        password: form.password.value
      });
      
      if (response.success && response.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        router.navigate('/');
      } else {
        throw new Error(response.message || 'Giriş yapılamadı');
      }
    } catch (error) {
      errorMessage.textContent = error.message || 'Giriş yapılırken bir hata oluştu';
      errorMessage.classList.remove('hidden');
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = 'Giriş Yap';
    }
  });
}