const { Router } = require('express');
const productsControllers = require('../controllers/productsControllers');
const { validateBodyMiddleware } = require('../middlewares/validateBody');

const productsRoutes = Router();

productsRoutes.get('/', productsControllers.list);
productsRoutes.get('/:id', productsControllers.getByID);
productsRoutes.post('/', validateBodyMiddleware, (req, res) =>
  res.status(500).json({ message: 'TODO' }));

module.exports = { productsRoutes };
