const { Router } = require('express');

const productsRoutes = Router();

productsRoutes.get('/', (req, res) => {
  res.status(500).json({ message: 'rota incompleta' });
});

module.exports = { productsRoutes };
