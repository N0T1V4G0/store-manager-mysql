const { Router } = require('express');
const productsControllers = require('../controllers/productsControllers');
const validateProductBody = require('../middlewares/validateProductBody');

const productsRoutes = Router();

productsRoutes.get('/', productsControllers.list);
productsRoutes.get('/:id', productsControllers.getByID);
productsRoutes.post('/', validateProductBody, productsControllers.create);
productsRoutes.put('/:id', validateProductBody, productsControllers.update);
productsRoutes.delete('/:id', productsControllers.delete);

module.exports = { productsRoutes };
