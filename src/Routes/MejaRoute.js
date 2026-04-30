const express = require('express');
const router = express.Router();
const mejaController = require('../Controllers/MejaController');
const auth = require('../Middleware/AuthMiddleware');

/**
 * @swagger
 * tags:
 *   name: Meja
 *   description: Manajemen Meja Restoran
 */

/**
 * @swagger
 * /api/meja:
 *   get:
 *     tags: [Meja]
 *     summary: Ambil daftar semua meja
 *   post:
 *     tags: [Meja]
 *     summary: Tambah meja baru
 *     security:
 *       - bearerAuth: []
 */
router.get('/', mejaController.getAllMeja);
/**
 * @swagger
 * /api/meja:
 *   post:
 *     tags: [Meja]
 *     summary: Tambah meja baru
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nomor_meja: { type: string }
 *               kapasitas: { type: integer }
 */

router.post('/', auth, mejaController.createMeja);

/**
 * @swagger
 * /api/meja/{id}:
 *   put:
 *     tags: [Meja]
 *     summary: Update data meja
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status: { type: string, enum: [Tersedia, Terisi] }
 */
router.put('/:id', auth, mejaController.updateMeja);

router.delete('/:id', auth, mejaController.deleteMeja);

module.exports = router;