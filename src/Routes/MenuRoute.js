const express = require('express');
const router = express.Router();
const menuController = require('../Controllers/MenuController');
const auth = require('../Middleware/AuthMiddleware');

/**
 * @swagger
 * tags:
 *   name: Menu
 *   description: Manajemen Menu Makanan
 */

/**
 * @swagger
 * /api/menu:
 *   get:
 *     tags: [Menu]
 *     summary: Ambil semua daftar menu
 *     responses:
 *       200:
 *         description: Daftar menu berhasil diambil
 */
router.get('/', menuController.getAllMenu);

/**
 * @swagger
 * /api/menu:
 *   post:
 *     tags: [Menu]
 *     summary: Tambah menu baru
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               team: { type: string }
 *               self_reward: { type: string }
 *               vegetarian: { type: string }
 *               kids: { type: string }
 */
router.post('/', auth, menuController.createMenu);

/**
 * @swagger
 * /api/menu/{team}:
 *   put:
 *     tags: [Menu]
 *     summary: Update menu berdasarkan nama team
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: team
 *         required: true
 *         schema:
 *           type: string
 *         description: Nama team/menu yang ingin diupdate
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               self_reward: { type: string }
 *               vegetarian: { type: string }
 *               kids: { type: string }
 */
router.put('/:team', auth, menuController.updateMenu);

/**
 * @swagger
 * /api/menu/{team}:
 *   delete:
 *     tags: [Menu]
 *     summary: Hapus menu berdasarkan nama team
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: team
 *         required: true
 *         schema:
 *           type: string
 */
router.delete('/:team', auth, menuController.deleteMenu);

module.exports = router;