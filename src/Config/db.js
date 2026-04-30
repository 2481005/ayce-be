// src/Config/Database.js
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl : true
});

// Fungsi untuk mengetes koneksi
const testConnection = async () => {
  try {
    const client = await pool.connect();
    console.log("✅ Berhasil terhubung ke PostgreSQL!");
    client.release();
  } catch (err) {
    console.error("❌ Gagal terhubung ke PostgreSQL:", err.message);
  }
};

module.exports = { pool, testConnection };