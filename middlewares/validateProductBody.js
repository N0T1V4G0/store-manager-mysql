const Joi = require('joi');
const AppError = require('../errors/AppError');

const productSchema = Joi.object({
  name: Joi.string().min(5).required(),
  quantity: Joi.number().min(1).required(),
});

const validateProductBody = (req, res, next) => {
  const { name, quantity } = req.body;
  const { error } = productSchema.validate(req.body);
  if (error) {
    if (!name || (!quantity && quantity !== 0)) throw new AppError(error.message);
    throw new AppError(error.message, 422);
  }
  next();
};

module.exports = validateProductBody;
