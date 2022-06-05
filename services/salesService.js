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
  const productsQuantity = products.map(async ({ quantity, productId }) => {
    const productQuantity = await Sale.checkProductQuantity(productId);
    if (productQuantity < quantity) throw new AppError('Such amount is not permitted to sell', 422);
    await Sale.subtractProductQuantity({ productId, quantity });
    return productQuantity;
  });

  await Promise.all(productsQuantity);

  const saleId = await Sale.create();
  const productsArr = products.map(({ productId, quantity }) =>
    Sale.registerSaleProduct({ saleId, productId, quantity }));

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
  await Sale.restoreProductQuantity(sale);
  await Sale.delete(id);
};
