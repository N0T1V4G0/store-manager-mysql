const { Router } = require('express');
const salesControllers = require('../controllers/salesControllers');
const validateSaleBody = require('../middlewares/validateSaleBody');

const salesRoutes = Router();

salesRoutes.get('/', salesControllers.list);
salesRoutes.get('/:id', salesControllers.getByID);
salesRoutes.post('/', validateSaleBody, salesControllers.create);
salesRoutes.put('/:id', validateSaleBody, salesControllers.update);
salesRoutes.delete('/:id', salesControllers.delete);

module.exports = { salesRoutes };
