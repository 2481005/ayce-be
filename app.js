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

// --- 1. Middleware ---
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- 2. Middleware Khusus Vercel (PENTING) ---
// Memaksa /api-docs menjadi /api-docs/ agar CSS/JS terpanggil dengan benar
app.use((req, res, next) => {
    if (req.url === '/api-docs') {
        res.redirect(301, '/api-docs/');
    } else {
        next();
    }
});

// --- 3. Dokumentasi Swagger ---
const swaggerOptions = {
    customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
    customJs: [
        'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.js',
        'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.js',
    ],
    customCss: '.swagger-ui .topbar { display: none }' // Opsional: menyembunyikan bar atas Swagger
};

// Pastikan swaggerOptions dimasukkan ke dalam setup()
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerOptions));

// Route tambahan untuk melihat JSON Swagger secara mentah (opsional untuk debug)
app.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

// --- 4. Definisi Jalur API (Routes) ---
app.use('/api/users', userRoutes);      
app.use('/api/meja', mejaRoutes);       
app.use('/api/menu', menuRoutes);       
app.use('/api/transaksi', transaksiRoutes); 

// --- 5. Route Dasar ---
app.get('/', (req, res) => {
    res.json({
        message: "Welcome to Resto API",
        documentation: "/api-docs"
    });
});

// --- 6. Handling Route Tidak Ditemukan (404) ---
app.use((req, res) => {
    res.status(404).json({ message: "Endpoint tidak ditemukan" });
});

// --- 7. Menjalankan Server ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`================================================`);
    console.log(`🚀 Server berjalan di: http://localhost:${PORT}`);
    console.log(`📑 Dokumentasi Swagger: http://localhost:${PORT}/api-docs`);
    console.log(`================================================`);
});

// Export untuk Vercel
module.exports = app;