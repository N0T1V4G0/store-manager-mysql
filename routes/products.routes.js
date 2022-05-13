const { Router } = require('express');
const productService = require('../services/productsService');

const productsRoutes = Router();

productsRoutes.get('/', async (req, res) => {
  const products = await productService.list();
  res.status(200).json(products);
});

module.exports = { productsRoutes };
