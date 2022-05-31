const AppError = require('../errors/AppError');
const Product = require('../models/productModel');

exports.list = async () => {
  const products = await Product.list();
  return products;
};

exports.getByID = async (id) => {
  const product = await Product.getByID(id);
  if (!product) {
    throw new AppError('Product not found', 404);
  }
  return product;
};

exports.create = async ({ name, quantity }) => {
  const productAlreadyExists = await Product.getByName(name);
  if (productAlreadyExists) {
    throw new AppError('Product already exists', 409);
  }
  const newProduct = await Product.create({ name, quantity });
  return newProduct;
};

exports.update = async ({ id, name, quantity }) => {
  const productAlreadyExists = await Product.getByID(id);
  if (!productAlreadyExists) {
    throw new AppError('Product not found', 404);
  }
  await Product.update({ id, name, quantity });
  const updatedProduct = await Product.getByID(id);
  return updatedProduct;
};