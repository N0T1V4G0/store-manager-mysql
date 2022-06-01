const productsService = require('../services/productsService');

exports.list = async (req, res, next) => {
  try {
    const products = await productsService.list();
    return res.status(200).json(products);
  } catch (e) {
    next(e);
  }
};

exports.getByID = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await productsService.getByID(id * 1);
    return res.status(200).json(product);
  } catch (e) {
    next(e);
  }
};

exports.create = async (req, res, next) => {
  try {
    const { name, quantity } = req.body;
    const newProduct = await productsService.create({ name, quantity });
    return res.status(201).json(newProduct);
  } catch (e) {
    next(e);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const updatedProduct = await productsService.update({ id: id * 1, name, quantity });
    return res.status(200).json(updatedProduct);
  } catch (e) {
    next(e);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params;
    await productsService.delete(id * 1);
    return res.status(204).send();
  } catch (e) {
    next(e);
  }
};