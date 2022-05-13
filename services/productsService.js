const Product = require('../models/productModel');

exports.list = async () => {
  const products = await Product.list();
  return products;
};

exports.getByID = async (id) => {
  const product = await Product.getByID(id);
  return product;
};
