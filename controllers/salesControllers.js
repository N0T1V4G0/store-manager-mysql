const salesService = require('../services/salesService');

exports.list = async (req, res, next) => {
  try {
    const sales = await salesService.list();
    res.status(200).json(sales);
  } catch (e) {
    next(e);
  }
};

exports.getByID = async (req, res, next) => {
  try {
    const { id } = req.params;
    const sale = await salesService.getByID(id * 1);
    res.status(200).json(sale);
  } catch (e) {
    next(e);
  }
};

exports.create = async (req, res, next) => {
  try {
    const sale = await salesService.create(req.body);
    return res.status(201).json(sale);
  } catch (e) {
    next(e);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { id: saleId } = req.params;
    const products = req.body;
    const updatedSale = await salesService.update({ saleId, products });
    return res.status(200).json(updatedSale);
  } catch (e) {
    next(e);
  }
};