export function setupAuthListeners() {
  // Oturum dinleyicileri
  const token = localStorage.getItem('token');
  if (token) {
    console.log('Kullanıcı oturumu açık');
  }
}