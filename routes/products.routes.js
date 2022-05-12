const { Router } = require('express');
const Product = require('../models/productModel');

const productsRoutes = Router();

productsRoutes.get('/', async (req, res) => {
  const products = await Product.list();
  res.status(500).json({ products });
});

module.exports = { productsRoutes };
