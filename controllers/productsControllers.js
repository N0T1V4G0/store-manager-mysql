const productsService = require('../services/productsService');

exports.list = async (req, res) => {
  const products = await productsService.list();
  res.status(200).json(products);
};
