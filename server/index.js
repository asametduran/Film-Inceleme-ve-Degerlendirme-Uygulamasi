import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import authRoutes from "./routes/auth.js";
import movieRoutes from "./routes/movies.js";
import userRoutes from "./routes/users.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// CORS ayarları
app.use(
  cors({
    origin: "http://localhost:5173", // Vite development server
    credentials: true,
  })
);

app.use(express.json());

// MongoDB Bağlantısı
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB bağlantısı başarılı"))
  .catch((err) => console.error("MongoDB bağlantı hatası:", err));

// Root endpoint
app.get("/", (req, res) => {
  res.send("API çalışıyor!");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/users", userRoutes);

// Hata yakalama middleware'i
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Sunucu hatası",
  });
});

// Frontend entegrasyonu (isteğe bağlı)
const frontendPath = path.resolve("frontend/dist"); // Frontend build dosyalarının yolu
app.use(express.static(frontendPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// Sunucuyu başlat
app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor`);
});
