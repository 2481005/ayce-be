require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./src/Swagger/SwaggerConfig');
const { testConnection } = require('./src/Config/db'); 


// Import Semua Route
const userRoutes = require('./src/Routes/UserRoute');
const mejaRoutes = require('./src/Routes/MejaRoute');
const menuRoutes = require('./src/Routes/MenuRoute');
const transaksiRoutes = require('./src/Routes/TransactionRoute');

const app = express();
testConnection();

const swaggerOptions = {
  customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
  customJs: [
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.js',
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.js',
  ],
};


// --- 1. Middleware ---
app.use(cors({
    origin: '*', // Mengizinkan semua domain
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], // Mengizinkan semua method HTTP
    allowedHeaders: ['Content-Type', 'Authorization'] // Mengizinkan header umum
}));
 // Mengizinkan akses dari domain lain
app.use(express.json()); // Parsing body request format JSON
app.use(express.urlencoded({ extended: true })); // Parsing url-encoded

// --- 2. Dokumentasi Swagger ---
// Link: http://localhost:3000/api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// --- 3. Definisi Jalur API (Routes) ---
app.use('/api/users', userRoutes);      // Auth, Register, & CRUD User
app.use('/api/meja', mejaRoutes);       // CRUD Meja
app.use('/api/menu', menuRoutes);       // CRUD Menu Makanan
app.use('/api/transaksi', transaksiRoutes); // CRUD & Filter Transaksi

// --- 4. Route Dasar (Opsional) ---
app.get('/', (req, res) => {
    res.json({
        message: "Welcome to Resto API",
        documentation: "/api-docs"
    });
});

// --- 5. Handling Route Tidak Ditemukan (404) ---
app.use((req, res) => {
    res.status(404).json({ message: "Endpoint tidak ditemukan" });
});

// --- 6. Menjalankan Server ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`================================================`);
    console.log(`🚀 Server berjalan di: http://localhost:${PORT}`);
    console.log(`📑 Dokumentasi Swagger: http://localhost:${PORT}/api-docs`);
    console.log(`================================================`);
});