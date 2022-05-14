const Sale = require('../models/saleModel');

exports.list = async () => {
  const sales = await Sale.list();
  return sales;
};