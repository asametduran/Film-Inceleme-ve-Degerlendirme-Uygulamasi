// Şifre doğrulama fonksiyonu
export const validatePassword = (password) => {
  // Sadece boş olup olmadığını kontrol et
  if (!password || password.trim() === '') {
    return { isValid: false, message: 'Şifre boş olamaz' };
  }
  return { isValid: true };
};

// Kullanıcı adı doğrulama fonksiyonu
export const validateUsername = (username) => {
  const minLength = 3;
  const maxLength = 20;

  if (username.length < minLength || username.length > maxLength) {
    return { isValid: false, message: 'Kullanıcı adı 3-20 karakter arası olmalıdır' };
  }

  return { isValid: true };
};

// Email doğrulama fonksiyonu
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailRegex.test(email)) {
    return { isValid: false, message: 'Geçerli bir email adresi giriniz' };
  }

  return { isValid: true };
};