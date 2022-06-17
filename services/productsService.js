const AppError = require('../errors/AppError');
const Product = require('../models/productModel');

exports.list = async () => Product.list();

exports.getByID = async (id) => {
  const product = await Product.getByID(id);
  if (!product) throw new AppError('Product not found', 404);
  return product;
};

exports.create = async ({ name, quantity }) => {
  const productAlreadyExists = await Product.getByName(name);
  if (productAlreadyExists) throw new AppError('Product already exists', 409);
  return Product.create({ name, quantity });
};

exports.update = async ({ id, name, quantity }) => {
  const productAlreadyExists = await Product.getByID(id);
  if (!productAlreadyExists) throw new AppError('Product not found', 404);
  await Product.update({ id, name, quantity });
  return Product.getByID(id);
};

exports.delete = async (id) => {
  const productAlreadyExists = await Product.getByID(id);
  if (!productAlreadyExists) throw new AppError('Product not found', 404);
  await Product.delete(id);
};
