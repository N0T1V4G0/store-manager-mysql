const Joi = require('joi');
const AppError = require('../errors/AppError');

const saleSchema = Joi.object({
  productId: Joi.number().required(),
  quantity: Joi.number().min(1).required(),
});

const validateSaleBody = (req, res, next) => {
  const sales = [...req.body];
  sales.forEach((sale) => {
    const { error } = saleSchema.validate(sale);
    if (error) {
      if (!sale.quantity || !sale.productId) throw new AppError(error.message);
      throw new AppError(error.message, 422);
    }
  });

  next();
};

module.exports = validateSaleBody;
