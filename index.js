const express = require("express");
const crypto = require("crypto");

const app = express();
const port = 3000;

// Middleware untuk membaca JSON body dari request (PENTING)
app.use(express.json());
// Middleware untuk menyajikan file statis (seperti file HTML generator-mu)
app.use(express.static("public"));

/**
 * Route untuk MEMBUAT API key baru.
 * Kirim POST request ke /generate-api-key
 */
app.post("/generate-api-key", (req, res) => {
  console.log("Request diterima di /generate-api-key");
  const key = "sk_live_" + crypto.randomBytes(32).toString("hex");
  res.json({ apiKey: key });
});

/**
 * Route BARU untuk MENGECEK API key.
 * Kirim POST request ke /check dengan JSON body {"apikey": "..."}
 */
app.post("/check", (req, res) => {
  // 1. Ambil apikey dari body yang kamu kirim di Postman
  const { apikey } = req.body;

  console.log("Request diterima di /check. API Key:", apikey);

  // 2. Lakukan validasi sederhana
  if (apikey && apikey.startsWith("sk_live_")) {
    // Jika valid, kirim balasan sukses
    res.json({
      status: "sukses",
      message: "API key valid!",
    });
  } else {
    // Jika tidak valid, kirim balasan error
    res.status(400).json({
      status: "error",
      message: "API key tidak ada atau tidak valid",
    });
  }
});

// Menjalankan server
app.listen(port, () => {
  // (Typo kamu sudah diperbaiki, gunakan backtick ` bukan ')
  console.log(`Server berjalan di http://localhost:${port}`);
});