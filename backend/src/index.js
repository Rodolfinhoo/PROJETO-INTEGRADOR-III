require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
require('./database/init');

const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();

/**
 * CORS liberado para fornecimento externo da API
 */
app.use(cors());

app.use(express.json());

/**
 * Rotas principais da API
 */
app.use('/api', routes);

/**
 * Configuração do Swagger (Documentação OpenAPI)
 */
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Barbearia',
      version: '1.0.0',
      description: 'API para gerenciamento de clientes, agendamentos e serviços da barbearia',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3001}`,
      },
    ],
  },
  apis: ['./routes/*.js'], 
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * Middleware de tratamento de erros
 */
app.use(errorHandler);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📘 Swagger disponível em: http://localhost:${PORT}/api-docs`);
});

module.exports = app;