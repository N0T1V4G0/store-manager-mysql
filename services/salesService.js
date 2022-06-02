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

exports.create = async (products) => {
  const saleId = await Sale.create();
  const productsArr = products.map(({ productId, quantity }) => 
    Sale.registerSaleProducts({ saleId, productId, quantity }));

  await Promise.all(productsArr);

  return {
    id: saleId,
    itemsSold: products,
  };
};

exports.update = async ({ saleId, products }) => {
  const updatedProducts = products.map(({ productId, quantity }) => 
    Sale.update({ saleId, productId, quantity }));
  
  await Promise.all(updatedProducts);

  return {
    saleId,
    itemUpdated: products,
  };
};

exports.delete = async (id) => {
  const sale = await Sale.getByID(id);
  if (sale.length < 1) {
    throw new AppError('Sale not found', 404);
  }
  await Sale.delete(id);
};