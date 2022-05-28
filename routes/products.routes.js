const { Router } = require('express');
const productsControllers = require('../controllers/productsControllers');
const validateProductBody = require('../middlewares/validateProductBody');

const productsRoutes = Router();

productsRoutes.get('/', productsControllers.list);
productsRoutes.get('/:id', productsControllers.getByID);
productsRoutes.post('/', validateProductBody, (req, res) =>
  res.status(500).json({ message: 'TODO' }));

module.exports = { productsRoutes };
