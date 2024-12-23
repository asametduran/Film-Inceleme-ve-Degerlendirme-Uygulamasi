import './styles/main.css';
import { router } from './js/router.js';
import { initializeApp } from './js/app.js';
import { setupAuthListeners } from './js/auth.js';

document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
  setupAuthListeners();
  router.init();
});