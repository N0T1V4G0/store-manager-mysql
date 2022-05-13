const { Router } = require('express');
const productsControllers = require('../controllers/productsControllers');

const productsRoutes = Router();

productsRoutes.get('/', productsControllers.list);

module.exports = { productsRoutes };
