const { connection } = require('./connection');

exports.list = async () => {
  const [data] = await connection.execute('SELECT * FROM StoreManager.sales_products;');

  return data;
};

exports.getByID = async (id) => {
  const [data] = await connection.execute(
    'SELECT * FROM StoreManager.sales_products WHERE sale_id = ?',
    [id],
  );

  return data[0];
};
