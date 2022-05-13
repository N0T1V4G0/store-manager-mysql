const productsService = require('../services/productsService');

exports.list = async (req, res, next) => {
  try {
    const products = await productsService.list();
    res.status(200).json(products);
  } catch (e) {
    next(e);
  }
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
