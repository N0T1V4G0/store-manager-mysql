const Joi = require('joi');
const AppError = require('../errors/AppError');

const saleSchema = Joi.object({
  productId: Joi.number().required(),
  quantity: Joi.number().min(1).required(),
});

const validateSaleBody = (req, res, next) => {
  const saleProducts = [...req.body];
  saleProducts.forEach((product) => {
    const { error } = saleSchema.validate(product);
    if (error) {
      if (!product.quantity || !product.productId) throw new AppError(error.message);
      throw new AppError(error.message, 422);
    }
  });

  next();
};

module.exports = validateSaleBody;
