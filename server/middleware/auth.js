import jwt from 'jsonwebtoken';

export const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'Yetkilendirme hatası' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'gizli-anahtar');
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Geçersiz token' });
  }
};