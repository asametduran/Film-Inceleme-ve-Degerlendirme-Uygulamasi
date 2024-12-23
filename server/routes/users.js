import express from 'express';
import { auth } from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();

// Kullanıcı profili getirme
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .select('-password')
      .populate('favoriteMovies')
      .populate('watchlist');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Kullanıcı bulunamadı'
      });
    }

    res.json({
      success: true,
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Sunucu hatası oluştu'
    });
  }
});

// Kullanıcı profili güncelleme
router.put('/profile', auth, async (req, res) => {
  try {
    const { username, email } = req.body;
    
    // Kullanıcıyı güncelle
    const user = await User.findByIdAndUpdate(
      req.userId,
      { username, email },
      { new: true }
    ).select('-password');

    res.json({
      success: true,
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Profil güncellenirken bir hata oluştu'
    });
  }
});

// Favori filmleri getirme
router.get('/favorites', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .populate('favoriteMovies');
    
    res.json({
      success: true,
      favorites: user.favoriteMovies
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Favori filmler yüklenirken bir hata oluştu'
    });
  }
});

// İzleme listesini getirme
router.get('/watchlist', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .populate('watchlist');
    
    res.json({
      success: true,
      watchlist: user.watchlist
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'İzleme listesi yüklenirken bir hata oluştu'
    });
  }
});

export default router;