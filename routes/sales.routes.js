const { Router } = require('express');

const salesRoutes = Router();

salesRoutes.get('/', (req, res) => {
  res.status(500).json({ message: 'TODO' });
});

module.exports = { salesRoutes };
