const productsService = require('../services/productsService');

exports.list = async (req, res) => {
  const products = await productsService.list();
  res.status(200).json(products);
};

exports.getByID = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await productsService.getByID(id * 1);
    res.status(200).json(product);
  } catch (e) {
    next(e);
  }
};
