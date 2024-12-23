import express from 'express';
import { auth } from '../middleware/auth.js';
import Review from '../models/Review.js';
import User from '../models/User.js';

const router = express.Router();

// Film yorumu ekleme
router.post('/review', auth, async (req, res) => {
  try {
    const { movie, rating, comment } = req.body;
    
    const review = new Review({
      user: req.userId,
      movie,
      rating,
      comment
    });

    await review.save();
    
    res.status(201).json({
      success: true,
      review
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Yorum eklenirken bir hata oluştu'
    });
  }
});

// Film yorumlarını getirme
router.get('/:movieId/reviews', async (req, res) => {
  try {
    const reviews = await Review.find({ movie: req.params.movieId })
      .populate('user', 'username')
      .sort({ createdAt: -1 });
    
    res.json(reviews);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Yorumlar yüklenirken bir hata oluştu'
    });
  }
});

// Favori film ekleme/çıkarma
router.post('/favorites/:movieId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const movieId = req.params.movieId;
    
    const index = user.favoriteMovies.indexOf(movieId);
    if (index > -1) {
      user.favoriteMovies.splice(index, 1);
    } else {
      user.favoriteMovies.push(movieId);
    }
    
    await user.save();
    
    res.json({
      success: true,
      message: index > -1 ? 'Film favorilerden çıkarıldı' : 'Film favorilere eklendi'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'İşlem sırasında bir hata oluştu'
    });
  }
});

// İzleme listesine ekleme/çıkarma
router.post('/watchlist/:movieId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const movieId = req.params.movieId;
    
    const index = user.watchlist.indexOf(movieId);
    if (index > -1) {
      user.watchlist.splice(index, 1);
    } else {
      user.watchlist.push(movieId);
    }
    
    await user.save();
    
    res.json({
      success: true,
      message: index > -1 ? 'Film izleme listesinden çıkarıldı' : 'Film izleme listesine eklendi'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'İşlem sırasında bir hata oluştu'
    });
  }
});

export default router;