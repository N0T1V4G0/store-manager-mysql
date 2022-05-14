const salesService = require('../services/salesService');

exports.list = async (req, res, next) => {
  try {
    const sales = await salesService.list();
    res.status(200).json(sales);
  } catch (e) {
    next(e);
  }
};