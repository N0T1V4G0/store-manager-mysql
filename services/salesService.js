const AppError = require('../errors/AppError');
const Sale = require('../models/saleModel');

exports.list = async () => {
  const sales = await Sale.list();
  return sales;
};

exports.getByID = async (id) => {
  const sale = await Sale.getByID(id);
  if (sale.length < 1) {
    throw new AppError('Sale not found', 404);
  }
  return sale;
};

exports.create = async () => {
  // const saleId = await Sale.create();
};