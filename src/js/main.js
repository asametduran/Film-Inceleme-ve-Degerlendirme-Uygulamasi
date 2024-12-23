import { router } from './router.js';
import { initializeApp } from './app.js';
import { setupAuthListeners } from './auth.js';

document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
  setupAuthListeners();
  router.init();
});