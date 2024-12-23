import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../server/models/User.js';

dotenv.config();

async function addTestUser() {
  try {
    // MongoDB'ye bağlan
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB bağlantısı başarılı');

    // Şifreyi hashle
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('samet123', salt);

    // Kullanıcıyı oluştur
    const user = new User({
      username: 'sametduran',
      email: 'jouninsamet@gmail.com',
      password: hashedPassword
    });

    // Varolan kullanıcıyı kontrol et
    const existingUser = await User.findOne({ 
      $or: [
        { email: 'jouninsamet@gmail.com' }, 
        { username: 'sametduran' }
      ] 
    });

    if (existingUser) {
      console.log('Bu kullanıcı zaten var!');
      process.exit(0);
    }

    // Kullanıcıyı kaydet
    await user.save();
    console.log('Test kullanıcısı başarıyla eklendi!');

  } catch (error) {
    console.error('Hata:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

addTestUser();