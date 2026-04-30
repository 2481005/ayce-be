const express = require('express');
const router = express.Router();
const transaksiController = require('../Controllers/TransactionController');
const auth = require('../Middleware/AuthMiddleware');

/**
 * @swagger
 * tags:
 *   name: Transaksi
 *   description: Manajemen Transaksi Restoran
 */

/**
 * @swagger
 * /api/transaksi:
 *   get:
 *     tags: [Transaksi]
 *     summary: Ambil semua riwayat transaksi
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Berhasil mengambil semua data transaksi
 *   post:
 *     tags: [Transaksi]
 *     summary: Catat transaksi baru
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               jenis_makanan:
 *                 type: string
 *                 example: "Ayce Barbeque"
 *               tanggal:
 *                 type: string
 *                 format: date
 *                 example: "2023-10-27"
 *               total_biaya:
 *                 type: number
 *                 example: 150000
 *               jenis_transaksi:
 *                 type: string
 *                 example: "Cash"
 *     responses:
 *       201:
 *         description: Transaksi berhasil dicatat
 */
router.get('/', auth, transaksiController.getAllTransaksi);
router.post('/', auth, transaksiController.createTransaksi);

/**
 * @swagger
 * /api/transaksi/filter/{tanggal}:
 *   get:
 *     tags: [Transaksi]
 *     summary: Filter transaksi berdasarkan tanggal
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tanggal
 *         required: true
 *         schema:
 *           type: string
 *         description: "Format YYYY-MM-DD (Contoh: 2023-10-27)"
 *         example: "2023-10-27"
 *     responses:
 *       200:
 *         description: Data transaksi pada tanggal tersebut ditemukan
 */
router.get('/filter/:tanggal', auth, transaksiController.getTransaksiByDate);

module.exports = router;