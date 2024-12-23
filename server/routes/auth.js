import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import {
  validatePassword,
  validateUsername,
  validateEmail,
} from "../utils/validation.js";

// Router tanımlaması
const router = express.Router();

// Giriş yapma route'u
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Email validasyonu
    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
      return res.status(400).json({
        success: false,
        message: emailValidation.message,
      });
    }

    // Kullanıcıyı bulma
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Email veya şifre hatalı",
      });
    }

    // Şifre kontrolü
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Email veya şifre hatalı",
      });
    }

    // JWT token oluşturma
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Giriş hatası:", error);
    res.status(500).json({
      success: false,
      message: "Sunucu hatası oluştu",
    });
  }
});

// Kayıt olma route'u
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validasyonlar
    const usernameValidation = validateUsername(username);
    if (!usernameValidation.isValid) {
      return res.status(400).json({
        success: false,
        message: usernameValidation.message,
      });
    }

    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
      return res.status(400).json({
        success: false,
        message: emailValidation.message,
      });
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      return res.status(400).json({
        success: false,
        message: passwordValidation.message,
      });
    }

    // Kullanıcı adı ve email kontrolü
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message:
          existingUser.email === email
            ? "Bu email adresi zaten kullanımda"
            : "Bu kullanıcı adı zaten kullanımda",
      });
    }

    // Şifreyi hashleme
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Yeni kullanıcı oluşturma
    const user = new User({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();

    // JWT token oluşturma
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(201).json({
      success: true,
      message: "Kayıt başarılı",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Kayıt hatası:", error);
    res.status(500).json({
      success: false,
      message: "Sunucu hatası oluştu",
    });
  }
});

export default router;
