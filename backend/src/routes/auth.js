const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');

/**
 * @swagger
 * tags:
 *   name: Autenticação
 *   description: Login e autenticação de usuários
 */

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Realiza login do usuário
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       401:
 *         description: Credenciais inválidas
 */
router.post('/login', AuthController.login);

module.exports = router;