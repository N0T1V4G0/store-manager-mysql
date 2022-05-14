const { Router } = require('express');
const salesControllers = require('../controllers/salesControllers');

const salesRoutes = Router();

salesRoutes.get('/', salesControllers.list);
salesRoutes.get('/:id', salesControllers.getByID);

module.exports = { salesRoutes };
