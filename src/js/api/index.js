import { movieApi } from './movieApi.js';
import { authApi } from './authApi.js';
import { reviewApi } from './reviewApi.js';
import { userApi } from './userApi.js';

export const api = {
  ...movieApi,
  ...authApi,
  ...reviewApi,
  ...userApi
};