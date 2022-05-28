const { Router } = require('express');
const salesControllers = require('../controllers/salesControllers');
const validateSaleBody = require('../middlewares/validateSaleBody');

const salesRoutes = Router();

salesRoutes.get('/', salesControllers.list);
salesRoutes.get('/:id', salesControllers.getByID);
salesRoutes.post('/', validateSaleBody, (req, res) =>
  res.status(500).json({ message: 'TODO' }));

module.exports = { salesRoutes };
