const express = require('express');
const router = express.Router();
const ServiceController = require('../controllers/ServiceController');

/**
 * @swagger
 * tags:
 *   name: Serviços
 *   description: Gerenciamento de serviços oferecidos pela barbearia
 */

/**
 * @swagger
 * /api/services:
 *   get:
 *     summary: Lista todos os serviços
 *     tags: [Serviços]
 *     responses:
 *       200:
 *         description: Lista de serviços retornada com sucesso
 */
router.get('/', ServiceController.index);

/**
 * @swagger
 * /api/services/{id}:
 *   get:
 *     summary: Retorna um serviço pelo ID
 *     tags: [Serviços]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do serviço
 *     responses:
 *       200:
 *         description: Serviço encontrado
 *       404:
 *         description: Serviço não encontrado
 */
router.get('/:id', ServiceController.show);

/**
 * @swagger
 * /api/services:
 *   post:
 *     summary: Cadastra um novo serviço
 *     tags: [Serviços]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Corte Degradê
 *               price:
 *                 type: number
 *                 example: 35.00
 *               duration:
 *                 type: integer
 *                 example: 30
 *     responses:
 *       201:
 *         description: Serviço criado com sucesso
 */
router.post('/', ServiceController.store);

/**
 * @swagger
 * /api/services/{id}:
 *   put:
 *     summary: Atualiza um serviço
 *     tags: [Serviços]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do serviço
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               duration:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Serviço atualizado com sucesso
 */
router.put('/:id', ServiceController.update);

/**
 * @swagger
 * /api/services/{id}:
 *   delete:
 *     summary: Remove um serviço
 *     tags: [Serviços]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do serviço
 *     responses:
 *       200:
 *         description: Serviço removido com sucesso
 */
router.delete('/:id', ServiceController.delete);

module.exports = router;