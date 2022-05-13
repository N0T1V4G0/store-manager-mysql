const { Router } = require('express');
const productsControllers = require('../controllers/productsControllers');

const productsRoutes = Router();

productsRoutes.get('/', productsControllers.list);
productsRoutes.get('/:id', productsControllers.getByID);

module.exports = { productsRoutes };
