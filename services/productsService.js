const Product = require('../models/productModel');

exports.list = async () => {
  const products = await Product.list();
  return products;
};
