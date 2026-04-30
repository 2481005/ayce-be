const express = require('express');
const router = express.Router();
const userController = require('../Controllers/UserController');
const auth = require('../Middleware/AuthMiddleware');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Manajemen User dan Autentikasi
 */

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     tags: [Users]
 *     summary: Registrasi user baru
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nama: { type: string }
 *               email: { type: string }
 *               nomor_hp: { type: string }
 *               password: { type: string }
 */
router.post('/register', userController.register);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     tags: [Users]
 *     summary: Login user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@gmail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Login Berhasil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string }
 *                 token: { type: string }
 */
router.post('/login', userController.login);

/**
 * @swagger
 * /api/users:
 *   get:
 *     tags: [Users]
 *     summary: Ambil semua user (Admin Only/Auth)
 *     security:
 *       - bearerAuth: []
 */
router.get('/', auth, userController.getAllUsers);

router.put('/:id', auth, userController.updateUser);
router.delete('/:id', auth, userController.deleteUser);

module.exports = router;