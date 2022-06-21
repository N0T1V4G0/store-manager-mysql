const fs = require('fs');
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const errorMiddleware = require('./middlewares/error');
const { productsRoutes } = require('./routes/products.routes');
const { salesRoutes } = require('./routes/sales.routes');

const swaggerConfig = JSON.parse(
  fs.readFileSync(`${__dirname}/swagger.json`, 'utf-8'),
);

const app = express();

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerConfig));

app.use('/products', productsRoutes);
app.use('/sales', salesRoutes);

app.use(errorMiddleware);

module.exports = app;
