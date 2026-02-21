const express = require('express');
const router = express.Router();
const AppointmentController = require('../controllers/AppointmentController');

/**
 * @swagger
 * tags:
 *   name: Agendamentos
 *   description: Gerenciamento de agendamentos da barbearia
 */

/**
 * @swagger
 * /api/appointments:
 *   get:
 *     summary: Lista todos os agendamentos
 *     tags: [Agendamentos]
 *     responses:
 *       200:
 *         description: Lista de agendamentos
 */
router.get('/', AppointmentController.index);

/**
 * @swagger
 * /api/appointments/{id}:
 *   get:
 *     summary: Retorna um agendamento pelo ID
 *     tags: [Agendamentos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Agendamento encontrado
 */
router.get('/:id', AppointmentController.show);

/**
 * @swagger
 * /api/appointments:
 *   post:
 *     summary: Cria um novo agendamento
 *     tags: [Agendamentos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clientId:
 *                 type: integer
 *               serviceId:
 *                 type: integer
 *               date:
 *                 type: string
 *               time:
 *                 type: string
 *     responses:
 *       201:
 *         description: Agendamento criado com sucesso
 */
router.post('/', AppointmentController.store);

module.exports = router;