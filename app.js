const express = require('express');
require('express-async-errors');
const errorMiddleware = require('./middlewares/error');
const { productsRoutes } = require('./routes/products.routes');
const { salesRoutes } = require('./routes/sales.routes');

const app = express();

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
app.use(express.json());

app.use('/products', productsRoutes);
app.use('/sales', salesRoutes);

app.use(errorMiddleware);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação
module.exports = app;
